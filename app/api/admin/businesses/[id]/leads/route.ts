import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getBusinessLeads } from "@/db/queries/businesses";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/businesses/[id]/leads - Get all leads for a business
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const placeId = searchParams.get("placeId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const result = await getBusinessLeads(businessId, {
      limit,
      offset,
      placeId: placeId ? parseInt(placeId, 10) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching business leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
