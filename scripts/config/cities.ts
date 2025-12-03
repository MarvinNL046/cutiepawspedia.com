/**
 * City Configuration for Data Collection
 *
 * Contains bounding boxes and metadata for cities where we collect data.
 * Bounding boxes are in [south, west, north, east] format (lat/lon).
 */

export interface CityConfig {
  /** URL-safe slug for the city */
  slug: string;
  /** Display name */
  name: string;
  /** ISO 3166-1 alpha-2 country code (lowercase) */
  countryCode: string;
  /** Bounding box [south, west, north, east] */
  bbox: [number, number, number, number];
  /** Optional timezone */
  timezone?: string;
  /** Population (approximate) */
  population?: number;
  /** Whether PDOK BAG data is available (NL only) */
  hasPdok?: boolean;
}

/**
 * All configured cities organized by country code
 */
export const CITIES: Record<string, CityConfig[]> = {
  // Netherlands
  nl: [
    {
      slug: "amsterdam",
      name: "Amsterdam",
      countryCode: "nl",
      bbox: [52.278, 4.729, 52.431, 5.079],
      timezone: "Europe/Amsterdam",
      population: 872680,
      hasPdok: true,
    },
    {
      slug: "rotterdam",
      name: "Rotterdam",
      countryCode: "nl",
      bbox: [51.862, 4.316, 51.972, 4.601],
      timezone: "Europe/Amsterdam",
      population: 651446,
      hasPdok: true,
    },
    {
      slug: "den-haag",
      name: "Den Haag",
      countryCode: "nl",
      bbox: [52.015, 4.219, 52.134, 4.399],
      timezone: "Europe/Amsterdam",
      population: 545163,
      hasPdok: true,
    },
    {
      slug: "utrecht",
      name: "Utrecht",
      countryCode: "nl",
      bbox: [52.046, 5.034, 52.131, 5.178],
      timezone: "Europe/Amsterdam",
      population: 357597,
      hasPdok: true,
    },
    {
      slug: "eindhoven",
      name: "Eindhoven",
      countryCode: "nl",
      bbox: [51.391, 5.395, 51.479, 5.547],
      timezone: "Europe/Amsterdam",
      population: 234456,
      hasPdok: true,
    },
    {
      slug: "groningen",
      name: "Groningen",
      countryCode: "nl",
      bbox: [53.178, 6.507, 53.248, 6.637],
      timezone: "Europe/Amsterdam",
      population: 232826,
      hasPdok: true,
    },
    {
      slug: "tilburg",
      name: "Tilburg",
      countryCode: "nl",
      bbox: [51.524, 4.970, 51.600, 5.137],
      timezone: "Europe/Amsterdam",
      population: 220308,
      hasPdok: true,
    },
    {
      slug: "almere",
      name: "Almere",
      countryCode: "nl",
      bbox: [52.316, 5.138, 52.423, 5.344],
      timezone: "Europe/Amsterdam",
      population: 215055,
      hasPdok: true,
    },
    {
      slug: "breda",
      name: "Breda",
      countryCode: "nl",
      bbox: [51.550, 4.710, 51.620, 4.840],
      timezone: "Europe/Amsterdam",
      population: 183873,
      hasPdok: true,
    },
    {
      slug: "nijmegen",
      name: "Nijmegen",
      countryCode: "nl",
      bbox: [51.796, 5.780, 51.880, 5.920],
      timezone: "Europe/Amsterdam",
      population: 177362,
      hasPdok: true,
    },
  ],

  // Belgium
  be: [
    {
      slug: "brussels",
      name: "Brussels",
      countryCode: "be",
      bbox: [50.796, 4.260, 50.914, 4.480],
      timezone: "Europe/Brussels",
      population: 1208542,
    },
    {
      slug: "antwerp",
      name: "Antwerp",
      countryCode: "be",
      bbox: [51.177, 4.285, 51.274, 4.485],
      timezone: "Europe/Brussels",
      population: 523248,
    },
    {
      slug: "ghent",
      name: "Ghent",
      countryCode: "be",
      bbox: [51.010, 3.650, 51.113, 3.800],
      timezone: "Europe/Brussels",
      population: 262219,
    },
  ],

  // Germany
  de: [
    {
      slug: "berlin",
      name: "Berlin",
      countryCode: "de",
      bbox: [52.338, 13.088, 52.675, 13.761],
      timezone: "Europe/Berlin",
      population: 3644826,
    },
    {
      slug: "munich",
      name: "Munich",
      countryCode: "de",
      bbox: [48.061, 11.360, 48.248, 11.723],
      timezone: "Europe/Berlin",
      population: 1471508,
    },
    {
      slug: "cologne",
      name: "Cologne",
      countryCode: "de",
      bbox: [50.830, 6.770, 51.085, 7.162],
      timezone: "Europe/Berlin",
      population: 1085664,
    },
    {
      slug: "dusseldorf",
      name: "Düsseldorf",
      countryCode: "de",
      bbox: [51.124, 6.688, 51.304, 6.883],
      timezone: "Europe/Berlin",
      population: 619294,
    },
  ],
};

/**
 * Get a city configuration by country code and city slug
 */
export function getCity(
  countryCode: string,
  citySlug: string
): CityConfig | null {
  const country = countryCode.toLowerCase();
  const slug = citySlug.toLowerCase();
  const cities = CITIES[country];

  if (!cities) {
    return null;
  }

  return cities.find((c) => c.slug === slug) || null;
}

/**
 * Get all cities for a country
 */
export function getCitiesByCountry(countryCode: string): CityConfig[] {
  return CITIES[countryCode.toLowerCase()] || [];
}

/**
 * Get all configured countries
 */
export function getCountries(): string[] {
  return Object.keys(CITIES);
}

/**
 * List all cities (flat array)
 */
export function getAllCities(): CityConfig[] {
  return Object.values(CITIES).flat();
}

/**
 * Get country name from code
 */
export const COUNTRY_NAMES: Record<string, string> = {
  nl: "Netherlands",
  be: "Belgium",
  de: "Germany",
};
