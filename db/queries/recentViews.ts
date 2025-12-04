/**
 * User Recent Views Query Module (P1)
 *
 * Provides functions for tracking recently viewed places.
 * All queries use RLS context for security.
 */

import { eq, and, desc, inArray, sql } from "drizzle-orm";
import { db } from "../index";
import { userRecentViews, places } from "../schema";
import { authDb, type DbUser } from "@/lib/db/rlsDb";

// ============================================================================
// RECENT VIEWS MANAGEMENT
// ============================================================================

/**
 * Add or update a recent view for a place
 * Uses upsert behavior - updates viewedAt if already exists
 */
export async function addRecentView(user: DbUser, placeId: number): Promise<boolean> {
  try {
    await authDb(user, async (tx) => {
      // Use ON CONFLICT to upsert - update viewedAt if already exists
      await tx
        .insert(userRecentViews)
        .values({
          userId: user.id,
          placeId,
          viewedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [userRecentViews.userId, userRecentViews.placeId],
          set: { viewedAt: new Date() },
        });
    });
    return true;
  } catch (error) {
    console.error("Failed to add recent view:", error);
    return false;
  }
}

/**
 * Get recent views for a user with place details
 */
export async function getRecentViewsForUser(
  user: DbUser,
  limit: number = 10
): Promise<RecentViewPlace[]> {
  try {
    const result = await authDb(user, async (tx) => {
      // Get recent view records
      const views = await tx
        .select({
          placeId: userRecentViews.placeId,
          viewedAt: userRecentViews.viewedAt,
        })
        .from(userRecentViews)
        .where(eq(userRecentViews.userId, user.id))
        .orderBy(desc(userRecentViews.viewedAt))
        .limit(limit);

      if (views.length === 0) return [];

      const placeIds = views.map(v => v.placeId);

      // Get place details with city and country
      const placesData = await tx.query.places.findMany({
        where: inArray(places.id, placeIds),
        with: {
          city: {
            with: {
              country: true,
            },
          },
          placeCategories: {
            with: {
              category: true,
            },
          },
        },
      });

      // Create a map for quick lookup and preserve view order
      const placeMap = new Map(placesData.map(p => [p.id, p]));

      return views.map(v => {
        const place = placeMap.get(v.placeId);
        if (!place) return null;
        return {
          ...place,
          viewedAt: v.viewedAt,
        };
      }).filter((p): p is NonNullable<typeof p> => p !== null);
    });
    return result as unknown as RecentViewPlace[];
  } catch (error) {
    console.error("Failed to get recent views:", error);
    return [];
  }
}

/**
 * Clear all recent views for a user
 */
export async function clearRecentViews(user: DbUser): Promise<boolean> {
  try {
    await authDb(user, async (tx) => {
      await tx.delete(userRecentViews).where(
        eq(userRecentViews.userId, user.id)
      );
    });
    return true;
  } catch (error) {
    console.error("Failed to clear recent views:", error);
    return false;
  }
}

/**
 * Remove a single recent view
 */
export async function removeRecentView(user: DbUser, placeId: number): Promise<boolean> {
  try {
    await authDb(user, async (tx) => {
      await tx.delete(userRecentViews).where(
        and(
          eq(userRecentViews.userId, user.id),
          eq(userRecentViews.placeId, placeId)
        )
      );
    });
    return true;
  } catch (error) {
    console.error("Failed to remove recent view:", error);
    return false;
  }
}

/**
 * Get recent view count for a user
 */
export async function getRecentViewCount(user: DbUser): Promise<number> {
  try {
    const result = await authDb(user, async (tx) => {
      return tx.select({ placeId: userRecentViews.placeId })
        .from(userRecentViews)
        .where(eq(userRecentViews.userId, user.id));
    });
    return result.length;
  } catch (error) {
    console.error("Failed to get recent view count:", error);
    return 0;
  }
}

// ============================================================================
// TYPES
// ============================================================================

export type RecentViewPlace = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  address: string | null;
  avgRating: string | null;
  reviewCount: number;
  isPremium: boolean;
  isVerified: boolean;
  city: {
    id: number;
    slug: string;
    name: string;
    country: {
      id: number;
      slug: string;
      name: string;
      code: string;
    };
  };
  placeCategories: Array<{
    category: {
      id: number;
      slug: string;
      labelKey: string;
      icon: string | null;
    };
  }>;
  viewedAt: Date;
};
