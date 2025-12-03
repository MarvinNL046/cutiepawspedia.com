-- =============================================================================
-- Create Missing Tables Migration
-- =============================================================================
-- This script creates tables that are defined in the schema but missing from
-- the live database: review_replies, review_photos, audit_logs, ai_content_cache, ai_generation_queue

-- =============================================================================
-- ENUMS (create if not exist)
-- =============================================================================

-- Review reply author type enum
DO $$ BEGIN
    CREATE TYPE review_reply_author_type AS ENUM ('business', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Review photo status enum
DO $$ BEGIN
    CREATE TYPE review_photo_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =============================================================================
-- 1. REVIEW_REPLIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS review_replies (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    author_type review_reply_author_type NOT NULL,
    author_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS review_replies_review_id_idx ON review_replies(review_id);

-- =============================================================================
-- 2. REVIEW_PHOTOS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS review_photos (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    storage_key VARCHAR(500) NOT NULL,
    width INTEGER,
    height INTEGER,
    mime_type VARCHAR(50) NOT NULL,
    filesize_bytes INTEGER,
    alt_text VARCHAR(255),
    status review_photo_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS review_photos_review_id_idx ON review_photos(review_id);
CREATE INDEX IF NOT EXISTS review_photos_place_id_idx ON review_photos(place_id);
CREATE INDEX IF NOT EXISTS review_photos_status_idx ON review_photos(status);

-- =============================================================================
-- 3. AUDIT_LOGS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    actor_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    actor_business_id INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
    actor_role VARCHAR(30) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    target_type VARCHAR(30) NOT NULL,
    target_id VARCHAR(100),
    metadata JSONB,
    ip_address VARCHAR(45)
);

CREATE INDEX IF NOT EXISTS audit_logs_event_type_idx ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS audit_logs_target_type_idx ON audit_logs(target_type);
CREATE INDEX IF NOT EXISTS audit_logs_actor_user_id_idx ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at);

-- =============================================================================
-- 4. AI_CONTENT_CACHE TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS ai_content_cache (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content JSONB NOT NULL,
    model VARCHAR(100) NOT NULL,
    locale VARCHAR(10) NOT NULL,
    version VARCHAR(50) NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    generated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    generation_time_ms INTEGER,
    is_stale BOOLEAN DEFAULT FALSE NOT NULL,
    marked_stale_at TIMESTAMP,
    last_error TEXT,
    error_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS ai_content_cache_content_type_idx ON ai_content_cache(content_type);
CREATE INDEX IF NOT EXISTS ai_content_cache_stale_idx ON ai_content_cache(is_stale, updated_at);
CREATE INDEX IF NOT EXISTS ai_content_cache_version_idx ON ai_content_cache(version);
CREATE INDEX IF NOT EXISTS ai_content_cache_locale_idx ON ai_content_cache(locale);
CREATE UNIQUE INDEX IF NOT EXISTS ai_content_cache_key_idx ON ai_content_cache(key);

-- =============================================================================
-- 5. AI_GENERATION_QUEUE TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS ai_generation_queue (
    id SERIAL PRIMARY KEY,
    cache_key TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    locale VARCHAR(10) NOT NULL,
    priority INTEGER DEFAULT 0 NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    attempts INTEGER DEFAULT 0 NOT NULL,
    last_attempt_at TIMESTAMP,
    completed_at TIMESTAMP,
    error TEXT,
    context_data JSONB,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS ai_generation_queue_status_priority_idx ON ai_generation_queue(status, priority);
CREATE INDEX IF NOT EXISTS ai_generation_queue_cache_key_idx ON ai_generation_queue(cache_key);

-- =============================================================================
-- VERIFICATION
-- =============================================================================

-- This will show the created tables
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('review_replies', 'review_photos', 'audit_logs', 'ai_content_cache', 'ai_generation_queue')
ORDER BY tablename;
