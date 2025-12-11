#!/usr/bin/env npx tsx
/**
 * R4: Seed Neon DB from Staged Data
 *
 * Takes merged & normalized staged data and imports it into the Neon database.
 * Idempotent "upsert" style seeder that can be run per city.
 *
 * Usage:
 *   npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam
 *   npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam --verbose --dry-run
 *
 * Input:
 *   data/staged/{country}/{city}.json
 *
 * Target tables:
 *   - countries
 *   - cities
 *   - categories
 *   - places
 *   - placeCategories
 */

import { parseArgs } from "node:util";
import * as fs from "node:fs";
import * as path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and } from "drizzle-orm";
import * as schema from "../db/schema";
import type { StagedData, StagedPlace } from "../lib/data/types";

// =============================================================================
// LOAD .env FILE
// =============================================================================

function loadEnvFromFile(envPath: string): void {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex);
        let value = trimmed.slice(eqIndex + 1);
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

function loadEnvFiles(): void {
  const cwd = process.cwd();
  // Load in order: .env.example (defaults), .env, .env.local (local overrides)
  loadEnvFromFile(path.join(cwd, ".env.example"));
  loadEnvFromFile(path.join(cwd, ".env"));
  loadEnvFromFile(path.join(cwd, ".env.local"));
}

// Load .env files at script start
loadEnvFiles();

// =============================================================================
// CLI PARSING
// =============================================================================

const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    city: { type: "string", short: "t" },
    force: { type: "boolean", short: "f", default: false },
    "dry-run": { type: "boolean", short: "d", default: false },
    verbose: { type: "boolean", short: "v", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

function showHelp(): void {
  console.log(`
R4: Seed Neon DB from Staged Data

Takes merged & normalized staged data and imports it into the Neon database.

USAGE:
  npx tsx scripts/seed-from-staged.ts --country=<code> --city=<slug> [options]

OPTIONS:
  -c, --country <code>   Country code (e.g., nl, be)
  -t, --city <slug>      City slug (e.g., amsterdam, brussels)
  -f, --force            Allow updating existing records
  -d, --dry-run          Preview without writing to database
  -v, --verbose          Show detailed progress
  -h, --help             Show this help

EXAMPLES:
  npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam
  npx tsx scripts/seed-from-staged.ts -c nl -t amsterdam --verbose
  npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam --force --dry-run

INPUT:
  data/staged/{country}/{city}.json

TARGET TABLES:
  countries, cities, categories, places, placeCategories
`);
}

if (args.help) {
  showHelp();
  process.exit(0);
}

if (!args.country || !args.city) {
  console.error("Error: --country and --city are required");
  showHelp();
  process.exit(1);
}

const COUNTRY = args.country.toLowerCase();
const CITY = args.city.toLowerCase();
const FORCE = args.force ?? false;
const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// =============================================================================
// LOGGING
// =============================================================================

function log(message: string): void {
  console.log(`[seed] ${message}`);
}

function verbose(message: string): void {
  if (VERBOSE) {
    console.log(`  ${message}`);
  }
}

function warn(message: string): void {
  console.warn(`[seed] ⚠️  ${message}`);
}

// =============================================================================
// COUNTRY NAME LOOKUP
// =============================================================================

const COUNTRY_NAMES: Record<string, string> = {
  NL: "Netherlands",
  BE: "Belgium",
  DE: "Germany",
  FR: "France",
  GB: "United Kingdom",
  US: "United States",
  ES: "Spain",
  IT: "Italy",
  PT: "Portugal",
  AT: "Austria",
  CH: "Switzerland",
  PL: "Poland",
  CZ: "Czech Republic",
  DK: "Denmark",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
};

function getCountryNameFromCode(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code.toUpperCase();
}

function getCountrySlugFromCode(code: string): string {
  const name = getCountryNameFromCode(code);
  // Convert "United States" → "united-states", "Netherlands" → "netherlands"
  return name.toLowerCase().replace(/\s+/g, "-");
}

// =============================================================================
// CATEGORY ICON MAPPING
// =============================================================================

const CATEGORY_ICONS: Record<string, string> = {
  veterinary: "Stethoscope",
  shelter: "Home",
  boarding: "Building",
  grooming: "Scissors",
  training: "GraduationCap",
  "pet-store": "ShoppingBag",
  "dog-park": "Trees",
  zoo: "Bird",
  "pet-hotels": "Hotel",
  "dog-walking": "Footprints",
};

const CATEGORY_LABELS: Record<string, string> = {
  veterinary: "Veterinarians",
  shelter: "Animal Shelters",
  boarding: "Pet Boarding",
  grooming: "Pet Grooming",
  training: "Pet Training",
  "pet-store": "Pet Stores",
  "dog-park": "Dog Parks",
  zoo: "Zoos & Aquariums",
  "pet-hotels": "Pet Hotels",
  "dog-walking": "Dog Walking",
};

function getCategoryIcon(slug: string): string | null {
  return CATEGORY_ICONS[slug] || null;
}

function getCategoryLabel(slug: string): string {
  // Return human-readable label, or generate one from slug
  return CATEGORY_LABELS[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// =============================================================================
// DATABASE CONNECTION
// =============================================================================

function createDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

// =============================================================================
// STAGED DATA LOADING
// =============================================================================

function getStagedPath(country: string, city: string): string {
  return path.join(process.cwd(), "data", "staged", country, `${city}.json`);
}

function loadStagedData(filePath: string): StagedData {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Staged data file not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as StagedData;
}

// =============================================================================
// SEEDING STATISTICS
// =============================================================================

interface SeedStats {
  country: { id: number; code: string; isNew: boolean };
  city: { id: number; slug: string; isNew: boolean };
  categories: { created: number; existing: number };
  places: { inserted: number; updated: number; skipped: number };
  placeCategories: { inserted: number; skipped: number };
}

// =============================================================================
// SEEDING LOGIC
// =============================================================================

async function ensureCountry(
  db: ReturnType<typeof createDatabase>,
  countryCode: string,
  dryRun: boolean
): Promise<{ id: number; code: string; isNew: boolean }> {
  const code = countryCode.toUpperCase();
  const slug = getCountrySlugFromCode(code);

  // Check if country exists
  const existing = await db
    .select()
    .from(schema.countries)
    .where(eq(schema.countries.code, code))
    .limit(1);

  if (existing.length > 0) {
    verbose(`Country exists: ${code} (id: ${existing[0].id})`);
    return { id: existing[0].id, code, isNew: false };
  }

  // Insert new country
  const name = getCountryNameFromCode(code);

  if (dryRun) {
    verbose(`Would insert country: ${code} - ${name}`);
    return { id: -1, code, isNew: true };
  }

  const [inserted] = await db
    .insert(schema.countries)
    .values({ code, slug, name })
    .returning();

  verbose(`Inserted country: ${code} - ${name} (id: ${inserted.id})`);
  return { id: inserted.id, code, isNew: true };
}

async function ensureCity(
  db: ReturnType<typeof createDatabase>,
  countryId: number,
  citySlug: string,
  cityName: string,
  dryRun: boolean
): Promise<{ id: number; slug: string; isNew: boolean }> {
  // Check if city exists
  const existing = await db
    .select()
    .from(schema.cities)
    .where(
      and(
        eq(schema.cities.countryId, countryId),
        eq(schema.cities.slug, citySlug)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    verbose(`City exists: ${citySlug} (id: ${existing[0].id})`);
    return { id: existing[0].id, slug: citySlug, isNew: false };
  }

  // Insert new city
  if (dryRun) {
    verbose(`Would insert city: ${cityName} (${citySlug})`);
    return { id: -1, slug: citySlug, isNew: true };
  }

  const [inserted] = await db
    .insert(schema.cities)
    .values({
      countryId,
      slug: citySlug,
      name: cityName,
    })
    .returning();

  verbose(`Inserted city: ${cityName} (id: ${inserted.id})`);
  return { id: inserted.id, slug: citySlug, isNew: true };
}

async function ensureCategories(
  db: ReturnType<typeof createDatabase>,
  categorySlugs: string[],
  dryRun: boolean
): Promise<{ created: number; existing: number; map: Map<string, number> }> {
  const categoryMap = new Map<string, number>();
  let created = 0;
  let existing = 0;

  // Get all existing categories
  const allCategories = await db.select().from(schema.categories);
  for (const cat of allCategories) {
    categoryMap.set(cat.slug, cat.id);
  }

  // Insert missing categories
  for (const slug of categorySlugs) {
    if (categoryMap.has(slug)) {
      existing++;
      continue;
    }

    const icon = getCategoryIcon(slug);
    const labelKey = getCategoryLabel(slug);

    if (dryRun) {
      verbose(`Would insert category: ${slug}`);
      categoryMap.set(slug, -1);
      created++;
      continue;
    }

    const [inserted] = await db
      .insert(schema.categories)
      .values({ slug, icon, labelKey })
      .returning();

    verbose(`Inserted category: ${slug} (id: ${inserted.id})`);
    categoryMap.set(slug, inserted.id);
    created++;
  }

  return { created, existing, map: categoryMap };
}

async function upsertPlace(
  db: ReturnType<typeof createDatabase>,
  cityId: number,
  staged: StagedPlace,
  force: boolean,
  dryRun: boolean
): Promise<{ id: number; action: "inserted" | "updated" | "skipped" }> {
  // Check if place exists by cityId + slug
  const existing = await db
    .select()
    .from(schema.places)
    .where(
      and(eq(schema.places.cityId, cityId), eq(schema.places.slug, staged.slug))
    )
    .limit(1);

  if (existing.length > 0) {
    const existingPlace = existing[0];

    if (force) {
      // Update existing place
      if (dryRun) {
        verbose(`Would update place: ${staged.name} (id: ${existingPlace.id})`);
        return { id: existingPlace.id, action: "updated" };
      }

      await db
        .update(schema.places)
        .set({
          name: staged.name,
          description: staged.description,
          address: staged.address,
          postalCode: staged.postalCode,
          phone: staged.phone,
          website: staged.website,
          email: staged.email,
          lat: staged.lat?.toString(),
          lng: staged.lng?.toString(),
          openingHours: staged.openingHours || null,
          avgRating: staged.avgRating?.toString() || "0",
          reviewCount: staged.reviewCount || 0,
          updatedAt: new Date(),
        })
        .where(eq(schema.places.id, existingPlace.id));

      verbose(`Updated place: ${staged.name} (id: ${existingPlace.id})`);
      return { id: existingPlace.id, action: "updated" };
    } else {
      // Skip existing place
      verbose(`Skipped (exists): ${staged.name} (id: ${existingPlace.id})`);
      return { id: existingPlace.id, action: "skipped" };
    }
  }

  // Insert new place
  if (dryRun) {
    verbose(`Would insert place: ${staged.name}`);
    return { id: -1, action: "inserted" };
  }

  const [inserted] = await db
    .insert(schema.places)
    .values({
      cityId,
      slug: staged.slug,
      name: staged.name,
      description: staged.description,
      address: staged.address,
      postalCode: staged.postalCode,
      phone: staged.phone,
      website: staged.website,
      email: staged.email,
      lat: staged.lat?.toString(),
      lng: staged.lng?.toString(),
      openingHours: staged.openingHours || null,
      isVerified: false,
      isPremium: false,
      avgRating: staged.avgRating?.toString() || "0",
      reviewCount: staged.reviewCount || 0,
    })
    .returning();

  verbose(`Inserted place: ${staged.name} (id: ${inserted.id})`);
  return { id: inserted.id, action: "inserted" };
}

async function linkPlaceCategories(
  db: ReturnType<typeof createDatabase>,
  placeId: number,
  categorySlugs: string[],
  categoryMap: Map<string, number>,
  dryRun: boolean
): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0;
  let skipped = 0;

  for (const slug of categorySlugs) {
    const categoryId = categoryMap.get(slug);
    if (!categoryId || categoryId < 0) {
      // Category doesn't exist (dry run or missing)
      if (dryRun) inserted++;
      continue;
    }

    // Check if link exists
    const existing = await db
      .select()
      .from(schema.placeCategories)
      .where(
        and(
          eq(schema.placeCategories.placeId, placeId),
          eq(schema.placeCategories.categoryId, categoryId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      skipped++;
      continue;
    }

    if (dryRun) {
      inserted++;
      continue;
    }

    await db.insert(schema.placeCategories).values({ placeId, categoryId });
    inserted++;
  }

  return { inserted, skipped };
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

async function main(): Promise<void> {
  const startTime = Date.now();

  log(`Starting seed for ${COUNTRY}/${CITY}`);
  if (DRY_RUN) log("DRY RUN - no database changes will be made");
  if (FORCE) log("FORCE mode - will update existing records");

  // Load staged data
  const stagedPath = getStagedPath(COUNTRY, CITY);
  log(`Loading: ${stagedPath}`);

  const staged = loadStagedData(stagedPath);
  log(`Loaded ${staged.places.length} places from staged data`);

  // Connect to database
  const db = createDatabase();
  log("Connected to database");

  // Initialize stats
  const stats: SeedStats = {
    country: { id: 0, code: "", isNew: false },
    city: { id: 0, slug: "", isNew: false },
    categories: { created: 0, existing: 0 },
    places: { inserted: 0, updated: 0, skipped: 0 },
    placeCategories: { inserted: 0, skipped: 0 },
  };

  // Step 1: Ensure country exists
  log("Step 1/5: Ensuring country...");
  const countryResult = await ensureCountry(db, staged.meta.countryCode, DRY_RUN);
  stats.country = countryResult;

  // In dry-run mode with new country, use placeholder ID
  const countryId = countryResult.id > 0 ? countryResult.id : 1;

  // Step 2: Ensure city exists
  log("Step 2/5: Ensuring city...");
  // Get city name from first place or meta
  const cityName =
    staged.places[0]?.cityName ||
    staged.meta.citySlug.charAt(0).toUpperCase() + staged.meta.citySlug.slice(1);

  const cityResult = await ensureCity(
    db,
    countryId,
    staged.meta.citySlug,
    cityName,
    DRY_RUN
  );
  stats.city = cityResult;

  const cityId = cityResult.id > 0 ? cityResult.id : 1;

  // Step 3: Ensure categories exist
  log("Step 3/5: Ensuring categories...");
  // Collect all unique category slugs
  const allCategorySlugs = new Set<string>();
  for (const place of staged.places) {
    if (place.categorySlugs) {
      place.categorySlugs.forEach((slug) => allCategorySlugs.add(slug));
    }
  }

  const categoriesResult = await ensureCategories(
    db,
    [...allCategorySlugs],
    DRY_RUN
  );
  stats.categories = {
    created: categoriesResult.created,
    existing: categoriesResult.existing,
  };

  // Step 4: Upsert places
  log("Step 4/5: Upserting places...");
  const placeIdMap = new Map<string, number>(); // slug -> placeId

  for (const place of staged.places) {
    const result = await upsertPlace(db, cityId, place, FORCE, DRY_RUN);
    placeIdMap.set(place.slug, result.id);

    switch (result.action) {
      case "inserted":
        stats.places.inserted++;
        break;
      case "updated":
        stats.places.updated++;
        break;
      case "skipped":
        stats.places.skipped++;
        break;
    }
  }

  // Step 5: Link place categories
  log("Step 5/5: Linking place categories...");
  for (const place of staged.places) {
    const placeId = placeIdMap.get(place.slug);
    if (!placeId || placeId < 0) continue;

    const result = await linkPlaceCategories(
      db,
      placeId,
      place.categorySlugs || [],
      categoriesResult.map,
      DRY_RUN
    );

    stats.placeCategories.inserted += result.inserted;
    stats.placeCategories.skipped += result.skipped;
  }

  // Print summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "=".repeat(50));
  console.log("SEED SUMMARY");
  console.log("=".repeat(50));
  console.log(
    `Country:          ${stats.country.code} (id: ${stats.country.id}) ${stats.country.isNew ? "[NEW]" : "[EXISTS]"}`
  );
  console.log(
    `City:             ${stats.city.slug} (id: ${stats.city.id}) ${stats.city.isNew ? "[NEW]" : "[EXISTS]"}`
  );
  console.log(
    `Categories:       ${stats.categories.created} created, ${stats.categories.existing} existing`
  );
  console.log(
    `Places:           ${stats.places.inserted} inserted, ${stats.places.updated} updated, ${stats.places.skipped} skipped`
  );
  console.log(
    `PlaceCategories:  ${stats.placeCategories.inserted} inserted, ${stats.placeCategories.skipped} skipped`
  );
  console.log("=".repeat(50));
  console.log(`Completed in ${elapsed}s`);

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No actual database changes were made");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

// R4 Complete
