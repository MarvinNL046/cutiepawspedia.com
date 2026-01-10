/**
 * Sitemap Type Definitions
 *
 * Core types for building SEO-optimized, segmented sitemaps.
 * Follows Google's sitemap protocol specifications.
 */

/**
 * Individual URL entry in a sitemap
 */
export interface SitemapUrl {
  /** Full URL of the page */
  loc: string;
  /** Last modification date (ISO 8601 format) */
  lastmod?: string;
  /** Change frequency hint for crawlers */
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Priority relative to other URLs (0.0 to 1.0) */
  priority?: number;
}

/**
 * Sitemap section for the sitemap index
 */
export interface SitemapSection {
  /** Section identifier (e.g., "countries", "cities", "places") */
  id: string;
  /** Path to the sitemap file (e.g., "/sitemap-countries.xml") */
  path: string;
  /** Last modification date of this sitemap section */
  lastmod?: string;
}

/**
 * Configuration for sitemap generation
 */
export interface SitemapConfig {
  /** Base URL for the site */
  baseUrl: string;
  /** Supported locales */
  locales: string[];
  /** Default locale */
  defaultLocale: string;
  /** Maximum URLs per sitemap file (Google limit: 50,000) */
  maxUrlsPerSitemap: number;
}

/**
 * Priority configuration for different page types
 */
export const PAGE_PRIORITIES: Record<string, number> = {
  // Homepage - highest priority
  home: 1.0,

  // Major landing pages
  country: 0.9,
  city: 0.85,
  category: 0.8,

  // Individual content pages
  place: 0.7,

  // Aggregation pages
  best: 0.75,
  top: 0.75,

  // Static/utility pages
  static: 0.5,
  about: 0.4,
  contact: 0.4,
  privacy: 0.2,
  terms: 0.2,
};

/**
 * Change frequency configuration for different page types
 */
export const PAGE_CHANGEFREQ: Record<string, SitemapUrl["changefreq"]> = {
  // Frequently updated
  home: "daily",
  category: "daily",

  // Moderately updated
  country: "weekly",
  city: "weekly",
  place: "weekly",

  // Aggregation pages
  best: "weekly",
  top: "weekly",

  // Rarely updated
  static: "monthly",
  about: "monthly",
  contact: "monthly",
  privacy: "yearly",
  terms: "yearly",
};

/**
 * Default sitemap configuration
 */
export const DEFAULT_SITEMAP_CONFIG: SitemapConfig = {
  baseUrl: process.env.APP_BASE_URL || "https://cutiepawspedia.com",
  locales: ["nl", "en", "de"],
  defaultLocale: "nl",
  maxUrlsPerSitemap: 25000, // Larger sitemaps for fewer files (Google limit: 50,000)
};
