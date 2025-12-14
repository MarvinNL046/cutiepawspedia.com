import "dotenv/config";
import { db } from "@/db";
import { blogPosts } from "@/db/schema/blog";
import { eq } from "drizzle-orm";

async function check() {
  const newSlugs = [
    'hond-bang-vuurwerk-tips',
    'hoe-oud-wordt-kat-levensverwachting',
    'puppy-zindelijk-maken-gids',
    'kat-krabt-meubels-oplossingen',
    'beste-hondenvoer-2025-vergelijking',
    'hond-blaft-andere-honden',
    'kat-miauwen-betekenis-geluiden',
    'hond-overgewicht-afvallen',
    'kitten-socialiseren-gouden-periode',
    'hond-riem-lopen-zonder-trekken'
  ];

  console.log('=== NEW BLOG POSTS CHECK ===\n');

  for (const slug of newSlugs) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    if (post) {
      const content = post.contentNl || '';
      const hasLeesOok = content.includes('Lees ook');
      const hasMarkdownLinks = /\[.+?\]\(.+?\)/.test(content);
      const hasFaq = content.includes('Veelgestelde') || content.includes('FAQ');
      const hasConclusie = content.toLowerCase().includes('conclusie');

      console.log('SLUG:', slug);
      console.log('  Content length:', content.length, 'chars');
      console.log('  Has FAQ:', hasFaq ? '✅' : '❌');
      console.log('  Has Conclusie:', hasConclusie ? '✅' : '❌');
      console.log('  Has Lees ook:', hasLeesOok ? '✅' : '❌');
      console.log('  Has Markdown links:', hasMarkdownLinks ? '✅' : '❌');

      // Show a sample of the Lees ook section
      if (hasLeesOok) {
        const leesOokMatch = content.match(/## Lees ook[\s\S]*?(?=##|$)/);
        if (leesOokMatch) {
          console.log('  Lees ook preview:', leesOokMatch[0].substring(0, 300).replace(/\n/g, ' | ').trim());
        }
      }
      console.log('');
    } else {
      console.log('SLUG:', slug, '- NOT FOUND\n');
    }
  }
  process.exit(0);
}

check();
