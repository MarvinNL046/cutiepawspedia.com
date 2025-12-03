/**
 * Internal Links Strategies
 *
 * Core API for generating contextual internal links.
 * Data-driven link generation based on page type and available data.
 */

import { getLocalizedCategoryName, type ContentLocale } from "@/lib/seo";
import type {
  InternalLinkItem,
  InternalLinkGroup,
  InternalLinkPageContext,
  InternalLinkOptions,
  InternalLinksResult,
  CategoryLinkStats,
  CityLinkStats,
  RelatedPlaceLink,
} from "./types";

// Localized strings for link sections
const SECTION_TITLES = {
  en: {
    categoriesInCity: "Popular Services in {city}",
    citiesForCategory: "Top Cities for {category}",
    relatedPlaces: "Similar Places Nearby",
    exploreCity: "Explore {city}",
    exploreCountry: "Explore {country}",
    topCities: "Top Cities",
    popularCategories: "Popular Categories",
    bestInCity: "Best in {city}",
    bestInCountry: "Best in {country}",
  },
  nl: {
    categoriesInCity: "Populaire Services in {city}",
    citiesForCategory: "Beste Steden voor {category}",
    relatedPlaces: "Vergelijkbare Locaties",
    exploreCity: "Ontdek {city}",
    exploreCountry: "Ontdek {country}",
    topCities: "Top Steden",
    popularCategories: "Populaire Categorieën",
    bestInCity: "Beste in {city}",
    bestInCountry: "Beste in {country}",
  },
  de: {
    categoriesInCity: "Beliebte Dienste in {city}",
    citiesForCategory: "Top-Städte für {category}",
    relatedPlaces: "Ähnliche Orte in der Nähe",
    exploreCity: "Entdecke {city}",
    exploreCountry: "Entdecke {country}",
    topCities: "Top-Städte",
    popularCategories: "Beliebte Kategorien",
    bestInCity: "Beste in {city}",
    bestInCountry: "Beste in {country}",
  },
};

function getSectionTitle(
  key: keyof (typeof SECTION_TITLES)["en"],
  locale: string,
  replacements?: Record<string, string>
): string {
  const localeStrings =
    SECTION_TITLES[locale as keyof typeof SECTION_TITLES] || SECTION_TITLES.en;
  let title = localeStrings[key];
  if (replacements) {
    Object.entries(replacements).forEach(([k, v]) => {
      title = title.replace(`{${k}}`, v);
    });
  }
  return title;
}

/**
 * Build URL for internal link
 */
function buildLinkUrl(params: {
  locale: string;
  countrySlug?: string;
  citySlug?: string;
  categorySlug?: string;
  placeSlug?: string;
  type?: "best" | "top" | "category";
}): string {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug, type } =
    params;
  const parts = [locale];

  if (countrySlug) parts.push(countrySlug);

  // Handle country-level special routes
  if (type === "best" && !citySlug && categorySlug) {
    parts.push("best", categorySlug);
    return `/${parts.join("/")}`;
  }
  if (type === "top" && !citySlug && categorySlug) {
    parts.push("top", categorySlug);
    return `/${parts.join("/")}`;
  }
  if (type === "category" && !citySlug && categorySlug) {
    parts.push("c", categorySlug);
    return `/${parts.join("/")}`;
  }

  if (citySlug) parts.push(citySlug);

  // Handle city-level special routes
  if (type === "best" && categorySlug) {
    parts.push("best", categorySlug);
    return `/${parts.join("/")}`;
  }

  if (categorySlug) parts.push(categorySlug);
  if (placeSlug) parts.push(placeSlug);

  return `/${parts.join("/")}`;
}

/**
 * Generate links for categories in a city
 */
export function buildCategoryLinksForCity(params: {
  locale: string;
  countrySlug: string;
  citySlug: string;
  cityName: string;
  categories: CategoryLinkStats[];
  limit?: number;
}): InternalLinkGroup {
  const { locale, countrySlug, citySlug, cityName, categories, limit = 6 } = params;

  const links: InternalLinkItem[] = categories.slice(0, limit).map((cat) => {
    const categoryName = getLocalizedCategoryName(
      cat.categorySlug,
      locale as ContentLocale
    );
    return {
      href: buildLinkUrl({
        locale,
        countrySlug,
        citySlug,
        categorySlug: cat.categorySlug,
      }),
      label: categoryName,
      description:
        locale === "nl"
          ? `${cat.placesCount}+ ${categoryName.toLowerCase()} in ${cityName}`
          : `${cat.placesCount}+ ${categoryName.toLowerCase()} in ${cityName}`,
      type: "city_category" as const,
      relevanceScore: cat.placesCount,
    };
  });

  return {
    title: getSectionTitle("categoriesInCity", locale, { city: cityName }),
    links,
    maxDisplay: limit,
  };
}

/**
 * Generate links for cities where a category is popular
 */
export function buildCityLinksForCategory(params: {
  locale: string;
  categorySlug: string;
  categoryName: string;
  cities: CityLinkStats[];
  limit?: number;
}): InternalLinkGroup {
  const { locale, categorySlug, categoryName, cities, limit = 6 } = params;

  const links: InternalLinkItem[] = cities.slice(0, limit).map((city) => ({
    href: buildLinkUrl({
      locale,
      countrySlug: city.countrySlug,
      citySlug: city.citySlug,
      categorySlug,
    }),
    label: city.cityName,
    description:
      locale === "nl"
        ? `${city.placesCount}+ locaties`
        : `${city.placesCount}+ locations`,
    type: "category_city" as const,
    relevanceScore: city.placesCount,
  }));

  return {
    title: getSectionTitle("citiesForCategory", locale, {
      category: categoryName,
    }),
    links,
    maxDisplay: limit,
  };
}

/**
 * Generate links for related places
 */
export function buildRelatedPlaceLinks(params: {
  locale: string;
  countrySlug: string;
  categorySlug: string;
  places: RelatedPlaceLink[];
  limit?: number;
}): InternalLinkGroup {
  const { locale, countrySlug, categorySlug, places, limit = 4 } = params;

  const links: InternalLinkItem[] = places.slice(0, limit).map((place) => ({
    href: buildLinkUrl({
      locale,
      countrySlug,
      citySlug: place.citySlug,
      categorySlug,
      placeSlug: place.placeSlug,
    }),
    label: place.placeName,
    description: place.avgRating
      ? `★ ${Number(place.avgRating).toFixed(1)} (${place.reviewCount || 0})`
      : undefined,
    type: "place_related" as const,
    relevanceScore: place.avgRating ? Number(place.avgRating) * 20 : 0,
  }));

  return {
    title: getSectionTitle("relatedPlaces", locale),
    links,
    maxDisplay: limit,
  };
}

/**
 * Generate contextual links for a place detail page
 */
export function buildPlaceContextLinks(params: {
  locale: string;
  countrySlug: string;
  countryName: string;
  citySlug: string;
  cityName: string;
  categorySlug: string;
  categoryName: string;
}): InternalLinkGroup {
  const {
    locale,
    countrySlug,
    countryName,
    citySlug,
    cityName,
    categorySlug,
    categoryName,
  } = params;

  const links: InternalLinkItem[] = [
    {
      href: buildLinkUrl({ locale, countrySlug, citySlug, categorySlug }),
      label:
        locale === "nl"
          ? `Alle ${categoryName.toLowerCase()} in ${cityName}`
          : `All ${categoryName.toLowerCase()} in ${cityName}`,
      type: "place_city_category" as const,
      relevanceScore: 100,
    },
    {
      href: buildLinkUrl({
        locale,
        countrySlug,
        citySlug,
        categorySlug,
        type: "best",
      }),
      label:
        locale === "nl"
          ? `Beste ${categoryName.toLowerCase()} in ${cityName}`
          : `Best ${categoryName.toLowerCase()} in ${cityName}`,
      type: "city_best" as const,
      relevanceScore: 90,
    },
    {
      href: buildLinkUrl({ locale, countrySlug, citySlug }),
      label:
        locale === "nl"
          ? `Alle services in ${cityName}`
          : `All services in ${cityName}`,
      type: "place_city" as const,
      relevanceScore: 80,
    },
    {
      href: buildLinkUrl({ locale, countrySlug, categorySlug, type: "category" }),
      label:
        locale === "nl"
          ? `${categoryName} in ${countryName}`
          : `${categoryName} in ${countryName}`,
      type: "place_category" as const,
      relevanceScore: 70,
    },
  ];

  return {
    title: getSectionTitle("exploreCity", locale, { city: cityName }),
    links,
    maxDisplay: 4,
  };
}

/**
 * Generate links for country page (top cities and categories)
 */
export function buildCountryExploreLinks(params: {
  locale: string;
  countrySlug: string;
  countryName: string;
  topCities: CityLinkStats[];
  topCategories: CategoryLinkStats[];
  limitCities?: number;
  limitCategories?: number;
}): InternalLinkGroup[] {
  const {
    locale,
    countrySlug,
    topCities,
    topCategories,
    limitCities = 6,
    limitCategories = 6,
  } = params;

  const cityLinks: InternalLinkItem[] = topCities
    .slice(0, limitCities)
    .map((city) => ({
      href: buildLinkUrl({ locale, countrySlug, citySlug: city.citySlug }),
      label: city.cityName,
      description:
        locale === "nl"
          ? `${city.placesCount}+ locaties`
          : `${city.placesCount}+ locations`,
      type: "country_city" as const,
      relevanceScore: city.placesCount,
    }));

  const categoryLinks: InternalLinkItem[] = topCategories
    .slice(0, limitCategories)
    .map((cat) => {
      const categoryName = getLocalizedCategoryName(
        cat.categorySlug,
        locale as ContentLocale
      );
      return {
        href: buildLinkUrl({
          locale,
          countrySlug,
          categorySlug: cat.categorySlug,
          type: "category",
        }),
        label: categoryName,
        description:
          locale === "nl"
            ? `${cat.placesCount}+ locaties`
            : `${cat.placesCount}+ locations`,
        type: "country_category" as const,
        relevanceScore: cat.placesCount,
      };
    });

  return [
    {
      title: getSectionTitle("topCities", locale),
      links: cityLinks,
      maxDisplay: limitCities,
    },
    {
      title: getSectionTitle("popularCategories", locale),
      links: categoryLinks,
      maxDisplay: limitCategories,
    },
  ];
}

/**
 * Generate "best of" links for a city
 */
export function buildCityBestLinks(params: {
  locale: string;
  countrySlug: string;
  citySlug: string;
  cityName: string;
  categories: CategoryLinkStats[];
  limit?: number;
}): InternalLinkGroup {
  const { locale, countrySlug, citySlug, cityName, categories, limit = 4 } = params;

  const links: InternalLinkItem[] = categories.slice(0, limit).map((cat) => {
    const categoryName = getLocalizedCategoryName(
      cat.categorySlug,
      locale as ContentLocale
    );
    return {
      href: buildLinkUrl({
        locale,
        countrySlug,
        citySlug,
        categorySlug: cat.categorySlug,
        type: "best",
      }),
      label:
        locale === "nl"
          ? `Beste ${categoryName.toLowerCase()}`
          : `Best ${categoryName.toLowerCase()}`,
      type: "city_best" as const,
      relevanceScore: cat.placesCount,
    };
  });

  return {
    title: getSectionTitle("bestInCity", locale, { city: cityName }),
    links,
    maxDisplay: limit,
  };
}

/**
 * Generate "best of" and "top" links for a country
 */
export function buildCountryBestLinks(params: {
  locale: string;
  countrySlug: string;
  countryName: string;
  categories: CategoryLinkStats[];
  limit?: number;
}): InternalLinkGroup {
  const { locale, countrySlug, countryName, categories, limit = 4 } = params;

  const links: InternalLinkItem[] = categories.slice(0, limit).map((cat) => {
    const categoryName = getLocalizedCategoryName(
      cat.categorySlug,
      locale as ContentLocale
    );
    return {
      href: buildLinkUrl({
        locale,
        countrySlug,
        categorySlug: cat.categorySlug,
        type: "best",
      }),
      label:
        locale === "nl"
          ? `Beste ${categoryName.toLowerCase()}`
          : `Best ${categoryName.toLowerCase()}`,
      type: "country_best" as const,
      relevanceScore: cat.placesCount,
    };
  });

  return {
    title: getSectionTitle("bestInCountry", locale, { country: countryName }),
    links,
    maxDisplay: limit,
  };
}

/**
 * Main API: Get internal links for any page type
 * This is the central function that pages should call.
 */
export async function getInternalLinksForPage(
  context: InternalLinkPageContext,
  options: InternalLinkOptions = {}
): Promise<InternalLinksResult> {
  const { limit = 8 } = options;

  // Import query helpers dynamically to avoid circular dependencies
  const {
    getTopCategoriesForCity,
    getTopCitiesForCategory,
    getRelatedPlaces,
    getCountryTopCitiesAndCategories,
  } = await import("@/db/queries/internalLinks");

  const groups: InternalLinkGroup[] = [];
  let allLinks: InternalLinkItem[] = [];

  switch (context.pageType) {
    case "city": {
      if (!context.citySlug || !context.countrySlug) break;

      // Get top categories for this city
      const categories = await getTopCategoriesForCity({
        citySlug: context.citySlug,
        countrySlug: context.countrySlug,
        limit: 6,
      });

      if (categories.length > 0) {
        const categoryGroup = buildCategoryLinksForCity({
          locale: context.locale,
          countrySlug: context.countrySlug,
          citySlug: context.citySlug,
          cityName: context.cityName || context.citySlug,
          categories,
          limit: 6,
        });
        groups.push(categoryGroup);

        // Also add "best of" links
        const bestGroup = buildCityBestLinks({
          locale: context.locale,
          countrySlug: context.countrySlug,
          citySlug: context.citySlug,
          cityName: context.cityName || context.citySlug,
          categories,
          limit: 4,
        });
        groups.push(bestGroup);
      }
      break;
    }

    case "category":
    case "combo": {
      if (!context.categorySlug || !context.countrySlug) break;

      // Get top cities for this category
      const cities = await getTopCitiesForCategory({
        countrySlug: context.countrySlug,
        categorySlug: context.categorySlug,
        limit: 6,
      });

      if (cities.length > 0) {
        const categoryName =
          context.categoryName ||
          getLocalizedCategoryName(
            context.categorySlug,
            context.locale as ContentLocale
          );
        const cityGroup = buildCityLinksForCategory({
          locale: context.locale,
          categorySlug: context.categorySlug,
          categoryName,
          cities,
          limit: 6,
        });
        groups.push(cityGroup);
      }
      break;
    }

    case "place": {
      if (
        !context.placeId ||
        !context.citySlug ||
        !context.categorySlug ||
        !context.countrySlug
      )
        break;

      // Get related places
      const relatedPlaces = await getRelatedPlaces({
        placeId: context.placeId,
        citySlug: context.citySlug,
        categorySlug: context.categorySlug,
        limit: 4,
      });

      if (relatedPlaces.length > 0) {
        const relatedGroup = buildRelatedPlaceLinks({
          locale: context.locale,
          countrySlug: context.countrySlug,
          categorySlug: context.categorySlug,
          places: relatedPlaces,
          limit: 4,
        });
        groups.push(relatedGroup);
      }

      // Add context links (all in city, best in city, etc.)
      const categoryName =
        context.categoryName ||
        getLocalizedCategoryName(
          context.categorySlug,
          context.locale as ContentLocale
        );
      const contextGroup = buildPlaceContextLinks({
        locale: context.locale,
        countrySlug: context.countrySlug,
        countryName: context.countryName || context.countrySlug,
        citySlug: context.citySlug,
        cityName: context.cityName || context.citySlug,
        categorySlug: context.categorySlug,
        categoryName,
      });
      groups.push(contextGroup);
      break;
    }

    case "country": {
      if (!context.countrySlug) break;

      // Get top cities and categories for this country
      const { topCities, topCategories } =
        await getCountryTopCitiesAndCategories({
          countrySlug: context.countrySlug,
          limitCities: 6,
          limitCategories: 6,
        });

      const countryGroups = buildCountryExploreLinks({
        locale: context.locale,
        countrySlug: context.countrySlug,
        countryName: context.countryName || context.countrySlug,
        topCities,
        topCategories,
        limitCities: 6,
        limitCategories: 6,
      });
      groups.push(...countryGroups);

      // Add "best of" links
      if (topCategories.length > 0) {
        const bestGroup = buildCountryBestLinks({
          locale: context.locale,
          countrySlug: context.countrySlug,
          countryName: context.countryName || context.countrySlug,
          categories: topCategories,
          limit: 4,
        });
        groups.push(bestGroup);
      }
      break;
    }

    case "best":
    case "top": {
      // For best/top pages, link to the main category page and other cities
      if (context.categorySlug && context.countrySlug) {
        const cities = await getTopCitiesForCategory({
          countrySlug: context.countrySlug,
          categorySlug: context.categorySlug,
          limit: 6,
        });

        if (cities.length > 0) {
          const categoryName =
            context.categoryName ||
            getLocalizedCategoryName(
              context.categorySlug,
              context.locale as ContentLocale
            );
          const cityGroup = buildCityLinksForCategory({
            locale: context.locale,
            categorySlug: context.categorySlug,
            categoryName,
            cities,
            limit: 6,
          });
          groups.push(cityGroup);
        }
      }
      break;
    }
  }

  // Flatten all links
  allLinks = groups.flatMap((g) => g.links);

  // Apply limit
  if (limit && allLinks.length > limit) {
    allLinks = allLinks.slice(0, limit);
  }

  return {
    links: allLinks,
    groups,
    totalAvailable: allLinks.length,
    context,
  };
}
