#!/usr/bin/env npx tsx
/**
 * Seed French Cities with Regions (Provinces)
 *
 * Adds France, French regions, and major cities to the database.
 * Run this before running the discovery pipeline for France.
 *
 * Usage:
 *   npx tsx scripts/seed-french-cities.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

// French regions (administrative regions since 2016 reform)
const FRENCH_REGIONS = [
  { name: "Île-de-France", slug: "ile-de-france" },
  { name: "Auvergne-Rhône-Alpes", slug: "auvergne-rhone-alpes" },
  { name: "Nouvelle-Aquitaine", slug: "nouvelle-aquitaine" },
  { name: "Occitanie", slug: "occitanie" },
  { name: "Hauts-de-France", slug: "hauts-de-france" },
  { name: "Provence-Alpes-Côte d'Azur", slug: "provence-alpes-cote-dazur" },
  { name: "Grand Est", slug: "grand-est" },
  { name: "Pays de la Loire", slug: "pays-de-la-loire" },
  { name: "Bretagne", slug: "bretagne" },
  { name: "Normandie", slug: "normandie" },
  { name: "Bourgogne-Franche-Comté", slug: "bourgogne-franche-comte" },
  { name: "Centre-Val de Loire", slug: "centre-val-de-loire" },
  { name: "Corse", slug: "corse" },
];

// Top 60+ French cities by population with their regions
const FRENCH_CITIES = [
  // Île-de-France (Paris region)
  { name: "Paris", slug: "paris", region: "ile-de-france", lat: 48.8566, lng: 2.3522 },
  { name: "Boulogne-Billancourt", slug: "boulogne-billancourt", region: "ile-de-france", lat: 48.8352, lng: 2.2399 },
  { name: "Saint-Denis", slug: "saint-denis", region: "ile-de-france", lat: 48.9362, lng: 2.3574 },
  { name: "Argenteuil", slug: "argenteuil", region: "ile-de-france", lat: 48.9472, lng: 2.2467 },
  { name: "Montreuil", slug: "montreuil", region: "ile-de-france", lat: 48.8638, lng: 2.4486 },
  { name: "Nanterre", slug: "nanterre", region: "ile-de-france", lat: 48.8924, lng: 2.2071 },
  { name: "Créteil", slug: "creteil", region: "ile-de-france", lat: 48.7908, lng: 2.4557 },
  { name: "Versailles", slug: "versailles", region: "ile-de-france", lat: 48.8048, lng: 2.1203 },
  { name: "Vitry-sur-Seine", slug: "vitry-sur-seine", region: "ile-de-france", lat: 48.7875, lng: 2.3924 },
  { name: "Colombes", slug: "colombes", region: "ile-de-france", lat: 48.9232, lng: 2.2527 },

  // Auvergne-Rhône-Alpes
  { name: "Lyon", slug: "lyon", region: "auvergne-rhone-alpes", lat: 45.7640, lng: 4.8357 },
  { name: "Saint-Étienne", slug: "saint-etienne", region: "auvergne-rhone-alpes", lat: 45.4397, lng: 4.3872 },
  { name: "Grenoble", slug: "grenoble", region: "auvergne-rhone-alpes", lat: 45.1885, lng: 5.7245 },
  { name: "Villeurbanne", slug: "villeurbanne", region: "auvergne-rhone-alpes", lat: 45.7676, lng: 4.8799 },
  { name: "Clermont-Ferrand", slug: "clermont-ferrand", region: "auvergne-rhone-alpes", lat: 45.7772, lng: 3.0870 },
  { name: "Annecy", slug: "annecy", region: "auvergne-rhone-alpes", lat: 45.8992, lng: 6.1294 },
  { name: "Valence", slug: "valence", region: "auvergne-rhone-alpes", lat: 44.9334, lng: 4.8924 },
  { name: "Chambéry", slug: "chambery", region: "auvergne-rhone-alpes", lat: 45.5646, lng: 5.9178 },

  // Nouvelle-Aquitaine
  { name: "Bordeaux", slug: "bordeaux", region: "nouvelle-aquitaine", lat: 44.8378, lng: -0.5792 },
  { name: "Limoges", slug: "limoges", region: "nouvelle-aquitaine", lat: 45.8336, lng: 1.2611 },
  { name: "Poitiers", slug: "poitiers", region: "nouvelle-aquitaine", lat: 46.5802, lng: 0.3404 },
  { name: "Pau", slug: "pau", region: "nouvelle-aquitaine", lat: 43.2951, lng: -0.3708 },
  { name: "La Rochelle", slug: "la-rochelle", region: "nouvelle-aquitaine", lat: 46.1603, lng: -1.1511 },
  { name: "Mérignac", slug: "merignac", region: "nouvelle-aquitaine", lat: 44.8386, lng: -0.6438 },
  { name: "Biarritz", slug: "biarritz", region: "nouvelle-aquitaine", lat: 43.4832, lng: -1.5586 },
  { name: "Bayonne", slug: "bayonne", region: "nouvelle-aquitaine", lat: 43.4929, lng: -1.4748 },

  // Occitanie
  { name: "Toulouse", slug: "toulouse", region: "occitanie", lat: 43.6047, lng: 1.4442 },
  { name: "Montpellier", slug: "montpellier", region: "occitanie", lat: 43.6108, lng: 3.8767 },
  { name: "Nîmes", slug: "nimes", region: "occitanie", lat: 43.8367, lng: 4.3601 },
  { name: "Perpignan", slug: "perpignan", region: "occitanie", lat: 42.6887, lng: 2.8948 },
  { name: "Béziers", slug: "beziers", region: "occitanie", lat: 43.3448, lng: 3.2154 },
  { name: "Carcassonne", slug: "carcassonne", region: "occitanie", lat: 43.2130, lng: 2.3491 },
  { name: "Albi", slug: "albi", region: "occitanie", lat: 43.9298, lng: 2.1480 },

  // Hauts-de-France
  { name: "Lille", slug: "lille", region: "hauts-de-france", lat: 50.6292, lng: 3.0573 },
  { name: "Amiens", slug: "amiens", region: "hauts-de-france", lat: 49.8942, lng: 2.2957 },
  { name: "Roubaix", slug: "roubaix", region: "hauts-de-france", lat: 50.6942, lng: 3.1746 },
  { name: "Tourcoing", slug: "tourcoing", region: "hauts-de-france", lat: 50.7262, lng: 3.1612 },
  { name: "Dunkerque", slug: "dunkerque", region: "hauts-de-france", lat: 51.0343, lng: 2.3768 },
  { name: "Calais", slug: "calais", region: "hauts-de-france", lat: 50.9513, lng: 1.8587 },
  { name: "Valenciennes", slug: "valenciennes", region: "hauts-de-france", lat: 50.3570, lng: 3.5235 },

  // Provence-Alpes-Côte d'Azur
  { name: "Marseille", slug: "marseille", region: "provence-alpes-cote-dazur", lat: 43.2965, lng: 5.3698 },
  { name: "Nice", slug: "nice", region: "provence-alpes-cote-dazur", lat: 43.7102, lng: 7.2620 },
  { name: "Toulon", slug: "toulon", region: "provence-alpes-cote-dazur", lat: 43.1242, lng: 5.9280 },
  { name: "Aix-en-Provence", slug: "aix-en-provence", region: "provence-alpes-cote-dazur", lat: 43.5297, lng: 5.4474 },
  { name: "Avignon", slug: "avignon", region: "provence-alpes-cote-dazur", lat: 43.9493, lng: 4.8055 },
  { name: "Cannes", slug: "cannes", region: "provence-alpes-cote-dazur", lat: 43.5528, lng: 7.0174 },
  { name: "Antibes", slug: "antibes", region: "provence-alpes-cote-dazur", lat: 43.5808, lng: 7.1239 },

  // Grand Est
  { name: "Strasbourg", slug: "strasbourg", region: "grand-est", lat: 48.5734, lng: 7.7521 },
  { name: "Reims", slug: "reims", region: "grand-est", lat: 49.2583, lng: 4.0317 },
  { name: "Metz", slug: "metz", region: "grand-est", lat: 49.1193, lng: 6.1757 },
  { name: "Mulhouse", slug: "mulhouse", region: "grand-est", lat: 47.7508, lng: 7.3359 },
  { name: "Nancy", slug: "nancy", region: "grand-est", lat: 48.6921, lng: 6.1844 },
  { name: "Colmar", slug: "colmar", region: "grand-est", lat: 48.0793, lng: 7.3589 },
  { name: "Troyes", slug: "troyes", region: "grand-est", lat: 48.2973, lng: 4.0744 },

  // Pays de la Loire
  { name: "Nantes", slug: "nantes", region: "pays-de-la-loire", lat: 47.2184, lng: -1.5536 },
  { name: "Le Mans", slug: "le-mans", region: "pays-de-la-loire", lat: 48.0061, lng: 0.1996 },
  { name: "Angers", slug: "angers", region: "pays-de-la-loire", lat: 47.4784, lng: -0.5632 },
  { name: "Saint-Nazaire", slug: "saint-nazaire", region: "pays-de-la-loire", lat: 47.2733, lng: -2.2138 },
  { name: "La Roche-sur-Yon", slug: "la-roche-sur-yon", region: "pays-de-la-loire", lat: 46.6705, lng: -1.4269 },

  // Bretagne
  { name: "Rennes", slug: "rennes", region: "bretagne", lat: 48.1173, lng: -1.6778 },
  { name: "Brest", slug: "brest", region: "bretagne", lat: 48.3904, lng: -4.4861 },
  { name: "Quimper", slug: "quimper", region: "bretagne", lat: 47.9960, lng: -4.0999 },
  { name: "Lorient", slug: "lorient", region: "bretagne", lat: 47.7486, lng: -3.3710 },
  { name: "Vannes", slug: "vannes", region: "bretagne", lat: 47.6587, lng: -2.7600 },
  { name: "Saint-Brieuc", slug: "saint-brieuc", region: "bretagne", lat: 48.5141, lng: -2.7600 },
  { name: "Saint-Malo", slug: "saint-malo", region: "bretagne", lat: 48.6493, lng: -2.0056 },

  // Normandie
  { name: "Le Havre", slug: "le-havre", region: "normandie", lat: 49.4944, lng: 0.1079 },
  { name: "Rouen", slug: "rouen", region: "normandie", lat: 49.4432, lng: 1.0999 },
  { name: "Caen", slug: "caen", region: "normandie", lat: 49.1829, lng: -0.3707 },
  { name: "Cherbourg", slug: "cherbourg", region: "normandie", lat: 49.6337, lng: -1.6222 },
  { name: "Évreux", slug: "evreux", region: "normandie", lat: 49.0270, lng: 1.1508 },

  // Bourgogne-Franche-Comté
  { name: "Dijon", slug: "dijon", region: "bourgogne-franche-comte", lat: 47.3220, lng: 5.0415 },
  { name: "Besançon", slug: "besancon", region: "bourgogne-franche-comte", lat: 47.2378, lng: 6.0241 },
  { name: "Belfort", slug: "belfort", region: "bourgogne-franche-comte", lat: 47.6400, lng: 6.8628 },
  { name: "Chalon-sur-Saône", slug: "chalon-sur-saone", region: "bourgogne-franche-comte", lat: 46.7815, lng: 4.8556 },

  // Centre-Val de Loire
  { name: "Tours", slug: "tours", region: "centre-val-de-loire", lat: 47.3941, lng: 0.6848 },
  { name: "Orléans", slug: "orleans", region: "centre-val-de-loire", lat: 47.9029, lng: 1.9039 },
  { name: "Bourges", slug: "bourges", region: "centre-val-de-loire", lat: 47.0810, lng: 2.3988 },
  { name: "Blois", slug: "blois", region: "centre-val-de-loire", lat: 47.5861, lng: 1.3359 },
  { name: "Chartres", slug: "chartres", region: "centre-val-de-loire", lat: 48.4469, lng: 1.4844 },

  // Corse
  { name: "Ajaccio", slug: "ajaccio", region: "corse", lat: 41.9192, lng: 8.7386 },
  { name: "Bastia", slug: "bastia", region: "corse", lat: 42.6976, lng: 9.4509 },
];

async function main() {
  console.log("🇫🇷 Seeding France: Country, Regions & Cities\n");
  console.log("━".repeat(60));

  // Step 1: Create or get France
  let countryResult = await sql`
    SELECT id FROM countries WHERE code = 'FR'
  `;

  let countryId: number;

  if (countryResult.length === 0) {
    console.log("\n📌 Creating France in countries table...");
    const inserted = await sql`
      INSERT INTO countries (code, name, slug)
      VALUES ('FR', 'France', 'france')
      RETURNING id
    `;
    countryId = inserted[0].id;
    console.log(`✅ Created France with id ${countryId}`);
  } else {
    countryId = countryResult[0].id;
    console.log(`✅ France already exists with id ${countryId}`);
  }

  // Step 2: Create regions (provinces)
  console.log("\n📌 Creating regions (provinces)...\n");

  const regionMap = new Map<string, number>();
  let regionsAdded = 0;
  let regionsSkipped = 0;

  for (const region of FRENCH_REGIONS) {
    const existing = await sql`
      SELECT id FROM provinces WHERE slug = ${region.slug} AND country_id = ${countryId}
    `;

    if (existing.length > 0) {
      regionMap.set(region.slug, existing[0].id);
      console.log(`⏭️  ${region.name} (already exists)`);
      regionsSkipped++;
    } else {
      const result = await sql`
        INSERT INTO provinces (country_id, name, slug)
        VALUES (${countryId}, ${region.name}, ${region.slug})
        RETURNING id
      `;
      regionMap.set(region.slug, result[0].id);
      console.log(`✅ ${region.name}`);
      regionsAdded++;
    }
  }

  console.log(`\n   Regions added: ${regionsAdded}, skipped: ${regionsSkipped}`);

  // Step 3: Create cities
  console.log("\n📌 Creating cities...\n");

  const existingCities = await sql`
    SELECT slug FROM cities WHERE country_id = ${countryId}
  `;
  const existingSlugs = new Set(existingCities.map(c => c.slug));

  let citiesAdded = 0;
  let citiesSkipped = 0;

  for (const city of FRENCH_CITIES) {
    if (existingSlugs.has(city.slug)) {
      console.log(`⏭️  ${city.name} (already exists)`);
      citiesSkipped++;
      continue;
    }

    const provinceId = regionMap.get(city.region);

    await sql`
      INSERT INTO cities (country_id, province_id, name, slug, lat, lng)
      VALUES (${countryId}, ${provinceId || null}, ${city.name}, ${city.slug}, ${city.lat}, ${city.lng})
    `;
    console.log(`✅ ${city.name} (${city.region})`);
    citiesAdded++;
  }

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("📊 Summary\n");
  console.log(`   Country:  France (id: ${countryId})`);
  console.log(`   Regions:  ${regionsAdded} added, ${regionsSkipped} existed`);
  console.log(`   Cities:   ${citiesAdded} added, ${citiesSkipped} existed`);
  console.log(`   Total cities: ${citiesAdded + citiesSkipped}`);

  console.log("\n📋 Next steps:");
  console.log("   1. npx tsx scripts/discover-places-fr.ts --category=veterinary --city=Paris --dry-run");
  console.log("   2. npx tsx scripts/discover-places-fr.ts --category=veterinary --all-cities --limit=15");
  console.log("   3. Later: enrich with Maps dataset for opening hours");
  console.log("");
}

main().catch(console.error);
