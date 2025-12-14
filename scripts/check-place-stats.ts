import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function check() {
  // Check overall stats
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(google_place_id) as with_place_id,
      COUNT(google_cid) as with_cid,
      COUNT(CASE WHEN google_place_id IS NOT NULL AND google_cid IS NOT NULL THEN 1 END) as with_both
    FROM places
  `;

  console.log("=== OVERALL STATS ===");
  console.log("Total places:", stats[0].total);
  console.log("With google_place_id:", stats[0].with_place_id);
  console.log("With google_cid:", stats[0].with_cid);
  console.log("With BOTH:", stats[0].with_both);

  // Per country
  const perCountry = await sql`
    SELECT
      co.name as country,
      COUNT(*) as total,
      COUNT(p.google_place_id) as with_place_id,
      COUNT(p.google_cid) as with_cid
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    GROUP BY co.name
    ORDER BY total DESC
  `;

  console.log("\n=== PER COUNTRY ===");
  for (const row of perCountry) {
    console.log(row.country + ": " + row.total + " total, " + row.with_place_id + " place_ids, " + row.with_cid + " CIDs");
  }

  // Show examples with place_id
  const examples = await sql`
    SELECT name, city, google_place_id, google_cid
    FROM places
    WHERE google_place_id IS NOT NULL
    LIMIT 5
  `;

  console.log("\n=== EXAMPLES WITH PLACE_ID ===");
  for (const e of examples) {
    console.log(e.name + " (" + e.city + ")");
    console.log("  place_id: " + e.google_place_id);
    console.log("  cid: " + (e.google_cid || "NULL"));
  }

  process.exit(0);
}

check();
