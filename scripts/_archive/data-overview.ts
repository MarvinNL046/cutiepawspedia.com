/**
 * Data Overview Script
 *
 * Geeft een compleet overzicht van alle data in de database per land.
 * Toont wat we hebben en wat we missen.
 *
 * Usage: npx tsx scripts/data-overview.ts
 */

import dotenv from "dotenv";
// Try .env.local first, then .env
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function getDataOverview() {
  console.log("\n" + "═".repeat(80));
  console.log("📊 CUTIEPAWSPEDIA - DATA OVERVIEW");
  console.log("═".repeat(80));
  console.log(`📅 Generated: ${new Date().toLocaleString("nl-NL")}\n`);

  // ============================================================================
  // TOTALEN
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 🌍 TOTALEN".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const totals = await sql`
    SELECT
      (SELECT COUNT(*) FROM countries) as countries,
      (SELECT COUNT(*) FROM cities) as cities,
      (SELECT COUNT(*) FROM places) as places,
      (SELECT COUNT(*) FROM categories) as categories,
      (SELECT COUNT(*) FROM reviews) as reviews,
      (SELECT COUNT(*) FROM businesses) as businesses,
      (SELECT ROUND(AVG(avg_rating)::numeric, 2) FROM places WHERE avg_rating > 0) as avg_rating
  `;

  const t = totals[0];
  console.log(`│  🏳️  Landen:      ${String(t.countries).padStart(8)}                                            │`);
  console.log(`│  🏙️  Steden:      ${String(t.cities).padStart(8)}                                            │`);
  console.log(`│  📍 Bedrijven:   ${String(t.places).padStart(8)}                                            │`);
  console.log(`│  🏷️  Categorieën: ${String(t.categories).padStart(8)}                                            │`);
  console.log(`│  ⭐ Reviews:     ${String(t.reviews).padStart(8)}                                            │`);
  console.log(`│  👤 Business:    ${String(t.businesses).padStart(8)}                                            │`);
  console.log(`│  📊 Gem. Rating: ${String(t.avg_rating || 0).padStart(8)}                                            │`);
  console.log("└" + "─".repeat(78) + "┘\n");

  // ============================================================================
  // PER LAND OVERZICHT
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 🗺️  PER LAND OVERZICHT".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const perCountry = await sql`
    SELECT
      c.code,
      c.name,
      COUNT(DISTINCT ci.id) as cities,
      COUNT(DISTINCT p.id) as places,
      ROUND(AVG(p.avg_rating)::numeric, 2) as avg_rating,
      COUNT(DISTINCT CASE WHEN p.opening_hours IS NOT NULL THEN p.id END) as with_hours,
      COUNT(DISTINCT CASE WHEN p.phone IS NOT NULL THEN p.id END) as with_phone,
      COUNT(DISTINCT CASE WHEN p.website IS NOT NULL THEN p.id END) as with_website,
      COUNT(DISTINCT CASE WHEN p.scraped_content IS NOT NULL THEN p.id END) as enriched
    FROM countries c
    LEFT JOIN cities ci ON ci.country_id = c.id
    LEFT JOIN places p ON p.city_id = ci.id
    GROUP BY c.id, c.code, c.name
    ORDER BY COUNT(DISTINCT p.id) DESC
  `;

  console.log("│  Land        Steden    Places   Rating   Hours   Phone   Web    Enriched │");
  console.log("│  " + "─".repeat(74) + " │");

  for (const c of perCountry) {
    const placesNum = Number(c.places);
    const hoursNum = Number(c.with_hours);
    const phoneNum = Number(c.with_phone);
    const webNum = Number(c.with_website);
    const enrichedNum = Number(c.enriched);

    const hoursPct = placesNum > 0 ? Math.round(hoursNum / placesNum * 100) : 0;
    const phonePct = placesNum > 0 ? Math.round(phoneNum / placesNum * 100) : 0;
    const webPct = placesNum > 0 ? Math.round(webNum / placesNum * 100) : 0;
    const enrichPct = placesNum > 0 ? Math.round(enrichedNum / placesNum * 100) : 0;

    console.log(`│  ${c.code.padEnd(4)} ${c.name.substring(0, 7).padEnd(8)} ${String(c.cities).padStart(5)}    ${String(c.places).padStart(6)}    ${String(c.avg_rating || '-').padStart(4)}    ${String(hoursPct + '%').padStart(4)}    ${String(phonePct + '%').padStart(4)}   ${String(webPct + '%').padStart(4)}      ${String(enrichPct + '%').padStart(4)} │`);
  }
  console.log("└" + "─".repeat(78) + "┘\n");

  // ============================================================================
  // DATA COMPLETENESS
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 📈 DATA COMPLETENESS (alle landen)".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const completeness = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN address IS NOT NULL AND address != '' THEN 1 END) as with_address,
      COUNT(CASE WHEN lat IS NOT NULL AND lng IS NOT NULL THEN 1 END) as with_coords,
      COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as with_phone,
      COUNT(CASE WHEN website IS NOT NULL THEN 1 END) as with_website,
      COUNT(CASE WHEN opening_hours IS NOT NULL THEN 1 END) as with_hours,
      COUNT(CASE WHEN avg_rating > 0 THEN 1 END) as with_rating,
      COUNT(CASE WHEN review_count > 0 THEN 1 END) as with_reviews,
      COUNT(CASE WHEN scraped_content IS NOT NULL THEN 1 END) as enriched,
      COUNT(CASE WHEN description IS NOT NULL AND description != '' THEN 1 END) as with_description
    FROM places
  `;

  const comp = completeness[0];
  const total = Number(comp.total);

  const fields = [
    { name: "Address", value: comp.with_address },
    { name: "Coordinates (lat/lng)", value: comp.with_coords },
    { name: "Phone", value: comp.with_phone },
    { name: "Website", value: comp.with_website },
    { name: "Opening Hours", value: comp.with_hours },
    { name: "Rating", value: comp.with_rating },
    { name: "Review Count", value: comp.with_reviews },
    { name: "Description", value: comp.with_description },
    { name: "Enriched (scraped)", value: comp.enriched },
  ];

  for (const f of fields) {
    const val = Number(f.value);
    const pct = Math.round(val / total * 100);
    const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
    const missing = total - val;
    const icon = pct >= 80 ? "✅" : pct >= 50 ? "⚠️" : "❌";
    console.log(`│  ${icon} ${f.name.padEnd(22)} ${bar} ${String(pct + '%').padStart(4)} (${String(val).padStart(6)} / missing: ${String(missing).padStart(5)}) │`);
  }
  console.log("└" + "─".repeat(78) + "┘\n");

  // ============================================================================
  // CATEGORIES VERDELING
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 🏷️  TOP CATEGORIEËN".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const categories = await sql`
    SELECT
      cat.slug,
      cat.label_key,
      COUNT(pc.place_id) as count
    FROM categories cat
    LEFT JOIN place_categories pc ON pc.category_id = cat.id
    LEFT JOIN places p ON p.id = pc.place_id AND p.status = 'active'
    GROUP BY cat.id, cat.slug, cat.label_key
    ORDER BY COUNT(pc.place_id) DESC
    LIMIT 12
  `;

  for (const cat of categories) {
    const count = Number(cat.count);
    const bar = "█".repeat(Math.min(30, Math.floor(count / 100)));
    console.log(`│  ${cat.slug.substring(0, 20).padEnd(22)} ${String(count).padStart(6)} ${bar.padEnd(32)} │`);
  }
  console.log("└" + "─".repeat(78) + "┘\n");

  // ============================================================================
  // WAT MIST ER NOG?
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 🔧 ACTIE ITEMS".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const missingHours = total - Number(comp.with_hours);
  const missingEnrich = total - Number(comp.enriched);
  const missingPhone = total - Number(comp.with_phone);

  if (missingHours > 0) {
    console.log(`│  📅 ${String(missingHours).padStart(5)} places zonder opening hours                                    │`);
    console.log(`│     → Run: npx tsx scripts/enrich-content-be.ts --batch-size=25              │`);
  }
  if (missingEnrich > 0) {
    console.log(`│  📝 ${String(missingEnrich).padStart(5)} places zonder enriched content                                  │`);
  }
  if (missingPhone > 0) {
    console.log(`│  📞 ${String(missingPhone).padStart(5)} places zonder telefoon                                          │`);
  }

  // Check for countries with few cities
  const smallCountries = perCountry.filter(c => Number(c.cities) < 10 && Number(c.places) < 100);
  if (smallCountries.length > 0) {
    console.log("│                                                                              │");
    console.log("│  🌍 Landen die meer data nodig hebben:                                       │");
    for (const c of smallCountries) {
      console.log(`│     → ${c.code} (${c.name}): ${c.cities} steden, ${c.places} places                          │`.substring(0, 79) + "│");
    }
  }

  console.log("└" + "─".repeat(78) + "┘\n");

  // ============================================================================
  // RECENTE ACTIVITEIT
  // ============================================================================
  console.log("┌" + "─".repeat(78) + "┐");
  console.log("│" + " 📆 RECENTE ACTIVITEIT (laatste 7 dagen)".padEnd(78) + "│");
  console.log("├" + "─".repeat(78) + "┤");

  const recentActivity = await sql`
    SELECT
      DATE(created_at) as date,
      COUNT(*) as places_added
    FROM places
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) DESC
  `;

  if (recentActivity.length === 0) {
    console.log("│  Geen nieuwe places in de afgelopen 7 dagen                                  │");
  } else {
    for (const day of recentActivity) {
      const d = new Date(day.date).toLocaleDateString("nl-NL", { weekday: 'short', day: 'numeric', month: 'short' });
      console.log(`│  ${d.padEnd(15)} +${String(day.places_added).padStart(5)} places                                         │`);
    }
  }
  console.log("└" + "─".repeat(78) + "┘\n");

  console.log("═".repeat(80));
  console.log("✅ Data overview complete!");
}

getDataOverview().catch(console.error);
