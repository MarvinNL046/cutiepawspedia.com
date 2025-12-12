/**
 * Sitemap Module
 *
 * Exports all sitemap utilities for generating SEO-optimized sitemaps.
 *
 * Usage:
 * import { buildSitemapXml, buildHomeUrls, PAGE_PRIORITIES } from "@/lib/sitemap";
 */

// Types and constants
export {
  type SitemapUrl,
  type SitemapSection,
  type SitemapConfig,
  PAGE_PRIORITIES,
  PAGE_CHANGEFREQ,
  DEFAULT_SITEMAP_CONFIG,
} from "./types";

// URL builders
export {
  buildHomeUrls,
  buildCountryUrls,
  buildProvinceUrls,
  buildCityUrls,
  buildCategoryUrls,
  buildPlaceUrls,
  buildBestInCityUrls,
  buildTopInCountryUrls,
  buildBestInCountryUrls,
  buildCategoryInCountryUrls,
  buildStaticUrls,
  getSitemapCounts,
  getPlaceSitemapPageCount,
} from "./urls";

// XML builders
export {
  buildSitemapXml,
  buildSitemapIndexXml,
  splitIntoSitemaps,
  getSitemapStats,
  validateSitemapUrl,
  validateSitemap,
} from "./build";
