/**
 * Recovery Script: Create business from Stripe checkout session
 *
 * Run with: npx tsx scripts/recover-stripe-session.ts SESSION_ID
 *
 * This recovers a failed onboarding where payment succeeded but
 * the redirect failed (e.g., went to localhost).
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema/directory";
import Stripe from "stripe";
import * as dotenv from "dotenv";

// Load environment variables - always override with .env
dotenv.config({ path: ".env", override: true });

const databaseUrl = process.env.DATABASE_URL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL not found");
  process.exit(1);
}

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY not found");
  process.exit(1);
}

const sessionId = process.argv[2];
if (!sessionId) {
  console.error("❌ Usage: npx tsx scripts/recover-stripe-session.ts cs_live_xxx");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-11-17.clover" });

async function recoverSession() {
  console.log(`\n🔍 Retrieving Stripe session: ${sessionId}\n`);

  try {
    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("Session status:", session.payment_status);
    console.log("Session mode:", session.mode);
    console.log("Customer:", session.customer);
    console.log("Subscription:", session.subscription);

    if (session.payment_status !== "paid") {
      console.error("❌ Payment not completed");
      process.exit(1);
    }

    const metadata = session.metadata;
    if (!metadata || metadata.type !== "onboarding") {
      console.error("❌ Not an onboarding session");
      console.log("Metadata:", metadata);
      process.exit(1);
    }

    console.log("\n📋 Business data from session:");
    console.log("  User ID:", metadata.userId);
    console.log("  Business Name:", metadata.businessName);
    console.log("  Plan:", metadata.planKey);
    console.log("  Place:", metadata.placeName);
    console.log("  City ID:", metadata.cityId);

    // Check if business already exists for this user
    const existingBusiness = await db.query.businesses.findFirst({
      where: eq(schema.businesses.userId, parseInt(metadata.userId, 10)),
    });

    if (existingBusiness) {
      console.log("\n⚠️  User already has a business:", existingBusiness.name);
      console.log("   Business ID:", existingBusiness.id);

      // Update with Stripe info if missing
      if (!existingBusiness.stripeSubscriptionId && session.subscription) {
        await db
          .update(schema.businesses)
          .set({
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            planKey: metadata.planKey,
            planStatus: "ACTIVE",
          })
          .where(eq(schema.businesses.id, existingBusiness.id));
        console.log("✅ Updated business with Stripe subscription info");
      }
      process.exit(0);
    }

    // Create slug
    const baseSlug = metadata.placeName
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 100) || "business";

    // Create business
    console.log("\n🏢 Creating business...");
    const [newBusiness] = await db
      .insert(schema.businesses)
      .values({
        name: metadata.businessName,
        description: metadata.businessDescription || null,
        contactPhone: metadata.businessPhone || null,
        contactEmail: metadata.businessEmail,
        website: metadata.businessWebsite || null,
        userId: parseInt(metadata.userId, 10),
        planKey: metadata.planKey,
        planStatus: "ACTIVE",
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        creditBalanceCents: 0,
      })
      .returning();

    console.log("✅ Business created:", newBusiness.id, newBusiness.name);

    // Create place if data provided
    if (metadata.placeName && metadata.cityId) {
      console.log("\n📍 Creating place...");
      const [newPlace] = await db
        .insert(schema.places)
        .values({
          name: metadata.placeName,
          slug: baseSlug,
          description: metadata.placeDescription || null,
          address: metadata.placeAddress || null,
          cityId: parseInt(metadata.cityId, 10),
          businessId: newBusiness.id,
          ownerId: parseInt(metadata.userId, 10),
          isPremium: false,
          premiumLevel: 0,
          reviewCount: 0,
        })
        .returning();

      console.log("✅ Place created:", newPlace.id, newPlace.name);

      // Add categories
      if (metadata.categoryIds) {
        const categoryIds = JSON.parse(metadata.categoryIds);
        if (categoryIds.length > 0) {
          await db.insert(schema.placeCategories).values(
            categoryIds.map((categoryId: number) => ({
              placeId: newPlace.id,
              categoryId,
            }))
          );
          console.log("✅ Categories added:", categoryIds.join(", "));
        }
      }
    }

    console.log("\n🎉 Recovery complete!");
    console.log(`\n   Dashboard: https://www.cutiepawspedia.com/en/dashboard/business/${newBusiness.id}`);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

recoverSession();
