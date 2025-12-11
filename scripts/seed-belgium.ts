#!/usr/bin/env npx tsx
/**
 * Seed Belgium Data
 *
 * Seeds the database with Belgium country, provinces, and cities.
 * This creates the geographic structure - places will be added separately via OSM/scraping.
 *
 * Usage:
 *   npx tsx scripts/seed-belgium.ts
 *   npx tsx scripts/seed-belgium.ts --dry-run
 */

import "dotenv/config";
import { parseArgs } from "node:util";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { BE_PROVINCE_CONFIGS } from "./config/be-provinces";
import { BE_CITY_CONFIGS } from "./config/be-cities";

// =============================================================================
// CLI PARSING
// =============================================================================

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", short: "d", default: false },
    verbose: { type: "boolean", short: "v", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (args.help) {
  console.log(`
Seed Belgium Data

Seeds the database with Belgium country, provinces, and cities.

USAGE:
  npx tsx scripts/seed-belgium.ts [options]

OPTIONS:
  -d, --dry-run    Preview without writing to database
  -v, --verbose    Show detailed progress
  -h, --help       Show this help
`);
  process.exit(0);
}

const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// =============================================================================
// LOGGING
// =============================================================================

function log(message: string): void {
  console.log(`[seed-be] ${message}`);
}

function verbose(message: string): void {
  if (VERBOSE) {
    console.log(`  ${message}`);
  }
}


// =============================================================================
// SEEDING LOGIC
// =============================================================================

interface SeedStats {
  country: { id: number; isNew: boolean };
  provinces: { created: number; existing: number };
  cities: { created: number; existing: number };
}

async function main(): Promise<void> {
  const startTime = Date.now();

  log("🇧🇪 Starting Belgium seed...");
  if (DRY_RUN) log("DRY RUN - no database changes will be made");

  log("Connected to database");

  const stats: SeedStats = {
    country: { id: 0, isNew: false },
    provinces: { created: 0, existing: 0 },
    cities: { created: 0, existing: 0 },
  };

  // ==========================================================================
  // Step 1: Ensure Belgium country exists
  // ==========================================================================
  log("Step 1/3: Ensuring Belgium country...");

  const existingCountry = await db
    .select()
    .from(schema.countries)
    .where(eq(schema.countries.code, "BE"))
    .limit(1);

  let countryId: number;

  if (existingCountry.length > 0) {
    countryId = existingCountry[0].id;
    stats.country = { id: countryId, isNew: false };
    verbose(`Country exists: Belgium (id: ${countryId})`);
  } else {
    if (DRY_RUN) {
      verbose("Would insert country: Belgium (BE)");
      countryId = -1;
      stats.country = { id: -1, isNew: true };
    } else {
      const [inserted] = await db
        .insert(schema.countries)
        .values({
          code: "BE",
          slug: "belgie",
          name: "België",
        })
        .returning();
      countryId = inserted.id;
      stats.country = { id: countryId, isNew: true };
      verbose(`Inserted country: België (id: ${countryId})`);
    }
  }

  // ==========================================================================
  // Step 2: Ensure all provinces exist
  // ==========================================================================
  log("Step 2/3: Ensuring provinces...");

  const provinceIdMap = new Map<string, number>();

  for (const province of BE_PROVINCE_CONFIGS) {
    const existing = await db
      .select()
      .from(schema.provinces)
      .where(
        and(
          eq(schema.provinces.countryId, countryId > 0 ? countryId : 1),
          eq(schema.provinces.slug, province.slug)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      provinceIdMap.set(province.slug, existing[0].id);
      stats.provinces.existing++;
      verbose(`Province exists: ${province.name} (id: ${existing[0].id})`);
    } else {
      if (DRY_RUN) {
        verbose(`Would insert province: ${province.name}`);
        provinceIdMap.set(province.slug, -1);
        stats.provinces.created++;
      } else {
        const [inserted] = await db
          .insert(schema.provinces)
          .values({
            countryId: countryId,
            slug: province.slug,
            name: province.name,
            code: province.code,
          })
          .returning();
        provinceIdMap.set(province.slug, inserted.id);
        stats.provinces.created++;
        verbose(`Inserted province: ${province.name} (id: ${inserted.id})`);
      }
    }
  }

  // ==========================================================================
  // Step 3: Ensure all cities exist
  // ==========================================================================
  log("Step 3/3: Ensuring cities...");

  for (const city of BE_CITY_CONFIGS) {
    const provinceId = provinceIdMap.get(city.province);

    const existing = await db
      .select()
      .from(schema.cities)
      .where(
        and(
          eq(schema.cities.countryId, countryId > 0 ? countryId : 1),
          eq(schema.cities.slug, city.citySlug)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      stats.cities.existing++;
      verbose(`City exists: ${city.cityName} (id: ${existing[0].id})`);
    } else {
      if (DRY_RUN) {
        verbose(`Would insert city: ${city.cityName}`);
        stats.cities.created++;
      } else {
        // Calculate center lat/lng from bbox if available
        let lat: number | undefined;
        let lng: number | undefined;
        if (city.bbox) {
          lat = (city.bbox[0] + city.bbox[2]) / 2;
          lng = (city.bbox[1] + city.bbox[3]) / 2;
        }

        const [inserted] = await db
          .insert(schema.cities)
          .values({
            countryId: countryId,
            provinceId: provinceId && provinceId > 0 ? provinceId : null,
            slug: city.citySlug,
            name: city.cityName,
            lat: lat?.toString(),
            lng: lng?.toString(),
          })
          .returning();
        stats.cities.created++;
        verbose(`Inserted city: ${city.cityName} (id: ${inserted.id})`);
      }
    }
  }

  // ==========================================================================
  // Summary
  // ==========================================================================
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "=".repeat(50));
  console.log("🇧🇪 BELGIUM SEED SUMMARY");
  console.log("=".repeat(50));
  console.log(
    `Country:    België (id: ${stats.country.id}) ${stats.country.isNew ? "[NEW]" : "[EXISTS]"}`
  );
  console.log(
    `Provinces:  ${stats.provinces.created} created, ${stats.provinces.existing} existing`
  );
  console.log(
    `Cities:     ${stats.cities.created} created, ${stats.cities.existing} existing`
  );
  console.log("=".repeat(50));
  console.log(`Completed in ${elapsed}s`);

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No actual database changes were made");
  } else {
    console.log("\n✅ Belgium is now ready for place discovery!");
    console.log("\nNext steps:");
    console.log("  1. Run OSM discovery: npx tsx scripts/discover-places.ts --country=be --city=brussel");
    console.log("  2. Enrich with Google: npx tsx scripts/enrich-google-places.ts --country=be --city=brussel");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
