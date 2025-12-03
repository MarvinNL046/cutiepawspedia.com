/**
 * Individual Review API
 *
 * GET /api/reviews/[id] - Get a review by ID
 * PATCH /api/reviews/[id] - Update own review
 * DELETE /api/reviews/[id] - Delete own review
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  getReviewById,
  updateReview,
  deleteReview,
  updatePlaceReviewStats,
} from "@/db/queries/reviews";

// Update review schema
const updateReviewSchema = z.object({
  title: z.string().max(255).optional().nullable(),
  body: z.string().min(10, "Review must be at least 10 characters").max(5000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  visitDate: z.string().optional().nullable(), // ISO date string
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get a review by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await getReviewById(reviewId);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Only show published reviews to non-owners
    const stackUser = await stackServerApp.getUser();
    const user = stackUser ? await getUserByStackAuthId(stackUser.id) : null;

    if (review.status !== "published" && review.userId !== user?.id) {
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

// PATCH - Update own review
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Check authentication
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to update a review" },
        { status: 401 }
      );
    }

    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Get the review and verify ownership
    const review = await getReviewById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only update your own reviews" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = updateReviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, body: reviewBody, rating, visitDate } = result.data;

    // Update the review (editing resets status to pending)
    const updatedReview = await updateReview(reviewId, {
      ...(title !== undefined && { title }),
      ...(reviewBody !== undefined && { body: reviewBody }),
      ...(rating !== undefined && { rating }),
      ...(visitDate !== undefined && {
        visitDate: visitDate ? new Date(visitDate) : null,
      }),
      status: "pending", // Reset to pending for re-moderation
    });

    // Update place stats (async)
    updatePlaceReviewStats(review.placeId).catch((err) => {
      console.error("Failed to update place review stats:", err);
    });

    return NextResponse.json({
      success: true,
      message: "Your review has been updated and is pending moderation",
      review: {
        id: updatedReview.id,
        status: updatedReview.status,
      },
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE - Delete own review
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Check authentication
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to delete a review" },
        { status: 401 }
      );
    }

    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Get the review and verify ownership
    const review = await getReviewById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only delete your own reviews" },
        { status: 403 }
      );
    }

    const placeId = review.placeId;

    // Delete the review
    await deleteReview(reviewId);

    // Update place stats (async)
    updatePlaceReviewStats(placeId).catch((err) => {
      console.error("Failed to update place review stats:", err);
    });

    return NextResponse.json({
      success: true,
      message: "Your review has been deleted",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
