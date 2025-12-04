/**
 * Enrichment Module - D1.1
 *
 * Advanced data enrichment utilities for extracting structured data from websites.
 * Supports multi-language parsing, Schema.org extraction, and AI-powered fallbacks.
 */

// Opening Hours Parser (D1.1.2)
export {
  parseOpeningHours,
  generateTextFromHours,
  toSchemaOrgFormat,
  toSimpleFormat,
  type OpeningHoursResult,
  type DayHours,
} from "./parseOpeningHours";

// Rating & Review Extraction (D1.1.3)
export {
  parseRatings,
  type RatingResult,
  type ReviewSummary,
} from "./parseRatings";

// About Section Extraction (D1.1.4)
export {
  extractAboutSection,
  type AboutSectionResult,
} from "./extractAboutSection";

// Schema.org Extractor (D1.1.5)
export {
  extractSchemaOrg,
  schemaOrgToInternalHours,
  type SchemaOrgResult,
  type LocalBusinessSchema,
} from "./extractSchemaOrg";

// Enhanced Data Quality Flags (D1.1.7)
export {
  ENRICHMENT_FLAGS,
  FLAG_CATEGORIES,
  addFlag,
  removeFlag,
  hasFlag,
  generateEnrichmentFlags,
  getStalenessFlags,
  type EnrichmentFlag,
} from "./flags";

// UI Helpers for Enriched Content (P0.4)
export {
  getBestAboutText,
  hasEnrichedAbout,
  formatOpeningHours as formatOpeningHoursForDisplay,
  getTodayStatus,
  getOpeningHoursSource,
  hasOpeningHours,
  getRatingSource,
  formatRating,
  getServiceBadges,
  getHighlights,
  getEnrichmentStatus,
  type PlaceData,
  type AIContent,
  type OpeningHoursDisplay,
} from "./ui";
