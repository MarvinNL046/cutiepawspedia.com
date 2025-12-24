-- ============================================================================
-- RLS (Row Level Security) Policies for CutiePawsPedia
-- ============================================================================
--
-- This migration enables Row Level Security on all tables and creates
-- appropriate policies for different access patterns.
--
-- IMPORTANT: The neondb_owner role has BYPASSRLS privilege, meaning these
-- policies are NOT enforced when using that role. To enforce RLS:
-- 1. Create a new app role without BYPASSRLS
-- 2. Use that role for application connections
-- 3. Set session variables for user context
--
-- Session variables used:
-- - app.user_id: Current authenticated user's ID
-- - app.user_role: Current user's role (user, business, admin)
-- - app.business_id: Current business context (for business dashboard)
--
-- ============================================================================

-- ============================================================================
-- STEP 1: Create app role without BYPASSRLS (if not exists)
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cutiepaws_app') THEN
    CREATE ROLE cutiepaws_app WITH LOGIN PASSWORD 'CHANGE_ME_IN_PRODUCTION';
    COMMENT ON ROLE cutiepaws_app IS 'Application role with RLS enforced';
  END IF;
END
$$;

-- Grant necessary permissions to app role
GRANT USAGE ON SCHEMA public TO cutiepaws_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO cutiepaws_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO cutiepaws_app;

-- Grant default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO cutiepaws_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO cutiepaws_app;

-- ============================================================================
-- STEP 2: Helper functions for RLS policies
-- ============================================================================

-- Get current user ID from session
CREATE OR REPLACE FUNCTION current_user_id() RETURNS INTEGER AS $$
BEGIN
  RETURN NULLIF(current_setting('app.user_id', true), '')::INTEGER;
EXCEPTION
  WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Get current user role from session
CREATE OR REPLACE FUNCTION current_user_role() RETURNS TEXT AS $$
BEGIN
  RETURN NULLIF(current_setting('app.user_role', true), '');
EXCEPTION
  WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Get current business ID from session
CREATE OR REPLACE FUNCTION current_business_id() RETURNS INTEGER AS $$
BEGIN
  RETURN NULLIF(current_setting('app.business_id', true), '')::INTEGER;
EXCEPTION
  WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_user_role() = 'admin';
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if current user owns a business
CREATE OR REPLACE FUNCTION owns_business(business_id INTEGER) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM businesses
    WHERE id = business_id
    AND user_id = current_user_id()
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================================================
-- STEP 3: Enable RLS on all tables
-- ============================================================================

-- Geographic (public read)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Directory (public read, owner write)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- Users & Auth
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_recent_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE karma_events ENABLE ROW LEVEL SECURITY;

-- Businesses
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_photos ENABLE ROW LEVEL SECURITY;

-- Claims
ALTER TABLE place_claims ENABLE ROW LEVEL SECURITY;

-- Admin & System
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_refresh_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Badges & Karma definitions
ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_level_definitions ENABLE ROW LEVEL SECURITY;

-- Blog
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- AI
ALTER TABLE ai_content_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_queue ENABLE ROW LEVEL SECURITY;

-- Ads
ALTER TABLE ad_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY;

-- Feedback
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: RLS Policies - Geographic Tables (Public Read)
-- ============================================================================

-- Countries: Public read, admin write
CREATE POLICY countries_select ON countries FOR SELECT USING (true);
CREATE POLICY countries_insert ON countries FOR INSERT WITH CHECK (is_admin());
CREATE POLICY countries_update ON countries FOR UPDATE USING (is_admin());
CREATE POLICY countries_delete ON countries FOR DELETE USING (is_admin());

-- Provinces: Public read, admin write
CREATE POLICY provinces_select ON provinces FOR SELECT USING (true);
CREATE POLICY provinces_insert ON provinces FOR INSERT WITH CHECK (is_admin());
CREATE POLICY provinces_update ON provinces FOR UPDATE USING (is_admin());
CREATE POLICY provinces_delete ON provinces FOR DELETE USING (is_admin());

-- Cities: Public read, admin write
CREATE POLICY cities_select ON cities FOR SELECT USING (true);
CREATE POLICY cities_insert ON cities FOR INSERT WITH CHECK (is_admin());
CREATE POLICY cities_update ON cities FOR UPDATE USING (is_admin());
CREATE POLICY cities_delete ON cities FOR DELETE USING (is_admin());

-- Categories: Public read, admin write
CREATE POLICY categories_select ON categories FOR SELECT USING (true);
CREATE POLICY categories_insert ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY categories_update ON categories FOR UPDATE USING (is_admin());
CREATE POLICY categories_delete ON categories FOR DELETE USING (is_admin());

-- ============================================================================
-- STEP 5: RLS Policies - Directory Tables
-- ============================================================================

-- Places: Public read, business owner write
CREATE POLICY places_select ON places FOR SELECT USING (true);
CREATE POLICY places_insert ON places FOR INSERT
  WITH CHECK (
    is_admin() OR
    (business_id IS NOT NULL AND owns_business(business_id))
  );
CREATE POLICY places_update ON places FOR UPDATE
  USING (
    is_admin() OR
    owner_id = current_user_id() OR
    (business_id IS NOT NULL AND owns_business(business_id))
  );
CREATE POLICY places_delete ON places FOR DELETE
  USING (is_admin());

-- Place Categories: Public read, business owner can modify their places' categories
CREATE POLICY place_categories_select ON place_categories FOR SELECT USING (true);
CREATE POLICY place_categories_insert ON place_categories FOR INSERT
  WITH CHECK (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = place_id
      AND (p.owner_id = current_user_id() OR owns_business(p.business_id))
    )
  );
CREATE POLICY place_categories_delete ON place_categories FOR DELETE
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = place_id
      AND (p.owner_id = current_user_id() OR owns_business(p.business_id))
    )
  );

-- Subscription Plans: Public read, admin write
CREATE POLICY subscription_plans_select ON subscription_plans FOR SELECT USING (true);
CREATE POLICY subscription_plans_insert ON subscription_plans FOR INSERT WITH CHECK (is_admin());
CREATE POLICY subscription_plans_update ON subscription_plans FOR UPDATE USING (is_admin());
CREATE POLICY subscription_plans_delete ON subscription_plans FOR DELETE USING (is_admin());

-- ============================================================================
-- STEP 6: RLS Policies - Users
-- ============================================================================

-- Users: Public read for profiles, own row for write
CREATE POLICY users_select ON users FOR SELECT
  USING (
    -- Everyone can see public profiles
    is_public = true OR
    -- Users can see their own profile
    id = current_user_id() OR
    -- Admins can see all
    is_admin()
  );
CREATE POLICY users_insert ON users FOR INSERT
  WITH CHECK (
    -- Only system/admin can create users (via StackAuth sync)
    is_admin() OR current_user_id() IS NULL
  );
CREATE POLICY users_update ON users FOR UPDATE
  USING (
    id = current_user_id() OR is_admin()
  );
CREATE POLICY users_delete ON users FOR DELETE
  USING (is_admin());

-- User Favorites: User can only access their own
CREATE POLICY user_favorites_select ON user_favorites FOR SELECT
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY user_favorites_insert ON user_favorites FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY user_favorites_delete ON user_favorites FOR DELETE
  USING (user_id = current_user_id() OR is_admin());

-- User Recent Views: User can only access their own
CREATE POLICY user_recent_views_select ON user_recent_views FOR SELECT
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY user_recent_views_insert ON user_recent_views FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY user_recent_views_update ON user_recent_views FOR UPDATE
  USING (user_id = current_user_id());
CREATE POLICY user_recent_views_delete ON user_recent_views FOR DELETE
  USING (user_id = current_user_id() OR is_admin());

-- Notification Settings: User can only access their own
CREATE POLICY notification_settings_select ON notification_settings FOR SELECT
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY notification_settings_insert ON notification_settings FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY notification_settings_update ON notification_settings FOR UPDATE
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY notification_settings_delete ON notification_settings FOR DELETE
  USING (user_id = current_user_id() OR is_admin());

-- User Badges: User can read their own, admin can write
CREATE POLICY user_badges_select ON user_badges FOR SELECT
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY user_badges_insert ON user_badges FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY user_badges_update ON user_badges FOR UPDATE
  USING (is_admin());
CREATE POLICY user_badges_delete ON user_badges FOR DELETE
  USING (is_admin());

-- Karma Events: User can read their own, system/admin can write
CREATE POLICY karma_events_select ON karma_events FOR SELECT
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY karma_events_insert ON karma_events FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY karma_events_update ON karma_events FOR UPDATE
  USING (is_admin());
CREATE POLICY karma_events_delete ON karma_events FOR DELETE
  USING (is_admin());

-- ============================================================================
-- STEP 7: RLS Policies - Businesses
-- ============================================================================

-- Businesses: Owner can access their own, public can read basic info
CREATE POLICY businesses_select ON businesses FOR SELECT
  USING (
    user_id = current_user_id() OR
    is_admin() OR
    status = 'active' -- Public can see active businesses
  );
CREATE POLICY businesses_insert ON businesses FOR INSERT
  WITH CHECK (user_id = current_user_id() OR is_admin());
CREATE POLICY businesses_update ON businesses FOR UPDATE
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY businesses_delete ON businesses FOR DELETE
  USING (is_admin());

-- Business Photos: Business owner can manage, public can view active
CREATE POLICY business_photos_select ON business_photos FOR SELECT
  USING (
    owns_business(business_id) OR
    is_admin() OR
    status = 'active'
  );
CREATE POLICY business_photos_insert ON business_photos FOR INSERT
  WITH CHECK (owns_business(business_id) OR is_admin());
CREATE POLICY business_photos_update ON business_photos FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY business_photos_delete ON business_photos FOR DELETE
  USING (owns_business(business_id) OR is_admin());

-- Page Views: Business owner can read their own, system can write
CREATE POLICY page_views_select ON page_views FOR SELECT
  USING (
    owns_business(business_id) OR
    is_admin()
  );
CREATE POLICY page_views_insert ON page_views FOR INSERT
  WITH CHECK (true); -- System inserts, no user check needed
CREATE POLICY page_views_update ON page_views FOR UPDATE
  USING (is_admin());
CREATE POLICY page_views_delete ON page_views FOR DELETE
  USING (is_admin());

-- Leads: Business owner can read their own, anyone can create
CREATE POLICY leads_select ON leads FOR SELECT
  USING (
    owns_business(business_id) OR
    is_admin()
  );
CREATE POLICY leads_insert ON leads FOR INSERT
  WITH CHECK (true); -- Anyone can submit a lead
CREATE POLICY leads_update ON leads FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY leads_delete ON leads FOR DELETE
  USING (is_admin());

-- Credit Transactions: Business owner can read their own
CREATE POLICY credit_transactions_select ON credit_transactions FOR SELECT
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY credit_transactions_insert ON credit_transactions FOR INSERT
  WITH CHECK (is_admin()); -- System/admin only
CREATE POLICY credit_transactions_update ON credit_transactions FOR UPDATE
  USING (is_admin());
CREATE POLICY credit_transactions_delete ON credit_transactions FOR DELETE
  USING (is_admin());

-- Business Notifications: Business owner only
CREATE POLICY business_notifications_select ON business_notifications FOR SELECT
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY business_notifications_insert ON business_notifications FOR INSERT
  WITH CHECK (is_admin()); -- System only
CREATE POLICY business_notifications_update ON business_notifications FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY business_notifications_delete ON business_notifications FOR DELETE
  USING (owns_business(business_id) OR is_admin());

-- ============================================================================
-- STEP 8: RLS Policies - Messaging
-- ============================================================================

-- Message Threads: Participants can access
CREATE POLICY message_threads_select ON message_threads FOR SELECT
  USING (
    user_id = current_user_id() OR
    owns_business(business_id) OR
    is_admin()
  );
CREATE POLICY message_threads_insert ON message_threads FOR INSERT
  WITH CHECK (
    user_id = current_user_id() OR
    is_admin()
  );
CREATE POLICY message_threads_update ON message_threads FOR UPDATE
  USING (
    user_id = current_user_id() OR
    owns_business(business_id) OR
    is_admin()
  );
CREATE POLICY message_threads_delete ON message_threads FOR DELETE
  USING (is_admin());

-- Messages: Participants can access
CREATE POLICY messages_select ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM message_threads mt
      WHERE mt.id = thread_id
      AND (mt.user_id = current_user_id() OR owns_business(mt.business_id))
    ) OR is_admin()
  );
CREATE POLICY messages_insert ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM message_threads mt
      WHERE mt.id = thread_id
      AND (mt.user_id = current_user_id() OR owns_business(mt.business_id))
    ) OR is_admin()
  );
CREATE POLICY messages_update ON messages FOR UPDATE
  USING (
    sender_user_id = current_user_id() OR is_admin()
  );
CREATE POLICY messages_delete ON messages FOR DELETE
  USING (is_admin());

-- Message Attachments: Via message access
CREATE POLICY message_attachments_select ON message_attachments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN message_threads mt ON mt.id = m.thread_id
      WHERE m.id = message_id
      AND (mt.user_id = current_user_id() OR owns_business(mt.business_id))
    ) OR is_admin()
  );
CREATE POLICY message_attachments_insert ON message_attachments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN message_threads mt ON mt.id = m.thread_id
      WHERE m.id = message_id
      AND (mt.user_id = current_user_id() OR owns_business(mt.business_id))
    ) OR is_admin()
  );
CREATE POLICY message_attachments_delete ON message_attachments FOR DELETE
  USING (is_admin());

-- ============================================================================
-- STEP 9: RLS Policies - Reviews
-- ============================================================================

-- Reviews: Public read for published, author can write
CREATE POLICY reviews_select ON reviews FOR SELECT
  USING (
    status = 'published' OR
    user_id = current_user_id() OR
    owns_business(business_id) OR
    is_admin()
  );
CREATE POLICY reviews_insert ON reviews FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY reviews_update ON reviews FOR UPDATE
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY reviews_delete ON reviews FOR DELETE
  USING (user_id = current_user_id() OR is_admin());

-- Review Replies: Business owner can reply to their reviews
CREATE POLICY review_replies_select ON review_replies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM reviews r
      WHERE r.id = review_id AND r.status = 'published'
    ) OR is_admin()
  );
CREATE POLICY review_replies_insert ON review_replies FOR INSERT
  WITH CHECK (
    author_user_id = current_user_id() AND (
      author_type = 'admin' AND is_admin() OR
      author_type = 'business' AND EXISTS (
        SELECT 1 FROM reviews r
        JOIN places p ON p.id = r.place_id
        WHERE r.id = review_id AND owns_business(p.business_id)
      )
    )
  );
CREATE POLICY review_replies_update ON review_replies FOR UPDATE
  USING (author_user_id = current_user_id() OR is_admin());
CREATE POLICY review_replies_delete ON review_replies FOR DELETE
  USING (author_user_id = current_user_id() OR is_admin());

-- Review Photos: Public read for approved, author can manage own
CREATE POLICY review_photos_select ON review_photos FOR SELECT
  USING (
    status = 'approved' OR
    user_id = current_user_id() OR
    is_admin()
  );
CREATE POLICY review_photos_insert ON review_photos FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY review_photos_update ON review_photos FOR UPDATE
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY review_photos_delete ON review_photos FOR DELETE
  USING (user_id = current_user_id() OR is_admin());

-- ============================================================================
-- STEP 10: RLS Policies - Claims
-- ============================================================================

-- Place Claims: User can see their own, business owner can see claims on their places
CREATE POLICY place_claims_select ON place_claims FOR SELECT
  USING (
    user_id = current_user_id() OR
    EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = place_id AND owns_business(p.business_id)
    ) OR
    is_admin()
  );
CREATE POLICY place_claims_insert ON place_claims FOR INSERT
  WITH CHECK (user_id = current_user_id());
CREATE POLICY place_claims_update ON place_claims FOR UPDATE
  USING (user_id = current_user_id() OR is_admin());
CREATE POLICY place_claims_delete ON place_claims FOR DELETE
  USING (is_admin());

-- ============================================================================
-- STEP 11: RLS Policies - Admin & System Tables
-- ============================================================================

-- Audit Logs: Admin only
CREATE POLICY audit_logs_select ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY audit_logs_insert ON audit_logs FOR INSERT WITH CHECK (true); -- System can always insert
CREATE POLICY audit_logs_update ON audit_logs FOR UPDATE USING (false); -- Never update
CREATE POLICY audit_logs_delete ON audit_logs FOR DELETE USING (false); -- Never delete

-- Admin Audit Logs: Admin only
CREATE POLICY admin_audit_logs_select ON admin_audit_logs FOR SELECT USING (is_admin());
CREATE POLICY admin_audit_logs_insert ON admin_audit_logs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY admin_audit_logs_update ON admin_audit_logs FOR UPDATE USING (false);
CREATE POLICY admin_audit_logs_delete ON admin_audit_logs FOR DELETE USING (false);

-- Place Refresh Jobs: Admin only
CREATE POLICY place_refresh_jobs_select ON place_refresh_jobs FOR SELECT USING (is_admin());
CREATE POLICY place_refresh_jobs_insert ON place_refresh_jobs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY place_refresh_jobs_update ON place_refresh_jobs FOR UPDATE USING (is_admin());
CREATE POLICY place_refresh_jobs_delete ON place_refresh_jobs FOR DELETE USING (is_admin());

-- Notification Logs: Admin only
CREATE POLICY notification_logs_select ON notification_logs FOR SELECT USING (is_admin());
CREATE POLICY notification_logs_insert ON notification_logs FOR INSERT WITH CHECK (true); -- System
CREATE POLICY notification_logs_update ON notification_logs FOR UPDATE USING (is_admin());
CREATE POLICY notification_logs_delete ON notification_logs FOR DELETE USING (is_admin());

-- ============================================================================
-- STEP 12: RLS Policies - Badges & Karma Definitions
-- ============================================================================

-- Badge Definitions: Public read, admin write
CREATE POLICY badge_definitions_select ON badge_definitions FOR SELECT USING (true);
CREATE POLICY badge_definitions_insert ON badge_definitions FOR INSERT WITH CHECK (is_admin());
CREATE POLICY badge_definitions_update ON badge_definitions FOR UPDATE USING (is_admin());
CREATE POLICY badge_definitions_delete ON badge_definitions FOR DELETE USING (is_admin());

-- Trust Level Definitions: Public read, admin write
CREATE POLICY trust_level_definitions_select ON trust_level_definitions FOR SELECT USING (true);
CREATE POLICY trust_level_definitions_insert ON trust_level_definitions FOR INSERT WITH CHECK (is_admin());
CREATE POLICY trust_level_definitions_update ON trust_level_definitions FOR UPDATE USING (is_admin());
CREATE POLICY trust_level_definitions_delete ON trust_level_definitions FOR DELETE USING (is_admin());

-- ============================================================================
-- STEP 13: RLS Policies - Blog
-- ============================================================================

-- Blog Categories: Public read, admin write
CREATE POLICY blog_categories_select ON blog_categories FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY blog_categories_insert ON blog_categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY blog_categories_update ON blog_categories FOR UPDATE USING (is_admin());
CREATE POLICY blog_categories_delete ON blog_categories FOR DELETE USING (is_admin());

-- Blog Tags: Public read, admin write
CREATE POLICY blog_tags_select ON blog_tags FOR SELECT USING (true);
CREATE POLICY blog_tags_insert ON blog_tags FOR INSERT WITH CHECK (is_admin());
CREATE POLICY blog_tags_update ON blog_tags FOR UPDATE USING (is_admin());
CREATE POLICY blog_tags_delete ON blog_tags FOR DELETE USING (is_admin());

-- Blog Posts: Public read for published, author/admin can write
CREATE POLICY blog_posts_select ON blog_posts FOR SELECT
  USING (
    status = 'published' OR
    author_id = current_user_id() OR
    is_admin()
  );
CREATE POLICY blog_posts_insert ON blog_posts FOR INSERT
  WITH CHECK (is_admin() OR author_id = current_user_id());
CREATE POLICY blog_posts_update ON blog_posts FOR UPDATE
  USING (author_id = current_user_id() OR is_admin());
CREATE POLICY blog_posts_delete ON blog_posts FOR DELETE
  USING (is_admin());

-- Blog Post Tags: Public read, admin/author write
CREATE POLICY blog_post_tags_select ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY blog_post_tags_insert ON blog_post_tags FOR INSERT
  WITH CHECK (
    is_admin() OR EXISTS (
      SELECT 1 FROM blog_posts bp
      WHERE bp.id = post_id AND bp.author_id = current_user_id()
    )
  );
CREATE POLICY blog_post_tags_delete ON blog_post_tags FOR DELETE
  USING (
    is_admin() OR EXISTS (
      SELECT 1 FROM blog_posts bp
      WHERE bp.id = post_id AND bp.author_id = current_user_id()
    )
  );

-- ============================================================================
-- STEP 14: RLS Policies - AI
-- ============================================================================

-- AI Content Cache: Admin/system only
CREATE POLICY ai_content_cache_select ON ai_content_cache FOR SELECT USING (true); -- Public read for content
CREATE POLICY ai_content_cache_insert ON ai_content_cache FOR INSERT WITH CHECK (is_admin());
CREATE POLICY ai_content_cache_update ON ai_content_cache FOR UPDATE USING (is_admin());
CREATE POLICY ai_content_cache_delete ON ai_content_cache FOR DELETE USING (is_admin());

-- AI Generation Queue: Admin only
CREATE POLICY ai_generation_queue_select ON ai_generation_queue FOR SELECT USING (is_admin());
CREATE POLICY ai_generation_queue_insert ON ai_generation_queue FOR INSERT WITH CHECK (is_admin());
CREATE POLICY ai_generation_queue_update ON ai_generation_queue FOR UPDATE USING (is_admin());
CREATE POLICY ai_generation_queue_delete ON ai_generation_queue FOR DELETE USING (is_admin());

-- ============================================================================
-- STEP 15: RLS Policies - Ads
-- ============================================================================

-- Ad Packages: Public read, admin write
CREATE POLICY ad_packages_select ON ad_packages FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY ad_packages_insert ON ad_packages FOR INSERT WITH CHECK (is_admin());
CREATE POLICY ad_packages_update ON ad_packages FOR UPDATE USING (is_admin());
CREATE POLICY ad_packages_delete ON ad_packages FOR DELETE USING (is_admin());

-- Ad Campaigns: Business owner can manage their own
CREATE POLICY ad_campaigns_select ON ad_campaigns FOR SELECT
  USING (
    owns_business(business_id) OR
    (status = 'active') OR -- Public can see active campaigns for serving
    is_admin()
  );
CREATE POLICY ad_campaigns_insert ON ad_campaigns FOR INSERT
  WITH CHECK (owns_business(business_id) OR is_admin());
CREATE POLICY ad_campaigns_update ON ad_campaigns FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY ad_campaigns_delete ON ad_campaigns FOR DELETE
  USING (is_admin());

-- Ad Impressions: System write, business owner read
CREATE POLICY ad_impressions_select ON ad_impressions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ad_campaigns ac
      WHERE ac.id = campaign_id AND owns_business(ac.business_id)
    ) OR is_admin()
  );
CREATE POLICY ad_impressions_insert ON ad_impressions FOR INSERT
  WITH CHECK (true); -- System inserts
CREATE POLICY ad_impressions_update ON ad_impressions FOR UPDATE
  USING (is_admin());
CREATE POLICY ad_impressions_delete ON ad_impressions FOR DELETE
  USING (is_admin());

-- ============================================================================
-- STEP 16: RLS Policies - Feedback
-- ============================================================================

-- Feedback: Anyone can create, admin can read
CREATE POLICY feedback_select ON feedback FOR SELECT USING (is_admin());
CREATE POLICY feedback_insert ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY feedback_update ON feedback FOR UPDATE USING (is_admin());
CREATE POLICY feedback_delete ON feedback FOR DELETE USING (is_admin());

-- ============================================================================
-- NOTES FOR APPLICATION IMPLEMENTATION
-- ============================================================================
--
-- To use RLS in your application:
--
-- 1. Connect using the 'cutiepaws_app' role (not neondb_owner)
--
-- 2. Set session variables before queries:
--    SET app.user_id = '123';
--    SET app.user_role = 'user';  -- or 'business', 'admin'
--    SET app.business_id = '456'; -- when in business context
--
-- 3. Example with Drizzle:
--    await db.execute(sql`SET app.user_id = ${userId}`);
--    await db.execute(sql`SET app.user_role = ${userRole}`);
--    const result = await db.select().from(reviews);
--
-- 4. Or use a transaction:
--    await db.transaction(async (tx) => {
--      await tx.execute(sql`SET LOCAL app.user_id = ${userId}`);
--      await tx.execute(sql`SET LOCAL app.user_role = ${userRole}`);
--      return tx.select().from(reviews);
--    });
--
-- 5. The helper functions handle NULL/missing settings gracefully
--
-- ============================================================================
