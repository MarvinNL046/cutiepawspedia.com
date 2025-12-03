/**
 * RLS Context Helper for Neon Postgres + Drizzle ORM
 *
 * This module provides a way to execute database queries with Row-Level Security
 * context. Since we use StackAuth (not Supabase), we don't have auth.uid().
 * Instead, we use Postgres custom settings (GUCs) to pass user context.
 *
 * Usage:
 *
 * ```typescript
 * import { withRlsContext } from "@/lib/db/withRlsContext";
 *
 * // For authenticated requests:
 * const result = await withRlsContext({
 *   userId: dbUser.id,
 *   role: dbUser.role,
 *   businessId: activeBusinessId,
 * }, async (tx) => {
 *   return tx.select().from(leads).where(...);
 * });
 *
 * // For public/anonymous requests:
 * const result = await withRlsContext({}, async (tx) => {
 *   return tx.select().from(places).where(...);
 * });
 * ```
 */

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import * as schema from "@/db/schema";

// Enable connection caching for better performance
neonConfig.fetchConnectionCache = true;

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
 * Transaction type from Drizzle
 */
export type RlsTransaction = Parameters<
  Parameters<ReturnType<typeof drizzle<typeof schema>>["transaction"]>[0]
>[0];

/**
 * Execute a database operation with RLS context set.
 *
 * This wraps the operation in a transaction and sets the GUC variables
 * that RLS policies can use to determine access.
 *
 * @param options - RLS context options (userId, role, businessId)
 * @param callback - Function that receives the transaction and performs queries
 * @returns The result of the callback function
 *
 * @example
 * ```typescript
 * // Authenticated user query
 * const leads = await withRlsContext({
 *   userId: currentUser.id,
 *   role: currentUser.role,
 *   businessId: currentUser.activeBusinessId,
 * }, async (tx) => {
 *   return tx.select().from(schema.leads);
 * });
 *
 * // Anonymous/public query
 * const places = await withRlsContext({}, async (tx) => {
 *   return tx.select().from(schema.places).where(eq(schema.places.status, 'active'));
 * });
 * ```
 */
export async function withRlsContext<T>(
  options: RlsContextOptions,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Create a fresh connection for this transaction
  const sqlClient = neon(connectionString);
  const db = drizzle(sqlClient, { schema });

  // Prepare context values (empty string = not set)
  const userId = options.userId?.toString() ?? "";
  const role = options.role ?? "";
  const businessId = options.businessId?.toString() ?? "";

  // Execute within a transaction
  return db.transaction(async (tx) => {
    // Set RLS context variables using set_config
    // The third parameter 'true' makes it local to the current transaction
    await tx.execute(sql`
      SELECT
        set_config('app.user_id', ${userId}, true),
        set_config('app.user_role', ${role}, true),
        set_config('app.business_id', ${businessId}, true)
    `);

    // Execute the callback with the transaction
    return callback(tx);
  });
}

/**
 * Execute a database operation with admin context.
 * Convenience wrapper for admin operations.
 *
 * @param adminUserId - The admin user's database ID
 * @param callback - Function that receives the transaction
 */
export async function withAdminContext<T>(
  adminUserId: number | string,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    {
      userId: adminUserId,
      role: "admin",
    },
    callback
  );
}

/**
 * Execute a database operation with business context.
 * Convenience wrapper for business dashboard operations.
 *
 * @param userId - The user's database ID
 * @param businessId - The business ID they're acting as
 * @param callback - Function that receives the transaction
 */
export async function withBusinessContext<T>(
  userId: number | string,
  businessId: number | string,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    {
      userId,
      role: "business",
      businessId,
    },
    callback
  );
}

/**
 * Execute a database operation with anonymous/public context.
 * Convenience wrapper for public-facing queries.
 *
 * @param callback - Function that receives the transaction
 */
export async function withPublicContext<T>(
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext({}, callback);
}

/**
 * Execute a database operation with authenticated user context.
 * Convenience wrapper for regular user operations.
 *
 * @param userId - The user's database ID
 * @param callback - Function that receives the transaction
 */
export async function withUserContext<T>(
  userId: number | string,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withRlsContext(
    {
      userId,
      role: "user",
    },
    callback
  );
}
