import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Check RLS policies on user_favorites
  const policies = await sql`
    SELECT
      schemaname, tablename, policyname,
      permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename = 'user_favorites'
  `;

  console.log('\nRLS Policies on user_favorites:');
  policies.forEach((p: any) => {
    console.log(`\nPolicy: ${p.policyname}`);
    console.log(`  Command: ${p.cmd}`);
    console.log(`  USING: ${p.qual}`);
    if (p.with_check) console.log(`  WITH CHECK: ${p.with_check}`);
  });
}

main().catch(console.error);
