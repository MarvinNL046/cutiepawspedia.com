#!/usr/bin/env npx tsx
/**
 * Jina Website Scraping - ALL COUNTRIES
 *
 * Scrapes websites using Jina AI to extract real content from business websites.
 * Writes directly to database (scraped_content JSONB column)
 *
 * This gives REAL, UNIQUE content per place - much better for SEO than GPT-generated.
 *
 * Usage:
 *   npx tsx scripts/enrich-jina-all.ts                    # All countries
 *   npx tsx scripts/enrich-jina-all.ts --country=DE       # Specific country
 *   npx tsx scripts/enrich-jina-all.ts --batch-size=100   # Larger batches
 *   npx tsx scripts/enrich-jina-all.ts --limit=1000       # Limit total
 *
 * Features:
 *   - Processes ALL countries with websites
 *   - Auto-resume (skips places with jinaScrapedAt)
 *   - Rate limiting with exponential backoff
 *   - Progress tracking
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
const BATCH_DELAY = 1000; // 1s between requests to avoid rate limits

interface Place {
  id: number;
  name: string;
  website: string | null;
  country_code: string;
  country_name: string;
  scraped_content: Record<string, unknown> | null;
}

interface JinaExtracted {
  aboutUs?: string;
  services?: string[];
  facts?: {
    teamSize?: string;
    foundedYear?: number;
    specializations?: string[];
  };
  openingHours?: Record<string, string>;
  highlights?: string[];
  email?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

/**
 * Fetch and extract content from a website using Jina AI
 */
async function scrapeWebsite(
  url: string,
  retryCount = 0
): Promise<JinaExtracted | null> {
  if (!JINA_API_KEY) {
    return null;
  }

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
      return scrapeWebsite(url, retryCount + 1);
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const content = data.data?.content || data.content || "";
    const title = data.data?.title || data.title || "";

    if (!content || content.length < 100) {
      return null;
    }

    return extractDataFromContent(content, title);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return scrapeWebsite(url, retryCount + 1);
    }
    return null;
  }
}

/**
 * Extract structured data from website content
 * Supports multiple languages (NL, DE, EN, FR, ES, IT)
 */
function extractDataFromContent(content: string, title: string): JinaExtracted {
  const result: JinaExtracted = {};

  // Clean content
  const cleanContent = content
    .replace(/\s+/g, " ")
    .replace(/\[.*?\]/g, "")
    .trim();

  // Multi-language about patterns
  const aboutPatterns = [
    // Dutch
    /(?:over ons|wie zijn wij|onze missie|welkom bij)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    // German
    /(?:über uns|wir sind|unsere mission|willkommen bei)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    // English
    /(?:about us|who we are|our mission|welcome to)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    // French
    /(?:à propos|qui sommes-nous|notre mission|bienvenue)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    // Spanish
    /(?:sobre nosotros|quiénes somos|nuestra misión|bienvenidos)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    // Italian
    /(?:chi siamo|la nostra missione|benvenuti)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
  ];

  for (const pattern of aboutPatterns) {
    const match = cleanContent.match(pattern);
    if (match && match[1] && match[1].length > 100) {
      result.aboutUs = match[1].trim().slice(0, 1000);
      break;
    }
  }

  // Fallback: use first 800 chars as description
  if (!result.aboutUs && cleanContent.length > 200) {
    let desc = cleanContent.slice(0, 800);
    const lastPeriod = desc.lastIndexOf(".");
    if (lastPeriod > 400) {
      desc = desc.slice(0, lastPeriod + 1);
    }
    result.aboutUs = desc.trim();
  }

  // Multi-language service patterns
  const services: string[] = [];
  const servicePatterns = [
    // Pet services (multi-language)
    /(?:trimmen|grooming|knippen|wassen|nagels|pflege|toilettage|peluquería)/gi,
    /(?:vaccinatie|inenting|impfung|vaccination|vacunación)/gi,
    /(?:training|cursus|puppyschool|hundeschule|dressage|adiestramiento)/gi,
    /(?:pension|opvang|boarding|pensión|pensione)/gi,
    /(?:consult|behandeling|operatie|behandlung|consultation|consulta)/gi,
    /(?:voeding|food|futter|alimentation|alimentación)/gi,
  ];

  for (const pattern of servicePatterns) {
    const matches = cleanContent.match(pattern);
    if (matches) {
      services.push(...matches.map((m) => m.toLowerCase()));
    }
  }

  if (services.length > 0) {
    result.services = [...new Set(services)].slice(0, 10);
  }

  // Extract facts
  const facts: JinaExtracted["facts"] = {};

  // Team size (multi-language)
  const teamMatch = cleanContent.match(
    /(\d+)\s*(?:medewerkers|werknemers|mitarbeiter|employees|employés|empleados)/i
  );
  if (teamMatch) {
    facts.teamSize = `${teamMatch[1]}`;
  }

  // Founded year
  const yearMatch = cleanContent.match(
    /(?:opgericht|sinds|gestart|founded|established|since|gegründet|depuis|desde)\s*(?:in\s*)?(\d{4})/i
  );
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    if (year >= 1900 && year <= new Date().getFullYear()) {
      facts.foundedYear = year;
    }
  }

  if (Object.keys(facts).length > 0) {
    result.facts = facts;
  }

  // Extract highlights/USPs
  const highlights: string[] = [];
  const uspPatterns = [/✓\s*([^✓\n]+)/g, /✔\s*([^✔\n]+)/g, /•\s*([^•\n]+)/g];

  for (const pattern of uspPatterns) {
    const matches = cleanContent.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[1].length > 10 && match[1].length < 80) {
        highlights.push(match[1].trim());
      }
    }
  }

  if (highlights.length > 0) {
    result.highlights = [...new Set(highlights)].slice(0, 5);
  }

  // Extract email
  const emailMatch = cleanContent.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // Extract social media
  const socialMedia: JinaExtracted["socialMedia"] = {};

  const fbMatch = content.match(/facebook\.com\/([a-zA-Z0-9._-]+)/i);
  if (fbMatch) socialMedia.facebook = `https://facebook.com/${fbMatch[1]}`;

  const igMatch = content.match(/instagram\.com\/([a-zA-Z0-9._-]+)/i);
  if (igMatch) socialMedia.instagram = `https://instagram.com/${igMatch[1]}`;

  if (Object.keys(socialMedia).length > 0) {
    result.socialMedia = socialMedia;
  }

  return result;
}

/**
 * Update place with scraped content
 */
async function updatePlace(
  placeId: number,
  extracted: JinaExtracted
): Promise<boolean> {
  try {
    const updates: Record<string, unknown> = {
      jinaScrapedAt: new Date().toISOString(),
      jinaSource: "jina_reader_universal",
    };

    if (extracted.aboutUs) updates.aboutUs = extracted.aboutUs;
    if (extracted.services) updates.services = extracted.services;
    if (extracted.facts) updates.facts = extracted.facts;
    if (extracted.openingHours) updates.openingHours = extracted.openingHours;
    if (extracted.highlights) updates.highlights = extracted.highlights;
    if (extracted.email) updates.email = extracted.email;
    if (extracted.socialMedia) updates.socialMedia = extracted.socialMedia;

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
      COUNT(*) FILTER (WHERE p.scraped_content->>'jinaScrapedAt' IS NOT NULL) as jina_done,
      COUNT(*) FILTER (
        WHERE p.website IS NOT NULL
        AND p.website != ''
        AND (p.scraped_content IS NULL OR p.scraped_content->>'jinaScrapedAt' IS NULL)
      ) as needs_jina
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
  console.log("🌍 Jina Website Scraping - ALL COUNTRIES\n");
  console.log("═".repeat(60));

  if (!JINA_API_KEY) {
    console.error("❌ JINA_API_KEY not found in .env");
    process.exit(1);
  }

  console.log(`✅ Jina API Key: ${JINA_API_KEY.slice(0, 15)}...`);

  // Parse command line arguments
  const args = process.argv.slice(2);
  const countryArg = args.find((a) => a.startsWith("--country="));
  const batchSizeArg = args.find((a) => a.startsWith("--batch-size="));
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const statsOnly = args.includes("--stats");

  const countryFilter = countryArg ? countryArg.split("=")[1].toUpperCase() : null;
  const batchSize = batchSizeArg ? parseInt(batchSizeArg.split("=")[1], 10) : 50;
  // Default limit of 500 per run to prevent slow DB queries - shell script will loop
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 500;

  // Show stats
  console.log("\n📊 Current Status:\n");
  const stats = await getStats();

  let totalNeeds = 0;
  for (const s of stats) {
    const needsJina = Number(s.needs_jina);
    totalNeeds += needsJina;
    const flag = getFlagEmoji(s.code as string);
    const bar = "█".repeat(Math.min(20, Math.floor(Number(s.jina_done) / Number(s.has_website) * 20))) +
                "░".repeat(20 - Math.min(20, Math.floor(Number(s.jina_done) / Number(s.has_website) * 20)));
    console.log(
      `${flag} ${(s.name as string).padEnd(15)} [${bar}] ${String(s.jina_done).padStart(5)}/${String(s.has_website).padStart(5)} (needs: ${needsJina})`
    );
  }
  console.log(`\n📈 Total needing Jina scrape: ${totalNeeds.toLocaleString()}`);

  if (statsOnly) {
    return;
  }

  // Build query based on filters
  let countryCondition = "";
  if (countryFilter) {
    countryCondition = `AND co.code = '${countryFilter}'`;
    console.log(`\n🔍 Filtering to country: ${countryFilter}`);
  }

  const limitCondition = limit ? `LIMIT ${limit}` : "";
  console.log(`📦 Batch size: ${batchSize}`);
  if (limit) console.log(`🔢 Total limit: ${limit}`);

  // Get places needing Jina scraping
  const places = (await sql`
    SELECT
      p.id,
      p.name,
      p.website,
      co.code as country_code,
      co.name as country_name,
      p.scraped_content
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.website IS NOT NULL
    AND p.website != ''
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'jinaScrapedAt' IS NULL)
    ${countryFilter ? sql`AND co.code = ${countryFilter}` : sql``}
    ORDER BY
      CASE co.code
        WHEN 'NL' THEN 1
        WHEN 'BE' THEN 2
        WHEN 'DE' THEN 3
        WHEN 'UK' THEN 4
        WHEN 'US' THEN 5
        ELSE 6
      END,
      p.review_count DESC NULLS LAST
    ${limit ? sql`LIMIT ${limit}` : sql``}
  `) as Place[];

  console.log(`\n🔄 Processing ${places.length} places...\n`);
  console.log("─".repeat(60));

  if (places.length === 0) {
    console.log("✅ All places with websites have been scraped!");
    return;
  }

  let scraped = 0;
  let failed = 0;
  let batchCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const flag = getFlagEmoji(place.country_code);
    const progress = `[${(i + 1).toString().padStart(5)}/${places.length}]`;

    process.stdout.write(
      `${progress} ${flag} ${place.name.slice(0, 30).padEnd(30)} `
    );

    if (!place.website) {
      console.log(`⏭️ No website`);
      continue;
    }

    // Clean URL
    let url = place.website;
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const extracted = await scrapeWebsite(url);

    if (extracted && Object.keys(extracted).length > 0) {
      const updated = await updatePlace(place.id, extracted);
      if (updated) {
        scraped++;
        const parts = [];
        if (extracted.aboutUs) parts.push(`${extracted.aboutUs.length}c`);
        if (extracted.services) parts.push(`${extracted.services.length}svc`);
        if (extracted.facts) parts.push("facts");
        console.log(`✅ ${parts.join(", ")}`);
      } else {
        failed++;
        console.log(`❌ DB error`);
      }
    } else {
      failed++;
      console.log(`❌ No data`);
    }

    batchCount++;

    // Rate limiting - pause between requests
    if (batchCount >= batchSize) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const rate = (scraped / (Number(elapsed) || 1) * 60).toFixed(1);
      console.log(`\n⏳ Batch pause... (${scraped} scraped, ${rate}/min)\n`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      batchCount = 0;
    } else {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const rate = (scraped / (Number(elapsed) || 1) * 60).toFixed(1);

  console.log("\n" + "═".repeat(60));
  console.log(`\n✅ Batch complete!`);
  console.log(`   Scraped: ${scraped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Time: ${elapsed}s (${rate}/min)`);
  console.log(`   Remaining: ${totalNeeds - scraped}`);

  if (totalNeeds - scraped > 0) {
    console.log(`\n📋 Run again to continue processing remaining places`);
  } else {
    console.log(`\n🎉 All places with websites have been scraped!`);
  }
}

function getFlagEmoji(countryCode: string): string {
  const flags: Record<string, string> = {
    NL: "🇳🇱",
    BE: "🇧🇪",
    DE: "🇩🇪",
    FR: "🇫🇷",
    UK: "🇬🇧",
    US: "🇺🇸",
    CA: "🇨🇦",
    AU: "🇦🇺",
    ES: "🇪🇸",
    IT: "🇮🇹",
  };
  return flags[countryCode] || "🌍";
}

main().catch(console.error);
