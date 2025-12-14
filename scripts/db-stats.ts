import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function getStats() {
  console.log('\n📊 DATABASE STATISTICS\n');
  console.log('='.repeat(60));

  // Get country stats (places -> city -> country)
  // Note: avg_rating > 0 means has actual rating (0 = no rating found)
  const countryStats = await sql`
    SELECT
      co.slug as country_slug,
      co.name as country_name,
      COUNT(p.id) as total,
      COUNT(CASE WHEN p.google_cid IS NOT NULL THEN 1 END) as with_cid,
      COUNT(CASE WHEN p.avg_rating > 0 THEN 1 END) as with_rating,
      COUNT(CASE WHEN p.review_count > 0 THEN 1 END) as with_reviews,
      ROUND(AVG(CASE WHEN p.avg_rating > 0 THEN p.avg_rating END)::numeric, 2) as avg_rating,
      SUM(p.review_count) as total_reviews
    FROM places p
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    GROUP BY co.id, co.slug, co.name
    ORDER BY COUNT(p.id) DESC
  `;

  for (const stat of countryStats) {
    const total = Number(stat.total);
    const withCid = Number(stat.with_cid);
    const withRating = Number(stat.with_rating);
    const withReviews = Number(stat.with_reviews);

    console.log(`\n🌍 ${stat.country_name || 'Unknown'} (${stat.country_slug || 'n/a'})`);
    console.log('-'.repeat(40));
    console.log(`  Total places:      ${total.toLocaleString()}`);
    console.log(`  With Google CID:   ${withCid.toLocaleString()} (${Math.round(withCid/total*100)}%)`);
    console.log(`  With rating:       ${withRating.toLocaleString()} (${Math.round(withRating/total*100)}%)`);
    console.log(`  With reviews:      ${withReviews.toLocaleString()} (${Math.round(withReviews/total*100)}%)`);
    console.log(`  Avg rating:        ${stat.avg_rating || 'N/A'}`);
    console.log(`  Total reviews:     ${Number(stat.total_reviews || 0).toLocaleString()}`);
  }

  // Top 10 places by review count
  console.log('\n\n🏆 TOP 10 PLACES BY REVIEW COUNT\n');
  console.log('='.repeat(60));

  const topPlaces = await sql`
    SELECT
      p.name,
      ci.name as city,
      co.slug as country_slug,
      p.review_count,
      p.avg_rating
    FROM places p
    LEFT JOIN cities ci ON p.city_id = ci.id
    LEFT JOIN countries co ON ci.country_id = co.id
    WHERE p.review_count > 0
    ORDER BY p.review_count DESC
    LIMIT 10
  `;

  topPlaces.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (${p.city}, ${p.country_slug})`);
    console.log(`   ⭐ ${p.avg_rating} | 📝 ${Number(p.review_count).toLocaleString()} reviews`);
  });

  // Grand total
  const grandTotal = await sql`SELECT COUNT(*) as count FROM places`;
  console.log(`\n\n📍 GRAND TOTAL PLACES: ${Number(grandTotal[0].count).toLocaleString()}`);

  // Cities count per country
  console.log('\n\n🏙️ CITIES PER COUNTRY\n');
  console.log('='.repeat(60));

  const cityStats = await sql`
    SELECT
      co.name as country_name,
      co.slug as country_slug,
      COUNT(ci.id) as city_count
    FROM countries co
    LEFT JOIN cities ci ON ci.country_id = co.id
    GROUP BY co.id, co.name, co.slug
    ORDER BY COUNT(ci.id) DESC
  `;

  for (const stat of cityStats) {
    console.log(`  ${stat.country_name} (${stat.country_slug}): ${Number(stat.city_count).toLocaleString()} cities`);
  }
}

getStats().catch(e => { console.error(e); process.exit(1); });
