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

interface ContentResult {
  aboutUs: string;
  highlights: string[];
  services: string[];
  targetAudience: string;
}

/**
 * Generate aboutUs content using OpenAI
 */
async function generateAboutContent(place: Place): Promise<ContentResult | null> {
  const categoryContext = getCategoryContext(place.category_slug);

  const prompt = `Je bent een professionele copywriter voor een huisdieren directory website.
Schrijf een uitgebreide "Over Ons" tekst voor het volgende bedrijf:

Bedrijfsnaam: ${place.name}
Categorie: ${place.category_name || place.category_slug || "Huisdierenservice"}
Adres: ${place.address || "Niet beschikbaar"}
Stad: ${place.city_name}, ${place.country_name}
Website: ${place.website || "Niet beschikbaar"}
Rating: ${place.avg_rating ? `${place.avg_rating}/5` : "Geen rating"}
Reviews: ${place.review_count || 0}

${categoryContext}

Bestaande informatie (indien beschikbaar):
${place.scraped_content?.aboutUs ? `Huidige beschrijving: ${String(place.scraped_content.aboutUs).slice(0, 500)}` : "Geen bestaande beschrijving"}

Genereer een JSON response met:
1. "aboutUs": Een professionele, informatieve tekst van 150-250 woorden in het Nederlands. Focus op:
   - Wat het bedrijf doet
   - Kwaliteit en expertise
   - Locatie voordelen
   - Waarom klanten voor dit bedrijf kiezen

2. "highlights": Een array van 3-5 korte highlights/USPs (max 10 woorden elk)

3. "services": Een array van 4-8 diensten die dit type bedrijf typisch aanbiedt

4. "targetAudience": Een korte zin over de doelgroep

Schrijf in een professionele maar vriendelijke toon. Vermijd overdrijving en maak geen valse claims.
Als er weinig informatie beschikbaar is, schrijf dan algemene maar relevante content voor dit type bedrijf.

Antwoord alleen met valid JSON, geen extra tekst.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Je bent een expert copywriter gespecialiseerd in huisdieren diensten. Antwoord alleen met valid JSON.",
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
 * Get category-specific context for better content generation
 */
function getCategoryContext(category: string | null): string {
  const contexts: Record<string, string> = {
    "veterinary": `Dit is een dierenarts/dierenkliniek. Focus op:
- Medische zorg en expertise
- Preventieve gezondheid
- Noodgevallen beschikbaarheid
- Specialisaties (bijv. honden, katten, exotische dieren)`,

    "vet": `Dit is een dierenarts/dierenkliniek. Focus op:
- Medische zorg en expertise
- Preventieve gezondheid
- Behandelmogelijkheden`,

    "grooming": `Dit is een trimsalon voor huisdieren. Focus op:
- Vacht verzorging en styling
- Hygiëne behandelingen
- Ervaring met verschillende rassen
- Rustige, stressvrije omgeving`,

    "pet-grooming": `Dit is een trimsalon. Focus op:
- Professionele verzorging
- Verschillende behandelingen
- Rasvaardigheid`,

    "pet-store": `Dit is een dierenwinkel. Focus op:
- Productassortiment (voeding, speelgoed, accessoires)
- Merkenkwaliteit
- Advies en expertise
- Lokale service`,

    "pet-shops": `Dit is een dierenwinkel. Focus op:
- Breed assortiment
- Kwaliteitsproducten
- Deskundig advies`,

    "pet-hotel": `Dit is een dierenpension/hotel. Focus op:
- Verblijfkwaliteit en comfort
- Verzorging en aandacht
- Veiligheid en toezicht
- Ruimte en faciliteiten`,

    "pet-boarding": `Dit is een pension. Focus op:
- Liefdevolle opvang
- Dagelijkse verzorging
- Veilige omgeving`,

    "dog-training": `Dit is een hondentraining/school. Focus op:
- Trainingsmethodes (positief)
- Gedragscorrectie
- Puppy cursussen
- Ervaring en certificeringen`,

    "pet-training": `Dit is een trainingscentrum. Focus op:
- Professionele begeleiding
- Verschillende cursussen
- Resultaatgericht`,

    "dog-walking": `Dit is een hondenuitlaatservice. Focus op:
- Dagelijkse wandelingen
- Flexibiliteit en betrouwbaarheid
- Ervaring met honden
- Groeps- of individuele wandelingen`,

    "pet-sitting": `Dit is een oppasservice. Focus op:
- Thuisoppas mogelijkheden
- Betrouwbaarheid
- Ervaring met dieren
- Flexibele afspraken`,

    "pet-daycare": `Dit is een dagopvang/crèche. Focus op:
- Socialisatie
- Spel en activiteiten
- Toezicht en veiligheid
- Dagprogramma`,
  };

  return contexts[category || ""] || `Dit is een huisdieren gerelateerd bedrijf. Focus op:
- Kwaliteit van service
- Ervaring en expertise
- Klantgerichtheid
- Lokale bereikbaarheid`;
}

/**
 * Update place with AI-generated content
 */
async function updatePlaceWithContent(
  placeId: number,
  placeName: string,
  content: ContentResult
): Promise<boolean> {
  try {
    const scrapedContent = {
      aboutUs: content.aboutUs,
      highlights: content.highlights,
      services: content.services,
      targetAudience: content.targetAudience,
      contentSource: "openai_generated",
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
    console.log(`\n🏢 ${place.name}`);
    console.log(`   📍 ${place.city_name}, ${place.country_name}`);
    console.log(`   📁 ${place.category_name || place.category_slug || "Unknown"}`);

    const content = await generateAboutContent(place);

    if (content) {
      if (dryRun) {
        console.log(`   📝 Generated aboutUs (${content.aboutUs.length} chars)`);
        console.log(`   🎯 Highlights: ${content.highlights.join(", ")}`);
        enriched++;
      } else {
        const updated = await updatePlaceWithContent(place.id, place.name, content);
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
