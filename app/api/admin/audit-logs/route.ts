import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getAuditLogs, getAuditLogStats, getRecentAuditActivity } from "@/db/queries/admin";

/**
 * GET /api/admin/audit-logs
 * Get audit logs with filtering and pagination
 * Query params:
 *   - limit: number (default 50)
 *   - offset: number (default 0)
 *   - adminId: number (filter by admin)
 *   - action: string (filter by action type)
 *   - entityType: string (filter by entity type)
 *   - entityId: number (filter by specific entity)
 *   - startDate: ISO date string
 *   - endDate: ISO date string
 *   - search: string (search in action, entityType, details)
 *   - stats: "true" to get stats instead of logs
 *   - recent: "true" to get recent activity for dashboard
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);

  // Check if we should return stats
  if (searchParams.get("stats") === "true") {
    try {
      const stats = await getAuditLogStats();
      return NextResponse.json({ stats });
    } catch (error) {
      console.error("Error fetching audit log stats:", error);
      return NextResponse.json(
        { error: "Failed to fetch audit log stats" },
        { status: 500 }
      );
    }
  }

  // Check if we should return recent activity
  if (searchParams.get("recent") === "true") {
    try {
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const recentActivity = await getRecentAuditActivity(limit);
      return NextResponse.json({ logs: recentActivity });
    } catch (error) {
      console.error("Error fetching recent audit activity:", error);
      return NextResponse.json(
        { error: "Failed to fetch recent audit activity" },
        { status: 500 }
      );
    }
  }

  // Default: return paginated logs with filters
  try {
    const options: Parameters<typeof getAuditLogs>[0] = {
      limit: parseInt(searchParams.get("limit") || "50", 10),
      offset: parseInt(searchParams.get("offset") || "0", 10),
    };

    const adminId = searchParams.get("adminId");
    if (adminId) options.adminId = parseInt(adminId, 10);

    const action = searchParams.get("action");
    if (action) options.action = action;

    const entityType = searchParams.get("entityType");
    if (entityType) options.entityType = entityType;

    const entityId = searchParams.get("entityId");
    if (entityId) options.entityId = parseInt(entityId, 10);

    const startDate = searchParams.get("startDate");
    if (startDate) options.startDate = new Date(startDate);

    const endDate = searchParams.get("endDate");
    if (endDate) options.endDate = new Date(endDate);

    const search = searchParams.get("search");
    if (search) options.search = search;

    const result = await getAuditLogs(options);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit logs" },
      { status: 500 }
    );
  }
}
