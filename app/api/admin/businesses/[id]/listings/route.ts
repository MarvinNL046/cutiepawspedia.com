import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getBusinessListings } from "@/db/queries/businesses";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/businesses/[id]/listings - Get all listings for a business
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

  try {
    const result = await getBusinessListings(businessId, { limit, offset });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching business listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
