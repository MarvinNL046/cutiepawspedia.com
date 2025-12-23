import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

async function checkExamples() {
  console.log("📊 VOORBEELDEN VAN VERRIJKTE DATA\n");
  console.log("═".repeat(70));

  // Get places with GOOD enriched data
  const examples = await sql`
    SELECT
      p.id,
      p.name,
      p.slug,
      p.website,
      co.code as country,
      c.slug as city_slug,
      co.slug as country_slug,
      p.scraped_content->>'email' as email,
      p.scraped_content->>'phone' as phone,
      p.scraped_content->'socialMedia' as social,
      p.scraped_content->>'aboutUs' as about_us,
      p.scraped_content->'highlights' as highlights,
      p.scraped_content->'services' as services,
      p.scraped_content->>'contentSource' as content_source
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.scraped_content->>'aboutUs' IS NOT NULL
      AND LENGTH(p.scraped_content->>'aboutUs') > 100
    ORDER BY
      CASE WHEN p.scraped_content->>'email' IS NOT NULL THEN 0 ELSE 1 END,
      RANDOM()
    LIMIT 5
  `;

  for (const ex of examples) {
    console.log(`\n🏢 ${ex.name} (${ex.country})`);
    console.log(`   🔗 URL: /${ex.country_slug}/${ex.city_slug}/${ex.slug}`);
    console.log(`   🌐 Website: ${ex.website || "Geen"}`);

    // Jina metadata
    console.log("\n   📧 JINA METADATA:");
    if (ex.email) console.log(`      Email: ${ex.email}`);
    if (ex.phone) console.log(`      Telefoon: ${ex.phone}`);
    if (ex.social) {
      const s = typeof ex.social === "string" ? JSON.parse(ex.social) : ex.social;
      console.log(`      Social: ${Object.keys(s).join(", ")}`);
    }
    if (!ex.email && !ex.phone && !ex.social) console.log("      (geen metadata)");

    // GPT content
    console.log("\n   📝 GPT CONTENT:");
    if (ex.about_us) {
      const preview = ex.about_us.substring(0, 150).replace(/\n/g, " ") + "...";
      console.log(`      aboutUs: ${preview}`);
    }
    if (ex.highlights) {
      const h = typeof ex.highlights === "string" ? JSON.parse(ex.highlights) : ex.highlights;
      console.log(`      Highlights: ${h.slice(0, 2).join(" | ")}`);
    }
    if (ex.services) {
      const s = typeof ex.services === "string" ? JSON.parse(ex.services) : ex.services;
      console.log(`      Services: ${s.slice(0, 3).join(", ")}`);
    }

    console.log(`\n   📌 Source: ${ex.content_source || "unknown"}`);
    console.log("   " + "─".repeat(60));
  }

  // Summary stats
  console.log("\n\n" + "═".repeat(70));
  console.log("📈 SAMENVATTING\n");

  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE scraped_content->>'aboutUs' IS NOT NULL AND LENGTH(scraped_content->>'aboutUs') > 100) as has_content,
      COUNT(*) FILTER (WHERE scraped_content->>'email' IS NOT NULL) as has_email,
      COUNT(*) FILTER (WHERE scraped_content->>'socialMedia' IS NOT NULL) as has_social,
      COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'openai_generated') as gpt_generated
    FROM places
  `;

  const s = stats[0];
  console.log(`   Totaal places: ${s.total}`);
  console.log(`   Met goede content: ${s.has_content} (${((Number(s.has_content) / Number(s.total)) * 100).toFixed(1)}%)`);
  console.log(`   Met email: ${s.has_email}`);
  console.log(`   Met social: ${s.has_social}`);
  console.log(`   GPT gegenereerd: ${s.gpt_generated}`);
}

checkExamples().catch(console.error);
