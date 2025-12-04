/**
 * Rating & Review Extraction - D1.1.3
 *
 * Extracts rating and review information from websites:
 * - Google/Facebook/Trustpilot badge detection
 * - Star rating symbols (★★★★☆)
 * - Numeric ratings (4.8/5, 4,5 sterren)
 * - Schema.org aggregateRating
 * - Review count extraction
 */

// ============================================================================
// TYPES
// ============================================================================

export interface RatingResult {
  /** Average rating value (1-5 scale) */
  rating: number | null;
  /** Number of reviews */
  reviewCount: number | null;
  /** Maximum rating scale (usually 5, sometimes 10) */
  maxRating: number;
  /** Source of the rating */
  source: RatingSource;
  /** Confidence score 0-100 */
  confidence: number;
  /** Individual platform ratings if multiple found */
  platformRatings?: PlatformRating[];
  /** Review summary if available */
  reviewSummary?: ReviewSummary;
  /** Raw text where rating was found */
  raw?: string;
}

export type RatingSource =
  | "google"
  | "facebook"
  | "trustpilot"
  | "tripadvisor"
  | "yelp"
  | "schema_org"
  | "star_symbols"
  | "text_pattern"
  | "widget"
  | "unknown";

export interface PlatformRating {
  platform: RatingSource;
  rating: number;
  reviewCount?: number;
  url?: string;
  verified: boolean;
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  distribution?: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  recentReviewSnippet?: string;
}

interface ParseContext {
  content: string;
  html?: string;
  url?: string;
}

// ============================================================================
// PLATFORM PATTERNS
// ============================================================================

const PLATFORM_PATTERNS: Record<RatingSource, RegExp[]> = {
  google: [
    /google[\s\-]?reviews?/i,
    /google[\s\-]?rating/i,
    /google\.com\/maps/i,
    /g\.page/i,
    /maps\.google/i,
    /google[\s\-]?beoordelingen/i, // Dutch
    /google[\s\-]?bewertungen/i, // German
  ],
  facebook: [
    /facebook[\s\-]?reviews?/i,
    /facebook[\s\-]?rating/i,
    /fb\.com/i,
    /facebook\.com.*reviews/i,
    /facebook[\s\-]?beoordelingen/i,
  ],
  trustpilot: [
    /trustpilot/i,
    /trust[\s\-]?pilot/i,
    /trustpilot\.com/i,
  ],
  tripadvisor: [
    /tripadvisor/i,
    /trip[\s\-]?advisor/i,
    /tripadvisor\.com/i,
  ],
  yelp: [
    /yelp/i,
    /yelp\.com/i,
  ],
  schema_org: [],
  star_symbols: [],
  text_pattern: [],
  widget: [],
  unknown: [],
};

// ============================================================================
// MAIN PARSER
// ============================================================================

/**
 * Parse ratings and reviews from content
 */
export function parseRatings(context: ParseContext): RatingResult {
  const { content, html } = context;
  const platformRatings: PlatformRating[] = [];

  // Strategy 1: Schema.org aggregateRating (highest priority)
  if (html) {
    const schemaResult = parseSchemaOrgRating(html);
    if (schemaResult && schemaResult.rating !== undefined) {
      return {
        rating: schemaResult.rating,
        reviewCount: schemaResult.reviewCount ?? null,
        maxRating: schemaResult.maxRating ?? 5,
        source: "schema_org",
        confidence: 95,
        platformRatings,
        raw: schemaResult.raw,
      };
    }
  }

  // Strategy 2: Platform-specific widgets and badges
  const widgetResult = parsePlatformWidgets(content, html);
  if (widgetResult) {
    platformRatings.push(...(widgetResult.platformRatings || []));
  }

  // Strategy 3: Star symbols (★★★★☆)
  const starResult = parseStarSymbols(content);
  if (starResult && starResult.rating !== undefined) {
    return {
      rating: starResult.rating,
      reviewCount: starResult.reviewCount ?? null,
      maxRating: starResult.maxRating ?? 5,
      source: "star_symbols",
      confidence: 70,
      platformRatings,
      raw: starResult.raw,
    };
  }

  // Strategy 4: Text patterns ("4.8/5", "4,5 sterren")
  const textResult = parseTextPatterns(content);
  if (textResult && textResult.rating !== undefined) {
    return {
      rating: textResult.rating,
      reviewCount: textResult.reviewCount ?? null,
      maxRating: textResult.maxRating ?? 5,
      source: "text_pattern",
      confidence: 60,
      platformRatings,
      raw: textResult.raw,
    };
  }

  // Strategy 5: Platform badge detection with embedded rating
  const badgeResult = parsePlatformBadges(content);
  if (badgeResult) {
    platformRatings.push(...(badgeResult.platformRatings || []));
  }

  // Combine platform ratings if we have them
  if (platformRatings.length > 0) {
    const combined = combinePlatformRatings(platformRatings);
    return {
      ...combined,
      platformRatings,
    };
  }

  // No rating found
  return {
    rating: null,
    reviewCount: null,
    maxRating: 5,
    source: "unknown",
    confidence: 0,
  };
}

// ============================================================================
// SCHEMA.ORG PARSER
// ============================================================================

function parseSchemaOrgRating(html: string): Partial<RatingResult> | null {
  try {
    // Look for JSON-LD
    const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const matches = [...html.matchAll(jsonLdPattern)];

    for (const match of matches) {
      try {
        const data = JSON.parse(match[1]);
        const aggregateRating = findAggregateRating(data);

        if (aggregateRating) {
          const reviewCountStr = aggregateRating.reviewCount || aggregateRating.ratingCount || "";
          const bestRatingStr = aggregateRating.bestRating || "5";
          return {
            rating: parseFloat(aggregateRating.ratingValue) || null,
            reviewCount: reviewCountStr ? parseInt(reviewCountStr, 10) || null : null,
            maxRating: parseFloat(bestRatingStr) || 5,
            raw: match[1].substring(0, 200),
          };
        }
      } catch {
        // Invalid JSON, continue to next match
      }
    }

    // Look for microdata
    const microdataRating = html.match(/itemprop=["']ratingValue["'][^>]*content=["']([^"']+)["']/i);
    const microdataCount = html.match(/itemprop=["']reviewCount["'][^>]*content=["']([^"']+)["']/i);

    if (microdataRating) {
      return {
        rating: parseFloat(microdataRating[1]) || null,
        reviewCount: microdataCount ? parseInt(microdataCount[1], 10) : null,
        maxRating: 5,
      };
    }
  } catch (error) {
    console.error("Schema.org rating parse error:", error);
  }

  return null;
}

function findAggregateRating(data: unknown): { ratingValue: string; reviewCount?: string; ratingCount?: string; bestRating?: string } | null {
  if (!data || typeof data !== "object") return null;

  const dataRecord = data as Record<string, unknown>;

  // Direct aggregateRating property
  if ("aggregateRating" in dataRecord && dataRecord.aggregateRating) {
    return dataRecord.aggregateRating as { ratingValue: string; reviewCount?: string; ratingCount?: string; bestRating?: string };
  }

  // Check in @graph array
  if ("@graph" in dataRecord && Array.isArray(dataRecord["@graph"])) {
    for (const item of dataRecord["@graph"]) {
      const result = findAggregateRating(item);
      if (result) return result;
    }
  }

  // Direct @type: AggregateRating
  if ("@type" in dataRecord && dataRecord["@type"] === "AggregateRating") {
    return dataRecord as unknown as { ratingValue: string; reviewCount?: string; ratingCount?: string; bestRating?: string };
  }

  return null;
}

// ============================================================================
// PLATFORM WIDGET PARSER
// ============================================================================

function parsePlatformWidgets(content: string, html?: string): Partial<RatingResult> | null {
  const platformRatings: PlatformRating[] = [];

  // Google Reviews widget patterns
  const googlePatterns = [
    /google[^]*?(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?|sterne)/gi,
    /(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?)\s*(?:op|on)?\s*google/gi,
    /rated?\s*(\d[,.]?\d?)\s*(?:\/\s*5)?\s*(?:op|on)?\s*google/gi,
  ];

  for (const pattern of googlePatterns) {
    const match = content.match(pattern);
    if (match) {
      const ratingMatch = match[0].match(/(\d[,.]?\d?)/);
      if (ratingMatch) {
        const rating = parseFloat(ratingMatch[1].replace(",", "."));
        if (rating >= 1 && rating <= 5) {
          platformRatings.push({
            platform: "google",
            rating,
            verified: false,
          });
          break;
        }
      }
    }
  }

  // Facebook Reviews
  const fbPatterns = [
    /facebook[^]*?(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?)/gi,
    /(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?)\s*(?:op|on)?\s*facebook/gi,
  ];

  for (const pattern of fbPatterns) {
    const match = content.match(pattern);
    if (match) {
      const ratingMatch = match[0].match(/(\d[,.]?\d?)/);
      if (ratingMatch) {
        const rating = parseFloat(ratingMatch[1].replace(",", "."));
        if (rating >= 1 && rating <= 5) {
          platformRatings.push({
            platform: "facebook",
            rating,
            verified: false,
          });
          break;
        }
      }
    }
  }

  // Trustpilot (usually 1-5 or TrustScore)
  const tpPatterns = [
    /trustpilot[^]*?(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?|score)/gi,
    /trustscore[:\s]*(\d[,.]?\d?)/gi,
    /(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?)\s*(?:op|on)?\s*trustpilot/gi,
  ];

  for (const pattern of tpPatterns) {
    const match = content.match(pattern);
    if (match) {
      const ratingMatch = match[0].match(/(\d[,.]?\d?)/);
      if (ratingMatch) {
        const rating = parseFloat(ratingMatch[1].replace(",", "."));
        if (rating >= 1 && rating <= 5) {
          platformRatings.push({
            platform: "trustpilot",
            rating,
            verified: false,
          });
          break;
        }
      }
    }
  }

  if (platformRatings.length === 0) return null;

  return { platformRatings };
}

// ============================================================================
// STAR SYMBOL PARSER
// ============================================================================

function parseStarSymbols(content: string): Partial<RatingResult> | null {
  // Full and empty star patterns
  const fullStars = ["★", "⭐", "🌟", "✩"];
  const halfStars = ["½", "⯨"];
  const emptyStars = ["☆", "✰"];

  // Count consecutive stars
  let maxRating = 0;
  let bestMatch: { rating: number; raw: string } | null = null;

  // Pattern for star sequences
  const starSequencePattern = /[★⭐🌟✩☆✰½⯨]{3,}/g;
  const matches = content.match(starSequencePattern) || [];

  for (const match of matches) {
    let fullCount = 0;
    let halfCount = 0;
    let emptyCount = 0;

    for (const char of match) {
      if (fullStars.includes(char)) fullCount++;
      else if (halfStars.includes(char)) halfCount++;
      else if (emptyStars.includes(char)) emptyCount++;
    }

    const total = fullCount + halfCount + emptyCount;
    if (total >= 3 && total <= 10) {
      const rating = fullCount + halfCount * 0.5;
      if (!bestMatch || rating > bestMatch.rating) {
        bestMatch = { rating, raw: match };
        maxRating = total;
      }
    }
  }

  // Also check for "★★★★☆" style with spaces
  const spaceStarPattern = /([★⭐🌟✩☆✰]\s*){3,}/g;
  const spaceMatches = content.match(spaceStarPattern) || [];

  for (const match of spaceMatches) {
    let fullCount = 0;
    let emptyCount = 0;

    for (const char of match) {
      if (fullStars.includes(char)) fullCount++;
      else if (emptyStars.includes(char)) emptyCount++;
    }

    const total = fullCount + emptyCount;
    if (total >= 3 && total <= 10) {
      if (!bestMatch || fullCount > bestMatch.rating) {
        bestMatch = { rating: fullCount, raw: match };
        maxRating = total;
      }
    }
  }

  if (!bestMatch) return null;

  // Normalize to 5-point scale if needed
  let normalizedRating = bestMatch.rating;
  if (maxRating === 10) {
    normalizedRating = normalizedRating / 2;
  }

  return {
    rating: normalizedRating,
    reviewCount: null,
    maxRating: maxRating <= 5 ? 5 : 10,
    raw: bestMatch.raw,
  };
}

// ============================================================================
// TEXT PATTERN PARSER
// ============================================================================

function parseTextPatterns(content: string): Partial<RatingResult> | null {
  const patterns = [
    // "4.8/5" or "4,8/5"
    /(\d[,.]?\d?)\s*\/\s*5/gi,
    // "4.8 out of 5"
    /(\d[,.]?\d?)\s*(?:out\s*of|van\s*de|von)\s*5/gi,
    // "4.8 sterren" / "4.8 stars" / "4.8 Sterne"
    /(\d[,.]?\d?)\s*(?:sterren|stars?|sterne)/gi,
    // "Rating: 4.8" / "Beoordeling: 4,8"
    /(?:rating|beoordeling|bewertung)[:\s]*(\d[,.]?\d?)/gi,
    // "Gemiddeld 4.8" / "Average 4.8"
    /(?:gemiddeld|average|durchschnitt)[:\s]*(\d[,.]?\d?)/gi,
    // "Score: 4.8"
    /score[:\s]*(\d[,.]?\d?)(?:\s*\/\s*5)?/gi,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const ratingMatch = match[0].match(/(\d[,.]?\d?)/);
      if (ratingMatch) {
        const rating = parseFloat(ratingMatch[1].replace(",", "."));
        if (rating >= 1 && rating <= 5) {
          // Try to find review count nearby
          const reviewCount = findNearbyReviewCount(content, match.index || 0);

          return {
            rating,
            reviewCount,
            maxRating: 5,
            raw: match[0],
          };
        }
      }
    }
  }

  return null;
}

function findNearbyReviewCount(content: string, position: number): number | null {
  // Look for review count within 100 characters of the rating
  const context = content.substring(Math.max(0, position - 50), Math.min(content.length, position + 150));

  const countPatterns = [
    /(\d+)\s*(?:reviews?|beoordelingen|bewertungen|recens)/gi,
    /(?:based on|gebaseerd op|basierend auf)\s*(\d+)/gi,
    /\((\d+)\s*reviews?\)/gi,
    /(\d+)\s*(?:klant)?(?:en)?beoordelingen/gi,
  ];

  for (const pattern of countPatterns) {
    const match = context.match(pattern);
    if (match) {
      const countMatch = match[0].match(/(\d+)/);
      if (countMatch) {
        const count = parseInt(countMatch[1], 10);
        if (count > 0 && count < 100000) {
          return count;
        }
      }
    }
  }

  return null;
}

// ============================================================================
// PLATFORM BADGE PARSER
// ============================================================================

function parsePlatformBadges(content: string): Partial<RatingResult> | null {
  const platformRatings: PlatformRating[] = [];
  const lowerContent = content.toLowerCase();

  // Check for each platform mention
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    if (patterns.length === 0) continue;

    for (const pattern of patterns) {
      if (pattern.test(content)) {
        // Found platform mention, try to extract rating nearby
        const platformContext = extractPlatformContext(content, platform);
        if (platformContext) {
          const rating = extractRatingFromContext(platformContext);
          if (rating) {
            platformRatings.push({
              platform: platform as RatingSource,
              rating: rating.value,
              reviewCount: rating.count || undefined,
              verified: false,
            });
            break;
          }
        }
      }
    }
  }

  if (platformRatings.length === 0) return null;

  return { platformRatings };
}

function extractPlatformContext(content: string, platform: string): string | null {
  const lowerContent = content.toLowerCase();
  const platformIndex = lowerContent.indexOf(platform.toLowerCase());

  if (platformIndex === -1) return null;

  // Get 150 characters before and after the platform mention
  return content.substring(
    Math.max(0, platformIndex - 100),
    Math.min(content.length, platformIndex + platform.length + 150)
  );
}

function extractRatingFromContext(context: string): { value: number; count?: number } | null {
  // Look for rating patterns
  const ratingPatterns = [
    /(\d[,.]?\d?)\s*(?:\/\s*5|sterren|stars?)/i,
    /rating[:\s]*(\d[,.]?\d?)/i,
    /score[:\s]*(\d[,.]?\d?)/i,
  ];

  for (const pattern of ratingPatterns) {
    const match = context.match(pattern);
    if (match) {
      const value = parseFloat(match[1].replace(",", "."));
      if (value >= 1 && value <= 5) {
        // Try to find review count
        const countMatch = context.match(/(\d+)\s*(?:reviews?|beoordelingen)/i);
        const count = countMatch ? parseInt(countMatch[1], 10) : undefined;

        return { value, count };
      }
    }
  }

  return null;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function combinePlatformRatings(ratings: PlatformRating[]): RatingResult {
  if (ratings.length === 0) {
    return {
      rating: null,
      reviewCount: null,
      maxRating: 5,
      source: "unknown",
      confidence: 0,
    };
  }

  // Weight ratings by platform reliability
  const weights: Record<RatingSource, number> = {
    google: 1.0,
    trustpilot: 0.9,
    facebook: 0.8,
    tripadvisor: 0.85,
    yelp: 0.85,
    schema_org: 1.0,
    star_symbols: 0.5,
    text_pattern: 0.4,
    widget: 0.7,
    unknown: 0.3,
  };

  let totalWeight = 0;
  let weightedSum = 0;
  let totalReviews = 0;
  let primarySource: RatingSource = "unknown";
  let maxWeight = 0;

  for (const rating of ratings) {
    const weight = weights[rating.platform] || 0.5;
    weightedSum += rating.rating * weight;
    totalWeight += weight;

    if (rating.reviewCount) {
      totalReviews += rating.reviewCount;
    }

    if (weight > maxWeight) {
      maxWeight = weight;
      primarySource = rating.platform;
    }
  }

  const averageRating = totalWeight > 0 ? weightedSum / totalWeight : null;

  return {
    rating: averageRating ? Math.round(averageRating * 10) / 10 : null,
    reviewCount: totalReviews > 0 ? totalReviews : null,
    maxRating: 5,
    source: primarySource,
    confidence: Math.min(90, 50 + ratings.length * 15),
    platformRatings: ratings,
  };
}

/**
 * Normalize rating to 5-point scale
 */
export function normalizeRating(rating: number, maxRating: number): number {
  if (maxRating === 5) return rating;
  if (maxRating === 10) return rating / 2;
  if (maxRating === 100) return rating / 20;
  return (rating / maxRating) * 5;
}

/**
 * Format rating for display
 */
export function formatRating(rating: number, locale = "en"): string {
  return rating.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
