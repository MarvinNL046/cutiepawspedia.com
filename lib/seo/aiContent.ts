/**
 * AI Content Engine for CutiePawsPedia
 *
 * Centralized data-driven SEO content generation layer.
 * Generates localized, SEO-friendly text based on real data.
 *
 * Features:
 * - Type-safe content inputs per page scope
 * - Multi-language support (NL, EN, DE-ready)
 * - Safe fallbacks without AI dependency
 * - Data-enriched templates with counts, ratings, categories
 */

// =============================================================================
// CONTENT SCOPE TYPES
// =============================================================================

/**
 * All supported page scopes for AI content generation
 */
export type AiContentScope =
  | "home"
  | "country"
  | "city"
  | "category-city"
  | "category-country"
  | "best-category-city"
  | "best-category-country"
  | "top-category-country"
  | "place";

/**
 * Supported locales for content generation
 */
export type ContentLocale = "nl" | "en" | "de";

// =============================================================================
// CONTENT INPUT TYPES
// =============================================================================

/**
 * Base input interface - all content inputs extend this
 */
export interface AiContentInputBase {
  locale: ContentLocale;
}

/**
 * Home page content input
 */
export interface HomeContentInput extends AiContentInputBase {
  totalCountries: number;
  totalCities: number;
  totalPlaces: number;
  topCategories?: Array<{ slug: string; name: string; count: number }>;
}

/**
 * Country page content input
 */
export interface CountryContentInput extends AiContentInputBase {
  countryName: string;
  countrySlug: string;
  totalCities: number;
  totalPlaces: number;
  topCategories: Array<{ slug: string; name: string; count: number }>;
}

/**
 * City page content input
 */
export interface CityContentInput extends AiContentInputBase {
  cityName: string;
  countryName: string;
  countrySlug: string;
  totalPlaces: number;
  categoryStats: Array<{ slug: string; name: string; count: number }>;
}

/**
 * Category in city page content input (e.g., /nl/netherlands/amsterdam/veterinary)
 */
export interface CategoryCityContentInput extends AiContentInputBase {
  cityName: string;
  countryName: string;
  categoryName: string;
  categorySlug: string;
  totalPlaces: number;
  avgRating?: number;
  topRatedPlace?: {
    name: string;
    rating: number;
  };
}

/**
 * Category in country page content input (e.g., /nl/netherlands/c/veterinary)
 */
export interface CategoryCountryContentInput extends AiContentInputBase {
  countryName: string;
  categoryName: string;
  categorySlug: string;
  totalPlaces: number;
  totalCities: number;
  avgRating?: number;
  topCities?: Array<{ name: string; count: number }>;
}

/**
 * Best of category content input (city or country level)
 */
export interface BestCategoryContentInput extends AiContentInputBase {
  cityName?: string; // undefined = country level
  countryName: string;
  categoryName: string;
  categorySlug: string;
  totalRanked: number;
  highlightedPlaces: Array<{
    name: string;
    rating?: number;
    reviewCount?: number;
    cityName?: string; // for country-level lists
  }>;
}

/**
 * Top N category content input (e.g., Top 10 Vets in Netherlands)
 */
export interface TopCategoryContentInput extends AiContentInputBase {
  countryName: string;
  categoryName: string;
  categorySlug: string;
  topCount: number;
  highlightedPlaces: Array<{
    name: string;
    rating?: number;
    reviewCount?: number;
    cityName: string;
  }>;
  year?: number; // e.g., 2025
}

/**
 * Place detail page content input
 */
export interface PlaceContentInput extends AiContentInputBase {
  placeName: string;
  placeSlug: string;
  cityName: string;
  countryName: string;
  categories: string[];
  rating?: number;
  reviewCount?: number;
  description?: string; // existing description from DB/Jina
  aboutUs?: string; // E-E-A-T content from Jina+GPT enrichment
  address?: string;
  services?: string[];
  petTypes?: string[];
  openingHours?: string;
  priceRange?: "budget" | "moderate" | "premium";
}

// =============================================================================
// CONTENT OUTPUT TYPES
// =============================================================================

/**
 * Result structure for generated content
 */
export interface AiContentResult {
  /** Main intro paragraph */
  intro: string;
  /** Optional secondary paragraph */
  secondary?: string;
  /** Optional bullet points */
  bullets?: string[];
  /** Optional call-to-action text */
  cta?: string;
}

/**
 * Extended result with SEO-specific fields
 */
export interface SeoContentResult extends AiContentResult {
  /** Meta description (max 160 chars) */
  metaDescription?: string;
  /** H1 heading suggestion */
  h1?: string;
  /** Schema.org description */
  schemaDescription?: string;
}

// =============================================================================
// UNION TYPES FOR TYPE-SAFE HANDLING
// =============================================================================

/**
 * Union of all content input types
 */
export type AiContentInput =
  | HomeContentInput
  | CountryContentInput
  | CityContentInput
  | CategoryCityContentInput
  | CategoryCountryContentInput
  | BestCategoryContentInput
  | TopCategoryContentInput
  | PlaceContentInput;

/**
 * Map scope to its input type for type-safe functions
 */
export interface ContentInputMap {
  home: HomeContentInput;
  country: CountryContentInput;
  city: CityContentInput;
  "category-city": CategoryCityContentInput;
  "category-country": CategoryCountryContentInput;
  "best-category-city": BestCategoryContentInput;
  "best-category-country": BestCategoryContentInput;
  "top-category-country": TopCategoryContentInput;
  place: PlaceContentInput;
}

// =============================================================================
// LOCALIZATION HELPERS
// =============================================================================

/**
 * Common localized strings used across templates
 */
export const LOCALIZED_STRINGS = {
  nl: {
    discover: "Ontdek",
    find: "Vind",
    best: "beste",
    top: "top",
    in: "in",
    and: "en",
    more: "meer",
    places: "locaties",
    reviews: "reviews",
    rating: "beoordeling",
    services: "diensten",
    viewAll: "Bekijk alle",
    basedOn: "Gebaseerd op",
    including: "waaronder",
    withRating: "met een beoordeling van",
    totalOf: "in totaal",
    acrossCategories: "in verschillende categorieën",
    topRated: "Hoogst beoordeeld",
    sortedByReviews: "Gesorteerd op reviews en beoordelingen",
    categories: "categorieën",
    cities: "steden",
    countries: "landen",
    petServices: "huisdierdiensten",
    veterinarians: "dierenartsen",
    petStores: "dierenwinkels",
    groomers: "trimsalons",
    forYourPet: "voor je huisdier",
    nearYou: "bij jou in de buurt",
    trusted: "Vertrouwde",
    recommended: "Aanbevolen",
    popular: "Populair",
  },
  en: {
    discover: "Discover",
    find: "Find",
    best: "best",
    top: "top",
    in: "in",
    and: "and",
    more: "more",
    places: "places",
    reviews: "reviews",
    rating: "rating",
    services: "services",
    viewAll: "View all",
    basedOn: "Based on",
    including: "including",
    withRating: "with a rating of",
    totalOf: "a total of",
    acrossCategories: "across different categories",
    topRated: "Top rated",
    sortedByReviews: "Sorted by reviews and ratings",
    categories: "categories",
    cities: "cities",
    countries: "countries",
    petServices: "pet services",
    veterinarians: "veterinarians",
    petStores: "pet stores",
    groomers: "pet groomers",
    forYourPet: "for your pet",
    nearYou: "near you",
    trusted: "Trusted",
    recommended: "Recommended",
    popular: "Popular",
  },
  de: {
    discover: "Entdecken",
    find: "Finden",
    best: "beste",
    top: "top",
    in: "in",
    and: "und",
    more: "mehr",
    places: "Orte",
    reviews: "Bewertungen",
    rating: "Bewertung",
    services: "Dienste",
    viewAll: "Alle anzeigen",
    basedOn: "Basierend auf",
    including: "einschließlich",
    withRating: "mit einer Bewertung von",
    totalOf: "insgesamt",
    acrossCategories: "in verschiedenen Kategorien",
    topRated: "Bestbewertet",
    sortedByReviews: "Sortiert nach Bewertungen",
    categories: "Kategorien",
    cities: "Städte",
    countries: "Länder",
    petServices: "Haustierdienste",
    veterinarians: "Tierärzte",
    petStores: "Tierhandlungen",
    groomers: "Tierfriseure",
    forYourPet: "für Ihr Haustier",
    nearYou: "in Ihrer Nähe",
    trusted: "Vertrauenswürdig",
    recommended: "Empfohlen",
    popular: "Beliebt",
  },
} as const;

/**
 * Get localized strings for a given locale
 */
export function getLocalizedStrings(locale: ContentLocale) {
  return LOCALIZED_STRINGS[locale] || LOCALIZED_STRINGS.en;
}

// =============================================================================
// CATEGORY NAME LOCALIZATION
// =============================================================================

/**
 * Localized category names
 * Supports both singular and plural slug variants
 */
export const CATEGORY_NAMES: Record<string, Record<ContentLocale, string>> = {
  // Veterinary services
  veterinary: { nl: "Dierenartsen", en: "Veterinarians", de: "Tierärzte" },
  veterinarians: { nl: "Dierenartsen", en: "Veterinarians", de: "Tierärzte" },
  vet: { nl: "Dierenartsen", en: "Veterinarians", de: "Tierärzte" },

  // Pet stores/shops
  "pet-store": { nl: "Dierenwinkels", en: "Pet Stores", de: "Tierhandlungen" },
  "pet-stores": { nl: "Dierenwinkels", en: "Pet Stores", de: "Tierhandlungen" },
  "pet-shops": { nl: "Dierenwinkels", en: "Pet Shops", de: "Tiergeschäfte" },
  "pet-shop": { nl: "Dierenwinkel", en: "Pet Shop", de: "Tiergeschäft" },

  // Grooming services
  grooming: { nl: "Trimsalons", en: "Pet Grooming", de: "Tierfriseure" },
  "pet-grooming": { nl: "Trimsalons", en: "Pet Grooming", de: "Tierfriseure" },
  groomers: { nl: "Trimsalons", en: "Pet Groomers", de: "Tierfriseure" },

  // Animal shelters
  "animal-shelter": { nl: "Dierenopvang", en: "Animal Shelters", de: "Tierheime" },
  "animal-shelters": { nl: "Dierenopvang", en: "Animal Shelters", de: "Tierheime" },
  shelter: { nl: "Dierenopvang", en: "Animal Shelters", de: "Tierheime" },
  shelters: { nl: "Dierenopvang", en: "Animal Shelters", de: "Tierheime" },

  // Boarding/hotels
  boarding: { nl: "Dierenpensions", en: "Pet Boarding", de: "Tierpensionen" },
  "pet-boarding": { nl: "Dierenpensions", en: "Pet Boarding", de: "Tierpensionen" },
  "pet-hotels": { nl: "Dierenpensions", en: "Pet Hotels", de: "Tierhotels" },
  "pet-hotel": { nl: "Dierenpension", en: "Pet Hotel", de: "Tierhotel" },

  // Dog parks
  "dog-park": { nl: "Hondenuitlaatgebieden", en: "Dog Parks", de: "Hundeparks" },
  "dog-parks": { nl: "Hondenuitlaatgebieden", en: "Dog Parks", de: "Hundeparks" },

  // Pet cafes
  "pet-cafe": { nl: "Huisdiervriendelijke cafés", en: "Pet-friendly Cafes", de: "Haustierfreundliche Cafés" },
  "pet-cafes": { nl: "Huisdiervriendelijke cafés", en: "Pet-friendly Cafes", de: "Haustierfreundliche Cafés" },

  // Pet cemeteries
  cemetery: { nl: "Dierenbegraafplaatsen", en: "Pet Cemeteries", de: "Tierfriedhöfe" },
  "pet-cemetery": { nl: "Dierenbegraafplaats", en: "Pet Cemetery", de: "Tierfriedhof" },
  "pet-cemeteries": { nl: "Dierenbegraafplaatsen", en: "Pet Cemeteries", de: "Tierfriedhöfe" },

  // Training services
  training: { nl: "Hondentraining", en: "Dog Training", de: "Hundetraining" },
  "dog-training": { nl: "Hondentraining", en: "Dog Training", de: "Hundetraining" },

  // Dog walking
  "dog-walking": { nl: "Hondenuitlaatservice", en: "Dog Walking", de: "Hundeausführservice" },
  "dog-walkers": { nl: "Hondenuitlaatservice", en: "Dog Walkers", de: "Hundeausführer" },

  // Pet sitting
  "pet-sitting": { nl: "Huisdierverzorging", en: "Pet Sitting", de: "Tierbetreuung" },
  "pet-sitters": { nl: "Huisdieroppas", en: "Pet Sitters", de: "Tiersitter" },

  // Pet photography
  "pet-photography": { nl: "Huisdierfotografie", en: "Pet Photography", de: "Tierfotografie" },

  // Pet insurance
  "pet-insurance": { nl: "Huisdierverzekering", en: "Pet Insurance", de: "Tierversicherung" },

  // Emergency services
  "emergency-vet": { nl: "Spoeddierenarts", en: "Emergency Vet", de: "Notfall-Tierarzt" },
  "24h-vet": { nl: "24-uurs Dierenarts", en: "24h Veterinarian", de: "24h Tierarzt" },
};

/**
 * Get localized category name
 */
export function getLocalizedCategoryName(
  slug: string,
  locale: ContentLocale
): string {
  return (
    CATEGORY_NAMES[slug]?.[locale] ||
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format a number with locale-appropriate separators
 */
export function formatNumber(num: number, locale: ContentLocale): string {
  return num.toLocaleString(locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US");
}

/**
 * Format a rating to one decimal place
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Create a comma-separated list with proper "and" conjunction
 */
export function formatList(items: string[], locale: ContentLocale): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    const strings = getLocalizedStrings(locale);
    return `${items[0]} ${strings.and} ${items[1]}`;
  }
  const lastItem = items[items.length - 1];
  const strings = getLocalizedStrings(locale);
  return `${items.slice(0, -1).join(", ")} ${strings.and} ${lastItem}`;
}

/**
 * Truncate text to a maximum length, preserving word boundaries
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isHomeContentInput(input: AiContentInput): input is HomeContentInput {
  return "totalCountries" in input && "totalCities" in input && "totalPlaces" in input;
}

export function isCountryContentInput(input: AiContentInput): input is CountryContentInput {
  return "countryName" in input && "topCategories" in input && !("cityName" in input);
}

export function isCityContentInput(input: AiContentInput): input is CityContentInput {
  return "cityName" in input && "categoryStats" in input;
}

export function isCategoryCityContentInput(input: AiContentInput): input is CategoryCityContentInput {
  return "cityName" in input && "categoryName" in input && "totalPlaces" in input && !("highlightedPlaces" in input);
}

export function isCategoryCountryContentInput(input: AiContentInput): input is CategoryCountryContentInput {
  return "countryName" in input && "categoryName" in input && "totalCities" in input && !("cityName" in input);
}

export function isBestCategoryContentInput(input: AiContentInput): input is BestCategoryContentInput {
  return "highlightedPlaces" in input && "totalRanked" in input;
}

export function isTopCategoryContentInput(input: AiContentInput): input is TopCategoryContentInput {
  return "topCount" in input && "highlightedPlaces" in input;
}

export function isPlaceContentInput(input: AiContentInput): input is PlaceContentInput {
  return "placeName" in input && "placeSlug" in input;
}
