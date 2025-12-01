import { eq } from "drizzle-orm";
import { db } from "../index";
import { countries, cities } from "../schema";

// ============================================================================
// COUNTRIES
// ============================================================================

/**
 * Get all countries ordered by name
 */
export async function getCountries() {
  return db.query.countries.findMany({
    orderBy: (countries, { asc }) => [asc(countries.name)],
  });
}

/**
 * Get a country by its slug
 */
export async function getCountryBySlug(slug: string) {
  return db.query.countries.findFirst({
    where: eq(countries.slug, slug),
  });
}

/**
 * Get a country by its ISO code
 */
export async function getCountryByCode(code: string) {
  return db.query.countries.findFirst({
    where: eq(countries.code, code.toUpperCase()),
  });
}

// ============================================================================
// CITIES
// ============================================================================

/**
 * Get all cities for a country
 */
export async function getCitiesByCountryId(countryId: number) {
  return db.query.cities.findMany({
    where: eq(cities.countryId, countryId),
    orderBy: (cities, { asc }) => [asc(cities.name)],
  });
}

/**
 * Get all cities for a country by country slug
 */
export async function getCitiesByCountrySlug(countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];
  return getCitiesByCountryId(country.id);
}

/**
 * Get a city by its slug within a specific country
 */
export async function getCityBySlugAndCountry(citySlug: string, countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country) return null;

  return db.query.cities.findFirst({
    where: (cities, { and, eq }) =>
      and(eq(cities.slug, citySlug), eq(cities.countryId, country.id)),
    with: {
      country: true,
    },
  });
}

/**
 * Get a city by ID with its country
 */
export async function getCityById(cityId: number) {
  return db.query.cities.findFirst({
    where: eq(cities.id, cityId),
    with: {
      country: true,
    },
  });
}

// ============================================================================
// TYPES
// ============================================================================

export type Country = Awaited<ReturnType<typeof getCountryBySlug>>;
export type City = Awaited<ReturnType<typeof getCityBySlugAndCountry>>;
export type CityList = Awaited<ReturnType<typeof getCitiesByCountryId>>;
