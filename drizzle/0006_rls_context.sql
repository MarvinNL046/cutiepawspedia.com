-- =============================================================================
-- RLS Session Context Setup (Migration 0006)
-- =============================================================================
--
-- This migration documents the RLS (Row-Level Security) session context approach
-- used in CutiePawsPedia with Neon Postgres + Drizzle ORM.
--
-- Since we use StackAuth (not Supabase), we don't have auth.uid(). Instead, we
-- use Postgres custom settings (GUCs - Grand Unified Configuration) to pass
-- user context to RLS policies.
--
-- =============================================================================
-- SESSION CONTEXT VARIABLES
-- =============================================================================
--
-- The following GUC variables are set per-transaction by the application:
--
--   app.user_id     : The database user ID (users.id) of the logged-in user
--                     Empty string "" if anonymous/unauthenticated
--
--   app.user_role   : The role of the user: 'admin', 'business', 'user', or ''
--                     Empty string "" if anonymous/unauthenticated
--
--   app.business_id : The business ID the user is acting as (optional)
--                     Empty string "" if not acting as a business
--
-- =============================================================================
-- USAGE IN APPLICATION CODE
-- =============================================================================
--
-- In TypeScript/Drizzle, use the withRlsContext() helper:
--
--   import { withRlsContext } from "@/lib/db/withRlsContext";
--
--   // For authenticated requests:
--   const result = await withRlsContext({
--     userId: dbUser.id.toString(),
--     role: dbUser.role,
--     businessId: activeBusinessId?.toString(),
--   }, async (tx) => {
--     return tx.select().from(leads).where(...);
--   });
--
--   // For public/anonymous requests:
--   const result = await withRlsContext({}, async (tx) => {
--     return tx.select().from(places).where(...);
--   });
--
-- =============================================================================
-- USAGE IN RLS POLICIES
-- =============================================================================
--
-- In RLS policies, use current_setting() with the second parameter 'true'
-- to return NULL instead of throwing an error if the variable is not set:
--
--   -- Get current user ID (returns NULL if not set)
--   current_setting('app.user_id', true)::integer
--
--   -- Check if user is admin
--   current_setting('app.user_role', true) = 'admin'
--
--   -- Check if user owns a business
--   current_setting('app.business_id', true)::integer = businesses.id
--
-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to get current user ID (safe, returns NULL if not set)
CREATE OR REPLACE FUNCTION app_user_id()
RETURNS integer
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.user_id', true), '')::integer;
$$;

-- Function to get current user role (safe, returns NULL if not set)
CREATE OR REPLACE FUNCTION app_user_role()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.user_role', true), '');
$$;

-- Function to get current business ID (safe, returns NULL if not set)
CREATE OR REPLACE FUNCTION app_business_id()
RETURNS integer
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.business_id', true), '')::integer;
$$;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT current_setting('app.user_role', true) = 'admin';
$$;

-- Function to check if current user is authenticated
CREATE OR REPLACE FUNCTION is_authenticated()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('app.user_id', true), '') IS NOT NULL;
$$;

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON FUNCTION app_user_id() IS 'Returns the current user ID from session context, or NULL if not set';
COMMENT ON FUNCTION app_user_role() IS 'Returns the current user role from session context, or NULL if not set';
COMMENT ON FUNCTION app_business_id() IS 'Returns the current business ID from session context, or NULL if not set';
COMMENT ON FUNCTION is_admin() IS 'Returns true if the current user has admin role';
COMMENT ON FUNCTION is_authenticated() IS 'Returns true if a user ID is set in the session context';
