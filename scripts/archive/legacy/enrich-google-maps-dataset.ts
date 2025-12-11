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
  google_cid: string | null;  // Google CID for exact matching
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
 * Prefers CID-based URL for exact matching, falls back to search URL
 */
function buildGoogleMapsUrl(place: Place): string {
  if (place.google_cid && isNumericCid(place.google_cid)) {
    // Use CID-based URL for exact place matching (preferred)
    return `https://www.google.com/maps?cid=${place.google_cid}`;
  }
  // Fallback to search URL (for Place IDs or missing CID)
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

async function main() {
  console.log("🚀 Google Maps Places Dataset Enrichment\n");
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
  const forceIncomplete = args.includes("--force-incomplete");
  const allIncomplete = args.includes("--all-incomplete");

  console.log(`📍 City: ${cityFilter || "All"}`);
  console.log(`📊 Limit: ${limit}`);
  if (allIncomplete) {
    console.log(`🔄 Mode: ALL incomplete places (rating but no website/hours, any flag status)`);
  } else if (forceIncomplete) {
    console.log(`🔄 Mode: Force re-enrich ENRICHMENT_COMPLETE places missing data`);
  }
  console.log("");

  // Get places that need enrichment (prioritize those with CIDs for exact matching)
  const cityCondition = cityFilter ? sql`AND c.name = ${cityFilter}` : sql``;

  // Different query based on mode:
  // Normal: places without opening_hours
  // Force-incomplete: places that have ENRICHMENT_COMPLETE but no website OR opening_hours
  // All-incomplete: ALL places with rating but missing website OR opening_hours (regardless of flags)
  let places: Place[];

  if (allIncomplete) {
    // Re-enrich ALL incomplete places - those with rating but missing website or hours
    // This catches both flagged and unflagged places
    places = await sql`
      SELECT
        p.id, p.name, p.address,
        c.name as city_name,
        co.name as country_name,
        p.scraped_content->>'googlePlaceId' as google_cid
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE (p.website IS NULL OR p.opening_hours IS NULL)
        AND p.avg_rating IS NOT NULL
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
        p.scraped_content->>'googlePlaceId' as google_cid
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE p.data_quality_flags @> '["ENRICHMENT_COMPLETE"]'::jsonb
        AND (p.website IS NULL OR p.opening_hours IS NULL)
        AND p.avg_rating IS NOT NULL
        ${cityCondition}
      ORDER BY
        CASE WHEN p.scraped_content->>'googlePlaceId' IS NOT NULL THEN 0 ELSE 1 END,
        p.id
      LIMIT ${limit}
    ` as Place[];
  } else {
    places = await sql`
      SELECT
        p.id, p.name, p.address,
        c.name as city_name,
        co.name as country_name,
        p.scraped_content->>'googlePlaceId' as google_cid
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE p.opening_hours IS NULL
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
  const withPlaceId = places.filter(p => p.google_cid && !isNumericCid(p.google_cid)).length;
  console.log(`   (${withNumericCid} with numeric CID, ${withPlaceId} with Place ID, ${places.length - withNumericCid - withPlaceId} via search)\n`);
  places.slice(0, 10).forEach((p, i) => {
    const marker = p.google_cid
      ? (isNumericCid(p.google_cid) ? " ✓CID" : " ~PlaceID")
      : " ◦search";
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

  if (results.length === 0) {
    console.error("❌ No results received");
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
