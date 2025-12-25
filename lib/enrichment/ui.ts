/**
 * Enrichment UI Helpers - P0.4
 *
 * Helper functions for displaying enriched data on the place page.
 * Provides fallback logic and source extraction from flags.
 */

import { ENRICHMENT_FLAGS } from "./flags";

// ============================================================================
// TYPES
// ============================================================================

export interface PlaceData {
  name: string;
  description?: string | null;
  openingHours?: Record<string, string> | null;
  avgRating?: string | number | null;
  reviewCount?: number | null;
  dataQualityFlags?: string[] | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

// Enriched content from Jina+GPT scraping
export interface ScrapedContent {
  aboutUs?: string;
  services?: string[];
  highlights?: string[];
  contentSource?: string;
  contentLanguage?: string;
  contentGeneratedAt?: string;
}

export interface AIContent {
  intro?: string;
  secondary?: string;
  bullets?: string[];
}

export interface OpeningHoursDisplay {
  day: string;
  dayShort: string;
  hours: string;
  isOpen: boolean;
  isClosed: boolean;
  is24h: boolean;
}

// ============================================================================
// ABOUT SECTION HELPERS
// ============================================================================

/**
 * Get the best available about text with fallback logic
 * Priority: 1. scrapedContent.aboutUs (Jina+GPT enriched) → 2. description (if long enough) → 3. AI content intro → 4. default text
 */
export function getBestAboutText(
  place: PlaceData,
  aiContent?: AIContent,
  scrapedContent?: ScrapedContent
): { text: string; source: "enriched" | "ai" | "default" } {
  // Priority 1: Use Jina+GPT enriched aboutUs content (highest quality, 400+ words)
  if (scrapedContent?.aboutUs && scrapedContent.aboutUs.trim().length > 200) {
    return { text: scrapedContent.aboutUs.trim(), source: "enriched" };
  }

  // Priority 2: Check if description exists and is substantial (more than just a short tagline)
  if (place.description && place.description.trim().length > 100) {
    return { text: place.description.trim(), source: "enriched" };
  }

  // Priority 3: Fall back to AI-generated content
  if (aiContent?.intro) {
    const fullAiText = [aiContent.intro, aiContent.secondary]
      .filter(Boolean)
      .join(" ");
    return { text: fullAiText, source: "ai" };
  }

  // Default fallback
  return {
    text: `${place.name} is a pet-related business. Contact them directly for more information about their services.`,
    source: "default",
  };
}

/**
 * Check if the about section has enriched content
 */
export function hasEnrichedAbout(flags: string[] | null | undefined): boolean {
  if (!flags) return false;
  return (
    flags.includes(ENRICHMENT_FLAGS.ABOUT_SECTION_FOUND) ||
    flags.includes(ENRICHMENT_FLAGS.ABOUT_SECTION_SUMMARIZED)
  );
}

// ============================================================================
// OPENING HOURS HELPERS
// ============================================================================

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_NAMES: Record<string, Record<string, { full: string; short: string }>> = {
  en: {
    mon: { full: "Monday", short: "Mon" },
    tue: { full: "Tuesday", short: "Tue" },
    wed: { full: "Wednesday", short: "Wed" },
    thu: { full: "Thursday", short: "Thu" },
    fri: { full: "Friday", short: "Fri" },
    sat: { full: "Saturday", short: "Sat" },
    sun: { full: "Sunday", short: "Sun" },
  },
  nl: {
    mon: { full: "Maandag", short: "Ma" },
    tue: { full: "Dinsdag", short: "Di" },
    wed: { full: "Woensdag", short: "Wo" },
    thu: { full: "Donderdag", short: "Do" },
    fri: { full: "Vrijdag", short: "Vr" },
    sat: { full: "Zaterdag", short: "Za" },
    sun: { full: "Zondag", short: "Zo" },
  },
};

/**
 * Get the current day of week as our key format
 */
function getCurrentDayKey(): string {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date().getDay()];
}

/**
 * Format opening hours to display array
 */
export function formatOpeningHours(
  hours: Record<string, string> | null | undefined,
  locale: string = "en"
): OpeningHoursDisplay[] {
  if (!hours || Object.keys(hours).length === 0) return [];

  const dayNames = DAY_NAMES[locale] || DAY_NAMES.en;

  return DAY_ORDER.map((day) => {
    const hourValue = hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];
    const dayInfo = dayNames[day];

    if (!hourValue) {
      return {
        day: dayInfo.full,
        dayShort: dayInfo.short,
        hours: locale === "nl" ? "Onbekend" : "Unknown",
        isOpen: false,
        isClosed: false,
        is24h: false,
      };
    }

    const lowerHour = hourValue.toLowerCase();
    const isClosed =
      lowerHour === "closed" ||
      lowerHour === "gesloten" ||
      lowerHour === "dicht" ||
      lowerHour === "geschlossen";
    const is24h = lowerHour.includes("24") || lowerHour === "00:00-24:00";

    return {
      day: dayInfo.full,
      dayShort: dayInfo.short,
      hours: isClosed
        ? locale === "nl"
          ? "Gesloten"
          : "Closed"
        : is24h
          ? locale === "nl"
            ? "24 uur"
            : "24 hours"
          : hourValue,
      isOpen: !isClosed,
      isClosed,
      is24h,
    };
  });
}

/**
 * Get today's opening hours status
 */
export function getTodayStatus(
  hours: Record<string, string> | null | undefined,
  locale: string = "en"
): { text: string; isOpen: boolean; isUnknown: boolean } {
  if (!hours || Object.keys(hours).length === 0) {
    return {
      text:
        locale === "nl"
          ? "Openingstijden onbekend"
          : "Opening hours unknown",
      isOpen: false,
      isUnknown: true,
    };
  }

  const todayKey = getCurrentDayKey();
  const todayHours =
    hours[todayKey] || hours[todayKey.charAt(0).toUpperCase() + todayKey.slice(1)];

  if (!todayHours) {
    return {
      text:
        locale === "nl"
          ? "Openingstijden onbekend"
          : "Opening hours unknown",
      isOpen: false,
      isUnknown: true,
    };
  }

  const lowerHour = todayHours.toLowerCase();
  const isClosed =
    lowerHour === "closed" ||
    lowerHour === "gesloten" ||
    lowerHour === "dicht";

  if (isClosed) {
    return {
      text: locale === "nl" ? "Vandaag gesloten" : "Closed today",
      isOpen: false,
      isUnknown: false,
    };
  }

  const dayLabel = locale === "nl" ? "Vandaag" : "Today";
  return {
    text: `${dayLabel}: ${todayHours}`,
    isOpen: true,
    isUnknown: false,
  };
}

/**
 * Get the source of opening hours from flags
 */
export function getOpeningHoursSource(
  flags: string[] | null | undefined
): { source: string; reliability: "high" | "medium" | "low" } | null {
  if (!flags) return null;

  if (flags.includes(ENRICHMENT_FLAGS.OPENING_HOURS_VIA_SCHEMA)) {
    return { source: "Schema.org", reliability: "high" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.OPENING_HOURS_VIA_TABLE)) {
    return { source: "Website Table", reliability: "high" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.OPENING_HOURS_VIA_JINA)) {
    return { source: "Jina AI", reliability: "medium" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.OPENING_HOURS_VIA_REGEX)) {
    return { source: "Pattern Match", reliability: "low" };
  }

  return null;
}

/**
 * Check if opening hours data exists
 */
export function hasOpeningHours(
  hours: Record<string, string> | null | undefined
): boolean {
  return hours !== null && hours !== undefined && Object.keys(hours).length > 0;
}

// ============================================================================
// RATING HELPERS
// ============================================================================

/**
 * Get the source of rating from flags
 */
export function getRatingSource(
  flags: string[] | null | undefined
): { source: string; icon?: string } | null {
  if (!flags) return null;

  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_GOOGLE)) {
    return { source: "Google", icon: "google" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_FACEBOOK)) {
    return { source: "Facebook", icon: "facebook" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_TRUSTPILOT)) {
    return { source: "Trustpilot", icon: "trustpilot" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_SCHEMA)) {
    return { source: "Website", icon: "globe" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_STARS)) {
    return { source: "Website Stars", icon: "star" };
  }
  if (flags.includes(ENRICHMENT_FLAGS.RATING_VIA_TEXT)) {
    return { source: "Website", icon: "globe" };
  }

  return null;
}

/**
 * Format rating for display
 */
export function formatRating(rating: string | number | null | undefined): {
  value: number;
  display: string;
  hasRating: boolean;
} {
  if (rating === null || rating === undefined) {
    return { value: 0, display: "0.0", hasRating: false };
  }

  const numRating = typeof rating === "string" ? parseFloat(rating) : rating;

  if (isNaN(numRating) || numRating <= 0) {
    return { value: 0, display: "0.0", hasRating: false };
  }

  return {
    value: numRating,
    display: numRating.toFixed(1),
    hasRating: true,
  };
}

// ============================================================================
// SERVICE BADGES
// ============================================================================

/**
 * Generate service badges from enriched content, categories and description
 * Priority: 1. scrapedContent.services (real services from website) → 2. categories → 3. description keywords
 */
export function getServiceBadges(
  categories: Array<{ slug: string; labelKey: string }> | undefined,
  description?: string | null,
  scrapedContent?: ScrapedContent
): string[] {
  // Priority 1: Use enriched services from Jina+GPT (real services from website)
  if (scrapedContent?.services && scrapedContent.services.length > 0) {
    // Return unique enriched services, max 8 (they're more accurate)
    return [...new Set(scrapedContent.services)].slice(0, 8);
  }

  // Fallback: Generate from categories and description
  const badges: string[] = [];

  // Add category-based badges
  if (categories) {
    for (const cat of categories) {
      // Map category slugs to user-friendly service names
      const serviceMap: Record<string, string[]> = {
        "pet-store": ["Pet Supplies", "Pet Food"],
        "grooming": ["Pet Grooming", "Styling"],
        "veterinary": ["Veterinary Care", "Health Services"],
        "pet-hotel": ["Pet Boarding", "Daycare"],
        "dog-training": ["Dog Training", "Behavior"],
        "pet-sitting": ["Pet Sitting", "Home Visits"],
        "pet-adoption": ["Pet Adoption", "Rescue"],
        "pet-photography": ["Pet Photography"],
        "pet-transport": ["Pet Transport"],
        "pet-insurance": ["Pet Insurance"],
      };

      const services = serviceMap[cat.slug];
      if (services) {
        badges.push(...services);
      }
    }
  }

  // Extract additional services from description keywords
  if (description) {
    const lowerDesc = description.toLowerCase();
    const keywordMap: Record<string, string> = {
      "grooming": "Grooming",
      "trimmen": "Trimmen",
      "training": "Training",
      "daycare": "Daycare",
      "opvang": "Opvang",
      "pension": "Pension",
      "voer": "Diervoeding",
      "food": "Pet Food",
      "accessoires": "Accessoires",
      "accessories": "Accessories",
      "advice": "Expert Advice",
      "advies": "Advies",
    };

    for (const [keyword, badge] of Object.entries(keywordMap)) {
      if (lowerDesc.includes(keyword) && !badges.includes(badge)) {
        badges.push(badge);
      }
    }
  }

  // Return unique badges, max 6
  return [...new Set(badges)].slice(0, 6);
}

// ============================================================================
// HIGHLIGHTS
// ============================================================================

/**
 * Generate highlights based on available data
 * Priority: 1. scrapedContent.highlights (real USPs from website) → 2. AI bullets → 3. derived from ratings/reviews
 */
export function getHighlights(
  place: PlaceData,
  aiContent?: AIContent,
  locale: string = "en",
  scrapedContent?: ScrapedContent
): string[] {
  // Priority 1: Use enriched highlights from Jina+GPT (real USPs from website)
  if (scrapedContent?.highlights && scrapedContent.highlights.length > 0) {
    // Return enriched highlights, max 6 (they're more accurate and specific)
    return [...scrapedContent.highlights].slice(0, 6);
  }

  // Fallback: Generate from AI content and place data
  const highlights: string[] = [];

  // Add AI-generated bullets if available
  if (aiContent?.bullets && aiContent.bullets.length > 0) {
    highlights.push(...aiContent.bullets.slice(0, 3));
  }

  // Add rating-based highlight
  const rating = formatRating(place.avgRating);
  if (rating.hasRating && rating.value >= 4.0) {
    highlights.push(
      locale === "nl"
        ? `Hoog gewaardeerd met ${rating.display} sterren`
        : `Highly rated with ${rating.display} stars`
    );
  }

  // Add review count highlight
  if (place.reviewCount && place.reviewCount >= 10) {
    highlights.push(
      locale === "nl"
        ? `${place.reviewCount}+ tevreden klanten`
        : `${place.reviewCount}+ satisfied customers`
    );
  }

  // Add website highlight
  if (place.website) {
    highlights.push(
      locale === "nl"
        ? "Online aanwezigheid beschikbaar"
        : "Online presence available"
    );
  }

  // Return max 5 highlights
  return highlights.slice(0, 5);
}

// ============================================================================
// ENRICHMENT STATUS
// ============================================================================

/**
 * Get overall enrichment status from flags
 */
export function getEnrichmentStatus(flags: string[] | null | undefined): {
  status: "complete" | "partial" | "minimal" | "none";
  label: string;
  color: "green" | "yellow" | "orange" | "gray";
} {
  if (!flags || flags.length === 0) {
    return { status: "none", label: "No enrichment", color: "gray" };
  }

  if (flags.includes(ENRICHMENT_FLAGS.ENRICHMENT_COMPLETE)) {
    return { status: "complete", label: "Fully enriched", color: "green" };
  }

  if (flags.includes(ENRICHMENT_FLAGS.ENRICHMENT_PARTIAL)) {
    return { status: "partial", label: "Partially enriched", color: "yellow" };
  }

  // Check for source indicators
  const sourceFlags = [
    ENRICHMENT_FLAGS.SCHEMA_ORG_FOUND,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_SCHEMA,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_TABLE,
    ENRICHMENT_FLAGS.OPENING_HOURS_VIA_JINA,
    ENRICHMENT_FLAGS.RATING_VIA_GOOGLE,
    ENRICHMENT_FLAGS.RATING_VIA_SCHEMA,
    ENRICHMENT_FLAGS.ABOUT_SECTION_FOUND,
  ];

  const hasSourceFlags = sourceFlags.some((f) => flags.includes(f));
  if (hasSourceFlags) {
    return { status: "partial", label: "Some data enriched", color: "yellow" };
  }

  return { status: "minimal", label: "Basic data only", color: "orange" };
}
