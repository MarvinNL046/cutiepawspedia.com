/**
 * Trust Badges Computation Engine
 *
 * Computes and updates trust badges for places based on:
 * - Rating and review counts
 * - Photo verification status
 * - Business verification status
 * - Premium status
 */

import { db } from "@/db";
import { eq, sql, and, gte } from "drizzle-orm";
import { places, reviews, reviewPhotos } from "@/db/schema/directory";
import { TRUST_BADGE_CONFIG, type TrustBadgeType } from "./config";

// ============================================================================
// TYPES
// ============================================================================

export interface PlaceBadgeStatus {
  placeId: number;
  badges: TrustBadgeType[];
  isTopRated: boolean;
  isCommunityFavorite: boolean;
  hasPhotos: boolean;
  isVerified: boolean;
  isPremium: boolean;
}

// ============================================================================
// SINGLE PLACE COMPUTATION
// ============================================================================

/**
 * Compute badges for a single place
 */
export async function computeBadgesForPlace(placeId: number): Promise<PlaceBadgeStatus> {
  // Get place with current stats
  const [place] = await db
    .select({
      id: places.id,
      avgRating: places.avgRating,
      reviewCount: places.reviewCount,
      isVerified: places.isVerified,
      isPremium: places.isPremium,
      hasPhotos: places.hasPhotos,
    })
    .from(places)
    .where(eq(places.id, placeId))
    .limit(1);

  if (!place) {
    throw new Error(`Place not found: ${placeId}`);
  }

  const avgRating = parseFloat(place.avgRating?.toString() || "0");
  const reviewCount = place.reviewCount || 0;

  // Compute Top Rated
  const isTopRated =
    avgRating >= TRUST_BADGE_CONFIG.topRated.minRating &&
    reviewCount >= TRUST_BADGE_CONFIG.topRated.minReviews;

  // Compute Community Favorite
  const isCommunityFavorite =
    reviewCount >= TRUST_BADGE_CONFIG.communityFavorite.minReviews &&
    avgRating >= TRUST_BADGE_CONFIG.communityFavorite.minRating;

  // Check for approved photos
  const [photoCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(reviewPhotos)
    .where(
      and(
        eq(reviewPhotos.placeId, placeId),
        eq(reviewPhotos.status, "approved")
      )
    );

  const hasPhotos = (photoCount?.count || 0) > 0;

  // Collect badges
  const badges: TrustBadgeType[] = [];

  if (place.isVerified) badges.push("verified");
  if (isTopRated) badges.push("top_rated");
  if (isCommunityFavorite) badges.push("community_favorite");
  if (hasPhotos) badges.push("photo_verified");
  if (place.isPremium) badges.push("premium");

  return {
    placeId,
    badges,
    isTopRated,
    isCommunityFavorite,
    hasPhotos,
    isVerified: place.isVerified,
    isPremium: place.isPremium,
  };
}

/**
 * Update badge flags in the database for a single place
 */
export async function updateBadgesForPlace(placeId: number): Promise<PlaceBadgeStatus> {
  const badgeStatus = await computeBadgesForPlace(placeId);

  await db
    .update(places)
    .set({
      isTopRated: badgeStatus.isTopRated,
      isCommunityFavorite: badgeStatus.isCommunityFavorite,
      hasPhotos: badgeStatus.hasPhotos,
      updatedAt: new Date(),
    })
    .where(eq(places.id, placeId));

  return badgeStatus;
}

// ============================================================================
// BATCH COMPUTATION
// ============================================================================

/**
 * Recompute badges for all places
 * Should be run periodically (e.g., daily cron job)
 */
export async function recomputeAllBadges(): Promise<{
  processed: number;
  updated: number;
}> {
  // Get all places
  const allPlaces = await db
    .select({ id: places.id })
    .from(places);

  let processed = 0;
  let updated = 0;

  for (const place of allPlaces) {
    try {
      const [current] = await db
        .select({
          isTopRated: places.isTopRated,
          isCommunityFavorite: places.isCommunityFavorite,
          hasPhotos: places.hasPhotos,
        })
        .from(places)
        .where(eq(places.id, place.id))
        .limit(1);

      const newStatus = await computeBadgesForPlace(place.id);

      // Only update if something changed
      if (
        current?.isTopRated !== newStatus.isTopRated ||
        current?.isCommunityFavorite !== newStatus.isCommunityFavorite ||
        current?.hasPhotos !== newStatus.hasPhotos
      ) {
        await db
          .update(places)
          .set({
            isTopRated: newStatus.isTopRated,
            isCommunityFavorite: newStatus.isCommunityFavorite,
            hasPhotos: newStatus.hasPhotos,
            updatedAt: new Date(),
          })
          .where(eq(places.id, place.id));

        updated++;
      }

      processed++;
    } catch (error) {
      console.error(`Failed to compute badges for place ${place.id}:`, error);
    }
  }

  return { processed, updated };
}

/**
 * Recompute badges for places with recent activity
 * More efficient than full recompute for frequent runs
 */
export async function recomputeRecentBadges(
  hours = 24
): Promise<{ processed: number; updated: number }> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  // Get places with recent reviews
  const placesWithRecentReviews = await db
    .selectDistinct({ id: places.id })
    .from(places)
    .innerJoin(reviews, eq(reviews.placeId, places.id))
    .where(gte(reviews.createdAt, since));

  // Get places with recent photos
  const placesWithRecentPhotos = await db
    .selectDistinct({ id: places.id })
    .from(places)
    .innerJoin(reviewPhotos, eq(reviewPhotos.placeId, places.id))
    .where(gte(reviewPhotos.createdAt, since));

  // Combine unique place IDs
  const uniquePlaceIds = new Set([
    ...placesWithRecentReviews.map((p) => p.id),
    ...placesWithRecentPhotos.map((p) => p.id),
  ]);

  let processed = 0;
  let updated = 0;

  for (const placeId of uniquePlaceIds) {
    try {
      await updateBadgesForPlace(placeId);
      processed++;
      updated++; // Simplified - assume all recomputes result in updates
    } catch (error) {
      console.error(`Failed to compute badges for place ${placeId}:`, error);
    }
  }

  return { processed, updated };
}
