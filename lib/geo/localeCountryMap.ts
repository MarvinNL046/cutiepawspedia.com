/**
 * Locale to Country Mapping
 *
 * Maps user locales to default countries for geo-targeting.
 * Used to show relevant featured businesses based on user's locale.
 */

// Map locale codes to country codes
export const LOCALE_TO_COUNTRY_CODE: Record<string, string> = {
  // Primary language countries
  nl: "NL", // Dutch → Netherlands
  de: "DE", // German → Germany
  fr: "FR", // French → France
  es: "ES", // Spanish → Spain
  it: "IT", // Italian → Italy
  pt: "PT", // Portuguese → Portugal

  // English-speaking countries (default to Netherlands for now, as primary market)
  en: "NL", // English → Netherlands (primary market)
};

// Map locale to country slug for URL routing
export const LOCALE_TO_COUNTRY_SLUG: Record<string, string> = {
  nl: "netherlands",
  de: "germany",
  fr: "france",
  es: "spain",
  it: "italy",
  pt: "portugal",
  en: "netherlands", // Primary market
};

/**
 * Get the default country code for a locale
 */
export function getCountryCodeForLocale(locale: string): string {
  return LOCALE_TO_COUNTRY_CODE[locale] || LOCALE_TO_COUNTRY_CODE["en"];
}

/**
 * Get the default country slug for a locale
 */
export function getCountrySlugForLocale(locale: string): string {
  return LOCALE_TO_COUNTRY_SLUG[locale] || LOCALE_TO_COUNTRY_SLUG["en"];
}

/**
 * Check if a locale has a mapped country
 */
export function hasCountryMapping(locale: string): boolean {
  return locale in LOCALE_TO_COUNTRY_CODE;
}
