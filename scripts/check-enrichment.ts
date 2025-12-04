#!/usr/bin/env npx tsx
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL || "");

async function check() {
  const rows = await sql`
    SELECT id, name, avg_rating, review_count,
           scraped_content::text as scraped
    FROM places
    WHERE scraped_content IS NOT NULL
    LIMIT 5
  `;

  console.log("\n Found", rows.length, "enriched places:\n");

  for (const row of rows) {
    console.log("----------------------------");
    console.log("Place:", row.name);
    console.log("Rating:", row.avg_rating, "/ 5");

    if (row.scraped) {
      const sc = JSON.parse(row.scraped as string);
      console.log("Scraped at:", sc.scrapedAt);
      console.log("About-us length:", sc.aboutUs?.length || 0, "chars");
      console.log("Google Rating:", sc.googleRating);
      console.log("Rating source:", sc.ratingSource);
    }
  }
}

check().catch(console.error);
