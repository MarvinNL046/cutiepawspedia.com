/**
 * Seed Ad Packages
 *
 * Run: npx tsx scripts/seed-ad-packages.ts
 *
 * Creates default advertising packages in the database.
 * Also outputs the Stripe product/price IDs you need to create.
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load .env file
config({ path: ".env.local" });
config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function seedAdPackages() {
  console.log("Seeding ad packages...\n");

  // First, create the enums if they don't exist
  await sql`
    DO $$ BEGIN
      CREATE TYPE ad_campaign_status AS ENUM (
        'draft', 'pending_payment', 'active', 'paused', 'completed', 'cancelled'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `;

  await sql`
    DO $$ BEGIN
      CREATE TYPE ad_placement_type AS ENUM (
        'blog_sidebar', 'blog_inline', 'directory_sidebar', 'search_results', 'homepage_featured'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `;

  // Create ad_packages table
  await sql`
    CREATE TABLE IF NOT EXISTS ad_packages (
      id SERIAL PRIMARY KEY,
      key VARCHAR(50) NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL,
      name_nl VARCHAR(100),
      description TEXT,
      description_nl TEXT,
      price_cents INTEGER NOT NULL,
      duration_days INTEGER NOT NULL,
      included_placements VARCHAR(255) NOT NULL,
      max_impressions INTEGER,
      stripe_price_id VARCHAR(255),
      is_popular BOOLEAN DEFAULT FALSE NOT NULL,
      sort_order INTEGER DEFAULT 0 NOT NULL,
      is_active BOOLEAN DEFAULT TRUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  // Create ad_campaigns table
  await sql`
    CREATE TABLE IF NOT EXISTS ad_campaigns (
      id SERIAL PRIMARY KEY,
      business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
      place_id INTEGER REFERENCES places(id) ON DELETE SET NULL,
      package_id INTEGER NOT NULL REFERENCES ad_packages(id) ON DELETE RESTRICT,
      name VARCHAR(255) NOT NULL,
      status ad_campaign_status DEFAULT 'draft' NOT NULL,
      headline VARCHAR(100) NOT NULL,
      headline_nl VARCHAR(100),
      description VARCHAR(255),
      description_nl VARCHAR(255),
      image_url VARCHAR(500),
      cta_text VARCHAR(50) DEFAULT 'Learn More',
      cta_text_nl VARCHAR(50) DEFAULT 'Meer informatie',
      destination_url VARCHAR(500),
      starts_at TIMESTAMP,
      ends_at TIMESTAMP,
      total_budget_cents INTEGER,
      max_impressions INTEGER,
      impressions INTEGER DEFAULT 0 NOT NULL,
      clicks INTEGER DEFAULT 0 NOT NULL,
      stripe_payment_intent_id VARCHAR(255),
      stripe_checkout_session_id VARCHAR(255),
      paid_at TIMESTAMP,
      amount_paid_cents INTEGER,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  // Create ad_impressions table
  await sql`
    CREATE TABLE IF NOT EXISTS ad_impressions (
      id SERIAL PRIMARY KEY,
      campaign_id INTEGER NOT NULL REFERENCES ad_campaigns(id) ON DELETE CASCADE,
      placement ad_placement_type NOT NULL,
      page_url VARCHAR(500),
      locale VARCHAR(5),
      session_id VARCHAR(100),
      user_agent VARCHAR(500),
      ip_country VARCHAR(2),
      clicked BOOLEAN DEFAULT FALSE NOT NULL,
      clicked_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  // Create indexes
  await sql`CREATE INDEX IF NOT EXISTS ad_campaigns_business_idx ON ad_campaigns(business_id);`;
  await sql`CREATE INDEX IF NOT EXISTS ad_campaigns_status_idx ON ad_campaigns(status);`;
  await sql`CREATE INDEX IF NOT EXISTS ad_impressions_campaign_idx ON ad_impressions(campaign_id);`;
  await sql`CREATE INDEX IF NOT EXISTS ad_impressions_date_idx ON ad_impressions(created_at);`;

  // Insert packages
  const packages = [
    {
      key: "starter",
      name: "Starter",
      nameNl: "Starter",
      description: "Perfect for testing the waters. Get your business in front of pet owners.",
      descriptionNl: "Perfect om te beginnen. Zet je bedrijf in de schijnwerpers.",
      priceCents: 2900, // €29
      durationDays: 7,
      includedPlacements: "blog_sidebar",
      maxImpressions: 5000,
      sortOrder: 1,
    },
    {
      key: "growth",
      name: "Growth",
      nameNl: "Groei",
      description: "Our most popular package. Reach customers across multiple touchpoints.",
      descriptionNl: "Ons populairste pakket. Bereik klanten op meerdere plekken.",
      priceCents: 7900, // €79
      durationDays: 30,
      includedPlacements: "blog_sidebar,blog_inline,search_results",
      maxImpressions: 25000,
      isPopular: true,
      sortOrder: 2,
    },
    {
      key: "premium",
      name: "Premium",
      nameNl: "Premium",
      description: "Maximum visibility. Featured everywhere including the homepage.",
      descriptionNl: "Maximale zichtbaarheid. Uitgelicht overal, inclusief de homepage.",
      priceCents: 14900, // €149
      durationDays: 30,
      includedPlacements: "blog_sidebar,blog_inline,directory_sidebar,search_results,homepage_featured",
      maxImpressions: null, // Unlimited
      sortOrder: 3,
    },
  ];

  for (const pkg of packages) {
    // Check if package exists
    const existing = await sql`SELECT id FROM ad_packages WHERE key = ${pkg.key}`;

    if (existing.length > 0) {
      console.log(`Package "${pkg.key}" already exists, updating...`);
      await sql`
        UPDATE ad_packages SET
          name = ${pkg.name},
          name_nl = ${pkg.nameNl},
          description = ${pkg.description},
          description_nl = ${pkg.descriptionNl},
          price_cents = ${pkg.priceCents},
          duration_days = ${pkg.durationDays},
          included_placements = ${pkg.includedPlacements},
          max_impressions = ${pkg.maxImpressions},
          is_popular = ${pkg.isPopular || false},
          sort_order = ${pkg.sortOrder},
          updated_at = NOW()
        WHERE key = ${pkg.key}
      `;
    } else {
      console.log(`Creating package "${pkg.key}"...`);
      await sql`
        INSERT INTO ad_packages (
          key, name, name_nl, description, description_nl,
          price_cents, duration_days, included_placements, max_impressions,
          is_popular, sort_order
        ) VALUES (
          ${pkg.key}, ${pkg.name}, ${pkg.nameNl}, ${pkg.description}, ${pkg.descriptionNl},
          ${pkg.priceCents}, ${pkg.durationDays}, ${pkg.includedPlacements}, ${pkg.maxImpressions},
          ${pkg.isPopular || false}, ${pkg.sortOrder}
        )
      `;
    }
  }

  console.log("\n✅ Ad packages seeded successfully!");
  console.log("\n📋 STRIPE SETUP REQUIRED:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Create these products and prices in Stripe Dashboard:\n");

  for (const pkg of packages) {
    console.log(`📦 ${pkg.name}:`);
    console.log(`   Price: €${(pkg.priceCents / 100).toFixed(2)} (one-time)`);
    console.log(`   Duration: ${pkg.durationDays} days`);
    console.log(`   After creating, update the stripe_price_id in ad_packages table\n`);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\nTo update Stripe price IDs, run:");
  console.log("UPDATE ad_packages SET stripe_price_id = 'price_xxx' WHERE key = 'starter';");
  console.log("UPDATE ad_packages SET stripe_price_id = 'price_yyy' WHERE key = 'growth';");
  console.log("UPDATE ad_packages SET stripe_price_id = 'price_zzz' WHERE key = 'premium';");
}

seedAdPackages().catch(console.error);
