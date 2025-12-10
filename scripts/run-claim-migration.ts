/**
 * Run Claim Verification Schema Migration
 *
 * This script runs the claim verification migration directly using SQL
 * bypassing drizzle-kit's interactive prompts.
 */

import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);

  console.log("🚀 Starting claim verification schema migration...\n");

  try {
    // Step 1: Create claim_verification_method enum
    console.log("1. Creating claim_verification_method enum...");
    await sql`
      DO $$ BEGIN
        CREATE TYPE "public"."claim_verification_method" AS ENUM(
          'email_domain',
          'phone',
          'google_business',
          'document',
          'manual'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log("   ✅ claim_verification_method enum created (or already exists)");

    // Step 2: Create claim_status enum
    console.log("2. Creating claim_status enum...");
    await sql`
      DO $$ BEGIN
        CREATE TYPE "public"."claim_status" AS ENUM(
          'pending',
          'verification_sent',
          'verified',
          'approved',
          'rejected',
          'expired'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log("   ✅ claim_status enum created (or already exists)");

    // Step 3: Check current status column type
    console.log("3. Checking current place_claims table structure...");
    const tableCheck = await sql`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns
      WHERE table_name = 'place_claims'
      ORDER BY ordinal_position;
    `;
    console.log("   Current columns:", tableCheck.map(c => `${c.column_name} (${c.udt_name})`).join(", "));

    // Step 4: Add verification_method column
    console.log("4. Adding verification_method column...");
    await sql`
      ALTER TABLE "place_claims"
      ADD COLUMN IF NOT EXISTS "verification_method" "claim_verification_method";
    `;
    console.log("   ✅ verification_method column added");

    // Step 5: Add verification email fields
    console.log("5. Adding verification email fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_email" varchar(255);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_email_domain" varchar(255);`;
    console.log("   ✅ verification_email and verification_email_domain columns added");

    // Step 6: Add verification phone field
    console.log("6. Adding verification phone field...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_phone" varchar(50);`;
    console.log("   ✅ verification_phone column added");

    // Step 7: Add verification code fields
    console.log("7. Adding verification code fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code" varchar(10);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code_sent_at" timestamp;`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code_expires_at" timestamp;`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_attempts" integer DEFAULT 0;`;
    console.log("   ✅ verification code fields added");

    // Step 8: Add verified_at timestamp
    console.log("8. Adding verified_at timestamp...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verified_at" timestamp;`;
    console.log("   ✅ verified_at column added");

    // Step 9: Add Google Business fields
    console.log("9. Adding Google Business fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "google_business_id" varchar(255);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "google_business_verified_at" timestamp;`;
    console.log("   ✅ Google Business fields added");

    // Step 10: Add proof document fields
    console.log("10. Adding proof document fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "proof_document_url" varchar(500);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "proof_document_type" varchar(50);`;
    console.log("   ✅ proof document fields added");

    // Step 11: Add claimant info fields
    console.log("11. Adding claimant info fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "business_role" varchar(100);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "claimant_name" varchar(255);`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "claimant_phone" varchar(50);`;
    console.log("   ✅ claimant info fields added");

    // Step 12: Add notes fields
    console.log("12. Adding notes fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "notes" text;`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "admin_notes" text;`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "rejection_reason" varchar(500);`;
    console.log("   ✅ notes fields added");

    // Step 13: Add review fields
    console.log("13. Adding review fields...");
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "reviewed_by" integer;`;
    await sql`ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "reviewed_at" timestamp;`;
    console.log("   ✅ review fields added");

    // Step 14: Create indexes
    console.log("14. Creating indexes...");
    await sql`CREATE INDEX IF NOT EXISTS "place_claims_status_idx" ON "place_claims" ("status");`;
    await sql`CREATE INDEX IF NOT EXISTS "place_claims_verification_code_idx" ON "place_claims" ("verification_code");`;
    console.log("   ✅ indexes created");

    // Step 15: Final verification
    console.log("\n15. Verifying final table structure...");
    const finalCheck = await sql`
      SELECT column_name, data_type, udt_name, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'place_claims'
      ORDER BY ordinal_position;
    `;

    console.log("\n📋 Final place_claims table structure:");
    console.log("─".repeat(60));
    for (const col of finalCheck) {
      console.log(`   ${col.column_name.padEnd(30)} ${col.udt_name.padEnd(20)} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    }
    console.log("─".repeat(60));

    console.log("\n✅ Migration completed successfully!");
    console.log("\nNew claim verification fields added:");
    console.log("  - verification_method: email_domain, phone, google_business, document, manual");
    console.log("  - verification_email, verification_email_domain");
    console.log("  - verification_phone, verification_code");
    console.log("  - verification_code_sent_at, verification_code_expires_at");
    console.log("  - verification_attempts, verified_at");
    console.log("  - google_business_id, google_business_verified_at");
    console.log("  - proof_document_url, proof_document_type");
    console.log("  - business_role, claimant_name, claimant_phone");
    console.log("  - notes, admin_notes, rejection_reason");
    console.log("  - reviewed_by, reviewed_at");

  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

runMigration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
