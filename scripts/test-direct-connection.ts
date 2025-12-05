import { neon } from '@neondatabase/serverless';

async function main() {
  // Use direct connection (not pooler) for session state
  const pooledUrl = process.env.DATABASE_URL!;
  const directUrl = pooledUrl.replace('-pooler', '');

  console.log('Testing with direct connection (no pooler)...\n');
  console.log('Pooled URL:', pooledUrl.substring(0, 50) + '...');
  console.log('Direct URL:', directUrl.substring(0, 50) + '...\n');

  const sql = neon(directUrl);

  const userId = 1;
  const testPlaceId = 1;

  // Test 1: Check if we can set and read config in same "batch"
  console.log('1. Testing batch query approach...');
  try {
    // Neon allows batching queries with an array
    const results = await sql.transaction([
      sql`SELECT set_config('app.user_id', ${userId.toString()}, false)`,
      sql`SELECT current_setting('app.user_id', true) as user_id`,
      sql`SELECT * FROM user_favorites WHERE user_id = ${userId}`,
    ]);
    console.log('   Batch results:', results);
  } catch (e: any) {
    console.log('   ❌ Error:', e.message);
  }

  // Test 2: Use session-level settings
  console.log('\n2. Testing session-level settings (set_config with false)...');
  try {
    // Set config at session level
    await sql`SELECT set_config('app.user_id', ${userId.toString()}, false)`;
    await sql`SELECT set_config('app.user_role', 'user', false)`;

    // Check if it persists
    const check = await sql`SELECT current_setting('app.user_id', true) as uid`;
    console.log('   After setting:', check);

    // Try to read favorites
    const favorites = await sql`SELECT * FROM user_favorites WHERE user_id = ${userId}`;
    console.log('   Favorites:', favorites);
  } catch (e: any) {
    console.log('   ❌ Error:', e.message);
  }

  // Test 3: Single query with everything
  console.log('\n3. Testing CTE approach (single query)...');
  try {
    const result = await sql`
      WITH set_context AS (
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      )
      SELECT uf.*
      FROM user_favorites uf, set_context
      WHERE uf.user_id = ${userId}
    `;
    console.log('   CTE result:', result);
  } catch (e: any) {
    console.log('   ❌ Error:', e.message);
  }

  // Test 4: Check if we can insert with CTE
  console.log('\n4. Testing INSERT with CTE...');
  try {
    const result = await sql`
      WITH set_context AS (
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      )
      INSERT INTO user_favorites (user_id, place_id)
      SELECT ${userId}, ${testPlaceId}
      FROM set_context
      WHERE NOT EXISTS (
        SELECT 1 FROM user_favorites
        WHERE user_id = ${userId} AND place_id = ${testPlaceId}
      )
      RETURNING *
    `;
    console.log('   INSERT result:', result);
  } catch (e: any) {
    console.log('   ❌ Error:', e.message);
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
