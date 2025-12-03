#!/usr/bin/env npx ts-node
/**
 * OSM Data Collector via Overpass API
 *
 * Fetches pet-related Points of Interest from OpenStreetMap.
 *
 * Usage:
 *   npx ts-node scripts/collect-osm.ts --country=nl --city=amsterdam
 *   npx ts-node scripts/collect-osm.ts --country=nl --city=amsterdam --dry-run
 *   npx ts-node scripts/collect-osm.ts --list-cities
 *
 * Data sources:
 *   - amenity=veterinary (veterinarians)
 *   - shop=pet (pet stores)
 *   - leisure=dog_park (dog parks)
 *   - amenity=animal_shelter (shelters)
 *   - amenity=animal_boarding (boarding/kennels)
 *   - shop=pet_grooming (groomers)
 *   - amenity=pet_grooming (groomers alternative)
 */

import { parseArgs } from "util";
import { getCity, getAllCities, COUNTRY_NAMES, type CityConfig } from "./config/cities";
import { getOsmPath } from "../lib/data/paths";
import { writeJson, readJson, getJsonStats } from "../lib/data/json-file";
import type { OsmRawData, OsmRawPlace, OsmOverpassElement, OsmTags } from "../lib/data/types";

// =============================================================================
// CONFIGURATION
// =============================================================================

const OVERPASS_URL =
  process.env.OSM_OVERPASS_URL || "https://overpass-api.de/api/interpreter";

/** Rate limit delay between requests (ms) */
const RATE_LIMIT_DELAY = 1000;

/** Timeout for Overpass queries (seconds) */
const OVERPASS_TIMEOUT = 180;

/** Maximum response size (MB) */
const OVERPASS_MAX_SIZE = 50;

/**
 * OSM tags to query for pet-related POIs
 * Format: [key, value, optionalSubKey] tuples
 */
const PET_POI_QUERIES: Array<[string, string, string?]> = [
  // Veterinary services
  ["amenity", "veterinary"],

  // Pet shops
  ["shop", "pet"],

  // Dog parks and facilities
  ["leisure", "dog_park"],

  // Animal shelters
  ["amenity", "animal_shelter"],

  // Boarding and kennels
  ["amenity", "animal_boarding"],

  // Grooming services (various tags used)
  ["shop", "pet_grooming"],
  ["amenity", "pet_grooming"],
  ["craft", "pet_grooming"],

  // Pet-friendly cafes (bonus)
  ["amenity", "cafe", "dog"],

  // Pet cemeteries
  ["amenity", "animal_cemetery"],
  ["landuse", "cemetery", "animal"],
];

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  country?: string;
  city?: string;
  listCities?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  force?: boolean;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        country: { type: "string", short: "c" },
        city: { type: "string" },
        "list-cities": { type: "boolean", short: "l" },
        "dry-run": { type: "boolean", short: "d" },
        verbose: { type: "boolean", short: "v" },
        force: { type: "boolean", short: "f" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      country: values.country,
      city: values.city,
      listCities: values["list-cities"],
      dryRun: values["dry-run"],
      verbose: values.verbose,
      force: values.force,
      help: values.help,
    };
  } catch (error) {
    console.error("Error parsing arguments:", error);
    printHelp();
    process.exit(1);
  }
}

function printHelp(): void {
  console.log(`
OSM Data Collector for CutiePawsPedia

Usage:
  npx ts-node scripts/collect-osm.ts --country=<code> --city=<slug>
  npx ts-node scripts/collect-osm.ts --list-cities
  npx ts-node scripts/collect-osm.ts --help

Options:
  -c, --country <code>   ISO country code (e.g., nl, be, de)
  --city <slug>          City slug (e.g., amsterdam, rotterdam)
  -l, --list-cities      List all configured cities
  -d, --dry-run          Show query without executing
  -v, --verbose          Verbose output
  -f, --force            Overwrite existing data
  -h, --help             Show this help

Examples:
  npx ts-node scripts/collect-osm.ts --country=nl --city=amsterdam
  npx ts-node scripts/collect-osm.ts -c nl --city=rotterdam --verbose
  npx ts-node scripts/collect-osm.ts --list-cities
`);
}

function listCities(): void {
  console.log("\nConfigured Cities:\n");

  const allCities = getAllCities();
  const byCountry = allCities.reduce(
    (acc, city) => {
      const key = city.countryCode;
      if (!acc[key]) acc[key] = [];
      acc[key].push(city);
      return acc;
    },
    {} as Record<string, CityConfig[]>
  );

  for (const [countryCode, cities] of Object.entries(byCountry)) {
    const countryName = COUNTRY_NAMES[countryCode] || countryCode.toUpperCase();
    console.log(`${countryName} (${countryCode}):`);
    for (const city of cities) {
      const pdok = city.hasPdok ? " [PDOK]" : "";
      console.log(`  - ${city.slug.padEnd(15)} ${city.name}${pdok}`);
    }
    console.log();
  }
}

// =============================================================================
// OVERPASS QUERY BUILDER
// =============================================================================

/**
 * Build an Overpass QL query for pet-related POIs in a bounding box
 */
function buildOverpassQuery(bbox: [number, number, number, number]): string {
  const [south, west, north, east] = bbox;
  const bboxStr = `${south},${west},${north},${east}`;

  // Build individual queries for each POI type
  const queries: string[] = [];

  for (const [key, value, subValue] of PET_POI_QUERIES) {
    if (subValue) {
      // Special case for tags with subtags (e.g., cafe with dog tag)
      queries.push(`  node["${key}"="${value}"]["${subValue}"="yes"](${bboxStr});`);
      queries.push(`  way["${key}"="${value}"]["${subValue}"="yes"](${bboxStr});`);
    } else {
      // Standard key=value query
      queries.push(`  node["${key}"="${value}"](${bboxStr});`);
      queries.push(`  way["${key}"="${value}"](${bboxStr});`);
    }
  }

  // Combine all queries with union
  const query = `
[out:json][timeout:${OVERPASS_TIMEOUT}][maxsize:${OVERPASS_MAX_SIZE * 1024 * 1024}];
(
${queries.join("\n")}
);
out center meta;
`.trim();

  return query;
}

// =============================================================================
// OVERPASS API CLIENT
// =============================================================================

interface OverpassResponse {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    copyright: string;
  };
  elements: OsmOverpassElement[];
}

/**
 * Execute an Overpass query and return the results
 */
async function executeOverpassQuery(query: string): Promise<OverpassResponse> {
  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "CutiePawsPedia/1.0 (https://cutiepawspedia.com)",
    },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Overpass API error (${response.status}): ${errorText.slice(0, 200)}`
    );
  }

  return (await response.json()) as OverpassResponse;
}

// =============================================================================
// DATA TRANSFORMATION
// =============================================================================

/**
 * Transform Overpass elements to our OsmRawPlace format
 */
function transformElements(elements: OsmOverpassElement[]): OsmRawPlace[] {
  return elements.map((element) => {
    const place: OsmRawPlace = {
      type: element.type,
      id: element.id,
      lat: element.lat ?? element.center?.lat ?? 0,
      lon: element.lon ?? element.center?.lon ?? 0,
      tags: element.tags || {},
    };

    // Include bounds for way/relation elements
    if (element.bounds) {
      place.bounds = element.bounds;
    }

    // Include center for way/relation elements
    if (element.center) {
      place.center = element.center;
    }

    return place;
  });
}

/**
 * Deduplicate places by OSM ID (nodes and ways can overlap)
 */
function deduplicatePlaces(places: OsmRawPlace[]): OsmRawPlace[] {
  const seen = new Map<string, OsmRawPlace>();

  for (const place of places) {
    const key = `${place.type}/${place.id}`;

    // Prefer nodes over ways/relations for the same location
    if (!seen.has(key)) {
      seen.set(key, place);
    }
  }

  return Array.from(seen.values());
}

/**
 * Filter out places without names (usually less useful)
 */
function filterValidPlaces(
  places: OsmRawPlace[],
  includeUnnamed: boolean = false
): OsmRawPlace[] {
  if (includeUnnamed) {
    return places;
  }

  return places.filter((p) => {
    const hasName = p.tags.name || p.tags["name:en"] || p.tags["name:nl"];
    return hasName;
  });
}

// =============================================================================
// STATISTICS
// =============================================================================

interface CollectionStats {
  totalRaw: number;
  afterDedup: number;
  withName: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
}

function computeStats(
  rawCount: number,
  dedupedPlaces: OsmRawPlace[],
  namedPlaces: OsmRawPlace[]
): CollectionStats {
  const byType: Record<string, number> = {};
  const byCategory: Record<string, number> = {};

  for (const place of namedPlaces) {
    // Count by OSM element type
    byType[place.type] = (byType[place.type] || 0) + 1;

    // Count by category (first matching tag)
    const category = detectCategory(place.tags);
    byCategory[category] = (byCategory[category] || 0) + 1;
  }

  return {
    totalRaw: rawCount,
    afterDedup: dedupedPlaces.length,
    withName: namedPlaces.length,
    byType,
    byCategory,
  };
}

/**
 * Detect the primary category from OSM tags
 */
function detectCategory(tags: OsmTags): string {
  if (tags.amenity === "veterinary") return "veterinary";
  if (tags.shop === "pet") return "pet-store";
  if (tags.leisure === "dog_park") return "dog-park";
  if (tags.amenity === "animal_shelter") return "animal-shelter";
  if (tags.amenity === "animal_boarding") return "boarding";
  if (
    tags.shop === "pet_grooming" ||
    tags.amenity === "pet_grooming" ||
    tags["craft"] === "pet_grooming"
  ) {
    return "grooming";
  }
  if (tags.amenity === "cafe" && tags["dog"] === "yes") return "pet-cafe";
  if (
    tags.amenity === "animal_cemetery" ||
    (tags["landuse"] === "cemetery" && tags["animal"] === "yes")
  ) {
    return "cemetery";
  }
  return "other";
}

function printStats(stats: CollectionStats, cityName: string): void {
  console.log(`\n📊 Collection Statistics for ${cityName}:`);
  console.log(`   Raw elements:    ${stats.totalRaw}`);
  console.log(`   After dedup:     ${stats.afterDedup}`);
  console.log(`   With name:       ${stats.withName}`);

  console.log(`\n   By element type:`);
  for (const [type, count] of Object.entries(stats.byType)) {
    console.log(`     ${type.padEnd(10)} ${count}`);
  }

  console.log(`\n   By category:`);
  const sortedCategories = Object.entries(stats.byCategory).sort(
    (a, b) => b[1] - a[1]
  );
  for (const [category, count] of sortedCategories) {
    console.log(`     ${category.padEnd(15)} ${count}`);
  }
}

// =============================================================================
// MAIN COLLECTION FUNCTION
// =============================================================================

interface CollectionResult {
  success: boolean;
  placesCount: number;
  filePath: string;
  stats?: CollectionStats;
  error?: string;
}

async function collectOsmData(
  cityConfig: CityConfig,
  options: { dryRun?: boolean; verbose?: boolean; force?: boolean }
): Promise<CollectionResult> {
  const { countryCode, slug: citySlug, name: cityName, bbox } = cityConfig;
  const filePath = getOsmPath(countryCode, citySlug);

  console.log(`\n🗺️  Collecting OSM data for ${cityName} (${countryCode.toUpperCase()})`);
  console.log(`   Bounding box: [${bbox.join(", ")}]`);
  console.log(`   Output: ${filePath}`);

  // Check if file already exists
  if (!options.force) {
    const existingStats = await getJsonStats(filePath);
    if (existingStats) {
      const existing = await readJson<OsmRawData>(filePath);
      if (existing) {
        console.log(
          `\n⚠️  Data already exists (${existing.places.length} places, ${existingStats.modifiedAt.toISOString()})`
        );
        console.log(`   Use --force to overwrite`);
        return {
          success: true,
          placesCount: existing.places.length,
          filePath,
        };
      }
    }
  }

  // Build query
  const query = buildOverpassQuery(bbox);

  if (options.verbose || options.dryRun) {
    console.log(`\n📝 Overpass Query:\n${query}\n`);
  }

  if (options.dryRun) {
    console.log("🔍 Dry run - not executing query");
    return {
      success: true,
      placesCount: 0,
      filePath,
    };
  }

  // Execute query
  console.log(`\n⏳ Querying Overpass API...`);
  const startTime = Date.now();

  try {
    const response = await executeOverpassQuery(query);
    const queryTime = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(
      `   Received ${response.elements.length} elements in ${queryTime}s`
    );

    // Transform and process
    const rawPlaces = transformElements(response.elements);
    const dedupedPlaces = deduplicatePlaces(rawPlaces);
    const namedPlaces = filterValidPlaces(dedupedPlaces);

    // Compute stats
    const stats = computeStats(
      response.elements.length,
      dedupedPlaces,
      namedPlaces
    );

    if (options.verbose) {
      printStats(stats, cityName);
    }

    // Build output data
    const outputData: OsmRawData = {
      metadata: {
        source: "openstreetmap",
        collectedAt: new Date().toISOString(),
        countryCode,
        citySlug,
        cityName,
        bbox,
        osmTimestamp: response.osm3s.timestamp_osm_base,
        generator: response.generator,
        queryTimeSeconds: parseFloat(queryTime),
        rawElementCount: response.elements.length,
        processedPlaceCount: namedPlaces.length,
      },
      places: namedPlaces,
    };

    // Save to file
    console.log(`\n💾 Saving ${namedPlaces.length} places to ${filePath}`);
    await writeJson(filePath, outputData);

    console.log(`✅ Successfully collected OSM data for ${cityName}`);

    return {
      success: true,
      placesCount: namedPlaces.length,
      filePath,
      stats,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`\n❌ Error collecting OSM data: ${errorMessage}`);

    return {
      success: false,
      placesCount: 0,
      filePath,
      error: errorMessage,
    };
  }
}

// =============================================================================
// MAIN ENTRY POINT
// =============================================================================

async function main(): Promise<void> {
  const args = parseCliArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.listCities) {
    listCities();
    process.exit(0);
  }

  // Validate required arguments
  if (!args.country || !args.city) {
    console.error("❌ Error: --country and --city are required");
    console.error("   Use --list-cities to see available options");
    console.error("   Use --help for usage information");
    process.exit(1);
  }

  // Find city configuration
  const cityConfig = getCity(args.country, args.city);

  if (!cityConfig) {
    console.error(
      `❌ Error: City "${args.city}" not found in country "${args.country}"`
    );
    console.error("   Use --list-cities to see available options");
    process.exit(1);
  }

  // Run collection
  const result = await collectOsmData(cityConfig, {
    dryRun: args.dryRun,
    verbose: args.verbose,
    force: args.force,
  });

  if (!result.success) {
    process.exit(1);
  }

  // Print final summary
  console.log(`\n🎉 Done! Collected ${result.placesCount} places`);
  if (result.stats) {
    console.log(`\n   Category breakdown:`);
    const sorted = Object.entries(result.stats.byCategory).sort(
      (a, b) => b[1] - a[1]
    );
    for (const [cat, count] of sorted) {
      console.log(`     ${cat.padEnd(15)} ${count}`);
    }
  }
}

// Run
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
