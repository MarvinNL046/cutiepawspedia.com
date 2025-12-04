#!/usr/bin/env npx tsx
/**
 * Google Ratings Enrichment via Brightdata
 *
 * Production-ready script to enrich places with:
 * - Google ratings & review counts
 * - Phone numbers
 * - Opening hours (when available)
 *
 * Usage:
 *   npx tsx scripts/enrich-google-ratings.ts                    # Enrich all
 *   npx tsx scripts/enrich-google-ratings.ts --city=Amsterdam   # Filter by city
 *   npx tsx scripts/enrich-google-ratings.ts --limit=10         # Limit count
 *   npx tsx scripts/enrich-google-ratings.ts --dry-run          # Preview only
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;
const BRIGHTDATA_ZONE = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

// =============================================================================
// Types
// =============================================================================

interface EnrichmentResult {
  rating?: number;
  reviewCount?: number;
  phone?: string;
  openingHours?: Record<string, string>;
}

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
}

interface Stats {
  processed: number;
  enriched: number;
  withRating: number;
  withHours: number;
  failed: number;
}

// =============================================================================
// CLI Arguments
// =============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    city: args.find(a => a.startsWith("--city="))?.split("=")[1],
    limit: parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] || "50", 10),
    dryRun: args.includes("--dry-run"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

function printHelp() {
  console.log(`
Google Ratings Enrichment Script

Enriches places with Google data via Brightdata SERP API:
- Ratings & review counts
- Phone numbers
- Opening hours

Usage:
  npx tsx scripts/enrich-google-ratings.ts [options]

Options:
  --city=<name>    Filter by city name (e.g., --city=Amsterdam)
  --limit=<n>      Maximum places to process (default: 50)
  --dry-run        Preview without updating database
  --help, -h       Show this help

Examples:
  npx tsx scripts/enrich-google-ratings.ts --city=Amsterdam --limit=10
  npx tsx scripts/enrich-google-ratings.ts --limit=100
  npx tsx scripts/enrich-google-ratings.ts --dry-run

Environment:
  DATABASE_URL          Neon PostgreSQL connection (required)
  BRIGHTDATA_API_TOKEN  Brightdata API token (required)
  BRIGHTDATA_ZONE       Zone name (default: mcp_unlocker)
`);
}

// =============================================================================
// Brightdata SERP Scraper
// =============================================================================

async function scrapeGoogle(
  name: string,
  city: string,
  country: string
): Promise<EnrichmentResult | null> {
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
    return parseGoogleHtml(html);
  } catch {
    return null;
  }
}

// =============================================================================
// HTML Parser
// =============================================================================

function parseGoogleHtml(html: string): EnrichmentResult | null {
  const result: EnrichmentResult = {};

  // Rating
  const ratingPatterns = [
    /(\d+[.,]\d+)\s*(?:uit|van|of)\s*5/i,
    /"ratingValue"[:\s]*"?(\d+[.,]\d+)"?/i,
    /(\d+[.,]\d+)\s*sterren/i,
    /aria-label="[^"]*(\d+[.,]\d+)[^"]*(?:sterren|stars?)"/i,
  ];

  for (const pattern of ratingPatterns) {
    const match = html.match(pattern);
    if (match) {
      const rating = parseFloat(match[1].replace(",", "."));
      if (rating > 0 && rating <= 5) {
        result.rating = rating;
        break;
      }
    }
  }

  // Review count
  const reviewPatterns = [
    /\([\s]*([\d.,]+)[\s]*(?:reviews?|beoordelingen|recensies)\)/i,
    /"reviewCount"[:\s]*"?([\d]+)"?/i,
    /([\d.,]+)\s*Google[\s-]*reviews?/i,
  ];

  for (const pattern of reviewPatterns) {
    const match = html.match(pattern);
    if (match) {
      const count = parseInt(match[1].replace(/[.,\s]/g, ""), 10);
      if (count > 0 && count < 1000000) {
        result.reviewCount = count;
        break;
      }
    }
  }

  // Phone
  const phonePatterns = [
    /tel:([+\d\s()-]+)"/i,
    /"telephone"[:\s]*"([^"]+)"/i,
    /(\+31[\s.-]?\d{1,3}[\s.-]?\d{3}[\s.-]?\d{4})/,
    /(0\d{2,3}[\s.-]?\d{3}[\s.-]?\d{4})/,
  ];

  for (const pattern of phonePatterns) {
    const match = html.match(pattern);
    if (match) {
      result.phone = match[1].trim();
      break;
    }
  }

  // Opening hours (Schema.org)
  const schemaMatch = html.match(/"openingHoursSpecification"[:\s]*(\[[^\]]+\])/i);
  if (schemaMatch) {
    try {
      const hoursData = JSON.parse(schemaMatch[1]);
      const hours: Record<string, string> = {};
      const dayMap: Record<string, string> = {
        Monday: "mon", Tuesday: "tue", Wednesday: "wed",
        Thursday: "thu", Friday: "fri", Saturday: "sat", Sunday: "sun",
      };

      for (const spec of hoursData) {
        if (spec.dayOfWeek && spec.opens && spec.closes) {
          const days = Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek];
          for (const day of days) {
            const dayName = day.replace(/https?:\/\/schema\.org\//i, "");
            const key = dayMap[dayName];
            if (key) {
              hours[key] = `${spec.opens}-${spec.closes}`;
            }
          }
        }
      }

      if (Object.keys(hours).length > 0) {
        result.openingHours = hours;
      }
    } catch {
      // Schema parsing failed
    }
  }

  return result.rating ? result : null;
}

// =============================================================================
// Database Operations
// =============================================================================

async function getPlaces(city?: string, limit = 50): Promise<Place[]> {
  const cityCondition = city ? sql`AND c.name = ${city}` : sql``;

  return await sql`
    SELECT
      p.id, p.name, p.address,
      c.name as city_name,
      co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE (
      p.avg_rating IS NULL
      OR p.avg_rating = 0
      OR NOT (p.data_quality_flags::text LIKE '%RATING_VIA_GOOGLE%')
    )
    ${cityCondition}
    ORDER BY p.id
    LIMIT ${limit}
  ` as Place[];
}

async function updatePlace(placeId: number, data: EnrichmentResult): Promise<boolean> {
  try {
    const scrapedContent = {
      googleRating: data.rating,
      googleReviewCount: data.reviewCount || 0,
      ratingSource: "google_brightdata",
      ratingConfidence: 95,
      enrichedAt: new Date().toISOString(),
    };

    const flags: string[] = ["RATING_VIA_GOOGLE", "ENRICHMENT_COMPLETE"];
    if (data.openingHours && Object.keys(data.openingHours).length >= 5) {
      flags.push("OPENING_HOURS_VIA_SCHEMA");
    }

    const newFlags = JSON.stringify(flags);

    await sql`
      UPDATE places SET
        avg_rating = ${data.rating!},
        review_count = ${data.reviewCount || 0},
        phone = COALESCE(${data.phone || null}, phone),
        opening_hours = COALESCE(${data.openingHours ? JSON.stringify(data.openingHours) : null}::jsonb, opening_hours),
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedContent)}::jsonb,
        data_quality_flags = (
          SELECT jsonb_agg(DISTINCT value)
          FROM jsonb_array_elements_text(
            COALESCE(data_quality_flags, '[]'::jsonb) || ${newFlags}::jsonb
          )
        ),
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  console.log("\n🚀 Google Ratings Enrichment");
  console.log("━".repeat(50));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  console.log(`📍 City: ${args.city || "All"}`);
  console.log(`📊 Limit: ${args.limit}`);
  console.log(`🔧 Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`🔑 Zone: ${BRIGHTDATA_ZONE}\n`);

  const places = await getPlaces(args.city, args.limit);
  console.log(`📋 Found ${places.length} places to enrich\n`);

  if (places.length === 0) {
    console.log("✅ All places already enriched!");
    return;
  }

  const stats: Stats = {
    processed: 0,
    enriched: 0,
    withRating: 0,
    withHours: 0,
    failed: 0,
  };

  for (const place of places) {
    stats.processed++;
    console.log(`[${stats.processed}/${places.length}] ${place.name}`);

    const data = await scrapeGoogle(place.name, place.city_name, place.country_name);

    if (data?.rating) {
      console.log(`   ⭐ ${data.rating.toFixed(1)}/5 (${data.reviewCount || 0} reviews)`);
      if (data.phone) console.log(`   📞 ${data.phone}`);
      if (data.openingHours) {
        console.log(`   🕐 ${Object.keys(data.openingHours).length} days`);
        stats.withHours++;
      }

      if (!args.dryRun) {
        const ok = await updatePlace(place.id, data);
        console.log(ok ? `   ✅ Saved` : `   ❌ Failed to save`);
        if (ok) {
          stats.enriched++;
          stats.withRating++;
        } else {
          stats.failed++;
        }
      } else {
        console.log(`   ⏭️ Skipped (dry run)`);
      }
    } else {
      console.log(`   ⚠️ No rating found`);
      stats.failed++;
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 1500));
  }

  // Summary
  console.log("\n" + "━".repeat(50));
  console.log("📊 Summary\n");
  console.log(`   Processed:    ${stats.processed}`);
  console.log(`   Enriched:     ${stats.enriched}`);
  console.log(`   With rating:  ${stats.withRating}`);
  console.log(`   With hours:   ${stats.withHours}`);
  console.log(`   Failed:       ${stats.failed}`);

  // DB stats
  const dbStats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating > 0) as with_rating,
      COUNT(*) FILTER (WHERE data_quality_flags::text LIKE '%RATING_VIA_GOOGLE%') as google_enriched
    FROM places
  `;

  console.log("\n📈 Database Totals:");
  console.log(`   Total:           ${dbStats[0].total}`);
  console.log(`   With rating:     ${dbStats[0].with_rating}`);
  console.log(`   Google enriched: ${dbStats[0].google_enriched}`);
}

main().catch(console.error);
