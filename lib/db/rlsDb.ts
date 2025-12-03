/**
 * RLS Database Integration
 *
 * This module provides database access with automatic RLS context based on
 * the current user's session. It integrates StackAuth with PostgreSQL RLS.
 *
 * Usage patterns:
 *
 * 1. Public queries (anonymous access):
 *    const places = await publicDb(tx => tx.select().from(schema.places));
 *
 * 2. Authenticated user queries:
 *    const user = await getCurrentDbUser();
 *    if (user) {
 *      const claims = await authDb(user, tx => tx.select().from(schema.placeClaims));
 *    }
 *
 * 3. Admin queries:
 *    const adminUser = await requireAdmin(locale);
 *    const allUsers = await adminDb(adminUser, tx => tx.select().from(schema.users));
 *
 * 4. Business queries with specific business context:
 *    const leads = await businessDb(user, businessId, tx => tx.select().from(schema.leads));
 */

import "server-only";
import { stackServerApp, isStackAuthConfigured } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import {
  withRlsContext,
  withAdminContext,
  withBusinessContext,
  withUserContext,
  withPublicContext,
  type RlsTransaction,
} from "./withRlsContext";

/**
 * Database user type (from our users table)
 */
export interface DbUser {
  id: number;
  stackauthId: string;
  email: string;
  name: string | null;
  role: string;
}

/**
 * Get the current authenticated user from the database
 * Returns null if not authenticated or user not found
 */
export async function getCurrentDbUser(): Promise<DbUser | null> {
  if (!isStackAuthConfigured || !stackServerApp) {
    return null;
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return null;
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    return null;
  }

  return {
    id: dbUser.id,
    stackauthId: dbUser.stackauthId,
    email: dbUser.email,
    name: dbUser.name,
    role: dbUser.role,
  };
}

/**
 * Execute a query with public/anonymous RLS context
 * Use for public-facing queries (places directory, categories, etc.)
 */
export async function publicDb<T>(
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withPublicContext(callback);
}

/**
 * Execute a query with authenticated user RLS context
 * User can access their own data based on RLS policies
 */
export async function authDb<T>(
  user: DbUser,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withUserContext(user.id, callback);
}

/**
 * Execute a query with admin RLS context
 * Admin can access all data based on RLS policies
 */
export async function adminDb<T>(
  adminUser: DbUser,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  if (adminUser.role !== "admin") {
    throw new Error("User is not an admin");
  }
  return withAdminContext(adminUser.id, callback);
}

/**
 * Execute a query with business owner RLS context
 * Business owner can access their business data based on RLS policies
 */
export async function businessDb<T>(
  user: DbUser,
  businessId: number | string,
  callback: (tx: RlsTransaction) => Promise<T>
): Promise<T> {
  return withBusinessContext(user.id, businessId, callback);
}

/**
 * Execute a query with automatic RLS context based on current session
 * Automatically determines the appropriate context level
 */
export async function autoDb<T>(
  callback: (tx: RlsTransaction) => Promise<T>,
  options?: {
    businessId?: number | string;
  }
): Promise<T> {
  const user = await getCurrentDbUser();

  if (!user) {
    // Anonymous user - public context
    return withPublicContext(callback);
  }

  if (user.role === "admin") {
    // Admin user - full access
    return withAdminContext(user.id, callback);
  }

  if (options?.businessId) {
    // Business context requested
    return withBusinessContext(user.id, options.businessId, callback);
  }

  // Regular authenticated user
  return withUserContext(user.id, callback);
}

/**
 * Helper to get RLS context options for manual use
 */
export async function getRlsContext(options?: {
  businessId?: number | string;
}): Promise<{
  userId: number | null;
  role: string | null;
  businessId: number | string | null;
}> {
  const user = await getCurrentDbUser();

  if (!user) {
    return { userId: null, role: null, businessId: null };
  }

  return {
    userId: user.id,
    role: user.role,
    businessId: options?.businessId ?? null,
  };
}

// Re-export types for convenience
export type { RlsTransaction };
