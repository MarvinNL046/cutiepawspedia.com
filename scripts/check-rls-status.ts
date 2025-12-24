/**
 * Check RLS status on all database tables
 * Run with: npx tsx scripts/check-rls-status.ts
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Get all tables with their RLS status
  const tablesResult = await sql`
    SELECT
      c.relname as table_name,
      c.relrowsecurity as rls_enabled,
      c.relforcerowsecurity as rls_forced,
      c.oid as table_oid
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
    AND c.relkind = 'r'
    ORDER BY c.relname;
  `;

  // Get all policies
  const policiesResult = await sql`
    SELECT tablename, COUNT(*) as count
    FROM pg_policies
    WHERE schemaname = 'public'
    GROUP BY tablename;
  `;

  // Create a map of table -> policy count
  const policyMap = new Map<string, number>();
  for (const row of policiesResult) {
    policyMap.set(row.tablename, Number(row.count));
  }

  // Merge results
  const result = tablesResult.map(table => ({
    ...table,
    policy_count: policyMap.get(table.table_name) || 0
  }));

  console.log('\n📊 RLS Status for all tables:\n');
  console.log('Table Name'.padEnd(35), 'RLS?', 'Forced?', 'Policies');
  console.log('-'.repeat(60));

  let enabledCount = 0;
  let disabledCount = 0;
  let withPolicies = 0;

  for (const row of result) {
    const rlsStatus = row.rls_enabled ? '✅' : '❌';
    const forcedStatus = row.rls_forced ? '✅' : '❌';

    console.log(
      row.table_name.padEnd(35),
      rlsStatus.padEnd(5),
      forcedStatus.padEnd(8),
      row.policy_count
    );

    if (row.rls_enabled) enabledCount++;
    else disabledCount++;
    if (Number(row.policy_count) > 0) withPolicies++;
  }

  console.log('-'.repeat(60));
  console.log(`\n📈 Summary:`);
  console.log(`   Total tables: ${result.length}`);
  console.log(`   RLS enabled: ${enabledCount}`);
  console.log(`   RLS disabled: ${disabledCount}`);
  console.log(`   Tables with policies: ${withPolicies}`);

  // List tables without RLS
  const withoutRls = result.filter(r => !r.rls_enabled);
  if (withoutRls.length > 0) {
    console.log(`\n⚠️  Tables WITHOUT RLS (${withoutRls.length}):`);
    for (const row of withoutRls) {
      console.log(`   - ${row.table_name}`);
    }
  }
}

main().catch(console.error);
