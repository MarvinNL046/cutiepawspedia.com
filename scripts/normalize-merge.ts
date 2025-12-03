#!/usr/bin/env npx tsx
/**
 * R3: Normalization & Merge Engine
 *
 * Combines data from 4 sources (OSM, PDOK, Bright, Jina) into unified StagedPlace objects.
 *
 * Usage:
 *   npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam
 *   npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam --verbose --dry-run
 *
 * Input files:
 *   - data/raw/osm/{country}/{city}.json
 *   - data/raw/pdok/{country}/{city}.json (NL only)
 *   - data/raw/bright/{country}/{city}.json
 *   - data/raw/jina/{country}/{city}.json
 *
 * Output:
 *   - data/staged/{country}/{city}.json
 */

import { parseArgs } from "node:util";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  type OsmRawData,
  type OsmRawPlace,
  type PdokRawData,
  type PdokBagAddress,
  type BrightRawData,
  type BrightRawPlace,
  type JinaRawData,
  type JinaEnrichedPlace,
  type StagedPlace,
  type StagedData,
  type StagedSources,
  type StagedOpeningHours,
  OSM_CATEGORY_MAPPINGS,
} from "../lib/data/types";

// =============================================================================
// CLI PARSING
// =============================================================================

const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    city: { type: "string", short: "t" },
    force: { type: "boolean", short: "f", default: false },
    verbose: { type: "boolean", short: "v", default: false },
    "dry-run": { type: "boolean", short: "d", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

function showHelp(): void {
  console.log(`
R3: Normalization & Merge Engine

Combines data from 4 sources (OSM, PDOK, Bright, Jina) into unified StagedPlace objects.

USAGE:
  npx tsx scripts/normalize-merge.ts --country=<code> --city=<slug> [options]

OPTIONS:
  -c, --country <code>   Country code (e.g., nl, be)
  -t, --city <slug>      City slug (e.g., amsterdam, brussels)
  -f, --force            Overwrite existing staged file
  -v, --verbose          Show detailed progress
  -d, --dry-run          Preview without writing files
  -h, --help             Show this help

EXAMPLES:
  npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam
  npx tsx scripts/normalize-merge.ts -c nl -t amsterdam --verbose
  npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam --dry-run

INPUT FILES:
  data/raw/osm/{country}/{city}.json    - OpenStreetMap places
  data/raw/pdok/{country}/{city}.json   - PDOK BAG addresses (NL only)
  data/raw/bright/{country}/{city}.json - Bright Data enrichment
  data/raw/jina/{country}/{city}.json   - Jina AI summaries

OUTPUT:
  data/staged/{country}/{city}.json
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
const VERBOSE = args.verbose ?? false;
const DRY_RUN = args["dry-run"] ?? false;
const FORCE = args.force ?? false;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function log(message: string): void {
  console.log(`[normalize] ${message}`);
}

function verbose(message: string): void {
  if (VERBOSE) {
    console.log(`  ${message}`);
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim hyphens
}

function generateStagedId(place: OsmRawPlace): string {
  // Format: {type}/{id} -> e.g., "node/123456"
  return `${place.type}/${place.id}`;
}

function normalizePhone(phone: string | undefined): string | null {
  if (!phone) return null;
  // Remove all non-digit characters except + at start
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.length < 6) return null;
  return cleaned;
}

function normalizeEmail(email: string | undefined): string | null {
  if (!email) return null;
  const lower = email.toLowerCase().trim();
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower)) return null;
  return lower;
}

function normalizeWebsite(url: string | undefined): string | null {
  if (!url) return null;
  let normalized = url.trim();
  if (!normalized.startsWith("http")) {
    normalized = `https://${normalized}`;
  }
  // Remove trailing slash
  normalized = normalized.replace(/\/+$/, "");
  return normalized;
}

function normalizePostalCode(code: string | undefined, country: string): string | null {
  if (!code) return null;
  // Dutch postal codes: 1234 AB
  if (country === "nl") {
    const cleaned = code.replace(/\s+/g, "").toUpperCase();
    if (/^\d{4}[A-Z]{2}$/.test(cleaned)) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
  }
  return code.trim();
}

/**
 * Calculate distance between two coordinates in meters (Haversine formula)
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Parse OSM opening_hours string to structured format
 */
function parseOpeningHours(raw: string | undefined): StagedOpeningHours | undefined {
  if (!raw) return undefined;

  // Store raw for reference
  const result: StagedOpeningHours = { raw };

  // Simple pattern matching for common formats
  // Full parsing would require a dedicated library
  const dayMap: Record<string, keyof Omit<StagedOpeningHours, "timezone" | "raw">> = {
    mo: "monday",
    tu: "tuesday",
    we: "wednesday",
    th: "thursday",
    fr: "friday",
    sa: "saturday",
    su: "sunday",
  };

  // Try to parse simple format like "Mo-Fr 09:00-17:00"
  const simpleMatch = raw.match(
    /(\w{2})(?:-(\w{2}))?\s+(\d{2}:\d{2})-(\d{2}:\d{2})/gi
  );

  if (simpleMatch) {
    for (const match of simpleMatch) {
      const parts = match.match(/(\w{2})(?:-(\w{2}))?\s+(\d{2}:\d{2})-(\d{2}:\d{2})/i);
      if (parts) {
        const startDay = parts[1].toLowerCase();
        const endDay = parts[2]?.toLowerCase() || startDay;
        const openTime = parts[3];
        const closeTime = parts[4];

        const days = Object.keys(dayMap);
        let inRange = false;
        for (const day of days) {
          if (day === startDay) inRange = true;
          if (inRange) {
            const dayKey = dayMap[day];
            if (dayKey) {
              result[dayKey] = { open: openTime, close: closeTime };
            }
          }
          if (day === endDay) inRange = false;
        }
      }
    }
  }

  return result;
}

/**
 * Parse Bright Data opening hours to staged format
 */
function parseBrightOpeningHours(
  bright: BrightRawPlace["openingHours"]
): StagedOpeningHours | undefined {
  if (!bright) return undefined;

  const result: StagedOpeningHours = {};

  const parseTime = (str: string | undefined): { open: string; close: string } | null => {
    if (!str) return null;
    const match = str.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
    if (match) {
      return { open: match[1], close: match[2] };
    }
    return null;
  };

  if (bright.monday) result.monday = parseTime(bright.monday);
  if (bright.tuesday) result.tuesday = parseTime(bright.tuesday);
  if (bright.wednesday) result.wednesday = parseTime(bright.wednesday);
  if (bright.thursday) result.thursday = parseTime(bright.thursday);
  if (bright.friday) result.friday = parseTime(bright.friday);
  if (bright.saturday) result.saturday = parseTime(bright.saturday);
  if (bright.sunday) result.sunday = parseTime(bright.sunday);
  if (bright.raw) result.raw = bright.raw;

  return Object.keys(result).length > 0 ? result : undefined;
}

// =============================================================================
// DATA LOADING
// =============================================================================

interface LoadedData {
  osm: OsmRawData | null;
  pdok: PdokRawData | null;
  bright: BrightRawData | null;
  jina: JinaRawData | null;
}

function loadJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) {
    verbose(`File not found: ${filePath}`);
    return null;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    verbose(`Failed to parse: ${filePath}`);
    return null;
  }
}

function loadAllData(): LoadedData {
  const basePath = path.join(process.cwd(), "data", "raw");

  const osmPath = path.join(basePath, "osm", COUNTRY, `${CITY}.json`);
  const pdokPath = path.join(basePath, "pdok", COUNTRY, `${CITY}.json`);
  const brightPath = path.join(basePath, "bright", COUNTRY, `${CITY}.json`);
  const jinaPath = path.join(basePath, "jina", COUNTRY, `${CITY}.json`);

  log("Loading data files...");

  const osm = loadJsonFile<OsmRawData>(osmPath);
  if (osm) verbose(`OSM: ${osm.places.length} places`);

  // PDOK only available for Netherlands
  const pdok = COUNTRY === "nl" ? loadJsonFile<PdokRawData>(pdokPath) : null;
  if (pdok) verbose(`PDOK: ${pdok.addresses.length} addresses`);

  const bright = loadJsonFile<BrightRawData>(brightPath);
  if (bright) verbose(`Bright: ${bright.places.length} places`);

  const jina = loadJsonFile<JinaRawData>(jinaPath);
  if (jina) verbose(`Jina: ${jina.summaries.length} summaries`);

  return { osm, pdok, bright, jina };
}

// =============================================================================
// MATCHING & MERGING
// =============================================================================

/**
 * Build lookup maps for efficient matching
 */
interface LookupMaps {
  brightBySourceId: Map<string, BrightRawPlace>;
  jinaBySourceId: Map<string, JinaEnrichedPlace>;
  pdokByPostcodeStreet: Map<string, PdokBagAddress[]>;
}

function buildLookupMaps(data: LoadedData): LookupMaps {
  // Bright Data by sourceId
  const brightBySourceId = new Map<string, BrightRawPlace>();
  if (data.bright) {
    for (const place of data.bright.places) {
      brightBySourceId.set(place.sourceId, place);
    }
  }

  // Jina by sourceId
  const jinaBySourceId = new Map<string, JinaEnrichedPlace>();
  if (data.jina) {
    for (const summary of data.jina.summaries) {
      jinaBySourceId.set(summary.sourceId, summary);
    }
  }

  // PDOK by postcode+street for fuzzy matching
  const pdokByPostcodeStreet = new Map<string, PdokBagAddress[]>();
  if (data.pdok) {
    for (const addr of data.pdok.addresses) {
      const key = `${addr.postcode?.replace(/\s/g, "")}-${addr.openbareRuimteNaam.toLowerCase()}`;
      const existing = pdokByPostcodeStreet.get(key) || [];
      existing.push(addr);
      pdokByPostcodeStreet.set(key, existing);
    }
  }

  return { brightBySourceId, jinaBySourceId, pdokByPostcodeStreet };
}

/**
 * Match OSM place to PDOK address
 */
function matchPdokAddress(
  osm: OsmRawPlace,
  pdokMap: Map<string, PdokBagAddress[]>,
  allPdok: PdokBagAddress[]
): PdokBagAddress | null {
  // Method 1: Match by postcode + street + housenumber
  const osmPostcode = osm.tags["addr:postcode"]?.replace(/\s/g, "");
  const osmStreet = osm.tags["addr:street"]?.toLowerCase();
  const osmHousenumber = osm.tags["addr:housenumber"];

  if (osmPostcode && osmStreet) {
    const key = `${osmPostcode}-${osmStreet}`;
    const candidates = pdokMap.get(key);
    if (candidates && osmHousenumber) {
      // Find exact housenumber match
      const match = candidates.find(
        (a) => a.huisnummer.toString() === osmHousenumber
      );
      if (match) return match;
    }
  }

  // Method 2: Match by geo distance (< 50m)
  if (osm.lat && osm.lon) {
    let closestDistance = Infinity;
    let closestMatch: PdokBagAddress | null = null;

    for (const addr of allPdok) {
      if (addr.centroide_ll?.coordinates) {
        const [lon, lat] = addr.centroide_ll.coordinates;
        const distance = haversineDistance(osm.lat, osm.lon, lat, lon);
        if (distance < 50 && distance < closestDistance) {
          closestDistance = distance;
          closestMatch = addr;
        }
      }
    }

    if (closestMatch) return closestMatch;
  }

  return null;
}

/**
 * Map OSM tags to category slugs using OSM_CATEGORY_MAPPINGS
 */
function mapCategories(osm: OsmRawPlace): string[] {
  const categories: { slug: string; priority: number }[] = [];

  for (const mapping of OSM_CATEGORY_MAPPINGS) {
    const tagValue = osm.tags[mapping.osmKey];
    if (tagValue === mapping.osmValue) {
      categories.push({ slug: mapping.categorySlug, priority: mapping.priority });
    }
  }

  // Sort by priority (highest first) and return unique slugs
  categories.sort((a, b) => b.priority - a.priority);
  return [...new Set(categories.map((c) => c.slug))];
}

/**
 * Calculate validation score for a staged place
 */
function calculateValidationScore(place: Partial<StagedPlace>): number {
  let score = 0;
  const maxScore = 100;

  // Name is essential (20 points)
  if (place.name && place.name.length > 2) score += 20;

  // Location (25 points)
  if (place.lat && place.lng) score += 15;
  if (place.address) score += 5;
  if (place.postalCode) score += 5;

  // Contact info (25 points)
  if (place.phone) score += 10;
  if (place.email) score += 5;
  if (place.website) score += 10;

  // Content (20 points)
  if (place.description && place.description.length > 20) score += 10;
  if (place.categorySlugs && place.categorySlugs.length > 0) score += 5;
  if (place.tags && place.tags.length > 0) score += 5;

  // Data sources (10 points)
  const sourceCount = Object.keys(place.sources || {}).length;
  score += Math.min(sourceCount * 2.5, 10);

  return Math.round((score / maxScore) * 100);
}

/**
 * Merge all data sources into a StagedPlace
 */
function mergePlace(
  osm: OsmRawPlace,
  bright: BrightRawPlace | null,
  jina: JinaEnrichedPlace | null,
  pdok: PdokBagAddress | null,
  cityName: string
): StagedPlace {
  const stagedId = generateStagedId(osm);
  const name =
    bright?.businessName || osm.tags.name || osm.tags.brand || "Unknown";
  const slug = generateSlug(name);
  const now = new Date().toISOString();

  // Build sources tracking
  const sources: StagedSources = {
    osm: {
      id: osm.id,
      fetchedAt: now, // We don't have exact fetch time, use now
    },
  };

  if (pdok) {
    sources.pdok = {
      identificatie: pdok.identificatie,
      fetchedAt: now,
    };
  }

  if (bright) {
    sources.bright = {
      sourceUrl: bright.sourceUrl,
      fetchedAt: now,
    };
  }

  if (jina) {
    sources.jina = {
      url: jina.website,
      processedAt: jina.jina.meta.processedAt,
      confidence: jina.jina.meta.confidence,
    };
  }

  // Build address
  let address: string | null = null;
  if (bright?.address) {
    address = bright.address;
  } else if (pdok) {
    const parts = [
      pdok.openbareRuimteNaam,
      pdok.huisnummer.toString() + (pdok.huisletter || "") + (pdok.huisnummertoevoeging || ""),
    ];
    address = parts.filter(Boolean).join(" ");
  } else if (osm.tags["addr:street"]) {
    const parts = [
      osm.tags["addr:street"],
      osm.tags["addr:housenumber"],
    ];
    address = parts.filter(Boolean).join(" ");
  }

  // Build postal code
  const postalCode =
    normalizePostalCode(bright?.postalCode, COUNTRY) ||
    normalizePostalCode(pdok?.postcode, COUNTRY) ||
    normalizePostalCode(osm.tags["addr:postcode"], COUNTRY);

  // Build description
  let description: string | null = null;
  if (jina?.jina.summary && jina.jina.summary.length > 50) {
    // Clean up Jina summary (often has markdown artifacts and URL dumps)
    let cleaned = jina.jina.summary
      // Remove blob: URLs (common Jina artifact)
      .replace(/blob:https?:\/\/[^\s)]+/gi, "")
      // Remove URLs in parentheses like (https://example.com/...)
      .replace(/\(https?:\/\/[^\s)]+\)/gi, "")
      // Remove standalone URLs
      .replace(/https?:\/\/[^\s)]+/gi, "")
      // Remove markdown image syntax
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Remove markdown link syntax but keep text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove asterisks (bold/italic markers)
      .replace(/\*+/g, "")
      // Remove heading markers
      .replace(/#{1,6}\s*/g, "")
      // Remove multiple dashes/equals (horizontal rules)
      .replace(/[-=]{3,}/g, "")
      // Remove leftover parentheses with just spaces
      .replace(/\(\s*\)/g, "")
      // Collapse multiple whitespace to single space
      .replace(/\s+/g, " ")
      .trim();

    // Only use if we have meaningful content after cleaning (not just leftover fragments)
    if (cleaned.length > 50 && !/^[\s\W]*$/.test(cleaned)) {
      description = cleaned.slice(0, 500);
    }
  }

  // Fallback to Bright Data descriptions
  if (!description && bright?.about) {
    description = bright.about;
  }
  if (!description && bright?.businessDescription) {
    description = bright.businessDescription;
  }
  if (!description && osm.tags.description) {
    description = osm.tags.description;
  }

  // Build categories
  const categorySlugs = mapCategories(osm);

  // Build tags (combine from multiple sources)
  const tagSet = new Set<string>();
  if (jina?.jina.tags) {
    jina.jina.tags.forEach((t) => tagSet.add(t.toLowerCase()));
  }
  if (bright?.categories) {
    bright.categories.forEach((c) => tagSet.add(c.toLowerCase()));
  }

  // Build pet types
  const petTypes: string[] = [];
  if (jina?.jina.extracted?.petTypes) {
    petTypes.push(...jina.jina.extracted.petTypes);
  }

  // Build services
  const services: string[] = [];
  if (bright?.services) {
    services.push(...bright.services);
  }
  if (jina?.jina.extracted?.services) {
    jina.jina.extracted.services.forEach((s) => {
      if (!services.includes(s)) services.push(s);
    });
  }

  // Build opening hours
  const openingHours =
    parseBrightOpeningHours(bright?.openingHours) ||
    parseOpeningHours(osm.tags.opening_hours);

  // Build social links
  const socialLinks: Record<string, string> = {};
  if (bright?.socialLinks) {
    if (bright.socialLinks.facebook) socialLinks.facebook = bright.socialLinks.facebook;
    if (bright.socialLinks.instagram) socialLinks.instagram = bright.socialLinks.instagram;
    if (bright.socialLinks.twitter) socialLinks.twitter = bright.socialLinks.twitter;
    if (bright.socialLinks.linkedin) socialLinks.linkedin = bright.socialLinks.linkedin;
    if (bright.socialLinks.youtube) socialLinks.youtube = bright.socialLinks.youtube;
    if (bright.socialLinks.tiktok) socialLinks.tiktok = bright.socialLinks.tiktok;
  }

  // Build images
  const images: string[] = [];
  if (bright?.images) {
    // Filter out relative paths and placeholder images
    bright.images.forEach((img) => {
      if (img.startsWith("http") && !img.includes("placeholder")) {
        images.push(img);
      }
    });
  }

  // Create staged place
  const staged: StagedPlace = {
    stagedId,
    slug,
    name,
    countryCode: COUNTRY.toUpperCase(),
    citySlug: CITY,
    cityName,
    address,
    postalCode,
    lat: bright?.latitude ?? osm.lat ?? null,
    lng: bright?.longitude ?? osm.lon ?? null,
    phone:
      normalizePhone(bright?.phone) ||
      normalizePhone(osm.tags.phone || osm.tags["contact:phone"]),
    email:
      normalizeEmail(bright?.email) ||
      normalizeEmail(osm.tags.email || osm.tags["contact:email"]),
    website:
      normalizeWebsite(bright?.website) ||
      normalizeWebsite(osm.tags.website || osm.tags["contact:website"]),
    description,
    categorySlugs,
    tags: tagSet.size > 0 ? [...tagSet] : undefined,
    avgRating: bright?.rating ?? null,
    reviewCount: bright?.reviewCount ?? null,
    openingHours,
    images: images.length > 0 ? images : undefined,
    services: services.length > 0 ? services : undefined,
    socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
    petTypes: petTypes.length > 0 ? petTypes : undefined,
    sources,
    validation: {
      isValid: true,
      score: 0, // Will be calculated below
    },
    stagedAt: now,
    updatedAt: now,
  };

  // Calculate validation score
  staged.validation.score = calculateValidationScore(staged);
  staged.validation.isValid = staged.validation.score >= 30; // Minimum threshold

  // Add warnings
  const warnings: string[] = [];
  if (!staged.phone && !staged.email && !staged.website) {
    warnings.push("No contact information");
  }
  if (!staged.description) {
    warnings.push("No description");
  }
  if (staged.categorySlugs.length === 0) {
    warnings.push("No category mapping");
  }
  if (warnings.length > 0) {
    staged.validation.warnings = warnings;
  }

  return staged;
}

// =============================================================================
// DEDUPLICATION
// =============================================================================

interface DedupeKey {
  website: string | null;
  phone: string | null;
  normalizedName: string;
}

function getDedupeKey(place: StagedPlace): DedupeKey {
  return {
    website: place.website,
    phone: place.phone,
    normalizedName: place.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
  };
}

/**
 * Check if two places are duplicates
 */
function areDuplicates(a: DedupeKey, b: DedupeKey): boolean {
  // Same website
  if (a.website && b.website && a.website === b.website) return true;

  // Same phone
  if (a.phone && b.phone && a.phone === b.phone) return true;

  // Very similar name (Levenshtein distance < 3 or subset)
  if (a.normalizedName && b.normalizedName) {
    if (a.normalizedName === b.normalizedName) return true;
    if (a.normalizedName.includes(b.normalizedName) && b.normalizedName.length > 5)
      return true;
    if (b.normalizedName.includes(a.normalizedName) && a.normalizedName.length > 5)
      return true;
  }

  return false;
}

/**
 * Deduplicate places, keeping the one with higher validation score
 */
function deduplicatePlaces(places: StagedPlace[]): StagedPlace[] {
  const seen: { key: DedupeKey; place: StagedPlace }[] = [];
  const result: StagedPlace[] = [];

  for (const place of places) {
    const key = getDedupeKey(place);
    let isDuplicate = false;

    for (const existing of seen) {
      if (areDuplicates(key, existing.key)) {
        isDuplicate = true;
        // Keep the one with higher score
        if (place.validation.score > existing.place.validation.score) {
          // Replace existing
          const idx = result.indexOf(existing.place);
          if (idx >= 0) {
            result[idx] = place;
            existing.place = place;
            existing.key = key;
          }
        }
        break;
      }
    }

    if (!isDuplicate) {
      seen.push({ key, place });
      result.push(place);
    }
  }

  return result;
}

// =============================================================================
// MAIN PROCESSING
// =============================================================================

async function main(): Promise<void> {
  const startTime = Date.now();

  log(`Starting normalization for ${COUNTRY}/${CITY}`);
  if (DRY_RUN) log("DRY RUN - no files will be written");

  // Check output path
  const outputDir = path.join(process.cwd(), "data", "staged", COUNTRY);
  const outputPath = path.join(outputDir, `${CITY}.json`);

  if (fs.existsSync(outputPath) && !FORCE && !DRY_RUN) {
    console.error(`Output file already exists: ${outputPath}`);
    console.error("Use --force to overwrite");
    process.exit(1);
  }

  // Load all data
  const data = loadAllData();

  if (!data.osm) {
    console.error(`OSM data not found for ${COUNTRY}/${CITY}`);
    console.error("Run collect:osm first");
    process.exit(1);
  }

  const cityName = data.osm.metadata.cityName;
  log(`Processing ${data.osm.places.length} OSM places for ${cityName}`);

  // Build lookup maps
  const maps = buildLookupMaps(data);
  verbose(`Bright lookups: ${maps.brightBySourceId.size}`);
  verbose(`Jina lookups: ${maps.jinaBySourceId.size}`);
  verbose(`PDOK lookups: ${maps.pdokByPostcodeStreet.size}`);

  // Process each OSM place
  const stagedPlaces: StagedPlace[] = [];
  let matchStats = {
    bright: 0,
    jina: 0,
    pdok: 0,
  };

  for (const osmPlace of data.osm.places) {
    const sourceId = generateStagedId(osmPlace);

    // Look up enrichment data
    const bright = maps.brightBySourceId.get(sourceId) || null;
    const jina = maps.jinaBySourceId.get(sourceId) || null;
    const pdok = data.pdok
      ? matchPdokAddress(osmPlace, maps.pdokByPostcodeStreet, data.pdok.addresses)
      : null;

    if (bright) matchStats.bright++;
    if (jina) matchStats.jina++;
    if (pdok) matchStats.pdok++;

    // Merge into staged place
    const staged = mergePlace(osmPlace, bright, jina, pdok, cityName);
    stagedPlaces.push(staged);

    if (VERBOSE) {
      const sources = [
        "OSM",
        bright ? "Bright" : null,
        jina ? "Jina" : null,
        pdok ? "PDOK" : null,
      ]
        .filter(Boolean)
        .join("+");
      verbose(`${staged.name}: ${sources} (score: ${staged.validation.score})`);
    }
  }

  log(`Match statistics:`);
  log(`  Bright Data: ${matchStats.bright}/${data.osm.places.length}`);
  log(`  Jina AI: ${matchStats.jina}/${data.osm.places.length}`);
  if (COUNTRY === "nl") {
    log(`  PDOK: ${matchStats.pdok}/${data.osm.places.length}`);
  }

  // Deduplicate
  const beforeDedupe = stagedPlaces.length;
  const dedupedPlaces = deduplicatePlaces(stagedPlaces);
  const removedCount = beforeDedupe - dedupedPlaces.length;

  if (removedCount > 0) {
    log(`Deduplication removed ${removedCount} duplicates`);
  }

  // Calculate statistics
  const validPlaces = dedupedPlaces.filter((p) => p.validation.isValid);
  const avgScore =
    dedupedPlaces.reduce((sum, p) => sum + p.validation.score, 0) /
    dedupedPlaces.length;

  log(`Final: ${dedupedPlaces.length} places (${validPlaces.length} valid)`);
  log(`Average quality score: ${avgScore.toFixed(1)}/100`);

  // Build output
  const output: StagedData = {
    places: dedupedPlaces.sort((a, b) => b.validation.score - a.validation.score),
    meta: {
      countryCode: COUNTRY.toUpperCase(),
      citySlug: CITY,
      stagedAt: new Date().toISOString(),
      totalPlaces: dedupedPlaces.length,
      validPlaces: validPlaces.length,
      sources: {
        osm: data.osm.places.length,
        pdok: data.pdok?.addresses.length ?? 0,
        bright: data.bright?.places.length ?? 0,
        jina: data.jina?.summaries.length ?? 0,
      },
    },
  };

  // Write output
  if (!DRY_RUN) {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    log(`Wrote: ${outputPath}`);
  } else {
    log(`Would write: ${outputPath}`);
    // Show sample output
    console.log("\nSample output (first place):");
    console.log(JSON.stringify(dedupedPlaces[0], null, 2));
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  log(`Completed in ${elapsed}s`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
