/**
 * Test: Fetch reviews via BrightData SERP API
 * Using Google Search for reviews URL format
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

  // Try Google Search for reviews (this is what SERP API is good at)
  // Format: search for the business name + reviews
  const searchQuery = encodeURIComponent(place.name + " " + place.city_name + " reviews");
  const url = `https://www.google.com/search?q=${searchQuery}&tbm=lcl&brd_json=1`;

  console.log("\n" + "=".repeat(60));
  console.log("Testing Google Local Search for reviews");
  console.log("URL:", url);
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
      process.exit(1);
    }

    const data = await response.json();
    console.log("\nResponse keys:", Object.keys(data));

    if (data.body) {
      let parsed;
      if (typeof data.body === "string") {
        try {
          parsed = JSON.parse(data.body);
          console.log("\nParsed body successfully!");
        } catch {
          console.log("Body is not JSON, length:", data.body.length);
          console.log("Body content:", data.body.substring(0, 2000));
          process.exit(1);
        }
      } else {
        parsed = data.body;
      }

      console.log("\n=== PARSED DATA ===");
      console.log("Keys:", Object.keys(parsed));

      // Check for snack_pack (local results with reviews)
      if (parsed.snack_pack && parsed.snack_pack.length > 0) {
        console.log("\n🎉 SNACK PACK FOUND!");
        console.log("Number of results:", parsed.snack_pack.length);

        for (const result of parsed.snack_pack) {
          console.log("\n--- Result ---");
          console.log("Name:", result.name || result.title);
          console.log("Rating:", result.rating);
          console.log("Reviews count:", result.reviews || result.reviews_count);
          console.log("CID:", result.cid);

          if (result.reviews_list || result.reviews) {
            console.log("🎉 REVIEWS LIST FOUND!");
            console.log(JSON.stringify(result.reviews_list || result.reviews, null, 2).substring(0, 1000));
          }
        }
      }

      // Check for local_results
      if (parsed.local_results && parsed.local_results.length > 0) {
        console.log("\n🎉 LOCAL RESULTS FOUND!");
        for (const result of parsed.local_results) {
          console.log("\n--- Result ---");
          console.log("Name:", result.name || result.title);
          console.log("Rating:", result.rating);
          console.log("Reviews:", result.reviews);
          console.log("Full data:", JSON.stringify(result, null, 2).substring(0, 1500));
        }
      }

      // Check for knowledge_graph (sometimes has reviews)
      if (parsed.knowledge_graph) {
        console.log("\n📍 KNOWLEDGE GRAPH FOUND!");
        console.log(JSON.stringify(parsed.knowledge_graph, null, 2).substring(0, 2000));
      }

      // Print all keys and their types
      console.log("\n=== ALL DATA KEYS ===");
      for (const key of Object.keys(parsed)) {
        const val = parsed[key];
        if (Array.isArray(val)) {
          console.log(`${key}: Array[${val.length}]`);
        } else if (typeof val === "object" && val !== null) {
          console.log(`${key}: Object{${Object.keys(val).slice(0, 5).join(", ")}...}`);
        } else {
          console.log(`${key}: ${typeof val} = ${String(val).substring(0, 50)}`);
        }
      }

    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

testSerpReviews();
