/**
 * Data Paths Helper
 *
 * Generates consistent file paths for all data pipeline stages.
 * All paths are relative to the project root /data directory.
 */

import * as path from "path";

/** Base data directory (relative to project root) */
export const DATA_DIR = path.join(process.cwd(), "data");

/** Raw data subdirectories by source */
export const RAW_DIRS = {
  osm: path.join(DATA_DIR, "raw", "osm"),
  pdok: path.join(DATA_DIR, "raw", "pdok"),
  bright: path.join(DATA_DIR, "raw", "bright"),
  jina: path.join(DATA_DIR, "raw", "jina"),
} as const;

/** Staged data directory */
export const STAGED_DIR = path.join(DATA_DIR, "staged");

/** Processed/imported data directory (for tracking) */
export const PROCESSED_DIR = path.join(DATA_DIR, "processed");

// =============================================================================
// PATH GENERATORS
// =============================================================================

/**
 * Get the file path for OSM raw data
 * @param countryCode - ISO country code (e.g., "nl", "be")
 * @param citySlug - URL-safe city slug (e.g., "amsterdam", "rotterdam")
 * @returns Full file path: data/raw/osm/{country}/{city}.json
 */
export function getOsmPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(RAW_DIRS.osm, country, `${city}.json`);
}

/**
 * Get the file path for PDOK BAG raw data
 * @param countryCode - ISO country code (should be "nl" for PDOK)
 * @param citySlug - URL-safe city slug
 * @returns Full file path: data/raw/pdok/{country}/{city}.json
 */
export function getPdokPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(RAW_DIRS.pdok, country, `${city}.json`);
}

/**
 * Get the file path for Bright Data scraped data
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Full file path: data/raw/bright/{country}/{city}.json
 */
export function getBrightPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(RAW_DIRS.bright, country, `${city}.json`);
}

/**
 * Get the file path for Jina AI summaries
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Full file path: data/raw/jina/{country}/{city}.json
 */
export function getJinaPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(RAW_DIRS.jina, country, `${city}.json`);
}

/**
 * Get the file path for staged (merged) data
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Full file path: data/staged/{country}/{city}.json
 */
export function getStagedPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(STAGED_DIR, country, `${city}.json`);
}

/**
 * Get the file path for processed/imported tracking data
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Full file path: data/processed/{country}/{city}.json
 */
export function getProcessedPath(countryCode: string, citySlug: string): string {
  const country = countryCode.toLowerCase();
  const city = citySlug.toLowerCase();
  return path.join(PROCESSED_DIR, country, `${city}.json`);
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all raw data paths for a city
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Object with all raw data paths
 */
export function getAllRawPaths(
  countryCode: string,
  citySlug: string
): {
  osm: string;
  pdok: string;
  bright: string;
  jina: string;
} {
  return {
    osm: getOsmPath(countryCode, citySlug),
    pdok: getPdokPath(countryCode, citySlug),
    bright: getBrightPath(countryCode, citySlug),
    jina: getJinaPath(countryCode, citySlug),
  };
}

/**
 * Get all paths for a city (raw + staged + processed)
 * @param countryCode - ISO country code
 * @param citySlug - URL-safe city slug
 * @returns Object with all data paths
 */
export function getAllPaths(
  countryCode: string,
  citySlug: string
): {
  raw: {
    osm: string;
    pdok: string;
    bright: string;
    jina: string;
  };
  staged: string;
  processed: string;
} {
  return {
    raw: getAllRawPaths(countryCode, citySlug),
    staged: getStagedPath(countryCode, citySlug),
    processed: getProcessedPath(countryCode, citySlug),
  };
}

/**
 * Extract country code and city slug from a file path
 * @param filePath - Full file path
 * @returns Object with countryCode and citySlug, or null if invalid
 */
export function parsePathInfo(
  filePath: string
): { countryCode: string; citySlug: string } | null {
  const normalized = path.normalize(filePath);
  const parts = normalized.split(path.sep);

  // Expected format: .../data/{type}/{country}/{city}.json
  const jsonFile = parts[parts.length - 1];
  const country = parts[parts.length - 2];

  if (!jsonFile?.endsWith(".json") || !country) {
    return null;
  }

  return {
    countryCode: country.toUpperCase(),
    citySlug: jsonFile.replace(".json", ""),
  };
}

/**
 * List all cities with data for a given country and source
 * @param countryCode - ISO country code
 * @param source - Data source type
 * @returns Array of city slugs
 */
export async function listCitiesWithData(
  countryCode: string,
  source: "osm" | "pdok" | "bright" | "jina" | "staged"
): Promise<string[]> {
  const fs = await import("fs/promises");
  const country = countryCode.toLowerCase();

  let baseDir: string;
  if (source === "staged") {
    baseDir = path.join(STAGED_DIR, country);
  } else {
    baseDir = path.join(RAW_DIRS[source], country);
  }

  try {
    const files = await fs.readdir(baseDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
