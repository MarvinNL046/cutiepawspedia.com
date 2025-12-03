"use server";

import { requireAdmin } from "@/lib/auth/admin";
import {
  generateContent,
  generateCacheKey,
  type ContentData,
  type CountryData,
  type CityData,
  type CategoryData,
  type PlaceData,
  type ComboData,
  type BestData,
  type TopData,
} from "@/lib/ai/generateContent";
import type { AiContentType } from "@/db/schema/ai";
import type { ContentLocale } from "@/lib/seo/aiContent";
import {
  getContentStats,
  getQueueStats,
  getStaleContent,
  getCitiesWithoutContent,
  getPlacesWithoutContent,
  getCategoriesWithoutContent,
  markContentStale,
  addToQueue,
} from "@/db/queries/aiContent";
import { AI_VERSION, getAiConfig } from "@/lib/ai/version";
import { revalidatePath } from "next/cache";

// ============================================================================
// STATS ACTIONS
// ============================================================================

export async function getAiStats(locale: string) {
  await requireAdmin(locale);

  const [contentStats, queueStats] = await Promise.all([
    getContentStats(),
    getQueueStats(),
  ]);

  return {
    contentStats,
    queueStats,
    config: getAiConfig(),
  };
}

// ============================================================================
// MISSING CONTENT SCANNER
// ============================================================================

export interface MissingContentItem {
  type: "city" | "place" | "category";
  name: string;
  cacheKey: string;
  slug: string;
  parentSlug?: string;
  countrySlug?: string;
}

export async function scanMissingContent(
  locale: string,
  contentLocale: ContentLocale = "nl",
  limit: number = 50
): Promise<MissingContentItem[]> {
  await requireAdmin(locale);

  const results: MissingContentItem[] = [];

  // Get missing cities
  const missingCities = await getCitiesWithoutContent(contentLocale, Math.floor(limit / 3));
  for (const city of missingCities) {
    results.push({
      type: "city",
      name: city.cityName,
      cacheKey: `city:${city.citySlug}:${city.countrySlug}:${contentLocale}`,
      slug: city.citySlug,
      countrySlug: city.countrySlug,
    });
  }

  // Get missing places
  const missingPlaces = await getPlacesWithoutContent(contentLocale, Math.floor(limit / 3));
  for (const place of missingPlaces) {
    results.push({
      type: "place",
      name: place.placeName,
      cacheKey: `place:${place.placeSlug}:${place.citySlug}:${place.countrySlug}:${contentLocale}`,
      slug: place.placeSlug,
      parentSlug: place.citySlug,
      countrySlug: place.countrySlug,
    });
  }

  // Get missing categories (for Netherlands)
  const missingCategories = await getCategoriesWithoutContent(
    "netherlands",
    contentLocale,
    Math.floor(limit / 3)
  );
  for (const cat of missingCategories) {
    results.push({
      type: "category",
      name: cat.categoryName,
      cacheKey: `category:${cat.categorySlug}:netherlands:${contentLocale}`,
      slug: cat.categorySlug,
      countrySlug: "netherlands",
    });
  }

  return results;
}

// ============================================================================
// STALE CONTENT SCANNER
// ============================================================================

export interface StaleContentItem {
  id: number;
  key: string;
  contentType: string;
  locale: string;
  version: string;
  isOutdated: boolean;
  updatedAt: Date;
}

export async function scanStaleContent(
  locale: string,
  limit: number = 50
): Promise<StaleContentItem[]> {
  await requireAdmin(locale);

  const staleItems = await getStaleContent(limit);

  return staleItems.map((item) => ({
    id: item.id,
    key: item.key,
    contentType: item.contentType,
    locale: item.locale,
    version: item.version,
    isOutdated: item.version !== AI_VERSION,
    updatedAt: item.updatedAt,
  }));
}

// ============================================================================
// FORCE REGENERATE
// ============================================================================

export type ForceRegenerateResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function forceRegenerate(
  locale: string,
  cacheKey: string,
  contentType: AiContentType
): Promise<ForceRegenerateResult> {
  await requireAdmin(locale);

  try {
    // Parse the cache key to extract data
    const parts = cacheKey.split(":");
    if (parts.length < 3) {
      return { success: false, error: "Invalid cache key format" };
    }

    const contentLocale = parts[parts.length - 1] as ContentLocale;

    // Build data object based on content type
    let data: ContentData;

    switch (contentType) {
      case "country":
        // country:netherlands:nl
        if (parts.length !== 3) {
          return { success: false, error: "Invalid country cache key format" };
        }
        data = {
          countryName: parts[1],
          countrySlug: parts[1],
          totalCities: 0,
          totalPlaces: 0,
        } as CountryData;
        break;

      case "city":
        // city:amsterdam:netherlands:nl
        if (parts.length !== 4) {
          return { success: false, error: "Invalid city cache key format" };
        }
        data = {
          cityName: parts[1],
          citySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          totalPlaces: 0,
        } as CityData;
        break;

      case "category":
        // category:veterinary:netherlands:nl
        if (parts.length !== 4) {
          return { success: false, error: "Invalid category cache key format" };
        }
        data = {
          categoryName: parts[1],
          categorySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          totalPlaces: 0,
        } as CategoryData;
        break;

      case "place":
        // place:pets-place:amsterdam:netherlands:nl
        if (parts.length !== 5) {
          return { success: false, error: "Invalid place cache key format" };
        }
        data = {
          placeName: parts[1],
          placeSlug: parts[1],
          cityName: parts[2],
          citySlug: parts[2],
          countryName: parts[3],
          countrySlug: parts[3],
          categories: [],
        } as PlaceData;
        break;

      case "combo":
        // combo:veterinary:amsterdam:netherlands:nl
        if (parts.length !== 5) {
          return { success: false, error: "Invalid combo cache key format" };
        }
        data = {
          categoryName: parts[1],
          categorySlug: parts[1],
          cityName: parts[2],
          citySlug: parts[2],
          countryName: parts[3],
          countrySlug: parts[3],
          totalPlaces: 0,
        } as ComboData;
        break;

      case "best":
        // best:veterinary:amsterdam:netherlands:nl (city) or best:veterinary:netherlands:nl (country)
        if (parts.length === 4) {
          // Country level
          data = {
            categoryName: parts[1],
            categorySlug: parts[1],
            countryName: parts[2],
            countrySlug: parts[2],
            totalRanked: 0,
          } as BestData;
        } else if (parts.length === 5) {
          // City level
          data = {
            categoryName: parts[1],
            categorySlug: parts[1],
            cityName: parts[2],
            citySlug: parts[2],
            countryName: parts[3],
            countrySlug: parts[3],
            totalRanked: 0,
          } as BestData;
        } else {
          return { success: false, error: "Invalid best cache key format" };
        }
        break;

      case "top":
        // top:veterinary:netherlands:nl
        if (parts.length !== 4) {
          return { success: false, error: "Invalid top cache key format" };
        }
        data = {
          categoryName: parts[1],
          categorySlug: parts[1],
          countryName: parts[2],
          countrySlug: parts[2],
          topCount: 10,
        } as TopData;
        break;

      default:
        return { success: false, error: `Unknown content type: ${contentType}` };
    }

    // Generate content with force flag (throws on error)
    await generateContent({
      type: contentType,
      locale: contentLocale,
      data,
      force: true,
    });

    // Revalidate the admin page
    revalidatePath(`/${locale}/admin/ai`);

    return {
      success: true,
      message: `Successfully regenerated content for ${cacheKey}`,
    };
  } catch (error) {
    console.error("Force regenerate error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ============================================================================
// MARK STALE ACTION
// ============================================================================

export async function markItemStale(
  locale: string,
  cacheKey: string
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin(locale);

  try {
    await markContentStale(cacheKey);
    revalidatePath(`/${locale}/admin/ai`);
    return { success: true };
  } catch (error) {
    console.error("Mark stale error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ============================================================================
// QUEUE FOR REGENERATION
// ============================================================================

export async function queueForRegeneration(
  locale: string,
  cacheKey: string,
  contentType: AiContentType,
  priority: number = 10
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin(locale);

  try {
    // Parse locale from cache key
    const parts = cacheKey.split(":");
    const contentLocale = parts[parts.length - 1];

    await addToQueue({
      cacheKey,
      contentType,
      locale: contentLocale,
      priority,
    });

    revalidatePath(`/${locale}/admin/ai`);
    return { success: true };
  } catch (error) {
    console.error("Queue for regeneration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
