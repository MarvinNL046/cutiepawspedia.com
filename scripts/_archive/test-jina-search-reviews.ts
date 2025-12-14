/**
 * Test: Fetch Google Maps reviews via Jina AI Search API (s.jina.ai)
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function testJinaSearchReviews() {
  const jinaApiKey = process.env.JINA_API_KEY;

  if (!jinaApiKey) {
    console.error("JINA_API_KEY not set");
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

  // Search for reviews using Jina Search API
  const searchQuery = `${place.name} ${place.city_name} Google reviews`;
  const jinaSearchUrl = `https://s.jina.ai/${encodeURIComponent(searchQuery)}`;

  console.log("\nSearch query:", searchQuery);
  console.log("Jina Search URL:", jinaSearchUrl);

  console.log("\n" + "=".repeat(60));
  console.log("Fetching via Jina Search API (s.jina.ai)...");
  console.log("=".repeat(60));

  try {
    const response = await fetch(jinaSearchUrl, {
      headers: {
        Authorization: `Bearer ${jinaApiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error:", response.status, await response.text());
      process.exit(1);
    }

    const text = await response.text();
    console.log("\nResponse length:", text.length);

    // Try to parse as JSON
    try {
      const data = JSON.parse(text);
      console.log("\n=== PARSED JSON ===");
      console.log("Keys:", Object.keys(data));

      if (data.data && Array.isArray(data.data)) {
        console.log("\nNumber of results:", data.data.length);

        for (let i = 0; i < Math.min(3, data.data.length); i++) {
          const result = data.data[i];
          console.log(`\n--- Result ${i + 1} ---`);
          console.log("Title:", result.title);
          console.log("URL:", result.url);
          console.log("Description:", result.description?.substring(0, 200));
          if (result.content) {
            console.log("Content preview:", result.content.substring(0, 500));
          }
        }
      } else {
        console.log("\nFull data:", JSON.stringify(data, null, 2).substring(0, 3000));
      }
    } catch {
      // Not JSON, show as text
      console.log("\n=== TEXT RESPONSE ===");
      console.log(text.substring(0, 5000));
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

testJinaSearchReviews();
