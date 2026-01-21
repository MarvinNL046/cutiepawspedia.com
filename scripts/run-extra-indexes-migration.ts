/**
 * Run Extra Performance Indexes Migration
 *
 * Adds indexes for tables that were missing them in the initial migration
 * Execute with: npx tsx scripts/run-extra-indexes-migration.ts
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
  console.log("🚀 Starting Extra Indexes Migration...\n");

  let successCount = 0;
  let errorCount = 0;

  async function createIndex(name: string, query: string) {
    try {
      process.stdout.write(`Creating: ${name}...`);
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

  // ============================================================================
  // BUSINESSES TABLE - Critical for dashboard performance
  // ============================================================================
  console.log("🏢 BUSINESSES TABLE:");
  await createIndex(
    "idx_businesses_user_id",
    "CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id)"
  );
  await createIndex(
    "idx_businesses_plan_key",
    "CREATE INDEX IF NOT EXISTS idx_businesses_plan_key ON businesses(plan_key)"
  );
  await createIndex(
    "idx_businesses_status",
    "CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status)"
  );
  await createIndex(
    "idx_businesses_stripe_customer_id",
    "CREATE INDEX IF NOT EXISTS idx_businesses_stripe_customer_id ON businesses(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL"
  );
  await createIndex(
    "idx_businesses_stripe_subscription_id",
    "CREATE INDEX IF NOT EXISTS idx_businesses_stripe_subscription_id ON businesses(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL"
  );

  // ============================================================================
  // USERS TABLE - For auth and admin lookups
  // ============================================================================
  console.log("\n👤 USERS TABLE:");
  await createIndex(
    "idx_users_role",
    "CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)"
  );
  await createIndex(
    "idx_users_is_expert",
    "CREATE INDEX IF NOT EXISTS idx_users_is_expert ON users(is_expert) WHERE is_expert = true"
  );
  await createIndex(
    "idx_users_created_at",
    "CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC)"
  );

  // ============================================================================
  // CREDIT TRANSACTIONS TABLE - No indexes at all!
  // ============================================================================
  console.log("\n💳 CREDIT_TRANSACTIONS TABLE:");
  await createIndex(
    "idx_credit_transactions_business_id",
    "CREATE INDEX IF NOT EXISTS idx_credit_transactions_business_id ON credit_transactions(business_id)"
  );
  await createIndex(
    "idx_credit_transactions_type",
    "CREATE INDEX IF NOT EXISTS idx_credit_transactions_type ON credit_transactions(type)"
  );
  await createIndex(
    "idx_credit_transactions_created_at",
    "CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC)"
  );
  await createIndex(
    "idx_credit_transactions_business_date",
    "CREATE INDEX IF NOT EXISTS idx_credit_transactions_business_date ON credit_transactions(business_id, created_at DESC)"
  );

  // ============================================================================
  // LEADS TABLE - Missing createdAt index for time-based queries
  // ============================================================================
  console.log("\n📧 LEADS TABLE:");
  await createIndex(
    "idx_leads_created_at",
    "CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)"
  );
  await createIndex(
    "idx_leads_business_date",
    "CREATE INDEX IF NOT EXISTS idx_leads_business_date ON leads(business_id, created_at DESC)"
  );
  await createIndex(
    "idx_leads_place_date",
    "CREATE INDEX IF NOT EXISTS idx_leads_place_date ON leads(place_id, created_at DESC)"
  );

  // ============================================================================
  // MESSAGES TABLE - Missing isRead index for unread counts
  // ============================================================================
  console.log("\n💬 MESSAGES TABLE:");
  await createIndex(
    "idx_messages_is_read",
    "CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read) WHERE is_read = false"
  );
  await createIndex(
    "idx_messages_thread_created",
    "CREATE INDEX IF NOT EXISTS idx_messages_thread_created ON messages(thread_id, created_at DESC)"
  );

  // ============================================================================
  // MESSAGE THREADS TABLE - Missing status and unread count indexes
  // ============================================================================
  console.log("\n📨 MESSAGE_THREADS TABLE:");
  await createIndex(
    "idx_message_threads_status",
    "CREATE INDEX IF NOT EXISTS idx_message_threads_status ON message_threads(status)"
  );
  await createIndex(
    "idx_message_threads_business_unread",
    "CREATE INDEX IF NOT EXISTS idx_message_threads_business_unread ON message_threads(business_id, unread_count_business) WHERE unread_count_business > 0"
  );
  await createIndex(
    "idx_message_threads_user_unread",
    "CREATE INDEX IF NOT EXISTS idx_message_threads_user_unread ON message_threads(user_id, unread_count_user) WHERE unread_count_user > 0"
  );

  // ============================================================================
  // ADMIN AUDIT LOGS TABLE - No indexes at all!
  // ============================================================================
  console.log("\n📋 ADMIN_AUDIT_LOGS TABLE:");
  await createIndex(
    "idx_admin_audit_logs_admin_id",
    "CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_id ON admin_audit_logs(admin_id)"
  );
  await createIndex(
    "idx_admin_audit_logs_action",
    "CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON admin_audit_logs(action)"
  );
  await createIndex(
    "idx_admin_audit_logs_entity",
    "CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_entity ON admin_audit_logs(entity_type, entity_id)"
  );
  await createIndex(
    "idx_admin_audit_logs_created_at",
    "CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at DESC)"
  );

  // ============================================================================
  // PLACE CLAIMS TABLE - Missing composite for pending claims
  // ============================================================================
  console.log("\n📝 PLACE_CLAIMS TABLE:");
  await createIndex(
    "idx_place_claims_pending",
    "CREATE INDEX IF NOT EXISTS idx_place_claims_pending ON place_claims(status, created_at DESC) WHERE status = 'pending'"
  );

  // ============================================================================
  // REVIEW PHOTOS TABLE - Missing composite for approved photos
  // ============================================================================
  console.log("\n📸 REVIEW_PHOTOS TABLE:");
  await createIndex(
    "idx_review_photos_place_approved",
    "CREATE INDEX IF NOT EXISTS idx_review_photos_place_approved ON review_photos(place_id, created_at DESC) WHERE status = 'approved'"
  );

  // ============================================================================
  // BUSINESS PHOTOS TABLE - Missing composite for active photos
  // ============================================================================
  console.log("\n🖼️ BUSINESS_PHOTOS TABLE:");
  await createIndex(
    "idx_business_photos_place_active",
    "CREATE INDEX IF NOT EXISTS idx_business_photos_place_active ON business_photos(place_id, sort_order) WHERE status = 'active'"
  );

  // ============================================================================
  // PLACES TABLE - Extra indexes for common dashboard queries
  // ============================================================================
  console.log("\n🏪 PLACES TABLE (extra):");
  await createIndex(
    "idx_places_owner_id",
    "CREATE INDEX IF NOT EXISTS idx_places_owner_id ON places(owner_id) WHERE owner_id IS NOT NULL"
  );
  await createIndex(
    "idx_places_data_quality",
    "CREATE INDEX IF NOT EXISTS idx_places_data_quality ON places(data_quality_score) WHERE data_quality_score < 50"
  );
  await createIndex(
    "idx_places_lat_lng",
    "CREATE INDEX IF NOT EXISTS idx_places_lat_lng ON places(lat, lng) WHERE lat IS NOT NULL AND lng IS NOT NULL"
  );

  // Run ANALYZE on the newly indexed tables
  console.log("\n📊 Updating table statistics...");
  const tables = [
    "businesses",
    "users",
    "credit_transactions",
    "leads",
    "messages",
    "message_threads",
    "admin_audit_logs",
    "place_claims",
    "review_photos",
    "business_photos",
    "places",
  ];

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
    console.log("\n🎉 Extra indexes migration completed successfully!");
  } else {
    console.log("\n⚠️  Migration completed with some errors. Check logs above.");
  }
}

runMigration().catch(console.error);
