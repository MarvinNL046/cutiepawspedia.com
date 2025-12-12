import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function checkPlace() {
  // Find the specific place with all fields
  const place = await sql`
    SELECT p.id, p.name, p.slug, p.address, p.postal_code, p.phone, p.website,
           p.lat, p.lng, p.opening_hours, p.avg_rating, p.review_count,
           p.scraped_content, ci.name as city
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    WHERE p.slug LIKE '%trim-me-up-scotty%'
    LIMIT 1
  `;
  
  if (place.length > 0) {
    const p = place[0];
    console.log('\n📍 TRIM ME UP SCOTTY - VOLLEDIGE DATA:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  📛 Name:', p.name);
    console.log('  🏙️  City:', p.city);
    console.log('  📍 Address:', p.address || '❌ GEEN');
    console.log('  📮 Postal:', p.postal_code || '❌ GEEN');
    console.log('  📞 Phone:', p.phone || '❌ GEEN');
    console.log('  🌐 Website:', p.website || '❌ GEEN');
    console.log('  🗺️  Lat/Lng:', p.lat && p.lng ? p.lat + ', ' + p.lng : '❌ GEEN');
    console.log('  ⭐ Rating:', p.avg_rating || '❌ GEEN');
    console.log('  📊 Reviews:', p.review_count || '❌ GEEN');
    console.log('  🕐 Opening Hours:', p.opening_hours ? 'JA' : '❌ GEEN');
    if (p.opening_hours) {
      console.log('     ', JSON.stringify(p.opening_hours).substring(0, 150) + '...');
    }
    console.log('  📄 Scraped Content Keys:', p.scraped_content ? Object.keys(p.scraped_content).join(', ') : '❌ GEEN');
  }
  
  // Check stats for all BE places without aboutUs
  console.log('\n\n📊 STATISTIEKEN VOOR 1472 NIET-VERRIJKTE PLACES:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const stats = await sql`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN address IS NOT NULL AND address != '' THEN 1 END) as with_address,
      COUNT(CASE WHEN lat IS NOT NULL AND lng IS NOT NULL THEN 1 END) as with_coords,
      COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as with_phone,
      COUNT(CASE WHEN opening_hours IS NOT NULL THEN 1 END) as with_hours,
      COUNT(CASE WHEN avg_rating > 0 THEN 1 END) as with_rating
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    JOIN countries c ON ci.country_id = c.id
    WHERE c.code = 'BE'
    AND (p.scraped_content IS NULL OR p.scraped_content::text NOT LIKE '%aboutUs%')
  `;
  
  const s = stats[0];
  const t = Number(s.total);
  console.log('  📍 Met address:', s.with_address, '(' + Math.round(Number(s.with_address)/t*100) + '%)');
  console.log('  🗺️  Met lat/lng:', s.with_coords, '(' + Math.round(Number(s.with_coords)/t*100) + '%)');
  console.log('  📞 Met phone:', s.with_phone, '(' + Math.round(Number(s.with_phone)/t*100) + '%)');
  console.log('  🕐 Met opening hours:', s.with_hours, '(' + Math.round(Number(s.with_hours)/t*100) + '%)');
  console.log('  ⭐ Met rating:', s.with_rating, '(' + Math.round(Number(s.with_rating)/t*100) + '%)');
}
checkPlace();
