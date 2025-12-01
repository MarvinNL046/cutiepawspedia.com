/**
 * Analytics Tracking API Endpoint
 *
 * Receives and processes analytics events from the client.
 * Currently logs events; can be extended to store in database
 * or forward to external analytics services.
 *
 * @see docs/analytics-events.md for event documentation
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Event schema validation
const eventSchema = z.object({
  event: z.enum([
    "page_view",
    "search",
    "map_toggle",
    "premium_click",
    "affiliate_click",
    "lead_submitted",
    "place_view",
    "category_view",
    "outbound_link",
  ]),
  properties: z.record(z.string(), z.unknown()),
  timestamp: z.number(),
  url: z.string(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
});

// In-memory event buffer for batch processing (optional future enhancement)
// For production, consider using Redis or a database
const eventBuffer: z.infer<typeof eventSchema>[] = [];
const MAX_BUFFER_SIZE = 1000;

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON body and sendBeacon blob
    const contentType = request.headers.get("content-type") || "";
    let body: unknown;

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("text/plain")) {
      const text = await request.text();
      body = JSON.parse(text);
    } else {
      // Try to parse as JSON anyway (sendBeacon with blob)
      try {
        body = await request.json();
      } catch {
        return new NextResponse(null, { status: 204 });
      }
    }

    const result = eventSchema.safeParse(body);

    if (!result.success) {
      // Silently accept malformed events in production
      // to avoid breaking user experience
      if (process.env.NODE_ENV === "development") {
        console.warn("[Analytics] Invalid event:", result.error.issues);
      }
      return new NextResponse(null, { status: 204 });
    }

    const event = result.data;

    // Log event in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${event.event}:`, event.properties);
    }

    // Add to buffer (for future batch processing)
    if (eventBuffer.length < MAX_BUFFER_SIZE) {
      eventBuffer.push(event);
    }

    // TODO: Future enhancements
    // - Store events in database (analytics_events table)
    // - Forward to Vercel Analytics or other services
    // - Aggregate metrics for dashboard
    // - Send to data warehouse (BigQuery, Snowflake, etc.)

    // Process specific event types for real-time tracking
    await processEvent(event);

    // Return 204 No Content for successful tracking
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Never fail analytics - just log and return success
    if (process.env.NODE_ENV === "development") {
      console.error("[Analytics] Error processing event:", error);
    }
    return new NextResponse(null, { status: 204 });
  }
}

/**
 * Process specific event types for real-time actions
 */
async function processEvent(event: z.infer<typeof eventSchema>): Promise<void> {
  switch (event.event) {
    case "premium_click":
      // Could increment premium click counter in database
      // await incrementPremiumClicks(event.properties.placeId);
      break;

    case "affiliate_click":
      // Could track affiliate performance
      // await trackAffiliateClick(event.properties);
      break;

    case "lead_submitted":
      // Lead is already tracked in /api/leads, but this provides additional context
      break;

    case "search":
      // Could track popular search terms
      // await trackSearchTerm(event.properties.query);
      break;

    default:
      // Standard event - no special processing needed
      break;
  }
}

/**
 * GET endpoint for retrieving aggregated analytics (future use)
 * Protected - requires authentication
 */
export async function GET(request: NextRequest) {
  // For now, return basic stats from the buffer
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // TODO: Add authentication check here
  // if (!isAuthenticated(request)) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  if (type === "buffer-stats") {
    // Return buffer statistics (development only)
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Not available" }, { status: 404 });
    }

    const eventCounts = eventBuffer.reduce(
      (acc, event) => {
        acc[event.event] = (acc[event.event] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      bufferSize: eventBuffer.length,
      maxSize: MAX_BUFFER_SIZE,
      eventCounts,
    });
  }

  return NextResponse.json({
    message: "Analytics API",
    endpoints: {
      "POST /api/track": "Track analytics events",
      "GET /api/track?type=buffer-stats": "Get buffer statistics (dev only)",
    },
  });
}
