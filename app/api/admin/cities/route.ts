import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { createCity, getCitiesWithStats } from "@/db/queries/admin";
import { createCitySchema } from "@/lib/validations/admin";

// GET /api/admin/cities - List all cities
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get("countryId");

  try {
    const cities = await getCitiesWithStats(
      countryId ? parseInt(countryId, 10) : undefined
    );
    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}

// POST /api/admin/cities - Create a city
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const validated = createCitySchema.parse(body);

    const city = await createCity({
      name: validated.name,
      slug: validated.slug,
      countryId: validated.countryId,
      lat: validated.lat?.toString() ?? null,
      lng: validated.lng?.toString() ?? null,
    });

    logAdminAction("CREATE", "city", city.id, auth.user.id, {
      name: city.name,
      countryId: city.countryId,
    });

    return NextResponse.json({ city }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating city:", error);
    return NextResponse.json(
      { error: "Failed to create city" },
      { status: 500 }
    );
  }
}
