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
// CATEGORY CONTEXT HELPERS
// ============================================================================

/**
 * Get category-specific context for more relevant AI content generation
 */
function getCategoryContext(categorySlug: string, locale: ContentLocale): string {
  const isNl = locale === "nl";

  const categoryContexts: Record<string, { en: string; nl: string }> = {
    veterinarian: {
      en: `Category Context for Veterinarian:
- Common services: General checkups, vaccinations, surgery, dental care, emergency care
- Pet owner concerns: Costs, wait times, specializations, emergency availability, accepted insurance
- FAQ topics: Appointment booking, emergency procedures, preventive care, costs, pet types treated`,
      nl: `Categorie Context voor Dierenarts:
- Veelvoorkomende diensten: Algemene controles, vaccinaties, chirurgie, tandheelkunde, spoedhulp
- Zorgen van huisdiereigenaren: Kosten, wachttijden, specialisaties, spoedbeschikbaarheid, geaccepteerde verzekeringen
- FAQ onderwerpen: Afspraak maken, spoedprocedures, preventieve zorg, kosten, behandelde diersoorten`,
    },
    groomer: {
      en: `Category Context for Groomer:
- Common services: Bathing, haircuts, nail trimming, ear cleaning, de-shedding treatments
- Pet owner concerns: Handling methods, breed experience, organic products, pricing
- FAQ topics: Appointment duration, products used, handling nervous pets, frequency recommendations`,
      nl: `Categorie Context voor Trimsalon:
- Veelvoorkomende diensten: Wassen, knippen, nagels knippen, oren schoonmaken, ontviltbehandelingen
- Zorgen van huisdiereigenaren: Behandelmethodes, ras ervaring, biologische producten, prijzen
- FAQ onderwerpen: Afspraakduur, gebruikte producten, omgaan met nerveuze dieren, frequentie aanbevelingen`,
    },
    "pet-store": {
      en: `Category Context for Pet Store:
- Products: Food, toys, accessories, health products, beds, carriers
- Pet owner concerns: Product quality, brand availability, loyalty programs, delivery options
- FAQ topics: Return policy, brand availability, pet food advice, product recommendations`,
      nl: `Categorie Context voor Dierenwinkel:
- Producten: Voeding, speelgoed, accessoires, gezondheidsproducten, manden, transportboxen
- Zorgen van huisdiereigenaren: Productkwaliteit, merkbeschikbaarheid, loyaliteitsprogramma's, bezorgopties
- FAQ onderwerpen: Retourbeleid, merkbeschikbaarheid, voedingsadvies, productaanbevelingen`,
    },
    "pet-hotel": {
      en: `Category Context for Pet Hotel:
- Services: Overnight stays, daycare, play sessions, special diets, medication administration
- Pet owner concerns: Staff qualifications, supervision, emergency protocols, webcams
- FAQ topics: Booking requirements, vaccination requirements, what to bring, daily routine`,
      nl: `Categorie Context voor Dierenhotel:
- Diensten: Overnachtingen, dagopvang, speelsessies, speciale diëten, medicatie toediening
- Zorgen van huisdiereigenaren: Kwalificaties personeel, toezicht, noodprotocollen, webcams
- FAQ onderwerpen: Boekingsvereisten, vaccinatievereisten, wat mee te nemen, dagelijkse routine`,
    },
    "dog-trainer": {
      en: `Category Context for Dog Trainer:
- Services: Puppy training, obedience, behavioral issues, agility, private sessions, group classes
- Pet owner concerns: Training methods (positive reinforcement), experience with specific breeds, success rates
- FAQ topics: Training duration, methods used, at-home practice, age requirements`,
      nl: `Categorie Context voor Hondentrainer:
- Diensten: Puppytraining, gehoorzaamheid, gedragsproblemen, agility, privélessen, groepslessen
- Zorgen van huisdiereigenaren: Trainingsmethodes (positieve bekrachtiging), ervaring met specifieke rassen, succespercentages
- FAQ onderwerpen: Trainingsduur, gebruikte methodes, thuisoefeningen, leeftijdsvereisten`,
    },
    "animal-shelter": {
      en: `Category Context for Animal Shelter:
- Services: Adoption, fostering, lost pet assistance, surrender services, volunteering
- Pet owner concerns: Adoption process, animal health history, behavioral assessments, fees
- FAQ topics: Adoption requirements, visiting hours, fostering programs, donation options`,
      nl: `Categorie Context voor Dierenasiel:
- Diensten: Adoptie, pleegzorg, hulp bij vermiste dieren, afstand doen, vrijwilligerswerk
- Zorgen van huisdiereigenaren: Adoptieproces, gezondheidsgeschiedenis, gedragsbeoordelingen, kosten
- FAQ onderwerpen: Adoptievereisten, bezoekuren, pleegzorgprogramma's, donatiemogelijkheden`,
    },
  };

  const context = categoryContexts[categorySlug];
  if (context) {
    return isNl ? context.nl : context.en;
  }

  // Default context for unknown categories
  return isNl
    ? `Categorie Context:
- Schrijf content specifiek voor dit type huisdierdienst
- Overweeg typische vragen die huisdiereigenaren hebben over deze dienst
- Vermeld lokale factoren zoals bereikbaarheid en parkeren`
    : `Category Context:
- Write content specific to this type of pet service
- Consider typical questions pet owners have about this service
- Mention local factors like accessibility and parking`;
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

  // 2. AI generation on page visits is DISABLED
  // We only use cached content (pre-generated via scripts) or fallback templates
  // This prevents uncontrolled API costs from user visits
  //
  // To generate AI content, use scripts like:
  // - npx tsx scripts/generate-ai-content.ts
  // - npx tsx scripts/enrich-content.ts
  //
  // The AI_ENABLED flag is now only respected by those scripts, not runtime
  const fallbackContent = generateFallbackContent(type, data, locale);
  return {
    content: fallbackContent,
    fromCache: false,
    isStale: false,
    version: "fallback",
  };
}

/**
 * Generate AI content in background and cache it (non-blocking)
 */
async function generateAndCacheInBackground(
  cacheKey: string,
  type: AiContentType,
  data: ContentData,
  locale: ContentLocale
): Promise<void> {
  try {
    const startTime = Date.now();
    const result = await generateViaLLM(type, data, locale);
    const generationTimeMs = Date.now() - startTime;

    // Save to cache
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

    console.log(`Background AI generation completed for ${cacheKey} in ${generationTimeMs}ms`);
  } catch (error) {
    console.error(`Background AI generation failed for ${cacheKey}:`, error);

    // Mark cache error
    if (AI_CACHE_ENABLED) {
      await markCacheError(cacheKey, error instanceof Error ? error.message : "Unknown error");
    }
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
        content: getSystemPrompt(locale, type),
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: AI_TEMPERATURE,
    max_tokens: type === "place" ? 1500 : AI_MAX_TOKENS, // More tokens for place pages
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
function getSystemPrompt(locale: ContentLocale, contentType?: AiContentType): string {
  const localeInstructions = {
    nl: "Schrijf in het Nederlands. Gebruik een vriendelijke, professionele toon geschikt voor huisdiereigenaren.",
    en: "Write in English. Use a friendly, professional tone suitable for pet owners.",
    de: "Schreiben Sie auf Deutsch. Verwenden Sie einen freundlichen, professionellen Ton, der für Tierbesitzer geeignet ist.",
  };

  // For place pages, request more comprehensive content
  if (contentType === "place") {
    return `You are an SEO content writer for CutiePawsPedia, a directory of pet services (veterinarians, groomers, pet stores, etc.).

${localeInstructions[locale]}

For business profile pages, provide comprehensive, unique content. Always respond with valid JSON matching this structure:
{
  "intro": "Engaging introduction paragraph (3-5 sentences) that introduces the business and what makes it special",
  "metaDescription": "SEO meta description (max 155 characters)",
  "h1": "H1 heading suggestion",
  "secondary": "Second paragraph (2-3 sentences) about services or unique qualities",
  "sections": [
    { "heading": "What to Expect", "content": "Detailed paragraph about what customers can expect (3-4 sentences)" },
    { "heading": "Services Overview", "content": "Description of key services offered (3-4 sentences)" },
    { "heading": "Why Choose This Business", "content": "Unique selling points and benefits (3-4 sentences)" }
  ],
  "faqs": [
    { "question": "Business-specific FAQ 1", "answer": "Detailed answer (2-3 sentences)" },
    { "question": "Business-specific FAQ 2", "answer": "Detailed answer (2-3 sentences)" },
    { "question": "Service-related FAQ", "answer": "Detailed answer (2-3 sentences)" },
    { "question": "Location/accessibility FAQ", "answer": "Detailed answer (2-3 sentences)" }
  ],
  "cta": "Call-to-action text",
  "bullets": ["Key benefit 1", "Key benefit 2", "Key benefit 3", "Key benefit 4"],
  "serviceHighlights": ["Service 1", "Service 2", "Service 3"],
  "localRelevance": "Paragraph about location benefits and accessibility (2-3 sentences)"
}

CRITICAL Guidelines for place pages:
- Make the content UNIQUE to this specific business - avoid generic phrases
- FAQs must be specific to this business type, location, and services - NOT generic template questions
- Include local context (neighborhood, city characteristics, accessibility)
- Mention specific services when known from the description
- If about-us content is provided, incorporate unique details from it
- Aim for at least 400 words of total content
- Do NOT use markdown formatting in the JSON values`;
  }

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

      // Build category-specific context for better FAQs
      const primaryCategory = placeData.categories[0] || "";
      const categoryContext = getCategoryContext(primaryCategory, locale);

      return `Generate comprehensive SEO content for a business profile page: ${placeData.placeName} in ${placeData.cityName}, ${placeData.countryName}.

Business Information:
- Business name: ${placeData.placeName}
- Location: ${placeData.cityName}, ${placeData.countryName}
- Categories: ${placeData.categories.join(", ")}
${placeData.rating ? `- Rating: ${placeData.rating}/5` : "- Rating: Not yet rated"}
${placeData.reviewCount ? `- Reviews: ${placeData.reviewCount}` : "- Reviews: None yet"}
${placeData.address ? `- Full address: ${placeData.address}` : ""}
${placeData.description ? `- Business description: ${placeData.description}` : ""}${aboutUsContext}

${categoryContext}

IMPORTANT - Content Requirements:
1. Write a comprehensive, unique intro (3-5 sentences) that specifically describes this business
2. Include a secondary paragraph about their services or approach
3. Create 3 content sections with detailed information
4. Generate 4 UNIQUE FAQs specific to:
   - This business type (${primaryCategory})
   - This location (${placeData.cityName})
   - Common questions pet owners ask about ${primaryCategory}
   - Local considerations (parking, accessibility, emergency services)
5. List 4 key benefits/bullet points
6. Include local relevance paragraph

${placeData.aboutUs ? "Use the about-us information to write personalized content that highlights what makes this business special. Incorporate specific details from their website." : "Write helpful content that assists pet owners in understanding what this business offers and whether it meets their needs. Be specific about the type of services based on the category."}`;

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
        aboutUs: placeData.aboutUs, // Pass E-E-A-T enriched content
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
