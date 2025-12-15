#!/usr/bin/env npx tsx
/**
 * Add US States and Canadian Provinces to the database
 * Then link existing cities to their correct states/provinces
 *
 * This enables URLs like:
 *   /en/united-states/p/california/los-angeles/veterinary
 *   /en/canada/p/ontario/toronto/veterinary
 */
import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// US States with their cities
const US_STATES: Record<string, { name: string; cities: string[] }> = {
  "alabama": { name: "Alabama", cities: [] },
  "alaska": { name: "Alaska", cities: [] },
  "arizona": { name: "Arizona", cities: ["Phoenix"] },
  "arkansas": { name: "Arkansas", cities: [] },
  "california": { name: "California", cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento"] },
  "colorado": { name: "Colorado", cities: ["Denver"] },
  "connecticut": { name: "Connecticut", cities: [] },
  "delaware": { name: "Delaware", cities: [] },
  "florida": { name: "Florida", cities: ["Jacksonville", "Miami", "Tampa", "Orlando"] },
  "georgia": { name: "Georgia", cities: ["Atlanta"] },
  "hawaii": { name: "Hawaii", cities: [] },
  "idaho": { name: "Idaho", cities: [] },
  "illinois": { name: "Illinois", cities: ["Chicago"] },
  "indiana": { name: "Indiana", cities: ["Indianapolis"] },
  "iowa": { name: "Iowa", cities: [] },
  "kansas": { name: "Kansas", cities: [] },
  "kentucky": { name: "Kentucky", cities: [] },
  "louisiana": { name: "Louisiana", cities: [] },
  "maine": { name: "Maine", cities: [] },
  "maryland": { name: "Maryland", cities: [] },
  "massachusetts": { name: "Massachusetts", cities: ["Boston"] },
  "michigan": { name: "Michigan", cities: [] },
  "minnesota": { name: "Minnesota", cities: ["Minneapolis"] },
  "mississippi": { name: "Mississippi", cities: [] },
  "missouri": { name: "Missouri", cities: [] },
  "montana": { name: "Montana", cities: [] },
  "nebraska": { name: "Nebraska", cities: [] },
  "nevada": { name: "Nevada", cities: ["Las Vegas"] },
  "new-hampshire": { name: "New Hampshire", cities: [] },
  "new-jersey": { name: "New Jersey", cities: [] },
  "new-mexico": { name: "New Mexico", cities: [] },
  "new-york": { name: "New York", cities: ["New York"] },
  "north-carolina": { name: "North Carolina", cities: ["Charlotte", "Raleigh"] },
  "north-dakota": { name: "North Dakota", cities: [] },
  "ohio": { name: "Ohio", cities: ["Columbus"] },
  "oklahoma": { name: "Oklahoma", cities: [] },
  "oregon": { name: "Oregon", cities: ["Portland"] },
  "pennsylvania": { name: "Pennsylvania", cities: ["Philadelphia"] },
  "rhode-island": { name: "Rhode Island", cities: [] },
  "south-carolina": { name: "South Carolina", cities: [] },
  "south-dakota": { name: "South Dakota", cities: [] },
  "tennessee": { name: "Tennessee", cities: ["Nashville"] },
  "texas": { name: "Texas", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"] },
  "utah": { name: "Utah", cities: [] },
  "vermont": { name: "Vermont", cities: [] },
  "virginia": { name: "Virginia", cities: [] },
  "washington": { name: "Washington", cities: ["Seattle"] },
  "west-virginia": { name: "West Virginia", cities: [] },
  "wisconsin": { name: "Wisconsin", cities: [] },
  "wyoming": { name: "Wyoming", cities: [] },
};

// Canadian Provinces with their cities
const CANADA_PROVINCES: Record<string, { name: string; cities: string[] }> = {
  "alberta": { name: "Alberta", cities: ["Calgary", "Edmonton"] },
  "british-columbia": { name: "British Columbia", cities: ["Vancouver", "Victoria"] },
  "manitoba": { name: "Manitoba", cities: ["Winnipeg"] },
  "new-brunswick": { name: "New Brunswick", cities: [] },
  "newfoundland-and-labrador": { name: "Newfoundland and Labrador", cities: [] },
  "nova-scotia": { name: "Nova Scotia", cities: ["Halifax"] },
  "ontario": { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton", "Kitchener", "London"] },
  "prince-edward-island": { name: "Prince Edward Island", cities: [] },
  "quebec": { name: "Quebec", cities: ["Montreal", "Quebec City"] },
  "saskatchewan": { name: "Saskatchewan", cities: ["Saskatoon", "Regina"] },
};

function slugify(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function addStatesAndProvinces() {
  console.log("🌎 Adding US States and Canadian Provinces...\n");

  // Get country IDs - check both slug formats
  const countries = await sql`
    SELECT id, name, slug, code
    FROM countries
    WHERE slug IN ('united-states', 'usa', 'canada')
       OR code IN ('US', 'CA')
  `;

  console.log("Found countries:", countries.map(c => `${c.name} (${c.slug}/${c.code})`).join(", "));

  const usaCountry = countries.find(c => c.code === "US" || c.slug === "usa" || c.slug === "united-states");
  const canadaCountry = countries.find(c => c.code === "CA" || c.slug === "canada");

  if (!usaCountry) {
    console.error("❌ USA not found in countries table!");
    console.log("Creating USA...");
    await sql`
      INSERT INTO countries (name, slug, code)
      VALUES ('United States', 'united-states', 'US')
      ON CONFLICT (slug) DO UPDATE SET code = 'US'
    `;
  }

  if (!canadaCountry) {
    console.error("❌ Canada not found in countries table!");
    console.log("Creating Canada...");
    await sql`
      INSERT INTO countries (name, slug, code)
      VALUES ('Canada', 'canada', 'CA')
      ON CONFLICT (slug) DO UPDATE SET code = 'CA'
    `;
  }

  // Refresh country data
  const refreshedCountries = await sql`
    SELECT id, name, slug, code
    FROM countries
    WHERE code IN ('US', 'CA')
  `;

  const usaId = refreshedCountries.find(c => c.code === "US")?.id;
  const canadaId = refreshedCountries.find(c => c.code === "CA")?.id;

  if (!usaId || !canadaId) {
    console.error("❌ Could not find/create USA or Canada!");
    process.exit(1);
  }

  console.log(`\nUSA country_id: ${usaId}`);
  console.log(`Canada country_id: ${canadaId}\n`);

  // ===========================================================================
  // ADD US STATES
  // ===========================================================================
  console.log("🇺🇸 Adding US States...\n");

  const existingUSStates = await sql`SELECT slug FROM provinces WHERE country_id = ${usaId}`;
  const existingStateSlugs = new Set(existingUSStates.map(s => s.slug));

  let statesAdded = 0;
  for (const [slug, data] of Object.entries(US_STATES)) {
    if (existingStateSlugs.has(slug)) {
      console.log(`  ⏭️  ${data.name} (already exists)`);
      continue;
    }
    await sql`
      INSERT INTO provinces (name, slug, country_id)
      VALUES (${data.name}, ${slug}, ${usaId})
    `;
    console.log(`  ✅ ${data.name}`);
    statesAdded++;
  }
  console.log(`\n  Added ${statesAdded} US states\n`);

  // ===========================================================================
  // ADD CANADIAN PROVINCES
  // ===========================================================================
  console.log("🇨🇦 Adding Canadian Provinces...\n");

  const existingCAProvinces = await sql`SELECT slug FROM provinces WHERE country_id = ${canadaId}`;
  const existingProvinceSlugs = new Set(existingCAProvinces.map(p => p.slug));

  let provincesAdded = 0;
  for (const [slug, data] of Object.entries(CANADA_PROVINCES)) {
    if (existingProvinceSlugs.has(slug)) {
      console.log(`  ⏭️  ${data.name} (already exists)`);
      continue;
    }
    await sql`
      INSERT INTO provinces (name, slug, country_id)
      VALUES (${data.name}, ${slug}, ${canadaId})
    `;
    console.log(`  ✅ ${data.name}`);
    provincesAdded++;
  }
  console.log(`\n  Added ${provincesAdded} Canadian provinces\n`);

  // ===========================================================================
  // LINK CITIES TO STATES/PROVINCES
  // ===========================================================================
  console.log("🔗 Linking cities to states/provinces...\n");

  // Get all provinces
  const allProvinces = await sql`
    SELECT id, name, slug, country_id FROM provinces
    WHERE country_id IN (${usaId}, ${canadaId})
  `;

  // Create lookup by country + name
  const provinceMap = new Map<string, number>();
  for (const p of allProvinces) {
    // Multiple lookup keys for flexibility
    provinceMap.set(`${p.country_id}:${p.name.toLowerCase()}`, p.id);
    provinceMap.set(`${p.country_id}:${p.slug}`, p.id);
  }

  // Link US cities
  console.log("  🇺🇸 Linking US cities...");
  let usLinked = 0;
  for (const [stateSlug, data] of Object.entries(US_STATES)) {
    const provinceId = provinceMap.get(`${usaId}:${stateSlug}`);
    if (!provinceId) continue;

    for (const cityName of data.cities) {
      const citySlug = slugify(cityName);
      const result = await sql`
        UPDATE cities
        SET province_id = ${provinceId}
        WHERE slug = ${citySlug}
          AND country_id = ${usaId}
          AND (province_id IS NULL OR province_id != ${provinceId})
        RETURNING id, name
      `;
      if (result.length > 0) {
        console.log(`    ✅ ${cityName} → ${data.name}`);
        usLinked++;
      }
    }
  }
  console.log(`    Linked ${usLinked} US cities\n`);

  // Link Canadian cities
  console.log("  🇨🇦 Linking Canadian cities...");
  let caLinked = 0;
  for (const [provinceSlug, data] of Object.entries(CANADA_PROVINCES)) {
    const provinceId = provinceMap.get(`${canadaId}:${provinceSlug}`);
    if (!provinceId) continue;

    for (const cityName of data.cities) {
      let citySlug = slugify(cityName);
      // Handle London, Ontario special case
      if (cityName === "London") {
        citySlug = "london-ontario";
      }

      const result = await sql`
        UPDATE cities
        SET province_id = ${provinceId}
        WHERE slug = ${citySlug}
          AND country_id = ${canadaId}
          AND (province_id IS NULL OR province_id != ${provinceId})
        RETURNING id, name
      `;
      if (result.length > 0) {
        console.log(`    ✅ ${cityName} → ${data.name}`);
        caLinked++;
      }
    }
  }
  console.log(`    Linked ${caLinked} Canadian cities\n`);

  // NOTE: Places get province info via city relationship (city.province_id)
  // No direct update needed on places table

  // ===========================================================================
  // SUMMARY
  // ===========================================================================
  console.log("📊 Summary:\n");

  const usStateCount = await sql`SELECT COUNT(*) as count FROM provinces WHERE country_id = ${usaId}`;
  const caProvinceCount = await sql`SELECT COUNT(*) as count FROM provinces WHERE country_id = ${canadaId}`;
  const usCityWithProvince = await sql`
    SELECT COUNT(*) as count FROM cities
    WHERE country_id = ${usaId} AND province_id IS NOT NULL
  `;
  const caCityWithProvince = await sql`
    SELECT COUNT(*) as count FROM cities
    WHERE country_id = ${canadaId} AND province_id IS NOT NULL
  `;

  console.log(`  🇺🇸 US States: ${usStateCount[0].count}`);
  console.log(`  🇺🇸 US Cities with state: ${usCityWithProvince[0].count}`);
  console.log(`  🇨🇦 Canadian Provinces: ${caProvinceCount[0].count}`);
  console.log(`  🇨🇦 Canadian Cities with province: ${caCityWithProvince[0].count}`);

  // Show some sample URLs that will now work
  console.log("\n📌 Sample URLs that will now work:");
  const sampleCities = await sql`
    SELECT c.name as city, c.slug as city_slug,
           pr.name as province, pr.slug as province_slug,
           co.slug as country_slug
    FROM cities c
    JOIN provinces pr ON c.province_id = pr.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code IN ('US', 'CA')
    LIMIT 5
  `;

  for (const city of sampleCities) {
    console.log(`  /en/${city.country_slug}/p/${city.province_slug}/${city.city_slug}/veterinary`);
  }
}

addStatesAndProvinces().catch(e => {
  console.error(e);
  process.exit(1);
});
