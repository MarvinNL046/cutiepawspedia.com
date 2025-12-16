#!/usr/bin/env npx tsx
/**
 * Discover Places in France via BrightData SERP API
 *
 * Discovers NEW places by searching Google Maps for specific categories in France.
 * Uses French search terms on google.fr for better local results.
 *
 * Usage:
 *   npx tsx scripts/discover-places-fr.ts --category=veterinary --city=Paris
 *   npx tsx scripts/discover-places-fr.ts --category=veterinary --all-cities --limit=15
 *   npx tsx scripts/discover-places-fr.ts --all-categories --all-cities --limit=10
 *   npx tsx scripts/discover-places-fr.ts --category=pet-grooming --city=Lyon --dry-run
 *
 * Requirements:
 *   BRIGHTDATA_API_KEY    - BrightData API token
 *   BRIGHTDATA_SERP_ZONE    - SERP zone name (e.g., serp_cutiepaws)
 */

import { neon } from "@neondatabase/serverless";
import { parseArgs } from "util";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;
const SERP_ENDPOINT = "https://api.brightdata.com/request";

// =============================================================================
// CATEGORY CONFIGURATION - French search terms
// =============================================================================

interface CategoryConfig {
  slug: string;
  searchTermFr: string;
  searchTermEn: string;
  labelKey: string;
  icon: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  veterinary: {
    slug: "veterinary",
    searchTermFr: "vétérinaire",
    searchTermEn: "veterinarian",
    labelKey: "Veterinarians",
    icon: "Stethoscope",
  },
  "pet-grooming": {
    slug: "pet-grooming",
    searchTermFr: "toilettage chien",
    searchTermEn: "dog grooming",
    labelKey: "Pet Grooming",
    icon: "Scissors",
  },
  "pet-hotel": {
    slug: "pet-hotel",
    searchTermFr: "pension pour animaux",
    searchTermEn: "pet hotel",
    labelKey: "Pet Hotels",
    icon: "Hotel",
  },
  "dog-training": {
    slug: "dog-training",
    searchTermFr: "éducateur canin",
    searchTermEn: "dog training",
    labelKey: "Dog Training",
    icon: "GraduationCap",
  },
  "dog-walking": {
    slug: "dog-walking",
    searchTermFr: "promeneur de chien",
    searchTermEn: "dog walking service",
    labelKey: "Dog Walking",
    icon: "Footprints",
  },
  "pet-store": {
    slug: "pet-store",
    searchTermFr: "animalerie",
    searchTermEn: "pet store",
    labelKey: "Pet Stores",
    icon: "ShoppingBag",
  },
  "cat-grooming": {
    slug: "cat-grooming",
    searchTermFr: "toilettage chat",
    searchTermEn: "cat grooming",
    labelKey: "Cat Grooming",
    icon: "Cat",
  },
  "pet-sitting": {
    slug: "pet-sitting",
    searchTermFr: "garde animaux à domicile",
    searchTermEn: "pet sitting",
    labelKey: "Pet Sitting",
    icon: "Home",
  },
  "emergency-vet": {
    slug: "emergency-vet",
    searchTermFr: "vétérinaire urgence",
    searchTermEn: "emergency vet",
    labelKey: "Emergency Vet",
    icon: "Siren",
  },
  "dog-daycare": {
    slug: "dog-daycare",
    searchTermFr: "garderie pour chien",
    searchTermEn: "dog daycare",
    labelKey: "Dog Daycare",
    icon: "Dog",
  },
  shelter: {
    slug: "shelter",
    searchTermFr: "refuge pour animaux",
    searchTermEn: "animal shelter",
    labelKey: "Animal Shelters",
    icon: "Heart",
  },
  boarding: {
    slug: "boarding",
    searchTermFr: "pension canine",
    searchTermEn: "pet boarding",
    labelKey: "Pet Boarding",
    icon: "Bed",
  },
  "dog-park": {
    slug: "dog-park",
    searchTermFr: "parc canin",
    searchTermEn: "dog park",
    labelKey: "Dog Parks",
    icon: "Trees",
  },
  "exotic-vet": {
    slug: "exotic-vet",
    searchTermFr: "vétérinaire NAC",
    searchTermEn: "exotic animal vet",
    labelKey: "Exotic Vets",
    icon: "Bird",
  },
};

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  category?: string;
  city?: string;
  allCities?: boolean;
  allCategories?: boolean;
  limit?: number;
  dryRun?: boolean;
  verbose?: boolean;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        category: { type: "string", short: "c" },
        city: { type: "string", short: "t" },
        "all-cities": { type: "boolean", short: "a" },
        "all-categories": { type: "boolean" },
        limit: { type: "string", short: "l" },
        "dry-run": { type: "boolean", short: "d" },
        verbose: { type: "boolean", short: "v" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      category: values.category,
      city: values.city,
      allCities: values["all-cities"],
      allCategories: values["all-categories"],
      limit: values.limit ? parseInt(values.limit, 10) : 20,
      dryRun: values["dry-run"],
      verbose: values.verbose,
      help: values.help,
    };
  } catch (error) {
    console.error("Error parsing arguments:", error);
    printHelp();
    process.exit(1);
  }
}

function printHelp(): void {
  const categoryList = Object.entries(CATEGORIES)
    .map(([slug, config]) => `  ${slug.padEnd(16)} ${config.searchTermFr}`)
    .join("\n");

  console.log(`
🇫🇷 Discover Places in France via BrightData SERP API

Usage:
  npx tsx scripts/discover-places-fr.ts --category=<slug> --city=<name>
  npx tsx scripts/discover-places-fr.ts --category=<slug> --all-cities
  npx tsx scripts/discover-places-fr.ts --all-categories --all-cities
  npx tsx scripts/discover-places-fr.ts --help

Options:
  -c, --category <slug>   Category to search (required unless --all-categories)
      --all-categories    Search all ${Object.keys(CATEGORIES).length} categories
  -t, --city <name>       City name (e.g., Paris, Lyon, Marseille)
  -a, --all-cities        Search in all French cities in database
  -l, --limit <n>         Max results per search (default: 20)
  -d, --dry-run           Show what would be done without changes
  -v, --verbose           Verbose output
  -h, --help              Show this help

Categories (${Object.keys(CATEGORIES).length} total):
${categoryList}

Examples:
  npx tsx scripts/discover-places-fr.ts --category=veterinary --city=Paris
  npx tsx scripts/discover-places-fr.ts --category=pet-grooming --all-cities --limit=15
  npx tsx scripts/discover-places-fr.ts --all-categories --all-cities --limit=10
`);
}

// =============================================================================
// DATABASE HELPERS
// =============================================================================

interface City {
  id: number;
  name: string;
  countryId: number;
}

interface Category {
  id: number;
  slug: string;
}

async function getCitiesFromDb(cityName?: string): Promise<City[]> {
  if (cityName) {
    const cities = await sql`
      SELECT c.id, c.name, c.country_id as "countryId"
      FROM cities c
      JOIN countries co ON c.country_id = co.id
      WHERE co.code = 'FR' AND LOWER(c.name) = LOWER(${cityName})
    `;
    return cities as City[];
  }

  // Get all French cities
  const cities = await sql`
    SELECT c.id, c.name, c.country_id as "countryId"
    FROM cities c
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'FR'
    ORDER BY c.name
  `;
  return cities as City[];
}

async function getOrCreateCategory(config: CategoryConfig): Promise<number> {
  const existing = await sql`
    SELECT id FROM categories WHERE slug = ${config.slug}
  `;

  if (existing.length > 0) {
    return existing[0].id as number;
  }

  const result = await sql`
    INSERT INTO categories (slug, label_key, icon)
    VALUES (${config.slug}, ${config.labelKey}, ${config.icon})
    RETURNING id
  `;

  return result[0].id as number;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

async function placeExists(slug: string, cityId: number): Promise<boolean> {
  const result = await sql`
    SELECT 1 FROM places
    WHERE slug = ${slug} AND city_id = ${cityId}
    LIMIT 1
  `;
  return result.length > 0;
}

// =============================================================================
// SERP API SEARCH
// =============================================================================

interface GoogleLocalResult {
  title?: string;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  place_id?: string;
  cid?: string;
  category?: string;
  // New fields from SERP API
  latitude?: number;
  longitude?: number;
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

interface SerpLocalResult {
  title?: string;
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  link?: string;
  rating?: number | string;
  reviews?: number | string;
  review_count?: number | string;
  place_id?: string;
  type?: string;
  category?: string;
}

interface SerpResponse {
  local_results?: SerpLocalResult[];
  local_pack?: SerpLocalResult[];
  places?: SerpLocalResult[];
  knowledge_graph?: SerpLocalResult;
  error?: string;
}

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 3000; // 3 seconds base delay

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      // If we get a 500 error, retry with exponential backoff
      if (response.status >= 500 && attempt < retries) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1); // 3s, 6s, 12s
        console.log(`   🔄 Retry ${attempt}/${retries} after ${delay/1000}s (status ${response.status})...`);
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error) {
      if (attempt < retries) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`   🔄 Retry ${attempt}/${retries} after ${delay/1000}s (network error)...`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }

  // This should never be reached, but TypeScript needs it
  throw new Error("Max retries exceeded");
}

async function searchGoogleMapsSerp(
  query: string,
  city: string,
  limit: number
): Promise<GoogleLocalResult[]> {
  if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BrightData credentials not configured");
    return [];
  }

  // Use google.fr with French language settings
  const searchUrl = `https://www.google.fr/search?q=${encodeURIComponent(query + " " + city)}&tbm=lcl&hl=fr&gl=fr&num=${limit}`;

  console.log(`   📎 SERP: ${query} ${city}`);

  try {
    const response = await fetchWithRetry(SERP_ENDPOINT, {
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

    const data = (await response.json()) as SerpResponse;
    const serpWrapper = data as unknown as { status_code: number; body: string | SerpResponse };

    if (serpWrapper.body) {
      if (typeof serpWrapper.body === "string") {
        try {
          const parsedBody = JSON.parse(serpWrapper.body);
          return parseGoogleSerpResults(parsedBody);
        } catch {
          console.log(`   ⚠️ Failed to parse response body`);
        }
      } else {
        return parseGoogleSerpResults(serpWrapper.body as SerpResponse);
      }
    }

    return parseGoogleSerpResults(data);
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return [];
  }
}

function parseGoogleSerpResults(data: SerpResponse): GoogleLocalResult[] {
  const results: GoogleLocalResult[] = [];

  const snackPack = (data as unknown as { snack_pack?: SerpLocalResult[] }).snack_pack;
  const localResults = snackPack || data.local_results || data.local_pack || data.places || [];

  for (const result of localResults) {
    if (typeof result !== "object" || !result) continue;

    const resultAny = result as Record<string, unknown>;
    const rating = parseFloat(String(resultAny.rating || resultAny.stars || 0));
    const reviewCount = parseInt(
      String(resultAny.reviews_cnt || resultAny.reviews || resultAny.review_count || 0),
      10
    );

    // Parse coordinates
    const lat = parseFloat(String(resultAny.lat || resultAny.latitude || (resultAny.gps_coordinates as Record<string, unknown>)?.latitude || 0));
    const lng = parseFloat(String(resultAny.lng || resultAny.longitude || (resultAny.gps_coordinates as Record<string, unknown>)?.longitude || 0));

    // Parse image URLs
    const imageUrl = resultAny.original_image || resultAny.image || resultAny.photo || resultAny.main_image;
    const thumbnailUrl = resultAny.thumbnail || resultAny.thumb || resultAny.small_image;

    // Parse work status
    const workStatus = resultAny.work_status || resultAny.open_state || resultAny.status;

    // Parse opening hours
    let openingHours: Record<string, string> | undefined;
    const hoursData = resultAny.hours || resultAny.opening_hours || resultAny.work_hours || resultAny.working_hours;
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
    const accessibilityData = resultAny.accessibility as Record<string, boolean> | undefined;
    const accessibility = accessibilityData ? {
      wheelchairEntrance: accessibilityData.wheelchair_entrance || accessibilityData.wheelchair_accessible || false,
      parking: accessibilityData.parking || accessibilityData.has_parking || false,
    } : undefined;

    // Parse service options
    const serviceOptionsRaw = resultAny.service_options || resultAny.services || resultAny.amenities;
    const serviceOptions = Array.isArray(serviceOptionsRaw) ? serviceOptionsRaw.map(String) : undefined;

    const name = resultAny.title || resultAny.name || resultAny.business_name;
    if (name) {
      results.push({
        title: String(name),
        name: String(name),
        address: String(resultAny.address || resultAny.location || ""),
        phone: String(resultAny.phone || resultAny.phone_number || ""),
        website: String(resultAny.site || resultAny.website || resultAny.link || resultAny.url || ""),
        rating: rating > 0 ? rating : undefined,
        reviews: reviewCount > 0 ? reviewCount : undefined,
        place_id: String(resultAny.place_id || resultAny.data_id || ""),
        cid: String(resultAny.cid || ""),
        category: String(resultAny.type || resultAny.category || resultAny.business_type || ""),
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
  }

  console.log(`   ✅ Parsed ${results.length} local results`);
  return results;
}

// =============================================================================
// PLACE CREATION
// =============================================================================

interface CreatePlaceResult {
  success: boolean;
  placeId?: number;
  action: "created" | "skipped" | "error";
  reason?: string;
}

async function createPlace(
  result: GoogleLocalResult,
  cityId: number,
  categoryId: number,
  dryRun: boolean
): Promise<CreatePlaceResult> {
  const name = result.title || result.name;
  if (!name) {
    return { success: false, action: "skipped", reason: "no name" };
  }

  const slug = generateSlug(name);

  if (await placeExists(slug, cityId)) {
    return { success: false, action: "skipped", reason: "already exists" };
  }

  if (dryRun) {
    return { success: true, action: "created", reason: "dry run" };
  }

  try {
    const scrapedContent: Record<string, unknown> = {
      googlePlaceId: result.place_id,
      googleCid: result.cid,
      googleRating: result.rating,
      googleReviewCount: result.reviews,
      category: result.category,
      discoveredAt: new Date().toISOString(),
      discoverySource: "brightdata_serp_api_fr",
    };

    // Add GPS coordinates if available
    if (result.latitude && result.longitude) {
      scrapedContent.coordinates = {
        lat: result.latitude,
        lng: result.longitude,
      };
    }

    // Add image URLs if available
    if (result.imageUrl) {
      scrapedContent.imageUrl = result.imageUrl;
    }
    if (result.thumbnailUrl) {
      scrapedContent.thumbnailUrl = result.thumbnailUrl;
    }

    // Add opening hours if available
    if (result.openingHours) {
      scrapedContent.openingHours = result.openingHours;
    }

    // Add work status if available
    if (result.workStatus) {
      scrapedContent.workStatus = result.workStatus;
    }

    // Add accessibility/facilities if available
    if (result.accessibility) {
      scrapedContent.accessibility = result.accessibility;
    }

    // Add service options if available
    if (result.serviceOptions && result.serviceOptions.length > 0) {
      scrapedContent.serviceOptions = result.serviceOptions;
    }

    const insertResult = await sql`
      INSERT INTO places (
        city_id, slug, name, address, phone, website,
        lat, lng,
        avg_rating, review_count,
        scraped_content, is_verified, is_premium
      ) VALUES (
        ${cityId},
        ${slug},
        ${name},
        ${result.address || null},
        ${result.phone || null},
        ${result.website || null},
        ${result.latitude?.toString() || null},
        ${result.longitude?.toString() || null},
        ${result.rating?.toString() || "0"},
        ${typeof result.reviews === "number" ? result.reviews : 0},
        ${JSON.stringify(scrapedContent)}::jsonb,
        false,
        false
      )
      RETURNING id
    `;

    const placeId = insertResult[0].id as number;

    await sql`
      INSERT INTO place_categories (place_id, category_id)
      VALUES (${placeId}, ${categoryId})
      ON CONFLICT DO NOTHING
    `;

    return { success: true, placeId, action: "created" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, action: "error", reason: message };
  }
}

// =============================================================================
// MAIN DISCOVERY FUNCTION
// =============================================================================

interface DiscoveryStats {
  city: string;
  keyword: string;
  resultsReceived: number;
  placesCreated: number;
  placesSkipped: number;
  errors: number;
}

async function discoverForCity(
  city: City,
  categoryConfig: CategoryConfig,
  categoryId: number,
  limit: number,
  dryRun: boolean,
  verbose: boolean
): Promise<DiscoveryStats> {
  const searchTerm = categoryConfig.searchTermFr;

  console.log(`\n🔍 Searching: "${searchTerm}" in ${city.name}`);

  const stats: DiscoveryStats = {
    city: city.name,
    keyword: `${searchTerm} ${city.name}`,
    resultsReceived: 0,
    placesCreated: 0,
    placesSkipped: 0,
    errors: 0,
  };

  const results = await searchGoogleMapsSerp(searchTerm, city.name, limit);
  stats.resultsReceived = results.length;

  if (results.length === 0) {
    console.log(`   ⚠️ No results for ${city.name}`);
    return stats;
  }

  console.log(`   ✅ Got ${results.length} results`);
  console.log(`\n📊 Processing ${results.length} results for ${city.name}...`);

  for (const result of results) {
    const name = result.title || result.name || "Unknown";

    if (verbose) {
      console.log(`\n   → ${name}`);
      if (result.rating) {
        console.log(`     ⭐ ${result.rating}/5 (${result.reviews || 0} reviews)`);
      }
      if (result.address) {
        console.log(`     📍 ${result.address}`);
      }
    }

    const createResult = await createPlace(result, city.id, categoryId, dryRun);

    switch (createResult.action) {
      case "created":
        stats.placesCreated++;
        if (verbose) {
          console.log(`     ✅ ${dryRun ? "Would create" : "Created"} (id: ${createResult.placeId || "N/A"})`);
        }
        break;
      case "skipped":
        stats.placesSkipped++;
        if (verbose) {
          console.log(`     ⏭️ Skipped: ${createResult.reason}`);
        }
        break;
      case "error":
        stats.errors++;
        console.log(`     ❌ Error: ${createResult.reason}`);
        break;
    }
  }

  return stats;
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  const args = parseCliArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  console.log("🇫🇷 Discover Places in France via BrightData SERP API\n");
  console.log("━".repeat(60));

  if (!args.category && !args.allCategories) {
    console.error("❌ --category or --all-categories is required");
    console.error("   Available: " + Object.keys(CATEGORIES).join(", "));
    process.exit(1);
  }

  if (!args.city && !args.allCities) {
    console.error("❌ Either --city or --all-cities is required");
    process.exit(1);
  }

  if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BrightData credentials not configured");
    console.error("   Set BRIGHTDATA_API_KEY and BRIGHTDATA_SERP_ZONE in .env");
    process.exit(1);
  }

  // Handle --all-categories
  if (args.allCategories) {
    console.log(`🚀 Running discovery for ALL ${Object.keys(CATEGORIES).length} categories\n`);
    const allCategoryStats: Record<string, { found: number; added: number; skipped: number }> = {};

    for (const [categorySlug, categoryConfig] of Object.entries(CATEGORIES)) {
      console.log("\n" + "═".repeat(60));
      console.log(`📁 Category: ${categoryConfig.labelKey} (${categorySlug})`);
      console.log("═".repeat(60));

      const categoryId = await getOrCreateCategory(categoryConfig);
      const cities = await getCitiesFromDb(args.allCities ? undefined : args.city);

      let totalFound = 0,
        totalAdded = 0,
        totalSkipped = 0;

      for (const city of cities) {
        const stats = await discoverForCity(
          city,
          categoryConfig,
          categoryId,
          args.limit || 20,
          args.dryRun ?? false,
          args.verbose ?? false
        );
        totalFound += stats.resultsReceived;
        totalAdded += stats.placesCreated;
        totalSkipped += stats.placesSkipped;

        // Rate limiting between cities - 5 seconds to avoid API rate limits
        if (cities.length > 1) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      allCategoryStats[categorySlug] = { found: totalFound, added: totalAdded, skipped: totalSkipped };
      console.log(`   ✅ ${categorySlug}: Found ${totalFound}, Added ${totalAdded}, Skipped ${totalSkipped}`);
    }

    // Final summary
    console.log("\n" + "═".repeat(60));
    console.log("📊 FINAL SUMMARY - ALL CATEGORIES");
    console.log("═".repeat(60));
    let grandTotalFound = 0,
      grandTotalAdded = 0,
      grandTotalSkipped = 0;
    for (const [cat, stats] of Object.entries(allCategoryStats)) {
      console.log(`   ${cat}: Found ${stats.found}, Added ${stats.added}, Skipped ${stats.skipped}`);
      grandTotalFound += stats.found;
      grandTotalAdded += stats.added;
      grandTotalSkipped += stats.skipped;
    }
    console.log("─".repeat(60));
    console.log(`   TOTAL: Found ${grandTotalFound}, Added ${grandTotalAdded}, Skipped ${grandTotalSkipped}`);

    process.exit(0);
  }

  // Single category mode
  const categoryConfig = CATEGORIES[args.category!];
  if (!categoryConfig) {
    console.error(`❌ Unknown category: ${args.category}`);
    console.error("   Available: " + Object.keys(CATEGORIES).join(", "));
    process.exit(1);
  }

  console.log(`📁 Category: ${categoryConfig.labelKey} (${categoryConfig.slug})`);
  console.log(`🔍 Search term: ${categoryConfig.searchTermFr}`);
  console.log(`📊 Limit per city: ${args.limit}`);
  if (args.dryRun) {
    console.log(`🔍 DRY RUN - no database changes`);
  }

  const categoryId = await getOrCreateCategory(categoryConfig);
  console.log(`   Category ID: ${categoryId}`);

  const cities = await getCitiesFromDb(args.allCities ? undefined : args.city);

  if (cities.length === 0) {
    console.error(`❌ No French cities found. Run seed-french-cities.ts first.`);
    process.exit(1);
  }

  console.log(`\n🏙️ Cities to search: ${cities.length}`);
  cities.slice(0, 10).forEach((c) => console.log(`   - ${c.name}`));
  if (cities.length > 10) console.log(`   ... and ${cities.length - 10} more`);

  const allStats: DiscoveryStats[] = [];

  for (const city of cities) {
    const stats = await discoverForCity(
      city,
      categoryConfig,
      categoryId,
      args.limit || 20,
      args.dryRun || false,
      args.verbose || false
    );
    allStats.push(stats);

    // Rate limiting between cities - 5 seconds to avoid API rate limits
    if (cities.length > 1) {
      console.log(`\n⏳ Waiting 5s before next city...`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Final summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Discovery Complete!\n");

  const totalReceived = allStats.reduce((s, x) => s + x.resultsReceived, 0);
  const totalCreated = allStats.reduce((s, x) => s + x.placesCreated, 0);
  const totalSkipped = allStats.reduce((s, x) => s + x.placesSkipped, 0);
  const totalErrors = allStats.reduce((s, x) => s + x.errors, 0);

  console.log(`   Cities searched:    ${allStats.length}`);
  console.log(`   Results received:   ${totalReceived}`);
  console.log(`   Places created:     ${totalCreated}`);
  console.log(`   Places skipped:     ${totalSkipped}`);
  console.log(`   Errors:             ${totalErrors}`);

  if (args.dryRun) {
    console.log(`\n⚠️ DRY RUN - no actual changes were made`);
  }

  console.log("\n🎉 Done!");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
