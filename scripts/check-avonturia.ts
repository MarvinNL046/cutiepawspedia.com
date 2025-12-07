import { db } from "../db/index";
import { places, cities } from "../db/schema";
import { eq, desc, ilike } from "drizzle-orm";

async function check() {
  // Find Avonturia
  const results = await db.select()
    .from(places)
    .where(ilike(places.name, '%vogelkelder%'));

  console.log("Avonturia search:", results.length, "found");
  if (results.length > 0) {
    for (const r of results) {
      console.log({
        id: r.id,
        name: r.name,
        avgRating: r.avgRating,
        reviewCount: r.reviewCount,
        cityId: r.cityId,
        googleEnrichedAt: r.googleEnrichedAt
      });
    }
  }

  // Get Den Haag top 10 by rating
  const denHaag = await db.query.cities.findFirst({
    where: eq(cities.name, "Den Haag")
  });

  if (denHaag) {
    console.log("\nDen Haag city ID:", denHaag.id);

    const top10 = await db.select()
      .from(places)
      .where(eq(places.cityId, denHaag.id))
      .orderBy(desc(places.avgRating), desc(places.reviewCount))
      .limit(10);

    console.log("\nDen Haag top 10 by rating:");
    for (const p of top10) {
      const rating = p.avgRating ? p.avgRating.toFixed(1) : "N/A";
      console.log("  " + rating + " stars (" + p.reviewCount + " reviews) - " + p.name);
    }

    // Check total places in Den Haag
    const total = await db.select()
      .from(places)
      .where(eq(places.cityId, denHaag.id));
    console.log("\nTotal places in Den Haag:", total.length);
  }

  process.exit(0);
}
check();
