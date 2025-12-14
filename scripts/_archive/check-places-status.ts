import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL as string);

async function check() {
  // Check places status column
  const cols = await sql`
    SELECT column_name, data_type, udt_name
    FROM information_schema.columns
    WHERE table_name = 'places' AND column_name = 'status'
  `;
  console.log("Places status column:", cols);

  // Try a simple query
  try {
    const result = await sql`SELECT id, name, status FROM places LIMIT 1`;
    console.log("Sample place:", result);
  } catch (e: any) {
    console.log("Error:", e.message);
  }
}
check();
