/**
 * Find and optionally remove duplicate places in the database
 * Duplicates are identified by same name appearing in multiple cities
 * but with address indicating they belong to a different city
 */

import "dotenv/config";
import { db } from "../db";
import { places, cities } from "../db/schema";
import { eq, sql, ilike, or, and, ne } from "drizzle-orm";

const DRY_RUN = !process.argv.includes("--fix");

// Cities that appear in address fields but places are assigned to wrong cities
const CITY_INDICATORS = [
  "vreeland", "uitgeest", "aalsmeer", "amstelveen", "diemen", "weesp",
  "zaandam", "purmerend", "haarlem", "hilversum", "almere", "hoofddorp",
  "schiphol", "abcoude", "bussum", "naarden", "muiden", "landsmeer",
  "brussel", "bruxelles", "antwerpen", "gent", "brugge", "leuven",
  "mechelen", "hasselt", "luik", "liège", "charleroi", "namur",
  "laarne", "haaltert", "temse", "dilbeek", "zaventem", "grimbergen"
];

async function findDuplicates() {
  console.log("🔍 Finding duplicate places...\n");
  console.log(DRY_RUN ? "⚠️  DRY RUN - No changes will be made" : "🔧 FIX MODE - Will remove duplicates");
  console.log("");

  // Find places with duplicate names
  const duplicateNames = await db.execute(sql`
    SELECT name, COUNT(*) as count, array_agg(id) as ids
    FROM places
    GROUP BY name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 50
  `);

  console.log(`Found ${duplicateNames.rows.length} names with duplicates:\n`);

  let totalToRemove = 0;
  const toRemove: number[] = [];

  for (const row of duplicateNames.rows) {
    const name = row.name as string;
    const ids = row.ids as number[];

    // Get full details of these places
    const duplicatePlaces = await db.select({
      id: places.id,
      name: places.name,
      address: places.address,
      cityId: places.cityId,
      slug: places.slug
    })
    .from(places)
    .where(sql`id = ANY(${ids})`);

    // Check if any have mismatched cities
    const mismatched: typeof duplicatePlaces = [];
    const correct: typeof duplicatePlaces = [];

    for (const place of duplicatePlaces) {
      const addressLower = (place.address || "").toLowerCase();

      // Get the city this place is assigned to
      const cityResult = await db.select({ name: cities.name, slug: cities.slug })
        .from(cities)
        .where(eq(cities.id, place.cityId!))
        .limit(1);

      const cityName = cityResult[0]?.name?.toLowerCase() || "";
      const citySlug = cityResult[0]?.slug || "";

      // Check if address contains a different city name
      let hasMismatch = false;
      for (const indicator of CITY_INDICATORS) {
        if (indicator !== cityName && addressLower.includes(indicator)) {
          hasMismatch = true;
          break;
        }
      }

      if (hasMismatch) {
        mismatched.push({ ...place, cityId: place.cityId });
        (place as any).citySlug = citySlug;
      } else {
        correct.push(place);
      }
    }

    if (mismatched.length > 0) {
      console.log(`\n📍 "${name}" (${duplicatePlaces.length} copies)`);

      for (const place of duplicatePlaces) {
        const cityResult = await db.select({ name: cities.name, slug: cities.slug })
          .from(cities)
          .where(eq(cities.id, place.cityId!))
          .limit(1);

        const isMismatched = mismatched.some(m => m.id === place.id);
        const marker = isMismatched ? "❌ REMOVE" : "✅ KEEP";

        console.log(`   ${marker}: ID ${place.id} | City: ${cityResult[0]?.name} | Address: ${place.address || "(no address)"}`);

        if (isMismatched) {
          toRemove.push(place.id);
          totalToRemove++;
        }
      }
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   Total duplicates found: ${duplicateNames.rows.length} names`);
  console.log(`   Places to remove: ${totalToRemove}`);

  if (!DRY_RUN && toRemove.length > 0) {
    console.log(`\n🗑️  Removing ${toRemove.length} mismatched places...`);

    for (const id of toRemove) {
      await db.delete(places).where(eq(places.id, id));
      console.log(`   Deleted place ID: ${id}`);
    }

    console.log(`\n✅ Done! Removed ${toRemove.length} duplicate places.`);
  } else if (toRemove.length > 0) {
    console.log(`\n💡 Run with --fix to remove these duplicates`);
  }

  process.exit(0);
}

findDuplicates().catch(console.error);
