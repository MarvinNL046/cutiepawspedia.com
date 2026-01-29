/**
 * Best in Country Sitemap Route (/sitemap-best-country.xml)
 *
 * Contains URLs for "Best X in Country" aggregation pages
 * (e.g., /nl/netherlands/best/veterinary)
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildBestInCountryUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

// ISR: Optimized to 1 hour to reduce Vercel costs (was 300s)
export const revalidate = 86400;

export async function GET() {
  try {
    const urls = await buildBestInCountryUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800",
      },
    });
  } catch (error) {
    console.error("Error generating best-country sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
