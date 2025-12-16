#!/usr/bin/env npx tsx
/**
 * Discover Places in Germany via BrightData SERP API
 *
 * German version - single language (Deutsch)
 * Searches across all 16 Bundesländer
 *
 * Usage:
 *   npx tsx scripts/discover-places-de.ts --category=veterinary --city=berlin
 *   npx tsx scripts/discover-places-de.ts --category=dog-training --all-cities
 *   npx tsx scripts/discover-places-de.ts --category=pet-hotel --state=bayern
 */

import "dotenv/config";
import { parseArgs } from "util";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { DE_STATE_CONFIGS } from "./config/de-states";

// BrightData API configuration
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;
const SERP_ENDPOINT = "https://api.brightdata.com/request";

// =============================================================================
// CATEGORY CONFIGURATION (German)
// =============================================================================

interface CategoryConfig {
  slug: string;
  searchTermDe: string;
  searchTermEn: string;
  labelKey: string;
  icon: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "dog-training": {
    slug: "dog-training",
    searchTermDe: "Hundeschule",
    searchTermEn: "dog training",
    labelKey: "Dog Training",
    icon: "GraduationCap",
  },
  "dog-walking": {
    slug: "dog-walking",
    searchTermDe: "Gassi-Service Hundebetreuung",
    searchTermEn: "dog walking service",
    labelKey: "Dog Walking",
    icon: "Footprints",
  },
  "pet-hotel": {
    slug: "pet-hotel",
    searchTermDe: "Tierpension Hundepension",
    searchTermEn: "pet hotel",
    labelKey: "Pet Hotels",
    icon: "Hotel",
  },
  grooming: {
    slug: "grooming",
    searchTermDe: "Hundefriseur Hundesalon",
    searchTermEn: "dog grooming",
    labelKey: "Pet Grooming",
    icon: "Scissors",
  },
  veterinary: {
    slug: "veterinary",
    searchTermDe: "Tierarzt Tierarztpraxis",
    searchTermEn: "veterinarian",
    labelKey: "Veterinarians",
    icon: "Stethoscope",
  },
  "pet-store": {
    slug: "pet-store",
    searchTermDe: "Tierhandlung Zoogeschäft",
    searchTermEn: "pet store",
    labelKey: "Pet Stores",
    icon: "ShoppingBag",
  },
  "cat-grooming": {
    slug: "cat-grooming",
    searchTermDe: "Katzensalon Katzenpflege",
    searchTermEn: "cat grooming",
    labelKey: "Cat Grooming",
    icon: "Cat",
  },
  "pet-sitting": {
    slug: "pet-sitting",
    searchTermDe: "Tierbetreuung Tiersitter",
    searchTermEn: "pet sitting",
    labelKey: "Pet Sitting",
    icon: "Home",
  },
  "emergency-vet": {
    slug: "emergency-vet",
    searchTermDe: "Tiernotarzt Tierklinik Notdienst",
    searchTermEn: "emergency vet",
    labelKey: "Emergency Vet",
    icon: "Siren",
  },
  "dog-daycare": {
    slug: "dog-daycare",
    searchTermDe: "Hundetagesstätte Hundekita",
    searchTermEn: "dog daycare",
    labelKey: "Dog Daycare",
    icon: "Dog",
  },
  "exotic-vet": {
    slug: "exotic-vet",
    searchTermDe: "Tierarzt Exoten Reptilien",
    searchTermEn: "exotic animal vet",
    labelKey: "Exotic Vet",
    icon: "Bird",
  },
  shelter: {
    slug: "shelter",
    searchTermDe: "Tierheim",
    searchTermEn: "animal shelter",
    labelKey: "Animal Shelters",
    icon: "Heart",
  },
  "dog-park": {
    slug: "dog-park",
    searchTermDe: "Hundewiese Hundeauslaufgebiet",
    searchTermEn: "dog park",
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
    state: { type: "string", short: "s" },
    "all-cities": { type: "boolean", short: "a" },
    limit: { type: "string", short: "l" },
    "dry-run": { type: "boolean", short: "d" },
    verbose: { type: "boolean", short: "v" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Discover Places in Germany via BrightData SERP API

German version with German search terms.

Usage:
  npx tsx scripts/discover-places-de.ts --category=<slug> --city=<name>
  npx tsx scripts/discover-places-de.ts --category=<slug> --state=<slug>
  npx tsx scripts/discover-places-de.ts --category=<slug> --all-cities
  npx tsx scripts/discover-places-de.ts --help

Options:
  -c, --category <slug>   Category to search (required)
  -t, --city <name>       City name (e.g., berlin, muenchen, hamburg)
  -s, --state <slug>      State slug (e.g., bayern, berlin, hamburg)
  -a, --all-cities        Search in all German cities
  -l, --limit <n>         Max results per search (default: 20)
  -d, --dry-run           Show what would be done without changes
  -v, --verbose           Verbose output
  -h, --help              Show this help

Categories:
  veterinary      Tierarzt
  grooming        Hundefriseur / Hundesalon
  dog-training    Hundeschule
  dog-walking     Gassi-Service
  pet-hotel       Tierpension / Hundepension
  pet-store       Tierhandlung / Zoogeschäft
  cat-grooming    Katzensalon
  pet-sitting     Tierbetreuung
  emergency-vet   Tiernotarzt / Tierklinik Notdienst
  dog-daycare     Hundetagesstätte / Hundekita
  exotic-vet      Tierarzt Exoten
  shelter         Tierheim
  dog-park        Hundewiese

States (Bundesländer):
  bayern, baden-wuerttemberg, berlin, brandenburg, bremen,
  hamburg, hessen, mecklenburg-vorpommern, niedersachsen,
  nordrhein-westfalen, rheinland-pfalz, saarland, sachsen,
  sachsen-anhalt, schleswig-holstein, thueringen

Examples:
  npx tsx scripts/discover-places-de.ts --category=veterinary --city=berlin
  npx tsx scripts/discover-places-de.ts --category=grooming --state=bayern --limit=10
  npx tsx scripts/discover-places-de.ts --category=pet-hotel --all-cities
`);
  process.exit(0);
}

const CATEGORY = args.category;
const CITY = args.city;
const STATE = args.state;
const ALL_CITIES = args["all-cities"];
const LIMIT = args.limit ? parseInt(args.limit, 10) : 20;
const DRY_RUN = args["dry-run"] ?? false;
const VERBOSE = args.verbose ?? false;

// =============================================================================
// HELPERS
// =============================================================================

function log(msg: string) {
  console.log(`[de-discover] ${msg}`);
}

function verbose(msg: string) {
  if (VERBOSE) console.log(`  ${msg}`);
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
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

async function getGermanCities(cityName?: string, stateSlug?: string): Promise<CityInfo[]> {
  const germanyCountry = await db
    .select()
    .from(schema.countries)
    .where(eq(schema.countries.code, "DE"))
    .limit(1);

  if (germanyCountry.length === 0) {
    throw new Error("Germany not found in database. Run seed-germany.ts first.");
  }

  const countryId = germanyCountry[0].id;

  // If specific city requested
  if (cityName) {
    const citySlug = generateSlug(cityName);
    const cities = await db
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

    // If not found by slug, try by name
    if (cities.length === 0) {
      const citiesByName = await db
        .select({
          id: schema.cities.id,
          name: schema.cities.name,
          slug: schema.cities.slug,
        })
        .from(schema.cities)
        .where(eq(schema.cities.countryId, countryId));

      return citiesByName.filter(
        (c) => c.name.toLowerCase().includes(cityName.toLowerCase())
      );
    }

    return cities;
  }

  // If specific state requested, get cities from config
  if (stateSlug) {
    const stateConfig = DE_STATE_CONFIGS.find(
      (s) => s.slug === stateSlug || s.name.toLowerCase() === stateSlug.toLowerCase()
    );

    if (!stateConfig) {
      throw new Error(`State not found: ${stateSlug}`);
    }

    // Get all cities for this state from database
    const allCities = await db
      .select({
        id: schema.cities.id,
        name: schema.cities.name,
        slug: schema.cities.slug,
      })
      .from(schema.cities)
      .where(eq(schema.cities.countryId, countryId));

    // Filter to cities in this state's major cities list
    const stateCityNames = stateConfig.majorCities.map((c) => c.toLowerCase());
    return allCities.filter((c) =>
      stateCityNames.some(
        (sc) =>
          c.name.toLowerCase().includes(sc) || sc.includes(c.name.toLowerCase())
      )
    );
  }

  // All cities
  return await db
    .select({
      id: schema.cities.id,
      name: schema.cities.name,
      slug: schema.cities.slug,
    })
    .from(schema.cities)
    .where(eq(schema.cities.countryId, countryId));
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

interface OpeningHours {
  [day: string]: string;
}

interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date?: string;
}

interface LocalResult {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  placeId?: string;
  category?: string;
  openingHours?: OpeningHours;
  googleReviews?: GoogleReview[];
  latitude?: number;
  longitude?: number;
  priceRange?: string;
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

  // German Google settings
  const domain = "google.de";
  const hl = "de";
  const gl = "de";

  const searchUrl = `https://www.${domain}/search?q=${encodeURIComponent(query + " " + city)}&tbm=lcl&hl=${hl}&gl=${gl}&num=${limit}`;

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

    // Parse response (BrightData wraps in {status_code, headers, body})
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

function parseOpeningHours(hoursData: unknown): OpeningHours | undefined {
  if (!hoursData) return undefined;

  const hours: OpeningHours = {};

  if (Array.isArray(hoursData)) {
    for (const entry of hoursData) {
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        const day = e.day || e.weekday || e.name;
        const time = e.hours || e.time || e.opening_hours || e.open;
        if (day && time) {
          hours[String(day)] = String(time);
        }
      }
    }
  } else if (typeof hoursData === "object") {
    const h = hoursData as Record<string, unknown>;
    for (const [key, val] of Object.entries(h)) {
      if (val && typeof val === "string") {
        hours[key] = val;
      }
    }
  }

  return Object.keys(hours).length > 0 ? hours : undefined;
}

function parseGoogleReviews(reviewsData: unknown): GoogleReview[] | undefined {
  if (!reviewsData || !Array.isArray(reviewsData)) return undefined;

  const reviews: GoogleReview[] = [];

  for (const r of reviewsData.slice(0, 10)) {
    if (r && typeof r === "object") {
      const rev = r as Record<string, unknown>;
      const author = rev.author || rev.user || rev.name || rev.reviewer;
      const rating = parseFloat(String(rev.rating || rev.stars || rev.score || 0));
      const text = rev.text || rev.content || rev.review || rev.snippet || rev.body;

      if (author && text) {
        reviews.push({
          author: String(author),
          rating: rating > 0 ? rating : 5,
          text: String(text).slice(0, 500),
          date: rev.date ? String(rev.date) : undefined,
        });
      }
    }
  }

  return reviews.length > 0 ? reviews : undefined;
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

    const openingHours = parseOpeningHours(
      r.hours || r.opening_hours || r.work_hours || r.business_hours || r.open_hours
    );

    const googleReviews = parseGoogleReviews(
      r.reviews_list || r.google_reviews || r.user_reviews || r.review_list
    );

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
      openingHours,
      googleReviews,
      latitude: lat > 0 ? lat : undefined,
      longitude: lng > 0 ? lng : undefined,
      priceRange: r.price_range ? String(r.price_range) : undefined,
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
      googlePlaceId: result.placeId,
      googleRating: result.rating,
      googleReviewCount: result.reviews,
      category: result.category,
      discoveredAt: new Date().toISOString(),
      discoverySource: "brightdata_serp_api_de",
    };

    if (result.openingHours) {
      scrapedContent.openingHours = result.openingHours;
    }

    if (result.googleReviews && result.googleReviews.length > 0) {
      scrapedContent.googleReviews = result.googleReviews;
    }

    if (result.latitude && result.longitude) {
      scrapedContent.coordinates = {
        lat: result.latitude,
        lng: result.longitude,
      };
    }

    if (result.priceRange) {
      scrapedContent.priceRange = result.priceRange;
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
  console.log(`\n🔍 ${city.name}: "${categoryConfig.searchTermDe}"`);

  const stats: Stats = {
    city: city.name,
    resultsFound: 0,
    created: 0,
    skipped: 0,
    errors: 0,
  };

  const results = await searchGoogleMaps(categoryConfig.searchTermDe, city.name, limit);
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
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return stats;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  log("🇩🇪 Germany Place Discovery");
  if (DRY_RUN) log("DRY RUN - no changes will be made");

  if (!CATEGORY) {
    console.error("❌ --category is required");
    process.exit(1);
  }

  if (!CITY && !STATE && !ALL_CITIES) {
    console.error("❌ Either --city, --state, or --all-cities is required");
    process.exit(1);
  }

  const categoryConfig = CATEGORIES[CATEGORY];
  if (!categoryConfig) {
    console.error(`❌ Unknown category: ${CATEGORY}`);
    console.error(`   Available: ${Object.keys(CATEGORIES).join(", ")}`);
    process.exit(1);
  }

  // Get cities
  const cities = await getGermanCities(CITY, STATE);
  if (cities.length === 0) {
    console.error(`❌ No cities found`);
    console.error("   Make sure Germany is seeded in the database (run seed-germany.ts)");
    process.exit(1);
  }

  log(`Found ${cities.length} cities to search`);

  // Ensure category exists
  const categoryId = await getOrCreateCategory(categoryConfig);
  verbose(`Category ID: ${categoryId}`);

  // Discover places
  const allStats: Stats[] = [];

  for (const city of cities) {
    const cityStats = await discoverForCity(city, categoryConfig, categoryId, LIMIT, DRY_RUN);
    allStats.push(cityStats);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🇩🇪 GERMANY DISCOVERY SUMMARY");
  console.log("=".repeat(60));

  let totalFound = 0,
    totalCreated = 0,
    totalSkipped = 0,
    totalErrors = 0;

  for (const stat of allStats) {
    console.log(
      `${stat.city}: ${stat.created} created, ${stat.skipped} skipped, ${stat.errors} errors`
    );
    totalFound += stat.resultsFound;
    totalCreated += stat.created;
    totalSkipped += stat.skipped;
    totalErrors += stat.errors;
  }

  console.log("=".repeat(60));
  console.log(
    `TOTAL: ${totalFound} found, ${totalCreated} created, ${totalSkipped} skipped, ${totalErrors} errors`
  );

  if (DRY_RUN) {
    console.log("\n⚠️  DRY RUN - No actual changes were made");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
