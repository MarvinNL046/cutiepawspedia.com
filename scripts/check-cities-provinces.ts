import "dotenv/config";
import { db } from "@/db";
import { cities, provinces, countries } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

async function checkCitiesProvinces() {
  // Get all provinces with their city counts
  const provinceData = await db.execute(sql`
    SELECT p.name as province, p.slug, COUNT(c.id) as city_count
    FROM provinces p
    LEFT JOIN cities c ON c.province_id = p.id
    WHERE p.country_id = 1
    GROUP BY p.id, p.name, p.slug
    ORDER BY city_count DESC
  `);

  console.log("=== PROVINCES AND CITY COUNTS ===");
  provinceData.rows.forEach((r: any) => {
    console.log(`${r.province}: ${r.city_count} cities`);
  });

  // Get all cities we have data for
  console.log("\n=== ALL CITIES IN DATABASE (29 total) ===");
  const allCities = await db.query.cities.findMany({
    with: { province: true },
    orderBy: (cities, { asc }) => [asc(cities.name)],
  });

  allCities.forEach((c) => {
    console.log(`- ${c.name} (${c.province?.name || "no province"})`);
  });

  // Show which provinces are MISSING cities
  console.log("\n=== PROVINCES WITH NO CITIES ===");
  const emptyProvinces = provinceData.rows.filter((r: any) => r.city_count === "0" || r.city_count === 0);
  emptyProvinces.forEach((r: any) => {
    console.log(`- ${r.province} (${r.slug})`);
  });

  process.exit(0);
}

checkCitiesProvinces();
