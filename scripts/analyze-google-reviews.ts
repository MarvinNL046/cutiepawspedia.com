/**
 * Analyze Google Reviews in scraped_content
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function analyzeGoogleReviews() {
  // Count places with googleReviews
  const count = await sql`
    SELECT COUNT(*) as total
    FROM places
    WHERE scraped_content ? 'googleReviews'
  `;
  console.log("=== PLACES MET googleReviews KEY ===", count[0].total);

  // Show the reviews
  const withReviews = await sql`
    SELECT id, name,
           scraped_content->'googleReviews' as google_reviews
    FROM places
    WHERE scraped_content ? 'googleReviews'
    LIMIT 5
  `;

  console.log("\n=== DETAIL VAN GOOGLE REVIEWS ===");
  withReviews.forEach((p: any) => {
    console.log(`\n📍 ${p.name} (ID: ${p.id})`);
    const reviews = p.google_reviews;
    if (Array.isArray(reviews)) {
      console.log(`   Aantal reviews: ${reviews.length}`);
      reviews.slice(0, 3).forEach((r: any, i: number) => {
        console.log(`   Review ${i + 1}: ${r.rating}⭐ by ${r.author}`);
        const text = r.text || "";
        console.log(`   "${text.substring(0, 80)}..."`);
      });
    } else {
      console.log("   Reviews:", JSON.stringify(reviews, null, 2));
    }
  });

  // Check junk categories (review text stored as category)
  console.log("\n\n=== JUNK CATEGORIES (review text als category) ===");
  const junkCategories = await sql`
    SELECT id, name, scraped_content->>'category' as junk_category
    FROM places
    WHERE LENGTH(scraped_content->>'category') > 50
       OR scraped_content->>'category' LIKE '%...%'
       OR scraped_content->>'category' LIKE '%recensie%'
       OR scraped_content->>'category' LIKE '%review%'
    LIMIT 10
  `;
  console.log("Junk gevonden:", junkCategories.length);
  junkCategories.forEach((p: any) => {
    console.log(`\n   ID ${p.id}: ${p.name}`);
    console.log(`   Junk: "${(p.junk_category || "").substring(0, 60)}..."`);
  });

  // Total junk count
  const totalJunk = await sql`
    SELECT COUNT(*) as total
    FROM places
    WHERE LENGTH(scraped_content->>'category') > 50
       OR scraped_content->>'category' LIKE '%...%'
  `;
  console.log("\n=== TOTAAL JUNK CATEGORIES ===", totalJunk[0].total);

  // Incomplete places (rating but no website/hours)
  const incomplete = await sql`
    SELECT COUNT(*) as total
    FROM places
    WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
  `;
  console.log("\n=== INCOMPLETE PLACES ===", incomplete[0].total);
  console.log("(Hebben rating maar missen website of opening hours)");
}

analyzeGoogleReviews().catch(console.error);
