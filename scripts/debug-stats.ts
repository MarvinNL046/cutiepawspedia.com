import "dotenv/config";
import { db } from "@/db";
import { places, placeCategories, categories, cities, countries } from "@/db/schema";
import { eq, and, sql, count, gte, lt, gt } from "drizzle-orm";

async function debugRatingDistribution() {
  // Get Netherlands country ID
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, 'netherlands')
  });

  // Get veterinary category ID
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, 'veterinary')
  });

  console.log("Country ID:", country?.id);
  console.log("Category ID:", category?.id);

  if (!country || !category) {
    console.log("Country or category not found");
    process.exit(1);
  }

  // Get all cities in Netherlands
  const countryCities = await db.query.cities.findMany({
    where: eq(cities.countryId, country.id),
    columns: { id: true }
  });
  const cityIds = countryCities.map(c => c.id);
  console.log("Total cities:", cityIds.length);

  // Total places with this category
  const totalResult = await db
    .select({ count: count() })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id)
      )
    );
  console.log("\nTotal places (COUNT):", totalResult[0]?.count);

  // Count DISTINCT places
  const distinctResult = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${places.id})` })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id)
      )
    );
  console.log("Total places (COUNT DISTINCT):", distinctResult[0]?.count);

  // Check for duplicate place entries in the category
  const duplicatesCheck = await db.execute(sql`
    SELECT p.id, p.name, COUNT(*) as occurrence_count
    FROM places p
    INNER JOIN place_categories pc ON pc.place_id = p.id
    WHERE pc.category_id = ${category.id}
    GROUP BY p.id, p.name
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC
    LIMIT 10
  `);
  console.log("\nPlaces appearing multiple times in category:", duplicatesCheck.rows);

  // Proper rating distribution with non-overlapping buckets
  console.log("\n=== CORRECTED Rating Distribution ===");
  const ratingBuckets = [
    { label: "5 stars", min: 4.5, max: 5.01 },  // 4.5 - 5.0 inclusive
    { label: "4 stars", min: 3.5, max: 4.5 },   // 3.5 - 4.49
    { label: "3 stars", min: 2.5, max: 3.5 },   // 2.5 - 3.49
    { label: "2 stars", min: 1.5, max: 2.5 },   // 1.5 - 2.49
    { label: "1 star", min: 0, max: 1.5 },       // 0 - 1.49
  ];

  let totalInBuckets = 0;
  for (const bucket of ratingBuckets) {
    const result = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${places.id})` })
      .from(places)
      .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
      .where(
        and(
          sql`${places.cityId} IN ${cityIds}`,
          eq(placeCategories.categoryId, category.id),
          sql`${places.avgRating} >= ${bucket.min}`,
          sql`${places.avgRating} < ${bucket.max}`,
          gt(places.reviewCount, 0)
        )
      );
    const count = Number(result[0]?.count) || 0;
    totalInBuckets += count;
    console.log(`${bucket.label} (${bucket.min}-${bucket.max}): ${count}`);
  }
  console.log("Total in buckets:", totalInBuckets);

  // Total rated places
  const ratedResult = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${places.id})` })
    .from(places)
    .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
    .where(
      and(
        sql`${places.cityId} IN ${cityIds}`,
        eq(placeCategories.categoryId, category.id),
        gt(places.reviewCount, 0)
      )
    );
  console.log("\nTotal rated places (distinct):", ratedResult[0]?.count);

  // Check current buggy bucket logic
  console.log("\n=== BUGGY Rating Distribution (current code) ===");
  for (let rating = 5; rating >= 1; rating--) {
    const minRating = rating - 0.5;
    const maxRating = rating + 0.49;

    const result = await db
      .select({ count: count() })
      .from(places)
      .innerJoin(placeCategories, eq(placeCategories.placeId, places.id))
      .where(
        and(
          sql`${places.cityId} IN ${cityIds}`,
          eq(placeCategories.categoryId, category.id),
          sql`${places.avgRating} >= ${minRating}`,
          sql`${places.avgRating} < ${maxRating + 0.01}`
        )
      );
    console.log(`${rating} stars (${minRating} to ${maxRating + 0.01}): ${result[0]?.count}`);
  }

  process.exit(0);
}

debugRatingDistribution();
