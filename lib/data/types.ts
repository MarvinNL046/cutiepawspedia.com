/**
 * Shared Types for CutiePawsPedia Data Pipeline
 *
 * These types represent data at various stages of the ingestion pipeline:
 * - Raw types: Direct from external sources (OSM, PDOK, Bright Data, Jina)
 * - Staged type: Merged and normalized, ready for database import
 */

// =============================================================================
// SOURCE METADATA
// =============================================================================

/** Tracks the origin and freshness of data */
export interface SourceMeta {
  source: "osm" | "pdok" | "bright" | "jina";
  fetchedAt: string; // ISO 8601 timestamp
  sourceId?: string; // Original ID from source (e.g., OSM node ID)
  sourceUrl?: string; // URL where data was fetched from
  confidence?: number; // 0-1 confidence score for AI-extracted data
}

// =============================================================================
// OSM RAW DATA
// =============================================================================

/** Raw OpenStreetMap node/way tags */
export interface OsmTags {
  name?: string;
  brand?: string;
  amenity?: string;
  shop?: string;
  tourism?: string;
  leisure?: string;
  description?: string;
  website?: string;
  "contact:website"?: string;
  phone?: string;
  "contact:phone"?: string;
  email?: string;
  "contact:email"?: string;
  "addr:street"?: string;
  "addr:housenumber"?: string;
  "addr:postcode"?: string;
  "addr:city"?: string;
  "addr:country"?: string;
  opening_hours?: string;
  wheelchair?: string;
  // Allow other tags
  [key: string]: string | undefined;
}

/** Raw element from Overpass API response (before transformation) */
export interface OsmOverpassElement {
  /** OSM element type */
  type: "node" | "way" | "relation";
  /** OSM element ID */
  id: number;
  /** Latitude (for nodes) */
  lat?: number;
  /** Longitude (for nodes) */
  lon?: number;
  /** OSM tags containing all metadata */
  tags?: OsmTags;
  /** Bounding box for ways/relations */
  bounds?: {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
  };
  /** Center point for ways/relations (from "out center") */
  center?: {
    lat: number;
    lon: number;
  };
}

/** Transformed place data from OpenStreetMap Overpass API */
export interface OsmRawPlace {
  /** OSM element type */
  type: "node" | "way" | "relation";
  /** OSM element ID */
  id: number;
  /** Latitude (for nodes) or centroid */
  lat: number;
  /** Longitude (for nodes) or centroid */
  lon: number;
  /** OSM tags containing all metadata */
  tags: OsmTags;
  /** Bounding box for ways/relations [south, west, north, east] */
  bounds?: {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
  };
  /** Center point for ways/relations */
  center?: {
    lat: number;
    lon: number;
  };
}

/** Collection of OSM places for a city (output from collector) */
export interface OsmRawData {
  /** Metadata about the collection */
  metadata: {
    source: "openstreetmap";
    collectedAt: string;
    countryCode: string;
    citySlug: string;
    cityName: string;
    bbox: [number, number, number, number];
    osmTimestamp: string;
    generator: string;
    queryTimeSeconds: number;
    rawElementCount: number;
    processedPlaceCount: number;
  };
  /** Processed place data */
  places: OsmRawPlace[];
}

// =============================================================================
// PDOK BAG RAW DATA (Dutch Address Registry)
// =============================================================================

/** Raw address data from PDOK BAG API */
export interface PdokBagAddress {
  /** BAG object identification */
  identificatie: string;
  /** Street name (openbare ruimte) */
  openbareRuimteNaam: string;
  /** House number */
  huisnummer: number;
  /** House letter suffix (optional) */
  huisletter?: string;
  /** House number addition (optional) */
  huisnummertoevoeging?: string;
  /** Postal code (format: "1234 AB") */
  postcode: string;
  /** City/town name */
  woonplaatsNaam: string;
  /** Municipality name */
  gemeenteNaam: string;
  /** Province name */
  provincieNaam: string;
  /** Geographic coordinates */
  centroide_ll: {
    type: "Point";
    coordinates: [number, number]; // [lon, lat] - GeoJSON order
  };
  /** RD (Rijksdriehoek) coordinates */
  centroide_rd?: {
    type: "Point";
    coordinates: [number, number]; // [x, y]
  };
  /** Building surface area in m² */
  oppervlakte?: number;
  /** Construction year */
  bouwjaar?: number;
  /** Object status */
  status: string;
  /** Object type */
  type: string;
}

/** Collection of PDOK addresses for a city (output from collector) */
export interface PdokRawData {
  /** Metadata about the collection */
  metadata: {
    source: "pdok-bag";
    collectedAt: string;
    countryCode: "nl";
    citySlug: string;
    cityName: string;
    municipalCode?: string;
    bbox?: [number, number, number, number];
    wfsVersion: string;
    queryType: "bbox" | "woonplaats";
    queryTimeSeconds: number;
    rawFeatureCount: number;
    processedAddressCount: number;
  };
  /** Processed address data */
  addresses: PdokBagAddress[];
}

// =============================================================================
// BRIGHT DATA RAW (Web Scraping)
// =============================================================================

/** Opening hours structure from Bright Data */
export interface BrightOpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  raw?: string; // Original string if parsing failed
}

/** Social media links from Bright Data */
export interface BrightSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

/** Raw place data from Bright Data web scraping */
export interface BrightRawPlace {
  /** OSM ID for cross-linking (format: "node/123456" or "way/789") */
  sourceId: string;
  /** Business name */
  businessName: string;
  /** Source URL that was scraped */
  sourceUrl: string;
  /** Canonical URL of the business website */
  canonicalUrl?: string;
  /** Scraped website of the business */
  website?: string;
  /** Primary phone number */
  phone?: string;
  /** Additional phone numbers */
  phones?: string[];
  /** Primary email */
  email?: string;
  /** Additional emails */
  emails?: string[];
  /** Full address string */
  address?: string;
  /** Street component */
  street?: string;
  /** City name */
  city?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Country name or code */
  country?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Primary category */
  category?: string;
  /** All categories */
  categories?: string[];
  /** Business description / about text */
  about?: string;
  /** Alternative description field */
  businessDescription?: string;
  /** Average rating (typically 1-5 scale) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Opening hours */
  openingHours?: BrightOpeningHours;
  /** Services offered */
  services?: string[];
  /** Image URLs */
  images?: string[];
  /** Price range indicator */
  priceRange?: string;
  /** Social media links */
  socialLinks?: BrightSocialLinks;
  /** Raw JSON if additional fields exist */
  rawData?: Record<string, unknown>;
}

/** Collection of Bright Data places for a city (output from collector) */
export interface BrightRawData {
  /** Metadata about the collection */
  metadata: {
    source: "bright-data";
    collectedAt: string;
    countryCode: string;
    citySlug: string;
    cityName: string;
    scrapeTimeSeconds: number;
    /** Total OSM places attempted */
    totalAttempted: number;
    /** Successfully enriched */
    successCount: number;
    /** Failed to enrich */
    failCount: number;
    /** Skipped (no website, no search result) */
    skipCount: number;
  };
  /** Enriched place data */
  places: BrightRawPlace[];
}

// =============================================================================
// JINA AI SUMMARY
// =============================================================================

/** Contact info extracted by Jina AI */
export interface JinaContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

/** Structured data extracted by Jina AI */
export interface JinaExtracted {
  businessName?: string;
  contactInfo?: JinaContactInfo;
  services?: string[];
  specialties?: string[];
  petTypes?: string[]; // e.g., ["dogs", "cats", "birds"]
  priceRange?: string;
}

/** Jina AI summary for a single place */
export interface JinaSummary {
  /** URL that was processed */
  url: string;
  /** Page title */
  title: string;
  /** AI-generated summary/description */
  summary: string;
  /** Key highlights/features */
  highlights?: string[];
  /** Suggested tags/categories */
  tags?: string[];
  /** Sentiment analysis result */
  sentiment?: "positive" | "neutral" | "negative";
  /** Detected language */
  language?: string;
  /** Structured extraction results */
  extracted?: JinaExtracted;
  /** Processing metadata */
  meta: {
    processedAt: string;
    model: string;
    tokensUsed?: number;
    confidence: number; // 0-1
  };
}

/** Single enriched entry with source ID for cross-linking */
export interface JinaEnrichedPlace {
  /** OSM ID or Bright sourceId for cross-linking */
  sourceId: string;
  /** Website URL that was processed */
  website: string;
  /** Jina AI summary data */
  jina: JinaSummary;
}

/** Collection of Jina summaries for a city */
export interface JinaRawData {
  /** Metadata about the collection */
  metadata: {
    source: "jina-ai";
    collectedAt: string;
    countryCode: string;
    citySlug: string;
    cityName: string;
    /** Total places in Bright input */
    totalInputPlaces: number;
    /** Places with valid websites */
    processed: number;
    /** Successfully summarized */
    successful: number;
    /** Failed to summarize */
    failed: number;
    /** Processing time in seconds */
    processingTimeSeconds: number;
  };
  /** Enriched place summaries */
  summaries: JinaEnrichedPlace[];
}

// =============================================================================
// STAGED PLACE (Merged & Normalized)
// =============================================================================

/** Normalized opening hours for staged data */
export interface StagedOpeningHours {
  monday?: { open: string; close: string } | null;
  tuesday?: { open: string; close: string } | null;
  wednesday?: { open: string; close: string } | null;
  thursday?: { open: string; close: string } | null;
  friday?: { open: string; close: string } | null;
  saturday?: { open: string; close: string } | null;
  sunday?: { open: string; close: string } | null;
  timezone?: string;
  raw?: string; // Original unparsed string
}

/** Data source tracking for a staged place */
export interface StagedSources {
  osm?: {
    id: number;
    fetchedAt: string;
  };
  pdok?: {
    identificatie: string;
    fetchedAt: string;
  };
  bright?: {
    sourceUrl: string;
    fetchedAt: string;
  };
  jina?: {
    url: string;
    processedAt: string;
    confidence: number;
  };
}

/** Validation status for staged data */
export interface StagedValidation {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  score: number; // 0-100 quality score
}

/**
 * Staged Place - Merged and normalized data from all sources
 * Ready for database import after validation
 */
export interface StagedPlace {
  // === Identity ===
  /** Generated unique ID for deduplication */
  stagedId: string;
  /** URL-safe slug (generated from name) */
  slug: string;
  /** Business name (normalized) */
  name: string;

  // === Location ===
  /** Country ISO code (e.g., "NL", "BE") */
  countryCode: string;
  /** City slug for lookup */
  citySlug: string;
  /** City name (for display/validation) */
  cityName: string;
  /** Full street address */
  address: string | null;
  /** Postal code (normalized format) */
  postalCode: string | null;
  /** Latitude (7 decimal precision) */
  lat: number | null;
  /** Longitude (7 decimal precision) */
  lng: number | null;

  // === Contact ===
  /** Phone number (E.164 format preferred) */
  phone: string | null;
  /** Email address (lowercase, validated) */
  email: string | null;
  /** Website URL (normalized with https://) */
  website: string | null;

  // === Content ===
  /** Business description (AI-enhanced or scraped) */
  description: string | null;
  /** Category slugs for linking */
  categorySlugs: string[];
  /** Additional tags for search/filtering */
  tags?: string[];

  // === Metrics ===
  /** Average rating (0-5 scale) */
  avgRating: number | null;
  /** Total review count */
  reviewCount: number | null;

  // === Extended Data (optional) ===
  /** Structured opening hours */
  openingHours?: StagedOpeningHours;
  /** Image URLs */
  images?: string[];
  /** Services offered */
  services?: string[];
  /** Social media links */
  socialLinks?: Record<string, string>;
  /** Pet specialties */
  petTypes?: string[];

  // === Metadata ===
  /** Sources that contributed to this record */
  sources: StagedSources;
  /** Validation results */
  validation: StagedValidation;
  /** When this staged record was created */
  stagedAt: string;
  /** When this was last updated */
  updatedAt: string;
}

/** Collection of staged places for a city */
export interface StagedData {
  places: StagedPlace[];
  meta: {
    countryCode: string;
    citySlug: string;
    stagedAt: string;
    totalPlaces: number;
    validPlaces: number;
    sources: {
      osm: number;
      pdok: number;
      bright: number;
      jina: number;
    };
  };
}

// =============================================================================
// CATEGORY MAPPING
// =============================================================================

/** OSM tag to category mapping */
export interface OsmCategoryMapping {
  osmKey: string; // e.g., "amenity", "shop"
  osmValue: string; // e.g., "veterinary", "pet"
  categorySlug: string; // Our category slug
  priority: number; // Higher = preferred when multiple match
}

/** Default OSM to category mappings */
export const OSM_CATEGORY_MAPPINGS: OsmCategoryMapping[] = [
  { osmKey: "amenity", osmValue: "veterinary", categorySlug: "veterinary", priority: 10 },
  { osmKey: "amenity", osmValue: "animal_shelter", categorySlug: "shelter", priority: 10 },
  { osmKey: "amenity", osmValue: "animal_boarding", categorySlug: "boarding", priority: 10 },
  { osmKey: "amenity", osmValue: "pet_grooming", categorySlug: "grooming", priority: 10 },
  { osmKey: "amenity", osmValue: "animal_training", categorySlug: "training", priority: 10 },
  { osmKey: "shop", osmValue: "pet", categorySlug: "pet-store", priority: 10 },
  { osmKey: "shop", osmValue: "pet_grooming", categorySlug: "grooming", priority: 9 },
  { osmKey: "leisure", osmValue: "dog_park", categorySlug: "dog-park", priority: 10 },
  { osmKey: "tourism", osmValue: "zoo", categorySlug: "zoo", priority: 10 },
];
