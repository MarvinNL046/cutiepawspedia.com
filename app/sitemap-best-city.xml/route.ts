/**
 * Best in City Sitemap Route (/sitemap-best-city.xml)
 *
 * Contains URLs for "Best X in City" aggregation pages
 * (e.g., /nl/netherlands/amsterdam/best/veterinary)
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildBestInCityUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

export const revalidate = 300;

export async function GET() {
  try {
    const urls = await buildBestInCityUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating best-city sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
