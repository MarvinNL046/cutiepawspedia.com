/**
 * Notification Rules Engine
 *
 * Smart conditional logic for notifications:
 * - Throttling: maxPerHour, minIntervalMinutes per type
 * - Bundling: Aggregate similar notifications
 * - Relevance: Filter insignificant changes
 *
 * Part of N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

import { db } from "@/db";
import { notificationLogs, notificationSettings } from "@/db/schema";
import { eq, and, gte, desc, count as sqlCount } from "drizzle-orm";
import type { NotificationType, AnyNotificationPayload } from "./types";

// ============================================================================
// RULE CONFIGURATION
// ============================================================================

/**
 * Per-type throttle configuration
 */
export interface ThrottleConfig {
  maxPerHour: number;           // Max notifications per hour for this type
  minIntervalMinutes: number;    // Minimum minutes between notifications
  maxPerDay?: number;            // Optional: Max per day
}

export const THROTTLE_RULES: Record<NotificationType, ThrottleConfig> = {
  // Business notifications - allow more frequent
  REVIEW_NEW: { maxPerHour: 10, minIntervalMinutes: 5 },
  LEAD_NEW: { maxPerHour: 15, minIntervalMinutes: 2, maxPerDay: 50 },

  // User notifications - moderate frequency
  REVIEW_REPLY: { maxPerHour: 5, minIntervalMinutes: 10 },
  FAVORITE_PLACE_UPDATE: { maxPerHour: 3, minIntervalMinutes: 30 },

  // Important one-time notifications - no throttling
  CLAIM_APPROVED: { maxPerHour: 100, minIntervalMinutes: 0 },
  CLAIM_REJECTED: { maxPerHour: 100, minIntervalMinutes: 0 },

  // Digest - once per week
  DIGEST_WEEKLY: { maxPerHour: 1, minIntervalMinutes: 10080 }, // 7 days
  DIGEST_USER: { maxPerHour: 1, minIntervalMinutes: 10080 }, // 7 days
  DIGEST_ADMIN: { maxPerHour: 1, minIntervalMinutes: 10080 }, // 7 days
};

/**
 * Fields that are significant enough to notify users about changes
 */
export const SIGNIFICANT_PLACE_FIELDS = [
  "openingHours",
  "phone",
  "email",
  "website",
  "address",
  "status", // Permanently closed, etc.
] as const;

/**
 * Fields that are minor updates (not worth notifying about alone)
 */
export const MINOR_PLACE_FIELDS = [
  "description",
  "avgRating",
  "reviewCount",
  "dataQualityFlags",
  "lastEnriched",
] as const;

/**
 * Minimum number of minor fields changed to trigger notification
 */
export const MIN_MINOR_CHANGES_FOR_NOTIFY = 3;

// ============================================================================
// THROTTLE CHECKING
// ============================================================================

export interface ThrottleCheckResult {
  allowed: boolean;
  reason?: string;
  retryAfterMinutes?: number;
  currentCount?: number;
  limit?: number;
}

/**
 * Check if a notification should be throttled
 *
 * @param type - The notification type
 * @param recipientKey - Unique identifier for the recipient (userId or email)
 * @returns Whether the notification is allowed and why
 */
export async function checkThrottle(
  type: NotificationType,
  recipientKey: string | number
): Promise<ThrottleCheckResult> {
  const config = THROTTLE_RULES[type];
  if (!config) {
    return { allowed: true };
  }

  // Skip throttle check if minInterval is 0 (important notifications)
  if (config.minIntervalMinutes === 0 && config.maxPerHour >= 100) {
    return { allowed: true };
  }

  if (!db) {
    console.warn("Cannot check throttle: Database not available");
    return { allowed: true };
  }

  try {
    const now = new Date();

    // Check minimum interval
    if (config.minIntervalMinutes > 0) {
      const minIntervalAgo = new Date(now.getTime() - config.minIntervalMinutes * 60 * 1000);

      const recentLogs = await db
        .select({ createdAt: notificationLogs.createdAt })
        .from(notificationLogs)
        .where(
          and(
            eq(notificationLogs.type, type),
            eq(notificationLogs.status, "sent"),
            gte(notificationLogs.createdAt, minIntervalAgo),
            // Match by email if string, or could extend to userId
            typeof recipientKey === "string"
              ? eq(notificationLogs.email, recipientKey)
              : eq(notificationLogs.userId, recipientKey)
          )
        )
        .orderBy(desc(notificationLogs.createdAt))
        .limit(1);

      if (recentLogs.length > 0) {
        const lastSent = recentLogs[0].createdAt;
        const minutesSince = Math.floor((now.getTime() - lastSent.getTime()) / 60000);
        const retryAfter = config.minIntervalMinutes - minutesSince;

        if (retryAfter > 0) {
          return {
            allowed: false,
            reason: `Too soon after last ${type} notification`,
            retryAfterMinutes: retryAfter,
          };
        }
      }
    }

    // Check hourly limit
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const [hourlyCount] = await db
      .select({ count: sqlCount() })
      .from(notificationLogs)
      .where(
        and(
          eq(notificationLogs.type, type),
          eq(notificationLogs.status, "sent"),
          gte(notificationLogs.createdAt, oneHourAgo),
          typeof recipientKey === "string"
            ? eq(notificationLogs.email, recipientKey)
            : eq(notificationLogs.userId, recipientKey)
        )
      );

    const currentHourlyCount = Number(hourlyCount?.count ?? 0);

    if (currentHourlyCount >= config.maxPerHour) {
      return {
        allowed: false,
        reason: `Hourly limit reached for ${type}`,
        currentCount: currentHourlyCount,
        limit: config.maxPerHour,
        retryAfterMinutes: 60,
      };
    }

    // Check daily limit if configured
    if (config.maxPerDay) {
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const [dailyCount] = await db
        .select({ count: sqlCount() })
        .from(notificationLogs)
        .where(
          and(
            eq(notificationLogs.type, type),
            eq(notificationLogs.status, "sent"),
            gte(notificationLogs.createdAt, oneDayAgo),
            typeof recipientKey === "string"
              ? eq(notificationLogs.email, recipientKey)
              : eq(notificationLogs.userId, recipientKey)
          )
        );

      const currentDailyCount = Number(dailyCount?.count ?? 0);

      if (currentDailyCount >= config.maxPerDay) {
        return {
          allowed: false,
          reason: `Daily limit reached for ${type}`,
          currentCount: currentDailyCount,
          limit: config.maxPerDay,
          retryAfterMinutes: 60 * 24,
        };
      }
    }

    return { allowed: true };
  } catch (error) {
    console.error("Error checking throttle:", error);
    // On error, allow the notification (fail open for notifications)
    return { allowed: true };
  }
}

// ============================================================================
// RELEVANCE FILTERING
// ============================================================================

export interface RelevanceCheckResult {
  relevant: boolean;
  reason?: string;
  significantFields?: string[];
  score?: number;
}

/**
 * Check if a place update is significant enough to notify users
 *
 * @param updatedFields - List of fields that were updated
 * @param options - Additional options for relevance checking
 * @returns Whether the update is relevant enough to notify
 */
export function checkPlaceUpdateRelevance(
  updatedFields: string[],
  options?: {
    updateSummary?: string;
    forceNotify?: boolean;
  }
): RelevanceCheckResult {
  // Force notify bypasses relevance check
  if (options?.forceNotify) {
    return { relevant: true, reason: "Force notify enabled" };
  }

  // Filter to significant fields
  const significantFields = updatedFields.filter((field) =>
    SIGNIFICANT_PLACE_FIELDS.includes(field as typeof SIGNIFICANT_PLACE_FIELDS[number])
  );

  // If any significant fields changed, definitely notify
  if (significantFields.length > 0) {
    return {
      relevant: true,
      reason: "Significant fields changed",
      significantFields,
      score: 1.0,
    };
  }

  // Check minor fields
  const minorFields = updatedFields.filter((field) =>
    MINOR_PLACE_FIELDS.includes(field as typeof MINOR_PLACE_FIELDS[number])
  );

  // If enough minor fields changed, notify
  if (minorFields.length >= MIN_MINOR_CHANGES_FOR_NOTIFY) {
    return {
      relevant: true,
      reason: `${minorFields.length} minor fields changed`,
      significantFields: minorFields,
      score: 0.6,
    };
  }

  // If there's an explicit update summary, consider it relevant
  if (options?.updateSummary && options.updateSummary.trim().length > 10) {
    return {
      relevant: true,
      reason: "Custom update summary provided",
      score: 0.8,
    };
  }

  // Not relevant enough
  return {
    relevant: false,
    reason: `Only ${minorFields.length} minor fields changed (need ${MIN_MINOR_CHANGES_FOR_NOTIFY})`,
    score: minorFields.length / MIN_MINOR_CHANGES_FOR_NOTIFY,
  };
}

/**
 * Filter a list of updated fields to only return notification-worthy ones
 */
export function filterSignificantFields(fields: string[]): string[] {
  return fields.filter(
    (field) =>
      SIGNIFICANT_PLACE_FIELDS.includes(field as typeof SIGNIFICANT_PLACE_FIELDS[number]) ||
      MINOR_PLACE_FIELDS.includes(field as typeof MINOR_PLACE_FIELDS[number])
  );
}

// ============================================================================
// BUNDLING LOGIC
// ============================================================================

export interface BundleConfig {
  windowMinutes: number;       // Time window to bundle notifications
  maxBundleSize: number;       // Max notifications to bundle together
  types: NotificationType[];   // Types that can be bundled together
}

export const BUNDLE_RULES: Record<string, BundleConfig> = {
  // Bundle multiple review notifications into one
  reviews: {
    windowMinutes: 60,
    maxBundleSize: 10,
    types: ["REVIEW_NEW"],
  },
  // Bundle multiple lead notifications
  leads: {
    windowMinutes: 30,
    maxBundleSize: 5,
    types: ["LEAD_NEW"],
  },
  // Bundle favorite place updates
  favorites: {
    windowMinutes: 120, // 2 hours
    maxBundleSize: 5,
    types: ["FAVORITE_PLACE_UPDATE"],
  },
};

export interface PendingNotification {
  id: string;
  type: NotificationType;
  payload: AnyNotificationPayload;
  recipientKey: string | number;
  createdAt: Date;
  bundleKey?: string;
}

export interface BundleCheckResult {
  shouldBundle: boolean;
  bundleKey?: string;
  existingCount?: number;
  config?: BundleConfig;
}

/**
 * Check if a notification should be bundled with existing pending notifications
 *
 * Note: This requires a pending notification storage mechanism.
 * For now, we'll check recent logs to determine if bundling is appropriate.
 *
 * @param type - The notification type
 * @param recipientKey - Unique identifier for the recipient
 * @returns Bundle check result
 */
export async function checkBundle(
  type: NotificationType,
  recipientKey: string | number
): Promise<BundleCheckResult> {
  // Find which bundle config applies
  const bundleConfig = Object.entries(BUNDLE_RULES).find(([_, config]) =>
    config.types.includes(type)
  );

  if (!bundleConfig) {
    return { shouldBundle: false };
  }

  const [bundleKey, config] = bundleConfig;

  if (!db) {
    return { shouldBundle: false };
  }

  try {
    const windowStart = new Date(Date.now() - config.windowMinutes * 60 * 1000);

    // Count recent notifications of this type to this recipient
    const [recentCount] = await db
      .select({ count: sqlCount() })
      .from(notificationLogs)
      .where(
        and(
          eq(notificationLogs.type, type),
          eq(notificationLogs.status, "sent"),
          gte(notificationLogs.createdAt, windowStart),
          typeof recipientKey === "string"
            ? eq(notificationLogs.email, recipientKey)
            : eq(notificationLogs.userId, recipientKey)
        )
      );

    const existingCount = Number(recentCount?.count ?? 0);

    // If we've already sent notifications in this window, consider bundling
    if (existingCount > 0 && existingCount < config.maxBundleSize) {
      return {
        shouldBundle: true,
        bundleKey,
        existingCount,
        config,
      };
    }

    return { shouldBundle: false, bundleKey, existingCount, config };
  } catch (error) {
    console.error("Error checking bundle:", error);
    return { shouldBundle: false };
  }
}

// ============================================================================
// QUIET HOURS
// ============================================================================

export interface QuietHoursConfig {
  enabled: boolean;
  startHour: number;  // 0-23, in user's local timezone
  endHour: number;    // 0-23, in user's local timezone
  timezone?: string;  // e.g., "Europe/Amsterdam"
}

export const DEFAULT_QUIET_HOURS: QuietHoursConfig = {
  enabled: false,
  startHour: 22, // 10 PM
  endHour: 8,    // 8 AM
};

/**
 * Check if current time is within quiet hours
 *
 * @param config - Quiet hours configuration
 * @param now - Current time (defaults to now)
 * @returns Whether quiet hours are active
 */
export function isQuietHours(config: QuietHoursConfig, now?: Date): boolean {
  if (!config.enabled) return false;

  const currentTime = now || new Date();

  // Get hour in user's timezone
  let currentHour: number;
  if (config.timezone) {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: config.timezone,
      });
      currentHour = parseInt(formatter.format(currentTime), 10);
    } catch {
      // Invalid timezone, use local
      currentHour = currentTime.getHours();
    }
  } else {
    currentHour = currentTime.getHours();
  }

  const { startHour, endHour } = config;

  // Handle overnight quiet hours (e.g., 22:00 to 08:00)
  if (startHour > endHour) {
    return currentHour >= startHour || currentHour < endHour;
  }

  // Handle same-day quiet hours (e.g., 08:00 to 18:00)
  return currentHour >= startHour && currentHour < endHour;
}

/**
 * Get user's quiet hours configuration from their notification settings
 */
export async function getUserQuietHours(userId: number): Promise<QuietHoursConfig> {
  if (!db) return DEFAULT_QUIET_HOURS;

  try {
    const [settings] = await db
      .select({
        quietHoursEnabled: notificationSettings.quietHoursEnabled,
        quietHoursStart: notificationSettings.quietHoursStart,
        quietHoursEnd: notificationSettings.quietHoursEnd,
        timezone: notificationSettings.timezone,
      })
      .from(notificationSettings)
      .where(eq(notificationSettings.userId, userId))
      .limit(1);

    if (!settings) return DEFAULT_QUIET_HOURS;

    return {
      enabled: settings.quietHoursEnabled ?? false,
      startHour: settings.quietHoursStart ?? 22,
      endHour: settings.quietHoursEnd ?? 8,
      timezone: settings.timezone ?? undefined,
    };
  } catch {
    return DEFAULT_QUIET_HOURS;
  }
}

// ============================================================================
// MAIN DECISION FUNCTION
// ============================================================================

export interface SendDecision {
  shouldSend: boolean;
  reasons: string[];
  throttled?: ThrottleCheckResult;
  relevance?: RelevanceCheckResult;
  bundle?: BundleCheckResult;
  quietHours?: boolean;
}

/**
 * Main decision function for whether to send a notification
 *
 * Applies all rules: throttling, relevance, bundling, quiet hours
 *
 * @param payload - The notification payload
 * @param options - Additional options
 * @returns Decision with reasoning
 */
export async function shouldSendNotification(
  payload: AnyNotificationPayload,
  options?: {
    skipThrottle?: boolean;
    skipRelevance?: boolean;
    skipQuietHours?: boolean;
    forceNotify?: boolean;
  }
): Promise<SendDecision> {
  const reasons: string[] = [];
  const decision: SendDecision = {
    shouldSend: true,
    reasons,
  };

  // Force notify bypasses all rules
  if (options?.forceNotify) {
    reasons.push("Force notify enabled - bypassing all rules");
    return decision;
  }

  // Get recipient key
  const recipientKey = getRecipientKey(payload);

  // 1. Check throttle
  if (!options?.skipThrottle) {
    const throttleResult = await checkThrottle(payload.type, recipientKey);
    decision.throttled = throttleResult;

    if (!throttleResult.allowed) {
      decision.shouldSend = false;
      reasons.push(`Throttled: ${throttleResult.reason}`);
      return decision;
    }
    reasons.push("Throttle check passed");
  }

  // 2. Check relevance for place updates
  if (!options?.skipRelevance && payload.type === "FAVORITE_PLACE_UPDATE") {
    const relevanceResult = checkPlaceUpdateRelevance(payload.updatedFields, {
      updateSummary: payload.updateSummary,
    });
    decision.relevance = relevanceResult;

    if (!relevanceResult.relevant) {
      decision.shouldSend = false;
      reasons.push(`Not relevant: ${relevanceResult.reason}`);
      return decision;
    }
    reasons.push(`Relevant: ${relevanceResult.reason}`);
  }

  // 3. Check quiet hours
  if (!options?.skipQuietHours && "userId" in payload && payload.userId) {
    const quietHoursConfig = await getUserQuietHours(payload.userId);
    decision.quietHours = isQuietHours(quietHoursConfig);

    if (decision.quietHours) {
      // For quiet hours, we might want to queue instead of skip
      // For now, we'll note it but still allow important notifications
      const isImportant = ["CLAIM_APPROVED", "CLAIM_REJECTED"].includes(payload.type);

      if (!isImportant) {
        decision.shouldSend = false;
        reasons.push("Quiet hours active - notification deferred");
        return decision;
      }
      reasons.push("Quiet hours active but notification is important - sending anyway");
    } else {
      reasons.push("Quiet hours not active");
    }
  }

  // 4. Check bundling (for informational purposes)
  const bundleResult = await checkBundle(payload.type, recipientKey);
  decision.bundle = bundleResult;

  if (bundleResult.shouldBundle) {
    reasons.push(
      `Could bundle with ${bundleResult.existingCount} existing ${bundleResult.bundleKey} notifications`
    );
  }

  reasons.push("All checks passed - notification approved");
  return decision;
}

/**
 * Extract recipient key from payload for throttle/bundle checks
 */
function getRecipientKey(payload: AnyNotificationPayload): string | number {
  switch (payload.type) {
    case "REVIEW_NEW":
    case "LEAD_NEW":
      return payload.businessEmail;
    case "REVIEW_REPLY":
    case "CLAIM_APPROVED":
    case "CLAIM_REJECTED":
    case "DIGEST_WEEKLY":
    case "FAVORITE_PLACE_UPDATE":
      return payload.userId;
    default:
      // Fallback to email if available
      if ("userEmail" in payload) return (payload as { userEmail: string }).userEmail;
      if ("businessEmail" in payload) return (payload as { businessEmail: string }).businessEmail;
      return "unknown";
  }
}

