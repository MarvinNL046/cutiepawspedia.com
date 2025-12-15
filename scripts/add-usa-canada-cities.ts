#!/usr/bin/env npx tsx
/**
 * Add US and Canadian cities to the database
 */
import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Top 150 US cities by population
const usCities = [
  // Top 50 (largest)
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
  "San Francisco", "Indianapolis", "Seattle", "Denver", "Boston",
  "Nashville", "Portland", "Las Vegas", "Detroit", "Oklahoma City",
  "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque",
  "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta",
  "Kansas City", "Colorado Springs", "Miami", "Raleigh", "Omaha",
  "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa",
  "Tampa", "Arlington", "New Orleans", "Wichita", "Cleveland",
  // 51-100
  "Bakersfield", "Aurora", "Anaheim", "Honolulu", "Santa Ana",
  "Riverside", "Corpus Christi", "Lexington", "Henderson", "Stockton",
  "Saint Paul", "Cincinnati", "St. Louis", "Pittsburgh", "Greensboro",
  "Lincoln", "Anchorage", "Plano", "Orlando", "Irvine",
  "Newark", "Durham", "Chula Vista", "Toledo", "Fort Wayne",
  "St. Petersburg", "Laredo", "Jersey City", "Chandler", "Madison",
  "Lubbock", "Scottsdale", "Reno", "Buffalo", "Gilbert",
  "Glendale", "North Las Vegas", "Winston-Salem", "Chesapeake", "Norfolk",
  "Fremont", "Garland", "Irving", "Hialeah", "Richmond",
  "Boise", "Spokane", "Baton Rouge", "Tacoma", "San Bernardino",
  // 101-150
  "Modesto", "Fontana", "Des Moines", "Moreno Valley", "Santa Clarita",
  "Fayetteville", "Birmingham", "Oxnard", "Rochester", "Port St. Lucie",
  "Grand Rapids", "Huntsville", "Salt Lake City", "Frisco", "Yonkers",
  "Amarillo", "Glendale", "Huntington Beach", "McKinney", "Montgomery",
  "Augusta", "Aurora", "Akron", "Little Rock", "Tempe",
  "Overland Park", "Grand Prairie", "Tallahassee", "Cape Coral", "Mobile",
  "Knoxville", "Shreveport", "Worcester", "Ontario", "Vancouver",
  "Sioux Falls", "Chattanooga", "Brownsville", "Fort Lauderdale", "Providence",
  "Newport News", "Rancho Cucamonga", "Santa Rosa", "Peoria", "Oceanside",
  "Elk Grove", "Salem", "Pembroke Pines", "Eugene", "Garden Grove"
];

// Top 100 Canadian cities by population
const canadaCities = [
  // Major cities (already have)
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
  "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
  "London", "Victoria", "Halifax", "Saskatoon", "Regina",
  // Additional cities 16-50
  "St. Catharines", "Kelowna", "Barrie", "Sherbrooke", "Guelph",
  "Kanata", "Abbotsford", "Trois-Rivières", "Kingston", "Milton",
  "Thunder Bay", "St. John's", "Moncton", "Nanaimo", "Sudbury",
  "Brantford", "Fredericton", "Red Deer", "Lethbridge", "Kamloops",
  "Saint John", "Charlottetown", "Medicine Hat", "Drummondville", "Granby",
  "Prince George", "Sault Ste. Marie", "Peterborough", "Newmarket", "Sarnia",
  "Chilliwack", "Belleville", "Woodstock", "Shawinigan", "Airdrie",
  // 51-100
  "North Bay", "Cornwall", "Saint-Hyacinthe", "Vernon", "Courtenay",
  "Brandon", "Chatham-Kent", "Georgetown", "Spruce Grove", "Leamington",
  "Prince Albert", "Moose Jaw", "Fort McMurray", "Timmins", "Orillia",
  "Stratford", "Orangeville", "Cochrane", "Okotoks", "Leduc",
  "Campbell River", "Cranbrook", "Fort Saskatchewan", "Lloydminster", "Yorkton",
  "Cold Lake", "Brooks", "Whitehorse", "Yellowknife", "Dawson Creek",
  "Port Coquitlam", "Maple Ridge", "Delta", "Burnaby", "Coquitlam",
  "Richmond", "North Vancouver", "Surrey", "Langley", "Mississauga",
  "Brampton", "Markham", "Vaughan", "Oakville", "Burlington",
  "Oshawa", "Whitby", "Ajax", "Pickering", "Richmond Hill"
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
