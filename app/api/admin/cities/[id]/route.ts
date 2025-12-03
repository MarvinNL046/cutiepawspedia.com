import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getCityById, updateCity, deleteCity } from "@/db/queries/admin";
import { updateCitySchema } from "@/lib/validations/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/cities/[id] - Get a single city
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const cityId = parseInt(id, 10);

  if (isNaN(cityId)) {
    return NextResponse.json({ error: "Invalid city ID" }, { status: 400 });
  }

  try {
    const city = await getCityById(cityId);

    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json({ city });
  } catch (error) {
    console.error("Error fetching city:", error);
    return NextResponse.json(
      { error: "Failed to fetch city" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/cities/[id] - Update a city
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const cityId = parseInt(id, 10);

  if (isNaN(cityId)) {
    return NextResponse.json({ error: "Invalid city ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validated = updateCitySchema.parse(body);

    const city = await updateCity(cityId, {
      ...validated,
      lat: validated.lat?.toString() ?? null,
      lng: validated.lng?.toString() ?? null,
    });

    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    await logAdminAction("UPDATE", "city", cityId, auth.user.id, validated);

    return NextResponse.json({ city });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating city:", error);
    return NextResponse.json(
      { error: "Failed to update city" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/cities/[id] - Delete a city
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const cityId = parseInt(id, 10);

  if (isNaN(cityId)) {
    return NextResponse.json({ error: "Invalid city ID" }, { status: 400 });
  }

  try {
    await deleteCity(cityId);

    await logAdminAction("DELETE", "city", cityId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting city:", error);
    return NextResponse.json(
      { error: "Failed to delete city. It may have places associated with it." },
      { status: 500 }
    );
  }
}
