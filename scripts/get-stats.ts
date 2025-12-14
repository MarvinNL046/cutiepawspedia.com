#!/usr/bin/env npx tsx
import { db } from "../db";
import { places, blogPosts } from "../db/schema";
import { count, countDistinct, sql } from "drizzle-orm";

async function getStats() {
  // Total places by country
  const placesByCountry = await db.select({
    country: places.country,
    count: count()
  })
  .from(places)
  .groupBy(places.country);

  console.log("\n📊 CUTIEPAWSPEDIA STATS\n");
  console.log("=== Places by Country ===");
  let totalPlaces = 0;
  for (const c of placesByCountry) {
    console.log("  " + c.country + ": " + c.count.toLocaleString());
    totalPlaces += c.count;
  }
  console.log("  TOTAL: " + totalPlaces.toLocaleString());

  // Cities covered
  const cities = await db.select({
    count: countDistinct(places.city)
  }).from(places);
  console.log("\n=== Cities Covered ===");
  console.log("  " + cities[0].count + " unique cities");

  // Categories
  const categories = await db.select({
    count: countDistinct(places.category)
  }).from(places);
  console.log("\n=== Categories ===");
  console.log("  " + categories[0].count + " categories");

  // Reviews
  const placesWithReviews = await db.execute(sql`
    SELECT COUNT(*) as cnt FROM places
    WHERE scraped_content->>'googleReviews' IS NOT NULL
  `);
  console.log("\n=== Google Reviews ===");
  console.log("  " + placesWithReviews.rows[0].cnt + " places with scraped reviews");

  // Blog posts
  const posts = await db.select({ count: count() }).from(blogPosts);
  console.log("\n=== Blog Content ===");
  console.log("  " + posts[0].count + " blog posts");

  // Average rating
  const avgRating = await db.execute(sql`
    SELECT AVG(rating) as avg_rating FROM places WHERE rating IS NOT NULL
  `);
  console.log("\n=== Quality Metrics ===");
  console.log("  Average rating: " + Number(avgRating.rows[0].avg_rating).toFixed(2) + " stars");

  // Places with high review counts
  const totalReviewCount = await db.execute(sql`
    SELECT SUM(review_count) as total FROM places WHERE review_count IS NOT NULL
  `);
  console.log("  Total Google reviews indexed: " + Number(totalReviewCount.rows[0].total).toLocaleString());

  process.exit(0);
}

getStats();
