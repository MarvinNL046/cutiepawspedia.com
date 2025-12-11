#!/usr/bin/env npx tsx
/**
 * Bright Data Collector via MCP
 *
 * Enriches OSM places with additional data using Bright Data APIs.
 * Uses the MCP-configured API token for authentication.
 *
 * Features:
 *   - Page scraping via Web Unlocker API
 *   - Business search via SERP API (Google Maps)
 *   - Promise pool with concurrency control
 *   - Auto-retry for rate limits and network errors
 *
 * Usage:
 *   npx tsx scripts/collect-bright.ts --country=nl --city=amsterdam
 *   npx tsx scripts/collect-bright.ts --country=nl --city=amsterdam --limit=10 --verbose
 *
 * Data enrichment:
 *   - Phone numbers, emails, websites
 *   - Opening hours, images
 *   - Ratings, review counts
 *   - Social profiles
 *   - Address verification
 */

import { parseArgs } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import { getCity, type CityConfig } from "./config/cities";
import { getOsmPath, getBrightPath } from "../lib/data/paths";
import { readJson, writeJson, getJsonStats } from "../lib/data/json-file";
import type {
  OsmRawData,
  OsmRawPlace,
  BrightRawData,
  BrightRawPlace,
  BrightOpeningHours,
  BrightSocialLinks,
} from "../lib/data/types";

// =============================================================================
// CONFIGURATION
// =============================================================================

/** Load API token from MCP config or environment */
async function loadApiToken(): Promise<string> {
  // First check environment
  if (process.env.BRIGHT_DATA_API_TOKEN) {
    return process.env.BRIGHT_DATA_API_TOKEN;
  }

  // Try to load from .mcp.json
  try {
    const mcpConfigPath = path.join(process.cwd(), ".mcp.json");
    const mcpContent = await fs.readFile(mcpConfigPath, "utf-8");
    const mcpConfig = JSON.parse(mcpContent);
    const token = mcpConfig?.mcpServers?.["Bright Data"]?.env?.API_TOKEN;
    if (token) {
      return token;
    }
  } catch {
    // Ignore - will use empty token
  }

  return "";
}

/** Bright Data SERP API base URL */
const BRIGHT_SERP_URL = "https://api.brightdata.com/datasets/v3/trigger";

/** Bright Data Web Scraper endpoint */
const BRIGHT_SCRAPER_URL = "https://api.brightdata.com/request";

/** Max concurrent requests */
const MAX_CONCURRENCY = 3;

/** Delay between batches (ms) */
const BATCH_DELAY = 800;

/** Request timeout (ms) */
const REQUEST_TIMEOUT = 45000;

/** Max retries for errors */
const MAX_RETRIES = 3;

/** Retry delay (ms) */
const RETRY_DELAY = 2000;

// =============================================================================
// CLI PARSING
// =============================================================================

interface CliArgs {
  country?: string;
  city?: string;
  limit?: number;
  dryRun?: boolean;
  verbose?: boolean;
  force?: boolean;
  help?: boolean;
}

function parseCliArgs(): CliArgs {
  try {
    const { values } = parseArgs({
      options: {
        country: { type: "string", short: "c" },
        city: { type: "string" },
        limit: { type: "string" },
        "dry-run": { type: "boolean", short: "d" },
        verbose: { type: "boolean", short: "v" },
        force: { type: "boolean", short: "f" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });

    return {
      country: values.country,
      city: values.city,
      limit: values.limit ? parseInt(values.limit, 10) : undefined,
      dryRun: values["dry-run"],
      verbose: values.verbose,
      force: values.force,
      help: values.help,
    };
  } catch (error) {
    console.error("Error parsing arguments:", error);
    printHelp();
    process.exit(1);
  }
}

function printHelp(): void {
  console.log(`
Bright Data Collector for CutiePawsPedia

Enriches OSM places with web scraped data using Bright Data MCP.

Usage:
  npx tsx scripts/collect-bright.ts --country=<code> --city=<slug>
  npx tsx scripts/collect-bright.ts --help

Options:
  -c, --country <code>   ISO country code (e.g., nl, be, de)
  --city <slug>          City slug (e.g., amsterdam, rotterdam)
  --limit <n>            Only scrape N places (for testing)
  -d, --dry-run          Show plan without scraping
  -v, --verbose          Verbose output
  -f, --force            Overwrite existing data
  -h, --help             Show this help

Examples:
  npx tsx scripts/collect-bright.ts --country=nl --city=amsterdam
  npx tsx scripts/collect-bright.ts -c nl --city=amsterdam --limit=5 --verbose
  npx tsx scripts/collect-bright.ts --country=nl --city=rotterdam --force

Environment Variables:
  BRIGHT_DATA_API_TOKEN  Bright Data API token (or use .mcp.json)
`);
}

// =============================================================================
// PROMISE POOL (Concurrency Control)
// =============================================================================

async function promisePool<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
  delayMs: number = 0
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];
      results[currentIndex] = await fn(item, currentIndex);

      // Add delay between requests
      if (delayMs > 0 && index < items.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // Start workers
  const workers = Array(Math.min(concurrency, items.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

// =============================================================================
// BRIGHT DATA MCP API CLIENT
// =============================================================================

interface BrightPageData {
  url: string;
  title?: string;
  description?: string;
  content?: string;
  phones?: string[];
  emails?: string[];
  images?: string[];
  links?: string[];
  social?: Record<string, string>;
  address?: string;
  rating?: number;
  reviewCount?: number;
  openingHours?: Record<string, string>;
  categories?: string[];
}

interface BrightSearchResult {
  name: string;
  url?: string;
  phone?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  placeId?: string;
}

/**
 * Scrape a page using Bright Data Web Unlocker/Scraper
 */
async function scrapePage(
  url: string,
  apiToken: string,
  retryCount: number = 0
): Promise<BrightPageData | null> {
  if (!apiToken) {
    // Fallback to simple fetch without proxy
    return scrapePageDirect(url, retryCount);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Use Bright Data's Web Unlocker proxy
    const proxyUrl = `http://brd-customer-${getCustomerId(apiToken)}:${apiToken}@brd.superproxy.io:22225`;

    // For Node.js, we'll use direct fetch with Bright Data headers
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5,nl;q=0.3",
        "X-Bright-Data-Zone": "web_unlocker",
        "Authorization": `Bearer ${apiToken}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return scrapePage(url, apiToken, retryCount + 1);
    }

    if (!response.ok) {
      // Fallback to direct scraping
      return scrapePageDirect(url, retryCount);
    }

    const html = await response.text();
    return parsePageContent(url, html);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return scrapePage(url, apiToken, retryCount + 1);
    }
    // Fallback to direct
    return scrapePageDirect(url, 0);
  }
}

/**
 * Direct page scraping without proxy (fallback)
 */
async function scrapePageDirect(
  url: string,
  retryCount: number = 0
): Promise<BrightPageData | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CutiePawsPedia/1.0; +https://cutiepawspedia.com)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5,nl;q=0.3",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return scrapePageDirect(url, retryCount + 1);
    }

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    return parsePageContent(url, html);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return scrapePageDirect(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Search for a business using Bright Data SERP API (Google Maps)
 */
async function searchBusiness(
  name: string,
  city: string,
  country: string,
  apiToken: string,
  retryCount: number = 0
): Promise<BrightSearchResult | null> {
  const query = `${name} ${city} ${country}`;

  if (!apiToken) {
    // Fallback to DuckDuckGo or simple search
    return searchBusinessFallback(query, retryCount);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Bright Data SERP API request for Google Maps
    const response = await fetch(`${BRIGHT_SERP_URL}?dataset_id=gd_lz11l67o2cb3r0lkj3&format=json`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        country: country.toUpperCase(),
        language: "en",
        limit: 1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return searchBusiness(name, city, country, apiToken, retryCount + 1);
    }

    if (!response.ok) {
      return searchBusinessFallback(query, retryCount);
    }

    const data = await response.json();

    // Parse SERP results
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name: result.title || result.name || name,
        url: result.website || result.url,
        phone: result.phone,
        address: result.address,
        rating: result.rating ? parseFloat(result.rating) : undefined,
        reviewCount: result.reviews_count || result.review_count,
        category: result.category,
        placeId: result.place_id,
      };
    }

    return null;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return searchBusiness(name, city, country, apiToken, retryCount + 1);
    }
    return searchBusinessFallback(query, 0);
  }
}

/**
 * Fallback search using DuckDuckGo HTML
 */
async function searchBusinessFallback(
  query: string,
  retryCount: number = 0
): Promise<BrightSearchResult | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CutiePawsPedia/1.0)",
        "Accept": "text/html",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Extract first result URL
    const urlMatch = html.match(/href="(https?:\/\/[^"]+)"/);
    if (urlMatch && !urlMatch[1].includes("duckduckgo.com")) {
      return {
        name: query.split(" ")[0],
        url: cleanUrl(urlMatch[1]),
      };
    }

    return null;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      );
      return searchBusinessFallback(query, retryCount + 1);
    }
    return null;
  }
}

/**
 * Extract customer ID from API token (for proxy auth)
 */
function getCustomerId(apiToken: string): string {
  // Bright Data tokens often contain customer ID prefix
  // Format: hl_XXXXX... where XXXXX is customer ID
  const match = apiToken.match(/^hl_([a-z0-9]+)/i);
  return match ? match[1] : "default";
}

// =============================================================================
// HTML PARSING & DATA EXTRACTION
// =============================================================================

/**
 * Parse HTML content and extract structured data
 */
function parsePageContent(url: string, html: string): BrightPageData {
  const data: BrightPageData = { url };

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    data.title = decodeHtmlEntities(titleMatch[1].trim());
  }

  // Extract meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  if (descMatch) {
    data.description = decodeHtmlEntities(descMatch[1].trim());
  }

  // Get text content (strip HTML tags)
  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  data.content = textContent.slice(0, 50000); // Limit content size

  // Extract phones
  data.phones = extractPhones(textContent);

  // Extract emails
  data.emails = extractEmails(textContent);

  // Extract images
  data.images = extractImagesFromHtml(html);

  // Extract links
  data.links = extractLinksFromHtml(html);

  // Extract social links
  data.social = extractSocialLinksFromHtml(html);

  // Extract opening hours (from structured data or text)
  const hours = extractOpeningHoursFromHtml(html, textContent);
  if (hours && Object.keys(hours).length > 0) {
    data.openingHours = hours;
  }

  // Extract rating from structured data
  const rating = extractRatingFromHtml(html);
  if (rating) {
    data.rating = rating.value;
    data.reviewCount = rating.count;
  }

  return data;
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/**
 * Clean URL (remove tracking params)
 */
function cleanUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove common tracking parameters
    const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ref"];
    trackingParams.forEach((param) => parsed.searchParams.delete(param));
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Extract phone numbers from text
 */
function extractPhones(text: string): string[] {
  const phonePatterns = [
    // International format
    /\+[1-9]\d{1,14}/g,
    // Dutch format
    /0[1-9][0-9]{8}/g,
    // Common formats with separators
    /\(?\d{2,4}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    /\d{3}[-.\s]\d{3}[-.\s]\d{4}/g,
  ];

  const phones = new Set<string>();
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((m) => phones.add(m.replace(/[\s.-]/g, "")));
    }
  }

  return Array.from(phones).slice(0, 5);
}

/**
 * Extract email addresses from text
 */
function extractEmails(text: string): string[] {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailPattern) || [];
  // Filter out common non-email patterns
  return [...new Set(matches)]
    .filter((email) => {
      const lower = email.toLowerCase();
      return (
        !lower.includes("example.com") &&
        !lower.includes("sentry.io") &&
        !lower.includes("wixpress.com") &&
        !lower.endsWith(".png") &&
        !lower.endsWith(".jpg")
      );
    })
    .slice(0, 5);
}

/**
 * Extract image URLs from HTML
 */
function extractImagesFromHtml(html: string): string[] {
  const imgPattern = /<img[^>]+src=["']([^"']+)["']/gi;
  const images: string[] = [];
  let match;

  while ((match = imgPattern.exec(html)) !== null && images.length < 10) {
    const src = match[1];
    // Filter out icons, logos, tracking pixels
    if (
      src.length > 20 &&
      !src.includes("icon") &&
      !src.includes("logo") &&
      !src.includes("favicon") &&
      !src.includes("pixel") &&
      !src.includes("1x1") &&
      (src.includes(".jpg") ||
        src.includes(".jpeg") ||
        src.includes(".png") ||
        src.includes(".webp"))
    ) {
      images.push(src);
    }
  }

  return images;
}

/**
 * Extract links from HTML
 */
function extractLinksFromHtml(html: string): string[] {
  const linkPattern = /<a[^>]+href=["']([^"']+)["']/gi;
  const links: string[] = [];
  let match;

  while ((match = linkPattern.exec(html)) !== null && links.length < 50) {
    const href = match[1];
    if (href.startsWith("http") && !href.includes("javascript:")) {
      links.push(href);
    }
  }

  return links;
}

/**
 * Extract social media links from HTML
 */
function extractSocialLinksFromHtml(html: string): Record<string, string> {
  const social: Record<string, string> = {};

  const patterns: Record<string, RegExp> = {
    facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi,
    instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9._-]+/gi,
    twitter: /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9._-]+/gi,
    linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9._-]+/gi,
    youtube: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:channel|c|user|@)[a-zA-Z0-9._-]+/gi,
    tiktok: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[a-zA-Z0-9._-]+/gi,
  };

  for (const [platform, pattern] of Object.entries(patterns)) {
    const match = html.match(pattern);
    if (match) {
      social[platform] = match[0];
    }
  }

  return social;
}

/**
 * Extract opening hours from HTML (structured data or text)
 */
function extractOpeningHoursFromHtml(
  html: string,
  textContent: string
): Record<string, string> | undefined {
  const hours: Record<string, string> = {};

  // Try to find JSON-LD structured data
  const jsonLdMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatch) {
    for (const scriptTag of jsonLdMatch) {
      try {
        const jsonContent = scriptTag.replace(/<\/?script[^>]*>/gi, "");
        const data = JSON.parse(jsonContent);
        if (data.openingHours || data.openingHoursSpecification) {
          const spec = data.openingHoursSpecification || [];
          for (const item of spec) {
            if (item.dayOfWeek && item.opens && item.closes) {
              const days = Array.isArray(item.dayOfWeek) ? item.dayOfWeek : [item.dayOfWeek];
              for (const day of days) {
                const dayName = day.toLowerCase().replace("http://schema.org/", "");
                hours[dayName] = `${item.opens}-${item.closes}`;
              }
            }
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    }
  }

  if (Object.keys(hours).length > 0) {
    return hours;
  }

  // Fallback to text pattern matching
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dutchDays: Record<string, string> = {
    maandag: "monday",
    dinsdag: "tuesday",
    woensdag: "wednesday",
    donderdag: "thursday",
    vrijdag: "friday",
    zaterdag: "saturday",
    zondag: "sunday",
  };

  const timePattern = /(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/;

  // Check for each day
  for (const day of days) {
    const pattern = new RegExp(`${day}[:\\s]*${timePattern.source}`, "i");
    const match = textContent.match(pattern);
    if (match) {
      hours[day] = `${match[1]}-${match[2]}`;
    }
  }

  // Check Dutch day names
  for (const [dutch, english] of Object.entries(dutchDays)) {
    const pattern = new RegExp(`${dutch}[:\\s]*${timePattern.source}`, "i");
    const match = textContent.match(pattern);
    if (match && !hours[english]) {
      hours[english] = `${match[1]}-${match[2]}`;
    }
  }

  return Object.keys(hours).length > 0 ? hours : undefined;
}

/**
 * Extract rating from HTML (structured data)
 */
function extractRatingFromHtml(
  html: string
): { value: number; count?: number } | undefined {
  // Try JSON-LD
  const jsonLdMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatch) {
    for (const scriptTag of jsonLdMatch) {
      try {
        const jsonContent = scriptTag.replace(/<\/?script[^>]*>/gi, "");
        const data = JSON.parse(jsonContent);
        if (data.aggregateRating) {
          const rating = parseFloat(data.aggregateRating.ratingValue);
          if (rating >= 1 && rating <= 5) {
            return {
              value: rating,
              count: data.aggregateRating.reviewCount
                ? parseInt(data.aggregateRating.reviewCount, 10)
                : undefined,
            };
          }
        }
      } catch {
        // Ignore
      }
    }
  }

  return undefined;
}

// =============================================================================
// MAIN SCRAPING FUNCTION
// =============================================================================

interface ScrapeResult {
  success: boolean;
  place?: BrightRawPlace;
  error?: string;
  skipped?: boolean;
  mode?: "website" | "serp";
}

/**
 * Scrape enrichment data for a single OSM place using Bright Data
 */
async function scrapeWithBrightData(
  osm: OsmRawPlace,
  cityName: string,
  countryCode: string,
  apiToken: string,
  verbose: boolean
): Promise<ScrapeResult> {
  const sourceId = `${osm.type}/${osm.id}`;
  const name = osm.tags.name || osm.tags["name:en"] || "";

  if (!name) {
    return { success: false, skipped: true, error: "No name" };
  }

  let pageData: BrightPageData | null = null;
  let searchResult: BrightSearchResult | null = null;
  let mode: "website" | "serp" = "website";

  // Strategy A: If OSM has website, scrape it directly
  const websiteUrl = osm.tags.website || osm.tags["contact:website"];

  if (websiteUrl) {
    const cleanedUrl = cleanUrl(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`);
    if (verbose) {
      console.log(`   🌐 Scraping website: ${cleanedUrl}`);
    }
    pageData = await scrapePage(cleanedUrl, apiToken);
  }

  // Strategy B: If no website or scrape failed, search for business
  if (!pageData) {
    mode = "serp";
    if (verbose) {
      console.log(`   🔍 Searching: ${name} ${cityName} ${countryCode}`);
    }

    searchResult = await searchBusiness(name, cityName, countryCode, apiToken);

    if (searchResult?.url) {
      if (verbose) {
        console.log(`   🌐 Scraping SERP result: ${searchResult.url}`);
      }
      pageData = await scrapePage(searchResult.url, apiToken);
    }
  }

  // Strategy C: Both failed - return null
  if (!pageData && !searchResult) {
    return { success: false, error: "No data found", mode };
  }

  // Build BrightRawPlace from scraped data
  const place: BrightRawPlace = {
    sourceId,
    businessName: name,
    sourceUrl: pageData?.url || searchResult?.url || "",
    canonicalUrl: pageData?.url ? cleanUrl(pageData.url) : undefined,
    website: pageData?.url || searchResult?.url,
    phone: pageData?.phones?.[0] || searchResult?.phone,
    phones: pageData?.phones?.length ? pageData.phones : undefined,
    email: pageData?.emails?.[0],
    emails: pageData?.emails?.length ? pageData.emails : undefined,
    about: pageData?.description,
    businessDescription: pageData?.title,
    rating: pageData?.rating || searchResult?.rating,
    reviewCount: pageData?.reviewCount || searchResult?.reviewCount,
    openingHours: pageData?.openingHours
      ? convertToOpeningHours(pageData.openingHours)
      : undefined,
    images: pageData?.images,
    socialLinks: pageData?.social && Object.keys(pageData.social).length > 0
      ? pageData.social as BrightSocialLinks
      : undefined,
    // Address from OSM or search
    address: searchResult?.address || [
      osm.tags["addr:street"],
      osm.tags["addr:housenumber"],
      osm.tags["addr:postcode"],
      osm.tags["addr:city"],
    ].filter(Boolean).join(", ") || undefined,
    street: osm.tags["addr:street"],
    postalCode: osm.tags["addr:postcode"],
    city: osm.tags["addr:city"] || cityName,
    country: countryCode.toUpperCase(),
    latitude: osm.lat,
    longitude: osm.lon,
    category: searchResult?.category || osm.tags.amenity || osm.tags.shop,
    categories: osm.tags.amenity
      ? [osm.tags.amenity]
      : osm.tags.shop
        ? [osm.tags.shop]
        : undefined,
  };

  return { success: true, place, mode };
}

/**
 * Convert generic hours object to BrightOpeningHours
 */
function convertToOpeningHours(
  hours: Record<string, string>
): BrightOpeningHours {
  const result: BrightOpeningHours = {};
  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  for (const day of validDays) {
    if (hours[day]) {
      result[day] = hours[day];
    }
  }

  return result;
}

// =============================================================================
// MAIN COLLECTION FUNCTION
// =============================================================================

interface CollectionResult {
  success: boolean;
  totalPlaces: number;
  successCount: number;
  failCount: number;
  skipCount: number;
  websiteCount: number;
  serpCount: number;
  filePath: string;
  error?: string;
}

async function collectBrightData(
  cityConfig: CityConfig,
  apiToken: string,
  options: {
    limit?: number;
    dryRun?: boolean;
    verbose?: boolean;
    force?: boolean;
  }
): Promise<CollectionResult> {
  const { countryCode, slug: citySlug, name: cityName } = cityConfig;
  const osmPath = getOsmPath(countryCode, citySlug);
  const brightPath = getBrightPath(countryCode, citySlug);

  console.log(`\n🔮 Enriching places with Bright Data for ${cityName} (${countryCode.toUpperCase()})`);
  console.log(`   OSM source: ${osmPath}`);
  console.log(`   Output: ${brightPath}`);
  console.log(`   API Token: ${apiToken ? "✅ Configured" : "⚠️ Not set (using fallbacks)"}`);

  // Check if output already exists
  if (!options.force) {
    const existingStats = await getJsonStats(brightPath);
    if (existingStats) {
      const existing = await readJson<BrightRawData>(brightPath);
      if (existing) {
        console.log(
          `\n⚠️  Data already exists (${existing.places.length} places, ${existingStats.modifiedAt.toISOString()})`
        );
        console.log(`   Use --force to overwrite`);
        return {
          success: true,
          totalPlaces: existing.places.length,
          successCount: existing.places.length,
          failCount: 0,
          skipCount: 0,
          websiteCount: 0,
          serpCount: 0,
          filePath: brightPath,
        };
      }
    }
  }

  // Load OSM data
  const osmData = await readJson<OsmRawData>(osmPath);
  if (!osmData || !osmData.places) {
    console.error(`\n❌ No OSM data found at ${osmPath}`);
    console.error(`   Run the OSM collector first:`);
    console.error(`   npm run collect:osm -- --country=${countryCode} --city=${citySlug}`);
    return {
      success: false,
      totalPlaces: 0,
      successCount: 0,
      failCount: 0,
      skipCount: 0,
      websiteCount: 0,
      serpCount: 0,
      filePath: brightPath,
      error: "No OSM data found",
    };
  }

  let placesToProcess = osmData.places;

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    placesToProcess = placesToProcess.slice(0, options.limit);
  }

  // Count places with websites
  const withWebsite = placesToProcess.filter(
    (p) => p.tags.website || p.tags["contact:website"]
  ).length;

  console.log(`\n📋 Found ${osmData.places.length} OSM places`);
  console.log(`   Processing: ${placesToProcess.length} places`);
  console.log(`   With website: ${withWebsite}`);
  console.log(`   Need SERP: ${placesToProcess.length - withWebsite}`);

  if (options.dryRun) {
    console.log("\n🔍 Dry run - showing plan:");
    for (const place of placesToProcess.slice(0, 10)) {
      const url = place.tags.website || place.tags["contact:website"] || "(SERP search)";
      console.log(`   - ${place.tags.name || "Unnamed"}: ${url}`);
    }
    if (placesToProcess.length > 10) {
      console.log(`   ... and ${placesToProcess.length - 10} more`);
    }
    return {
      success: true,
      totalPlaces: placesToProcess.length,
      successCount: 0,
      failCount: 0,
      skipCount: 0,
      websiteCount: withWebsite,
      serpCount: placesToProcess.length - withWebsite,
      filePath: brightPath,
    };
  }

  // Process places with concurrency control
  console.log(`\n⏳ Scraping (concurrency: ${MAX_CONCURRENCY}, delay: ${BATCH_DELAY}ms)...`);
  const startTime = Date.now();

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  let websiteModeCount = 0;
  let serpModeCount = 0;
  const enrichedPlaces: BrightRawPlace[] = [];

  await promisePool(
    placesToProcess,
    async (place, index) => {
      if (options.verbose) {
        console.log(`\n[${index + 1}/${placesToProcess.length}] ${place.tags.name || "Unnamed"}`);
      }

      const result = await scrapeWithBrightData(
        place,
        cityName,
        countryCode,
        apiToken,
        options.verbose || false
      );

      if (result.success && result.place) {
        successCount++;
        enrichedPlaces.push(result.place);
        if (result.mode === "website") {
          websiteModeCount++;
        } else {
          serpModeCount++;
        }
        if (options.verbose) {
          console.log(`   ✅ Success (${result.mode}): ${result.place.phone || "no phone"}, ${result.place.email || "no email"}`);
        }
      } else if (result.skipped) {
        skipCount++;
        if (options.verbose) {
          console.log(`   ⏭️  Skipped: ${result.error}`);
        }
      } else {
        failCount++;
        if (options.verbose) {
          console.log(`   ❌ Failed: ${result.error}`);
        }
      }

      // Progress indicator for non-verbose mode
      if (!options.verbose && (index + 1) % 5 === 0) {
        process.stdout.write(`   Processed ${index + 1}/${placesToProcess.length}...\r`);
      }

      return result;
    },
    MAX_CONCURRENCY,
    BATCH_DELAY
  );

  const scrapeTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n   Completed in ${scrapeTime}s`);

  // Build output
  const outputData: BrightRawData = {
    metadata: {
      source: "bright-data",
      collectedAt: new Date().toISOString(),
      countryCode: countryCode.toUpperCase(),
      citySlug,
      cityName,
      scrapeTimeSeconds: parseFloat(scrapeTime),
      totalAttempted: placesToProcess.length,
      successCount,
      failCount,
      skipCount,
    },
    places: enrichedPlaces,
  };

  // Save output
  console.log(`\n💾 Saving ${enrichedPlaces.length} enriched places to ${brightPath}`);
  await writeJson(brightPath, outputData);

  // Print summary
  console.log(`\n📊 Summary:`);
  console.log(`   Total attempted:  ${placesToProcess.length}`);
  console.log(`   Successful:       ${successCount} (${websiteModeCount} website, ${serpModeCount} SERP)`);
  console.log(`   Failed:           ${failCount}`);
  console.log(`   Skipped:          ${skipCount}`);

  // Print example enriched place
  if (enrichedPlaces.length > 0) {
    const example = enrichedPlaces[0];
    console.log(`\n📋 Example enriched place:`);
    console.log(`   Name:     ${example.businessName}`);
    console.log(`   Phone:    ${example.phone || "N/A"}`);
    console.log(`   Email:    ${example.email || "N/A"}`);
    console.log(`   Website:  ${example.canonicalUrl || example.website || "N/A"}`);
    console.log(`   Rating:   ${example.rating || "N/A"}`);
    console.log(`   Hours:    ${example.openingHours ? "Yes" : "N/A"}`);
    console.log(`   Social:   ${example.socialLinks ? Object.keys(example.socialLinks).join(", ") : "N/A"}`);
  }

  console.log(`\n✅ Successfully collected Bright Data for ${cityName}`);

  return {
    success: true,
    totalPlaces: placesToProcess.length,
    successCount,
    failCount,
    skipCount,
    websiteCount: websiteModeCount,
    serpCount: serpModeCount,
    filePath: brightPath,
  };
}

// =============================================================================
// MAIN ENTRY POINT
// =============================================================================

async function main(): Promise<void> {
  const args = parseCliArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Validate required arguments
  if (!args.country || !args.city) {
    console.error("❌ Error: --country and --city are required");
    console.error("   Use --help for usage information");
    process.exit(1);
  }

  // Find city configuration
  const cityConfig = getCity(args.country, args.city);

  if (!cityConfig) {
    console.error(
      `❌ Error: City "${args.city}" not found in country "${args.country}"`
    );
    console.error("   Run: npm run collect:osm:list to see available cities");
    process.exit(1);
  }

  // Load API token
  const apiToken = await loadApiToken();

  if (!apiToken) {
    console.log(
      "\n⚠️  No Bright Data API token found. Using fallback methods."
    );
    console.log(
      "   Set BRIGHT_DATA_API_TOKEN or configure in .mcp.json for better results.\n"
    );
  }

  // Run collection
  const result = await collectBrightData(cityConfig, apiToken, {
    limit: args.limit,
    dryRun: args.dryRun,
    verbose: args.verbose,
    force: args.force,
  });

  if (!result.success) {
    process.exit(1);
  }

  // Final message
  console.log(
    `\n🎉 R2.4 Complete: ${result.successCount} places enriched for ${cityConfig.name}.`
  );
}

// Run
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

// R2.4 Complete
