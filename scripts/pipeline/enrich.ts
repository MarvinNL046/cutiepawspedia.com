#!/usr/bin/env npx tsx
/**
 * Universal Content Enrichment Script
 *
 * Enriches places with AI-generated content for ANY country.
 * Features:
 * - Automatic resume from where it stopped (tracks last processed ID)
 * - Error recovery with retry logic
 * - Progress tracking to disk
 * - Validation of enriched content
 * - Batch processing with configurable size
 *
 * Usage:
 *   npx tsx scripts/pipeline/enrich.ts --country=BE
 *   npx tsx scripts/pipeline/enrich.ts --country=NL --batch-size=100
 *   npx tsx scripts/pipeline/enrich.ts --country=BE --resume
 *   npx tsx scripts/pipeline/enrich.ts --validate --country=BE  # Validate enrichment
 *   npx tsx scripts/pipeline/enrich.ts --status  # Show all progress
 */

import "dotenv/config";
import { parseArgs } from "util";
import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import { COUNTRIES, CATEGORIES, RATE_LIMITS, BATCH_SIZES, type CountryConfig } from "./config";
import {
  loadProgress,
  saveProgress,
  createEnrichmentProgress,
  clearProgress,
  listActiveProgress,
  formatProgress,
  type EnrichmentProgress,
} from "./progress";

const sql = neon(process.env.DATABASE_URL as string);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CLI Arguments
const { values: args } = parseArgs({
  options: {
    country: { type: "string", short: "c" },
    "batch-size": { type: "string", short: "b" },
    resume: { type: "boolean", short: "r" },
    validate: { type: "boolean" },
    status: { type: "boolean", short: "s" },
    "max-batches": { type: "string", short: "m" },
    verbose: { type: "boolean", short: "v" },
    help: { type: "boolean", short: "h" },
  },
});

if (args.help) {
  console.log(`
Universal Content Enrichment Script

Enriches places with AI-generated content for any configured country.
Automatically tracks progress and can resume from interruptions.

Usage:
  npx tsx scripts/pipeline/enrich.ts --country=<code>
  npx tsx scripts/pipeline/enrich.ts --status

Options:
  -c, --country <code>     Country code (BE, NL, DE, FR, UK)
  -b, --batch-size <n>     Places per batch (default: ${BATCH_SIZES.enrichment})
  -r, --resume             Resume from last progress (auto-detected)
  -m, --max-batches <n>    Max batches to process (for testing)
  --validate               Validate enrichment quality
  -s, --status             Show all active progress
  -v, --verbose            Verbose output
  -h, --help               Show this help

Countries: ${Object.keys(COUNTRIES).join(", ")}

Examples:
  npx tsx scripts/pipeline/enrich.ts --country=BE
  npx tsx scripts/pipeline/enrich.ts --country=NL --batch-size=100 --max-batches=5
  npx tsx scripts/pipeline/enrich.ts --validate --country=BE
  npx tsx scripts/pipeline/enrich.ts --status
`);
  process.exit(0);
}

// Show status
if (args.status) {
  const activeProgress = listActiveProgress();

  if (activeProgress.length === 0) {
    console.log("No active progress found.");
  } else {
    console.log("\n📊 Active Pipeline Progress:\n");
    for (const { progress } of activeProgress) {
      console.log(`  ${formatProgress(progress)}`);
    }
    console.log("");
  }
  process.exit(0);
}

const COUNTRY_CODE = args.country?.toUpperCase();
const BATCH_SIZE = args["batch-size"] ? parseInt(args["batch-size"], 10) : BATCH_SIZES.enrichment;
const RESUME = args.resume ?? true; // Auto-resume by default
const VALIDATE = args.validate ?? false;
const MAX_BATCHES = args["max-batches"] ? parseInt(args["max-batches"], 10) : Infinity;
const VERBOSE = args.verbose ?? false;

if (!COUNTRY_CODE) {
  console.error("❌ --country is required");
  process.exit(1);
}

const countryConfig = COUNTRIES[COUNTRY_CODE];
if (!countryConfig) {
  console.error(`❌ Unknown country: ${COUNTRY_CODE}`);
  console.error(`   Available: ${Object.keys(COUNTRIES).join(", ")}`);
  process.exit(1);
}

// Helpers
function log(msg: string) {
  console.log(`[${COUNTRY_CODE}] ${msg}`);
}

function verbose(msg: string) {
  if (VERBOSE) console.log(`  ${msg}`);
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Database types
interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  website: string | null;
  phone: string | null;
  avg_rating: string | null;
  review_count: number | null;
  category_slug: string | null;
  category_name: string | null;
  scraped_content: Record<string, unknown> | null;
}

interface ContentResult {
  aboutUs: string;
  highlights: string[];
  services: string[];
  targetAudience: string;
  metaDescription: string;
}

// Get places needing enrichment
async function getPlacesToEnrich(
  countryCode: string,
  lastProcessedId: number,
  limit: number
): Promise<Place[]> {
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      p.website,
      p.phone,
      p.avg_rating,
      p.review_count,
      p.scraped_content,
      c.name as city_name,
      co.name as country_name,
      cat.slug as category_slug,
      cat.label_key as category_name
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    LEFT JOIN place_categories pc ON p.id = pc.place_id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    WHERE co.code = ${countryCode}
    AND p.id > ${lastProcessedId}
    AND (
      p.scraped_content IS NULL
      OR p.scraped_content::text NOT LIKE '%aboutUs%'
      OR p.scraped_content->>'aboutUs' IS NULL
      OR LENGTH(COALESCE(p.scraped_content->>'aboutUs', '')) < 100
    )
    ORDER BY p.id ASC
    LIMIT ${limit}
  ` as Place[];

  return places;
}

// Count total needing enrichment
async function countPlacesToEnrich(countryCode: string): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = ${countryCode}
    AND (
      p.scraped_content IS NULL
      OR p.scraped_content::text NOT LIKE '%aboutUs%'
      OR p.scraped_content->>'aboutUs' IS NULL
      OR LENGTH(COALESCE(p.scraped_content->>'aboutUs', '')) < 100
    )
  `;
  return parseInt(result[0].count as string, 10);
}

// Get category context for prompts
function getCategoryContext(category: string | null, language: string): string {
  const contexts: Record<string, Record<string, string>> = {
    veterinary: {
      nl: "Dit is een dierenarts. Focus op: medische expertise, spoedzorg, moderne apparatuur, preventieve zorg.",
      fr: "C'est un vétérinaire. Focus: expertise médicale, soins urgents, équipement moderne, soins préventifs.",
      de: "Dies ist ein Tierarzt. Fokus: medizinische Expertise, Notfallversorgung, moderne Ausstattung, Vorsorge.",
      en: "This is a veterinarian. Focus: medical expertise, emergency care, modern equipment, preventive care.",
    },
    grooming: {
      nl: "Dit is een trimsalon. Focus op: trimservices, vachtverzorging, hygiëne, ervaring met rassen.",
      fr: "C'est un salon de toilettage. Focus: services de toilettage, soins du pelage, hygiène, expérience races.",
      de: "Dies ist ein Hundesalon. Fokus: Fellpflege, Styling, Hygiene, Erfahrung mit Rassen.",
      en: "This is a grooming salon. Focus: grooming services, coat care, hygiene, breed experience.",
    },
    "pet-store": {
      nl: "Dit is een dierenwinkel. Focus op: assortiment, voeding, accessoires, klantenservice.",
      fr: "C'est une animalerie. Focus: assortiment, alimentation, accessoires, service client.",
      de: "Dies ist eine Tierhandlung. Fokus: Sortiment, Futter, Zubehör, Kundenservice.",
      en: "This is a pet store. Focus: product range, food, accessories, customer service.",
    },
  };

  const categoryContexts = contexts[category || ""] || {};
  return categoryContexts[language] || categoryContexts.en || "Focus on quality service and customer satisfaction.";
}

// Generate AI content
async function generateContent(
  place: Place,
  language: string,
  retries = 3
): Promise<ContentResult | null> {
  const categoryContext = getCategoryContext(place.category_slug, language);

  // Extract existing data
  const scraped = place.scraped_content || {};
  const existingAbout = (scraped.aboutUs as string) || "";
  const existingServices = (scraped.services as string[]) || [];
  const highlights = (scraped.highlights as string[]) || [];

  let scrapedContext = "";
  if (existingAbout && existingAbout.length > 50) {
    scrapedContext += `\nBestaande beschrijving: "${existingAbout.slice(0, 500)}"\n`;
  }
  if (existingServices.length > 0) {
    scrapedContext += `\nDiensten van website: ${existingServices.slice(0, 8).join(", ")}\n`;
  }
  if (highlights.length > 0) {
    scrapedContext += `\nUSPs: ${highlights.slice(0, 5).join("; ")}\n`;
  }

  const languageInstructions: Record<string, string> = {
    nl: "Schrijf in vloeiend Nederlands.",
    fr: "Écrivez en français courant.",
    de: "Schreiben Sie in fließendem Deutsch.",
    en: "Write in fluent English.",
  };

  const prompt = `Je bent een professionele copywriter voor een huisdieren directory website.
Schrijf uitgebreide, unieke content voor het volgende bedrijf:

=== BEDRIJFSGEGEVENS ===
Bedrijfsnaam: ${place.name}
Categorie: ${place.category_name || place.category_slug || "Huisdierenservice"}
Adres: ${place.address || "Niet beschikbaar"}
Stad: ${place.city_name}, ${place.country_name}
Website: ${place.website || "Niet beschikbaar"}
Rating: ${place.avg_rating ? `${place.avg_rating}/5 sterren` : "Nog geen rating"}
Reviews: ${place.review_count || 0}

=== CONTEXT ===
${categoryContext}
${scrapedContext}

=== OPDRACHT ===
${languageInstructions[language] || languageInstructions.en}

Genereer JSON met:
1. "aboutUs": Professionele tekst van 200-350 woorden over dit bedrijf
2. "highlights": Array van 5-6 korte USPs (max 8 woorden elk)
3. "services": Array van 6-10 specifieke diensten
4. "targetAudience": Een zin over de doelgroep
5. "metaDescription": SEO meta description van 150-160 karakters

BELANGRIJK:
- Maak content UNIEK voor dit specifieke bedrijf
- Vermijd overdrijving en valse claims
- Antwoord ALLEEN met valid JSON`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Je bent een expert copywriter. Antwoord alleen met valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      // Clean up markdown
      const cleanContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const parsed = JSON.parse(cleanContent) as ContentResult;

      // Validate required fields
      if (!parsed.aboutUs || parsed.aboutUs.length < 50) {
        throw new Error("aboutUs too short or missing");
      }
      if (!parsed.highlights || parsed.highlights.length < 3) {
        throw new Error("highlights missing or too few");
      }
      if (!parsed.services || parsed.services.length < 3) {
        throw new Error("services missing or too few");
      }

      return parsed;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);

      if (attempt < retries) {
        verbose(`⚠️ Attempt ${attempt}/${retries} failed: ${errMsg}. Retrying...`);
        await sleep(RATE_LIMITS.openai.delayMs * attempt);
      } else {
        console.error(`   ❌ All ${retries} attempts failed: ${errMsg}`);
        return null;
      }
    }
  }

  return null;
}

// Update place with content
async function updatePlaceContent(
  placeId: number,
  content: ContentResult,
  existingContent: Record<string, unknown> | null
): Promise<boolean> {
  try {
    const mergedContent = {
      ...(existingContent || {}),
      aboutUs: content.aboutUs,
      highlights: content.highlights,
      services: content.services,
      targetAudience: content.targetAudience,
      metaDescription: content.metaDescription,
      contentSource: "openai_pipeline",
      contentGeneratedAt: new Date().toISOString(),
    };

    await sql`
      UPDATE places
      SET
        scraped_content = ${JSON.stringify(mergedContent)}::jsonb,
        description = ${content.aboutUs.slice(0, 500)},
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch (error) {
    console.error(`   ❌ DB error for place ${placeId}:`, error);
    return false;
  }
}

// Validation mode
async function validateEnrichment(countryCode: string): Promise<void> {
  console.log("\n📋 Validating enrichment for", countryCode);

  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN scraped_content IS NOT NULL
                  AND scraped_content::text LIKE '%aboutUs%'
                  AND LENGTH(COALESCE(scraped_content->>'aboutUs', '')) >= 100
             THEN 1 END) as enriched,
      COUNT(CASE WHEN scraped_content IS NOT NULL
                  AND scraped_content::text LIKE '%aboutUs%'
                  AND LENGTH(COALESCE(scraped_content->>'aboutUs', '')) BETWEEN 50 AND 99
             THEN 1 END) as partial,
      COUNT(CASE WHEN scraped_content IS NULL
                  OR scraped_content::text NOT LIKE '%aboutUs%'
             THEN 1 END) as unenriched
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = ${countryCode}
  `;

  const s = stats[0];
  const total = Number(s.total);
  const enriched = Number(s.enriched);
  const partial = Number(s.partial);
  const unenriched = Number(s.unenriched);

  console.log("\n📊 Enrichment Statistics:");
  console.log(`   Total places: ${total}`);
  console.log(`   ✅ Fully enriched: ${enriched} (${Math.round(enriched / total * 100)}%)`);
  console.log(`   ⚠️ Partial: ${partial} (${Math.round(partial / total * 100)}%)`);
  console.log(`   ❌ Not enriched: ${unenriched} (${Math.round(unenriched / total * 100)}%)`);

  // Sample check
  console.log("\n🔍 Sample of enriched content:");
  const samples = await sql`
    SELECT p.name, p.scraped_content->>'aboutUs' as about
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = ${countryCode}
    AND p.scraped_content IS NOT NULL
    AND p.scraped_content::text LIKE '%aboutUs%'
    LIMIT 3
  `;

  for (const sample of samples) {
    console.log(`\n   ${sample.name}:`);
    console.log(`   "${(sample.about as string)?.slice(0, 150)}..."`);
  }
}

// Main function
async function main() {
  console.log("\n" + "=".repeat(60));
  console.log(`🤖 Content Enrichment: ${countryConfig.name}`);
  console.log("=".repeat(60));

  // Check OpenAI key
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in .env");
    process.exit(1);
  }

  log(`✅ OpenAI API Key: ${process.env.OPENAI_API_KEY.slice(0, 15)}...`);
  log(`✅ Model: ${process.env.AI_MODEL || "gpt-4o-mini"}`);

  // Validation mode
  if (VALIDATE) {
    await validateEnrichment(COUNTRY_CODE);
    process.exit(0);
  }

  // Load or create progress
  let progress = loadProgress<EnrichmentProgress>("enrichment", COUNTRY_CODE);

  if (progress && RESUME) {
    log(`📥 Resuming from place ID ${progress.lastProcessedId}`);
    log(`   Progress: ${progress.stats.processed}/${progress.stats.totalToProcess}`);
  } else {
    const totalToProcess = await countPlacesToEnrich(COUNTRY_CODE);

    if (totalToProcess === 0) {
      log("✅ All places are already enriched!");
      process.exit(0);
    }

    progress = createEnrichmentProgress(COUNTRY_CODE, totalToProcess);
    log(`📍 Found ${totalToProcess} places needing enrichment`);
  }

  saveProgress(progress);

  const startTime = Date.now();
  let batchCount = 0;

  // Process batches
  while (batchCount < MAX_BATCHES) {
    const places = await getPlacesToEnrich(COUNTRY_CODE, progress.lastProcessedId, BATCH_SIZE);

    if (places.length === 0) {
      log("✅ No more places to process!");
      break;
    }

    batchCount++;
    console.log(`\n📦 Batch ${batchCount}: Processing ${places.length} places (IDs ${places[0].id} - ${places[places.length - 1].id})`);

    for (let i = 0; i < places.length; i++) {
      const place = places[i];
      const progressStr = `[${progress.stats.processed + 1}/${progress.stats.totalToProcess}]`;

      process.stdout.write(`${progressStr} ${place.name.slice(0, 40).padEnd(40)} `);

      // Generate content
      const content = await generateContent(place, countryConfig.defaultLanguage);

      if (content) {
        const updated = await updatePlaceContent(place.id, content, place.scraped_content);

        if (updated) {
          progress.stats.enriched++;
          console.log(`✅ ${content.aboutUs.length}c`);
        } else {
          progress.stats.failed++;
          console.log(`❌ DB error`);
          progress.errors.push({
            placeId: place.id,
            placeName: place.name,
            error: "Database update failed",
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        progress.stats.failed++;
        console.log(`❌ AI error`);
        progress.errors.push({
          placeId: place.id,
          placeName: place.name,
          error: "AI generation failed",
          timestamp: new Date().toISOString(),
        });
      }

      progress.stats.processed++;
      progress.lastProcessedId = place.id;

      // Save progress every 10 places
      if (progress.stats.processed % 10 === 0) {
        saveProgress(progress);
      }

      // Rate limiting
      if (i > 0 && i % 10 === 0) {
        await sleep(RATE_LIMITS.openai.delayMs);
      }
    }

    // Save after each batch
    saveProgress(progress);

    // Show batch summary
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const rate = (progress.stats.processed / parseFloat(elapsed) * 60).toFixed(1);
    const pct = Math.round((progress.stats.processed / progress.stats.totalToProcess) * 100);

    console.log(`\n📊 Progress: ${progress.stats.processed}/${progress.stats.totalToProcess} (${pct}%)`);
    console.log(`   ✅ Enriched: ${progress.stats.enriched} | ❌ Failed: ${progress.stats.failed}`);
    console.log(`   ⏱️ Time: ${elapsed}s | Rate: ${rate}/min`);

    // Small delay between batches
    await sleep(2000);
  }

  // Final summary
  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log("\n" + "=".repeat(60));
  console.log("📊 ENRICHMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(`   Country: ${countryConfig.name}`);
  console.log(`   Processed: ${progress.stats.processed}/${progress.stats.totalToProcess}`);
  console.log(`   Enriched: ${progress.stats.enriched}`);
  console.log(`   Failed: ${progress.stats.failed}`);
  console.log(`   Time: ${elapsed} minutes`);

  if (progress.errors.length > 0) {
    console.log(`\n⚠️ ${progress.errors.length} errors occurred. Check progress file for details.`);
  }

  // Check if complete
  const remaining = await countPlacesToEnrich(COUNTRY_CODE);
  if (remaining === 0) {
    clearProgress("enrichment", COUNTRY_CODE);
    console.log("\n✅ Enrichment complete! All places processed.");
  } else {
    console.log(`\n📝 ${remaining} places still need enrichment.`);
    console.log(`   Resume with: npx tsx scripts/pipeline/enrich.ts --country=${COUNTRY_CODE}`);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
