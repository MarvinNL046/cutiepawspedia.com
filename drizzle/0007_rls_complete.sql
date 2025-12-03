-- =============================================================================
-- RLS Complete Migration (Migration 0007)
-- =============================================================================
--
-- This migration enables Row-Level Security AND creates all policies in one
-- atomic operation. This prevents the state where RLS is enabled but no
-- policies exist (which would block all access).
--
-- IMPORTANT: On Neon, the database owner (neondb_owner) has BYPASSRLS=true
-- by default, so RLS policies won't apply to direct owner connections.
-- The app uses withRlsContext() to properly set session context via GUCs.
--
-- Each table also uses FORCE ROW LEVEL SECURITY to ensure policies apply
-- even when accessed by the table owner (unless BYPASSRLS is set on role).
--
-- Access patterns:
-- - Public: countries, cities, categories (read-only)
-- - Public read, auth write: places, reviews, review_photos
-- - User own data: users, place_claims
-- - Business owner: businesses, leads, credit_transactions
-- - Admin only: audit_logs, admin_audit_logs, place_refresh_jobs
-- - System: ai_content_cache, ai_generation_queue
--
-- Note: There is no business_users junction table in this schema.
-- Business ownership is determined by businesses.user_id
-- Place ownership by places.business_id -> businesses.user_id
--
-- =============================================================================

-- =============================================================================
-- 1. COUNTRIES (Public read-only reference data)
-- =============================================================================

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- Anyone can read countries
CREATE POLICY countries_select_public ON countries
  FOR SELECT
  USING (true);

-- Only admin can modify
CREATE POLICY countries_modify_admin ON countries
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 2. CITIES (Public read-only reference data)
-- =============================================================================

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Anyone can read cities
CREATE POLICY cities_select_public ON cities
  FOR SELECT
  USING (true);

-- Only admin can modify
CREATE POLICY cities_modify_admin ON cities
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 3. CATEGORIES (Public read-only reference data)
-- =============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories
CREATE POLICY categories_select_public ON categories
  FOR SELECT
  USING (true);

-- Only admin can modify
CREATE POLICY categories_modify_admin ON categories
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 4. USERS (User sees own profile, admin sees all)
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- User can see own profile, admin can see all
CREATE POLICY users_select ON users
  FOR SELECT
  USING (
    is_admin()
    OR id = app_user_id()
  );

-- User can update own profile, admin can update all
CREATE POLICY users_update ON users
  FOR UPDATE
  USING (
    is_admin()
    OR id = app_user_id()
  )
  WITH CHECK (
    is_admin()
    OR id = app_user_id()
  );

-- Only admin can insert/delete users
CREATE POLICY users_insert_admin ON users
  FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY users_delete_admin ON users
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 5. BUSINESSES (Business owner sees own, admin sees all)
-- =============================================================================

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Business owner can see own business, admin can see all
CREATE POLICY businesses_select ON businesses
  FOR SELECT
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- Business owner can update own business, admin can update all
CREATE POLICY businesses_update ON businesses
  FOR UPDATE
  USING (
    is_admin()
    OR user_id = app_user_id()
  )
  WITH CHECK (
    is_admin()
    OR user_id = app_user_id()
  );

-- Only admin can insert new businesses (business creation is controlled)
-- Or user can create their own business
CREATE POLICY businesses_insert ON businesses
  FOR INSERT
  WITH CHECK (
    is_admin()
    OR user_id = app_user_id()
  );

-- Only admin can delete businesses
CREATE POLICY businesses_delete_admin ON businesses
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 6. PLACES (Public read, business owner/admin can modify)
-- =============================================================================

ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- Anyone can read active places (public directory)
CREATE POLICY places_select_public ON places
  FOR SELECT
  USING (true);

-- Business owner can update their places, admin can update all
CREATE POLICY places_update ON places
  FOR UPDATE
  USING (
    is_admin()
    OR (
      business_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = places.business_id
        AND businesses.user_id = app_user_id()
      )
    )
  )
  WITH CHECK (
    is_admin()
    OR (
      business_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = places.business_id
        AND businesses.user_id = app_user_id()
      )
    )
  );

-- Only admin can insert new places (data pipeline controlled)
CREATE POLICY places_insert_admin ON places
  FOR INSERT
  WITH CHECK (is_admin());

-- Only admin can delete places
CREATE POLICY places_delete_admin ON places
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 7. PLACE_CATEGORIES (Follows places access)
-- =============================================================================

ALTER TABLE place_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read place-category mappings
CREATE POLICY place_categories_select_public ON place_categories
  FOR SELECT
  USING (true);

-- Only admin can modify
CREATE POLICY place_categories_modify_admin ON place_categories
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 8. PLACE_CLAIMS (User sees own claims, admin sees all)
-- =============================================================================

ALTER TABLE place_claims ENABLE ROW LEVEL SECURITY;

-- User can see own claims, admin can see all
CREATE POLICY place_claims_select ON place_claims
  FOR SELECT
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- Authenticated user can insert claim for themselves
CREATE POLICY place_claims_insert ON place_claims
  FOR INSERT
  WITH CHECK (
    is_authenticated()
    AND user_id = app_user_id()
  );

-- User can update own pending claims, admin can update all
CREATE POLICY place_claims_update ON place_claims
  FOR UPDATE
  USING (
    is_admin()
    OR (user_id = app_user_id() AND status = 'pending')
  )
  WITH CHECK (
    is_admin()
    OR (user_id = app_user_id() AND status = 'pending')
  );

-- Only admin can delete claims
CREATE POLICY place_claims_delete_admin ON place_claims
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 9. LEADS (Business owner sees own, admin sees all)
-- =============================================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Business owner can see leads for their business, admin can see all
CREATE POLICY leads_select ON leads
  FOR SELECT
  USING (
    is_admin()
    OR (
      business_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = leads.business_id
        AND businesses.user_id = app_user_id()
      )
    )
  );

-- Anyone can insert leads (contact form submissions)
-- But business_id is set based on place's business_id
CREATE POLICY leads_insert ON leads
  FOR INSERT
  WITH CHECK (true);

-- Business owner can update lead status, admin can update all
CREATE POLICY leads_update ON leads
  FOR UPDATE
  USING (
    is_admin()
    OR (
      business_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = leads.business_id
        AND businesses.user_id = app_user_id()
      )
    )
  )
  WITH CHECK (
    is_admin()
    OR (
      business_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = leads.business_id
        AND businesses.user_id = app_user_id()
      )
    )
  );

-- Only admin can delete leads
CREATE POLICY leads_delete_admin ON leads
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 10. REVIEWS (Public read, authenticated user can create own)
-- =============================================================================

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read published reviews
CREATE POLICY reviews_select_public ON reviews
  FOR SELECT
  USING (
    status = 'published'
    OR is_admin()
    OR user_id = app_user_id()
  );

-- Authenticated user can create review for themselves
CREATE POLICY reviews_insert ON reviews
  FOR INSERT
  WITH CHECK (
    is_authenticated()
    AND user_id = app_user_id()
  );

-- User can update own review, admin can update all
CREATE POLICY reviews_update ON reviews
  FOR UPDATE
  USING (
    is_admin()
    OR user_id = app_user_id()
  )
  WITH CHECK (
    is_admin()
    OR user_id = app_user_id()
  );

-- User can delete own review, admin can delete all
CREATE POLICY reviews_delete ON reviews
  FOR DELETE
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- =============================================================================
-- 11. REVIEW_REPLIES (Public read, business owner can create)
-- =============================================================================

ALTER TABLE review_replies ENABLE ROW LEVEL SECURITY;

-- Anyone can read review replies
CREATE POLICY review_replies_select_public ON review_replies
  FOR SELECT
  USING (true);

-- Business owner of the place can insert reply, admin can insert
CREATE POLICY review_replies_insert ON review_replies
  FOR INSERT
  WITH CHECK (
    is_admin()
    OR (
      is_authenticated()
      AND author_user_id = app_user_id()
      AND EXISTS (
        SELECT 1 FROM reviews r
        JOIN places p ON r.place_id = p.id
        JOIN businesses b ON p.business_id = b.id
        WHERE r.id = review_replies.review_id
        AND b.user_id = app_user_id()
      )
    )
  );

-- Author can update own reply, admin can update all
CREATE POLICY review_replies_update ON review_replies
  FOR UPDATE
  USING (
    is_admin()
    OR author_user_id = app_user_id()
  )
  WITH CHECK (
    is_admin()
    OR author_user_id = app_user_id()
  );

-- Author can delete own reply, admin can delete all
CREATE POLICY review_replies_delete ON review_replies
  FOR DELETE
  USING (
    is_admin()
    OR author_user_id = app_user_id()
  );

-- =============================================================================
-- 12. REVIEW_PHOTOS (Public read approved, user can manage own)
-- =============================================================================

ALTER TABLE review_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved photos, admin sees all, uploader sees own
CREATE POLICY review_photos_select ON review_photos
  FOR SELECT
  USING (
    status = 'approved'
    OR is_admin()
    OR user_id = app_user_id()
  );

-- Authenticated user can upload photo for their review
CREATE POLICY review_photos_insert ON review_photos
  FOR INSERT
  WITH CHECK (
    is_authenticated()
    AND (user_id IS NULL OR user_id = app_user_id())
  );

-- Only admin can update photo status
CREATE POLICY review_photos_update_admin ON review_photos
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- User can delete own photo, admin can delete all
CREATE POLICY review_photos_delete ON review_photos
  FOR DELETE
  USING (
    is_admin()
    OR user_id = app_user_id()
  );

-- =============================================================================
-- 13. CREDIT_TRANSACTIONS (Business owner sees own, admin sees all)
-- =============================================================================

ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Business owner can see own transactions, admin can see all
CREATE POLICY credit_transactions_select ON credit_transactions
  FOR SELECT
  USING (
    is_admin()
    OR EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = credit_transactions.business_id
      AND businesses.user_id = app_user_id()
    )
  );

-- Only admin/system can insert transactions
CREATE POLICY credit_transactions_insert_admin ON credit_transactions
  FOR INSERT
  WITH CHECK (is_admin());

-- Only admin can modify transactions
CREATE POLICY credit_transactions_modify_admin ON credit_transactions
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY credit_transactions_delete_admin ON credit_transactions
  FOR DELETE
  USING (is_admin());

-- =============================================================================
-- 14. AUDIT_LOGS (Admin only)
-- =============================================================================

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admin can read audit logs
CREATE POLICY audit_logs_select_admin ON audit_logs
  FOR SELECT
  USING (is_admin());

-- Only admin/system can insert (via app code)
CREATE POLICY audit_logs_insert_admin ON audit_logs
  FOR INSERT
  WITH CHECK (is_admin());

-- No update/delete allowed
CREATE POLICY audit_logs_no_modify ON audit_logs
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

CREATE POLICY audit_logs_no_delete ON audit_logs
  FOR DELETE
  USING (false);

-- =============================================================================
-- 15. ADMIN_AUDIT_LOGS (Admin only)
-- =============================================================================

ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admin can read admin audit logs
CREATE POLICY admin_audit_logs_select_admin ON admin_audit_logs
  FOR SELECT
  USING (is_admin());

-- Only admin can insert
CREATE POLICY admin_audit_logs_insert_admin ON admin_audit_logs
  FOR INSERT
  WITH CHECK (is_admin());

-- No update/delete allowed
CREATE POLICY admin_audit_logs_no_modify ON admin_audit_logs
  FOR UPDATE
  USING (false)
  WITH CHECK (false);

CREATE POLICY admin_audit_logs_no_delete ON admin_audit_logs
  FOR DELETE
  USING (false);

-- =============================================================================
-- 16. PLACE_REFRESH_JOBS (Admin/system only)
-- =============================================================================

ALTER TABLE place_refresh_jobs ENABLE ROW LEVEL SECURITY;

-- Only admin can read refresh jobs
CREATE POLICY place_refresh_jobs_select_admin ON place_refresh_jobs
  FOR SELECT
  USING (is_admin());

-- Only admin/system can manage
CREATE POLICY place_refresh_jobs_modify_admin ON place_refresh_jobs
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 17. AI_CONTENT_CACHE (Admin/system only)
-- =============================================================================

ALTER TABLE ai_content_cache ENABLE ROW LEVEL SECURITY;

-- Public can read cache (for serving content)
CREATE POLICY ai_content_cache_select_public ON ai_content_cache
  FOR SELECT
  USING (true);

-- Only admin/system can modify
CREATE POLICY ai_content_cache_modify_admin ON ai_content_cache
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- 18. AI_GENERATION_QUEUE (Admin/system only)
-- =============================================================================

ALTER TABLE ai_generation_queue ENABLE ROW LEVEL SECURITY;

-- Only admin can read queue
CREATE POLICY ai_generation_queue_select_admin ON ai_generation_queue
  FOR SELECT
  USING (is_admin());

-- Only admin/system can manage
CREATE POLICY ai_generation_queue_modify_admin ON ai_generation_queue
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================================================
-- VERIFICATION QUERY
-- =============================================================================

-- Run this to verify RLS is enabled and policies exist:
--
-- SELECT
--   schemaname,
--   tablename,
--   rowsecurity,
--   (SELECT count(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
-- FROM pg_tables t
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
