/**
 * Nederland Data Overzicht Script
 *
 * Geeft een compleet overzicht van alle NL data in de database
 *
 * Gebruik: npx tsx scripts/nl-overview.ts
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function nlOverview() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const sql = neon(connectionString);

  // Totaal per categorie via junction table
  const byCategory = await sql`
    SELECT
      c.slug as category,
      count(DISTINCT p.id) as total,
      sum(case when p.description is not null and p.description != '' then 1 else 0 end) as with_desc,
      sum(case when p.opening_hours is not null then 1 else 0 end) as with_hours,
      sum(case when p.phone is not null and p.phone != '' then 1 else 0 end) as with_phone,
      sum(case when p.website is not null and p.website != '' then 1 else 0 end) as with_website
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    LEFT JOIN place_categories ptc ON p.id = ptc.place_id
    LEFT JOIN categories c ON ptc.category_id = c.id
    WHERE co.name = 'Netherlands'
    GROUP BY c.slug
    ORDER BY count(DISTINCT p.id) DESC
  `;

  console.log("\n🇳🇱 NEDERLAND DATA OVERZICHT\n");
  console.log("=".repeat(80));

  let totalPlaces = 0;
  let totalWithDesc = 0;

  console.log("\n📊 PER CATEGORIE:\n");
  console.log("Categorie".padEnd(25) + "Totaal".padStart(8) + "Beschr.".padStart(10) + "Uren".padStart(8) + "Tel".padStart(8) + "Web".padStart(8));
  console.log("-".repeat(67));

  for (const cat of byCategory) {
    totalPlaces += Number(cat.total);
    totalWithDesc += Number(cat.with_desc || 0);
    console.log(
      (cat.category || "geen categorie").padEnd(25) +
      String(cat.total).padStart(8) +
      String(cat.with_desc || 0).padStart(10) +
      String(cat.with_hours || 0).padStart(8) +
      String(cat.with_phone || 0).padStart(8) +
      String(cat.with_website || 0).padStart(8)
    );
  }

  console.log("-".repeat(67));
  console.log("TOTAAL".padEnd(25) + String(totalPlaces).padStart(8) + String(totalWithDesc).padStart(10));

  const enrichPct = totalPlaces > 0 ? Math.round((totalWithDesc / totalPlaces) * 100) : 0;
  console.log(`\nVerrijking: ${enrichPct}% heeft beschrijving`);

  // Totaal unieke places
  const totalUnique = await sql`
    SELECT count(*) as total
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
  `;
  console.log(`\nTotaal unieke places: ${totalUnique[0]?.total || 0}`);

  // Per stad top 15
  const byCity = await sql`
    SELECT ci.name as city, count(*) as total
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
    GROUP BY ci.name
    ORDER BY count(*) DESC
    LIMIT 15
  `;

  console.log("\n\n🏙️ TOP 15 STEDEN:\n");
  for (const city of byCity) {
    console.log(`  ${city.city}: ${city.total} places`);
  }

  // Zonder beschrijving per categorie
  const needEnrich = await sql`
    SELECT c.slug as category, count(DISTINCT p.id) as count
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    LEFT JOIN place_categories ptc ON p.id = ptc.place_id
    LEFT JOIN categories c ON ptc.category_id = c.id
    WHERE co.name = 'Netherlands'
      AND (p.description IS NULL OR p.description = '')
    GROUP BY c.slug
    ORDER BY count(DISTINCT p.id) DESC
  `;

  console.log("\n\n⚠️ NODIG VERRIJKING (geen beschrijving):\n");
  let totalNeedEnrich = 0;
  for (const cat of needEnrich) {
    totalNeedEnrich += Number(cat.count);
    console.log(`  ${cat.category || "geen categorie"}: ${cat.count} places`);
  }
  console.log(`\n  TOTAAL TE VERRIJKEN: ${totalNeedEnrich}`);

  process.exit(0);
}

nlOverview().catch(e => { console.error(e); process.exit(1); });
