/**
 * Update existing places with new SERP API data
 *
 * Fetches imageUrl, thumbnailUrl, workStatus, accessibility, serviceOptions
 * and merges them into scraped_content for existing places.
 *
 * Usage:
 *   npx tsx scripts/update-serp-content.ts --category veterinary --limit 10
 *   npx tsx scripts/update-serp-content.ts --city amsterdam --limit 5
 *   npx tsx scripts/update-serp-content.ts --all --limit 50
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

// Configuration
const CONFIG = {
  delayBetweenRequests: 1500, // ms between requests
  delayBetweenBatches: 5000, // ms between batches
  maxRetries: 3,
  initialRetryDelay: 2000,
  retryBackoffMultiplier: 2,
  batchSize: 10,
  serpApiUrl: "https://api.brightdata.com/request",
  serpZone: "serp_cutiepaws",
};

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  scraped_content: Record<string, unknown> | null;
}

interface SerpResult {
  place_id?: string;
  cid?: string;
  title?: string;
  address?: string;
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

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let category: string | null = null;
  let city: string | null = null;
  let limit = 10;
  let delay = CONFIG.delayBetweenRequests;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--category" && args[i + 1]) {
      category = args[i + 1];
      i++;
    } else if (args[i] === "--city" && args[i + 1]) {
      city = args[i + 1];
      i++;
    } else if (args[i] === "--limit" && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--delay" && args[i + 1]) {
      delay = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--all") {
      category = null;
      city = null;
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    }
  }

  return { category, city, limit, delay, dryRun };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = CONFIG.maxRetries
): Promise<T> {
  let lastError: Error | null = null;
  let delay = CONFIG.initialRetryDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        console.log(`  Retry ${attempt + 1}/${maxRetries} after ${delay}ms...`);
        await sleep(delay);
        delay *= CONFIG.retryBackoffMultiplier;
      }
    }
  }

  throw lastError;
}

interface SerpApiResponse {
  status_code: number;
  headers: Record<string, string>;
  body: string | Record<string, unknown>;
}

async function searchGoogleMaps(
  placeName: string,
  cityName: string
): Promise<SerpResult | null> {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  if (!apiKey) {
    throw new Error("BRIGHTDATA_API_KEY not set");
  }

  // Use Google local search (tbm=lcl) like discover-places.ts
  const query = `${placeName} ${cityName}`;
  const searchUrl = `https://www.google.nl/search?q=${encodeURIComponent(query)}&tbm=lcl&hl=nl&gl=nl&num=5`;

  const response = await fetch(CONFIG.serpApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zone: CONFIG.serpZone,
      url: searchUrl,
      format: "json",
    }),
  });

  if (!response.ok) {
    throw new Error(`SERP API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as SerpApiResponse;

  // The SERP API returns {status_code, headers, body}
  // We need to extract and parse the body
  let parsedBody: Record<string, unknown>;

  if (data.body) {
    if (typeof data.body === 'string') {
      try {
        parsedBody = JSON.parse(data.body);
      } catch {
        console.log(`   ⚠️ Failed to parse response body`);
        return null;
      }
    } else {
      parsedBody = data.body;
    }
  } else {
    // Direct response format
    parsedBody = data as unknown as Record<string, unknown>;
  }

  // Find best match in results - check multiple possible result arrays
  // BrightData returns local results in "snack_pack" for local search
  const snackPack = parsedBody.snack_pack as SerpResult[] | undefined;
  const localResults = parsedBody.local_results as SerpResult[] | undefined;
  const organic = parsedBody.organic as SerpResult[] | undefined;
  const results = snackPack || localResults || organic || [];

  if (results.length === 0) {
    return null;
  }

  // Find best match by name similarity
  const normalizedName = placeName.toLowerCase().trim();
  const bestMatch = results.find((r: SerpResult) => {
    const resultName = (r.title || "").toLowerCase().trim();
    return (
      resultName.includes(normalizedName) || normalizedName.includes(resultName)
    );
  });

  const result = bestMatch || results[0];

  return {
    place_id: result.place_id,
    cid: result.cid,
    title: result.title,
    address: result.address,
    imageUrl: result.image || result.imageUrl,
    thumbnailUrl: result.thumbnail || result.thumbnailUrl,
    openingHours: result.opening_hours || result.openingHours,
    workStatus: result.work_status || result.workStatus,
    accessibility: result.accessibility,
    serviceOptions: result.service_options || result.serviceOptions,
  };
}

async function main() {
  const { category, city, limit, delay, dryRun } = parseArgs();

  console.log(`
🔄 Update SERP Content for Existing Places
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category: ${category || "all"}
City: ${city || "all"}
Limit: ${limit}
Delay: ${delay}ms
Dry run: ${dryRun}
`);

  const sql = neon(process.env.DATABASE_URL!);

  // Build query to get places that need updating
  console.log("📋 Fetching places to update...");

  // Use sql.query for dynamic queries
  let whereConditions = ["co.slug = 'netherlands'"];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (category) {
    whereConditions.push(`EXISTS (
      SELECT 1 FROM place_categories pc
      JOIN categories cat ON pc.category_id = cat.id
      WHERE pc.place_id = p.id AND cat.slug = $${paramIndex}
    )`);
    params.push(category);
    paramIndex++;
  }

  if (city) {
    whereConditions.push(`LOWER(c.name) = LOWER($${paramIndex})`);
    params.push(city);
    paramIndex++;
  }

  // Only update places that don't have the new fields yet
  whereConditions.push(`(
    p.scraped_content IS NULL
    OR p.scraped_content->>'imageUrl' IS NULL
    OR p.scraped_content->>'accessibility' IS NULL
  )`);

  const query = `
    SELECT
      p.id, p.name, p.address, p.scraped_content,
      c.name as city_name
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE ${whereConditions.join(" AND ")}
    ORDER BY p.id
    LIMIT $${paramIndex}
  `;
  params.push(limit);

  const placesToUpdate = (await sql.query(query, params)) as Place[];
  console.log(`   Found ${placesToUpdate.length} places to update\n`);

  if (placesToUpdate.length === 0) {
    console.log("✅ All places already have SERP content!");
    return;
  }

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < placesToUpdate.length; i++) {
    const place = placesToUpdate[i];
    console.log(
      `[${i + 1}/${placesToUpdate.length}] ${place.name} (${place.city_name})`
    );

    try {
      const result = await withRetry(() =>
        searchGoogleMaps(place.name, place.city_name)
      );

      if (!result) {
        console.log("   ⚠️ No SERP results found");
        skipped++;
        continue;
      }

      // Log what we found
      console.log(`   📷 Image: ${result.imageUrl ? "✅" : "❌"}`);
      console.log(`   🕐 Work status: ${result.workStatus || "❌"}`);
      console.log(
        `   ♿ Accessibility: ${result.accessibility ? JSON.stringify(result.accessibility) : "❌"}`
      );
      console.log(
        `   🛍️ Service options: ${result.serviceOptions?.join(", ") || "❌"}`
      );

      if (dryRun) {
        console.log("   (dry run - not updating)");
        updated++;
        continue;
      }

      // Merge new data with existing scraped_content
      const existingContent = place.scraped_content || {};
      const newContent = {
        ...existingContent,
        imageUrl: result.imageUrl || existingContent.imageUrl,
        thumbnailUrl: result.thumbnailUrl || existingContent.thumbnailUrl,
        openingHours: result.openingHours || existingContent.openingHours,
        workStatus: result.workStatus || existingContent.workStatus,
        accessibility: result.accessibility || existingContent.accessibility,
        serviceOptions: result.serviceOptions || existingContent.serviceOptions,
        lastUpdated: new Date().toISOString(),
      };

      // Update the place
      await sql.query(
        `UPDATE places SET scraped_content = $1::jsonb WHERE id = $2`,
        [JSON.stringify(newContent), place.id]
      );

      console.log("   ✅ Updated!");
      updated++;
    } catch (error) {
      console.log(`   ❌ Error: ${(error as Error).message}`);
      errors++;
    }

    // Rate limiting
    if (i < placesToUpdate.length - 1) {
      await sleep(delay);
    }

    // Batch delay
    if ((i + 1) % CONFIG.batchSize === 0 && i < placesToUpdate.length - 1) {
      console.log(`\n⏳ Batch complete, waiting ${CONFIG.delayBetweenBatches}ms...\n`);
      await sleep(CONFIG.delayBetweenBatches);
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Update Complete!

   Updated: ${updated}
   Skipped: ${skipped}
   Errors:  ${errors}

🎉 Done!
`);
}

main().catch(console.error);
