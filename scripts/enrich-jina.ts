#!/usr/bin/env npx tsx
/**
 * Jina AI Website Summarizer & Enrichment
 *
 * Takes BrightRawPlace[] as input and generates AI-powered summaries
 * with business descriptions, highlights, tags, and pet types.
 *
 * Usage:
 *   npx tsx scripts/enrich-jina.ts --country=nl --city=amsterdam
 *   npx tsx scripts/enrich-jina.ts --country=nl --city=amsterdam --limit=10 --verbose
 *
 * Features:
 *   - AI-generated business summaries (80-120 words)
 *   - Key highlights extraction (3-5 bullet points)
 *   - Auto-tagging for SEO
 *   - Pet type detection
 *   - Service extraction
 *   - Language detection
 */

import { parseArgs } from "util";
import { getCity, type CityConfig } from "./config/cities";
import { getBrightPath, getJinaPath } from "../lib/data/paths";
import { readJson, writeJson, getJsonStats } from "../lib/data/json-file";
import type {
  BrightRawData,
  BrightRawPlace,
  JinaSummary,
  JinaRawData,
  JinaEnrichedPlace,
  JinaExtracted,
} from "../lib/data/types";

// =============================================================================
// CONFIGURATION
// =============================================================================

/** Jina AI Reader API URL (r.jina.ai for reading & summarizing) */
const JINA_API_URL = "https://r.jina.ai";

/** API key from environment */
const JINA_API_KEY = process.env.JINA_API_KEY || "";

/** Max concurrent requests (Jina calls are heavier) */
const MAX_CONCURRENCY = 2;

/** Delay between batches (ms) */
const BATCH_DELAY = 1000;

/** Request timeout (ms) */
const REQUEST_TIMEOUT = 30000;

/** Max retries for errors */
const MAX_RETRIES = 2;

/** Base retry delay (ms) - exponential backoff */
const RETRY_DELAY = 2000;

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  country?: string;
  city?: string;
  limit?: number;
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
        limit: { type: "string" },
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
      limit: values.limit ? parseInt(values.limit, 10) : undefined,
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
Jina AI Website Summarizer for CutiePawsPedia

Enriches Bright Data places with AI-generated summaries, highlights, and tags.

Usage:
  npx tsx scripts/enrich-jina.ts --country=<code> --city=<slug>
  npx tsx scripts/enrich-jina.ts --help

Options:
  -c, --country <code>   ISO country code (e.g., nl, be, de)
  --city <slug>          City slug (e.g., amsterdam, rotterdam)
  --limit <n>            Maximum number of places to process
  -d, --dry-run          Show plan without calling Jina API
  -v, --verbose          Verbose output
  -f, --force            Overwrite existing data
  -h, --help             Show this help

Examples:
  npx tsx scripts/enrich-jina.ts --country=nl --city=amsterdam
  npx tsx scripts/enrich-jina.ts -c nl --city=amsterdam --limit=5 --verbose
  npx tsx scripts/enrich-jina.ts --country=nl --city=rotterdam --force

Environment Variables:
  JINA_API_KEY           Jina AI API key (required)
`);
}

// =============================================================================
// PROMISE POOL (Concurrency Control)
// =============================================================================

async function promisePool<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
  delayMs: number = 0
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];
      results[currentIndex] = await fn(item, currentIndex);

      // Add delay between requests
      if (delayMs > 0 && index < items.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // Start workers
  const workers = Array(Math.min(concurrency, items.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

// =============================================================================
// JINA AI API CLIENT
// =============================================================================

/** Jina API response structure */
interface JinaApiResponse {
  code?: number;
  status?: number;
  data?: {
    title?: string;
    description?: string;
    url?: string;
    content?: string;
  };
  // Direct response format
  title?: string;
  content?: string;
  url?: string;
}

/**
 * The prompt to send to Jina AI for pet business summarization
 */
const JINA_PROMPT = `Please read and summarize this website for a pet-related local business.
Return a JSON object with these exact fields:

{
  "summary": "80-120 word neutral, friendly business description focused on services and why a pet owner would choose them",
  "highlights": ["3-5 short bullet points (max 80 chars each) with key selling points"],
  "tags": ["5-10 lowercase tags with dashes, e.g. pet-grooming, dog-care"],
  "petTypes": ["array of pet types mentioned, e.g. dogs, cats, rabbits, birds"],
  "services": ["array of services offered, e.g. vaccinations, grooming, boarding"],
  "language": "detected language code, e.g. nl, en, de"
}

Only return valid JSON, no markdown or explanation.`;

/**
 * Parse Jina AI response and extract structured data
 */
function parseJinaResponse(
  url: string,
  response: JinaApiResponse
): JinaSummary | null {
  const content = response.data?.content || response.content || "";
  const title = response.data?.title || response.title || "";

  if (!content) {
    return null;
  }

  // Try to extract JSON from the content
  let parsed: {
    summary?: string;
    highlights?: string[];
    tags?: string[];
    petTypes?: string[];
    services?: string[];
    language?: string;
  } = {};

  try {
    // Look for JSON in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    }
  } catch {
    // If JSON parsing fails, try to extract summary from content
    parsed = {
      summary: content.slice(0, 500).trim(),
    };
  }

  // Build JinaSummary
  const summary: JinaSummary = {
    url,
    title: title || "Unknown",
    summary: parsed.summary || content.slice(0, 300).trim(),
    highlights: parsed.highlights?.slice(0, 5),
    tags: parsed.tags?.slice(0, 10)?.map((t) => t.toLowerCase().replace(/\s+/g, "-")),
    language: parsed.language,
    extracted: {
      services: parsed.services,
      petTypes: parsed.petTypes,
    },
    meta: {
      processedAt: new Date().toISOString(),
      model: "jina-reader",
      confidence: parsed.summary ? 0.85 : 0.5,
    },
  };

  return summary;
}

/**
 * Fetch summary for a URL using Jina AI Reader
 */
async function fetchJinaSummary(
  url: string,
  retryCount: number = 0
): Promise<JinaSummary | null> {
  if (!JINA_API_KEY) {
    console.error("   ❌ JINA_API_KEY not set");
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Use Jina Reader API with custom prompt
    const response = await fetch(`${JINA_API_URL}/${url}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JINA_API_KEY}`,
        "Accept": "application/json",
        "X-Return-Format": "text",
        "X-With-Generated-Alt": "true",
        // Custom prompt for pet business extraction
        "X-Jina-Prompt": JINA_PROMPT,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      // Rate limited - exponential backoff
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJinaSummary(url, retryCount + 1);
    }

    if (response.status >= 500 && retryCount < MAX_RETRIES) {
      // Server error - retry with backoff
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJinaSummary(url, retryCount + 1);
    }

    if (!response.ok) {
      return null;
    }

    // Try JSON first, then text
    let data: JinaApiResponse;
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { content: text, url };
    }

    return parseJinaResponse(url, data);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJinaSummary(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Alternative: Use Jina AI with explicit prompting via POST
 */
async function fetchJinaSummaryWithPrompt(
  url: string,
  retryCount: number = 0
): Promise<JinaSummary | null> {
  if (!JINA_API_KEY) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // First, fetch the page content
    const readResponse = await fetch(`${JINA_API_URL}/${url}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JINA_API_KEY}`,
        "Accept": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (readResponse.status === 429 && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJinaSummaryWithPrompt(url, retryCount + 1);
    }

    if (!readResponse.ok) {
      return null;
    }

    const data = await readResponse.json();
    const pageContent = data.data?.content || data.content || "";
    const pageTitle = data.data?.title || data.title || "";

    if (!pageContent) {
      return null;
    }

    // Create summary from page content
    // For now, extract what we can from the content
    const summary = createSummaryFromContent(url, pageTitle, pageContent);
    return summary;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJinaSummaryWithPrompt(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Create a JinaSummary from page content (fallback when JSON extraction fails)
 */
function createSummaryFromContent(
  url: string,
  title: string,
  content: string
): JinaSummary {
  // Extract first 500 chars as summary
  const cleanContent = content
    .replace(/\s+/g, " ")
    .replace(/\[.*?\]/g, "")
    .trim();

  const summary = cleanContent.slice(0, 400).trim();

  // Extract potential tags from content
  const tagPatterns = [
    /\b(hond|honden|dog|dogs)\b/gi,
    /\b(kat|katten|cat|cats)\b/gi,
    /\b(huisdier|huisdieren|pet|pets)\b/gi,
    /\b(dierenarts|veterinarian|vet)\b/gi,
    /\b(trimmen|grooming)\b/gi,
    /\b(pension|boarding)\b/gi,
    /\b(training)\b/gi,
    /\b(voeding|food)\b/gi,
  ];

  const tags: string[] = [];
  const petTypes: string[] = [];
  const services: string[] = [];

  // Detect pet types
  if (/\b(hond|honden|dog|dogs)\b/i.test(content)) petTypes.push("dogs");
  if (/\b(kat|katten|cat|cats)\b/i.test(content)) petTypes.push("cats");
  if (/\b(konijn|rabbit)\b/i.test(content)) petTypes.push("rabbits");
  if (/\b(vogel|bird)\b/i.test(content)) petTypes.push("birds");
  if (/\b(vis|fish)\b/i.test(content)) petTypes.push("fish");
  if (/\b(knaagdier|rodent|hamster)\b/i.test(content)) petTypes.push("small-pets");

  // Detect services
  if (/\b(vaccin|inenting)\b/i.test(content)) services.push("vaccinations");
  if (/\b(trimmen|grooming|knippen)\b/i.test(content)) services.push("grooming");
  if (/\b(pension|boarding|opvang)\b/i.test(content)) services.push("boarding");
  if (/\b(training|cursus|puppyschool)\b/i.test(content)) services.push("training");
  if (/\b(voeding|voer|food)\b/i.test(content)) services.push("pet-food");
  if (/\b(speelgoed|toy)\b/i.test(content)) services.push("accessories");
  if (/\b(consult|behandeling|operatie)\b/i.test(content)) services.push("veterinary-care");

  // Generate tags
  if (petTypes.includes("dogs")) tags.push("dogs", "dog-care");
  if (petTypes.includes("cats")) tags.push("cats", "cat-care");
  if (services.includes("grooming")) tags.push("pet-grooming");
  if (services.includes("veterinary-care")) tags.push("veterinary", "animal-hospital");
  if (services.includes("boarding")) tags.push("pet-boarding", "pet-hotel");
  if (services.includes("training")) tags.push("dog-training");
  if (services.includes("pet-food")) tags.push("pet-supplies");

  // Detect language
  let language = "en";
  if (/\b(de|het|een|en|van|voor|met)\b/i.test(content)) language = "nl";
  if (/\b(der|die|das|und|für|mit)\b/i.test(content)) language = "de";
  if (/\b(le|la|les|un|une|et|pour)\b/i.test(content)) language = "fr";

  // Create highlights from content
  const highlights: string[] = [];
  if (petTypes.length > 0) {
    highlights.push(`Services for ${petTypes.join(", ")}`);
  }
  if (services.length > 0) {
    highlights.push(`Offers: ${services.slice(0, 3).join(", ")}`);
  }

  return {
    url,
    title: title || "Pet Business",
    summary,
    highlights: highlights.length > 0 ? highlights : undefined,
    tags: tags.length > 0 ? [...new Set(tags)].slice(0, 10) : undefined,
    language,
    extracted: {
      petTypes: petTypes.length > 0 ? petTypes : undefined,
      services: services.length > 0 ? services : undefined,
    },
    meta: {
      processedAt: new Date().toISOString(),
      model: "jina-reader-fallback",
      confidence: 0.6,
    },
  };
}

// =============================================================================
// MAIN ENRICHMENT FUNCTION
// =============================================================================

interface EnrichmentResult {
  success: boolean;
  place?: JinaEnrichedPlace;
  error?: string;
  skipped?: boolean;
}

/**
 * Enrich a single Bright place with Jina AI summary
 */
async function enrichPlace(
  place: BrightRawPlace,
  verbose: boolean
): Promise<EnrichmentResult> {
  const website = place.canonicalUrl || place.website;

  if (!website) {
    return { success: false, skipped: true, error: "No website" };
  }

  if (verbose) {
    console.log(`   🤖 Summarizing: ${website}`);
  }

  // Try primary method first
  let summary = await fetchJinaSummary(website);

  // Fallback to prompt-based method
  if (!summary) {
    summary = await fetchJinaSummaryWithPrompt(website);
  }

  if (!summary) {
    return { success: false, error: "Jina API failed" };
  }

  const enriched: JinaEnrichedPlace = {
    sourceId: place.sourceId,
    website,
    jina: summary,
  };

  return { success: true, place: enriched };
}

// =============================================================================
// MAIN COLLECTION FUNCTION
// =============================================================================

interface CollectionResult {
  success: boolean;
  totalInputPlaces: number;
  processed: number;
  successful: number;
  failed: number;
  skipped: number;
  filePath: string;
  error?: string;
}

async function enrichWithJina(
  cityConfig: CityConfig,
  options: {
    limit?: number;
    dryRun?: boolean;
    verbose?: boolean;
    force?: boolean;
  }
): Promise<CollectionResult> {
  const { countryCode, slug: citySlug, name: cityName } = cityConfig;
  const brightPath = getBrightPath(countryCode, citySlug);
  const jinaPath = getJinaPath(countryCode, citySlug);

  console.log(`\n🤖 Enriching places with Jina AI for ${cityName} (${countryCode.toUpperCase()})`);
  console.log(`   Bright source: ${brightPath}`);
  console.log(`   Output: ${jinaPath}`);
  console.log(`   API Key: ${JINA_API_KEY ? "✅ Configured" : "❌ Not set"}`);

  if (!JINA_API_KEY) {
    console.error("\n❌ JINA_API_KEY environment variable is required");
    console.error("   Get your API key from https://jina.ai");
    return {
      success: false,
      totalInputPlaces: 0,
      processed: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      filePath: jinaPath,
      error: "JINA_API_KEY not set",
    };
  }

  // Check if output already exists
  if (!options.force) {
    const existingStats = await getJsonStats(jinaPath);
    if (existingStats) {
      const existing = await readJson<JinaRawData>(jinaPath);
      if (existing) {
        console.log(
          `\n⚠️  Data already exists (${existing.summaries.length} summaries, ${existingStats.modifiedAt.toISOString()})`
        );
        console.log(`   Use --force to overwrite`);
        return {
          success: true,
          totalInputPlaces: existing.metadata.totalInputPlaces,
          processed: existing.metadata.processed,
          successful: existing.metadata.successful,
          failed: existing.metadata.failed,
          skipped: 0,
          filePath: jinaPath,
        };
      }
    }
  }

  // Load Bright Data
  const brightData = await readJson<BrightRawData>(brightPath);
  if (!brightData || !brightData.places) {
    console.error(`\n❌ No Bright Data found at ${brightPath}`);
    console.error(`   Run the Bright Data collector first:`);
    console.error(`   npm run collect:bright -- --country=${countryCode} --city=${citySlug}`);
    return {
      success: false,
      totalInputPlaces: 0,
      processed: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      filePath: jinaPath,
      error: "No Bright Data found",
    };
  }

  console.log(`\n📋 Loaded ${brightData.places.length} Bright places for ${cityName}`);

  // Filter places with websites
  let placesToProcess = brightData.places.filter(
    (p) => p.website || p.canonicalUrl
  );

  console.log(`   Places with website: ${placesToProcess.length}`);

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    placesToProcess = placesToProcess.slice(0, options.limit);
    console.log(`   Processing (limited): ${placesToProcess.length}`);
  }

  if (options.dryRun) {
    console.log("\n🔍 Dry run - showing plan:");
    for (const place of placesToProcess.slice(0, 10)) {
      const url = place.canonicalUrl || place.website || "(no url)";
      console.log(`   - ${place.businessName}: ${url}`);
    }
    if (placesToProcess.length > 10) {
      console.log(`   ... and ${placesToProcess.length - 10} more`);
    }
    return {
      success: true,
      totalInputPlaces: brightData.places.length,
      processed: placesToProcess.length,
      successful: 0,
      failed: 0,
      skipped: 0,
      filePath: jinaPath,
    };
  }

  // Process places with concurrency control
  console.log(`\n⏳ Summarizing (concurrency: ${MAX_CONCURRENCY}, delay: ${BATCH_DELAY}ms)...`);
  const startTime = Date.now();

  let successful = 0;
  let failed = 0;
  let skipped = 0;
  const enrichedPlaces: JinaEnrichedPlace[] = [];

  await promisePool(
    placesToProcess,
    async (place, index) => {
      if (options.verbose) {
        console.log(`\n[${index + 1}/${placesToProcess.length}] ${place.businessName}`);
      }

      const result = await enrichPlace(place, options.verbose || false);

      if (result.success && result.place) {
        successful++;
        enrichedPlaces.push(result.place);
        if (options.verbose) {
          console.log(`   ✅ Success: ${result.place.jina.summary?.slice(0, 60)}...`);
        }
      } else if (result.skipped) {
        skipped++;
        if (options.verbose) {
          console.log(`   ⏭️  Skipped: ${result.error}`);
        }
      } else {
        failed++;
        if (options.verbose) {
          console.log(`   ❌ Failed: ${result.error}`);
        }
      }

      // Progress indicator for non-verbose mode
      if (!options.verbose && (index + 1) % 3 === 0) {
        process.stdout.write(`   Processed ${index + 1}/${placesToProcess.length}...\r`);
      }

      return result;
    },
    MAX_CONCURRENCY,
    BATCH_DELAY
  );

  const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n   Completed in ${processingTime}s`);

  // Build output
  const outputData: JinaRawData = {
    metadata: {
      source: "jina-ai",
      collectedAt: new Date().toISOString(),
      countryCode: countryCode.toUpperCase(),
      citySlug,
      cityName,
      totalInputPlaces: brightData.places.length,
      processed: placesToProcess.length,
      successful,
      failed,
      processingTimeSeconds: parseFloat(processingTime),
    },
    summaries: enrichedPlaces,
  };

  // Save output
  console.log(`\n💾 Saving ${enrichedPlaces.length} summaries to ${jinaPath}`);
  await writeJson(jinaPath, outputData);

  // Print summary
  console.log(`\n📊 Summary:`);
  console.log(`   Total input places: ${brightData.places.length}`);
  console.log(`   Processed:          ${placesToProcess.length}`);
  console.log(`   Successful:         ${successful}`);
  console.log(`   Failed:             ${failed}`);
  console.log(`   Skipped:            ${skipped}`);

  // Print example summary (verbose or first one)
  if (enrichedPlaces.length > 0) {
    const example = enrichedPlaces[0];
    console.log(`\n📋 Example summary:`);
    console.log(`   Source:     ${example.sourceId}`);
    console.log(`   Website:    ${example.website}`);
    console.log(`   Title:      ${example.jina.title}`);
    console.log(`   Summary:    ${example.jina.summary?.slice(0, 100)}...`);
    console.log(`   Highlights: ${example.jina.highlights?.join("; ") || "N/A"}`);
    console.log(`   Tags:       ${example.jina.tags?.join(", ") || "N/A"}`);
    console.log(`   Pet Types:  ${example.jina.extracted?.petTypes?.join(", ") || "N/A"}`);
    console.log(`   Services:   ${example.jina.extracted?.services?.join(", ") || "N/A"}`);
    console.log(`   Language:   ${example.jina.language || "N/A"}`);
  }

  console.log(`\n✅ Successfully enriched places with Jina AI for ${cityName}`);

  return {
    success: true,
    totalInputPlaces: brightData.places.length,
    processed: placesToProcess.length,
    successful,
    failed,
    skipped,
    filePath: jinaPath,
  };
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

  // Validate required arguments
  if (!args.country || !args.city) {
    console.error("❌ Error: --country and --city are required");
    console.error("   Use --help for usage information");
    process.exit(1);
  }

  // Find city configuration
  const cityConfig = getCity(args.country, args.city);

  if (!cityConfig) {
    console.error(
      `❌ Error: City "${args.city}" not found in country "${args.country}"`
    );
    console.error("   Run: npm run collect:osm:list to see available cities");
    process.exit(1);
  }

  // Run enrichment
  const result = await enrichWithJina(cityConfig, {
    limit: args.limit,
    dryRun: args.dryRun,
    verbose: args.verbose,
    force: args.force,
  });

  if (!result.success) {
    process.exit(1);
  }

  // Final message
  console.log(
    `\n🎉 R2.5 Complete: ${result.successful} places summarized for ${cityConfig.name}.`
  );
}

// Run
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

// R2.5 Complete
