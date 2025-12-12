/**
 * Blog Content Translation Script
 *
 * Translates existing Dutch (NL) blog content to English (EN), German (DE), and French (FR)
 * using OpenAI gpt-4o-mini model.
 *
 * Usage:
 *   npx tsx scripts/translate-blog-content.ts           # Translate all missing content
 *   npx tsx scripts/translate-blog-content.ts --dry-run # Show what would be translated
 *   npx tsx scripts/translate-blog-content.ts --post-slug=my-post # Translate specific post
 *   npx tsx scripts/translate-blog-content.ts --categories-only   # Only translate categories
 *   npx tsx scripts/translate-blog-content.ts --tags-only         # Only translate tags
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables FIRST before any other imports
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: true,
});

import OpenAI from "openai";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, isNotNull } from "drizzle-orm";
import { blogPosts, blogCategories, blogTags } from "@/db/schema/blog";
import * as schema from "@/db/schema";

// Create db instance after dotenv is loaded
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ============================================================================
// CONFIG
// ============================================================================

const MODEL = "gpt-4o-mini"; // User requirement: "4o-mini geen andere"
const DELAY_MS = 500; // Delay between API calls to avoid rate limits

type TargetLocale = "en" | "de" | "fr";

// ============================================================================
// OPENAI CLIENT
// ============================================================================

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ============================================================================
// TRANSLATION PROMPTS
// ============================================================================

const SYSTEM_PROMPTS: Record<TargetLocale, string> = {
  en: `You are a translator. Translate Dutch text to English.
IMPORTANT: Only translate, do NOT expand or add content. Keep the exact same length and structure.
If input is 5 words, output should be ~5 words. Do NOT write articles or explanations.
Respond ONLY with the translated text.`,

  de: `Du bist ein Übersetzer. Übersetze niederländischen Text ins Deutsche.
WICHTIG: Nur übersetzen, NICHT erweitern oder Inhalt hinzufügen. Behalte die exakt gleiche Länge und Struktur.
Wenn die Eingabe 5 Wörter hat, sollte die Ausgabe ~5 Wörter haben. Schreibe KEINE Artikel oder Erklärungen.
Antworte NUR mit dem übersetzten Text.`,

  fr: `Vous êtes un traducteur. Traduisez le texte néerlandais en français.
IMPORTANT: Traduisez uniquement, n'ajoutez PAS de contenu. Gardez exactement la même longueur et structure.
Si l'entrée fait 5 mots, la sortie devrait faire ~5 mots. N'écrivez PAS d'articles ou d'explications.
Répondez UNIQUEMENT avec le texte traduit.`,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateText(
  text: string,
  targetLocale: TargetLocale
): Promise<string> {
  if (!text || text.trim() === "") {
    return "";
  }

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS[targetLocale] },
      { role: "user", content: text },
    ],
    temperature: 0.3, // Low temperature for more consistent translations
    max_tokens: 4000,
  });

  return response.choices[0]?.message?.content?.trim() || "";
}

// ============================================================================
// TRANSLATE BLOG CATEGORIES
// ============================================================================

async function translateBlogCategories(dryRun: boolean): Promise<void> {
  console.log("\n📁 Translating blog categories...\n");

  const categories = await db
    .select({
      id: blogCategories.id,
      slug: blogCategories.slug,
      nameNl: blogCategories.nameNl,
      nameEn: blogCategories.nameEn,
      nameDe: blogCategories.nameDe,
      nameFr: blogCategories.nameFr,
      descriptionNl: blogCategories.descriptionNl,
      descriptionEn: blogCategories.descriptionEn,
      descriptionDe: blogCategories.descriptionDe,
      descriptionFr: blogCategories.descriptionFr,
      metaTitleNl: blogCategories.metaTitleNl,
      metaTitleEn: blogCategories.metaTitleEn,
      metaTitleDe: blogCategories.metaTitleDe,
      metaTitleFr: blogCategories.metaTitleFr,
      metaDescriptionNl: blogCategories.metaDescriptionNl,
      metaDescriptionEn: blogCategories.metaDescriptionEn,
      metaDescriptionDe: blogCategories.metaDescriptionDe,
      metaDescriptionFr: blogCategories.metaDescriptionFr,
    })
    .from(blogCategories);

  console.log(`Found ${categories.length} categories\n`);

  let translatedCount = 0;

  for (const category of categories) {
    // Check which translations are missing
    const needsDe = !category.nameDe && category.nameNl;
    const needsFr = !category.nameFr && category.nameNl;

    if (!needsDe && !needsFr) {
      console.log(`✅ ${category.slug} - all translations present`);
      continue;
    }

    const needs = [needsDe ? "de" : "", needsFr ? "fr" : ""].filter(Boolean);
    console.log(`🔄 ${category.slug} - needs: ${needs.join(", ")}`);

    if (dryRun) {
      continue;
    }

    // Translate to German
    if (needsDe) {
      console.log(`   Translating to DE...`);
      const nameDe = category.nameNl ? await translateText(category.nameNl, "de") : null;
      await sleep(DELAY_MS);
      const descriptionDe = category.descriptionNl ? await translateText(category.descriptionNl, "de") : null;
      await sleep(DELAY_MS);
      const metaTitleDe = category.metaTitleNl ? await translateText(category.metaTitleNl, "de") : null;
      await sleep(DELAY_MS);
      const metaDescriptionDe = category.metaDescriptionNl ? await translateText(category.metaDescriptionNl, "de") : null;
      await sleep(DELAY_MS);

      await db
        .update(blogCategories)
        .set({
          nameDe,
          descriptionDe,
          metaTitleDe,
          metaDescriptionDe,
        })
        .where(eq(blogCategories.id, category.id));
      console.log(`   ✅ DE translated`);
    }

    // Translate to French
    if (needsFr) {
      console.log(`   Translating to FR...`);
      const nameFr = category.nameNl ? await translateText(category.nameNl, "fr") : null;
      await sleep(DELAY_MS);
      const descriptionFr = category.descriptionNl ? await translateText(category.descriptionNl, "fr") : null;
      await sleep(DELAY_MS);
      const metaTitleFr = category.metaTitleNl ? await translateText(category.metaTitleNl, "fr") : null;
      await sleep(DELAY_MS);
      const metaDescriptionFr = category.metaDescriptionNl ? await translateText(category.metaDescriptionNl, "fr") : null;
      await sleep(DELAY_MS);

      await db
        .update(blogCategories)
        .set({
          nameFr,
          descriptionFr,
          metaTitleFr,
          metaDescriptionFr,
        })
        .where(eq(blogCategories.id, category.id));
      console.log(`   ✅ FR translated`);
    }

    translatedCount++;
  }

  console.log(
    `\n${dryRun ? "Would translate" : "Translated"} ${translatedCount} categories\n`
  );
}

// ============================================================================
// TRANSLATE BLOG TAGS
// ============================================================================

async function translateBlogTags(dryRun: boolean): Promise<void> {
  console.log("\n🏷️ Translating blog tags...\n");

  const tags = await db
    .select({
      id: blogTags.id,
      slug: blogTags.slug,
      nameNl: blogTags.nameNl,
      nameEn: blogTags.nameEn,
      nameDe: blogTags.nameDe,
      nameFr: blogTags.nameFr,
    })
    .from(blogTags);

  console.log(`Found ${tags.length} tags\n`);

  let translatedCount = 0;

  for (const tag of tags) {
    const needsDe = !tag.nameDe && tag.nameNl;
    const needsFr = !tag.nameFr && tag.nameNl;

    if (!needsDe && !needsFr) {
      console.log(`✅ ${tag.slug} - all translations present`);
      continue;
    }

    const needs = [needsDe ? "de" : "", needsFr ? "fr" : ""].filter(Boolean);
    console.log(`🔄 ${tag.slug} - needs: ${needs.join(", ")}`);

    if (dryRun) {
      continue;
    }

    // Translate to German
    if (needsDe && tag.nameNl) {
      const nameDe = await translateText(tag.nameNl, "de");
      await db
        .update(blogTags)
        .set({ nameDe })
        .where(eq(blogTags.id, tag.id));
      console.log(`   ✅ DE: "${nameDe}"`);
      await sleep(DELAY_MS);
    }

    // Translate to French
    if (needsFr && tag.nameNl) {
      const nameFr = await translateText(tag.nameNl, "fr");
      await db
        .update(blogTags)
        .set({ nameFr })
        .where(eq(blogTags.id, tag.id));
      console.log(`   ✅ FR: "${nameFr}"`);
      await sleep(DELAY_MS);
    }

    translatedCount++;
  }

  console.log(
    `\n${dryRun ? "Would translate" : "Translated"} ${translatedCount} tags\n`
  );
}

// ============================================================================
// TRANSLATE BLOG POSTS
// ============================================================================

async function translateBlogPosts(
  dryRun: boolean,
  postSlug?: string
): Promise<void> {
  console.log("\n📝 Translating blog posts...\n");

  // Build query conditions
  const conditions = [isNotNull(blogPosts.contentNl)];

  if (postSlug) {
    conditions.push(eq(blogPosts.slug, postSlug));
  }

  // Find posts that have NL content
  const posts = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      titleNl: blogPosts.titleNl,
      titleDe: blogPosts.titleDe,
      titleFr: blogPosts.titleFr,
      excerptNl: blogPosts.excerptNl,
      excerptDe: blogPosts.excerptDe,
      excerptFr: blogPosts.excerptFr,
      contentNl: blogPosts.contentNl,
      contentDe: blogPosts.contentDe,
      contentFr: blogPosts.contentFr,
      metaTitleNl: blogPosts.metaTitleNl,
      metaTitleDe: blogPosts.metaTitleDe,
      metaTitleFr: blogPosts.metaTitleFr,
      metaDescriptionNl: blogPosts.metaDescriptionNl,
      metaDescriptionDe: blogPosts.metaDescriptionDe,
      metaDescriptionFr: blogPosts.metaDescriptionFr,
    })
    .from(blogPosts)
    .where(and(...conditions));

  console.log(`Found ${posts.length} posts with NL content\n`);

  let translatedCount = 0;

  for (const post of posts) {
    // Check which translations are missing
    const needsDe = !post.contentDe && post.contentNl;
    const needsFr = !post.contentFr && post.contentNl;

    if (!needsDe && !needsFr) {
      console.log(`✅ ${post.slug} - all translations present`);
      continue;
    }

    const needs = [needsDe ? "de" : "", needsFr ? "fr" : ""].filter(Boolean);
    console.log(`🔄 ${post.slug} - needs: ${needs.join(", ")}`);

    if (dryRun) {
      continue;
    }

    // Translate to German
    if (needsDe) {
      console.log(`   Translating to DE...`);
      const titleDe = post.titleNl ? await translateText(post.titleNl, "de") : null;
      await sleep(DELAY_MS);
      const excerptDe = post.excerptNl ? await translateText(post.excerptNl, "de") : null;
      await sleep(DELAY_MS);
      const contentDe = post.contentNl ? await translateText(post.contentNl, "de") : null;
      await sleep(DELAY_MS);
      const metaTitleDe = post.metaTitleNl ? await translateText(post.metaTitleNl, "de") : null;
      await sleep(DELAY_MS);
      const metaDescriptionDe = post.metaDescriptionNl ? await translateText(post.metaDescriptionNl, "de") : null;
      await sleep(DELAY_MS);

      await db
        .update(blogPosts)
        .set({
          titleDe,
          excerptDe,
          contentDe,
          metaTitleDe,
          metaDescriptionDe,
        })
        .where(eq(blogPosts.id, post.id));
      console.log(`   ✅ DE translated`);
    }

    // Translate to French
    if (needsFr) {
      console.log(`   Translating to FR...`);
      const titleFr = post.titleNl ? await translateText(post.titleNl, "fr") : null;
      await sleep(DELAY_MS);
      const excerptFr = post.excerptNl ? await translateText(post.excerptNl, "fr") : null;
      await sleep(DELAY_MS);
      const contentFr = post.contentNl ? await translateText(post.contentNl, "fr") : null;
      await sleep(DELAY_MS);
      const metaTitleFr = post.metaTitleNl ? await translateText(post.metaTitleNl, "fr") : null;
      await sleep(DELAY_MS);
      const metaDescriptionFr = post.metaDescriptionNl ? await translateText(post.metaDescriptionNl, "fr") : null;
      await sleep(DELAY_MS);

      await db
        .update(blogPosts)
        .set({
          titleFr,
          excerptFr,
          contentFr,
          metaTitleFr,
          metaDescriptionFr,
        })
        .where(eq(blogPosts.id, post.id));
      console.log(`   ✅ FR translated`);
    }

    translatedCount++;
  }

  console.log(
    `\n${dryRun ? "Would translate" : "Translated"} ${translatedCount} posts\n`
  );
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const categoriesOnly = args.includes("--categories-only");
  const tagsOnly = args.includes("--tags-only");
  const postSlugArg = args.find((a) => a.startsWith("--post-slug="));
  const postSlug = postSlugArg ? postSlugArg.split("=")[1] : undefined;

  console.log("\n🌐 Blog Content Translation Script");
  console.log("===================================");
  console.log(`Model: ${MODEL}`);
  console.log(`Dry run: ${dryRun}`);
  if (postSlug) console.log(`Post slug: ${postSlug}`);
  if (categoriesOnly) console.log(`Mode: Categories only`);
  if (tagsOnly) console.log(`Mode: Tags only`);

  if (!process.env.OPENAI_API_KEY) {
    console.error("\n❌ OPENAI_API_KEY not set in environment");
    process.exit(1);
  }

  try {
    if (categoriesOnly) {
      await translateBlogCategories(dryRun);
    } else if (tagsOnly) {
      await translateBlogTags(dryRun);
    } else {
      // Translate all
      await translateBlogCategories(dryRun);
      await translateBlogTags(dryRun);
      await translateBlogPosts(dryRun, postSlug);
    }

    console.log("\n✅ Translation complete!\n");
  } catch (error) {
    console.error("\n❌ Translation failed:", error);
    process.exit(1);
  }
}

main();
