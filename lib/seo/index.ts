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
  itemListSchema,
} from "./jsonld";

// FAQ Schema Builder
export {
  buildFaqJsonLd,
  buildFaqJsonLdWithHtml,
  faqPageSchema,
} from "./faqSchema";

// Review Schema Builder (for JSON-LD)
export {
  reviewSchema,
  reviewsSchema,
  localBusinessWithReviewsSchema,
  // E-E-A-T Schema functions
  articleSchema,
  editorialTeamSchema,
  aboutPageSchema,
  personSchema,
  type ArticleSchemaData,
  type PersonSchemaData,
} from "./schema";

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

// AI Content Engine
export type {
  AiContentScope,
  ContentLocale,
  AiContentInputBase,
  HomeContentInput,
  CountryContentInput,
  CityContentInput,
  CategoryCityContentInput,
  CategoryCountryContentInput,
  BestCategoryContentInput,
  TopCategoryContentInput,
  PlaceContentInput,
  AiContentResult,
  SeoContentResult,
  AiContentInput,
  ContentInputMap,
} from "./aiContent";

export {
  LOCALIZED_STRINGS,
  CATEGORY_NAMES,
  getLocalizedStrings,
  getLocalizedCategoryName,
  formatNumber,
  formatRating,
  formatList,
  truncateText,
} from "./aiContent";

// Content Generators
export {
  generateHomeContent,
  generateCountryContent,
  generateCityContent,
  generateCategoryCityContent,
  generateCategoryCountryContent,
  generateBestCategoryContent,
  generateTopCategoryContent,
  generatePlaceContent,
  generateContent,
  generateFallbackContent,
} from "./contentGenerators";

// AI Content Client & Caching
export {
  AI_CONTENT_ENABLED,
  isAiContentEnabled,
  getContent,
  getHomeContent,
  getCountryContentCached,
  getCityContentCached,
  getCategoryCityContentCached,
  getCategoryCountryContentCached,
  getBestCategoryContentCached,
  getTopCategoryContentCached,
  getPlaceContentCached,
  clearContentCache,
  cleanupContentCache,
  getContentCacheStats,
  useAiContent,
  type ContentOptions,
} from "./aiClient";
