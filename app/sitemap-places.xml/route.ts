/**
 * Places Sitemap Route (/sitemap-places.xml)
 *
 * Contains URLs for all individual place/business pages.
 * This is the largest sitemap - may need splitting if >45k URLs.
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Places frequently added/updated
 */

import { NextResponse } from "next/server";
import {
  buildSitemapXml,
  buildPlaceUrls,
  splitIntoSitemaps,
  DEFAULT_SITEMAP_CONFIG,
} from "@/lib/sitemap";

export const revalidate = 300;

export async function GET() {
  try {
    const urls = await buildPlaceUrls(DEFAULT_SITEMAP_CONFIG);

    // Check if we need to split (for future scalability)
    if (urls.length > DEFAULT_SITEMAP_CONFIG.maxUrlsPerSitemap) {
      // For now, just return first chunk - could expand to paginated sitemaps
      const sitemaps = splitIntoSitemaps(urls, DEFAULT_SITEMAP_CONFIG.maxUrlsPerSitemap);
      return new NextResponse(sitemaps[0], {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
        },
      });
    }

    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating places sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
