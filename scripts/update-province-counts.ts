import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL as string);

async function updateProvinceCounts() {
  console.log("Updating province city and place counts...\n");

  // Update city counts for each province
  const cityCountUpdate = await sql`
    UPDATE provinces p
    SET city_count = (
      SELECT COUNT(*)
      FROM cities c
      WHERE c.province_id = p.id
    ),
    updated_at = NOW()
  `;
  console.log("✅ Updated city counts for all provinces");

  // Update place counts for each province (places in cities that belong to the province)
  const placeCountUpdate = await sql`
    UPDATE provinces p
    SET place_count = (
      SELECT COUNT(*)
      FROM places pl
      JOIN cities c ON pl.city_id = c.id
      WHERE c.province_id = p.id
    ),
    updated_at = NOW()
  `;
  console.log("✅ Updated place counts for all provinces");

  // Show the results
  const results = await sql`
    SELECT p.name, p.city_count, p.place_count
    FROM provinces p
    ORDER BY p.name
  `;

  console.log("\nUpdated province counts:");
  results.forEach((p: { name: string; city_count: number; place_count: number }) => {
    console.log(`  ${p.name}: ${p.city_count} cities, ${p.place_count} places`);
  });

  // Verify totals match
  const totalCities = await sql`SELECT COUNT(*) as count FROM cities WHERE province_id IS NOT NULL`;
  const sumCounts = await sql`SELECT SUM(city_count) as sum FROM provinces`;

  console.log(`\nVerification:`);
  console.log(`  Total cities with province_id: ${totalCities[0].count}`);
  console.log(`  Sum of province city_counts: ${sumCounts[0].sum}`);

  if (Number(totalCities[0].count) === Number(sumCounts[0].sum)) {
    console.log("  ✅ Counts match!");
  } else {
    console.log("  ⚠️ Counts don't match - some cities may have NULL province_id");
  }
}

updateProvinceCounts().catch(console.error);
