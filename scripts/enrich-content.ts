/**
 * AI Content Enrichment Script
 *
 * Uses OpenAI to generate high-quality aboutUs content and descriptions
 * for places that have poor or missing content.
 *
 * Based on the kinderopvang project pattern.
 *
 * Vereist in .env:
 * - OPENAI_API_KEY - je OpenAI API key
 * - DATABASE_URL - je database connection string
 *
 * Gebruik: npx tsx scripts/enrich-content.ts
 */

import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Place {
  id: number;
  name: string;
  address: string | null;
  city_name: string;
  country_name: string;
  country_code: string;
  website: string | null;
  phone: string | null;
  avg_rating: string | null;
  review_count: number | null;
  lat: string | null;
  lng: string | null;
  category_slug: string | null;
  category_name: string | null;
  scraped_content: Record<string, unknown> | null;
}

/**
 * Get language configuration based on country code
 */
function getLocaleConfig(countryCode: string): {
  language: string;
  languageName: string;
  noRating: string;
  noAddress: string;
  noWebsite: string;
} {
  const configs: Record<string, typeof configs.NL> = {
    NL: {
      language: "Dutch",
      languageName: "Nederlands",
      noRating: "Geen rating",
      noAddress: "Niet beschikbaar",
      noWebsite: "Niet beschikbaar",
    },
    BE: {
      language: "Dutch",
      languageName: "Nederlands",
      noRating: "Geen rating",
      noAddress: "Niet beschikbaar",
      noWebsite: "Niet beschikbaar",
    },
    DE: {
      language: "German",
      languageName: "Deutsch",
      noRating: "Keine Bewertung",
      noAddress: "Nicht verfügbar",
      noWebsite: "Nicht verfügbar",
    },
    GB: {
      language: "English",
      languageName: "English",
      noRating: "No rating",
      noAddress: "Not available",
      noWebsite: "Not available",
    },
    US: {
      language: "English",
      languageName: "English",
      noRating: "No rating",
      noAddress: "Not available",
      noWebsite: "Not available",
    },
    CA: {
      language: "English",
      languageName: "English",
      noRating: "No rating",
      noAddress: "Not available",
      noWebsite: "Not available",
    },
    AU: {
      language: "English",
      languageName: "English",
      noRating: "No rating",
      noAddress: "Not available",
      noWebsite: "Not available",
    },
    FR: {
      language: "French",
      languageName: "Français",
      noRating: "Pas de note",
      noAddress: "Non disponible",
      noWebsite: "Non disponible",
    },
    ES: {
      language: "Spanish",
      languageName: "Español",
      noRating: "Sin calificación",
      noAddress: "No disponible",
      noWebsite: "No disponible",
    },
    IT: {
      language: "Italian",
      languageName: "Italiano",
      noRating: "Nessuna valutazione",
      noAddress: "Non disponibile",
      noWebsite: "Non disponibile",
    },
  };

  return configs[countryCode] || configs.GB;
}

interface ContentResult {
  aboutUs: string;
  highlights: string[];
  services: string[];
  targetAudience: string;
}

/**
 * Generate aboutUs content using OpenAI - LOCALE AWARE
 */
async function generateAboutContent(place: Place): Promise<ContentResult | null> {
  const locale = getLocaleConfig(place.country_code);
  const categoryContext = getCategoryContext(place.category_slug, place.country_code);

  const prompt = `You are a professional copywriter for a pet services directory website.
Write an "About Us" text for the following business.

IMPORTANT: Write ALL content in ${locale.language} (${locale.languageName}).

Business Name: ${place.name}
Category: ${place.category_name || place.category_slug || "Pet Service"}
Address: ${place.address || locale.noAddress}
City: ${place.city_name}, ${place.country_name}
Website: ${place.website || locale.noWebsite}
Rating: ${place.avg_rating ? `${place.avg_rating}/5` : locale.noRating}
Reviews: ${place.review_count || 0}

${categoryContext}

Generate a JSON response with ALL text in ${locale.language}:
1. "aboutUs": A professional, informative text of 150-250 words in ${locale.language}. Focus on:
   - What the business does
   - Quality and expertise
   - Location advantages
   - Why customers choose this business

2. "highlights": An array of 3-5 short highlights/USPs (max 10 words each) in ${locale.language}

3. "services": An array of 4-8 services this type of business typically offers in ${locale.language}

4. "targetAudience": A short sentence about the target audience in ${locale.language}

Write in a professional but friendly tone. Avoid exaggeration and don't make false claims.
If little information is available, write general but relevant content for this type of business.

CRITICAL: All output text MUST be in ${locale.language}. Do not use English unless the country is UK/US/CA/AU.

Respond only with valid JSON, no extra text.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert copywriter specialized in pet services. Write in ${locale.language}. Respond only with valid JSON.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error(`   ❌ Geen response van OpenAI`);
      return null;
    }

    const parsed = JSON.parse(content) as ContentResult;
    return parsed;
  } catch (error) {
    console.error(`   ❌ OpenAI error:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get category-specific context for better content generation - LOCALE AWARE
 */
function getCategoryContext(category: string | null, countryCode: string): string {
  // Category descriptions in English (GPT will translate to target language)
  const categories: Record<string, string> = {
    "veterinary": "veterinary clinic/animal hospital",
    "vet": "veterinary clinic",
    "grooming": "pet grooming salon",
    "pet-grooming": "pet grooming salon",
    "pet-store": "pet store/shop",
    "pet-shops": "pet store",
    "pet-hotel": "pet hotel/boarding facility",
    "pet-boarding": "pet boarding facility",
    "dog-training": "dog training school",
    "pet-training": "pet training center",
    "dog-walking": "dog walking service",
    "pet-sitting": "pet sitting service",
    "pet-daycare": "pet daycare center",
    "shelter": "animal shelter",
    "emergency-vet": "emergency veterinary clinic",
    "exotic-vet": "exotic animal veterinarian",
    "cat-grooming": "cat grooming salon",
    "dog-park": "dog park",
  };

  const categoryName = categories[category || ""] || "pet-related business";

  return `This is a ${categoryName}. Focus on aspects relevant to this type of business such as:
- Quality of service and expertise
- Customer care and satisfaction
- Location benefits
- Professional approach`;
}

/**
 * Update place with AI-generated content
 */
async function updatePlaceWithContent(
  placeId: number,
  placeName: string,
  content: ContentResult,
  countryCode: string
): Promise<boolean> {
  const locale = getLocaleConfig(countryCode);
  try {
    const scrapedContent = {
      aboutUs: content.aboutUs,
      highlights: content.highlights,
      services: content.services,
      targetAudience: content.targetAudience,
      contentSource: "openai_generated",
      contentLanguage: locale.language.toLowerCase(),
      contentGeneratedAt: new Date().toISOString(),
    };

    await sql`
      UPDATE places
      SET
        scraped_content = COALESCE(scraped_content, '{}'::jsonb) || ${JSON.stringify(scrapedContent)}::jsonb,
        updated_at = NOW()
      WHERE id = ${placeId}
    `;

    return true;
  } catch (error) {
    console.error(`   ❌ DB error voor ${placeName}:`, error);
    return false;
  }
}

/**
 * Check if content needs enrichment
 */
function needsContentEnrichment(place: Place): boolean {
  const content = place.scraped_content;

  // No content at all
  if (!content) return true;

  // No aboutUs or very short
  const aboutUs = content.aboutUs as string | undefined;
  if (!aboutUs || aboutUs.length < 100) return true;

  // aboutUs looks like HTML/markdown garbage
  if (aboutUs && /^(\[|\#|\*|<|!)/.test(aboutUs.trim())) return true;

  // Already has AI-generated content
  if (content.contentSource === "openai_generated") return false;

  // Has good content already
  if (aboutUs && aboutUs.length >= 200) return false;

  return true;
}

/**
 * Main function
 */
async function main() {
  console.log("🤖 AI Content Enrichment via OpenAI\n");
  console.log("━".repeat(60));

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in .env");
    process.exit(1);
  }

  console.log(`✅ OpenAI API Key: ${process.env.OPENAI_API_KEY.slice(0, 15)}...`);
  console.log(`✅ Model: ${process.env.AI_MODEL || "gpt-4o-mini"}`);
  console.log("");

  // Parse command line arguments
  const args = process.argv.slice(2);
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 20;
  const dryRun = args.includes("--dry-run");

  if (dryRun) {
    console.log("🔍 DRY RUN - geen wijzigingen worden opgeslagen\n");
  }

  // Get places that need content enrichment
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      p.website,
      p.phone,
      p.lat,
      p.lng,
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
    ORDER BY p.id
    LIMIT ${limit * 2}
  ` as Place[];

  // Filter places that need enrichment
  const placesToEnrich = places.filter(needsContentEnrichment).slice(0, limit);

  console.log(`📊 ${placesToEnrich.length} places need content enrichment (of ${places.length} checked)\n`);

  if (placesToEnrich.length === 0) {
    console.log("✅ All places already have good content!");
    return;
  }

  let enriched = 0;
  let failed = 0;

  for (const place of placesToEnrich) {
    const locale = getLocaleConfig(place.country_code);
    console.log(`\n🏢 ${place.name}`);
    console.log(`   📍 ${place.city_name}, ${place.country_name} (${locale.languageName})`);
    console.log(`   📁 ${place.category_name || place.category_slug || "Unknown"}`);

    const content = await generateAboutContent(place);

    if (content) {
      if (dryRun) {
        console.log(`   📝 Generated aboutUs (${content.aboutUs.length} chars)`);
        console.log(`   🎯 Highlights: ${content.highlights.join(", ")}`);
        enriched++;
      } else {
        const updated = await updatePlaceWithContent(place.id, place.name, content, place.country_code);
        if (updated) {
          enriched++;
          console.log(`   ✅ Content saved (${content.aboutUs.length} chars)`);
          console.log(`   🎯 ${content.highlights.length} highlights, ${content.services.length} services`);
        } else {
          failed++;
        }
      }
    } else {
      failed++;
      console.log(`   ❌ Could not generate content`);
    }

    // Rate limiting - OpenAI has rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("\n" + "━".repeat(60));
  console.log("📊 Enrichment Complete!\n");
  console.log(`   Total processed: ${placesToEnrich.length}`);
  console.log(`   Successfully enriched: ${enriched}`);
  console.log(`   Failed: ${failed}`);

  if (!dryRun) {
    // Show final stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE scraped_content IS NOT NULL) as with_content,
        COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'openai_generated') as ai_generated,
        COUNT(*) FILTER (WHERE length(scraped_content->>'aboutUs') > 100) as good_about
      FROM places
    `;

    console.log("\n📈 Database Stats:");
    console.log(stats[0]);
  }
}

main().catch(console.error);
