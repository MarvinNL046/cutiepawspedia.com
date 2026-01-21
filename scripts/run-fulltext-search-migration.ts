/**
 * Run Full-Text Search Migration
 *
 * Adds pg_trgm extension and trigram indexes for fast fuzzy search
 * Execute with: npx tsx scripts/run-fulltext-search-migration.ts
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

const sql = neon(connectionString);

async function runMigration() {
  console.log("🚀 Starting Full-Text Search Migration...\n");

  let successCount = 0;
  let errorCount = 0;

  async function runQuery(name: string, query: string) {
    try {
      process.stdout.write(`${name}...`);
      await sql.query(query, []);
      console.log(` ✅`);
      successCount++;
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        console.log(` ⏭️ (exists)`);
        successCount++;
      } else {
        console.log(` ❌ ${error.message}`);
        errorCount++;
      }
    }
  }

  // Enable pg_trgm extension
  console.log("📦 EXTENSIONS:");
  await runQuery("pg_trgm extension", "CREATE EXTENSION IF NOT EXISTS pg_trgm");

  // Trigram indexes for fuzzy search
  console.log("\n🔍 TRIGRAM INDEXES:");
  await runQuery("idx_places_name_trgm", "CREATE INDEX IF NOT EXISTS idx_places_name_trgm ON places USING GIN(name gin_trgm_ops)");
  await runQuery("idx_places_address_trgm", "CREATE INDEX IF NOT EXISTS idx_places_address_trgm ON places USING GIN(address gin_trgm_ops)");
  await runQuery("idx_cities_name_trgm", "CREATE INDEX IF NOT EXISTS idx_cities_name_trgm ON cities USING GIN(name gin_trgm_ops)");
  await runQuery("idx_categories_label_trgm", "CREATE INDEX IF NOT EXISTS idx_categories_label_trgm ON categories USING GIN(label_key gin_trgm_ops)");

  // Composite indexes for common query patterns
  console.log("\n📊 COMPOSITE INDEXES:");
  await runQuery("idx_places_city_rating", "CREATE INDEX IF NOT EXISTS idx_places_city_rating ON places(city_id, avg_rating DESC NULLS LAST)");
  await runQuery("idx_places_city_premium", "CREATE INDEX IF NOT EXISTS idx_places_city_premium ON places(city_id, is_premium DESC, avg_rating DESC NULLS LAST)");

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log("=".repeat(50));

  if (errorCount === 0) {
    console.log("\n🎉 Full-text search migration completed!");
  }
}

runMigration().catch(console.error);
