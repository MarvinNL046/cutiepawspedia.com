/**
 * Business Photos Database Queries
 *
 * CRUD operations for business-owned photos.
 * These are managed by business owners, not UGC.
 */

import { db } from "@/db";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import { businessPhotos, places } from "@/db/schema/directory";

// ============================================================================
// TYPES
// ============================================================================

export type BusinessPhoto = typeof businessPhotos.$inferSelect;
export type NewBusinessPhoto = typeof businessPhotos.$inferInsert;
export type BusinessPhotoStatus = "active" | "deleted";

export interface BusinessPhotoWithUrl extends BusinessPhoto {
  url: string;
}

// ============================================================================
// CREATE
// ============================================================================

/**
 * Create a new business photo record
 */
export async function createBusinessPhoto(
  data: Omit<NewBusinessPhoto, "id" | "createdAt" | "updatedAt">
): Promise<BusinessPhoto> {
  // Get the current max sortOrder for this place
  const [maxSort] = await db
    .select({ max: sql<number>`COALESCE(MAX(${businessPhotos.sortOrder}), -1)` })
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.placeId, data.placeId),
        eq(businessPhotos.status, "active")
      )
    );

  const nextSortOrder = (maxSort?.max ?? -1) + 1;

  const [photo] = await db
    .insert(businessPhotos)
    .values({
      ...data,
      sortOrder: data.sortOrder ?? nextSortOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  // Update place.hasPhotos flag
  await updatePlaceHasBusinessPhotos(data.placeId);

  return photo;
}

// ============================================================================
// READ
// ============================================================================

/**
 * Get a business photo by ID
 */
export async function getBusinessPhotoById(id: number): Promise<BusinessPhoto | null> {
  const [photo] = await db
    .select()
    .from(businessPhotos)
    .where(eq(businessPhotos.id, id))
    .limit(1);

  return photo || null;
}

/**
 * Get all active photos for a place (ordered by sortOrder)
 */
export async function getActivePhotosByPlaceId(placeId: number): Promise<BusinessPhoto[]> {
  return db
    .select()
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.placeId, placeId),
        eq(businessPhotos.status, "active")
      )
    )
    .orderBy(asc(businessPhotos.sortOrder), desc(businessPhotos.createdAt));
}

/**
 * Get all active photos for a business (across all places)
 */
export async function getActivePhotosByBusinessId(businessId: number): Promise<BusinessPhoto[]> {
  return db
    .select()
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.businessId, businessId),
        eq(businessPhotos.status, "active")
      )
    )
    .orderBy(asc(businessPhotos.sortOrder), desc(businessPhotos.createdAt));
}

/**
 * Get photo count for a place (active only)
 */
export async function getPhotoCountByPlaceId(placeId: number): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.placeId, placeId),
        eq(businessPhotos.status, "active")
      )
    );

  return result?.count ?? 0;
}

/**
 * Get photo count for a business (active only, across all places)
 */
export async function getPhotoCountByBusinessId(businessId: number): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.businessId, businessId),
        eq(businessPhotos.status, "active")
      )
    );

  return result?.count ?? 0;
}

/**
 * Get the primary photo for a place
 */
export async function getPrimaryPhotoByPlaceId(placeId: number): Promise<BusinessPhoto | null> {
  const [photo] = await db
    .select()
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.placeId, placeId),
        eq(businessPhotos.status, "active"),
        eq(businessPhotos.isPrimary, true)
      )
    )
    .limit(1);

  // If no primary photo, return the first one by sort order
  if (!photo) {
    const [firstPhoto] = await db
      .select()
      .from(businessPhotos)
      .where(
        and(
          eq(businessPhotos.placeId, placeId),
          eq(businessPhotos.status, "active")
        )
      )
      .orderBy(asc(businessPhotos.sortOrder))
      .limit(1);

    return firstPhoto || null;
  }

  return photo;
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Update a business photo
 */
export async function updateBusinessPhoto(
  id: number,
  data: Partial<Pick<BusinessPhoto, "altText" | "caption" | "sortOrder" | "isPrimary">>
): Promise<BusinessPhoto | null> {
  const [photo] = await db
    .update(businessPhotos)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(businessPhotos.id, id))
    .returning();

  return photo || null;
}

/**
 * Set a photo as primary (and unset others for the same place)
 */
export async function setPrimaryPhoto(
  id: number,
  placeId: number
): Promise<BusinessPhoto | null> {
  // First, unset all other primary photos for this place
  await db
    .update(businessPhotos)
    .set({ isPrimary: false, updatedAt: new Date() })
    .where(
      and(
        eq(businessPhotos.placeId, placeId),
        eq(businessPhotos.status, "active")
      )
    );

  // Then set the specified photo as primary
  const [photo] = await db
    .update(businessPhotos)
    .set({ isPrimary: true, updatedAt: new Date() })
    .where(eq(businessPhotos.id, id))
    .returning();

  return photo || null;
}

/**
 * Reorder photos by updating sortOrder
 */
export async function reorderPhotos(
  placeId: number,
  photoIds: number[]
): Promise<void> {
  // Update each photo's sortOrder based on its position in the array
  await Promise.all(
    photoIds.map((photoId, index) =>
      db
        .update(businessPhotos)
        .set({ sortOrder: index, updatedAt: new Date() })
        .where(
          and(
            eq(businessPhotos.id, photoId),
            eq(businessPhotos.placeId, placeId)
          )
        )
    )
  );
}

// ============================================================================
// DELETE
// ============================================================================

/**
 * Soft delete a business photo (set status to 'deleted')
 */
export async function softDeleteBusinessPhoto(id: number): Promise<boolean> {
  const [deleted] = await db
    .update(businessPhotos)
    .set({ status: "deleted", updatedAt: new Date() })
    .where(eq(businessPhotos.id, id))
    .returning({ id: businessPhotos.id, placeId: businessPhotos.placeId });

  if (deleted) {
    // Update place.hasPhotos flag
    await updatePlaceHasBusinessPhotos(deleted.placeId);
  }

  return !!deleted;
}

/**
 * Permanently delete a business photo
 */
export async function deleteBusinessPhoto(id: number): Promise<boolean> {
  const [deleted] = await db
    .delete(businessPhotos)
    .where(eq(businessPhotos.id, id))
    .returning({ id: businessPhotos.id, placeId: businessPhotos.placeId });

  if (deleted) {
    // Update place.hasPhotos flag
    await updatePlaceHasBusinessPhotos(deleted.placeId);
  }

  return !!deleted;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Update place.hasPhotos flag based on active business photo count
 * (also considers review photos)
 */
async function updatePlaceHasBusinessPhotos(placeId: number): Promise<void> {
  const activePhotos = await db
    .select({ id: businessPhotos.id })
    .from(businessPhotos)
    .where(
      and(
        eq(businessPhotos.placeId, placeId),
        eq(businessPhotos.status, "active")
      )
    )
    .limit(1);

  const hasPhotos = activePhotos.length > 0;

  // Only update if there are no review photos either
  // The place.hasPhotos should be true if either business photos or approved review photos exist
  await db
    .update(places)
    .set({ hasPhotos, updatedAt: new Date() })
    .where(eq(places.id, placeId));
}

/**
 * Get storage keys for all photos of a place (for cleanup)
 */
export async function getStorageKeysByPlaceId(placeId: number): Promise<string[]> {
  const photos = await db
    .select({ storageKey: businessPhotos.storageKey })
    .from(businessPhotos)
    .where(eq(businessPhotos.placeId, placeId));

  return photos.map((p) => p.storageKey);
}
