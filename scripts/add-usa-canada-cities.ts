#!/usr/bin/env npx tsx
/**
 * Add US and Canadian cities to the database
 */
import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Top 30 US cities
const usCities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
  "San Francisco", "Indianapolis", "Seattle", "Denver", "Boston",
  "Nashville", "Portland", "Las Vegas", "Atlanta", "Miami",
  "Tampa", "Orlando", "Minneapolis", "Raleigh", "Sacramento"
];

// Top 15 Canadian cities
const canadaCities = [
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
  "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
  "London", "Victoria", "Halifax", "Saskatoon", "Regina"
];

function slugify(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function addCities() {
  console.log("🌎 Adding US and Canadian cities...\n");

  // Get country IDs
  const countries = await sql`SELECT id, name, slug FROM countries WHERE slug IN ('usa', 'canada')`;
  const usaId = countries.find(c => c.slug === "usa")?.id;
  const canadaId = countries.find(c => c.slug === "canada")?.id;

  if (!usaId || !canadaId) {
    console.error("❌ USA or Canada not found in countries table!");
    process.exit(1);
  }

  console.log(`USA country_id: ${usaId}`);
  console.log(`Canada country_id: ${canadaId}\n`);

  // Get existing cities
  const existingUS = await sql`SELECT slug FROM cities WHERE country_id = ${usaId}`;
  const existingCA = await sql`SELECT slug FROM cities WHERE country_id = ${canadaId}`;
  const existingSlugsUS = new Set(existingUS.map(c => c.slug));
  const existingSlugsCA = new Set(existingCA.map(c => c.slug));

  // Add US cities
  console.log("🇺🇸 Adding US cities...");
  let usAdded = 0;
  for (const name of usCities) {
    const slug = slugify(name);
    if (existingSlugsUS.has(slug)) {
      console.log(`  ⏭️  ${name} (already exists)`);
      continue;
    }
    await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${usaId})`;
    console.log(`  ✅ ${name}`);
    usAdded++;
  }
  console.log(`\n  Added ${usAdded} US cities\n`);

  // Add Canadian cities
  console.log("🇨🇦 Adding Canadian cities...");
  let caAdded = 0;
  for (const name of canadaCities) {
    let slug = slugify(name);
    // Handle London conflict with UK London
    if (name === "London") {
      slug = "london-ontario";
    }
    if (existingSlugsCA.has(slug)) {
      console.log(`  ⏭️  ${name} (already exists)`);
      continue;
    }
    await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${canadaId})`;
    console.log(`  ✅ ${name}`);
    caAdded++;
  }
  console.log(`\n  Added ${caAdded} Canadian cities\n`);

  // Show summary
  const counts = await sql`
    SELECT co.name, co.slug, COUNT(ci.id) as city_count
    FROM countries co
    LEFT JOIN cities ci ON ci.country_id = co.id
    GROUP BY co.id, co.name, co.slug
    ORDER BY co.name
  `;

  console.log("📊 Cities per country:");
  for (const c of counts) {
    console.log(`  ${c.name} (${c.slug}): ${c.city_count} cities`);
  }
}

addCities().catch(e => {
  console.error(e);
  process.exit(1);
});
