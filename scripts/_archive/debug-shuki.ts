import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  const result = await sql`
    SELECT
      name,
      scraped_content
    FROM places
    WHERE slug = 'shukis-dog-services'
    LIMIT 1
  `;
  if (result[0]) {
    const sc = result[0].scraped_content as Record<string, unknown> | null;
    console.log("=== SHUKIS DOG SERVICES - DATABASE CONTENT ===");
    console.log("content_source:", result[0].content_source);
    if (sc) {
      console.log("\nKeys in scraped_content:", Object.keys(sc).join(", "));
      if (sc.aboutUs) console.log("\naboutUs length:", String(sc.aboutUs).length, "chars");
      if (sc.googleReviews) console.log("googleReviews count:", (sc.googleReviews as unknown[]).length);
      if (sc.facts) console.log("\nfacts:", JSON.stringify(sc.facts, null, 2));
      if (sc.highlights) console.log("\nhighlights:", JSON.stringify(sc.highlights, null, 2));
      if (sc.services) console.log("\nservices:", JSON.stringify(sc.services, null, 2));
    }
  } else {
    console.log("Place not found");
  }
}
main().catch(console.error);
