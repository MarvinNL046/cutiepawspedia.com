/**
 * AI Content Client for CutiePawsPedia
 *
 * Client hook for content generation with feature flag support
 * and caching capabilities.
 *
 * Features:
 * - AI_CONTENT_ENABLED feature flag
 * - Content generation with fallbacks
 * - Simple in-memory caching
 * - Type-safe content access
 */

import type {
  ContentLocale,
  AiContentScope,
  AiContentResult,
  SeoContentResult,
  HomeContentInput,
  CountryContentInput,
  CityContentInput,
  CategoryCityContentInput,
  CategoryCountryContentInput,
  BestCategoryContentInput,
  TopCategoryContentInput,
  PlaceContentInput,
} from "./aiContent";

import {
  generateHomeContent,
  generateCountryContent,
  generateCityContent,
  generateCategoryCityContent,
  generateCategoryCountryContent,
  generateBestCategoryContent,
  generateTopCategoryContent,
  generatePlaceContent,
  generateFallbackContent,
} from "./contentGenerators";

// =============================================================================
// FEATURE FLAG
// =============================================================================

/**
 * Feature flag to enable/disable AI content generation
 * Set via environment variable or defaults to true
 */
export const AI_CONTENT_ENABLED =
  process.env.NEXT_PUBLIC_AI_CONTENT_ENABLED !== "false";

/**
 * Check if AI content is enabled
 */
export function isAiContentEnabled(): boolean {
  return AI_CONTENT_ENABLED;
}

// =============================================================================
// CONTENT CACHE
// =============================================================================

/**
 * Simple in-memory cache for content results
 * TTL-based with automatic cleanup
 */
class ContentCache {
  private cache = new Map<string, { content: SeoContentResult; expires: number }>();
  private readonly defaultTTL: number;

  constructor(ttlSeconds = 300) {
    // Default: 5 minutes
    this.defaultTTL = ttlSeconds * 1000;
  }

  /**
   * Generate a cache key from scope and input
   */
  private generateKey(scope: AiContentScope, input: unknown): string {
    return `${scope}:${JSON.stringify(input)}`;
  }

  /**
   * Get cached content if available and not expired
   */
  get(scope: AiContentScope, input: unknown): SeoContentResult | null {
    const key = this.generateKey(scope, input);
    const cached = this.cache.get(key);

    if (!cached) return null;

    if (Date.now() > cached.expires) {
      this.cache.delete(key);
      return null;
    }

    return cached.content;
  }

  /**
   * Store content in cache
   */
  set(scope: AiContentScope, input: unknown, content: SeoContentResult, ttl?: number): void {
    const key = this.generateKey(scope, input);
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { content, expires });
  }

  /**
   * Clear all cached content
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expires) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; entries: number } {
    return {
      size: this.cache.size,
      entries: this.cache.size,
    };
  }
}

// Global cache instance
const contentCache = new ContentCache(300); // 5-minute default TTL

// =============================================================================
// CONTENT CLIENT
// =============================================================================

/**
 * Options for content generation
 */
export interface ContentOptions {
  /** Skip cache and regenerate */
  skipCache?: boolean;
  /** Custom TTL for caching (seconds) */
  cacheTTL?: number;
  /** Force fallback content even if AI is enabled */
  forceFallback?: boolean;
}

/**
 * Generate content for a specific scope with caching support
 */
export function getContent<T extends AiContentScope>(
  scope: T,
  input: ContentInputForScope<T>,
  options: ContentOptions = {}
): SeoContentResult {
  const { skipCache = false, cacheTTL, forceFallback = false } = options;

  // Check if AI content is disabled or forced fallback
  if (!AI_CONTENT_ENABLED || forceFallback) {
    return generateFallbackForScope(scope, input);
  }

  // Try cache first
  if (!skipCache) {
    const cached = contentCache.get(scope, input);
    if (cached) {
      return cached;
    }
  }

  // Generate new content
  const content = generateContentForScope(scope, input);

  // Cache the result
  contentCache.set(scope, input, content, cacheTTL ? cacheTTL * 1000 : undefined);

  return content;
}

/**
 * Get content for home page
 */
export function getHomeContent(input: HomeContentInput, options?: ContentOptions): SeoContentResult {
  return getContent("home", input, options);
}

/**
 * Get content for country page
 */
export function getCountryContentCached(input: CountryContentInput, options?: ContentOptions): SeoContentResult {
  return getContent("country", input, options);
}

/**
 * Get content for city page
 */
export function getCityContentCached(input: CityContentInput, options?: ContentOptions): SeoContentResult {
  return getContent("city", input, options);
}

/**
 * Get content for category in city page
 */
export function getCategoryCityContentCached(
  input: CategoryCityContentInput,
  options?: ContentOptions
): SeoContentResult {
  return getContent("category-city", input, options);
}

/**
 * Get content for category in country page
 */
export function getCategoryCountryContentCached(
  input: CategoryCountryContentInput,
  options?: ContentOptions
): SeoContentResult {
  return getContent("category-country", input, options);
}

/**
 * Get content for best category page
 */
export function getBestCategoryContentCached(
  input: BestCategoryContentInput,
  options?: ContentOptions
): SeoContentResult {
  const scope = input.cityName ? "best-category-city" : "best-category-country";
  return getContent(scope, input, options);
}

/**
 * Get content for top category page
 */
export function getTopCategoryContentCached(
  input: TopCategoryContentInput,
  options?: ContentOptions
): SeoContentResult {
  return getContent("top-category-country", input, options);
}

/**
 * Get content for place detail page
 */
export function getPlaceContentCached(input: PlaceContentInput, options?: ContentOptions): SeoContentResult {
  return getContent("place", input, options);
}

// =============================================================================
// HELPER TYPES AND FUNCTIONS
// =============================================================================

/**
 * Map scope to its input type
 */
type ContentInputForScope<T extends AiContentScope> = T extends "home"
  ? HomeContentInput
  : T extends "country"
  ? CountryContentInput
  : T extends "city"
  ? CityContentInput
  : T extends "category-city"
  ? CategoryCityContentInput
  : T extends "category-country"
  ? CategoryCountryContentInput
  : T extends "best-category-city" | "best-category-country"
  ? BestCategoryContentInput
  : T extends "top-category-country"
  ? TopCategoryContentInput
  : T extends "place"
  ? PlaceContentInput
  : never;

/**
 * Generate content for a specific scope
 */
function generateContentForScope(
  scope: AiContentScope,
  input: unknown
): SeoContentResult {
  switch (scope) {
    case "home":
      return generateHomeContent(input as HomeContentInput);
    case "country":
      return generateCountryContent(input as CountryContentInput);
    case "city":
      return generateCityContent(input as CityContentInput);
    case "category-city":
      return generateCategoryCityContent(input as CategoryCityContentInput);
    case "category-country":
      return generateCategoryCountryContent(input as CategoryCountryContentInput);
    case "best-category-city":
    case "best-category-country":
      return generateBestCategoryContent(input as BestCategoryContentInput);
    case "top-category-country":
      return generateTopCategoryContent(input as TopCategoryContentInput);
    case "place":
      return generatePlaceContent(input as PlaceContentInput);
    default:
      return { intro: "", metaDescription: "" };
  }
}

/**
 * Generate fallback content for a scope
 */
function generateFallbackForScope(
  scope: AiContentScope,
  input: unknown
): SeoContentResult {
  const typedInput = input as { locale?: ContentLocale };
  const locale = typedInput.locale || "en";

  switch (scope) {
    case "home":
      return {
        intro: locale === "nl" ? "Welkom bij CutiePawsPedia." : "Welcome to CutiePawsPedia.",
        metaDescription: locale === "nl"
          ? "CutiePawsPedia - De huisdierdiensten gids."
          : "CutiePawsPedia - The pet services directory.",
      };
    case "country":
      return generateFallbackContent(
        locale,
        (input as CountryContentInput).countryName,
        "location"
      );
    case "city":
      return generateFallbackContent(
        locale,
        (input as CityContentInput).cityName,
        "location"
      );
    case "category-city":
    case "category-country":
      return generateFallbackContent(
        locale,
        (input as CategoryCityContentInput | CategoryCountryContentInput).categoryName,
        "category"
      );
    case "best-category-city":
    case "best-category-country":
    case "top-category-country":
      return generateFallbackContent(
        locale,
        (input as BestCategoryContentInput | TopCategoryContentInput).categoryName,
        "category"
      );
    case "place":
      return generateFallbackContent(
        locale,
        (input as PlaceContentInput).placeName,
        "place"
      );
    default:
      return { intro: "", metaDescription: "" };
  }
}

// =============================================================================
// CACHE MANAGEMENT EXPORTS
// =============================================================================

/**
 * Clear the content cache
 */
export function clearContentCache(): void {
  contentCache.clear();
}

/**
 * Run cache cleanup (remove expired entries)
 */
export function cleanupContentCache(): void {
  contentCache.cleanup();
}

/**
 * Get cache statistics
 */
export function getContentCacheStats(): { size: number; entries: number } {
  return contentCache.stats();
}

// =============================================================================
// REACT HOOK (for client components)
// =============================================================================

/**
 * Hook for using AI content in client components
 * Note: This should be used sparingly as content is usually server-rendered
 */
export function useAiContent() {
  return {
    isEnabled: AI_CONTENT_ENABLED,
    getContent,
    getHomeContent,
    getCityContent: getCityContentCached,
    getCountryContent: getCountryContentCached,
    getPlaceContent: getPlaceContentCached,
    getCategoryCityContent: getCategoryCityContentCached,
    getCategoryCountryContent: getCategoryCountryContentCached,
    getBestCategoryContent: getBestCategoryContentCached,
    getTopCategoryContent: getTopCategoryContentCached,
    clearCache: clearContentCache,
  };
}
