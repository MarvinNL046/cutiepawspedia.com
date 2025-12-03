/**
 * Trust Badges Recomputation API
 *
 * POST /api/badges/recompute - Trigger badge recomputation
 *
 * Options:
 * - mode: "all" | "recent" (default: "recent")
 * - hours: number (for recent mode, default: 24)
 *
 * Security: Requires revalidation secret or admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { recomputeAllBadges, recomputeRecentBadges } from "@/lib/trustBadges";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Authenticate - either via secret or admin session
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Check secret token
    if (!REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Revalidation secret not configured" },
        { status: 500 }
      );
    }

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse options
    const body = await request.json().catch(() => ({}));
    const mode = body.mode || "recent";
    const hours = body.hours || 24;

    let result: { processed: number; updated: number };

    if (mode === "all") {
      result = await recomputeAllBadges();
    } else {
      result = await recomputeRecentBadges(hours);
    }

    return NextResponse.json({
      success: true,
      mode,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Badge recomputation error:", error);
    return NextResponse.json(
      { error: "Failed to recompute badges" },
      { status: 500 }
    );
  }
}

/**
 * GET for easy cron job triggering
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const mode = searchParams.get("mode") || "recent";
  const hours = parseInt(searchParams.get("hours") || "24");

  // Check secret token
  if (!REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: "Revalidation secret not configured" },
      { status: 500 }
    );
  }

  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let result: { processed: number; updated: number };

    if (mode === "all") {
      result = await recomputeAllBadges();
    } else {
      result = await recomputeRecentBadges(hours);
    }

    return NextResponse.json({
      success: true,
      mode,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Badge recomputation error:", error);
    return NextResponse.json(
      { error: "Failed to recompute badges" },
      { status: 500 }
    );
  }
}
