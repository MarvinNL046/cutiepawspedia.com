import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Check RLS policies on users table
  const policies = await sql`
    SELECT
      schemaname, tablename, policyname,
      permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename = 'users'
  `;

  console.log('\nRLS Policies on users table:');
  policies.forEach((p: any) => {
    console.log(`\nPolicy: ${p.policyname}`);
    console.log(`  Command: ${p.cmd}`);
    console.log(`  USING: ${p.qual}`);
    if (p.with_check) console.log(`  WITH CHECK: ${p.with_check}`);
  });

  // Test query without RLS context
  console.log('\n\nTesting query without RLS context:');
  try {
    const users = await sql`SELECT id, email, role FROM users LIMIT 5`;
    console.log('Result:', users);
  } catch (e: any) {
    console.log('Error:', e.message);
  }
}

main().catch(console.error);
