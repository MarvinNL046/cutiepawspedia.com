/**
 * Cities API
 *
 * GET /api/locations/cities?countryId=X
 * Returns cities for a specific country
 */

import { NextRequest, NextResponse } from "next/server";
import { getCitiesByCountryId } from "@/db/queries/locations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countryId = searchParams.get("countryId");

    if (!countryId || isNaN(parseInt(countryId))) {
      return NextResponse.json(
        { error: "countryId is required" },
        { status: 400 }
      );
    }

    const cities = await getCitiesByCountryId(parseInt(countryId));

    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
