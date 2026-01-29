/**
 * Countries Sitemap Route (/sitemap-countries.xml)
 *
 * Contains URLs for all country landing pages across all locales.
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 3600s (1 hour) - Countries change rarely
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildCountryUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

export const revalidate = 86400;

export async function GET() {
  try {
    const urls = await buildCountryUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating countries sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
