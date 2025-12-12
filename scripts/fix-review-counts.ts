#!/usr/bin/env npx tsx
/**
 * Fix unrealistic review counts
 * Review counts over 10,000 are likely errors (decimal point issues)
 * E.g., 69000 should probably be 6900 (divide by 10)
 */

import "dotenv/config";
import { db } from "@/db";
import { places, cities, countries } from "@/db/schema";
import { eq, gt, desc } from "drizzle-orm";

async function main() {
  // First, show places with suspicious review counts
  console.log("🔍 Checking for places with >10,000 reviews...\n");

  const suspiciousPlaces = await db.select({
    id: places.id,
    name: places.name,
    reviewCount: places.reviewCount,
    cityName: cities.name,
    countryName: countries.name
  })
  .from(places)
  .innerJoin(cities, eq(places.cityId, cities.id))
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(gt(places.reviewCount, 10000))
  .orderBy(desc(places.reviewCount))
  .limit(50);

  if (suspiciousPlaces.length === 0) {
    console.log("✅ No places with suspicious review counts found!");
    return;
  }

  console.log(`Found ${suspiciousPlaces.length} places with >10,000 reviews:\n`);

  for (const place of suspiciousPlaces) {
    const originalCount = place.reviewCount || 0;
    const correctedCount = Math.round(originalCount / 10);

    console.log(`${originalCount.toLocaleString()} → ${correctedCount.toLocaleString()} - ${place.name} (${place.cityName}, ${place.countryName})`);
  }

  // Ask for confirmation via command line argument
  const dryRun = !process.argv.includes("--fix");

  if (dryRun) {
    console.log("\n⚠️  DRY RUN - no changes made. Run with --fix to apply corrections.");
    return;
  }

  console.log("\n🔧 Applying corrections...\n");

  for (const place of suspiciousPlaces) {
    const originalCount = place.reviewCount || 0;
    const correctedCount = Math.round(originalCount / 10);

    await db.update(places)
      .set({ reviewCount: correctedCount })
      .where(eq(places.id, place.id));

    console.log(`✅ Fixed: ${place.name} (${originalCount} → ${correctedCount})`);
  }

  console.log("\n✅ All review counts have been corrected!");
}

main().catch(console.error);
