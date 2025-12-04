/**
 * Google Places Enrichment via BrightData Datasets API
 *
 * Uses BrightData's Google Maps Dataset (gd_m8ebnr0q2qlklc02fz) to fetch
 * real Google Maps ratings, reviews, and business data.
 *
 * This script:
 * 1. Constructs Google Maps search URLs for each place
 * 2. Triggers BrightData to scrape those URLs
 * 3. Polls for results (async API)
 * 4. Updates the database with real Google data
 *
 * Gebruik: npx tsx scripts/enrich-google-places.ts [--city amsterdam] [--limit 10]
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

// BrightData Datasets API configuration
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
// Correct dataset ID for Google Maps scraping
const GOOGLE_MAPS_DATASET_ID = "gd_m8ebnr0q2qlklc02fz";

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  website: string | null;
  phone: string | null;
  avg_rating: string | null;
  review_count: number | null;
  lat: string | null;
  lng: string | null;
  category_slug: string | null;
}

interface GoogleMapsResult {
  title?: string;
  name?: string;
  rating?: number;
  reviews?: number;
  reviews_count?: number;
  address?: string;
  full_address?: string;
  phone?: string;
  website?: string;
  place_id?: string;
  thumbnail?: string;
  main_image?: string;
  photos?: string[];
  images?: string[];
  description?: string;
  about?: string;
  category?: string;
  type?: string;
  opening_hours?: Record<string, string>;
  hours?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  lat?: number;
  lng?: number;
  url?: string;
  input_url?: string;
}

/**
 * Build a Google Maps search URL for a business
 */
function buildGoogleMapsSearchUrl(businessName: string, city: string): string {
  const searchQuery = `${businessName} ${city}`;
  const encodedQuery = encodeURIComponent(searchQuery).replace(/%20/g, "+");
  return `https://www.google.com/maps/search/${encodedQuery}`;
}

/**
 * Trigger Google Maps scraping for multiple places and wait for results
 */
async function scrapeGoogleMapsPlaces(
  places: Place[]
): Promise<Map<number, GoogleMapsResult>> {
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set in .env");
    return new Map();
  }

  // Build URLs for all places
  const urlInputs = places.map((place) => ({
    url: buildGoogleMapsSearchUrl(place.name, place.city_name),
    placeId: place.id,
    placeName: place.name,
  }));

  console.log(`\n📤 Triggering BrightData for ${places.length} places...`);
  for (const input of urlInputs) {
    console.log(`   → ${input.placeName}: ${input.url}`);
  }

  try {
    // Step 1: Trigger the dataset with all URLs
    const triggerResponse = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${GOOGLE_MAPS_DATASET_ID}&include_errors=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlInputs.map((input) => ({ url: input.url }))),
      }
    );

    if (!triggerResponse.ok) {
      const errorText = await triggerResponse.text();
      console.error(`\n❌ Trigger error ${triggerResponse.status}: ${errorText}`);
      return new Map();
    }

    const triggerData = await triggerResponse.json();
    const snapshotId = triggerData.snapshot_id;

    if (!snapshotId) {
      console.error(`\n❌ No snapshot_id returned`);
      return new Map();
    }

    console.log(`\n⏳ Snapshot ID: ${snapshotId}`);
    console.log(`   Polling for results (max 2 minutes)...`);

    // Step 2: Poll for results (max 120 seconds)
    const maxAttempts = 24;
    const pollInterval = 5000; // 5 seconds

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));

      const statusResponse = await fetch(
        `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
          },
        }
      );

      if (statusResponse.status === 200) {
        // Results ready
        const results = (await statusResponse.json()) as GoogleMapsResult[];
        console.log(`\n✅ Results received after ${attempt * 5}s (${results.length} items)`);

        // Match results back to places by URL
        const resultMap = new Map<number, GoogleMapsResult>();

        for (const result of results) {
          // Find the matching place by comparing search URL or result title
          const resultUrl = result.input_url || result.url || "";
          const resultName = (result.title || result.name || "").toLowerCase();

          for (const input of urlInputs) {
            const placeName = input.placeName.toLowerCase();

            // Match by URL or by name similarity
            if (
              resultUrl.includes(encodeURIComponent(input.placeName).replace(/%20/g, "+")) ||
              resultName.includes(placeName) ||
              placeName.includes(resultName)
            ) {
              resultMap.set(input.placeId, result);
              break;
            }
          }
        }

        return resultMap;
      } else if (statusResponse.status === 202) {
        // Still processing
        process.stdout.write(`   ⏳ ${attempt * 5}s... `);
        if (attempt % 4 === 0) console.log(""); // New line every 20 seconds
        continue;
      } else {
        const errorText = await statusResponse.text();
        console.error(`\n❌ Poll error ${statusResponse.status}: ${errorText.slice(0, 200)}`);
        return new Map();
      }
    }

    console.log(`\n⚠️ Timeout waiting for results (120s)`);
    return new Map();
  } catch (error) {
    console.error(`\n❌ Error:`, error instanceof Error ? error.message : error);
    return new Map();
  }
}

/**
 * Update place with Google Maps data
 */
async function updatePlaceWithGoogleData(
  placeId: number,
  placeName: string,
  googleData: GoogleMapsResult
): Promise<boolean> {
  try {
    const rating = googleData.rating || 0;
    const reviewCount = googleData.reviews || googleData.reviews_count || 0;

    if (rating > 0 && reviewCount > 0) {
      // Get images from various possible fields
      const thumbnail = googleData.thumbnail || googleData.main_image || null;
      const photos = googleData.photos || googleData.images || [];

      const scrapedContent = {
        googleRating: rating,
        googleReviewCount: reviewCount,
        googlePlaceId: googleData.place_id || null,
        googleAddress: googleData.address || googleData.full_address || null,
        googlePhone: googleData.phone || null,
        googleWebsite: googleData.website || null,
        googleThumbnail: thumbnail,
        googlePhotos: photos.slice(0, 5),
        googleCategory: googleData.category || googleData.type || null,
        googleAbout: googleData.about || googleData.description || null,
        googleOpeningHours: googleData.opening_hours || googleData.hours || null,
        ratingSource: "google_maps_brightdata",
        ratingConfidence: 98,
        platformRatings: [
          {
            platform: "google",
            rating: rating,
            reviewCount: reviewCount,
          },
        ],
        enrichedAt: new Date().toISOString(),
      };

      // Update lat/lng if we got coordinates and don't have them
      const updateLat = googleData.latitude || googleData.lat || null;
      const updateLng = googleData.longitude || googleData.lng || null;

      await sql`
        UPDATE places
        SET
          avg_rating = ${rating},
          review_count = ${reviewCount},
          lat = COALESCE(lat, ${updateLat}),
          lng = COALESCE(lng, ${updateLng}),
          scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedContent)}::jsonb,
          updated_at = NOW()
        WHERE id = ${placeId}
      `;

      console.log(`   ✅ ${placeName}`);
      console.log(`      ⭐ ${rating}/5 (${reviewCount} reviews)`);
      if (thumbnail) {
        console.log(`      🖼️  Has thumbnail image`);
      }
      if (photos.length > 0) {
        console.log(`      📸 ${photos.length} photos`);
      }

      return true;
    }

    console.log(`   ⚠️ ${placeName} - No rating/review data`);
    return false;
  } catch (error) {
    console.error(`   ❌ ${placeName} - DB error:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🗺️  Google Maps Enrichment via BrightData\n");
  console.log("━".repeat(60));

  // Check credentials
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not found in .env\n");
    console.error("Add to .env:");
    console.error("  BRIGHTDATA_API_TOKEN=your_token_here");
    console.error("\nYou can find this in your BrightData dashboard.");
    process.exit(1);
  }

  console.log(`✅ API Token: ${BRIGHTDATA_API_TOKEN.slice(0, 15)}...`);
  console.log(`✅ Dataset ID: ${GOOGLE_MAPS_DATASET_ID}`);
  console.log("");

  // Parse command line arguments
  const args = process.argv.slice(2);
  const cityArg = args.find((a) => a.startsWith("--city="));
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const cityFilter = cityArg ? cityArg.split("=")[1] : null;
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 5;

  // Build query based on arguments
  let placesQuery;
  if (cityFilter) {
    console.log(`📍 Filtering by city: ${cityFilter}`);
    placesQuery = sql`
      SELECT
        p.id,
        p.name,
        p.address,
        p.website,
        p.phone,
        p.lat,
        p.lng,
        p.avg_rating,
        p.review_count,
        ci.name as city_name,
        co.name as country_name,
        cat.slug as category_slug
      FROM places p
      LEFT JOIN cities ci ON p.city_id = ci.id
      LEFT JOIN countries co ON ci.country_id = co.id
      LEFT JOIN place_categories pc ON p.id = pc.place_id
      LEFT JOIN categories cat ON pc.category_id = cat.id
      WHERE
        LOWER(ci.name) = LOWER(${cityFilter})
        AND (
          p.avg_rating IS NULL
          OR p.avg_rating = 0
          OR p.review_count IS NULL
          OR p.review_count = 0
          OR (p.scraped_content->>'ratingSource') IS NULL
          OR (p.scraped_content->>'ratingSource') NOT LIKE 'google_maps%'
        )
      ORDER BY p.id
      LIMIT ${limit}
    `;
  } else {
    placesQuery = sql`
      SELECT
        p.id,
        p.name,
        p.address,
        p.website,
        p.phone,
        p.lat,
        p.lng,
        p.avg_rating,
        p.review_count,
        ci.name as city_name,
        co.name as country_name,
        cat.slug as category_slug
      FROM places p
      LEFT JOIN cities ci ON p.city_id = ci.id
      LEFT JOIN countries co ON ci.country_id = co.id
      LEFT JOIN place_categories pc ON p.id = pc.place_id
      LEFT JOIN categories cat ON pc.category_id = cat.id
      WHERE
        p.avg_rating IS NULL
        OR p.avg_rating = 0
        OR p.review_count IS NULL
        OR p.review_count = 0
        OR (p.scraped_content->>'ratingSource') IS NULL
        OR (p.scraped_content->>'ratingSource') NOT LIKE 'google_maps%'
      ORDER BY p.id
      LIMIT ${limit}
    `;
  }

  const places = (await placesQuery) as Place[];

  console.log(`📊 Found ${places.length} places to enrich`);

  if (places.length === 0) {
    console.log("\n✅ All places already have Google Maps data!");
    return;
  }

  // Process in batches of 5 (to avoid overwhelming the API)
  const batchSize = 5;
  let totalEnriched = 0;
  let totalFailed = 0;

  for (let i = 0; i < places.length; i += batchSize) {
    const batch = places.slice(i, i + batchSize);
    console.log(`\n${"═".repeat(60)}`);
    console.log(`📦 Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} places`);

    // Scrape all places in this batch
    const results = await scrapeGoogleMapsPlaces(batch);

    // Update database with results
    console.log(`\n📝 Updating database:`);
    for (const place of batch) {
      const googleData = results.get(place.id);

      if (googleData) {
        const updated = await updatePlaceWithGoogleData(place.id, place.name, googleData);
        if (updated) {
          totalEnriched++;
        } else {
          totalFailed++;
        }
      } else {
        console.log(`   ❌ ${place.name} - No match in results`);
        totalFailed++;
      }
    }

    // Rate limiting between batches
    if (i + batchSize < places.length) {
      console.log(`\n💤 Waiting 5 seconds before next batch...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.log(`\n${"━".repeat(60)}`);
  console.log("📊 Enrichment Complete!\n");
  console.log(`   Total processed: ${places.length}`);
  console.log(`   Successfully enriched: ${totalEnriched}`);
  console.log(`   Failed/No data: ${totalFailed}`);

  // Show final stats
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating > 0 AND avg_rating < 5) as with_real_rating,
      COUNT(*) FILTER (WHERE review_count > 0) as with_reviews,
      COUNT(*) FILTER (WHERE scraped_content->>'ratingSource' LIKE 'google_maps%') as google_enriched,
      COUNT(*) FILTER (WHERE scraped_content->>'googleThumbnail' IS NOT NULL) as with_images
    FROM places
  `;

  console.log("\n📈 Database Stats:");
  console.log(stats[0]);
}

main().catch(console.error);
