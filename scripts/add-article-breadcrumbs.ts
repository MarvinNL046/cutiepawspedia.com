import * as fs from "fs";
import * as path from "path";

const GIDS_PATH = path.join(process.cwd(), "app/[locale]/gids");

// Category title mappings
const categoryTitles: Record<string, string> = {
  "hondenverzorging": "Hondenverzorging",
  "kattenverzorging": "Kattenverzorging",
  "dierengezondheid": "Dierengezondheid",
  "huisdiervoeding": "Huisdiervoeding",
  "huisdiertraining": "Huisdiertraining",
  "professionele-diensten": "Professionele Diensten",
  "reizen-met-huisdieren": "Reizen met Huisdieren",
  "puppies-kittens": "Puppies & Kittens",
  "senior-huisdieren": "Senior Huisdieren",
  "huisdiergedrag": "Huisdiergedrag",
  "dierenwinkel": "Dierenwinkel",
};

// Extract article title from file content
function getArticleTitle(content: string): string | null {
  // Try to find title in metadata
  const metadataMatch = content.match(/title:\s*["']([^"']+)["']/);
  if (metadataMatch) {
    // Extract just the main title before pipe, colon separator, or dash
    const fullTitle = metadataMatch[1];
    const mainTitle = fullTitle.split("|")[0].split(":")[0].split(" - ")[0].trim();
    return mainTitle;
  }
  return null;
}

function processArticleFile(filePath: string, categorySlug: string, articleSlug: string) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already has GidsBreadcrumbs import
  if (content.includes("GidsBreadcrumbs")) {
    console.log(`⏭️  Skipping (already has breadcrumbs): ${filePath}`);
    return;
  }

  const categoryTitle = categoryTitles[categorySlug] || categorySlug;
  const articleTitle = getArticleTitle(content) || articleSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Add the GidsBreadcrumbs import
  // Find existing imports and add after them
  const importPattern = /^(import[^;]+;[\r\n]+)+/m;
  const importMatch = content.match(importPattern);

  if (importMatch) {
    const imports = importMatch[0];
    const newImport = `import { GidsBreadcrumbs } from "@/components/gids";\n`;

    // Check if there's already a lucide-react import
    if (!content.includes('import { GidsBreadcrumbs }')) {
      content = content.replace(importPattern, imports + newImport);
    }
  }

  // Generate the breadcrumb JSX
  const breadcrumbJSX = `
      <GidsBreadcrumbs
        items={[
          { label: "${categoryTitle}", href: "/nl/gids/${categorySlug}" },
          { label: "${articleTitle}" }
        ]}
      />
`;

  // Try different patterns to insert breadcrumbs

  // Pattern 1: return ( ... <div className="bg-background - insert after opening div
  const divPattern = /return\s*\(\s*\n(\s*)<div\s+className="bg-background/;
  const divMatch = content.match(divPattern);

  if (divMatch) {
    const indent = divMatch[1];
    // Insert breadcrumbs after the opening div
    content = content.replace(
      divPattern,
      `return (\n${indent}<>\n${indent}${breadcrumbJSX.trim()}\n${indent}<div className="bg-background`
    );

    // Now we need to close the fragment before the final )
    // Find the closing pattern: </div>\n  );
    const closePattern = /<\/div>\s*\n\s*\);?\s*\n?\s*\}$/;
    const closeMatch = content.match(closePattern);
    if (closeMatch) {
      content = content.replace(closePattern, `</div>\n    </>\n  );\n}`);
    }
  } else {
    // Pattern 2: return ( followed by <> - insert after <>
    const fragmentPattern = /return\s*\(\s*\n\s*<>/;
    const fragmentMatch = content.match(fragmentPattern);

    if (fragmentMatch) {
      content = content.replace(
        fragmentPattern,
        `return (\n    <>\n${breadcrumbJSX}`
      );
    } else {
      // Pattern 3: return ( followed by <section - wrap in fragment
      const sectionPattern = /return\s*\(\s*\n(\s*)<section/;
      const sectionMatch = content.match(sectionPattern);

      if (sectionMatch) {
        const indent = sectionMatch[1];
        content = content.replace(
          sectionPattern,
          `return (\n${indent}<>\n${breadcrumbJSX}\n${indent}<section`
        );

        // Close the fragment
        const closeSectionPattern = /<\/section>\s*\n\s*\);?\s*\n?\s*\}$/;
        if (content.match(closeSectionPattern)) {
          content = content.replace(closeSectionPattern, `</section>\n    </>\n  );\n}`);
        }
      } else {
        console.log(`⚠️  Could not find insertion point: ${filePath}`);
        return;
      }
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Updated: ${filePath}`);
}

// Main execution
console.log("🚀 Adding breadcrumbs to gids article pages...\n");

const categories = fs.readdirSync(GIDS_PATH, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

let totalUpdated = 0;
let totalSkipped = 0;

for (const category of categories) {
  const categoryPath = path.join(GIDS_PATH, category);

  // Get article folders in this category
  const articles = fs.readdirSync(categoryPath, { withFileTypes: true })
    .filter(entry => entry.isDirectory());

  for (const article of articles) {
    const articlePageFile = path.join(categoryPath, article.name, "page.tsx");
    if (fs.existsSync(articlePageFile)) {
      try {
        const content = fs.readFileSync(articlePageFile, "utf-8");
        if (content.includes("GidsBreadcrumbs")) {
          totalSkipped++;
        } else {
          processArticleFile(articlePageFile, category, article.name);
          totalUpdated++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${articlePageFile}:`, error);
      }
    }
  }
}

console.log(`\n✨ Done! Updated ${totalUpdated} files, skipped ${totalSkipped} files.`);
