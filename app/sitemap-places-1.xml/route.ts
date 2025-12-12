/**
 * Places Sitemap Page 1 Route (/sitemap-places-1.xml)
 *
 * First page of paginated places sitemap.
 * Contains URLs 1-45000 (max per Google limits).
 */

import { NextResponse } from "next/server";
import {
  buildSitemapXml,
  buildPlaceUrls,
  DEFAULT_SITEMAP_CONFIG,
} from "@/lib/sitemap";

export const revalidate = 300;

const PAGE_NUMBER = 1;

export async function GET() {
  try {
    const urls = await buildPlaceUrls(DEFAULT_SITEMAP_CONFIG);
    const maxPerPage = DEFAULT_SITEMAP_CONFIG.maxUrlsPerSitemap;

    // Get URLs for this page
    const startIndex = (PAGE_NUMBER - 1) * maxPerPage;
    const endIndex = Math.min(startIndex + maxPerPage, urls.length);
    const pageUrls = urls.slice(startIndex, endIndex);

    const xml = buildSitemapXml(pageUrls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating places sitemap page 1:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }
}
