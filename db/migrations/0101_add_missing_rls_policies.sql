-- ============================================================================
-- RLS Policies for Missing Tables - CutiePawsPedia
-- ============================================================================
--
-- This migration adds RLS policies to the 13 tables that are currently
-- missing them. Run after checking with scripts/check-rls-status.ts
--
-- Tables in this migration:
-- 1. ad_campaigns
-- 2. ad_impressions
-- 3. ad_packages
-- 4. blog_categories
-- 5. blog_post_tags
-- 6. blog_posts
-- 7. blog_tags
-- 8. business_notifications
-- 9. business_photos
-- 10. contact_reveals
-- 11. page_views
-- 12. provinces
-- 13. subscription_plans
--
-- ============================================================================

-- ============================================================================
-- Helper functions (create if not exists)
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
-- 1. PROVINCES - Geographic table (public read, admin write)
-- ============================================================================

ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE provinces FORCE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS provinces_select ON provinces;
DROP POLICY IF EXISTS provinces_insert ON provinces;
DROP POLICY IF EXISTS provinces_update ON provinces;
DROP POLICY IF EXISTS provinces_delete ON provinces;

-- Create policies
CREATE POLICY provinces_select ON provinces FOR SELECT USING (true);
CREATE POLICY provinces_insert ON provinces FOR INSERT WITH CHECK (is_admin());
CREATE POLICY provinces_update ON provinces FOR UPDATE USING (is_admin());
CREATE POLICY provinces_delete ON provinces FOR DELETE USING (is_admin());

-- ============================================================================
-- 2. SUBSCRIPTION_PLANS - Public read, admin write
-- ============================================================================

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS subscription_plans_select ON subscription_plans;
DROP POLICY IF EXISTS subscription_plans_insert ON subscription_plans;
DROP POLICY IF EXISTS subscription_plans_update ON subscription_plans;
DROP POLICY IF EXISTS subscription_plans_delete ON subscription_plans;

CREATE POLICY subscription_plans_select ON subscription_plans FOR SELECT USING (true);
CREATE POLICY subscription_plans_insert ON subscription_plans FOR INSERT WITH CHECK (is_admin());
CREATE POLICY subscription_plans_update ON subscription_plans FOR UPDATE USING (is_admin());
CREATE POLICY subscription_plans_delete ON subscription_plans FOR DELETE USING (is_admin());

-- ============================================================================
-- 3. BUSINESS_PHOTOS - Business owner can manage, public can view active
-- ============================================================================

ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_photos FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS business_photos_select ON business_photos;
DROP POLICY IF EXISTS business_photos_insert ON business_photos;
DROP POLICY IF EXISTS business_photos_update ON business_photos;
DROP POLICY IF EXISTS business_photos_delete ON business_photos;

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

-- ============================================================================
-- 4. BUSINESS_NOTIFICATIONS - Business owner only
-- ============================================================================

ALTER TABLE business_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_notifications FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS business_notifications_select ON business_notifications;
DROP POLICY IF EXISTS business_notifications_insert ON business_notifications;
DROP POLICY IF EXISTS business_notifications_update ON business_notifications;
DROP POLICY IF EXISTS business_notifications_delete ON business_notifications;

CREATE POLICY business_notifications_select ON business_notifications FOR SELECT
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY business_notifications_insert ON business_notifications FOR INSERT
  WITH CHECK (is_admin()); -- System only creates notifications
CREATE POLICY business_notifications_update ON business_notifications FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY business_notifications_delete ON business_notifications FOR DELETE
  USING (owns_business(business_id) OR is_admin());

-- ============================================================================
-- 5. PAGE_VIEWS - System inserts, business owner reads own
-- ============================================================================

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS page_views_select ON page_views;
DROP POLICY IF EXISTS page_views_insert ON page_views;
DROP POLICY IF EXISTS page_views_update ON page_views;
DROP POLICY IF EXISTS page_views_delete ON page_views;

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

-- ============================================================================
-- 6. CONTACT_REVEALS - System inserts, business/admin reads
-- ============================================================================

ALTER TABLE contact_reveals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_reveals FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS contact_reveals_select ON contact_reveals;
DROP POLICY IF EXISTS contact_reveals_insert ON contact_reveals;
DROP POLICY IF EXISTS contact_reveals_update ON contact_reveals;
DROP POLICY IF EXISTS contact_reveals_delete ON contact_reveals;

-- Business owner can see contact reveals for their places
CREATE POLICY contact_reveals_select ON contact_reveals FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = place_id AND owns_business(p.business_id)
    )
  );
CREATE POLICY contact_reveals_insert ON contact_reveals FOR INSERT
  WITH CHECK (true); -- System/anonymous inserts allowed
CREATE POLICY contact_reveals_update ON contact_reveals FOR UPDATE
  USING (is_admin());
CREATE POLICY contact_reveals_delete ON contact_reveals FOR DELETE
  USING (is_admin());

-- ============================================================================
-- 7. BLOG_CATEGORIES - Public read for active, admin write
-- ============================================================================

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS blog_categories_select ON blog_categories;
DROP POLICY IF EXISTS blog_categories_insert ON blog_categories;
DROP POLICY IF EXISTS blog_categories_update ON blog_categories;
DROP POLICY IF EXISTS blog_categories_delete ON blog_categories;

CREATE POLICY blog_categories_select ON blog_categories FOR SELECT
  USING (is_active = true OR is_admin());
CREATE POLICY blog_categories_insert ON blog_categories FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY blog_categories_update ON blog_categories FOR UPDATE
  USING (is_admin());
CREATE POLICY blog_categories_delete ON blog_categories FOR DELETE
  USING (is_admin());

-- ============================================================================
-- 8. BLOG_TAGS - Public read, admin write
-- ============================================================================

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS blog_tags_select ON blog_tags;
DROP POLICY IF EXISTS blog_tags_insert ON blog_tags;
DROP POLICY IF EXISTS blog_tags_update ON blog_tags;
DROP POLICY IF EXISTS blog_tags_delete ON blog_tags;

CREATE POLICY blog_tags_select ON blog_tags FOR SELECT USING (true);
CREATE POLICY blog_tags_insert ON blog_tags FOR INSERT WITH CHECK (is_admin());
CREATE POLICY blog_tags_update ON blog_tags FOR UPDATE USING (is_admin());
CREATE POLICY blog_tags_delete ON blog_tags FOR DELETE USING (is_admin());

-- ============================================================================
-- 9. BLOG_POSTS - Public read for published, author/admin write
-- ============================================================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS blog_posts_select ON blog_posts;
DROP POLICY IF EXISTS blog_posts_insert ON blog_posts;
DROP POLICY IF EXISTS blog_posts_update ON blog_posts;
DROP POLICY IF EXISTS blog_posts_delete ON blog_posts;

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

-- ============================================================================
-- 10. BLOG_POST_TAGS - Public read, admin/author write
-- ============================================================================

ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS blog_post_tags_select ON blog_post_tags;
DROP POLICY IF EXISTS blog_post_tags_insert ON blog_post_tags;
DROP POLICY IF EXISTS blog_post_tags_delete ON blog_post_tags;

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
-- 11. AD_PACKAGES - Public read for active, admin write
-- ============================================================================

ALTER TABLE ad_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_packages FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ad_packages_select ON ad_packages;
DROP POLICY IF EXISTS ad_packages_insert ON ad_packages;
DROP POLICY IF EXISTS ad_packages_update ON ad_packages;
DROP POLICY IF EXISTS ad_packages_delete ON ad_packages;

CREATE POLICY ad_packages_select ON ad_packages FOR SELECT
  USING (is_active = true OR is_admin());
CREATE POLICY ad_packages_insert ON ad_packages FOR INSERT
  WITH CHECK (is_admin());
CREATE POLICY ad_packages_update ON ad_packages FOR UPDATE
  USING (is_admin());
CREATE POLICY ad_packages_delete ON ad_packages FOR DELETE
  USING (is_admin());

-- ============================================================================
-- 12. AD_CAMPAIGNS - Business owner can manage their own
-- ============================================================================

ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ad_campaigns_select ON ad_campaigns;
DROP POLICY IF EXISTS ad_campaigns_insert ON ad_campaigns;
DROP POLICY IF EXISTS ad_campaigns_update ON ad_campaigns;
DROP POLICY IF EXISTS ad_campaigns_delete ON ad_campaigns;

CREATE POLICY ad_campaigns_select ON ad_campaigns FOR SELECT
  USING (
    owns_business(business_id) OR
    status = 'active' OR -- For serving ads
    is_admin()
  );
CREATE POLICY ad_campaigns_insert ON ad_campaigns FOR INSERT
  WITH CHECK (owns_business(business_id) OR is_admin());
CREATE POLICY ad_campaigns_update ON ad_campaigns FOR UPDATE
  USING (owns_business(business_id) OR is_admin());
CREATE POLICY ad_campaigns_delete ON ad_campaigns FOR DELETE
  USING (is_admin());

-- ============================================================================
-- 13. AD_IMPRESSIONS - System write, business owner read
-- ============================================================================

ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_impressions FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ad_impressions_select ON ad_impressions;
DROP POLICY IF EXISTS ad_impressions_insert ON ad_impressions;
DROP POLICY IF EXISTS ad_impressions_update ON ad_impressions;
DROP POLICY IF EXISTS ad_impressions_delete ON ad_impressions;

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
-- VERIFICATION
-- ============================================================================
-- Run this query after the migration to verify all tables have RLS:
--
-- SELECT c.relname, c.relrowsecurity, c.relforcerowsecurity
-- FROM pg_class c
-- JOIN pg_namespace n ON n.oid = c.relnamespace
-- WHERE n.nspname = 'public' AND c.relkind = 'r'
-- AND NOT c.relrowsecurity
-- ORDER BY c.relname;
--
-- Expected result: 0 rows (all tables have RLS enabled)
-- ============================================================================
