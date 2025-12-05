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
