/**
 * Migrate Subscription Plans
 *
 * Creates subscription_plans table and adds plan fields to businesses table.
 * Run with: npx tsx scripts/migrate-subscription-plans.ts
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local", override: true });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env" });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function migrate() {
  console.log("Running subscription plans migration...\n");

  // Step 1: Create plan_status enum if not exists
  console.log("1. Creating plan_status enum...");
  try {
    await sql`
      DO $$ BEGIN
        CREATE TYPE plan_status AS ENUM ('ACTIVE', 'CANCELLED', 'TRIAL', 'PAST_DUE', 'INACTIVE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log("   ✅ plan_status enum created (or already exists)");
  } catch (error) {
    console.log("   ⚠️ plan_status enum might already exist:", (error as Error).message);
  }

  // Step 2: Create subscription_plans table
  console.log("2. Creating subscription_plans table...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscription_plans (
        key VARCHAR(20) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        name_nl VARCHAR(100),
        description TEXT,
        description_nl TEXT,
        monthly_price_cents INTEGER NOT NULL DEFAULT 0,
        yearly_price_cents INTEGER,
        max_photos INTEGER NOT NULL DEFAULT 0,
        max_categories INTEGER NOT NULL DEFAULT 1,
        can_show_website BOOLEAN NOT NULL DEFAULT false,
        can_show_email BOOLEAN NOT NULL DEFAULT false,
        can_show_phone BOOLEAN NOT NULL DEFAULT false,
        can_show_social_links BOOLEAN NOT NULL DEFAULT false,
        can_show_description BOOLEAN NOT NULL DEFAULT false,
        priority_rank INTEGER NOT NULL DEFAULT 1,
        has_featured_styling BOOLEAN NOT NULL DEFAULT false,
        has_basic_analytics BOOLEAN NOT NULL DEFAULT false,
        has_advanced_analytics BOOLEAN NOT NULL DEFAULT false,
        show_plan_badge BOOLEAN NOT NULL DEFAULT false,
        badge_text VARCHAR(50),
        badge_color VARCHAR(20),
        is_popular BOOLEAN NOT NULL DEFAULT false,
        is_active BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    console.log("   ✅ subscription_plans table created");
  } catch (error) {
    console.log("   ⚠️ subscription_plans table might already exist:", (error as Error).message);
  }

  // Step 3: Add new columns to businesses table
  console.log("3. Adding plan fields to businesses table...");

  // Add columns one by one using raw SQL
  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS plan_key VARCHAR(20) DEFAULT 'FREE' NOT NULL`;
    console.log("   ✅ Added column: plan_key");
  } catch (error) {
    console.log("   ⚠️ Column plan_key might already exist:", (error as Error).message);
  }

  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS plan_status plan_status DEFAULT 'ACTIVE' NOT NULL`;
    console.log("   ✅ Added column: plan_status");
  } catch (error) {
    console.log("   ⚠️ Column plan_status might already exist:", (error as Error).message);
  }

  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS plan_started_at TIMESTAMP`;
    console.log("   ✅ Added column: plan_started_at");
  } catch (error) {
    console.log("   ⚠️ Column plan_started_at might already exist:", (error as Error).message);
  }

  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS plan_valid_until TIMESTAMP`;
    console.log("   ✅ Added column: plan_valid_until");
  } catch (error) {
    console.log("   ⚠️ Column plan_valid_until might already exist:", (error as Error).message);
  }

  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP`;
    console.log("   ✅ Added column: trial_ends_at");
  } catch (error) {
    console.log("   ⚠️ Column trial_ends_at might already exist:", (error as Error).message);
  }

  try {
    await sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255)`;
    console.log("   ✅ Added column: stripe_subscription_id");
  } catch (error) {
    console.log("   ⚠️ Column stripe_subscription_id might already exist:", (error as Error).message);
  }

  // Step 4: Add foreign key constraint (if not exists)
  console.log("4. Adding foreign key constraint...");
  try {
    await sql`
      DO $$ BEGIN
        ALTER TABLE businesses
        ADD CONSTRAINT businesses_plan_key_fkey
        FOREIGN KEY (plan_key) REFERENCES subscription_plans(key);
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log("   ✅ Foreign key constraint added (or already exists)");
  } catch (error) {
    console.log("   ⚠️ Foreign key might already exist:", (error as Error).message);
  }

  console.log("\n🎉 Migration completed!");
  console.log("\nNext steps:");
  console.log("  1. Run: npx tsx scripts/seed-subscription-plans.ts");
  console.log("  2. Verify: SELECT * FROM subscription_plans;");
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
