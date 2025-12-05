/**
 * Notification Queries
 *
 * Database queries for notification settings and logs.
 * Part of P2: Email Notifications & Digests
 */

import { eq } from "drizzle-orm";
import { db } from "../index";
import { notificationSettings, notificationLogs, users } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export type NotificationSettingsRow = typeof notificationSettings.$inferSelect;
export type NotificationSettingsInsert = typeof notificationSettings.$inferInsert;
export type NotificationLogRow = typeof notificationLogs.$inferSelect;
export type NotificationLogInsert = typeof notificationLogs.$inferInsert;

// Default notification settings
export const DEFAULT_NOTIFICATION_SETTINGS = {
  emailGeneral: true,
  emailReviews: true,
  emailFavorites: true,
  emailLeads: true,
  emailBusiness: true,
  emailDigest: true,
  locale: null,
} as const;

// ============================================================================
// NOTIFICATION SETTINGS QUERIES
// ============================================================================

/**
 * Get notification settings for a user
 * Returns default settings if none exist
 */
export async function getNotificationSettings(
  userId: number
): Promise<NotificationSettingsRow | null> {
  if (!db) return null;

  const result = await db
    .select()
    .from(notificationSettings)
    .where(eq(notificationSettings.userId, userId))
    .limit(1);

  return result[0] || null;
}

/**
 * Get or create notification settings for a user
 * Creates default settings if none exist
 */
export async function getOrCreateNotificationSettings(
  userId: number
): Promise<NotificationSettingsRow> {
  if (!db) throw new Error("Database not available");

  // Try to get existing settings
  const existing = await getNotificationSettings(userId);
  if (existing) return existing;

  // Create default settings
  const [newSettings] = await db
    .insert(notificationSettings)
    .values({
      userId,
      ...DEFAULT_NOTIFICATION_SETTINGS,
    })
    .returning();

  return newSettings;
}

/**
 * Update notification settings for a user
 * Supports all N2 fields including quiet hours and throttling
 */
export async function updateNotificationSettings(
  userId: number,
  settings: Partial<{
    emailGeneral: boolean;
    emailReviews: boolean;
    emailFavorites: boolean;
    emailLeads: boolean;
    emailBusiness: boolean;
    emailDigest: boolean;
    locale: string | null;
    // N2 fields
    quietHoursEnabled: boolean;
    quietHoursStart: number;
    quietHoursEnd: number;
    timezone: string | null;
    maxEmailsPerWeek: number | null;
  }>
): Promise<NotificationSettingsRow> {
  if (!db) throw new Error("Database not available");

  // Ensure settings exist
  await getOrCreateNotificationSettings(userId);

  // Update settings
  const [updated] = await db
    .update(notificationSettings)
    .set({
      ...settings,
      updatedAt: new Date(),
    })
    .where(eq(notificationSettings.userId, userId))
    .returning();

  return updated;
}

/**
 * Check if a user has a specific notification type enabled
 */
export async function isNotificationEnabled(
  userId: number,
  type: "general" | "reviews" | "favorites" | "leads" | "business" | "digest"
): Promise<boolean> {
  const settings = await getNotificationSettings(userId);

  // If no settings, use defaults (all enabled)
  if (!settings) {
    return DEFAULT_NOTIFICATION_SETTINGS[
      `email${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof DEFAULT_NOTIFICATION_SETTINGS
    ] as boolean;
  }

  switch (type) {
    case "general":
      return settings.emailGeneral;
    case "reviews":
      return settings.emailReviews;
    case "favorites":
      return settings.emailFavorites;
    case "leads":
      return settings.emailLeads;
    case "business":
      return settings.emailBusiness;
    case "digest":
      return settings.emailDigest;
    default:
      return true;
  }
}

/**
 * Get user's preferred locale for emails
 */
export async function getNotificationLocale(userId: number): Promise<string> {
  const settings = await getNotificationSettings(userId);
  return settings?.locale || "en";
}

// ============================================================================
// NOTIFICATION LOGS QUERIES
// ============================================================================

/**
 * Log a sent notification
 */
export async function logNotification(data: {
  userId?: number | null;
  businessId?: number | null;
  type: string;
  email: string;
  status: "sent" | "failed";
  error?: string | null;
  metadata?: Record<string, unknown> | null;
}): Promise<NotificationLogRow | null> {
  if (!db) {
    console.error("Cannot log notification: Database not available");
    return null;
  }

  try {
    const [log] = await db
      .insert(notificationLogs)
      .values({
        userId: data.userId ?? null,
        businessId: data.businessId ?? null,
        type: data.type,
        email: data.email,
        status: data.status,
        error: data.error ?? null,
        metadata: data.metadata ?? null,
      })
      .returning();

    return log;
  } catch (error) {
    // Log but don't throw - notification logging should never block operations
    console.error("Failed to log notification:", error);
    return null;
  }
}

/**
 * Get recent notification logs (admin only)
 */
export async function getNotificationLogs(options: {
  limit?: number;
  offset?: number;
  type?: string;
  status?: "sent" | "failed";
  userId?: number;
  businessId?: number;
} = {}): Promise<NotificationLogRow[]> {
  if (!db) return [];

  const { limit = 50, offset = 0 } = options;

  const query = db
    .select()
    .from(notificationLogs)
    .orderBy(notificationLogs.createdAt)
    .limit(limit)
    .offset(offset);

  // Note: filtering would need to be added with where clauses
  // For now, return all logs ordered by date

  return query;
}

/**
 * Get businesses with their owners for weekly digest
 * Only includes businesses where the owner has digest enabled
 */
export async function getBusinessesForDigest(): Promise<
  Array<{
    businessId: number;
    businessName: string;
    userId: number;
    userEmail: string;
    userName: string | null;
    locale: string;
  }>
> {
  if (!db) return [];

  // Import businesses table
  const { businesses } = await import("../schema");

  // Get all businesses with their owners
  const businessesWithOwners = await db
    .select({
      businessId: businesses.id,
      businessName: businesses.name,
      userId: users.id,
      userEmail: users.email,
      userName: users.name,
      digestEnabled: notificationSettings.emailDigest,
      locale: notificationSettings.locale,
    })
    .from(businesses)
    .innerJoin(users, eq(businesses.userId, users.id))
    .leftJoin(notificationSettings, eq(users.id, notificationSettings.userId))
    .where(eq(businesses.status, "active"));

  // Filter to only those with digest enabled (or no settings = default enabled)
  return businessesWithOwners
    .filter((b) => b.digestEnabled === null || b.digestEnabled === true)
    .map((b) => ({
      businessId: b.businessId,
      businessName: b.businessName,
      userId: b.userId,
      userEmail: b.userEmail,
      userName: b.userName,
      locale: b.locale || "en",
    }));
}

/**
 * Get weekly stats for a business
 * Returns leads and reviews from the past 7 days
 */
export async function getBusinessWeeklyStats(businessId: number): Promise<{
  newLeadsCount: number;
  newReviewsCount: number;
  averageRating: number | null;
}> {
  if (!db) return { newLeadsCount: 0, newReviewsCount: 0, averageRating: null };

  const { leads, reviews } = await import("../schema");
  const { gte, and, sql } = await import("drizzle-orm");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Count new leads
  const [leadsResult] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(leads)
    .where(
      and(
        eq(leads.businessId, businessId),
        gte(leads.createdAt, sevenDaysAgo)
      )
    );

  // Count new reviews and get average rating
  const [reviewsResult] = await db
    .select({
      count: sql<number>`COUNT(*)`,
      avgRating: sql<number>`AVG(rating)`,
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.businessId, businessId),
        gte(reviews.createdAt, sevenDaysAgo)
      )
    );

  return {
    newLeadsCount: Number(leadsResult?.count ?? 0),
    newReviewsCount: Number(reviewsResult?.count ?? 0),
    averageRating: reviewsResult?.avgRating
      ? Number(reviewsResult.avgRating)
      : null,
  };
}
