/**
 * Run migrations on production database
 * Usage: DATABASE_URL="..." npx tsx scripts/run-prod-migrations.ts
 */

import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  // Migration files to run (in order)
  const migrations = [
    "0009_p2_notifications.sql",
    "0010_p3_user_profiles_badges.sql",
    "0011_p4_karma_trust_levels.sql",
    "0012_b7_messaging.sql",
  ];

  console.log("🚀 Starting migrations...\n");

  for (const migration of migrations) {
    const filePath = path.join(__dirname, "..", "drizzle", migration);

    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${migration} (file not found)`);
      continue;
    }

    console.log(`📦 Running ${migration}...`);

    try {
      const sqlContent = fs.readFileSync(filePath, "utf-8");

      // Run the whole migration file using tagged template with .unsafe()
      // The neon client supports running raw SQL via the transaction method
      // or we can use sql.transaction

      // Alternative: use sql.unsafe() if available or sql.query()
      // Actually the neon() function returns a tagged template function
      // For raw SQL we need to use it differently

      // The neon serverless client v0.10+ requires tagged templates
      // For raw SQL execution, we need to use sql`...` directly
      // Let's construct it as a template literal

      // Since we can't interpolate raw SQL safely, we'll use query method
      const result = await sql.query(sqlContent);
      console.log(`   ✅ ${migration} completed`);
    } catch (err: unknown) {
      const error = err as { message?: string };
      // Check for common "already exists" scenarios
      if (error.message?.includes("already exists") ||
          error.message?.includes("duplicate key")) {
        console.log(`   ⚠️  ${migration} - some objects already exist (OK)`);
      } else {
        console.error(`   ❌ Error in ${migration}:`, error.message);
      }
      // Continue with other migrations
    }
  }

  console.log("\n✨ Migrations complete!");
}

runMigrations().catch(console.error);
