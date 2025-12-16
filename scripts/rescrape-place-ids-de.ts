/**
 * Re-scrape Google Place IDs and CIDs for existing German places
 *
 * Uses BrightData SERP API to search for places and update google_place_id and google_cid
 *
 * Features:
 * - Category filter (only scrape places in specific category)
 * - Rate limiting (configurable delay between requests)
 * - Retry logic (exponential backoff on failures)
 * - Batch processing (configurable batch size)
 * - Progress tracking and resumable
 *
 * Usage:
 *   npx tsx scripts/rescrape-place-ids-de.ts --category veterinary --limit 100
 *   npx tsx scripts/rescrape-place-ids-de.ts --category pet-store --delay 2000
 *   npx tsx scripts/rescrape-place-ids-de.ts --all --limit 50
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

// Configuration
const CONFIG = {
  // Rate limiting
  delayBetweenRequests: 1500, // ms between requests
  delayBetweenBatches: 5000, // ms between batches

  // Retry logic
  maxRetries: 3,
  initialRetryDelay: 2000, // ms
  retryBackoffMultiplier: 2,

  // Batch processing
  batchSize: 10,

  // API
  serpApiUrl: "https://api.brightdata.com/request",
  serpZone: "serp_cutiepaws",
};

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  google_place_id: string | null;
  google_cid: string | null;
}

interface SerpResult {
  place_id?: string;
  cid?: string;
  title?: string;
  address?: string;
}

// Parse command line arguments
function parseArgs(): {
  category: string | null;
  limit: number;
  delay: number;
  dryRun: boolean;
} {
  const args = process.argv.slice(2);
  let category: string | null = null;
  let limit = 100;
  let delay = CONFIG.delayBetweenRequests;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--category" && args[i + 1]) {
      category = args[i + 1];
      i++;
    } else if (args[i] === "--limit" && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--delay" && args[i + 1]) {
      delay = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--all") {
      category = null;
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    }
  }

  return { category, limit, delay, dryRun };
}

// Sleep helper
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Retry with exponential backoff
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = CONFIG.maxRetries
): Promise<T> {
  let lastError: Error | null = null;
  let delay = CONFIG.initialRetryDelay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.log(
        `  Attempt ${attempt}/${maxRetries} failed: ${lastError.message}`
      );

      if (attempt < maxRetries) {
        console.log(`  Retrying in ${delay}ms...`);
        await sleep(delay);
        delay *= CONFIG.retryBackoffMultiplier;
      }
    }
  }

  throw lastError;
}

// Search for place using BrightData SERP API
// Using google.de with gl=de for Germany
async function searchPlace(
  place: Place,
  apiKey: string
): Promise<SerpResult | null> {
  const searchQuery = `${place.name} ${place.city_name}`;
  // Use tbm=lcl for Google Local search (returns snack_pack with CIDs)
  // Using google.de with hl=de (German) and gl=de (Germany)
  const searchUrl = `https://www.google.de/search?q=${encodeURIComponent(searchQuery)}&tbm=lcl&hl=de&gl=de&num=5`;

  const response = await fetch(CONFIG.serpApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      zone: CONFIG.serpZone,
      url: searchUrl,
      format: "json",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SERP API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  // BrightData SERP returns {status_code, headers, body}
  // Body can be a string (JSON) or already parsed object
  interface SerpWrapper {
    status_code?: number;
    body?: string | Record<string, unknown>;
  }
  const serpWrapper = data as SerpWrapper;

  let parsedData: Record<string, unknown>;

  if (serpWrapper.body) {
    if (typeof serpWrapper.body === "string") {
      try {
        parsedData = JSON.parse(serpWrapper.body);
      } catch {
        console.log("  ⚠️ Failed to parse response body");
        return null;
      }
    } else {
      parsedData = serpWrapper.body;
    }
  } else {
    parsedData = data;
  }

  // BrightData uses "snack_pack" for local business results
  interface SnackPackResult {
    cid?: string | number;
    name?: string;
    title?: string;
    address?: string;
    place_id?: string;
    data_id?: string;
  }

  const snackPack = (parsedData.snack_pack ||
    parsedData.local_results ||
    parsedData.local_pack ||
    parsedData.places ||
    []) as SnackPackResult[];

  if (!Array.isArray(snackPack) || snackPack.length === 0) {
    return null;
  }

  // Find best match by name similarity
  const normalizedPlaceName = place.name.toLowerCase().trim();

  for (const result of snackPack) {
    const resultName = (result.name || result.title || "").toLowerCase().trim();

    // Check for name match (fuzzy)
    if (
      resultName.includes(normalizedPlaceName) ||
      normalizedPlaceName.includes(resultName) ||
      levenshteinSimilarity(resultName, normalizedPlaceName) > 0.7
    ) {
      return {
        place_id: result.place_id || result.data_id,
        cid: result.cid ? String(result.cid) : undefined,
        title: result.name || result.title,
        address: result.address,
      };
    }
  }

  // If no good match, return first result (might still be correct)
  const first = snackPack[0];
  return {
    place_id: first.place_id || first.data_id,
    cid: first.cid ? String(first.cid) : undefined,
    title: first.name || first.title,
    address: first.address,
  };
}

// Levenshtein similarity (0-1)
function levenshteinSimilarity(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[b.length][a.length];
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - distance / maxLen;
}

async function main() {
  const { category, limit, delay, dryRun } = parseArgs();

  console.log("\n🔍 Re-scrape Place IDs Script (GERMANY 🇩🇪)\n");
  console.log("Configuration:");
  console.log(`  Category: ${category || "ALL"}`);
  console.log(`  Limit: ${limit}`);
  console.log(`  Delay: ${delay}ms`);
  console.log(`  Dry run: ${dryRun}`);
  console.log("");

  // Check environment
  const connectionString = process.env.DATABASE_URL;
  const apiKey = process.env.BRIGHTDATA_API_KEY;

  if (!connectionString) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  if (!apiKey) {
    console.error("❌ BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  const sql = neon(connectionString);

  // Build query based on category filter
  let places: Place[];

  if (category) {
    console.log(`📂 Fetching German places in category: ${category}`);
    places = await sql`
      SELECT DISTINCT
        p.id,
        p.name,
        p.address,
        ci.name as city_name,
        p.google_place_id,
        p.google_cid
      FROM places p
      JOIN cities ci ON p.city_id = ci.id
      JOIN countries co ON ci.country_id = co.id
      JOIN place_categories pc ON p.id = pc.place_id
      JOIN categories c ON pc.category_id = c.id
      WHERE co.name = 'Germany'
        AND c.slug = ${category}
        AND (p.google_place_id IS NULL OR p.google_cid IS NULL)
      ORDER BY p.id
      LIMIT ${limit}
    `;
  } else {
    console.log("📂 Fetching all German places without IDs");
    places = await sql`
      SELECT
        p.id,
        p.name,
        p.address,
        ci.name as city_name,
        p.google_place_id,
        p.google_cid
      FROM places p
      JOIN cities ci ON p.city_id = ci.id
      JOIN countries co ON ci.country_id = co.id
      WHERE co.name = 'Germany'
        AND (p.google_place_id IS NULL OR p.google_cid IS NULL)
      ORDER BY p.id
      LIMIT ${limit}
    `;
  }

  console.log(`\n📊 Found ${places.length} German places to process\n`);

  if (places.length === 0) {
    console.log("✅ No German places need updating!");
    process.exit(0);
  }

  if (dryRun) {
    console.log("🔍 Dry run - showing first 10 German places that would be processed:");
    for (const place of places.slice(0, 10)) {
      console.log(`  - [${place.id}] ${place.name} (${place.city_name})`);
    }
    process.exit(0);
  }

  // Process in batches
  let processed = 0;
  let updated = 0;
  let failed = 0;
  let notFound = 0;

  const batches = Math.ceil(places.length / CONFIG.batchSize);

  for (let batchIdx = 0; batchIdx < batches; batchIdx++) {
    const batchStart = batchIdx * CONFIG.batchSize;
    const batchEnd = Math.min(batchStart + CONFIG.batchSize, places.length);
    const batch = places.slice(batchStart, batchEnd);

    console.log(
      `\n📦 Batch ${batchIdx + 1}/${batches} (places ${batchStart + 1}-${batchEnd})`
    );

    for (const place of batch) {
      processed++;
      console.log(
        `\n[${processed}/${places.length}] ${place.name} (${place.city_name})`
      );

      try {
        const result = await withRetry(() => searchPlace(place, apiKey));

        if (result && (result.place_id || result.cid)) {
          console.log(`  ✅ Found: place_id=${result.place_id}, cid=${result.cid}`);
          console.log(`     Match: "${result.title}"`);

          // Update database
          await sql`
            UPDATE places
            SET
              google_place_id = COALESCE(${result.place_id || null}, google_place_id),
              google_cid = COALESCE(${result.cid || null}, google_cid),
              updated_at = NOW()
            WHERE id = ${place.id}
          `;
          updated++;
        } else {
          console.log("  ⚠️ No results found");
          notFound++;
        }
      } catch (error) {
        console.log(`  ❌ Failed: ${(error as Error).message}`);
        failed++;
      }

      // Rate limiting between requests
      if (processed < places.length) {
        await sleep(delay);
      }
    }

    // Delay between batches
    if (batchIdx < batches - 1) {
      console.log(`\n⏳ Waiting ${CONFIG.delayBetweenBatches}ms before next batch...`);
      await sleep(CONFIG.delayBetweenBatches);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY (GERMANY 🇩🇪)");
  console.log("=".repeat(50));
  console.log(`Total processed: ${processed}`);
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️ Not found: ${notFound}`);
  console.log(`❌ Failed: ${failed}`);
  console.log("=".repeat(50));

  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
