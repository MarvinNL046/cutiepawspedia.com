-- Performance Optimization Indexes
-- Run this migration: psql $DATABASE_URL -f db/migrations/0015_performance_indexes.sql
--
-- CRITICAL: These indexes fix major CPU compute issues in Neon DB
-- Without these, every page load causes full table scans!

-- ============================================================================
-- PLACES TABLE - Most critical for performance
-- ============================================================================

-- Slug lookup (used on EVERY place detail page)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_slug ON places(slug);

-- Composite index for place lookup by city + slug (most common query pattern)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_city_slug ON places(city_id, slug);

-- Rating sorting (used in listings, search results)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_avg_rating ON places(avg_rating DESC NULLS LAST);

-- Premium filter + sort (premium listings shown first)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_is_premium ON places(is_premium DESC);

-- Review count for popularity sorting
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_review_count ON places(review_count DESC);

-- Created at for "newest" sorting
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_created_at ON places(created_at DESC);

-- Status filter (filter out closed places)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_status ON places(status);

-- Composite: city + premium + rating (the most common listing query)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_city_premium_rating
ON places(city_id, is_premium DESC, avg_rating DESC NULLS LAST, review_count DESC);

-- Google Place ID lookup (for enrichment scripts)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_places_google_place_id ON places(google_place_id) WHERE google_place_id IS NOT NULL;

-- ============================================================================
-- CITIES TABLE
-- ============================================================================

-- Slug lookup (used on every city page)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cities_slug ON cities(slug);

-- Composite: country + slug (for URL routing)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cities_country_slug ON cities(country_id, slug);

-- Name for ILIKE searches (autocomplete)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cities_name ON cities(name);

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================

-- Slug lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ============================================================================
-- COUNTRIES TABLE
-- ============================================================================

-- Slug lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_countries_slug ON countries(slug);

-- Code lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_countries_code ON countries(code);

-- ============================================================================
-- PROVINCES TABLE
-- ============================================================================

-- Slug lookup (for URL routing)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provinces_slug ON provinces(slug);

-- Composite: country + slug
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provinces_country_slug ON provinces(country_id, slug);

-- ============================================================================
-- REVIEWS TABLE - For place detail pages
-- ============================================================================

-- Composite: place + status + created (for showing reviews)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_place_status_created
ON reviews(place_id, status, created_at DESC);

-- ============================================================================
-- BUSINESS NOTIFICATIONS - For dashboard polling
-- ============================================================================

-- Composite: business + read status + created (for unread count)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_business_notifications_unread
ON business_notifications(business_id, is_read, created_at DESC);

-- ============================================================================
-- ANALYZE TABLES (update query planner statistics)
-- ============================================================================

ANALYZE places;
ANALYZE cities;
ANALYZE categories;
ANALYZE countries;
ANALYZE provinces;
ANALYZE reviews;
ANALYZE business_notifications;
