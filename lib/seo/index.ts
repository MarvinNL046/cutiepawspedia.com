/**
 * SEO Module
 *
 * Central SEO engine for metadata and JSON-LD generation.
 */

// Types
export type {
  SeoPageType,
  SeoContext,
  SeoData,
  OpenGraphData,
  TwitterData,
  AlternateLanguages,
  PlaceSeoPayload,
  CategorySeoPayload,
  CitySeoPayload,
  CountrySeoPayload,
  LocalBusinessType,
  BreadcrumbItem,
  ItemListItem,
  SeoConfig,
} from "./types";

export {
  CATEGORY_SCHEMA_TYPES,
  DEFAULT_SEO_CONFIG,
  getSchemaTypeForCategory,
} from "./types";

// URL Helpers
export {
  getBaseUrl,
  buildCanonicalUrl,
  buildPlaceUrl,
  buildCategoryUrl,
  buildCityUrl,
  buildCountryUrl,
  buildHomeUrl,
  buildAlternateUrls,
  buildRelativePath,
  getPageTypeFromContext,
} from "./url-helpers";

// JSON-LD Builders
export {
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildCollectionPageJsonLd,
  jsonLdToString,
  combineJsonLd,
  // Backwards-compatible schema functions
  websiteSchema,
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "./jsonld";

// SEO Generator
export {
  generateSeoData,
  buildPlaceSeoPayload,
  buildCitySeoPayload,
  buildCountrySeoPayload,
  // Backwards-compatible metadata functions
  getPlaceMetadata,
  getCategoryMetadata,
  getSearchMetadata,
  getCityMetadata,
  getCountryMetadata,
} from "./generateSeoData";
