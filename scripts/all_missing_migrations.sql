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
-- ============================================================================
-- P2: Email Notifications & Digests
-- ============================================================================
-- This migration adds:
-- 1. notification_settings - per-user email preferences
-- 2. notification_logs - audit trail for sent emails
-- ============================================================================

-- Notification log status enum
DO $$ BEGIN
  CREATE TYPE notification_log_status AS ENUM ('sent', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- NOTIFICATION SETTINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  -- Email preferences
  email_general BOOLEAN NOT NULL DEFAULT true,
  email_reviews BOOLEAN NOT NULL DEFAULT true,
  email_favorites BOOLEAN NOT NULL DEFAULT true,
  email_leads BOOLEAN NOT NULL DEFAULT true,
  email_business BOOLEAN NOT NULL DEFAULT true,
  email_digest BOOLEAN NOT NULL DEFAULT true,
  -- Locale preference for emails
  locale VARCHAR(10),
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- NOTIFICATION LOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  business_id INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
  -- Notification details
  type VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status notification_log_status NOT NULL,
  error TEXT,
  -- Context metadata
  metadata JSONB,
  -- Timestamp
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for notification_logs
CREATE INDEX IF NOT EXISTS notification_logs_user_id_idx ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS notification_logs_business_id_idx ON notification_logs(business_id);
CREATE INDEX IF NOT EXISTS notification_logs_type_idx ON notification_logs(type);
CREATE INDEX IF NOT EXISTS notification_logs_created_at_idx ON notification_logs(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on both tables
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (important for security)
ALTER TABLE notification_settings FORCE ROW LEVEL SECURITY;
ALTER TABLE notification_logs FORCE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES: notification_settings
-- Users can only see/modify their own settings
-- ============================================================================

-- Users can view their own notification settings
CREATE POLICY "notification_settings_select_own" ON notification_settings
  FOR SELECT
  USING (
    user_id = current_setting('app.current_user_id', true)::INTEGER
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Users can insert their own notification settings
CREATE POLICY "notification_settings_insert_own" ON notification_settings
  FOR INSERT
  WITH CHECK (
    user_id = current_setting('app.current_user_id', true)::INTEGER
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Users can update their own notification settings
CREATE POLICY "notification_settings_update_own" ON notification_settings
  FOR UPDATE
  USING (
    user_id = current_setting('app.current_user_id', true)::INTEGER
    OR current_setting('app.current_user_role', true) = 'admin'
  )
  WITH CHECK (
    user_id = current_setting('app.current_user_id', true)::INTEGER
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Users can delete their own notification settings
CREATE POLICY "notification_settings_delete_own" ON notification_settings
  FOR DELETE
  USING (
    user_id = current_setting('app.current_user_id', true)::INTEGER
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- ============================================================================
-- RLS POLICIES: notification_logs
-- Admin-only access (system logging)
-- ============================================================================

-- Only admins can view notification logs
CREATE POLICY "notification_logs_admin_select" ON notification_logs
  FOR SELECT
  USING (
    current_setting('app.current_user_role', true) = 'admin'
  );

-- Only system (via admin context) can insert logs
CREATE POLICY "notification_logs_admin_insert" ON notification_logs
  FOR INSERT
  WITH CHECK (
    current_setting('app.current_user_role', true) = 'admin'
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE notification_settings IS 'Per-user email notification preferences (P2)';
COMMENT ON TABLE notification_logs IS 'Audit trail for sent email notifications (P2)';

COMMENT ON COLUMN notification_settings.email_general IS 'General platform emails (announcements, etc.)';
COMMENT ON COLUMN notification_settings.email_reviews IS 'Review notifications (new reviews, replies)';
COMMENT ON COLUMN notification_settings.email_favorites IS 'Updates about favorited places';
COMMENT ON COLUMN notification_settings.email_leads IS 'Lead notifications for business owners';
COMMENT ON COLUMN notification_settings.email_business IS 'Business-related emails (claims, etc.)';
COMMENT ON COLUMN notification_settings.email_digest IS 'Weekly digest emails';
COMMENT ON COLUMN notification_settings.locale IS 'Preferred locale for emails (null = use user default)';

COMMENT ON COLUMN notification_logs.type IS 'Notification type: REVIEW_NEW, REVIEW_REPLY, LEAD_NEW, CLAIM_APPROVED, CLAIM_REJECTED, DIGEST_WEEKLY';
COMMENT ON COLUMN notification_logs.status IS 'Send status: sent or failed';
COMMENT ON COLUMN notification_logs.metadata IS 'Additional context as JSON (reviewId, placeId, etc.)';
-- ============================================================================
-- P3: User Profiles + Badges
-- ============================================================================
-- This migration adds:
-- 1. Profile fields to users table
-- 2. badge_definitions - available badge types
-- 3. user_badges - badges awarded to users
-- ============================================================================

-- ============================================================================
-- EXTEND USERS TABLE
-- ============================================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS website_url VARCHAR(500);
ALTER TABLE users ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_locale VARCHAR(10) DEFAULT 'en';
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- Index for username lookups
CREATE INDEX IF NOT EXISTS users_username_idx ON users(username);

-- ============================================================================
-- BADGE DEFINITIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS badge_definitions (
  key VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  label_nl VARCHAR(100),
  description TEXT NOT NULL,
  description_nl TEXT,
  icon VARCHAR(50) NOT NULL, -- emoji or icon name
  category VARCHAR(50) NOT NULL DEFAULT 'general', -- general, reviewer, contributor, business, special
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- USER BADGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_badges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_key VARCHAR(50) NOT NULL REFERENCES badge_definitions(key) ON DELETE CASCADE,
  awarded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  awarded_by VARCHAR(50), -- 'system', 'admin', or admin user id
  notes TEXT,
  UNIQUE(user_id, badge_key)
);

-- Indexes
CREATE INDEX IF NOT EXISTS user_badges_user_id_idx ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS user_badges_badge_key_idx ON user_badges(badge_key);
CREATE INDEX IF NOT EXISTS user_badges_awarded_at_idx ON user_badges(awarded_at);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_definitions FORCE ROW LEVEL SECURITY;
ALTER TABLE user_badges FORCE ROW LEVEL SECURITY;

-- Badge definitions: readable by everyone
CREATE POLICY "badge_definitions_select_all" ON badge_definitions
  FOR SELECT USING (true);

-- Badge definitions: admin only for insert/update/delete
CREATE POLICY "badge_definitions_admin_insert" ON badge_definitions
  FOR INSERT WITH CHECK (current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY "badge_definitions_admin_update" ON badge_definitions
  FOR UPDATE USING (current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY "badge_definitions_admin_delete" ON badge_definitions
  FOR DELETE USING (current_setting('app.current_user_role', true) = 'admin');

-- User badges: readable by everyone (public profile data)
CREATE POLICY "user_badges_select_all" ON user_badges
  FOR SELECT USING (true);

-- User badges: admin/system only for insert/delete
CREATE POLICY "user_badges_admin_insert" ON user_badges
  FOR INSERT WITH CHECK (current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY "user_badges_admin_delete" ON user_badges
  FOR DELETE USING (current_setting('app.current_user_role', true) = 'admin');

-- ============================================================================
-- SEED BADGE DEFINITIONS
-- ============================================================================

INSERT INTO badge_definitions (key, label, label_nl, description, description_nl, icon, category, sort_order) VALUES
  ('verified_user', 'Verified User', 'Geverifieerde Gebruiker', 'Email address verified', 'E-mailadres geverifieerd', '✓', 'general', 1),
  ('early_adopter', 'Early Adopter', 'Early Adopter', 'Joined during the early days', 'Lid geworden in de begindagen', '🌟', 'special', 2),
  ('top_reviewer', 'Top Reviewer', 'Top Reviewer', 'Written 10+ helpful reviews', '10+ nuttige reviews geschreven', '⭐', 'reviewer', 10),
  ('photo_expert', 'Photo Expert', 'Foto Expert', 'Uploaded 20+ quality photos', '20+ kwaliteitsfoto''s geüpload', '📸', 'contributor', 11),
  ('local_guide', 'Local Guide', 'Lokale Gids', 'Expert in a specific city', 'Expert in een specifieke stad', '📍', 'contributor', 12),
  ('helpful_reviewer', 'Helpful Reviewer', 'Behulpzame Reviewer', 'Reviews marked helpful 50+ times', 'Reviews 50+ keer als nuttig gemarkeerd', '👍', 'reviewer', 13),
  ('business_owner', 'Business Owner', 'Bedrijfseigenaar', 'Verified owner of a listed business', 'Geverifieerde eigenaar van een vermeld bedrijf', '🏢', 'business', 20),
  ('premium_business', 'Premium Business', 'Premium Bedrijf', 'Business with premium subscription', 'Bedrijf met premium abonnement', '💎', 'business', 21),
  ('community_champion', 'Community Champion', 'Community Kampioen', 'Outstanding community contributor', 'Uitstekende community bijdrager', '🏆', 'special', 30),
  ('founding_member', 'Founding Member', 'Oprichter Lid', 'One of the first 100 members', 'Een van de eerste 100 leden', '🎖️', 'special', 31)
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE badge_definitions IS 'Available badge types that can be awarded to users (P3)';
COMMENT ON TABLE user_badges IS 'Badges awarded to individual users (P3)';

COMMENT ON COLUMN users.username IS 'Unique username for public profile URL (/u/username)';
COMMENT ON COLUMN users.avatar_url IS 'URL to user avatar image';
COMMENT ON COLUMN users.bio IS 'User biography/description';
COMMENT ON COLUMN users.location IS 'User location (city, country)';
COMMENT ON COLUMN users.website_url IS 'Personal website URL';
COMMENT ON COLUMN users.social_links IS 'JSON object with social media links {instagram, facebook, tiktok, etc}';
COMMENT ON COLUMN users.preferred_locale IS 'Preferred language for emails and content';
COMMENT ON COLUMN users.is_public IS 'Whether profile is publicly visible';
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
-- ============================================================================
-- B7: Business Messaging System
-- ============================================================================
-- This migration adds:
-- 1. message_threads table for conversations
-- 2. messages table for individual messages
-- 3. message_attachments table for file attachments
-- ============================================================================

-- ============================================================================
-- MESSAGE THREADS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS message_threads (
  id SERIAL PRIMARY KEY,
  -- Participants
  business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id INTEGER REFERENCES places(id) ON DELETE SET NULL, -- Optional: related place
  -- Thread metadata
  subject VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'open', -- open, archived, spam
  -- Tracking
  last_message_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_message_preview VARCHAR(255), -- Preview of last message
  -- Unread counters (denormalized for performance)
  unread_count_business INTEGER NOT NULL DEFAULT 0,
  unread_count_user INTEGER NOT NULL DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS message_threads_business_id_idx ON message_threads(business_id);
CREATE INDEX IF NOT EXISTS message_threads_user_id_idx ON message_threads(user_id);
CREATE INDEX IF NOT EXISTS message_threads_place_id_idx ON message_threads(place_id);
CREATE INDEX IF NOT EXISTS message_threads_last_message_at_idx ON message_threads(last_message_at DESC);
CREATE INDEX IF NOT EXISTS message_threads_status_idx ON message_threads(status);

-- ============================================================================
-- MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  thread_id INTEGER NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  -- Sender info
  sender_type VARCHAR(20) NOT NULL, -- 'user' or 'business'
  sender_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  -- Message content
  body TEXT NOT NULL,
  -- Status
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP,
  -- Soft delete
  deleted_by_sender BOOLEAN NOT NULL DEFAULT false,
  deleted_by_recipient BOOLEAN NOT NULL DEFAULT false,
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS messages_thread_id_idx ON messages(thread_id);
CREATE INDEX IF NOT EXISTS messages_sender_user_id_idx ON messages(sender_user_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS messages_is_read_idx ON messages(is_read);

-- ============================================================================
-- MESSAGE ATTACHMENTS TABLE (Optional, for future use)
-- ============================================================================

CREATE TABLE IF NOT EXISTS message_attachments (
  id SERIAL PRIMARY KEY,
  message_id INTEGER NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  -- File info
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size_bytes INTEGER,
  storage_key VARCHAR(500) NOT NULL, -- Path in storage
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS message_attachments_message_id_idx ON message_attachments(message_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads FORCE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages FORCE ROW LEVEL SECURITY;
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_attachments FORCE ROW LEVEL SECURITY;

-- Message threads: participants can see their threads
CREATE POLICY "message_threads_select_participants" ON message_threads
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
    OR business_id IN (SELECT id FROM businesses WHERE user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true)))
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Message threads: users can create threads
CREATE POLICY "message_threads_insert_users" ON message_threads
  FOR INSERT WITH CHECK (
    user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
  );

-- Messages: participants can see messages in their threads
CREATE POLICY "messages_select_participants" ON messages
  FOR SELECT USING (
    thread_id IN (
      SELECT id FROM message_threads WHERE
        user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
        OR business_id IN (SELECT id FROM businesses WHERE user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true)))
    )
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- Messages: participants can insert messages
CREATE POLICY "messages_insert_participants" ON messages
  FOR INSERT WITH CHECK (
    thread_id IN (
      SELECT id FROM message_threads WHERE
        user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
        OR business_id IN (SELECT id FROM businesses WHERE user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true)))
    )
  );

-- Message attachments: same as messages
CREATE POLICY "message_attachments_select_participants" ON message_attachments
  FOR SELECT USING (
    message_id IN (
      SELECT m.id FROM messages m
      JOIN message_threads t ON m.thread_id = t.id
      WHERE t.user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true))
         OR t.business_id IN (SELECT id FROM businesses WHERE user_id = (SELECT id FROM users WHERE stackauth_id = current_setting('app.current_user_stackauth_id', true)))
    )
    OR current_setting('app.current_user_role', true) = 'admin'
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE message_threads IS 'Conversation threads between users and businesses (B7)';
COMMENT ON TABLE messages IS 'Individual messages within threads (B7)';
COMMENT ON TABLE message_attachments IS 'File attachments for messages (B7)';

COMMENT ON COLUMN message_threads.unread_count_business IS 'Number of unread messages for the business';
COMMENT ON COLUMN message_threads.unread_count_user IS 'Number of unread messages for the user';
COMMENT ON COLUMN messages.sender_type IS 'Who sent the message: user or business';
