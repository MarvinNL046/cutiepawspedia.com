/**
 * Seed Trust Level Definitions
 *
 * Run with: npx tsx scripts/seed-trust-levels.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { trustLevelDefinitions } from "../db/schema/directory";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

// Trust level definitions with gamification elements
const TRUST_LEVELS = [
  {
    level: 0,
    name: "Newcomer",
    nameNl: "Nieuwkomer",
    description: "Just getting started! Write your first review to begin earning karma.",
    descriptionNl: "Net begonnen! Schrijf je eerste review om karma te verdienen.",
    minKarma: 0,
    icon: "🌱",
    color: "slate",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 2,
    reviewsAutoApproved: false,
    canFlagReviews: false,
  },
  {
    level: 1,
    name: "Explorer",
    nameNl: "Ontdekker",
    description: "You've started exploring! Keep reviewing to level up.",
    descriptionNl: "Je bent begonnen met ontdekken! Blijf reviewen om te levelen.",
    minKarma: 25,
    icon: "🔍",
    color: "green",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 3,
    reviewsAutoApproved: false,
    canFlagReviews: false,
  },
  {
    level: 2,
    name: "Contributor",
    nameNl: "Bijdrager",
    description: "A valued contributor to our community!",
    descriptionNl: "Een gewaardeerde bijdrager aan onze community!",
    minKarma: 75,
    icon: "⭐",
    color: "blue",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 5,
    reviewsAutoApproved: false,
    canFlagReviews: true,
  },
  {
    level: 3,
    name: "Trusted Reviewer",
    nameNl: "Vertrouwde Reviewer",
    description: "Your reviews are trusted and help others make decisions.",
    descriptionNl: "Je reviews worden vertrouwd en helpen anderen bij hun keuzes.",
    minKarma: 150,
    icon: "🏆",
    color: "amber",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 8,
    reviewsAutoApproved: true, // Reviews auto-approved!
    canFlagReviews: true,
  },
  {
    level: 4,
    name: "Expert",
    nameNl: "Expert",
    description: "A respected expert in our community!",
    descriptionNl: "Een gerespecteerde expert in onze community!",
    minKarma: 300,
    icon: "💎",
    color: "purple",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 10,
    reviewsAutoApproved: true,
    canFlagReviews: true,
  },
  {
    level: 5,
    name: "Legend",
    nameNl: "Legende",
    description: "A legendary community member! Thank you for your contributions.",
    descriptionNl: "Een legendarisch communitylid! Bedankt voor je bijdragen.",
    minKarma: 500,
    icon: "👑",
    color: "orange",
    canReview: true,
    canUploadPhotos: true,
    maxPhotosPerReview: 15,
    reviewsAutoApproved: true,
    canFlagReviews: true,
  },
];

async function seedTrustLevels() {
  console.log("Seeding trust level definitions...\n");

  for (const level of TRUST_LEVELS) {
    try {
      await db
        .insert(trustLevelDefinitions)
        .values(level)
        .onConflictDoUpdate({
          target: trustLevelDefinitions.level,
          set: {
            name: level.name,
            nameNl: level.nameNl,
            description: level.description,
            descriptionNl: level.descriptionNl,
            minKarma: level.minKarma,
            icon: level.icon,
            color: level.color,
            canReview: level.canReview,
            canUploadPhotos: level.canUploadPhotos,
            maxPhotosPerReview: level.maxPhotosPerReview,
            reviewsAutoApproved: level.reviewsAutoApproved,
            canFlagReviews: level.canFlagReviews,
          },
        });

      console.log(`✅ Level ${level.level}: ${level.icon} ${level.name} (${level.minKarma}+ karma)`);
    } catch (error) {
      console.error(`❌ Failed to seed level ${level.level}:`, error);
    }
  }

  console.log("\n🎉 Trust levels seeded successfully!");
  console.log("\nKarma progression:");
  console.log("  0 karma   → 🌱 Newcomer");
  console.log("  25 karma  → 🔍 Explorer");
  console.log("  75 karma  → ⭐ Contributor (can flag reviews)");
  console.log("  150 karma → 🏆 Trusted Reviewer (reviews auto-approved!)");
  console.log("  300 karma → 💎 Expert");
  console.log("  500 karma → 👑 Legend");
}

seedTrustLevels()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
