-- =============================================================================
-- P1: User Favorites & Recent Views Migration (Migration 0008)
-- =============================================================================
--
-- This migration adds tables for user favorites and recently viewed places.
-- Both tables have RLS policies that allow users to manage only their own data.
--
-- Tables:
-- - user_favorites: Saved places for users
-- - user_recent_views: Recently viewed places history
--
-- =============================================================================

-- =============================================================================
-- 1. USER_FAVORITES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indexes for user_favorites
CREATE INDEX IF NOT EXISTS user_favorites_user_id_idx ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS user_favorites_place_id_idx ON user_favorites(place_id);

-- Unique constraint: one favorite per user/place combination
CREATE UNIQUE INDEX IF NOT EXISTS user_favorites_user_place_unique_idx ON user_favorites(user_id, place_id);

-- =============================================================================
-- 2. USER_RECENT_VIEWS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_recent_views (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indexes for user_recent_views
CREATE INDEX IF NOT EXISTS user_recent_views_user_id_idx ON user_recent_views(user_id);
CREATE INDEX IF NOT EXISTS user_recent_views_place_id_idx ON user_recent_views(place_id);
CREATE INDEX IF NOT EXISTS user_recent_views_viewed_at_idx ON user_recent_views(viewed_at);

-- Unique constraint: one view record per user/place (upsert on view)
CREATE UNIQUE INDEX IF NOT EXISTS user_recent_views_user_place_unique_idx ON user_recent_views(user_id, place_id);

-- =============================================================================
-- 3. RLS POLICIES FOR USER_FAVORITES
-- =============================================================================

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- User can see own favorites, admin can see all
CREATE POLICY user_favorites_select ON user_favorites
  FOR SELECT
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- User can insert favorites for themselves
CREATE POLICY user_favorites_insert ON user_favorites
  FOR INSERT
  WITH CHECK (
    is_authenticated()
    AND user_id = app_user_id()
  );

-- User can delete own favorites, admin can delete all
CREATE POLICY user_favorites_delete ON user_favorites
  FOR DELETE
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- No update needed (favorites are either added or removed)
CREATE POLICY user_favorites_no_update ON user_favorites
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

-- =============================================================================
-- 4. RLS POLICIES FOR USER_RECENT_VIEWS
-- =============================================================================

ALTER TABLE user_recent_views ENABLE ROW LEVEL SECURITY;

-- User can see own recent views, admin can see all
CREATE POLICY user_recent_views_select ON user_recent_views
  FOR SELECT
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- User can insert recent views for themselves
CREATE POLICY user_recent_views_insert ON user_recent_views
  FOR INSERT
  WITH CHECK (
    is_authenticated()
    AND user_id = app_user_id()
  );

-- User can update own recent views (for upsert behavior), admin can update all
CREATE POLICY user_recent_views_update ON user_recent_views
  FOR UPDATE
  USING (
    is_admin()
    OR user_id = app_user_id()
  )
  WITH CHECK (
    is_admin()
    OR user_id = app_user_id()
  );

-- User can delete own recent views, admin can delete all
CREATE POLICY user_recent_views_delete ON user_recent_views
  FOR DELETE
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- =============================================================================
-- VERIFICATION QUERY
-- =============================================================================

-- Run this to verify RLS is enabled and policies exist:
--
-- SELECT
--   tablename,
--   rowsecurity,
--   (SELECT count(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
-- FROM pg_tables t
-- WHERE schemaname = 'public'
-- AND tablename IN ('user_favorites', 'user_recent_views')
-- ORDER BY tablename;
