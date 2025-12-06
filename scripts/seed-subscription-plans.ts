/**
 * Seed Subscription Plans
 *
 * Run with: npx tsx scripts/seed-subscription-plans.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { subscriptionPlans } from "../db/schema/directory";
import * as dotenv from "dotenv";

// Load environment variables - try .env.local first, then .env
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
const db = drizzle(sql);

// Subscription plan definitions
const SUBSCRIPTION_PLANS = [
  {
    key: "FREE",
    name: "Free",
    nameNl: "Gratis",
    description: "Basic listing to get started",
    descriptionNl: "Basis vermelding om te beginnen",
    monthlyPriceCents: 0,
    yearlyPriceCents: null,
    // Features
    maxPhotos: 0,
    maxCategories: 1,
    canShowWebsite: false,
    canShowEmail: false,
    canShowPhone: false,
    canShowSocialLinks: false,
    canShowDescription: false,
    priorityRank: 1,
    hasFeaturedStyling: false,
    hasBasicAnalytics: false,
    hasAdvancedAnalytics: false,
    showPlanBadge: false,
    badgeText: null,
    badgeColor: null,
    // Meta
    isPopular: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    key: "STARTER",
    name: "Starter",
    nameNl: "Starter",
    description: "Essential features for growing businesses",
    descriptionNl: "Essentiële functies voor groeiende bedrijven",
    monthlyPriceCents: 700, // €7/month
    yearlyPriceCents: 7000, // €70/year (save €14)
    // Features
    maxPhotos: 3,
    maxCategories: 2,
    canShowWebsite: true,
    canShowEmail: true,
    canShowPhone: true,
    canShowSocialLinks: false,
    canShowDescription: true,
    priorityRank: 2,
    hasFeaturedStyling: false,
    hasBasicAnalytics: true,
    hasAdvancedAnalytics: false,
    showPlanBadge: true,
    badgeText: "Starter",
    badgeColor: "blue",
    // Meta
    isPopular: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    key: "PRO",
    name: "Pro",
    nameNl: "Pro",
    description: "Maximum visibility and engagement",
    descriptionNl: "Maximale zichtbaarheid en betrokkenheid",
    monthlyPriceCents: 1900, // €19/month
    yearlyPriceCents: 19000, // €190/year (save €38)
    // Features
    maxPhotos: 10,
    maxCategories: 5,
    canShowWebsite: true,
    canShowEmail: true,
    canShowPhone: true,
    canShowSocialLinks: true,
    canShowDescription: true,
    priorityRank: 3,
    hasFeaturedStyling: true,
    hasBasicAnalytics: true,
    hasAdvancedAnalytics: true,
    showPlanBadge: true,
    badgeText: "Pro",
    badgeColor: "amber",
    // Meta
    isPopular: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    key: "ELITE",
    name: "Elite",
    nameNl: "Elite",
    description: "Enterprise features for large businesses",
    descriptionNl: "Enterprise functies voor grote bedrijven",
    monthlyPriceCents: 3900, // €39/month
    yearlyPriceCents: 39000, // €390/year (save €78)
    // Features
    maxPhotos: 20,
    maxCategories: 10,
    canShowWebsite: true,
    canShowEmail: true,
    canShowPhone: true,
    canShowSocialLinks: true,
    canShowDescription: true,
    priorityRank: 4,
    hasFeaturedStyling: true,
    hasBasicAnalytics: true,
    hasAdvancedAnalytics: true,
    showPlanBadge: true,
    badgeText: "Elite",
    badgeColor: "purple",
    // Meta
    isPopular: false,
    isActive: false, // Not available yet
    sortOrder: 4,
  },
];

async function seedSubscriptionPlans() {
  console.log("Seeding subscription plans...\n");

  for (const plan of SUBSCRIPTION_PLANS) {
    try {
      await db
        .insert(subscriptionPlans)
        .values(plan)
        .onConflictDoUpdate({
          target: subscriptionPlans.key,
          set: {
            name: plan.name,
            nameNl: plan.nameNl,
            description: plan.description,
            descriptionNl: plan.descriptionNl,
            monthlyPriceCents: plan.monthlyPriceCents,
            yearlyPriceCents: plan.yearlyPriceCents,
            maxPhotos: plan.maxPhotos,
            maxCategories: plan.maxCategories,
            canShowWebsite: plan.canShowWebsite,
            canShowEmail: plan.canShowEmail,
            canShowPhone: plan.canShowPhone,
            canShowSocialLinks: plan.canShowSocialLinks,
            canShowDescription: plan.canShowDescription,
            priorityRank: plan.priorityRank,
            hasFeaturedStyling: plan.hasFeaturedStyling,
            hasBasicAnalytics: plan.hasBasicAnalytics,
            hasAdvancedAnalytics: plan.hasAdvancedAnalytics,
            showPlanBadge: plan.showPlanBadge,
            badgeText: plan.badgeText,
            badgeColor: plan.badgeColor,
            isPopular: plan.isPopular,
            isActive: plan.isActive,
            sortOrder: plan.sortOrder,
          },
        });

      const priceDisplay = plan.monthlyPriceCents === 0
        ? "Free"
        : `€${plan.monthlyPriceCents / 100}/mo`;
      const statusIcon = plan.isActive ? "✅" : "⏳";

      console.log(`${statusIcon} ${plan.key}: ${plan.name} (${priceDisplay})`);
      console.log(`   📸 Photos: ${plan.maxPhotos} | 📂 Categories: ${plan.maxCategories} | Priority: ${plan.priorityRank}`);
    } catch (error) {
      console.error(`❌ Failed to seed plan ${plan.key}:`, error);
    }
  }

  console.log("\n🎉 Subscription plans seeded successfully!");
  console.log("\nPlan tiers:");
  console.log("  FREE    → Basic listing, no photos, no contact info");
  console.log("  STARTER → €7/mo - 3 photos, website/email/phone, description");
  console.log("  PRO     → €19/mo - 10 photos, social links, featured styling, analytics");
  console.log("  ELITE   → €39/mo - 20 photos, all features (coming soon)");
  console.log("\n⚠️  Note: Reviews are NOT gated - all tiers can receive, display, and respond to reviews!");
}

seedSubscriptionPlans()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
