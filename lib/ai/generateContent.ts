/**
 * Unified AI Content Generator
 *
 * Central AI content generation function that handles all page types.
 * Uses database caching for persistent storage and cost control.
 *
 * Features:
 * - Single function for all page types
 * - Database caching with version control
 * - Fallback to templates when AI is disabled
 * - Structured JSON output
 * - Multi-locale support
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Force load .env from project root, overriding any shell environment variables
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: true
});

import OpenAI from "openai";
import {
  AI_VERSION,
  AI_MODEL,
  AI_MAX_TOKENS,
  AI_TEMPERATURE,
  AI_ENABLED,
  AI_CACHE_ENABLED,
} from "./version";
import {
  getCachedContent,
  upsertCachedContent,
  markCacheError,
} from "@/db/queries/aiContent";
import type { AiContentStructure, AiContentType } from "@/db/schema/ai";
import {
  generateCountryContent,
  generateCityContent,
  generateCategoryCityContent,
  generateCategoryCountryContent,
  generateBestCategoryContent,
  generateTopCategoryContent,
  generatePlaceContent,
} from "@/lib/seo/contentGenerators";
import type { ContentLocale } from "@/lib/seo/aiContent";

// Re-export for use in other files
export type { ContentLocale };

// ============================================================================
// TYPES
// ============================================================================

/**
 * Input for content generation
 */
export interface GenerateContentInput {
  type: AiContentType;
  locale: ContentLocale;
  data: ContentData;
  force?: boolean; // Force regeneration even if cached
}

/**
 * Content data for different page types
 */
export type ContentData =
  | CountryData
  | CityData
  | CategoryData
  | PlaceData
  | ComboData
  | BestData
  | TopData;

export interface CountryData {
  countryName: string;
  countrySlug: string;
  totalCities: number;
  totalPlaces: number;
  topCategories?: Array<{ slug: string; name: string; count: number }>;
}

export interface CityData {
  cityName: string;
  citySlug: string;
  countryName: string;
  countrySlug: string;
  totalPlaces: number;
  categoryStats?: Array<{ slug: string; name: string; count: number }>;
}

export interface CategoryData {
  categoryName: string;
  categorySlug: string;
  countryName: string;
  countrySlug: string;
  totalPlaces: number;
  totalCities?: number;
}

export interface PlaceData {
  placeName: string;
  placeSlug: string;
  cityName: string;
  citySlug: string;
  countryName: string;
  countrySlug: string;
  categories: string[];
  description?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  /** Scraped about-us content from website for personalized descriptions */
  aboutUs?: string;
  /** Scraped facts from website (founded year, specializations, etc.) */
  aboutUsFacts?: {
    foundedYear?: number;
    specializations?: string[];
    awards?: string[];
  };
}

export interface ComboData {
  categoryName: string;
  categorySlug: string;
  cityName: string;
  citySlug: string;
  countryName: string;
  countrySlug: string;
  totalPlaces: number;
  avgRating?: number;
}

export interface BestData {
  categoryName: string;
  categorySlug: string;
  cityName?: string;
  citySlug?: string;
  countryName: string;
  countrySlug: string;
  totalRanked: number;
  highlightedPlaces?: Array<{
    name: string;
    rating?: number;
    reviewCount?: number;
    cityName?: string;
  }>;
}

export interface TopData {
  categoryName: string;
  categorySlug: string;
  countryName: string;
  countrySlug: string;
  topCount: number;
  highlightedPlaces?: Array<{
    name: string;
    rating?: number;
    reviewCount?: number;
    cityName: string;
  }>;
  year?: number;
}

/**
 * Result of content generation
 */
export interface GenerateContentResult {
  content: AiContentStructure;
  fromCache: boolean;
  isStale: boolean;
  version: string;
}

// ============================================================================
// CACHE KEY GENERATION
// ============================================================================

/**
 * Generate a unique cache key based on content type and data
 */
export function generateCacheKey(type: AiContentType, data: ContentData, locale: string): string {
  switch (type) {
    case "country":
      return `country:${(data as CountryData).countrySlug}:${locale}`;
    case "city":
      const cityData = data as CityData;
      return `city:${cityData.citySlug}:${cityData.countrySlug}:${locale}`;
    case "category":
      const catData = data as CategoryData;
      return `category:${catData.categorySlug}:${catData.countrySlug}:${locale}`;
    case "place":
      const placeData = data as PlaceData;
      return `place:${placeData.placeSlug}:${placeData.citySlug}:${placeData.countrySlug}:${locale}`;
    case "combo":
      const comboData = data as ComboData;
      return `combo:${comboData.categorySlug}:${comboData.citySlug}:${comboData.countrySlug}:${locale}`;
    case "best":
      const bestData = data as BestData;
      if (bestData.citySlug) {
        return `best:${bestData.categorySlug}:${bestData.citySlug}:${bestData.countrySlug}:${locale}`;
      }
      return `best:${bestData.categorySlug}:${bestData.countrySlug}:${locale}`;
    case "top":
      const topData = data as TopData;
      return `top:${topData.categorySlug}:${topData.countrySlug}:${locale}`;
    default:
      return `unknown:${Date.now()}:${locale}`;
  }
}

// ============================================================================
// MAIN CONTENT GENERATOR
// ============================================================================

/**
 * Generate content for a page
 *
 * Flow:
 * 1. Generate cache key
 * 2. Check cache (if not forced)
 * 3. If cached and version matches, return cached
 * 4. If AI disabled, return fallback
 * 5. Generate via LLM
 * 6. Save to cache
 * 7. Return content
 */
export async function generateContent(
  input: GenerateContentInput
): Promise<GenerateContentResult> {
  const { type, locale, data, force = false } = input;

  // Generate cache key
  const cacheKey = generateCacheKey(type, data, locale);

  // 1. Check cache first (unless forced)
  if (AI_CACHE_ENABLED && !force) {
    const cached = await getCachedContent(cacheKey);

    if (cached) {
      const isVersionMatch = cached.version === AI_VERSION;
      const isStale = cached.isStale || !isVersionMatch;

      // Return cached content (even if stale - it's still valid)
      // Stale content will be regenerated by cron
      return {
        content: cached.content,
        fromCache: true,
        isStale,
        version: cached.version,
      };
    }
  }

  // 2. If AI is disabled, use fallback templates
  if (!AI_ENABLED) {
    const fallbackContent = generateFallbackContent(type, data, locale);
    return {
      content: fallbackContent,
      fromCache: false,
      isStale: false,
      version: "fallback",
    };
  }

  // 3. Generate via LLM
  try {
    const startTime = Date.now();
    const result = await generateViaLLM(type, data, locale);
    const generationTimeMs = Date.now() - startTime;

    // 4. Save to cache
    if (AI_CACHE_ENABLED) {
      await upsertCachedContent({
        key: cacheKey,
        contentType: type,
        content: result.content,
        model: AI_MODEL,
        locale,
        version: AI_VERSION,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        generationTimeMs,
      });
    }

    return {
      content: result.content,
      fromCache: false,
      isStale: false,
      version: AI_VERSION,
    };
  } catch (error) {
    console.error(`AI generation failed for ${cacheKey}:`, error);

    // Mark cache error
    if (AI_CACHE_ENABLED) {
      await markCacheError(cacheKey, error instanceof Error ? error.message : "Unknown error");
    }

    // Fall back to template
    const fallbackContent = generateFallbackContent(type, data, locale);
    return {
      content: fallbackContent,
      fromCache: false,
      isStale: false,
      version: "fallback",
    };
  }
}

// ============================================================================
// LLM GENERATION
// ============================================================================

/**
 * Generate content via LLM (OpenAI)
 */
async function generateViaLLM(
  type: AiContentType,
  data: ContentData,
  locale: ContentLocale
): Promise<{
  content: AiContentStructure;
  promptTokens: number;
  completionTokens: number;
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const openai = new OpenAI({ apiKey });

  // Build prompt based on type
  const prompt = buildPrompt(type, data, locale);

  // Call OpenAI
  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [
      {
        role: "system",
        content: getSystemPrompt(locale),
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: AI_TEMPERATURE,
    max_tokens: AI_MAX_TOKENS,
    response_format: { type: "json_object" },
  });

  // Parse response
  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from AI");
  }

  const parsed = JSON.parse(content) as AiContentStructure;

  return {
    content: parsed,
    promptTokens: response.usage?.prompt_tokens || 0,
    completionTokens: response.usage?.completion_tokens || 0,
  };
}

/**
 * Get system prompt for content generation
 */
function getSystemPrompt(locale: ContentLocale): string {
  const localeInstructions = {
    nl: "Schrijf in het Nederlands. Gebruik een vriendelijke, professionele toon geschikt voor huisdiereigenaren.",
    en: "Write in English. Use a friendly, professional tone suitable for pet owners.",
    de: "Schreiben Sie auf Deutsch. Verwenden Sie einen freundlichen, professionellen Ton, der für Tierbesitzer geeignet ist.",
  };

  return `You are an SEO content writer for CutiePawsPedia, a directory of pet services (veterinarians, groomers, pet stores, etc.).

${localeInstructions[locale]}

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

/**
 * Build prompt based on content type
 */
function buildPrompt(type: AiContentType, data: ContentData, locale: ContentLocale): string {
  const localeContext = locale === "nl" ? "Nederland/België" : locale === "de" ? "Deutschland/Österreich/Schweiz" : "Europe";

  switch (type) {
    case "country":
      const countryData = data as CountryData;
      return `Generate SEO content for a country page about pet services in ${countryData.countryName}.

Context:
- Country: ${countryData.countryName}
- Total cities covered: ${countryData.totalCities}
- Total pet service listings: ${countryData.totalPlaces}
${countryData.topCategories?.length ? `- Top categories: ${countryData.topCategories.map(c => c.name).join(", ")}` : ""}

Write content that helps pet owners discover pet services across ${countryData.countryName}.`;

    case "city":
      const cityData = data as CityData;
      return `Generate SEO content for a city page about pet services in ${cityData.cityName}, ${cityData.countryName}.

Context:
- City: ${cityData.cityName}
- Country: ${cityData.countryName}
- Total pet service listings: ${cityData.totalPlaces}
${cityData.categoryStats?.length ? `- Available categories: ${cityData.categoryStats.map(c => c.name).join(", ")}` : ""}

Write content that helps pet owners find local pet services in ${cityData.cityName}.`;

    case "category":
      const catData = data as CategoryData;
      return `Generate SEO content for a category page about ${catData.categoryName} in ${catData.countryName}.

Context:
- Category: ${catData.categoryName}
- Country: ${catData.countryName}
- Total listings: ${catData.totalPlaces}
- Cities covered: ${catData.totalCities || "multiple"}

Write content about finding the best ${catData.categoryName.toLowerCase()} across ${catData.countryName}.`;

    case "place":
      const placeData = data as PlaceData;
      // Build about-us context if available
      let aboutUsContext = "";
      if (placeData.aboutUs) {
        aboutUsContext = `\n\nAbout this business (from their website):
${placeData.aboutUs.slice(0, 1500)}`;

        if (placeData.aboutUsFacts) {
          const facts = placeData.aboutUsFacts;
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

      return `Generate SEO content for a business listing page: ${placeData.placeName} in ${placeData.cityName}, ${placeData.countryName}.

Context:
- Business name: ${placeData.placeName}
- Location: ${placeData.cityName}, ${placeData.countryName}
- Categories: ${placeData.categories.join(", ")}
${placeData.rating ? `- Rating: ${placeData.rating}/5` : ""}
${placeData.reviewCount ? `- Reviews: ${placeData.reviewCount}` : ""}
${placeData.address ? `- Address: ${placeData.address}` : ""}
${placeData.description ? `- Description: ${placeData.description}` : ""}${aboutUsContext}

${placeData.aboutUs ? "Use the about-us information to write personalized, unique content that highlights what makes this business special. Include specific details from their website where relevant." : "Write content that helps pet owners learn about this business and decide if it's right for their needs."}`;

    case "combo":
      const comboData = data as ComboData;
      return `Generate SEO content for a category page: ${comboData.categoryName} in ${comboData.cityName}, ${comboData.countryName}.

Context:
- Category: ${comboData.categoryName}
- City: ${comboData.cityName}
- Country: ${comboData.countryName}
- Total listings: ${comboData.totalPlaces}
${comboData.avgRating ? `- Average rating: ${comboData.avgRating}/5` : ""}

Write content helping pet owners find the best ${comboData.categoryName.toLowerCase()} in ${comboData.cityName}.`;

    case "best":
      const bestData = data as BestData;
      const bestLocation = bestData.cityName
        ? `${bestData.cityName}, ${bestData.countryName}`
        : bestData.countryName;
      return `Generate SEO content for a "Best ${bestData.categoryName}" ranking page in ${bestLocation}.

Context:
- Category: ${bestData.categoryName}
- Location: ${bestLocation}
- Total ranked: ${bestData.totalRanked}
${bestData.highlightedPlaces?.length ? `- Top places: ${bestData.highlightedPlaces.slice(0, 3).map(p => p.name).join(", ")}` : ""}

Write content that explains why these are the best ${bestData.categoryName.toLowerCase()} and what makes them stand out.`;

    case "top":
      const topData = data as TopData;
      return `Generate SEO content for a "Top ${topData.topCount} ${topData.categoryName}" page in ${topData.countryName}.

Context:
- Category: ${topData.categoryName}
- Country: ${topData.countryName}
- Number in list: Top ${topData.topCount}
${topData.year ? `- Year: ${topData.year}` : ""}
${topData.highlightedPlaces?.length ? `- Featured: ${topData.highlightedPlaces.slice(0, 3).map(p => `${p.name} (${p.cityName})`).join(", ")}` : ""}

Write content about the top ${topData.topCount} ${topData.categoryName.toLowerCase()} in ${topData.countryName}, explaining what sets them apart.`;

    default:
      return `Generate general SEO content for a pet services page in ${localeContext}.`;
  }
}

// ============================================================================
// FALLBACK CONTENT
// ============================================================================

/**
 * Generate fallback content using templates (no AI)
 */
function generateFallbackContent(
  type: AiContentType,
  data: ContentData,
  locale: ContentLocale
): AiContentStructure {
  // Use existing template generators from lib/seo/contentGenerators
  let result;

  switch (type) {
    case "country":
      const countryData = data as CountryData;
      result = generateCountryContent({
        locale,
        countryName: countryData.countryName,
        countrySlug: countryData.countrySlug,
        totalCities: countryData.totalCities,
        totalPlaces: countryData.totalPlaces,
        topCategories: countryData.topCategories || [],
      });
      break;

    case "city":
      const cityData = data as CityData;
      result = generateCityContent({
        locale,
        cityName: cityData.cityName,
        countryName: cityData.countryName,
        countrySlug: cityData.countrySlug,
        totalPlaces: cityData.totalPlaces,
        categoryStats: cityData.categoryStats || [],
      });
      break;

    case "category":
      const catData = data as CategoryData;
      result = generateCategoryCountryContent({
        locale,
        countryName: catData.countryName,
        categoryName: catData.categoryName,
        categorySlug: catData.categorySlug,
        totalPlaces: catData.totalPlaces,
        totalCities: catData.totalCities || 0,
      });
      break;

    case "combo":
      const comboData = data as ComboData;
      result = generateCategoryCityContent({
        locale,
        cityName: comboData.cityName,
        countryName: comboData.countryName,
        categoryName: comboData.categoryName,
        categorySlug: comboData.categorySlug,
        totalPlaces: comboData.totalPlaces,
        avgRating: comboData.avgRating,
      });
      break;

    case "best":
      const bestData = data as BestData;
      result = generateBestCategoryContent({
        locale,
        cityName: bestData.cityName,
        countryName: bestData.countryName,
        categoryName: bestData.categoryName,
        categorySlug: bestData.categorySlug,
        totalRanked: bestData.totalRanked,
        highlightedPlaces: bestData.highlightedPlaces || [],
      });
      break;

    case "top":
      const topData = data as TopData;
      result = generateTopCategoryContent({
        locale,
        countryName: topData.countryName,
        categoryName: topData.categoryName,
        categorySlug: topData.categorySlug,
        topCount: topData.topCount,
        highlightedPlaces:
          topData.highlightedPlaces?.map((p) => ({
            name: p.name,
            rating: p.rating,
            reviewCount: p.reviewCount,
            cityName: p.cityName,
          })) || [],
        year: topData.year,
      });
      break;

    case "place":
      const placeData = data as PlaceData;
      result = generatePlaceContent({
        locale,
        placeName: placeData.placeName,
        placeSlug: placeData.placeSlug,
        cityName: placeData.cityName,
        countryName: placeData.countryName,
        categories: placeData.categories,
        rating: placeData.rating,
        reviewCount: placeData.reviewCount,
        description: placeData.description,
        address: placeData.address,
      });
      break;

    default:
      result = {
        intro: "Welcome to CutiePawsPedia",
        metaDescription: "Find pet services near you",
      };
  }

  return {
    intro: result.intro,
    metaDescription: result.metaDescription,
    secondary: result.secondary,
    bullets: result.bullets,
    cta: result.cta,
  };
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Get content for a country page
 */
export async function getCountryPageContent(
  countryName: string,
  countrySlug: string,
  locale: ContentLocale,
  stats: { totalCities: number; totalPlaces: number }
): Promise<AiContentStructure> {
  const result = await generateContent({
    type: "country",
    locale,
    data: {
      countryName,
      countrySlug,
      totalCities: stats.totalCities,
      totalPlaces: stats.totalPlaces,
    },
  });
  return result.content;
}

/**
 * Get content for a city page
 */
export async function getCityPageContent(
  cityName: string,
  citySlug: string,
  countryName: string,
  countrySlug: string,
  locale: ContentLocale,
  totalPlaces: number
): Promise<AiContentStructure> {
  const result = await generateContent({
    type: "city",
    locale,
    data: {
      cityName,
      citySlug,
      countryName,
      countrySlug,
      totalPlaces,
    },
  });
  return result.content;
}

/**
 * Get content for a place page
 */
export async function getPlacePageContent(
  place: {
    name: string;
    slug: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    address?: string;
    /** Scraped about-us content from website */
    aboutUs?: string;
    /** Scraped facts from website */
    aboutUsFacts?: {
      foundedYear?: number;
      specializations?: string[];
      awards?: string[];
    };
  },
  city: { name: string; slug: string },
  country: { name: string; slug: string },
  categories: string[],
  locale: ContentLocale
): Promise<AiContentStructure> {
  const result = await generateContent({
    type: "place",
    locale,
    data: {
      placeName: place.name,
      placeSlug: place.slug,
      cityName: city.name,
      citySlug: city.slug,
      countryName: country.name,
      countrySlug: country.slug,
      categories,
      description: place.description,
      rating: place.rating,
      reviewCount: place.reviewCount,
      address: place.address,
      aboutUs: place.aboutUs,
      aboutUsFacts: place.aboutUsFacts,
    },
  });
  return result.content;
}
