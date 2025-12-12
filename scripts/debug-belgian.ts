import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  // Find a recently enriched Belgian place
  const result = await sql`
    SELECT
      p.name,
      p.slug,
      p.scraped_content,
      p.updated_at
    FROM places p
    JOIN cities c ON p.city_id = c.id
    WHERE c.country_id = 2
    AND p.scraped_content IS NOT NULL
    ORDER BY p.updated_at DESC
    LIMIT 3
  `;

  for (const place of result) {
    const sc = place.scraped_content as Record<string, unknown> | null;
    console.log("=== BELGIAN PLACE ===");
    console.log("Name:", place.name);
    console.log("Slug:", place.slug);
    console.log("Updated:", place.updated_at);
    if (sc) {
      console.log("\nKeys:", Object.keys(sc).join(", "));
      if (sc.aboutUs) console.log("\naboutUs length:", String(sc.aboutUs).length, "chars");
      if (sc.googleReviews) console.log("googleReviews count:", (sc.googleReviews as unknown[]).length);
      if (sc.facts) console.log("\nfacts:", JSON.stringify(sc.facts, null, 2));
      else console.log("\nfacts: MISSING");
      if (sc.highlights) console.log("\nhighlights:", JSON.stringify(sc.highlights, null, 2));
      if (sc.services) console.log("\nservices:", JSON.stringify(sc.services, null, 2));
    }
    console.log("\n---\n");
  }
}
main().catch(console.error);
