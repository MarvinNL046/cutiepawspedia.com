/**
 * Sitemap Index Route (/sitemap.xml)
 *
 * Main sitemap entry point that lists all section-based sitemaps.
 * Google and other crawlers start here and follow links to individual sitemaps.
 *
 * CACHING STRATEGY: ISR with Edge Caching
 * - revalidate: 3600s (1 hour) - Sitemap structure changes rarely
 * - New sections are added as content grows
 * - Segmented approach for scalability (each section < 50k URLs)
 */

import { NextResponse } from "next/server";
import { buildSitemapIndexXml, type SitemapSection, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

// ISR: Sitemap index changes rarely, 1-hour revalidation
export const revalidate = 3600;

/**
 * Define all sitemap sections
 * Each section corresponds to a separate sitemap file for better crawl efficiency
 */
function getSitemapSections(): SitemapSection[] {
  const today = new Date().toISOString().split("T")[0];

  return [
    // Static pages (about, contact, privacy, search, etc.)
    {
      id: "static",
      path: "/sitemap-static.xml",
      lastmod: today,
    },

    // Geographic hierarchy - Countries
    {
      id: "countries",
      path: "/sitemap-countries.xml",
      lastmod: today,
    },

    // Geographic hierarchy - Provinces
    {
      id: "provinces",
      path: "/sitemap-provinces.xml",
      lastmod: today,
    },

    // Geographic hierarchy - Cities
    {
      id: "cities",
      path: "/sitemap-cities.xml",
      lastmod: today,
    },

    // Category pages within cities (e.g., /nl/netherlands/amsterdam/veterinary)
    {
      id: "categories",
      path: "/sitemap-categories.xml",
      lastmod: today,
    },

    // Category overview pages within countries (e.g., /nl/netherlands/c/veterinary)
    {
      id: "categories-country",
      path: "/sitemap-categories-country.xml",
      lastmod: today,
    },

    // Individual place/business pages - the bulk of URLs
    {
      id: "places",
      path: "/sitemap-places.xml",
      lastmod: today,
    },

    // "Best X in City" aggregation pages (e.g., /nl/netherlands/amsterdam/best/veterinary)
    {
      id: "best-city",
      path: "/sitemap-best-city.xml",
      lastmod: today,
    },

    // "Top X in Country" aggregation pages (e.g., /nl/netherlands/top/veterinary)
    {
      id: "top-country",
      path: "/sitemap-top-country.xml",
      lastmod: today,
    },

    // "Best X in Country" aggregation pages (e.g., /nl/netherlands/best/veterinary)
    {
      id: "best-country",
      path: "/sitemap-best-country.xml",
      lastmod: today,
    },
  ];
}

export async function GET() {
  try {
    const sections = getSitemapSections();
    const baseUrl = DEFAULT_SITEMAP_CONFIG.baseUrl;
    const xml = buildSitemapIndexXml(sections, baseUrl);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);

    // Return a minimal valid sitemap index on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DEFAULT_SITEMAP_CONFIG.baseUrl}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}
