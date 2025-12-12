/**
 * SEO URL Helpers
 *
 * Functions for building canonical URLs and page URLs.
 */

import type { SeoContext } from "./types";
import { getLocalesForCountry, DEFAULT_SEO_CONFIG } from "./types";

// =============================================================================
// BASE URL
// =============================================================================

/**
 * Get the base URL for the site
 * Reads from NEXT_PUBLIC_SITE_URL env var, falls back to localhost in dev
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Development fallback
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Production fallback (should have NEXT_PUBLIC_SITE_URL set)
  return "https://cutiepawspedia.com";
}

// =============================================================================
// CANONICAL URL BUILDERS
// =============================================================================

/**
 * Build the canonical URL for a page based on context
 */
export function buildCanonicalUrl(ctx: SeoContext): string {
  const base = getBaseUrl();
  const parts: string[] = [ctx.locale];

  if (ctx.countrySlug) {
    parts.push(ctx.countrySlug);
  }
  if (ctx.citySlug) {
    parts.push(ctx.citySlug);
  }
  if (ctx.categorySlug) {
    parts.push(ctx.categorySlug);
  }
  if (ctx.placeSlug) {
    parts.push(ctx.placeSlug);
  }

  return `${base}/${parts.join("/")}`;
}

// =============================================================================
// PAGE-SPECIFIC URL BUILDERS
// =============================================================================

/**
 * Build URL for home page
 */
export function buildHomeUrl(locale: string): string {
  const base = getBaseUrl();
  return `${base}/${locale}`;
}

/**
 * Build URL for country page
 */
export function buildCountryUrl(locale: string, countrySlug: string): string {
  const base = getBaseUrl();
  return `${base}/${locale}/${countrySlug}`;
}

/**
 * Build URL for city page
 */
export function buildCityUrl(
  locale: string,
  countrySlug: string,
  citySlug: string
): string {
  const base = getBaseUrl();
  return `${base}/${locale}/${countrySlug}/${citySlug}`;
}

/**
 * Build URL for category-in-city page
 */
export function buildCategoryUrl(
  locale: string,
  countrySlug: string,
  citySlug: string,
  categorySlug: string
): string {
  const base = getBaseUrl();
  return `${base}/${locale}/${countrySlug}/${citySlug}/${categorySlug}`;
}

/**
 * Build URL for place detail page
 */
export function buildPlaceUrl(
  locale: string,
  countrySlug: string,
  citySlug: string,
  categorySlug: string,
  placeSlug: string
): string {
  const base = getBaseUrl();
  return `${base}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${placeSlug}`;
}

// =============================================================================
// ALTERNATE LANGUAGE URLS
// =============================================================================

/**
 * Build alternate language URLs for hreflang tags
 * Automatically filters to only locales valid for the country if countrySlug is present
 */
export function buildAlternateUrls(
  ctx: SeoContext,
  supportedLocales?: string[]
): Record<string, string> {
  const alternates: Record<string, string> = {};

  // If we have a country context, only use locales valid for that country
  // Otherwise use provided locales or default to all supported locales
  let locales = supportedLocales || DEFAULT_SEO_CONFIG.supportedLocales;
  if (ctx.countrySlug) {
    const countryLocales = getLocalesForCountry(ctx.countrySlug);
    // If supportedLocales was explicitly provided, intersect with country locales
    // Otherwise just use country locales
    if (supportedLocales) {
      locales = supportedLocales.filter(l => countryLocales.includes(l));
    } else {
      locales = countryLocales;
    }
  }

  for (const locale of locales) {
    const altCtx = { ...ctx, locale };
    alternates[locale] = buildCanonicalUrl(altCtx);
  }

  // Add x-default pointing to first available locale for this context
  const defaultLocale = locales.includes("nl") ? "nl" : locales[0];
  alternates["x-default"] = buildCanonicalUrl({ ...ctx, locale: defaultLocale });

  return alternates;
}

// =============================================================================
// PATH HELPERS
// =============================================================================

/**
 * Build a relative path (without base URL)
 */
export function buildRelativePath(ctx: SeoContext): string {
  const parts: string[] = [ctx.locale];

  if (ctx.countrySlug) parts.push(ctx.countrySlug);
  if (ctx.citySlug) parts.push(ctx.citySlug);
  if (ctx.categorySlug) parts.push(ctx.categorySlug);
  if (ctx.placeSlug) parts.push(ctx.placeSlug);

  return `/${parts.join("/")}`;
}

/**
 * Determine the page type from context
 */
export function getPageTypeFromContext(
  ctx: SeoContext
): "home" | "country" | "city" | "category" | "place" {
  if (ctx.placeSlug) return "place";
  if (ctx.categorySlug) return "category";
  if (ctx.citySlug) return "city";
  if (ctx.countrySlug) return "country";
  return "home";
}
