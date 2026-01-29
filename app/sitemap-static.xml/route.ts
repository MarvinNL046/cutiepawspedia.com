/**
 * Static Sitemap Route (/sitemap-static.xml)
 *
 * Contains URLs for static pages like homepage, about, contact, privacy, etc.
 * These pages exist for all locales and change infrequently.
 *
 * CACHING STRATEGY: Long-lived ISR
 * - revalidate: 86400s (24 hours) - Static pages change rarely
 * - Small number of URLs, fast to generate
 */

import { NextResponse } from "next/server";
import {
  buildSitemapXml,
  buildHomeUrls,
  buildStaticUrls,
  DEFAULT_SITEMAP_CONFIG,
} from "@/lib/sitemap";

// ISR: Static pages change rarely, 24-hour revalidation
export const revalidate = 86400;

export async function GET() {
  try {
    // Get all static URLs (home + utility pages)
    const [homeUrls, staticUrls] = await Promise.all([
      buildHomeUrls(DEFAULT_SITEMAP_CONFIG),
      buildStaticUrls(DEFAULT_SITEMAP_CONFIG),
    ]);

    const allUrls = [...homeUrls, ...staticUrls];
    const xml = buildSitemapXml(allUrls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800",
      },
    });
  } catch (error) {
    console.error("Error generating static sitemap:", error);

    // Return minimal sitemap on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DEFAULT_SITEMAP_CONFIG.baseUrl}/nl</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DEFAULT_SITEMAP_CONFIG.baseUrl}/en</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }
}
