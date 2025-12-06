/**
 * Categories Database Queries
 *
 * Query functions for managing place categories with plan-based limits.
 */

import { db } from "@/db";
import { eq, and, inArray } from "drizzle-orm";
import { categories, placeCategories, places } from "@/db/schema/directory";

/**
 * Get all available categories
 */
export async function getAllCategories(): Promise<
  Array<{
    id: number;
    slug: string;
    icon: string | null;
    labelKey: string;
  }>
> {
  const result = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      icon: categories.icon,
      labelKey: categories.labelKey,
    })
    .from(categories)
    .orderBy(categories.labelKey);

  return result;
}

/**
 * Get categories for a specific place
 */
export async function getCategoriesForPlace(
  placeId: number
): Promise<
  Array<{
    id: number;
    slug: string;
    icon: string | null;
    labelKey: string;
  }>
> {
  const result = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      icon: categories.icon,
      labelKey: categories.labelKey,
    })
    .from(categories)
    .innerJoin(placeCategories, eq(placeCategories.categoryId, categories.id))
    .where(eq(placeCategories.placeId, placeId))
    .orderBy(categories.labelKey);

  return result;
}

/**
 * Get count of categories for a place
 */
export async function getCategoryCountForPlace(placeId: number): Promise<number> {
  const result = await db
    .select({ categoryId: placeCategories.categoryId })
    .from(placeCategories)
    .where(eq(placeCategories.placeId, placeId));

  return result.length;
}

/**
 * Add a category to a place
 */
export async function addCategoryToPlace(
  placeId: number,
  categoryId: number
): Promise<void> {
  // Check if already exists to avoid duplicates
  const existing = await db
    .select()
    .from(placeCategories)
    .where(
      and(
        eq(placeCategories.placeId, placeId),
        eq(placeCategories.categoryId, categoryId)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    await db.insert(placeCategories).values({
      placeId,
      categoryId,
    });
  }
}

/**
 * Remove a category from a place
 */
export async function removeCategoryFromPlace(
  placeId: number,
  categoryId: number
): Promise<void> {
  await db
    .delete(placeCategories)
    .where(
      and(
        eq(placeCategories.placeId, placeId),
        eq(placeCategories.categoryId, categoryId)
      )
    );
}

/**
 * Set categories for a place (replaces all existing categories)
 */
export async function setPlaceCategories(
  placeId: number,
  categoryIds: number[]
): Promise<void> {
  // Delete all existing categories for this place
  await db.delete(placeCategories).where(eq(placeCategories.placeId, placeId));

  // Insert new categories
  if (categoryIds.length > 0) {
    await db.insert(placeCategories).values(
      categoryIds.map((categoryId) => ({
        placeId,
        categoryId,
      }))
    );
  }
}

/**
 * Validate that category IDs exist
 */
export async function validateCategoryIds(
  categoryIds: number[]
): Promise<boolean> {
  if (categoryIds.length === 0) return true;

  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(inArray(categories.id, categoryIds));

  return existing.length === categoryIds.length;
}

// Type exports
export type Category = {
  id: number;
  slug: string;
  icon: string | null;
  labelKey: string;
};
