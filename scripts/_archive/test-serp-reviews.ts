/**
 * Test: Fetch reviews via BrightData SERP API using CID
 *
 * Google Maps URL format: https://www.google.com/maps?cid=XXXXXXXXX
 * This should return place details including reviews
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

const CONFIG = {
  serpApiUrl: "https://api.brightdata.com/request",
  serpZone: "serp_cutiepaws",
};

async function testSerpReviews() {
  const apiKey = process.env.BRIGHTDATA_API_KEY;

  if (!apiKey) {
    console.error("BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  // Get a place with CID from DB
  const sql = neon(process.env.DATABASE_URL!);
  const places = await sql`
    SELECT id, name, google_cid
    FROM places
    WHERE google_cid IS NOT NULL
    LIMIT 1
  `;

  if (places.length === 0) {
    console.error("No places with CID found");
    process.exit(1);
  }

  const place = places[0];
  console.log("Testing with:", place.name);
  console.log("CID:", place.google_cid);

  // Try different URL formats
  const urls = [
    // Format 1: Direct CID URL
    `https://www.google.com/maps?cid=${place.google_cid}`,
    // Format 2: Search with CID in data parameter
    `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.google_cid}`,
    // Format 3: Place URL (might work)
    `https://www.google.com/maps/place/?q=place_id:${place.google_cid}`,
  ];

  for (const url of urls) {
    console.log("\n" + "=".repeat(60));
    console.log("Testing URL:", url);
    console.log("=".repeat(60));

    try {
      const response = await fetch(CONFIG.serpApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          zone: CONFIG.serpZone,
          url: url,
          format: "json",
        }),
      });

      if (!response.ok) {
        console.log("Error:", response.status, await response.text());
        continue;
      }

      const data = await response.json();

      // Check what we got back
      console.log("\nResponse keys:", Object.keys(data));

      if (data.body) {
        let parsed;
        if (typeof data.body === "string") {
          try {
            parsed = JSON.parse(data.body);
          } catch {
            console.log("Body is not JSON, length:", data.body.length);
            console.log("First 500 chars:", data.body.substring(0, 500));
            continue;
          }
        } else {
          parsed = data.body;
        }

        console.log("\nParsed body keys:", Object.keys(parsed));

        // Look for reviews
        if (parsed.reviews) {
          console.log("\n🎉 REVIEWS FOUND!");
          console.log("Number of reviews:", parsed.reviews.length);
          console.log("\nFirst review:", JSON.stringify(parsed.reviews[0], null, 2));
        }

        // Look for place info
        if (parsed.place_info || parsed.place || parsed.local_results) {
          console.log("\n📍 Place info found!");
          console.log(JSON.stringify(parsed.place_info || parsed.place || parsed.local_results, null, 2).substring(0, 1000));
        }

        // Show all top-level data
        for (const key of Object.keys(parsed)) {
          const value = parsed[key];
          if (Array.isArray(value)) {
            console.log(`\n${key}: Array with ${value.length} items`);
            if (value.length > 0 && key !== "reviews") {
              console.log("First item:", JSON.stringify(value[0], null, 2).substring(0, 500));
            }
          } else if (typeof value === "object" && value !== null) {
            console.log(`\n${key}: Object with keys:`, Object.keys(value));
          } else {
            console.log(`\n${key}:`, value);
          }
        }
      }

    } catch (error) {
      console.log("Error:", (error as Error).message);
    }
  }

  process.exit(0);
}

testSerpReviews();
