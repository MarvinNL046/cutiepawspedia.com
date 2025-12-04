/**
 * Google Maps Scraper via BrightData SERP API
 *
 * Zoekt naar pet services op Google Maps en haalt ratings/reviews op.
 * Gebaseerd op de kinderopvang-project structuur.
 *
 * Vereist in .env:
 * - BRIGHTDATA_API_KEY - je Brightdata API key
 * - BRIGHTDATA_CUSTOMER_ID - je Brightdata customer ID
 *
 * Gebruik: npx tsx scripts/google-maps-scraper.ts
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

// BrightData SERP API configuratie
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_CUSTOMER_ID = process.env.BRIGHTDATA_CUSTOMER_ID;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE || "serp_api1";

// SERP API endpoint (Google Maps search)
const SERP_ENDPOINT = `https://api.brightdata.com/serp/req?customer=${BRIGHTDATA_CUSTOMER_ID}&zone=${BRIGHTDATA_SERP_ZONE}`;

interface GoogleMapsResult {
  name: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  phone?: string;
  website?: string;
  placeId?: string;
  category?: string;
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
  category_slug: string | null;
}

/**
 * Search Google Maps via BrightData SERP API
 */
async function searchGoogleMaps(
  query: string,
  location: string
): Promise<GoogleMapsResult[]> {
  if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_CUSTOMER_ID) {
    console.error("❌ BRIGHTDATA_API_KEY of BRIGHTDATA_CUSTOMER_ID niet geconfigureerd");
    return [];
  }

  try {
    // Use the SERP API with proper authentication
    const searchUrl = `https://www.google.nl/search?q=${encodeURIComponent(query + " " + location)}&tbm=lcl&hl=nl&gl=nl`;

    const response = await fetch(SERP_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: searchUrl,
        format: "json",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ SERP API error ${response.status}: ${errorText.slice(0, 200)}`);

      // Fallback: try direct Google Places dataset
      return await searchGooglePlacesDataset(query, location);
    }

    const data = await response.json();
    return parseGoogleSerpResults(data);
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Fallback: Search using Google Places Dataset API
 */
async function searchGooglePlacesDataset(
  query: string,
  location: string
): Promise<GoogleMapsResult[]> {
  try {
    const response = await fetch(
      `https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_l1vijqt9jfj7olije&include_errors=true&type=discover&discover_by=keyword`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${BRIGHTDATA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            keyword: `${query} ${location}`,
            country: "NL",
            language: "nl",
          }
        ]),
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // Dataset returns snapshot_id - would need polling for results
    // For now, return empty and rely on SERP
    console.log(`   ℹ️ Dataset triggered, snapshot: ${data.snapshot_id}`);
    return [];
  } catch (error) {
    return [];
  }
}

/**
 * Parse Google SERP results to extract business data
 */
function parseGoogleSerpResults(data: Record<string, unknown>): GoogleMapsResult[] {
  const results: GoogleMapsResult[] = [];

  // Try different result formats (local_results, local_pack, places)
  const localResults = (data.local_results || data.local_pack || data.places || []) as Record<string, unknown>[];

  for (const result of localResults) {
    if (typeof result !== "object" || !result) continue;

    const rating = parseFloat(String(result.rating || 0));
    const reviewCount = parseInt(String(result.reviews || result.review_count || 0), 10);

    if (rating > 0 || reviewCount > 0) {
      results.push({
        name: String(result.title || result.name || ""),
        rating: rating > 0 ? rating : undefined,
        reviewCount: reviewCount > 0 ? reviewCount : undefined,
        address: String(result.address || ""),
        phone: String(result.phone || ""),
        website: String(result.website || result.link || ""),
        placeId: String(result.place_id || ""),
        category: String(result.type || result.category || ""),
      });
    }
  }

  // Also check knowledge_graph
  const kg = data.knowledge_graph as Record<string, unknown> | undefined;
  if (kg && typeof kg === "object") {
    const rating = parseFloat(String(kg.rating || 0));
    const reviewCount = parseInt(String(kg.reviews || 0), 10);

    if (rating > 0 || reviewCount > 0) {
      results.push({
        name: String(kg.title || kg.name || ""),
        rating: rating > 0 ? rating : undefined,
        reviewCount: reviewCount > 0 ? reviewCount : undefined,
        address: String(kg.address || ""),
        phone: String(kg.phone || ""),
        website: String(kg.website || ""),
      });
    }
  }

  return results;
}

/**
 * Match Google result to place by name similarity
 */
function matchPlaceToResult(
  place: Place,
  results: GoogleMapsResult[]
): GoogleMapsResult | null {
  const placeName = place.name.toLowerCase().trim();

  for (const result of results) {
    const resultName = result.name.toLowerCase().trim();

    // Exact match
    if (placeName === resultName) {
      return result;
    }

    // Contains match (one contains the other)
    if (placeName.includes(resultName) || resultName.includes(placeName)) {
      return result;
    }

    // Fuzzy match (80% of words match)
    const placeWords = placeName.split(/\s+/);
    const resultWords = resultName.split(/\s+/);
    const matchingWords = placeWords.filter(w =>
      resultWords.some(rw => rw.includes(w) || w.includes(rw))
    );

    if (matchingWords.length >= placeWords.length * 0.6) {
      return result;
    }
  }

  return null;
}

/**
 * Update place with Google Maps data
 */
async function updatePlaceWithGoogleData(
  placeId: number,
  placeName: string,
  googleData: GoogleMapsResult
): Promise<boolean> {
  try {
    if (googleData.rating && googleData.rating > 0 && googleData.reviewCount && googleData.reviewCount > 0) {
      const scrapedContent = {
        googleRating: googleData.rating,
        googleReviewCount: googleData.reviewCount,
        ratingSource: "google_maps_brightdata_serp",
        ratingConfidence: 95,
        platformRatings: [{
          platform: "google",
          rating: googleData.rating,
          reviewCount: googleData.reviewCount,
        }],
        googleAddress: googleData.address || null,
        googlePhone: googleData.phone || null,
        googlePlaceId: googleData.placeId || null,
        enrichedAt: new Date().toISOString(),
      };

      await sql`
        UPDATE places
        SET
          avg_rating = ${googleData.rating},
          review_count = ${googleData.reviewCount},
          scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedContent)}::jsonb,
          updated_at = NOW()
        WHERE id = ${placeId}
      `;

      return true;
    }

    return false;
  } catch (error) {
    console.error(`   ❌ DB error voor ${placeName}:`, error);
    return false;
  }
}

/**
 * Main function - scrape Google Maps for all places
 */
async function main() {
  console.log("🗺️  Google Maps Scraper via BrightData SERP API\n");
  console.log("━".repeat(60));

  // Check credentials
  if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_CUSTOMER_ID) {
    console.error("❌ BrightData credentials ontbreken!\n");
    console.error("Voeg toe aan .env:");
    console.error("  BRIGHTDATA_API_KEY=jouw_api_key");
    console.error("  BRIGHTDATA_CUSTOMER_ID=jouw_customer_id");
    console.error("\nJe vindt deze op: brightdata.com/cp/zones");
    console.error("Maak een SERP API zone aan als je die nog niet hebt.\n");
    process.exit(1);
  }

  console.log(`✅ API Key: ${BRIGHTDATA_API_KEY.slice(0, 10)}...`);
  console.log(`✅ Customer ID: ${BRIGHTDATA_CUSTOMER_ID.slice(0, 10)}...`);
  console.log("");

  // Get unique cities with places that need enrichment
  const cities = await sql`
    SELECT DISTINCT
      c.name as city_name,
      co.name as country_name,
      COUNT(p.id) as place_count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE
      p.avg_rating IS NULL
      OR p.avg_rating = 0
      OR p.review_count IS NULL
      OR p.review_count = 0
    GROUP BY c.name, co.name
    ORDER BY place_count DESC
    LIMIT 5
  `;

  console.log(`📍 ${cities.length} steden met places die enrichment nodig hebben\n`);

  let totalEnriched = 0;
  let totalFailed = 0;

  for (const city of cities) {
    console.log(`\n🏙️  ${city.city_name}, ${city.country_name} (${city.place_count} places)`);
    console.log("─".repeat(50));

    // Get places in this city that need enrichment
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
        co.name as country_name,
        cat.slug as category_slug
      FROM places p
      JOIN cities c ON p.city_id = c.id
      JOIN countries co ON c.country_id = co.id
      LEFT JOIN place_categories pc ON p.id = pc.place_id
      LEFT JOIN categories cat ON pc.category_id = cat.id
      WHERE
        c.name = ${city.city_name}
        AND (
          p.avg_rating IS NULL
          OR p.avg_rating = 0
          OR p.review_count IS NULL
          OR p.review_count = 0
        )
      LIMIT 10
    ` as Place[];

    // Group places by category for more efficient searching
    const categorizedPlaces = new Map<string, Place[]>();
    for (const place of places) {
      const category = place.category_slug || "general";
      if (!categorizedPlaces.has(category)) {
        categorizedPlaces.set(category, []);
      }
      categorizedPlaces.get(category)!.push(place);
    }

    // Search for each category in this city
    for (const [category, categoryPlaces] of categorizedPlaces) {
      const searchTerm = getCategorySearchTerm(category);
      const query = `${searchTerm} ${city.city_name}`;

      console.log(`\n   🔍 Zoeken: "${query}"`);

      const results = await searchGoogleMaps(query, `${city.city_name}, ${city.country_name}`);
      console.log(`   📊 ${results.length} resultaten gevonden`);

      // Match and update places
      for (const place of categoryPlaces) {
        console.log(`   → ${place.name}`);

        // First try exact search for this place
        const placeResults = await searchGoogleMaps(
          `${place.name} ${city.city_name}`,
          `${city.city_name}, ${city.country_name}`
        );

        const match = matchPlaceToResult(place, [...placeResults, ...results]);

        if (match && match.rating && match.reviewCount) {
          const updated = await updatePlaceWithGoogleData(place.id, place.name, match);
          if (updated) {
            totalEnriched++;
            console.log(`     ⭐ ${match.rating}/5 (${match.reviewCount} reviews)`);
          }
        } else {
          totalFailed++;
          console.log(`     ❌ Geen match gevonden`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  console.log("\n" + "━".repeat(60));
  console.log("📊 Scraping Voltooid!\n");
  console.log(`   Totaal verrijkt: ${totalEnriched}`);
  console.log(`   Geen data: ${totalFailed}`);

  // Final stats
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE avg_rating > 0) as with_rating,
      COUNT(*) FILTER (WHERE review_count > 0) as with_reviews,
      COUNT(*) FILTER (WHERE scraped_content IS NOT NULL) as enriched
    FROM places
  `;

  console.log("\n📈 Database Stats:");
  console.log(stats[0]);
}

/**
 * Convert category slug to Dutch search term
 */
function getCategorySearchTerm(category: string): string {
  const categoryMap: Record<string, string> = {
    "veterinary": "dierenarts",
    "vet": "dierenarts",
    "grooming": "trimsalon hond",
    "pet-grooming": "trimsalon",
    "pet-store": "dierenwinkel",
    "pet-shops": "dierenwinkel",
    "pet-hotel": "dierenpension",
    "pet-boarding": "dierenpension",
    "dog-training": "hondentraining",
    "pet-training": "hondentraining",
    "dog-walking": "hondenuitlaatservice",
    "pet-sitting": "oppas huisdieren",
    "pet-daycare": "hondencreche",
    "general": "huisdieren service",
  };

  return categoryMap[category] || "huisdieren service";
}

main().catch(console.error);
