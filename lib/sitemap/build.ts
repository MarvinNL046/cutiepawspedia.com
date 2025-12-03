/**
 * Sitemap XML Builders
 *
 * Functions to generate sitemap XML content following Google's protocol.
 * Supports both individual sitemaps and sitemap indexes.
 */

import { type SitemapUrl, type SitemapSection, DEFAULT_SITEMAP_CONFIG } from "./types";

/**
 * XML declaration and namespace for sitemaps
 */
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';
const SITEMAP_NS = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Build a single URL entry for sitemap
 */
function buildUrlEntry(url: SitemapUrl): string {
  const lines = ["  <url>", `    <loc>${escapeXml(url.loc)}</loc>`];

  if (url.lastmod) {
    lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
  }

  if (url.changefreq) {
    lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
  }

  if (url.priority !== undefined) {
    lines.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
  }

  lines.push("  </url>");
  return lines.join("\n");
}

/**
 * Build a complete sitemap XML from a list of URLs
 */
export function buildSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(buildUrlEntry).join("\n");

  return `${XML_HEADER}
<urlset ${SITEMAP_NS}>
${urlEntries}
</urlset>`;
}

/**
 * Build a single sitemap entry for the sitemap index
 */
function buildSitemapEntry(
  section: SitemapSection,
  baseUrl: string = DEFAULT_SITEMAP_CONFIG.baseUrl
): string {
  const lines = [
    "  <sitemap>",
    `    <loc>${escapeXml(baseUrl + section.path)}</loc>`,
  ];

  if (section.lastmod) {
    lines.push(`    <lastmod>${section.lastmod}</lastmod>`);
  }

  lines.push("  </sitemap>");
  return lines.join("\n");
}

/**
 * Build a sitemap index XML from a list of sitemap sections
 */
export function buildSitemapIndexXml(
  sections: SitemapSection[],
  baseUrl: string = DEFAULT_SITEMAP_CONFIG.baseUrl
): string {
  const sitemapEntries = sections
    .map((section) => buildSitemapEntry(section, baseUrl))
    .join("\n");

  return `${XML_HEADER}
<sitemapindex ${SITEMAP_NS}>
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Split URLs into multiple sitemaps if exceeding limit
 * Returns array of sitemap contents
 */
export function splitIntoSitemaps(
  urls: SitemapUrl[],
  maxPerSitemap: number = DEFAULT_SITEMAP_CONFIG.maxUrlsPerSitemap
): string[] {
  const sitemaps: string[] = [];

  for (let i = 0; i < urls.length; i += maxPerSitemap) {
    const chunk = urls.slice(i, i + maxPerSitemap);
    sitemaps.push(buildSitemapXml(chunk));
  }

  return sitemaps;
}

/**
 * Calculate statistics for a sitemap
 */
export function getSitemapStats(urls: SitemapUrl[]): {
  totalUrls: number;
  byChangefreq: Record<string, number>;
  byPriority: Record<string, number>;
  avgPriority: number;
} {
  const byChangefreq: Record<string, number> = {};
  const byPriority: Record<string, number> = {};
  let totalPriority = 0;

  for (const url of urls) {
    // Count by changefreq
    const freq = url.changefreq || "unknown";
    byChangefreq[freq] = (byChangefreq[freq] || 0) + 1;

    // Count by priority (rounded to 1 decimal)
    const priority = url.priority?.toFixed(1) || "unknown";
    byPriority[priority] = (byPriority[priority] || 0) + 1;

    // Sum priority for average
    totalPriority += url.priority || 0.5;
  }

  return {
    totalUrls: urls.length,
    byChangefreq,
    byPriority,
    avgPriority: urls.length > 0 ? totalPriority / urls.length : 0,
  };
}

/**
 * Validate a sitemap URL
 */
export function validateSitemapUrl(url: SitemapUrl): string[] {
  const errors: string[] = [];

  // Check loc
  if (!url.loc) {
    errors.push("URL loc is required");
  } else {
    try {
      new URL(url.loc);
    } catch {
      errors.push(`Invalid URL format: ${url.loc}`);
    }
  }

  // Check lastmod format
  if (url.lastmod && !/^\d{4}-\d{2}-\d{2}/.test(url.lastmod)) {
    errors.push(`Invalid lastmod format: ${url.lastmod} (expected YYYY-MM-DD)`);
  }

  // Check priority range
  if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
    errors.push(`Priority out of range: ${url.priority} (expected 0.0-1.0)`);
  }

  return errors;
}

/**
 * Validate all URLs in a sitemap
 */
export function validateSitemap(urls: SitemapUrl[]): {
  valid: boolean;
  errors: Array<{ url: string; errors: string[] }>;
} {
  const allErrors: Array<{ url: string; errors: string[] }> = [];

  for (const url of urls) {
    const urlErrors = validateSitemapUrl(url);
    if (urlErrors.length > 0) {
      allErrors.push({ url: url.loc, errors: urlErrors });
    }
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
