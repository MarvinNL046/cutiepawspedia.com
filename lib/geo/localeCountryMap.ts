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

// Map country code to preferred locale (for country-based locale switching)
export const COUNTRY_CODE_TO_LOCALE: Record<string, string> = {
  NL: "nl", // Netherlands → Dutch
  DE: "de", // Germany → German
  FR: "fr", // France → French
  ES: "es", // Spain → Spanish
  IT: "it", // Italy → Italian
  PT: "pt", // Portugal → Portuguese
  BE: "nl", // Belgium → Dutch (could also be fr)
  AT: "de", // Austria → German
  CH: "de", // Switzerland → German (could also be fr/it)
  GB: "en", // United Kingdom → English
  US: "en", // United States → English
  CA: "en", // Canada → English (could also be fr)
  AU: "en", // Australia → English
  IE: "en", // Ireland → English
};

/**
 * Get the preferred locale for a country code
 * Falls back to 'en' if no mapping exists
 */
export function getLocaleForCountryCode(countryCode: string): string {
  return COUNTRY_CODE_TO_LOCALE[countryCode.toUpperCase()] || "en";
}

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
