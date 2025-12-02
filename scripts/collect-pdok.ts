#!/usr/bin/env npx tsx
/**
 * PDOK BAG Data Collector
 *
 * Fetches Dutch address data from the PDOK Locatieserver API.
 * Only available for Netherlands (countryCode: "nl").
 *
 * Usage:
 *   npx tsx scripts/collect-pdok.ts --city=amsterdam
 *   npx tsx scripts/collect-pdok.ts --city=amsterdam --dry-run
 *   npx tsx scripts/collect-pdok.ts --list-cities
 *
 * Data source:
 *   PDOK Locatieserver v3.1 - https://api.pdok.nl/bzk/locatieserver/search/v3_1
 */

import { parseArgs } from "util";
import {
  getNlCityConfig,
  getAllNlCities,
  resolveNlCitySlug,
  type NlCityConfig,
} from "./config/nl-cities";
import { getPdokPath } from "../lib/data/paths";
import { writeJson, readJson, getJsonStats } from "../lib/data/json-file";
import type { PdokBagAddress, PdokRawData } from "../lib/data/types";

// =============================================================================
// CONFIGURATION
// =============================================================================

/** PDOK Locatieserver API URL */
const PDOK_API_URL = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free";

/** Maximum rows per request (PDOK limit is 100 as of 2024) */
const MAX_ROWS = 100;

/** Rate limit delay between paginated requests (ms) */
const RATE_LIMIT_DELAY = 200;

/** Request timeout (ms) */
const REQUEST_TIMEOUT = 60000;

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  city?: string;
  listCities?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  force?: boolean;
  limit?: number;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        city: { type: "string", short: "c" },
        "list-cities": { type: "boolean", short: "l" },
        "dry-run": { type: "boolean", short: "d" },
        verbose: { type: "boolean", short: "v" },
        force: { type: "boolean", short: "f" },
        limit: { type: "string" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      city: values.city,
      listCities: values["list-cities"],
      dryRun: values["dry-run"],
      verbose: values.verbose,
      force: values.force,
      limit: values.limit ? parseInt(values.limit, 10) : undefined,
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
PDOK BAG Data Collector for CutiePawsPedia

Usage:
  npx tsx scripts/collect-pdok.ts --city=<slug>
  npx tsx scripts/collect-pdok.ts --list-cities
  npx tsx scripts/collect-pdok.ts --help

Options:
  -c, --city <slug>      City slug (e.g., amsterdam, rotterdam)
  -l, --list-cities      List all configured NL cities
  -d, --dry-run          Show query without executing
  -v, --verbose          Verbose output
  -f, --force            Overwrite existing data
  --limit <n>            Limit number of addresses (for testing)
  -h, --help             Show this help

Examples:
  npx tsx scripts/collect-pdok.ts --city=amsterdam
  npx tsx scripts/collect-pdok.ts -c rotterdam --verbose
  npx tsx scripts/collect-pdok.ts --city=utrecht --limit=100
  npx tsx scripts/collect-pdok.ts --list-cities

Note: This collector only works for Netherlands (NL) cities.
`);
}

function listCities(): void {
  console.log("\nConfigured NL Cities for PDOK BAG:\n");

  const cities = getAllNlCities();
  for (const city of cities) {
    const code = city.municipalCode ? ` (${city.municipalCode})` : "";
    console.log(`  - ${city.citySlug.padEnd(15)} ${city.cityName}${code}`);
  }
  console.log();
}

// =============================================================================
// API QUERY BUILDER
// =============================================================================

/**
 * Build PDOK Locatieserver query URL
 */
function buildQueryUrl(
  cityName: string,
  start: number = 0,
  rows: number = MAX_ROWS
): string {
  const params = new URLSearchParams({
    q: `woonplaatsnaam:${cityName}`,
    fq: "type:adres",
    rows: rows.toString(),
    start: start.toString(),
    fl: "*", // All fields
  });

  return `${PDOK_API_URL}?${params.toString()}`;
}

// =============================================================================
// PDOK API CLIENT
// =============================================================================

interface LocatieserverResponse {
  response: {
    numFound: number;
    start: number;
    docs: LocatieserverDoc[];
  };
}

interface LocatieserverDoc {
  id: string;
  identificatie: string;
  straatnaam: string;
  huisnummer: number;
  huisletter?: string;
  toevoeging?: string;
  postcode: string;
  woonplaatsnaam: string;
  gemeentenaam: string;
  provincienaam: string;
  provinciecode?: string;
  centroide_ll: string; // WKT format: "POINT(lon lat)"
  centroide_rd?: string;
  nummeraanduiding_id?: string;
  adresseerbaarobject_id?: string;
  openbareruimte_id?: string;
  bouwjaar?: number;
  oppervlakte?: number;
  [key: string]: unknown;
}

/**
 * Fetch a single page of addresses
 */
async function fetchPage(
  url: string,
  verbose: boolean = false
): Promise<LocatieserverResponse> {
  if (verbose) {
    console.log(`   Fetching: ${url.slice(0, 80)}...`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CutiePawsPedia/1.0 (https://cutiepawspedia.com)",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `PDOK API error (${response.status}): ${errorText.slice(0, 200)}`
      );
    }

    return (await response.json()) as LocatieserverResponse;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch all addresses with pagination
 */
async function fetchAllAddresses(
  cityName: string,
  options: { verbose?: boolean; limit?: number }
): Promise<{ docs: LocatieserverDoc[]; totalFound: number }> {
  const allDocs: LocatieserverDoc[] = [];
  let start = 0;
  let totalFound = 0;
  let hasMore = true;

  const maxToFetch = options.limit || Infinity;

  while (hasMore && allDocs.length < maxToFetch) {
    const batchSize = Math.min(MAX_ROWS, maxToFetch - allDocs.length);
    const url = buildQueryUrl(cityName, start, batchSize);

    const result = await fetchPage(url, options.verbose);

    // Get total count from first response
    if (start === 0) {
      totalFound = result.response.numFound;
      if (options.verbose) {
        console.log(`   Total found: ${totalFound.toLocaleString()}`);
      }
    }

    const docs = result.response.docs;
    allDocs.push(...docs);

    if (options.verbose && docs.length > 0) {
      console.log(
        `   Fetched ${docs.length} docs (total: ${allDocs.length.toLocaleString()})`
      );
    }

    // Check if there are more pages
    if (docs.length < batchSize || allDocs.length >= totalFound) {
      hasMore = false;
    } else {
      start += docs.length;
      // Rate limiting between requests
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY));
    }
  }

  return { docs: allDocs, totalFound };
}

// =============================================================================
// DATA TRANSFORMATION
// =============================================================================

/**
 * Parse WKT POINT to coordinates
 */
function parseWktPoint(wkt: string): [number, number] | null {
  // Format: "POINT(lon lat)"
  const match = wkt.match(/POINT\(([0-9.-]+)\s+([0-9.-]+)\)/);
  if (!match) return null;
  return [parseFloat(match[1]), parseFloat(match[2])];
}

/**
 * Transform Locatieserver doc to PdokBagAddress
 */
function transformDoc(
  doc: LocatieserverDoc,
  config: NlCityConfig
): PdokBagAddress | null {
  // Parse coordinates
  const coords = parseWktPoint(doc.centroide_ll);
  if (!coords) return null;

  // Parse RD coordinates if available
  let rdCoords: [number, number] | undefined;
  if (doc.centroide_rd) {
    const parsed = parseWktPoint(doc.centroide_rd);
    if (parsed) rdCoords = parsed;
  }

  // Build the address object
  const address: PdokBagAddress = {
    identificatie: doc.nummeraanduiding_id || doc.identificatie || doc.id,
    openbareRuimteNaam: doc.straatnaam || "",
    huisnummer: doc.huisnummer || 0,
    postcode: doc.postcode || "",
    woonplaatsNaam: doc.woonplaatsnaam || config.cityName,
    gemeenteNaam: doc.gemeentenaam || "",
    provincieNaam: doc.provincienaam || config.province || "",
    centroide_ll: {
      type: "Point",
      coordinates: coords, // [lon, lat]
    },
    status: "in gebruik",
    type: "verblijfsobject",
  };

  // Add optional fields
  if (doc.huisletter) {
    address.huisletter = doc.huisletter;
  }
  if (doc.toevoeging) {
    address.huisnummertoevoeging = doc.toevoeging;
  }
  if (rdCoords) {
    address.centroide_rd = {
      type: "Point",
      coordinates: rdCoords,
    };
  }
  if (doc.oppervlakte) {
    address.oppervlakte = doc.oppervlakte;
  }
  if (doc.bouwjaar) {
    address.bouwjaar = doc.bouwjaar;
  }

  return address;
}

/**
 * Transform all docs to addresses
 */
function transformDocs(
  docs: LocatieserverDoc[],
  config: NlCityConfig
): PdokBagAddress[] {
  const addresses: PdokBagAddress[] = [];

  for (const doc of docs) {
    const address = transformDoc(doc, config);
    if (address) {
      addresses.push(address);
    }
  }

  return addresses;
}

/**
 * Filter addresses to only include valid ones
 */
function filterValidAddresses(addresses: PdokBagAddress[]): PdokBagAddress[] {
  return addresses.filter((addr) => {
    // Must have a house number
    if (!addr.huisnummer || addr.huisnummer <= 0) return false;
    // Must have a street name
    if (!addr.openbareRuimteNaam) return false;
    // Must have coordinates
    if (!addr.centroide_ll?.coordinates) return false;
    return true;
  });
}

// =============================================================================
// STATISTICS & DISPLAY
// =============================================================================

interface CollectionStats {
  totalFound: number;
  afterTransform: number;
  afterFilter: number;
  uniqueStreets: number;
  uniquePostcodes: number;
}

function computeStats(
  totalFound: number,
  transformed: PdokBagAddress[],
  filtered: PdokBagAddress[]
): CollectionStats {
  const streets = new Set(filtered.map((a) => a.openbareRuimteNaam));
  const postcodes = new Set(filtered.map((a) => a.postcode).filter(Boolean));

  return {
    totalFound,
    afterTransform: transformed.length,
    afterFilter: filtered.length,
    uniqueStreets: streets.size,
    uniquePostcodes: postcodes.size,
  };
}

function printStats(stats: CollectionStats, cityName: string): void {
  console.log(`\n📊 Collection Statistics for ${cityName}:`);
  console.log(`   Total found:       ${stats.totalFound.toLocaleString()}`);
  console.log(`   After transform:   ${stats.afterTransform.toLocaleString()}`);
  console.log(`   Valid addresses:   ${stats.afterFilter.toLocaleString()}`);
  console.log(`   Unique streets:    ${stats.uniqueStreets.toLocaleString()}`);
  console.log(`   Unique postcodes:  ${stats.uniquePostcodes.toLocaleString()}`);
}

function printSampleAddresses(addresses: PdokBagAddress[], count: number = 2): void {
  console.log(`\n📋 Sample addresses:`);
  const samples = addresses.slice(0, count);
  for (const addr of samples) {
    const letter = addr.huisletter || "";
    const addition = addr.huisnummertoevoeging
      ? `-${addr.huisnummertoevoeging}`
      : "";
    const fullNumber = `${addr.huisnummer}${letter}${addition}`;
    console.log(
      `   ${addr.openbareRuimteNaam} ${fullNumber}, ${addr.postcode} ${addr.woonplaatsNaam}`
    );
  }
}

// =============================================================================
// MAIN COLLECTION FUNCTION
// =============================================================================

interface CollectionResult {
  success: boolean;
  addressCount: number;
  filePath: string;
  stats?: CollectionStats;
  error?: string;
}

async function collectPdokData(
  config: NlCityConfig,
  options: { dryRun?: boolean; verbose?: boolean; force?: boolean; limit?: number }
): Promise<CollectionResult> {
  const { citySlug, cityName } = config;
  const filePath = getPdokPath("nl", citySlug);

  console.log(`\n🏠 Collecting PDOK BAG data for ${cityName}`);
  console.log(`   Query: woonplaatsnaam:${cityName}`);
  console.log(`   Output: ${filePath}`);

  // Check if file already exists
  if (!options.force) {
    const existingStats = await getJsonStats(filePath);
    if (existingStats) {
      const existing = await readJson<PdokRawData>(filePath);
      if (existing) {
        console.log(
          `\n⚠️  Data already exists (${existing.addresses.length.toLocaleString()} addresses, ${existingStats.modifiedAt.toISOString()})`
        );
        console.log(`   Use --force to overwrite`);
        return {
          success: true,
          addressCount: existing.addresses.length,
          filePath,
        };
      }
    }
  }

  // Build sample URL for display
  const sampleUrl = buildQueryUrl(cityName, 0, 5);

  if (options.verbose || options.dryRun) {
    console.log(`\n📝 API Request URL:\n   ${sampleUrl}\n`);
  }

  if (options.dryRun) {
    console.log("🔍 Dry run - not executing query");
    return {
      success: true,
      addressCount: 0,
      filePath,
    };
  }

  // Execute query
  console.log(`\n⏳ Querying PDOK Locatieserver...`);
  const startTime = Date.now();

  try {
    const { docs, totalFound } = await fetchAllAddresses(cityName, {
      verbose: options.verbose,
      limit: options.limit,
    });
    const queryTime = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`   Received ${docs.length.toLocaleString()} docs in ${queryTime}s`);

    if (docs.length === 0) {
      console.warn(`\n⚠️  No addresses found for ${cityName}`);
      console.warn(`   This may indicate an issue with the city name.`);
    }

    // Transform and process
    const transformed = transformDocs(docs, config);
    const filtered = filterValidAddresses(transformed);

    // Compute stats
    const stats = computeStats(totalFound, transformed, filtered);

    if (options.verbose) {
      printStats(stats, cityName);
      if (filtered.length > 0) {
        printSampleAddresses(filtered);
      }
    }

    // Build output data
    const outputData: PdokRawData = {
      metadata: {
        source: "pdok-bag",
        collectedAt: new Date().toISOString(),
        countryCode: "nl",
        citySlug,
        cityName,
        municipalCode: config.municipalCode,
        bbox: config.bbox,
        wfsVersion: "locatieserver-v3.1",
        queryType: "woonplaats",
        queryTimeSeconds: parseFloat(queryTime),
        rawFeatureCount: totalFound,
        processedAddressCount: filtered.length,
      },
      addresses: filtered,
    };

    // Save to file
    console.log(`\n💾 Saving ${filtered.length.toLocaleString()} addresses to ${filePath}`);
    await writeJson(filePath, outputData);

    console.log(`✅ Successfully collected PDOK BAG data for ${cityName}`);

    return {
      success: true,
      addressCount: filtered.length,
      filePath,
      stats,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`\n❌ Error collecting PDOK data: ${errorMessage}`);

    return {
      success: false,
      addressCount: 0,
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
  if (!args.city) {
    console.error("❌ Error: --city is required");
    console.error("   Use --list-cities to see available options");
    console.error("   Use --help for usage information");
    process.exit(1);
  }

  // Resolve city slug (handle aliases)
  const citySlug = resolveNlCitySlug(args.city);

  // Find city configuration
  const cityConfig = getNlCityConfig(citySlug);

  if (!cityConfig) {
    console.error(`❌ Error: City "${args.city}" not found in NL cities`);
    console.error("   Use --list-cities to see available options");
    process.exit(1);
  }

  // Run collection
  const result = await collectPdokData(cityConfig, {
    dryRun: args.dryRun,
    verbose: args.verbose,
    force: args.force,
    limit: args.limit,
  });

  if (!result.success) {
    process.exit(1);
  }

  // Print final summary
  console.log(`\n🎉 R2.3 Complete: ${result.addressCount.toLocaleString()} BAG addresses saved for ${cityConfig.cityName}.`);
}

// Run
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
