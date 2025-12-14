/**
 * Check if reviews exist in database
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function checkReviews() {
  // Check places with reviews stored
  const withReviews = await sql`
    SELECT COUNT(*) as count
    FROM places
    WHERE scraped_content->>'googleReviews' IS NOT NULL
  `;

  // Get a sample with reviews
  const sample = await sql`
    SELECT
      p.name,
      c.name as city,
      p.scraped_content->>'googleReviews' as reviews
    FROM places p
    JOIN cities c ON p.city_id = c.id
    WHERE p.scraped_content->>'googleReviews' IS NOT NULL
    LIMIT 3
  `;

  console.log("Places with Google reviews stored:", withReviews[0].count);
  console.log("\nSample reviews:");

  for (const place of sample) {
    console.log("\n---", place.name, "(", place.city, ")");
    try {
      const reviews = JSON.parse(place.reviews as string);
      console.log(`${reviews.length} reviews:`);
      reviews.slice(0, 2).forEach((r: {text: string; rating: number; author: string}, i: number) => {
        console.log(`  ${i+1}. "${r.text?.slice(0, 100)}..." - ${r.author} (${r.rating}★)`);
      });
    } catch {
      console.log("Could not parse reviews");
    }
  }

  process.exit(0);
}

checkReviews();
