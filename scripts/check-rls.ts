import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Check RLS status on all tables
  const rlsStatus = await sql`
    SELECT
      relname as table_name,
      relrowsecurity as rls_enabled,
      relforcerowsecurity as rls_forced
    FROM pg_class
    WHERE relnamespace = 'public'::regnamespace
    AND relkind = 'r'
    ORDER BY relname
  `;

  console.log('\nRLS Status on tables:');
  rlsStatus.forEach((t: any) => {
    const status = t.rls_enabled ? (t.rls_forced ? '✅ ENABLED+FORCED' : '✅ ENABLED') : '❌ DISABLED';
    console.log(`  ${t.table_name}: ${status}`);
  });

  // Check all policies
  const allPolicies = await sql`
    SELECT schemaname, tablename, policyname, cmd
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname
  `;

  console.log('\n\nAll RLS Policies:');
  if (allPolicies.length === 0) {
    console.log('  No policies found!');
  } else {
    allPolicies.forEach((p: any) => console.log(`  ${p.tablename}: ${p.policyname} (${p.cmd})`));
  }
}

main().catch(console.error);
