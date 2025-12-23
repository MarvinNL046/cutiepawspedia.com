#!/usr/bin/env npx tsx
/**
 * Jina Metadata Scraping - ALLEEN FEITEN
 *
 * Haalt ALLEEN gestructureerde metadata van websites:
 * - Email adressen
 * - Telefoonnummers
 * - Social media links
 * - Openingstijden
 *
 * NIET voor content/tekst - daar is GPT beter in!
 *
 * Usage:
 *   npx tsx scripts/scrape-jina-metadata.ts                    # All countries
 *   npx tsx scripts/scrape-jina-metadata.ts --country=DE       # Specific country
 *   npx tsx scripts/scrape-jina-metadata.ts --stats            # Only show stats
 */

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

const JINA_API_KEY = process.env.JINA_API_KEY || "";
const JINA_API_URL = "https://r.jina.ai";
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000;
const BATCH_DELAY = 1000;

interface Place {
  id: number;
  name: string;
  website: string | null;
  country_code: string;
  scraped_content: Record<string, unknown> | null;
}

interface MetadataExtracted {
  email?: string;
  phone?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  openingHours?: Record<string, string>;
  foundedYear?: number;
  teamSize?: string;
}

/**
 * Fetch website content using Jina AI
 */
async function fetchWebsite(url: string, retryCount = 0): Promise<string | null> {
  if (!JINA_API_KEY) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${JINA_API_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`   ⏳ Rate limited, waiting...`);
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWebsite(url, retryCount + 1);
    }

    if (!response.ok) return null;

    const data = await response.json();
    return data.data?.content || data.content || "";
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWebsite(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Extract ONLY metadata from website content - NO long text!
 */
function extractMetadata(content: string): MetadataExtracted {
  const result: MetadataExtracted = {};

  // Email - multiple patterns
  const emailPatterns = [
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  ];
  for (const pattern of emailPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      // Filter out non-business emails and false positives
      const validEmail = matches.find(
        (e) =>
          // Not a common placeholder
          !e.includes("example.com") &&
          !e.includes("domain.com") &&
          !e.includes("email.com") &&
          !e.includes("wix.com") &&
          !e.includes("wordpress.com") &&
          !e.includes("sentry.io") &&
          !e.includes("placeholder") &&
          // Not an image file (common false positive!)
          !e.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)$/i) &&
          // Not a JS/CSS file
          !e.match(/\.(js|css|min|bundle)$/i) &&
          // Not a retina image pattern (@2x, @3x)
          !e.includes("@2x") &&
          !e.includes("@3x") &&
          // Must have a valid TLD (not just random text)
          e.match(/@[a-zA-Z0-9.-]+\.(com|nl|be|de|fr|es|it|uk|org|net|eu|info|co|io|biz)$/i)
      );
      if (validEmail) {
        result.email = validEmail.toLowerCase();
        break;
      }
    }
  }

  // Phone numbers (international formats)
  const phonePatterns = [
    /\+31\s*[\d\s\-()]{8,}/g,  // Netherlands
    /\+32\s*[\d\s\-()]{8,}/g,  // Belgium
    /\+49\s*[\d\s\-()]{8,}/g,  // Germany
    /\+44\s*[\d\s\-()]{8,}/g,  // UK
    /\+33\s*[\d\s\-()]{8,}/g,  // France
    /\+34\s*[\d\s\-()]{8,}/g,  // Spain
    /\+39\s*[\d\s\-()]{8,}/g,  // Italy
    /\+1\s*[\d\s\-()]{9,}/g,   // US/Canada
    /\+61\s*[\d\s\-()]{8,}/g,  // Australia
    /0\d{1,3}[\s\-]?\d{6,}/g,  // Local formats
  ];
  for (const pattern of phonePatterns) {
    const match = content.match(pattern);
    if (match) {
      result.phone = match[0].replace(/\s+/g, " ").trim();
      break;
    }
  }

  // Social Media
  const socialMedia: MetadataExtracted["socialMedia"] = {};

  const fbMatch = content.match(/facebook\.com\/([a-zA-Z0-9._-]+)/i);
  if (fbMatch && fbMatch[1] !== "sharer") {
    socialMedia.facebook = `https://facebook.com/${fbMatch[1]}`;
  }

  const igMatch = content.match(/instagram\.com\/([a-zA-Z0-9._-]+)/i);
  if (igMatch && igMatch[1] !== "p") {
    socialMedia.instagram = `https://instagram.com/${igMatch[1]}`;
  }

  const twMatch = content.match(/(?:twitter|x)\.com\/([a-zA-Z0-9._-]+)/i);
  if (twMatch && !["intent", "share"].includes(twMatch[1])) {
    socialMedia.twitter = `https://twitter.com/${twMatch[1]}`;
  }

  const liMatch = content.match(/linkedin\.com\/(?:company|in)\/([a-zA-Z0-9._-]+)/i);
  if (liMatch) {
    socialMedia.linkedin = `https://linkedin.com/company/${liMatch[1]}`;
  }

  if (Object.keys(socialMedia).length > 0) {
    result.socialMedia = socialMedia;
  }

  // Founded year
  const yearPatterns = [
    /(?:opgericht|sinds|gestart|founded|established|since|gegründet|depuis|desde)\s*(?:in\s*)?(\d{4})/i,
    /(?:since|seit|depuis)\s+(\d{4})/i,
  ];
  for (const pattern of yearPatterns) {
    const match = content.match(pattern);
    if (match) {
      const year = parseInt(match[1], 10);
      if (year >= 1900 && year <= new Date().getFullYear()) {
        result.foundedYear = year;
        break;
      }
    }
  }

  // Team size
  const teamPatterns = [
    /(\d+)\s*(?:medewerkers|werknemers|mitarbeiter|employees|employés|empleados)/i,
    /team\s*(?:of|van|von)?\s*(\d+)/i,
  ];
  for (const pattern of teamPatterns) {
    const match = content.match(pattern);
    if (match) {
      result.teamSize = match[1];
      break;
    }
  }

  return result;
}

/**
 * Update place with scraped metadata
 */
async function updatePlace(placeId: number, metadata: MetadataExtracted): Promise<boolean> {
  try {
    const updates: Record<string, unknown> = {
      jinaMetadataAt: new Date().toISOString(),
    };

    if (metadata.email) updates.email = metadata.email;
    if (metadata.phone) updates.phone = metadata.phone;
    if (metadata.socialMedia) updates.socialMedia = metadata.socialMedia;
    if (metadata.foundedYear) updates.foundedYear = metadata.foundedYear;
    if (metadata.teamSize) updates.teamSize = metadata.teamSize;

    await sql`
      UPDATE places
      SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(updates)}::jsonb,
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get statistics per country
 */
async function getStats() {
  const stats = await sql`
    SELECT
      co.code,
      co.name,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE p.website IS NOT NULL AND p.website != '') as has_website,
      COUNT(*) FILTER (WHERE p.scraped_content->>'jinaMetadataAt' IS NOT NULL) as metadata_done,
      COUNT(*) FILTER (WHERE p.scraped_content->>'email' IS NOT NULL) as has_email,
      COUNT(*) FILTER (WHERE p.scraped_content->>'socialMedia' IS NOT NULL) as has_social
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY co.code, co.name
    ORDER BY COUNT(*) DESC
  `;
  return stats;
}

/**
 * Main function
 */
async function main() {
  console.log("🔍 Jina Metadata Scraping - ALLEEN FEITEN\n");
  console.log("═".repeat(60));
  console.log("📧 Email | 📱 Telefoon | 📱 Social | 📅 Opgericht");
  console.log("═".repeat(60));

  if (!JINA_API_KEY) {
    console.error("❌ JINA_API_KEY not found in .env");
    process.exit(1);
  }

  // Parse arguments
  const args = process.argv.slice(2);
  const countryArg = args.find((a) => a.startsWith("--country="));
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const statsOnly = args.includes("--stats");

  const countryFilter = countryArg ? countryArg.split("=")[1].toUpperCase() : null;
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 500;

  // Show stats
  console.log("\n📊 Current Status:\n");
  const stats = await getStats();

  for (const s of stats) {
    const flag = getFlagEmoji(s.code as string);
    console.log(
      `${flag} ${(s.name as string).padEnd(15)} | ` +
      `📧 ${String(s.has_email).padStart(5)} | ` +
      `📱 ${String(s.has_social).padStart(5)} | ` +
      `Done: ${s.metadata_done}/${s.has_website}`
    );
  }

  if (statsOnly) return;

  // Get places needing metadata
  const places = (await sql`
    SELECT
      p.id,
      p.name,
      p.website,
      co.code as country_code,
      p.scraped_content
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.website IS NOT NULL
    AND p.website != ''
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'jinaMetadataAt' IS NULL)
    ${countryFilter ? sql`AND co.code = ${countryFilter}` : sql``}
    ORDER BY p.review_count DESC NULLS LAST
    LIMIT ${limit}
  `) as Place[];

  console.log(`\n🔄 Processing ${places.length} places...\n`);

  if (places.length === 0) {
    console.log("✅ All places have been processed!");
    return;
  }

  let success = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const flag = getFlagEmoji(place.country_code);
    const progress = `[${(i + 1).toString().padStart(4)}/${places.length}]`;

    process.stdout.write(`${progress} ${flag} ${place.name.slice(0, 30).padEnd(30)} `);

    let url = place.website!;
    if (!url.startsWith("http")) url = "https://" + url;

    const content = await fetchWebsite(url);

    if (content && content.length > 100) {
      const metadata = extractMetadata(content);
      const parts: string[] = [];

      if (metadata.email) parts.push("📧");
      if (metadata.phone) parts.push("📱");
      if (metadata.socialMedia) parts.push(`🔗${Object.keys(metadata.socialMedia).length}`);
      if (metadata.foundedYear) parts.push(`📅${metadata.foundedYear}`);

      if (parts.length > 0) {
        await updatePlace(place.id, metadata);
        success++;
        console.log(`✅ ${parts.join(" ")}`);
      } else {
        // Still mark as processed (no metadata found)
        const noMetadataUpdate = JSON.stringify({
          jinaMetadataAt: new Date().toISOString(),
        });
        await sql`
          UPDATE places SET
            scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${noMetadataUpdate}::jsonb
          WHERE id = ${place.id}
        `;
        failed++;
        console.log(`⚪ No metadata found`);
      }
    } else {
      failed++;
      console.log(`❌ Fetch failed`);
    }

    await new Promise((r) => setTimeout(r, BATCH_DELAY));
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n" + "═".repeat(60));
  console.log(`✅ Done! Success: ${success} | Failed: ${failed} | Time: ${elapsed}s`);
}

function getFlagEmoji(code: string): string {
  const flags: Record<string, string> = {
    NL: "🇳🇱", BE: "🇧🇪", DE: "🇩🇪", FR: "🇫🇷", GB: "🇬🇧",
    US: "🇺🇸", CA: "🇨🇦", AU: "🇦🇺", ES: "🇪🇸", IT: "🇮🇹",
  };
  return flags[code] || "🌍";
}

main().catch(console.error);
