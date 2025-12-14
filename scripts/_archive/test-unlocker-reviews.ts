/**
 * Test: Fetch Google Maps reviews via BrightData Web Unlocker
 * Using the mcp_unlocker zone
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function testUnlockerReviews() {
  const customerId = process.env.BRIGHTDATA_CUSTOMER_ID;
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  const zone = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

  if (!customerId || !apiKey) {
    console.error("BRIGHTDATA_CUSTOMER_ID or BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  // Get a place with CID from DB
  const sql = neon(process.env.DATABASE_URL!);
  const places = await sql`
    SELECT p.id, p.name, p.google_cid, ci.name as city_name
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    WHERE p.google_cid IS NOT NULL
    LIMIT 1
  `;

  if (places.length === 0) {
    console.error("No places with CID found");
    process.exit(1);
  }

  const place = places[0];
  console.log("Testing with:", place.name);
  console.log("City:", place.city_name);
  console.log("CID:", place.google_cid);
  console.log("Zone:", zone);

  // Google Maps URL with CID - this should load the place page with reviews
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:ChIJ&cid=${place.google_cid}`;

  // Alternative: Direct search URL that shows reviews
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(place.name + " " + place.city_name)}`;

  console.log("\n" + "=".repeat(60));
  console.log("Testing BrightData Web Unlocker...");
  console.log("URL:", searchUrl);
  console.log("=".repeat(60));

  // BrightData Web Unlocker proxy
  const proxyUrl = `https://brd-customer-${customerId}-zone-${zone}:${apiKey}@brd.superproxy.io:33335`;

  try {
    // Use fetch with proxy via environment or direct request
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN}`,
      },
      body: JSON.stringify({
        zone: zone,
        url: searchUrl,
        format: "raw", // Get raw HTML
      }),
    });

    if (!response.ok) {
      console.log("Error:", response.status, await response.text());
      process.exit(1);
    }

    const html = await response.text();
    console.log("\nResponse length:", html.length);

    // Look for review-related content in HTML
    const reviewPatterns = [
      /review/gi,
      /rating/gi,
      /sterren/gi,
      /beoordeling/gi,
      /"text":"([^"]{20,200})"/g, // JSON embedded review text
      /aria-label="[^"]*review/gi,
    ];

    console.log("\n=== PATTERN MATCHES ===");
    for (const pattern of reviewPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`${pattern}: ${matches.length} matches`);
        if (matches.length <= 5) {
          matches.forEach((m, i) => console.log(`  ${i + 1}. ${m.substring(0, 100)}`));
        }
      }
    }

    // Show a sample of the HTML
    console.log("\n=== HTML SAMPLE (first 3000 chars) ===");
    console.log(html.substring(0, 3000));

    // Look for structured data
    if (html.includes('"reviews"') || html.includes('"review"')) {
      console.log("\n🎉 REVIEWS DATA FOUND IN HTML!");
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

testUnlockerReviews();
