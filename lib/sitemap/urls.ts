/**
 * Sitemap URL Builders
 *
 * Functions to build URLs for each section of the sitemap.
 * Queries the database to get all entities and generates sitemap entries.
 */

import { db } from "@/db";
import { countries, cities, provinces, categories, places, placeCategories } from "@/db/schema";
import { eq, isNotNull, sql } from "drizzle-orm";
import {
  type SitemapUrl,
  type SitemapConfig,
  PAGE_PRIORITIES,
  PAGE_CHANGEFREQ,
  DEFAULT_SITEMAP_CONFIG,
} from "./types";

/**
 * Build home page URLs for all locales
 */
export async function buildHomeUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = [];

  for (const locale of config.locales) {
    urls.push({
      loc: `${config.baseUrl}/${locale}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: PAGE_CHANGEFREQ.home,
      priority: PAGE_PRIORITIES.home,
    });
  }

  return urls;
}

/**
 * Build country page URLs
 */
export async function buildCountryUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  const allCountries = await db
    .select({
      slug: countries.slug,
    })
    .from(countries);

  for (const country of allCountries) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${country.slug}`,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.country,
        priority: PAGE_PRIORITIES.country,
      });
    }
  }

  return urls;
}

/**
 * Build province page URLs
 * e.g., /nl/netherlands/p/noord-holland
 */
export async function buildProvinceUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  const allProvinces = await db
    .select({
      provinceSlug: provinces.slug,
      countrySlug: countries.slug,
      updatedAt: provinces.updatedAt,
    })
    .from(provinces)
    .innerJoin(countries, eq(provinces.countryId, countries.id));

  for (const province of allProvinces) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${province.countrySlug}/p/${province.provinceSlug}`,
        lastmod: province.updatedAt?.toISOString().split("T")[0] || today,
        changefreq: PAGE_CHANGEFREQ.city, // Use city frequency for provinces
        priority: 0.85, // Slightly higher than cities
      });
    }
  }

  return urls;
}

/**
 * Build city page URLs
 * e.g., /nl/netherlands/p/noord-holland/amsterdam
 */
export async function buildCityUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  const allCities = await db
    .select({
      citySlug: cities.slug,
      provinceSlug: provinces.slug,
      countrySlug: countries.slug,
    })
    .from(cities)
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(provinces, eq(cities.provinceId, provinces.id));

  for (const city of allCities) {
    for (const locale of config.locales) {
      // Include province in URL if available
      const url = city.provinceSlug
        ? `${config.baseUrl}/${locale}/${city.countrySlug}/p/${city.provinceSlug}/${city.citySlug}`
        : `${config.baseUrl}/${locale}/${city.countrySlug}/${city.citySlug}`;
      urls.push({
        loc: url,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.city,
        priority: PAGE_PRIORITIES.city,
      });
    }
  }

  return urls;
}

/**
 * Build category page URLs (within cities)
 * e.g., /nl/netherlands/p/noord-holland/amsterdam/veterinary
 */
export async function buildCategoryUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get all city-category combinations that have places
  const cityCategoryPairs = await db
    .selectDistinct({
      citySlug: cities.slug,
      provinceSlug: provinces.slug,
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(provinces, eq(cities.provinceId, provinces.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  for (const pair of cityCategoryPairs) {
    for (const locale of config.locales) {
      // Include province in URL if available
      const url = pair.provinceSlug
        ? `${config.baseUrl}/${locale}/${pair.countrySlug}/p/${pair.provinceSlug}/${pair.citySlug}/${pair.categorySlug}`
        : `${config.baseUrl}/${locale}/${pair.countrySlug}/${pair.citySlug}/${pair.categorySlug}`;
      urls.push({
        loc: url,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.category,
        priority: PAGE_PRIORITIES.category,
      });
    }
  }

  return urls;
}

/**
 * Build place (individual business) page URLs
 * e.g., /nl/netherlands/p/noord-holland/amsterdam/veterinary/dierenarts-amsterdam
 */
export async function buildPlaceUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get all active places with their location and primary category
  const allPlaces = await db
    .select({
      placeSlug: places.slug,
      placeStatus: places.status,
      citySlug: cities.slug,
      provinceSlug: provinces.slug,
      countrySlug: countries.slug,
      categorySlug: categories.slug,
      updatedAt: places.updatedAt,
      isPremium: places.isPremium,
    })
    .from(places)
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .leftJoin(provinces, eq(cities.provinceId, provinces.id))
    .innerJoin(placeCategories, eq(places.id, placeCategories.placeId))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id))
    .where(isNotNull(places.slug));

  // Use a Set to track unique place URLs (a place can have multiple categories)
  const seenUrls = new Set<string>();

  for (const place of allPlaces) {
    // Skip permanently closed places
    if (place.placeStatus === "permanently_closed") continue;

    for (const locale of config.locales) {
      // Include province in URL if available
      const url = place.provinceSlug
        ? `${config.baseUrl}/${locale}/${place.countrySlug}/p/${place.provinceSlug}/${place.citySlug}/${place.categorySlug}/${place.placeSlug}`
        : `${config.baseUrl}/${locale}/${place.countrySlug}/${place.citySlug}/${place.categorySlug}/${place.placeSlug}`;

      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        urls.push({
          loc: url,
          lastmod: place.updatedAt?.toISOString().split("T")[0] || today,
          changefreq: PAGE_CHANGEFREQ.place,
          // Premium places get slightly higher priority
          priority: place.isPremium ? 0.8 : PAGE_PRIORITIES.place,
        });
      }
    }
  }

  return urls;
}

/**
 * Build "Best [Category] in [City]" page URLs
 */
export async function buildBestInCityUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get city-category pairs with at least 1 place
  const cityCategoryPairs = await db
    .selectDistinct({
      citySlug: cities.slug,
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  for (const pair of cityCategoryPairs) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${pair.countrySlug}/${pair.citySlug}/best/${pair.categorySlug}`,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.best,
        priority: PAGE_PRIORITIES.best,
      });
    }
  }

  return urls;
}

/**
 * Build "Top [Category] in [Country]" page URLs
 */
export async function buildTopInCountryUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get country-category pairs with at least 1 place
  const countryCategoryPairs = await db
    .selectDistinct({
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  for (const pair of countryCategoryPairs) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${pair.countrySlug}/top/${pair.categorySlug}`,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.top,
        priority: PAGE_PRIORITIES.top,
      });
    }
  }

  return urls;
}

/**
 * Build "Best [Category] in [Country]" page URLs
 */
export async function buildBestInCountryUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get country-category pairs with at least 1 place
  const countryCategoryPairs = await db
    .selectDistinct({
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  for (const pair of countryCategoryPairs) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${pair.countrySlug}/best/${pair.categorySlug}`,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.best,
        priority: PAGE_PRIORITIES.best,
      });
    }
  }

  return urls;
}

/**
 * Build category overview page URLs (within countries)
 * e.g., /nl/netherlands/c/veterinary
 */
export async function buildCategoryInCountryUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  if (!db) return [];
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Get country-category pairs with at least 1 place
  const countryCategoryPairs = await db
    .selectDistinct({
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(placeCategories)
    .innerJoin(places, eq(placeCategories.placeId, places.id))
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  for (const pair of countryCategoryPairs) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${pair.countrySlug}/c/${pair.categorySlug}`,
        lastmod: today,
        changefreq: PAGE_CHANGEFREQ.category,
        priority: PAGE_PRIORITIES.category,
      });
    }
  }

  return urls;
}

/**
 * Build static page URLs
 */
export async function buildStaticUrls(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { path: "about", priority: PAGE_PRIORITIES.about, changefreq: PAGE_CHANGEFREQ.about },
    { path: "contact", priority: PAGE_PRIORITIES.contact, changefreq: PAGE_CHANGEFREQ.contact },
    { path: "privacy", priority: PAGE_PRIORITIES.privacy, changefreq: PAGE_CHANGEFREQ.privacy },
    { path: "terms", priority: PAGE_PRIORITIES.terms, changefreq: PAGE_CHANGEFREQ.terms },
    { path: "for-businesses", priority: 0.6, changefreq: "monthly" as const },
    { path: "search", priority: 0.5, changefreq: "daily" as const },
  ];

  for (const page of staticPages) {
    for (const locale of config.locales) {
      urls.push({
        loc: `${config.baseUrl}/${locale}/${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }
  }

  return urls;
}

/**
 * Get counts for each sitemap section (for logging/debugging)
 */
export async function getSitemapCounts(): Promise<Record<string, number>> {
  if (!db) return { countries: 0, cities: 0, categories: 0, places: 0 };

  const [countryCount] = await db.select({ count: sql<number>`count(*)` }).from(countries);
  const [cityCount] = await db.select({ count: sql<number>`count(*)` }).from(cities);
  const [categoryCount] = await db.select({ count: sql<number>`count(*)` }).from(categories);
  const [placeCount] = await db.select({ count: sql<number>`count(*)` }).from(places);

  return {
    countries: Number(countryCount.count),
    cities: Number(cityCount.count),
    categories: Number(categoryCount.count),
    places: Number(placeCount.count),
  };
}
