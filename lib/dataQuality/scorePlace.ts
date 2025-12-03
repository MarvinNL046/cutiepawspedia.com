/**
 * Data Quality Scoring Engine
 *
 * Computes a quality score (0-100) for places based on completeness
 * of their data fields.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PlaceDataQualityInput {
  hasAddress: boolean;
  hasPhone: boolean;
  hasWebsite: boolean;
  hasOpeningHours: boolean;
  hasRating: boolean;
  hasReviews: boolean;
  hasPhotos: boolean;
  hasDescription: boolean;
  hasEmail: boolean;
  hasCoordinates: boolean;
  lastUpdatedAt?: Date | null;
}

export interface PlaceDataQualityResult {
  score: number; // 0-100
  flags: string[]; // e.g., ["NO_RATING", "MISSING_OPENING_HOURS"]
}

// ============================================================================
// FLAG DEFINITIONS
// ============================================================================

export const DATA_QUALITY_FLAGS = {
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
  STALE_DATA: "STALE_DATA",
} as const;

export type DataQualityFlag = (typeof DATA_QUALITY_FLAGS)[keyof typeof DATA_QUALITY_FLAGS];

// ============================================================================
// SCORING WEIGHTS
// ============================================================================

const SCORE_WEIGHTS = {
  // Essential fields (high weight)
  address: 15,
  phone: 10,
  website: 10,
  openingHours: 15, // Important for user experience
  rating: 15, // Critical for trust

  // Important fields (medium weight)
  reviews: 10,
  photos: 10,
  description: 10,

  // Nice-to-have fields (lower weight)
  email: 5,
  coordinates: 10,
};

// Base score when all fields are missing
const BASE_SCORE = 0;

// Stale data threshold (30 days)
const STALE_THRESHOLD_DAYS = 30;

// ============================================================================
// SCORING FUNCTION
// ============================================================================

/**
 * Calculate data quality score for a place
 *
 * Scoring breakdown (total 100 points):
 * - Address: 15 points
 * - Opening Hours: 15 points
 * - Rating: 15 points
 * - Phone: 10 points
 * - Website: 10 points
 * - Reviews: 10 points
 * - Photos: 10 points
 * - Description: 10 points
 * - Coordinates: 10 points (for maps)
 * - Email: 5 points
 *
 * Additional penalties:
 * - Stale data (>30 days without refresh): -10 points
 */
export function scorePlace(input: PlaceDataQualityInput): PlaceDataQualityResult {
  let score = BASE_SCORE;
  const flags: DataQualityFlag[] = [];

  // Essential fields
  if (input.hasAddress) {
    score += SCORE_WEIGHTS.address;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_ADDRESS);
  }

  if (input.hasPhone) {
    score += SCORE_WEIGHTS.phone;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_PHONE);
  }

  if (input.hasWebsite) {
    score += SCORE_WEIGHTS.website;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_WEBSITE);
  }

  if (input.hasOpeningHours) {
    score += SCORE_WEIGHTS.openingHours;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_OPENING_HOURS);
  }

  if (input.hasRating) {
    score += SCORE_WEIGHTS.rating;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_RATING);
  }

  // Important fields
  if (input.hasReviews) {
    score += SCORE_WEIGHTS.reviews;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_REVIEWS);
  }

  if (input.hasPhotos) {
    score += SCORE_WEIGHTS.photos;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_PHOTOS);
  }

  if (input.hasDescription) {
    score += SCORE_WEIGHTS.description;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_DESCRIPTION);
  }

  // Nice-to-have fields
  if (input.hasEmail) {
    score += SCORE_WEIGHTS.email;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_EMAIL);
  }

  if (input.hasCoordinates) {
    score += SCORE_WEIGHTS.coordinates;
  } else {
    flags.push(DATA_QUALITY_FLAGS.NO_COORDINATES);
  }

  // Check for stale data
  if (input.lastUpdatedAt) {
    const daysSinceUpdate = Math.floor(
      (Date.now() - input.lastUpdatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceUpdate > STALE_THRESHOLD_DAYS) {
      flags.push(DATA_QUALITY_FLAGS.STALE_DATA);
      // Penalty for stale data
      score = Math.max(0, score - 10);
    }
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    flags,
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Determine if a place needs refresh based on quality score
 */
export function needsRefresh(score: number): boolean {
  return score < 70;
}

/**
 * Determine refresh priority based on score
 * Lower score = higher priority (returned as higher number)
 */
export function getRefreshPriority(score: number): number {
  if (score < 30) return 3; // Critical - very poor data
  if (score < 50) return 2; // High - significant gaps
  if (score < 70) return 1; // Medium - needs improvement
  return 0; // Low - acceptable quality
}

/**
 * Get human-readable quality level
 */
export function getQualityLevel(score: number): "critical" | "poor" | "fair" | "good" | "excellent" {
  if (score < 30) return "critical";
  if (score < 50) return "poor";
  if (score < 70) return "fair";
  if (score < 85) return "good";
  return "excellent";
}

/**
 * Get flag description for display
 */
export function getFlagDescription(flag: DataQualityFlag): string {
  const descriptions: Record<DataQualityFlag, string> = {
    NO_ADDRESS: "Missing address",
    NO_PHONE: "Missing phone number",
    NO_WEBSITE: "Missing website",
    NO_OPENING_HOURS: "Missing opening hours",
    NO_RATING: "No rating available",
    NO_REVIEWS: "No reviews yet",
    NO_PHOTOS: "No photos",
    NO_DESCRIPTION: "Missing description",
    NO_EMAIL: "Missing email",
    NO_COORDINATES: "Missing coordinates",
    STALE_DATA: "Data is outdated (>30 days)",
  };
  return descriptions[flag] || flag;
}
