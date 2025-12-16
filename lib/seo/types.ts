/**
 * SEO Types & Interfaces
 *
 * Central type definitions for SEO metadata and JSON-LD generation.
 */

// =============================================================================
// PAGE TYPES
// =============================================================================

/**
 * All supported page types for SEO generation
 *
 * Page type hierarchy:
 * - home: Landing page
 * - country: Country overview
 * - city: City overview
 * - category: Category in city (existing)
 * - place: Individual place/business
 *
 * New SEO expansion routes (C2):
 * - countryCategory: National category page (/{country}/c/{category})
 * - bestInCountry: Best places in country (/{country}/best/{category})
 * - topInCountry: Top N in country (/{country}/top/{category})
 * - bestInCity: Best places in city (/{country}/{city}/best/{category})
 */
export type SeoPageType =
  | "home"
  | "country"
  | "city"
  | "category"
  | "place"
  | "countryCategory"
  | "bestInCountry"
  | "topInCountry"
  | "bestInCity";

// =============================================================================
// CONTEXT & DATA
// =============================================================================

/**
 * List variants for SEO pages (best-of, top-N, etc.)
 */
export type SeoListVariant = "default" | "best" | "top";

/**
 * Context passed to SEO generators to identify the current page
 */
export interface SeoContext {
  locale: string;
  countrySlug?: string;
  citySlug?: string;
  categorySlug?: string;
  placeSlug?: string;
  /** For list pages (best-of, top-N) */
  listVariant?: SeoListVariant;
  /** For top-N pages, how many to show */
  topCount?: number;
  /** Custom path segment (e.g., "stats/veterinary") */
  path?: string;
  /** Additional path appended after standard segments (e.g., "map") */
  additionalPath?: string;
}

/**
 * OpenGraph metadata
 */
export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  type: "website" | "article" | "place";
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
}

/**
 * Twitter card metadata
 */
export interface TwitterData {
  card: "summary" | "summary_large_image";
  title: string;
  description: string;
  images?: string[];
}

/**
 * Alternate language links for hreflang
 */
export interface AlternateLanguages {
  languages?: Record<string, string>;
  canonical?: string;
}

/**
 * Complete SEO data returned by generators
 */
export interface SeoData {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  keywords?: string[];
  openGraph?: OpenGraphData;
  twitter?: TwitterData;
  alternates?: AlternateLanguages;
}

// =============================================================================
// PAYLOAD TYPES (Lightweight data for SEO generation)
// =============================================================================

/**
 * Place data payload for SEO (minimal fields needed)
 */
export interface PlaceSeoPayload {
  id: number;
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  countrySlug: string;
  countryCode: string;
  categories: string[];
  categorySlugs: string[];
  description?: string | null;
  address?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  website?: string | null;
  avgRating?: number | null;
  reviewCount?: number | null;
  images?: string[];
  lat?: number | null;
  lng?: number | null;
}

/**
 * Category data payload for SEO
 */
export interface CategorySeoPayload {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  placeCount?: number;
}

/**
 * City data payload for SEO
 */
export interface CitySeoPayload {
  id: number;
  slug: string;
  name: string;
  countrySlug: string;
  countryCode: string;
  countryName: string;
  description?: string | null;
  placeCount?: number;
  categoryCount?: number;
}

/**
 * Country data payload for SEO
 */
export interface CountrySeoPayload {
  id: number;
  slug: string;
  name: string;
  code: string;
  description?: string | null;
  cityCount?: number;
  placeCount?: number;
}

// =============================================================================
// JSON-LD TYPES
// =============================================================================

/**
 * Schema.org LocalBusiness subtypes for pet services
 */
export type LocalBusinessType =
  | "LocalBusiness"
  | "VeterinaryCare"
  | "PetStore"
  | "AnimalShelter"
  | "PetGrooming"
  | "Kennel";

/**
 * Mapping from category slugs to Schema.org types
 */
export const CATEGORY_SCHEMA_TYPES: Record<string, LocalBusinessType> = {
  veterinary: "VeterinaryCare",
  "pet-store": "PetStore",
  "animal-shelter": "AnimalShelter",
  grooming: "PetGrooming",
  boarding: "Kennel",
  "dog-park": "LocalBusiness",
  "pet-cafe": "LocalBusiness",
  cemetery: "LocalBusiness",
};

/**
 * Get the Schema.org type for a category
 */
export function getSchemaTypeForCategory(
  categorySlug: string
): LocalBusinessType {
  return CATEGORY_SCHEMA_TYPES[categorySlug] || "LocalBusiness";
}

/**
 * Breadcrumb item for JSON-LD
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * ItemList item for JSON-LD (category listings)
 */
export interface ItemListItem {
  name: string;
  url: string;
  position?: number;
  description?: string;
  image?: string;
}

// =============================================================================
// CONFIG
// =============================================================================

/**
 * Site-wide SEO configuration
 */
export interface SeoConfig {
  siteName: string;
  defaultLocale: string;
  supportedLocales: string[];
  twitterHandle?: string;
  defaultImage?: string;
}

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO_CONFIG: SeoConfig = {
  siteName: "CutiePawsPedia",
  defaultLocale: "nl",
  supportedLocales: ["nl", "en", "de", "fr"],
  twitterHandle: "@cutiepawspedia",
  defaultImage: "/images/og-default.jpg",
};

/**
 * Country-to-locale mapping
 * Each country only supports specific locales relevant to that market
 */
export const COUNTRY_LOCALES: Record<string, string[]> = {
  // Core European markets
  netherlands: ["nl", "en"],         // Dutch, English
  belgie: ["nl", "en", "fr"],        // Dutch, English, French (Belgian variant)
  belgium: ["nl", "en", "fr"],       // Dutch, English, French (alias)
  germany: ["de", "en"],             // German, English
  deutschland: ["de", "en"],         // German, English (German name)
  france: ["fr", "en"],              // French, English
  "united-kingdom": ["en"],          // English only
  uk: ["en"],                        // English only (alias)

  // English-speaking countries
  australia: ["en"],                 // English only
  "united-states": ["en"],           // English only
  usa: ["en"],                       // English only (alias)
  canada: ["en", "fr"],              // English, French
  ireland: ["en"],                   // English only
  "new-zealand": ["en"],             // English only

  // Other European countries
  spain: ["es", "en"],               // Spanish, English
  italy: ["it", "en"],               // Italian, English
  portugal: ["pt", "en"],            // Portuguese, English
  austria: ["de", "en"],             // German, English
  switzerland: ["de", "fr", "it", "en"], // German, French, Italian, English
};

/**
 * Get locales supported for a specific country
 * Falls back to all supported locales if country not found
 */
export function getLocalesForCountry(countrySlug: string): string[] {
  return COUNTRY_LOCALES[countrySlug] || DEFAULT_SEO_CONFIG.supportedLocales;
}

/**
 * Check if a locale is valid for a country
 */
export function isLocaleValidForCountry(locale: string, countrySlug: string): boolean {
  const validLocales = getLocalesForCountry(countrySlug);
  return validLocales.includes(locale);
}
