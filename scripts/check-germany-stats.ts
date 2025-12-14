import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  // Check all columns in places table
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'places' ORDER BY column_name`;
  console.log("All places columns:", cols.map(c => c.column_name).join(", "));
  console.log("");

  // Get cities info with country
  const citiesInfo = await sql`
    SELECT c.name as city_name, co.name as country_name, co.slug as country_slug, COUNT(p.id) as place_count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.slug = 'germany'
    GROUP BY c.name, co.name, co.slug
    ORDER BY place_count DESC
    LIMIT 15
  `;

  console.log("\n🇩🇪 Germany Database Stats\n");

  // Total
  const total = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.slug = 'germany'
  `;
  console.log("📍 Total places:", total[0].count);

  // Skip category query since places_categories doesn't exist

  // Top cities
  console.log("\n🏙️ Top 15 cities:");
  citiesInfo.forEach((c) => console.log("   " + c.city_name + ": " + c.place_count));

  // CID stats
  console.log("\n📊 CID Stats:");

  const withCid = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.slug = 'germany' AND p.google_cid IS NOT NULL AND p.google_cid != ''
  `;
  console.log("   With CID:", withCid[0].count);

  const withPlaceId = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.slug = 'germany' AND p.google_place_id IS NOT NULL AND p.google_place_id != ''
  `;
  console.log("   With Place ID:", withPlaceId[0].count);

  const withoutCid = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.slug = 'germany' AND (p.google_cid IS NULL OR p.google_cid = '')
  `;
  console.log("   Without CID:", withoutCid[0].count);

  process.exit(0);
}
main();
