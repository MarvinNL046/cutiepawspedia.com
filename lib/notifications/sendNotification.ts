/**
 * Send Notification
 *
 * Central notification dispatcher that:
 * 1. Resolves recipients from payloads
 * 2. Applies smart rules (throttling, relevance, quiet hours)
 * 3. Checks notification settings
 * 4. Builds emails using templates
 * 5. Sends via Resend
 * 6. Logs all attempts
 *
 * Part of P2: Email Notifications & Digests
 * Extended in N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

import { sendEmail } from "@/lib/email/resend";
import {
  isNotificationEnabled,
  getNotificationLocale,
  logNotification,
} from "@/db/queries/notifications";
import {
  buildReviewNewEmail,
  buildReviewReplyEmail,
  buildLeadNewEmail,
  buildClaimApprovedEmail,
  buildClaimRejectedEmail,
  buildDigestWeeklyEmail,
  buildFavoritePlaceUpdateEmail,
  buildDigestUserEmail,
  buildDigestAdminEmail,
} from "./templates";
import { shouldSendNotification, type SendDecision } from "./rules";
import type {
  AnyNotificationPayload,
  NotificationResult,
  NOTIFICATION_TYPE_TO_SETTING,
} from "./types";

// Default sender addresses
const FROM_ADDRESSES = {
  reviews: "CutiePawsPedia Reviews <reviews@cutiepawspedia.com>",
  leads: "CutiePawsPedia <leads@cutiepawspedia.com>",
  claims: "CutiePawsPedia <claims@cutiepawspedia.com>",
  digest: "CutiePawsPedia <digest@cutiepawspedia.com>",
  favorites: "CutiePawsPedia Updates <updates@cutiepawspedia.com>",
  default: "CutiePawsPedia <noreply@cutiepawspedia.com>",
};

/**
 * Get the appropriate "from" address for a notification type
 */
function getFromAddress(type: string): string {
  if (type.startsWith("REVIEW_")) return FROM_ADDRESSES.reviews;
  if (type.startsWith("LEAD_")) return FROM_ADDRESSES.leads;
  if (type.startsWith("CLAIM_")) return FROM_ADDRESSES.claims;
  if (type.startsWith("DIGEST_")) return FROM_ADDRESSES.digest;
  if (type.startsWith("FAVORITE_")) return FROM_ADDRESSES.favorites;
  return FROM_ADDRESSES.default;
}

/**
 * Get the setting category for a notification type
 */
function getSettingCategory(
  type: string
): "reviews" | "leads" | "business" | "digest" | "favorites" | "general" {
  if (type === "REVIEW_NEW" || type === "REVIEW_REPLY") return "reviews";
  if (type === "LEAD_NEW") return "leads";
  if (type === "CLAIM_APPROVED" || type === "CLAIM_REJECTED") return "business";
  if (type === "DIGEST_WEEKLY" || type === "DIGEST_USER") return "digest";
  if (type === "DIGEST_ADMIN") return "general"; // Admin digests always sent
  if (type === "FAVORITE_PLACE_UPDATE") return "favorites";
  return "general";
}

/**
 * Options for sending notifications
 */
export interface SendNotificationOptions {
  skipThrottle?: boolean;     // Skip throttle check
  skipRelevance?: boolean;    // Skip relevance check
  skipQuietHours?: boolean;   // Skip quiet hours check
  forceNotify?: boolean;      // Force send (bypass all rules)
}

/**
 * Main notification dispatcher
 *
 * @param payload - The notification payload with all required data
 * @param options - Optional configuration to bypass certain rules
 * @returns Result indicating success/failure
 */
export async function sendNotification(
  payload: AnyNotificationPayload,
  options?: SendNotificationOptions
): Promise<NotificationResult> {
  try {
    // Extract common data
    const { type, locale: payloadLocale } = payload;

    // Apply smart rules (throttling, relevance, quiet hours)
    if (!options?.forceNotify) {
      const decision = await shouldSendNotification(payload, {
        skipThrottle: options?.skipThrottle,
        skipRelevance: options?.skipRelevance,
        skipQuietHours: options?.skipQuietHours,
      });

      if (!decision.shouldSend) {
        console.log(
          `Notification ${type} blocked by smart rules:`,
          decision.reasons.join(", ")
        );
        return {
          success: true, // Not an error, just skipped by rules
          error: `Blocked: ${decision.reasons[decision.reasons.length - 1]}`,
        };
      }

      // Log the decision reasoning for debugging
      console.log(`Notification ${type} approved:`, decision.reasons.join(", "));
    }

    // Determine recipient info based on payload type
    let recipientEmail: string;
    let recipientUserId: number | undefined;
    let recipientBusinessId: number | undefined;
    let settingCategory: "reviews" | "leads" | "business" | "digest" | "favorites" | "general";

    switch (type) {
      case "REVIEW_NEW":
        recipientEmail = payload.businessEmail;
        recipientBusinessId = payload.businessId;
        settingCategory = "reviews";
        break;

      case "REVIEW_REPLY":
        recipientEmail = payload.userEmail;
        recipientUserId = payload.userId;
        settingCategory = "reviews";
        break;

      case "LEAD_NEW":
        recipientEmail = payload.businessEmail;
        recipientBusinessId = payload.businessId;
        settingCategory = "leads";
        break;

      case "CLAIM_APPROVED":
      case "CLAIM_REJECTED":
        recipientEmail = payload.userEmail;
        recipientUserId = payload.userId;
        settingCategory = "business";
        break;

      case "DIGEST_WEEKLY":
        recipientEmail = payload.userEmail;
        recipientUserId = payload.userId;
        recipientBusinessId = payload.businessId;
        settingCategory = "digest";
        break;

      case "FAVORITE_PLACE_UPDATE":
        recipientEmail = payload.userEmail;
        recipientUserId = payload.userId;
        settingCategory = "favorites";
        break;

      case "DIGEST_USER":
        recipientEmail = payload.userEmail;
        recipientUserId = payload.userId;
        settingCategory = "digest";
        break;

      case "DIGEST_ADMIN":
        recipientEmail = payload.adminEmail;
        settingCategory = "general"; // Admin digests always sent
        break;

      default:
        console.error(`Unknown notification type: ${type}`);
        return { success: false, error: `Unknown notification type: ${type}` };
    }

    // Check if user has this notification type enabled
    if (recipientUserId) {
      const isEnabled = await isNotificationEnabled(recipientUserId, settingCategory);
      if (!isEnabled) {
        console.log(
          `Notification ${type} skipped for user ${recipientUserId}: ${settingCategory} notifications disabled`
        );
        return { success: true }; // Not an error, just skipped
      }
    }

    // Get locale preference
    const locale = payloadLocale || (recipientUserId ? await getNotificationLocale(recipientUserId) : "en");

    // Build the email based on type
    let email: { subject: string; text: string; html: string };

    switch (type) {
      case "REVIEW_NEW":
        email = buildReviewNewEmail({
          locale,
          placeName: payload.placeName,
          reviewerName: payload.reviewerName,
          rating: payload.rating,
          reviewSnippet: payload.reviewSnippet,
          dashboardUrl: payload.dashboardUrl,
        });
        break;

      case "REVIEW_REPLY":
        email = buildReviewReplyEmail({
          locale,
          placeName: payload.placeName,
          businessName: payload.businessName,
          replySnippet: payload.replySnippet,
          reviewUrl: payload.reviewUrl,
        });
        break;

      case "LEAD_NEW":
        email = buildLeadNewEmail({
          locale,
          placeName: payload.placeName,
          leadName: payload.leadName,
          leadEmail: payload.leadEmail,
          leadPhone: payload.leadPhone,
          leadMessage: payload.leadMessage,
          dashboardUrl: payload.dashboardUrl,
        });
        break;

      case "CLAIM_APPROVED":
        email = buildClaimApprovedEmail({
          locale,
          placeName: payload.placeName,
          userName: payload.userName,
          dashboardUrl: payload.dashboardUrl,
        });
        break;

      case "CLAIM_REJECTED":
        email = buildClaimRejectedEmail({
          locale,
          placeName: payload.placeName,
          userName: payload.userName,
          reason: payload.reason,
        });
        break;

      case "DIGEST_WEEKLY":
        email = buildDigestWeeklyEmail({
          locale,
          businessName: payload.businessName,
          userName: payload.userName,
          newLeadsCount: payload.newLeadsCount,
          newReviewsCount: payload.newReviewsCount,
          averageRating: payload.averageRating,
          dashboardUrl: payload.dashboardUrl,
        });
        break;

      case "FAVORITE_PLACE_UPDATE":
        email = buildFavoritePlaceUpdateEmail({
          locale,
          placeName: payload.placeName,
          placeSlug: payload.placeSlug,
          updatedFields: payload.updatedFields,
          updateSummary: payload.updateSummary,
          placeUrl: payload.placeUrl,
        });
        break;

      case "DIGEST_USER":
        email = buildDigestUserEmail({
          locale,
          userName: payload.userName,
          favoritesCount: payload.favoritesCount,
          updatedFavoritesCount: payload.updatedFavoritesCount,
          updatedFavorites: payload.updatedFavorites,
          userReviewCount: payload.userReviewCount,
          userHelpfulVotes: payload.userHelpfulVotes,
          suggestedPlaces: payload.suggestedPlaces,
          preferencesUrl: payload.preferencesUrl,
        });
        break;

      case "DIGEST_ADMIN":
        email = buildDigestAdminEmail({
          locale,
          adminName: payload.adminName,
          periodStart: payload.periodStart,
          periodEnd: payload.periodEnd,
          stats: payload.stats,
          alerts: payload.alerts,
          dashboardUrl: payload.dashboardUrl,
        });
        break;

      default:
        return { success: false, error: `No template for type: ${type}` };
    }

    // Build metadata for logging
    const metadata = buildMetadata(payload);

    // Send the email
    const result = await sendEmail({
      from: getFromAddress(type),
      to: recipientEmail,
      subject: email.subject,
      html: email.html,
    });

    // Log the result
    const log = await logNotification({
      userId: recipientUserId ?? null,
      businessId: recipientBusinessId ?? null,
      type,
      email: recipientEmail,
      status: result.success ? "sent" : "failed",
      error: result.success ? null : result.error,
      metadata,
    });

    if (!result.success) {
      console.error(`Failed to send ${type} notification to ${recipientEmail}:`, result.error);
      return { success: false, error: result.error, logId: log?.id };
    }

    console.log(`Sent ${type} notification to ${recipientEmail}`);
    return { success: true, logId: log?.id };
  } catch (error) {
    console.error("sendNotification error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Build metadata object for logging based on payload type
 */
function buildMetadata(payload: AnyNotificationPayload): Record<string, unknown> {
  const base: Record<string, unknown> = { type: payload.type };

  switch (payload.type) {
    case "REVIEW_NEW":
      return {
        ...base,
        reviewId: payload.reviewId,
        placeId: payload.placeId,
        rating: payload.rating,
      };

    case "REVIEW_REPLY":
      return {
        ...base,
        reviewId: payload.reviewId,
        replyId: payload.replyId,
        placeId: payload.placeId,
      };

    case "LEAD_NEW":
      return {
        ...base,
        leadId: payload.leadId,
        placeId: payload.placeId,
      };

    case "CLAIM_APPROVED":
    case "CLAIM_REJECTED":
      return {
        ...base,
        claimId: payload.claimId,
        placeId: payload.placeId,
      };

    case "DIGEST_WEEKLY":
      return {
        ...base,
        businessId: payload.businessId,
        newLeadsCount: payload.newLeadsCount,
        newReviewsCount: payload.newReviewsCount,
      };

    case "FAVORITE_PLACE_UPDATE":
      return {
        ...base,
        placeId: payload.placeId,
        updatedFields: payload.updatedFields,
      };

    case "DIGEST_USER":
      return {
        ...base,
        userId: payload.userId,
        favoritesCount: payload.favoritesCount,
        updatedFavoritesCount: payload.updatedFavoritesCount,
      };

    case "DIGEST_ADMIN":
      return {
        ...base,
        periodStart: payload.periodStart,
        periodEnd: payload.periodEnd,
        newPlaces: payload.stats.newPlaces,
        newReviews: payload.stats.newReviews,
        pendingClaims: payload.stats.pendingClaims,
      };

    default:
      return base;
  }
}

/**
 * Convenience function to send multiple notifications
 * Useful for batch operations like digest sending
 */
export async function sendNotifications(
  payloads: AnyNotificationPayload[]
): Promise<NotificationResult[]> {
  const results: NotificationResult[] = [];

  for (const payload of payloads) {
    const result = await sendNotification(payload);
    results.push(result);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}
