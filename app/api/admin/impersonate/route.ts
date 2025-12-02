import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import {
  startImpersonation,
  stopImpersonation,
  getImpersonation,
} from "@/lib/auth/impersonation";
import { getBusinessById } from "@/db/queries/businesses";

/**
 * POST /api/admin/impersonate
 * Start impersonating a business
 */
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;
  const admin = auth.user;

  try {
    const body = await request.json();
    const { businessId } = body;

    if (!businessId || typeof businessId !== "number") {
      return NextResponse.json(
        { error: "businessId is required and must be a number" },
        { status: 400 }
      );
    }

    // Verify business exists
    const business = await getBusinessById(businessId);
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Start impersonation
    await startImpersonation(admin.id, business.id, business.name);

    // Log the action
    await logAdminAction(admin.id.toString(), "impersonate_start", "business", businessId, {
      businessName: business.name,
    });

    return NextResponse.json({
      success: true,
      message: `Now impersonating ${business.name}`,
      business: {
        id: business.id,
        name: business.name,
      },
    });
  } catch (error) {
    console.error("Error starting impersonation:", error);
    return NextResponse.json(
      { error: "Failed to start impersonation" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/impersonate
 * Stop impersonating a business
 */
export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;
  const admin = auth.user;

  try {
    const impersonation = await getImpersonation();

    if (impersonation) {
      // Log the action before stopping
      await logAdminAction(
        admin.id.toString(),
        "impersonate_stop",
        "business",
        impersonation.businessId,
        { businessName: impersonation.businessName }
      );
    }

    await stopImpersonation();

    return NextResponse.json({
      success: true,
      message: "Impersonation stopped",
    });
  } catch (error) {
    console.error("Error stopping impersonation:", error);
    return NextResponse.json(
      { error: "Failed to stop impersonation" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/impersonate
 * Get current impersonation status
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const impersonation = await getImpersonation();

    return NextResponse.json({
      isImpersonating: !!impersonation,
      impersonation,
    });
  } catch (error) {
    console.error("Error getting impersonation status:", error);
    return NextResponse.json(
      { error: "Failed to get impersonation status" },
      { status: 500 }
    );
  }
}
