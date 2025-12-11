import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';

async function main() {
  const connectionString = process.env.DATABASE_URL!;
  const sql = neon(connectionString);

  const userId = 1;
  const testPlaceId = 1;

  console.log('=== Testing Neon Transaction for RLS ===\n');

  // Test using neon's transaction() function
  console.log('1. Testing neon transaction with RLS context...');
  try {
    const result = await sql.transaction(async (txSql) => {
      // Set RLS context
      await txSql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true),
          set_config('app.business_id', '', true)
      `;

      // Verify context
      const context = await txSql`
        SELECT
          current_setting('app.user_id', true) as user_id,
          current_setting('app.user_role', true) as role
      `;
      console.log('   Context:', context);

      // Try SELECT from user_favorites
      const favorites = await txSql`
        SELECT * FROM user_favorites WHERE user_id = ${userId}
      `;
      console.log('   Favorites found:', favorites.length);

      return { context, favorites };
    });
    console.log('   ✅ Transaction works!\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // Test INSERT
  console.log('2. Testing INSERT with RLS context...');
  try {
    await sql.transaction(async (txSql) => {
      await txSql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `;

      await txSql`
        INSERT INTO user_favorites (user_id, place_id)
        VALUES (${userId}, ${testPlaceId})
        ON CONFLICT DO NOTHING
      `;
      console.log('   ✅ INSERT works!\n');
    });
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // Test with Drizzle inside transaction
  console.log('3. Testing Drizzle inside neon transaction...');
  try {
    const result = await sql.transaction(async (txSql) => {
      await txSql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `;

      // Create drizzle instance with transaction client
      const txDb = drizzle(txSql, { schema });

      // Use drizzle query
      const favorites = await txDb
        .select()
        .from(schema.userFavorites)
        .where(eq(schema.userFavorites.userId, userId));

      return favorites;
    });
    console.log('   Favorites via Drizzle:', result.length);
    console.log('   ✅ Drizzle in transaction works!\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  // Test user_recent_views
  console.log('4. Testing user_recent_views...');
  try {
    await sql.transaction(async (txSql) => {
      await txSql`
        SELECT
          set_config('app.user_id', ${userId.toString()}, true),
          set_config('app.user_role', 'user', true)
      `;

      await txSql`
        INSERT INTO user_recent_views (user_id, place_id)
        VALUES (${userId}, ${testPlaceId})
        ON CONFLICT (user_id, place_id) DO UPDATE SET viewed_at = NOW()
      `;

      const views = await txSql`
        SELECT * FROM user_recent_views WHERE user_id = ${userId}
      `;
      console.log('   Recent views:', views.length);
    });
    console.log('   ✅ Recent views works!\n');
  } catch (e: any) {
    console.log('   ❌ Error:', e.message, '\n');
  }

  console.log('=== Test Complete ===');
}

main().catch(console.error);
