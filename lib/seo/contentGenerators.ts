/**
 * Content Generators for CutiePawsPedia
 *
 * Data-driven template functions that generate SEO-friendly content.
 * These work without AI - pure template-based generation with real data.
 */

import type {
  ContentLocale,
  HomeContentInput,
  CountryContentInput,
  CityContentInput,
  CategoryCityContentInput,
  CategoryCountryContentInput,
  BestCategoryContentInput,
  TopCategoryContentInput,
  PlaceContentInput,
  AiContentResult,
  SeoContentResult,
} from "./aiContent";

import {
  getLocalizedStrings,
  getLocalizedCategoryName,
  formatNumber,
  formatRating,
  formatList,
  truncateText,
} from "./aiContent";

// =============================================================================
// HOME PAGE CONTENT
// =============================================================================

/**
 * Generate content for the home page
 */
export function generateHomeContent(input: HomeContentInput): SeoContentResult {
  const { locale, totalCountries, totalCities, totalPlaces, topCategories } = input;
  const s = getLocalizedStrings(locale);

  const intro =
    locale === "nl"
      ? `Welkom bij CutiePawsPedia, dé gids voor huisdierdiensten. Ontdek ${formatNumber(totalPlaces, locale)} ${s.places} in ${formatNumber(totalCities, locale)} ${s.cities} verspreid over ${formatNumber(totalCountries, locale)} ${s.countries}.`
      : `Welcome to CutiePawsPedia, the guide for pet services. Discover ${formatNumber(totalPlaces, locale)} ${s.places} in ${formatNumber(totalCities, locale)} ${s.cities} across ${formatNumber(totalCountries, locale)} ${s.countries}.`;

  const secondary =
    locale === "nl"
      ? `Van ${s.veterinarians} tot ${s.petStores} en ${s.groomers} – vind de beste zorg ${s.forYourPet}.`
      : `From ${s.veterinarians} to ${s.petStores} and ${s.groomers} – find the best care ${s.forYourPet}.`;

  const bullets = topCategories?.slice(0, 4).map((cat) => {
    const categoryName = getLocalizedCategoryName(cat.slug, locale);
    return locale === "nl"
      ? `${categoryName}: ${formatNumber(cat.count, locale)} locaties`
      : `${categoryName}: ${formatNumber(cat.count, locale)} locations`;
  });

  const metaDescription = truncateText(
    locale === "nl"
      ? `CutiePawsPedia: Vind ${formatNumber(totalPlaces, locale)} huisdierdiensten in ${formatNumber(totalCities, locale)} steden. Dierenartsen, dierenwinkels, trimsalons en meer.`
      : `CutiePawsPedia: Find ${formatNumber(totalPlaces, locale)} pet services in ${formatNumber(totalCities, locale)} cities. Veterinarians, pet stores, groomers and more.`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1: locale === "nl" ? "Vind de beste huisdierdiensten" : "Find the best pet services",
  };
}

// =============================================================================
// COUNTRY PAGE CONTENT
// =============================================================================

/**
 * Generate content for a country page
 */
export function generateCountryContent(input: CountryContentInput): SeoContentResult {
  const { locale, countryName, totalCities, totalPlaces, topCategories } = input;
  const s = getLocalizedStrings(locale);

  const topCategoryNames = topCategories
    .slice(0, 3)
    .map((cat) => getLocalizedCategoryName(cat.slug, locale).toLowerCase());

  const intro =
    locale === "nl"
      ? `${s.discover} ${formatNumber(totalPlaces, locale)} huisdierdiensten in ${countryName}. Van ${formatList(topCategoryNames, locale)} – vind de perfecte zorg voor je huisdier in ${formatNumber(totalCities, locale)} steden.`
      : `${s.discover} ${formatNumber(totalPlaces, locale)} pet services in ${countryName}. From ${formatList(topCategoryNames, locale)} – find perfect care for your pet across ${formatNumber(totalCities, locale)} cities.`;

  const secondary =
    locale === "nl"
      ? `Alle locaties zijn gesorteerd op beoordelingen en reviews van andere huisdiereigenaren.`
      : `All locations are sorted by ratings and reviews from other pet owners.`;

  const bullets = topCategories.slice(0, 5).map((cat) => {
    const categoryName = getLocalizedCategoryName(cat.slug, locale);
    return locale === "nl"
      ? `${categoryName}: ${formatNumber(cat.count, locale)} in ${countryName}`
      : `${categoryName}: ${formatNumber(cat.count, locale)} in ${countryName}`;
  });

  const metaDescription = truncateText(
    locale === "nl"
      ? `Huisdierdiensten in ${countryName}: ${formatNumber(totalPlaces, locale)} locaties in ${formatNumber(totalCities, locale)} steden. Vind dierenartsen, winkels, salons en meer.`
      : `Pet services in ${countryName}: ${formatNumber(totalPlaces, locale)} locations in ${formatNumber(totalCities, locale)} cities. Find vets, stores, groomers and more.`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1:
      locale === "nl"
        ? `Huisdierdiensten in ${countryName}`
        : `Pet Services in ${countryName}`,
  };
}

// =============================================================================
// CITY PAGE CONTENT
// =============================================================================

/**
 * Generate content for a city page
 */
export function generateCityContent(input: CityContentInput): SeoContentResult {
  const { locale, cityName, countryName, totalPlaces, categoryStats } = input;
  const s = getLocalizedStrings(locale);

  const topCategories = categoryStats.slice(0, 3);
  const categoryNames = topCategories.map((cat) =>
    getLocalizedCategoryName(cat.slug, locale).toLowerCase()
  );

  const intro =
    locale === "nl"
      ? `${s.find} ${formatNumber(totalPlaces, locale)} huisdierdiensten in ${cityName}, ${countryName}. Van ${formatList(categoryNames, locale)} – alle diensten voor je huisdier op één plek.`
      : `${s.find} ${formatNumber(totalPlaces, locale)} pet services in ${cityName}, ${countryName}. From ${formatList(categoryNames, locale)} – all services for your pet in one place.`;

  const secondary =
    locale === "nl"
      ? `Bekijk reviews, vergelijk diensten en vind de beste zorg ${s.nearYou}.`
      : `View reviews, compare services and find the best care ${s.nearYou}.`;

  const bullets = categoryStats.slice(0, 6).map((cat) => {
    const categoryName = getLocalizedCategoryName(cat.slug, locale);
    return `${categoryName}: ${formatNumber(cat.count, locale)}`;
  });

  const metaDescription = truncateText(
    locale === "nl"
      ? `${formatNumber(totalPlaces, locale)} huisdierdiensten in ${cityName}. Dierenartsen, winkels, trimsalons en meer in ${cityName}, ${countryName}.`
      : `${formatNumber(totalPlaces, locale)} pet services in ${cityName}. Veterinarians, stores, groomers and more in ${cityName}, ${countryName}.`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1:
      locale === "nl"
        ? `Huisdierdiensten in ${cityName}`
        : `Pet Services in ${cityName}`,
  };
}

// =============================================================================
// CATEGORY IN CITY CONTENT
// =============================================================================

/**
 * Generate content for a category-in-city page (e.g., Vets in Amsterdam)
 */
export function generateCategoryCityContent(
  input: CategoryCityContentInput
): SeoContentResult {
  const { locale, cityName, countryName, categoryName, totalPlaces, avgRating, topRatedPlace } =
    input;
  const s = getLocalizedStrings(locale);

  let intro =
    locale === "nl"
      ? `${s.find} ${formatNumber(totalPlaces, locale)} ${categoryName.toLowerCase()} in ${cityName}.`
      : `${s.find} ${formatNumber(totalPlaces, locale)} ${categoryName.toLowerCase()} in ${cityName}.`;

  if (avgRating && avgRating > 0) {
    intro +=
      locale === "nl"
        ? ` Gemiddelde beoordeling: ${formatRating(avgRating)} sterren.`
        : ` Average rating: ${formatRating(avgRating)} stars.`;
  }

  let secondary =
    locale === "nl"
      ? `Vergelijk reviews en vind de beste ${categoryName.toLowerCase()} ${s.nearYou} in ${cityName}.`
      : `Compare reviews and find the best ${categoryName.toLowerCase()} ${s.nearYou} in ${cityName}.`;

  if (topRatedPlace) {
    secondary +=
      locale === "nl"
        ? ` ${s.topRated}: ${topRatedPlace.name} (${formatRating(topRatedPlace.rating)} sterren).`
        : ` ${s.topRated}: ${topRatedPlace.name} (${formatRating(topRatedPlace.rating)} stars).`;
  }

  const metaDescription = truncateText(
    locale === "nl"
      ? `${categoryName} in ${cityName}: ${formatNumber(totalPlaces, locale)} locaties${avgRating ? `, gem. ${formatRating(avgRating)} sterren` : ""}. Vind de beste ${categoryName.toLowerCase()} in ${cityName}, ${countryName}.`
      : `${categoryName} in ${cityName}: ${formatNumber(totalPlaces, locale)} locations${avgRating ? `, avg. ${formatRating(avgRating)} stars` : ""}. Find the best ${categoryName.toLowerCase()} in ${cityName}, ${countryName}.`,
    160
  );

  return {
    intro,
    secondary,
    metaDescription,
    h1: `${categoryName} in ${cityName}`,
  };
}

// =============================================================================
// CATEGORY IN COUNTRY CONTENT
// =============================================================================

/**
 * Generate content for a national category page (e.g., Vets in Netherlands)
 */
export function generateCategoryCountryContent(
  input: CategoryCountryContentInput
): SeoContentResult {
  const { locale, countryName, categoryName, totalPlaces, totalCities, avgRating, topCities } =
    input;
  const s = getLocalizedStrings(locale);

  let intro =
    locale === "nl"
      ? `${s.discover} ${formatNumber(totalPlaces, locale)} ${categoryName.toLowerCase()} in ${countryName}, verspreid over ${formatNumber(totalCities, locale)} steden.`
      : `${s.discover} ${formatNumber(totalPlaces, locale)} ${categoryName.toLowerCase()} in ${countryName}, across ${formatNumber(totalCities, locale)} cities.`;

  if (avgRating && avgRating > 0) {
    intro +=
      locale === "nl"
        ? ` Gemiddelde beoordeling: ${formatRating(avgRating)} sterren.`
        : ` Average rating: ${formatRating(avgRating)} stars.`;
  }

  const secondary =
    locale === "nl"
      ? `Alle ${categoryName.toLowerCase()} zijn gesorteerd op beoordelingen en reviews. ${s.find} de ${s.best} ${categoryName.toLowerCase()} in je stad.`
      : `All ${categoryName.toLowerCase()} are sorted by ratings and reviews. ${s.find} the ${s.best} ${categoryName.toLowerCase()} in your city.`;

  const bullets = topCities?.slice(0, 5).map((city) =>
    locale === "nl"
      ? `${city.name}: ${formatNumber(city.count, locale)} ${categoryName.toLowerCase()}`
      : `${city.name}: ${formatNumber(city.count, locale)} ${categoryName.toLowerCase()}`
  );

  const metaDescription = truncateText(
    locale === "nl"
      ? `${categoryName} in ${countryName}: ${formatNumber(totalPlaces, locale)} locaties in ${formatNumber(totalCities, locale)} steden. Vind de beste ${categoryName.toLowerCase()} bij jou in de buurt.`
      : `${categoryName} in ${countryName}: ${formatNumber(totalPlaces, locale)} locations in ${formatNumber(totalCities, locale)} cities. Find the best ${categoryName.toLowerCase()} near you.`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1: `${categoryName} in ${countryName}`,
  };
}

// =============================================================================
// BEST OF CATEGORY CONTENT
// =============================================================================

/**
 * Generate content for best-of pages (city or country level)
 */
export function generateBestCategoryContent(
  input: BestCategoryContentInput
): SeoContentResult {
  const { locale, cityName, countryName, categoryName, totalRanked, highlightedPlaces } = input;
  const s = getLocalizedStrings(locale);
  const locationName = cityName || countryName;
  const isCity = !!cityName;

  const intro =
    locale === "nl"
      ? `De ${s.best} ${categoryName.toLowerCase()} in ${locationName}. ${s.sortedByReviews}.`
      : `The ${s.best} ${categoryName.toLowerCase()} in ${locationName}. ${s.sortedByReviews}.`;

  let secondary =
    locale === "nl"
      ? `Deze ranking bevat ${formatNumber(totalRanked, locale)} ${categoryName.toLowerCase()}, geselecteerd op basis van reviews en beoordelingen.`
      : `This ranking includes ${formatNumber(totalRanked, locale)} ${categoryName.toLowerCase()}, selected based on reviews and ratings.`;

  // Highlight top 3
  const top3 = highlightedPlaces.slice(0, 3);
  if (top3.length > 0) {
    const top3Names = top3.map((p) => p.name);
    secondary +=
      locale === "nl"
        ? ` Top 3: ${formatList(top3Names, locale)}.`
        : ` Top 3: ${formatList(top3Names, locale)}.`;
  }

  const bullets = highlightedPlaces.slice(0, 5).map((place, index) => {
    const rating = place.rating ? ` (${formatRating(place.rating)}★)` : "";
    const city = !isCity && place.cityName ? ` - ${place.cityName}` : "";
    return `#${index + 1} ${place.name}${rating}${city}`;
  });

  const metaDescription = truncateText(
    locale === "nl"
      ? `Beste ${categoryName.toLowerCase()} in ${locationName} (${new Date().getFullYear()}). Top ${totalRanked} gesorteerd op reviews. ${top3.length > 0 ? `#1: ${top3[0].name}` : ""}`
      : `Best ${categoryName.toLowerCase()} in ${locationName} (${new Date().getFullYear()}). Top ${totalRanked} sorted by reviews. ${top3.length > 0 ? `#1: ${top3[0].name}` : ""}`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1:
      locale === "nl"
        ? `Beste ${categoryName} in ${locationName}`
        : `Best ${categoryName} in ${locationName}`,
  };
}

// =============================================================================
// TOP N CATEGORY CONTENT
// =============================================================================

/**
 * Generate content for Top N ranking pages (e.g., Top 10 Vets in Netherlands)
 */
export function generateTopCategoryContent(
  input: TopCategoryContentInput
): SeoContentResult {
  const { locale, countryName, categoryName, topCount, highlightedPlaces, year } = input;
  const s = getLocalizedStrings(locale);
  const displayYear = year || new Date().getFullYear();

  const intro =
    locale === "nl"
      ? `De top ${topCount} ${categoryName.toLowerCase()} in ${countryName} (${displayYear}). ${s.basedOn} reviews, beoordelingen en populariteit.`
      : `The top ${topCount} ${categoryName.toLowerCase()} in ${countryName} (${displayYear}). ${s.basedOn} reviews, ratings and popularity.`;

  // Create secondary with winner highlight
  let secondary = "";
  if (highlightedPlaces.length > 0) {
    const winner = highlightedPlaces[0];
    secondary =
      locale === "nl"
        ? `#1 dit jaar: ${winner.name} (${winner.cityName})${winner.rating ? ` met ${formatRating(winner.rating)} sterren` : ""}.`
        : `#1 this year: ${winner.name} (${winner.cityName})${winner.rating ? ` with ${formatRating(winner.rating)} stars` : ""}.`;
  }

  const bullets = highlightedPlaces.slice(0, topCount).map((place, index) => {
    const rating = place.rating ? ` - ${formatRating(place.rating)}★` : "";
    const reviews = place.reviewCount ? ` (${place.reviewCount} reviews)` : "";
    return `#${index + 1} ${place.name}, ${place.cityName}${rating}${reviews}`;
  });

  const metaDescription = truncateText(
    locale === "nl"
      ? `Top ${topCount} ${categoryName.toLowerCase()} in ${countryName} (${displayYear}). Ranking gebaseerd op reviews en beoordelingen. #1: ${highlightedPlaces[0]?.name || ""}`
      : `Top ${topCount} ${categoryName.toLowerCase()} in ${countryName} (${displayYear}). Ranking based on reviews and ratings. #1: ${highlightedPlaces[0]?.name || ""}`,
    160
  );

  return {
    intro,
    secondary,
    bullets,
    metaDescription,
    h1: `Top ${topCount} ${categoryName} in ${countryName} (${displayYear})`,
  };
}

// =============================================================================
// PLACE DETAIL CONTENT
// =============================================================================

/**
 * Generate content for a place detail page
 */
export function generatePlaceContent(input: PlaceContentInput): SeoContentResult {
  const {
    locale,
    placeName,
    cityName,
    countryName,
    categories,
    rating,
    reviewCount,
    description,
    services,
    petTypes,
  } = input;
  const s = getLocalizedStrings(locale);

  // Start with existing description or generate one
  let intro = description || "";

  if (!intro) {
    const categoryNames = categories
      .slice(0, 2)
      .map((cat) => getLocalizedCategoryName(cat, locale).toLowerCase());

    intro =
      locale === "nl"
        ? `${placeName} is een ${formatList(categoryNames, locale)} in ${cityName}, ${countryName}.`
        : `${placeName} is a ${formatList(categoryNames, locale)} in ${cityName}, ${countryName}.`;
  }

  // Add rating info if available
  let secondary = "";
  if (rating && reviewCount) {
    secondary =
      locale === "nl"
        ? `Beoordeling: ${formatRating(rating)} sterren gebaseerd op ${formatNumber(reviewCount, locale)} reviews.`
        : `Rating: ${formatRating(rating)} stars based on ${formatNumber(reviewCount, locale)} reviews.`;
  }

  // Build bullets from services and pet types
  const bullets: string[] = [];

  if (services && services.length > 0) {
    const serviceLabel = locale === "nl" ? "Diensten" : "Services";
    bullets.push(`${serviceLabel}: ${formatList(services.slice(0, 5), locale)}`);
  }

  if (petTypes && petTypes.length > 0) {
    const petLabel = locale === "nl" ? "Huisdieren" : "Pets";
    bullets.push(`${petLabel}: ${formatList(petTypes, locale)}`);
  }

  // Add categories as bullet
  if (categories.length > 0) {
    const categoryLabel = locale === "nl" ? "Categorieën" : "Categories";
    const catNames = categories.map((cat) => getLocalizedCategoryName(cat, locale));
    bullets.push(`${categoryLabel}: ${formatList(catNames, locale)}`);
  }

  // Build meta description
  const ratingText =
    rating && reviewCount
      ? locale === "nl"
        ? ` ${formatRating(rating)}★ (${reviewCount} reviews).`
        : ` ${formatRating(rating)}★ (${reviewCount} reviews).`
      : "";

  const metaDescription = truncateText(
    locale === "nl"
      ? `${placeName} in ${cityName}, ${countryName}.${ratingText} ${categories.slice(0, 2).map((c) => getLocalizedCategoryName(c, locale)).join(", ")}.`
      : `${placeName} in ${cityName}, ${countryName}.${ratingText} ${categories.slice(0, 2).map((c) => getLocalizedCategoryName(c, locale)).join(", ")}.`,
    160
  );

  return {
    intro: truncateText(intro, 300),
    secondary,
    bullets: bullets.length > 0 ? bullets : undefined,
    metaDescription,
    h1: placeName,
    schemaDescription: truncateText(intro, 200),
  };
}

// =============================================================================
// UNIFIED CONTENT GENERATOR
// =============================================================================

/**
 * Generate content based on scope and input
 * This is the main entry point for content generation
 */
export function generateContent(
  scope: "home",
  input: HomeContentInput
): SeoContentResult;
export function generateContent(
  scope: "country",
  input: CountryContentInput
): SeoContentResult;
export function generateContent(
  scope: "city",
  input: CityContentInput
): SeoContentResult;
export function generateContent(
  scope: "category-city",
  input: CategoryCityContentInput
): SeoContentResult;
export function generateContent(
  scope: "category-country",
  input: CategoryCountryContentInput
): SeoContentResult;
export function generateContent(
  scope: "best-category-city" | "best-category-country",
  input: BestCategoryContentInput
): SeoContentResult;
export function generateContent(
  scope: "top-category-country",
  input: TopCategoryContentInput
): SeoContentResult;
export function generateContent(
  scope: "place",
  input: PlaceContentInput
): SeoContentResult;
export function generateContent(
  scope: string,
  input:
    | HomeContentInput
    | CountryContentInput
    | CityContentInput
    | CategoryCityContentInput
    | CategoryCountryContentInput
    | BestCategoryContentInput
    | TopCategoryContentInput
    | PlaceContentInput
): SeoContentResult {
  switch (scope) {
    case "home":
      return generateHomeContent(input as HomeContentInput);
    case "country":
      return generateCountryContent(input as CountryContentInput);
    case "city":
      return generateCityContent(input as CityContentInput);
    case "category-city":
      return generateCategoryCityContent(input as CategoryCityContentInput);
    case "category-country":
      return generateCategoryCountryContent(input as CategoryCountryContentInput);
    case "best-category-city":
    case "best-category-country":
      return generateBestCategoryContent(input as BestCategoryContentInput);
    case "top-category-country":
      return generateTopCategoryContent(input as TopCategoryContentInput);
    case "place":
      return generatePlaceContent(input as PlaceContentInput);
    default:
      // Fallback: return empty content
      return {
        intro: "",
        metaDescription: "",
      };
  }
}

// =============================================================================
// FALLBACK CONTENT (for error cases)
// =============================================================================

/**
 * Generate minimal fallback content when data is unavailable
 */
export function generateFallbackContent(
  locale: ContentLocale,
  entityName: string,
  entityType: "location" | "category" | "place"
): AiContentResult {
  const s = getLocalizedStrings(locale);

  switch (entityType) {
    case "location":
      return {
        intro:
          locale === "nl"
            ? `${s.discover} huisdierdiensten in ${entityName}.`
            : `${s.discover} pet services in ${entityName}.`,
      };
    case "category":
      return {
        intro:
          locale === "nl"
            ? `${s.find} de ${s.best} ${entityName.toLowerCase()} ${s.nearYou}.`
            : `${s.find} the ${s.best} ${entityName.toLowerCase()} ${s.nearYou}.`,
      };
    case "place":
      return {
        intro:
          locale === "nl"
            ? `${entityName} - huisdierdienst.`
            : `${entityName} - pet service.`,
      };
  }
}
