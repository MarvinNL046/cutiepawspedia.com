#!/usr/bin/env npx tsx
/**
 * Fix places with rating but 0 reviews
 * Re-enriches them using Google Maps Dataset API for accurate data
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
const DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

interface Place {
  id: number;
  name: string;
  city_name: string;
  country_name: string;
}

interface GoogleMapsPlace {
  place_id?: string;
  name?: string;
  rating?: number;
  reviews_count?: number;
  phone_number?: string;
}

async function getPlacesWithZeroReviews(): Promise<Place[]> {
  return await sql`
    SELECT p.id, p.name, c.name as city_name, co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE p.avg_rating > 0
      AND (p.review_count = 0 OR p.review_count IS NULL)
    ORDER BY p.id
  ` as Place[];
}

async function triggerBatchCollection(places: Place[]): Promise<string | null> {
  const inputs = places.map(place => ({
    url: `https://www.google.com/maps/search/${encodeURIComponent(`${place.name} ${place.city_name} ${place.country_name}`)}`,
  }));

  console.log(`📍 Triggering collection for ${inputs.length} places...`);

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

async function pollForResults(snapshotId: string, maxAttempts = 60): Promise<GoogleMapsPlace[]> {
  console.log(`\n⏳ Polling for results (max ${maxAttempts * 10}s)...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, 10000));

    try {
      const progressRes = await fetch(
        `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
        { headers: { Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}` } }
      );

      if (progressRes.ok) {
        const progress = await progressRes.json();
        console.log(`   [${attempt}/${maxAttempts}] Status: ${progress.status}`);

        if (progress.status === "ready") {
          const resultsRes = await fetch(
            `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
            { headers: { Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}` } }
          );

          if (resultsRes.ok) {
            const results = await resultsRes.json() as GoogleMapsPlace[];
            console.log(`\n✅ Got ${results.length} results`);
            return results;
          }
        } else if (progress.status === "failed") {
          console.error("❌ Dataset collection failed");
          return [];
        }
      }
    } catch {
      console.log(`   [${attempt}/${maxAttempts}] Polling error, retrying...`);
    }
  }

  console.error("❌ Timeout waiting for results");
  return [];
}

function matchPlace(gmPlace: GoogleMapsPlace, places: Place[]): Place | null {
  if (!gmPlace.name) return null;
  const gmNameLower = gmPlace.name.toLowerCase();

  // Exact match
  for (const place of places) {
    if (place.name.toLowerCase() === gmNameLower) return place;
  }

  // Contains match
  for (const place of places) {
    const placeNameLower = place.name.toLowerCase();
    if (gmNameLower.includes(placeNameLower) || placeNameLower.includes(gmNameLower)) {
      return place;
    }
  }

  return null;
}

async function updatePlace(placeId: number, gmData: GoogleMapsPlace): Promise<boolean> {
  try {
    const scrapedContent = {
      googlePlaceId: gmData.place_id,
      googleRating: gmData.rating,
      googleReviewCount: gmData.reviews_count,
      ratingSource: "google_maps_dataset",
      ratingConfidence: 98,
      enrichedAt: new Date().toISOString(),
      fixedZeroReviews: true,
    };

    const newFlags = JSON.stringify([
      "RATING_VIA_GOOGLE",
      "ENRICHMENT_COMPLETE",
      "ZERO_REVIEWS_FIXED",
    ]);

    // If Google also has 0 reviews, set rating to null (no valid rating)
    const rating = gmData.reviews_count && gmData.reviews_count > 0 ? gmData.rating : null;
    const reviewCount = gmData.reviews_count || 0;

    await sql`
      UPDATE places SET
        avg_rating = ${rating},
        review_count = ${reviewCount},
        phone = COALESCE(${gmData.phone_number || null}, phone),
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

    return true;
  } catch (error) {
    console.error(`   ❌ Update error:`, error instanceof Error ? error.message : error);
    return false;
  }
}

async function main() {
  console.log("\n🔧 Fix Zero Reviews");
  console.log("━".repeat(60));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  // Get places with 0 reviews
  const places = await getPlacesWithZeroReviews();
  console.log(`📊 Found ${places.length} places with rating but 0 reviews\n`);

  if (places.length === 0) {
    console.log("✅ No places to fix!");
    return;
  }

  // Process in batches of 20
  const BATCH_SIZE = 20;
  let totalFixed = 0;
  let totalNoReviews = 0;
  let totalNoMatch = 0;

  for (let i = 0; i < places.length; i += BATCH_SIZE) {
    const batch = places.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(places.length / BATCH_SIZE)} (${batch.length} places)`);
    console.log("━".repeat(40));

    batch.forEach((p, idx) => console.log(`   ${idx + 1}. ${p.name} (${p.city_name})`));

    // Trigger collection
    const snapshotId = await triggerBatchCollection(batch);
    if (!snapshotId) {
      console.error("❌ Failed to trigger batch, skipping...");
      continue;
    }

    // Poll for results
    const results = await pollForResults(snapshotId);

    // Process results
    console.log("\n📊 Processing results...");
    for (const gmPlace of results) {
      const matched = matchPlace(gmPlace, batch);

      if (matched) {
        const hasReviews = gmPlace.reviews_count && gmPlace.reviews_count > 0;

        if (hasReviews) {
          console.log(`   ✅ ${matched.name}: ${gmPlace.rating}⭐ (${gmPlace.reviews_count} reviews)`);
          await updatePlace(matched.id, gmPlace);
          totalFixed++;
        } else {
          console.log(`   ⚠️ ${matched.name}: No reviews on Google either → removing rating`);
          await updatePlace(matched.id, { ...gmPlace, rating: undefined });
          totalNoReviews++;
        }
      } else {
        console.log(`   ❓ No match for: ${gmPlace.name}`);
        totalNoMatch++;
      }
    }

    // Wait between batches to avoid rate limits
    if (i + BATCH_SIZE < places.length) {
      console.log("\n⏳ Waiting 5s before next batch...");
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Summary\n");
  console.log(`   Total processed: ${places.length}`);
  console.log(`   Fixed with reviews: ${totalFixed}`);
  console.log(`   No reviews (rating removed): ${totalNoReviews}`);
  console.log(`   No match: ${totalNoMatch}`);

  // Verify
  const remaining = await sql`
    SELECT COUNT(*) as cnt FROM places
    WHERE avg_rating > 0 AND (review_count = 0 OR review_count IS NULL)
  `;
  console.log(`\n   Remaining with 0 reviews: ${remaining[0].cnt}`);
}

main().catch(console.error);
