#!/usr/bin/env npx tsx
/**
 * Add more Dutch cities with proper provinces
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

const newCities = [
  // Gelderland
  { name: "Arnhem", slug: "arnhem", province: "Gelderland", provinceSlug: "gelderland" },
  { name: "Apeldoorn", slug: "apeldoorn", province: "Gelderland", provinceSlug: "gelderland" },
  { name: "Ede", slug: "ede", province: "Gelderland", provinceSlug: "gelderland" },

  // Noord-Holland
  { name: "Haarlem", slug: "haarlem", province: "Noord-Holland", provinceSlug: "noord-holland" },
  { name: "Zaanstad", slug: "zaanstad", province: "Noord-Holland", provinceSlug: "noord-holland" },
  { name: "Alkmaar", slug: "alkmaar", province: "Noord-Holland", provinceSlug: "noord-holland" },

  // Zuid-Holland
  { name: "Zoetermeer", slug: "zoetermeer", province: "Zuid-Holland", provinceSlug: "zuid-holland" },
  { name: "Leiden", slug: "leiden", province: "Zuid-Holland", provinceSlug: "zuid-holland" },
  { name: "Dordrecht", slug: "dordrecht", province: "Zuid-Holland", provinceSlug: "zuid-holland" },
  { name: "Delft", slug: "delft", province: "Zuid-Holland", provinceSlug: "zuid-holland" },

  // Noord-Brabant
  { name: "'s-Hertogenbosch", slug: "s-hertogenbosch", province: "Noord-Brabant", provinceSlug: "noord-brabant" },

  // Overijssel
  { name: "Enschede", slug: "enschede", province: "Overijssel", provinceSlug: "overijssel" },
  { name: "Zwolle", slug: "zwolle", province: "Overijssel", provinceSlug: "overijssel" },
  { name: "Deventer", slug: "deventer", province: "Overijssel", provinceSlug: "overijssel" },

  // Utrecht province
  { name: "Amersfoort", slug: "amersfoort", province: "Utrecht", provinceSlug: "utrecht" },

  // Limburg
  { name: "Maastricht", slug: "maastricht", province: "Limburg", provinceSlug: "limburg" },
  { name: "Venlo", slug: "venlo", province: "Limburg", provinceSlug: "limburg" },

  // Friesland
  { name: "Leeuwarden", slug: "leeuwarden", province: "Friesland", provinceSlug: "friesland" },

  // Drenthe
  { name: "Emmen", slug: "emmen", province: "Drenthe", provinceSlug: "drenthe" },

  // Groningen province
  { name: "Groningen", slug: "groningen", province: "Groningen", provinceSlug: "groningen" },
];

async function main() {
  console.log("🏙️ Adding Dutch Cities\n");
  console.log("━".repeat(50));

  // Get Netherlands country ID
  const country = await sql`SELECT id FROM countries WHERE slug = 'netherlands'`;
  const countryId = country[0]?.id;

  if (!countryId) {
    console.error("❌ Netherlands not found!");
    return;
  }

  // Create all required provinces first
  const provinces = [
    { name: "Noord-Holland", slug: "noord-holland" },
    { name: "Zuid-Holland", slug: "zuid-holland" },
    { name: "Utrecht", slug: "utrecht" },
    { name: "Noord-Brabant", slug: "noord-brabant" },
    { name: "Gelderland", slug: "gelderland" },
    { name: "Overijssel", slug: "overijssel" },
    { name: "Limburg", slug: "limburg" },
    { name: "Friesland", slug: "friesland" },
    { name: "Drenthe", slug: "drenthe" },
    { name: "Groningen", slug: "groningen" },
    { name: "Flevoland", slug: "flevoland" },
  ];

  console.log("\n📍 Creating provinces...");
  for (const prov of provinces) {
    // Check if exists first
    const existing = await sql`SELECT id FROM provinces WHERE slug = ${prov.slug}`;
    if (existing.length === 0) {
      await sql`
        INSERT INTO provinces (name, slug, country_id)
        VALUES (${prov.name}, ${prov.slug}, ${countryId})
      `;
      console.log(`   ✅ Created: ${prov.name}`);
    }
  }
  console.log("✅ Provinces ready\n");

  // Add cities
  console.log("🏙️ Adding cities...\n");
  let added = 0;
  let updated = 0;

  for (const city of newCities) {
    // Get province ID
    const province = await sql`SELECT id FROM provinces WHERE slug = ${city.provinceSlug}`;
    const provinceId = province[0]?.id;

    // Check if city exists
    const existing = await sql`SELECT id, province_id FROM cities WHERE slug = ${city.slug}`;

    if (existing.length === 0) {
      await sql`
        INSERT INTO cities (name, slug, country_id, province_id)
        VALUES (${city.name}, ${city.slug}, ${countryId}, ${provinceId})
      `;
      console.log(`✅ Added: ${city.name} (${city.province})`);
      added++;
    } else if (!existing[0].province_id && provinceId) {
      await sql`
        UPDATE cities SET province_id = ${provinceId}
        WHERE id = ${existing[0].id}
      `;
      console.log(`📝 Updated province: ${city.name} → ${city.province}`);
      updated++;
    } else {
      console.log(`⏭️  Exists: ${city.name}`);
    }
  }

  // Update existing cities without provinces
  const cityProvinceMap = [
    { citySlug: "eindhoven", provinceSlug: "noord-brabant" },
    { citySlug: "tilburg", provinceSlug: "noord-brabant" },
    { citySlug: "breda", provinceSlug: "noord-brabant" },
    { citySlug: "nijmegen", provinceSlug: "gelderland" },
    { citySlug: "almere", provinceSlug: "flevoland" },
  ];

  for (const map of cityProvinceMap) {
    const province = await sql`SELECT id FROM provinces WHERE slug = ${map.provinceSlug}`;
    if (province[0]?.id) {
      const result = await sql`
        UPDATE cities SET province_id = ${province[0].id}
        WHERE slug = ${map.citySlug} AND province_id IS NULL
        RETURNING id
      `;
      if (result.length > 0) {
        console.log(`📝 Updated province: ${map.citySlug} → ${map.provinceSlug}`);
        updated++;
      }
    }
  }

  // Summary
  console.log("\n" + "━".repeat(50));
  console.log("📊 Summary\n");
  console.log(`   Added: ${added}`);
  console.log(`   Updated: ${updated}`);

  // Show all cities
  const allCities = await sql`
    SELECT c.name, c.slug, p.name as province, COUNT(pl.id) as places
    FROM cities c
    LEFT JOIN provinces p ON c.province_id = p.id
    LEFT JOIN places pl ON pl.city_id = c.id
    GROUP BY c.id, c.name, c.slug, p.name
    ORDER BY c.name
  `;

  console.log("\n🏙️ All cities:");
  allCities.forEach((c: any) => {
    console.log(`   ${c.name} (${c.province || "no province"}): ${c.places} places`);
  });
}

main().catch(console.error);
