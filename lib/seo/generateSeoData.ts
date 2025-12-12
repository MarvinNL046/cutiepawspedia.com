/**
 * Core SEO Data Generator
 *
 * Main function for generating SEO metadata based on page type and context.
 * Integrates with AI content generators for enhanced meta descriptions.
 */

import type {
  SeoPageType,
  SeoContext,
  SeoData,
  PlaceSeoPayload,
  CategorySeoPayload,
  CitySeoPayload,
  CountrySeoPayload,
} from "./types";
import { DEFAULT_SEO_CONFIG } from "./types";
import {
  getBaseUrl,
  buildCanonicalUrl,
  buildAlternateUrls,
} from "./url-helpers";
import {
  getCountryBySlug,
  getCityBySlugAndCountry,
  getCityCountByCountry,
} from "@/db/queries/locations";
import {
  getCategoryBySlug,
  getPlaceBySlug,
  getPlacesByCitySlugAndCategorySlug,
  getPlaceCountByCity,
} from "@/db/queries/listings";
import type { ContentLocale } from "./aiContent";

// Locale type for SEO templates (all supported locales)
type SeoLocale = "nl" | "en" | "de" | "fr";
import {
  generateHomeContent,
  generateCountryContent,
  generateCityContent,
  generateCategoryCityContent,
  generatePlaceContent,
} from "./contentGenerators";

// =============================================================================
// SEO DEBUG LOGGING
// =============================================================================

const SEO_DEBUG = process.env.NEXT_PUBLIC_SEO_DEBUG === "true";

/**
 * Debug helper to log SEO data in development
 */
function logSeoDebug(pageType: SeoPageType, ctx: SeoContext, seoData: SeoData): void {
  if (!SEO_DEBUG) return;

  console.log("\n[SEO DEBUG]", "─".repeat(50));
  console.log("Page Type:", pageType);
  console.log("Context:", JSON.stringify(ctx, null, 2));
  console.log("Title:", seoData.title);
  console.log("Description:", seoData.description?.slice(0, 100) + "...");
  console.log("Canonical:", seoData.canonicalUrl);
  if (seoData.keywords?.length) {
    console.log("Keywords:", seoData.keywords.join(", "));
  }
  console.log("─".repeat(60), "\n");
}

// =============================================================================
// TITLE TEMPLATES
// =============================================================================

const TITLE_TEMPLATES = {
  home: {
    nl: "CutiePawsPedia - Vind de beste huisdierservices bij jou in de buurt",
    en: "CutiePawsPedia - Find the best pet services near you",
    de: "CutiePawsPedia - Finden Sie die besten Haustierservices in Ihrer Nähe",
    fr: "CutiePawsPedia - Trouvez les meilleurs services pour animaux près de chez vous",
  },
  country: {
    nl: (country: string) => `Huisdierservices in ${country} | CutiePawsPedia`,
    en: (country: string) => `Pet Services in ${country} | CutiePawsPedia`,
    de: (country: string) => `Haustierservices in ${country} | CutiePawsPedia`,
    fr: (country: string) => `Services pour animaux en ${country} | CutiePawsPedia`,
  },
  city: {
    nl: (city: string, country: string) =>
      `Huisdierservices in ${city}, ${country} | CutiePawsPedia`,
    en: (city: string, country: string) =>
      `Pet Services in ${city}, ${country} | CutiePawsPedia`,
    de: (city: string, country: string) =>
      `Haustierservices in ${city}, ${country} | CutiePawsPedia`,
    fr: (city: string, country: string) =>
      `Services pour animaux à ${city}, ${country} | CutiePawsPedia`,
  },
  category: {
    nl: (category: string, city: string) =>
      `${category} in ${city} | CutiePawsPedia`,
    en: (category: string, city: string) =>
      `${category} in ${city} | CutiePawsPedia`,
    de: (category: string, city: string) =>
      `${category} in ${city} | CutiePawsPedia`,
    fr: (category: string, city: string) =>
      `${category} à ${city} | CutiePawsPedia`,
  },
  place: {
    nl: (place: string, city: string) =>
      `${place} - ${city} | CutiePawsPedia`,
    en: (place: string, city: string) =>
      `${place} - ${city} | CutiePawsPedia`,
    de: (place: string, city: string) =>
      `${place} - ${city} | CutiePawsPedia`,
    fr: (place: string, city: string) =>
      `${place} - ${city} | CutiePawsPedia`,
  },
};

// =============================================================================
// DESCRIPTION TEMPLATES
// =============================================================================

const DESCRIPTION_TEMPLATES = {
  home: {
    nl: "Ontdek de beste dierenartsen, trimsalons, dierenwinkels en meer in Nederland, België en Duitsland. Vind en vergelijk huisdierservices bij jou in de buurt.",
    en: "Discover the best veterinarians, pet groomers, pet stores and more in the Netherlands, Belgium and Germany. Find and compare pet services near you.",
    de: "Entdecken Sie die besten Tierärzte, Hundefriseure, Tierhandlungen und mehr in Deutschland. Finden und vergleichen Sie Haustierservices in Ihrer Nähe.",
    fr: "Découvrez les meilleurs vétérinaires, toiletteurs, animaleries et plus en Belgique et en France. Trouvez et comparez les services pour animaux près de chez vous.",
  },
  country: {
    nl: (country: string, cityCount: number) =>
      `Vind huisdierservices in ${country}. Ontdek dierenartsen, trimsalons en dierenwinkels in ${cityCount} steden.`,
    en: (country: string, cityCount: number) =>
      `Find pet services in ${country}. Discover veterinarians, pet groomers and pet stores in ${cityCount} cities.`,
    de: (country: string, cityCount: number) =>
      `Finden Sie Haustierservices in ${country}. Entdecken Sie Tierärzte, Hundefriseure und Tierhandlungen in ${cityCount} Städten.`,
    fr: (country: string, cityCount: number) =>
      `Trouvez des services pour animaux en ${country}. Découvrez vétérinaires, toiletteurs et animaleries dans ${cityCount} villes.`,
  },
  city: {
    nl: (city: string, placeCount: number) =>
      `Ontdek ${placeCount}+ huisdierservices in ${city}. Vind dierenartsen, trimsalons, dierenwinkels en meer.`,
    en: (city: string, placeCount: number) =>
      `Discover ${placeCount}+ pet services in ${city}. Find veterinarians, pet groomers, pet stores and more.`,
    de: (city: string, placeCount: number) =>
      `Entdecken Sie ${placeCount}+ Haustierservices in ${city}. Finden Sie Tierärzte, Hundefriseure, Tierhandlungen und mehr.`,
    fr: (city: string, placeCount: number) =>
      `Découvrez ${placeCount}+ services pour animaux à ${city}. Trouvez vétérinaires, toiletteurs, animaleries et plus.`,
  },
  category: {
    nl: (category: string, city: string, count: number) =>
      `Vergelijk ${count} ${category.toLowerCase()} in ${city}. Bekijk reviews, openingstijden en contactgegevens.`,
    en: (category: string, city: string, count: number) =>
      `Compare ${count} ${category.toLowerCase()} in ${city}. View reviews, opening hours and contact details.`,
    de: (category: string, city: string, count: number) =>
      `Vergleichen Sie ${count} ${category.toLowerCase()} in ${city}. Sehen Sie Bewertungen, Öffnungszeiten und Kontaktdaten.`,
    fr: (category: string, city: string, count: number) =>
      `Comparez ${count} ${category.toLowerCase()} à ${city}. Voir avis, horaires et coordonnées.`,
  },
  place: {
    nl: (place: string, category: string, city: string, description?: string) =>
      description ||
      `${place} is een ${category.toLowerCase()} in ${city}. Bekijk reviews, openingstijden en contactgegevens.`,
    en: (place: string, category: string, city: string, description?: string) =>
      description ||
      `${place} is a ${category.toLowerCase()} in ${city}. View reviews, opening hours and contact details.`,
    de: (place: string, category: string, city: string, description?: string) =>
      description ||
      `${place} ist ein ${category.toLowerCase()} in ${city}. Sehen Sie Bewertungen, Öffnungszeiten und Kontaktdaten.`,
    fr: (place: string, category: string, city: string, description?: string) =>
      description ||
      `${place} est un ${category.toLowerCase()} à ${city}. Voir avis, horaires et coordonnées.`,
  },
};

// =============================================================================
// CATEGORY TRANSLATIONS
// =============================================================================

const CATEGORY_LABELS: Record<string, { nl: string; en: string; de: string; fr: string }> = {
  veterinary: { nl: "Dierenartsen", en: "Veterinarians", de: "Tierärzte", fr: "Vétérinaires" },
  "pet-store": { nl: "Dierenwinkels", en: "Pet Stores", de: "Tierhandlungen", fr: "Animaleries" },
  grooming: { nl: "Trimsalons", en: "Pet Groomers", de: "Hundefriseure", fr: "Toiletteurs" },
  "animal-shelter": { nl: "Dierenopvang", en: "Animal Shelters", de: "Tierheime", fr: "Refuges" },
  boarding: { nl: "Dierenpensions", en: "Pet Boarding", de: "Tierpensionen", fr: "Pensions" },
  "dog-park": { nl: "Hondenuitlaatgebieden", en: "Dog Parks", de: "Hundeparks", fr: "Parcs canins" },
  "pet-cafe": { nl: "Huisdiervriendelijke cafés", en: "Pet-friendly Cafes", de: "Tierfreundliche Cafés", fr: "Cafés accueillants" },
  cemetery: { nl: "Dierenbegraafplaatsen", en: "Pet Cemeteries", de: "Tierfriedhöfe", fr: "Cimetières" },
};

function getCategoryLabel(slug: string, locale: string): string {
  const labels = CATEGORY_LABELS[slug];
  if (!labels) return slug;
  const loc = locale as SeoLocale;
  return labels[loc] || labels.en;
}

// =============================================================================
// MAIN GENERATOR
// =============================================================================

/**
 * Generate SEO data for any page type
 */
export async function generateSeoData(
  pageType: SeoPageType,
  ctx: SeoContext
): Promise<SeoData> {
  const locale = ctx.locale || "nl";
  const baseUrl = getBaseUrl();
  const canonicalUrl = buildCanonicalUrl(ctx);

  // Base SEO data
  const seoData: SeoData = {
    title: TITLE_TEMPLATES.home[locale as SeoLocale] || TITLE_TEMPLATES.home.nl,
    description:
      DESCRIPTION_TEMPLATES.home[locale as SeoLocale] ||
      DESCRIPTION_TEMPLATES.home.nl,
    canonicalUrl,
    robots: "index, follow",
    alternates: {
      languages: buildAlternateUrls(ctx, DEFAULT_SEO_CONFIG.supportedLocales),
      canonical: canonicalUrl,
    },
  };

  // Generate page-specific data
  let result: SeoData;
  switch (pageType) {
    case "home":
      result = generateHomeSeo(seoData, locale);
      break;

    case "country":
      result = await generateCountrySeo(seoData, ctx, locale);
      break;

    case "city":
      result = await generateCitySeo(seoData, ctx, locale);
      break;

    case "category":
      result = await generateCategorySeo(seoData, ctx, locale);
      break;

    case "place":
      result = await generatePlaceSeo(seoData, ctx, locale);
      break;

    default:
      result = seoData;
  }

  // Debug logging (when NEXT_PUBLIC_SEO_DEBUG=true)
  logSeoDebug(pageType, ctx, result);

  return result;
}

// =============================================================================
// PAGE-SPECIFIC GENERATORS
// =============================================================================

function generateHomeSeo(seoData: SeoData, locale: string): SeoData {
  const loc = locale as SeoLocale;

  // Use content generator for enhanced meta description
  const content = generateHomeContent({
    locale: locale as ContentLocale,
    totalCountries: 8,
    totalCities: 50,
    totalPlaces: 1000,
    topCategories: [],
  });

  const title = TITLE_TEMPLATES.home[loc] || TITLE_TEMPLATES.home.nl;
  const description = content.metaDescription || DESCRIPTION_TEMPLATES.home[loc] || DESCRIPTION_TEMPLATES.home.nl;

  return {
    ...seoData,
    title,
    description,
    keywords: [
      "huisdierservices",
      "dierenarts",
      "trimsalon",
      "dierenwinkel",
      "pet services",
      "veterinarian",
    ],
    openGraph: {
      title,
      description,
      url: seoData.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
  };
}

async function generateCountrySeo(
  seoData: SeoData,
  ctx: SeoContext,
  locale: string
): Promise<SeoData> {
  if (!ctx.countrySlug) return seoData;

  const country = await getCountryBySlug(ctx.countrySlug);
  if (!country) return seoData;

  const loc = locale as SeoLocale;
  const cityCount = await getCityCountByCountry(country.id);

  // Use content generator for enhanced meta description
  const content = generateCountryContent({
    locale: locale as ContentLocale,
    countryName: country.name,
    countrySlug: country.slug,
    totalCities: cityCount,
    totalPlaces: cityCount * 10, // Estimate
    topCategories: [],
  });

  const title = TITLE_TEMPLATES.country[loc](country.name);
  const description = content.metaDescription || DESCRIPTION_TEMPLATES.country[loc](country.name, cityCount);

  return {
    ...seoData,
    title,
    description,
    keywords: [
      `huisdierservices ${country.name}`,
      `dierenarts ${country.name}`,
      `pet services ${country.name}`,
    ],
    openGraph: {
      title,
      description,
      url: seoData.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
  };
}

async function generateCitySeo(
  seoData: SeoData,
  ctx: SeoContext,
  locale: string
): Promise<SeoData> {
  if (!ctx.countrySlug || !ctx.citySlug) return seoData;

  const city = await getCityBySlugAndCountry(ctx.citySlug, ctx.countrySlug);
  if (!city) return seoData;

  const loc = locale as SeoLocale;
  const placeCount = await getPlaceCountByCity(city.id);

  // Use content generator for enhanced meta description
  const content = generateCityContent({
    locale: locale as ContentLocale,
    cityName: city.name,
    countryName: city.country?.name || "",
    countrySlug: ctx.countrySlug,
    totalPlaces: placeCount,
    categoryStats: [],
  });

  const title = TITLE_TEMPLATES.city[loc](city.name, city.country?.name || "");
  const description = content.metaDescription || DESCRIPTION_TEMPLATES.city[loc](city.name, placeCount);

  return {
    ...seoData,
    title,
    description,
    keywords: [
      `huisdierservices ${city.name}`,
      `dierenarts ${city.name}`,
      `trimsalon ${city.name}`,
      `dierenwinkel ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: seoData.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
  };
}

async function generateCategorySeo(
  seoData: SeoData,
  ctx: SeoContext,
  locale: string
): Promise<SeoData> {
  if (!ctx.countrySlug || !ctx.citySlug || !ctx.categorySlug) return seoData;

  const city = await getCityBySlugAndCountry(ctx.citySlug, ctx.countrySlug);
  const category = await getCategoryBySlug(ctx.categorySlug);
  if (!city || !category) return seoData;

  // Get place count
  const places = await getPlacesByCitySlugAndCategorySlug(
    ctx.citySlug,
    ctx.countrySlug,
    ctx.categorySlug,
    { limit: 100 }
  );
  const placeCount = places.length;

  const loc = locale as SeoLocale;
  const categoryLabel = getCategoryLabel(ctx.categorySlug, locale);

  // Use content generator for enhanced meta description
  const content = generateCategoryCityContent({
    locale: locale as ContentLocale,
    categoryName: category.labelKey || categoryLabel,
    categorySlug: ctx.categorySlug,
    cityName: city.name,
    countryName: city.country?.name || "",
    totalPlaces: placeCount,
  });

  const title = TITLE_TEMPLATES.category[loc](categoryLabel, city.name);
  const description = content.metaDescription || DESCRIPTION_TEMPLATES.category[loc](
    categoryLabel,
    city.name,
    placeCount
  );

  return {
    ...seoData,
    title,
    description,
    keywords: [
      `${categoryLabel.toLowerCase()} ${city.name}`,
      `beste ${categoryLabel.toLowerCase()} ${city.name}`,
      `${ctx.categorySlug} ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: seoData.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "website",
    },
  };
}

async function generatePlaceSeo(
  seoData: SeoData,
  ctx: SeoContext,
  locale: string
): Promise<SeoData> {
  if (
    !ctx.countrySlug ||
    !ctx.citySlug ||
    !ctx.categorySlug ||
    !ctx.placeSlug
  ) {
    return seoData;
  }

  const place = await getPlaceBySlug(
    ctx.placeSlug,
    ctx.citySlug,
    ctx.countrySlug
  );
  if (!place) return seoData;

  const loc = locale as SeoLocale;
  const categoryLabel = getCategoryLabel(ctx.categorySlug, locale);
  const cityName = place.city?.name || ctx.citySlug;
  const countryName = place.city?.country?.name || ctx.countrySlug;

  // Use content generator for enhanced meta description
  const content = generatePlaceContent({
    locale: locale as ContentLocale,
    placeName: place.name,
    placeSlug: place.slug,
    cityName,
    countryName,
    categories: place.placeCategories?.map((pc) => pc.category?.slug || "") || [ctx.categorySlug],
    rating: place.avgRating ? parseFloat(place.avgRating) : undefined,
    reviewCount: place.reviewCount || undefined,
    description: place.description || undefined,
    address: place.address || undefined,
  });

  const title = TITLE_TEMPLATES.place[loc](place.name, cityName);
  const description = content.metaDescription || DESCRIPTION_TEMPLATES.place[loc](
    place.name,
    categoryLabel,
    cityName,
    place.description || undefined
  );

  return {
    ...seoData,
    title,
    description: description.slice(0, 160), // Truncate to meta description length
    keywords: [
      place.name,
      `${categoryLabel.toLowerCase()} ${cityName}`,
      `${place.name} reviews`,
      `${place.name} openingstijden`,
    ],
    openGraph: {
      title,
      description: description.slice(0, 200),
      url: seoData.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      locale,
      type: "place",
    },
  };
}

// =============================================================================
// PAYLOAD BUILDERS (for JSON-LD)
// =============================================================================

/**
 * Build PlaceSeoPayload from database place
 * Note: categories use labelKey for i18n, so we store slugs which can be translated
 */
export function buildPlaceSeoPayload(
  place: NonNullable<Awaited<ReturnType<typeof getPlaceBySlug>>>
): PlaceSeoPayload {
  // Categories use labelKey for i18n - store both labelKey and slug
  const categories =
    place.placeCategories?.map((pc) => pc.category?.labelKey || pc.category?.slug || "") || [];
  const categorySlugs =
    place.placeCategories?.map((pc) => pc.category?.slug || "") || [];

  return {
    id: place.id,
    slug: place.slug,
    name: place.name,
    citySlug: place.city?.slug || "",
    cityName: place.city?.name || "",
    countrySlug: place.city?.country?.slug || "",
    countryCode: place.city?.country?.code || "",
    categories,
    categorySlugs,
    description: place.description,
    address: place.address,
    postalCode: place.postalCode,
    phone: place.phone,
    website: place.website,
    avgRating: place.avgRating ? parseFloat(place.avgRating) : null,
    reviewCount: place.reviewCount,
    lat: place.lat ? parseFloat(place.lat) : null,
    lng: place.lng ? parseFloat(place.lng) : null,
  };
}

/**
 * Build CitySeoPayload from database city
 */
export function buildCitySeoPayload(
  city: NonNullable<Awaited<ReturnType<typeof getCityBySlugAndCountry>>>
): CitySeoPayload {
  return {
    id: city.id,
    slug: city.slug,
    name: city.name,
    countrySlug: city.country?.slug || "",
    countryCode: city.country?.code || "",
    countryName: city.country?.name || "",
  };
}

/**
 * Build CountrySeoPayload from database country
 */
export function buildCountrySeoPayload(
  country: NonNullable<Awaited<ReturnType<typeof getCountryBySlug>>>
): CountrySeoPayload {
  return {
    id: country.id,
    slug: country.slug,
    name: country.name,
    code: country.code,
  };
}

// =============================================================================
// BACKWARDS-COMPATIBLE METADATA FUNCTIONS
// =============================================================================

import type { Metadata } from "next";

// Legacy place type from existing pages
type LegacyPlace = NonNullable<Awaited<ReturnType<typeof getPlaceBySlug>>>;

/**
 * Get metadata for a place page (backwards-compatible)
 * Supports both legacy signature (place, citySlug, countrySlug, categorySlug, locale)
 * and new signature ({ locale, countrySlug, citySlug, categorySlug, placeSlug })
 */
export async function getPlaceMetadata(
  placeOrParams: LegacyPlace | { locale: string; countrySlug: string; citySlug: string; categorySlug: string; placeSlug: string },
  citySlug?: string,
  countrySlug?: string,
  categorySlug?: string,
  locale?: string
): Promise<Metadata> {
  // Legacy signature: getPlaceMetadata(place, citySlug, countrySlug, categorySlug, locale)
  if (citySlug !== undefined && countrySlug !== undefined && categorySlug !== undefined && locale !== undefined) {
    const place = placeOrParams as LegacyPlace;
    const cityName = place.city?.name || citySlug;
    const primaryCategory = place.placeCategories?.[0]?.category;
    const categoryLabel = getCategoryLabel(categorySlug, locale);

    const title = TITLE_TEMPLATES.place[locale as SeoLocale](place.name, cityName);
    const description = place.description
      ? place.description.slice(0, 160)
      : DESCRIPTION_TEMPLATES.place[locale as SeoLocale](
          place.name,
          categoryLabel,
          cityName,
          undefined
        );

    const canonicalUrl = buildCanonicalUrl({
      locale,
      countrySlug,
      citySlug,
      categorySlug,
      placeSlug: place.slug,
    });

    return {
      title,
      description,
      keywords: [
        place.name,
        `${categoryLabel.toLowerCase()} ${cityName}`,
        `${place.name} reviews`,
        `${place.name} openingstijden`,
      ],
      alternates: {
        canonical: canonicalUrl,
        languages: buildAlternateUrls(
          { locale, countrySlug, citySlug, categorySlug, placeSlug: place.slug },
          DEFAULT_SEO_CONFIG.supportedLocales
        ),
      },
      openGraph: {
        title,
        description: description.slice(0, 200),
        url: canonicalUrl,
        siteName: DEFAULT_SEO_CONFIG.siteName,
        locale,
        type: "website",
      },
    };
  }

  // New signature: getPlaceMetadata({ locale, countrySlug, citySlug, categorySlug, placeSlug })
  const params = placeOrParams as { locale: string; countrySlug: string; citySlug: string; categorySlug: string; placeSlug: string };
  const ctx: SeoContext = {
    locale: params.locale,
    countrySlug: params.countrySlug,
    citySlug: params.citySlug,
    categorySlug: params.categorySlug,
    placeSlug: params.placeSlug,
  };

  const seoData = await generateSeoData("place", ctx);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: seoData.robots,
    alternates: {
      canonical: seoData.canonicalUrl,
      languages: seoData.alternates?.languages,
    },
    openGraph: seoData.openGraph
      ? {
          title: seoData.openGraph.title,
          description: seoData.openGraph.description,
          url: seoData.openGraph.url,
          siteName: seoData.openGraph.siteName,
          locale: seoData.openGraph.locale,
          type: seoData.openGraph.type === "place" ? "website" : seoData.openGraph.type,
          images: seoData.openGraph.images,
        }
      : undefined,
  };
}

/**
 * Get metadata for a category page (backwards-compatible)
 * Legacy: getCategoryMetadata(category, city, locale, placeCount)
 */
export function getCategoryMetadata(
  categoryOrParams: Record<string, unknown> | { locale: string; countrySlug: string; citySlug: string; categorySlug: string },
  city?: Record<string, unknown>,
  locale?: string,
  placeCount?: number
): Metadata {
  // Legacy signature: getCategoryMetadata(category, city, locale, placeCount)
  if (city !== undefined && locale !== undefined) {
    const category = categoryOrParams as Record<string, unknown>;
    const countryData = (city.country || {}) as Record<string, unknown>;
    const loc = locale as SeoLocale;
    const categoryLabel = getCategoryLabel(category.slug as string, locale);

    const title = TITLE_TEMPLATES.category[loc](categoryLabel, city.name as string);
    const description = DESCRIPTION_TEMPLATES.category[loc](
      categoryLabel,
      city.name as string,
      placeCount || 0
    );

    const canonicalUrl = buildCanonicalUrl({
      locale,
      countrySlug: countryData.slug as string,
      citySlug: city.slug as string,
      categorySlug: category.slug as string,
    });

    return {
      title,
      description,
      keywords: [
        `${categoryLabel.toLowerCase()} ${city.name}`,
        `beste ${categoryLabel.toLowerCase()} ${city.name}`,
      ],
      alternates: {
        canonical: canonicalUrl,
        languages: buildAlternateUrls(
          { locale, countrySlug: countryData.slug as string, citySlug: city.slug as string, categorySlug: category.slug as string },
          DEFAULT_SEO_CONFIG.supportedLocales
        ),
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: DEFAULT_SEO_CONFIG.siteName,
        locale,
        type: "website",
      },
    };
  }

  // This shouldn't happen with new signature in async context
  throw new Error("getCategoryMetadata must be called with legacy signature (category, city, locale, placeCount)");
}

/**
 * Get metadata for a search page (backwards-compatible)
 * Legacy: getSearchMetadata(locale, query, citySlug, categorySlug)
 */
export function getSearchMetadata(
  localeOrParams: string | { locale: string; query?: string },
  query?: string,
  citySlug?: string,
  categorySlug?: string
): Metadata {
  // Legacy signature: getSearchMetadata(locale, query, citySlug, categorySlug)
  const locale = typeof localeOrParams === "string" ? localeOrParams : localeOrParams.locale;
  const searchQuery = typeof localeOrParams === "string" ? query : localeOrParams.query;

  const title =
    locale === "nl"
      ? searchQuery
        ? `Zoekresultaten voor "${searchQuery}" | CutiePawsPedia`
        : "Zoeken | CutiePawsPedia"
      : searchQuery
        ? `Search results for "${searchQuery}" | CutiePawsPedia`
        : "Search | CutiePawsPedia";

  const description =
    locale === "nl"
      ? "Zoek naar dierenartsen, trimsalons, dierenwinkels en andere huisdierservices in Nederland, België en Duitsland."
      : "Search for veterinarians, pet groomers, pet stores and other pet services in the Netherlands, Belgium and Germany.";

  return {
    title,
    description,
    robots: "noindex, follow", // Search results should not be indexed
  };
}

/**
 * Get metadata for a city page (backwards-compatible)
 * Legacy: getCityMetadata(city, locale, placeCount)
 */
export function getCityMetadata(
  cityOrParams: Record<string, unknown> | { locale: string; countrySlug: string; citySlug: string },
  locale?: string,
  placeCount?: number
): Metadata {
  // Legacy signature: getCityMetadata(city, locale, placeCount)
  if (locale !== undefined) {
    const city = cityOrParams as Record<string, unknown>;
    const countryData = (city.country || {}) as Record<string, unknown>;
    const loc = locale as SeoLocale;

    const title = TITLE_TEMPLATES.city[loc](city.name as string, countryData.name as string || "");
    const description = DESCRIPTION_TEMPLATES.city[loc](city.name as string, placeCount || 0);

    const canonicalUrl = buildCanonicalUrl({
      locale,
      countrySlug: countryData.slug as string,
      citySlug: city.slug as string,
    });

    return {
      title,
      description,
      keywords: [
        `huisdierservices ${city.name}`,
        `dierenarts ${city.name}`,
        `trimsalon ${city.name}`,
      ],
      alternates: {
        canonical: canonicalUrl,
        languages: buildAlternateUrls(
          { locale, countrySlug: countryData.slug as string, citySlug: city.slug as string },
          DEFAULT_SEO_CONFIG.supportedLocales
        ),
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: DEFAULT_SEO_CONFIG.siteName,
        locale,
        type: "website",
      },
    };
  }

  throw new Error("getCityMetadata must be called with legacy signature (city, locale, placeCount)");
}

/**
 * Get metadata for a country page (backwards-compatible)
 * Legacy: getCountryMetadata(country, locale, cityCount)
 */
export function getCountryMetadata(
  countryOrParams: Record<string, unknown> | { locale: string; countrySlug: string },
  locale?: string,
  cityCount?: number
): Metadata {
  // Legacy signature: getCountryMetadata(country, locale, cityCount)
  if (locale !== undefined) {
    const country = countryOrParams as Record<string, unknown>;
    const loc = locale as SeoLocale;

    const title = TITLE_TEMPLATES.country[loc](country.name as string);
    const description = DESCRIPTION_TEMPLATES.country[loc](country.name as string, cityCount || 0);

    const canonicalUrl = buildCanonicalUrl({
      locale,
      countrySlug: country.slug as string,
    });

    return {
      title,
      description,
      keywords: [
        `huisdierservices ${country.name}`,
        `dierenarts ${country.name}`,
        `pet services ${country.name}`,
      ],
      alternates: {
        canonical: canonicalUrl,
        languages: buildAlternateUrls(
          { locale, countrySlug: country.slug as string },
          DEFAULT_SEO_CONFIG.supportedLocales
        ),
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: DEFAULT_SEO_CONFIG.siteName,
        locale,
        type: "website",
      },
    };
  }

  throw new Error("getCountryMetadata must be called with legacy signature (country, locale, cityCount)");
}

// Keep the async version for new code
export async function getCountryMetadataAsync(params: {
  locale: string;
  countrySlug: string;
}): Promise<Metadata> {
  const ctx: SeoContext = {
    locale: params.locale,
    countrySlug: params.countrySlug,
  };

  const seoData = await generateSeoData("country", ctx);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: seoData.robots,
    alternates: {
      canonical: seoData.canonicalUrl,
      languages: seoData.alternates?.languages,
    },
    openGraph: seoData.openGraph
      ? {
          title: seoData.openGraph.title,
          description: seoData.openGraph.description,
          url: seoData.openGraph.url,
          siteName: seoData.openGraph.siteName,
          locale: seoData.openGraph.locale,
          type: seoData.openGraph.type === "place" ? "website" : seoData.openGraph.type,
        }
      : undefined,
  };
}
