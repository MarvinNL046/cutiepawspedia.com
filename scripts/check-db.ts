#!/usr/bin/env npx tsx
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function checkDatabase() {
  console.log("🔍 VOLLEDIGE DATABASE ANALYSE\n");
  console.log("━".repeat(60));

  // Total places
  const totalPlaces = await sql`SELECT COUNT(*) as total FROM places`;
  console.log("\n📊 TOTAAL PLACES: " + totalPlaces[0].total);

  // Places per country (using country column directly)
  console.log("\n🌍 PLACES PER LAND (via country kolom):");
  const placesByCountry = await sql`
    SELECT
      COALESCE(country, 'unknown') as country,
      COUNT(*) as count
    FROM places
    GROUP BY country
    ORDER BY count DESC
    LIMIT 20
  `;
  placesByCountry.forEach(row => {
    console.log("   " + row.country + ": " + row.count);
  });

  // Cities count
  console.log("\n🏙️ STEDEN PER LAND:");
  const citiesByCountry = await sql`
    SELECT
      c.code as country_code,
      c.name as country_name,
      COUNT(ci.id) as city_count
    FROM countries c
    LEFT JOIN cities ci ON ci.country_id = c.id
    GROUP BY c.id, c.code, c.name
    ORDER BY city_count DESC
  `;
  citiesByCountry.forEach(row => {
    console.log("   " + row.country_code + " (" + row.country_name + "): " + row.city_count + " steden");
  });

  // Check UK and DE specifically
  console.log("\n🇬🇧 UK CHECK:");
  const ukPlaces = await sql`SELECT COUNT(*) as count FROM places WHERE UPPER(country) = 'UK' OR UPPER(country) = 'GB' OR country ILIKE '%united kingdom%'`;
  console.log("   UK places: " + ukPlaces[0].count);

  const ukCities = await sql`SELECT COUNT(*) as count FROM cities ci JOIN countries c ON ci.country_id = c.id WHERE c.code IN ('UK', 'GB')`;
  console.log("   UK cities in DB: " + ukCities[0].count);

  console.log("\n🇩🇪 GERMANY CHECK:");
  const dePlaces = await sql`SELECT COUNT(*) as count FROM places WHERE UPPER(country) = 'DE' OR country ILIKE '%germany%' OR country ILIKE '%deutschland%'`;
  console.log("   DE places: " + dePlaces[0].count);

  const deCities = await sql`SELECT COUNT(*) as count FROM cities ci JOIN countries c ON ci.country_id = c.id WHERE c.code = 'DE'`;
  console.log("   DE cities in DB: " + deCities[0].count);

  // Sample places to see country format
  console.log("\n📋 VOORBEELD PLACES:");
  const samples = await sql`
    SELECT id, name, city, country
    FROM places
    ORDER BY RANDOM()
    LIMIT 10
  `;
  samples.forEach(row => {
    console.log("   " + row.name + " - " + row.city + ", " + row.country);
  });

  // Check unique country values
  console.log("\n📋 ALLE UNIEKE COUNTRY WAARDEN:");
  const uniqueCountries = await sql`
    SELECT DISTINCT country, COUNT(*) as count
    FROM places
    GROUP BY country
    ORDER BY count DESC
  `;
  uniqueCountries.forEach(row => {
    console.log("   '" + row.country + "': " + row.count);
  });

  process.exit(0);
}

checkDatabase().catch(console.error);
