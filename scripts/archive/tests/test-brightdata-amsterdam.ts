/**
 * Quick Brightdata SERP test for Amsterdam places
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);
const BRIGHTDATA_API_TOKEN = process.env.BRIGHTDATA_API_TOKEN;

interface GoogleBusinessResult {
  rating?: number;
  reviewCount?: number;
  description?: string;
  openingHours?: Record<string, string>;
  phone?: string;
}

// Method 1: Google Places Dataset API (async - triggers job, returns snapshot_id)
const GOOGLE_PLACES_DATASET_ID = "gd_l1vijqt9jfj7olije";

async function searchWithDatasetAPI(
  businessName: string,
  city: string,
  country: string
): Promise<GoogleBusinessResult | null> {
  const searchQuery = `${businessName} ${city} ${country}`;

  try {
    // Trigger the dataset scrape
    const response = await fetch(
      "https://api.brightdata.com/datasets/v3/trigger?dataset_id=" + GOOGLE_PLACES_DATASET_ID + "&include_errors=true&type=discover_new&discover_by=keyword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
        },
        body: JSON.stringify([
          {
            keyword: searchQuery,
            country: "NL",
            language: "nl",
          },
        ]),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.log(`   ❌ Dataset API: ${response.status} - ${err.slice(0, 200)}`);
      return null;
    }

    const data = await response.json();
    console.log(`   📦 Snapshot: ${data.snapshot_id}`);

    // Wait for results (poll every 5 seconds, max 60 seconds)
    const snapshotId = data.snapshot_id;
    let attempts = 0;
    const maxAttempts = 12;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 5000));
      attempts++;

      const statusRes = await fetch(
        `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
        {
          headers: { Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}` },
        }
      );

      if (statusRes.status === 200) {
        const results = await statusRes.json();
        if (Array.isArray(results) && results.length > 0) {
          const place = results[0];
          return {
            rating: place.rating,
            reviewCount: place.reviews_cnt || place.reviews,
            description: place.description || place.about,
          };
        }
      } else if (statusRes.status === 202) {
        console.log(`   ⏳ Still processing (${attempts}/${maxAttempts})...`);
      } else {
        const err = await statusRes.text();
        console.log(`   ❌ Status check: ${statusRes.status} - ${err.slice(0,100)}`);
        break;
      }
    }

    return null;
  } catch (error) {
    console.log(`   ❌ Error: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

// Method 2: SERP API with JSON format (structured data!)
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE || "kinderopvang";

async function searchWithSerpApi(
  businessName: string,
  city: string,
  country: string
): Promise<GoogleBusinessResult | null> {
  const searchQuery = `${businessName} ${city} ${country}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&hl=nl`;

  try {
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        zone: BRIGHTDATA_SERP_ZONE,
        url: googleUrl,
        format: "json",  // Structured data!
        country: "nl",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(`   ❌ SERP API: ${response.status} - ${err.slice(0, 150)}`);
      return null;
    }

    const responseData = await response.json();

    // Handle wrapped response (status_code, headers, body)
    let data = responseData;
    if (responseData.body) {
      // If body is a string, try to parse it
      if (typeof responseData.body === "string") {
        try {
          data = JSON.parse(responseData.body);
        } catch {
          // Body is HTML, return null to use fallback
          console.log(`   📦 Body is HTML, using fallback...`);
          return null;
        }
      } else {
        data = responseData.body;
      }
    }

    // Extract from structured SERP results
    const localResult = data.local_results?.[0] || data.local_pack?.[0];
    const knowledgeGraph = data.knowledge_graph;

    if (localResult) {
      console.log(`   📍 Found in local_results`);
      return {
        rating: localResult.rating,
        reviewCount: localResult.reviews || localResult.reviews_count,
        description: localResult.description || localResult.snippet,
      };
    }

    if (knowledgeGraph) {
      console.log(`   📍 Found in knowledge_graph`);
      return {
        rating: knowledgeGraph.rating,
        reviewCount: knowledgeGraph.reviews || knowledgeGraph.reviews_count,
        description: knowledgeGraph.description,
      };
    }

    // Check organic results for business info
    const organicResults = data.organic_results || data.organic;
    if (organicResults?.[0]) {
      const first = organicResults[0];
      if (first.rating) {
        console.log(`   📍 Found in organic_results`);
        return {
          rating: first.rating,
          reviewCount: first.reviews || first.reviews_count,
          description: first.snippet || first.description,
        };
      }
    }

    // Log what we got for debugging
    console.log(`   📦 Response keys: ${Object.keys(data).join(", ")}`);

    return null;
  } catch (error) {
    console.log(`   ❌ Error: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

// Fallback: Web Unlocker with HTML parsing
const BRIGHTDATA_ZONE = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

async function searchWithWebUnlocker(
  businessName: string,
  city: string,
  country: string
): Promise<GoogleBusinessResult | null> {
  const searchQuery = `${businessName} ${city} ${country}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&hl=nl`;

  try {
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        zone: BRIGHTDATA_ZONE,
        url: googleUrl,
        format: "raw",
        country: "nl",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(`   ❌ Web Unlocker: ${response.status} - ${err.slice(0, 150)}`);
      return null;
    }

    const html = await response.text();
    return parseGoogleHtml(html);
  } catch (error) {
    console.log(`   ❌ Error: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

function parseGoogleHtml(html: string): GoogleBusinessResult | null {
  const result: GoogleBusinessResult = {};

  // Rating patterns
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

  // Review count patterns
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

  // Phone number patterns
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

  // Opening hours patterns - look for structured data or common patterns
  const hoursPatterns = [
    // Schema.org opening hours
    /"openingHours"[:\s]*\[([^\]]+)\]/i,
    /"openingHoursSpecification"[:\s]*\[([^\]]+)\]/i,
    // Common day patterns in Dutch/English
    /(ma|mo)[a-z]*[:\s]+(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/gi,
  ];

  // Try to extract structured opening hours
  const schemaMatch = html.match(/"openingHoursSpecification"[:\s]*(\[[^\]]+\])/i);
  if (schemaMatch) {
    try {
      const hoursData = JSON.parse(schemaMatch[1]);
      const hours: Record<string, string> = {};
      const dayMap: Record<string, string> = {
        Monday: "mon", Tuesday: "tue", Wednesday: "wed",
        Thursday: "thu", Friday: "fri", Saturday: "sat", Sunday: "sun",
        Maandag: "mon", Dinsdag: "tue", Woensdag: "wed",
        Donderdag: "thu", Vrijdag: "fri", Zaterdag: "sat", Zondag: "sun",
      };

      for (const spec of hoursData) {
        if (spec.dayOfWeek && spec.opens && spec.closes) {
          const days = Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek];
          for (const day of days) {
            const dayName = day.replace("https://schema.org/", "").replace("http://schema.org/", "");
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
      // JSON parse failed, try other methods
    }
  }

  if (result.rating) {
    return result;
  }

  return null;
}

async function main() {
  console.log("🚀 Brightdata SERP Test - Amsterdam (10 places)\n");

  if (!BRIGHTDATA_API_TOKEN) {
    console.error("❌ BRIGHTDATA_API_TOKEN not set");
    process.exit(1);
  }

  const places = await sql`
    SELECT p.id, p.name, p.address, c.name as city_name, co.name as country_name
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE c.name = 'Amsterdam'
      AND (p.avg_rating IS NULL OR p.avg_rating = 0 OR p.review_count IS NULL OR p.review_count = 0)
    ORDER BY p.id
    LIMIT 10
  `;

  console.log(`📊 Testing ${places.length} Amsterdam places\n`);

  let success = 0;
  let failed = 0;

  for (const place of places) {
    console.log(`🔍 ${place.name}`);

    // Try SERP API first (structured JSON), then Web Unlocker as fallback
    let data = await searchWithSerpApi(
      place.name,
      place.city_name,
      place.country_name
    );

    if (!data) {
      console.log(`   🔄 Trying Web Unlocker fallback...`);
      data = await searchWithWebUnlocker(
        place.name,
        place.city_name,
        place.country_name
      );
    }

    if (data && data.rating) {
      console.log(`   ⭐ ${data.rating}/5 (${data.reviewCount || 0} reviews)`);
      if (data.phone) console.log(`   📞 ${data.phone}`);
      if (data.openingHours) console.log(`   🕐 Opening hours: ${Object.keys(data.openingHours).length} days`);
      if (data.description) console.log(`   📝 ${data.description.slice(0, 60)}...`);

      // Build scraped content with all available data
      const scrapedContent = {
        googleRating: data.rating,
        googleReviewCount: data.reviewCount || 0,
        aboutUs: data.description || null,
        ratingSource: "google_brightdata_serp",
        ratingConfidence: 95,
        enrichedAt: new Date().toISOString(),
      };

      // Build quality flags based on what data we found
      const flags: string[] = ["RATING_VIA_GOOGLE", "ENRICHMENT_COMPLETE"];
      if (data.openingHours && Object.keys(data.openingHours).length >= 5) {
        flags.push("OPENING_HOURS_VIA_SCHEMA");
      }

      const newFlags = JSON.stringify(flags);

      // Update with all enriched data
      await sql`
        UPDATE places SET
          avg_rating = ${data.rating},
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
        WHERE id = ${place.id}
      `;

      console.log(`   ✅ Saved!`);
      success++;
    } else {
      console.log(`   ⚠️ No rating data found`);
      failed++;
    }

    // Rate limit
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Success: ${success} | ❌ Failed: ${failed}`);
}

main().catch(console.error);
