import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function checkPetsPlace() {
  // Check remaining Pets Place entries
  const results = await sql`
    SELECT p.id, p.name, p.address, c.name as city, p.review_count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'NL' AND p.name ILIKE '%pets place%'
    ORDER BY p.review_count DESC NULLS LAST
    LIMIT 30
  `;

  console.log("Remaining Pets Place entries in NL:\n");
  for (const r of results) {
    console.log(`ID ${r.id}: ${r.name}`);
    console.log(`   City: ${r.city} | Reviews: ${r.review_count}`);
    console.log(`   Address: ${r.address || "(no address)"}\n`);
  }

  console.log(`\nTotal: ${results.length} entries`);
}

checkPetsPlace();
