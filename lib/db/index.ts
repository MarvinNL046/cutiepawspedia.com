/**
 * Database Module Index
 *
 * This module provides database access with Row-Level Security (RLS) support.
 *
 * For queries that need RLS protection:
 * - Use publicDb for anonymous/public queries
 * - Use authDb for authenticated user queries
 * - Use adminDb for admin queries
 * - Use businessDb for business-context queries
 * - Use autoDb for automatic context detection
 *
 * For direct database access without RLS context (use with caution):
 * - Import { db } from "@/db" directly
 */

export {
  withRlsContext,
  withAdminContext,
  withBusinessContext,
  withUserContext,
  withPublicContext,
  type RlsContextOptions,
  type RlsTransaction,
} from "./withRlsContext";

// Note: rlsDb exports are server-only due to auth dependencies
// Import from "@/lib/db/rlsDb" directly for server components
