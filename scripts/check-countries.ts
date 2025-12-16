import { db } from "../db";
import { countries, places, cities } from "../db/schema";
import { sql as sqlTemplate, count } from "drizzle-orm";

async function main() {
  // Check countries table
  const countryList = await db.select().from(countries).orderBy(countries.name);
  console.log('Countries in countries table:');
  countryList.forEach(c => {
    console.log(`  ${c.id}: ${c.name} (${c.code}) - slug: "${c.slug}"`);
  });
  
  // Check distinct countries in places table  
  const placeCountries = await db.execute(sqlTemplate`
    SELECT 
      country,
      COUNT(*) as place_count
    FROM places 
    GROUP BY country
    ORDER BY place_count DESC
    LIMIT 20
  `);
  console.log('\nDistinct countries in places table:');
  console.log(placeCountries.rows);
  
  // Check cities linked to Australia
  const australiaCountry = countryList.find(c => c.slug === 'australia');
  if (australiaCountry) {
    const australiaCities = await db.select().from(cities).where(sqlTemplate`${cities.countryId} = ${australiaCountry.id}`);
    console.log(`\nCities linked to Australia (country_id=${australiaCountry.id}):`, australiaCities.length);
    australiaCities.slice(0, 10).forEach(c => console.log(`  ${c.name} (${c.slug})`));
  } else {
    console.log('\nNo "australia" country found with slug "australia"');
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
