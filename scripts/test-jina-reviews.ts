/**
 * Test: Fetch Google Maps reviews via Jina AI Reader API
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function testJinaReviews() {
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

  // Google Maps URL with CID
  const mapsUrl = `https://www.google.com/maps?cid=${place.google_cid}`;
  console.log("\nGoogle Maps URL:", mapsUrl);

  // Jina Reader API
  const jinaUrl = `https://r.jina.ai/${mapsUrl}`;
  console.log("Jina URL:", jinaUrl);

  console.log("\n" + "=".repeat(60));
  console.log("Fetching via Jina Reader API...");
  console.log("=".repeat(60));

  try {
    const response = await fetch(jinaUrl, {
      headers: {
        Authorization: `Bearer ${jinaApiKey}`,
        Accept: "application/json",
        "X-Return-Format": "markdown",
      },
    });

    if (!response.ok) {
      console.log("Error:", response.status, await response.text());
      process.exit(1);
    }

    const data = await response.text();
    console.log("\nResponse length:", data.length);
    console.log("\n=== CONTENT (first 5000 chars) ===");
    console.log(data.substring(0, 5000));

    // Look for review-related content
    const lowerData = data.toLowerCase();
    if (lowerData.includes("review") || lowerData.includes("beoordeling")) {
      console.log("\n🎉 REVIEWS KEYWORD FOUND!");
    }

    if (lowerData.includes("ster") || lowerData.includes("star")) {
      console.log("⭐ STAR/RATING KEYWORD FOUND!");
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

testJinaReviews();
