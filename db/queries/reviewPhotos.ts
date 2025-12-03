/**
 * Review Photos Database Queries
 *
 * CRUD operations for review photos with moderation support.
 */

import { db } from "@/db";
import { eq, and, inArray, desc } from "drizzle-orm";
import { reviewPhotos, places } from "@/db/schema/directory";

// ============================================================================
// TYPES
// ============================================================================

export type ReviewPhoto = typeof reviewPhotos.$inferSelect;
export type NewReviewPhoto = typeof reviewPhotos.$inferInsert;
export type ReviewPhotoStatus = "pending" | "approved" | "rejected" | "flagged";

// ============================================================================
// CREATE
// ============================================================================

/**
 * Create a new review photo record
 */
export async function createReviewPhoto(
  data: Omit<NewReviewPhoto, "id" | "createdAt" | "updatedAt">
): Promise<ReviewPhoto> {
  const [photo] = await db
    .insert(reviewPhotos)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return photo;
}

/**
 * Create multiple review photos at once
 */
export async function createReviewPhotos(
  data: Omit<NewReviewPhoto, "id" | "createdAt" | "updatedAt">[]
): Promise<ReviewPhoto[]> {
  if (data.length === 0) return [];

  const photos = await db
    .insert(reviewPhotos)
    .values(
      data.map((photo) => ({
        ...photo,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )
    .returning();

  return photos;
}

// ============================================================================
// READ
// ============================================================================

/**
 * Get a review photo by ID
 */
export async function getReviewPhotoById(id: number): Promise<ReviewPhoto | null> {
  const [photo] = await db
    .select()
    .from(reviewPhotos)
    .where(eq(reviewPhotos.id, id))
    .limit(1);

  return photo || null;
}

/**
 * Get all photos for a review
 */
export async function getReviewPhotosByReviewId(reviewId: number): Promise<ReviewPhoto[]> {
  return db
    .select()
    .from(reviewPhotos)
    .where(eq(reviewPhotos.reviewId, reviewId))
    .orderBy(reviewPhotos.createdAt);
}

/**
 * Get approved photos for a review
 */
export async function getApprovedPhotosByReviewId(reviewId: number): Promise<ReviewPhoto[]> {
  return db
    .select()
    .from(reviewPhotos)
    .where(
      and(
        eq(reviewPhotos.reviewId, reviewId),
        eq(reviewPhotos.status, "approved")
      )
    )
    .orderBy(reviewPhotos.createdAt);
}

/**
 * Get all approved photos for a place (for the community photos strip)
 */
export async function getApprovedPhotosByPlaceId(
  placeId: number,
  limit = 20
): Promise<ReviewPhoto[]> {
  return db
    .select()
    .from(reviewPhotos)
    .where(
      and(
        eq(reviewPhotos.placeId, placeId),
        eq(reviewPhotos.status, "approved")
      )
    )
    .orderBy(desc(reviewPhotos.createdAt))
    .limit(limit);
}

/**
 * Get photos pending moderation
 */
export async function getPendingPhotos(limit = 50): Promise<ReviewPhoto[]> {
  return db
    .select()
    .from(reviewPhotos)
    .where(eq(reviewPhotos.status, "pending"))
    .orderBy(reviewPhotos.createdAt)
    .limit(limit);
}

/**
 * Get photo count by status for a place
 */
export async function getPhotoCountsByPlaceId(placeId: number): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  flagged: number;
}> {
  const photos = await db
    .select({ status: reviewPhotos.status })
    .from(reviewPhotos)
    .where(eq(reviewPhotos.placeId, placeId));

  return {
    pending: photos.filter((p) => p.status === "pending").length,
    approved: photos.filter((p) => p.status === "approved").length,
    rejected: photos.filter((p) => p.status === "rejected").length,
    flagged: photos.filter((p) => p.status === "flagged").length,
  };
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Update review photo status (for moderation)
 */
export async function updateReviewPhotoStatus(
  id: number,
  status: ReviewPhotoStatus
): Promise<ReviewPhoto | null> {
  const [photo] = await db
    .update(reviewPhotos)
    .set({ status, updatedAt: new Date() })
    .where(eq(reviewPhotos.id, id))
    .returning();

  // If photo was approved, update place.hasPhotos flag
  if (photo && status === "approved") {
    await updatePlaceHasPhotos(photo.placeId);
  }

  return photo || null;
}

/**
 * Bulk update photo statuses
 */
export async function bulkUpdatePhotoStatus(
  ids: number[],
  status: ReviewPhotoStatus
): Promise<number> {
  if (ids.length === 0) return 0;

  const result = await db
    .update(reviewPhotos)
    .set({ status, updatedAt: new Date() })
    .where(inArray(reviewPhotos.id, ids))
    .returning({ id: reviewPhotos.id, placeId: reviewPhotos.placeId });

  // Update hasPhotos for all affected places
  if (status === "approved") {
    const uniquePlaceIds = [...new Set(result.map((r) => r.placeId))];
    await Promise.all(uniquePlaceIds.map(updatePlaceHasPhotos));
  }

  return result.length;
}

// ============================================================================
// DELETE
// ============================================================================

/**
 * Delete a review photo
 */
export async function deleteReviewPhoto(id: number): Promise<boolean> {
  const [deleted] = await db
    .delete(reviewPhotos)
    .where(eq(reviewPhotos.id, id))
    .returning({ id: reviewPhotos.id, placeId: reviewPhotos.placeId });

  if (deleted) {
    // Update place.hasPhotos flag
    await updatePlaceHasPhotos(deleted.placeId);
  }

  return !!deleted;
}

/**
 * Delete all photos for a review
 */
export async function deletePhotosByReviewId(reviewId: number): Promise<number> {
  const deleted = await db
    .delete(reviewPhotos)
    .where(eq(reviewPhotos.reviewId, reviewId))
    .returning({ id: reviewPhotos.id, placeId: reviewPhotos.placeId });

  // Update hasPhotos for all affected places
  const uniquePlaceIds = [...new Set(deleted.map((r) => r.placeId))];
  await Promise.all(uniquePlaceIds.map(updatePlaceHasPhotos));

  return deleted.length;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Update place.hasPhotos flag based on approved photo count
 */
async function updatePlaceHasPhotos(placeId: number): Promise<void> {
  const approvedPhotos = await db
    .select({ id: reviewPhotos.id })
    .from(reviewPhotos)
    .where(
      and(
        eq(reviewPhotos.placeId, placeId),
        eq(reviewPhotos.status, "approved")
      )
    )
    .limit(1);

  const hasPhotos = approvedPhotos.length > 0;

  await db
    .update(places)
    .set({ hasPhotos, updatedAt: new Date() })
    .where(eq(places.id, placeId));
}
