/**
 * Award Verified User Badge to Existing Users
 *
 * Run with: npx tsx scripts/award-verified-badges.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
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

async function awardVerifiedBadges() {
  console.log("🔍 Finding users with verified emails...\n");

  // Get all users with verified email
  const verifiedUsers = await sql`
    SELECT id, email, name, email_verified
    FROM users
    WHERE email_verified = true
  `;

  console.log(`Found ${verifiedUsers.length} users with verified emails\n`);

  let awarded = 0;
  let alreadyHad = 0;

  for (const user of verifiedUsers) {
    // Check if user already has the badge
    const existingBadge = await sql`
      SELECT id FROM user_badges
      WHERE user_id = ${user.id} AND badge_key = 'verified_user'
    `;

    if (existingBadge.length > 0) {
      alreadyHad++;
      console.log(`  ⏭️  ${user.email} - already has badge`);
      continue;
    }

    // Award the badge
    try {
      await sql`
        INSERT INTO user_badges (user_id, badge_key, awarded_by, notes)
        VALUES (${user.id}, 'verified_user', 'system', 'Email verified (retroactive)')
      `;
      awarded++;
      console.log(`  ✅ ${user.email} - badge awarded!`);
    } catch (error) {
      console.error(`  ❌ ${user.email} - failed:`, error);
    }
  }

  console.log("\n📊 Summary:");
  console.log(`  - ${awarded} badges awarded`);
  console.log(`  - ${alreadyHad} users already had the badge`);
  console.log(`  - ${verifiedUsers.length} total verified users`);
}

awardVerifiedBadges()
  .then(() => {
    console.log("\n🎉 Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
