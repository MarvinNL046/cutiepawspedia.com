import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { deleteReview } from "@/db/queries/admin";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/reviews/[id] - Get a single review with full details
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const reviewId = parseInt(id, 10);

  if (isNaN(reviewId)) {
    return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json(
      { error: "Database not available" },
      { status: 500 }
    );
  }

  try {
    const review = await db.query.reviews.findFirst({
      where: eq(reviews.id, reviewId),
      with: {
        place: true,
        user: true,
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reviews/[id] - Delete a review
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const reviewId = parseInt(id, 10);

  if (isNaN(reviewId)) {
    return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
  }

  try {
    await deleteReview(reviewId);

    logAdminAction("DELETE", "review", reviewId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
