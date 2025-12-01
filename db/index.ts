import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Check if DATABASE_URL is set
const connectionString = process.env.DATABASE_URL;

// Create a lazy-initialized database connection
function createDb() {
  if (!connectionString) {
    console.warn("DATABASE_URL not set - database queries will return empty results");
    return null;
  }
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export const db = createDb();

export type Database = NonNullable<typeof db>;

// Helper to check if db is available
export function isDatabaseAvailable(): boolean {
  return db !== null;
}
