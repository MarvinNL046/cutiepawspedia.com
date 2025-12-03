/**
 * Categories Sitemap Route (/sitemap-categories.xml)
 *
 * Contains URLs for all category pages within cities (e.g., /nl/netherlands/amsterdam/veterinary)
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Categories updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildCategoryUrls, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

export const revalidate = 300;

export async function GET() {
  try {
    const urls = await buildCategoryUrls(DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating categories sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
