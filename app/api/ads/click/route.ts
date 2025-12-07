/**
 * Ad Click Tracking API
 *
 * POST /api/ads/click
 * Records when a user clicks on an ad.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordClick } from "@/db/queries/ads";

const clickSchema = z.object({
  impressionId: z.number().int().positive(),
  campaignId: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = clickSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { impressionId, campaignId } = result.data;

    await recordClick(impressionId, campaignId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Click tracking error:", error);
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}
