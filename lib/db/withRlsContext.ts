/**
 * RLS Context Helper for Neon Postgres + Drizzle ORM
 *
 * NOTE: The neondb_owner role has BYPASSRLS privilege, meaning RLS policies
 * are not enforced for our application queries. However, we still use
 * user_id filtering in application code for proper data isolation.
 *
 * This module provides a simplified approach that works with Neon's HTTP driver
 * by using direct queries with WHERE clauses instead of RLS context.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

/**
 * Options for RLS context
 */
export interface RlsContextOptions {
  /** Database user ID (users.id) - undefined or null for anonymous */
  userId?: number | string | null;
  /** User role: 'admin', 'business', 'user' - undefined or null for anonymous */
  role?: string | null;
  /** Business ID the user is acting as (optional) */
  businessId?: number | string | null;
}

/**
 * Database type for RLS queries
 */
export type RlsTransaction = NeonHttpDatabase<typeof schema>;

// Cached database instance
let cachedDb: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Get or create database instance
 */
function getDb(): NeonHttpDatabase<typeof schema> {
  if (cachedDb) return cachedDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(connectionString);
  cachedDb = drizzle(sql, { schema });
  return cachedDb;
}

/**
 * Execute a database operation.
 *
 * NOTE: Since neondb_owner bypasses RLS, we rely on application-level
 * filtering (WHERE user_id = X) instead of RLS policies. This is safe
 * as long as queries properly filter by user_id.
 *
 * @param options - Context options (userId, role, businessId) - for documentation purposes
 * @param callback - Function that receives the db and performs queries
 * @returns The result of the callback function
 */
export async function withRlsContext<T>(
  options: RlsContextOptions,
  callback: (db: RlsTransaction) => Promise<T>
): Promise<T> {
  const db = getDb();
  return callback(db);
}

/**
 * Execute a database operation with admin context.
 * @param adminUserId - The admin user's database ID
 * @param callback - Function that receives the db
 */
export async function withAdminContext<T>(
  adminUserId: number | string,
  callback: (db: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    { userId: adminUserId, role: "admin" },
    callback
  );
}

/**
 * Execute a database operation with business context.
 * @param userId - The user's database ID
 * @param businessId - The business ID they're acting as
 * @param callback - Function that receives the db
 */
export async function withBusinessContext<T>(
  userId: number | string,
  businessId: number | string,
  callback: (db: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    { userId, role: "business", businessId },
    callback
  );
}

/**
 * Execute a database operation with anonymous/public context.
 * @param callback - Function that receives the db
 */
export async function withPublicContext<T>(
  callback: (db: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext({}, callback);
}

/**
 * Execute a database operation with authenticated user context.
 * @param userId - The user's database ID
 * @param callback - Function that receives the db
 */
export async function withUserContext<T>(
  userId: number | string,
  callback: (db: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    { userId, role: "user" },
    callback
  );
}
