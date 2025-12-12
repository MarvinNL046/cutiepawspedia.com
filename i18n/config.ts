/**
 * i18n Configuration for CutiePawsPedia
 * Supports: Dutch (nl), German (de), English (en), French (fr)
 */

export const locales = ['nl', 'de', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'nl';

// Locale display names for language switcher
export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
};

// Locale to country mapping (primary country for each locale)
export const localeCountries: Record<Locale, string> = {
  nl: 'NL',
  de: 'DE',
  en: 'GB',
  fr: 'FR',
};

// Countries that use each locale
export const countryToLocale: Record<string, Locale> = {
  NL: 'nl',
  BE: 'nl', // Belgium defaults to Dutch, but supports French too
  DE: 'de',
  AT: 'de', // Austria uses German
  CH: 'de', // Switzerland defaults to German
  GB: 'en',
  IE: 'en',
  US: 'en',
  FR: 'fr',
  LU: 'fr', // Luxembourg defaults to French
};

// Check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from country code
export function getLocaleFromCountry(countryCode: string): Locale {
  return countryToLocale[countryCode.toUpperCase()] || defaultLocale;
}
