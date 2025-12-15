#!/usr/bin/env npx tsx
/**
 * Verify US States and Canadian Provinces setup
 */
import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function verify() {
  // Check US states
  const usStates = await sql`SELECT COUNT(*) as count FROM provinces WHERE country_id = 10`;
  console.log("US States:", usStates[0].count);

  // Check CA provinces
  const caProvinces = await sql`SELECT COUNT(*) as count FROM provinces WHERE country_id = 11`;
  console.log("Canadian Provinces:", caProvinces[0].count);

  // Check cities with province_id set
  const usCities = await sql`
    SELECT c.name as city, p.name as state
    FROM cities c
    JOIN provinces p ON c.province_id = p.id
    WHERE c.country_id = 10
    LIMIT 5
  `;
  console.log("\nSample US cities with states:");
  usCities.forEach((c: { city: string; state: string }) => console.log(`  ${c.city}, ${c.state}`));

  const caCities = await sql`
    SELECT c.name as city, p.name as province
    FROM cities c
    JOIN provinces p ON c.province_id = p.id
    WHERE c.country_id = 11
    LIMIT 5
  `;
  console.log("\nSample Canadian cities with provinces:");
  caCities.forEach((c: { city: string; province: string }) => console.log(`  ${c.city}, ${c.province}`));

  // Sample URLs that should now work
  console.log("\n📌 Sample URLs that will now work:");
  const samples = await sql`
    SELECT
      'en' as locale,
      co.slug as country_slug,
      p.slug as province_slug,
      c.slug as city_slug
    FROM cities c
    JOIN provinces p ON c.province_id = p.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code IN ('US', 'CA')
    LIMIT 6
  `;
  samples.forEach((s: { locale: string; country_slug: string; province_slug: string; city_slug: string }) => {
    console.log(`  /${s.locale}/${s.country_slug}/p/${s.province_slug}/${s.city_slug}/veterinary`);
  });

  process.exit(0);
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
