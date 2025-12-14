import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";

const sql = neon(process.env.DATABASE_URL!);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 2000; // 2 seconds

interface Place {
  id: number;
  name: string;
  address: string | null;
  city: string;
  country_code: string;
  category: string;
  scraped_content: Record<string, unknown> | null;
}

async function generateAIContent(place: Place): Promise<Record<string, unknown>> {
  const prompt = `Generate comprehensive business information for a pet service business in JSON format.

Business Details:
- Name: ${place.name}
- Category: ${place.category}
- City: ${place.city}, ${place.country_code === 'BE' ? 'Belgium' : 'Netherlands'}
- Address: ${place.address || 'Not available'}

Generate the following in the local language (Dutch for Belgium/Netherlands):

{
  "aboutUs": "A compelling 2-3 paragraph description of this ${place.category} business. Make it sound professional and welcoming. Mention their expertise in pet care, their passion for animals, and commitment to quality service.",
  "highlights": ["5-6 key selling points or features that make this business stand out"],
  "services": ["8-10 specific services they likely offer based on the category ${place.category}"],
  "description": "A short 1-2 sentence meta description for SEO purposes"
}

Important:
- Write in Dutch (the local language)
- Make it sound authentic and specific to this type of business
- For grooming: mention services like trimmen, wassen, nagels knippen, etc.
- For vets: mention consultaties, vaccinaties, chirurgie, etc.
- For pet shops: mention voeding, accessoires, advies, etc.
- Return ONLY valid JSON, no markdown code blocks`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1000,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";

  // Parse JSON, handling potential markdown code blocks
  let cleanJson = responseText.trim();
  if (cleanJson.startsWith("```json")) {
    cleanJson = cleanJson.slice(7);
  }
  if (cleanJson.startsWith("```")) {
    cleanJson = cleanJson.slice(3);
  }
  if (cleanJson.endsWith("```")) {
    cleanJson = cleanJson.slice(0, -3);
  }

  return JSON.parse(cleanJson.trim());
}

async function getUnenrichedPlaces(countryCode: string, limit: number, offset: number): Promise<Place[]> {
  const places = await sql`
    SELECT
      p.id,
      p.name,
      p.address,
      p.scraped_content,
      ci.name as city,
      c.code as country_code,
      cat.slug as category
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries c ON ci.country_id = c.id
    LEFT JOIN place_categories pc ON p.id = pc.place_id
    LEFT JOIN categories cat ON pc.category_id = cat.id
    WHERE c.code = ${countryCode}
    AND (
      p.scraped_content IS NULL
      OR p.scraped_content::text NOT LIKE '%aboutUs%'
    )
    ORDER BY p.id
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return places as Place[];
}

async function updatePlaceContent(placeId: number, newContent: Record<string, unknown>, existingContent: Record<string, unknown> | null) {
  const mergedContent = {
    ...(existingContent || {}),
    ...newContent,
    enrichedAt: new Date().toISOString(),
    enrichmentSource: "openai-fix-script"
  };

  await sql`
    UPDATE places
    SET scraped_content = ${JSON.stringify(mergedContent)}::jsonb,
        updated_at = NOW()
    WHERE id = ${placeId}
  `;
}

async function main() {
  console.log('\n🔧 FIX UNENRICHED PLACES SCRIPT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 OpenAI API Key:', process.env.OPENAI_API_KEY?.slice(0, 20) + '...');
  console.log('📊 Model: gpt-4o-mini\n');

  // Get count of unenriched places
  const countResult = await sql`
    SELECT COUNT(*) as total
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries c ON ci.country_id = c.id
    WHERE c.code = 'BE'
    AND (p.scraped_content IS NULL OR p.scraped_content::text NOT LIKE '%aboutUs%')
  `;

  const totalUnenriched = Number(countResult[0].total);
  console.log(`📍 Total Belgium places needing enrichment: ${totalUnenriched}\n`);

  if (totalUnenriched === 0) {
    console.log('✅ All Belgium places are already enriched!');
    return;
  }

  let processedCount = 0;
  let successCount = 0;
  let errorCount = 0;
  let offset = 0;

  while (processedCount < totalUnenriched) {
    console.log(`\n📦 Processing batch: offset=${offset}, size=${BATCH_SIZE}`);

    const places = await getUnenrichedPlaces('BE', BATCH_SIZE, offset);

    if (places.length === 0) {
      console.log('✅ No more places to process');
      break;
    }

    console.log(`🔄 Processing ${places.length} places in this batch...`);

    for (const place of places) {
      try {
        console.log(`  → Enriching: ${place.name} (${place.city})`);

        const aiContent = await generateAIContent(place);
        await updatePlaceContent(place.id, aiContent, place.scraped_content as Record<string, unknown> | null);

        successCount++;
        console.log(`    ✅ Success`);
      } catch (error) {
        errorCount++;
        console.error(`    ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      processedCount++;
    }

    offset += BATCH_SIZE;

    // Progress update
    const progress = Math.round((processedCount / totalUnenriched) * 100);
    console.log(`\n📊 Progress: ${processedCount}/${totalUnenriched} (${progress}%)`);
    console.log(`   ✅ Success: ${successCount} | ❌ Errors: ${errorCount}`);

    // Rate limiting delay
    if (processedCount < totalUnenriched) {
      console.log(`⏳ Waiting ${DELAY_BETWEEN_BATCHES / 1000}s before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 ENRICHMENT COMPLETE!');
  console.log(`   📍 Total processed: ${processedCount}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);
