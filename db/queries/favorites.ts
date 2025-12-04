/**
 * User Favorites Query Module (P1)
 *
 * Provides functions for managing user favorites.
 * All queries use RLS context for security.
 */

import { eq, and, desc, inArray } from "drizzle-orm";
import { db } from "../index";
import { userFavorites, places, cities, countries, categories, placeCategories } from "../schema";
import { authDb, type DbUser } from "@/lib/db/rlsDb";

// ============================================================================
// FAVORITES MANAGEMENT
// ============================================================================

/**
 * Add a place to user's favorites
 */
export async function addFavorite(user: DbUser, placeId: number): Promise<boolean> {
  try {
    await authDb(user, async (tx) => {
      await tx.insert(userFavorites).values({
        userId: user.id,
        placeId,
      }).onConflictDoNothing(); // Silently ignore if already favorited
    });
    return true;
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return false;
  }
}

/**
 * Remove a place from user's favorites
 */
export async function removeFavorite(user: DbUser, placeId: number): Promise<boolean> {
  try {
    await authDb(user, async (tx) => {
      await tx.delete(userFavorites).where(
        and(
          eq(userFavorites.userId, user.id),
          eq(userFavorites.placeId, placeId)
        )
      );
    });
    return true;
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return false;
  }
}

/**
 * Toggle favorite status for a place
 * Returns the new favorite status
 */
export async function toggleFavorite(user: DbUser, placeId: number): Promise<boolean> {
  const isFav = await isFavorite(user, placeId);
  if (isFav) {
    await removeFavorite(user, placeId);
    return false;
  } else {
    await addFavorite(user, placeId);
    return true;
  }
}

/**
 * Check if a place is favorited by user
 */
export async function isFavorite(user: DbUser, placeId: number): Promise<boolean> {
  try {
    const result = await authDb(user, async (tx) => {
      return tx.query.userFavorites.findFirst({
        where: and(
          eq(userFavorites.userId, user.id),
          eq(userFavorites.placeId, placeId)
        ),
      });
    });
    return !!result;
  } catch (error) {
    console.error("Failed to check favorite:", error);
    return false;
  }
}

/**
 * Get all favorite place IDs for a user
 * Useful for batch checking favorites on card lists
 */
export async function getFavoritePlaceIdsForUser(user: DbUser): Promise<number[]> {
  try {
    const result = await authDb(user, async (tx) => {
      return tx.select({ placeId: userFavorites.placeId })
        .from(userFavorites)
        .where(eq(userFavorites.userId, user.id));
    });
    return result.map(r => r.placeId);
  } catch (error) {
    console.error("Failed to get favorite place IDs:", error);
    return [];
  }
}

/**
 * Get all favorited places with full details for a user
 */
export async function getFavoritesForUser(user: DbUser): Promise<FavoritePlace[]> {
  try {
    const result = await authDb(user, async (tx) => {
      // First get the favorite records
      const favorites = await tx
        .select({
          placeId: userFavorites.placeId,
          createdAt: userFavorites.createdAt,
        })
        .from(userFavorites)
        .where(eq(userFavorites.userId, user.id))
        .orderBy(desc(userFavorites.createdAt));

      if (favorites.length === 0) return [];

      const placeIds = favorites.map(f => f.placeId);

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

      // Create a map for quick lookup and preserve favorite order
      const placeMap = new Map(placesData.map(p => [p.id, p]));

      return favorites.map(f => {
        const place = placeMap.get(f.placeId);
        if (!place) return null;
        return {
          ...place,
          favoritedAt: f.createdAt,
        };
      }).filter((p): p is NonNullable<typeof p> => p !== null);
    });
    return result as unknown as FavoritePlace[];
  } catch (error) {
    console.error("Failed to get favorites:", error);
    return [];
  }
}

/**
 * Get favorite count for a user
 */
export async function getFavoriteCount(user: DbUser): Promise<number> {
  try {
    const result = await authDb(user, async (tx) => {
      return tx.select({ placeId: userFavorites.placeId })
        .from(userFavorites)
        .where(eq(userFavorites.userId, user.id));
    });
    return result.length;
  } catch (error) {
    console.error("Failed to get favorite count:", error);
    return 0;
  }
}

// ============================================================================
// TYPES
// ============================================================================

export type FavoritePlace = {
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
  favoritedAt: Date;
};
