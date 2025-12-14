/**
 * Add google_place_id and google_cid columns to places table
 */
import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function addColumns() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const sql = neon(connectionString);

  console.log("Adding google_place_id and google_cid columns...");

  try {
    // Add google_place_id column
    await sql`
      ALTER TABLE places
      ADD COLUMN IF NOT EXISTS google_place_id VARCHAR(255)
    `;
    console.log("✅ Added google_place_id column");

    // Add google_cid column
    await sql`
      ALTER TABLE places
      ADD COLUMN IF NOT EXISTS google_cid VARCHAR(50)
    `;
    console.log("✅ Added google_cid column");

    // Check result
    const check = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'places'
      AND column_name IN ('google_place_id', 'google_cid')
    `;
    console.log("\nColumns in places table:", check.map(c => c.column_name));

    console.log("\n✅ Done!");
  } catch (error) {
    console.error("Error:", error);
  }

  process.exit(0);
}

addColumns();
