/**
 * Pipeline Configuration
 *
 * Central configuration for all data pipeline scripts.
 * Add new countries here to enable scraping for them.
 */

export interface CountryConfig {
  code: string;           // ISO country code (BE, NL, DE, FR, etc.)
  name: string;           // Display name
  languages: string[];    // Languages for search queries
  defaultLanguage: string;
  googleDomain: string;   // Google domain for SERP
  googleGl: string;       // Google geolocation parameter
  currency: string;
  timezone: string;
}

export const COUNTRIES: Record<string, CountryConfig> = {
  BE: {
    code: "BE",
    name: "Belgium",
    languages: ["nl", "fr"],
    defaultLanguage: "nl",
    googleDomain: "google.be",
    googleGl: "be",
    currency: "EUR",
    timezone: "Europe/Brussels",
  },
  NL: {
    code: "NL",
    name: "Netherlands",
    languages: ["nl"],
    defaultLanguage: "nl",
    googleDomain: "google.nl",
    googleGl: "nl",
    currency: "EUR",
    timezone: "Europe/Amsterdam",
  },
  DE: {
    code: "DE",
    name: "Germany",
    languages: ["de"],
    defaultLanguage: "de",
    googleDomain: "google.de",
    googleGl: "de",
    currency: "EUR",
    timezone: "Europe/Berlin",
  },
  FR: {
    code: "FR",
    name: "France",
    languages: ["fr"],
    defaultLanguage: "fr",
    googleDomain: "google.fr",
    googleGl: "fr",
    currency: "EUR",
    timezone: "Europe/Paris",
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    languages: ["en"],
    defaultLanguage: "en",
    googleDomain: "google.co.uk",
    googleGl: "uk",
    currency: "GBP",
    timezone: "Europe/London",
  },
};

export interface CategoryConfig {
  slug: string;
  labelKey: string;
  icon: string;
  searchTerms: Record<string, string>; // language -> search term
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  veterinary: {
    slug: "veterinary",
    labelKey: "Veterinarians",
    icon: "Stethoscope",
    searchTerms: {
      nl: "dierenarts",
      fr: "vétérinaire",
      de: "tierarzt",
      en: "veterinarian",
    },
  },
  grooming: {
    slug: "grooming",
    labelKey: "Pet Grooming",
    icon: "Scissors",
    searchTerms: {
      nl: "trimsalon hond",
      fr: "toilettage chien",
      de: "hundefriseur",
      en: "dog grooming",
    },
  },
  "pet-store": {
    slug: "pet-store",
    labelKey: "Pet Stores",
    icon: "ShoppingBag",
    searchTerms: {
      nl: "dierenwinkel",
      fr: "animalerie",
      de: "tierhandlung",
      en: "pet store",
    },
  },
  "dog-training": {
    slug: "dog-training",
    labelKey: "Dog Training",
    icon: "GraduationCap",
    searchTerms: {
      nl: "hondentraining",
      fr: "dressage chien",
      de: "hundeschule",
      en: "dog training",
    },
  },
  "pet-hotel": {
    slug: "pet-hotel",
    labelKey: "Pet Hotels",
    icon: "Hotel",
    searchTerms: {
      nl: "dierenpension",
      fr: "pension animaux",
      de: "tierpension",
      en: "pet hotel",
    },
  },
  "dog-walking": {
    slug: "dog-walking",
    labelKey: "Dog Walking",
    icon: "Footprints",
    searchTerms: {
      nl: "hondenuitlaatservice",
      fr: "promenade chien",
      de: "gassi service",
      en: "dog walking service",
    },
  },
  "emergency-vet": {
    slug: "emergency-vet",
    labelKey: "Emergency Vet",
    icon: "Siren",
    searchTerms: {
      nl: "spoeddierenarts",
      fr: "vétérinaire urgence",
      de: "tierarzt notfall",
      en: "emergency vet",
    },
  },
  shelter: {
    slug: "shelter",
    labelKey: "Animal Shelters",
    icon: "Heart",
    searchTerms: {
      nl: "dierenasiel",
      fr: "refuge animaux",
      de: "tierheim",
      en: "animal shelter",
    },
  },
  "pet-sitting": {
    slug: "pet-sitting",
    labelKey: "Pet Sitting",
    icon: "Home",
    searchTerms: {
      nl: "oppas huisdieren",
      fr: "garde animaux",
      de: "tierbetreuung",
      en: "pet sitting",
    },
  },
  "dog-daycare": {
    slug: "dog-daycare",
    labelKey: "Dog Daycare",
    icon: "Dog",
    searchTerms: {
      nl: "hondencreche",
      fr: "garderie chien",
      de: "hundetagesstätte",
      en: "dog daycare",
    },
  },
};

// Rate limiting configuration
export const RATE_LIMITS = {
  brightdata: {
    requestsPerMinute: 30,
    delayMs: 2000,
  },
  openai: {
    requestsPerMinute: 60,
    delayMs: 1000,
  },
  jina: {
    requestsPerMinute: 60,
    delayMs: 1000,
  },
};

// Batch sizes for different operations
export const BATCH_SIZES = {
  discovery: 20,      // Places per SERP query
  enrichment: 50,     // Places per enrichment batch
  validation: 100,    // Places per validation batch
};
