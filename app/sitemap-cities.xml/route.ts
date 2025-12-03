/**
 * Cities Sitemap Route (/sitemap-cities.xml)
 *
 * Contains URLs for all city landing pages across all locales.
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 1800s (30 minutes) - Cities added moderately often
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildCityUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

export const revalidate = 1800;

export async function GET() {
  try {
    const urls = await buildCityUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error generating cities sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
