/**
 * Run RLS Migration Script
 * Applies RLS policies to missing tables
 *
 * Run with: npx tsx scripts/run-rls-migration.ts
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("🔐 Running RLS Migration for missing tables...\n");

  // ============================================================================
  // Helper functions
  // ============================================================================

  console.log("📝 Creating/updating helper functions...");

  await sql`
    CREATE OR REPLACE FUNCTION current_user_id() RETURNS INTEGER AS $$
    BEGIN
      RETURN NULLIF(current_setting('app.user_id', true), '')::INTEGER;
    EXCEPTION
      WHEN OTHERS THEN RETURN NULL;
    END;
    $$ LANGUAGE plpgsql STABLE SECURITY DEFINER
  `;

  await sql`
    CREATE OR REPLACE FUNCTION current_user_role() RETURNS TEXT AS $$
    BEGIN
      RETURN NULLIF(current_setting('app.user_role', true), '');
    EXCEPTION
      WHEN OTHERS THEN RETURN NULL;
    END;
    $$ LANGUAGE plpgsql STABLE SECURITY DEFINER
  `;

  await sql`
    CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
    BEGIN
      RETURN current_user_role() = 'admin';
    END;
    $$ LANGUAGE plpgsql STABLE SECURITY DEFINER
  `;

  await sql`
    CREATE OR REPLACE FUNCTION owns_business(business_id INTEGER) RETURNS BOOLEAN AS $$
    BEGIN
      RETURN EXISTS (
        SELECT 1 FROM businesses
        WHERE id = business_id
        AND user_id = current_user_id()
      );
    END;
    $$ LANGUAGE plpgsql STABLE SECURITY DEFINER
  `;

  console.log("   ✅ Helper functions created\n");

  // ============================================================================
  // 1. PROVINCES
  // ============================================================================

  console.log("1️⃣  Enabling RLS on provinces...");
  await sql`ALTER TABLE provinces ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE provinces FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS provinces_select ON provinces`;
  await sql`DROP POLICY IF EXISTS provinces_insert ON provinces`;
  await sql`DROP POLICY IF EXISTS provinces_update ON provinces`;
  await sql`DROP POLICY IF EXISTS provinces_delete ON provinces`;
  await sql`CREATE POLICY provinces_select ON provinces FOR SELECT USING (true)`;
  await sql`CREATE POLICY provinces_insert ON provinces FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY provinces_update ON provinces FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY provinces_delete ON provinces FOR DELETE USING (is_admin())`;
  console.log("   ✅ provinces done\n");

  // ============================================================================
  // 2. SUBSCRIPTION_PLANS
  // ============================================================================

  console.log("2️⃣  Enabling RLS on subscription_plans...");
  await sql`ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE subscription_plans FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS subscription_plans_select ON subscription_plans`;
  await sql`DROP POLICY IF EXISTS subscription_plans_insert ON subscription_plans`;
  await sql`DROP POLICY IF EXISTS subscription_plans_update ON subscription_plans`;
  await sql`DROP POLICY IF EXISTS subscription_plans_delete ON subscription_plans`;
  await sql`CREATE POLICY subscription_plans_select ON subscription_plans FOR SELECT USING (true)`;
  await sql`CREATE POLICY subscription_plans_insert ON subscription_plans FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY subscription_plans_update ON subscription_plans FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY subscription_plans_delete ON subscription_plans FOR DELETE USING (is_admin())`;
  console.log("   ✅ subscription_plans done\n");

  // ============================================================================
  // 3. BUSINESS_PHOTOS
  // ============================================================================

  console.log("3️⃣  Enabling RLS on business_photos...");
  await sql`ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE business_photos FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS business_photos_select ON business_photos`;
  await sql`DROP POLICY IF EXISTS business_photos_insert ON business_photos`;
  await sql`DROP POLICY IF EXISTS business_photos_update ON business_photos`;
  await sql`DROP POLICY IF EXISTS business_photos_delete ON business_photos`;
  await sql`CREATE POLICY business_photos_select ON business_photos FOR SELECT USING (owns_business(business_id) OR is_admin() OR status = 'active')`;
  await sql`CREATE POLICY business_photos_insert ON business_photos FOR INSERT WITH CHECK (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY business_photos_update ON business_photos FOR UPDATE USING (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY business_photos_delete ON business_photos FOR DELETE USING (owns_business(business_id) OR is_admin())`;
  console.log("   ✅ business_photos done\n");

  // ============================================================================
  // 4. BUSINESS_NOTIFICATIONS
  // ============================================================================

  console.log("4️⃣  Enabling RLS on business_notifications...");
  await sql`ALTER TABLE business_notifications ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE business_notifications FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS business_notifications_select ON business_notifications`;
  await sql`DROP POLICY IF EXISTS business_notifications_insert ON business_notifications`;
  await sql`DROP POLICY IF EXISTS business_notifications_update ON business_notifications`;
  await sql`DROP POLICY IF EXISTS business_notifications_delete ON business_notifications`;
  await sql`CREATE POLICY business_notifications_select ON business_notifications FOR SELECT USING (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY business_notifications_insert ON business_notifications FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY business_notifications_update ON business_notifications FOR UPDATE USING (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY business_notifications_delete ON business_notifications FOR DELETE USING (owns_business(business_id) OR is_admin())`;
  console.log("   ✅ business_notifications done\n");

  // ============================================================================
  // 5. PAGE_VIEWS
  // ============================================================================

  console.log("5️⃣  Enabling RLS on page_views...");
  await sql`ALTER TABLE page_views ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE page_views FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS page_views_select ON page_views`;
  await sql`DROP POLICY IF EXISTS page_views_insert ON page_views`;
  await sql`DROP POLICY IF EXISTS page_views_update ON page_views`;
  await sql`DROP POLICY IF EXISTS page_views_delete ON page_views`;
  await sql`CREATE POLICY page_views_select ON page_views FOR SELECT USING (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY page_views_insert ON page_views FOR INSERT WITH CHECK (true)`;
  await sql`CREATE POLICY page_views_update ON page_views FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY page_views_delete ON page_views FOR DELETE USING (is_admin())`;
  console.log("   ✅ page_views done\n");

  // ============================================================================
  // 6. CONTACT_REVEALS
  // ============================================================================

  console.log("6️⃣  Enabling RLS on contact_reveals...");
  await sql`ALTER TABLE contact_reveals ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE contact_reveals FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS contact_reveals_select ON contact_reveals`;
  await sql`DROP POLICY IF EXISTS contact_reveals_insert ON contact_reveals`;
  await sql`DROP POLICY IF EXISTS contact_reveals_update ON contact_reveals`;
  await sql`DROP POLICY IF EXISTS contact_reveals_delete ON contact_reveals`;
  await sql`CREATE POLICY contact_reveals_select ON contact_reveals FOR SELECT USING (is_admin() OR EXISTS (SELECT 1 FROM places p WHERE p.id = place_id AND owns_business(p.business_id)))`;
  await sql`CREATE POLICY contact_reveals_insert ON contact_reveals FOR INSERT WITH CHECK (true)`;
  await sql`CREATE POLICY contact_reveals_update ON contact_reveals FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY contact_reveals_delete ON contact_reveals FOR DELETE USING (is_admin())`;
  console.log("   ✅ contact_reveals done\n");

  // ============================================================================
  // 7. BLOG_CATEGORIES
  // ============================================================================

  console.log("7️⃣  Enabling RLS on blog_categories...");
  await sql`ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE blog_categories FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS blog_categories_select ON blog_categories`;
  await sql`DROP POLICY IF EXISTS blog_categories_insert ON blog_categories`;
  await sql`DROP POLICY IF EXISTS blog_categories_update ON blog_categories`;
  await sql`DROP POLICY IF EXISTS blog_categories_delete ON blog_categories`;
  await sql`CREATE POLICY blog_categories_select ON blog_categories FOR SELECT USING (is_active = true OR is_admin())`;
  await sql`CREATE POLICY blog_categories_insert ON blog_categories FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY blog_categories_update ON blog_categories FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY blog_categories_delete ON blog_categories FOR DELETE USING (is_admin())`;
  console.log("   ✅ blog_categories done\n");

  // ============================================================================
  // 8. BLOG_TAGS
  // ============================================================================

  console.log("8️⃣  Enabling RLS on blog_tags...");
  await sql`ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE blog_tags FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS blog_tags_select ON blog_tags`;
  await sql`DROP POLICY IF EXISTS blog_tags_insert ON blog_tags`;
  await sql`DROP POLICY IF EXISTS blog_tags_update ON blog_tags`;
  await sql`DROP POLICY IF EXISTS blog_tags_delete ON blog_tags`;
  await sql`CREATE POLICY blog_tags_select ON blog_tags FOR SELECT USING (true)`;
  await sql`CREATE POLICY blog_tags_insert ON blog_tags FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY blog_tags_update ON blog_tags FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY blog_tags_delete ON blog_tags FOR DELETE USING (is_admin())`;
  console.log("   ✅ blog_tags done\n");

  // ============================================================================
  // 9. BLOG_POSTS
  // ============================================================================

  console.log("9️⃣  Enabling RLS on blog_posts...");
  await sql`ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE blog_posts FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS blog_posts_select ON blog_posts`;
  await sql`DROP POLICY IF EXISTS blog_posts_insert ON blog_posts`;
  await sql`DROP POLICY IF EXISTS blog_posts_update ON blog_posts`;
  await sql`DROP POLICY IF EXISTS blog_posts_delete ON blog_posts`;
  await sql`CREATE POLICY blog_posts_select ON blog_posts FOR SELECT USING (status = 'published' OR author_id = current_user_id() OR is_admin())`;
  await sql`CREATE POLICY blog_posts_insert ON blog_posts FOR INSERT WITH CHECK (is_admin() OR author_id = current_user_id())`;
  await sql`CREATE POLICY blog_posts_update ON blog_posts FOR UPDATE USING (author_id = current_user_id() OR is_admin())`;
  await sql`CREATE POLICY blog_posts_delete ON blog_posts FOR DELETE USING (is_admin())`;
  console.log("   ✅ blog_posts done\n");

  // ============================================================================
  // 10. BLOG_POST_TAGS
  // ============================================================================

  console.log("🔟 Enabling RLS on blog_post_tags...");
  await sql`ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE blog_post_tags FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS blog_post_tags_select ON blog_post_tags`;
  await sql`DROP POLICY IF EXISTS blog_post_tags_insert ON blog_post_tags`;
  await sql`DROP POLICY IF EXISTS blog_post_tags_delete ON blog_post_tags`;
  await sql`CREATE POLICY blog_post_tags_select ON blog_post_tags FOR SELECT USING (true)`;
  await sql`CREATE POLICY blog_post_tags_insert ON blog_post_tags FOR INSERT WITH CHECK (is_admin() OR EXISTS (SELECT 1 FROM blog_posts bp WHERE bp.id = post_id AND bp.author_id = current_user_id()))`;
  await sql`CREATE POLICY blog_post_tags_delete ON blog_post_tags FOR DELETE USING (is_admin() OR EXISTS (SELECT 1 FROM blog_posts bp WHERE bp.id = post_id AND bp.author_id = current_user_id()))`;
  console.log("   ✅ blog_post_tags done\n");

  // ============================================================================
  // 11. AD_PACKAGES
  // ============================================================================

  console.log("1️⃣1️⃣ Enabling RLS on ad_packages...");
  await sql`ALTER TABLE ad_packages ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE ad_packages FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS ad_packages_select ON ad_packages`;
  await sql`DROP POLICY IF EXISTS ad_packages_insert ON ad_packages`;
  await sql`DROP POLICY IF EXISTS ad_packages_update ON ad_packages`;
  await sql`DROP POLICY IF EXISTS ad_packages_delete ON ad_packages`;
  await sql`CREATE POLICY ad_packages_select ON ad_packages FOR SELECT USING (is_active = true OR is_admin())`;
  await sql`CREATE POLICY ad_packages_insert ON ad_packages FOR INSERT WITH CHECK (is_admin())`;
  await sql`CREATE POLICY ad_packages_update ON ad_packages FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY ad_packages_delete ON ad_packages FOR DELETE USING (is_admin())`;
  console.log("   ✅ ad_packages done\n");

  // ============================================================================
  // 12. AD_CAMPAIGNS
  // ============================================================================

  console.log("1️⃣2️⃣ Enabling RLS on ad_campaigns...");
  await sql`ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE ad_campaigns FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS ad_campaigns_select ON ad_campaigns`;
  await sql`DROP POLICY IF EXISTS ad_campaigns_insert ON ad_campaigns`;
  await sql`DROP POLICY IF EXISTS ad_campaigns_update ON ad_campaigns`;
  await sql`DROP POLICY IF EXISTS ad_campaigns_delete ON ad_campaigns`;
  await sql`CREATE POLICY ad_campaigns_select ON ad_campaigns FOR SELECT USING (owns_business(business_id) OR status = 'active' OR is_admin())`;
  await sql`CREATE POLICY ad_campaigns_insert ON ad_campaigns FOR INSERT WITH CHECK (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY ad_campaigns_update ON ad_campaigns FOR UPDATE USING (owns_business(business_id) OR is_admin())`;
  await sql`CREATE POLICY ad_campaigns_delete ON ad_campaigns FOR DELETE USING (is_admin())`;
  console.log("   ✅ ad_campaigns done\n");

  // ============================================================================
  // 13. AD_IMPRESSIONS
  // ============================================================================

  console.log("1️⃣3️⃣ Enabling RLS on ad_impressions...");
  await sql`ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY`;
  await sql`ALTER TABLE ad_impressions FORCE ROW LEVEL SECURITY`;
  await sql`DROP POLICY IF EXISTS ad_impressions_select ON ad_impressions`;
  await sql`DROP POLICY IF EXISTS ad_impressions_insert ON ad_impressions`;
  await sql`DROP POLICY IF EXISTS ad_impressions_update ON ad_impressions`;
  await sql`DROP POLICY IF EXISTS ad_impressions_delete ON ad_impressions`;
  await sql`CREATE POLICY ad_impressions_select ON ad_impressions FOR SELECT USING (EXISTS (SELECT 1 FROM ad_campaigns ac WHERE ac.id = campaign_id AND owns_business(ac.business_id)) OR is_admin())`;
  await sql`CREATE POLICY ad_impressions_insert ON ad_impressions FOR INSERT WITH CHECK (true)`;
  await sql`CREATE POLICY ad_impressions_update ON ad_impressions FOR UPDATE USING (is_admin())`;
  await sql`CREATE POLICY ad_impressions_delete ON ad_impressions FOR DELETE USING (is_admin())`;
  console.log("   ✅ ad_impressions done\n");

  console.log("✅ RLS Migration completed successfully!");
  console.log("\n📊 Run 'npx tsx scripts/check-rls-status.ts' to verify.\n");
}

main().catch(console.error);
