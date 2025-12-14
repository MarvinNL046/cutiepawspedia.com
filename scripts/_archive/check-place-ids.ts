import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function check() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DB URL");
    process.exit(1);
  }

  const sql = neon(connectionString);

  const result = await sql`
    SELECT
      count(*) as total,
      count(google_place_id) as with_place_id,
      count(google_cid) as with_cid
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
  `;

  console.log("Nederland places:");
  console.log("Total:", result[0].total);
  console.log("Met google_place_id:", result[0].with_place_id);
  console.log("Met google_cid:", result[0].with_cid);

  const examples = await sql`
    SELECT p.name, p.google_place_id, p.google_cid
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
      AND (p.google_place_id IS NOT NULL OR p.google_cid IS NOT NULL)
    LIMIT 5
  `;

  console.log("\nVoorbeelden:");
  for (const e of examples) {
    console.log(`- ${e.name}: place_id=${e.google_place_id || "NULL"}, cid=${e.google_cid || "NULL"}`);
  }

  process.exit(0);
}
check();
