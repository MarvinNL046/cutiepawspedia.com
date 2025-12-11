/**
 * Belgium Province Configuration
 *
 * Belgium has 3 regions and 10 provinces + Brussels Capital Region:
 * - Flanders (Vlaanderen): 5 provinces - Dutch speaking
 * - Wallonia (Wallonië): 5 provinces - French speaking
 * - Brussels Capital Region - Bilingual (Dutch/French)
 */

export interface BeProvinceConfig {
  /** URL-safe slug for the province */
  slug: string;
  /** Official province name */
  name: string;
  /** ISO 3166-2:BE code */
  code: string;
  /** Region: flanders, wallonia, or brussels */
  region: "flanders" | "wallonia" | "brussels";
  /** Primary language */
  language: "nl" | "fr" | "nl/fr";
  /** Approximate population */
  population?: number;
}

/**
 * Belgian provinces configured for data collection
 */
export const BE_PROVINCE_CONFIGS: BeProvinceConfig[] = [
  // Brussels Capital Region
  {
    slug: "brussel",
    name: "Brussels",
    code: "BRU",
    region: "brussels",
    language: "nl/fr",
    population: 1222637,
  },

  // Flanders (Dutch-speaking)
  {
    slug: "antwerpen",
    name: "Antwerpen",
    code: "VAN",
    region: "flanders",
    language: "nl",
    population: 1869730,
  },
  {
    slug: "limburg",
    name: "Limburg",
    code: "VLI",
    region: "flanders",
    language: "nl",
    population: 877370,
  },
  {
    slug: "oost-vlaanderen",
    name: "Oost-Vlaanderen",
    code: "VOV",
    region: "flanders",
    language: "nl",
    population: 1525255,
  },
  {
    slug: "vlaams-brabant",
    name: "Vlaams-Brabant",
    code: "VBR",
    region: "flanders",
    language: "nl",
    population: 1155843,
  },
  {
    slug: "west-vlaanderen",
    name: "West-Vlaanderen",
    code: "VWV",
    region: "flanders",
    language: "nl",
    population: 1200945,
  },

  // Wallonia (French-speaking)
  {
    slug: "henegouwen",
    name: "Hainaut",
    code: "WHT",
    region: "wallonia",
    language: "fr",
    population: 1346840,
  },
  {
    slug: "luik",
    name: "Liège",
    code: "WLG",
    region: "wallonia",
    language: "fr",
    population: 1109800,
  },
  {
    slug: "luxemburg",
    name: "Luxembourg",
    code: "WLX",
    region: "wallonia",
    language: "fr",
    population: 286752,
  },
  {
    slug: "namen",
    name: "Namur",
    code: "WNA",
    region: "wallonia",
    language: "fr",
    population: 495832,
  },
  {
    slug: "waals-brabant",
    name: "Brabant Wallon",
    code: "WBR",
    region: "wallonia",
    language: "fr",
    population: 406019,
  },
];

/**
 * Get BE province configuration by slug
 */
export function getBeProvinceConfig(slug: string): BeProvinceConfig | undefined {
  return BE_PROVINCE_CONFIGS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
}

/**
 * Get all configured BE provinces
 */
export function getAllBeProvinces(): BeProvinceConfig[] {
  return BE_PROVINCE_CONFIGS;
}

/**
 * Get provinces by region
 */
export function getBeProvincesByRegion(region: "flanders" | "wallonia" | "brussels"): BeProvinceConfig[] {
  return BE_PROVINCE_CONFIGS.filter((p) => p.region === region);
}

/**
 * List available BE province slugs
 */
export function getBeProvinceSlugs(): string[] {
  return BE_PROVINCE_CONFIGS.map((p) => p.slug);
}
