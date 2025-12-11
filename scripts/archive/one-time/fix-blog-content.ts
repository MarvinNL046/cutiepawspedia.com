/**
 * Fix Blog Post Content
 *
 * Extracts full content from TSX files and updates database with proper markdown
 *
 * Run with: npx tsx scripts/fix-blog-content.ts
 */

import "dotenv/config";
import { db } from "@/db";
import { blogPosts } from "@/db/schema/blog";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

// Convert TSX content to markdown
function tsxToMarkdown(tsxContent: string): string {
  let markdown = "";

  // Extract intro paragraph
  const introMatch = tsxContent.match(/<p className="text-lg[^"]*font-medium[^>]*>\s*([\s\S]*?)\s*<\/p>/);
  if (introMatch) {
    markdown += introMatch[1].trim() + "\n\n";
  }

  // Find all h2 sections
  const h2Regex = /<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>/g;
  const sections = tsxContent.split(/<h2/);

  for (let i = 1; i < sections.length; i++) {
    const section = '<h2' + sections[i];

    // Get h2 title
    const h2Match = section.match(/<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>/);
    if (h2Match) {
      const title = h2Match[1].replace(/<[^>]+>/g, '').trim();
      markdown += `## ${title}\n\n`;
    }

    // Get all paragraphs in this section (until next h2 or end)
    const sectionContent = section.split(/<h2/)[0]; // Get content until next h2

    // Extract paragraphs
    const paragraphs = sectionContent.matchAll(/<p className="text-muted-foreground[^>]*>\s*([\s\S]*?)\s*<\/p>/g);
    for (const p of paragraphs) {
      let text = p[1]
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<em>/g, '*')
        .replace(/<\/em>/g, '*')
        .replace(/<[^>]+>/g, '')
        .trim();
      if (text) {
        markdown += text + "\n\n";
      }
    }

    // Extract lists
    const listMatches = sectionContent.matchAll(/<li[^>]*>\s*([\s\S]*?)\s*<\/li>/g);
    let hasListItems = false;
    for (const li of listMatches) {
      let text = li[1]
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<[^>]+>/g, '')
        .trim();
      if (text) {
        markdown += `- ${text}\n`;
        hasListItems = true;
      }
    }
    if (hasListItems) markdown += "\n";
  }

  // Extract FAQ section
  const faqSection = tsxContent.match(/<h2[^>]*>Veelgestelde vragen<\/h2>([\s\S]*?)(?:<\/div>\s*<\/div>\s*{\/\* Tags|<section)/);
  if (faqSection) {
    markdown += "## Veelgestelde vragen\n\n";

    // Extract each FAQ
    const faqs = faqSection[1].matchAll(/<summary[^>]*>\s*([\s\S]*?)\s*<\/summary>\s*<p[^>]*>\s*([\s\S]*?)\s*<\/p>/g);
    for (const faq of faqs) {
      const question = faq[1].replace(/<[^>]+>/g, '').trim();
      const answer = faq[2].replace(/<[^>]+>/g, '').trim();
      markdown += `### ${question}\n\n${answer}\n\n`;
    }
  }

  // Extract related articles section
  const relatedSection = tsxContent.match(/Lees ook deze artikelen[\s\S]*?<\/section>/);
  if (relatedSection) {
    markdown += "## Lees ook\n\n";

    // Extract links
    const links = relatedSection[0].matchAll(/<Link\s+href="([^"]+)"[\s\S]*?<h3[^>]*>\s*([\s\S]*?)\s*<\/h3>/g);
    for (const link of links) {
      const url = link[1];
      const title = link[2].replace(/<[^>]+>/g, '').trim();
      markdown += `- [${title}](${url})\n`;
    }
    markdown += "\n";
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
      const markdown = tsxToMarkdown(tsxContent);

      if (markdown.length < 500) {
        console.warn(`⚠️  Short content for ${slug}: ${markdown.length} chars`);
      }

      // Update database
      const result = await db.update(blogPosts)
        .set({
          contentNl: markdown,
          contentEn: markdown, // Use Dutch as fallback
          updatedAt: new Date()
        })
        .where(eq(blogPosts.slug, slug));

      console.log(`✅ Updated: ${slug} (${markdown.length} chars)`);
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
