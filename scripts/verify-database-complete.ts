/**
 * Verify Database Complete Script
 *
 * Checks that all tables exist and have RLS enabled with proper policies.
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);

const EXPECTED_TABLES = [
  "countries",
  "cities",
  "categories",
  "users",
  "businesses",
  "places",
  "place_categories",
  "place_claims",
  "leads",
  "reviews",
  "review_replies",
  "review_photos",
  "credit_transactions",
  "audit_logs",
  "admin_audit_logs",
  "place_refresh_jobs",
  "ai_content_cache",
  "ai_generation_queue",
];

async function verify() {
  console.log("🔍 Database Verification");
  console.log("=".repeat(60) + "\n");

  // Get all tables
  const tables = await sql`
    SELECT tablename, rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;

  const existingTables = tables.map((t: any) => t.tablename);

  // Check tables
  console.log("📋 Tables in Database:\n");
  let missingTables: string[] = [];
  let tablesWithoutRls: string[] = [];

  for (const table of EXPECTED_TABLES) {
    const exists = existingTables.includes(table);
    const tableInfo = tables.find((t: any) => t.tablename === table);
    const hasRls = tableInfo?.rowsecurity === true;

    if (!exists) {
      missingTables.push(table);
      console.log(`  ❌ ${table} - MISSING`);
    } else if (!hasRls) {
      tablesWithoutRls.push(table);
      console.log(`  ⚠️ ${table} - No RLS`);
    } else {
      console.log(`  ✅ ${table} - RLS enabled`);
    }
  }

  // Get policy counts
  console.log("\n📊 Policy Counts per Table:\n");
  const policies = await sql`
    SELECT tablename, count(*) as policy_count
    FROM pg_policies
    WHERE schemaname = 'public'
    GROUP BY tablename
    ORDER BY tablename
  `;

  let totalPolicies = 0;
  for (const p of policies) {
    const count = parseInt(p.policy_count);
    totalPolicies += count;
    console.log(`  ${p.tablename}: ${count} policies`);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📈 Summary\n");
  console.log(`  Tables: ${EXPECTED_TABLES.length} expected, ${existingTables.length} found`);
  console.log(`  Missing tables: ${missingTables.length}`);
  console.log(`  Tables without RLS: ${tablesWithoutRls.length}`);
  console.log(`  Total RLS policies: ${totalPolicies}`);

  if (missingTables.length > 0) {
    console.log("\n  Missing tables:");
    missingTables.forEach((t) => console.log(`    - ${t}`));
  }

  if (tablesWithoutRls.length > 0) {
    console.log("\n  Tables without RLS:");
    tablesWithoutRls.forEach((t) => console.log(`    - ${t}`));
  }

  console.log("\n" + "=".repeat(60));

  if (missingTables.length === 0 && tablesWithoutRls.length === 0) {
    console.log("✅ Database is complete and secure!");
  } else {
    console.log("⚠️ Database has issues that need to be addressed");
  }
}

verify().catch(console.error);
