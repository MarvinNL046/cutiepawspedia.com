/**
 * AI Content Enrichment Script - BELGIUM ONLY
 *
 * Uses OpenAI to generate high-quality aboutUs content and descriptions
 * for Belgian places that have poor or missing content.
 *
 * Processes in batches to avoid memory issues.
 *
 * Gebruik: npx tsx scripts/enrich-content-be.ts [--batch-size=50] [--offset=0]
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

  // Extract any existing scraped data from Jina and BrightData
  const scraped = place.scraped_content || {};
  const existingAbout = scraped.aboutUs as string || "";
  const existingServices = scraped.services as string[] || [];
  const openingHours = scraped.openingHours as Record<string, string> || {};
  const specialties = scraped.specialties as string[] || [];
  const description = scraped.description as string || "";
  const facts = scraped.facts as { teamSize?: string; foundedYear?: number; specializations?: string[] } || {};
  const highlights = scraped.highlights as string[] || [];
  const googleReviews = scraped.googleReviews as { author: string; rating: number; text: string }[] || [];

  // Build context from scraped data
  let scrapedContext = "";
  if (existingAbout && existingAbout.length > 50) {
    scrapedContext += `\nBestaande beschrijving van website:\n"${existingAbout.slice(0, 800)}"\n`;
  }
  if (description && description.length > 30) {
    scrapedContext += `\nKorte beschrijving: "${description.slice(0, 300)}"\n`;
  }
  if (existingServices.length > 0) {
    scrapedContext += `\nDiensten gevonden op website: ${existingServices.slice(0, 10).join(", ")}\n`;
  }
  if (specialties.length > 0) {
    scrapedContext += `\nSpecialiteiten: ${specialties.join(", ")}\n`;
  }
  if (Object.keys(openingHours).length > 0) {
    scrapedContext += `\nOpeningstijden beschikbaar: Ja\n`;
  }

  // Add facts if available
  if (facts.teamSize) {
    scrapedContext += `\nTeam grootte: ${facts.teamSize}\n`;
  }
  if (facts.foundedYear) {
    scrapedContext += `\nOpgericht: ${facts.foundedYear}\n`;
  }
  if (facts.specializations && facts.specializations.length > 0) {
    scrapedContext += `\nSpecialisaties: ${facts.specializations.join(", ")}\n`;
  }

  // Add existing highlights
  if (highlights.length > 0) {
    scrapedContext += `\nUSPs van website: ${highlights.slice(0, 5).join("; ")}\n`;
  }

  // Add Google reviews for context (max 3)
  if (googleReviews.length > 0) {
    scrapedContext += `\n=== GOOGLE REVIEWS (${googleReviews.length} stuks) ===\n`;
    for (const review of googleReviews.slice(0, 3)) {
      scrapedContext += `- "${review.text.slice(0, 150)}..." (${review.rating}/5 sterren)\n`;
    }
  }

  const prompt = `Je bent een professionele copywriter voor een huisdieren directory website.
Schrijf uitgebreide, unieke content voor het volgende bedrijf:

=== BEDRIJFSGEGEVENS ===
Bedrijfsnaam: ${place.name}
Categorie: ${place.category_name || place.category_slug || "Huisdierenservice"}
Adres: ${place.address || "Niet beschikbaar"}
Stad: ${place.city_name}, ${place.country_name}
Website: ${place.website || "Niet beschikbaar"}
Rating: ${place.avg_rating ? `${place.avg_rating}/5 sterren` : "Nog geen rating"}
Aantal reviews: ${place.review_count || 0}

=== CATEGORIE CONTEXT ===
${categoryContext}
${scrapedContext ? `\n=== INFORMATIE VAN WEBSITE ===\n${scrapedContext}` : ""}

=== OPDRACHT ===
Genereer een JSON response met deze velden:

1. "aboutUs": Een professionele, unieke tekst van 200-350 woorden in het Nederlands.
   - Beschrijf wat dit specifieke bedrijf doet en aanbiedt
   - Benoem de locatie en bereikbaarheid in ${place.city_name}
   - ${place.avg_rating ? `Verwijs naar de ${place.avg_rating}/5 sterren beoordeling` : "Focus op kwaliteit en service"}
   - Eindig met een uitnodiging om contact op te nemen
   - Maak het UNIEK voor dit bedrijf, niet generiek

2. "highlights": Array van 5-6 korte USPs (max 8 woorden elk)
   - Focus op concrete voordelen
   - Gebruik actieve taal

3. "services": Array van 6-10 specifieke diensten
   - Pas aan op de categorie (${place.category_name || place.category_slug})
   - Wees specifiek, niet generiek

4. "targetAudience": Een zin over de doelgroep (huisdiereigenaren in ${place.city_name} en omgeving)

5. "metaDescription": SEO meta description van 150-160 karakters voor Google

BELANGRIJK:
- Schrijf in natuurlijk, vloeiend Nederlands
- Vermijd overdrijving en valse claims
- Gebruik de website-informatie indien beschikbaar
- Maak content UNIEK, geen copy-paste templates

Antwoord ALLEEN met valid JSON, geen extra tekst.`;

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
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error(`   ⚠️ Geen content ontvangen van OpenAI`);
      return null;
    }

    // Clean up potential markdown wrapping
    const cleanContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanContent) as ContentResult;

    if (!parsed.aboutUs || !parsed.highlights || !parsed.services) {
      console.error(`   ⚠️ Incomplete response:`, parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(`   ❌ OpenAI error:`, error);
    return null;
  }
}

/**
 * Get category-specific context for prompt
 */
function getCategoryContext(category: string | null): string {
  const contexts: Record<string, string> = {
    "veterinarian": `Dit is een dierenarts/veterinaire kliniek. Focus op:
- Medische expertise en specialisaties
- Spoedzorg beschikbaarheid
- Moderne apparatuur en faciliteiten
- Preventieve zorg en vaccinaties`,
    "pet-store": `Dit is een dierenwinkel/petshop. Focus op:
- Assortiment huisdierproducten
- Voeding en supplementen
- Accessoires en speelgoed
- Klantenservice en advies`,
    "groomer": `Dit is een trimsalon/groomer. Focus op:
- Trimservices per diersoort
- Vachtverzorging en styling
- Hygiëne en netheid
- Ervaring met verschillende rassen`,
    "animal-shelter": `Dit is een dierenasiel/opvang. Focus op:
- Adoptie mogelijkheden
- Verzorging van dieren
- Vrijwilligerswerk
- Steun en donaties`,
    "pet-sitter": `Dit is een huisdieroppas service. Focus op:
- Individuele aandacht
- Thuisbezoeken of verblijf
- Ervaring met verschillende dieren
- Flexibiliteit en betrouwbaarheid`,
    "dog-trainer": `Dit is een hondentrainer/gedragstherapeut. Focus op:
- Trainingsmethoden
- Puppycursussen
- Gedragsproblemen
- Groepslessen en privélessen`,
    "pet-hotel": `Dit is een dierenpension/hotel. Focus op:
- Accommodatie faciliteiten
- Dagelijks programma
- Individuele verzorging
- Veiligheid en toezicht`,
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
        description = ${content.aboutUs.slice(0, 500)},
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
  console.log("🇧🇪 AI Content Enrichment - BELGIUM ONLY\n");
  console.log("━".repeat(60));

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in .env");
    process.exit(1);
  }

  console.log(`✅ OpenAI API Key: ${process.env.OPENAI_API_KEY.slice(0, 15)}...`);
  console.log(`✅ Model: ${process.env.AI_MODEL || "gpt-4o-mini"}\n`);

  // Parse command line arguments
  const args = process.argv.slice(2);
  const batchSizeArg = args.find(a => a.startsWith("--batch-size="));
  const offsetArg = args.find(a => a.startsWith("--offset="));
  const batchSize = batchSizeArg ? parseInt(batchSizeArg.split("=")[1], 10) : 100;
  const offset = offsetArg ? parseInt(offsetArg.split("=")[1], 10) : 0;

  // Count total Belgium places needing content
  const countResult = await sql`
    SELECT COUNT(*) as count FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'BE'
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'aboutUs' IS NULL
         OR LENGTH(p.scraped_content->>'aboutUs') < 100
         OR p.scraped_content->>'contentSource' IS NULL)
  `;
  const totalNeeding = parseInt(countResult[0].count as string, 10);

  console.log(`📊 Total Belgium places needing content: ${totalNeeding}`);
  console.log(`📦 Processing batch: offset=${offset}, size=${batchSize}\n`);

  // Get batch of Belgium places needing content
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
      c.name as city_name,
      co.name as country_name,
      cat.slug as category_slug,
      cat.label_key as category_name
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    LEFT JOIN place_categories pc ON p.id = pc.place_id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    WHERE co.code = 'BE'
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'aboutUs' IS NULL
         OR LENGTH(p.scraped_content->>'aboutUs') < 100
         OR p.scraped_content->>'contentSource' IS NULL)
    ORDER BY p.id
    OFFSET ${offset}
    LIMIT ${batchSize}
  ` as Place[];

  console.log(`🔄 Processing ${places.length} places in this batch...\n`);

  if (places.length === 0) {
    console.log("✅ No more places to process!");
    return;
  }

  let enriched = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const progress = `[${i + 1 + offset}/${totalNeeding}]`;

    process.stdout.write(`${progress} 🏢 ${place.name.slice(0, 40).padEnd(40)} `);

    const content = await generateAboutContent(place);

    if (content) {
      const updated = await updatePlaceWithContent(place.id, content);
      if (updated) {
        enriched++;
        console.log(`✅ ${content.aboutUs.length}c`);
      } else {
        failed++;
        console.log(`❌ DB error`);
      }
    } else {
      failed++;
      console.log(`❌ AI error`);
    }

    // Rate limiting - avoid hitting OpenAI limits
    if (i > 0 && i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n" + "━".repeat(60));
  console.log(`\n✅ Batch complete!`);
  console.log(`   Enriched: ${enriched}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Time: ${elapsed}s`);
  console.log(`   Rate: ${(enriched / parseFloat(elapsed) * 60).toFixed(1)}/min`);

  const remaining = totalNeeding - offset - places.length;
  if (remaining > 0) {
    console.log(`\n📋 Next batch command:`);
    console.log(`   npx tsx scripts/enrich-content-be.ts --offset=${offset + batchSize} --batch-size=${batchSize}`);
  } else {
    console.log(`\n🎉 All Belgium places have been enriched!`);
  }
}

main().catch(console.error);
