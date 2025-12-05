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
