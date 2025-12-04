/**
 * Admin Place Quality API
 *
 * POST /api/admin/places/[id]/quality - Recalculate quality score
 * GET /api/admin/places/[id]/quality - Get quality details
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { places } from "@/db/schema/directory";
import { computeAndUpdatePlaceQuality } from "@/db/queries/dataQuality";
import { getFlagDescription } from "@/lib/dataQuality";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const placeId = parseInt(id, 10);
    if (isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Get current quality data
    const [place] = await db
      .select({
        id: places.id,
        name: places.name,
        dataQualityScore: places.dataQualityScore,
        dataQualityFlags: places.dataQualityFlags,
        lastRefreshedAt: places.lastRefreshedAt,
        status: places.status,
        statusLastCheckedAt: places.statusLastCheckedAt,
      })
      .from(places)
      .where(eq(places.id, placeId))
      .limit(1);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Add human-readable flag descriptions
    const flags = (place.dataQualityFlags as string[] || []).map((flag) => ({
      flag,
      description: getFlagDescription(flag as any),
    }));

    return NextResponse.json({
      id: place.id,
      name: place.name,
      score: place.dataQualityScore,
      flags,
      lastRefreshedAt: place.lastRefreshedAt,
      status: place.status,
      statusLastCheckedAt: place.statusLastCheckedAt,
    });
  } catch (error) {
    console.error("Admin get quality error:", error);
    return NextResponse.json(
      { error: "Failed to get quality" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const placeId = parseInt(id, 10);
    if (isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
    }

    // Recalculate quality score
    const result = await computeAndUpdatePlaceQuality(placeId);

    return NextResponse.json({
      success: true,
      placeId,
      score: result.score,
      flags: result.flags,
    });
  } catch (error) {
    console.error("Admin recalculate quality error:", error);
    return NextResponse.json(
      { error: "Failed to recalculate quality" },
      { status: 500 }
    );
  }
}
