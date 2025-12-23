/**
 * Update Province Counts Script
 *
 * Updates the denormalized cityCount and placeCount for all provinces.
 * Run this after bulk imports or when counts are out of sync.
 *
 * Usage:
 *   npx tsx scripts/update-province-counts.ts
 */

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

const client = neon(DATABASE_URL);
const db = drizzle(client);

async function updateProvinceCounts() {
  console.log("🔄 Updating province city and place counts...\n");

  try {
    // Update cityCount for all provinces
    const cityCountResult = await db.execute(sql`
      UPDATE provinces p
      SET city_count = (
        SELECT COUNT(*)
        FROM cities c
        WHERE c.province_id = p.id
      ),
      updated_at = NOW()
    `);

    console.log("✅ Updated city counts for all provinces");

    // Update placeCount for all provinces (places linked via cities)
    const placeCountResult = await db.execute(sql`
      UPDATE provinces p
      SET place_count = (
        SELECT COUNT(*)
        FROM places pl
        JOIN cities c ON pl.city_id = c.id
        WHERE c.province_id = p.id
      ),
      updated_at = NOW()
    `);

    console.log("✅ Updated place counts for all provinces");

    // Show summary of provinces with counts
    const summary = await db.execute(sql`
      SELECT
        p.name as province,
        co.name as country,
        p.city_count,
        p.place_count
      FROM provinces p
      JOIN countries co ON p.country_id = co.id
      WHERE p.city_count > 0 OR p.place_count > 0
      ORDER BY co.name, p.name
      LIMIT 50
    `);

    console.log("\n📊 Province counts summary (first 50 with data):\n");
    console.log("Province | Country | Cities | Places");
    console.log("-".repeat(60));

    for (const row of summary.rows) {
      console.log(
        `${(row.province as string).substring(0, 20).padEnd(20)} | ${(row.country as string).substring(0, 12).padEnd(12)} | ${String(row.city_count).padStart(6)} | ${String(row.place_count).padStart(6)}`
      );
    }

    // Get total stats
    const totals = await db.execute(sql`
      SELECT
        COUNT(*) as total_provinces,
        SUM(city_count) as total_cities_linked,
        SUM(place_count) as total_places_linked
      FROM provinces
    `);

    console.log("\n📈 Totals:");
    console.log(`   Provinces: ${totals.rows[0].total_provinces}`);
    console.log(`   Cities linked to provinces: ${totals.rows[0].total_cities_linked}`);
    console.log(`   Places linked via provinces: ${totals.rows[0].total_places_linked}`);

    // Check for provinces still with 0 cities
    const zeroProvinces = await db.execute(sql`
      SELECT
        co.name as country,
        COUNT(*) as provinces_with_zero_cities
      FROM provinces p
      JOIN countries co ON p.country_id = co.id
      WHERE p.city_count = 0
      GROUP BY co.name
      ORDER BY co.name
    `);

    if (zeroProvinces.rows.length > 0) {
      console.log("\n⚠️  Provinces with 0 cities (by country):");
      for (const row of zeroProvinces.rows) {
        console.log(`   ${row.country}: ${row.provinces_with_zero_cities} provinces`);
      }
      console.log("\n   Note: This may indicate cities are not linked to provinces yet.");
    }

    console.log("\n✅ Done!");

  } catch (error) {
    console.error("❌ Error updating province counts:", error);
    process.exit(1);
  }
}

updateProvinceCounts();
