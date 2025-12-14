/**
 * Test: Fetch reviews via BrightData SERP API using CID
 * Now with brd_json=1 parameter for parsing
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

const CONFIG = {
  serpApiUrl: "https://api.brightdata.com/request",
  serpZone: "serp_cutiepaws",
};

async function testSerpReviews() {
  const apiKey = process.env.BRIGHTDATA_API_TOKEN;

  if (!apiKey) {
    console.error("BRIGHTDATA_API_TOKEN not set");
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

  // Try with brd_json=1 for parsing
  const urls = [
    // Format 1: Direct CID URL with brd_json
    `https://www.google.com/maps?cid=${place.google_cid}&brd_json=1`,
    // Format 2: Google Maps place reviews URL
    `https://www.google.com/maps/place/?data=!4m5!3m4!1s0x0:0x${BigInt(place.google_cid).toString(16)}!8m2!3d0!4d0&brd_json=1`,
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
            console.log("First 1000 chars:", data.body.substring(0, 1000));
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
          if (parsed.reviews.length > 0) {
            console.log("\nFirst review:", JSON.stringify(parsed.reviews[0], null, 2));
          }
        }

        // Look for place info
        const placeInfo = parsed.place_info || parsed.place || parsed.local_results || parsed.knowledge_graph;
        if (placeInfo) {
          console.log("\n📍 Place info found!");
          console.log(JSON.stringify(placeInfo, null, 2).substring(0, 2000));
        }

        // Show all top-level data keys
        console.log("\n--- All top-level keys ---");
        for (const key of Object.keys(parsed)) {
          const value = parsed[key];
          if (Array.isArray(value)) {
            console.log(`${key}: Array[${value.length}]`);
          } else if (typeof value === "object" && value !== null) {
            console.log(`${key}: Object{${Object.keys(value).join(", ")}}`);
          } else {
            console.log(`${key}: ${typeof value}`);
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
