import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';

async function main() {
  const connectionString = process.env.DATABASE_URL!;
  const sqlClient = neon(connectionString);
  const db = drizzle(sqlClient);

  const userId = 1; // Your user ID
  const testPlaceId = 1; // A place that exists

  console.log('=== Testing Favorites Flow ===\n');

  // 1. Test setting RLS context
  console.log('1. Testing RLS context setting...');
  try {
    const result = await db.transaction(async (tx) => {
      // Set RLS context
      await tx.execute(sql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true),
          set_config('app.business_id', '', true)
      `);

      // Check context was set
      const context = await tx.execute(sql`
        SELECT
          current_setting('app.user_id', true) as user_id,
          current_setting('app.user_role', true) as role
      `);
      console.log('   Context set:', context.rows);

      return context;
    });
    console.log('   ✅ RLS context setting works\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // 2. Test SELECT from user_favorites
  console.log('2. Testing SELECT from user_favorites with RLS context...');
  try {
    const result = await db.transaction(async (tx) => {
      await tx.execute(sql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `);

      const favorites = await tx.execute(sql`
        SELECT * FROM user_favorites WHERE user_id = ${userId}
      `);
      return favorites.rows;
    });
    console.log('   ✅ SELECT works, found', result.length, 'favorites\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // 3. Test INSERT into user_favorites
  console.log('3. Testing INSERT into user_favorites with RLS context...');
  try {
    await db.transaction(async (tx) => {
      await tx.execute(sql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `);

      await tx.execute(sql`
        INSERT INTO user_favorites (user_id, place_id)
        VALUES (${userId}, ${testPlaceId})
        ON CONFLICT DO NOTHING
      `);
    });
    console.log('   ✅ INSERT works\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // 4. Verify the insert worked
  console.log('4. Verifying insert...');
  try {
    const result = await db.transaction(async (tx) => {
      await tx.execute(sql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `);

      const favorites = await tx.execute(sql`
        SELECT * FROM user_favorites WHERE user_id = ${userId}
      `);
      return favorites.rows;
    });
    console.log('   Found favorites:', result);
    console.log('   ✅ Verification complete\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // 5. Test without RLS context (should fail or return empty)
  console.log('5. Testing SELECT without RLS context (should return empty or fail)...');
  try {
    const result = await db.execute(sql`
      SELECT * FROM user_favorites WHERE user_id = ${userId}
    `);
    console.log('   Result:', result.rows);
    if (result.rows.length > 0) {
      console.log('   ⚠️ Query returned results without RLS context - RLS might be bypassed!\n');
    } else {
      console.log('   ✅ No results without context (RLS working)\n');
    }
  } catch (e: any) {
    console.log('   ✅ Error (expected if RLS enforced):', e.message, '\n');
  }

  // 6. Test user_recent_views too
  console.log('6. Testing user_recent_views...');
  try {
    await db.transaction(async (tx) => {
      await tx.execute(sql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `);

      await tx.execute(sql`
        INSERT INTO user_recent_views (user_id, place_id)
        VALUES (${userId}, ${testPlaceId})
        ON CONFLICT (user_id, place_id) DO UPDATE SET viewed_at = NOW()
      `);

      const views = await tx.execute(sql`
        SELECT * FROM user_recent_views WHERE user_id = ${userId}
      `);
      console.log('   Recent views:', views.rows);
    });
    console.log('   ✅ user_recent_views works\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  console.log('=== Test Complete ===');
}

main().catch(console.error);
