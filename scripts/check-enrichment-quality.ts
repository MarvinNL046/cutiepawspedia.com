/**
 * Check enrichment quality for recently processed places
 * Enriched content is stored in scraped_content jsonb with:
 * - aboutUs: generated text (400-600 words)
 * - highlights: array of 4-6 USPs
 * - services: array of 5-10 services
 * - contentSource: "jina_gpt_rewrite"
 * - contentLanguage: language code
 * - contentGeneratedAt: timestamp
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

async function checkQuality() {
  // Get stats on recently enriched places (using scraped_content jsonb)
  const stats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN scraped_content->>'aboutUs' IS NOT NULL AND LENGTH(scraped_content->>'aboutUs') > 100 THEN 1 END) as with_about_us,
      COUNT(CASE WHEN scraped_content->'services' IS NOT NULL AND jsonb_array_length(scraped_content->'services') > 0 THEN 1 END) as with_services,
      COUNT(CASE WHEN scraped_content->'highlights' IS NOT NULL AND jsonb_array_length(scraped_content->'highlights') > 0 THEN 1 END) as with_highlights,
      AVG(CASE WHEN scraped_content->>'aboutUs' IS NOT NULL THEN LENGTH(scraped_content->>'aboutUs') END)::int as avg_about_length,
      AVG(CASE WHEN scraped_content->'services' IS NOT NULL THEN jsonb_array_length(scraped_content->'services') END) as avg_services,
      COUNT(CASE WHEN scraped_content->>'contentSource' = 'jina_gpt_rewrite' THEN 1 END) as jina_enriched
    FROM places
    WHERE updated_at > NOW() - INTERVAL '2 days'
      AND scraped_content IS NOT NULL
      AND scraped_content->>'aboutUs' IS NOT NULL
  `;

  console.log("=== ENRICHMENT QUALITY REPORT (Last 2 days) ===\n");
  const s = stats[0];
  const total = Number(s.total);

  console.log("📊 TOTAAL:", total, "places met enriched content\n");

  if (total === 0) {
    console.log("Geen recent verrijkte places gevonden.");
    console.log("\nControleer of het enrichment script draait...");
    return;
  }

  const withAboutUs = Number(s.with_about_us);
  const withServices = Number(s.with_services);
  const withHighlights = Number(s.with_highlights);
  const jinaEnriched = Number(s.jina_enriched);

  console.log("📝 CONTENT QUALITY:");
  console.log("   Met aboutUs:", withAboutUs, "/", total, "(" + Math.round(withAboutUs / total * 100) + "%)");
  console.log("   Gem. aboutUs lengte:", s.avg_about_length || 0, "karakters");
  console.log("   Via Jina+GPT:", jinaEnriched, "/", total, "(" + Math.round(jinaEnriched / total * 100) + "%)");

  console.log("\n🛠️  SERVICES & HIGHLIGHTS:");
  console.log("   Met services:", withServices, "/", total, "(" + Math.round(withServices / total * 100) + "%)");
  console.log("   Gem. services:", Number(s.avg_services || 0).toFixed(1), "per place");
  console.log("   Met highlights:", withHighlights, "/", total, "(" + Math.round(withHighlights / total * 100) + "%)");

  // Sample some enriched places
  const samples = await sql`
    SELECT
      name,
      scraped_content->>'aboutUs' as about_us,
      scraped_content->'services' as services,
      scraped_content->'highlights' as highlights,
      scraped_content->>'contentLanguage' as content_lang,
      scraped_content->>'writingStyle' as writing_style,
      updated_at
    FROM places
    WHERE updated_at > NOW() - INTERVAL '2 days'
      AND scraped_content->>'aboutUs' IS NOT NULL
    ORDER BY updated_at DESC
    LIMIT 5
  `;

  console.log("\n📋 VOORBEELDEN:\n");
  for (const p of samples) {
    console.log("---", p.name, "---");
    const aboutUs = (p.about_us as string) || "";
    const wordCount = aboutUs.split(/\s+/).length;
    console.log("   Taal:", p.content_lang || "unknown", "| Stijl:", p.writing_style || "unknown");
    console.log("   AboutUs:", wordCount, "woorden,", aboutUs.length, "karakters");
    console.log("   Preview:", aboutUs.substring(0, 150) + (aboutUs.length > 150 ? "..." : ""));
    const services = (p.services as string[]) || [];
    console.log("   Services:", services.slice(0, 4).join(", ") || "Geen");
    const highlights = (p.highlights as string[]) || [];
    console.log("   Highlights:", highlights.slice(0, 3).join(", ") || "Geen");
    console.log("");
  }

  // Language distribution
  const langStats = await sql`
    SELECT
      scraped_content->>'contentLanguage' as lang,
      COUNT(*) as count
    FROM places
    WHERE updated_at > NOW() - INTERVAL '2 days'
      AND scraped_content->>'aboutUs' IS NOT NULL
    GROUP BY scraped_content->>'contentLanguage'
    ORDER BY count DESC
  `;

  console.log("🌍 TAAL VERDELING:");
  for (const lang of langStats) {
    console.log("   ", lang.lang || "unknown", ":", lang.count, "places");
  }
}

checkQuality().catch(console.error);
