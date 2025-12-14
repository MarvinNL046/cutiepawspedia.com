/**
 * Test: Fetch Google Maps reviews via BrightData Web Unlocker
 * Using undici ProxyAgent
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";
import { ProxyAgent, fetch as undiciFetch } from "undici";

async function testUnlocker() {
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

  // Google Maps URL with CID
  const mapsUrl = `https://www.google.com/maps?cid=${place.google_cid}`;
  console.log("\nGoogle Maps URL:", mapsUrl);

  console.log("\n" + "=".repeat(60));
  console.log("Testing BrightData Web Unlocker via undici ProxyAgent...");
  console.log("=".repeat(60));

  // BrightData proxy URL
  const proxyUrl = `http://brd-customer-${customerId}-zone-${zone}:${apiKey}@brd.superproxy.io:33335`;
  console.log("Proxy configured for zone:", zone);

  try {
    const proxyAgent = new ProxyAgent(proxyUrl);

    const response = await undiciFetch(mapsUrl, {
      dispatcher: proxyAgent,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
      },
    });

    console.log("\nResponse status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const html = await response.text();
    console.log("\nResponse length:", html.length);

    // Look for review-related content in HTML
    const reviewPatterns = [
      { name: "review keyword", pattern: /review/gi },
      { name: "rating keyword", pattern: /rating/gi },
      { name: "sterren (Dutch)", pattern: /sterren/gi },
      { name: "beoordeling (Dutch)", pattern: /beoordeling/gi },
      { name: "JSON review text", pattern: /"text":"([^"]{20,200})"/g },
      { name: "aria-label review", pattern: /aria-label="[^"]*review/gi },
      { name: "star rating", pattern: /\d+[.,]\d+\s*(stars?|sterren)/gi },
    ];

    console.log("\n=== PATTERN MATCHES ===");
    for (const { name, pattern } of reviewPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`${name}: ${matches.length} matches`);
        if (matches.length <= 5) {
          matches.forEach((m, i) => console.log(`  ${i + 1}. ${m.substring(0, 100)}`));
        }
      }
    }

    // Show a sample of the HTML
    console.log("\n=== HTML SAMPLE (first 5000 chars) ===");
    console.log(html.substring(0, 5000));

    // Look for structured data
    if (html.includes('"reviews"') || html.includes('"review"')) {
      console.log("\n🎉 REVIEWS DATA FOUND IN HTML!");
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
    console.log("Stack:", (error as Error).stack);
  }

  process.exit(0);
}

testUnlocker();
