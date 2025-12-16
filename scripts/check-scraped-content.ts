/**
 * Check scraped_content structure for places
 */

import "dotenv/config";
import { db } from "../db";
import { places } from "../db/schema";
import { like } from "drizzle-orm";

async function checkScrapedContent() {
  const result = await db.select({
    id: places.id,
    name: places.name,
    city: places.city,
    scrapedContent: places.scrapedContent
  })
  .from(places)
  .where(like(places.city, '%Amsterdam%'))
  .limit(3);

  console.log("Sample scraped_content from Amsterdam places:\n");
  result.forEach(p => {
    console.log(`📍 ${p.name} (${p.city})`);
    console.log("scraped_content keys:", Object.keys(p.scrapedContent || {}));
    const sc = p.scrapedContent as any;
    if (sc) {
      console.log("  - imageUrl:", sc.imageUrl ? "✅ " + sc.imageUrl.substring(0, 50) + "..." : "❌");
      console.log("  - thumbnailUrl:", sc.thumbnailUrl ? "✅" : "❌");
      console.log("  - workStatus:", sc.workStatus || "❌");
      console.log("  - accessibility:", sc.accessibility ? JSON.stringify(sc.accessibility) : "❌");
      console.log("  - serviceOptions:", sc.serviceOptions ? JSON.stringify(sc.serviceOptions) : "❌");
    }
    console.log("");
  });

  process.exit(0);
}

checkScrapedContent();
