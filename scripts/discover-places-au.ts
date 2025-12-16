#!/usr/bin/env npx tsx
/**
 * Discover Places in Australia via BrightData SERP API
 *
 * Usage:
 *   npx tsx scripts/discover-places-us.ts --category=veterinary --city=new-york
 *   npx tsx scripts/discover-places-us.ts --category=dog-training --all-cities
 *   npx tsx scripts/discover-places-us.ts --category=pet-hotel --city=los-angeles --dry-run
 */

import "dotenv/config";
import { parseArgs } from "util";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, and } from "drizzle-orm";

// BrightData API configuration
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;
const SERP_ENDPOINT = "https://api.brightdata.com/request";

// =============================================================================
// CATEGORY CONFIGURATION (English)
// =============================================================================

interface CategoryConfig {
  slug: string;
  searchTerm: string;
  labelKey: string;
  icon: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "dog-training": {
    slug: "dog-training",
    searchTerm: "dog training",
    labelKey: "Dog Training",
    icon: "GraduationCap",
  },
  "dog-walking": {
    slug: "dog-walking",
    searchTerm: "dog walking service",
    labelKey: "Dog Walking",
    icon: "Footprints",
  },
  "pet-hotel": {
    slug: "pet-hotel",
    searchTerm: "pet boarding",
    labelKey: "Pet Hotels",
    icon: "Hotel",
  },
  grooming: {
    slug: "grooming",
    searchTerm: "pet grooming",
    labelKey: "Pet Grooming",
    icon: "Scissors",
  },
  veterinary: {
    slug: "veterinary",
    searchTerm: "veterinarian",
    labelKey: "Veterinarians",
    icon: "Stethoscope",
  },
  "pet-store": {
    slug: "pet-store",
    searchTerm: "pet store",
    labelKey: "Pet Stores",
    icon: "ShoppingBag",
  },
  "cat-grooming": {
    slug: "cat-grooming",
    searchTerm: "cat grooming",
    labelKey: "Cat Grooming",
    icon: "Cat",
  },
  "pet-sitting": {
    slug: "pet-sitting",
    searchTerm: "pet sitting",
    labelKey: "Pet Sitting",
    icon: "Home",
  },
  "emergency-vet": {
    slug: "emergency-vet",
    searchTerm: "emergency vet 24 hour",
    labelKey: "Emergency Vet",
    icon: "Siren",
  },
  "dog-daycare": {
    slug: "dog-daycare",
    searchTerm: "dog daycare",
    labelKey: "Dog Daycare",
    icon: "Dog",
  },
  "exotic-vet": {
    slug: "exotic-vet",
    searchTerm: "exotic animal veterinarian",
    labelKey: "Exotic Vet",
    icon: "Bird",
  },
  shelter: {
    slug: "shelter",
    searchTerm: "animal shelter",
    labelKey: "Animal Shelters",
    icon: "Heart",
  },
  "dog-park": {
    slug: "dog-park",
    searchTerm: "dog park",
    labelKey: "Dog Parks",
    icon: "Trees",
  },
};

// =============================================================================
// CLI PARSING
// =============================================================================

const { values: args } = parseArgs({
  options: {
    category: { type: "string", short: "c" },
    city: { type: "string", short: "t" },
    "all-cities": { type: "boolean", short: "a" },
    limit: { type: "string", short: "l" },
    "dry-run": { type: "boolean", short: "d" },
    verbose: { type: "boolean", short: "v" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Discover Places in Australia via BrightData SERP API

Usage:
  npx tsx scripts/discover-places-us.ts --category=<slug> --city=<name>
  npx tsx scripts/discover-places-us.ts --category=<slug> --all-cities
  npx tsx scripts/discover-places-us.ts --help

Options:
  -c, --category <slug>   Category to search (required)
  -t, --city <name>       City slug (e.g., new-york, los-angeles, chicago)
  -a, --all-cities        Search in all AU cities
  -l, --limit <n>         Max results per search (default: 20)
  -d, --dry-run           Show what would be done without changes
  -v, --verbose           Verbose output
  -h, --help              Show this help

Categories:
  veterinary      Veterinarian
  grooming        Pet Grooming
  dog-training    Dog Training
  dog-walking     Dog Walking Service
  pet-hotel       Pet Boarding
  pet-store       Pet Store
  emergency-vet   Emergency Vet 24 Hour
  shelter         Animal Shelter
  dog-daycare     Dog Daycare

Examples:
  npx tsx scripts/discover-places-us.ts --category=veterinary --city=new-york
  npx tsx scripts/discover-places-us.ts --category=grooming --all-cities --limit=10
`);
  process.exit(0);
}

const CATEGORY = args.category;
const CITY = args.city;
const ALL_CITIES = args["all-cities"];
const LIMIT = args.limit ? parseInt(args.limit, 10) : 20;
const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// =============================================================================
// HELPERS
// =============================================================================

function log(msg: string) {
  console.log(`[au-discover] ${msg}`);
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

// =============================================================================
// DATABASE HELPERS
// =============================================================================

interface CityInfo {
  id: number;
  name: string;
  slug: string;
}

async function getAUCities(citySlug?: string): Promise<CityInfo[]> {
  const usaCountry = await db
    .select()
    .from(schema.countries)
    .where(eq(schema.countries.code, "AU"))
    .limit(1);

  if (usaCountry.length === 0) {
    throw new Error("Australia not found in database. Run add-usa-canada-cities.ts first.");
  }

  const countryId = usaCountry[0].id;

  let cities;
  if (citySlug) {
    cities = await db
      .select({
        id: schema.cities.id,
        name: schema.cities.name,
        slug: schema.cities.slug,
      })
      .from(schema.cities)
      .where(
        and(
          eq(schema.cities.countryId, countryId),
          eq(schema.cities.slug, citySlug)
        )
      );
  } else {
    cities = await db
      .select({
        id: schema.cities.id,
        name: schema.cities.name,
        slug: schema.cities.slug,
      })
      .from(schema.cities)
      .where(eq(schema.cities.countryId, countryId));
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
    .where(
      and(eq(schema.places.slug, slug), eq(schema.places.cityId, cityId))
    )
    .limit(1);

  return result.length > 0;
}

// =============================================================================
// SERP API SEARCH
// =============================================================================

interface LocalResult {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  cid?: string;           // Google CID (numeric, e.g., "16143688583717815530")
  placeId?: string;       // Google Place ID (e.g., "ChIJ...")
  category?: string;
  latitude?: number;
  longitude?: number;
  // New fields from SERP API
  imageUrl?: string;
  thumbnailUrl?: string;
  openingHours?: Record<string, string>;
  workStatus?: string;
  accessibility?: {
    wheelchairEntrance?: boolean;
    parking?: boolean;
  };
  serviceOptions?: string[];
}

async function searchGoogleMaps(
  query: string,
  city: string,
  limit: number
): Promise<LocalResult[]> {
  if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BrightData credentials not configured");
    return [];
  }

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " " + city)}&tbm=lcl&hl=en&gl=us&num=${limit}`;

  verbose(`SERP: "${query}" in ${city}`);

  try {
    const response = await fetch(SERP_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BRIGHTDATA_API_KEY}`,
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
      console.error(`   ❌ SERP API error ${response.status}: ${errorText.slice(0, 200)}`);
      return [];
    }

    const data = await response.json();

    const wrapper = data as { body?: string | object };
    let serpData: object;

    if (wrapper.body) {
      serpData = typeof wrapper.body === "string" ? JSON.parse(wrapper.body) : wrapper.body;
    } else {
      serpData = data;
    }

    return parseSerpResults(serpData);
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return [];
  }
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

    // Parse image URLs
    const imageUrl = r.original_image || r.image || r.photo || r.main_image;
    const thumbnailUrl = r.thumbnail || r.thumb || r.small_image;

    // Parse work status
    const workStatus = r.work_status || r.open_state || r.status;

    // Parse opening hours
    let openingHours: Record<string, string> | undefined;
    const hoursData = r.hours || r.opening_hours || r.work_hours || r.working_hours;
    if (hoursData && typeof hoursData === "object") {
      openingHours = {};
      const h = hoursData as Record<string, unknown>;
      for (const [key, val] of Object.entries(h)) {
        if (val && typeof val === "string") {
          openingHours[key] = val;
        }
      }
      if (Object.keys(openingHours).length === 0) openingHours = undefined;
    }

    // Parse accessibility/facilities
    const accessibilityData = r.accessibility as Record<string, boolean> | undefined;
    const accessibility = accessibilityData ? {
      wheelchairEntrance: accessibilityData.wheelchair_entrance || accessibilityData.wheelchair_accessible || false,
      parking: accessibilityData.parking || accessibilityData.has_parking || false,
    } : undefined;

    // Parse service options
    const serviceOptionsRaw = r.service_options || r.services || r.amenities;
    const serviceOptions = Array.isArray(serviceOptionsRaw) ? serviceOptionsRaw.map(String) : undefined;

    results.push({
      name: String(name),
      address: String(r.address || r.location || ""),
      phone: String(r.phone || r.phone_number || ""),
      website: String(r.site || r.website || r.link || r.url || ""),
      rating: rating > 0 ? rating : undefined,
      reviews: reviews > 0 ? reviews : undefined,
      cid: String(r.cid || r.data_id || ""),
      placeId: String(r.place_id || ""),
      category: String(r.type || r.category || r.business_type || ""),
      latitude: lat > 0 ? lat : undefined,
      longitude: lng > 0 ? lng : undefined,
      imageUrl: imageUrl ? String(imageUrl) : undefined,
      thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : undefined,
      openingHours,
      workStatus: workStatus ? String(workStatus) : undefined,
      accessibility,
      serviceOptions,
    });
  }

  verbose(`Parsed ${results.length} results`);
  return results;
}

// =============================================================================
// PLACE CREATION
// =============================================================================

async function createPlace(
  result: LocalResult,
  cityId: number,
  categoryId: number,
  dryRun: boolean
): Promise<{ action: "created" | "skipped" | "error"; reason?: string }> {
  if (!result.name) {
    return { action: "skipped", reason: "no name" };
  }

  const slug = generateSlug(result.name);

  if (await placeExists(slug, cityId)) {
    return { action: "skipped", reason: "already exists" };
  }

  if (dryRun) {
    return { action: "created", reason: "dry run" };
  }

  try {
    const scrapedContent: Record<string, unknown> = {
      googleCid: result.cid || null,
      googlePlaceId: result.placeId || null,
      googleRating: result.rating,
      googleReviewCount: result.reviews,
      category: result.category,
      discoveredAt: new Date().toISOString(),
      discoverySource: "brightdata_serp_api_au",
    };

    if (result.latitude && result.longitude) {
      scrapedContent.coordinates = {
        lat: result.latitude,
        lng: result.longitude,
      };
    }

    // Add new SERP fields to scraped_content
    if (result.imageUrl) scrapedContent.imageUrl = result.imageUrl;
    if (result.thumbnailUrl) scrapedContent.thumbnailUrl = result.thumbnailUrl;
    if (result.openingHours) scrapedContent.openingHours = result.openingHours;
    if (result.workStatus) scrapedContent.workStatus = result.workStatus;
    if (result.accessibility) scrapedContent.accessibility = result.accessibility;
    if (result.serviceOptions && result.serviceOptions.length > 0) {
      scrapedContent.serviceOptions = result.serviceOptions;
    }

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
        googleCid: result.cid || null,           // Store CID in dedicated column
        googlePlaceId: result.placeId || null,   // Store Place ID in dedicated column
        scrapedContent: scrapedContent,
        isVerified: false,
        isPremium: false,
      })
      .returning({ id: schema.places.id });

    await db
      .insert(schema.placeCategories)
      .values({
        placeId: inserted.id,
        categoryId,
      })
      .onConflictDoNothing();

    return { action: "created" };
  } catch (error) {
    return { action: "error", reason: error instanceof Error ? error.message : String(error) };
  }
}

// =============================================================================
// MAIN DISCOVERY
// =============================================================================

interface Stats {
  city: string;
  resultsFound: number;
  created: number;
  skipped: number;
  errors: number;
}

async function discoverForCity(
  city: CityInfo,
  categoryConfig: CategoryConfig,
  categoryId: number,
  limit: number,
  dryRun: boolean
): Promise<Stats> {
  console.log(`\n🔍 ${city.name}: "${categoryConfig.searchTerm}"`);

  const stats: Stats = {
    city: city.name,
    resultsFound: 0,
    created: 0,
    skipped: 0,
    errors: 0,
  };

  const results = await searchGoogleMaps(categoryConfig.searchTerm, city.name, limit);
  stats.resultsFound = results.length;

  for (const result of results) {
    const { action, reason } = await createPlace(result, city.id, categoryId, dryRun);

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
        break;
    }
  }

  // Rate limiting
  await new Promise(resolve => setTimeout(resolve, 1000));

  return stats;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  log("🇺🇸 Australia Place Discovery");
  if (DRY_RUN) log("DRY RUN - no changes will be made");

  if (!CATEGORY) {
    console.error("❌ --category is required");
    process.exit(1);
  }

  if (!CITY && !ALL_CITIES) {
    console.error("❌ Either --city or --all-cities is required");
    process.exit(1);
  }

  const categoryConfig = CATEGORIES[CATEGORY];
  if (!categoryConfig) {
    console.error(`❌ Unknown category: ${CATEGORY}`);
    console.error(`   Available: ${Object.keys(CATEGORIES).join(", ")}`);
    process.exit(1);
  }

  const cities = await getAUCities(CITY);
  if (cities.length === 0) {
    console.error(`❌ No cities found${CITY ? ` for slug: ${CITY}` : ""}`);
    process.exit(1);
  }

  log(`Found ${cities.length} cities to search`);

  const categoryId = await getOrCreateCategory(categoryConfig);
  verbose(`Category ID: ${categoryId}`);

  const allStats: Stats[] = [];

  for (const city of cities) {
    const cityStats = await discoverForCity(city, categoryConfig, categoryId, LIMIT, DRY_RUN);
    allStats.push(cityStats);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🇺🇸 Australia DISCOVERY SUMMARY");
  console.log("=".repeat(60));

  let totalFound = 0, totalCreated = 0, totalSkipped = 0, totalErrors = 0;

  for (const stat of allStats) {
    console.log(`${stat.city}: ${stat.created} created, ${stat.skipped} skipped, ${stat.errors} errors`);
    totalFound += stat.resultsFound;
    totalCreated += stat.created;
    totalSkipped += stat.skipped;
    totalErrors += stat.errors;
  }

  console.log("=".repeat(60));
  console.log(`TOTAL: ${totalFound} found, ${totalCreated} created, ${totalSkipped} skipped, ${totalErrors} errors`);

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No actual changes were made");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
