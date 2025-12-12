/**
 * AI Content Enrichment Script - GERMANY ONLY
 *
 * Uses OpenAI to generate high-quality aboutUs content and descriptions
 * for German places that have poor or missing content.
 *
 * Processes in batches to avoid memory issues.
 *
 * Gebruik: npx tsx scripts/enrich-content-de.ts [--batch-size=50] [--offset=0]
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
  metaDescription?: string;
}

/**
 * Generate aboutUs content using OpenAI (German)
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
    scrapedContext += `\nVorhandene Beschreibung von der Website:\n"${existingAbout.slice(0, 800)}"\n`;
  }
  if (description && description.length > 30) {
    scrapedContext += `\nKurze Beschreibung: "${description.slice(0, 300)}"\n`;
  }
  if (existingServices.length > 0) {
    scrapedContext += `\nDienstleistungen von der Website: ${existingServices.slice(0, 10).join(", ")}\n`;
  }
  if (specialties.length > 0) {
    scrapedContext += `\nSpezialitäten: ${specialties.join(", ")}\n`;
  }
  if (Object.keys(openingHours).length > 0) {
    scrapedContext += `\nÖffnungszeiten vorhanden: Ja\n`;
  }

  // Add facts if available
  if (facts.teamSize) {
    scrapedContext += `\nTeamgröße: ${facts.teamSize}\n`;
  }
  if (facts.foundedYear) {
    scrapedContext += `\nGegründet: ${facts.foundedYear}\n`;
  }
  if (facts.specializations && facts.specializations.length > 0) {
    scrapedContext += `\nSpezialisierungen: ${facts.specializations.join(", ")}\n`;
  }

  // Add existing highlights
  if (highlights.length > 0) {
    scrapedContext += `\nUSPs von der Website: ${highlights.slice(0, 5).join("; ")}\n`;
  }

  // Add Google reviews for context (max 3)
  if (googleReviews.length > 0) {
    scrapedContext += `\n=== GOOGLE BEWERTUNGEN (${googleReviews.length} Stück) ===\n`;
    for (const review of googleReviews.slice(0, 3)) {
      scrapedContext += `- "${review.text.slice(0, 150)}..." (${review.rating}/5 Sterne)\n`;
    }
  }

  const prompt = `Du bist ein professioneller Texter für eine Haustier-Verzeichnis-Website.
Schreibe ausführlichen, einzigartigen Content für das folgende Unternehmen:

=== UNTERNEHMENSDATEN ===
Unternehmensname: ${place.name}
Kategorie: ${place.category_name || place.category_slug || "Haustierservice"}
Adresse: ${place.address || "Nicht verfügbar"}
Stadt: ${place.city_name}, ${place.country_name}
Website: ${place.website || "Nicht verfügbar"}
Bewertung: ${place.avg_rating ? `${place.avg_rating}/5 Sterne` : "Noch keine Bewertung"}
Anzahl Bewertungen: ${place.review_count || 0}

=== KATEGORIE-KONTEXT ===
${categoryContext}
${scrapedContext ? `\n=== INFORMATIONEN VON DER WEBSITE ===\n${scrapedContext}` : ""}

=== AUFGABE ===
Generiere eine JSON-Antwort mit diesen Feldern:

1. "aboutUs": Ein professioneller, einzigartiger Text von 200-350 Wörtern auf Deutsch.
   - Beschreibe, was dieses spezifische Unternehmen macht und anbietet
   - Erwähne die Lage und Erreichbarkeit in ${place.city_name}
   - ${place.avg_rating ? `Verweise auf die ${place.avg_rating}/5 Sterne Bewertung` : "Fokussiere auf Qualität und Service"}
   - Ende mit einer Einladung zur Kontaktaufnahme
   - Mache es EINZIGARTIG für dieses Unternehmen, nicht generisch

2. "highlights": Array von 5-6 kurzen USPs (max 8 Wörter pro Punkt)
   - Fokus auf konkrete Vorteile
   - Verwende aktive Sprache

3. "services": Array von 6-10 spezifischen Dienstleistungen
   - Passe an die Kategorie an (${place.category_name || place.category_slug})
   - Sei spezifisch, nicht generisch

4. "targetAudience": Ein Satz über die Zielgruppe (Haustierbesitzer in ${place.city_name} und Umgebung)

5. "metaDescription": SEO Meta-Beschreibung von 150-160 Zeichen für Google

WICHTIG:
- Schreibe in natürlichem, flüssigem Deutsch
- Vermeide Übertreibungen und falsche Behauptungen
- Nutze die Website-Informationen wenn verfügbar
- Mache Content EINZIGARTIG, keine Copy-Paste-Vorlagen

Antworte NUR mit validem JSON, kein zusätzlicher Text.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Du bist ein Experten-Texter, spezialisiert auf Haustier-Dienstleistungen. Antworte nur mit validem JSON.",
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
      console.error(`   ⚠️ Kein Content von OpenAI erhalten`);
      return null;
    }

    // Clean up potential markdown wrapping
    const cleanContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanContent) as ContentResult;

    if (!parsed.aboutUs || !parsed.highlights || !parsed.services) {
      console.error(`   ⚠️ Unvollständige Antwort:`, parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(`   ❌ OpenAI Fehler:`, error);
    return null;
  }
}

/**
 * Get category-specific context for prompt (German)
 */
function getCategoryContext(category: string | null): string {
  const contexts: Record<string, string> = {
    "veterinary": `Dies ist ein Tierarzt/eine Tierklinik. Fokus auf:
- Medizinische Expertise und Spezialisierungen
- Notdienst-Verfügbarkeit
- Moderne Geräte und Einrichtungen
- Vorsorge und Impfungen`,
    "pet-store": `Dies ist eine Tierhandlung/Zoohandlung. Fokus auf:
- Sortiment an Tierprodukten
- Futter und Nahrungsergänzung
- Zubehör und Spielzeug
- Kundenservice und Beratung`,
    "grooming": `Dies ist ein Hundefriseur/Hundesalon. Fokus auf:
- Fellpflege-Services nach Tierart
- Styling und Pflege
- Hygiene und Sauberkeit
- Erfahrung mit verschiedenen Rassen`,
    "shelter": `Dies ist ein Tierheim/Tierschutz. Fokus auf:
- Adoptionsmöglichkeiten
- Tierpflege und -betreuung
- Ehrenamtliche Arbeit
- Unterstützung und Spenden`,
    "pet-sitting": `Dies ist ein Tiersitter-Service. Fokus auf:
- Individuelle Betreuung
- Hausbesuche oder Übernachtung
- Erfahrung mit verschiedenen Tieren
- Flexibilität und Zuverlässigkeit`,
    "dog-training": `Dies ist eine Hundeschule/Hundetrainer. Fokus auf:
- Trainingsmethoden
- Welpenkurse
- Verhaltensberatung
- Gruppentraining und Einzelstunden`,
    "pet-hotel": `Dies ist eine Tierpension/Tierhotel. Fokus auf:
- Unterkunft und Einrichtungen
- Tägliches Programm
- Individuelle Betreuung
- Sicherheit und Aufsicht`,
    "dog-walking": `Dies ist ein Gassi-Service/Hundeausführservice. Fokus auf:
- Tägliche Spaziergänge
- Einzelne oder Gruppenspaziergänge
- Zuverlässigkeit und Erfahrung
- Flexibilität bei den Zeiten`,
    "emergency-vet": `Dies ist ein tierärztlicher Notdienst. Fokus auf:
- 24-Stunden-Verfügbarkeit
- Notfallbehandlungen
- Schnelle Reaktionszeit
- Lebensrettende Eingriffe`,
    "exotic-vet": `Dies ist ein Tierarzt für Exoten. Fokus auf:
- Spezialisierung auf Vögel, Reptilien, Kleintiere
- Besondere Expertise
- Spezielle Diagnostik
- Individuelle Behandlung`,
    "dog-daycare": `Dies ist eine Hundetagesstätte. Fokus auf:
- Tagesbetreuung für Hunde
- Spielmöglichkeiten und Auslauf
- Soziale Interaktion
- Professionelle Betreuung`,
    "dog-park": `Dies ist ein Hundepark/Hundewiese. Fokus auf:
- Freifläche für Hunde
- Sichere Umzäunung
- Gemeinschaft von Hundebesitzern
- Bewegung und Spiel`,
    "cat-grooming": `Dies ist ein Katzenfriseur. Fokus auf:
- Spezielle Katzenpflege
- Sanfte Behandlung
- Fellpflege und Baden
- Stressfreie Umgebung`,
  };

  return contexts[category || ""] || `Dies ist ein haustierbezogenes Unternehmen. Fokus auf:
- Qualität der Dienstleistung
- Erfahrung und Expertise
- Kundenorientierung
- Lokale Erreichbarkeit`;
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
      metaDescription: content.metaDescription,
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
    console.error(`   ❌ DB Fehler:`, error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🇩🇪 AI Content Enrichment - GERMANY ONLY\n");
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

  // Count total Germany places needing content
  const countResult = await sql`
    SELECT COUNT(*) as count FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = 'DE'
    AND (p.scraped_content IS NULL
         OR p.scraped_content->>'aboutUs' IS NULL
         OR LENGTH(p.scraped_content->>'aboutUs') < 100
         OR p.scraped_content->>'contentSource' IS NULL)
  `;
  const totalNeeding = parseInt(countResult[0].count as string, 10);

  console.log(`📊 Total Germany places needing content: ${totalNeeding}`);
  console.log(`📦 Processing batch: offset=${offset}, size=${batchSize}\n`);

  // Get batch of Germany places needing content
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
    WHERE co.code = 'DE'
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
    console.log(`   npx tsx scripts/enrich-content-de.ts --offset=${offset + batchSize} --batch-size=${batchSize}`);
  } else {
    console.log(`\n🎉 All Germany places have been enriched!`);
  }
}

main().catch(console.error);
