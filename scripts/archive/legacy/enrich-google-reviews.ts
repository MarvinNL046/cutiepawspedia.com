#!/usr/bin/env npx tsx
/**
 * Google Maps Reviews Enrichment
 *
 * Fetches 3-5 actual review texts per place via BrightData Reviews Dataset
 *
 * Usage:
 *   npx tsx scripts/enrich-google-reviews.ts --limit=50
 *   npx tsx scripts/enrich-google-reviews.ts --city=Amsterdam --limit=10
 *   npx tsx scripts/enrich-google-reviews.ts --dry-run
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;

// Google Maps Reviews Dataset ID (correct ID from BrightData)
const DATASET_ID = "gd_luzfs1dn2oa0teb81";

// BrightData API response format (each review is a separate record)
interface BrightDataReview {
  place_id?: string;
  place_name?: string;
  review_id?: string;
  reviewer_name?: string;
  review_rating?: number;
  review?: string;  // The actual review text
  review_date?: string;
  number_of_likes?: number;
  response_of_owner?: string;
  response_date?: string;
  place_general_rating?: number;
  overall_place_riviews?: number;
  cid?: string;
}

// Grouped reviews per place for our database
interface PlaceReviews {
  placeId: number;
  placeName: string;
  reviews: {
    text: string;
    rating: number;
    author: string;
    date: string | null;
    likes: number;
    ownerResponse: string | null;
  }[];
}

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  google_cid: string | null;
}

/**
 * Build Google Maps URL using CID (preferred) or search fallback
 */
function buildGoogleMapsUrl(place: Place): string {
  if (place.google_cid) {
    // Use CID-based URL for exact place matching
    return `https://www.google.com/maps?cid=${place.google_cid}`;
  }
  // Fallback to search URL
  const searchQuery = encodeURIComponent(`${place.name} ${place.city_name} ${place.country_name}`);
  return `https://www.google.com/maps/search/${searchQuery}`;
}

/**
 * Trigger Reviews Dataset collection
 */
async function triggerReviewsCollection(places: Place[]): Promise<string | null> {
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    return null;
  }

  // Build inputs - only URL is accepted by this dataset
  const inputs = places.map(place => ({
    url: buildGoogleMapsUrl(place),
  }));

  console.log("📍 Triggering reviews collection for", places.length, "places...\n");

  try {
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
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
 * Poll for dataset results (returns flat array of individual reviews)
 */
async function pollForResults(snapshotId: string, maxAttempts = 180): Promise<BrightDataReview[]> {
  console.log(`\n⏳ Polling for results (max ${maxAttempts * 10}s = ${Math.round(maxAttempts * 10 / 60)} min)...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, 10000)); // Wait 10 seconds

    try {
      const progressRes = await fetch(
        `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
        {
          headers: { Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}` },
        }
      );

      if (progressRes.ok) {
        const progress = await progressRes.json();
        console.log(`   [${attempt}/${maxAttempts}] Status: ${progress.status}`);

        if (progress.status === "ready") {
          const resultsRes = await fetch(
            `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
            {
              headers: { Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}` },
            }
          );

          if (resultsRes.ok) {
            const results = await resultsRes.json();
            console.log(`✅ Got ${results.length} results`);
            return results;
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
 * Group reviews by CID from BrightData flat response
 */
function groupReviewsByCid(reviews: BrightDataReview[]): Map<string, BrightDataReview[]> {
  const grouped = new Map<string, BrightDataReview[]>();

  for (const review of reviews) {
    const cid = review.cid;
    if (!cid) continue;

    if (!grouped.has(cid)) {
      grouped.set(cid, []);
    }
    grouped.get(cid)!.push(review);
  }

  return grouped;
}

/**
 * Match place by CID
 */
function matchPlaceByCid(cid: string, places: Place[]): Place | null {
  for (const place of places) {
    if (place.google_cid === cid) {
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
 * Update place with reviews from BrightData format
 */
async function updatePlaceWithReviews(placeId: number, reviews: BrightDataReview[]): Promise<boolean> {
  try {
    // Format reviews for storage (keep top 5)
    const formattedReviews = reviews.slice(0, 5).map(r => ({
      text: cleanReviewText(r.review || ""),
      rating: r.review_rating || 0,
      author: r.reviewer_name || "Anoniem",
      date: r.review_date || null,
      likes: r.number_of_likes || 0,
      ownerResponse: r.response_of_owner ? cleanReviewText(r.response_of_owner) : null,
    })).filter(r => r.text.length > 10); // Only keep reviews with actual text

    if (formattedReviews.length === 0) {
      return false;
    }

    // Store in scraped_content.googleReviews
    await sql`
      UPDATE places SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) ||
          jsonb_build_object('googleReviews', ${JSON.stringify(formattedReviews)}::jsonb),
        data_quality_flags = (
          SELECT jsonb_agg(DISTINCT value)
          FROM jsonb_array_elements_text(
            COALESCE(data_quality_flags, '[]'::jsonb) || '["REVIEWS_VIA_GOOGLE"]'::jsonb
          )
        ),
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch (error) {
    console.error(`   ❌ Update error:`, error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Get places that need reviews (prioritize those with CIDs)
 */
async function getPlacesNeedingReviews(city?: string, limit = 50): Promise<Place[]> {
  const cityCondition = city ? sql`AND c.name = ${city}` : sql``;

  return await sql`
    SELECT
      p.id, p.name, p.address,
      c.name as city_name,
      co.name as country_name,
      p.scraped_content->>'googlePlaceId' as google_cid
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE
      p.review_count > 0
      AND NOT (p.data_quality_flags::text LIKE '%REVIEWS_VIA_GOOGLE%')
      AND NOT (p.scraped_content::text LIKE '%googleReviews%')
      AND p.scraped_content->>'googlePlaceId' IS NOT NULL
    ${cityCondition}
    ORDER BY p.review_count DESC  -- Prioritize places with most reviews
    LIMIT ${limit}
  ` as Place[];
}

async function main() {
  console.log("🚀 Google Maps Reviews Enrichment\n");
  console.log("━".repeat(60));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  // Parse CLI args
  const args = process.argv.slice(2);
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 50;
  const cityArg = args.find(a => a.startsWith("--city="));
  const cityFilter = cityArg ? cityArg.split("=")[1] : null;
  const dryRun = args.includes("--dry-run");

  console.log(`📍 City: ${cityFilter || "All"}`);
  console.log(`📊 Limit: ${limit}`);
  console.log(`🔧 Mode: ${dryRun ? "DRY RUN" : "LIVE"}\n`);

  // Get places needing reviews
  const places = await getPlacesNeedingReviews(cityFilter || undefined, limit);
  console.log(`📋 Found ${places.length} places needing reviews\n`);

  if (places.length === 0) {
    console.log("✅ All places already have reviews!");
    return;
  }

  // Show places
  places.slice(0, 10).forEach((p, i) => console.log(`   ${i + 1}. ${p.name} (${p.city_name})`));
  if (places.length > 10) console.log(`   ... and ${places.length - 10} more`);

  if (dryRun) {
    console.log("\n⏭️ Dry run - skipping API call");
    return;
  }

  // Trigger collection
  console.log("\n🔄 Triggering Reviews Dataset collection...\n");
  const snapshotId = await triggerReviewsCollection(places);

  if (!snapshotId) {
    console.error("❌ Failed to trigger collection");
    process.exit(1);
  }

  // Poll for results
  const results = await pollForResults(snapshotId);

  if (results.length === 0) {
    console.error("❌ No results received");
    process.exit(1);
  }

  // Process results - group reviews by CID
  console.log("\n📊 Processing reviews...\n");
  console.log(`   Raw results: ${results.length} review records`);

  // Group reviews by CID
  const groupedReviews = groupReviewsByCid(results);
  console.log(`   Grouped into: ${groupedReviews.size} places\n`);

  let matched = 0;
  let updated = 0;
  let totalReviews = 0;

  for (const [cid, reviews] of groupedReviews) {
    const matchedPlace = matchPlaceByCid(cid, places);

    if (matchedPlace && reviews.length > 0) {
      matched++;
      console.log(`\n🔍 ${matchedPlace.name}`);
      console.log(`   📝 ${reviews.length} reviews found`);

      // Show preview of first review
      if (reviews[0]?.review) {
        const preview = reviews[0].review.slice(0, 80);
        console.log(`   💬 "${preview}..."`);
      }

      const success = await updatePlaceWithReviews(matchedPlace.id, reviews);
      if (success) {
        updated++;
        totalReviews += Math.min(reviews.length, 5);
        console.log(`   ✅ Saved ${Math.min(reviews.length, 5)} reviews!`);
      }
    } else {
      // Get place name from review data
      const placeName = reviews[0]?.place_name || cid;
      console.log(`\n⚠️ No match for CID ${cid}: ${placeName}`);
    }
  }

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Reviews Enrichment Complete!\n");
  console.log(`   Places queried:    ${places.length}`);
  console.log(`   Results received:  ${results.length}`);
  console.log(`   Matched:           ${matched}`);
  console.log(`   Updated:           ${updated}`);
  console.log(`   Total reviews:     ${totalReviews}`);
}

main().catch(console.error);
