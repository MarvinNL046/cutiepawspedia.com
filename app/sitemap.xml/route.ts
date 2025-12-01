/**
 * Dynamic Sitemap XML Generator
 *
 * CACHING STRATEGY: Dynamic with Edge Caching
 * - Cache-Control: 1 hour with stale-while-revalidate
 * - Supports chunked sitemaps for >50k URLs (sitemap index)
 * - Optimized queries: minimal columns, no N+1
 * - Falls back to static URLs on database errors
 */

import { NextResponse } from "next/server";
import { db } from "@/db";
import { countries, cities, categories, places, placeCategories } from "@/db/schema";
import { eq } from "drizzle-orm";

// Force dynamic generation - sitemap needs fresh data
export const dynamic = "force-dynamic";

const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
const LOCALES = ["en", "nl"];
const MAX_URLS_PER_SITEMAP = 50000;

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

/**
 * Generate sitemap XML from URLs
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority !== undefined ? `<priority>${url.priority.toFixed(1)}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generate sitemap index for large sites
 */
function generateSitemapIndex(sitemaps: string[]): string {
  const sitemapEntries = sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${escapeXml(sitemap)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Escape special characters for XML
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Get all sitemap URLs
 */
async function getAllUrls(): Promise<SitemapUrl[]> {
  if (!db) {
    return getStaticUrls();
  }

  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  urls.push(...getStaticUrls());

  // Countries
  const allCountries = await db.select().from(countries);
  for (const country of allCountries) {
    for (const locale of LOCALES) {
      urls.push({
        loc: `${BASE_URL}/${locale}/${country.slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: 0.8,
      });
    }
  }

  // Cities with their countries
  const allCities = await db
    .select({
      citySlug: cities.slug,
      countrySlug: countries.slug,
    })
    .from(cities)
    .innerJoin(countries, eq(cities.countryId, countries.id));

  for (const city of allCities) {
    for (const locale of LOCALES) {
      urls.push({
        loc: `${BASE_URL}/${locale}/${city.countrySlug}/${city.citySlug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: 0.7,
      });
    }
  }

  // Categories (all combinations of city + category)
  const allCategories = await db.select().from(categories);

  for (const city of allCities) {
    for (const category of allCategories) {
      for (const locale of LOCALES) {
        urls.push({
          loc: `${BASE_URL}/${locale}/${city.countrySlug}/${city.citySlug}/${category.slug}`,
          lastmod: today,
          changefreq: "daily",
          priority: 0.6,
        });
      }
    }
  }

  // Individual places with their full path
  const allPlaces = await db
    .select({
      placeSlug: places.slug,
      placeUpdatedAt: places.updatedAt,
      citySlug: cities.slug,
      countrySlug: countries.slug,
      categorySlug: categories.slug,
    })
    .from(places)
    .innerJoin(cities, eq(places.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .innerJoin(placeCategories, eq(places.id, placeCategories.placeId))
    .innerJoin(categories, eq(placeCategories.categoryId, categories.id));

  // Use a Set to avoid duplicate place URLs (a place can have multiple categories)
  const placeUrlsSet = new Set<string>();

  for (const place of allPlaces) {
    for (const locale of LOCALES) {
      const url = `${BASE_URL}/${locale}/${place.countrySlug}/${place.citySlug}/${place.categorySlug}/${place.placeSlug}`;

      if (!placeUrlsSet.has(url)) {
        placeUrlsSet.add(url);
        urls.push({
          loc: url,
          lastmod: place.placeUpdatedAt?.toISOString().split("T")[0] || today,
          changefreq: "weekly",
          priority: 0.5,
        });
      }
    }
  }

  return urls;
}

/**
 * Get static page URLs
 */
function getStaticUrls(): SitemapUrl[] {
  const today = new Date().toISOString().split("T")[0];
  const staticPages = ["", "search", "for-businesses", "about", "contact", "privacy", "terms"];
  const urls: SitemapUrl[] = [];

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      urls.push({
        loc: `${BASE_URL}/${locale}${page ? `/${page}` : ""}`,
        lastmod: today,
        changefreq: page === "" ? "daily" : "monthly",
        priority: page === "" ? 1.0 : 0.3,
      });
    }
  }

  return urls;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    const allUrls = await getAllUrls();

    // If we have more than MAX_URLS_PER_SITEMAP, chunk and return sitemap index
    if (allUrls.length > MAX_URLS_PER_SITEMAP && !page) {
      const numSitemaps = Math.ceil(allUrls.length / MAX_URLS_PER_SITEMAP);
      const sitemaps: string[] = [];

      for (let i = 1; i <= numSitemaps; i++) {
        sitemaps.push(`${BASE_URL}/sitemap.xml?page=${i}`);
      }

      return new NextResponse(generateSitemapIndex(sitemaps), {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    // If page is specified, return that chunk
    if (page) {
      const pageNum = parseInt(page, 10);
      const start = (pageNum - 1) * MAX_URLS_PER_SITEMAP;
      const end = start + MAX_URLS_PER_SITEMAP;
      const chunkUrls = allUrls.slice(start, end);

      return new NextResponse(generateSitemapXml(chunkUrls), {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    // Return single sitemap for smaller sites
    return new NextResponse(generateSitemapXml(allUrls), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);

    // Return static sitemap on error
    return new NextResponse(generateSitemapXml(getStaticUrls()), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
