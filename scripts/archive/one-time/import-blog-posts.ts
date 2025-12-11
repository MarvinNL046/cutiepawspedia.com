/**
 * Import Generated Blog Posts to Database
 *
 * This script reads the generated .tsx blog posts from /output/blog-posts/nl/
 * and imports them into the database as published blog posts.
 *
 * Run with: npx tsx scripts/import-blog-posts.ts
 */

import "dotenv/config";
import { db } from "@/db";
import { blogPosts, blogCategories, blogTags, blogPostTags } from "@/db/schema/blog";
import { eq, sql } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

// Category mapping from blog topics to database categories
const categoryMapping: Record<string, string> = {
  "dierengezondheid": "pet-health",
  "hondenverzorging": "dog-care",
  "kattenverzorging": "cat-care",
  "huisdiergedrag": "pet-behavior",
  "huisdiertraining": "pet-training",
  "huisdiervoeding": "pet-nutrition",
  "puppies-kittens": "puppies-kittens",
  "professionele-diensten": "professional-services",
  "reizen-met-huisdieren": "pet-travel",
};

// Parse TSX file to extract blog post data
function parsePostFile(filePath: string): {
  slug: string;
  titleNl: string;
  metaDescriptionNl: string;
  contentNl: string;
  featuredImage: string;
  featuredImageAlt: string;
  readingTime: number;
  categorySlug: string;
  tags: string[];
} | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath, ".tsx");

  // Extract metadata
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  const imageMatch = content.match(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/);
  const altMatch = content.match(/alt="([^"]+)"/);
  const readingTimeMatch = content.match(/(\d+)\s*min\s*leestijd/);

  // Extract category from badge
  const categoryBadgeMatch = content.match(/<span[^>]*bg-cpCoral[^>]*>\s*([^<]+)\s*<\/span>/);

  // Convert JSX content to markdown-ish format
  // This is a simplified conversion - extracts text content
  let markdownContent = "";

  // Extract all h2 sections
  const h2Matches = content.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g);
  const pMatches = content.matchAll(/<p[^>]*>([^<]+(?:<[^>]+>[^<]*<\/[^>]+>)*[^<]*)<\/p>/g);

  // Build markdown from the JSX
  // First paragraph (intro)
  const introMatch = content.match(/<p className="text-xl[^>]*>([^<]+)<\/p>/);
  if (introMatch) {
    markdownContent += introMatch[1].trim() + "\n\n";
  }

  // Extract sections between h2 tags
  const sections = content.split(/<h2/);
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const h2TitleMatch = section.match(/[^>]*>([^<]+)<\/h2>/);
    if (h2TitleMatch) {
      markdownContent += `## ${h2TitleMatch[1].trim()}\n\n`;
    }

    // Get paragraphs in this section
    const paragraphs = section.match(/<p>([^<]+)<\/p>/g);
    if (paragraphs) {
      for (const p of paragraphs) {
        const textMatch = p.match(/<p>([^<]+)<\/p>/);
        if (textMatch) {
          markdownContent += textMatch[1].trim() + "\n\n";
        }
      }
    }

    // Get list items
    const listItems = section.match(/<li>([^<]+)<\/li>/g);
    if (listItems) {
      for (const li of listItems) {
        const textMatch = li.match(/<li>([^<]+)<\/li>/);
        if (textMatch) {
          markdownContent += `- ${textMatch[1].trim()}\n`;
        }
      }
      markdownContent += "\n";
    }
  }

  // Map Dutch category name to slug
  let categorySlug = "pet-health"; // default
  if (categoryBadgeMatch) {
    const dutchCategory = categoryBadgeMatch[1].trim().toLowerCase();
    for (const [dutch, slug] of Object.entries(categoryMapping)) {
      if (dutchCategory.includes(dutch.replace("-", " ")) ||
          dutch.includes(dutchCategory.replace(" ", "-"))) {
        categorySlug = slug;
        break;
      }
    }
  }

  // Extract tags if present
  const tags: string[] = [];
  const keywordsMatch = content.match(/keywords:\s*['"]([^'"]+)['"]/);
  if (keywordsMatch) {
    tags.push(...keywordsMatch[1].split(",").map(t => t.trim()));
  }

  if (!titleMatch) {
    console.warn(`Could not parse title from ${filename}`);
    return null;
  }

  return {
    slug: filename,
    titleNl: titleMatch[1].split("|")[0].trim(),
    metaDescriptionNl: descMatch?.[1] || "",
    contentNl: markdownContent || "Content wordt binnenkort toegevoegd.",
    featuredImage: imageMatch?.[1] || "",
    featuredImageAlt: altMatch?.[1] || titleMatch[1],
    readingTime: parseInt(readingTimeMatch?.[1] || "5"),
    categorySlug,
    tags,
  };
}

async function ensureCategories() {
  // Create categories if they don't exist
  const categories = [
    { slug: "pet-health", nameEn: "Pet Health", nameNl: "Dierengezondheid", icon: "🏥" },
    { slug: "dog-care", nameEn: "Dog Care", nameNl: "Hondenverzorging", icon: "🐕" },
    { slug: "cat-care", nameEn: "Cat Care", nameNl: "Kattenverzorging", icon: "🐈" },
    { slug: "pet-behavior", nameEn: "Pet Behavior", nameNl: "Huisdiergedrag", icon: "🧠" },
    { slug: "pet-training", nameEn: "Pet Training", nameNl: "Huisdiertraining", icon: "🎓" },
    { slug: "pet-nutrition", nameEn: "Pet Nutrition", nameNl: "Huisdiervoeding", icon: "🥗" },
    { slug: "puppies-kittens", nameEn: "Puppies & Kittens", nameNl: "Puppies & Kittens", icon: "🐾" },
    { slug: "professional-services", nameEn: "Professional Services", nameNl: "Professionele Diensten", icon: "👨‍⚕️" },
    { slug: "pet-travel", nameEn: "Pet Travel", nameNl: "Reizen met Huisdieren", icon: "✈️" },
  ];

  for (const cat of categories) {
    const existing = await db.select().from(blogCategories).where(eq(blogCategories.slug, cat.slug));
    if (existing.length === 0) {
      await db.insert(blogCategories).values({
        slug: cat.slug,
        nameEn: cat.nameEn,
        nameNl: cat.nameNl,
        icon: cat.icon,
        isActive: true,
        sortOrder: 0,
      });
      console.log(`Created category: ${cat.nameNl}`);
    }
  }
}

async function importPosts() {
  const postsDir = path.join(process.cwd(), "output/blog-posts/nl");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".tsx"));

  console.log(`Found ${files.length} blog post files to import`);

  // Ensure categories exist
  await ensureCategories();

  // Get category IDs
  const categoriesData = await db.select().from(blogCategories);
  const categoryIdMap = new Map(categoriesData.map(c => [c.slug, c.id]));

  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const postData = parsePostFile(filePath);

    if (!postData) {
      console.warn(`Skipping ${file}: could not parse`);
      skipped++;
      continue;
    }

    // Check if post already exists
    const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, postData.slug));
    if (existing.length > 0) {
      console.log(`Skipping ${postData.slug}: already exists`);
      skipped++;
      continue;
    }

    // Get category ID
    const categoryId = categoryIdMap.get(postData.categorySlug);

    // Insert post
    const [newPost] = await db.insert(blogPosts).values({
      slug: postData.slug,
      titleNl: postData.titleNl,
      titleEn: postData.titleNl, // Use Dutch as fallback for now
      contentNl: postData.contentNl,
      contentEn: postData.contentNl, // Use Dutch as fallback
      excerptNl: postData.metaDescriptionNl,
      excerptEn: postData.metaDescriptionNl,
      metaTitleNl: postData.titleNl.slice(0, 60),
      metaTitleEn: postData.titleNl.slice(0, 60),
      metaDescriptionNl: postData.metaDescriptionNl.slice(0, 160),
      metaDescriptionEn: postData.metaDescriptionNl.slice(0, 160),
      featuredImage: postData.featuredImage,
      featuredImageAlt: postData.featuredImageAlt,
      readingTimeMinutes: postData.readingTime,
      categoryId: categoryId || null,
      status: "published",
      publishedAt: new Date(),
      authorName: "CutiePawsPedia Redactie",
    }).returning();

    console.log(`✅ Imported: ${postData.titleNl}`);
    imported++;

    // Create tags and link them
    for (const tagName of postData.tags.slice(0, 5)) { // Max 5 tags per post
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      // Get or create tag
      let [tag] = await db.select().from(blogTags).where(eq(blogTags.slug, tagSlug));
      if (!tag) {
        [tag] = await db.insert(blogTags).values({
          slug: tagSlug,
          nameEn: tagName,
          nameNl: tagName,
          postCount: 0,
        }).returning();
      }

      // Link tag to post
      try {
        await db.insert(blogPostTags).values({
          postId: newPost.id,
          tagId: tag.id,
        });

        // Update tag count
        await db.update(blogTags)
          .set({ postCount: sql`${blogTags.postCount} + 1` })
          .where(eq(blogTags.id, tag.id));
      } catch (e) {
        // Ignore duplicate key errors
      }
    }
  }

  console.log(`\n✅ Import complete!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
}

// Run the import
importPosts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Import failed:", err);
    process.exit(1);
  });
