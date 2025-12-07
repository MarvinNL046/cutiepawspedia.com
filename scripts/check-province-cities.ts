import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL as string);

async function check() {
  // Check cities with their province assignments
  const cities = await sql`
    SELECT c.name as city, c.slug, c.province_id, p.name as province
    FROM cities c
    LEFT JOIN provinces p ON c.province_id = p.id
    ORDER BY c.name
    LIMIT 30
  `;

  console.log("Cities with province assignments:");
  cities.forEach((c: any) => {
    console.log(`  ${c.city} -> province_id=${c.province_id} (${c.province || "NULL"})`);
  });

  // Count cities per province
  const counts = await sql`
    SELECT p.name, COUNT(c.id) as city_count
    FROM provinces p
    LEFT JOIN cities c ON c.province_id = p.id
    GROUP BY p.id, p.name
    ORDER BY p.name
  `;

  console.log("");
  console.log("Cities per province (from DB):");
  counts.forEach((p: any) => {
    console.log(`  ${p.name}: ${p.city_count} cities`);
  });

  // Check how many cities have NULL province_id
  const nullCount = await sql`
    SELECT COUNT(*) as count FROM cities WHERE province_id IS NULL
  `;
  console.log("");
  console.log(`Cities with NULL province_id: ${nullCount[0].count}`);
}

check();
