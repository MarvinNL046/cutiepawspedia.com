/**
 * Detailed analysis of incomplete places
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

async function analyze() {
  console.log("=== DETAILED INCOMPLETE PLACES ANALYSIS ===\n");

  // Group 1: Has ENRICHMENT_COMPLETE flag but still incomplete
  const withFlag = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE data_quality_flags @> '["ENRICHMENT_COMPLETE"]'::jsonb
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;
  console.log(`📍 Met ENRICHMENT_COMPLETE flag maar toch incomplete: ${withFlag[0].count}`);

  // Group 2: Has avg_rating but NO ENRICHMENT_COMPLETE flag
  const withoutFlag = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE (data_quality_flags IS NULL OR NOT data_quality_flags @> '["ENRICHMENT_COMPLETE"]'::jsonb)
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;
  console.log(`📍 GEEN ENRICHMENT_COMPLETE flag, wel rating: ${withoutFlag[0].count}`);

  // Group 3: Has Google Place ID in scraped_content (can be re-enriched)
  const canReEnrich = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE scraped_content->>'googlePlaceId' IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;
  console.log(`📍 Hebben Google Place ID (kunnen re-enriched worden): ${canReEnrich[0].count}`);

  // Group 4: No Google Place ID but has google_cid column
  const hasCidColumn = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE google_cid IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;
  console.log(`📍 Hebben google_cid kolom: ${hasCidColumn[0].count}`);

  // Total that can be processed (union of both)
  const canProcess = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE (
      scraped_content->>'googlePlaceId' IS NOT NULL
      OR google_cid IS NOT NULL
    )
    AND (website IS NULL OR opening_hours IS NULL)
    AND avg_rating IS NOT NULL
  `;
  console.log(`\n✅ TOTAAL dat we kunnen re-enrichen: ${canProcess[0].count}`);

  // Check hoeveel kunnen we NIET re-enrichen (geen Google ID)
  const cannotProcess = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE scraped_content->>'googlePlaceId' IS NULL
      AND (google_cid IS NULL OR google_cid = '')
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;
  console.log(`⚠️  KUNNEN WE NIET re-enrichen (geen Google ID): ${cannotProcess[0].count}`);

  // Sample van places die we kunnen re-enrichen
  const sample = await sql`
    SELECT
      id, name, avg_rating, review_count,
      website IS NOT NULL as has_website,
      opening_hours IS NOT NULL as has_hours,
      scraped_content->>'googlePlaceId' as google_place_id,
      google_cid,
      data_quality_flags
    FROM places
    WHERE (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
    ORDER BY review_count DESC NULLS LAST
    LIMIT 5
  `;
  console.log("\n=== TOP 5 INCOMPLETE (by reviews) ===");
  sample.forEach((p: any) => {
    console.log(`\n📍 ${p.name}`);
    console.log(`   Rating: ${p.avg_rating} (${p.review_count || 0} reviews)`);
    console.log(`   Website: ${p.has_website ? 'YES' : 'NO'} | Hours: ${p.has_hours ? 'YES' : 'NO'}`);
    console.log(`   Google Place ID: ${p.google_place_id || p.google_cid || 'MISSING'}`);
    console.log(`   Flags: ${JSON.stringify(p.data_quality_flags || [])}`);
  });
}

analyze().catch(console.error);
