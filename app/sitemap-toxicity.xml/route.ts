/**
 * Dynamic Toxicity Sitemap
 * Generates sitemap from CSV data - only includes indexable pages
 * - Excludes pages with toxicity_level "onbekend" (thin content)
 * - Excludes synonym pages (noindex)
 */

import { NextResponse } from "next/server";
import { loadSubstances, getAllToxicityPageParams } from "@/lib/toxicity/data";
import { TOXICITY_CONFIG } from "@/lib/toxicity/types";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cutiepawspedia.com";

// Force dynamic to ensure fresh data
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const now = new Date().toISOString().split("T")[0];
  const substances = loadSubstances();
  const params = getAllToxicityPageParams();

  const urls: string[] = [];

  // Only add pages that should be indexed
  for (const param of params) {
    const substance = substances.find(s => s.slug === param.slug);
    if (!substance) continue;

    const config = TOXICITY_CONFIG[substance.toxicity_level];

    // Skip noindex pages (onbekend toxicity level)
    if (!config.shouldIndex) continue;

    // Determine priority based on toxicity level
    const priority = substance.toxicity_level === 'hoog' ? '0.9' :
                     substance.toxicity_level === 'middel' ? '0.8' : '0.7';

    urls.push(`
    <url>
      <loc>${baseUrl}/nl/is-${param.slug}-giftig-voor-${param.animal}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${priority}</priority>
    </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
