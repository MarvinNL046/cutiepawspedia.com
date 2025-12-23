#!/usr/bin/env npx tsx
/**
 * E-E-A-T Content Enrichment Script
 *
 * ANDERS DAN DE OUDE AANPAK:
 * - Haalt EERST de echte website content op via Jina
 * - Geeft die ECHTE content aan GPT om te herschrijven
 * - Resultaat: 400+ woorden UNIEKE content (geen template effect!)
 *
 * Dit voldoet aan Google E-E-A-T:
 * - Experience: Gebaseerd op echte business informatie
 * - Expertise: Specifieke details van de website
 * - Authoritativeness: Feiten van de bron
 * - Trustworthiness: Geen verzonnen content
 *
 * Usage:
 *   npx tsx scripts/enrich-content-from-jina.ts --limit=50
 *   npx tsx scripts/enrich-content-from-jina.ts --country=NL --limit=100
 *   npx tsx scripts/enrich-content-from-jina.ts --dry-run
 */

import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const JINA_API_KEY = process.env.JINA_API_KEY || "";
const JINA_API_URL = "https://r.jina.ai";
const REQUEST_TIMEOUT = 30000;

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
  scraped_content: Record<string, unknown> | null;
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

/**
 * Fetch website content via Jina AI
 */
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

/**
 * Extract useful text from Jina markdown content
 * Removes navigation, footers, cookie notices etc.
 */
function extractUsefulContent(markdown: string): string {
  if (!markdown) return "";

  // Remove common noise patterns
  let content = markdown
    // Remove cookie/privacy notices
    .replace(/(?:cookies?|privacy|gdpr|accept all|reject all|cookie settings)[^\n]*\n?/gi, "")
    // Remove navigation menus
    .replace(/(?:home|menu|contact|about us|services|prices?)\s*\|/gi, "")
    // Remove social media links text
    .replace(/(?:follow us|share|tweet|facebook|instagram|linkedin)[^\n]*\n?/gi, "")
    // Remove copyright lines
    .replace(/(?:©|copyright|\(c\)|all rights reserved)[^\n]*\n?/gi, "")
    // Remove markdown image syntax
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove markdown links but keep text
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    // Remove HTML tags
    .replace(/<[^>]+>/g, "")
    // Remove excessive whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Get first 3000 characters (enough context for GPT, not too much)
  if (content.length > 3000) {
    content = content.substring(0, 3000) + "...";
  }

  return content;
}

/**
 * Extract metadata from content (email, phone, social) - same as before
 */
function extractMetadata(content: string): {
  email?: string;
  phone?: string;
  socialMedia?: Record<string, string>;
} {
  const result: { email?: string; phone?: string; socialMedia?: Record<string, string> } = {};

  // Email
  const emailMatch = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  if (emailMatch) {
    const validEmail = emailMatch.find(
      (e) =>
        !e.includes("example.com") &&
        !e.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i) &&
        !e.includes("@2x") &&
        e.match(/@[a-zA-Z0-9.-]+\.(com|nl|be|de|fr|es|it|uk|org|net|eu)$/i)
    );
    if (validEmail) result.email = validEmail.toLowerCase();
  }

  // Phone
  const phonePatterns = [
    /\+31\s*[\d\s\-()]{8,}/g,
    /\+32\s*[\d\s\-()]{8,}/g,
    /\+49\s*[\d\s\-()]{8,}/g,
    /\+33\s*[\d\s\-()]{8,}/g,
    /\+34\s*[\d\s\-()]{8,}/g,
    /\+39\s*[\d\s\-()]{8,}/g,
    /0\d{1,3}[\s\-]?\d{6,}/g,
  ];
  for (const pattern of phonePatterns) {
    const match = content.match(pattern);
    if (match) {
      result.phone = match[0].replace(/\s+/g, " ").trim();
      break;
    }
  }

  // Social Media
  const socialMedia: Record<string, string> = {};
  const fbMatch = content.match(/facebook\.com\/([a-zA-Z0-9._-]+)/i);
  if (fbMatch && fbMatch[1] !== "sharer") socialMedia.facebook = `https://facebook.com/${fbMatch[1]}`;

  const igMatch = content.match(/instagram\.com\/([a-zA-Z0-9._-]+)/i);
  if (igMatch && igMatch[1] !== "p") socialMedia.instagram = `https://instagram.com/${igMatch[1]}`;

  const liMatch = content.match(/linkedin\.com\/(?:company|in)\/([a-zA-Z0-9._-]+)/i);
  if (liMatch) socialMedia.linkedin = `https://linkedin.com/company/${liMatch[1]}`;

  if (Object.keys(socialMedia).length > 0) result.socialMedia = socialMedia;

  return result;
}

/**
 * Generate 400+ word content using GPT based on REAL website content
 */
// Writing style variations to avoid template-like content
const WRITING_STYLES = [
  {
    name: "storytelling",
    instruction: "Write in a storytelling style. Start with the business's history or founding story, then flow naturally into their services and what makes them special.",
    opening: "Begin with an engaging narrative about how this business came to be or what drives their passion for pet care."
  },
  {
    name: "benefits-focused",
    instruction: "Write in a benefits-focused style. Lead with what customers gain, then explain how the business delivers those benefits.",
    opening: "Start by highlighting the key benefits pet owners experience when choosing this business."
  },
  {
    name: "expert-authority",
    instruction: "Write in an authoritative expert style. Emphasize credentials, experience, and specialized knowledge.",
    opening: "Open with the business's expertise, qualifications, and years of experience in pet care."
  },
  {
    name: "community-focused",
    instruction: "Write in a warm, community-focused style. Emphasize the business's role in the local pet community.",
    opening: "Begin by describing how this business serves and connects with the local pet-loving community."
  },
  {
    name: "service-detailed",
    instruction: "Write in a detailed, service-oriented style. Thoroughly describe the range and depth of services offered.",
    opening: "Start with a comprehensive overview of the services and specializations this business provides."
  },
  {
    name: "trust-building",
    instruction: "Write in a trust-building style. Focus on reliability, reviews, and customer satisfaction.",
    opening: "Open with what makes this business trustworthy and why customers keep coming back."
  }
];

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

  // Randomly select a writing style for variety
  const style = WRITING_STYLES[Math.floor(Math.random() * WRITING_STYLES.length)];

  const prompt = `You are an expert content writer for a pet services directory.
You will rewrite and enhance the following real business website content into a professional "About Us" text.

WRITING STYLE: ${style.name.toUpperCase()}
${style.instruction}
${style.opening}

CRITICAL RULES:
1. Write ${locale.minWords}-${locale.maxWords} words in ${locale.language} (${locale.languageName})
2. Base your content ONLY on the provided website text - do NOT invent information
3. If the website mentions specific services, specializations, team members, or unique features - INCLUDE them
4. Write in third person about the business
5. Make it SEO-friendly but natural, not keyword-stuffed
6. Include specific details that make this business UNIQUE (not template text!)
7. VARY your sentence structure and paragraph lengths - avoid repetitive patterns!

Business: ${place.name}
Category: ${place.category_name || place.category_slug || "Pet Service"}
Location: ${place.city_name}, ${place.country_name}
${place.avg_rating ? `Rating: ${place.avg_rating}/5 (${place.review_count} reviews)` : ""}

=== REAL WEBSITE CONTENT (use this as your source!) ===
${websiteContent}
=== END OF WEBSITE CONTENT ===

Generate a JSON response with:
1. "aboutUs": A ${style.name} text of ${locale.minWords}-${locale.maxWords} words in ${locale.language}.
   - Follow the ${style.name} style described above
   - Include real services/specializations mentioned on the website
   - Mention location advantages
   - Make it feel natural and unique, not templated

2. "highlights": Array of 4-6 USPs based on the ACTUAL website content (not generic ones!)

3. "services": Array of 5-10 services ACTUALLY offered by this business (from the website)

IMPORTANT: Only output valid JSON. All text MUST be in ${locale.language}.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert pet services content writer. Write unique, specific content based on real business information. Output only valid JSON in ${locale.language}.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);

    // Validate word count
    const wordCount = parsed.aboutUs?.split(/\s+/).length || 0;
    if (wordCount < 300) {
      console.log(`   ⚠️  Content too short: ${wordCount} words`);
      return null;
    }

    return {
      ...parsed,
      contentSource: "jina_gpt_rewrite",
      writingStyle: style.name,
    };
  } catch (error) {
    console.error(`   ❌ GPT error:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Update place with enriched content
 */
async function updatePlace(
  placeId: number,
  content: {
    aboutUs: string;
    highlights: string[];
    services: string[];
    contentSource: string;
  },
  metadata: {
    email?: string;
    phone?: string;
    socialMedia?: Record<string, string>;
  },
  countryCode: string
): Promise<boolean> {
  const locale = LOCALE_CONFIGS[countryCode] || LOCALE_CONFIGS.GB;

  try {
    const updates = {
      // Content
      aboutUs: content.aboutUs,
      highlights: content.highlights,
      services: content.services,
      contentSource: content.contentSource,
      contentLanguage: locale.language.toLowerCase(),
      contentGeneratedAt: new Date().toISOString(),
      // Metadata
      ...(metadata.email && { email: metadata.email }),
      ...(metadata.phone && { phone: metadata.phone }),
      ...(metadata.socialMedia && { socialMedia: metadata.socialMedia }),
      jinaMetadataAt: new Date().toISOString(),
    };

    await sql`
      UPDATE places
      SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(updates)}::jsonb,
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch (error) {
    console.error(`   ❌ DB error:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 E-E-A-T Content Enrichment (Jina → GPT Rewrite)\n");
  console.log("═".repeat(70));
  console.log("📋 Deze aanpak:");
  console.log("   1. Haal ECHTE website content op via Jina");
  console.log("   2. GPT herschrijft naar 400+ woorden UNIEKE content");
  console.log("   3. Geen template effect - gebaseerd op echte info!");
  console.log("═".repeat(70) + "\n");

  if (!JINA_API_KEY) {
    console.error("❌ JINA_API_KEY not found in .env");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in .env");
    process.exit(1);
  }

  // Parse arguments
  const args = process.argv.slice(2);
  const countryArg = args.find((a) => a.startsWith("--country="));
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const dryRun = args.includes("--dry-run");

  const countryFilter = countryArg ? countryArg.split("=")[1].toUpperCase() : null;
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 50;

  console.log(`🔧 Config: limit=${limit}, country=${countryFilter || "ALL"}, dryRun=${dryRun}\n`);

  // Get places that need enrichment
  const places = (await sql`
    SELECT
      p.id,
      p.name,
      p.website,
      p.address,
      p.avg_rating,
      p.review_count,
      p.scraped_content,
      ci.name as city_name,
      co.name as country_name,
      co.code as country_code,
      cat.slug as category_slug,
      cat.label_key as category_name
    FROM places p
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    LEFT JOIN place_categories pc ON p.id = pc.place_id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    WHERE p.website IS NOT NULL
      AND p.website != ''
      AND (
        p.scraped_content IS NULL
        OR p.scraped_content->>'aboutUs' IS NULL
        OR LENGTH(p.scraped_content->>'aboutUs') < 500
        OR p.scraped_content->>'contentSource' != 'jina_gpt_rewrite'
      )
      ${countryFilter ? sql`AND co.code = ${countryFilter}` : sql``}
    ORDER BY p.review_count DESC NULLS LAST
    LIMIT ${limit}
  `) as Place[];

  console.log(`📊 Found ${places.length} places to enrich\n`);

  if (places.length === 0) {
    console.log("✅ All places already have good content!");
    return;
  }

  let success = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const progress = `[${(i + 1).toString().padStart(3)}/${places.length}]`;
    const locale = LOCALE_CONFIGS[place.country_code] || LOCALE_CONFIGS.GB;

    console.log(`\n${progress} 🏢 ${place.name}`);
    console.log(`        📍 ${place.city_name}, ${place.country_name} (${locale.languageName})`);
    console.log(`        🌐 ${place.website}`);

    // Step 1: Fetch website content via Jina
    let url = place.website!;
    if (!url.startsWith("http")) url = "https://" + url;

    const rawContent = await fetchWebsiteContent(url);

    if (!rawContent || rawContent.length < 200) {
      console.log(`        ❌ Could not fetch website content`);
      failed++;
      continue;
    }

    // Step 2: Extract useful text and metadata
    const cleanContent = extractUsefulContent(rawContent);
    const metadata = extractMetadata(rawContent);

    console.log(`        📄 Fetched ${cleanContent.length} chars of content`);
    if (metadata.email) console.log(`        📧 Email: ${metadata.email}`);
    if (metadata.socialMedia) console.log(`        🔗 Social: ${Object.keys(metadata.socialMedia).join(", ")}`);

    // Step 3: Generate content with GPT based on real website content
    const content = await generateContentFromWebsite(place, cleanContent);

    if (!content) {
      console.log(`        ❌ Could not generate content`);
      failed++;
      continue;
    }

    const wordCount = content.aboutUs.split(/\s+/).length;
    console.log(`        ✍️  Generated ${wordCount} words, ${content.highlights.length} highlights`);

    // Step 4: Save to database
    if (dryRun) {
      console.log(`        🔍 DRY RUN - not saving`);
      console.log(`        Preview: ${content.aboutUs.substring(0, 150)}...`);
      success++;
    } else {
      const updated = await updatePlace(place.id, content, metadata, place.country_code);
      if (updated) {
        success++;
        console.log(`        ✅ Saved!`);
      } else {
        failed++;
      }
    }

    // Rate limiting
    await new Promise((r) => setTimeout(r, 1500)); // Slower due to GPT + Jina
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log("\n" + "═".repeat(70));
  console.log(`✅ Complete! Success: ${success} | Failed: ${failed} | Time: ${elapsed} min`);

  // Show stats
  if (!dryRun) {
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE LENGTH(scraped_content->>'aboutUs') >= 400) as has_400_words,
        COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'jina_gpt_rewrite') as jina_rewrite
      FROM places
    `;
    console.log("\n📈 Database Stats:");
    console.log(`   Total places: ${stats[0].total}`);
    console.log(`   With 400+ word content: ${stats[0].has_400_words}`);
    console.log(`   Jina→GPT rewritten: ${stats[0].jina_rewrite}`);
  }
}

main().catch(console.error);
