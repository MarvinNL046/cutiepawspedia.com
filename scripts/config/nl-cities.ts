/**
 * Netherlands City Configuration for PDOK BAG Data Collection
 *
 * Contains Dutch-specific configuration including:
 * - Municipal codes (gemeentecode) for precise filtering
 * - Bounding boxes as fallback
 * - Official woonplaatsnamen for BAG queries
 */

export interface NlCityConfig {
  /** URL-safe slug for the city */
  citySlug: string;
  /** Official Dutch city name (woonplaatsnaam) */
  cityName: string;
  /** CBS municipality code (e.g., "GM0363" for Amsterdam) */
  municipalCode?: string;
  /** Bounding box [south, west, north, east] */
  bbox?: [number, number, number, number];
  /** Province name */
  province?: string;
  /** Population (approximate) */
  population?: number;
}

/**
 * Dutch cities configured for PDOK BAG data collection
 * Municipal codes from CBS (Centraal Bureau voor de Statistiek)
 */
export const NL_CITY_CONFIGS: NlCityConfig[] = [
  {
    citySlug: "amsterdam",
    cityName: "Amsterdam",
    municipalCode: "GM0363",
    bbox: [52.278, 4.729, 52.431, 5.079],
    province: "Noord-Holland",
    population: 872680,
  },
  {
    citySlug: "rotterdam",
    cityName: "Rotterdam",
    municipalCode: "GM0599",
    bbox: [51.862, 4.316, 51.972, 4.601],
    province: "Zuid-Holland",
    population: 651446,
  },
  {
    citySlug: "den-haag",
    cityName: "'s-Gravenhage", // Official BAG name
    municipalCode: "GM0518",
    bbox: [52.015, 4.219, 52.134, 4.399],
    province: "Zuid-Holland",
    population: 545163,
  },
  {
    citySlug: "utrecht",
    cityName: "Utrecht",
    municipalCode: "GM0344",
    bbox: [52.046, 5.034, 52.131, 5.178],
    province: "Utrecht",
    population: 357597,
  },
  {
    citySlug: "eindhoven",
    cityName: "Eindhoven",
    municipalCode: "GM0772",
    bbox: [51.391, 5.395, 51.479, 5.547],
    province: "Noord-Brabant",
    population: 234456,
  },
  {
    citySlug: "groningen",
    cityName: "Groningen",
    municipalCode: "GM0014",
    bbox: [53.178, 6.507, 53.248, 6.637],
    province: "Groningen",
    population: 232826,
  },
  {
    citySlug: "tilburg",
    cityName: "Tilburg",
    municipalCode: "GM0855",
    bbox: [51.524, 4.970, 51.600, 5.137],
    province: "Noord-Brabant",
    population: 220308,
  },
  {
    citySlug: "almere",
    cityName: "Almere",
    municipalCode: "GM0034",
    bbox: [52.316, 5.138, 52.423, 5.344],
    province: "Flevoland",
    population: 215055,
  },
  {
    citySlug: "breda",
    cityName: "Breda",
    municipalCode: "GM0758",
    bbox: [51.550, 4.710, 51.620, 4.840],
    province: "Noord-Brabant",
    population: 183873,
  },
  {
    citySlug: "nijmegen",
    cityName: "Nijmegen",
    municipalCode: "GM0268",
    bbox: [51.796, 5.780, 51.880, 5.920],
    province: "Gelderland",
    population: 177362,
  },
  {
    citySlug: "apeldoorn",
    cityName: "Apeldoorn",
    municipalCode: "GM0200",
    bbox: [52.156, 5.876, 52.272, 6.054],
    province: "Gelderland",
    population: 163647,
  },
  {
    citySlug: "haarlem",
    cityName: "Haarlem",
    municipalCode: "GM0392",
    bbox: [52.351, 4.604, 52.415, 4.680],
    province: "Noord-Holland",
    population: 161265,
  },
  {
    citySlug: "arnhem",
    cityName: "Arnhem",
    municipalCode: "GM0202",
    bbox: [51.935, 5.848, 52.020, 6.020],
    province: "Gelderland",
    population: 161348,
  },
  {
    citySlug: "enschede",
    cityName: "Enschede",
    municipalCode: "GM0153",
    bbox: [52.183, 6.838, 52.264, 6.956],
    province: "Overijssel",
    population: 159614,
  },
  {
    citySlug: "amersfoort",
    cityName: "Amersfoort",
    municipalCode: "GM0307",
    bbox: [52.131, 5.330, 52.205, 5.448],
    province: "Utrecht",
    population: 157276,
  },
];

/**
 * Get NL city configuration by slug
 */
export function getNlCityConfig(citySlug: string): NlCityConfig | undefined {
  return NL_CITY_CONFIGS.find(
    (c) => c.citySlug.toLowerCase() === citySlug.toLowerCase()
  );
}

/**
 * Get all configured NL cities
 */
export function getAllNlCities(): NlCityConfig[] {
  return NL_CITY_CONFIGS;
}

/**
 * List available NL city slugs
 */
export function getNlCitySlugs(): string[] {
  return NL_CITY_CONFIGS.map((c) => c.citySlug);
}

/**
 * Alternative city names mapping (for user-friendly input)
 */
export const NL_CITY_ALIASES: Record<string, string> = {
  "the-hague": "den-haag",
  "the hague": "den-haag",
  "s-gravenhage": "den-haag",
  "'s-gravenhage": "den-haag",
};

/**
 * Resolve city slug from input (handles aliases)
 */
export function resolveNlCitySlug(input: string): string {
  const normalized = input.toLowerCase().trim();
  return NL_CITY_ALIASES[normalized] || normalized;
}
