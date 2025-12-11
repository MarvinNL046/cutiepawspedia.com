/**
 * Fix Blog Post Content v2
 *
 * Better extraction of content from TSX files
 * Handles both JSX-rendered content and post.content object patterns
 *
 * Run with: npx tsx scripts/fix-blog-content-v2.ts
 */

import "dotenv/config";
import { db } from "@/db";
import { blogPosts } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

function extractContent(tsxContent: string): string {
  // Method 1: Try to extract from post.content = `...` pattern
  const contentMatch = tsxContent.match(/content:\s*`([\s\S]*?)`\s*,?\s*(?:tags:|relatedPosts:|}\s*;)/);
  if (contentMatch && contentMatch[1].length > 500) {
    console.log("  Found post.content pattern");
    return contentMatch[1].trim();
  }

  // Method 2: Try to extract from inline JSX content
  let markdown = "";

  // Extract intro paragraph
  const introMatch = tsxContent.match(/<p className="text-lg[^"]*font-medium[^>]*>\s*([\s\S]*?)\s*<\/p>/);
  if (introMatch) {
    const intro = introMatch[1].replace(/<[^>]+>/g, '').trim();
    markdown += intro + "\n\n";
  }

  // Find all h2 sections with their content
  const h2Pattern = /<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>([\s\S]*?)(?=<h2|<BetweenContentAd|<\/article>|{\/\* FAQ|<section)/g;
  let h2Match;
  while ((h2Match = h2Pattern.exec(tsxContent)) !== null) {
    const title = h2Match[1].replace(/<[^>]+>/g, '').trim();
    if (title) {
      markdown += `## ${title}\n\n`;
    }

    const sectionContent = h2Match[2];

    // Extract paragraphs
    const pPattern = /<p[^>]*>\s*([\s\S]*?)\s*<\/p>/g;
    let pMatch;
    while ((pMatch = pPattern.exec(sectionContent)) !== null) {
      let text = pMatch[1]
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<em>/g, '*')
        .replace(/<\/em>/g, '*')
        .replace(/<[^>]+>/g, '')
        .trim();
      if (text && text.length > 5) {
        markdown += text + "\n\n";
      }
    }

    // Extract list items
    const liPattern = /<li[^>]*>\s*([\s\S]*?)\s*<\/li>/g;
    let liMatch;
    let hasLi = false;
    while ((liMatch = liPattern.exec(sectionContent)) !== null) {
      let text = liMatch[1]
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<[^>]+>/g, '')
        .trim();
      if (text) {
        markdown += `- ${text}\n`;
        hasLi = true;
      }
    }
    if (hasLi) markdown += "\n";
  }

  // Extract FAQ section
  const faqSection = tsxContent.match(/Veelgestelde vragen[\s\S]*?(<details[\s\S]*?)<\/div>\s*<\/div>/);
  if (faqSection) {
    markdown += "## Veelgestelde vragen\n\n";

    const faqPattern = /<summary[^>]*>\s*([\s\S]*?)\s*<\/summary>\s*<p[^>]*>\s*([\s\S]*?)\s*<\/p>/g;
    let faqMatch;
    while ((faqMatch = faqPattern.exec(faqSection[1])) !== null) {
      const question = faqMatch[1].replace(/<[^>]+>/g, '').trim();
      const answer = faqMatch[2].replace(/<[^>]+>/g, '').trim();
      if (question && answer) {
        markdown += `### ${question}\n\n${answer}\n\n`;
      }
    }
  }

  // Extract related articles
  const relatedMatch = tsxContent.match(/Lees ook deze artikelen[\s\S]*?<\/section>/);
  if (relatedMatch) {
    markdown += "## Lees ook\n\n";
    const linkPattern = /<Link\s+href="([^"]+)"[\s\S]*?<h3[^>]*>\s*([\s\S]*?)\s*<\/h3>/g;
    let linkMatch;
    while ((linkMatch = linkPattern.exec(relatedMatch[0])) !== null) {
      const url = linkMatch[1];
      const title = linkMatch[2].replace(/<[^>]+>/g, '').trim();
      if (title) {
        markdown += `- [${title}](${url})\n`;
      }
    }
  }

  return markdown.trim();
}

async function fixBlogContent() {
  const postsDir = path.join(process.cwd(), "output/blog-posts/nl");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".tsx"));

  console.log(`Found ${files.length} blog post files to process`);

  let updated = 0;
  let errors = 0;

  for (const file of files) {
    const slug = file.replace(".tsx", "");
    const filePath = path.join(postsDir, file);

    try {
      const tsxContent = fs.readFileSync(filePath, "utf-8");
      const markdown = extractContent(tsxContent);

      console.log(`Processing ${slug}...`);

      if (markdown.length < 500) {
        console.warn(`  ⚠️ Short content: ${markdown.length} chars`);
      } else {
        console.log(`  ✅ Content: ${markdown.length} chars`);
      }

      // Update database
      await db.update(blogPosts)
        .set({
          contentNl: markdown,
          contentEn: markdown,
          updatedAt: new Date()
        })
        .where(eq(blogPosts.slug, slug));

      updated++;
    } catch (err) {
      console.error(`❌ Error processing ${slug}:`, err);
      errors++;
    }
  }

  console.log(`\n✅ Content fix complete!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
}

// Run the fix
fixBlogContent()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fix failed:", err);
    process.exit(1);
  });
