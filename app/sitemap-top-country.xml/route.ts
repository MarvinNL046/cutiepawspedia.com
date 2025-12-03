/**
 * Top in Country Sitemap Route (/sitemap-top-country.xml)
 *
 * Contains URLs for "Top X in Country" aggregation pages
 * (e.g., /nl/netherlands/top/veterinary)
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildTopInCountryUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

export const revalidate = 300;

export async function GET() {
  try {
    const urls = await buildTopInCountryUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating top-country sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
