/**
 * Create Missing Tables Script
 *
 * Creates tables that are defined in the schema but missing from the live database:
 * - review_replies
 * - review_photos
 * - audit_logs
 * - ai_content_cache
 * - ai_generation_queue
 *
 * Usage:
 *   npx tsx scripts/run-create-missing-tables.ts
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);

async function createMissingTables() {
  console.log("🚀 Creating Missing Tables");
  console.log("=".repeat(60));

  // Create enums first
  console.log("\n📋 Creating enums...");

  // Review reply author type enum
  try {
    await sql.query(`
      DO $$ BEGIN
          CREATE TYPE review_reply_author_type AS ENUM ('business', 'admin');
      EXCEPTION
          WHEN duplicate_object THEN null;
      END $$
    `);
    console.log("  ✅ review_reply_author_type enum ready");
  } catch (e: any) {
    console.log(`  ⚠️ review_reply_author_type: ${e.message}`);
  }

  // Review photo status enum
  try {
    await sql.query(`
      DO $$ BEGIN
          CREATE TYPE review_photo_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
      EXCEPTION
          WHEN duplicate_object THEN null;
      END $$
    `);
    console.log("  ✅ review_photo_status enum ready");
  } catch (e: any) {
    console.log(`  ⚠️ review_photo_status: ${e.message}`);
  }

  // Create tables
  console.log("\n📋 Creating tables...");

  // 1. review_replies table
  try {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS review_replies (
          id SERIAL PRIMARY KEY,
          review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
          author_type review_reply_author_type NOT NULL,
          author_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await sql.query(`CREATE INDEX IF NOT EXISTS review_replies_review_id_idx ON review_replies(review_id)`);
    console.log("  ✅ review_replies table created");
  } catch (e: any) {
    console.log(`  ❌ review_replies: ${e.message}`);
  }

  // 2. review_photos table
  try {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS review_photos (
          id SERIAL PRIMARY KEY,
          review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
          place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          storage_key VARCHAR(500) NOT NULL,
          width INTEGER,
          height INTEGER,
          mime_type VARCHAR(50) NOT NULL,
          filesize_bytes INTEGER,
          alt_text VARCHAR(255),
          status review_photo_status DEFAULT 'pending' NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await sql.query(`CREATE INDEX IF NOT EXISTS review_photos_review_id_idx ON review_photos(review_id)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS review_photos_place_id_idx ON review_photos(place_id)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS review_photos_status_idx ON review_photos(status)`);
    console.log("  ✅ review_photos table created");
  } catch (e: any) {
    console.log(`  ❌ review_photos: ${e.message}`);
  }

  // 3. audit_logs table
  try {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          actor_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          actor_business_id INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
          actor_role VARCHAR(30) NOT NULL,
          event_type VARCHAR(50) NOT NULL,
          target_type VARCHAR(30) NOT NULL,
          target_id VARCHAR(100),
          metadata JSONB,
          ip_address VARCHAR(45)
      )
    `);
    await sql.query(`CREATE INDEX IF NOT EXISTS audit_logs_event_type_idx ON audit_logs(event_type)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS audit_logs_target_type_idx ON audit_logs(target_type)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS audit_logs_actor_user_id_idx ON audit_logs(actor_user_id)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at)`);
    console.log("  ✅ audit_logs table created");
  } catch (e: any) {
    console.log(`  ❌ audit_logs: ${e.message}`);
  }

  // 4. ai_content_cache table
  try {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS ai_content_cache (
          id SERIAL PRIMARY KEY,
          key TEXT UNIQUE NOT NULL,
          content_type VARCHAR(50) NOT NULL,
          content JSONB NOT NULL,
          model VARCHAR(100) NOT NULL,
          locale VARCHAR(10) NOT NULL,
          version VARCHAR(50) NOT NULL,
          prompt_tokens INTEGER,
          completion_tokens INTEGER,
          generated_at TIMESTAMP DEFAULT NOW() NOT NULL,
          generation_time_ms INTEGER,
          is_stale BOOLEAN DEFAULT FALSE NOT NULL,
          marked_stale_at TIMESTAMP,
          last_error TEXT,
          error_count INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_content_cache_content_type_idx ON ai_content_cache(content_type)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_content_cache_stale_idx ON ai_content_cache(is_stale, updated_at)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_content_cache_version_idx ON ai_content_cache(version)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_content_cache_locale_idx ON ai_content_cache(locale)`);
    await sql.query(`CREATE UNIQUE INDEX IF NOT EXISTS ai_content_cache_key_idx ON ai_content_cache(key)`);
    console.log("  ✅ ai_content_cache table created");
  } catch (e: any) {
    console.log(`  ❌ ai_content_cache: ${e.message}`);
  }

  // 5. ai_generation_queue table
  try {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS ai_generation_queue (
          id SERIAL PRIMARY KEY,
          cache_key TEXT NOT NULL,
          content_type VARCHAR(50) NOT NULL,
          locale VARCHAR(10) NOT NULL,
          priority INTEGER DEFAULT 0 NOT NULL,
          status VARCHAR(20) DEFAULT 'pending' NOT NULL,
          attempts INTEGER DEFAULT 0 NOT NULL,
          last_attempt_at TIMESTAMP,
          completed_at TIMESTAMP,
          error TEXT,
          context_data JSONB,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_generation_queue_status_priority_idx ON ai_generation_queue(status, priority)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS ai_generation_queue_cache_key_idx ON ai_generation_queue(cache_key)`);
    console.log("  ✅ ai_generation_queue table created");
  } catch (e: any) {
    console.log(`  ❌ ai_generation_queue: ${e.message}`);
  }

  // Verify tables exist
  console.log("\n📋 Verification...");
  const tables = await sql`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;

  console.log("\nAll tables in public schema:");
  for (const row of tables) {
    console.log(`  - ${row.tablename}`);
  }

  // Check specifically for the 5 new tables
  const newTables = ["review_replies", "review_photos", "audit_logs", "ai_content_cache", "ai_generation_queue"];
  const existingTables = tables.map((t: any) => t.tablename);

  console.log("\n" + "=".repeat(60));
  console.log("📊 Summary\n");
  for (const table of newTables) {
    const exists = existingTables.includes(table);
    console.log(`  ${exists ? "✅" : "❌"} ${table}`);
  }

  const allCreated = newTables.every((t) => existingTables.includes(t));
  console.log("\n" + "=".repeat(60));

  if (allCreated) {
    console.log("✅ All missing tables created successfully!");
  } else {
    console.log("⚠️ Some tables could not be created");
  }
}

createMissingTables().catch(console.error);
