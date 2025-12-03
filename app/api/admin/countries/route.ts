import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess, logAdminAction } from "@/lib/auth/admin-api";
import { createCountry, getCountriesWithStats } from "@/db/queries/admin";
import { createCountrySchema } from "@/lib/validations/admin";

// GET /api/admin/countries - List all countries
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const countries = await getCountriesWithStats();
    return NextResponse.json({ countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}

// POST /api/admin/countries - Create a country
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAccess(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const validated = createCountrySchema.parse(body);

    const country = await createCountry(validated);

    await logAdminAction("CREATE", "country", country.id, auth.user.id, {
      name: country.name,
      code: country.code,
    });

    return NextResponse.json({ country }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating country:", error);
    return NextResponse.json(
      { error: "Failed to create country" },
      { status: 500 }
    );
  }
}
