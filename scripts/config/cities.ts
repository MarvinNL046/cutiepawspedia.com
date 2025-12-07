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
    // New cities added
    {
      slug: "arnhem",
      name: "Arnhem",
      countryCode: "nl",
      bbox: [51.930, 5.850, 52.020, 6.020],
      timezone: "Europe/Amsterdam",
      population: 162424,
      hasPdok: true,
    },
    {
      slug: "apeldoorn",
      name: "Apeldoorn",
      countryCode: "nl",
      bbox: [52.180, 5.900, 52.260, 6.050],
      timezone: "Europe/Amsterdam",
      population: 163380,
      hasPdok: true,
    },
    {
      slug: "ede",
      name: "Ede",
      countryCode: "nl",
      bbox: [52.020, 5.620, 52.100, 5.750],
      timezone: "Europe/Amsterdam",
      population: 117187,
      hasPdok: true,
    },
    {
      slug: "haarlem",
      name: "Haarlem",
      countryCode: "nl",
      bbox: [52.350, 4.600, 52.420, 4.700],
      timezone: "Europe/Amsterdam",
      population: 161265,
      hasPdok: true,
    },
    {
      slug: "zaanstad",
      name: "Zaanstad",
      countryCode: "nl",
      bbox: [52.420, 4.750, 52.520, 4.900],
      timezone: "Europe/Amsterdam",
      population: 156729,
      hasPdok: true,
    },
    {
      slug: "alkmaar",
      name: "Alkmaar",
      countryCode: "nl",
      bbox: [52.600, 4.700, 52.680, 4.800],
      timezone: "Europe/Amsterdam",
      population: 109896,
      hasPdok: true,
    },
    {
      slug: "zoetermeer",
      name: "Zoetermeer",
      countryCode: "nl",
      bbox: [52.020, 4.460, 52.080, 4.560],
      timezone: "Europe/Amsterdam",
      population: 125271,
      hasPdok: true,
    },
    {
      slug: "leiden",
      name: "Leiden",
      countryCode: "nl",
      bbox: [52.130, 4.450, 52.190, 4.550],
      timezone: "Europe/Amsterdam",
      population: 124899,
      hasPdok: true,
    },
    {
      slug: "dordrecht",
      name: "Dordrecht",
      countryCode: "nl",
      bbox: [51.770, 4.620, 51.840, 4.750],
      timezone: "Europe/Amsterdam",
      population: 118654,
      hasPdok: true,
    },
    {
      slug: "delft",
      name: "Delft",
      countryCode: "nl",
      bbox: [51.980, 4.320, 52.030, 4.400],
      timezone: "Europe/Amsterdam",
      population: 103163,
      hasPdok: true,
    },
    {
      slug: "s-hertogenbosch",
      name: "'s-Hertogenbosch",
      countryCode: "nl",
      bbox: [51.660, 5.240, 51.730, 5.360],
      timezone: "Europe/Amsterdam",
      population: 155000,
      hasPdok: true,
    },
    {
      slug: "enschede",
      name: "Enschede",
      countryCode: "nl",
      bbox: [52.180, 6.820, 52.260, 6.960],
      timezone: "Europe/Amsterdam",
      population: 159255,
      hasPdok: true,
    },
    {
      slug: "zwolle",
      name: "Zwolle",
      countryCode: "nl",
      bbox: [52.480, 6.050, 52.550, 6.150],
      timezone: "Europe/Amsterdam",
      population: 128709,
      hasPdok: true,
    },
    {
      slug: "deventer",
      name: "Deventer",
      countryCode: "nl",
      bbox: [52.230, 6.130, 52.290, 6.220],
      timezone: "Europe/Amsterdam",
      population: 100650,
      hasPdok: true,
    },
    {
      slug: "amersfoort",
      name: "Amersfoort",
      countryCode: "nl",
      bbox: [52.130, 5.340, 52.200, 5.450],
      timezone: "Europe/Amsterdam",
      population: 156286,
      hasPdok: true,
    },
    {
      slug: "maastricht",
      name: "Maastricht",
      countryCode: "nl",
      bbox: [50.820, 5.650, 50.900, 5.750],
      timezone: "Europe/Amsterdam",
      population: 121565,
      hasPdok: true,
    },
    {
      slug: "venlo",
      name: "Venlo",
      countryCode: "nl",
      bbox: [51.340, 6.130, 51.410, 6.220],
      timezone: "Europe/Amsterdam",
      population: 101192,
      hasPdok: true,
    },
    {
      slug: "leeuwarden",
      name: "Leeuwarden",
      countryCode: "nl",
      bbox: [53.170, 5.740, 53.230, 5.850],
      timezone: "Europe/Amsterdam",
      population: 123107,
      hasPdok: true,
    },
    {
      slug: "emmen",
      name: "Emmen",
      countryCode: "nl",
      bbox: [52.750, 6.850, 52.820, 6.970],
      timezone: "Europe/Amsterdam",
      population: 107113,
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
