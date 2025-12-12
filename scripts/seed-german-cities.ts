#!/usr/bin/env npx tsx
/**
 * Seed German Cities
 * 
 * Adds major German cities to the database.
 * Run this before running the pipeline for Germany.
 * 
 * Usage:
 *   npx tsx scripts/seed-german-cities.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

// Top 50 German cities by population
const GERMAN_CITIES = [
  // Top 15 largest cities
  { name: "Berlin", slug: "berlin", lat: 52.52, lng: 13.405 },
  { name: "Hamburg", slug: "hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "München", slug: "munchen", lat: 48.1351, lng: 11.582 },
  { name: "Köln", slug: "koln", lat: 50.9375, lng: 6.9603 },
  { name: "Frankfurt am Main", slug: "frankfurt-am-main", lat: 50.1109, lng: 8.6821 },
  { name: "Stuttgart", slug: "stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Düsseldorf", slug: "dusseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "Leipzig", slug: "leipzig", lat: 51.3397, lng: 12.3731 },
  { name: "Dortmund", slug: "dortmund", lat: 51.5136, lng: 7.4653 },
  { name: "Essen", slug: "essen", lat: 51.4556, lng: 7.0116 },
  { name: "Bremen", slug: "bremen", lat: 53.0793, lng: 8.8017 },
  { name: "Dresden", slug: "dresden", lat: 51.0504, lng: 13.7373 },
  { name: "Hannover", slug: "hannover", lat: 52.3759, lng: 9.732 },
  { name: "Nürnberg", slug: "nurnberg", lat: 49.4521, lng: 11.0767 },
  { name: "Duisburg", slug: "duisburg", lat: 51.4344, lng: 6.7623 },
  
  // Medium-large cities
  { name: "Bochum", slug: "bochum", lat: 51.4818, lng: 7.2162 },
  { name: "Wuppertal", slug: "wuppertal", lat: 51.2562, lng: 7.1508 },
  { name: "Bielefeld", slug: "bielefeld", lat: 52.0302, lng: 8.5325 },
  { name: "Bonn", slug: "bonn", lat: 50.7374, lng: 7.0982 },
  { name: "Münster", slug: "munster", lat: 51.9607, lng: 7.6261 },
  { name: "Mannheim", slug: "mannheim", lat: 49.4875, lng: 8.466 },
  { name: "Karlsruhe", slug: "karlsruhe", lat: 49.0069, lng: 8.4037 },
  { name: "Augsburg", slug: "augsburg", lat: 48.3705, lng: 10.8978 },
  { name: "Wiesbaden", slug: "wiesbaden", lat: 50.0826, lng: 8.24 },
  { name: "Aachen", slug: "aachen", lat: 50.7753, lng: 6.0839 },
  
  // More cities
  { name: "Gelsenkirchen", slug: "gelsenkirchen", lat: 51.5177, lng: 7.0857 },
  { name: "Mönchengladbach", slug: "monchengladbach", lat: 51.1805, lng: 6.4428 },
  { name: "Braunschweig", slug: "braunschweig", lat: 52.2689, lng: 10.5268 },
  { name: "Kiel", slug: "kiel", lat: 54.3233, lng: 10.1228 },
  { name: "Chemnitz", slug: "chemnitz", lat: 50.8278, lng: 12.9214 },
  { name: "Halle", slug: "halle", lat: 51.4969, lng: 11.9688 },
  { name: "Magdeburg", slug: "magdeburg", lat: 52.1205, lng: 11.6276 },
  { name: "Freiburg", slug: "freiburg", lat: 47.999, lng: 7.8421 },
  { name: "Krefeld", slug: "krefeld", lat: 51.3388, lng: 6.5853 },
  { name: "Mainz", slug: "mainz", lat: 49.9929, lng: 8.2473 },
  
  // Additional important cities  
  { name: "Lübeck", slug: "lubeck", lat: 53.8655, lng: 10.6866 },
  { name: "Erfurt", slug: "erfurt", lat: 50.9848, lng: 11.0299 },
  { name: "Rostock", slug: "rostock", lat: 54.0924, lng: 12.0991 },
  { name: "Kassel", slug: "kassel", lat: 51.3127, lng: 9.4797 },
  { name: "Oberhausen", slug: "oberhausen", lat: 51.4963, lng: 6.8635 },
  { name: "Hagen", slug: "hagen", lat: 51.3671, lng: 7.4633 },
  { name: "Saarbrücken", slug: "saarbrucken", lat: 49.2401, lng: 6.9969 },
  { name: "Potsdam", slug: "potsdam", lat: 52.3906, lng: 13.0645 },
  { name: "Hamm", slug: "hamm", lat: 51.6739, lng: 7.8159 },
  { name: "Ludwigshafen", slug: "ludwigshafen", lat: 49.4741, lng: 8.4353 },
  { name: "Oldenburg", slug: "oldenburg", lat: 53.1435, lng: 8.2146 },
  { name: "Osnabrück", slug: "osnabruck", lat: 52.2799, lng: 8.0472 },
  { name: "Solingen", slug: "solingen", lat: 51.1652, lng: 7.0671 },
  { name: "Heidelberg", slug: "heidelberg", lat: 49.3988, lng: 8.6724 },
];

async function main() {
  console.log("🇩🇪 Seeding German Cities\n");
  console.log("━".repeat(50));

  // First, ensure Germany exists as a country
  let countryResult = await sql`
    SELECT id FROM countries WHERE code = 'DE'
  `;

  let countryId: number;

  if (countryResult.length === 0) {
    console.log("Creating Germany in countries table...");
    const inserted = await sql`
      INSERT INTO countries (code, name, slug)
      VALUES ('DE', 'Germany', 'germany')
      RETURNING id
    `;
    countryId = inserted[0].id;
    console.log(`✅ Created Germany with id ${countryId}`);
  } else {
    countryId = countryResult[0].id;
    console.log(`✅ Germany already exists with id ${countryId}`);
  }

  // Check how many cities already exist
  const existingCities = await sql`
    SELECT name FROM cities WHERE country_id = ${countryId}
  `;
  const existingNames = new Set(existingCities.map(c => c.name));

  console.log(`\nExisting cities: ${existingCities.length}`);
  console.log(`Cities to add: ${GERMAN_CITIES.length}\n`);

  let added = 0;
  let skipped = 0;

  for (const city of GERMAN_CITIES) {
    if (existingNames.has(city.name)) {
      console.log(`⏭️  ${city.name} (already exists)`);
      skipped++;
      continue;
    }

    await sql`
      INSERT INTO cities (country_id, name, slug, lat, lng)
      VALUES (${countryId}, ${city.name}, ${city.slug}, ${city.lat}, ${city.lng})
    `;
    console.log(`✅ ${city.name}`);
    added++;
  }

  console.log("\n" + "━".repeat(50));
  console.log(`\n✅ Done!`);
  console.log(`   Added: ${added} cities`);
  console.log(`   Skipped: ${skipped} (already existed)`);
  console.log(`   Total German cities: ${added + existingCities.length}`);
  
  console.log("\n📋 Next steps:");
  console.log("   1. npm run pipeline:discover -- --country=DE --category=veterinary");
  console.log("   2. npm run pipeline:enrich -- --country=DE --resume");
  console.log("   3. npm run pipeline:gmaps -- --country=DE --limit=50");
  console.log("");
  console.log("   Or run overnight:");
  console.log("   ./scripts/run-pipeline-overnight.sh DE");
}

main().catch(console.error);
