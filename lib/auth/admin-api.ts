import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stackServerApp, isStackAuthConfigured } from "./stack";
import { getUserByStackAuthId } from "@/db/queries";
import { createAuditLog } from "@/db/queries/admin";

/**
 * Verify admin access for API routes
 * Returns the admin user if authorized, or a NextResponse error
 */
export async function verifyAdminAccess(request: NextRequest): Promise<
  | { authorized: true; user: { id: number; email: string; role: string } }
  | { authorized: false; response: NextResponse }
> {
  // Check if auth is configured
  if (!isStackAuthConfigured || !stackServerApp) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      ),
    };
  }

  // Get current user from StackAuth
  const stackUser = await stackServerApp.getUser();

  if (!stackUser) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  // Get user from database to check role
  const dbUser = await getUserByStackAuthId(stackUser.id);

  if (!dbUser || dbUser.role !== "admin") {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    user: {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    },
  };
}

/**
 * Log admin action for audit trail - saves to database
 */
export async function logAdminAction(
  action: string,
  entityType: string,
  entityId: number | string,
  userId: number,
  details?: Record<string, unknown>
): Promise<void> {
  try {
    // Get request headers for IP and user agent
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      null;
    const userAgent = headersList.get("user-agent") || null;

    await createAuditLog({
      adminId: userId,
      action,
      entityType,
      entityId: typeof entityId === "string" ? parseInt(entityId, 10) : entityId,
      details,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    // Log to console as fallback, but don't throw
    console.error("Failed to log admin action to database:", error);
    console.log(
      `ADMIN_ACTION: ${action} | Entity: ${entityType}#${entityId} | User: ${userId}`,
      details ? `| Details: ${JSON.stringify(details)}` : ""
    );
  }
}
