-- ============================================================================
-- P4: Karma & Trust Levels
-- ============================================================================
-- This migration adds:
-- 1. karma_points column to users table
-- 2. trust_level column to users table
-- 3. karma_events table for tracking karma changes
-- 4. Functions for calculating trust levels
-- ============================================================================

-- ============================================================================
-- EXTEND USERS TABLE
-- ============================================================================

-- Add karma and trust level columns to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS karma_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS trust_level INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS karma_updated_at TIMESTAMP DEFAULT NOW();

-- Index for leaderboard queries
CREATE INDEX IF NOT EXISTS users_karma_points_idx ON users(karma_points DESC);
CREATE INDEX IF NOT EXISTS users_trust_level_idx ON users(trust_level);

-- ============================================================================
-- KARMA EVENTS TABLE
-- ============================================================================

-- Karma events table - tracks all karma point changes
CREATE TABLE IF NOT EXISTS karma_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Event details
  event_type VARCHAR(50) NOT NULL, -- REVIEW_CREATED, REVIEW_HELPFUL, PHOTO_APPROVED, BADGE_EARNED, etc.
  points INTEGER NOT NULL, -- Positive or negative
  description VARCHAR(255), -- Human-readable description
  -- Related entities (optional)
  review_id INTEGER REFERENCES reviews(id) ON DELETE SET NULL,
  place_id INTEGER REFERENCES places(id) ON DELETE SET NULL,
  badge_key VARCHAR(50) REFERENCES badge_definitions(key) ON DELETE SET NULL,
  -- Metadata
  metadata JSONB, -- Additional context
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for karma events
CREATE INDEX IF NOT EXISTS karma_events_user_id_idx ON karma_events(user_id);
CREATE INDEX IF NOT EXISTS karma_events_event_type_idx ON karma_events(event_type);
CREATE INDEX IF NOT EXISTS karma_events_created_at_idx ON karma_events(created_at);

-- ============================================================================
-- TRUST LEVEL DEFINITIONS TABLE
-- ============================================================================

-- Trust level definitions - configurable trust levels
CREATE TABLE IF NOT EXISTS trust_level_definitions (
  level INTEGER PRIMARY KEY, -- 0, 1, 2, 3, 4, 5
  name VARCHAR(50) NOT NULL,
  name_nl VARCHAR(50),
  description TEXT NOT NULL,
  description_nl TEXT,
  min_karma INTEGER NOT NULL DEFAULT 0, -- Minimum karma points required
  icon VARCHAR(50), -- Icon for the level
  color VARCHAR(20), -- Color for UI display
  -- Permissions/privileges (can be extended)
  can_review BOOLEAN NOT NULL DEFAULT true,
  can_upload_photos BOOLEAN NOT NULL DEFAULT true,
  max_photos_per_review INTEGER DEFAULT 3,
  reviews_auto_approved BOOLEAN NOT NULL DEFAULT false, -- Skip moderation
  can_flag_reviews BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- SEED TRUST LEVEL DEFINITIONS
-- ============================================================================

INSERT INTO trust_level_definitions (level, name, name_nl, description, description_nl, min_karma, icon, color, can_review, can_upload_photos, max_photos_per_review, reviews_auto_approved, can_flag_reviews) VALUES
  (0, 'New Member', 'Nieuw Lid', 'Just getting started on the platform', 'Net begonnen op het platform', 0, '🌱', 'slate', true, true, 3, false, false),
  (1, 'Member', 'Lid', 'Active community member', 'Actief community lid', 50, '🌿', 'green', true, true, 5, false, false),
  (2, 'Trusted Member', 'Vertrouwd Lid', 'Established community contributor', 'Gevestigde community bijdrager', 200, '🌳', 'blue', true, true, 8, true, false),
  (3, 'Expert', 'Expert', 'Highly trusted community expert', 'Zeer vertrouwde community expert', 500, '⭐', 'amber', true, true, 10, true, true),
  (4, 'Community Leader', 'Community Leider', 'Community leader and guide', 'Community leider en gids', 1000, '🏆', 'orange', true, true, 15, true, true),
  (5, 'Legend', 'Legende', 'Legendary community member', 'Legendarisch community lid', 2500, '👑', 'purple', true, true, 20, true, true)
ON CONFLICT (level) DO NOTHING;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE karma_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE karma_events FORCE ROW LEVEL SECURITY;
ALTER TABLE trust_level_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_level_definitions FORCE ROW LEVEL SECURITY;

-- Karma events: users can see their own, admins can see all
CREATE POLICY "karma_events_select_own" ON karma_events
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Karma events: only system/admin can insert
CREATE POLICY "karma_events_insert_system" ON karma_events
  FOR INSERT WITH CHECK (current_setting('app.current_user_role', true) = 'admin');

-- Trust level definitions: readable by everyone
CREATE POLICY "trust_level_definitions_select_all" ON trust_level_definitions
  FOR SELECT USING (true);

-- Trust level definitions: admin only for modifications
CREATE POLICY "trust_level_definitions_admin_insert" ON trust_level_definitions
  FOR INSERT WITH CHECK (current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY "trust_level_definitions_admin_update" ON trust_level_definitions
  FOR UPDATE USING (current_setting('app.current_user_role', true) = 'admin');

-- ============================================================================
-- KARMA POINT VALUES (Reference for application logic)
-- ============================================================================
-- These are the default point values for various actions:
--
-- Positive Actions:
--   REVIEW_CREATED: +10 points (first review gives bonus +25)
--   REVIEW_HELPFUL: +5 points (when someone marks review as helpful)
--   PHOTO_APPROVED: +3 points per photo
--   BADGE_EARNED: +15-50 points (varies by badge)
--   PROFILE_COMPLETED: +10 points (one-time)
--   BUSINESS_VERIFIED: +20 points (for business owners)
--
-- Negative Actions:
--   REVIEW_REJECTED: -5 points
--   REVIEW_FLAGGED: -10 points
--   PHOTO_REJECTED: -2 points
--   SPAM_WARNING: -25 points
--
-- Note: These values are configurable in the application layer

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE karma_events IS 'Audit trail of all karma point changes for users (P4)';
COMMENT ON TABLE trust_level_definitions IS 'Configurable trust level tiers with privileges (P4)';

COMMENT ON COLUMN users.karma_points IS 'Total karma points earned by the user';
COMMENT ON COLUMN users.trust_level IS 'Current trust level (0-5)';
COMMENT ON COLUMN users.karma_updated_at IS 'When karma was last recalculated';

COMMENT ON COLUMN karma_events.event_type IS 'Type of karma event (REVIEW_CREATED, REVIEW_HELPFUL, etc.)';
COMMENT ON COLUMN karma_events.points IS 'Points awarded (positive) or deducted (negative)';
