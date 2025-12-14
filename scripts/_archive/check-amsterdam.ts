import { db } from "../db";
import { places, cities } from "../db/schema";
import { eq, ilike } from "drizzle-orm";

async function checkAmsterdam() {
  // 1. Find Amsterdam city
  const amsterdam = await db.query.cities.findFirst({
    where: ilike(cities.name, "amsterdam"),
    with: { country: true }
  });
  console.log("Amsterdam city:", amsterdam);

  // 2. Count places with Amsterdam cityId
  if (amsterdam) {
    const amsterdamPlaces = await db.query.places.findMany({
      where: eq(places.cityId, amsterdam.id),
      limit: 20,
      columns: { id: true, name: true, address: true }
    });
    console.log("\nPlaces with cityId=" + amsterdam.id + " (Amsterdam):", amsterdamPlaces.length);
    amsterdamPlaces.slice(0, 10).forEach(p => {
      console.log("- " + p.name + " | " + (p.address || "no address"));
    });
  }

  // 3. Check what city slug "amsterdam" resolves to
  const bySlug = await db.query.cities.findFirst({
    where: eq(cities.slug, "amsterdam"),
  });
  console.log("\nCity by slug 'amsterdam':", bySlug?.name, bySlug?.id);

  process.exit(0);
}

checkAmsterdam();
