#!/usr/bin/env npx tsx
/**
 * Migration: Add scraped_content column to places table
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log("Checking scraped_content column...");

  // Check if column exists
  const check = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'places' AND column_name = 'scraped_content'
  `;

  if (check.length === 0) {
    console.log("Adding scraped_content column...");
    await sql`ALTER TABLE places ADD COLUMN scraped_content JSONB`;
    console.log("✅ Column added!");
  } else {
    console.log("✅ Column already exists!");
  }

  // Show places stats
  const stats = await sql`
    SELECT
      COUNT(*) FILTER (WHERE website IS NOT NULL AND website != '') as with_website,
      COUNT(*) FILTER (WHERE scraped_content IS NOT NULL) as with_scraped,
      COUNT(*) as total
    FROM places
  `;
  console.log("\n📊 Places statistics:");
  console.log(`   Total places: ${stats[0].total}`);
  console.log(`   With website: ${stats[0].with_website}`);
  console.log(`   Already scraped: ${stats[0].with_scraped}`);
  console.log(`   Need scraping: ${Number(stats[0].with_website) - Number(stats[0].with_scraped)}`);
}

migrate().catch(console.error);
