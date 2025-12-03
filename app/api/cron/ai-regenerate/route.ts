/**
 * AI Content Regeneration Cron Endpoint
 *
 * Scheduled job for regenerating stale/outdated AI content.
 * Run via Vercel cron every 6 hours.
 *
 * Security:
 * - Protected by CRON_SECRET header
 * - Rate-limited to prevent runaway costs
 *
 * Vercel cron config: schedule "0 every-6-hours * * *"
 */

import { NextResponse } from "next/server";
import { generateContent, generateCacheKey, type ContentData } from "@/lib/ai/generateContent";
import type { AiContentType } from "@/db/schema/ai";
import type { ContentLocale } from "@/lib/seo/aiContent";
import {
  getStaleContent,
  getQueueItems,
  updateQueueStatus,
  cleanupQueue,
  markOutdatedVersionsStale,
} from "@/db/queries/aiContent";
import { AI_MAX_GENERATIONS_PER_CRON, AI_ENABLED } from "@/lib/ai/version";
import { logAuditEvent } from "@/db/queries/auditLogs";

// ============================================================================
// CRON SECRET VERIFICATION
// ============================================================================

const CRON_SECRET = process.env.CRON_SECRET;

function verifyCronSecret(request: Request): boolean {
  // In development, allow without secret
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${CRON_SECRET}`) {
    return true;
  }

  // Check Vercel cron header
  const vercelCronHeader = request.headers.get("x-vercel-cron");
  if (vercelCronHeader === "true" && CRON_SECRET) {
    return true;
  }

  return false;
}

// ============================================================================
// MAIN CRON HANDLER
// ============================================================================

export async function GET(request: Request) {
  // Verify cron secret
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if AI is enabled
  if (!AI_ENABLED) {
    return NextResponse.json({
      success: true,
      message: "AI content generation is disabled",
      processed: 0,
    });
  }

  const startTime = Date.now();
  const results: {
    success: number;
    failed: number;
    skipped: number;
    errors: string[];
  } = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  try {
    // 1. Mark all outdated versions as stale
    const markedStale = await markOutdatedVersionsStale();
    console.log(`Marked ${markedStale} items as stale due to version mismatch`);

    // 2. Process queue items first (higher priority)
    const queueItems = await getQueueItems(Math.floor(AI_MAX_GENERATIONS_PER_CRON / 2));

    for (const item of queueItems) {
      try {
        await updateQueueStatus(item.id, "processing");

        // Parse the cache key to extract type and data
        const parsed = parseCacheKey(item.cacheKey);

        if (!parsed) {
          await updateQueueStatus(item.id, "failed", "Invalid cache key format");
          results.failed++;
          continue;
        }

        // Regenerate content - prefer contextData if provided, fallback to parsed data
        const contentData = item.contextData
          ? (item.contextData as unknown as ContentData)
          : parsed.data;

        await generateContent({
          type: parsed.type,
          locale: parsed.locale as ContentLocale,
          data: contentData,
          force: true,
        });

        await updateQueueStatus(item.id, "completed");
        results.success++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        await updateQueueStatus(item.id, "failed", errorMessage);
        results.failed++;
        results.errors.push(`Queue ${item.id}: ${errorMessage}`);
      }
    }

    // 3. Process stale content
    const remainingSlots = AI_MAX_GENERATIONS_PER_CRON - results.success - results.failed;

    if (remainingSlots > 0) {
      const staleItems = await getStaleContent(remainingSlots);

      for (const item of staleItems) {
        try {
          // Parse the cache key
          const parsed = parseCacheKey(item.key);

          if (!parsed) {
            results.skipped++;
            continue;
          }

          // Regenerate content
          await generateContent({
            type: parsed.type,
            locale: parsed.locale as ContentLocale,
            data: parsed.data,
            force: true,
          });

          results.success++;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          results.failed++;
          results.errors.push(`Stale ${item.key}: ${errorMessage}`);
        }
      }
    }

    // 4. Clean up old queue items
    const cleanedUp = await cleanupQueue(7);

    // 5. Log audit event
    logAuditEvent({
      actorRole: "system",
      eventType: "BUSINESS_STATUS_CHANGED", // Reusing existing event type
      targetType: "business", // Using business as generic target
      metadata: {
        action: "ai_regeneration_cron",
        success: results.success,
        failed: results.failed,
        skipped: results.skipped,
        cleanedUp,
        durationMs: Date.now() - startTime,
      },
    });

    return NextResponse.json({
      success: true,
      processed: results.success + results.failed + results.skipped,
      results: {
        success: results.success,
        failed: results.failed,
        skipped: results.skipped,
        cleanedUp,
      },
      durationMs: Date.now() - startTime,
      errors: results.errors.length > 0 ? results.errors.slice(0, 10) : undefined,
    });
  } catch (error) {
    console.error("AI regeneration cron failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        results,
        durationMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// CACHE KEY PARSING
// ============================================================================

/**
 * Parse a cache key back into type and data
 *
 * Key formats:
 * - country:netherlands:nl
 * - city:amsterdam:netherlands:nl
 * - category:veterinary:netherlands:nl
 * - place:pets-place:amsterdam:netherlands:nl
 * - combo:veterinary:amsterdam:netherlands:nl
 * - best:veterinary:amsterdam:netherlands:nl (city level)
 * - best:veterinary:netherlands:nl (country level)
 * - top:veterinary:netherlands:nl
 */
function parseCacheKey(
  key: string
): { type: AiContentType; locale: string; data: ContentData } | null {
  const parts = key.split(":");

  if (parts.length < 3) return null;

  const type = parts[0] as AiContentType;
  const locale = parts[parts.length - 1];

  switch (type) {
    case "country":
      // country:netherlands:nl
      if (parts.length !== 3) return null;
      return {
        type,
        locale,
        data: {
          countryName: parts[1],
          countrySlug: parts[1],
          totalCities: 0,
          totalPlaces: 0,
        },
      };

    case "city":
      // city:amsterdam:netherlands:nl
      if (parts.length !== 4) return null;
      return {
        type,
        locale,
        data: {
          cityName: parts[1],
          citySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          totalPlaces: 0,
        },
      };

    case "category":
      // category:veterinary:netherlands:nl
      if (parts.length !== 4) return null;
      return {
        type,
        locale,
        data: {
          categoryName: parts[1],
          categorySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          totalPlaces: 0,
        },
      };

    case "place":
      // place:pets-place:amsterdam:netherlands:nl
      if (parts.length !== 5) return null;
      return {
        type,
        locale,
        data: {
          placeName: parts[1],
          placeSlug: parts[1],
          cityName: parts[2],
          citySlug: parts[2],
          countryName: parts[3],
          countrySlug: parts[3],
          categories: [],
        },
      };

    case "combo":
      // combo:veterinary:amsterdam:netherlands:nl
      if (parts.length !== 5) return null;
      return {
        type,
        locale,
        data: {
          categoryName: parts[1],
          categorySlug: parts[1],
          cityName: parts[2],
          citySlug: parts[2],
          countryName: parts[3],
          countrySlug: parts[3],
          totalPlaces: 0,
        },
      };

    case "best":
      // best:veterinary:amsterdam:netherlands:nl (city)
      // best:veterinary:netherlands:nl (country)
      if (parts.length === 4) {
        // Country level
        return {
          type,
          locale,
          data: {
            categoryName: parts[1],
            categorySlug: parts[1],
            countryName: parts[2],
            countrySlug: parts[2],
            totalRanked: 0,
          },
        };
      } else if (parts.length === 5) {
        // City level
        return {
          type,
          locale,
          data: {
            categoryName: parts[1],
            categorySlug: parts[1],
            cityName: parts[2],
            citySlug: parts[2],
            countryName: parts[3],
            countrySlug: parts[3],
            totalRanked: 0,
          },
        };
      }
      return null;

    case "top":
      // top:veterinary:netherlands:nl
      if (parts.length !== 4) return null;
      return {
        type,
        locale,
        data: {
          categoryName: parts[1],
          categorySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          topCount: 10,
        },
      };

    default:
      return null;
  }
}

// ============================================================================
// POST HANDLER (for manual triggers)
// ============================================================================

export async function POST(request: Request) {
  // Verify authorization
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delegate to GET handler
  return GET(request);
}
