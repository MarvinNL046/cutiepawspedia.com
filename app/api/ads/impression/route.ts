/**
 * Ad Impression Tracking API
 *
 * POST /api/ads/impression
 * Records when an ad is viewed on the page.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { adImpressions, adCampaigns } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { AdPlacementType } from "@/db/queries/ads";

const impressionSchema = z.object({
  campaignId: z.number().int().positive(),
  placement: z.enum([
    "blog_sidebar",
    "blog_inline",
    "directory_sidebar",
    "search_results",
    "homepage_featured",
  ]),
  pageUrl: z.string().url().optional(),
  locale: z.string().max(5).optional(),
  sessionId: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = impressionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { campaignId, placement, pageUrl, locale, sessionId } = result.data;

    // Get user agent and country from headers
    const userAgent = request.headers.get("user-agent") || undefined;
    const ipCountry = request.headers.get("cf-ipcountry") || undefined;

    // Insert impression and get ID back
    const [impression] = await db
      .insert(adImpressions)
      .values({
        campaignId,
        placement: placement as AdPlacementType,
        pageUrl,
        locale,
        sessionId,
        userAgent,
        ipCountry,
      })
      .returning({ id: adImpressions.id });

    // Increment campaign impressions counter
    await db
      .update(adCampaigns)
      .set({
        impressions: sql`${adCampaigns.impressions} + 1`,
      })
      .where(eq(adCampaigns.id, campaignId));

    return NextResponse.json({ success: true, impressionId: impression.id });
  } catch (error) {
    console.error("Impression tracking error:", error);
    return NextResponse.json(
      { error: "Failed to record impression" },
      { status: 500 }
    );
  }
}
