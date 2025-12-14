import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Check current role and superuser status
  const roleInfo = await sql`
    SELECT
      current_user,
      session_user,
      (SELECT usesuper FROM pg_user WHERE usename = current_user) as is_superuser,
      (SELECT rolbypassrls FROM pg_roles WHERE rolname = current_user) as bypass_rls
  `;
  console.log('Current user info:', roleInfo);

  // Check if RLS is enabled and forced
  const rlsStatus = await sql`
    SELECT
      relname as table_name,
      relrowsecurity as rls_enabled,
      relforcerowsecurity as rls_forced
    FROM pg_class
    WHERE relnamespace = 'public'::regnamespace
    AND relname IN ('user_favorites', 'user_recent_views')
  `;
  console.log('\nRLS status:', rlsStatus);
}

main().catch(console.error);
