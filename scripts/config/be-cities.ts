/**
 * Belgium City Configuration for Data Collection
 *
 * Contains Belgian cities organized by province with:
 * - Bounding boxes for geographic queries
 * - Population data for prioritization
 * - Province associations
 */

export interface BeCityConfig {
  /** URL-safe slug for the city */
  citySlug: string;
  /** Official city name */
  cityName: string;
  /** Province slug (matches be-provinces.ts) */
  province: string;
  /** Bounding box [south, west, north, east] */
  bbox?: [number, number, number, number];
  /** Population (approximate) */
  population?: number;
}

/**
 * Belgian cities configured for data collection
 * Starting with major cities, can expand later
 */
export const BE_CITY_CONFIGS: BeCityConfig[] = [
  // Brussels Capital Region
  {
    citySlug: "brussel",
    cityName: "Brussel",
    province: "brussel",
    bbox: [50.796, 4.245, 50.914, 4.484],
    population: 185103,
  },
  {
    citySlug: "schaarbeek",
    cityName: "Schaarbeek",
    province: "brussel",
    bbox: [50.856, 4.363, 50.885, 4.414],
    population: 133536,
  },
  {
    citySlug: "anderlecht",
    cityName: "Anderlecht",
    province: "brussel",
    bbox: [50.818, 4.277, 50.851, 4.346],
    population: 120526,
  },

  // Antwerpen Province
  {
    citySlug: "antwerpen",
    cityName: "Antwerpen",
    province: "antwerpen",
    bbox: [51.175, 4.300, 51.300, 4.480],
    population: 529247,
  },
  {
    citySlug: "mechelen",
    cityName: "Mechelen",
    province: "antwerpen",
    bbox: [51.002, 4.428, 51.052, 4.508],
    population: 86616,
  },
  {
    citySlug: "turnhout",
    cityName: "Turnhout",
    province: "antwerpen",
    bbox: [51.300, 4.913, 51.345, 4.980],
    population: 45125,
  },
  {
    citySlug: "hasselt",
    cityName: "Hasselt",
    province: "limburg",
    bbox: [50.913, 5.290, 50.960, 5.380],
    population: 77747,
  },
  {
    citySlug: "genk",
    cityName: "Genk",
    province: "limburg",
    bbox: [50.940, 5.465, 51.010, 5.570],
    population: 66414,
  },

  // Oost-Vlaanderen Province
  {
    citySlug: "gent",
    cityName: "Gent",
    province: "oost-vlaanderen",
    bbox: [51.000, 3.650, 51.100, 3.800],
    population: 262219,
  },
  {
    citySlug: "aalst",
    cityName: "Aalst",
    province: "oost-vlaanderen",
    bbox: [50.920, 4.010, 50.960, 4.070],
    population: 86445,
  },
  {
    citySlug: "sint-niklaas",
    cityName: "Sint-Niklaas",
    province: "oost-vlaanderen",
    bbox: [51.135, 4.115, 51.175, 4.175],
    population: 78753,
  },

  // West-Vlaanderen Province
  {
    citySlug: "brugge",
    cityName: "Brugge",
    province: "west-vlaanderen",
    bbox: [51.175, 3.175, 51.240, 3.280],
    population: 118509,
  },
  {
    citySlug: "oostende",
    cityName: "Oostende",
    province: "west-vlaanderen",
    bbox: [51.200, 2.870, 51.250, 2.950],
    population: 72055,
  },
  {
    citySlug: "kortrijk",
    cityName: "Kortrijk",
    province: "west-vlaanderen",
    bbox: [50.805, 3.230, 50.850, 3.310],
    population: 77741,
  },
  {
    citySlug: "roeselare",
    cityName: "Roeselare",
    province: "west-vlaanderen",
    bbox: [50.930, 3.090, 50.970, 3.150],
    population: 64279,
  },

  // Vlaams-Brabant Province
  {
    citySlug: "leuven",
    cityName: "Leuven",
    province: "vlaams-brabant",
    bbox: [50.850, 4.660, 50.910, 4.750],
    population: 101032,
  },
  {
    citySlug: "vilvoorde",
    cityName: "Vilvoorde",
    province: "vlaams-brabant",
    bbox: [50.915, 4.380, 50.945, 4.450],
    population: 45934,
  },

  // Hainaut Province (Wallonia)
  {
    citySlug: "charleroi",
    cityName: "Charleroi",
    province: "henegouwen",
    bbox: [50.380, 4.380, 50.460, 4.490],
    population: 201816,
  },
  {
    citySlug: "mons",
    cityName: "Mons",
    province: "henegouwen",
    bbox: [50.420, 3.920, 50.470, 3.990],
    population: 95299,
  },
  {
    citySlug: "la-louviere",
    cityName: "La Louvière",
    province: "henegouwen",
    bbox: [50.455, 4.160, 50.495, 4.220],
    population: 80986,
  },
  {
    citySlug: "doornik",
    cityName: "Tournai",
    province: "henegouwen",
    bbox: [50.590, 3.360, 50.640, 3.420],
    population: 69554,
  },

  // Liège Province (Wallonia)
  {
    citySlug: "luik",
    cityName: "Liège",
    province: "luik",
    bbox: [50.590, 5.520, 50.680, 5.650],
    population: 197355,
  },
  {
    citySlug: "seraing",
    cityName: "Seraing",
    province: "luik",
    bbox: [50.570, 5.470, 50.620, 5.530],
    population: 64270,
  },
  {
    citySlug: "verviers",
    cityName: "Verviers",
    province: "luik",
    bbox: [50.575, 5.830, 50.615, 5.890],
    population: 55198,
  },

  // Namur Province (Wallonia)
  {
    citySlug: "namen",
    cityName: "Namur",
    province: "namen",
    bbox: [50.430, 4.820, 50.490, 4.910],
    population: 112505,
  },

  // Luxembourg Province (Wallonia)
  {
    citySlug: "aarlen",
    cityName: "Arlon",
    province: "luxemburg",
    bbox: [49.670, 5.790, 49.710, 5.850],
    population: 30509,
  },

  // Brabant Wallon Province (Wallonia)
  {
    citySlug: "waver",
    cityName: "Wavre",
    province: "waals-brabant",
    bbox: [50.700, 4.580, 50.740, 4.640],
    population: 34827,
  },
  {
    citySlug: "ottignies-louvain-la-neuve",
    cityName: "Ottignies-Louvain-la-Neuve",
    province: "waals-brabant",
    bbox: [50.650, 4.540, 50.690, 4.620],
    population: 31495,
  },
];

/**
 * Get BE city configuration by slug
 */
export function getBeCityConfig(citySlug: string): BeCityConfig | undefined {
  return BE_CITY_CONFIGS.find(
    (c) => c.citySlug.toLowerCase() === citySlug.toLowerCase()
  );
}

/**
 * Get all configured BE cities
 */
export function getAllBeCities(): BeCityConfig[] {
  return BE_CITY_CONFIGS;
}

/**
 * Get cities by province
 */
export function getBeCitiesByProvince(provinceSlug: string): BeCityConfig[] {
  return BE_CITY_CONFIGS.filter(
    (c) => c.province.toLowerCase() === provinceSlug.toLowerCase()
  );
}

/**
 * List available BE city slugs
 */
export function getBeCitySlugs(): string[] {
  return BE_CITY_CONFIGS.map((c) => c.citySlug);
}

/**
 * Get major cities (population > 100k)
 */
export function getBeMajorCities(): BeCityConfig[] {
  return BE_CITY_CONFIGS.filter((c) => (c.population || 0) > 100000);
}
