/**
 * Run Performance Indexes Migration
 *
 * Execute with: npx tsx scripts/run-performance-migration.ts
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load .env file
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

const sql = neon(connectionString);

async function runMigration() {
  console.log("🚀 Starting Performance Indexes Migration...\n");

  let successCount = 0;
  let errorCount = 0;

  // Helper to run a single index creation
  async function createIndex(name: string, query: string) {
    try {
      process.stdout.write(`Creating: ${name}...`);
      await sql.query(query, []);
      console.log(` ✅`);
      successCount++;
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        console.log(` ⏭️ (exists)`);
        successCount++; // Count as success since index exists
      } else {
        console.log(` ❌ ${error.message}`);
        errorCount++;
      }
    }
  }

  // PLACES TABLE - Most critical for performance
  console.log("\n📦 PLACES TABLE:");
  await createIndex("idx_places_slug", "CREATE INDEX IF NOT EXISTS idx_places_slug ON places(slug)");
  await createIndex("idx_places_city_slug", "CREATE INDEX IF NOT EXISTS idx_places_city_slug ON places(city_id, slug)");
  await createIndex("idx_places_avg_rating", "CREATE INDEX IF NOT EXISTS idx_places_avg_rating ON places(avg_rating DESC NULLS LAST)");
  await createIndex("idx_places_is_premium", "CREATE INDEX IF NOT EXISTS idx_places_is_premium ON places(is_premium DESC)");
  await createIndex("idx_places_review_count", "CREATE INDEX IF NOT EXISTS idx_places_review_count ON places(review_count DESC)");
  await createIndex("idx_places_created_at", "CREATE INDEX IF NOT EXISTS idx_places_created_at ON places(created_at DESC)");
  await createIndex("idx_places_status", "CREATE INDEX IF NOT EXISTS idx_places_status ON places(status)");
  await createIndex("idx_places_city_premium_rating", "CREATE INDEX IF NOT EXISTS idx_places_city_premium_rating ON places(city_id, is_premium DESC, avg_rating DESC NULLS LAST, review_count DESC)");
  await createIndex("idx_places_google_place_id", "CREATE INDEX IF NOT EXISTS idx_places_google_place_id ON places(google_place_id) WHERE google_place_id IS NOT NULL");

  // CITIES TABLE
  console.log("\n🏙️ CITIES TABLE:");
  await createIndex("idx_cities_slug", "CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug)");
  await createIndex("idx_cities_country_slug", "CREATE INDEX IF NOT EXISTS idx_cities_country_slug ON cities(country_id, slug)");
  await createIndex("idx_cities_name", "CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name)");

  // CATEGORIES TABLE
  console.log("\n📂 CATEGORIES TABLE:");
  await createIndex("idx_categories_slug", "CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug)");

  // COUNTRIES TABLE
  console.log("\n🌍 COUNTRIES TABLE:");
  await createIndex("idx_countries_slug", "CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries(slug)");
  await createIndex("idx_countries_code", "CREATE INDEX IF NOT EXISTS idx_countries_code ON countries(code)");

  // PROVINCES TABLE
  console.log("\n🗺️ PROVINCES TABLE:");
  await createIndex("idx_provinces_slug", "CREATE INDEX IF NOT EXISTS idx_provinces_slug ON provinces(slug)");
  await createIndex("idx_provinces_country_slug_v2", "CREATE INDEX IF NOT EXISTS idx_provinces_country_slug_v2 ON provinces(country_id, slug)");

  // REVIEWS TABLE
  console.log("\n⭐ REVIEWS TABLE:");
  await createIndex("idx_reviews_place_status_created", "CREATE INDEX IF NOT EXISTS idx_reviews_place_status_created ON reviews(place_id, status, created_at DESC)");

  // BUSINESS NOTIFICATIONS
  console.log("\n🔔 BUSINESS_NOTIFICATIONS TABLE:");
  await createIndex("idx_business_notifications_unread", "CREATE INDEX IF NOT EXISTS idx_business_notifications_unread ON business_notifications(business_id, is_read, created_at DESC)");

  // Run ANALYZE on critical tables
  console.log("\n📊 Updating table statistics...");
  const tables = ["places", "cities", "categories", "countries", "provinces", "reviews", "business_notifications"];

  for (const table of tables) {
    try {
      await sql.query(`ANALYZE ${table}`, []);
      console.log(`  ✅ ANALYZE ${table}`);
    } catch (error: any) {
      console.error(`  ❌ ANALYZE ${table} failed:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log("=".repeat(50));

  if (errorCount === 0) {
    console.log("\n🎉 Migration completed successfully!");
  } else {
    console.log("\n⚠️  Migration completed with some errors. Check logs above.");
  }
}

runMigration().catch(console.error);
