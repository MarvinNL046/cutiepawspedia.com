/**
 * Analytics Database Queries
 *
 * Query functions for business analytics with plan-based feature access.
 */

import { db } from "@/db";
import { sql, eq, and, gte, lte, desc, count } from "drizzle-orm";
import { pageViews, leads, places } from "@/db/schema/directory";

/**
 * Get basic analytics summary for a business
 * Available to: STARTER, PRO, ELITE
 */
export async function getBasicAnalytics(businessId: number): Promise<{
  totalViews: number;
  totalLeads: number;
  thisMonthViews: number;
  thisMonthLeads: number;
  lastMonthViews: number;
  lastMonthLeads: number;
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Total views
  const [totalViewsResult] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(eq(pageViews.businessId, businessId));

  // Total leads
  const [totalLeadsResult] = await db
    .select({ count: count() })
    .from(leads)
    .where(eq(leads.businessId, businessId));

  // This month views
  const [thisMonthViewsResult] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startOfMonth)
      )
    );

  // This month leads
  const [thisMonthLeadsResult] = await db
    .select({ count: count() })
    .from(leads)
    .where(
      and(eq(leads.businessId, businessId), gte(leads.createdAt, startOfMonth))
    );

  // Last month views
  const [lastMonthViewsResult] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startOfLastMonth),
        lte(pageViews.viewedAt, endOfLastMonth)
      )
    );

  // Last month leads
  const [lastMonthLeadsResult] = await db
    .select({ count: count() })
    .from(leads)
    .where(
      and(
        eq(leads.businessId, businessId),
        gte(leads.createdAt, startOfLastMonth),
        lte(leads.createdAt, endOfLastMonth)
      )
    );

  return {
    totalViews: totalViewsResult?.count || 0,
    totalLeads: totalLeadsResult?.count || 0,
    thisMonthViews: thisMonthViewsResult?.count || 0,
    thisMonthLeads: thisMonthLeadsResult?.count || 0,
    lastMonthViews: lastMonthViewsResult?.count || 0,
    lastMonthLeads: lastMonthLeadsResult?.count || 0,
  };
}

/**
 * Get daily views for the last N days (for charts)
 * Available to: PRO, ELITE
 */
export async function getDailyViews(
  businessId: number,
  days: number = 30
): Promise<Array<{ date: string; views: number }>> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const results = await db
    .select({
      date: sql<string>`DATE(${pageViews.viewedAt})`,
      views: count(),
    })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startDate)
      )
    )
    .groupBy(sql`DATE(${pageViews.viewedAt})`)
    .orderBy(sql`DATE(${pageViews.viewedAt})`);

  // Fill in missing days with 0 views
  const dateMap = new Map(
    results.map((r) => [r.date, r.views])
  );

  const filledResults: Array<{ date: string; views: number }> = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    const dateStr = date.toISOString().split("T")[0];
    filledResults.push({
      date: dateStr,
      views: dateMap.get(dateStr) || 0,
    });
  }

  return filledResults;
}

/**
 * Get daily leads for the last N days (for charts)
 * Available to: PRO, ELITE
 */
export async function getDailyLeads(
  businessId: number,
  days: number = 30
): Promise<Array<{ date: string; leads: number }>> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const results = await db
    .select({
      date: sql<string>`DATE(${leads.createdAt})`,
      leads: count(),
    })
    .from(leads)
    .where(
      and(eq(leads.businessId, businessId), gte(leads.createdAt, startDate))
    )
    .groupBy(sql`DATE(${leads.createdAt})`)
    .orderBy(sql`DATE(${leads.createdAt})`);

  // Fill in missing days with 0 leads
  const dateMap = new Map(
    results.map((r) => [r.date, r.leads])
  );

  const filledResults: Array<{ date: string; leads: number }> = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    const dateStr = date.toISOString().split("T")[0];
    filledResults.push({
      date: dateStr,
      leads: dateMap.get(dateStr) || 0,
    });
  }

  return filledResults;
}

/**
 * Get device type breakdown
 * Available to: PRO, ELITE
 */
export async function getDeviceBreakdown(
  businessId: number,
  days: number = 30
): Promise<Array<{ device: string; count: number; percentage: number }>> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const results = await db
    .select({
      device: pageViews.deviceType,
      count: count(),
    })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startDate)
      )
    )
    .groupBy(pageViews.deviceType)
    .orderBy(desc(count()));

  const total = results.reduce((sum, r) => sum + r.count, 0);

  return results.map((r) => ({
    device: r.device || "unknown",
    count: r.count,
    percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
  }));
}

/**
 * Get source/referrer breakdown
 * Available to: PRO, ELITE
 */
export async function getSourceBreakdown(
  businessId: number,
  days: number = 30
): Promise<Array<{ source: string; count: number; percentage: number }>> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const results = await db
    .select({
      source: pageViews.source,
      count: count(),
    })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startDate)
      )
    )
    .groupBy(pageViews.source)
    .orderBy(desc(count()));

  const total = results.reduce((sum, r) => sum + r.count, 0);

  return results.map((r) => ({
    source: r.source || "direct",
    count: r.count,
    percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
  }));
}

/**
 * Get per-place analytics
 * Available to: PRO, ELITE
 */
export async function getPlaceAnalytics(
  businessId: number,
  days: number = 30
): Promise<
  Array<{
    placeId: number;
    placeName: string;
    views: number;
    leads: number;
  }>
> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get views per place
  const viewResults = await db
    .select({
      placeId: pageViews.placeId,
      placeName: places.name,
      views: count(),
    })
    .from(pageViews)
    .innerJoin(places, eq(pageViews.placeId, places.id))
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startDate)
      )
    )
    .groupBy(pageViews.placeId, places.name)
    .orderBy(desc(count()));

  // Get leads per place
  const leadResults = await db
    .select({
      placeId: leads.placeId,
      leads: count(),
    })
    .from(leads)
    .where(
      and(eq(leads.businessId, businessId), gte(leads.createdAt, startDate))
    )
    .groupBy(leads.placeId);

  const leadsMap = new Map(leadResults.map((r) => [r.placeId, r.leads]));

  return viewResults.map((r) => ({
    placeId: r.placeId,
    placeName: r.placeName,
    views: r.views,
    leads: leadsMap.get(r.placeId) || 0,
  }));
}

/**
 * Get conversion rate (leads / views)
 * Available to: PRO, ELITE
 */
export async function getConversionRate(
  businessId: number,
  days: number = 30
): Promise<number> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [viewsResult] = await db
    .select({ count: count() })
    .from(pageViews)
    .where(
      and(
        eq(pageViews.businessId, businessId),
        gte(pageViews.viewedAt, startDate)
      )
    );

  const [leadsResult] = await db
    .select({ count: count() })
    .from(leads)
    .where(
      and(eq(leads.businessId, businessId), gte(leads.createdAt, startDate))
    );

  const views = viewsResult?.count || 0;
  const leadsCount = leadsResult?.count || 0;

  if (views === 0) return 0;
  return Math.round((leadsCount / views) * 10000) / 100; // Return as percentage with 2 decimals
}

/**
 * Record a page view
 */
export async function recordPageView(data: {
  placeId: number;
  businessId?: number | null;
  sessionId?: string | null;
  source?: string | null;
  referrer?: string | null;
  deviceType?: string | null;
  locale?: string | null;
}): Promise<void> {
  await db.insert(pageViews).values({
    placeId: data.placeId,
    businessId: data.businessId,
    sessionId: data.sessionId,
    source: data.source,
    referrer: data.referrer,
    deviceType: data.deviceType,
    locale: data.locale,
  });
}

// Type exports
export type BasicAnalytics = Awaited<ReturnType<typeof getBasicAnalytics>>;
export type DailyViewsData = Awaited<ReturnType<typeof getDailyViews>>;
export type DailyLeadsData = Awaited<ReturnType<typeof getDailyLeads>>;
export type DeviceBreakdown = Awaited<ReturnType<typeof getDeviceBreakdown>>;
export type SourceBreakdown = Awaited<ReturnType<typeof getSourceBreakdown>>;
export type PlaceAnalytics = Awaited<ReturnType<typeof getPlaceAnalytics>>;
