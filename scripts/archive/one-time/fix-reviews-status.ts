/**
 * Fix Reviews Table - Add status column and create policy
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);

async function fixReviewsTable() {
  console.log("🔧 Fixing reviews table...\n");

  // Check if status column exists
  const columns = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'status'
  `;

  if (columns.length === 0) {
    console.log("Adding status column to reviews...");
    // First create the enum if it doesn't exist
    try {
      await sql.query(`
        DO $$ BEGIN
            CREATE TYPE review_status AS ENUM ('pending', 'published', 'rejected', 'flagged');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$
      `);
      console.log("  ✅ review_status enum ready");
    } catch (e: any) {
      console.log(`  ⚠️ Enum: ${e.message}`);
    }

    // Add the column
    try {
      await sql.query(`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS status review_status DEFAULT 'pending' NOT NULL`);
      console.log("  ✅ Added status column to reviews");
    } catch (e: any) {
      console.log(`  ❌ Column add: ${e.message}`);
    }
  } else {
    console.log("✅ Status column already exists");
  }

  // Now create/replace the policy
  console.log("\nDropping existing reviews_select_public policy if exists...");
  try {
    await sql.query(`DROP POLICY IF EXISTS reviews_select_public ON reviews`);
    console.log("  ✅ Dropped old policy");
  } catch (e: any) {
    console.log(`  ⚠️ Drop: ${e.message}`);
  }

  console.log("Creating reviews_select_public policy...");
  try {
    await sql.query(`
      CREATE POLICY reviews_select_public ON reviews
        FOR SELECT
        USING (
          status = 'published'
          OR is_admin()
          OR user_id = app_user_id()
        )
    `);
    console.log("  ✅ Created reviews_select_public policy");
  } catch (e: any) {
    console.log(`  ❌ Policy create: ${e.message}`);
  }

  // Verify
  const policies = await sql`
    SELECT policyname FROM pg_policies WHERE tablename = 'reviews'
  `;
  console.log("\nReviews table policies:");
  for (const p of policies) {
    console.log("  - " + p.policyname);
  }
}

fixReviewsTable().catch(console.error);
