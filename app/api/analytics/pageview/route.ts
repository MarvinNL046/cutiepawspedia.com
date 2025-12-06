/**
 * Page View Tracking API
 *
 * Records page views for analytics. Privacy-safe.
 */

import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/db/queries/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      placeId,
      businessId,
      sessionId,
      source,
      referrer,
      deviceType,
      locale,
    } = body;

    // Validate required fields
    if (!placeId || typeof placeId !== "number") {
      return NextResponse.json(
        { error: "placeId is required" },
        { status: 400 }
      );
    }

    // Record the page view
    await recordPageView({
      placeId,
      businessId: businessId || null,
      sessionId: sessionId || null,
      source: source || null,
      referrer: referrer || null,
      deviceType: deviceType || null,
      locale: locale || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording page view:", error);
    // Return success anyway - don't expose errors for analytics
    return NextResponse.json({ success: true });
  }
}
