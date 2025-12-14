import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";

async function check() {
  const sql = neon(process.env.DATABASE_URL!);

  const result = await sql`
    SELECT c.slug, COUNT(DISTINCT p.id) as count
    FROM categories c
    LEFT JOIN place_categories pc ON c.id = pc.category_id
    LEFT JOIN places p ON pc.place_id = p.id
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
    GROUP BY c.id, c.slug
    ORDER BY count DESC
  `;

  console.log("Places per categorie (Nederland):\n");
  let total = 0;
  for (const r of result) {
    const slug = String(r.slug).padEnd(20);
    const count = String(r.count).padStart(6);
    console.log(`${slug} ${count} places`);
    total += parseInt(String(r.count));
  }
  console.log(`\nTotaal: ${total} (met duplicates door meerdere categorieën)`);

  // Check hoeveel ZONDER CID per categorie
  console.log("\n\nPlaces ZONDER CID per categorie:\n");

  const withoutCid = await sql`
    SELECT c.slug, COUNT(DISTINCT p.id) as count
    FROM categories c
    LEFT JOIN place_categories pc ON c.id = pc.category_id
    LEFT JOIN places p ON pc.place_id = p.id
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    WHERE co.name = 'Netherlands'
      AND (p.google_cid IS NULL)
    GROUP BY c.id, c.slug
    ORDER BY count DESC
  `;

  for (const r of withoutCid) {
    const slug = String(r.slug).padEnd(20);
    const count = String(r.count).padStart(6);
    console.log(`${slug} ${count} places zonder CID`);
  }

  process.exit(0);
}

check();
