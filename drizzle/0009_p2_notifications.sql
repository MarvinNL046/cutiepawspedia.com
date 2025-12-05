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
