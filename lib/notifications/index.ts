/**
 * Notification Module
 *
 * Central export point for the notification system.
 * Part of P2: Email Notifications & Digests
 * Extended in N2: Notifications v2 - Smart Logic, Pro Copy, Digests & Advanced Settings
 */

// Types
export * from "./types";

// Layout system (v2)
export {
  buildBaseLayout,
  buildPlainTextLayout,
  buildButton,
  buildCard,
  buildStatsRow,
  buildStarRating,
  buildHeading,
  buildParagraph,
  buildList,
  buildDivider,
  BRAND,
  STYLES,
} from "./layout";

// Templates (if needed directly)
export {
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

// Main send function
export { sendNotification, sendNotifications } from "./sendNotification";
export type { SendNotificationOptions } from "./sendNotification";

// Smart rules engine (N2)
export {
  shouldSendNotification,
  checkThrottle,
  checkPlaceUpdateRelevance,
  checkBundle,
  isQuietHours,
  getUserQuietHours,
  filterSignificantFields,
  THROTTLE_RULES,
  BUNDLE_RULES,
  SIGNIFICANT_PLACE_FIELDS,
  MINOR_PLACE_FIELDS,
} from "./rules";
export type {
  ThrottleConfig,
  ThrottleCheckResult,
  RelevanceCheckResult,
  BundleConfig,
  BundleCheckResult,
  QuietHoursConfig,
  SendDecision,
} from "./rules";

// Helper functions
export { notifyFavoritePlaceUpdate, filterRelevantFields } from "./favoritePlaceNotifier";
