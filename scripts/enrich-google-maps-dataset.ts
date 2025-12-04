/**
 * Google Maps Places Dataset Enrichment
 *
 * Uses Brightdata's Google Maps Places Dataset API for structured data:
 * - Rating & reviews
 * - Opening hours
 * - Phone, address
 * - Services provided
 * - Photos
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;

// Google Maps Places Dataset ID
const DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

interface GoogleMapsPlace {
  place_id?: string;
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
}

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
}

/**
 * Construct Google Maps search URL for a place
 */
function buildGoogleMapsUrl(place: Place): string {
  const searchQuery = encodeURIComponent(`${place.name} ${place.city_name} ${place.country_name}`);
  return `https://www.google.com/maps/search/${searchQuery}`;
}

/**
 * Trigger Google Maps Places Dataset collection
 * Uses URL collection mode with Google Maps search URLs
 */
async function triggerDatasetCollection(places: Place[]): Promise<string | null> {
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
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
 * Poll for dataset results
 */
async function pollForResults(snapshotId: string, maxAttempts = 30): Promise<GoogleMapsPlace[]> {
  console.log(`\n⏳ Polling for results (max ${maxAttempts * 10}s)...`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise(r => setTimeout(r, 10000)); // Wait 10 seconds

    try {
      // Check progress first
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
          // Download results
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
 * Match Google Maps result to our place by name similarity
 */
function matchPlaceByName(gmPlace: GoogleMapsPlace, places: Place[]): Place | null {
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
 * Update place with Google Maps data
 */
async function updatePlace(placeId: number, gmData: GoogleMapsPlace): Promise<boolean> {
  try {
    const scrapedContent = {
      googlePlaceId: gmData.place_id,
      googleRating: gmData.rating,
      googleReviewCount: gmData.reviews_count,
      description: gmData.description,
      servicesProvided: gmData.services_provided,
      mainImage: gmData.main_image,
      ratingSource: "google_maps_dataset",
      ratingConfidence: 98, // High confidence from official API
      enrichedAt: new Date().toISOString(),
    };

    const openingHours = convertOpeningHours(gmData.open_hours);

    // Build update query
    const newFlags = JSON.stringify([
      "RATING_VIA_GOOGLE",
      "ENRICHMENT_COMPLETE",
      ...(openingHours ? ["OPENING_HOURS_VIA_SCHEMA"] : []),
    ]);

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

    return true;
  } catch (error) {
    console.error(`   ❌ Update error:`, error instanceof Error ? error.message : error);
    return false;
  }
}

async function main() {
  console.log("🚀 Google Maps Places Dataset Enrichment\n");
  console.log("━".repeat(60));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  // Get places that need enrichment (Amsterdam for testing)
  const places = await sql`
    SELECT
      p.id, p.name, p.address,
      c.name as city_name,
      co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE c.name = 'Amsterdam'
      AND (
        p.opening_hours IS NULL
        OR (p.scraped_content->>'ratingConfidence')::int < 98
      )
    ORDER BY p.id
    LIMIT 5
  ` as Place[];

  console.log(`📊 Found ${places.length} places to enrich\n`);

  if (places.length === 0) {
    console.log("✅ All places already enriched!");
    return;
  }

  places.forEach((p, i) => console.log(`   ${i + 1}. ${p.name} (${p.city_name})`));

  // Trigger dataset collection
  console.log("\n🔄 Triggering Google Maps Dataset collection...\n");
  const snapshotId = await triggerDatasetCollection(places);

  if (!snapshotId) {
    console.error("❌ Failed to trigger dataset collection");
    process.exit(1);
  }

  // Poll for results
  const results = await pollForResults(snapshotId);

  if (results.length === 0) {
    console.error("❌ No results received");
    process.exit(1);
  }

  // Process results
  console.log("\n📊 Processing results...\n");
  let matched = 0;
  let updated = 0;
  let withHours = 0;

  for (const gmPlace of results) {
    const matchedPlace = matchPlaceByName(gmPlace, places);

    if (matchedPlace) {
      matched++;
      console.log(`\n🔍 ${matchedPlace.name}`);

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

      const success = await updatePlace(matchedPlace.id, gmPlace);
      if (success) {
        updated++;
        console.log(`   ✅ Updated!`);
      }
    } else {
      console.log(`\n⚠️ No match for: ${gmPlace.name}`);
    }
  }

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Enrichment Complete!\n");
  console.log(`   Places queried: ${places.length}`);
  console.log(`   Results received: ${results.length}`);
  console.log(`   Matched: ${matched}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   With opening hours: ${withHours}`);
}

main().catch(console.error);
