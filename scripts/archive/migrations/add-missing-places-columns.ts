/**
 * Add Missing Places Columns
 *
 * Adds columns to the places table that are in the schema but missing from the live database.
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);

async function addMissingColumns() {
  console.log("🔧 Adding missing columns to places table...\n");

  // Get existing columns
  const existingCols = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'places'
  `;
  const existing = existingCols.map((c: any) => c.column_name);
  console.log("Existing columns:", existing.length);

  // Define columns to add
  const columnsToAdd = [
    { name: "last_review_at", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS last_review_at TIMESTAMP" },
    { name: "has_photos", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS has_photos BOOLEAN DEFAULT FALSE NOT NULL" },
    { name: "is_top_rated", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS is_top_rated BOOLEAN DEFAULT FALSE NOT NULL" },
    { name: "is_community_favorite", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS is_community_favorite BOOLEAN DEFAULT FALSE NOT NULL" },
    { name: "data_quality_score", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS data_quality_score INTEGER DEFAULT 0 NOT NULL" },
    { name: "data_quality_flags", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS data_quality_flags JSONB" },
    { name: "last_refreshed_at", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS last_refreshed_at TIMESTAMP" },
    { name: "status_last_checked_at", sql: "ALTER TABLE places ADD COLUMN IF NOT EXISTS status_last_checked_at TIMESTAMP" },
  ];

  for (const col of columnsToAdd) {
    if (!existing.includes(col.name)) {
      try {
        await sql.query(col.sql);
        console.log(`  ✅ Added: ${col.name}`);
      } catch (e: any) {
        console.log(`  ❌ ${col.name}: ${e.message}`);
      }
    } else {
      console.log(`  ⏭️ Already exists: ${col.name}`);
    }
  }

  // Verify
  console.log("\n📋 Verification...");
  const finalCols = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'places'
    ORDER BY ordinal_position
  `;
  console.log("\nPlaces table columns:");
  for (const c of finalCols) {
    console.log(`  - ${c.column_name}`);
  }

  console.log("\n✅ Done!");
}

addMissingColumns().catch(console.error);
