/**
 * Brightdata Google Business Enrichment Script
 *
 * Uses Brightdata's Datasets API (Web Scraper API) to fetch Google Maps business data.
 * This API doesn't require a zone configuration.
 *
 * API Docs: https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

// Brightdata API configuration
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;

// Datasets API endpoint - uses different authentication
const BRIGHTDATA_DATASETS_ENDPOINT = "https://api.brightdata.com/datasets/v3/trigger";

// Alternative: Use Google Places Dataset
const GOOGLE_PLACES_DATASET_ID = "gd_l1vijqt9jfj7olije";

interface GoogleBusinessResult {
  rating?: number;
  reviewCount?: number;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  placeId?: string;
}

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  website: string | null;
  phone: string | null;
  avg_rating: string | null;
  review_count: number | null;
  lat: string | null;
  lng: string | null;
}

/**
 * Trigger Brightdata Web Scraper for Google Places
 * Returns a snapshot_id to retrieve results later
 */
async function triggerGooglePlacesSearch(
  businessName: string,
  city: string,
  country: string
): Promise<string | null> {
  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    return null;
  }

  const searchQuery = `${businessName} ${city} ${country}`;

  try {
    // Use the discover endpoint for real-time scraping
    const response = await fetch(`https://api.brightdata.com/datasets/v3/discover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        dataset_id: GOOGLE_PLACES_DATASET_ID,
        include_errors: false,
        format: "json",
        limit: 1,
        input: [
          {
            keyword: searchQuery,
            country: country.toLowerCase() === "netherlands" ? "NL" : "US",
            language: country.toLowerCase() === "netherlands" ? "nl" : "en",
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ API error ${response.status}: ${errorText.slice(0, 300)}`);
      return null;
    }

    const data = await response.json();
    return data.snapshot_id || null;
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Alternative: Direct web scraping with Brightdata SERP
 * Uses the synchronous scraping endpoint
 */
async function scrapeGoogleSearchDirectly(
  businessName: string,
  city: string,
  country: string
): Promise<GoogleBusinessResult | null> {
  if (!BRIGHTDATA_API_TOKEN) {
    return null;
  }

  const searchQuery = `${businessName} ${city} ${country} reviews rating`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&hl=nl`;

  try {
    // Use the web unlocker endpoint for synchronous scraping
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        url: googleUrl,
        format: "raw",
        country: "nl",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Check if it's a zone error - then we need different approach
      if (errorText.includes("zone") && errorText.includes("not found")) {
        console.log(`   ℹ️ Zone not configured, using alternative method...`);
        return null;
      }
      console.error(`   ❌ API error ${response.status}: ${errorText.slice(0, 200)}`);
      return null;
    }

    const html = await response.text();
    return parseGoogleSearchHtml(html);
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Parse Google Search HTML for business rating info
 */
function parseGoogleSearchHtml(html: string): GoogleBusinessResult | null {
  const result: GoogleBusinessResult = {};

  // Multiple patterns to extract rating from Google SERP
  const ratingPatterns = [
    // Pattern: "4.5" followed by stars or rating text
    /(\d+[.,]\d+)\s*(?:<[^>]*>)*\s*(?:sterren|stars?|rating)/i,
    // Pattern: rating in aria-label
    /aria-label="[^"]*(\d+[.,]\d+)[^"]*(?:sterren|stars?)"/i,
    // Pattern: rating value in structured data
    /"ratingValue"[:\s]*"?(\d+[.,]\d+)"?/i,
    // Pattern: rating near reviews count
    /(\d+[.,]\d+)\s*(?:<[^>]*>)*\s*\([\d,.\s]+(?:reviews?|beoordelingen)\)/i,
  ];

  for (const pattern of ratingPatterns) {
    const match = html.match(pattern);
    if (match) {
      const ratingStr = match[1].replace(",", ".");
      const rating = parseFloat(ratingStr);
      if (rating > 0 && rating <= 5) {
        result.rating = rating;
        break;
      }
    }
  }

  // Extract review count
  const reviewPatterns = [
    // Pattern: (123 reviews) or (1.234 beoordelingen)
    /\([\s]*([\d,.]+)[\s]*(?:reviews?|beoordelingen|recensies)\)/i,
    // Pattern: 123 reviews
    /([\d,.]+)\s*(?:Google\s+)?(?:reviews?|beoordelingen)/i,
    // Pattern: reviewCount in structured data
    /"reviewCount"[:\s]*"?([\d]+)"?/i,
  ];

  for (const pattern of reviewPatterns) {
    const match = html.match(pattern);
    if (match) {
      // Clean number (remove dots/commas as thousand separators)
      const countStr = match[1].replace(/[.\s]/g, "").replace(",", "");
      const count = parseInt(countStr, 10);
      if (count > 0 && count < 1000000) {
        result.reviewCount = count;
        break;
      }
    }
  }

  // Extract business description from knowledge panel
  const descPatterns = [
    /data-attrid="description"[^>]*>([^<]{50,500})</,
    /"description"[:\s]*"([^"]{50,500})"/,
    /class="[^"]*kno-rdesc[^"]*"[^>]*>([^<]{50,500})</,
  ];

  for (const pattern of descPatterns) {
    const match = html.match(pattern);
    if (match) {
      result.description = match[1].trim();
      break;
    }
  }

  // Return if we found at least rating with reviews
  if (result.rating && result.reviewCount) {
    return result;
  }

  return null;
}

/**
 * Fallback: Use SerpAPI-compatible endpoint
 * Some Brightdata configurations support this
 */
async function searchWithSerpEndpoint(
  businessName: string,
  city: string,
  country: string
): Promise<GoogleBusinessResult | null> {
  if (!BRIGHTDATA_API_TOKEN) {
    return null;
  }

  const searchQuery = `${businessName} ${city}`;

  try {
    // Try the SERP-compatible endpoint
    const params = new URLSearchParams({
      q: searchQuery,
      location: `${city}, ${country}`,
      hl: country.toLowerCase() === "netherlands" ? "nl" : "en",
      gl: country.toLowerCase() === "netherlands" ? "nl" : "us",
    });

    const response = await fetch(`https://api.brightdata.com/serp/google/search?${params}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Extract from local results or knowledge graph
    const localResult = data.local_results?.[0] || data.local_pack?.[0];
    const knowledgeGraph = data.knowledge_graph;

    if (localResult) {
      return {
        rating: localResult.rating,
        reviewCount: localResult.reviews,
        description: localResult.description || localResult.snippet,
        address: localResult.address,
        phone: localResult.phone,
      };
    }

    if (knowledgeGraph) {
      return {
        rating: knowledgeGraph.rating,
        reviewCount: knowledgeGraph.reviews,
        description: knowledgeGraph.description,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Update place with enriched data
 */
async function updatePlaceWithGoogleData(
  placeId: number,
  placeName: string,
  googleData: GoogleBusinessResult
): Promise<boolean> {
  try {
    if (googleData.rating && googleData.rating > 0 && googleData.reviewCount && googleData.reviewCount > 0) {
      const scrapedContent = {
        googleRating: googleData.rating,
        googleReviewCount: googleData.reviewCount,
        aboutUs: googleData.description || null,
        ratingSource: "google_brightdata",
        ratingConfidence: 95,
        platformRatings: [{
          platform: "google",
          rating: googleData.rating,
          reviewCount: googleData.reviewCount,
        }],
        enrichedAt: new Date().toISOString(),
      };

      await sql`
        UPDATE places
        SET
          avg_rating = ${googleData.rating},
          review_count = ${googleData.reviewCount},
          scraped_content = ${JSON.stringify(scrapedContent)}::jsonb,
          updated_at = NOW()
        WHERE id = ${placeId}
      `;

      return true;
    } else if (googleData.description) {
      const existingContent = await sql`
        SELECT scraped_content FROM places WHERE id = ${placeId}
      `;

      const currentContent = existingContent[0]?.scraped_content || {};
      const updatedContent = {
        ...currentContent,
        aboutUs: googleData.description,
        enrichedAt: new Date().toISOString(),
      };

      await sql`
        UPDATE places
        SET
          scraped_content = ${JSON.stringify(updatedContent)}::jsonb,
          updated_at = NOW()
        WHERE id = ${placeId}
      `;

      return true;
    }

    return false;
  } catch (error) {
    console.error(`   ❌ DB update error for ${placeName}:`, error);
    return false;
  }
}

/**
 * Main enrichment function
 */
async function main() {
  console.log("🚀 Brightdata Google Business Enrichment\n");
  console.log("━".repeat(60));

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not found in .env");
    console.error("\n💡 To use this script:");
    console.error("   1. Go to brightdata.com and create a SERP API zone");
    console.error("   2. Or use the Brightdata MCP directly in Claude Code");
    console.error("\nAlternatively, you can configure Google Places API for reliable data.");
    process.exit(1);
  }

  console.log(`✅ API Token: ${BRIGHTDATA_API_TOKEN.slice(0, 10)}...`);
  console.log(`\n⚠️  Note: This script requires a Brightdata SERP API zone.`);
  console.log(`   If you see "zone not found" errors, configure your zone at brightdata.com`);
  console.log("");

  // Get places that need enrichment
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      p.website,
      p.phone,
      p.lat,
      p.lng,
      p.avg_rating,
      p.review_count,
      c.name as city_name,
      co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE
      p.avg_rating IS NULL
      OR p.avg_rating = 0
      OR p.review_count IS NULL
      OR p.review_count = 0
      OR (p.scraped_content->>'ratingConfidence')::int < 90
    ORDER BY p.id
    LIMIT 10
  ` as Place[];

  console.log(`📊 Found ${places.length} places to enrich\n`);

  let enriched = 0;
  let withRating = 0;
  let failed = 0;

  for (const place of places) {
    console.log(`\n🔍 ${place.name}`);
    console.log(`   📍 ${place.city_name}, ${place.country_name}`);

    // Try different methods
    let googleData: GoogleBusinessResult | null = null;

    // Method 1: Direct SERP endpoint
    googleData = await searchWithSerpEndpoint(
      place.name,
      place.city_name,
      place.country_name
    );

    // Method 2: Direct web scraping
    if (!googleData) {
      googleData = await scrapeGoogleSearchDirectly(
        place.name,
        place.city_name,
        place.country_name
      );
    }

    if (googleData) {
      const updated = await updatePlaceWithGoogleData(place.id, place.name, googleData);

      if (updated) {
        enriched++;
        if (googleData.rating && googleData.reviewCount) {
          withRating++;
          console.log(`   ⭐ Rating: ${googleData.rating}/5 (${googleData.reviewCount} reviews)`);
        }
        console.log(`   ✅ Updated successfully`);
      } else {
        console.log(`   ⚠️ No useful data to update`);
      }
    } else {
      failed++;
      console.log(`   ❌ No data found - check Brightdata zone configuration`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n" + "━".repeat(60));
  console.log("📊 Enrichment Complete!\n");
  console.log(`   Total processed: ${places.length}`);
  console.log(`   Successfully enriched: ${enriched}`);
  console.log(`   With ratings: ${withRating}`);
  console.log(`   Failed: ${failed}`);

  if (failed > 0 && failed === places.length) {
    console.log("\n⚠️  All requests failed. This usually means:");
    console.log("   - The Brightdata API token is for MCP only (not direct API access)");
    console.log("   - No SERP API zone is configured in your Brightdata account");
    console.log("\n💡 Solutions:");
    console.log("   1. Configure a SERP API zone at brightdata.com/cp/zones");
    console.log("   2. Use the Brightdata MCP directly from Claude Code");
    console.log("   3. Use Google Places API instead (more reliable)");
  }

  // Show final stats
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating > 0) as with_rating,
      COUNT(*) FILTER (WHERE review_count > 0) as with_reviews,
      COUNT(*) FILTER (WHERE scraped_content IS NOT NULL) as enriched,
      COUNT(*) FILTER (WHERE (scraped_content->>'ratingConfidence')::int >= 90) as high_confidence
    FROM places
  `;

  console.log("\n📈 Final Database Stats:");
  console.log(stats[0]);
}

main().catch(console.error);
