import "dotenv/config";
import { db } from "../db";
import { places, cities, countries } from "../db/schema";
import { sql, count, eq } from "drizzle-orm";

async function checkDuplicates() {
  console.log("🔍 Checking for duplicates in database...\n");

  // 1. Check exact name + city_id duplicates
  const exactDuplicates = await db.execute(sql`
    SELECT p.name, c.name as city_name, co.name as country_name, COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY p.name, p.city_id, c.name, co.name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `);

  console.log("📋 Exact duplicates (same name + city):");
  if (exactDuplicates.rows.length === 0) {
    console.log("   ✅ No exact duplicates found!\n");
  } else {
    exactDuplicates.rows.forEach((row: any) => {
      console.log(`   ${row.count}x "${row.name}" in ${row.city_name}, ${row.country_name}`);
    });
    console.log("");
  }

  // 2. Check slug duplicates within same city
  const slugDuplicates = await db.execute(sql`
    SELECT p.slug, c.name as city_name, co.name as country_name, COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY p.slug, p.city_id, c.name, co.name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `);

  console.log("🔗 Slug duplicates (same slug + city):");
  if (slugDuplicates.rows.length === 0) {
    console.log("   ✅ No slug duplicates found!\n");
  } else {
    slugDuplicates.rows.forEach((row: any) => {
      console.log(`   ${row.count}x "${row.slug}" in ${row.city_name}, ${row.country_name}`);
    });
    console.log("");
  }

  // 3. Check same name + address (likely duplicates)
  const addressDuplicates = await db.execute(sql`
    SELECT p.name, p.address, c.name as city_name, COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    WHERE p.address IS NOT NULL AND p.address != ''
    GROUP BY p.name, p.address, c.name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `);

  console.log("🏠 Same name + address duplicates:");
  if (addressDuplicates.rows.length === 0) {
    console.log("   ✅ No name+address duplicates found!\n");
  } else {
    addressDuplicates.rows.forEach((row: any) => {
      console.log(`   ${row.count}x "${row.name}" at "${row.address}" in ${row.city_name}`);
    });
    console.log("");
  }

  // 4. Total counts by country
  const countryCounts = await db.execute(sql`
    SELECT co.name as country_name, COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY co.name
    ORDER BY count DESC
  `);

  console.log("🌍 Places by country:");
  countryCounts.rows.forEach((row: any) => {
    console.log(`   ${row.country_name}: ${row.count} places`);
  });

  // 5. Total count
  const total = await db.select({ count: count() }).from(places);
  console.log(`\n📊 Total places in database: ${total[0].count}`);

  // 6. Check places per city (top 15)
  const cityCounts = await db.execute(sql`
    SELECT c.name as city_name, co.name as country_name, COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY c.name, co.name
    ORDER BY count DESC
    LIMIT 15
  `);

  console.log("\n🏙️ Top 15 cities by place count:");
  cityCounts.rows.forEach((row: any) => {
    console.log(`   ${row.city_name}, ${row.country_name}: ${row.count} places`);
  });

  process.exit(0);
}

checkDuplicates();
