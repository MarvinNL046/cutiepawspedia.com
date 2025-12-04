/**
 * Recent Views API
 *
 * API for tracking user's recently viewed places
 * POST /api/recent-views - Record a place view
 * GET /api/recent-views - Get recently viewed places
 * DELETE /api/recent-views - Clear recent views history
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  addRecentView,
  getRecentViewsForUser,
  clearRecentViews,
  removeRecentView,
} from "@/db/queries/recentViews";
import { getPlaceById } from "@/db/queries";

// Request schema
const recentViewSchema = z.object({
  placeId: z.number().int().positive(),
});

const getQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

/**
 * GET - Get recently viewed places for the current user
 */
export async function GET(request: NextRequest) {
  try {
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
        { error: "You must be logged in to view recent history" },
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

    // Parse query params
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    // Get recent views
    const recentViews = await getRecentViewsForUser(user, Math.min(limit, 50));

    return NextResponse.json({
      recentViews,
      count: recentViews.length,
    });
  } catch (error) {
    console.error("Error fetching recent views:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent views" },
      { status: 500 }
    );
  }
}

/**
 * POST - Record a place view
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      // For recent views, we silently accept anonymous users but don't track
      return NextResponse.json({
        success: true,
        message: "View not tracked for anonymous users",
        tracked: false,
      });
    }

    // Get our internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "View not tracked - user account not found",
        tracked: false,
      });
    }

    // Parse and validate request body
    const body = await request.json();
    const result = recentViewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { placeId } = result.data;

    // Check if place exists
    const place = await getPlaceById(placeId);
    if (!place) {
      return NextResponse.json(
        { error: "Place not found" },
        { status: 404 }
      );
    }

    // Record the view (upsert behavior - updates viewedAt if exists)
    const success = await addRecentView(user, placeId);

    return NextResponse.json({
      success,
      message: success ? "View recorded" : "Failed to record view",
      tracked: success,
    });
  } catch (error) {
    console.error("Error recording view:", error);
    // Don't fail the page view if tracking fails
    return NextResponse.json({
      success: false,
      message: "Failed to record view",
      tracked: false,
    });
  }
}

/**
 * DELETE - Clear recent views or remove a single view
 * Body: { placeId?: number } - if placeId provided, removes single view; otherwise clears all
 */
export async function DELETE(request: NextRequest) {
  try {
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
        { error: "You must be logged in to clear history" },
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

    // Check if body contains placeId for single removal
    let body: { placeId?: number } = {};
    try {
      body = await request.json();
    } catch {
      // Empty body means clear all
    }

    let success: boolean;
    let message: string;

    if (body.placeId) {
      // Remove single view
      success = await removeRecentView(user, body.placeId);
      message = success ? "View removed from history" : "Failed to remove view";
    } else {
      // Clear all views
      success = await clearRecentViews(user);
      message = success ? "Recent views cleared" : "Failed to clear recent views";
    }

    return NextResponse.json({
      success,
      message,
    });
  } catch (error) {
    console.error("Error clearing recent views:", error);
    return NextResponse.json(
      { error: "Failed to clear recent views. Please try again." },
      { status: 500 }
    );
  }
}
