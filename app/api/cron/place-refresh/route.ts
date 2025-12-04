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
 * Fetch and parse data from business website using Jina
 */
async function fetchFromWebsite(websiteUrl: string | null): Promise<Partial<ExternalData>> {
  if (!websiteUrl || !JINA_API_KEY) {
    return {};
  }

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
      return {};
    }

    const data = await response.json();
    const content = data.content || data.text || "";

    // Parse opening hours patterns from content
    const openingHours = parseOpeningHours(content);

    // Parse phone numbers
    const phone = parsePhoneNumber(content);

    // Parse email addresses
    const email = parseEmail(content);

    // Check for closure indicators
    const isClosed = checkForClosureIndicators(content);

    return {
      openingHours: Object.keys(openingHours).length > 0 ? openingHours : undefined,
      phone: phone || undefined,
      email: email || undefined,
      status: isClosed ? "permanently_closed" : undefined,
    };
  } catch (error) {
    console.error(`Website fetch error for ${websiteUrl}:`, error);
    return {};
  }
}

/**
 * Parse opening hours from text content
 */
function parseOpeningHours(content: string): Record<string, string> {
  const hours: Record<string, string> = {};

  // Common patterns for opening hours
  const patterns = [
    // Dutch patterns
    /(?:maandag|ma)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:dinsdag|di)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:woensdag|wo)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:donderdag|do)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:vrijdag|vr)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:zaterdag|za)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:zondag|zo)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    // English patterns
    /(?:monday|mon)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:tuesday|tue)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:wednesday|wed)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:thursday|thu)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:friday|fri)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:saturday|sat)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    /(?:sunday|sun)[:\s]*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
  ];

  const dayMapping: Record<string, string> = {
    maandag: "mon", ma: "mon", monday: "mon", mon: "mon",
    dinsdag: "tue", di: "tue", tuesday: "tue", tue: "tue",
    woensdag: "wed", wo: "wed", wednesday: "wed", wed: "wed",
    donderdag: "thu", do: "thu", thursday: "thu", thu: "thu",
    vrijdag: "fri", vr: "fri", friday: "fri", fri: "fri",
    zaterdag: "sat", za: "sat", saturday: "sat", sat: "sat",
    zondag: "sun", zo: "sun", sunday: "sun", sun: "sun",
  };

  for (const pattern of patterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const dayMatch = match[0].toLowerCase().match(/^[a-z]+/);
      if (dayMatch) {
        const day = dayMapping[dayMatch[0]] || dayMatch[0];
        const open = match[1].replace(".", ":");
        const close = match[2].replace(".", ":");
        hours[day] = `${open}-${close}`;
      }
    }
  }

  return hours;
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
