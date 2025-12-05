import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Add emailVerified column to users table
  try {
    await sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false NOT NULL
    `;
    console.log('✅ Added email_verified column to users table');
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('Column already exists, skipping');
    } else {
      throw error;
    }
  }
}

main().catch(console.error);
