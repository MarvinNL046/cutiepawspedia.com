/**
 * Check Reviews Table
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

async function checkReviewsTable() {
  // Check reviews table structure
  const cols = await sql`
    SELECT column_name, data_type FROM information_schema.columns
    WHERE table_name = 'reviews' ORDER BY ordinal_position
  `;
  console.log('=== REVIEWS TABEL KOLOMMEN ===');
  cols.forEach((c: any) => console.log(`  ${c.column_name}: ${c.data_type}`));

  // Count reviews
  const count = await sql`SELECT COUNT(*) as total FROM reviews`;
  console.log('\n=== TOTAAL REVIEWS ===', count[0].total);

  // Sample reviews
  const sample = await sql`
    SELECT r.*, p.name as place_name
    FROM reviews r
    JOIN places p ON r.place_id = p.id
    LIMIT 5
  `;
  console.log('\n=== SAMPLE REVIEWS ===');
  sample.forEach((r: any) => {
    console.log(`\nPlace: ${r.place_name}`);
    console.log(`Author: ${r.author_name}`);
    console.log(`Rating: ${r.rating} stars`);
    console.log(`Text: ${(r.text || '').substring(0, 100)}...`);
    console.log(`Source: ${r.source}`);
  });

  // Count places with reviews
  const placesWithReviews = await sql`
    SELECT COUNT(DISTINCT place_id) as count FROM reviews
  `;
  console.log('\n=== PLACES MET REVIEWS ===', placesWithReviews[0].count);

  // Distribution of reviews per place
  const distribution = await sql`
    SELECT
      COUNT(*) FILTER (WHERE review_count = 0) as zero_reviews,
      COUNT(*) FILTER (WHERE review_count BETWEEN 1 AND 5) as one_to_five,
      COUNT(*) FILTER (WHERE review_count > 5) as more_than_five
    FROM (
      SELECT place_id, COUNT(*) as review_count
      FROM reviews
      GROUP BY place_id
    ) sub
  `;
  console.log('\n=== DISTRIBUTIE ===', distribution[0]);
}

checkReviewsTable().catch(console.error);
