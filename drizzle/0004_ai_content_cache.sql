-- AI Content Cache Schema Migration
-- Enables scalable AI content generation for 100k+ pages

-- ============================================================================
-- AI CONTENT CACHE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "ai_content_cache" (
  "id" SERIAL PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "content_type" VARCHAR(50) NOT NULL,
  "content" JSONB NOT NULL,
  "model" VARCHAR(100) NOT NULL,
  "locale" VARCHAR(10) NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "prompt_tokens" INTEGER,
  "completion_tokens" INTEGER,
  "generated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "generation_time_ms" INTEGER,
  "is_stale" BOOLEAN DEFAULT FALSE NOT NULL,
  "marked_stale_at" TIMESTAMP,
  "last_error" TEXT,
  "error_count" INTEGER DEFAULT 0 NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS "ai_content_cache_content_type_idx" ON "ai_content_cache" ("content_type");
CREATE INDEX IF NOT EXISTS "ai_content_cache_stale_idx" ON "ai_content_cache" ("is_stale", "updated_at");
CREATE INDEX IF NOT EXISTS "ai_content_cache_version_idx" ON "ai_content_cache" ("version");
CREATE INDEX IF NOT EXISTS "ai_content_cache_locale_idx" ON "ai_content_cache" ("locale");
CREATE UNIQUE INDEX IF NOT EXISTS "ai_content_cache_key_idx" ON "ai_content_cache" ("key");

-- ============================================================================
-- AI GENERATION QUEUE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "ai_generation_queue" (
  "id" SERIAL PRIMARY KEY,
  "cache_key" TEXT NOT NULL,
  "content_type" VARCHAR(50) NOT NULL,
  "locale" VARCHAR(10) NOT NULL,
  "priority" INTEGER DEFAULT 0 NOT NULL,
  "status" VARCHAR(20) DEFAULT 'pending' NOT NULL,
  "attempts" INTEGER DEFAULT 0 NOT NULL,
  "last_attempt_at" TIMESTAMP,
  "completed_at" TIMESTAMP,
  "error" TEXT,
  "context_data" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indexes for queue processing
CREATE INDEX IF NOT EXISTS "ai_generation_queue_status_priority_idx" ON "ai_generation_queue" ("status", "priority");
CREATE INDEX IF NOT EXISTS "ai_generation_queue_cache_key_idx" ON "ai_generation_queue" ("cache_key");

-- Comments for documentation
COMMENT ON TABLE "ai_content_cache" IS 'Persistent cache for AI-generated SEO content across all page types';
COMMENT ON TABLE "ai_generation_queue" IS 'Queue for background AI content generation processing';
COMMENT ON COLUMN "ai_content_cache"."key" IS 'Unique cache key, format: type:slug:locale (e.g., city:amsterdam:netherlands:nl)';
COMMENT ON COLUMN "ai_content_cache"."version" IS 'Content version for invalidation on prompt updates';
COMMENT ON COLUMN "ai_content_cache"."is_stale" IS 'Flag for background regeneration scheduling';
