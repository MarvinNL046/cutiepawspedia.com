#!/usr/bin/env npx tsx
/**
 * Website Enrichment Script
 *
 * Enriches places that have ratings but no website URL.
 * Uses Brightdata SERP API to scrape Google and extract website URLs.
 *
 * Usage:
 *   npx tsx scripts/enrich-websites.ts                    # Enrich all
 *   npx tsx scripts/enrich-websites.ts --city=Amsterdam   # Filter by city
 *   npx tsx scripts/enrich-websites.ts --limit=100        # Limit count
 *   npx tsx scripts/enrich-websites.ts --dry-run          # Preview only
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
const BRIGHTDATA_ZONE = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
}

interface Stats {
  processed: number;
  found: number;
  updated: number;
  failed: number;
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    city: args.find(a => a.startsWith("--city="))?.split("=")[1],
    limit: parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] || "100", 10),
    dryRun: args.includes("--dry-run"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

function printHelp() {
  console.log(`
Website Enrichment Script

Enriches places that have ratings but no website URL.

Usage:
  npx tsx scripts/enrich-websites.ts [options]

Options:
  --city=<name>    Filter by city name (e.g., --city=Amsterdam)
  --limit=<n>      Maximum places to process (default: 100)
  --dry-run        Preview without updating database
  --help, -h       Show this help

Examples:
  npx tsx scripts/enrich-websites.ts --city=Amsterdam --limit=50
  npx tsx scripts/enrich-websites.ts --limit=200
  npx tsx scripts/enrich-websites.ts --dry-run
`);
}

async function scrapeWebsite(
  name: string,
  city: string,
  country: string
): Promise<string | null> {
  const query = `${name} ${city} ${country}`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=nl`;

  try {
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        zone: BRIGHTDATA_ZONE,
        url,
        format: "raw",
        country: "nl",
      }),
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    return extractWebsite(html);
  } catch {
    return null;
  }
}

function extractWebsite(html: string): string | null {
  // Website URL patterns
  const websitePatterns = [
    // Schema.org URL
    /"url"[\s:]*"(https?:\/\/[^"]+)"/i,
    // Data attribute
    /data-website="(https?:\/\/[^"]+)"/i,
    // Link with Website/Bezoek text
    /href="(https?:\/\/(?:www\.)?[a-z0-9][a-z0-9-]*\.[a-z]{2,}[^"]*)"[^>]*>(?:Website|Bezoek|Site|Webpagina)/i,
    // Knowledge panel website
    /data-url="(https?:\/\/[^"]+)"/i,
    // Direct link patterns (business websites)
    /href="(https?:\/\/(?:www\.)?[a-z0-9][a-z0-9-]*\.(?:nl|com|eu|net|org)[^"]*)"[^>]*class="[^"]*(?:website|url)[^"]*"/i,
  ];

  const excludeDomains = [
    "google.",
    "facebook.",
    "instagram.",
    "twitter.",
    "youtube.",
    "linkedin.",
    "tripadvisor.",
    "yelp.",
    "maps.google",
    "goo.gl",
    "bit.ly",
    "tinyurl.",
    "t.co",
  ];

  for (const pattern of websitePatterns) {
    const match = html.match(pattern);
    if (match) {
      const url = match[1].trim();
      // Check if it's not a social/excluded domain
      const isExcluded = excludeDomains.some(domain => url.includes(domain));
      if (!isExcluded) {
        // Clean up URL
        try {
          const parsed = new URL(url);
          return `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(/\/$/, "");
        } catch {
          return url;
        }
      }
    }
  }

  return null;
}

async function getPlacesWithoutWebsite(city?: string, limit = 100): Promise<Place[]> {
  const cityCondition = city ? sql`AND c.name = ${city}` : sql``;

  return await sql`
    SELECT
      p.id, p.name, p.address,
      c.name as city_name,
      co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE p.website IS NULL
      AND p.avg_rating > 0
    ${cityCondition}
    ORDER BY p.id
    LIMIT ${limit}
  ` as Place[];
}

async function updateWebsite(placeId: number, website: string): Promise<boolean> {
  try {
    await sql`
      UPDATE places SET
        website = ${website},
        updated_at = NOW()
      WHERE id = ${placeId}
    `;
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  console.log("\n🌐 Website Enrichment");
  console.log("━".repeat(50));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  console.log(`📍 City: ${args.city || "All"}`);
  console.log(`📊 Limit: ${args.limit}`);
  console.log(`🔧 Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`🔑 Zone: ${BRIGHTDATA_ZONE}\n`);

  const places = await getPlacesWithoutWebsite(args.city, args.limit);
  console.log(`📋 Found ${places.length} places without website\n`);

  if (places.length === 0) {
    console.log("✅ All places already have websites!");
    return;
  }

  const stats: Stats = {
    processed: 0,
    found: 0,
    updated: 0,
    failed: 0,
  };

  for (const place of places) {
    stats.processed++;
    console.log(`[${stats.processed}/${places.length}] ${place.name}`);

    const website = await scrapeWebsite(place.name, place.city_name, place.country_name);

    if (website) {
      console.log(`   🌐 ${website}`);
      stats.found++;

      if (!args.dryRun) {
        const ok = await updateWebsite(place.id, website);
        console.log(ok ? `   ✅ Saved` : `   ❌ Failed to save`);
        if (ok) {
          stats.updated++;
        } else {
          stats.failed++;
        }
      } else {
        console.log(`   ⏭️ Skipped (dry run)`);
      }
    } else {
      console.log(`   ⚠️ No website found`);
      stats.failed++;
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 1500));
  }

  // Summary
  console.log("\n" + "━".repeat(50));
  console.log("📊 Summary\n");
  console.log(`   Processed:   ${stats.processed}`);
  console.log(`   Found:       ${stats.found}`);
  console.log(`   Updated:     ${stats.updated}`);
  console.log(`   Not found:   ${stats.failed}`);

  // DB stats
  const dbStats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE website IS NOT NULL) as with_website
    FROM places
  `;

  console.log("\n📈 Database Totals:");
  console.log(`   Total:        ${dbStats[0].total}`);
  console.log(`   With website: ${dbStats[0].with_website} (${Math.round(parseInt(dbStats[0].with_website) / parseInt(dbStats[0].total) * 100)}%)`);
}

main().catch(console.error);
