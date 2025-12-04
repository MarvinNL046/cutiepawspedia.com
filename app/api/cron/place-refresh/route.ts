/**
 * Place Refresh Worker Cron API
 *
 * GET /api/cron/place-refresh?secret=XXX
 *
 * Processes queued refresh jobs - fetches fresh data from external sources
 * (Bright Data, website scraping) and updates place records.
 *
 * Should run every few minutes or hourly.
 *
 * Query params:
 * - secret: Revalidation secret (required)
 * - limit: Max jobs to process per run (default: 10)
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq, and, sql } from "drizzle-orm";
import { places, auditLogs } from "@/db/schema/directory";
import {
  getNextRefreshBatch,
  markRefreshJobInProgress,
  markRefreshJobDone,
  markRefreshJobFailed,
  type RefreshJobWithPlace,
} from "@/db/queries/refreshJobs";
import { computeAndUpdatePlaceQuality } from "@/db/queries/dataQuality";
import { updateBadgesForPlace } from "@/lib/trustBadges";
// D1.1 Enrichment modules
import {
  parseOpeningHours,
  toSimpleFormat,
  parseRatings,
  extractAboutSection,
  extractSchemaOrg,
  schemaOrgToInternalHours,
  ENRICHMENT_FLAGS,
  generateEnrichmentFlags,
  type EnrichmentFlag,
} from "@/lib/enrichment";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
const BRIGHT_DATA_API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN;
const JINA_API_KEY = process.env.JINA_API_KEY;

// ============================================================================
// TYPES
// ============================================================================

interface RefreshResult {
  success: boolean;
  updatedFields: string[];
  error?: string;
}

interface ExternalData {
  openingHours?: Record<string, string>;
  phone?: string;
  website?: string;
  email?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  status?: "active" | "temporarily_closed" | "permanently_closed";
  enrichmentFlags?: EnrichmentFlag[];
}

// ============================================================================
// EXTERNAL DATA FETCHING
// ============================================================================

/**
 * Fetch data from Bright Data SERP API
 * Searches for the business to get current info
 */
async function fetchFromBrightData(
  placeName: string,
  cityName: string | null,
  countryName: string | null
): Promise<Partial<ExternalData>> {
  if (!BRIGHT_DATA_API_TOKEN) {
    console.log("Bright Data API token not configured, skipping SERP fetch");
    return {};
  }

  try {
    const query = `${placeName} ${cityName || ""} ${countryName || ""}`.trim();

    // This is a placeholder for actual Bright Data API call
    // In production, you would:
    // 1. Call Bright Data SERP API with the business name
    // 2. Parse Google Business results for opening hours, phone, website
    // 3. Check if business is marked as closed

    console.log(`[BrightData] Would search for: ${query}`);

    // Return empty for now - implement when Bright Data is configured
    return {};
  } catch (error) {
    console.error("Bright Data fetch error:", error);
    return {};
  }
}

/**
 * Enhanced website data extraction using D1.1 enrichment modules
 */
async function fetchFromWebsite(websiteUrl: string | null): Promise<Partial<ExternalData> & { enrichmentFlags?: EnrichmentFlag[] }> {
  if (!websiteUrl || !JINA_API_KEY) {
    return {};
  }

  const enrichmentFlags: EnrichmentFlag[] = [];

  try {
    // Use Jina Reader API to fetch and parse website content
    const response = await fetch(`https://r.jina.ai/${encodeURIComponent(websiteUrl)}`, {
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log(`Jina fetch failed for ${websiteUrl}: ${response.status}`);
      enrichmentFlags.push(ENRICHMENT_FLAGS.WEBSITE_ERROR);
      return { enrichmentFlags };
    }

    const data = await response.json();
    const content = data.content || data.text || "";
    const html = data.html || "";

    if (!content || content.length < 50) {
      enrichmentFlags.push(ENRICHMENT_FLAGS.WEBSITE_NO_CONTENT);
      return { enrichmentFlags };
    }

    const result: Partial<ExternalData> & { enrichmentFlags?: EnrichmentFlag[]; description?: string } = {};

    // 1. Try Schema.org extraction first (highest priority)
    const schemaResult = html ? extractSchemaOrg(html) : null;
    if (schemaResult) {
      enrichmentFlags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_FOUND);

      // Extract from Schema.org
      if (schemaResult.aggregateRating) {
        result.rating = parseFloat(String(schemaResult.aggregateRating.ratingValue));
        result.reviewCount = parseInt(String(schemaResult.aggregateRating.reviewCount || schemaResult.aggregateRating.ratingCount), 10) || undefined;
        enrichmentFlags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_RATING);
      }

      if (schemaResult.openingHours?.length) {
        const hours = schemaOrgToInternalHours(schemaResult.openingHours);
        if (Object.keys(hours).length > 0) {
          result.openingHours = Object.fromEntries(
            Object.entries(hours).map(([day, h]) => [day, `${h.opens}-${h.closes}`])
          );
          enrichmentFlags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_HOURS);
        }
      }

      if (schemaResult.business?.telephone) {
        result.phone = schemaResult.business.telephone;
      }
      if (schemaResult.business?.email) {
        result.email = schemaResult.business.email;
      }
    }

    // 2. Parse opening hours if not found in Schema.org
    if (!result.openingHours) {
      const hoursResult = await parseOpeningHours({
        content,
        jinaApiKey: JINA_API_KEY,
        websiteUrl,
      });

      if (Object.keys(hoursResult.hours).length > 0) {
        result.openingHours = toSimpleFormat(hoursResult.hours);

        // Add source flag
        const sourceMap: Record<string, EnrichmentFlag> = {
          jina_ai: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_JINA,
          regex: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_REGEX,
          table: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_TABLE,
          list: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_REGEX,
          schema_org: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_SCHEMA,
        };
        const flag = sourceMap[hoursResult.source];
        if (flag) enrichmentFlags.push(flag);

        if (hoursResult.confidence < 60) {
          enrichmentFlags.push(ENRICHMENT_FLAGS.OPENING_HOURS_LOW_CONFIDENCE);
        }
        if (Object.keys(hoursResult.hours).length < 5) {
          enrichmentFlags.push(ENRICHMENT_FLAGS.OPENING_HOURS_INCOMPLETE);
        }
      }
    }

    // 3. Parse ratings if not found in Schema.org
    if (!result.rating) {
      const ratingResult = parseRatings({ content, html });
      if (ratingResult.rating) {
        result.rating = ratingResult.rating;
        result.reviewCount = ratingResult.reviewCount || undefined;

        // Add source flag
        const sourceMap: Record<string, EnrichmentFlag> = {
          google: ENRICHMENT_FLAGS.RATING_VIA_GOOGLE,
          facebook: ENRICHMENT_FLAGS.RATING_VIA_FACEBOOK,
          trustpilot: ENRICHMENT_FLAGS.RATING_VIA_TRUSTPILOT,
          schema_org: ENRICHMENT_FLAGS.RATING_VIA_SCHEMA,
          star_symbols: ENRICHMENT_FLAGS.RATING_VIA_STARS,
          text_pattern: ENRICHMENT_FLAGS.RATING_VIA_TEXT,
        };
        const flag = sourceMap[ratingResult.source];
        if (flag) enrichmentFlags.push(flag);
      }
    }

    // 4. Extract about section for description
    const aboutResult = await extractAboutSection({ content, html });
    if (aboutResult) {
      result.description = aboutResult.summary || aboutResult.fullText.substring(0, 500);
      enrichmentFlags.push(ENRICHMENT_FLAGS.ABOUT_SECTION_FOUND);
      if (aboutResult.summary) {
        enrichmentFlags.push(ENRICHMENT_FLAGS.ABOUT_SECTION_SUMMARIZED);
      }
      if (aboutResult.facts && Object.keys(aboutResult.facts).length > 0) {
        enrichmentFlags.push(ENRICHMENT_FLAGS.ABOUT_FACTS_EXTRACTED);
      }
    }

    // 5. Legacy parsing for phone/email if not found yet
    if (!result.phone) {
      result.phone = parsePhoneNumber(content) || undefined;
    }
    if (!result.email) {
      result.email = parseEmail(content) || undefined;
    }

    // 6. Check for closure indicators
    const isClosed = checkForClosureIndicators(content);
    if (isClosed) {
      result.status = "permanently_closed";
      enrichmentFlags.push(ENRICHMENT_FLAGS.POSSIBLY_CLOSED);
    }

    // 7. Determine enrichment status
    const hasData = result.openingHours || result.rating || result.description;
    if (hasData) {
      const isComplete = result.openingHours && result.rating && result.description;
      enrichmentFlags.push(
        isComplete ? ENRICHMENT_FLAGS.ENRICHMENT_COMPLETE : ENRICHMENT_FLAGS.ENRICHMENT_PARTIAL
      );
    }

    result.enrichmentFlags = enrichmentFlags;
    return result;
  } catch (error) {
    console.error(`Website fetch error for ${websiteUrl}:`, error);
    return { enrichmentFlags: [ENRICHMENT_FLAGS.ENRICHMENT_FAILED] };
  }
}

/**
 * Parse phone number from content
 */
function parsePhoneNumber(content: string): string | null {
  // Dutch phone patterns
  const patterns = [
    /(?:\+31|0031|0)[\s.-]?[1-9](?:[\s.-]?\d){8}/g, // Dutch
    /(?:\+\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g, // International
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[0]) {
      return match[0].replace(/[\s.-]/g, "");
    }
  }

  return null;
}

/**
 * Parse email from content
 */
function parseEmail(content: string): string | null {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const match = content.match(emailPattern);
  return match ? match[0] : null;
}

/**
 * Check for closure indicators in content
 */
function checkForClosureIndicators(content: string): boolean {
  const closurePatterns = [
    /permanent(ly)?\s*(ge)?slo(ss)?en/i,
    /definitief\s*gesloten/i,
    /closed\s*permanently/i,
    /permanently\s*closed/i,
    /niet\s*meer\s*open/i,
    /gestopt/i,
    /opgeheven/i,
  ];

  for (const pattern of closurePatterns) {
    if (pattern.test(content)) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// REFRESH ORCHESTRATION
// ============================================================================

/**
 * Process a single refresh job
 */
async function processRefreshJob(job: RefreshJobWithPlace): Promise<RefreshResult> {
  const updatedFields: string[] = [];

  if (!db) {
    return {
      success: false,
      error: "Database not available",
      updatedFields: [],
    };
  }

  try {
    // Get current place data
    const [place] = await db
      .select({
        id: places.id,
        name: places.name,
        website: places.website,
        phone: places.phone,
        email: places.email,
        openingHours: places.openingHours,
        status: places.status,
      })
      .from(places)
      .where(eq(places.id, job.placeId))
      .limit(1);

    if (!place) {
      throw new Error(`Place not found: ${job.placeId}`);
    }

    // Fetch external data in parallel
    const [brightDataResult, websiteResult] = await Promise.all([
      fetchFromBrightData(place.name, job.cityName, job.countryName),
      fetchFromWebsite(place.website),
    ]);

    // Merge results (website data takes precedence for contact info)
    const externalData: ExternalData = {
      ...brightDataResult,
      ...websiteResult,
    };

    // Build update object - only update if we have better data
    const updates: Record<string, unknown> = {};

    // Update opening hours if we found them and place doesn't have them
    if (externalData.openingHours && Object.keys(externalData.openingHours).length > 0) {
      const currentHours = place.openingHours as Record<string, string> | null;
      if (!currentHours || Object.keys(currentHours).length === 0) {
        updates.openingHours = externalData.openingHours;
        updatedFields.push("openingHours");
      }
    }

    // Update phone if missing
    if (externalData.phone && !place.phone) {
      updates.phone = externalData.phone;
      updatedFields.push("phone");
    }

    // Update email if missing
    if (externalData.email && !place.email) {
      updates.email = externalData.email;
      updatedFields.push("email");
    }

    // Update status if closure detected
    if (externalData.status && externalData.status !== place.status) {
      updates.status = externalData.status;
      updates.statusLastCheckedAt = new Date();
      updatedFields.push("status");
    }

    // Update rating if found
    if (externalData.rating && externalData.rating > 0) {
      updates.avgRating = externalData.rating;
      updatedFields.push("avgRating");
    }

    // Update review count if found
    if (externalData.reviewCount && externalData.reviewCount > 0) {
      updates.reviewCount = externalData.reviewCount;
      updatedFields.push("reviewCount");
    }

    // Update description if found and missing
    if (externalData.description) {
      updates.description = externalData.description;
      updatedFields.push("description");
    }

    // Merge enrichment flags with existing quality flags
    if (externalData.enrichmentFlags && externalData.enrichmentFlags.length > 0) {
      // Get current flags and merge with new ones
      const currentFlagsResult = await db
        .select({ flags: places.dataQualityFlags })
        .from(places)
        .where(eq(places.id, job.placeId))
        .limit(1);
      const currentFlags: string[] = Array.isArray(currentFlagsResult[0]?.flags)
        ? currentFlagsResult[0].flags
        : [];

      const mergedFlags = [...new Set([...currentFlags, ...externalData.enrichmentFlags])];
      updates.dataQualityFlags = mergedFlags;
      updatedFields.push("dataQualityFlags");
    }

    // Always update lastRefreshedAt
    updates.lastRefreshedAt = new Date();
    updates.updatedAt = new Date();

    // Apply updates
    if (Object.keys(updates).length > 0) {
      await db
        .update(places)
        .set(updates)
        .where(eq(places.id, job.placeId));
    }

    // Recompute quality score
    await computeAndUpdatePlaceQuality(job.placeId);

    // Update trust badges
    try {
      await updateBadgesForPlace(job.placeId);
    } catch (badgeError) {
      console.error(`Failed to update badges for place ${job.placeId}:`, badgeError);
    }

    return {
      success: true,
      updatedFields,
    };
  } catch (error) {
    return {
      success: false,
      updatedFields,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Authenticate
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Revalidation secret not configured" },
        { status: 500 }
      );
    }

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get jobs to process
    const jobs = await getNextRefreshBatch(limit);

    if (jobs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No jobs in queue",
        processed: 0,
        succeeded: 0,
        failed: 0,
        duration: Date.now() - startTime,
      });
    }

    // Process jobs
    let succeeded = 0;
    let failed = 0;
    const results: Array<{
      jobId: number;
      placeId: number;
      placeName: string;
      success: boolean;
      updatedFields: string[];
      error?: string;
    }> = [];

    for (const job of jobs) {
      // Mark as in progress
      await markRefreshJobInProgress(job.id);

      // Process the job
      const result = await processRefreshJob(job);

      if (result.success) {
        await markRefreshJobDone(job.id);
        succeeded++;
      } else {
        await markRefreshJobFailed(job.id, result.error || "Unknown error");
        failed++;
      }

      results.push({
        jobId: job.id,
        placeId: job.placeId,
        placeName: job.placeName,
        success: result.success,
        updatedFields: result.updatedFields,
        error: result.error,
      });

      // Log audit event for each job
      if (db) {
        await db.insert(auditLogs).values({
          actorRole: "system",
          eventType: result.success ? "PLACE_REFRESH_COMPLETED" : "PLACE_REFRESH_FAILED",
          targetType: "place",
          targetId: job.placeId.toString(),
          metadata: {
            jobId: job.id,
            reason: job.reason,
            updatedFields: result.updatedFields,
            error: result.error,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: jobs.length,
      succeeded,
      failed,
      results,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Place refresh worker error:", error);
    return NextResponse.json(
      {
        error: "Failed to process refresh jobs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
