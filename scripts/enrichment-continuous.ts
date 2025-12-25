#!/usr/bin/env npx tsx
/**
 * Continuous E-E-A-T Content Enrichment Script
 *
 * Runs continuously in batches, processing all places that need enrichment.
 * Designed to run for days with nohup.
 *
 * Usage:
 *   nohup npx tsx scripts/enrichment-continuous.ts >> enrichment-continuous.log 2>&1 &
 *
 * Features:
 *   - Processes in batches of 200
 *   - 2-minute pause between batches (API rate limiting)
 *   - Skips already enriched places
 *   - Prioritizes by country for variety
 *   - Detailed logging with timestamps
 *   - Graceful error handling
 */

import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const JINA_API_KEY = process.env.JINA_API_KEY || "";
const JINA_API_URL = "https://r.jina.ai";
const REQUEST_TIMEOUT = 15000; // 15 seconds (was 30)
const BATCH_SIZE = 300; // Larger batches (was 200)
const PAUSE_BETWEEN_BATCHES_MS = 30 * 1000; // 30 seconds (was 2 minutes)

interface Place {
  id: number;
  name: string;
  website: string | null;
  address: string | null;
  city_name: string;
  country_name: string;
  country_code: string;
  category_slug: string | null;
  category_name: string | null;
  avg_rating: string | null;
  review_count: number | null;
}

interface LocaleConfig {
  language: string;
  languageName: string;
  minWords: number;
  maxWords: number;
}

const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  NL: { language: "Dutch", languageName: "Nederlands", minWords: 400, maxWords: 600 },
  BE: { language: "Dutch", languageName: "Nederlands", minWords: 400, maxWords: 600 },
  DE: { language: "German", languageName: "Deutsch", minWords: 400, maxWords: 600 },
  GB: { language: "English", languageName: "English", minWords: 400, maxWords: 600 },
  US: { language: "English", languageName: "English", minWords: 400, maxWords: 600 },
  FR: { language: "French", languageName: "Français", minWords: 400, maxWords: 600 },
  ES: { language: "Spanish", languageName: "Español", minWords: 400, maxWords: 600 },
  IT: { language: "Italian", languageName: "Italiano", minWords: 400, maxWords: 600 },
  CA: { language: "English", languageName: "English", minWords: 400, maxWords: 600 },
  AU: { language: "English", languageName: "English", minWords: 400, maxWords: 600 },
};

const WRITING_STYLES = [
  { name: "storytelling", instruction: "Write in a warm, narrative style." },
  { name: "benefits-focused", instruction: "Lead with what customers gain." },
  { name: "expert-authority", instruction: "Emphasize credentials and experience." },
  { name: "community-focused", instruction: "Emphasize local community role." },
  { name: "service-detailed", instruction: "Thoroughly describe services offered." },
  { name: "trust-building", instruction: "Focus on reliability and satisfaction." }
];

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

async function fetchWebsiteContent(url: string): Promise<string | null> {
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
    if (!response.ok) return null;

    const data = await response.json();
    return data.data?.content || data.content || "";
  } catch {
    return null;
  }
}

async function generateContentFromWebsite(
  place: Place,
  websiteContent: string
): Promise<{
  aboutUs: string;
  highlights: string[];
  services: string[];
  contentSource: string;
  writingStyle: string;
} | null> {
  const locale = LOCALE_CONFIGS[place.country_code] || LOCALE_CONFIGS.GB;
  const style = WRITING_STYLES[Math.floor(Math.random() * WRITING_STYLES.length)];

  const prompt = `You are an expert content writer for a pet services directory.
Rewrite the following website content into a professional "About Us" text.

STYLE: ${style.name.toUpperCase()} - ${style.instruction}

RULES:
1. Write ${locale.minWords}-${locale.maxWords} words in ${locale.language}
2. Base content ONLY on the provided website text
3. Write in third person about the business
4. Make it SEO-friendly but natural
5. Include specific details that make this business unique

Business: ${place.name}
Category: ${place.category_name || "Pet Service"}
Location: ${place.city_name}, ${place.country_name}
${place.avg_rating ? `Rating: ${place.avg_rating}/5 (${place.review_count} reviews)` : ""}

=== WEBSITE CONTENT ===
${websiteContent.substring(0, 4000)}
=== END ===

Generate JSON with:
1. "aboutUs": ${locale.minWords}-${locale.maxWords} words in ${locale.language}
2. "highlights": Array of 4-6 USPs from the website
3. "services": Array of 5-10 services offered

Output only valid JSON in ${locale.language}.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: `Expert pet services content writer. Output JSON in ${locale.language}.` },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    const wordCount = parsed.aboutUs?.split(/\s+/).length || 0;

    if (wordCount < 300) return null;

    return {
      ...parsed,
      contentSource: "jina_gpt_rewrite",
      writingStyle: style.name,
    };
  } catch {
    return null;
  }
}

async function updatePlace(
  placeId: number,
  content: { aboutUs: string; highlights: string[]; services: string[]; contentSource: string; writingStyle: string },
  countryCode: string
): Promise<boolean> {
  const locale = LOCALE_CONFIGS[countryCode] || LOCALE_CONFIGS.GB;

  try {
    const updates = {
      aboutUs: content.aboutUs,
      highlights: content.highlights,
      services: content.services,
      contentSource: content.contentSource,
      writingStyle: content.writingStyle,
      contentLanguage: locale.language.toLowerCase(),
      contentGeneratedAt: new Date().toISOString(),
    };

    await sql`
      UPDATE places
      SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(updates)}::jsonb,
        updated_at = NOW()
      WHERE id = ${placeId}
    `;
    return true;
  } catch {
    return false;
  }
}

async function getPlacesToEnrich(limit: number): Promise<Place[]> {
  return (await sql`
    SELECT
      p.id,
      p.name,
      p.website,
      p.address,
      p.avg_rating,
      p.review_count,
      ci.name as city_name,
      co.name as country_name,
      co.code as country_code,
      cat.slug as category_slug,
      cat.label_key as category_name
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries co ON ci.country_id = co.id
    LEFT JOIN place_categories pc ON pc.place_id = p.id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    WHERE p.website IS NOT NULL
      AND p.website != ''
      AND (
        p.scraped_content IS NULL
        OR p.scraped_content->>'aboutUs' IS NULL
        OR LENGTH(p.scraped_content->>'aboutUs') < 500
      )
    ORDER BY RANDOM()
    LIMIT ${limit}
  `) as Place[];
}

async function getStats(): Promise<{ total: number; enriched: number; todo: number }> {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN scraped_content->>'aboutUs' IS NOT NULL AND LENGTH(scraped_content->>'aboutUs') > 500 THEN 1 END) as enriched,
      COUNT(CASE WHEN website IS NOT NULL AND website != '' AND (scraped_content->>'aboutUs' IS NULL OR LENGTH(scraped_content->>'aboutUs') < 500) THEN 1 END) as todo
    FROM places
  `;
  return {
    total: Number(result[0].total),
    enriched: Number(result[0].enriched),
    todo: Number(result[0].todo),
  };
}

async function processBatch(batchNumber: number): Promise<{ success: number; failed: number }> {
  const places = await getPlacesToEnrich(BATCH_SIZE);

  if (places.length === 0) {
    log("🎉 No more places to enrich! All done!");
    return { success: 0, failed: 0 };
  }

  log(`\n${"═".repeat(70)}`);
  log(`📦 BATCH ${batchNumber} - Processing ${places.length} places`);
  log(`${"═".repeat(70)}\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const progress = `[${i + 1}/${places.length}]`;

    if (!place.website) {
      failed++;
      continue;
    }

    log(`${progress} 🏢 ${place.name}`);
    log(`        📍 ${place.city_name}, ${place.country_name}`);

    const websiteContent = await fetchWebsiteContent(place.website);

    if (!websiteContent || websiteContent.length < 200) {
      log(`        ❌ Could not fetch website content`);
      failed++;
      continue;
    }

    log(`        📄 Fetched ${websiteContent.length} chars`);

    const content = await generateContentFromWebsite(place, websiteContent);

    if (!content) {
      log(`        ❌ Could not generate content`);
      failed++;
      continue;
    }

    const wordCount = content.aboutUs.split(/\s+/).length;
    log(`        ✍️  Generated ${wordCount} words, ${content.highlights?.length || 0} highlights`);

    const saved = await updatePlace(place.id, content, place.country_code);

    if (saved) {
      log(`        ✅ Saved!`);
      success++;
    } else {
      log(`        ❌ Failed to save`);
      failed++;
    }

    // Small delay between places to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms (was 500ms)
  }

  return { success, failed };
}

async function main() {
  log("🚀 CONTINUOUS E-E-A-T CONTENT ENRICHMENT");
  log("═".repeat(70));
  log("📋 Configuration:");
  log(`   Batch size: ${BATCH_SIZE}`);
  log(`   Pause between batches: ${PAUSE_BETWEEN_BATCHES_MS / 1000 / 60} minutes`);
  log("═".repeat(70));

  if (!JINA_API_KEY) {
    log("❌ JINA_API_KEY not found in .env");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    log("❌ OPENAI_API_KEY not found in .env");
    process.exit(1);
  }

  // Initial stats
  const initialStats = await getStats();
  log(`\n📊 INITIAL STATS:`);
  log(`   Total places: ${initialStats.total.toLocaleString()}`);
  log(`   Already enriched: ${initialStats.enriched.toLocaleString()} (${((initialStats.enriched / initialStats.total) * 100).toFixed(1)}%)`);
  log(`   To process: ${initialStats.todo.toLocaleString()}`);
  log(`   Estimated batches: ${Math.ceil(initialStats.todo / BATCH_SIZE)}`);
  log(`   Estimated time: ${Math.ceil((initialStats.todo / BATCH_SIZE) * ((BATCH_SIZE * 10) / 60 + PAUSE_BETWEEN_BATCHES_MS / 60000))} minutes\n`);

  let batchNumber = 1;
  let totalSuccess = 0;
  let totalFailed = 0;
  const startTime = Date.now();

  while (true) {
    const { success, failed } = await processBatch(batchNumber);

    totalSuccess += success;
    totalFailed += failed;

    if (success === 0 && failed === 0) {
      // No more places to process
      break;
    }

    // Get current stats
    const stats = await getStats();
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const rate = totalSuccess / elapsed;

    log(`\n📈 BATCH ${batchNumber} COMPLETE`);
    log(`   This batch: ✅ ${success} | ❌ ${failed}`);
    log(`   Total: ✅ ${totalSuccess} | ❌ ${totalFailed}`);
    log(`   Progress: ${stats.enriched.toLocaleString()}/${stats.total.toLocaleString()} (${((stats.enriched / stats.total) * 100).toFixed(1)}%)`);
    log(`   Remaining: ${stats.todo.toLocaleString()}`);
    log(`   Rate: ${rate.toFixed(1)} places/min`);
    log(`   Elapsed: ${elapsed.toFixed(0)} minutes`);

    if (stats.todo === 0) {
      log("\n🎉 ALL PLACES ENRICHED!");
      break;
    }

    log(`\n⏳ Pausing ${PAUSE_BETWEEN_BATCHES_MS / 1000 / 60} minutes before next batch...`);
    await new Promise(resolve => setTimeout(resolve, PAUSE_BETWEEN_BATCHES_MS));

    batchNumber++;
  }

  const totalTime = (Date.now() - startTime) / 1000 / 60;
  log(`\n${"═".repeat(70)}`);
  log(`✅ ENRICHMENT COMPLETE!`);
  log(`   Total success: ${totalSuccess}`);
  log(`   Total failed: ${totalFailed}`);
  log(`   Total time: ${totalTime.toFixed(0)} minutes`);
  log(`${"═".repeat(70)}`);
}

main().catch((error) => {
  log(`❌ FATAL ERROR: ${error.message}`);
  process.exit(1);
});
