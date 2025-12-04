#!/usr/bin/env npx tsx
/**
 * Unified Place Enrichment Script
 *
 * Enriches places in the database with:
 * - Google/platform ratings from website scraping
 * - About-us content for personalized AI descriptions
 * - Schema.org structured data (opening hours, address, etc.)
 *
 * Reuses existing enrichment tools from /lib/enrichment/
 *
 * Usage:
 *   npx tsx scripts/enrich-places.ts                    # Enrich all places with websites
 *   npx tsx scripts/enrich-places.ts --limit=10        # Limit to first 10
 *   npx tsx scripts/enrich-places.ts --dry-run         # Show plan without updating
 *   npx tsx scripts/enrich-places.ts --force           # Re-enrich even if already scraped
 *   npx tsx scripts/enrich-places.ts --verbose         # Detailed output
 */

import { parseArgs } from "util";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import dotenv from "dotenv";

// Type alias for Neon SQL function that works with both caller and parameter types
type NeonSql = NeonQueryFunction<false, false>;

// Load environment variables
dotenv.config();

// Import existing enrichment tools
import { parseRatings, type RatingResult } from "../lib/enrichment/parseRatings";
import { extractAboutSection, type AboutSectionResult } from "../lib/enrichment/extractAboutSection";
import { extractSchemaOrg, schemaOrgToInternalHours, type SchemaOrgResult } from "../lib/enrichment/extractSchemaOrg";

// =============================================================================
// CONFIGURATION
// =============================================================================

const DATABASE_URL = process.env.DATABASE_URL;
const JINA_API_KEY = process.env.JINA_API_KEY || "";
const JINA_API_URL = "https://r.jina.ai";

const MAX_CONCURRENCY = 2;
const BATCH_DELAY = 1500; // ms between requests (Jina rate limiting)
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000;

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
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
        limit: { type: "string" },
        "dry-run": { type: "boolean", short: "d" },
        verbose: { type: "boolean", short: "v" },
        force: { type: "boolean", short: "f" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
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
Unified Place Enrichment Script for CutiePawsPedia

Enriches database places with:
- Google/platform ratings from website scraping
- About-us content for personalized AI descriptions
- Schema.org structured data

Usage:
  npx tsx scripts/enrich-places.ts [options]

Options:
  --limit <n>       Maximum number of places to process
  -d, --dry-run     Show plan without updating database
  -v, --verbose     Verbose output
  -f, --force       Re-enrich even if already scraped
  -h, --help        Show this help

Examples:
  npx tsx scripts/enrich-places.ts
  npx tsx scripts/enrich-places.ts --limit=5 --verbose
  npx tsx scripts/enrich-places.ts --force --limit=20

Environment Variables:
  DATABASE_URL      Neon PostgreSQL connection string (required)
  JINA_API_KEY      Jina AI API key (required for web scraping)
`);
}

// =============================================================================
// TYPES
// =============================================================================

interface PlaceRow {
  id: number;
  name: string;
  slug: string;
  website: string | null;
  avg_rating: string | null;
  review_count: number | null;
  scraped_content: ScrapedContent | null;
}

interface ScrapedContent {
  aboutUs?: string;
  aboutUsSummary?: string;
  aboutUsFacts?: {
    foundedYear?: number;
    employeeCount?: string;
    specializations?: string[];
    awards?: string[];
  };
  googleRating?: number;
  googleReviewCount?: number;
  platformRatings?: {
    platform: string;
    rating: number;
    reviewCount?: number;
  }[];
  ratingSource?: string;
  ratingConfidence?: number;
  openingHours?: Record<string, { opens: string; closes: string }>;
  scrapedAt: string;
  jinaModel?: string;
  language?: string;
}

interface EnrichmentResult {
  success: boolean;
  placeId: number;
  placeName: string;
  rating?: RatingResult;
  aboutSection?: AboutSectionResult;
  schemaOrg?: SchemaOrgResult;
  scrapedContent?: ScrapedContent;
  error?: string;
}

// =============================================================================
// JINA AI WEB SCRAPER
// =============================================================================

interface JinaResponse {
  content?: string;
  title?: string;
  url?: string;
  data?: {
    content?: string;
    title?: string;
    html?: string;
  };
}

/**
 * Fetch website content using Jina AI Reader
 * Returns both markdown content and raw HTML for parsing
 */
async function fetchWebsiteContent(
  url: string,
  retryCount = 0
): Promise<{ content: string; html: string; title: string } | null> {
  if (!JINA_API_KEY) {
    console.error("   ❌ JINA_API_KEY not set");
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Fetch markdown content
    const response = await fetch(`${JINA_API_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        Accept: "application/json",
        "X-Return-Format": "markdown",
        "X-With-Generated-Alt": "true",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`   ⏳ Rate limited, waiting ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWebsiteContent(url, retryCount + 1);
    }

    if (response.status >= 500 && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWebsiteContent(url, retryCount + 1);
    }

    if (!response.ok) {
      return null;
    }

    const data: JinaResponse = await response.json();
    const content = data.data?.content || data.content || "";
    const title = data.data?.title || data.title || "";

    // Now fetch HTML version for Schema.org extraction
    const htmlResponse = await fetch(`${JINA_API_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        Accept: "text/html",
      },
    });

    let html = "";
    if (htmlResponse.ok) {
      html = await htmlResponse.text();
    }

    return { content, html, title };
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWebsiteContent(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Try to find and scrape the about-us page
 */
async function tryAboutUsPage(
  baseUrl: string,
  verbose: boolean
): Promise<{ content: string; html: string } | null> {
  // Common about page paths in Dutch, English, German
  const aboutPaths = [
    "/over-ons",
    "/over-ons/",
    "/about",
    "/about-us",
    "/about/",
    "/about-us/",
    "/ueber-uns",
    "/uber-uns",
    "/wie-zijn-wij",
    "/ons-verhaal",
    "/onze-geschiedenis",
    "/over",
  ];

  // Try to normalize base URL
  let base = baseUrl.replace(/\/$/, "");
  if (!base.startsWith("http")) {
    base = "https://" + base;
  }

  for (const path of aboutPaths) {
    const aboutUrl = base + path;
    if (verbose) {
      console.log(`   🔍 Trying about page: ${aboutUrl}`);
    }

    const result = await fetchWebsiteContent(aboutUrl);
    if (result && result.content && result.content.length > 200) {
      if (verbose) {
        console.log(`   ✅ Found about page at ${aboutUrl}`);
      }
      return { content: result.content, html: result.html };
    }

    // Small delay between attempts
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return null;
}

// =============================================================================
// ENRICHMENT PROCESSOR
// =============================================================================

async function enrichPlace(
  place: PlaceRow,
  verbose: boolean
): Promise<EnrichmentResult> {
  const result: EnrichmentResult = {
    success: false,
    placeId: place.id,
    placeName: place.name,
  };

  if (!place.website) {
    result.error = "No website";
    return result;
  }

  if (verbose) {
    console.log(`\n🔄 Processing: ${place.name}`);
    console.log(`   Website: ${place.website}`);
  }

  // Step 1: Fetch main website content
  const mainContent = await fetchWebsiteContent(place.website);
  if (!mainContent) {
    result.error = "Failed to fetch website";
    return result;
  }

  if (verbose) {
    console.log(`   📄 Fetched ${mainContent.content.length} chars of content`);
  }

  // Step 2: Extract ratings using parseRatings()
  const ratingResult = parseRatings({
    content: mainContent.content,
    html: mainContent.html,
    url: place.website,
  });

  if (ratingResult.rating !== null) {
    result.rating = ratingResult;
    if (verbose) {
      console.log(
        `   ⭐ Found rating: ${ratingResult.rating}/5 (${ratingResult.reviewCount || 0} reviews) from ${ratingResult.source}`
      );
    }
  }

  // Step 3: Extract Schema.org data
  if (mainContent.html) {
    const schemaResult = extractSchemaOrg(mainContent.html);
    if (schemaResult) {
      result.schemaOrg = schemaResult;
      if (verbose) {
        console.log(`   📊 Found Schema.org data: ${schemaResult.type}`);
        if (schemaResult.aggregateRating) {
          console.log(
            `   ⭐ Schema rating: ${schemaResult.aggregateRating.ratingValue}`
          );
        }
        if (schemaResult.openingHours) {
          console.log(
            `   🕐 Found ${schemaResult.openingHours.length} opening hours specs`
          );
        }
      }
    }
  }

  // Step 4: Try to find about-us page
  const aboutPage = await tryAboutUsPage(place.website, verbose);
  const contentToAnalyze = aboutPage?.content || mainContent.content;

  // Step 5: Extract about section
  const aboutResult = await extractAboutSection({
    content: contentToAnalyze,
    html: aboutPage?.html || mainContent.html,
    jinaApiKey: JINA_API_KEY,
    maxSummaryLength: 300,
  });

  if (aboutResult) {
    result.aboutSection = aboutResult;
    if (verbose) {
      console.log(
        `   📝 Found about section: ${aboutResult.fullText.slice(0, 100)}...`
      );
      if (aboutResult.facts) {
        if (aboutResult.facts.foundedYear) {
          console.log(`   📅 Founded: ${aboutResult.facts.foundedYear}`);
        }
        if (aboutResult.facts.specializations) {
          console.log(
            `   🎯 Specializations: ${aboutResult.facts.specializations.join(", ")}`
          );
        }
      }
    }
  }

  // Step 6: Build scrapedContent object
  const scrapedContent: ScrapedContent = {
    scrapedAt: new Date().toISOString(),
    jinaModel: "jina-reader",
    language: aboutResult?.language || "unknown",
  };

  // Add about-us content
  if (aboutResult) {
    scrapedContent.aboutUs = aboutResult.fullText;
    if (aboutResult.summary) {
      scrapedContent.aboutUsSummary = aboutResult.summary;
    }
    if (aboutResult.facts) {
      scrapedContent.aboutUsFacts = aboutResult.facts;
    }
  }

  // Add ratings (prefer Schema.org, then parsed ratings)
  if (result.schemaOrg?.aggregateRating) {
    const schemaRating = result.schemaOrg.aggregateRating;
    scrapedContent.googleRating =
      parseFloat(String(schemaRating.ratingValue)) || undefined;
    scrapedContent.googleReviewCount =
      parseInt(
        String(schemaRating.reviewCount || schemaRating.ratingCount),
        10
      ) || undefined;
    scrapedContent.ratingSource = "schema_org";
    scrapedContent.ratingConfidence = 95;
  } else if (ratingResult.rating !== null) {
    scrapedContent.googleRating = ratingResult.rating;
    scrapedContent.googleReviewCount = ratingResult.reviewCount || undefined;
    scrapedContent.ratingSource = ratingResult.source;
    scrapedContent.ratingConfidence = ratingResult.confidence;
    if (ratingResult.platformRatings) {
      scrapedContent.platformRatings = ratingResult.platformRatings.map(
        (pr) => ({
          platform: pr.platform,
          rating: pr.rating,
          reviewCount: pr.reviewCount,
        })
      );
    }
  }

  // Add opening hours from Schema.org
  if (result.schemaOrg?.openingHours) {
    scrapedContent.openingHours = schemaOrgToInternalHours(
      result.schemaOrg.openingHours
    );
  }

  result.scrapedContent = scrapedContent;
  result.success = true;

  return result;
}

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

async function getPlacesToEnrich(
  sql: NeonSql,
  limit?: number,
  force?: boolean
): Promise<PlaceRow[]> {
  // Use tagged template syntax for Neon
  if (force) {
    if (limit) {
      const rows = await sql`
        SELECT id, name, slug, website, avg_rating, review_count, scraped_content
        FROM places
        WHERE website IS NOT NULL AND website != ''
        ORDER BY id
        LIMIT ${limit}
      `;
      return rows as unknown as PlaceRow[];
    } else {
      const rows = await sql`
        SELECT id, name, slug, website, avg_rating, review_count, scraped_content
        FROM places
        WHERE website IS NOT NULL AND website != ''
        ORDER BY id
      `;
      return rows as unknown as PlaceRow[];
    }
  } else {
    if (limit) {
      const rows = await sql`
        SELECT id, name, slug, website, avg_rating, review_count, scraped_content
        FROM places
        WHERE website IS NOT NULL AND website != ''
          AND (scraped_content IS NULL OR scraped_content = '{}'::jsonb)
        ORDER BY id
        LIMIT ${limit}
      `;
      return rows as unknown as PlaceRow[];
    } else {
      const rows = await sql`
        SELECT id, name, slug, website, avg_rating, review_count, scraped_content
        FROM places
        WHERE website IS NOT NULL AND website != ''
          AND (scraped_content IS NULL OR scraped_content = '{}'::jsonb)
        ORDER BY id
      `;
      return rows as unknown as PlaceRow[];
    }
  }
}

async function updatePlaceEnrichment(
  sql: NeonSql,
  placeId: number,
  scrapedContent: ScrapedContent,
  avgRating?: number,
  reviewCount?: number
): Promise<void> {
  const contentJson = JSON.stringify(scrapedContent);

  // Use tagged template syntax for Neon
  if (avgRating !== undefined && avgRating > 0 && reviewCount !== undefined && reviewCount > 0) {
    await sql`
      UPDATE places
      SET scraped_content = ${contentJson}::jsonb,
          avg_rating = ${avgRating},
          review_count = ${reviewCount},
          updated_at = NOW()
      WHERE id = ${placeId}
    `;
  } else if (avgRating !== undefined && avgRating > 0) {
    await sql`
      UPDATE places
      SET scraped_content = ${contentJson}::jsonb,
          avg_rating = ${avgRating},
          updated_at = NOW()
      WHERE id = ${placeId}
    `;
  } else if (reviewCount !== undefined && reviewCount > 0) {
    await sql`
      UPDATE places
      SET scraped_content = ${contentJson}::jsonb,
          review_count = ${reviewCount},
          updated_at = NOW()
      WHERE id = ${placeId}
    `;
  } else {
    await sql`
      UPDATE places
      SET scraped_content = ${contentJson}::jsonb,
          updated_at = NOW()
      WHERE id = ${placeId}
    `;
  }
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

  // Validate environment
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is required");
    process.exit(1);
  }

  if (!JINA_API_KEY) {
    console.error("❌ JINA_API_KEY environment variable is required");
    console.error("   Get your API key from https://jina.ai");
    process.exit(1);
  }

  console.log("\n🚀 CutiePawsPedia Place Enrichment");
  console.log("================================");
  console.log(`📊 Database: ${DATABASE_URL.substring(0, 30)}...`);
  console.log(`🔑 Jina API: ${JINA_API_KEY ? "✅ Configured" : "❌ Not set"}`);

  const sql = neon(DATABASE_URL);

  // Get places to process
  console.log("\n📋 Loading places to enrich...");
  const places = await getPlacesToEnrich(sql, args.limit, args.force);

  if (places.length === 0) {
    console.log("\n✅ No places need enrichment!");
    console.log("   Use --force to re-enrich already processed places.");
    return;
  }

  console.log(`\n📦 Found ${places.length} places to enrich`);

  if (args.dryRun) {
    console.log("\n🔍 Dry run - showing plan:");
    for (const place of places.slice(0, 10)) {
      console.log(`   - [${place.id}] ${place.name}: ${place.website}`);
    }
    if (places.length > 10) {
      console.log(`   ... and ${places.length - 10} more`);
    }
    console.log("\n💡 Remove --dry-run to process these places.");
    return;
  }

  // Process places
  console.log(`\n⏳ Processing (max ${MAX_CONCURRENCY} concurrent, ${BATCH_DELAY}ms delay)...`);
  const startTime = Date.now();

  let successful = 0;
  let failed = 0;
  let ratingsFound = 0;
  let aboutFound = 0;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];

    if (!args.verbose) {
      process.stdout.write(
        `   Processing ${i + 1}/${places.length}: ${place.name.slice(0, 30)}...`.padEnd(60) + "\r"
      );
    }

    try {
      const result = await enrichPlace(place, args.verbose || false);

      if (result.success && result.scrapedContent) {
        // Update database
        await updatePlaceEnrichment(
          sql,
          place.id,
          result.scrapedContent,
          result.scrapedContent.googleRating,
          result.scrapedContent.googleReviewCount
        );

        successful++;

        if (result.scrapedContent.googleRating) {
          ratingsFound++;
        }
        if (result.scrapedContent.aboutUs) {
          aboutFound++;
        }

        if (args.verbose) {
          console.log(`   ✅ Updated place ${place.id}`);
        }
      } else {
        failed++;
        if (args.verbose) {
          console.log(`   ❌ Failed: ${result.error}`);
        }
      }
    } catch (error) {
      failed++;
      if (args.verbose) {
        console.error(`   ❌ Error: ${error}`);
      }
    }

    // Delay between requests
    if (i < places.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  console.log("\n\n📊 Enrichment Complete!");
  console.log("======================");
  console.log(`   Total processed:  ${places.length}`);
  console.log(`   Successful:       ${successful}`);
  console.log(`   Failed:           ${failed}`);
  console.log(`   Ratings found:    ${ratingsFound}`);
  console.log(`   About-us found:   ${aboutFound}`);
  console.log(`   Duration:         ${duration}s`);

  if (successful > 0) {
    console.log(
      "\n✅ Places enriched! The scraped content will be used for:"
    );
    console.log("   - Displaying Google ratings on place pages");
    console.log("   - Generating personalized AI descriptions");
    console.log("   - Showing opening hours from Schema.org");
  }
}

main().catch((error) => {
  console.error("\n❌ Unhandled error:", error);
  process.exit(1);
});
