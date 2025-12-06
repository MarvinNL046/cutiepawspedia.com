/**
 * Direct Database Migration Script
 *
 * Runs schema updates directly via Neon serverless
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function runMigration() {
  console.log("🚀 Starting database migration...\n");

  try {
    // Check current state
    console.log("📊 Checking current database state...");

    // Check if subscription_plans table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'subscription_plans'
      ) as exists
    `;

    const subscriptionPlansExists = tableCheck[0]?.exists;
    console.log(`   subscription_plans table: ${subscriptionPlansExists ? '✅ exists' : '❌ missing'}`);

    // Check if businesses has plan_key column
    const columnCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'businesses' AND column_name = 'plan_key'
      ) as exists
    `;

    const planKeyExists = columnCheck[0]?.exists;
    console.log(`   businesses.plan_key column: ${planKeyExists ? '✅ exists' : '❌ missing'}`);

    // Check if page_views table exists
    const pageViewsCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'page_views'
      ) as exists
    `;

    const pageViewsExists = pageViewsCheck[0]?.exists;
    console.log(`   page_views table: ${pageViewsExists ? '✅ exists' : '❌ missing'}`);

    // Check if contact_reveals table exists
    const contactRevealsCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'contact_reveals'
      ) as exists
    `;

    const contactRevealsExists = contactRevealsCheck[0]?.exists;
    console.log(`   contact_reveals table: ${contactRevealsExists ? '✅ exists' : '❌ missing'}`);

    console.log("\n📝 Running migrations...\n");

    // 1. Create subscription_plans table if not exists
    if (!subscriptionPlansExists) {
      console.log("   Creating subscription_plans table...");
      await sql`
        CREATE TABLE IF NOT EXISTS subscription_plans (
          key VARCHAR(20) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          name_nl VARCHAR(100),
          description TEXT,
          description_nl TEXT,
          monthly_price_cents INTEGER DEFAULT 0 NOT NULL,
          yearly_price_cents INTEGER,
          max_photos INTEGER DEFAULT 0 NOT NULL,
          max_categories INTEGER DEFAULT 1 NOT NULL,
          can_show_website BOOLEAN DEFAULT false NOT NULL,
          can_show_email BOOLEAN DEFAULT false NOT NULL,
          can_show_phone BOOLEAN DEFAULT false NOT NULL,
          can_show_social_links BOOLEAN DEFAULT false NOT NULL,
          can_show_description BOOLEAN DEFAULT false NOT NULL,
          priority_rank INTEGER DEFAULT 1 NOT NULL,
          has_featured_styling BOOLEAN DEFAULT false NOT NULL,
          has_basic_analytics BOOLEAN DEFAULT false NOT NULL,
          has_advanced_analytics BOOLEAN DEFAULT false NOT NULL,
          has_verified_badge BOOLEAN DEFAULT false NOT NULL,
          has_homepage_spotlight BOOLEAN DEFAULT false NOT NULL,
          max_locations INTEGER DEFAULT 1 NOT NULL,
          has_priority_support BOOLEAN DEFAULT false NOT NULL,
          has_api_access BOOLEAN DEFAULT false NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          sort_order INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      console.log("   ✅ subscription_plans table created");

      // Seed the plans
      console.log("   Seeding subscription plans...");
      await sql`
        INSERT INTO subscription_plans (key, name, name_nl, description, description_nl, monthly_price_cents, yearly_price_cents, max_photos, max_categories, can_show_website, can_show_email, can_show_phone, can_show_social_links, can_show_description, priority_rank, has_featured_styling, has_basic_analytics, has_advanced_analytics, has_verified_badge, has_homepage_spotlight, max_locations, has_priority_support, has_api_access, is_active, sort_order)
        VALUES
          ('FREE', 'Free', 'Gratis', 'Basic listing to get started', 'Basis vermelding om te beginnen', 0, NULL, 0, 1, false, false, false, false, false, 1, false, false, false, false, false, 1, false, false, true, 0),
          ('STARTER', 'Starter', 'Starter', 'Essential features for small businesses', 'Essentiële functies voor kleine bedrijven', 700, 7000, 5, 2, true, true, true, false, true, 2, false, true, false, false, false, 1, false, false, true, 1),
          ('PRO', 'Pro', 'Pro', 'Advanced features for growing businesses', 'Geavanceerde functies voor groeiende bedrijven', 1900, 19000, 15, 5, true, true, true, true, true, 3, true, true, true, false, false, 3, false, false, true, 2),
          ('ELITE', 'Elite', 'Elite', 'Premium features for established businesses', 'Premium functies voor gevestigde bedrijven', 3900, 39000, 30, 10, true, true, true, true, true, 4, true, true, true, true, true, 0, true, true, true, 3)
        ON CONFLICT (key) DO NOTHING
      `;
      console.log("   ✅ subscription plans seeded");
    }

    // 2. Create plan_status enum if not exists
    console.log("   Checking plan_status enum...");
    const enumCheck = await sql`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'plan_status'
      ) as exists
    `;

    if (!enumCheck[0]?.exists) {
      console.log("   Creating plan_status enum...");
      await sql`
        CREATE TYPE plan_status AS ENUM ('ACTIVE', 'CANCELLED', 'TRIAL', 'PAST_DUE', 'INACTIVE')
      `;
      console.log("   ✅ plan_status enum created");
    } else {
      console.log("   ✅ plan_status enum already exists");
    }

    // 3. Add plan columns to businesses if not exist
    if (!planKeyExists) {
      console.log("   Adding plan columns to businesses table...");
      await sql`
        ALTER TABLE businesses
        ADD COLUMN IF NOT EXISTS plan_key VARCHAR(20) DEFAULT 'FREE' REFERENCES subscription_plans(key),
        ADD COLUMN IF NOT EXISTS plan_status plan_status DEFAULT 'ACTIVE' NOT NULL,
        ADD COLUMN IF NOT EXISTS plan_started_at TIMESTAMP,
        ADD COLUMN IF NOT EXISTS plan_valid_until TIMESTAMP,
        ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP,
        ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255),
        ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255)
      `;
      console.log("   ✅ plan columns added to businesses");
    }

    // 4. Create page_views table if not exists
    if (!pageViewsExists) {
      console.log("   Creating page_views table...");
      await sql`
        CREATE TABLE IF NOT EXISTS page_views (
          id SERIAL PRIMARY KEY,
          place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
          visitor_id VARCHAR(255),
          session_id VARCHAR(255),
          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          referrer TEXT,
          user_agent TEXT,
          country_code VARCHAR(10),
          city VARCHAR(255),
          device_type VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS page_views_place_id_idx ON page_views(place_id)`;
      await sql`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views(created_at)`;
      console.log("   ✅ page_views table created");
    }

    // 5. Create contact_reveals table if not exists
    if (!contactRevealsExists) {
      console.log("   Creating contact_reveals table...");
      await sql`
        CREATE TABLE IF NOT EXISTS contact_reveals (
          id SERIAL PRIMARY KEY,
          place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          visitor_id VARCHAR(255),
          contact_type VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS contact_reveals_place_id_idx ON contact_reveals(place_id)`;
      await sql`CREATE INDEX IF NOT EXISTS contact_reveals_created_at_idx ON contact_reveals(created_at)`;
      console.log("   ✅ contact_reveals table created");
    }

    // 6. Add business_id to reviews if not exists
    const reviewsBusinessIdCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'reviews' AND column_name = 'business_id'
      ) as exists
    `;

    if (!reviewsBusinessIdCheck[0]?.exists) {
      console.log("   Adding business_id column to reviews...");
      await sql`
        ALTER TABLE reviews
        ADD COLUMN IF NOT EXISTS business_id INTEGER REFERENCES businesses(id) ON DELETE SET NULL
      `;
      console.log("   ✅ business_id added to reviews");
    }

    // 7. Create business_photos table if not exists
    const businessPhotosCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'business_photos'
      ) as exists
    `;

    if (!businessPhotosCheck[0]?.exists) {
      console.log("   Creating business_photos table...");
      await sql`
        CREATE TABLE IF NOT EXISTS business_photos (
          id SERIAL PRIMARY KEY,
          place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
          business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
          url TEXT NOT NULL,
          thumbnail_url TEXT,
          alt_text VARCHAR(255),
          sort_order INTEGER DEFAULT 0 NOT NULL,
          status VARCHAR(20) DEFAULT 'active' NOT NULL,
          uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS business_photos_place_id_idx ON business_photos(place_id)`;
      await sql`CREATE INDEX IF NOT EXISTS business_photos_business_id_idx ON business_photos(business_id)`;
      console.log("   ✅ business_photos table created");
    }

    console.log("\n✅ All migrations completed successfully!");

    // Final verification
    console.log("\n📊 Final verification:");
    const finalCheck = await sql`
      SELECT
        (SELECT COUNT(*) FROM subscription_plans) as plans_count,
        (SELECT COUNT(*) FROM businesses WHERE plan_key IS NOT NULL) as businesses_with_plan
    `;
    console.log(`   Subscription plans: ${finalCheck[0]?.plans_count}`);
    console.log(`   Businesses with plan_key: ${finalCheck[0]?.businesses_with_plan}`);

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
