/**
 * Review Replies API
 *
 * GET /api/reviews/[id]/replies - Get replies for a review
 * POST /api/reviews/[id]/replies - Add a reply (business owner or admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessByUserId } from "@/db/queries/businesses";
import {
  getReviewById,
  getRepliesForReview,
  createReviewReply,
} from "@/db/queries/reviews";

// Create reply schema
const createReplySchema = z.object({
  body: z.string().min(5, "Reply must be at least 5 characters").max(2000),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get replies for a review
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id, 10);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Check if review exists
    const review = await getReviewById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const replies = await getRepliesForReview(reviewId);

    return NextResponse.json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}

// POST - Add a reply to a review (business owner or admin only)
export async function POST(request: NextRequest, { params }: RouteParams) {
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
        { error: "You must be logged in to reply to a review" },
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

    // Get the review
    const review = await getReviewById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Determine if user can reply
    let authorType: "business" | "admin";

    if (user.role === "admin") {
      // Admin can reply to any review
      authorType = "admin";
    } else {
      // Check if user owns a business that owns the reviewed place
      const business = await getBusinessByUserId(user.id);
      if (!business) {
        return NextResponse.json(
          { error: "Only business owners or admins can reply to reviews" },
          { status: 403 }
        );
      }

      // Check if the business owns the place being reviewed
      if (review.businessId !== business.id) {
        return NextResponse.json(
          { error: "You can only reply to reviews of your own business" },
          { status: 403 }
        );
      }

      authorType = "business";
    }

    // Parse and validate request body
    const body = await request.json();
    const result = createReplySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    // Create the reply
    const reply = await createReviewReply({
      reviewId,
      authorType,
      authorUserId: user.id,
      body: result.data.body,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reply posted successfully",
        reply: {
          id: reply.id,
          authorType: reply.authorType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}
