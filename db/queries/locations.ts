import { eq } from "drizzle-orm";
import { db } from "../index";
import { countries, cities } from "../schema";

// ============================================================================
// COUNTRIES
// ============================================================================

export async function getCountries() {
  if (!db) return [];
  return db.query.countries.findMany({
    orderBy: (countries, { asc }) => [asc(countries.name)],
  });
}

export async function getCountryBySlug(slug: string) {
  if (!db) return null;
  return db.query.countries.findFirst({
    where: eq(countries.slug, slug),
  });
}

export async function getCountryByCode(code: string) {
  if (!db) return null;
  return db.query.countries.findFirst({
    where: eq(countries.code, code.toUpperCase()),
  });
}

// ============================================================================
// CITIES
// ============================================================================

export async function getCitiesByCountryId(countryId: number) {
  if (!db) return [];
  return db.query.cities.findMany({
    where: eq(cities.countryId, countryId),
    orderBy: (cities, { asc }) => [asc(cities.name)],
  });
}

export async function getCitiesByCountrySlug(countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];
  return getCitiesByCountryId(country.id);
}

export async function getCityBySlugAndCountry(citySlug: string, countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country || !db) return null;

  return db.query.cities.findFirst({
    where: (cities, { and, eq }) =>
      and(eq(cities.slug, citySlug), eq(cities.countryId, country.id)),
    with: {
      country: true,
    },
  });
}

export async function getCityById(cityId: number) {
  if (!db) return null;
  return db.query.cities.findFirst({
    where: eq(cities.id, cityId),
    with: {
      country: true,
    },
  });
}

// ============================================================================
// COUNTS / STATS
// ============================================================================

export async function getCountryCount() {
  if (!db) return 0;
  const result = await db.query.countries.findMany();
  return result.length;
}

export async function getCityCount() {
  if (!db) return 0;
  const result = await db.query.cities.findMany();
  return result.length;
}

export async function getCityCountByCountry(countryId: number) {
  if (!db) return 0;
  const result = await db.query.cities.findMany({
    where: eq(cities.countryId, countryId),
  });
  return result.length;
}

// ============================================================================
// TYPES
// ============================================================================

export type Country = Awaited<ReturnType<typeof getCountryBySlug>>;
export type City = Awaited<ReturnType<typeof getCityBySlugAndCountry>>;
export type CityList = Awaited<ReturnType<typeof getCitiesByCountryId>>;
