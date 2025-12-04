import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log("Creating user_favorites table...");
  await sql`
    CREATE TABLE IF NOT EXISTS user_favorites (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      UNIQUE(user_id, place_id)
    )
  `;
  console.log("user_favorites table created!");

  console.log("Creating user_recent_views table...");
  await sql`
    CREATE TABLE IF NOT EXISTS user_recent_views (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
      viewed_at TIMESTAMP DEFAULT NOW() NOT NULL,
      UNIQUE(user_id, place_id)
    )
  `;
  console.log("user_recent_views table created!");

  console.log("Migration complete!");
}

migrate().catch(console.error);
