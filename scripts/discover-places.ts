#!/usr/bin/env npx tsx
/**
 * Discover Places via BrightData SERP API (Google Maps Local Search)
 *
 * Discovers NEW places by searching Google Maps for specific categories.
 * Uses SERP API for real-time Google search results with high relevance.
 *
 * SETUP REQUIRED:
 * ================
 * 1. Create a SERP API zone in BrightData dashboard:
 *    - Go to https://brightdata.com/cp/zones
 *    - Click "Add Zone" → "SERP API"
 *    - Name it "serp_cutiepaws" or similar
 *    - Enable Google search
 *
 * 2. Add to .env:
 *    BRIGHTDATA_API_TOKEN=your_api_token
 *    BRIGHTDATA_SERP_ZONE=serp_cutiepaws
 *
 * Usage:
 *   npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam
 *   npx tsx scripts/discover-places.ts --category=dog-walking --all-cities
 *   npx tsx scripts/discover-places.ts --category=pet-hotel --city=Rotterdam --dry-run
 *
 * Categories:
 *   - dog-training (hondentraining)
 *   - dog-walking (hondenuitlaatservice)
 *   - pet-hotel (dierenpension)
 *   - pet-grooming (trimsalon)
 *   - veterinary (dierenarts)
 *   - pet-store (dierenwinkel)
 *
 * Environment:
 *   BRIGHTDATA_API_TOKEN    - BrightData API token (required)
 *   BRIGHTDATA_SERP_ZONE    - SERP zone name (required, create in dashboard)
 */

import { neon } from "@neondatabase/serverless";
import { parseArgs } from "util";
import dotenv from "dotenv";

// Load .env with override to ensure .env values are used
dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

// BrightData API configuration
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE;

// SERP API endpoint (new format)
const SERP_ENDPOINT = "https://api.brightdata.com/request";

// =============================================================================
// CATEGORY CONFIGURATION
// =============================================================================

interface CategoryConfig {
  slug: string;
  searchTermNl: string;
  searchTermEn: string;
  labelKey: string;
  icon: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "dog-training": {
    slug: "dog-training",
    searchTermNl: "hondentraining",
    searchTermEn: "dog training",
    labelKey: "Dog Training",
    icon: "GraduationCap",
  },
  "dog-walking": {
    slug: "dog-walking",
    searchTermNl: "hondenuitlaatservice",
    searchTermEn: "dog walking service",
    labelKey: "Dog Walking",
    icon: "Footprints",
  },
  "pet-hotel": {
    slug: "pet-hotel",
    searchTermNl: "dierenpension",
    searchTermEn: "pet hotel",
    labelKey: "Pet Hotels",
    icon: "Hotel",
  },
  "pet-grooming": {
    slug: "pet-grooming",
    searchTermNl: "trimsalon hond",
    searchTermEn: "dog grooming",
    labelKey: "Pet Grooming",
    icon: "Scissors",
  },
  veterinary: {
    slug: "veterinary",
    searchTermNl: "dierenarts",
    searchTermEn: "veterinarian",
    labelKey: "Veterinarians",
    icon: "Stethoscope",
  },
  "pet-store": {
    slug: "pet-store",
    searchTermNl: "dierenwinkel",
    searchTermEn: "pet store",
    labelKey: "Pet Stores",
    icon: "ShoppingBag",
  },
  "cat-grooming": {
    slug: "cat-grooming",
    searchTermNl: "kattentrimsalon",
    searchTermEn: "cat grooming",
    labelKey: "Cat Grooming",
    icon: "Cat",
  },
  "pet-sitting": {
    slug: "pet-sitting",
    searchTermNl: "oppas huisdieren aan huis",
    searchTermEn: "pet sitting",
    labelKey: "Pet Sitting",
    icon: "Home",
  },
  "emergency-vet": {
    slug: "emergency-vet",
    searchTermNl: "spoeddierenarts",
    searchTermEn: "emergency vet",
    labelKey: "Emergency Vet",
    icon: "Siren",
  },
  "dog-daycare": {
    slug: "dog-daycare",
    searchTermNl: "hondencreche",
    searchTermEn: "dog daycare",
    labelKey: "Dog Daycare",
    icon: "Dog",
  },
  "exotic-vet": {
    slug: "exotic-vet",
    searchTermNl: "dierenarts exotische dieren",
    searchTermEn: "exotic animal vet",
    labelKey: "Exotic Vet",
    icon: "Bird",
  },
  "shelter": {
    slug: "shelter",
    searchTermNl: "dierenasiel",
    searchTermEn: "animal shelter",
    labelKey: "Animal Shelters",
    icon: "Heart",
  },
  "grooming": {
    slug: "grooming",
    searchTermNl: "trimsalon hond kat",
    searchTermEn: "pet grooming salon",
    labelKey: "Pet Grooming",
    icon: "Scissors",
  },
  "dog-park": {
    slug: "dog-park",
    searchTermNl: "hondenlosloopgebied",
    searchTermEn: "dog park",
    labelKey: "Dog Parks",
    icon: "Trees",
  },
  "boarding": {
    slug: "boarding",
    searchTermNl: "dierenpension hond kat",
    searchTermEn: "pet boarding",
    labelKey: "Pet Boarding",
    icon: "Bed",
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
    .map(([slug, config]) => `  ${slug.padEnd(16)} ${config.searchTermNl} / ${config.labelKey}`)
    .join("\n");

  console.log(`
Discover Places via BrightData SERP API

Discovers NEW places by searching Google Maps for specific categories.
Uses SERP API for real-time Google search results with high relevance.

Usage:
  npx tsx scripts/discover-places.ts --category=<slug> --city=<name>
  npx tsx scripts/discover-places.ts --category=<slug> --all-cities
  npx tsx scripts/discover-places.ts --all-categories --all-cities
  npx tsx scripts/discover-places.ts --help

Options:
  -c, --category <slug>   Category to search (required unless --all-categories)
      --all-categories    Search all ${Object.keys(CATEGORIES).length} categories
  -t, --city <name>       City name (e.g., Amsterdam, Rotterdam)
  -a, --all-cities        Search in all cities in database
  -l, --limit <n>         Max results per search (default: 20)
  -d, --dry-run           Show what would be done without changes
  -v, --verbose           Verbose output
  -h, --help              Show this help

Categories (${Object.keys(CATEGORIES).length} total):
${categoryList}

Examples:
  npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam
  npx tsx scripts/discover-places.ts --category=dog-walking --all-cities --limit=10
  npx tsx scripts/discover-places.ts --category=pet-hotel --city=Rotterdam --dry-run
  npx tsx scripts/discover-places.ts --all-categories --all-cities --limit=15
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
      SELECT id, name, country_id as "countryId"
      FROM cities
      WHERE LOWER(name) = LOWER(${cityName})
    `;
    return cities as City[];
  }

  // Get all Dutch cities
  const cities = await sql`
    SELECT c.id, c.name, c.country_id as "countryId"
    FROM cities c
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'NL'
    ORDER BY c.name
  `;
  return cities as City[];
}

async function getOrCreateCategory(config: CategoryConfig): Promise<number> {
  // Check if category exists
  const existing = await sql`
    SELECT id FROM categories WHERE slug = ${config.slug}
  `;

  if (existing.length > 0) {
    return existing[0].id as number;
  }

  // Create category
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
  link?: string;
  rating?: number | string;
  reviews?: number | string;
  review_count?: number | string;
  place_id?: string;
  type?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
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

/**
 * Search Google Maps via BrightData SERP API
 * Uses local search mode (tbm=lcl) for business results
 */
async function searchGoogleMapsSerp(
  query: string,
  city: string,
  limit: number
): Promise<GoogleLocalResult[]> {
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not configured");
    return [];
  }

  if (!BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BRIGHTDATA_SERP_ZONE not configured");
    console.error("");
    console.error("   To fix this, create a SERP zone in BrightData dashboard:");
    console.error("   1. Go to https://brightdata.com/cp/zones");
    console.error("   2. Click 'Add Zone' → 'SERP API'");
    console.error("   3. Name it 'serp_cutiepaws' or similar");
    console.error("   4. Add to .env: BRIGHTDATA_SERP_ZONE=serp_cutiepaws");
    console.error("");
    return [];
  }

  // Build Google local search URL
  // tbm=lcl = local search (Google Maps local pack)
  // gl=nl = geo location Netherlands
  // hl=nl = language Dutch
  const searchUrl = `https://www.google.nl/search?q=${encodeURIComponent(query + " " + city)}&tbm=lcl&hl=nl&gl=nl&num=${limit}`;

  console.log(`   📎 SERP: ${query} ${city}`);
  console.log(`   🌐 Zone: ${BRIGHTDATA_SERP_ZONE}`);

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
      console.error(`   ❌ SERP API error ${response.status}: ${errorText.slice(0, 200)}`);

      if (response.status === 400 && errorText.includes("zone")) {
        console.error("");
        console.error("   The SERP zone may not exist. Create one at:");
        console.error("   https://brightdata.com/cp/zones");
        console.error("");
      }

      return [];
    }

    const data = (await response.json()) as SerpResponse;

    // The SERP API returns {status_code, headers, body}
    // We need to extract the body which contains the actual data
    const serpWrapper = data as unknown as { status_code: number; headers: Record<string, string>; body: string | SerpResponse };

    if (serpWrapper.body) {
      if (typeof serpWrapper.body === 'string') {
        // Body is a JSON string, parse it
        try {
          const parsedBody = JSON.parse(serpWrapper.body);
          return parseGoogleSerpResults(parsedBody);
        } catch {
          console.log(`   ⚠️ Failed to parse response body`);
        }
      } else {
        // Body is already an object
        return parseGoogleSerpResults(serpWrapper.body as SerpResponse);
      }
    }

    // Check if response contains only response_id (async mode - zone doesn't exist)
    if ("response_id" in data && Object.keys(data).length <= 2) {
      console.error("   ❌ SERP zone does not exist or is misconfigured");
      console.error("");
      console.error("   Create a SERP zone in BrightData dashboard:");
      console.error("   https://brightdata.com/cp/zones");
      console.error("");
      return [];
    }

    return parseGoogleSerpResults(data);
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Parse Google SERP response to extract local business data
 * BrightData SERP returns data in different formats:
 * - snack_pack: Array of local business listings (most common for tbm=lcl)
 * - local_results / local_pack / places: Alternative formats
 */
function parseGoogleSerpResults(data: SerpResponse): GoogleLocalResult[] {
  const results: GoogleLocalResult[] = [];

  // BrightData uses "snack_pack" for local business results
  const snackPack = (data as unknown as { snack_pack?: SerpLocalResult[] }).snack_pack;

  // Try different result formats (snack_pack, local_results, local_pack, places)
  const localResults = snackPack || data.local_results || data.local_pack || data.places || [];

  for (const result of localResults) {
    if (typeof result !== "object" || !result) continue;

    // BrightData snack_pack uses different field names
    // Keys: cid, name, rating, reviews_cnt, type, work_status, address, maps_link, site
    const resultAny = result as Record<string, unknown>;
    const rating = parseFloat(String(resultAny.rating || resultAny.stars || 0));
    const reviewCount = parseInt(
      String(resultAny.reviews_cnt || resultAny.reviews || resultAny.review_count || 0),
      10
    );

    // Include all results that have a name/title
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
        place_id: String(resultAny.cid || resultAny.place_id || resultAny.data_id || ""),
        category: String(resultAny.type || resultAny.category || resultAny.business_type || ""),
      });
    }
  }

  // Also check knowledge_graph for single business result
  const kg = data.knowledge_graph;
  if (kg && typeof kg === "object" && (kg.title || kg.name)) {
    const rating = parseFloat(String(kg.rating || 0));
    const reviewCount = parseInt(String(kg.reviews || 0), 10);

    results.push({
      title: kg.title,
      name: kg.name,
      address: kg.address,
      phone: kg.phone,
      website: kg.website,
      rating: rating > 0 ? rating : undefined,
      reviews: reviewCount > 0 ? reviewCount : undefined,
    });
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

  // Check if place already exists
  if (await placeExists(slug, cityId)) {
    return { success: false, action: "skipped", reason: "already exists" };
  }

  if (dryRun) {
    return { success: true, action: "created", reason: "dry run" };
  }

  try {
    // Prepare scraped content metadata
    const scrapedContent = {
      googlePlaceId: result.place_id,
      googleRating: result.rating,
      googleReviewCount: result.reviews,
      category: result.category,
      discoveredAt: new Date().toISOString(),
      discoverySource: "brightdata_serp_api",
    };

    // Insert place
    const insertResult = await sql`
      INSERT INTO places (
        city_id, slug, name, address, phone, website,
        avg_rating, review_count,
        scraped_content, is_verified, is_premium
      ) VALUES (
        ${cityId},
        ${slug},
        ${name},
        ${result.address || null},
        ${result.phone || null},
        ${result.website || null},
        ${result.rating?.toString() || "0"},
        ${typeof result.reviews === "number" ? result.reviews : 0},
        ${JSON.stringify(scrapedContent)}::jsonb,
        false,
        false
      )
      RETURNING id
    `;

    const placeId = insertResult[0].id as number;

    // Link to category
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
  const searchTerm = categoryConfig.searchTermNl;

  console.log(`\n🔍 Searching: "${searchTerm}" in ${city.name}`);

  const stats: DiscoveryStats = {
    city: city.name,
    keyword: `${searchTerm} ${city.name}`,
    resultsReceived: 0,
    placesCreated: 0,
    placesSkipped: 0,
    errors: 0,
  };

  // Search via SERP API
  const results = await searchGoogleMapsSerp(searchTerm, city.name, limit);
  stats.resultsReceived = results.length;

  if (results.length === 0) {
    console.log(`   ⚠️ No results for ${city.name}`);
    return stats;
  }

  console.log(`   ✅ Got ${results.length} results`);

  // Process results
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
          console.log(
            `     ✅ ${dryRun ? "Would create" : "Created"} (id: ${createResult.placeId || "N/A"})`
          );
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

  console.log("🔎 Discover Places via BrightData SERP API\n");
  console.log("━".repeat(60));

  // Validate args
  if (!args.category && !args.allCategories) {
    console.error("❌ --category or --all-categories is required");
    console.error("   Available: " + Object.keys(CATEGORIES).join(", "));
    process.exit(1);
  }

  if (!args.city && !args.allCities) {
    console.error("❌ Either --city or --all-cities is required");
    process.exit(1);
  }

  // Validate BrightData credentials
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set in environment");
    console.error("   Get your token from: https://brightdata.com/cp/account");
    process.exit(1);
  }

  if (!BRIGHTDATA_SERP_ZONE) {
    console.error("❌ BRIGHTDATA_SERP_ZONE not set in environment");
    console.error("");
    console.error("   To fix this:");
    console.error("   1. Go to https://brightdata.com/cp/zones");
    console.error("   2. Click 'Add Zone' → 'SERP API'");
    console.error("   3. Name it 'serp_cutiepaws' or similar");
    console.error("   4. Add to .env: BRIGHTDATA_SERP_ZONE=serp_cutiepaws");
    console.error("");
    process.exit(1);
  }

  // Handle --all-categories flag
  if (args.allCategories) {
    console.log(`🚀 Running discovery for ALL ${Object.keys(CATEGORIES).length} categories\n`);
    const allCategoryStats: Record<string, { found: number; added: number; skipped: number }> = {};

    for (const [categorySlug, categoryConfig] of Object.entries(CATEGORIES)) {
      console.log("\n" + "═".repeat(60));
      console.log(`📁 Category: ${categoryConfig.labelKey} (${categorySlug})`);
      console.log("═".repeat(60));

      const categoryId = await getOrCreateCategory(categoryConfig);
      const cities = await getCitiesFromDb(args.allCities ? undefined : args.city);

      let totalFound = 0, totalAdded = 0, totalSkipped = 0;

      for (const city of cities) {
        const stats = await discoverForCity(
          city,
          categoryConfig,
          categoryId,
          args.limit || 20,
          args.dryRun ?? false
        );
        totalFound += stats.found;
        totalAdded += stats.added;
        totalSkipped += stats.skipped;
      }

      allCategoryStats[categorySlug] = { found: totalFound, added: totalAdded, skipped: totalSkipped };
      console.log(`   ✅ ${categorySlug}: Found ${totalFound}, Added ${totalAdded}, Skipped ${totalSkipped}`);
    }

    // Final summary
    console.log("\n" + "═".repeat(60));
    console.log("📊 FINAL SUMMARY - ALL CATEGORIES");
    console.log("═".repeat(60));
    let grandTotalFound = 0, grandTotalAdded = 0, grandTotalSkipped = 0;
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

  // Get category config (for single category mode)
  const categoryConfig = CATEGORIES[args.category!];
  if (!categoryConfig) {
    console.error(`❌ Unknown category: ${args.category}`);
    console.error("   Available: " + Object.keys(CATEGORIES).join(", "));
    process.exit(1);
  }

  console.log(`📁 Category: ${categoryConfig.labelKey} (${categoryConfig.slug})`);
  console.log(`🔍 Search term: ${categoryConfig.searchTermNl}`);
  console.log(`📊 Limit per city: ${args.limit}`);
  if (args.dryRun) {
    console.log(`🔍 DRY RUN - no database changes`);
  }

  // Get or create category
  const categoryId = await getOrCreateCategory(categoryConfig);
  console.log(`   Category ID: ${categoryId}`);

  // Get cities
  const cities = await getCitiesFromDb(args.allCities ? undefined : args.city);

  if (cities.length === 0) {
    console.error(`❌ No cities found`);
    process.exit(1);
  }

  console.log(`\n🏙️ Cities to search: ${cities.length}`);
  cities.forEach((c) => console.log(`   - ${c.name}`));

  // Process each city
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

    // Rate limiting between cities (SERP API has rate limits)
    if (cities.length > 1) {
      console.log(`\n⏳ Waiting 2s before next city...`);
      await new Promise((r) => setTimeout(r, 2000));
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
