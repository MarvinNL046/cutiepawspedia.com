/**
 * Reviews API
 *
 * Public API for submitting and viewing reviews
 * POST /api/reviews - Submit a new review (authenticated users only)
 * GET /api/reviews?placeId=X - Get published reviews for a place
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  createReview,
  getReviewsForPlace,
  hasUserReviewedPlace,
  updatePlaceReviewStats,
  type ReviewFilterOptions,
} from "@/db/queries/reviews";
import { getPlaceById } from "@/db/queries";
import { getClientIP, reviewsRateLimiter, rateLimitExceededResponse } from "@/lib/rateLimit";
import { hashIP } from "@/lib/utils/hash";

// Review submission schema
const createReviewSchema = z.object({
  placeId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(255).optional().nullable(),
  body: z.string().min(10, "Review must be at least 10 characters").max(5000),
  visitDate: z.string().optional().nullable(), // ISO date string
  locale: z.string().max(10).default("en"),
});

// GET - Get reviews for a place
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        { error: "placeId is required" },
        { status: 400 }
      );
    }

    const parsedPlaceId = parseInt(placeId, 10);
    if (isNaN(parsedPlaceId)) {
      return NextResponse.json(
        { error: "Invalid placeId" },
        { status: 400 }
      );
    }

    // Parse filter options
    const options: ReviewFilterOptions = {
      limit: Math.min(parseInt(searchParams.get("limit") || "20", 10), 100),
      offset: parseInt(searchParams.get("offset") || "0", 10),
      orderBy: (searchParams.get("orderBy") as ReviewFilterOptions["orderBy"]) || "newest",
      minRating: searchParams.get("minRating")
        ? parseInt(searchParams.get("minRating")!, 10)
        : undefined,
      maxRating: searchParams.get("maxRating")
        ? parseInt(searchParams.get("maxRating")!, 10)
        : undefined,
      status: "published", // Only show published reviews publicly
    };

    const reviews = await getReviewsForPlace(parsedPlaceId, options);

    return NextResponse.json({
      reviews,
      count: reviews.length,
      offset: options.offset,
      limit: options.limit,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 3 reviews per hour per IP
    const clientIP = getClientIP(request);
    const rateLimitResult = await reviewsRateLimiter(clientIP);

    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for reviews from IP: ${clientIP}`);
      return rateLimitExceededResponse(
        "Too many review submissions. Please wait before trying again."
      );
    }

    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to submit a review" },
        { status: 401 }
      );
    }

    // Get our internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = createReviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { placeId, rating, title, body: reviewBody, visitDate, locale } = result.data;

    // Check if place exists
    const place = await getPlaceById(placeId);
    if (!place) {
      return NextResponse.json(
        { error: "Place not found" },
        { status: 404 }
      );
    }

    // Check if user has already reviewed this place
    const hasReviewed = await hasUserReviewedPlace(user.id, placeId);
    if (hasReviewed) {
      return NextResponse.json(
        { error: "You have already reviewed this place" },
        { status: 409 }
      );
    }

    // Create the review
    const review = await createReview({
      placeId,
      userId: user.id,
      businessId: place.businessId ?? null,
      rating,
      title: title ?? null,
      body: reviewBody,
      locale,
      visitDate: visitDate ? new Date(visitDate) : null,
      ipHash: hashIP(clientIP),
    });

    // Update place aggregation (async, don't wait)
    updatePlaceReviewStats(placeId).catch((err) => {
      console.error("Failed to update place review stats:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your review has been submitted and is pending moderation",
        review: {
          id: review.id,
          status: review.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
