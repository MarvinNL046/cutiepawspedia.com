/**
 * Countries API
 *
 * GET /api/locations/countries
 * Returns all countries for location selection
 */

import { NextResponse } from "next/server";
import { getCountries } from "@/db/queries/locations";

export async function GET() {
  try {
    const countries = await getCountries();

    return NextResponse.json({ countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
