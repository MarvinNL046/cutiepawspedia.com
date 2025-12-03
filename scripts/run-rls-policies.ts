/**
 * RLS Policies Migration Runner
 *
 * This script enables RLS on all tables and creates the security policies.
 *
 * IMPORTANT: This is a one-way migration. Once RLS is enabled, you cannot
 * easily disable it without dropping all policies first.
 *
 * Usage:
 *   npx tsx scripts/run-rls-policies.ts
 *
 * Add --dry-run to see what would be executed without making changes:
 *   npx tsx scripts/run-rls-policies.ts --dry-run
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

config();

const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);
const isDryRun = process.argv.includes("--dry-run");

interface PolicyStatement {
  name: string;
  sql: string;
}

async function runMigration() {
  console.log("🚀 RLS Policies Migration");
  console.log("=".repeat(60));

  if (isDryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  }

  // Read the migration file
  const migrationPath = join(process.cwd(), "drizzle", "0007_rls_complete.sql");
  const migrationSql = readFileSync(migrationPath, "utf-8");

  // Parse statements (split by semicolons, but carefully)
  const statements = parseSqlStatements(migrationSql);

  console.log(`Found ${statements.length} statements to execute\n`);

  // Group by type for better reporting
  const enableStatements = statements.filter((s) =>
    s.sql.includes("ENABLE ROW LEVEL SECURITY")
  );
  const policyStatements = statements.filter((s) =>
    s.sql.includes("CREATE POLICY")
  );

  console.log(`  - ${enableStatements.length} ENABLE RLS statements`);
  console.log(`  - ${policyStatements.length} CREATE POLICY statements\n`);

  if (isDryRun) {
    console.log("📋 Statements that would be executed:\n");
    for (const stmt of statements) {
      console.log(`  ${stmt.name}`);
    }
    console.log("\n✅ Dry run complete. Run without --dry-run to apply changes.");
    return;
  }

  // Execute statements
  let success = 0;
  let failed = 0;
  const errors: Array<{ name: string; error: string }> = [];

  for (const stmt of statements) {
    try {
      // Use sql.query() for raw SQL strings (not template literals)
      await sql.query(stmt.sql);
      console.log(`✅ ${stmt.name}`);
      success++;
    } catch (e: any) {
      // Check if it's a "already exists" error (policy already created)
      if (e.message.includes("already exists")) {
        console.log(`⏭️  ${stmt.name} (already exists)`);
        success++;
      } else {
        console.error(`❌ ${stmt.name}: ${e.message}`);
        errors.push({ name: stmt.name, error: e.message });
        failed++;
      }
    }
  }

  // Verify RLS status
  console.log("\n" + "=".repeat(60));
  console.log("📋 Verification\n");

  const rlsStatus = await sql`
    SELECT
      tablename,
      rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;

  console.log("Tables with RLS enabled:");
  for (const row of rlsStatus) {
    const status = row.rowsecurity ? "✅" : "❌";
    console.log(`  ${status} ${row.tablename}`);
  }

  // Count policies
  const policyCount = await sql`
    SELECT
      tablename,
      count(*) as policy_count
    FROM pg_policies
    WHERE schemaname = 'public'
    GROUP BY tablename
    ORDER BY tablename
  `;

  console.log("\nPolicies per table:");
  for (const row of policyCount) {
    console.log(`  ${row.tablename}: ${row.policy_count} policies`);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Summary\n");
  console.log(`  Successful: ${success}`);
  console.log(`  Failed: ${failed}`);

  if (errors.length > 0) {
    console.log("\nErrors:");
    for (const err of errors) {
      console.log(`  - ${err.name}: ${err.error}`);
    }
  }

  console.log("\n✅ Migration complete!");
}

/**
 * Parse SQL file into individual statements
 */
function parseSqlStatements(sql: string): PolicyStatement[] {
  const statements: PolicyStatement[] = [];

  // Remove comments and empty lines
  const lines = sql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  // Split by semicolons followed by newlines
  const rawStatements = lines.split(/;\s*\n/).filter((s) => s.trim().length > 0);

  for (const stmt of rawStatements) {
    const trimmed = stmt.trim();
    if (!trimmed) continue;

    // Extract a name for the statement
    let name = "Unknown";

    if (trimmed.includes("ENABLE ROW LEVEL SECURITY")) {
      const match = trimmed.match(/ALTER TABLE (\w+)/);
      name = match ? `Enable RLS: ${match[1]}` : "Enable RLS";
    } else if (trimmed.includes("CREATE POLICY")) {
      const match = trimmed.match(/CREATE POLICY (\w+)/);
      name = match ? `Policy: ${match[1]}` : "Create Policy";
    }

    statements.push({
      name,
      sql: trimmed + ";",
    });
  }

  return statements;
}

runMigration().catch(console.error);
