/**
 * Notification Types
 *
 * Type definitions for the notification system.
 * Part of P2: Email Notifications & Digests
 * Extended in N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

// ============================================================================
// LOCALES
// ============================================================================

export type Locale = "en" | "nl" | "de";

export const SUPPORTED_LOCALES: Locale[] = ["en", "nl", "de"];

export const DEFAULT_LOCALE: Locale = "en";

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export type NotificationType =
  | "USER_WELCOME" // Welcome email for new user registration
  | "REVIEW_NEW" // New review on a business's place
  | "REVIEW_REPLY" // Business replied to user's review
  | "LEAD_NEW" // New lead for a business
  | "CLAIM_APPROVED" // User's claim was approved
  | "CLAIM_REJECTED" // User's claim was rejected
  | "DIGEST_WEEKLY" // Weekly summary for business owners
  | "DIGEST_USER" // Weekly summary for users (favorites, updates)
  | "DIGEST_ADMIN" // Admin stats digest
  | "FAVORITE_PLACE_UPDATE"; // Update to a place user has favorited

// Map notification types to setting categories
export const NOTIFICATION_TYPE_TO_SETTING: Record<
  NotificationType,
  "reviews" | "leads" | "business" | "digest" | "favorites" | "general"
> = {
  USER_WELCOME: "general", // Welcome emails always sent
  REVIEW_NEW: "reviews",
  REVIEW_REPLY: "reviews",
  LEAD_NEW: "leads",
  CLAIM_APPROVED: "business",
  CLAIM_REJECTED: "business",
  DIGEST_WEEKLY: "digest",
  DIGEST_USER: "digest",
  DIGEST_ADMIN: "general", // Admin digests always sent
  FAVORITE_PLACE_UPDATE: "favorites",
};

// ============================================================================
// NOTIFICATION PAYLOADS
// ============================================================================

export interface BaseNotificationPayload {
  type: NotificationType;
  locale?: string;
}

/**
 * Welcome notification payload
 * Sent to new users after registration
 */
export interface UserWelcomePayload extends BaseNotificationPayload {
  type: "USER_WELCOME";
  userId: number;
  userEmail: string;
  userName?: string;
}

/**
 * New review notification payload
 * Sent to business owner when someone reviews their place
 */
export interface ReviewNewPayload extends BaseNotificationPayload {
  type: "REVIEW_NEW";
  reviewId: number;
  placeId: number;
  placeName: string;
  reviewerName: string;
  rating: number;
  reviewSnippet: string; // First ~100 chars of review
  businessEmail: string;
  businessId?: number;
  dashboardUrl?: string;
}

/**
 * Review reply notification payload
 * Sent to user when business replies to their review
 */
export interface ReviewReplyPayload extends BaseNotificationPayload {
  type: "REVIEW_REPLY";
  reviewId: number;
  replyId: number;
  placeId: number;
  placeName: string;
  businessName: string;
  replySnippet: string;
  userId: number;
  userEmail: string;
  reviewUrl?: string;
}

/**
 * New lead notification payload
 * Sent to business owner when someone submits a lead
 */
export interface LeadNewPayload extends BaseNotificationPayload {
  type: "LEAD_NEW";
  leadId: number;
  placeId: number;
  placeName: string;
  businessEmail: string;
  businessId?: number;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadMessage?: string;
  dashboardUrl?: string;
  /** @deprecated Pay-per-lead disabled - all leads show full contact details */
  isPaid?: boolean;
  /** @deprecated Pay-per-lead disabled - no longer used */
  creditsUrl?: string;
}

/**
 * Claim approved notification payload
 * Sent to user when their claim is approved
 */
export interface ClaimApprovedPayload extends BaseNotificationPayload {
  type: "CLAIM_APPROVED";
  claimId: number;
  placeId: number;
  placeName: string;
  userId: number;
  userEmail: string;
  userName?: string;
  dashboardUrl?: string;
}

/**
 * Claim rejected notification payload
 * Sent to user when their claim is rejected
 */
export interface ClaimRejectedPayload extends BaseNotificationPayload {
  type: "CLAIM_REJECTED";
  claimId: number;
  placeId: number;
  placeName: string;
  userId: number;
  userEmail: string;
  userName?: string;
  reason?: string;
}

/**
 * Weekly digest notification payload
 * Sent to business owners with weekly summary
 */
export interface DigestWeeklyPayload extends BaseNotificationPayload {
  type: "DIGEST_WEEKLY";
  userId: number;
  userEmail: string;
  userName?: string;
  businessId: number;
  businessName: string;
  // Stats for the week
  newLeadsCount: number;
  newReviewsCount: number;
  averageRating?: number;
  totalLeadsValue?: number; // In cents
  // Optional details
  topPlaces?: Array<{
    name: string;
    newLeads: number;
    newReviews: number;
  }>;
  dashboardUrl?: string;
}

/**
 * Favorite place update notification payload
 * Sent to users when a place they've favorited gets updated
 */
export interface FavoritePlaceUpdatePayload extends BaseNotificationPayload {
  type: "FAVORITE_PLACE_UPDATE";
  placeId: number;
  placeName: string;
  placeSlug: string;
  userId: number;
  userEmail: string;
  userName?: string;
  // What changed
  updatedFields: string[];
  updateSummary?: string; // Human-readable summary of changes
  placeUrl?: string;
}

/**
 * User digest notification payload (N2)
 * Weekly summary for regular users with their favorites activity
 */
export interface DigestUserPayload extends BaseNotificationPayload {
  type: "DIGEST_USER";
  userId: number;
  userEmail: string;
  userName?: string;
  // Favorites summary
  favoritesCount: number;
  updatedFavoritesCount: number;
  // Activity on favorites
  updatedFavorites?: Array<{
    placeId: number;
    placeName: string;
    placeSlug: string;
    updatedFields: string[];
    newReviews?: number;
    newRating?: number;
  }>;
  // User's own reviews
  userReviewCount?: number;
  userHelpfulVotes?: number;
  // Suggested places
  suggestedPlaces?: Array<{
    placeId: number;
    placeName: string;
    placeSlug: string;
    categoryName: string;
    avgRating?: number;
  }>;
  preferencesUrl?: string;
}

/**
 * Admin digest notification payload (N2)
 * System stats digest for admins
 */
export interface DigestAdminPayload extends BaseNotificationPayload {
  type: "DIGEST_ADMIN";
  adminEmail: string;
  adminName?: string;
  // Date range
  periodStart: string; // ISO date
  periodEnd: string;   // ISO date
  // Core metrics
  stats: {
    newPlaces: number;
    newReviews: number;
    newLeads: number;
    newUsers: number;
    newBusinesses: number;
    newClaims: number;
    pendingClaims: number;
    // Optional detailed metrics
    placesEnriched?: number;
    emailsSent?: number;
    errorCount?: number;
    topCategories?: Array<{ name: string; count: number }>;
    topCities?: Array<{ name: string; count: number }>;
  };
  // Alerts/Issues
  alerts?: Array<{
    type: "warning" | "error" | "info";
    message: string;
    count?: number;
  }>;
  dashboardUrl?: string;
}

// Union type of all payloads
export type AnyNotificationPayload =
  | UserWelcomePayload
  | ReviewNewPayload
  | ReviewReplyPayload
  | LeadNewPayload
  | ClaimApprovedPayload
  | ClaimRejectedPayload
  | DigestWeeklyPayload
  | DigestUserPayload
  | DigestAdminPayload
  | FavoritePlaceUpdatePayload;

// ============================================================================
// EMAIL RESULT TYPE
// ============================================================================

export interface EmailBuildResult {
  subject: string;
  text: string;
  html: string;
}

export interface NotificationResult {
  success: boolean;
  error?: string;
  logId?: number;
}
