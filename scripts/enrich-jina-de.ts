#!/usr/bin/env npx tsx
/**
 * Jina Website Scraping - GERMANY ONLY
 *
 * Scrapes websites using Jina AI to extract:
 * - About Us / Description (Über uns)
 * - Services (Dienstleistungen)
 * - Facts (teamSize, foundedYear, specializations)
 * - Opening Hours (Öffnungszeiten)
 * - Contact Info
 *
 * Writes directly to database (scraped_content JSONB column)
 *
 * Usage:
 *   npx tsx scripts/enrich-jina-de.ts [--batch-size=50] [--offset=0]
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

interface Place {
  id: number;
  name: string;
  website: string | null;
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
    console.error("   JINA_API_KEY not set");
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
 * Extract structured data from website content (German-focused)
 */
function extractDataFromContent(content: string, title: string): JinaExtracted {
  const result: JinaExtracted = {};

  // Clean content
  const cleanContent = content
    .replace(/\s+/g, " ")
    .replace(/\[.*?\]/g, "")
    .trim();

  // Extract About Us - look for German patterns
  const aboutPatterns = [
    /(?:über uns|about us|wer wir sind|unsere philosophie|willkommen bei|herzlich willkommen)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    /(?:wir sind|unser team|unsere praxis|unser unternehmen)[:\s]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
    /(?:seit|gegründet)[:\s]*\d{4}[^.]*([^.!?]*(?:[.!?][^.!?]*){2,5})/i,
  ];

  for (const pattern of aboutPatterns) {
    const match = cleanContent.match(pattern);
    if (match && match[1] && match[1].length > 100) {
      result.aboutUs = match[1].trim().slice(0, 1000);
      break;
    }
  }

  // Fallback: use first 800 chars of clean content as description
  if (!result.aboutUs && cleanContent.length > 200) {
    let desc = cleanContent.slice(0, 800);
    const lastPeriod = desc.lastIndexOf(".");
    if (lastPeriod > 400) {
      desc = desc.slice(0, lastPeriod + 1);
    }
    result.aboutUs = desc.trim();
  }

  // Extract services - German service keywords
  const services: string[] = [];
  const servicePatterns = [
    // Grooming (Hundefriseur/Hundesalon)
    /(?:trimmen|scheren|baden|waschen|fellpflege|krallenpflege|ohrenpflege|zähne)/gi,
    // Veterinary (Tierarzt)
    /(?:impfung|kastration|sterilisation|vorsorge|behandlung|operation|chirurgie|notfall|notdienst)/gi,
    // Training (Hundeschule)
    /(?:training|erziehung|welpengruppe|welpenkurs|agility|obedience|verhaltensberatung|einzeltraining)/gi,
    // Pet Hotel/Pension (Tierpension)
    /(?:pension|betreuung|tagesbetreuung|übernachtung|urlaubsbetreuung|hundebetreuung|katzenbetreuung)/gi,
    // General pet services
    /(?:futter|ernährung|ernährungsberatung|physiotherapie|akupunktur|homöopathie)/gi,
    // Dog walking/sitting
    /(?:gassi|spaziergang|hundesitter|hundesitting|dog walking)/gi,
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

  // Team size
  const teamMatch = cleanContent.match(
    /(\d+)\s*(?:mitarbeiter|angestellte|tierärzte|kollegen|team|mitglieder|fachkräfte)/i
  );
  if (teamMatch) {
    facts.teamSize = `${teamMatch[1]} Mitarbeiter`;
  }

  // Founded year
  const yearMatch = cleanContent.match(
    /(?:gegründet|seit|eröffnet|besteht seit|founded|established)\s*(?:im\s*jahr\s*|in\s*)?(\d{4})/i
  );
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    if (year >= 1900 && year <= new Date().getFullYear()) {
      facts.foundedYear = year;
    }
  }

  // Specializations
  const specializations: string[] = [];
  const specPatterns = [
    /spezialisiert auf ([^.]+)/i,
    /schwerpunkt[:\s]+([^.]+)/i,
    /spezialisierung[:\s]+([^.]+)/i,
    /fachgebiet[:\s]+([^.]+)/i,
    /experten für ([^.]+)/i,
  ];

  for (const pattern of specPatterns) {
    const match = cleanContent.match(pattern);
    if (match && match[1]) {
      const specs = match[1]
        .split(/[,und&]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2 && s.length < 50);
      specializations.push(...specs);
    }
  }

  if (specializations.length > 0) {
    facts.specializations = [...new Set(specializations)].slice(0, 5);
  }

  if (Object.keys(facts).length > 0) {
    result.facts = facts;
  }

  // Extract opening hours (German format)
  const hoursPattern =
    /(?:mo|di|mi|do|fr|sa|so|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)[:\s]*(\d{1,2}[:.]\d{2})\s*[-–bis]\s*(\d{1,2}[:.]\d{2})/gi;
  const hoursMatches = cleanContent.matchAll(hoursPattern);
  const hours: Record<string, string> = {};

  for (const match of hoursMatches) {
    const day = match[0].split(/[:\s]/)[0].toLowerCase();
    hours[day] = `${match[1]} - ${match[2]}`;
  }

  if (Object.keys(hours).length > 0) {
    result.openingHours = hours;
  }

  // Extract highlights/USPs
  const highlights: string[] = [];
  const uspPatterns = [
    /✓\s*([^✓\n]+)/g,
    /✔\s*([^✔\n]+)/g,
    /•\s*([^•\n]+)/g,
    /★\s*([^★\n]+)/g,
    /▸\s*([^▸\n]+)/g,
  ];

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
      jinaSource: "jina_reader_de",
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
    console.error(`   DB error:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🇩🇪 Jina Website Scraping - GERMANY ONLY\n");
  console.log("━".repeat(60));

  if (!JINA_API_KEY) {
    console.error("JINA_API_KEY not found in .env");
    process.exit(1);
  }

  console.log(`✅ Jina API Key: ${JINA_API_KEY.slice(0, 15)}...`);

  // Parse command line arguments
  const args = process.argv.slice(2);
  const batchSizeArg = args.find((a) => a.startsWith("--batch-size="));
  const offsetArg = args.find((a) => a.startsWith("--offset="));
  const batchSize = batchSizeArg
    ? parseInt(batchSizeArg.split("=")[1], 10)
    : 50;
  const offset = offsetArg ? parseInt(offsetArg.split("=")[1], 10) : 0;

  // Count total Germany places needing Jina scraping
  const countResult = await sql`
    SELECT COUNT(*) as count FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'DE'
    AND p.website IS NOT NULL
    AND p.website != ''
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'jinaScrapedAt' IS NULL)
  `;
  const totalNeeding = parseInt(countResult[0].count as string, 10);

  console.log(`\n📊 Germany places with website needing Jina: ${totalNeeding}`);
  console.log(`📦 Processing batch: offset=${offset}, size=${batchSize}\n`);

  // Get batch of Germany places
  const places = (await sql`
    SELECT
      p.id,
      p.name,
      p.website,
      p.scraped_content
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'DE'
    AND p.website IS NOT NULL
    AND p.website != ''
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'jinaScrapedAt' IS NULL)
    ORDER BY p.id
    OFFSET ${offset}
    LIMIT ${batchSize}
  `) as Place[];

  console.log(`🔄 Processing ${places.length} places in this batch...\n`);

  if (places.length === 0) {
    console.log("✅ No more places to process!");
    return;
  }

  let scraped = 0;
  let failed = 0;
  let skipped = 0;
  const startTime = Date.now();

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const progress = `[${i + 1 + offset}/${totalNeeding}]`;

    process.stdout.write(
      `${progress} 🌐 ${place.name.slice(0, 35).padEnd(35)} `
    );

    if (!place.website) {
      skipped++;
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
        if (extracted.aboutUs) parts.push(`about:${extracted.aboutUs.length}c`);
        if (extracted.services) parts.push(`svc:${extracted.services.length}`);
        if (extracted.facts) parts.push("facts");
        if (extracted.openingHours) parts.push("hours");
        console.log(`✅ ${parts.join(", ")}`);
      } else {
        failed++;
        console.log(`❌ DB error`);
      }
    } else {
      failed++;
      console.log(`❌ No data`);
    }

    // Rate limiting
    if (i > 0 && i % 5 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "━".repeat(60));
  console.log(`\n✅ Batch complete!`);
  console.log(`   Scraped: ${scraped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Time: ${elapsed}s`);

  const remaining = totalNeeding - offset - places.length;
  if (remaining > 0) {
    console.log(`\n📋 Next batch command:`);
    console.log(
      `   npx tsx scripts/enrich-jina-de.ts --offset=${offset + batchSize} --batch-size=${batchSize}`
    );
  } else {
    console.log(`\n🎉 All Germany places with websites have been scraped!`);
  }
}

main().catch(console.error);
