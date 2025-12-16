import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function checkWorkStatus() {
  const sql = neon(process.env.DATABASE_URL!);

  const result = await sql`
    SELECT name, city, scraped_content
    FROM places
    WHERE scraped_content->>'workStatus' IS NOT NULL
    LIMIT 5
  `;

  console.log("Places with workStatus:\n");
  result.forEach((p: any) => {
    console.log(`📍 ${p.name} (${p.city})`);
    const sc = p.scraped_content;
    console.log("  workStatus:", sc.workStatus);
    console.log("  openingHours:", sc.openingHours ? JSON.stringify(sc.openingHours) : "❌ Not available");
    console.log("  imageUrl:", sc.imageUrl ? "✅" : "❌");
    console.log("  lastUpdated:", sc.lastUpdated);
    console.log("");
  });
}

checkWorkStatus().catch(console.error);
