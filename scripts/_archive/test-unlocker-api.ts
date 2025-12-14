/**
 * Test: Fetch Google Maps data via BrightData Web Unlocker API
 * Using the /request endpoint with format: "raw"
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function testUnlockerApi() {
  const apiToken = process.env.BRIGHTDATA_API_TOKEN;
  const zone = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

  if (!apiToken) {
    console.error("BRIGHTDATA_API_TOKEN not set");
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
  console.log("Testing BrightData Web Unlocker via API endpoint...");
  console.log("=".repeat(60));

  try {
    const response = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        zone: zone,
        url: mapsUrl,
        format: "raw",
      }),
    });

    console.log("\nResponse status:", response.status);

    if (!response.ok) {
      console.log("Error:", await response.text());
      process.exit(1);
    }

    const html = await response.text();
    console.log("Response length:", html.length);

    // Extract meta tags info
    const metaPatterns = [
      { name: "og:title", pattern: /property="og:title"\s*content="([^"]+)"/ },
      { name: "og:description", pattern: /property="og:description"\s*content="([^"]+)"/ },
      { name: "name (itemprop)", pattern: /itemprop="name"\s*content="([^"]+)"/ },
      { name: "description (itemprop)", pattern: /itemprop="description"\s*content="([^"]+)"/ },
    ];

    console.log("\n=== META TAGS ===");
    for (const { name, pattern } of metaPatterns) {
      const match = html.match(pattern);
      if (match) {
        console.log(`${name}: ${match[1]}`);
      }
    }

    // Look for review-related content
    const reviewPatterns = [
      { name: "review keyword", pattern: /review/gi },
      { name: "beoordeling (Dutch)", pattern: /beoordeling/gi },
      { name: "sterren (Dutch)", pattern: /sterren/gi },
    ];

    console.log("\n=== PATTERN MATCHES ===");
    for (const { name, pattern } of reviewPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`${name}: ${matches.length} matches`);
      }
    }

    // Look for JSON data in the page (Google often embeds data this way)
    // Pattern for review text in JSON
    const jsonReviewPattern = /"text":"([^"]{20,300})"/g;
    const jsonMatches = html.matchAll(jsonReviewPattern);
    const reviews = [...jsonMatches];

    if (reviews.length > 0) {
      console.log("\n🎉 POTENTIAL REVIEW TEXTS FOUND!");
      console.log(`Found ${reviews.length} matches`);
      reviews.slice(0, 5).forEach((m, i) => {
        console.log(`\n${i + 1}. "${m[1].slice(0, 150)}..."`);
      });
    }

    // Show part of HTML around "review" keyword
    const reviewIndex = html.toLowerCase().indexOf("review");
    if (reviewIndex !== -1) {
      console.log("\n=== CONTEXT AROUND 'review' ===");
      const context = html.slice(Math.max(0, reviewIndex - 100), reviewIndex + 300);
      console.log(context);
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

testUnlockerApi();
