import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL || '');

async function check() {
  // Check countries
  const countries = await sql`SELECT name, slug, id FROM countries ORDER BY name`;
  console.log('=== COUNTRIES IN DB ===');
  countries.forEach(c => console.log(`  ${c.name} (slug: ${c.slug})`));
  
  // Check places per country
  console.log('\n=== PLACES PER COUNTRY ===');
  const placeCounts = await sql`
    SELECT c.name, c.slug, COUNT(p.id) as count 
    FROM countries c 
    LEFT JOIN places p ON p.country_id = c.id 
    GROUP BY c.id, c.name, c.slug 
    ORDER BY count DESC
  `;
  placeCounts.forEach(pc => console.log(`  ${pc.name}: ${pc.count} places`));
  
  // Check cities for Spain
  console.log('\n=== CITIES IN SPAIN ===');
  const spainCities = await sql`
    SELECT ci.name, ci.slug 
    FROM cities ci 
    JOIN countries co ON ci.country_id = co.id 
    WHERE co.slug = 'spain' 
    LIMIT 10
  `;
  if (spainCities.length > 0) {
    spainCities.forEach(c => console.log(`  ${c.name} (${c.slug})`));
  } else {
    console.log('  No cities found for Spain!');
  }
  
  // Check cities for Italy
  console.log('\n=== CITIES IN ITALY ===');
  const italyCities = await sql`
    SELECT ci.name, ci.slug 
    FROM cities ci 
    JOIN countries co ON ci.country_id = co.id 
    WHERE co.slug = 'italy' 
    LIMIT 10
  `;
  if (italyCities.length > 0) {
    italyCities.forEach(c => console.log(`  ${c.name} (${c.slug})`));
  } else {
    console.log('  No cities found for Italy!');
  }
  
  process.exit(0);
}

check();
