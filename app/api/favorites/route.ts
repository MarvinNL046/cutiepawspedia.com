/**
 * Favorites API
 *
 * API for managing user favorites
 * POST /api/favorites - Add a place to favorites
 * DELETE /api/favorites - Remove a place from favorites
 * GET /api/favorites - Get all favorites for the current user
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  addFavorite,
  removeFavorite,
  getFavoritesForUser,
  isFavorite,
} from "@/db/queries/favorites";
import { getPlaceById } from "@/db/queries";

// Request schema for adding/removing favorites
const favoriteSchema = z.object({
  placeId: z.number().int().positive(),
});

/**
 * GET - Get all favorites for the current user
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
        { error: "You must be logged in to view favorites" },
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

    // Get favorites
    const favorites = await getFavoritesForUser(user);

    return NextResponse.json({
      favorites,
      count: favorites.length,
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

/**
 * POST - Add a place to favorites
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
      return NextResponse.json(
        { error: "You must be logged in to add favorites" },
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
    const result = favoriteSchema.safeParse(body);

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

    // Check if already favorited
    const alreadyFavorited = await isFavorite(user, placeId);
    if (alreadyFavorited) {
      return NextResponse.json(
        {
          success: true,
          message: "Place is already in favorites",
          isFavorite: true,
        },
        { status: 200 }
      );
    }

    // Add to favorites
    const success = await addFavorite(user, placeId);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to add favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Place added to favorites",
        isFavorite: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove a place from favorites
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
        { error: "You must be logged in to remove favorites" },
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
    const result = favoriteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { placeId } = result.data;

    // Remove from favorites (no need to check if exists, DELETE is idempotent)
    const success = await removeFavorite(user, placeId);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to remove favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Place removed from favorites",
      isFavorite: false,
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite. Please try again." },
      { status: 500 }
    );
  }
}
