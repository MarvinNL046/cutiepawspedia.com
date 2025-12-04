/**
 * Enrichment Flags - D1.1.7
 *
 * Extended data quality flags for the enrichment pipeline.
 * These flags indicate the source and confidence of enriched data.
 */

// ============================================================================
// FLAG DEFINITIONS
// ============================================================================

export const ENRICHMENT_FLAGS = {
  // Source indicators (positive)
  SCHEMA_ORG_FOUND: "SCHEMA_ORG_FOUND",
  SCHEMA_ORG_RATING: "SCHEMA_ORG_RATING",
  SCHEMA_ORG_HOURS: "SCHEMA_ORG_HOURS",
  SCHEMA_ORG_ADDRESS: "SCHEMA_ORG_ADDRESS",
  SCHEMA_ORG_GEO: "SCHEMA_ORG_GEO",

  // Opening hours source
  OPENING_HOURS_VIA_JINA: "OPENING_HOURS_VIA_JINA",
  OPENING_HOURS_VIA_REGEX: "OPENING_HOURS_VIA_REGEX",
  OPENING_HOURS_VIA_TABLE: "OPENING_HOURS_VIA_TABLE",
  OPENING_HOURS_VIA_SCHEMA: "OPENING_HOURS_VIA_SCHEMA",
  OPENING_HOURS_INCOMPLETE: "OPENING_HOURS_INCOMPLETE",
  OPENING_HOURS_LOW_CONFIDENCE: "OPENING_HOURS_LOW_CONFIDENCE",

  // Rating source
  RATING_VIA_GOOGLE: "RATING_VIA_GOOGLE",
  RATING_VIA_FACEBOOK: "RATING_VIA_FACEBOOK",
  RATING_VIA_TRUSTPILOT: "RATING_VIA_TRUSTPILOT",
  RATING_VIA_SCHEMA: "RATING_VIA_SCHEMA",
  RATING_VIA_STARS: "RATING_VIA_STARS",
  RATING_VIA_TEXT: "RATING_VIA_TEXT",
  RATING_AGGREGATED: "RATING_AGGREGATED",

  // About section
  ABOUT_SECTION_FOUND: "ABOUT_SECTION_FOUND",
  ABOUT_SECTION_SUMMARIZED: "ABOUT_SECTION_SUMMARIZED",
  ABOUT_FACTS_EXTRACTED: "ABOUT_FACTS_EXTRACTED",

  // Data quality warnings (existing + new)
  NO_ADDRESS: "NO_ADDRESS",
  NO_PHONE: "NO_PHONE",
  NO_WEBSITE: "NO_WEBSITE",
  NO_OPENING_HOURS: "NO_OPENING_HOURS",
  NO_RATING: "NO_RATING",
  NO_REVIEWS: "NO_REVIEWS",
  NO_PHOTOS: "NO_PHOTOS",
  NO_DESCRIPTION: "NO_DESCRIPTION",
  NO_EMAIL: "NO_EMAIL",
  NO_COORDINATES: "NO_COORDINATES",

  // Stale data indicators
  DATA_STALE_30_DAYS: "DATA_STALE_30_DAYS",
  DATA_STALE_90_DAYS: "DATA_STALE_90_DAYS",
  DATA_STALE_365_DAYS: "DATA_STALE_365_DAYS",
  NEVER_REFRESHED: "NEVER_REFRESHED",

  // Website issues
  WEBSITE_UNREACHABLE: "WEBSITE_UNREACHABLE",
  WEBSITE_REDIRECT: "WEBSITE_REDIRECT",
  WEBSITE_ERROR: "WEBSITE_ERROR",
  WEBSITE_NO_CONTENT: "WEBSITE_NO_CONTENT",

  // Business status
  POSSIBLY_CLOSED: "POSSIBLY_CLOSED",
  CONFIRMED_CLOSED: "CONFIRMED_CLOSED",
  STATUS_UNCERTAIN: "STATUS_UNCERTAIN",

  // Enrichment pipeline
  ENRICHMENT_FAILED: "ENRICHMENT_FAILED",
  ENRICHMENT_PARTIAL: "ENRICHMENT_PARTIAL",
  ENRICHMENT_COMPLETE: "ENRICHMENT_COMPLETE",
  MANUAL_REVIEW_NEEDED: "MANUAL_REVIEW_NEEDED",

  // Data conflicts
  CONFLICTING_HOURS: "CONFLICTING_HOURS",
  CONFLICTING_RATING: "CONFLICTING_RATING",
  CONFLICTING_ADDRESS: "CONFLICTING_ADDRESS",
} as const;

export type EnrichmentFlag = typeof ENRICHMENT_FLAGS[keyof typeof ENRICHMENT_FLAGS];

// ============================================================================
// FLAG CATEGORIES
// ============================================================================

export const FLAG_CATEGORIES = {
  source: [
    ENRICHMENT_FLAGS.SCHEMA_ORG_FOUND,
    ENRICHMENT_FLAGS.SCHEMA_ORG_RATING,
    ENRICHMENT_FLAGS.SCHEMA_ORG_HOURS,
    ENRICHMENT_FLAGS.SCHEMA_ORG_ADDRESS,
    ENRICHMENT_FLAGS.SCHEMA_ORG_GEO,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_JINA,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_REGEX,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_TABLE,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_SCHEMA,
    ENRICHMENT_FLAGS.RATING_VIA_GOOGLE,
    ENRICHMENT_FLAGS.RATING_VIA_FACEBOOK,
    ENRICHMENT_FLAGS.RATING_VIA_TRUSTPILOT,
    ENRICHMENT_FLAGS.RATING_VIA_SCHEMA,
    ENRICHMENT_FLAGS.RATING_VIA_STARS,
    ENRICHMENT_FLAGS.RATING_VIA_TEXT,
    ENRICHMENT_FLAGS.ABOUT_SECTION_FOUND,
    ENRICHMENT_FLAGS.ABOUT_SECTION_SUMMARIZED,
    ENRICHMENT_FLAGS.ABOUT_FACTS_EXTRACTED,
  ],
  warning: [
    ENRICHMENT_FLAGS.NO_ADDRESS,
    ENRICHMENT_FLAGS.NO_PHONE,
    ENRICHMENT_FLAGS.NO_WEBSITE,
    ENRICHMENT_FLAGS.NO_OPENING_HOURS,
    ENRICHMENT_FLAGS.NO_RATING,
    ENRICHMENT_FLAGS.NO_REVIEWS,
    ENRICHMENT_FLAGS.NO_PHOTOS,
    ENRICHMENT_FLAGS.NO_DESCRIPTION,
    ENRICHMENT_FLAGS.NO_EMAIL,
    ENRICHMENT_FLAGS.NO_COORDINATES,
    ENRICHMENT_FLAGS.OPENING_HOURS_INCOMPLETE,
    ENRICHMENT_FLAGS.OPENING_HOURS_LOW_CONFIDENCE,
    ENRICHMENT_FLAGS.DATA_STALE_30_DAYS,
    ENRICHMENT_FLAGS.DATA_STALE_90_DAYS,
    ENRICHMENT_FLAGS.DATA_STALE_365_DAYS,
    ENRICHMENT_FLAGS.NEVER_REFRESHED,
  ],
  error: [
    ENRICHMENT_FLAGS.WEBSITE_UNREACHABLE,
    ENRICHMENT_FLAGS.WEBSITE_REDIRECT,
    ENRICHMENT_FLAGS.WEBSITE_ERROR,
    ENRICHMENT_FLAGS.WEBSITE_NO_CONTENT,
    ENRICHMENT_FLAGS.ENRICHMENT_FAILED,
  ],
  status: [
    ENRICHMENT_FLAGS.POSSIBLY_CLOSED,
    ENRICHMENT_FLAGS.CONFIRMED_CLOSED,
    ENRICHMENT_FLAGS.STATUS_UNCERTAIN,
    ENRICHMENT_FLAGS.ENRICHMENT_PARTIAL,
    ENRICHMENT_FLAGS.ENRICHMENT_COMPLETE,
    ENRICHMENT_FLAGS.MANUAL_REVIEW_NEEDED,
  ],
  conflict: [
    ENRICHMENT_FLAGS.CONFLICTING_HOURS,
    ENRICHMENT_FLAGS.CONFLICTING_RATING,
    ENRICHMENT_FLAGS.CONFLICTING_ADDRESS,
  ],
};

// ============================================================================
// FLAG UTILITIES
// ============================================================================

/**
 * Add a flag to the flags array if not already present
 */
export function addFlag(flags: string[], flag: EnrichmentFlag): string[] {
  if (!flags.includes(flag)) {
    return [...flags, flag];
  }
  return flags;
}

/**
 * Remove a flag from the flags array
 */
export function removeFlag(flags: string[], flag: EnrichmentFlag): string[] {
  return flags.filter((f) => f !== flag);
}

/**
 * Check if a flag is present
 */
export function hasFlag(flags: string[], flag: EnrichmentFlag): boolean {
  return flags.includes(flag);
}

/**
 * Replace one flag with another
 */
export function replaceFlag(
  flags: string[],
  oldFlag: EnrichmentFlag,
  newFlag: EnrichmentFlag
): string[] {
  return flags.map((f) => (f === oldFlag ? newFlag : f));
}

/**
 * Get flags by category
 */
export function getFlagsByCategory(
  flags: string[],
  category: keyof typeof FLAG_CATEGORIES
): string[] {
  const categoryFlags = FLAG_CATEGORIES[category] as readonly string[];
  return flags.filter((f) => categoryFlags.includes(f));
}

/**
 * Count flags by category
 */
export function countFlagsByCategory(flags: string[]): Record<string, number> {
  return {
    source: getFlagsByCategory(flags, "source").length,
    warning: getFlagsByCategory(flags, "warning").length,
    error: getFlagsByCategory(flags, "error").length,
    status: getFlagsByCategory(flags, "status").length,
    conflict: getFlagsByCategory(flags, "conflict").length,
  };
}

/**
 * Get severity level for a flag (0 = info, 1 = warning, 2 = error, 3 = critical)
 */
export function getFlagSeverity(flag: EnrichmentFlag): number {
  if ((FLAG_CATEGORIES.source as readonly string[]).includes(flag)) return 0;
  if ((FLAG_CATEGORIES.warning as readonly string[]).includes(flag)) return 1;
  if ((FLAG_CATEGORIES.error as readonly string[]).includes(flag)) return 2;
  if (flag === ENRICHMENT_FLAGS.CONFIRMED_CLOSED) return 3;
  if (flag === ENRICHMENT_FLAGS.ENRICHMENT_FAILED) return 2;
  return 1;
}

/**
 * Get maximum severity from a list of flags
 */
export function getMaxSeverity(flags: string[]): number {
  return Math.max(0, ...flags.map((f) => getFlagSeverity(f as EnrichmentFlag)));
}

/**
 * Generate flags from enrichment result
 */
export function generateEnrichmentFlags(result: {
  hasSchemaOrg?: boolean;
  schemaOrgFields?: string[];
  openingHoursSource?: "jina" | "regex" | "table" | "schema" | null;
  openingHoursConfidence?: number;
  openingHoursDayCount?: number;
  ratingSource?: string;
  hasAboutSection?: boolean;
  aboutSummarized?: boolean;
  aboutFactsCount?: number;
  websiteStatus?: "ok" | "unreachable" | "redirect" | "error" | "no_content";
  enrichmentStatus?: "complete" | "partial" | "failed";
}): EnrichmentFlag[] {
  const flags: EnrichmentFlag[] = [];

  // Schema.org flags
  if (result.hasSchemaOrg) {
    flags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_FOUND);
    if (result.schemaOrgFields?.includes("rating")) {
      flags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_RATING);
    }
    if (result.schemaOrgFields?.includes("hours")) {
      flags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_HOURS);
    }
    if (result.schemaOrgFields?.includes("address")) {
      flags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_ADDRESS);
    }
    if (result.schemaOrgFields?.includes("geo")) {
      flags.push(ENRICHMENT_FLAGS.SCHEMA_ORG_GEO);
    }
  }

  // Opening hours flags
  if (result.openingHoursSource) {
    const sourceMap: Record<string, EnrichmentFlag> = {
      jina: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_JINA,
      regex: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_REGEX,
      table: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_TABLE,
      schema: ENRICHMENT_FLAGS.OPENING_HOURS_VIA_SCHEMA,
    };
    const flag = sourceMap[result.openingHoursSource];
    if (flag) flags.push(flag);

    if (result.openingHoursConfidence && result.openingHoursConfidence < 60) {
      flags.push(ENRICHMENT_FLAGS.OPENING_HOURS_LOW_CONFIDENCE);
    }
    if (result.openingHoursDayCount && result.openingHoursDayCount < 5) {
      flags.push(ENRICHMENT_FLAGS.OPENING_HOURS_INCOMPLETE);
    }
  }

  // Rating flags
  if (result.ratingSource) {
    const sourceMap: Record<string, EnrichmentFlag> = {
      google: ENRICHMENT_FLAGS.RATING_VIA_GOOGLE,
      facebook: ENRICHMENT_FLAGS.RATING_VIA_FACEBOOK,
      trustpilot: ENRICHMENT_FLAGS.RATING_VIA_TRUSTPILOT,
      schema_org: ENRICHMENT_FLAGS.RATING_VIA_SCHEMA,
      star_symbols: ENRICHMENT_FLAGS.RATING_VIA_STARS,
      text_pattern: ENRICHMENT_FLAGS.RATING_VIA_TEXT,
    };
    const flag = sourceMap[result.ratingSource];
    if (flag) flags.push(flag);
  }

  // About section flags
  if (result.hasAboutSection) {
    flags.push(ENRICHMENT_FLAGS.ABOUT_SECTION_FOUND);
    if (result.aboutSummarized) {
      flags.push(ENRICHMENT_FLAGS.ABOUT_SECTION_SUMMARIZED);
    }
    if (result.aboutFactsCount && result.aboutFactsCount > 0) {
      flags.push(ENRICHMENT_FLAGS.ABOUT_FACTS_EXTRACTED);
    }
  }

  // Website status flags
  if (result.websiteStatus) {
    const statusMap: Record<string, EnrichmentFlag> = {
      unreachable: ENRICHMENT_FLAGS.WEBSITE_UNREACHABLE,
      redirect: ENRICHMENT_FLAGS.WEBSITE_REDIRECT,
      error: ENRICHMENT_FLAGS.WEBSITE_ERROR,
      no_content: ENRICHMENT_FLAGS.WEBSITE_NO_CONTENT,
    };
    const flag = statusMap[result.websiteStatus];
    if (flag) flags.push(flag);
  }

  // Enrichment status flags
  if (result.enrichmentStatus) {
    const statusMap: Record<string, EnrichmentFlag> = {
      complete: ENRICHMENT_FLAGS.ENRICHMENT_COMPLETE,
      partial: ENRICHMENT_FLAGS.ENRICHMENT_PARTIAL,
      failed: ENRICHMENT_FLAGS.ENRICHMENT_FAILED,
    };
    const flag = statusMap[result.enrichmentStatus];
    if (flag) flags.push(flag);
  }

  return flags;
}

/**
 * Calculate staleness flags based on last refresh date
 */
export function getStalenessFlags(lastRefreshedAt: Date | null): EnrichmentFlag[] {
  if (!lastRefreshedAt) {
    return [ENRICHMENT_FLAGS.NEVER_REFRESHED];
  }

  const now = new Date();
  const daysSinceRefresh = Math.floor(
    (now.getTime() - lastRefreshedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceRefresh >= 365) {
    return [ENRICHMENT_FLAGS.DATA_STALE_365_DAYS];
  }
  if (daysSinceRefresh >= 90) {
    return [ENRICHMENT_FLAGS.DATA_STALE_90_DAYS];
  }
  if (daysSinceRefresh >= 30) {
    return [ENRICHMENT_FLAGS.DATA_STALE_30_DAYS];
  }

  return [];
}
