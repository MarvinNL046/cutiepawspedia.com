/**
 * Search Places API for Onboarding (Claim Business)
 *
 * GET /api/onboarding/search-places?q=query&countryId=X
 * Returns places matching the search query that can be claimed
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { places, cities, countries } from "@/db/schema/directory";
import { eq, and, ilike, isNull } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const countryId = searchParams.get("countryId");

    if (!query || query.length < 2) {
      return NextResponse.json({ places: [] });
    }

    if (!db) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 500 }
      );
    }

    // Build query conditions
    const conditions = [ilike(places.name, `%${query}%`)];

    // If countryId provided, filter by country
    if (countryId && !isNaN(parseInt(countryId))) {
      conditions.push(eq(cities.countryId, parseInt(countryId)));
    }

    // Search for places
    const results = await db
      .select({
        id: places.id,
        name: places.name,
        cityName: cities.name,
        businessId: places.businessId,
      })
      .from(places)
      .leftJoin(cities, eq(places.cityId, cities.id))
      .where(and(...conditions))
      .limit(20);

    // Map results with hasOwner flag
    const placesWithOwnership = results.map((place) => ({
      id: place.id,
      name: place.name,
      cityName: place.cityName || "Unknown",
      hasOwner: place.businessId !== null,
    }));

    return NextResponse.json({ places: placesWithOwnership });
  } catch (error) {
    console.error("Error searching places:", error);
    return NextResponse.json(
      { error: "Failed to search places" },
      { status: 500 }
    );
  }
}
