import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { getCountryById, updateCountry, deleteCountry } from "@/db/queries/admin";
import { updateCountrySchema } from "@/lib/validations/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/countries/[id] - Get a single country
export async function GET(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const countryId = parseInt(id, 10);

  if (isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country ID" }, { status: 400 });
  }

  try {
    const country = await getCountryById(countryId);

    if (!country) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    return NextResponse.json({ country });
  } catch (error) {
    console.error("Error fetching country:", error);
    return NextResponse.json(
      { error: "Failed to fetch country" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/countries/[id] - Update a country
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const countryId = parseInt(id, 10);

  if (isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validated = updateCountrySchema.parse(body);

    const country = await updateCountry(countryId, validated);

    if (!country) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    logAdminAction("UPDATE", "country", countryId, auth.user.id, validated);

    return NextResponse.json({ country });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating country:", error);
    return NextResponse.json(
      { error: "Failed to update country" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/countries/[id] - Delete a country
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const countryId = parseInt(id, 10);

  if (isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country ID" }, { status: 400 });
  }

  try {
    await deleteCountry(countryId);

    logAdminAction("DELETE", "country", countryId, auth.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json(
      { error: "Failed to delete country. It may have cities associated with it." },
      { status: 500 }
    );
  }
}
