#!/usr/bin/env npx tsx
/**
 * Website Content Enrichment via Jina AI + GPT-4o-mini
 *
 * Production-ready script to enrich places with rich "About" content:
 * - Fetches website content via Jina AI Reader
 * - Uses GPT-4o-mini to extract/generate About text
 * - Extracts business facts (founded year, specializations, etc.)
 *
 * Usage:
 *   npx tsx scripts/enrich-website-content.ts                    # Enrich all
 *   npx tsx scripts/enrich-website-content.ts --city=Amsterdam   # Filter by city
 *   npx tsx scripts/enrich-website-content.ts --limit=10         # Limit count
 *   npx tsx scripts/enrich-website-content.ts --dry-run          # Preview only
 *   npx tsx scripts/enrich-website-content.ts --force            # Re-enrich existing
 */
import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);
const JINA_API_KEY = process.env.JINA_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// =============================================================================
// Types
// =============================================================================

interface Place {
  id: number;
  name: string;
  slug: string;
  website: string | null;
  city_name: string;
  city_slug: string;
  country_name: string;
  country_slug: string;
  categories: string[];
  scraped_content: Record<string, unknown> | null;
}

interface EnrichmentResult {
  aboutUs: string;
  facts: {
    foundedYear?: number;
    specializations?: string[];
    awards?: string[];
    teamSize?: string;
    certifications?: string[];
  };
  highlights: string[];
  services: string[];
}

interface Stats {
  processed: number;
  enriched: number;
  skipped: number;
  failed: number;
}

// =============================================================================
// CLI Arguments
// =============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    city: args.find(a => a.startsWith("--city="))?.split("=")[1],
    limit: parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] || "20", 10),
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

function printHelp() {
  console.log(`
Website Content Enrichment Script

Enriches places with rich About content via Jina AI + GPT-4o-mini:
- Fetches website content
- Generates personalized About text
- Extracts business facts

Usage:
  npx tsx scripts/enrich-website-content.ts [options]

Options:
  --city=<name>    Filter by city name (e.g., --city=Amsterdam)
  --limit=<n>      Maximum places to process (default: 20)
  --dry-run        Preview without updating database
  --force          Re-enrich places that already have aboutUs
  --help, -h       Show this help

Examples:
  npx tsx scripts/enrich-website-content.ts --city=Amsterdam --limit=10
  npx tsx scripts/enrich-website-content.ts --limit=50
  npx tsx scripts/enrich-website-content.ts --dry-run

Environment:
  DATABASE_URL     Neon PostgreSQL connection (required)
  JINA_API_KEY     Jina AI API key (required)
  OPENAI_API_KEY   OpenAI API key (required)
`);
}

// =============================================================================
// Jina AI Web Scraper
// =============================================================================

async function fetchWebsiteContent(url: string): Promise<string | null> {
  if (!JINA_API_KEY) {
    console.log("   ⚠️ JINA_API_KEY not set, using basic fetch");
    return fetchBasic(url);
  }

  try {
    // Use Jina Reader API for clean content extraction
    const jinaUrl = `https://r.jina.ai/${url}`;

    const response = await fetch(jinaUrl, {
      headers: {
        "Authorization": `Bearer ${JINA_API_KEY}`,
        "Accept": "text/plain",
        "X-Return-Format": "text",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.log(`   ⚠️ Jina returned ${response.status}`);
      return null;
    }

    const content = await response.text();

    // Truncate to reasonable size for GPT processing
    return content.slice(0, 8000);
  } catch (error) {
    console.log(`   ⚠️ Fetch error: ${error instanceof Error ? error.message : "Unknown"}`);
    return null;
  }
}

async function fetchBasic(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CutiePawsPediaBot/1.0)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Basic HTML to text conversion
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 8000);
  } catch {
    return null;
  }
}

// =============================================================================
// GPT-4o-mini Content Generator
// =============================================================================

async function generateAboutContent(
  websiteContent: string,
  place: Place
): Promise<EnrichmentResult | null> {
  if (!OPENAI_API_KEY) {
    console.log("   ❌ OPENAI_API_KEY not set");
    return null;
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const systemPrompt = `Je bent een content specialist voor CutiePawsPedia, een directory van huisdierservices in Nederland.

Analyseer de website content en genereer rijke, SEO-vriendelijke content voor deze business.

Antwoord ALLEEN met valid JSON in dit exacte formaat:
{
  "aboutUs": "Een professionele, warme beschrijving van 150-250 woorden over dit bedrijf. Vermeld specifieke details van hun website zoals specialisaties, ervaring, aanpak. Schrijf in de derde persoon.",
  "facts": {
    "foundedYear": 2010,
    "specializations": ["specialisatie1", "specialisatie2"],
    "awards": ["prijs1"],
    "teamSize": "5-10 medewerkers",
    "certifications": ["certificering1"]
  },
  "highlights": ["unieke eigenschap 1", "unieke eigenschap 2", "unieke eigenschap 3"],
  "services": ["dienst 1", "dienst 2", "dienst 3"]
}

Regels:
- Schrijf in het Nederlands
- Wees specifiek, gebruik details van de website
- Als een veld niet te achterhalen is, laat het weg of gebruik null
- foundedYear moet een nummer zijn of null
- highlights en services zijn arrays van korte teksten
- Vermijd generieke zinnen, focus op wat dit bedrijf uniek maakt`;

  const userPrompt = `Bedrijf: ${place.name}
Locatie: ${place.city_name}, ${place.country_name}
Categorieën: ${place.categories.join(", ")}

Website content:
${websiteContent}

Genereer rijke About content voor dit huisdierbedrijf.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content) as EnrichmentResult;

    // Validate required fields
    if (!parsed.aboutUs || parsed.aboutUs.length < 50) {
      console.log("   ⚠️ Generated aboutUs too short");
      return null;
    }

    return parsed;
  } catch (error) {
    console.log(`   ❌ GPT error: ${error instanceof Error ? error.message : "Unknown"}`);
    return null;
  }
}

// =============================================================================
// Database Operations
// =============================================================================

async function getPlaces(city?: string, limit = 20, force = false): Promise<Place[]> {
  const cityCondition = city ? sql`AND c.name = ${city}` : sql``;
  const aboutUsCondition = force
    ? sql``
    : sql`AND (p.scraped_content->>'aboutUs' IS NULL OR p.scraped_content->>'aboutUs' = 'null')`;

  return await sql`
    SELECT
      p.id,
      p.name,
      p.slug,
      p.website,
      c.name as city_name,
      c.slug as city_slug,
      co.name as country_name,
      co.slug as country_slug,
      p.scraped_content,
      COALESCE(
        ARRAY(
          SELECT cat.slug FROM place_categories pc
          JOIN categories cat ON pc.category_id = cat.id
          WHERE pc.place_id = p.id
        ),
        ARRAY[]::text[]
      ) as categories
    FROM places p
    LEFT JOIN cities c ON p.city_id = c.id
    LEFT JOIN countries co ON c.country_id = co.id
    WHERE p.website IS NOT NULL
      AND p.website != ''
      ${cityCondition}
      ${aboutUsCondition}
    ORDER BY p.id
    LIMIT ${limit}
  ` as Place[];
}

async function updatePlace(
  place: Place,
  data: EnrichmentResult
): Promise<boolean> {
  try {
    // Merge with existing scraped_content
    const mergedContent = {
      ...(place.scraped_content || {}),
      aboutUs: data.aboutUs,
      facts: data.facts,
      highlights: data.highlights,
      services: data.services,
      contentEnrichedAt: new Date().toISOString(),
      contentSource: "gpt-4o-mini",
    };

    // Build quality flags
    const newFlags = JSON.stringify([
      "CONTENT_VIA_AI",
      "ABOUT_US_ENRICHED",
    ]);

    await sql`
      UPDATE places SET
        scraped_content = ${JSON.stringify(mergedContent)}::jsonb,
        data_quality_flags = (
          SELECT jsonb_agg(DISTINCT value)
          FROM jsonb_array_elements_text(
            COALESCE(data_quality_flags, '[]'::jsonb) || ${newFlags}::jsonb
          )
        ),
        updated_at = NOW()
      WHERE id = ${place.id}
    `;

    // Invalidate AI content cache for this place (all locales)
    // This ensures fresh AI content is generated using the new aboutUs
    for (const locale of ["nl", "en"]) {
      const cacheKey = `place:${place.slug}:${place.city_slug}:${place.country_slug}:${locale}`;
      await sql`
        UPDATE ai_content_cache
        SET is_stale = true
        WHERE key = ${cacheKey}
      `;
    }

    return true;
  } catch (error) {
    console.log(`   ❌ DB error: ${error instanceof Error ? error.message : "Unknown"}`);
    return false;
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  console.log("\n🚀 Website Content Enrichment");
  console.log("━".repeat(50));

  if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not set");
    process.exit(1);
  }

  console.log(`📍 City: ${args.city || "All"}`);
  console.log(`📊 Limit: ${args.limit}`);
  console.log(`🔧 Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`🔄 Force: ${args.force ? "Yes (re-enrich existing)" : "No"}`);
  console.log(`🔑 Jina AI: ${JINA_API_KEY ? "Configured" : "Not set (using basic fetch)"}\n`);

  const places = await getPlaces(args.city, args.limit, args.force);
  console.log(`📋 Found ${places.length} places to enrich\n`);

  if (places.length === 0) {
    console.log("✅ All places already have content!");
    return;
  }

  const stats: Stats = {
    processed: 0,
    enriched: 0,
    skipped: 0,
    failed: 0,
  };

  for (const place of places) {
    stats.processed++;
    console.log(`[${stats.processed}/${places.length}] ${place.name}`);
    console.log(`   🌐 ${place.website}`);

    if (!place.website) {
      console.log(`   ⏭️ No website, skipping`);
      stats.skipped++;
      continue;
    }

    // Step 1: Fetch website content
    console.log(`   📥 Fetching website...`);
    const websiteContent = await fetchWebsiteContent(place.website);

    if (!websiteContent || websiteContent.length < 100) {
      console.log(`   ⚠️ Could not fetch website content`);
      stats.failed++;
      continue;
    }

    console.log(`   📄 Got ${websiteContent.length} chars`);

    // Step 2: Generate content with GPT-4o-mini
    console.log(`   🤖 Generating content with GPT-4o-mini...`);
    const enrichedData = await generateAboutContent(websiteContent, place);

    if (!enrichedData) {
      console.log(`   ⚠️ Could not generate content`);
      stats.failed++;
      continue;
    }

    console.log(`   📝 About: ${enrichedData.aboutUs.slice(0, 80)}...`);
    if (enrichedData.highlights?.length) {
      console.log(`   ✨ ${enrichedData.highlights.length} highlights`);
    }
    if (enrichedData.services?.length) {
      console.log(`   🔧 ${enrichedData.services.length} services`);
    }
    if (enrichedData.facts?.foundedYear) {
      console.log(`   📅 Founded: ${enrichedData.facts.foundedYear}`);
    }

    // Step 3: Save to database
    if (!args.dryRun) {
      const ok = await updatePlace(place, enrichedData);
      console.log(ok ? `   ✅ Saved! (cache invalidated)` : `   ❌ Failed to save`);
      if (ok) {
        stats.enriched++;
      } else {
        stats.failed++;
      }
    } else {
      console.log(`   ⏭️ Skipped (dry run)`);
      stats.enriched++;
    }

    // Rate limit (be nice to websites and APIs)
    await new Promise(r => setTimeout(r, 2000));
  }

  // Summary
  console.log("\n" + "━".repeat(50));
  console.log("📊 Summary\n");
  console.log(`   Processed:  ${stats.processed}`);
  console.log(`   Enriched:   ${stats.enriched}`);
  console.log(`   Skipped:    ${stats.skipped}`);
  console.log(`   Failed:     ${stats.failed}`);

  // DB stats
  const dbStats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE scraped_content->>'aboutUs' IS NOT NULL AND scraped_content->>'aboutUs' != 'null') as with_about,
      COUNT(*) FILTER (WHERE data_quality_flags::text LIKE '%ABOUT_US_ENRICHED%') as ai_enriched
    FROM places
  `;

  console.log("\n📈 Database Totals:");
  console.log(`   Total:         ${dbStats[0].total}`);
  console.log(`   With About:    ${dbStats[0].with_about}`);
  console.log(`   AI Enriched:   ${dbStats[0].ai_enriched}`);
}

main().catch(console.error);
