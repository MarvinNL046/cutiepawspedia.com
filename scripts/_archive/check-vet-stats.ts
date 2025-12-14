import "dotenv/config";
import { db } from "@/db";
import { places, cities, countries } from "@/db/schema";
import { eq, sql, desc, and } from "drizzle-orm";

async function checkVeterinaryStats() {
  // Check what category slugs we have
  console.log("=== PLACES BY CATEGORY (Netherlands) ===");
  const placesPerCategory = await db.select({
    category: places.category,
    count: sql<number>`count(*)`,
  })
  .from(places)
  .innerJoin(cities, eq(places.cityId, cities.id))
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(eq(countries.slug, 'netherlands'))
  .groupBy(places.category)
  .orderBy(desc(sql`count(*)`));

  placesPerCategory.forEach(p => {
    console.log(`${p.category}: ${p.count} places`);
  });

  // Get veterinary stats specifically
  console.log("\n=== VETERINARY STATS (Netherlands) ===");
  const vetStats = await db.select({
    totalPlaces: sql<number>`count(*)`,
    avgRating: sql<number>`round(avg(${places.avgRating})::numeric, 2)`,
    totalReviews: sql<number>`sum(${places.reviewCount})`,
    verifiedCount: sql<number>`count(*) filter (where ${places.isVerified} = true)`,
    premiumCount: sql<number>`count(*) filter (where ${places.isPremium} = true)`
  })
  .from(places)
  .innerJoin(cities, eq(places.cityId, cities.id))
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(and(
    eq(places.category, 'veterinary'),
    eq(countries.slug, 'netherlands')
  ));

  console.log(vetStats[0]);

  // Sample veterinary places
  console.log("\n=== TOP 15 VETERINARY PLACES (by reviews) ===");
  const sampleVets = await db.select({
    name: places.name,
    city: cities.name,
    rating: places.avgRating,
    reviews: places.reviewCount,
    verified: places.isVerified
  })
  .from(places)
  .innerJoin(cities, eq(places.cityId, cities.id))
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(and(
    eq(places.category, 'veterinary'),
    eq(countries.slug, 'netherlands')
  ))
  .orderBy(desc(places.reviewCount))
  .limit(15);

  sampleVets.forEach(v => {
    const check = v.verified ? '✓' : '';
    console.log(`- ${v.name} (${v.city}) - Rating: ${v.rating} - ${v.reviews} reviews ${check}`);
  });

  // Cities with most vets
  console.log("\n=== CITIES WITH MOST VETS ===");
  const citiesWithVets = await db.select({
    city: cities.name,
    count: sql<number>`count(*)`,
    avgRating: sql<number>`round(avg(${places.avgRating})::numeric, 2)`
  })
  .from(places)
  .innerJoin(cities, eq(places.cityId, cities.id))
  .innerJoin(countries, eq(cities.countryId, countries.id))
  .where(and(
    eq(places.category, 'veterinary'),
    eq(countries.slug, 'netherlands')
  ))
  .groupBy(cities.name)
  .orderBy(desc(sql`count(*)`))
  .limit(10);

  citiesWithVets.forEach(c => {
    console.log(`${c.city}: ${c.count} vets (avg: ${c.avgRating})`);
  });

  process.exit(0);
}

checkVeterinaryStats();
