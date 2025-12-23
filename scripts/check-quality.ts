import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function check() {
  // Quick status
  const stats = await sql`
    SELECT COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'jina_gpt_rewrite') as n FROM places
  `;
  const recent = await sql`
    SELECT name, updated_at FROM places WHERE scraped_content->>'contentSource' = 'jina_gpt_rewrite' ORDER BY updated_at DESC LIMIT 1
  `;

  const count = parseInt(stats[0].n as string);
  const pct = ((count / 10000) * 100).toFixed(1);
  const bars = Math.floor(count / 250);
  console.log('Verrijkt: ' + count + ' / 10.000 (' + pct + '%)');
  console.log('█'.repeat(bars) + '░'.repeat(40 - bars));
  console.log('Laatste: ' + recent[0]?.name + ' (' + new Date(recent[0]?.updated_at as string).toLocaleTimeString('nl-NL') + ')');

  if (process.argv.includes('--quick')) return;

  const examples = await sql`
    SELECT
      p.name,
      c.name as city,
      co.name as country,
      co.code as country_code,
      p.scraped_content->>'aboutUs' as about,
      p.scraped_content->>'services' as services,
      p.scraped_content->>'highlights' as highlights,
      p.scraped_content->>'contentLanguage' as lang,
      LENGTH(p.scraped_content->>'aboutUs') as content_length
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE p.scraped_content->>'contentSource' = 'jina_gpt_rewrite'
    AND p.scraped_content->>'aboutUs' IS NOT NULL
    LIMIT 5
  `;
  console.log('Found ' + examples.length + ' examples');

  for (const e of examples) {
    console.log('═'.repeat(70));
    console.log(`📍 ${e.name}`);
    console.log(`   ${e.city}, ${e.country} (${e.country_code}) | Taal: ${e.lang || '?'}`);
    console.log(`   📝 ${e.content_length} chars (~${Math.round(Number(e.content_length)/5)} woorden)`);
    if (e.services) console.log(`   🛠️  Services: ${(e.services as string).substring(0, 100)}...`);
    console.log('');
    const preview = e.about ? (e.about as string).substring(0, 800) : 'Geen content';
    console.log(preview);
    if (e.about && (e.about as string).length > 800) console.log('...');
    console.log('');
  }
}

check().catch(console.error);
