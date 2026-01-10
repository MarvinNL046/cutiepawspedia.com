/**
 * Dynamic Places Sitemap API Route
 *
 * Handles ALL paginated place sitemaps dynamically via rewrite.
 * - /sitemap-places-1.xml -> /api/sitemap-places/1
 * - Returns proper XML for valid pages with places
 * - Returns empty valid XML for pages beyond data (graceful handling)
 * - Never returns HTML (prevents "Sitemap is HTML" errors)
 */

import { NextResponse } from "next/server";
import {
  buildSitemapXml,
  buildPlaceUrls,
  DEFAULT_SITEMAP_CONFIG,
} from "@/lib/sitemap";

// Empty but valid sitemap XML for out-of-range pages
const EMPTY_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

interface RouteParams {
  params: Promise<{ page: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { page } = await params;

  // Parse page number, default to 1 if invalid
  const pageNumber = parseInt(page, 10);

  // If not a valid number, return empty sitemap (not HTML 404)
  if (isNaN(pageNumber) || pageNumber < 1) {
    return new NextResponse(EMPTY_SITEMAP, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  try {
    // Load all place URLs
    const allUrls = await buildPlaceUrls(DEFAULT_SITEMAP_CONFIG);
    const maxPerPage = DEFAULT_SITEMAP_CONFIG.maxUrlsPerSitemap;
    const totalPages = Math.ceil(allUrls.length / maxPerPage);

    // If page is beyond available data, return empty sitemap
    if (pageNumber > totalPages) {
      return new NextResponse(EMPTY_SITEMAP, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // Slice URLs for this page
    const startIndex = (pageNumber - 1) * maxPerPage;
    const endIndex = Math.min(startIndex + maxPerPage, allUrls.length);
    const pageUrls = allUrls.slice(startIndex, endIndex);

    const xml = buildSitemapXml(pageUrls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(`Error generating places sitemap page ${pageNumber}:`, error);

    // On error, still return valid XML (not HTML error page)
    return new NextResponse(EMPTY_SITEMAP, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=60",
      },
    });
  }
}
