import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getBusinessStats } from "@/db/queries/businesses";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/businesses/[id]/stats - Get comprehensive stats for a business
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  try {
    const stats = await getBusinessStats(businessId);
    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching business stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
