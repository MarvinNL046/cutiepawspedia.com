#!/usr/bin/env npx tsx
/**
 * Google Reviews Scraper - Belgium
 *
 * Fetches Google review texts for places with CIDs using BrightData Google Maps Dataset.
 * Uses the "discover_by=cid" mode to fetch place data including top_reviews.
 * Includes retry logic and rate limiting for reliable large-scale scraping.
 *
 * Usage:
 *   npx tsx scripts/scrape-reviews.ts                     # Default: 50 BE places
 *   npx tsx scripts/scrape-reviews.ts --limit=100         # Process 100 places
 *   npx tsx scripts/scrape-reviews.ts --country=NL        # Process Netherlands
 *   npx tsx scripts/scrape-reviews.ts --city=Antwerpen    # Filter by city
 *   npx tsx scripts/scrape-reviews.ts --batch-size=25     # Smaller API batches
 *   npx tsx scripts/scrape-reviews.ts --dry-run           # Preview without API calls
 *   npx tsx scripts/scrape-reviews.ts --offset=50         # Skip first 50 places
 *
 * Environment:
 *   DATABASE_URL          - NeonDB connection string
 *   BRIGHTDATA_API_KEY  - BrightData API token
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;

// Google Maps Business Dataset ID (includes top_reviews)
const DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  // Rate limiting
  requestsPerMinute: 10,        // Max API requests per minute
  minRequestDelay: 6000,        // Minimum delay between requests (ms)

  // Retry settings
  maxRetries: 3,                // Max retries per failed request
  retryBaseDelay: 5000,         // Base delay for exponential backoff (ms)
  retryMaxDelay: 60000,         // Max delay between retries (ms)

  // Polling settings
  pollInterval: 10000,          // Interval between progress checks (ms)
  maxPollAttempts: 180,         // Max poll attempts (30 minutes at 10s interval)

  // Data settings
  maxReviewsPerPlace: 5,        // Max reviews to store per place
  minReviewLength: 10,          // Min characters for valid review
  maxReviewLength: 500,         // Max characters per review (truncate)
};

// =============================================================================
// TYPES
// =============================================================================

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_code: string;
  google_cid: string;
  review_count: number;
}

// BrightData Google Maps Business API response format
interface BrightDataTopReview {
  content: string;
  rating: number;
  review_date: string;
  reviewer_image_url: string;
  reviewer_name: string;
  reviewer_photos_number: number;
  reviewer_reviews_number: number;
}

interface BrightDataPlaceResponse {
  place_id?: string;
  cid?: string;
  name?: string;
  address?: string;
  rating?: number;
  reviews_count?: number;
  top_reviews?: BrightDataTopReview[];
  category?: string;
  phone_number?: string;
  open_website?: string;
  lat?: number;
  lon?: number;
  open_hours?: Record<string, string>;
  photos_and_videos?: string[];
}

interface FormattedReview {
  text: string;
  rating: number;
  author: string;
  date: string | null;
  reviewerReviews: number;
  reviewerPhotos: number;
}

interface ScrapeResult {
  placeId: number;
  placeName: string;
  success: boolean;
  reviewCount: number;
  error?: string;
}

// =============================================================================
// RATE LIMITER
// =============================================================================

class RateLimiter {
  private lastRequestTime = 0;
  private requestCount = 0;
  private windowStart = Date.now();

  async waitForSlot(): Promise<void> {
    const now = Date.now();

    // Reset window if a minute has passed
    if (now - this.windowStart > 60000) {
      this.requestCount = 0;
      this.windowStart = now;
    }

    // Check if we've hit the rate limit
    if (this.requestCount >= CONFIG.requestsPerMinute) {
      const waitTime = 60000 - (now - this.windowStart);
      if (waitTime > 0) {
        console.log(`   ⏳ Rate limit reached, waiting ${Math.ceil(waitTime / 1000)}s...`);
        await this.sleep(waitTime);
        this.requestCount = 0;
        this.windowStart = Date.now();
      }
    }

    // Ensure minimum delay between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < CONFIG.minRequestDelay) {
      await this.sleep(CONFIG.minRequestDelay - timeSinceLastRequest);
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const rateLimiter = new RateLimiter();

// =============================================================================
// RETRY WRAPPER
// =============================================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  operationName: string,
  maxRetries = CONFIG.maxRetries
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const baseDelay = CONFIG.retryBaseDelay * Math.pow(2, attempt - 1);
        const jitter = Math.random() * 1000;
        const delay = Math.min(baseDelay + jitter, CONFIG.retryMaxDelay);

        console.log(`   ⚠️ ${operationName} failed (attempt ${attempt}/${maxRetries}): ${lastError.message}`);
        console.log(`   🔄 Retrying in ${Math.ceil(delay / 1000)}s...`);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`${operationName} failed after ${maxRetries} attempts: ${lastError?.message}`);
}

// =============================================================================
// BRIGHTDATA API
// =============================================================================

/**
 * Trigger Google Maps Business Dataset collection by CID
 * Uses the "discover_by=cid" mode to fetch place data including top_reviews
 */
async function triggerReviewsCollection(places: Place[]): Promise<string | null> {
  await rateLimiter.waitForSlot();

  // Send CIDs in the format expected by the API
  const inputs = places.map(place => ({
    CID: place.google_cid,
  }));

  return withRetry(async () => {
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true&type=discover_new&discover_by=cid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHTDATA_API_KEY}`,
        },
        body: JSON.stringify(inputs),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    return data.snapshot_id as string;
  }, "Trigger collection");
}

/**
 * Check collection progress
 */
async function checkProgress(snapshotId: string): Promise<{ status: string; progress?: number }> {
  await rateLimiter.waitForSlot();

  const response = await fetch(
    `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
    {
      headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` },
    }
  );

  if (!response.ok) {
    throw new Error(`Progress check failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch snapshot results
 */
async function fetchResults(snapshotId: string): Promise<BrightDataPlaceResponse[]> {
  await rateLimiter.waitForSlot();

  return withRetry(async () => {
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
      {
        headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch results failed: ${response.status}`);
    }

    return response.json();
  }, "Fetch results");
}

/**
 * Poll for dataset results with timeout
 */
async function pollForResults(snapshotId: string): Promise<BrightDataPlaceResponse[]> {
  console.log(`\n⏳ Polling for results (max ${Math.ceil(CONFIG.maxPollAttempts * CONFIG.pollInterval / 60000)} min)...`);

  for (let attempt = 1; attempt <= CONFIG.maxPollAttempts; attempt++) {
    await new Promise(r => setTimeout(r, CONFIG.pollInterval));

    try {
      const progress = await checkProgress(snapshotId);

      const progressStr = progress.progress !== undefined
        ? ` (${Math.round(progress.progress * 100)}%)`
        : "";
      console.log(`   [${attempt}/${CONFIG.maxPollAttempts}] Status: ${progress.status}${progressStr}`);

      if (progress.status === "ready") {
        return await fetchResults(snapshotId);
      } else if (progress.status === "failed") {
        throw new Error("Dataset collection failed");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Dataset collection failed") {
        throw error;
      }
      console.log(`   [${attempt}/${CONFIG.maxPollAttempts}] Polling error, retrying...`);
    }
  }

  throw new Error("Timeout waiting for results");
}

// =============================================================================
// DATA PROCESSING
// =============================================================================

/**
 * Clean and truncate review text
 */
function cleanReviewText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, CONFIG.maxReviewLength);
}

/**
 * Create CID to response mapping from BrightData results
 */
function mapResultsByCid(results: BrightDataPlaceResponse[]): Map<string, BrightDataPlaceResponse> {
  const mapped = new Map<string, BrightDataPlaceResponse>();

  for (const result of results) {
    // Try cid field first, then cid_location
    const cid = result.cid || (result as { cid_location?: string }).cid_location;
    if (cid) {
      mapped.set(cid, result);
    }
  }

  return mapped;
}

/**
 * Format top_reviews from BrightData response for database storage
 */
function formatTopReviews(topReviews: BrightDataTopReview[] | undefined): FormattedReview[] {
  if (!topReviews || !Array.isArray(topReviews)) {
    return [];
  }

  return topReviews
    .slice(0, CONFIG.maxReviewsPerPlace)
    .map(r => ({
      text: cleanReviewText(r.content || ""),
      rating: r.rating || 0,
      author: r.reviewer_name || "Anoniem",
      date: r.review_date || null,
      reviewerReviews: r.reviewer_reviews_number || 0,
      reviewerPhotos: r.reviewer_photos_number || 0,
    }))
    .filter(r => r.text.length >= CONFIG.minReviewLength);
}

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

/**
 * Get places needing reviews (with CID, no existing reviews)
 */
async function getPlacesNeedingReviews(
  countryCode: string,
  city?: string,
  limit = 50,
  offset = 0
): Promise<Place[]> {
  const cityCondition = city ? sql`AND ci.name = ${city}` : sql``;

  return await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      ci.name as city_name,
      co.code as country_code,
      p.google_cid,
      p.review_count
    FROM places p
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    WHERE
      co.code = ${countryCode}
      AND p.google_cid IS NOT NULL
      AND p.google_cid != ''
      AND p.review_count > 0
      AND (
        p.scraped_content IS NULL
        OR p.scraped_content->>'googleReviews' IS NULL
        OR jsonb_array_length(COALESCE(p.scraped_content->'googleReviews', '[]'::jsonb)) = 0
      )
      ${cityCondition}
    ORDER BY p.review_count DESC
    OFFSET ${offset}
    LIMIT ${limit}
  ` as Place[];
}

/**
 * Count total places needing reviews
 */
async function countPlacesNeedingReviews(countryCode: string): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count
    FROM places p
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    WHERE
      co.code = ${countryCode}
      AND p.google_cid IS NOT NULL
      AND p.google_cid != ''
      AND p.review_count > 0
      AND (
        p.scraped_content IS NULL
        OR p.scraped_content->>'googleReviews' IS NULL
        OR jsonb_array_length(COALESCE(p.scraped_content->'googleReviews', '[]'::jsonb)) = 0
      )
  `;
  return parseInt(result[0].count as string, 10);
}

/**
 * Update place with reviews
 */
async function updatePlaceWithReviews(
  placeId: number,
  reviews: FormattedReview[]
): Promise<boolean> {
  if (reviews.length === 0) return false;

  // Build the complete JSON object to merge
  const scrapedData = {
    googleReviews: reviews,
    reviewsScrapedAt: new Date().toISOString(),
  };

  return withRetry(async () => {
    await sql`
      UPDATE places SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedData)}::jsonb,
        data_quality_flags = (
          SELECT jsonb_agg(DISTINCT value)
          FROM jsonb_array_elements_text(
            COALESCE(data_quality_flags, '[]'::jsonb) || '["REVIEWS_SCRAPED"]'::jsonb
          )
        ),
        updated_at = NOW()
      WHERE id = ${placeId}
    `;
    return true;
  }, `Update place ${placeId}`);
}

// =============================================================================
// MAIN PROCESSING
// =============================================================================

/**
 * Process a batch of places
 */
async function processBatch(places: Place[]): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = [];

  console.log(`\n📦 Processing batch of ${places.length} places...`);

  // Trigger collection
  const snapshotId = await triggerReviewsCollection(places);

  if (!snapshotId) {
    return places.map(p => ({
      placeId: p.id,
      placeName: p.name,
      success: false,
      reviewCount: 0,
      error: "Failed to trigger collection",
    }));
  }

  console.log(`   📷 Snapshot ID: ${snapshotId}`);

  // Poll for results
  let rawResults: BrightDataPlaceResponse[];
  try {
    rawResults = await pollForResults(snapshotId);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return places.map(p => ({
      placeId: p.id,
      placeName: p.name,
      success: false,
      reviewCount: 0,
      error: errorMsg,
    }));
  }

  console.log(`\n   📊 Received ${rawResults.length} place records`);

  // Map results by CID
  const resultsByCid = mapResultsByCid(rawResults);
  console.log(`   📂 Mapped ${resultsByCid.size} places by CID\n`);

  // Process each place
  for (const place of places) {
    const placeResult = resultsByCid.get(place.google_cid);
    const formatted = formatTopReviews(placeResult?.top_reviews);

    if (formatted.length > 0) {
      try {
        await updatePlaceWithReviews(place.id, formatted);
        console.log(`   ✅ ${place.name.slice(0, 35).padEnd(35)} → ${formatted.length} reviews`);
        results.push({
          placeId: place.id,
          placeName: place.name,
          success: true,
          reviewCount: formatted.length,
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.log(`   ❌ ${place.name.slice(0, 35).padEnd(35)} → Error: ${errorMsg}`);
        results.push({
          placeId: place.id,
          placeName: place.name,
          success: false,
          reviewCount: 0,
          error: errorMsg,
        });
      }
    } else if (placeResult) {
      // Place found but no reviews
      console.log(`   ⚪ ${place.name.slice(0, 35).padEnd(35)} → No reviews found`);
      results.push({
        placeId: place.id,
        placeName: place.name,
        success: true, // Not an error, just no reviews
        reviewCount: 0,
      });
    } else {
      // Place not found in results (CID mismatch)
      console.log(`   ⚠️ ${place.name.slice(0, 35).padEnd(35)} → CID not found in results`);
      results.push({
        placeId: place.id,
        placeName: place.name,
        success: false,
        reviewCount: 0,
        error: "CID not found in API results",
      });
    }
  }

  return results;
}

// =============================================================================
// CLI & MAIN
// =============================================================================

function parseArgs(): {
  limit: number;
  offset: number;
  batchSize: number;
  country: string;
  city?: string;
  dryRun: boolean;
} {
  const args = process.argv.slice(2);

  const getArg = (prefix: string, defaultVal: string): string => {
    const arg = args.find(a => a.startsWith(`--${prefix}=`));
    return arg ? arg.split("=")[1] : defaultVal;
  };

  return {
    limit: parseInt(getArg("limit", "50"), 10),
    offset: parseInt(getArg("offset", "0"), 10),
    batchSize: parseInt(getArg("batch-size", "25"), 10),
    country: getArg("country", "BE").toUpperCase(),
    city: args.find(a => a.startsWith("--city="))?.split("=")[1],
    dryRun: args.includes("--dry-run"),
  };
}

async function main() {
  console.log("\n🔍 Google Reviews Scraper");
  console.log("━".repeat(60));

  // Validate environment
  if (!BRIGHTDATA_API_KEY) {
    console.error("❌ BRIGHTDATA_API_KEY not set in .env");
    process.exit(1);
  }

  // Parse arguments
  const { limit, offset, batchSize, country, city, dryRun } = parseArgs();

  console.log(`\n📋 Configuration:`);
  console.log(`   Country:    ${country}`);
  console.log(`   City:       ${city || "All"}`);
  console.log(`   Limit:      ${limit}`);
  console.log(`   Offset:     ${offset}`);
  console.log(`   Batch size: ${batchSize}`);
  console.log(`   Mode:       ${dryRun ? "DRY RUN" : "LIVE"}`);

  // Get total count
  const totalNeeding = await countPlacesNeedingReviews(country);
  console.log(`\n📊 Total places needing reviews: ${totalNeeding}`);

  // Get places to process
  const places = await getPlacesNeedingReviews(country, city, limit, offset);
  console.log(`   Processing: ${places.length} places (offset ${offset})`);

  if (places.length === 0) {
    console.log("\n✅ No places to process!");
    return;
  }

  // Show preview
  console.log(`\n📍 Places to process:`);
  places.slice(0, 10).forEach((p, i) => {
    console.log(`   ${i + 1 + offset}. ${p.name} (${p.city_name}) - ${p.review_count} reviews`);
  });
  if (places.length > 10) {
    console.log(`   ... and ${places.length - 10} more`);
  }

  if (dryRun) {
    console.log("\n⏭️ Dry run - skipping API calls");
    return;
  }

  // Process in batches
  const startTime = Date.now();
  let totalSuccess = 0;
  let totalFailed = 0;
  let totalReviews = 0;

  for (let i = 0; i < places.length; i += batchSize) {
    const batch = places.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(places.length / batchSize);

    console.log(`\n${"═".repeat(60)}`);
    console.log(`📦 Batch ${batchNum}/${totalBatches}`);
    console.log("═".repeat(60));

    const results = await processBatch(batch);

    for (const result of results) {
      if (result.success && result.reviewCount > 0) {
        totalSuccess++;
        totalReviews += result.reviewCount;
      } else if (!result.success) {
        totalFailed++;
      }
    }

    // Progress update
    const elapsed = (Date.now() - startTime) / 1000;
    const processed = Math.min(i + batchSize, places.length);
    const rate = processed / elapsed * 60;

    console.log(`\n📈 Progress: ${processed}/${places.length} (${Math.round(rate)}/min)`);
  }

  // Final summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "═".repeat(60));
  console.log("📊 SCRAPING COMPLETE");
  console.log("═".repeat(60));
  console.log(`   Places processed:  ${places.length}`);
  console.log(`   With reviews:      ${totalSuccess}`);
  console.log(`   Failed:            ${totalFailed}`);
  console.log(`   Total reviews:     ${totalReviews}`);
  console.log(`   Time elapsed:      ${elapsed}s`);
  console.log(`   Rate:              ${(places.length / parseFloat(elapsed) * 60).toFixed(1)}/min`);

  // Next batch suggestion
  const remaining = totalNeeding - offset - places.length;
  if (remaining > 0) {
    console.log(`\n📋 Next batch command:`);
    console.log(`   npx tsx scripts/scrape-reviews.ts --country=${country} --offset=${offset + places.length} --limit=${limit}`);
  } else {
    console.log(`\n🎉 All ${country} places have been processed!`);
  }
}

main().catch(error => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
