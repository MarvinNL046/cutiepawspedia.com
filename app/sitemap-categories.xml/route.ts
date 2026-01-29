/**
 * Categories Sitemap Route (/sitemap-categories.xml)
 *
 * DEPRECATED: This route now returns the first page of paginated categories.
 * Use /sitemap-categories-1.xml, /sitemap-categories-2.xml, etc. instead.
 *
 * Contains URLs for category pages within cities (e.g., /nl/netherlands/amsterdam/veterinary)
 * Limited to first page (10,000 URLs) for backwards compatibility.
 *
 * CACHING STRATEGY: ISR
 * - revalidate: 300s (5 minutes) - Categories updated with new places
 */

import { NextResponse } from "next/server";
import { buildSitemapXml, buildCategoryUrlsPaginated, DEFAULT_SITEMAP_CONFIG } from "@/lib/sitemap";

// ISR: Optimized to 1 hour to reduce Vercel costs (was 300s)
export const revalidate = 86400;

export async function GET() {
  try {
    // Return only the first page for backwards compatibility
    const urls = await buildCategoryUrlsPaginated(1, DEFAULT_SITEMAP_CONFIG);
    const xml = buildSitemapXml(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800",
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
