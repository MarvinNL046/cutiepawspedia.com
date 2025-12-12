-- Migration: Add German (DE) and French (FR) locale fields to blog tables
-- This enables full i18n support for blog content in 4 languages: EN, NL, DE, FR

-- ============================================================================
-- BLOG CATEGORIES - Add DE/FR fields
-- ============================================================================

ALTER TABLE "blog_categories"
ADD COLUMN IF NOT EXISTS "name_de" varchar(100),
ADD COLUMN IF NOT EXISTS "name_fr" varchar(100),
ADD COLUMN IF NOT EXISTS "description_de" text,
ADD COLUMN IF NOT EXISTS "description_fr" text,
ADD COLUMN IF NOT EXISTS "meta_title_de" varchar(60),
ADD COLUMN IF NOT EXISTS "meta_title_fr" varchar(60),
ADD COLUMN IF NOT EXISTS "meta_description_de" varchar(160),
ADD COLUMN IF NOT EXISTS "meta_description_fr" varchar(160);

-- ============================================================================
-- BLOG TAGS - Add DE/FR fields
-- ============================================================================

ALTER TABLE "blog_tags"
ADD COLUMN IF NOT EXISTS "name_de" varchar(100),
ADD COLUMN IF NOT EXISTS "name_fr" varchar(100);

-- ============================================================================
-- BLOG POSTS - Add DE/FR content and SEO fields
-- ============================================================================

ALTER TABLE "blog_posts"
ADD COLUMN IF NOT EXISTS "title_de" varchar(255),
ADD COLUMN IF NOT EXISTS "title_fr" varchar(255),
ADD COLUMN IF NOT EXISTS "excerpt_de" text,
ADD COLUMN IF NOT EXISTS "excerpt_fr" text,
ADD COLUMN IF NOT EXISTS "content_de" text,
ADD COLUMN IF NOT EXISTS "content_fr" text,
ADD COLUMN IF NOT EXISTS "meta_title_de" varchar(60),
ADD COLUMN IF NOT EXISTS "meta_title_fr" varchar(60),
ADD COLUMN IF NOT EXISTS "meta_description_de" varchar(160),
ADD COLUMN IF NOT EXISTS "meta_description_fr" varchar(160);

-- ============================================================================
-- COMMENTS for documentation
-- ============================================================================

COMMENT ON COLUMN "blog_categories"."name_de" IS 'German category name';
COMMENT ON COLUMN "blog_categories"."name_fr" IS 'French category name';
COMMENT ON COLUMN "blog_posts"."title_de" IS 'German post title';
COMMENT ON COLUMN "blog_posts"."title_fr" IS 'French post title';
COMMENT ON COLUMN "blog_posts"."content_de" IS 'German post content (markdown)';
COMMENT ON COLUMN "blog_posts"."content_fr" IS 'French post content (markdown)';
