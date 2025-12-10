/**
 * Check Enrichment Status
 *
 * Provides a detailed overview of data enrichment status across the database.
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

async function getEnrichmentOverview() {
  // 1. Total counts
  const totalPlaces = await sql`SELECT COUNT(*) as count FROM places`;

  // 2. Enrichment by data availability
  const enrichmentStatus = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating IS NOT NULL) as has_rating,
      COUNT(*) FILTER (WHERE website IS NOT NULL) as has_website,
      COUNT(*) FILTER (WHERE email IS NOT NULL) as has_email,
      COUNT(*) FILTER (WHERE phone IS NOT NULL) as has_phone,
      COUNT(*) FILTER (WHERE opening_hours IS NOT NULL) as has_opening_hours,
      COUNT(*) FILTER (WHERE review_count IS NOT NULL AND review_count > 0) as has_reviews,
      COUNT(*) FILTER (WHERE avg_rating IS NOT NULL AND website IS NOT NULL AND opening_hours IS NOT NULL) as full_enrichment,
      COUNT(*) FILTER (WHERE avg_rating IS NOT NULL AND (website IS NULL OR opening_hours IS NULL)) as partial_enrichment,
      COUNT(*) FILTER (WHERE avg_rating IS NULL) as no_enrichment
    FROM places
  `;

  // 3. Data quality flags breakdown
  const flagsBreakdown = await sql`
    SELECT
      COUNT(*) FILTER (WHERE data_quality_flags @> '"ENRICHMENT_COMPLETE"') as enrichment_complete,
      COUNT(*) FILTER (WHERE data_quality_flags @> '"RATING_VIA_GOOGLE"') as rating_via_google,
      COUNT(*) FILTER (WHERE data_quality_flags @> '"HAS_OPENING_HOURS"') as has_opening_hours_flag,
      COUNT(*) FILTER (WHERE data_quality_flags @> '"HAS_WEBSITE"') as has_website_flag,
      COUNT(*) FILTER (WHERE data_quality_flags @> '"HAS_REVIEWS"') as has_reviews_flag
    FROM places
  `;

  // 4. AI Content coverage
  let aiContentStatus = { place_content: 0, city_content: 0, combo_content: 0 };
  try {
    const placeAI = await sql`SELECT COUNT(*) as count FROM ai_generated_content WHERE entity_type = 'place'`;
    const cityAI = await sql`SELECT COUNT(*) as count FROM ai_generated_content WHERE entity_type = 'city'`;
    const comboAI = await sql`SELECT COUNT(*) as count FROM ai_generated_content WHERE entity_type = 'combo'`;
    aiContentStatus = {
      place_content: parseInt(placeAI[0].count as string),
      city_content: parseInt(cityAI[0].count as string),
      combo_content: parseInt(comboAI[0].count as string)
    };
  } catch(e: any) {
    console.log("AI content table check failed:", e.message);
  }

  // 5. Places needing re-enrichment (rating only, no website/hours)
  const needsReenrichment = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE data_quality_flags @> '"ENRICHMENT_COMPLETE"'
      AND (website IS NULL OR opening_hours IS NULL)
      AND avg_rating IS NOT NULL
  `;

  // 6. Places completely missing enrichment
  const noEnrichmentDetails = await sql`
    SELECT p.id, p.name, c.name as city
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    WHERE p.avg_rating IS NULL
    LIMIT 20
  `;

  // 7. Breakdown by scraped_content category
  const byCategorySlug = await sql`
    SELECT
      p.scraped_content->>'category' as category_slug,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE p.avg_rating IS NOT NULL AND p.website IS NOT NULL AND p.opening_hours IS NOT NULL) as full_enrichment,
      COUNT(*) FILTER (WHERE p.avg_rating IS NOT NULL AND (p.website IS NULL OR p.opening_hours IS NULL)) as partial_enrichment
    FROM places p
    WHERE p.scraped_content->>'category' IS NOT NULL
    GROUP BY p.scraped_content->>'category'
    ORDER BY total DESC
  `;

  // 8. By city
  const byCity = await sql`
    SELECT
      c.name as city,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE p.avg_rating IS NOT NULL AND p.website IS NOT NULL AND p.opening_hours IS NOT NULL) as full_enrichment,
      COUNT(*) FILTER (WHERE p.avg_rating IS NOT NULL AND (p.website IS NULL OR p.opening_hours IS NULL)) as partial_enrichment
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    GROUP BY c.name
    ORDER BY total DESC
    LIMIT 15
  `;

  const pct = (val: any) => ((parseInt(val as string) / parseInt(totalPlaces[0].count as string)) * 100).toFixed(1);

  console.log("╔═══════════════════════════════════════════════════════════════╗");
  console.log("║        CUTIEPAWSPEDIA - ENRICHMENT STATUS OVERZICHT           ║");
  console.log("╚═══════════════════════════════════════════════════════════════╝\n");

  console.log("📊 TOTAAL PLACES:", totalPlaces[0].count);
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 📍 DATA BESCHIKBAARHEID                                         │");
  console.log("├─────────────────────────────────────────────────────────────────┤");
  console.log(`│   Rating:         ${String(enrichmentStatus[0].has_rating).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_rating).padStart(5)}%)      │`);
  console.log(`│   Website:        ${String(enrichmentStatus[0].has_website).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_website).padStart(5)}%)      │`);
  console.log(`│   Email:          ${String(enrichmentStatus[0].has_email).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_email).padStart(5)}%)      │`);
  console.log(`│   Phone:          ${String(enrichmentStatus[0].has_phone).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_phone).padStart(5)}%)      │`);
  console.log(`│   Opening Hours:  ${String(enrichmentStatus[0].has_opening_hours).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_opening_hours).padStart(5)}%)      │`);
  console.log(`│   Reviews:        ${String(enrichmentStatus[0].has_reviews).padStart(4)} / ${totalPlaces[0].count} (${pct(enrichmentStatus[0].has_reviews).padStart(5)}%)      │`);
  console.log("└─────────────────────────────────────────────────────────────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 🎯 ENRICHMENT NIVEAU                                            │");
  console.log("├─────────────────────────────────────────────────────────────────┤");
  console.log(`│   ✅ Volledig (rating + website + hours): ${String(enrichmentStatus[0].full_enrichment).padStart(4)} (${pct(enrichmentStatus[0].full_enrichment).padStart(5)}%) │`);
  console.log(`│   ⚠️  Gedeeltelijk (alleen rating):       ${String(enrichmentStatus[0].partial_enrichment).padStart(4)} (${pct(enrichmentStatus[0].partial_enrichment).padStart(5)}%) │`);
  console.log(`│   ❌ Geen enrichment:                     ${String(enrichmentStatus[0].no_enrichment).padStart(4)} (${pct(enrichmentStatus[0].no_enrichment).padStart(5)}%) │`);
  console.log("└─────────────────────────────────────────────────────────────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 🏷️  DATA QUALITY FLAGS                                          │");
  console.log("├─────────────────────────────────────────────────────────────────┤");
  console.log(`│   ENRICHMENT_COMPLETE:  ${String(flagsBreakdown[0].enrichment_complete).padStart(4)}                              │`);
  console.log(`│   RATING_VIA_GOOGLE:    ${String(flagsBreakdown[0].rating_via_google).padStart(4)}                              │`);
  console.log(`│   HAS_OPENING_HOURS:    ${String(flagsBreakdown[0].has_opening_hours_flag).padStart(4)}                              │`);
  console.log(`│   HAS_WEBSITE:          ${String(flagsBreakdown[0].has_website_flag).padStart(4)}                              │`);
  console.log(`│   HAS_REVIEWS:          ${String(flagsBreakdown[0].has_reviews_flag).padStart(4)}                              │`);
  console.log("└─────────────────────────────────────────────────────────────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 🤖 AI CONTENT                                                   │");
  console.log("├─────────────────────────────────────────────────────────────────┤");
  console.log(`│   Places:       ${String(aiContentStatus.place_content).padStart(4)} records                             │`);
  console.log(`│   Cities:       ${String(aiContentStatus.city_content).padStart(4)} records                             │`);
  console.log(`│   Combos:       ${String(aiContentStatus.combo_content).padStart(4)} records                             │`);
  console.log("└─────────────────────────────────────────────────────────────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 🔄 ACTIE NODIG                                                  │");
  console.log("├─────────────────────────────────────────────────────────────────┤");
  console.log(`│   Re-enrich (rating only, geen website/hours): ${String(needsReenrichment[0].count).padStart(4)}         │`);
  console.log(`│   Helemaal geen enrichment:                    ${String(enrichmentStatus[0].no_enrichment).padStart(4)}         │`);
  console.log("└─────────────────────────────────────────────────────────────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 📂 PER CATEGORIE                                                │");
  console.log("├───────────────────────────┬───────┬────────┬────────┬──────────┤");
  console.log("│ Categorie                 │ Total │ Volledig│Partial│Compleet %│");
  console.log("├───────────────────────────┼───────┼────────┼────────┼──────────┤");
  byCategorySlug.forEach((cat: any) => {
    const catTotal = parseInt(cat.total as string);
    const catFull = parseInt(cat.full_enrichment as string);
    const catPartial = parseInt(cat.partial_enrichment as string);
    const catPct = catTotal > 0 ? ((catFull / catTotal) * 100).toFixed(0) : "0";
    const catName = (cat.category_slug || "unknown").substring(0, 25);
    console.log(`│ ${catName.padEnd(25)} │ ${String(cat.total).padStart(5)} │ ${String(cat.full_enrichment).padStart(6)} │ ${String(cat.partial_enrichment).padStart(6)} │ ${catPct.padStart(7)}% │`);
  });
  console.log("└───────────────────────────┴───────┴────────┴────────┴──────────┘");
  console.log("");

  console.log("┌─────────────────────────────────────────────────────────────────┐");
  console.log("│ 🏙️  PER STAD (top 15)                                           │");
  console.log("├───────────────────────────┬───────┬────────┬────────┬──────────┤");
  console.log("│ Stad                      │ Total │ Volledig│Partial│Compleet %│");
  console.log("├───────────────────────────┼───────┼────────┼────────┼──────────┤");
  byCity.forEach((city: any) => {
    const cityTotal = parseInt(city.total as string);
    const cityFull = parseInt(city.full_enrichment as string);
    const cityPartial = parseInt(city.partial_enrichment as string);
    const cityPct = cityTotal > 0 ? ((cityFull / cityTotal) * 100).toFixed(0) : "0";
    const cityName = (city.city || "unknown").substring(0, 25);
    console.log(`│ ${cityName.padEnd(25)} │ ${String(city.total).padStart(5)} │ ${String(city.full_enrichment).padStart(6)} │ ${String(city.partial_enrichment).padStart(6)} │ ${cityPct.padStart(7)}% │`);
  });
  console.log("└───────────────────────────┴───────┴────────┴────────┴──────────┘");

  const noEnrichCount = parseInt(enrichmentStatus[0].no_enrichment as string);
  if (noEnrichCount > 0) {
    console.log("\n⚠️  PLACES ZONDER ENRICHMENT (eerste 20):");
    noEnrichmentDetails.forEach((p: any) => {
      console.log(`   - ID ${p.id}: ${p.name} (${p.city})`);
    });
  }
}

getEnrichmentOverview().catch(console.error);
