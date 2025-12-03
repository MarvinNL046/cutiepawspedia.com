import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { deleteReview } from "@/db/queries/admin";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  updateReview,
  approveReview,
  rejectReview,
  flagReview,
  toggleFeaturedReview,
  updatePlaceReviewStats,
} from "@/db/queries/reviews";

// Moderation schema
const moderationSchema = z.object({
  action: z.enum(["approve", "reject", "flag", "toggle_featured"]),
});

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

    await logAdminAction("DELETE", "review", reviewId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/reviews/[id] - Moderate a review (approve, reject, flag, toggle_featured)
export async function PATCH(request: NextRequest, context: RouteContext) {
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
    // Get the review first to check it exists and get placeId
    const review = await db.query.reviews.findFirst({
      where: eq(reviews.id, reviewId),
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const result = moderationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { action } = result.data;
    let updatedReview;
    let actionMessage: string;

    switch (action) {
      case "approve":
        updatedReview = await approveReview(reviewId);
        actionMessage = "Review approved and published";
        break;

      case "reject":
        updatedReview = await rejectReview(reviewId);
        actionMessage = "Review rejected";
        break;

      case "flag":
        updatedReview = await flagReview(reviewId);
        actionMessage = "Review flagged for review";
        break;

      case "toggle_featured":
        updatedReview = await toggleFeaturedReview(reviewId);
        actionMessage = updatedReview.isFeatured
          ? "Review marked as featured"
          : "Review unfeatured";
        break;

      default:
        return NextResponse.json(
          { error: "Invalid moderation action" },
          { status: 400 }
        );
    }

    // Update place stats if status changed (for approve/reject actions)
    if (action === "approve" || action === "reject") {
      updatePlaceReviewStats(review.placeId).catch((err) => {
        console.error("Failed to update place review stats:", err);
      });
    }

    // Log the admin action
    await logAdminAction(
      "UPDATE",
      "review",
      reviewId,
      auth.user.id,
      { action, previousStatus: review.status }
    );

    return NextResponse.json({
      success: true,
      message: actionMessage,
      review: {
        id: updatedReview.id,
        status: updatedReview.status,
        isFeatured: updatedReview.isFeatured,
      },
    });
  } catch (error) {
    console.error("Error moderating review:", error);
    return NextResponse.json(
      { error: "Failed to moderate review" },
      { status: 500 }
    );
  }
}
