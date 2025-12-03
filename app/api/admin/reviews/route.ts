import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/auth/admin-api";
import { getAdminReviews } from "@/db/queries/admin";
import {
  getPendingReviews,
  getFlaggedReviews,
  getReviewCountsByStatus,
} from "@/db/queries/reviews";

// Valid status values for filtering
const validStatuses = ["pending", "published", "rejected", "flagged"] as const;
type ReviewStatus = (typeof validStatuses)[number];

// GET /api/admin/reviews - List all reviews with filtering
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const placeId = searchParams.get("placeId");
  const status = searchParams.get("status") as ReviewStatus | null;
  const includeCounts = searchParams.get("includeCounts") === "true";

  // Validate status if provided
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    let reviews;
    let total = 0;

    // Use specialized queries for pending and flagged reviews
    if (status === "pending") {
      reviews = await getPendingReviews(limit, offset);
      total = reviews.length + offset; // Approximate
    } else if (status === "flagged") {
      reviews = await getFlaggedReviews(limit, offset);
      total = reviews.length + offset; // Approximate
    } else {
      // Use the generic admin query with optional status filter
      const result = await getAdminReviews({
        limit,
        offset,
        placeId: placeId ? parseInt(placeId, 10) : undefined,
        status: status || undefined,
      });
      reviews = result.reviews;
      total = result.total;
    }

    // Optionally include status counts for dashboard
    let statusCounts = null;
    if (includeCounts) {
      statusCounts = await getReviewCountsByStatus();
    }

    return NextResponse.json({
      reviews,
      total,
      limit,
      offset,
      ...(statusCounts && { statusCounts }),
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
