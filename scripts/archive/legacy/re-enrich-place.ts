#!/usr/bin/env npx tsx
/**
 * Re-enrich a specific place using Google Maps Dataset API
 *
 * Usage:
 *   npx tsx scripts/re-enrich-place.ts --id=199              # By place ID
 *   npx tsx scripts/re-enrich-place.ts --name="Avonturia"    # By name (partial match)
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
}

interface GoogleMapsPlace {
  place_id?: string;
  name?: string;
  rating?: number;
  reviews_count?: number;
  phone_number?: string;
  description?: string;
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    id: parseInt(args.find(a => a.startsWith("--id="))?.split("=")[1] || "0", 10),
    name: args.find(a => a.startsWith("--name="))?.split("=")[1],
    help: args.includes("--help"),
  };
}

function printHelp() {
  console.log(`
Re-enrich Place Script

Re-enriches a specific place using Google Maps Dataset API (high accuracy).

Usage:
  npx tsx scripts/re-enrich-place.ts --id=<placeId>
  npx tsx scripts/re-enrich-place.ts --name="<searchTerm>"

Options:
  --id=<n>           Place ID to re-enrich
  --name=<text>      Search by name (partial match)
  --help             Show this help

Examples:
  npx tsx scripts/re-enrich-place.ts --id=199
  npx tsx scripts/re-enrich-place.ts --name="Avonturia"
`);
}

async function findPlace(id?: number, name?: string): Promise<Place | null> {
  if (id) {
    const result = await sql`
      SELECT p.id, p.name, p.address, c.name as city_name, co.name as country_name
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE p.id = ${id}
    ` as Place[];
    return result[0] || null;
  }

  if (name) {
    const result = await sql`
      SELECT p.id, p.name, p.address, c.name as city_name, co.name as country_name
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE LOWER(p.name) LIKE ${'%' + name.toLowerCase() + '%'}
      LIMIT 1
    ` as Place[];
    return result[0] || null;
  }

  return null;
}

async function triggerDatasetCollection(place: Place): Promise<string | null> {
  const searchQuery = encodeURIComponent(`${place.name} ${place.city_name} ${place.country_name}`);
  const url = `https://www.google.com/maps/search/${searchQuery}`;

  console.log(`📍 Search URL: ${url}\n`);

  try {
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHTDATA_API_KEY}`,
        },
        body: JSON.stringify([{ url }]),
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

async function pollForResults(snapshotId: string, maxAttempts = 30): Promise<GoogleMapsPlace | null> {
  console.log(`\n⏳ Polling for results (max ${maxAttempts * 10}s)...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, 10000));

    try {
      const progressRes = await fetch(
        `https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
        { headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` } }
      );

      if (progressRes.ok) {
        const progress = await progressRes.json();
        console.log(`   [${attempt}/${maxAttempts}] Status: ${progress.status}`);

        if (progress.status === "ready") {
          const resultsRes = await fetch(
            `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
            { headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` } }
          );

          if (resultsRes.ok) {
            const results = await resultsRes.json() as GoogleMapsPlace[];
            console.log(`\n✅ Got ${results.length} result(s)`);
            return results[0] || null;
          }
        } else if (progress.status === "failed") {
          console.error("❌ Dataset collection failed");
          return null;
        }
      }
    } catch (error) {
      console.log(`   [${attempt}/${maxAttempts}] Polling error, retrying...`);
    }
  }

  console.error("❌ Timeout waiting for results");
  return null;
}

async function updatePlace(placeId: number, gmData: GoogleMapsPlace): Promise<boolean> {
  try {
    const scrapedContent = {
      googlePlaceId: gmData.place_id,
      googleRating: gmData.rating,
      googleReviewCount: gmData.reviews_count,
      description: gmData.description,
      ratingSource: "google_maps_dataset",
      ratingConfidence: 98,
      enrichedAt: new Date().toISOString(),
      reEnrichedAt: new Date().toISOString(),
    };

    const newFlags = JSON.stringify([
      "RATING_VIA_GOOGLE",
      "ENRICHMENT_COMPLETE",
      "RE_ENRICHED",
    ]);

    await sql`
      UPDATE places SET
        avg_rating = ${gmData.rating || null},
        review_count = ${gmData.reviews_count || null},
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
    console.error(`❌ Update error:`, error instanceof Error ? error.message : error);
    return false;
  }
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.id && !args.name) {
    console.error("❌ Please provide --id=<placeId> or --name=<searchTerm>");
    process.exit(1);
  }

  console.log("\n🔄 Re-enrich Place");
  console.log("━".repeat(50));

  if (!BRIGHTDATA_API_KEY) {
    console.error("❌ BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  // Find the place
  const place = await findPlace(args.id || undefined, args.name);

  if (!place) {
    console.error("❌ Place not found");
    process.exit(1);
  }

  console.log(`\n📍 Found: ${place.name}`);
  console.log(`   ID: ${place.id}`);
  console.log(`   City: ${place.city_name}`);
  console.log(`   Country: ${place.country_name}\n`);

  // Check current data
  const current = await sql`
    SELECT avg_rating, review_count, scraped_content
    FROM places WHERE id = ${place.id}
  `;

  console.log("📊 Current data:");
  console.log(`   Rating: ${current[0].avg_rating}`);
  console.log(`   Reviews: ${current[0].review_count}`);
  console.log(`   Source: ${current[0].scraped_content?.ratingSource || "unknown"}`);
  console.log("");

  // Trigger Google Maps Dataset collection
  console.log("🔄 Triggering Google Maps Dataset collection...\n");
  const snapshotId = await triggerDatasetCollection(place);

  if (!snapshotId) {
    console.error("❌ Failed to trigger collection");
    process.exit(1);
  }

  // Poll for results
  const gmData = await pollForResults(snapshotId);

  if (!gmData) {
    console.error("❌ No results received");
    process.exit(1);
  }

  console.log("\n📊 New Google data:");
  console.log(`   Name: ${gmData.name}`);
  console.log(`   Rating: ${gmData.rating}`);
  console.log(`   Reviews: ${gmData.reviews_count}`);
  if (gmData.phone_number) console.log(`   Phone: ${gmData.phone_number}`);

  // Compare
  console.log("\n📈 Comparison:");
  console.log(`   Rating: ${current[0].avg_rating} → ${gmData.rating}`);
  console.log(`   Reviews: ${current[0].review_count} → ${gmData.reviews_count}`);

  // Update
  console.log("\n💾 Updating database...");
  const success = await updatePlace(place.id, gmData);

  if (success) {
    console.log("✅ Successfully updated!");

    // Verify
    const updated = await sql`
      SELECT avg_rating, review_count, scraped_content
      FROM places WHERE id = ${place.id}
    `;

    console.log("\n📊 Verified data:");
    console.log(`   Rating: ${updated[0].avg_rating}`);
    console.log(`   Reviews: ${updated[0].review_count}`);
    console.log(`   Source: ${updated[0].scraped_content?.ratingSource}`);
    console.log(`   Confidence: ${updated[0].scraped_content?.ratingConfidence}%`);
  } else {
    console.error("❌ Update failed");
    process.exit(1);
  }
}

main().catch(console.error);
