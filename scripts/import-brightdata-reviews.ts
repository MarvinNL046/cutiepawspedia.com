#!/usr/bin/env npx tsx
/**
 * Import BrightData Reviews from JSON file
 *
 * Imports reviews from a downloaded BrightData snapshot JSON file
 * into the database, matching places by place_id or CID.
 *
 * Usage:
 *   npx tsx scripts/import-brightdata-reviews.ts <json-file>
 *   npx tsx scripts/import-brightdata-reviews.ts data/raw/bright/nl/sd_mj5rg4ln2m89nx74nl.json
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

interface BrightDataTopReview {
  content: string;
  rating: number;
  review_date: string;
  reviewer_image_url?: string;
  reviewer_name: string;
  reviewer_photos_number?: number;
  reviewer_reviews_number?: number;
}

interface BrightDataPlace {
  place_id: string;
  url: string;
  name: string;
  top_reviews?: BrightDataTopReview[];
  reviews_count?: number;
  rating?: number;
}

interface FormattedReview {
  text: string;
  rating: number;
  author: string;
  date: string | null;
  reviewerReviews: number;
  reviewerPhotos: number;
}

// Extract CID from Google Maps URL
function extractCidFromUrl(url: string): string | null {
  const cidMatch = url.match(/cid=(\d+)/);
  return cidMatch ? cidMatch[1] : null;
}

// Format reviews for database storage
function formatTopReviews(topReviews: BrightDataTopReview[] | undefined): FormattedReview[] {
  if (!topReviews || !Array.isArray(topReviews)) {
    return [];
  }

  return topReviews
    .slice(0, 5) // Max 5 reviews
    .map(r => ({
      text: (r.content || "").replace(/\s+/g, " ").trim().slice(0, 500),
      rating: r.rating || 0,
      author: r.reviewer_name || "Anoniem",
      date: r.review_date || null,
      reviewerReviews: r.reviewer_reviews_number || 0,
      reviewerPhotos: r.reviewer_photos_number || 0,
    }))
    .filter(r => r.text.length >= 10); // Min 10 chars
}

async function importReviews(jsonPath: string) {
  console.log("\n📥 BrightData Reviews Importer");
  console.log("━".repeat(60));
  console.log(`   File: ${jsonPath}\n`);

  // Read JSON file
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const places: BrightDataPlace[] = JSON.parse(rawData);

  console.log(`   Found ${places.length} places in JSON\n`);

  let updated = 0;
  let noReviews = 0;
  let notFound = 0;
  let errors = 0;

  for (const place of places) {
    const cid = extractCidFromUrl(place.url);
    const reviews = formatTopReviews(place.top_reviews);

    if (reviews.length === 0) {
      console.log(`   ⚪ ${place.name.padEnd(35)} → No reviews`);
      noReviews++;
      continue;
    }

    // Find place by google_place_id or google_cid
    const dbPlace = await sql`
      SELECT id, name FROM places
      WHERE google_place_id = ${place.place_id}
         OR google_cid = ${cid}
      LIMIT 1
    `;

    if (dbPlace.length === 0) {
      console.log(`   ❓ ${place.name.padEnd(35)} → Not found in DB`);
      notFound++;
      continue;
    }

    // Build the complete JSON object to merge
    const scrapedData = {
      googleReviews: reviews,
      reviewsScrapedAt: new Date().toISOString(),
    };

    try {
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
        WHERE id = ${dbPlace[0].id}
      `;

      console.log(`   ✅ ${place.name.padEnd(35)} → ${reviews.length} reviews saved`);
      updated++;
    } catch (error) {
      console.log(`   ❌ ${place.name.padEnd(35)} → Error: ${error}`);
      errors++;
    }
  }

  console.log("\n" + "━".repeat(60));
  console.log("📊 Summary:");
  console.log(`   ✅ Updated:    ${updated}`);
  console.log(`   ⚪ No reviews: ${noReviews}`);
  console.log(`   ❓ Not found:  ${notFound}`);
  console.log(`   ❌ Errors:     ${errors}`);
  console.log("━".repeat(60) + "\n");
}

// Main
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: npx tsx scripts/import-brightdata-reviews.ts <json-file>");
  process.exit(1);
}

importReviews(jsonPath).catch(e => {
  console.error(e);
  process.exit(1);
});
