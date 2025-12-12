#!/usr/bin/env npx tsx
/**
 * Add Missing Dutch Cities to Database
 *
 * Adds cities that are missing from provinces with low coverage.
 * After running this, use discover-places.ts --all-cities to discover
 * pet services in these new cities.
 *
 * Usage:
 *   npx tsx scripts/add-dutch-cities.ts
 *   npx tsx scripts/add-dutch-cities.ts --dry-run
 */

import "dotenv/config";
import { db } from "@/db";
import { cities, provinces, countries } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

// Comprehensive list of Dutch cities per province
// Focus on all cities with population > 20,000 or regional importance
const CITIES_TO_ADD: Record<string, string[]> = {
  // Zeeland - currently 0 cities
  zeeland: [
    "Middelburg",
    "Vlissingen",
    "Goes",
    "Terneuzen",
    "Hulst",
    "Zierikzee",
    "Kapelle",
    "Tholen",
    "Sluis",
    "Veere",
  ],
  // Limburg - currently 2 cities (Maastricht, Venlo)
  limburg: [
    "Roermond",
    "Sittard",
    "Geleen",
    "Heerlen",
    "Weert",
    "Kerkrade",
    "Landgraaf",
    "Brunssum",
    "Stein",
    "Valkenburg",
    "Meerssen",
    "Beek",
    "Horst",
    "Panningen",
    "Tegelen",
  ],
  // Drenthe - currently 1 city (Emmen)
  drenthe: [
    "Assen",
    "Hoogeveen",
    "Meppel",
    "Coevorden",
    "Roden",
    "Beilen",
    "Borger",
    "Zuidlaren",
  ],
  // Friesland - currently 1 city (Leeuwarden)
  friesland: [
    "Sneek",
    "Drachten",
    "Heerenveen",
    "Harlingen",
    "Franeker",
    "Dokkum",
    "Bolsward",
    "Joure",
    "Wolvega",
    "Lemmer",
  ],
  // Groningen - currently 1 city (Groningen)
  groningen: [
    "Veendam",
    "Stadskanaal",
    "Hoogezand",
    "Winschoten",
    "Delfzijl",
    "Appingedam",
    "Leek",
    "Zuidhorn",
  ],
  // Flevoland - currently 1 city (Almere)
  flevoland: [
    "Lelystad",
    "Dronten",
    "Emmeloord",
    "Zeewolde",
    "Urk",
  ],
  // Overijssel - currently 3 cities (Zwolle, Deventer, Enschede)
  overijssel: [
    "Hengelo",
    "Almelo",
    "Kampen",
    "Oldenzaal",
    "Rijssen",
    "Hardenberg",
    "Raalte",
    "Nijverdal",
    "Wierden",
    "Ommen",
    "Steenwijk",
  ],
  // Utrecht - currently 2 cities (Utrecht, Amersfoort)
  utrecht: [
    "Zeist",
    "Nieuwegein",
    "Veenendaal",
    "IJsselstein",
    "Houten",
    "Woerden",
    "Soest",
    "Bilthoven",
    "Driebergen",
    "Bunnik",
    "Maarssen",
    "Breukelen",
  ],
  // Noord-Holland - currently 4 cities (Amsterdam, Haarlem, Alkmaar, Zaanstad)
  "noord-holland": [
    "Hilversum",
    "Purmerend",
    "Hoorn",
    "Den Helder",
    "Heerhugowaard",
    "Amstelveen",
    "Hoofddorp",
    "Beverwijk",
    "Castricum",
    "Heemskerk",
    "Bussum",
    "Naarden",
    "Weesp",
    "Uithoorn",
    "Schagen",
    "Enkhuizen",
    "Medemblik",
  ],
  // Zuid-Holland - currently 6 cities (Rotterdam, Den Haag, Leiden, Delft, Dordrecht, Zoetermeer)
  "zuid-holland": [
    "Gouda",
    "Alphen aan den Rijn",
    "Schiedam",
    "Vlaardingen",
    "Capelle aan den IJssel",
    "Spijkenisse",
    "Ridderkerk",
    "Leidschendam",
    "Voorburg",
    "Rijswijk",
    "Wassenaar",
    "Katwijk",
    "Noordwijk",
    "Oegstgeest",
    "Voorschoten",
    "Hellevoetsluis",
    "Maassluis",
    "Papendrecht",
    "Zwijndrecht",
    "Gorinchem",
  ],
  // Noord-Brabant - currently 4 cities (Eindhoven, Breda, Tilburg, 's-Hertogenbosch)
  "noord-brabant": [
    "Helmond",
    "Roosendaal",
    "Oss",
    "Bergen op Zoom",
    "Waalwijk",
    "Veldhoven",
    "Uden",
    "Veghel",
    "Best",
    "Boxtel",
    "Valkenswaard",
    "Geldrop",
    "Dongen",
    "Oosterhout",
    "Etten-Leur",
    "Cuijk",
  ],
  // Gelderland - currently 4 cities (Arnhem, Nijmegen, Apeldoorn, Ede)
  gelderland: [
    "Doetinchem",
    "Tiel",
    "Wageningen",
    "Zevenaar",
    "Harderwijk",
    "Zutphen",
    "Winterswijk",
    "Barneveld",
    "Veenendaal",
    "Culemborg",
    "Elst",
    "Bemmel",
    "Druten",
    "Wijchen",
    "Nunspeet",
    "Ermelo",
  ],
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║  🏙️  ADD MISSING DUTCH CITIES                             ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");
  console.log("");

  if (isDryRun) {
    console.log("🔍 DRY RUN MODE - no changes will be made\n");
  }

  // Get Netherlands country
  const netherlands = await db.query.countries.findFirst({
    where: eq(countries.slug, "netherlands"),
  });

  if (!netherlands) {
    console.error("❌ Netherlands not found in database");
    process.exit(1);
  }

  console.log(`📍 Country: ${netherlands.name} (ID: ${netherlands.id})\n`);

  // Get all provinces
  const allProvinces = await db.query.provinces.findMany({
    where: eq(provinces.countryId, netherlands.id),
  });

  const provinceMap = new Map(allProvinces.map((p) => [p.slug, p]));

  let totalAdded = 0;
  let totalSkipped = 0;

  for (const [provinceSlug, cityNames] of Object.entries(CITIES_TO_ADD)) {
    const province = provinceMap.get(provinceSlug);

    if (!province) {
      console.log(`⚠️  Province not found: ${provinceSlug}`);
      continue;
    }

    console.log(`\n📍 ${province.name} (${provinceSlug}):`);

    for (const cityName of cityNames) {
      const citySlug = slugify(cityName);

      // Check if city already exists
      const existing = await db.query.cities.findFirst({
        where: and(
          eq(cities.slug, citySlug),
          eq(cities.countryId, netherlands.id)
        ),
      });

      if (existing) {
        console.log(`   ⏭️  ${cityName} - already exists`);
        totalSkipped++;
        continue;
      }

      if (isDryRun) {
        console.log(`   ➕ ${cityName} (${citySlug}) - would add`);
        totalAdded++;
      } else {
        // Insert city
        await db.insert(cities).values({
          name: cityName,
          slug: citySlug,
          countryId: netherlands.id,
          provinceId: province.id,
          placeCount: 0,
        });
        console.log(`   ✅ ${cityName} (${citySlug}) - added`);
        totalAdded++;
      }
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ ${isDryRun ? "Would add" : "Added"}: ${totalAdded} cities`);
  console.log(`   ⏭️  Skipped (already exist): ${totalSkipped} cities`);

  if (isDryRun) {
    console.log("\n💡 Run without --dry-run to actually add cities");
  } else {
    console.log("\n🎉 Done! Now run discovery:");
    console.log("   npx tsx scripts/discover-places.ts --category=veterinary --all-cities");
  }

  process.exit(0);
}

main().catch(console.error);
