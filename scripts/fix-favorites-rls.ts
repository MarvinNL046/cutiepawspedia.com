import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log('Fixing user_favorites RLS...\n');

  // First, enable RLS
  try {
    await sql`ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY`;
    console.log('✅ Enabled RLS on user_favorites');
  } catch (e: any) {
    console.log('⚠️ RLS already enabled or error:', e.message);
  }

  // Drop existing policies if any
  const existingPolicies = ['user_favorites_select_own', 'user_favorites_insert_own', 'user_favorites_delete_own'];
  for (const policy of existingPolicies) {
    try {
      await sql.query(`DROP POLICY IF EXISTS "${policy}" ON user_favorites`);
    } catch (e) {
      // ignore
    }
  }

  // Create SELECT policy - users can see their own favorites
  try {
    await sql.query(`
      CREATE POLICY "user_favorites_select_own" ON user_favorites
      FOR SELECT
      USING (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
      )
    `);
    console.log('✅ Created SELECT policy');
  } catch (e: any) {
    console.log('⚠️ SELECT policy error:', e.message);
  }

  // Create INSERT policy
  try {
    await sql.query(`
      CREATE POLICY "user_favorites_insert_own" ON user_favorites
      FOR INSERT
      WITH CHECK (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
      )
    `);
    console.log('✅ Created INSERT policy');
  } catch (e: any) {
    console.log('⚠️ INSERT policy error:', e.message);
  }

  // Create DELETE policy
  try {
    await sql.query(`
      CREATE POLICY "user_favorites_delete_own" ON user_favorites
      FOR DELETE
      USING (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
      )
    `);
    console.log('✅ Created DELETE policy');
  } catch (e: any) {
    console.log('⚠️ DELETE policy error:', e.message);
  }

  // Force RLS
  try {
    await sql`ALTER TABLE user_favorites FORCE ROW LEVEL SECURITY`;
    console.log('✅ Forced RLS on user_favorites');
  } catch (e: any) {
    console.log('⚠️ Force RLS error:', e.message);
  }

  console.log('\n✨ Done! Now doing user_recent_views...\n');

  // Same for user_recent_views
  try {
    await sql`ALTER TABLE user_recent_views ENABLE ROW LEVEL SECURITY`;
    console.log('✅ Enabled RLS on user_recent_views');
  } catch (e: any) {
    console.log('⚠️ RLS already enabled or error:', e.message);
  }

  const recentPolicies = ['user_recent_views_select_own', 'user_recent_views_insert_own', 'user_recent_views_delete_own'];
  for (const policy of recentPolicies) {
    try {
      await sql.query(`DROP POLICY IF EXISTS "${policy}" ON user_recent_views`);
    } catch (e) {
      // ignore
    }
  }

  try {
    await sql.query(`
      CREATE POLICY "user_recent_views_select_own" ON user_recent_views
      FOR SELECT
      USING (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
      )
    `);
    console.log('✅ Created SELECT policy for recent_views');
  } catch (e: any) {
    console.log('⚠️ SELECT policy error:', e.message);
  }

  try {
    await sql.query(`
      CREATE POLICY "user_recent_views_insert_own" ON user_recent_views
      FOR INSERT
      WITH CHECK (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
      )
    `);
    console.log('✅ Created INSERT policy for recent_views');
  } catch (e: any) {
    console.log('⚠️ INSERT policy error:', e.message);
  }

  try {
    await sql.query(`
      CREATE POLICY "user_recent_views_delete_own" ON user_recent_views
      FOR DELETE
      USING (
        user_id = NULLIF(current_setting('app.user_id', true), '')::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
      )
    `);
    console.log('✅ Created DELETE policy for recent_views');
  } catch (e: any) {
    console.log('⚠️ DELETE policy error:', e.message);
  }

  try {
    await sql`ALTER TABLE user_recent_views FORCE ROW LEVEL SECURITY`;
    console.log('✅ Forced RLS on user_recent_views');
  } catch (e: any) {
    console.log('⚠️ Force RLS error:', e.message);
  }

  console.log('\n✨ All done!');
}

main().catch(console.error);
