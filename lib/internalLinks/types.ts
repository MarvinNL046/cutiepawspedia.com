/**
 * Internal Links Types
 *
 * Type definitions for the internal linking engine.
 */

/**
 * Types of internal links supported by the engine
 */
export type InternalLinkType =
  | "city_category" // City → category in that city
  | "city_best" // City → /best/ page
  | "city_top" // City → related top page
  | "category_city" // Category → cities where this category is popular
  | "category_best" // Category → best of this category
  | "category_top" // Category → top 10 of this category
  | "place_related" // Place → related places
  | "place_city_category" // Place → city/category context
  | "place_city" // Place → city page
  | "place_category" // Place → category page
  | "country_city" // Country → top cities
  | "country_category" // Country → popular categories
  | "country_top" // Country → top cities/categories
  | "country_best"; // Country → best in country pages

/**
 * Single internal link item
 */
export interface InternalLinkItem {
  href: string;
  label: string;
  description?: string;
  type: InternalLinkType;
  relevanceScore?: number;
  icon?: string;
}

/**
 * Grouped internal links for display
 */
export interface InternalLinkGroup {
  title: string;
  titleNl?: string;
  links: InternalLinkItem[];
  maxDisplay?: number;
}

/**
 * Page context for generating internal links
 */
export interface InternalLinkPageContext {
  locale: string;
  pageType:
    | "home"
    | "country"
    | "city"
    | "category"
    | "place"
    | "combo"
    | "best"
    | "top";
  countrySlug?: string;
  countryName?: string;
  citySlug?: string;
  cityName?: string;
  categorySlug?: string;
  categoryName?: string;
  placeSlug?: string;
  placeName?: string;
  placeId?: string;
  cityId?: string;
  categoryId?: string;
}

/**
 * Options for internal link generation
 */
export interface InternalLinkOptions {
  limit?: number;
  includeDescriptions?: boolean;
  minRelevanceScore?: number;
  excludeTypes?: InternalLinkType[];
  onlyTypes?: InternalLinkType[];
}

/**
 * Result from internal link generation
 */
export interface InternalLinksResult {
  links: InternalLinkItem[];
  groups: InternalLinkGroup[];
  totalAvailable: number;
  context: InternalLinkPageContext;
}

/**
 * Category stats for internal linking
 */
export interface CategoryLinkStats {
  categorySlug: string;
  categoryName: string;
  placesCount: number;
  avgRating?: number;
}

/**
 * City stats for internal linking
 */
export interface CityLinkStats {
  citySlug: string;
  cityName: string;
  countrySlug: string;
  placesCount: number;
  topRatedCount?: number;
}

/**
 * Related place for internal linking
 */
export interface RelatedPlaceLink {
  placeSlug: string;
  placeName: string;
  citySlug: string;
  categorySlug: string;
  avgRating?: number;
  reviewCount?: number;
}
