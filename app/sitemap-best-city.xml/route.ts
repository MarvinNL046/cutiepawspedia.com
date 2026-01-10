/**
 * Best in City Sitemap Route (/sitemap-best-city.xml)
 *
 * DEPRECATED: This route now returns the first page of paginated best-in-city URLs.
 * Use /sitemap-best-city-1.xml, /sitemap-best-city-2.xml, etc. instead.
 *
 * Contains URLs for "Best X in City" aggregation pages
 * (e.g., /nl/netherlands/amsterdam/best/veterinary)
 * Limited to first page (10,000 URLs) for backwards compatibility.
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildBestInCityUrlsPaginated, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

// ISR: Optimized to 1 hour to reduce Vercel costs (was 300s)
export const revalidate = 3600;

export async function GET() {
  try {
    // Return only the first page for backwards compatibility
    const urls = await buildBestInCityUrlsPaginated(1, DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200",
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
