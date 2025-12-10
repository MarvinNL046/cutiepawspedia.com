/**
 * Analyze Incomplete Places
 * 
 * Looks at places that have avg_rating but are missing website or opening_hours.
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function analyzeIncompletePlaces() {
  console.log("=== INCOMPLETE PLACES ANALYSE ===\n");

  // Total incomplete
  const total = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
  `;
  console.log(`📊 Totaal incomplete places: ${total[0].count}`);

  // Break down by what's missing
  const breakdown = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE website IS NULL AND opening_hours IS NULL) as missing_both,
      COUNT(*) FILTER (WHERE website IS NULL AND opening_hours IS NOT NULL) as missing_website_only,
      COUNT(*) FILTER (WHERE website IS NOT NULL AND opening_hours IS NULL) as missing_hours_only
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
  `;
  console.log("\n=== BREAKDOWN ===");
  console.log(`❌ Mist beide (website + hours): ${breakdown[0].missing_both}`);
  console.log(`🌐 Mist alleen website: ${breakdown[0].missing_website_only}`);
  console.log(`🕐 Mist alleen opening hours: ${breakdown[0].missing_hours_only}`);

  // Check enrichment status of incomplete places
  const enrichmentStatus = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE scraped_content->>'enrichedAt' IS NOT NULL) as enriched,
      COUNT(*) FILTER (WHERE scraped_content->>'enrichedAt' IS NULL) as not_enriched,
      COUNT(*) FILTER (WHERE scraped_content->>'reEnrichedAt' IS NOT NULL) as re_enriched,
      COUNT(*) FILTER (WHERE scraped_content->>'googlePlaceId' IS NOT NULL) as has_google_place_id
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
  `;
  console.log("\n=== ENRICHMENT STATUS ===");
  console.log(`✅ Wel enriched: ${enrichmentStatus[0].enriched}`);
  console.log(`❌ Niet enriched: ${enrichmentStatus[0].not_enriched}`);
  console.log(`🔄 Re-enriched: ${enrichmentStatus[0].re_enriched}`);
  console.log(`📍 Heeft Google Place ID: ${enrichmentStatus[0].has_google_place_id}`);

  // Sample of incomplete places
  const sample = await sql`
    SELECT 
      id, name, city, avg_rating, review_count,
      website, opening_hours,
      scraped_content->>'enrichedAt' as enriched_at,
      scraped_content->>'googlePlaceId' as google_place_id,
      scraped_content->>'scrapedAt' as scraped_at
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
    ORDER BY review_count DESC NULLS LAST
    LIMIT 10
  `;
  console.log("\n=== TOP 10 INCOMPLETE (by review count) ===");
  sample.forEach((p: any) => {
    console.log(`\n📍 ${p.name} (${p.city})`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Rating: ${p.avg_rating}⭐ (${p.review_count || 0} reviews)`);
    console.log(`   Website: ${p.website || '❌ MISSING'}`);
    console.log(`   Hours: ${p.opening_hours ? '✅' : '❌ MISSING'}`);
    console.log(`   Google Place ID: ${p.google_place_id || '❌ MISSING'}`);
    console.log(`   Enriched: ${p.enriched_at || 'Never'}`);
  });

  // Check if these places have googleReviews but still missing data
  const withReviewsButIncomplete = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
      AND scraped_content ? 'googleReviews'
  `;
  console.log(`\n📝 Incomplete maar WEL Google reviews: ${withReviewsButIncomplete[0].count}`);

  // Rating source distribution
  const ratingSources = await sql`
    SELECT 
      scraped_content->>'ratingSource' as source,
      COUNT(*) as count
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
    GROUP BY scraped_content->>'ratingSource'
    ORDER BY count DESC
  `;
  console.log("\n=== RATING SOURCE DISTRIBUTION ===");
  ratingSources.forEach((r: any) => {
    console.log(`   ${r.source || 'unknown'}: ${r.count}`);
  });
}

analyzeIncompletePlaces().catch(console.error);
