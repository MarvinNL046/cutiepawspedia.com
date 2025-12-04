/**
 * Pre-generate AI Content Script
 *
 * Generates all AI content BEFORE going live, so you don't pay for API calls
 * when real visitors access the site.
 *
 * Usage:
 *   npx tsx scripts/pregenerate-ai-content.ts
 *
 * Options:
 *   --locale=nl|en|de   Only generate for specific locale (default: nl)
 *   --type=TYPE         Only generate specific type (country|city|place|category|combo|best|top)
 *   --dry-run           Show what would be generated without calling API
 *   --limit=N           Limit number of items to generate (for testing)
 *   --skip-existing     Skip items that already have cached content
 *
 * Examples:
 *   npx tsx scripts/pregenerate-ai-content.ts                     # Generate all content for Dutch
 *   npx tsx scripts/pregenerate-ai-content.ts --dry-run           # Preview what will be generated
 *   npx tsx scripts/pregenerate-ai-content.ts --type=place        # Only generate place content
 *   npx tsx scripts/pregenerate-ai-content.ts --limit=10          # Test with first 10 items
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { config } from "dotenv";
import OpenAI from "openai";

config();

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name: string): string | undefined => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg?.split("=")[1];
};
const hasFlag = (name: string): boolean => args.includes(`--${name}`);

const LOCALE = (getArg("locale") || "nl") as "nl" | "en" | "de";
const TYPE_FILTER = getArg("type") as string | undefined;
const DRY_RUN = hasFlag("dry-run");
const LIMIT = getArg("limit") ? parseInt(getArg("limit")!) : undefined;
const SKIP_EXISTING = hasFlag("skip-existing");

// AI Configuration
const AI_VERSION = "v1";
const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";
const AI_MAX_TOKENS = 1500;
const AI_TEMPERATURE = 0.7;

// Cost tracking
const COST_PER_1K_INPUT = 0.00015; // gpt-4o-mini input
const COST_PER_1K_OUTPUT = 0.0006; // gpt-4o-mini output

// Database connection
const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL as string);

// OpenAI client (only create if not dry run)
let openai: OpenAI | null = null;
if (!DRY_RUN) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-xxxxx")) {
    console.error("❌ Error: Valid OPENAI_API_KEY not found in .env");
    console.error("   Please add your OpenAI API key to .env file");
    process.exit(1);
  }
  openai = new OpenAI({ apiKey });
}

// Stats tracking
const stats = {
  total: 0,
  generated: 0,
  skipped: 0,
  errors: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  estimatedCost: 0,
};

// =============================================================================
// CONTENT TYPE DEFINITIONS
// =============================================================================

interface ContentItem {
  type: "country" | "city" | "place" | "category" | "combo" | "best" | "top";
  cacheKey: string;
  prompt: string;
  data: Record<string, unknown>;
}

// =============================================================================
// DATABASE QUERIES
// =============================================================================

async function getCountries(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      co.id, co.name, co.slug,
      COUNT(DISTINCT c.id) as total_cities,
      COUNT(DISTINCT p.id) as total_places
    FROM countries co
    LEFT JOIN cities c ON c.country_id = co.id
    LEFT JOIN places p ON p.city_id = c.id
    GROUP BY co.id, co.name, co.slug
  `;

  return rows.map((row: any) => ({
    type: "country" as const,
    cacheKey: `country:${row.slug}:${LOCALE}`,
    data: {
      countryName: row.name,
      countrySlug: row.slug,
      totalCities: parseInt(row.total_cities),
      totalPlaces: parseInt(row.total_places),
    },
    prompt: buildPrompt("country", {
      countryName: row.name,
      totalCities: parseInt(row.total_cities),
      totalPlaces: parseInt(row.total_places),
    }),
  }));
}

async function getCities(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      c.id, c.name, c.slug,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_places
    FROM cities c
    JOIN countries co ON c.country_id = co.id
    LEFT JOIN places p ON p.city_id = c.id
    GROUP BY c.id, c.name, c.slug, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) > 0
  `;

  return rows.map((row: any) => ({
    type: "city" as const,
    cacheKey: `city:${row.slug}:${row.country_slug}:${LOCALE}`,
    data: {
      cityName: row.name,
      citySlug: row.slug,
      countryName: row.country_name,
      countrySlug: row.country_slug,
      totalPlaces: parseInt(row.total_places),
    },
    prompt: buildPrompt("city", {
      cityName: row.name,
      countryName: row.country_name,
      totalPlaces: parseInt(row.total_places),
    }),
  }));
}

async function getPlaces(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      p.id, p.name, p.slug, p.description, p.avg_rating, p.review_count, p.address,
      p.scraped_content,
      c.name as city_name, c.slug as city_slug,
      co.name as country_name, co.slug as country_slug,
      ARRAY_AGG(DISTINCT cat.slug) FILTER (WHERE cat.slug IS NOT NULL) as categories
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    LEFT JOIN place_categories pc ON pc.place_id = p.id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    GROUP BY p.id, p.name, p.slug, p.description, p.avg_rating, p.review_count, p.address,
             p.scraped_content, c.name, c.slug, co.name, co.slug
  `;

  return rows.map((row: any) => {
    // Parse scraped content for about-us information
    const scrapedContent = row.scraped_content as {
      aboutUs?: string;
      googleRating?: number;
      facts?: {
        foundedYear?: number;
        specializations?: string[];
        awards?: string[];
      };
    } | null;

    return {
      type: "place" as const,
      cacheKey: `place:${row.slug}:${row.city_slug}:${row.country_slug}:${LOCALE}`,
      data: {
        placeName: row.name,
        placeSlug: row.slug,
        cityName: row.city_name,
        citySlug: row.city_slug,
        countryName: row.country_name,
        countrySlug: row.country_slug,
        categories: row.categories || [],
        description: row.description,
        rating: row.avg_rating ? parseFloat(row.avg_rating) : undefined,
        reviewCount: row.review_count ? parseInt(row.review_count) : undefined,
        address: row.address,
        aboutUs: scrapedContent?.aboutUs,
        aboutUsFacts: scrapedContent?.facts,
      },
      prompt: buildPrompt("place", {
        placeName: row.name,
        cityName: row.city_name,
        countryName: row.country_name,
        categories: row.categories || [],
        rating: row.avg_rating,
        description: row.description,
        aboutUs: scrapedContent?.aboutUs,
        aboutUsFacts: scrapedContent?.facts,
      }),
    };
  });
}

async function getCategories(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      cat.id, cat.slug, cat.label_key,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_places,
      COUNT(DISTINCT c.id) as total_cities
    FROM categories cat
    CROSS JOIN countries co
    LEFT JOIN place_categories pc ON pc.category_id = cat.id
    LEFT JOIN places p ON pc.place_id = p.id
    LEFT JOIN cities c ON p.city_id = c.id AND c.country_id = co.id
    GROUP BY cat.id, cat.slug, cat.label_key, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) > 0
  `;

  return rows.map((row: any) => ({
    type: "category" as const,
    cacheKey: `category:${row.slug}:${row.country_slug}:${LOCALE}`,
    data: {
      categoryName: getCategoryName(row.slug, LOCALE),
      categorySlug: row.slug,
      countryName: row.country_name,
      countrySlug: row.country_slug,
      totalPlaces: parseInt(row.total_places),
      totalCities: parseInt(row.total_cities),
    },
    prompt: buildPrompt("category", {
      categoryName: getCategoryName(row.slug, LOCALE),
      countryName: row.country_name,
      totalPlaces: parseInt(row.total_places),
      totalCities: parseInt(row.total_cities),
    }),
  }));
}

async function getCombos(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      cat.slug as category_slug,
      c.name as city_name, c.slug as city_slug,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_places,
      AVG(p.avg_rating) FILTER (WHERE p.avg_rating IS NOT NULL) as avg_rating
    FROM categories cat
    JOIN place_categories pc ON pc.category_id = cat.id
    JOIN places p ON pc.place_id = p.id
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    GROUP BY cat.slug, c.name, c.slug, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) > 0
  `;

  return rows.map((row: any) => ({
    type: "combo" as const,
    cacheKey: `combo:${row.category_slug}:${row.city_slug}:${row.country_slug}:${LOCALE}`,
    data: {
      categoryName: getCategoryName(row.category_slug, LOCALE),
      categorySlug: row.category_slug,
      cityName: row.city_name,
      citySlug: row.city_slug,
      countryName: row.country_name,
      countrySlug: row.country_slug,
      totalPlaces: parseInt(row.total_places),
      avgRating: row.avg_rating ? parseFloat(row.avg_rating) : undefined,
    },
    prompt: buildPrompt("combo", {
      categoryName: getCategoryName(row.category_slug, LOCALE),
      cityName: row.city_name,
      countryName: row.country_name,
      totalPlaces: parseInt(row.total_places),
      avgRating: row.avg_rating,
    }),
  }));
}

async function getBestPages(): Promise<ContentItem[]> {
  // Best pages for each category in each city + country level
  const items: ContentItem[] = [];

  // City-level best pages
  const cityRows = await sql`
    SELECT
      cat.slug as category_slug,
      c.name as city_name, c.slug as city_slug,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_ranked
    FROM categories cat
    JOIN place_categories pc ON pc.category_id = cat.id
    JOIN places p ON pc.place_id = p.id
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.avg_rating IS NOT NULL AND p.avg_rating >= 3.5
    GROUP BY cat.slug, c.name, c.slug, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) >= 3
  `;

  for (const row of cityRows) {
    items.push({
      type: "best" as const,
      cacheKey: `best:${row.category_slug}:${row.city_slug}:${row.country_slug}:${LOCALE}`,
      data: {
        categoryName: getCategoryName(row.category_slug, LOCALE),
        categorySlug: row.category_slug,
        cityName: row.city_name,
        citySlug: row.city_slug,
        countryName: row.country_name,
        countrySlug: row.country_slug,
        totalRanked: parseInt(row.total_ranked),
      },
      prompt: buildPrompt("best", {
        categoryName: getCategoryName(row.category_slug, LOCALE),
        cityName: row.city_name,
        countryName: row.country_name,
        totalRanked: parseInt(row.total_ranked),
      }),
    });
  }

  // Country-level best pages
  const countryRows = await sql`
    SELECT
      cat.slug as category_slug,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_ranked
    FROM categories cat
    JOIN place_categories pc ON pc.category_id = cat.id
    JOIN places p ON pc.place_id = p.id
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.avg_rating IS NOT NULL AND p.avg_rating >= 3.5
    GROUP BY cat.slug, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) >= 3
  `;

  for (const row of countryRows) {
    items.push({
      type: "best" as const,
      cacheKey: `best:${row.category_slug}:${row.country_slug}:${LOCALE}`,
      data: {
        categoryName: getCategoryName(row.category_slug, LOCALE),
        categorySlug: row.category_slug,
        countryName: row.country_name,
        countrySlug: row.country_slug,
        totalRanked: parseInt(row.total_ranked),
      },
      prompt: buildPrompt("best", {
        categoryName: getCategoryName(row.category_slug, LOCALE),
        countryName: row.country_name,
        totalRanked: parseInt(row.total_ranked),
      }),
    });
  }

  return items;
}

async function getTopPages(): Promise<ContentItem[]> {
  const rows = await sql`
    SELECT
      cat.slug as category_slug,
      co.name as country_name, co.slug as country_slug,
      COUNT(DISTINCT p.id) as total_count
    FROM categories cat
    JOIN place_categories pc ON pc.category_id = cat.id
    JOIN places p ON pc.place_id = p.id
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.avg_rating IS NOT NULL
    GROUP BY cat.slug, co.name, co.slug
    HAVING COUNT(DISTINCT p.id) >= 10
  `;

  return rows.map((row: any) => ({
    type: "top" as const,
    cacheKey: `top:${row.category_slug}:${row.country_slug}:${LOCALE}`,
    data: {
      categoryName: getCategoryName(row.category_slug, LOCALE),
      categorySlug: row.category_slug,
      countryName: row.country_name,
      countrySlug: row.country_slug,
      topCount: Math.min(10, parseInt(row.total_count)),
      year: new Date().getFullYear(),
    },
    prompt: buildPrompt("top", {
      categoryName: getCategoryName(row.category_slug, LOCALE),
      countryName: row.country_name,
      topCount: Math.min(10, parseInt(row.total_count)),
      year: new Date().getFullYear(),
    }),
  }));
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getCategoryName(slug: string, locale: string): string {
  const names: Record<string, Record<string, string>> = {
    veterinary: { nl: "Dierenarts", en: "Veterinarian", de: "Tierarzt" },
    "pet-store": { nl: "Dierenwinkel", en: "Pet Store", de: "Tierhandlung" },
    "pet-groomer": { nl: "Trimsalon", en: "Pet Groomer", de: "Tierpflege" },
    "dog-training": { nl: "Hondentraining", en: "Dog Training", de: "Hundetraining" },
    "pet-boarding": { nl: "Dierenpension", en: "Pet Boarding", de: "Tierpension" },
    "pet-sitting": { nl: "Huisdierverzorging", en: "Pet Sitting", de: "Tierbetreuung" },
    "dog-walking": { nl: "Hondenuitlaatservice", en: "Dog Walking", de: "Gassi-Service" },
    "pet-shelter": { nl: "Dierenasiel", en: "Pet Shelter", de: "Tierheim" },
    "pet-adoption": { nl: "Dierenasiel", en: "Pet Adoption", de: "Tieradoption" },
    "animal-hospital": { nl: "Dierenziekenhuis", en: "Animal Hospital", de: "Tierklinik" },
  };

  return names[slug]?.[locale] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getSystemPrompt(): string {
  const localeInstructions = {
    nl: "Schrijf in het Nederlands. Gebruik een vriendelijke, professionele toon geschikt voor huisdiereigenaren.",
    en: "Write in English. Use a friendly, professional tone suitable for pet owners.",
    de: "Schreiben Sie auf Deutsch. Verwenden Sie einen freundlichen, professionellen Ton, der für Tierbesitzer geeignet ist.",
  };

  return `You are an SEO content writer for CutiePawsPedia, a directory of pet services (veterinarians, groomers, pet stores, etc.).

${localeInstructions[LOCALE]}

Always respond with valid JSON matching this structure:
{
  "intro": "Main introduction paragraph (2-4 sentences)",
  "metaDescription": "SEO meta description (max 155 characters)",
  "h1": "H1 heading suggestion",
  "secondary": "Optional second paragraph",
  "sections": [
    { "heading": "Section heading", "content": "Section content" }
  ],
  "faqs": [
    { "question": "FAQ question", "answer": "FAQ answer (2-3 sentences)" }
  ],
  "cta": "Call-to-action text",
  "bullets": ["Key point 1", "Key point 2"]
}

Guidelines:
- Keep intro engaging but informative
- Meta description must be under 155 characters
- Include 2-3 FAQs relevant to the topic
- Content should be unique and avoid generic phrases
- Focus on local relevance and pet-specific information
- Do NOT use markdown formatting in the JSON values`;
}

function buildPrompt(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case "country":
      return `Generate SEO content for a country page about pet services in ${data.countryName}.

Context:
- Country: ${data.countryName}
- Total cities covered: ${data.totalCities}
- Total pet service listings: ${data.totalPlaces}

Write content that helps pet owners discover pet services across ${data.countryName}.`;

    case "city":
      return `Generate SEO content for a city page about pet services in ${data.cityName}, ${data.countryName}.

Context:
- City: ${data.cityName}
- Country: ${data.countryName}
- Total pet service listings: ${data.totalPlaces}

Write content that helps pet owners find local pet services in ${data.cityName}.`;

    case "place":
      // Build about-us context if available from scraped content
      let aboutUsContext = "";
      if (data.aboutUs) {
        aboutUsContext = `\n\nAbout this business (from their website):
${(data.aboutUs as string).slice(0, 1500)}`;

        if (data.aboutUsFacts) {
          const facts = data.aboutUsFacts as {
            foundedYear?: number;
            specializations?: string[];
            awards?: string[];
          };
          if (facts.foundedYear) {
            aboutUsContext += `\n- Founded: ${facts.foundedYear}`;
          }
          if (facts.specializations?.length) {
            aboutUsContext += `\n- Specializations: ${facts.specializations.join(", ")}`;
          }
          if (facts.awards?.length) {
            aboutUsContext += `\n- Awards/Recognition: ${facts.awards.join(", ")}`;
          }
        }
      }

      return `Generate SEO content for a business listing page: ${data.placeName} in ${data.cityName}, ${data.countryName}.

Context:
- Business name: ${data.placeName}
- Location: ${data.cityName}, ${data.countryName}
- Categories: ${(data.categories as string[]).join(", ")}
${data.rating ? `- Rating: ${data.rating}/5` : ""}
${data.description ? `- Description: ${data.description}` : ""}${aboutUsContext}

${data.aboutUs ? "Use the about-us information to write personalized, unique content that highlights what makes this business special. Include specific details from their website where relevant." : "Write content that helps pet owners learn about this business."}`;

    case "category":
      return `Generate SEO content for a category page about ${data.categoryName} in ${data.countryName}.

Context:
- Category: ${data.categoryName}
- Country: ${data.countryName}
- Total listings: ${data.totalPlaces}
- Cities covered: ${data.totalCities}

Write content about finding the best ${(data.categoryName as string).toLowerCase()} across ${data.countryName}.`;

    case "combo":
      return `Generate SEO content for a category page: ${data.categoryName} in ${data.cityName}, ${data.countryName}.

Context:
- Category: ${data.categoryName}
- City: ${data.cityName}
- Country: ${data.countryName}
- Total listings: ${data.totalPlaces}
${data.avgRating ? `- Average rating: ${data.avgRating}/5` : ""}

Write content helping pet owners find the best ${(data.categoryName as string).toLowerCase()} in ${data.cityName}.`;

    case "best":
      const bestLocation = data.cityName
        ? `${data.cityName}, ${data.countryName}`
        : data.countryName;
      return `Generate SEO content for a "Best ${data.categoryName}" ranking page in ${bestLocation}.

Context:
- Category: ${data.categoryName}
- Location: ${bestLocation}
- Total ranked: ${data.totalRanked}

Write content that explains why these are the best ${(data.categoryName as string).toLowerCase()} and what makes them stand out.`;

    case "top":
      return `Generate SEO content for a "Top ${data.topCount} ${data.categoryName}" page in ${data.countryName}.

Context:
- Category: ${data.categoryName}
- Country: ${data.countryName}
- Number in list: Top ${data.topCount}
- Year: ${data.year}

Write content about the top ${data.topCount} ${(data.categoryName as string).toLowerCase()} in ${data.countryName}.`;

    default:
      return `Generate general SEO content for a pet services page.`;
  }
}

// =============================================================================
// CONTENT GENERATION
// =============================================================================

async function checkExistingContent(cacheKey: string): Promise<boolean> {
  const result = await sql`
    SELECT 1 FROM ai_content_cache WHERE key = ${cacheKey} LIMIT 1
  `;
  return result.length > 0;
}

async function generateAndSaveContent(item: ContentItem): Promise<boolean> {
  if (!openai) return false;

  try {
    const startTime = Date.now();

    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: "system", content: getSystemPrompt() },
        { role: "user", content: item.prompt },
      ],
      temperature: AI_TEMPERATURE,
      max_tokens: AI_MAX_TOKENS,
      response_format: { type: "json_object" },
    });

    const generationTimeMs = Date.now() - startTime;
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(content);
    const promptTokens = response.usage?.prompt_tokens || 0;
    const completionTokens = response.usage?.completion_tokens || 0;

    // Track stats
    stats.totalInputTokens += promptTokens;
    stats.totalOutputTokens += completionTokens;
    stats.estimatedCost +=
      (promptTokens / 1000) * COST_PER_1K_INPUT +
      (completionTokens / 1000) * COST_PER_1K_OUTPUT;

    // Save to database
    const now = new Date().toISOString();
    await sql`
      INSERT INTO ai_content_cache (
        key, content_type, content, model, locale, version,
        prompt_tokens, completion_tokens, generation_time_ms,
        generated_at, is_stale, error_count, created_at, updated_at
      ) VALUES (
        ${item.cacheKey}, ${item.type}, ${JSON.stringify(parsed)}::jsonb, ${AI_MODEL}, ${LOCALE}, ${AI_VERSION},
        ${promptTokens}, ${completionTokens}, ${generationTimeMs},
        ${now}, false, 0, ${now}, ${now}
      )
      ON CONFLICT (key) DO UPDATE SET
        content = ${JSON.stringify(parsed)}::jsonb,
        model = ${AI_MODEL},
        version = ${AI_VERSION},
        prompt_tokens = ${promptTokens},
        completion_tokens = ${completionTokens},
        generation_time_ms = ${generationTimeMs},
        generated_at = ${now},
        is_stale = false,
        error_count = 0,
        updated_at = ${now}
    `;

    return true;
  } catch (error) {
    console.error(`    ❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return false;
  }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log("🚀 CutiePawsPedia AI Content Pre-Generator\n");
  console.log(`📋 Configuration:`);
  console.log(`   Locale: ${LOCALE}`);
  console.log(`   Model: ${AI_MODEL}`);
  console.log(`   Dry run: ${DRY_RUN}`);
  console.log(`   Skip existing: ${SKIP_EXISTING}`);
  if (TYPE_FILTER) console.log(`   Type filter: ${TYPE_FILTER}`);
  if (LIMIT) console.log(`   Limit: ${LIMIT}`);
  console.log("");

  // Collect all items to generate
  const allItems: ContentItem[] = [];

  const types = TYPE_FILTER
    ? [TYPE_FILTER]
    : ["country", "city", "place", "category", "combo", "best", "top"];

  for (const type of types) {
    console.log(`📊 Fetching ${type} items...`);

    let items: ContentItem[] = [];
    switch (type) {
      case "country":
        items = await getCountries();
        break;
      case "city":
        items = await getCities();
        break;
      case "place":
        items = await getPlaces();
        break;
      case "category":
        items = await getCategories();
        break;
      case "combo":
        items = await getCombos();
        break;
      case "best":
        items = await getBestPages();
        break;
      case "top":
        items = await getTopPages();
        break;
    }

    console.log(`   Found ${items.length} ${type} items`);
    allItems.push(...items);
  }

  // Apply limit if specified
  let itemsToProcess = LIMIT ? allItems.slice(0, LIMIT) : allItems;
  stats.total = itemsToProcess.length;

  console.log(`\n📈 Total items to process: ${stats.total}`);

  if (DRY_RUN) {
    console.log("\n🔍 DRY RUN - Showing what would be generated:\n");

    // Group by type for display
    const byType: Record<string, number> = {};
    for (const item of itemsToProcess) {
      byType[item.type] = (byType[item.type] || 0) + 1;
    }

    for (const [type, count] of Object.entries(byType)) {
      console.log(`   ${type}: ${count} items`);
    }

    // Estimate cost
    const avgTokensPerItem = 800; // rough estimate
    const estimatedInputTokens = stats.total * 300;
    const estimatedOutputTokens = stats.total * 500;
    const estimatedCost =
      (estimatedInputTokens / 1000) * COST_PER_1K_INPUT +
      (estimatedOutputTokens / 1000) * COST_PER_1K_OUTPUT;

    console.log(`\n💰 Estimated cost: $${estimatedCost.toFixed(2)}`);
    console.log(`   (~${(estimatedInputTokens + estimatedOutputTokens).toLocaleString()} tokens total)`);
    console.log("\n✅ Dry run complete. Run without --dry-run to generate content.");
    return;
  }

  // Process items
  console.log("\n🔄 Generating content...\n");

  for (let i = 0; i < itemsToProcess.length; i++) {
    const item = itemsToProcess[i];
    const progress = `[${i + 1}/${stats.total}]`;

    // Check if already exists
    if (SKIP_EXISTING) {
      const exists = await checkExistingContent(item.cacheKey);
      if (exists) {
        stats.skipped++;
        process.stdout.write(`${progress} ⏭️  ${item.type}: ${item.cacheKey} (exists)\r`);
        continue;
      }
    }

    process.stdout.write(`${progress} 🔄 ${item.type}: ${item.cacheKey}...`);

    const success = await generateAndSaveContent(item);
    if (success) {
      stats.generated++;
      console.log(`\r${progress} ✅ ${item.type}: ${item.cacheKey}                    `);
    } else {
      stats.errors++;
      console.log(`\r${progress} ❌ ${item.type}: ${item.cacheKey} (failed)           `);
    }

    // Rate limiting - 1 second delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 GENERATION COMPLETE\n");
  console.log(`   Total items: ${stats.total}`);
  console.log(`   Generated: ${stats.generated}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Errors: ${stats.errors}`);
  console.log("");
  console.log(`   Total tokens used: ${(stats.totalInputTokens + stats.totalOutputTokens).toLocaleString()}`);
  console.log(`   Input tokens: ${stats.totalInputTokens.toLocaleString()}`);
  console.log(`   Output tokens: ${stats.totalOutputTokens.toLocaleString()}`);
  console.log(`   Estimated cost: $${stats.estimatedCost.toFixed(2)}`);
  console.log("=".repeat(60));
}

main().catch(console.error);
