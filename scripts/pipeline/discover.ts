#!/usr/bin/env npx tsx
/**
 * Universal Place Discovery Script
 *
 * Discovers places for ANY country using BrightData SERP API.
 * Features:
 * - Automatic resume from where it stopped
 * - Error recovery with retry logic
 * - Progress tracking to disk
 * - Configurable for any country
 *
 * Usage:
 *   npx tsx scripts/pipeline/discover.ts --country=BE --category=veterinary
 *   npx tsx scripts/pipeline/discover.ts --country=NL --category=grooming --city=amsterdam
 *   npx tsx scripts/pipeline/discover.ts --country=DE --category=pet-store --resume
 *   npx tsx scripts/pipeline/discover.ts --status  # Show all progress
 */

import "dotenv/config";
import { parseArgs } from "util";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { COUNTRIES, CATEGORIES, RATE_LIMITS, BATCH_SIZES, type CountryConfig, type CategoryConfig } from "./config";
import {
  loadProgress,
  saveProgress,
  createDiscoveryProgress,
  clearProgress,
  listActiveProgress,
  formatProgress,
  type DiscoveryProgress,
} from "./progress";

// BrightData configuration
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;
const SERP_ENDPOINT = "https://api.brightdata.com/request";

// CLI Arguments
const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    category: { type: "string", short: "k" },
    city: { type: "string", short: "t" },
    limit: { type: "string", short: "l" },
    resume: { type: "boolean", short: "r" },
    "dry-run": { type: "boolean", short: "d" },
    status: { type: "boolean", short: "s" },
    verbose: { type: "boolean", short: "v" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Universal Place Discovery Script

Discovers places for any configured country using BrightData SERP API.
Automatically tracks progress and can resume from interruptions.

Usage:
  npx tsx scripts/pipeline/discover.ts --country=<code> --category=<slug>
  npx tsx scripts/pipeline/discover.ts --status

Options:
  -c, --country <code>    Country code (BE, NL, DE, FR, UK)
  -k, --category <slug>   Category to search (veterinary, grooming, etc.)
  -t, --city <slug>       Optional: specific city slug
  -l, --limit <n>         Max results per search (default: ${BATCH_SIZES.discovery})
  -r, --resume            Resume from last progress
  -d, --dry-run           Show what would be done
  -s, --status            Show all active progress
  -v, --verbose           Verbose output
  -h, --help              Show this help

Countries: ${Object.keys(COUNTRIES).join(", ")}
Categories: ${Object.keys(CATEGORIES).join(", ")}

Examples:
  npx tsx scripts/pipeline/discover.ts --country=BE --category=veterinary
  npx tsx scripts/pipeline/discover.ts --country=NL --category=grooming --city=amsterdam
  npx tsx scripts/pipeline/discover.ts --status
`);
  process.exit(0);
}

// Show status
if (args.status) {
  const activeProgress = listActiveProgress();

  if (activeProgress.length === 0) {
    console.log("No active progress found.");
  } else {
    console.log("\n📊 Active Pipeline Progress:\n");
    for (const { progress } of activeProgress) {
      console.log(`  ${formatProgress(progress)}`);
    }
    console.log("");
  }
  process.exit(0);
}

const COUNTRY_CODE = args.country?.toUpperCase();
const CATEGORY_SLUG = args.category;
const SPECIFIC_CITY = args.city;
const LIMIT = args.limit ? parseInt(args.limit, 10) : BATCH_SIZES.discovery;
const RESUME = args.resume ?? false;
const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// Validate inputs
if (!COUNTRY_CODE || !CATEGORY_SLUG) {
  console.error("❌ --country and --category are required");
  process.exit(1);
}

const countryConfig = COUNTRIES[COUNTRY_CODE];
if (!countryConfig) {
  console.error(`❌ Unknown country: ${COUNTRY_CODE}`);
  console.error(`   Available: ${Object.keys(COUNTRIES).join(", ")}`);
  process.exit(1);
}

const categoryConfig = CATEGORIES[CATEGORY_SLUG];
if (!categoryConfig) {
  console.error(`❌ Unknown category: ${CATEGORY_SLUG}`);
  console.error(`   Available: ${Object.keys(CATEGORIES).join(", ")}`);
  process.exit(1);
}

// Helpers
function log(msg: string) {
  console.log(`[${COUNTRY_CODE}] ${msg}`);
}

function verbose(msg: string) {
  if (VERBOSE) console.log(`  ${msg}`);
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Database helpers
interface City {
  id: number;
  name: string;
  slug: string;
  provinceSlug: string | null;
}

async function getCities(countryCode: string, citySlug?: string): Promise<City[]> {
  const country = await db
    .select()
    .from(schema.countries)
    .where(eq(schema.countries.code, countryCode))
    .limit(1);

  if (country.length === 0) {
    throw new Error(`Country ${countryCode} not found in database. Run seed script first.`);
  }

  const countryId = country[0].id;

  let citiesQuery;
  if (citySlug) {
    citiesQuery = await db
      .select({
        id: schema.cities.id,
        name: schema.cities.name,
        slug: schema.cities.slug,
        provinceId: schema.cities.provinceId,
      })
      .from(schema.cities)
      .where(and(eq(schema.cities.countryId, countryId), eq(schema.cities.slug, citySlug)));
  } else {
    citiesQuery = await db
      .select({
        id: schema.cities.id,
        name: schema.cities.name,
        slug: schema.cities.slug,
        provinceId: schema.cities.provinceId,
      })
      .from(schema.cities)
      .where(eq(schema.cities.countryId, countryId));
  }

  // Get province slugs
  const cities: City[] = [];
  for (const city of citiesQuery) {
    let provinceSlug: string | null = null;

    if (city.provinceId) {
      const province = await db
        .select({ slug: schema.provinces.slug })
        .from(schema.provinces)
        .where(eq(schema.provinces.id, city.provinceId))
        .limit(1);

      if (province.length > 0) {
        provinceSlug = province[0].slug;
      }
    }

    cities.push({
      id: city.id,
      name: city.name,
      slug: city.slug,
      provinceSlug,
    });
  }

  return cities;
}

async function getOrCreateCategory(config: CategoryConfig): Promise<number> {
  const existing = await db
    .select({ id: schema.categories.id })
    .from(schema.categories)
    .where(eq(schema.categories.slug, config.slug))
    .limit(1);

  if (existing.length > 0) {
    return existing[0].id;
  }

  const [inserted] = await db
    .insert(schema.categories)
    .values({
      slug: config.slug,
      labelKey: config.labelKey,
      icon: config.icon,
    })
    .returning({ id: schema.categories.id });

  return inserted.id;
}

async function placeExists(slug: string, cityId: number): Promise<boolean> {
  const result = await db
    .select({ id: schema.places.id })
    .from(schema.places)
    .where(and(eq(schema.places.slug, slug), eq(schema.places.cityId, cityId)))
    .limit(1);

  return result.length > 0;
}

// SERP API
interface LocalResult {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  placeId?: string;
  category?: string;
  openingHours?: Record<string, string>;
  latitude?: number;
  longitude?: number;
}

async function searchGoogleMaps(
  query: string,
  city: string,
  config: CountryConfig,
  language: string,
  limit: number,
  retries = 3
): Promise<LocalResult[]> {
  if (!BRIGHTDATA_API_TOKEN || !BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BrightData credentials not configured");
    return [];
  }

  const searchUrl = `https://www.${config.googleDomain}/search?q=${encodeURIComponent(query + " " + city)}&tbm=lcl&hl=${language}&gl=${config.googleGl}&num=${limit}`;

  verbose(`SERP: "${query}" in ${city} (${language})`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(SERP_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zone: BRIGHTDATA_SERP_ZONE,
          url: searchUrl,
          format: "json",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SERP API error ${response.status}: ${errorText.slice(0, 200)}`);
      }

      const data = await response.json();

      // Parse response
      const wrapper = data as { body?: string | object };
      let serpData: object;

      if (wrapper.body) {
        serpData = typeof wrapper.body === "string" ? JSON.parse(wrapper.body) : wrapper.body;
      } else {
        serpData = data;
      }

      return parseSerpResults(serpData);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);

      if (attempt < retries) {
        console.warn(`   ⚠️ Attempt ${attempt}/${retries} failed: ${errMsg}. Retrying...`);
        await sleep(RATE_LIMITS.brightdata.delayMs * attempt);
      } else {
        console.error(`   ❌ All ${retries} attempts failed: ${errMsg}`);
        return [];
      }
    }
  }

  return [];
}

function parseSerpResults(data: object): LocalResult[] {
  const results: LocalResult[] = [];
  const d = data as Record<string, unknown>;

  const localResults = (d.snack_pack || d.local_results || d.local_pack || d.places || []) as Record<string, unknown>[];

  for (const r of localResults) {
    const name = r.title || r.name || r.business_name;
    if (!name) continue;

    const rating = parseFloat(String(r.rating || r.stars || 0));
    const reviews = parseInt(String(r.reviews_cnt || r.reviews || r.review_count || 0), 10);
    const lat = parseFloat(String(r.lat || r.latitude || (r.gps_coordinates as Record<string, unknown>)?.latitude || 0));
    const lng = parseFloat(String(r.lng || r.longitude || (r.gps_coordinates as Record<string, unknown>)?.longitude || 0));

    results.push({
      name: String(name),
      address: String(r.address || r.location || ""),
      phone: String(r.phone || r.phone_number || ""),
      website: String(r.site || r.website || r.link || r.url || ""),
      rating: rating > 0 ? rating : undefined,
      reviews: reviews > 0 ? reviews : undefined,
      placeId: String(r.cid || r.place_id || r.data_id || ""),
      category: String(r.type || r.category || r.business_type || ""),
      latitude: lat > 0 ? lat : undefined,
      longitude: lng > 0 ? lng : undefined,
    });
  }

  verbose(`Parsed ${results.length} results`);
  return results;
}

// Place creation
async function createPlace(
  result: LocalResult,
  cityId: number,
  categoryId: number,
  countryCode: string,
  dryRun: boolean
): Promise<{ action: "created" | "skipped" | "error"; reason?: string }> {
  if (!result.name) {
    return { action: "skipped", reason: "no name" };
  }

  const slug = generateSlug(result.name);

  if (await placeExists(slug, cityId)) {
    return { action: "skipped", reason: "exists" };
  }

  if (dryRun) {
    return { action: "created", reason: "dry run" };
  }

  try {
    const scrapedContent: Record<string, unknown> = {
      googlePlaceId: result.placeId,
      googleRating: result.rating,
      googleReviewCount: result.reviews,
      category: result.category,
      discoveredAt: new Date().toISOString(),
      discoverySource: `brightdata_serp_${countryCode.toLowerCase()}`,
    };

    const [inserted] = await db
      .insert(schema.places)
      .values({
        cityId,
        slug,
        name: result.name,
        address: result.address || null,
        phone: result.phone || null,
        website: result.website || null,
        lat: result.latitude?.toString() || null,
        lng: result.longitude?.toString() || null,
        avgRating: result.rating?.toString() || "0",
        reviewCount: result.reviews || 0,
        scrapedContent: scrapedContent,
        isVerified: false,
        isPremium: false,
      })
      .returning({ id: schema.places.id });

    await db
      .insert(schema.placeCategories)
      .values({ placeId: inserted.id, categoryId })
      .onConflictDoNothing();

    return { action: "created" };
  } catch (error) {
    return { action: "error", reason: error instanceof Error ? error.message : String(error) };
  }
}

// Main discovery for a city
async function discoverForCity(
  city: City,
  countryConfig: CountryConfig,
  categoryConfig: CategoryConfig,
  categoryId: number,
  limit: number,
  dryRun: boolean,
  progress: DiscoveryProgress
): Promise<{ found: number; created: number; skipped: number; errors: number }> {
  const stats = { found: 0, created: 0, skipped: 0, errors: 0 };

  // Search in each language
  for (const language of countryConfig.languages) {
    const searchTerm = categoryConfig.searchTerms[language];
    if (!searchTerm) continue;

    console.log(`\n🔍 ${city.name}: "${searchTerm}" (${language.toUpperCase()})`);

    const results = await searchGoogleMaps(searchTerm, city.name, countryConfig, language, limit);
    stats.found += results.length;

    for (const result of results) {
      const { action, reason } = await createPlace(result, city.id, categoryId, countryConfig.code, dryRun);

      switch (action) {
        case "created":
          stats.created++;
          verbose(`✅ ${result.name}`);
          break;
        case "skipped":
          stats.skipped++;
          if (VERBOSE) verbose(`⏭️ ${result.name} (${reason})`);
          break;
        case "error":
          stats.errors++;
          console.error(`   ❌ ${result.name}: ${reason}`);
          progress.errors.push({
            city: city.name,
            error: `${result.name}: ${reason}`,
            timestamp: new Date().toISOString(),
          });
          break;
      }
    }

    // Rate limiting
    await sleep(RATE_LIMITS.brightdata.delayMs);
  }

  return stats;
}

// Main function
async function main() {
  console.log("\n" + "=".repeat(60));
  console.log(`🌍 Place Discovery: ${countryConfig.name} / ${categoryConfig.labelKey}`);
  console.log("=".repeat(60));

  if (DRY_RUN) log("DRY RUN - no changes will be made");

  // Load or create progress
  let progress = loadProgress<DiscoveryProgress>("discovery", COUNTRY_CODE, CATEGORY_SLUG);

  if (progress && RESUME) {
    log(`📥 Resuming from previous progress`);
    log(`   Completed: ${progress.stats.processedCities}/${progress.stats.totalCities} cities`);
  } else {
    // Get cities
    const cities = await getCities(COUNTRY_CODE, SPECIFIC_CITY);
    if (cities.length === 0) {
      console.error(`❌ No cities found for ${COUNTRY_CODE}${SPECIFIC_CITY ? ` with slug ${SPECIFIC_CITY}` : ""}`);
      process.exit(1);
    }

    progress = createDiscoveryProgress(COUNTRY_CODE, CATEGORY_SLUG, cities.length);
    log(`📍 Found ${cities.length} cities to search`);
  }

  // Get category ID
  const categoryId = await getOrCreateCategory(categoryConfig);
  verbose(`Category ID: ${categoryId}`);

  // Get cities (for iteration)
  const allCities = await getCities(COUNTRY_CODE, SPECIFIC_CITY);

  // Filter out already completed cities
  const citiesToProcess = allCities.filter(
    city => !progress!.completedCities.includes(city.slug)
  );

  log(`🔄 Processing ${citiesToProcess.length} remaining cities`);

  // Process each city
  for (const city of citiesToProcess) {
    progress.currentCity = city.slug;
    saveProgress(progress);

    const cityStats = await discoverForCity(
      city,
      countryConfig,
      categoryConfig,
      categoryId,
      LIMIT,
      DRY_RUN,
      progress
    );

    // Update progress
    progress.completedCities.push(city.slug);
    progress.currentCity = null;
    progress.stats.processedCities++;
    progress.stats.totalFound += cityStats.found;
    progress.stats.totalCreated += cityStats.created;
    progress.stats.totalSkipped += cityStats.skipped;
    progress.stats.totalErrors += cityStats.errors;

    saveProgress(progress);

    // Show progress
    const pct = Math.round((progress.stats.processedCities / progress.stats.totalCities) * 100);
    console.log(`📊 Progress: ${progress.stats.processedCities}/${progress.stats.totalCities} (${pct}%) | Created: ${progress.stats.totalCreated}`);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 DISCOVERY SUMMARY");
  console.log("=".repeat(60));
  console.log(`   Country: ${countryConfig.name}`);
  console.log(`   Category: ${categoryConfig.labelKey}`);
  console.log(`   Cities processed: ${progress.stats.processedCities}/${progress.stats.totalCities}`);
  console.log(`   Total found: ${progress.stats.totalFound}`);
  console.log(`   Total created: ${progress.stats.totalCreated}`);
  console.log(`   Total skipped: ${progress.stats.totalSkipped}`);
  console.log(`   Total errors: ${progress.stats.totalErrors}`);

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No actual changes were made");
  }

  // Archive progress if complete
  if (progress.stats.processedCities === progress.stats.totalCities) {
    clearProgress("discovery", COUNTRY_CODE, CATEGORY_SLUG);
    console.log("\n✅ Discovery complete! Progress archived.");
  } else {
    console.log(`\n📝 Progress saved. Resume with: npx tsx scripts/pipeline/discover.ts --country=${COUNTRY_CODE} --category=${CATEGORY_SLUG} --resume`);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
