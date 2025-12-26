#!/usr/bin/env npx tsx
/**
 * Enrich Places with Coordinates via Bright Data SERP API
 *
 * Updates places that have google_cid but missing lat/lng coordinates.
 * Uses Google Maps Full Info dataset via Bright Data SERP API.
 *
 * Usage:
 *   npx tsx scripts/enrich-coordinates.ts                     # Process all pending
 *   npx tsx scripts/enrich-coordinates.ts --batch 100         # Process 100 places
 *   npx tsx scripts/enrich-coordinates.ts --country NL        # Only Dutch places
 *   npx tsx scripts/enrich-coordinates.ts --dry-run           # Test without updates
 *   npx tsx scripts/enrich-coordinates.ts --resume            # Resume after interruption
 *
 * Requires:
 *   BRIGHTDATA_API_KEY     - Bright Data API key
 *   BRIGHTDATA_SERP_ZONE   - SERP zone name (e.g., serp_cutiepaws)
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

// ============================================================================
// Configuration
// ============================================================================

const API_KEY = process.env.BRIGHTDATA_API_KEY;
const SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;
const SERP_API_URL = "https://api.brightdata.com/request";

// Progress tracking
const PROGRESS_DIR = path.join(process.cwd(), "data", "coordinate-enrichment");
const PROGRESS_FILE = path.join(PROGRESS_DIR, "progress.json");

// Rate limiting
const RATE_LIMIT = {
  delayBetweenRequests: 500, // 500ms between requests
  retryDelayMs: 3000,
  maxRetries: 3,
  batchSize: 50, // Process 50 places then pause
  pauseBetweenBatches: 5000, // 5 second pause between batches
};

// ============================================================================
// Types
// ============================================================================

interface Place {
  id: number;
  name: string;
  google_cid: string;
  address: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
  city_name: string;
  country_code: string;
}

interface GoogleMapsResult {
  // Core identifiers
  fid?: string;
  cid?: string;
  map_id?: string;
  map_id_encoded?: string;

  // Basic info
  title?: string;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  link?: string;
  display_link?: string;

  // Coordinates
  latitude?: number;
  longitude?: number;

  // Business data
  rating?: number;
  reviews_cnt?: number;
  review_count?: number;
  work_status?: string;
  work_status_details?: string;
  working_hours?: Record<string, string>;
  claimed?: boolean;

  // Categories
  category?: Array<{ id?: string; title?: string }>;
  type?: string;

  // Media
  original_image?: string;
  thumbnail?: string;
  image?: string;
  image_url?: string;
  icon?: string;

  // Location extras
  plus_code?: string;
  rank?: number;
}

interface ProgressState {
  total_processed: number;
  successful_updates: number;
  failed_updates: number;
  skipped: number;
  last_processed_id: number | null;
  last_run_at: string | null;
  errors: Array<{ place_id: number; error: string; timestamp: string }>;
}

// ============================================================================
// Progress Tracking
// ============================================================================

function ensureProgressDir(): void {
  if (!fs.existsSync(PROGRESS_DIR)) {
    fs.mkdirSync(PROGRESS_DIR, { recursive: true });
  }
}

function loadProgress(): ProgressState {
  ensureProgressDir();
  const defaults: ProgressState = {
    total_processed: 0,
    successful_updates: 0,
    failed_updates: 0,
    skipped: 0,
    last_processed_id: null,
    last_run_at: null,
    errors: [],
  };

  if (!fs.existsSync(PROGRESS_FILE)) {
    return defaults;
  }

  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
  } catch {
    return defaults;
  }
}

function saveProgress(state: ProgressState): void {
  ensureProgressDir();
  state.last_run_at = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(state, null, 2));
}

// ============================================================================
// Bright Data SERP API
// ============================================================================

/**
 * Search for place details via Google Maps SERP API
 * Uses name + city search with brd_json=1 for parsed results including coordinates
 */
async function searchPlaceByName(
  placeName: string,
  cityName: string,
  address?: string | null,
  retryCount = 0
): Promise<GoogleMapsResult | null> {
  // Build search query: name + city (+ address if available for more precision)
  const searchQuery = address
    ? `${placeName} ${address}`
    : `${placeName} ${cityName}`;

  const googleUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}?hl=nl&brd_json=1`;

  try {
    const response = await fetch(SERP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        zone: SERP_ZONE,
        url: googleUrl,
        format: "json",
        country: "nl",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle rate limiting
      if (response.status === 429) {
        console.log(`         ⚠️ Rate limited, waiting...`);
        await sleep(RATE_LIMIT.retryDelayMs * 2);
        throw new Error("RATE_LIMITED");
      }

      throw new Error(`API error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();

    // Parse the response body
    let result = data;
    if (data.body && typeof data.body === "string") {
      try {
        result = JSON.parse(data.body);
      } catch {
        console.log(`         ⚠️ Failed to parse body JSON`);
        return null;
      }
    }

    // Extract first place from organic results
    const organic = result.organic || result.local_results || result.places || [];

    if (organic.length === 0) {
      return null;
    }

    // Return first result (most relevant)
    return organic[0] as GoogleMapsResult;
  } catch (error: any) {
    // Retry logic with exponential backoff
    if (retryCount < RATE_LIMIT.maxRetries) {
      const delay = RATE_LIMIT.retryDelayMs * Math.pow(2, retryCount);
      console.log(`         ⟳ Retry ${retryCount + 1}/${RATE_LIMIT.maxRetries} in ${delay / 1000}s...`);
      await sleep(delay);
      return searchPlaceByName(placeName, cityName, address, retryCount + 1);
    }

    throw error;
  }
}

// ============================================================================
// Database Operations
// ============================================================================

/**
 * Get places that need coordinate enrichment
 */
async function getPlacesToEnrich(
  options: {
    batchSize: number;
    countryCode?: string;
    resumeFromId?: number;
  }
): Promise<Place[]> {
  const { batchSize, countryCode, resumeFromId } = options;

  // Query places with google_cid but missing coordinates
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.google_cid,
      p.address,
      p.phone,
      p.lat,
      p.lng,
      ci.name as city_name,
      co.code as country_code
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    WHERE p.google_cid IS NOT NULL
      AND (p.lat IS NULL OR p.lng IS NULL)
      ${resumeFromId ? sql`AND p.id > ${resumeFromId}` : sql``}
      ${countryCode ? sql`AND co.code = ${countryCode}` : sql``}
    ORDER BY p.id
    LIMIT ${batchSize}
  `;

  return places as Place[];
}

/**
 * Update place with enriched coordinates and data
 */
async function updatePlaceCoordinates(
  placeId: number,
  data: {
    lat: number;
    lng: number;
    phone?: string;
    website?: string;
    openingHours?: Record<string, string>;
    photoUrl?: string;
    rating?: number;
    reviewCount?: number;
    googlePlaceId?: string;
    googleCid?: string;
  }
): Promise<void> {
  // Prepare scraped_content update
  const scrapedUpdate = {
    coordinates: { lat: data.lat, lng: data.lng },
    photoUrl: data.photoUrl || null,
    coordinatesEnrichedAt: new Date().toISOString(),
  };

  // Build the update - use simple values without complex CASE/COALESCE
  await sql`
    UPDATE places
    SET
      lat = ${data.lat},
      lng = ${data.lng},
      phone = COALESCE(${data.phone || null}, phone),
      website = COALESCE(${data.website || null}, website),
      opening_hours = COALESCE(${data.openingHours ? JSON.stringify(data.openingHours) : null}::jsonb, opening_hours),
      avg_rating = COALESCE(${data.rating ?? null}, avg_rating),
      review_count = COALESCE(${data.reviewCount ?? null}, review_count),
      google_place_id = COALESCE(${data.googlePlaceId || null}, google_place_id),
      google_cid = COALESCE(${data.googleCid || null}, google_cid),
      scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedUpdate)}::jsonb,
      updated_at = NOW()
    WHERE id = ${placeId}
  `;
}

// ============================================================================
// Utilities
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    batch: 100,
    country: null as string | null,
    dryRun: false,
    resume: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--batch" && args[i + 1]) {
      options.batch = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--country" && args[i + 1]) {
      options.country = args[i + 1].toUpperCase();
      i++;
    } else if (args[i] === "--dry-run") {
      options.dryRun = true;
    } else if (args[i] === "--resume") {
      options.resume = true;
    }
  }

  return options;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const options = parseArgs();

  console.log("📍 Coordinate Enrichment Script\n");
  console.log("━".repeat(50));

  // Check API credentials
  if (!API_KEY) {
    console.error("❌ BRIGHTDATA_API_KEY niet gevonden in .env");
    process.exit(1);
  }

  if (!SERP_ZONE) {
    console.error("❌ BRIGHTDATA_SERP_ZONE niet gevonden in .env");
    process.exit(1);
  }

  // Load progress
  const progress = loadProgress();

  // Get count of places needing enrichment
  const countResult = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE google_cid IS NOT NULL
      AND (lat IS NULL OR lng IS NULL)
  `;
  const totalNeedingEnrichment = parseInt(countResult[0].count as string, 10);

  console.log(`📊 Status:`);
  console.log(`   Places needing coordinates: ${totalNeedingEnrichment.toLocaleString()}`);
  console.log(`   Batch size: ${options.batch}`);
  console.log(`   Country filter: ${options.country || "all"}`);
  console.log(`   Dry run: ${options.dryRun}`);
  console.log(`   Previous successful: ${progress.successful_updates}`);
  console.log("");

  if (totalNeedingEnrichment === 0) {
    console.log("✅ All places already have coordinates!");
    return;
  }

  if (options.dryRun) {
    console.log("🧪 DRY RUN - No changes will be made\n");
  }

  // Get places to process
  const places = await getPlacesToEnrich({
    batchSize: options.batch,
    countryCode: options.country || undefined,
    resumeFromId: options.resume ? (progress.last_processed_id || undefined) : undefined,
  });

  if (places.length === 0) {
    console.log("✅ No more places to process!");
    return;
  }

  console.log(`🚀 Processing ${places.length} places...\n`);

  let processed = 0;
  let updated = 0;
  let failed = 0;
  let skipped = 0;

  for (const place of places) {
    processed++;
    const progressStr = `[${processed}/${places.length}]`;

    console.log(`${progressStr} ${place.name} (${place.city_name}, ${place.country_code})`);

    try {
      // Search by name + city (with address if available for more precision)
      const result = await searchPlaceByName(place.name, place.city_name, place.address);

      if (!result) {
        console.log(`         ⚠️ No result found`);
        skipped++;
        progress.skipped++;
        continue;
      }

      // Extract coordinates (API returns latitude/longitude directly)
      const lat = result.latitude;
      const lng = result.longitude;

      if (!lat || !lng) {
        console.log(`         ⚠️ No coordinates in response`);
        skipped++;
        progress.skipped++;
        continue;
      }

      console.log(`         📍 Coordinates: ${lat}, ${lng}`);

      // Extract additional data from response
      const phone = result.phone || null;
      const website = result.link || result.website || null;
      const openingHours = result.working_hours || undefined;
      const photoUrl = result.original_image || result.image || result.thumbnail || undefined;
      const rating = result.rating;
      const reviewCount = result.reviews_cnt;
      const googlePlaceId = result.map_id_encoded; // ChIJ... format
      const googleCid = result.fid || result.map_id; // 0x...:0x... format

      if (phone) console.log(`         📞 Phone: ${phone}`);
      if (rating) console.log(`         ⭐ Rating: ${rating} (${reviewCount || 0} reviews)`);

      // Update database
      if (!options.dryRun) {
        await updatePlaceCoordinates(place.id, {
          lat,
          lng,
          phone: phone || undefined,
          website: website || undefined,
          openingHours,
          photoUrl,
          rating,
          reviewCount,
          googlePlaceId,
          googleCid,
        });
        console.log(`         ✅ Updated`);
      } else {
        console.log(`         🧪 Would update (dry run)`);
      }

      updated++;
      progress.successful_updates++;
      progress.last_processed_id = place.id;

    } catch (error: any) {
      console.log(`         ❌ Error: ${error.message}`);
      failed++;
      progress.failed_updates++;
      progress.errors.push({
        place_id: place.id,
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      // Keep only last 100 errors
      if (progress.errors.length > 100) {
        progress.errors = progress.errors.slice(-100);
      }
    }

    // Update progress after each place
    progress.total_processed++;
    saveProgress(progress);

    // Rate limiting
    await sleep(RATE_LIMIT.delayBetweenRequests);

    // Batch pause
    if (processed % RATE_LIMIT.batchSize === 0 && processed < places.length) {
      console.log(`\n⏸️ Batch pause (${RATE_LIMIT.pauseBetweenBatches / 1000}s)...\n`);
      await sleep(RATE_LIMIT.pauseBetweenBatches);
    }
  }

  // Final summary
  console.log("\n" + "━".repeat(50));
  console.log("📊 SUMMARY");
  console.log("━".repeat(50));
  console.log(`✅ Updated: ${updated}/${processed} places`);
  console.log(`⏭️ Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📦 Total processed (all time): ${progress.total_processed}`);
  console.log(`🎯 Total successful (all time): ${progress.successful_updates}`);
  console.log("━".repeat(50));
  console.log(`\n📁 Progress saved to: ${PROGRESS_FILE}`);

  // If not all done, suggest next batch
  const remaining = totalNeedingEnrichment - processed;
  if (remaining > 0 && !options.dryRun) {
    console.log(`\n💡 Run again to process next batch:`);
    console.log(`   npx tsx scripts/enrich-coordinates.ts --resume --batch ${options.batch}`);
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
