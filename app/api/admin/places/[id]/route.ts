import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getPlaceByIdForAdmin, updatePlaceAdmin, togglePlaceVerified, togglePlacePremium } from "@/db/queries/admin";
import { placeAdminUpdateSchema } from "@/lib/validations/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/places/[id] - Get a single place with full details
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const placeId = parseInt(id, 10);

  if (isNaN(placeId)) {
    return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
  }

  try {
    const place = await getPlaceByIdForAdmin(placeId);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json({ place });
  } catch (error) {
    console.error("Error fetching place:", error);
    return NextResponse.json(
      { error: "Failed to fetch place" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/places/[id] - Update a place (including moderation)
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const placeId = parseInt(id, 10);

  if (isNaN(placeId)) {
    return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validated = placeAdminUpdateSchema.parse(body);

    // Convert lat/lng from number to string for database
    const updateData = {
      ...validated,
      lat: validated.lat !== undefined ? (validated.lat?.toString() ?? null) : undefined,
      lng: validated.lng !== undefined ? (validated.lng?.toString() ?? null) : undefined,
    };

    const place = await updatePlaceAdmin(placeId, updateData);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    await logAdminAction("UPDATE", "place", placeId, auth.user.id, validated);

    return NextResponse.json({ place });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating place:", error);
    return NextResponse.json(
      { error: "Failed to update place" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/places/[id] - Moderation actions (toggle verified, premium, etc.)
export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const placeId = parseInt(id, 10);

  if (isNaN(placeId)) {
    return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, ...params } = body;

    let place;

    switch (action) {
      case "toggleVerified":
        place = await togglePlaceVerified(placeId, params.isVerified);
        await logAdminAction(
          params.isVerified ? "VERIFY" : "UNVERIFY",
          "place",
          placeId,
          auth.user.id
        );
        break;

      case "togglePremium":
        place = await togglePlacePremium(
          placeId,
          params.isPremium,
          params.premiumUntil ? new Date(params.premiumUntil) : null
        );
        await logAdminAction(
          params.isPremium ? "SET_PREMIUM" : "REMOVE_PREMIUM",
          "place",
          placeId,
          auth.user.id,
          { premiumUntil: params.premiumUntil }
        );
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    return NextResponse.json({ place });
  } catch (error) {
    console.error("Error moderating place:", error);
    return NextResponse.json(
      { error: "Failed to moderate place" },
      { status: 500 }
    );
  }
}
