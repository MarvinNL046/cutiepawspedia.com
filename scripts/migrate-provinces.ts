/**
 * Provinces Migration Script
 *
 * Adds provinces/states/regions table between countries and cities
 * for better SEO and navigation structure.
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Province data for NL, BE, DE
const provinceData = {
  NL: [
    { slug: "noord-holland", name: "Noord-Holland", code: "NH", lat: 52.5206, lng: 4.7885, cities: ["amsterdam", "haarlem", "zaandam", "hilversum", "alkmaar"] },
    { slug: "zuid-holland", name: "Zuid-Holland", code: "ZH", lat: 51.9851, lng: 4.4966, cities: ["rotterdam", "den-haag", "leiden", "delft", "dordrecht", "gouda", "zoetermeer"] },
    { slug: "utrecht", name: "Utrecht", code: "UT", lat: 52.0907, lng: 5.1214, cities: ["utrecht", "amersfoort", "zeist", "nieuwegein"] },
    { slug: "noord-brabant", name: "Noord-Brabant", code: "NB", lat: 51.5719, lng: 5.0913, cities: ["eindhoven", "tilburg", "breda", "den-bosch", "s-hertogenbosch", "helmond"] },
    { slug: "gelderland", name: "Gelderland", code: "GE", lat: 52.0450, lng: 5.8719, cities: ["arnhem", "nijmegen", "apeldoorn", "ede"] },
    { slug: "overijssel", name: "Overijssel", code: "OV", lat: 52.4388, lng: 6.5016, cities: ["zwolle", "enschede", "almelo", "deventer"] },
    { slug: "limburg", name: "Limburg", code: "LI", lat: 51.4427, lng: 6.0609, cities: ["maastricht", "venlo", "heerlen", "roermond", "sittard"] },
    { slug: "friesland", name: "Friesland", code: "FR", lat: 53.1642, lng: 5.7817, cities: ["leeuwarden", "sneek", "drachten"] },
    { slug: "groningen", name: "Groningen", code: "GR", lat: 53.2194, lng: 6.5665, cities: ["groningen"] },
    { slug: "drenthe", name: "Drenthe", code: "DR", lat: 52.9476, lng: 6.6231, cities: ["assen", "emmen"] },
    { slug: "flevoland", name: "Flevoland", code: "FL", lat: 52.5271, lng: 5.5953, cities: ["almere", "lelystad"] },
    { slug: "zeeland", name: "Zeeland", code: "ZE", lat: 51.4940, lng: 3.8497, cities: ["middelburg", "vlissingen", "goes"] },
  ],
  BE: [
    { slug: "antwerpen", name: "Antwerpen", code: "VAN", lat: 51.2194, lng: 4.4025, cities: ["antwerpen", "mechelen", "turnhout"] },
    { slug: "oost-vlaanderen", name: "Oost-Vlaanderen", code: "VOV", lat: 51.0543, lng: 3.7174, cities: ["gent", "aalst", "dendermonde"] },
    { slug: "west-vlaanderen", name: "West-Vlaanderen", code: "VWV", lat: 51.0536, lng: 3.0822, cities: ["brugge", "oostende", "kortrijk", "roeselare"] },
    { slug: "limburg", name: "Limburg", code: "VLI", lat: 50.9305, lng: 5.3325, cities: ["hasselt", "genk"] },
    { slug: "vlaams-brabant", name: "Vlaams-Brabant", code: "VBR", lat: 50.8878, lng: 4.5624, cities: ["leuven", "vilvoorde"] },
    { slug: "brussels", name: "Brussels", code: "BRU", lat: 50.8503, lng: 4.3517, cities: ["brussel", "brussels", "bruxelles"] },
    { slug: "brabant-wallon", name: "Brabant Wallon", code: "WBR", lat: 50.6330, lng: 4.5303, cities: ["wavre", "ottignies"] },
    { slug: "hainaut", name: "Hainaut", code: "WHT", lat: 50.4542, lng: 4.0521, cities: ["charleroi", "mons", "la-louviere"] },
    { slug: "liege", name: "Liège", code: "WLG", lat: 50.6326, lng: 5.5797, cities: ["liege", "luik", "verviers"] },
    { slug: "luxembourg", name: "Luxembourg", code: "WLX", lat: 49.8153, lng: 5.4189, cities: ["arlon", "bastogne"] },
    { slug: "namur", name: "Namur", code: "WNA", lat: 50.4673, lng: 4.8719, cities: ["namur", "namen"] },
  ],
  DE: [
    { slug: "bayern", name: "Bayern", code: "BY", lat: 48.7904, lng: 11.4979, cities: ["munchen", "muenchen", "munich", "nurnberg", "nuernberg", "augsburg", "regensburg"] },
    { slug: "baden-wurttemberg", name: "Baden-Württemberg", code: "BW", lat: 48.6616, lng: 9.3501, cities: ["stuttgart", "mannheim", "karlsruhe", "freiburg", "heidelberg", "ulm"] },
    { slug: "berlin", name: "Berlin", code: "BE", lat: 52.5200, lng: 13.4050, cities: ["berlin"] },
    { slug: "brandenburg", name: "Brandenburg", code: "BB", lat: 52.4125, lng: 12.5316, cities: ["potsdam", "cottbus"] },
    { slug: "bremen", name: "Bremen", code: "HB", lat: 53.0793, lng: 8.8017, cities: ["bremen", "bremerhaven"] },
    { slug: "hamburg", name: "Hamburg", code: "HH", lat: 53.5511, lng: 9.9937, cities: ["hamburg"] },
    { slug: "hessen", name: "Hessen", code: "HE", lat: 50.6521, lng: 9.1624, cities: ["frankfurt", "wiesbaden", "kassel", "darmstadt"] },
    { slug: "mecklenburg-vorpommern", name: "Mecklenburg-Vorpommern", code: "MV", lat: 53.6127, lng: 12.4296, cities: ["rostock", "schwerin"] },
    { slug: "niedersachsen", name: "Niedersachsen", code: "NI", lat: 52.6367, lng: 9.8451, cities: ["hannover", "braunschweig", "osnabruck", "oldenburg"] },
    { slug: "nordrhein-westfalen", name: "Nordrhein-Westfalen", code: "NW", lat: 51.4332, lng: 7.6616, cities: ["koln", "koeln", "cologne", "dusseldorf", "duesseldorf", "dortmund", "essen", "duisburg", "bochum", "wuppertal", "bonn", "munster", "muenster"] },
    { slug: "rheinland-pfalz", name: "Rheinland-Pfalz", code: "RP", lat: 49.9129, lng: 7.4500, cities: ["mainz", "ludwigshafen", "koblenz", "trier"] },
    { slug: "saarland", name: "Saarland", code: "SL", lat: 49.3964, lng: 7.0230, cities: ["saarbrucken"] },
    { slug: "sachsen", name: "Sachsen", code: "SN", lat: 51.1045, lng: 13.2017, cities: ["dresden", "leipzig", "chemnitz"] },
    { slug: "sachsen-anhalt", name: "Sachsen-Anhalt", code: "ST", lat: 51.9503, lng: 11.6923, cities: ["magdeburg", "halle"] },
    { slug: "schleswig-holstein", name: "Schleswig-Holstein", code: "SH", lat: 54.2194, lng: 9.6961, cities: ["kiel", "lubeck", "flensburg"] },
    { slug: "thuringen", name: "Thüringen", code: "TH", lat: 50.9848, lng: 11.0299, cities: ["erfurt", "jena", "gera"] },
  ],
};

async function runMigration() {
  console.log("🚀 Starting provinces migration...\n");

  try {
    // 1. Check if provinces table exists
    console.log("📊 Checking current database state...");
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'provinces'
      ) as exists
    `;

    const provincesExists = tableCheck[0]?.exists;
    console.log(`   provinces table: ${provincesExists ? "✅ exists" : "❌ missing"}`);

    // 2. Create provinces table if not exists
    if (!provincesExists) {
      console.log("\n📝 Creating provinces table...");
      await sql`
        CREATE TABLE provinces (
          id SERIAL PRIMARY KEY,
          country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
          slug VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          code VARCHAR(10),
          lat NUMERIC(10, 7),
          lng NUMERIC(10, 7),
          description TEXT,
          city_count INTEGER DEFAULT 0 NOT NULL,
          place_count INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      console.log("   ✅ provinces table created");

      // Create indexes
      await sql`CREATE INDEX provinces_country_id_idx ON provinces(country_id)`;
      await sql`CREATE INDEX provinces_slug_country_idx ON provinces(slug, country_id)`;
      console.log("   ✅ indexes created");
    }

    // 3. Check if cities has province_id
    const columnCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'cities' AND column_name = 'province_id'
      ) as exists
    `;

    const provinceIdExists = columnCheck[0]?.exists;
    console.log(`   cities.province_id column: ${provinceIdExists ? "✅ exists" : "❌ missing"}`);

    if (!provinceIdExists) {
      console.log("\n📝 Adding province_id to cities table...");
      await sql`ALTER TABLE cities ADD COLUMN province_id INTEGER REFERENCES provinces(id) ON DELETE SET NULL`;
      await sql`CREATE INDEX cities_province_id_idx ON cities(province_id)`;
      console.log("   ✅ province_id column added");
    }

    // 4. Seed province data
    console.log("\n📝 Seeding province data...\n");

    for (const [countryCode, provinces] of Object.entries(provinceData)) {
      // Get country ID
      const countryResult = await sql`SELECT id FROM countries WHERE code = ${countryCode}`;
      if (!countryResult.length) {
        console.log(`   ⚠️  Country ${countryCode} not found, skipping...`);
        continue;
      }
      const countryId = countryResult[0].id;
      console.log(`   🌍 ${countryCode} (id: ${countryId}):`);

      for (const province of provinces) {
        // Check if province exists
        const existingProvince = await sql`
          SELECT id FROM provinces WHERE slug = ${province.slug} AND country_id = ${countryId}
        `;

        let provinceId: number;

        if (existingProvince.length) {
          provinceId = existingProvince[0].id;
          console.log(`      ✅ ${province.name} already exists (id: ${provinceId})`);
        } else {
          // Insert province
          const insertResult = await sql`
            INSERT INTO provinces (country_id, slug, name, code, lat, lng)
            VALUES (${countryId}, ${province.slug}, ${province.name}, ${province.code}, ${province.lat}, ${province.lng})
            RETURNING id
          `;
          provinceId = insertResult[0].id;
          console.log(`      ✅ ${province.name} created (id: ${provinceId})`);
        }

        // Update cities with province_id
        for (const citySlug of province.cities) {
          const updateResult = await sql`
            UPDATE cities
            SET province_id = ${provinceId}
            WHERE slug = ${citySlug} AND country_id = ${countryId} AND province_id IS NULL
          `;
          if (updateResult.count && updateResult.count > 0) {
            console.log(`         📍 Linked city: ${citySlug}`);
          }
        }
      }
    }

    // 5. Update province counts
    console.log("\n📝 Updating province statistics...");
    await sql`
      UPDATE provinces SET
        city_count = (SELECT COUNT(*) FROM cities WHERE cities.province_id = provinces.id),
        place_count = (
          SELECT COUNT(*)
          FROM places
          JOIN cities ON places.city_id = cities.id
          WHERE cities.province_id = provinces.id
        )
    `;
    console.log("   ✅ Statistics updated");

    // 6. Final verification
    console.log("\n📊 Final verification:");
    const stats = await sql`
      SELECT
        (SELECT COUNT(*) FROM provinces) as province_count,
        (SELECT COUNT(*) FROM cities WHERE province_id IS NOT NULL) as cities_with_province,
        (SELECT COUNT(*) FROM cities WHERE province_id IS NULL) as cities_without_province
    `;
    console.log(`   Total provinces: ${stats[0]?.province_count}`);
    console.log(`   Cities with province: ${stats[0]?.cities_with_province}`);
    console.log(`   Cities without province: ${stats[0]?.cities_without_province}`);

    // Show provinces per country
    const provincesPerCountry = await sql`
      SELECT c.code, c.name, COUNT(p.id) as province_count
      FROM countries c
      LEFT JOIN provinces p ON p.country_id = c.id
      GROUP BY c.id
      ORDER BY c.code
    `;
    console.log("\n   Provinces per country:");
    for (const row of provincesPerCountry) {
      console.log(`      ${row.code}: ${row.province_count} provinces`);
    }

    console.log("\n✅ Provinces migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
