/**
 * API: Get places by city with pagination
 *
 * GET /api/places/by-city?cityId=4&offset=0&limit=12
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { places, placeCategories, categories } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityId = searchParams.get("cityId");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 50);

  if (!cityId) {
    return NextResponse.json({ error: "cityId is required" }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    // Get places with their categories
    const cityIdNum = parseInt(cityId, 10);

    const results = await db.query.places.findMany({
      where: eq(places.cityId, cityIdNum),
      orderBy: [desc(places.avgRating), desc(places.reviewCount)],
      limit,
      offset,
      with: {
        placeCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(places)
      .where(eq(places.cityId, cityIdNum));

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      places: results,
      total,
      hasMore: offset + results.length < total,
    });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
