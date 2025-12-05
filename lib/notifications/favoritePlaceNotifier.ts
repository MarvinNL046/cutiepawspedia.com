/**
 * Favorite Place Update Notifier
 *
 * Helper to notify all users who favorited a place when it gets updated.
 * Part of P2: Email Notifications & Digests
 */

import { sendNotification } from "./sendNotification";
import { getFavoriteUsersForPlace } from "@/db/queries/favorites";
import type { NotificationResult } from "./types";

export interface PlaceUpdateInfo {
  placeId: number;
  placeName: string;
  placeSlug: string;
  updatedFields: string[];
  updateSummary?: string;
  placeUrl?: string;
}

export interface NotifyFavoritePlaceUpdateResult {
  totalUsers: number;
  sent: number;
  skipped: number;
  failed: number;
  results: Array<{
    userId: number;
    success: boolean;
    error?: string;
  }>;
}

/**
 * Notify all users who favorited a place about an update
 *
 * This function:
 * 1. Gets all users who have favorited the place
 * 2. Sends FAVORITE_PLACE_UPDATE notification to each user
 * 3. Respects user notification preferences (handled by sendNotification)
 * 4. Returns summary of notifications sent
 *
 * @param info - Information about the place and what was updated
 * @returns Summary of notifications sent
 */
export async function notifyFavoritePlaceUpdate(
  info: PlaceUpdateInfo
): Promise<NotifyFavoritePlaceUpdateResult> {
  const { placeId, placeName, placeSlug, updatedFields, updateSummary, placeUrl } = info;

  // Skip if no meaningful updates
  if (!updatedFields || updatedFields.length === 0) {
    return {
      totalUsers: 0,
      sent: 0,
      skipped: 0,
      failed: 0,
      results: [],
    };
  }

  // Get all users who favorited this place
  const users = await getFavoriteUsersForPlace(placeId);

  if (users.length === 0) {
    return {
      totalUsers: 0,
      sent: 0,
      skipped: 0,
      failed: 0,
      results: [],
    };
  }

  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const finalPlaceUrl = placeUrl || `${baseUrl}/place/${placeSlug}`;

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  const results: NotifyFavoritePlaceUpdateResult["results"] = [];

  // Send notifications to each user
  for (const user of users) {
    try {
      const result = await sendNotification({
        type: "FAVORITE_PLACE_UPDATE",
        placeId,
        placeName,
        placeSlug,
        userId: user.userId,
        userEmail: user.userEmail,
        userName: user.userName || undefined,
        updatedFields,
        updateSummary,
        placeUrl: finalPlaceUrl,
      });

      if (result.success) {
        sent++;
        results.push({ userId: user.userId, success: true });
      } else if (result.error?.includes("disabled")) {
        // User has notifications disabled - this is not an error
        skipped++;
        results.push({ userId: user.userId, success: true });
      } else {
        failed++;
        results.push({
          userId: user.userId,
          success: false,
          error: result.error,
        });
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      failed++;
      results.push({
        userId: user.userId,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  console.log(
    `notifyFavoritePlaceUpdate: place=${placeId} (${placeName}), ` +
    `users=${users.length}, sent=${sent}, skipped=${skipped}, failed=${failed}`
  );

  return {
    totalUsers: users.length,
    sent,
    skipped,
    failed,
    results,
  };
}

/**
 * Filter updated fields to only include user-relevant changes
 * Some fields like dataQualityFlags aren't relevant for users
 */
export function filterRelevantFields(updatedFields: string[]): string[] {
  const relevantFields = [
    "openingHours",
    "phone",
    "email",
    "website",
    "description",
    "address",
    "avgRating",
    "status",
    "name",
  ];

  return updatedFields.filter((field) => relevantFields.includes(field));
}
