/**
 * Fix Junk Categories
 *
 * Fixes places where review text was accidentally stored as category.
 * Gets the real category from place_categories junction table.
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function fixJunkCategories() {
  console.log("=== FIX JUNK CATEGORIES ===\n");

  // 1. Find all places with junk categories
  const junkPlaces = await sql`
    SELECT
      p.id,
      p.name,
      p.scraped_content->>'category' as junk_category,
      p.scraped_content as full_content
    FROM places p
    WHERE LENGTH(p.scraped_content->>'category') > 50
       OR p.scraped_content->>'category' LIKE '%...%'
       OR p.scraped_content->>'category' LIKE '"%'
  `;

  console.log(`Gevonden: ${junkPlaces.length} places met junk categories\n`);

  let fixed = 0;
  let noCategory = 0;
  let errors = 0;

  for (const place of junkPlaces) {
    try {
      // Get the real category from place_categories junction
      const categories = await sql`
        SELECT c.slug, c.label_key
        FROM place_categories pc
        JOIN categories c ON pc.category_id = c.id
        WHERE pc.place_id = ${place.id}
        LIMIT 1
      `;

      if (categories.length > 0) {
        const realCategory = categories[0].label_key; // e.g., "Pet Stores", "Veterinarians"

        // Update scraped_content with the real category
        const updatedContent = {
          ...place.full_content,
          category: realCategory,
          categorySlug: categories[0].slug,
        };

        await sql`
          UPDATE places
          SET scraped_content = ${JSON.stringify(updatedContent)}::jsonb
          WHERE id = ${place.id}
        `;

        console.log(`✅ ${place.id}: "${place.name}" → ${realCategory}`);
        fixed++;
      } else {
        console.log(
          `⚠️  ${place.id}: "${place.name}" - Geen categorie in junction table`
        );
        noCategory++;
      }
    } catch (error: any) {
      console.error(`❌ ${place.id}: Error - ${error.message}`);
      errors++;
    }
  }

  console.log("\n=== RESULTAAT ===");
  console.log(`✅ Fixed: ${fixed}`);
  console.log(`⚠️  Geen categorie: ${noCategory}`);
  console.log(`❌ Errors: ${errors}`);

  // Verify the fix
  const remaining = await sql`
    SELECT COUNT(*) as total
    FROM places
    WHERE LENGTH(scraped_content->>'category') > 50
       OR scraped_content->>'category' LIKE '%...%'
       OR scraped_content->>'category' LIKE '"%'
  `;
  console.log(`\n📊 Resterende junk categories: ${remaining[0].total}`);
}

fixJunkCategories().catch(console.error);
