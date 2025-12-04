import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Check if DATABASE_URL is set
const connectionString = process.env.DATABASE_URL;

// Create a lazy-initialized database connection
function createDb(): NeonHttpDatabase<typeof schema> {
  if (!connectionString) {
    // For build-time type checking, return a mock db
    // At runtime, this will be checked by isDatabaseAvailable
    console.warn("DATABASE_URL not set - database queries will fail at runtime");
    // Return a non-null db for type safety - use proper Neon URL format
    const mockSql = neon("postgresql://mock:mock@mock.neon.tech/mock") as NeonQueryFunction<false, false>;
    return drizzle(mockSql, { schema });
  }
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export const db = createDb();

export type Database = typeof db;

// Helper to check if db is available
export function isDatabaseAvailable(): boolean {
  return !!connectionString;
}

/**
 * Helper to extract first result from Drizzle ORM returning() calls
 * Handles the NeonHttpQueryResult union type
 */
export function getFirst<T>(result: T[] | { rows: T[] }): T | undefined {
  if (Array.isArray(result)) {
    return result[0];
  }
  return result.rows?.[0];
}

/**
 * Helper to ensure result is an array from Drizzle ORM queries
 * Handles the NeonHttpQueryResult union type
 */
export function asArray<T>(result: T[] | { rows: T[] }): T[] {
  if (Array.isArray(result)) {
    return result;
  }
  return result.rows ?? [];
}
