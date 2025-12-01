import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getAdminReviews } from "@/db/queries/admin";

// GET /api/admin/reviews - List all reviews with filtering
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const placeId = searchParams.get("placeId");

  try {
    const result = await getAdminReviews({
      limit,
      offset,
      placeId: placeId ? parseInt(placeId, 10) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
