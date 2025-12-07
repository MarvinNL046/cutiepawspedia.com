/**
 * Ad Campaign Queries
 *
 * Functions for managing sponsor ad campaigns and retrieving ads for display.
 */

import { db } from "@/db";
import { eq, and, gte, lte, or, sql, desc, asc, isNull } from "drizzle-orm";
import {
  adPackages,
  adCampaigns,
  adImpressions,
  places,
  businesses,
} from "@/db/schema";

// ============================================================================
// TYPES
// ============================================================================

export type AdPlacementType =
  | "blog_sidebar"
  | "blog_inline"
  | "directory_sidebar"
  | "search_results"
  | "homepage_featured";

export type Locale = "en" | "nl";

export interface ActiveAd {
  id: number;
  businessName: string;
  businessSlug: string;
  placeSlug: string | null;
  headline: string;
  description: string | null;
  imageUrl: string | null;
  ctaText: string;
  destinationUrl: string | null;
  locale: string;
}

// ============================================================================
// PACKAGE QUERIES
// ============================================================================

/**
 * Get all active ad packages
 */
export async function getAdPackages(locale: Locale = "en") {
  const packages = await db
    .select({
      id: adPackages.id,
      key: adPackages.key,
      name: locale === "nl" ? sql`COALESCE(${adPackages.nameNl}, ${adPackages.name})` : adPackages.name,
      description: locale === "nl"
        ? sql`COALESCE(${adPackages.descriptionNl}, ${adPackages.description})`
        : adPackages.description,
      priceCents: adPackages.priceCents,
      durationDays: adPackages.durationDays,
      includedPlacements: adPackages.includedPlacements,
      maxImpressions: adPackages.maxImpressions,
      stripePriceId: adPackages.stripePriceId,
      isPopular: adPackages.isPopular,
    })
    .from(adPackages)
    .where(eq(adPackages.isActive, true))
    .orderBy(asc(adPackages.sortOrder));

  return packages;
}

/**
 * Get a specific package by key
 */
export async function getAdPackageByKey(key: string) {
  const [pkg] = await db
    .select()
    .from(adPackages)
    .where(and(eq(adPackages.key, key), eq(adPackages.isActive, true)))
    .limit(1);

  return pkg;
}

// ============================================================================
// CAMPAIGN QUERIES
// ============================================================================

/**
 * Get active campaigns for a specific placement
 * Returns a random active campaign for the placement
 */
export async function getActiveAdForPlacement(
  placement: AdPlacementType,
  locale: Locale = "en"
): Promise<ActiveAd | null> {
  const now = new Date();

  // Get all active campaigns that include this placement
  const campaigns = await db
    .select({
      id: adCampaigns.id,
      headline: locale === "nl"
        ? sql<string>`COALESCE(${adCampaigns.headlineNl}, ${adCampaigns.headline})`
        : adCampaigns.headline,
      description: locale === "nl"
        ? sql<string>`COALESCE(${adCampaigns.descriptionNl}, ${adCampaigns.description})`
        : adCampaigns.description,
      imageUrl: adCampaigns.imageUrl,
      ctaText: locale === "nl"
        ? sql<string>`COALESCE(${adCampaigns.ctaTextNl}, ${adCampaigns.ctaText})`
        : adCampaigns.ctaText,
      destinationUrl: adCampaigns.destinationUrl,
      businessId: adCampaigns.businessId,
      placeId: adCampaigns.placeId,
      includedPlacements: adPackages.includedPlacements,
    })
    .from(adCampaigns)
    .innerJoin(adPackages, eq(adCampaigns.packageId, adPackages.id))
    .where(
      and(
        eq(adCampaigns.status, "active"),
        or(
          isNull(adCampaigns.startsAt),
          lte(adCampaigns.startsAt, now)
        ),
        or(
          isNull(adCampaigns.endsAt),
          gte(adCampaigns.endsAt, now)
        ),
        or(
          isNull(adCampaigns.maxImpressions),
          sql`${adCampaigns.impressions} < ${adCampaigns.maxImpressions}`
        )
      )
    );

  // Filter by placement
  const eligibleCampaigns = campaigns.filter((c) =>
    c.includedPlacements.split(",").includes(placement)
  );

  if (eligibleCampaigns.length === 0) return null;

  // Pick a random campaign (simple rotation)
  const campaign = eligibleCampaigns[Math.floor(Math.random() * eligibleCampaigns.length)];

  // Get business and place info
  const [business] = await db
    .select({
      name: businesses.name,
      slug: sql<string>`''`, // Business might not have slug
    })
    .from(businesses)
    .where(eq(businesses.id, campaign.businessId))
    .limit(1);

  let placeSlug: string | null = null;
  if (campaign.placeId) {
    const [place] = await db
      .select({ slug: places.slug })
      .from(places)
      .where(eq(places.id, campaign.placeId))
      .limit(1);
    placeSlug = place?.slug || null;
  }

  return {
    id: campaign.id,
    businessName: business?.name || "Sponsor",
    businessSlug: placeSlug || "", // Use place slug as destination
    placeSlug,
    headline: campaign.headline,
    description: campaign.description,
    imageUrl: campaign.imageUrl,
    ctaText: campaign.ctaText || "Learn More",
    destinationUrl: campaign.destinationUrl,
    locale,
  };
}

/**
 * Get campaigns for a business
 */
export async function getBusinessCampaigns(businessId: number) {
  return db
    .select({
      id: adCampaigns.id,
      name: adCampaigns.name,
      status: adCampaigns.status,
      headline: adCampaigns.headline,
      impressions: adCampaigns.impressions,
      clicks: adCampaigns.clicks,
      startsAt: adCampaigns.startsAt,
      endsAt: adCampaigns.endsAt,
      packageName: adPackages.name,
      createdAt: adCampaigns.createdAt,
    })
    .from(adCampaigns)
    .innerJoin(adPackages, eq(adCampaigns.packageId, adPackages.id))
    .where(eq(adCampaigns.businessId, businessId))
    .orderBy(desc(adCampaigns.createdAt));
}

/**
 * Get a single campaign by ID
 */
export async function getCampaignById(campaignId: number) {
  const [campaign] = await db
    .select()
    .from(adCampaigns)
    .where(eq(adCampaigns.id, campaignId))
    .limit(1);

  return campaign;
}

// ============================================================================
// CAMPAIGN MUTATIONS
// ============================================================================

/**
 * Create a new ad campaign (draft status)
 */
export async function createAdCampaign(data: {
  businessId: number;
  placeId?: number;
  packageId: number;
  name: string;
  headline: string;
  headlineNl?: string;
  description?: string;
  descriptionNl?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaTextNl?: string;
  destinationUrl?: string;
}) {
  const [campaign] = await db
    .insert(adCampaigns)
    .values({
      ...data,
      status: "draft",
    })
    .returning();

  return campaign;
}

/**
 * Update campaign after successful Stripe payment
 */
export async function activateCampaign(
  campaignId: number,
  stripeData: {
    paymentIntentId?: string;
    checkoutSessionId?: string;
    amountPaidCents: number;
  },
  durationDays: number
) {
  const now = new Date();
  const endsAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

  const [campaign] = await db
    .update(adCampaigns)
    .set({
      status: "active",
      stripePaymentIntentId: stripeData.paymentIntentId,
      stripeCheckoutSessionId: stripeData.checkoutSessionId,
      paidAt: now,
      amountPaidCents: stripeData.amountPaidCents,
      startsAt: now,
      endsAt,
      updatedAt: now,
    })
    .where(eq(adCampaigns.id, campaignId))
    .returning();

  return campaign;
}

/**
 * Update campaign status
 */
export async function updateCampaignStatus(
  campaignId: number,
  status: "active" | "paused" | "cancelled"
) {
  const [campaign] = await db
    .update(adCampaigns)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(adCampaigns.id, campaignId))
    .returning();

  return campaign;
}

// ============================================================================
// IMPRESSION TRACKING
// ============================================================================

/**
 * Record an ad impression
 */
export async function recordImpression(data: {
  campaignId: number;
  placement: AdPlacementType;
  pageUrl?: string;
  locale?: string;
  sessionId?: string;
  userAgent?: string;
  ipCountry?: string;
}) {
  // Insert impression record
  await db.insert(adImpressions).values({
    campaignId: data.campaignId,
    placement: data.placement,
    pageUrl: data.pageUrl,
    locale: data.locale,
    sessionId: data.sessionId,
    userAgent: data.userAgent,
    ipCountry: data.ipCountry,
  });

  // Increment campaign impressions counter
  await db
    .update(adCampaigns)
    .set({
      impressions: sql`${adCampaigns.impressions} + 1`,
    })
    .where(eq(adCampaigns.id, data.campaignId));
}

/**
 * Record an ad click
 */
export async function recordClick(impressionId: number, campaignId: number) {
  // Update impression record
  await db
    .update(adImpressions)
    .set({
      clicked: true,
      clickedAt: new Date(),
    })
    .where(eq(adImpressions.id, impressionId));

  // Increment campaign clicks counter
  await db
    .update(adCampaigns)
    .set({
      clicks: sql`${adCampaigns.clicks} + 1`,
    })
    .where(eq(adCampaigns.id, campaignId));
}

// ============================================================================
// STATS
// ============================================================================

/**
 * Get campaign stats for a date range
 */
export async function getCampaignStats(
  campaignId: number,
  startDate?: Date,
  endDate?: Date
) {
  // Build conditions array
  const conditions = [eq(adImpressions.campaignId, campaignId)];
  if (startDate) {
    conditions.push(gte(adImpressions.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(lte(adImpressions.createdAt, endDate));
  }

  const [stats] = await db
    .select({
      totalImpressions: sql<number>`COUNT(*)`,
      totalClicks: sql<number>`SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)`,
      ctr: sql<number>`ROUND(
        SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)::numeric /
        NULLIF(COUNT(*), 0) * 100,
        2
      )`,
    })
    .from(adImpressions)
    .where(and(...conditions));

  return stats;
}

/**
 * Get campaign stats broken down by placement
 */
export async function getCampaignStatsByPlacement(campaignId: number) {
  const stats = await db
    .select({
      placement: adImpressions.placement,
      impressions: sql<number>`COUNT(*)`,
      clicks: sql<number>`SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)`,
      ctr: sql<number>`ROUND(
        SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)::numeric /
        NULLIF(COUNT(*), 0) * 100,
        2
      )`,
    })
    .from(adImpressions)
    .where(eq(adImpressions.campaignId, campaignId))
    .groupBy(adImpressions.placement);

  return stats;
}

/**
 * Get aggregate stats for all campaigns of a business, broken down by placement
 */
export async function getBusinessStatsByPlacement(businessId: number) {
  const stats = await db
    .select({
      placement: adImpressions.placement,
      impressions: sql<number>`COUNT(*)`,
      clicks: sql<number>`SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)`,
      ctr: sql<number>`ROUND(
        SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)::numeric /
        NULLIF(COUNT(*), 0) * 100,
        2
      )`,
    })
    .from(adImpressions)
    .innerJoin(adCampaigns, eq(adImpressions.campaignId, adCampaigns.id))
    .where(eq(adCampaigns.businessId, businessId))
    .groupBy(adImpressions.placement);

  return stats;
}

/**
 * Get daily stats for a campaign (for charts)
 */
export async function getCampaignDailyStats(campaignId: number, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const stats = await db
    .select({
      date: sql<string>`DATE(${adImpressions.createdAt})`,
      impressions: sql<number>`COUNT(*)`,
      clicks: sql<number>`SUM(CASE WHEN ${adImpressions.clicked} THEN 1 ELSE 0 END)`,
    })
    .from(adImpressions)
    .where(
      and(
        eq(adImpressions.campaignId, campaignId),
        gte(adImpressions.createdAt, startDate)
      )
    )
    .groupBy(sql`DATE(${adImpressions.createdAt})`)
    .orderBy(sql`DATE(${adImpressions.createdAt})`);

  return stats;
}
