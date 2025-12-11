import { eq, and, count } from "drizzle-orm";
import { db } from "../index";
import { countries, cities, provinces } from "../schema";

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
// PROVINCES / STATES / REGIONS
// ============================================================================

export async function getProvincesByCountryId(countryId: number) {
  if (!db) return [];
  return db.query.provinces.findMany({
    where: eq(provinces.countryId, countryId),
    orderBy: (provinces, { asc }) => [asc(provinces.name)],
  });
}

export async function getProvincesByCountrySlug(countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country) return [];
  return getProvincesByCountryId(country.id);
}

export async function getProvinceBySlugAndCountry(provinceSlug: string, countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country || !db) return null;

  return db.query.provinces.findFirst({
    where: and(eq(provinces.slug, provinceSlug), eq(provinces.countryId, country.id)),
    with: {
      country: true,
    },
  });
}

export async function getProvinceById(provinceId: number) {
  if (!db) return null;
  return db.query.provinces.findFirst({
    where: eq(provinces.id, provinceId),
    with: {
      country: true,
    },
  });
}

export async function getProvinceWithCities(provinceSlug: string, countrySlug: string) {
  const country = await getCountryBySlug(countrySlug);
  if (!country || !db) return null;

  return db.query.provinces.findFirst({
    where: and(eq(provinces.slug, provinceSlug), eq(provinces.countryId, country.id)),
    with: {
      country: true,
      cities: {
        orderBy: (cities, { asc }) => [asc(cities.name)],
      },
    },
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
    with: {
      province: true,
    },
  });
}

export async function getCitiesByProvinceId(provinceId: number) {
  if (!db) return [];
  return db.query.cities.findMany({
    where: eq(cities.provinceId, provinceId),
    orderBy: (cities, { asc }) => [asc(cities.name)],
    with: {
      province: true,
      country: true,
    },
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
      province: true,
    },
  });
}

export async function getCityBySlugAndProvince(
  citySlug: string,
  provinceSlug: string,
  countrySlug: string
) {
  const province = await getProvinceBySlugAndCountry(provinceSlug, countrySlug);
  if (!province || !db) return null;

  return db.query.cities.findFirst({
    where: and(eq(cities.slug, citySlug), eq(cities.provinceId, province.id)),
    with: {
      country: true,
      province: true,
    },
  });
}

export async function getCityById(cityId: number) {
  if (!db) return null;
  return db.query.cities.findFirst({
    where: eq(cities.id, cityId),
    with: {
      country: true,
      province: true,
    },
  });
}

// ============================================================================
// COUNTS / STATS
// ============================================================================

export async function getCountryCount() {
  if (!db) return 0;
  const result = await db.select({ count: count() }).from(countries);
  return result[0]?.count ?? 0;
}

export async function getCityCount() {
  if (!db) return 0;
  const result = await db.select({ count: count() }).from(cities);
  return result[0]?.count ?? 0;
}

export async function getCityCountByCountry(countryId: number) {
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(cities)
    .where(eq(cities.countryId, countryId));
  return result[0]?.count ?? 0;
}

export async function getProvinceCountByCountry(countryId: number) {
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(provinces)
    .where(eq(provinces.countryId, countryId));
  return result[0]?.count ?? 0;
}

export async function getCityCountByProvince(provinceId: number) {
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(cities)
    .where(eq(cities.provinceId, provinceId));
  return result[0]?.count ?? 0;
}

// ============================================================================
// TYPES
// ============================================================================

export type Country = Awaited<ReturnType<typeof getCountryBySlug>>;
export type Province = Awaited<ReturnType<typeof getProvinceBySlugAndCountry>>;
export type ProvinceWithCities = Awaited<ReturnType<typeof getProvinceWithCities>>;
export type ProvinceList = Awaited<ReturnType<typeof getProvincesByCountryId>>;
export type City = Awaited<ReturnType<typeof getCityBySlugAndCountry>>;
export type CityList = Awaited<ReturnType<typeof getCitiesByCountryId>>;
