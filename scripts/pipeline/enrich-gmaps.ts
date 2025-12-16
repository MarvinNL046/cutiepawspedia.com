#!/usr/bin/env npx tsx
/**
 * Google Maps Places Dataset Enrichment
 *
 * Uses Brightdata's Google Maps Places Dataset API for structured data:
 * - Rating & reviews
 * - Opening hours
 * - Phone, address
 * - Services provided
 * - Photos
 *
 * Usage:
 *   npx tsx scripts/pipeline/enrich-gmaps.ts --country=BE --limit=50
 *   npx tsx scripts/pipeline/enrich-gmaps.ts --country=NL --city=Amsterdam --limit=10
 *   npx tsx scripts/pipeline/enrich-gmaps.ts --country=BE --all-incomplete
 */
import "dotenv/config";
import { parseArgs } from "util";
import { neon } from "@neondatabase/serverless";
import { COUNTRIES } from "./config";

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;

// Google Maps Places Dataset ID
const DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

interface GoogleMapsPlace {
  place_id?: string;
  cid?: string;  // Google CID for exact matching
  name?: string;
  rating?: number;
  reviews_count?: number;
  open_hours?: {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
  };
  phone_number?: string;
  address?: string;
  description?: string;
  services_provided?: string[];
  main_image?: string;
  lat?: number;
  lon?: number;
  permanently_closed?: boolean;
  temporarily_closed?: boolean;
  // Top reviews from Google Maps Full Info dataset
  // BrightData uses: content, rating, review_date, reviewer_name
  top_reviews?: {
    content?: string;           // Review text
    rating?: number;            // Star rating (1-5)
    review_date?: string;       // ISO date
    reviewer_name?: string;     // Author name
    reviewer_image_url?: string;
    reviewer_reviews_number?: number;
    reviewer_photos_number?: number;
    // Legacy field names (for compatibility)
    review_text?: string;
    review_rating?: number;
  }[];
}

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  google_cid: string | null;  // Google CID for exact matching (numeric)
  google_place_id: string | null;  // Google Place ID (ChIJ...)
}

/**
 * Check if a string is a valid numeric CID (not a Place ID)
 * CID: numeric string (e.g., "8453003438972459578")
 * Place ID: base64-like string starting with "ChIJ" (e.g., "ChIJk6gQMljuxkcRf3dqP5mgA1w")
 */
function isNumericCid(id: string): boolean {
  return /^\d+$/.test(id);
}

/**
 * Construct Google Maps URL for a place
 * Priority: 1) CID-based URL, 2) Place ID URL, 3) Search URL
 */
function buildGoogleMapsUrl(place: Place): string {
  // 1. CID-based URL (numeric) - most precise
  if (place.google_cid && isNumericCid(place.google_cid)) {
    return `https://www.google.com/maps?cid=${place.google_cid}`;
  }

  // 2. Place ID URL (ChIJ...) - also precise
  if (place.google_place_id && place.google_place_id.startsWith('ChIJ')) {
    return `https://www.google.com/maps/place/?q=place_id:${place.google_place_id}`;
  }

  // 3. Fallback to search URL (less reliable)
  const searchQuery = encodeURIComponent(`${place.name} ${place.city_name} ${place.country_name}`);
  return `https://www.google.com/maps/search/${searchQuery}`;
}

/**
 * Trigger Google Maps Places Dataset collection
 * Uses URL collection mode with Google Maps search URLs
 */
async function triggerDatasetCollection(places: Place[]): Promise<string | null> {
  if (!BRIGHTDATA_API_KEY) {
    console.error("❌ BRIGHTDATA_API_KEY not set");
    return null;
  }

  // Build Google Maps URLs for each place
  const inputs = places.map(place => ({
    url: buildGoogleMapsUrl(place),
  }));

  console.log("📍 URLs to scrape:");
  inputs.forEach((input, i) => console.log(`   ${i + 1}. ${input.url.slice(0, 80)}...`));
  console.log("");

  try {
    // Use URL collection mode (no discover_by parameter)
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true`,
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
      const err = await response.text();
      console.error(`❌ Trigger failed: ${response.status} - ${err.slice(0, 300)}`);
      return null;
    }

    const data = await response.json();
    console.log(`📦 Snapshot ID: ${data.snapshot_id}`);
    return data.snapshot_id;
  } catch (error) {
    console.error(`❌ Error:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Poll for dataset results
 */
async function pollForResults(snapshotId: string, maxAttempts = 180): Promise<GoogleMapsPlace[]> {
  // 180 attempts × 10s = 30 minutes (enough for ~50 URLs @ 37s/input)
  console.log(`\n⏳ Polling for results (max ${maxAttempts * 10}s = ${Math.round(maxAttempts * 10 / 60)} min)...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, 10000)); // Wait 10 seconds

    try {
      // Check progress first
      const progressRes = await fetch(
        `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
        {
          headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` },
        }
      );

      if (progressRes.ok) {
        const progress = await progressRes.json();
        console.log(`   [${attempt}/${maxAttempts}] Status: ${progress.status}`);

        if (progress.status === "ready") {
          // Download results
          const resultsRes = await fetch(
            `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
            {
              headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` },
            }
          );

          if (resultsRes.ok) {
            const results = await resultsRes.json();
            // Handle various response formats from BrightData
            if (Array.isArray(results)) {
              console.log(`✅ Got ${results.length} results`);
              return results;
            } else if (results && typeof results === 'object') {
              // Sometimes BrightData returns { data: [...] } or similar
              if (Array.isArray(results.data)) {
                console.log(`✅ Got ${results.data.length} results (from data field)`);
                return results.data;
              }
              // Single result as object
              console.log(`✅ Got 1 result (single object)`);
              return [results];
            } else {
              console.log(`⚠️ Unexpected response format:`, typeof results);
              return [];
            }
          }
        } else if (progress.status === "failed") {
          console.error("❌ Dataset collection failed");
          return [];
        }
      }
    } catch (error) {
      console.log(`   [${attempt}/${maxAttempts}] Polling error, retrying...`);
    }
  }

  console.error("❌ Timeout waiting for results");
  return [];
}

/**
 * Convert Google Maps hours to our format
 */
function convertOpeningHours(gmHours: GoogleMapsPlace["open_hours"]): Record<string, string> | null {
  if (!gmHours) return null;

  const dayMap: Record<string, string> = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  const hours: Record<string, string> = {};
  let hasAnyHours = false;

  for (const [day, value] of Object.entries(gmHours)) {
    const key = dayMap[day];
    if (key && value) {
      hours[key] = value;
      hasAnyHours = true;
    }
  }

  return hasAnyHours ? hours : null;
}

/**
 * Match Google Maps result to our place by CID (preferred) or name
 */
function matchPlace(gmPlace: GoogleMapsPlace, places: Place[]): Place | null {
  // Try CID match first (most reliable)
  if (gmPlace.cid) {
    for (const place of places) {
      if (place.google_cid === gmPlace.cid) {
        return place;
      }
    }
  }

  // Fallback to name matching
  if (!gmPlace.name) return null;
  const gmNameLower = gmPlace.name.toLowerCase();

  // Try exact match first
  for (const place of places) {
    if (place.name.toLowerCase() === gmNameLower) {
      return place;
    }
  }

  // Try contains match
  for (const place of places) {
    const placeNameLower = place.name.toLowerCase();
    if (gmNameLower.includes(placeNameLower) || placeNameLower.includes(gmNameLower)) {
      return place;
    }
  }

  return null;
}

/**
 * Clean review text - remove excessive whitespace, truncate if needed
 */
function cleanReviewText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500); // Max 500 chars per review
}

/**
 * Update place with Google Maps data (including reviews)
 */
async function updatePlace(placeId: number, gmData: GoogleMapsPlace): Promise<{ success: boolean; reviewsStored: number }> {
  try {
    // Format top_reviews for storage (keep top 5)
    // BrightData Google Maps Full Info uses: content, rating, review_date, reviewer_name
    const formattedReviews = (gmData.top_reviews || [])
      .slice(0, 5)
      .map((r: Record<string, unknown>) => {
        // BrightData uses 'content' for review text
        const reviewText = (r.content || r.review_text || r.text || "") as string;
        return {
          text: cleanReviewText(reviewText),
          rating: (r.rating || r.review_rating || 0) as number,
          author: (r.reviewer_name || r.author || "Anoniem") as string,
          date: (r.review_date || r.review_datetime_utc || null) as string | null,
          likes: (r.review_likes || r.likes || 0) as number,
          ownerResponse: null,  // Full Info dataset doesn't include owner responses
        };
      })
      .filter(r => r.text.length > 10); // Only keep reviews with actual text

    const scrapedContent: Record<string, unknown> = {
      googlePlaceId: gmData.place_id || gmData.cid,
      googleRating: gmData.rating,
      googleReviewCount: gmData.reviews_count,
      description: gmData.description,
      servicesProvided: gmData.services_provided,
      mainImage: gmData.main_image,
      ratingSource: "google_maps_dataset",
      ratingConfidence: 98, // High confidence from official API
      enrichedAt: new Date().toISOString(),
    };

    // Add reviews if available
    if (formattedReviews.length > 0) {
      scrapedContent.googleReviews = formattedReviews;
    }

    const openingHours = convertOpeningHours(gmData.open_hours);

    // Build update query
    const flags = [
      "RATING_VIA_GOOGLE",
      "ENRICHMENT_COMPLETE",
      ...(openingHours ? ["OPENING_HOURS_VIA_SCHEMA"] : []),
      ...(formattedReviews.length > 0 ? ["REVIEWS_VIA_GOOGLE"] : []),
    ];
    const newFlags = JSON.stringify(flags);

    await sql`
      UPDATE places SET
        avg_rating = COALESCE(${gmData.rating || null}, avg_rating),
        review_count = COALESCE(${gmData.reviews_count || null}, review_count),
        phone = COALESCE(${gmData.phone_number || null}, phone),
        opening_hours = COALESCE(${openingHours ? JSON.stringify(openingHours) : null}::jsonb, opening_hours),
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedContent)}::jsonb,
        data_quality_flags = (
          SELECT jsonb_agg(DISTINCT value)
          FROM jsonb_array_elements_text(
            COALESCE(data_quality_flags, '[]'::jsonb) || ${newFlags}::jsonb
          )
        ),
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return { success: true, reviewsStored: formattedReviews.length };
  } catch (error) {
    console.error(`   ❌ Update error:`, error instanceof Error ? error.message : error);
    return { success: false, reviewsStored: 0 };
  }
}

// Parse CLI arguments
const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    city: { type: "string" },
    limit: { type: "string", short: "l" },
    "force-incomplete": { type: "boolean" },
    "all-incomplete": { type: "boolean" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Google Maps Places Dataset Enrichment

Fetches opening hours, reviews, and additional data from Google Maps via BrightData.

Usage:
  npx tsx scripts/pipeline/enrich-gmaps.ts --country=<code> [options]

Options:
  -c, --country <code>   Country code (BE, NL, DE, FR, UK) - REQUIRED
  --city <name>          Filter by city name
  -l, --limit <n>        Max places to process (default: 50)
  --force-incomplete     Re-enrich places marked complete but missing data
  --all-incomplete       Enrich ALL places missing opening hours or website
  -h, --help             Show this help

Examples:
  npx tsx scripts/pipeline/enrich-gmaps.ts --country=BE --limit=50
  npx tsx scripts/pipeline/enrich-gmaps.ts --country=NL --city=Amsterdam --limit=10
  npx tsx scripts/pipeline/enrich-gmaps.ts --country=BE --all-incomplete
`);
  process.exit(0);
}

async function main() {
  console.log("🚀 Google Maps Places Dataset Enrichment\n");
  console.log("━".repeat(60));

  if (!BRIGHTDATA_API_KEY) {
    console.error("❌ BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  const COUNTRY_CODE = args.country?.toUpperCase();
  const limit = args.limit ? parseInt(args.limit, 10) : 50;
  const cityFilter = args.city || null;
  const forceIncomplete = args["force-incomplete"] ?? false;
  const allIncomplete = args["all-incomplete"] ?? false;

  if (!COUNTRY_CODE) {
    console.error("❌ --country is required");
    console.error("   Example: --country=BE");
    process.exit(1);
  }

  if (!COUNTRIES[COUNTRY_CODE]) {
    console.error(`❌ Unknown country: ${COUNTRY_CODE}`);
    console.error(`   Available: ${Object.keys(COUNTRIES).join(", ")}`);
    process.exit(1);
  }

  const country = COUNTRIES[COUNTRY_CODE];

  console.log(`🌍 Country: ${country.name} (${COUNTRY_CODE})`);
  console.log(`📍 City: ${cityFilter || "All"}`);
  console.log(`📊 Limit: ${limit}`);
  if (allIncomplete) {
    console.log(`🔄 Mode: ALL incomplete places (missing opening_hours or website)`);
  } else if (forceIncomplete) {
    console.log(`🔄 Mode: Force re-enrich ENRICHMENT_COMPLETE places missing data`);
  } else {
    console.log(`🔄 Mode: Places without opening_hours`);
  }
  console.log("");

  // Get places that need enrichment (prioritize those with CIDs for exact matching)
  const cityCondition = cityFilter ? sql`AND c.name ILIKE ${cityFilter}` : sql``;

  // Different query based on mode:
  // Normal: places without opening_hours
  // Force-incomplete: places that have ENRICHMENT_COMPLETE but no website OR opening_hours
  // All-incomplete: ALL places with rating but missing website OR opening_hours (regardless of flags)
  let places: Place[];

  if (allIncomplete) {
    // Re-enrich ALL incomplete places - those missing website or hours
    places = await sql`
      SELECT
        p.id, p.name, p.address,
        c.name as city_name,
        co.name as country_name,
        p.scraped_content->>'cid' as google_cid,
        p.scraped_content->>'googlePlaceId' as google_place_id
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE co.code = ${COUNTRY_CODE}
        AND (p.opening_hours IS NULL OR p.scraped_content->>'googleReviews' IS NULL)
        ${cityCondition}
      ORDER BY
        CASE WHEN p.scraped_content->>'googlePlaceId' IS NOT NULL THEN 0 ELSE 1 END,
        p.review_count DESC NULLS LAST,
        p.id
      LIMIT ${limit}
    ` as Place[];
  } else if (forceIncomplete) {
    // Re-enrich places that were marked complete but only have rating data (old enrichment)
    places = await sql`
      SELECT
        p.id, p.name, p.address,
        c.name as city_name,
        co.name as country_name,
        p.scraped_content->>'cid' as google_cid,
        p.scraped_content->>'googlePlaceId' as google_place_id
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE co.code = ${COUNTRY_CODE}
        AND p.data_quality_flags @> '["ENRICHMENT_COMPLETE"]'::jsonb
        AND (p.opening_hours IS NULL OR p.scraped_content->>'googleReviews' IS NULL)
        ${cityCondition}
      ORDER BY
        CASE WHEN p.scraped_content->>'googlePlaceId' IS NOT NULL THEN 0 ELSE 1 END,
        p.id
      LIMIT ${limit}
    ` as Place[];
  } else {
    // Default: places without opening_hours
    places = await sql`
      SELECT
        p.id, p.name, p.address,
        c.name as city_name,
        co.name as country_name,
        p.scraped_content->>'cid' as google_cid,
        p.scraped_content->>'googlePlaceId' as google_place_id
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE co.code = ${COUNTRY_CODE}
        AND p.opening_hours IS NULL
        ${cityCondition}
      ORDER BY
        CASE WHEN p.scraped_content->>'googlePlaceId' IS NOT NULL THEN 0 ELSE 1 END,
        p.id
      LIMIT ${limit}
    ` as Place[];
  }

  console.log(`📊 Found ${places.length} places to enrich\n`);

  if (places.length === 0) {
    console.log("✅ All places already enriched!");
    return;
  }

  const withNumericCid = places.filter(p => p.google_cid && isNumericCid(p.google_cid)).length;
  const withPlaceId = places.filter(p => p.google_place_id && p.google_place_id.startsWith('ChIJ')).length;
  const viaSearch = places.length - withNumericCid - withPlaceId;
  console.log(`   (${withNumericCid} with CID, ${withPlaceId} with Place ID, ${viaSearch} via search)\n`);
  places.slice(0, 10).forEach((p, i) => {
    let marker = " ◦search";
    if (p.google_cid && isNumericCid(p.google_cid)) marker = " ✓CID";
    else if (p.google_place_id && p.google_place_id.startsWith('ChIJ')) marker = " ~PlaceID";
    console.log(`   ${i + 1}. ${p.name} (${p.city_name})${marker}`);
  });
  if (places.length > 10) console.log(`   ... and ${places.length - 10} more`);

  // Trigger dataset collection
  console.log("\n🔄 Triggering Google Maps Dataset collection...\n");
  const snapshotId = await triggerDatasetCollection(places);

  if (!snapshotId) {
    console.error("❌ Failed to trigger dataset collection");
    process.exit(1);
  }

  // Poll for results
  const results = await pollForResults(snapshotId);

  if (!results || !Array.isArray(results) || results.length === 0) {
    console.error("❌ No results received");
    console.log("This could mean:");
    console.log("  - BrightData API returned an unexpected format");
    console.log("  - The dataset collection timed out");
    console.log("  - No matching places were found");
    console.log("\nTry running with fewer places (--limit=10)");
    process.exit(1);
  }

  // Process results
  console.log("\n📊 Processing results...\n");
  let matched = 0;
  let updated = 0;
  let withHours = 0;
  let withReviews = 0;
  let totalReviews = 0;
  let cidMatches = 0;

  for (const gmPlace of results) {
    const matchedPlace = matchPlace(gmPlace, places);

    if (matchedPlace) {
      matched++;
      const isCidMatch = gmPlace.cid && matchedPlace.google_cid === gmPlace.cid;
      if (isCidMatch) cidMatches++;

      console.log(`\n🔍 ${matchedPlace.name}${isCidMatch ? " (CID match)" : ""}`);

      if (gmPlace.rating) {
        console.log(`   ⭐ ${gmPlace.rating}/5 (${gmPlace.reviews_count || 0} reviews)`);
      }

      if (gmPlace.open_hours) {
        const days = Object.keys(gmPlace.open_hours).length;
        console.log(`   🕐 Opening hours: ${days} days`);
        withHours++;
      }

      if (gmPlace.phone_number) {
        console.log(`   📞 ${gmPlace.phone_number}`);
      }

      if (gmPlace.top_reviews && gmPlace.top_reviews.length > 0) {
        console.log(`   💬 ${gmPlace.top_reviews.length} reviews found`);
        // Show preview of first review (BrightData uses 'content' field)
        const firstReview = gmPlace.top_reviews[0];
        if (firstReview?.content) {
          const preview = firstReview.content.slice(0, 60);
          console.log(`      "${preview}..."`);
        }
      }

      const result = await updatePlace(matchedPlace.id, gmPlace);
      if (result.success) {
        updated++;
        if (result.reviewsStored > 0) {
          withReviews++;
          totalReviews += result.reviewsStored;
        }
        console.log(`   ✅ Updated!${result.reviewsStored > 0 ? ` (${result.reviewsStored} reviews saved)` : ""}`);
      }
    } else {
      console.log(`\n⚠️ No match for: ${gmPlace.name} (CID: ${gmPlace.cid || "none"})`);
    }
  }

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Enrichment Complete!\n");
  console.log(`   Places queried:    ${places.length}`);
  console.log(`   Results received:  ${results.length}`);
  console.log(`   Matched:           ${matched} (${cidMatches} via CID)`);
  console.log(`   Updated:           ${updated}`);
  console.log(`   With opening hours: ${withHours}`);
  console.log(`   With reviews:       ${withReviews} (${totalReviews} total reviews)`);
}

main().catch(console.error);
