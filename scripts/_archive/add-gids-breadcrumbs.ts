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
  "dierenwinkel": "Dierenwinkel & Aanbiedingen",
};

// Article title extraction from file
function getArticleTitle(content: string): string | null {
  // Try to find title in metadata
  const metadataMatch = content.match(/title:\s*["']([^"']+)["']/);
  if (metadataMatch) {
    // Extract just the main title before pipe or other separators
    const fullTitle = metadataMatch[1];
    const mainTitle = fullTitle.split("|")[0].split(":")[0].trim();
    return mainTitle;
  }

  // Try to find h1 in the component
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return null;
}

function generateBreadcrumbsJSX(
  categorySlug: string,
  categoryTitle: string,
  articleSlug?: string,
  articleTitle?: string
): string {
  const isArticle = !!articleSlug;

  const breadcrumbItems = [
    `            <li>
              <Link href="/nl" className="flex items-center gap-1 text-muted-foreground hover:text-cpCoral transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-muted-foreground/50">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link href="/nl/gids" className="text-muted-foreground hover:text-cpCoral transition-colors">
                Gids
              </Link>
            </li>
            <li className="text-muted-foreground/50">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>`
  ];

  if (isArticle) {
    breadcrumbItems.push(`
            <li>
              <Link href="/nl/gids/${categorySlug}" className="text-muted-foreground hover:text-cpCoral transition-colors">
                ${categoryTitle}
              </Link>
            </li>
            <li className="text-muted-foreground/50">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-foreground dark:text-cpCream font-medium line-clamp-1">
              ${articleTitle}
            </li>`);
  } else {
    breadcrumbItems.push(`
            <li className="text-foreground dark:text-cpCream font-medium">
              ${categoryTitle}
            </li>`);
  }

  // Generate Schema.org structured data
  const schemaItems = [
    { name: "Home", item: "https://cutiepawspedia.com/nl" },
    { name: "Gids", item: "https://cutiepawspedia.com/nl/gids" },
    { name: categoryTitle, item: `https://cutiepawspedia.com/nl/gids/${categorySlug}` },
  ];

  if (isArticle && articleTitle) {
    schemaItems.push({
      name: articleTitle,
      item: `https://cutiepawspedia.com/nl/gids/${categorySlug}/${articleSlug}`
    });
  }

  const schemaJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  }, null, 2).replace(/"/g, '\\"').replace(/\n/g, "\\n");

  return `
      {/* Breadcrumbs */}
      <nav className="bg-muted/30 dark:bg-cpCharcoal/50 border-b border-border dark:border-cpAmber/10">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
${breadcrumbItems.join("")}
          </ol>
        </div>
      </nav>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": schemaItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.item
            }))
          })})
        }}
      />
`;
}

function processFile(filePath: string, categorySlug: string, articleSlug?: string) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already has breadcrumbs
  if (content.includes("{/* Breadcrumbs */}")) {
    console.log(`⏭️  Skipping (already has breadcrumbs): ${filePath}`);
    return;
  }

  const categoryTitle = categoryTitles[categorySlug] || categorySlug;
  let articleTitle: string | undefined;

  if (articleSlug) {
    articleTitle = getArticleTitle(content) || articleSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  // Add Home import if not present
  if (!content.includes("Home") && content.includes("lucide-react")) {
    content = content.replace(
      /from "lucide-react";/,
      (match) => {
        const importLine = content.match(/import \{([^}]+)\} from "lucide-react";/);
        if (importLine) {
          const icons = importLine[1].split(",").map(s => s.trim());
          if (!icons.includes("Home")) {
            icons.push("Home");
            return `from "lucide-react";`.replace("from", `{ ${icons.join(", ")} } from`).replace("{ ", "").replace(" } from \"lucide-react\";", " } from \"lucide-react\";");
          }
        }
        return match;
      }
    );

    // Better approach: just add Home to the import
    const lucideImportMatch = content.match(/import \{([^}]+)\} from "lucide-react";/);
    if (lucideImportMatch) {
      const currentIcons = lucideImportMatch[1];
      if (!currentIcons.includes("Home")) {
        content = content.replace(
          lucideImportMatch[0],
          `import {${currentIcons}, Home } from "lucide-react";`
        );
      }
    }
  }

  // Generate breadcrumbs JSX
  const breadcrumbsJSX = generateBreadcrumbsJSX(categorySlug, categoryTitle, articleSlug, articleTitle);

  // Find the right place to insert breadcrumbs - after the first fragment opening or section
  // Look for pattern: return ( \n    <> and insert after it
  const returnMatch = content.match(/return\s*\(\s*\n\s*<>/);
  if (returnMatch) {
    const insertPosition = content.indexOf(returnMatch[0]) + returnMatch[0].length;
    content = content.slice(0, insertPosition) + breadcrumbsJSX + content.slice(insertPosition);
  } else {
    // Try alternate pattern - after first section opening
    const sectionMatch = content.match(/return\s*\(\s*\n\s*<section/);
    if (sectionMatch) {
      const insertPosition = content.indexOf(sectionMatch[0]) + "return (\n".length;
      const beforeSection = content.slice(0, insertPosition);
      const afterSection = content.slice(insertPosition);
      content = beforeSection + "    <>\n" + breadcrumbsJSX + "\n" + afterSection;

      // Also need to close the fragment at the end
      const lastSectionEnd = content.lastIndexOf("</section>");
      if (lastSectionEnd > -1) {
        const endPos = lastSectionEnd + "</section>".length;
        const afterLastSection = content.slice(endPos);
        // Check if there's already a closing fragment
        if (!afterLastSection.trim().startsWith("</>")) {
          content = content.slice(0, endPos) + "\n    </>" + afterLastSection;
        }
      }
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Updated: ${filePath}`);
}

function processDirectory(dirPath: string, parentCategory?: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // This is either a category or an article directory
      const pageFile = path.join(fullPath, "page.tsx");

      if (fs.existsSync(pageFile)) {
        if (parentCategory) {
          // This is an article
          processFile(pageFile, parentCategory, entry.name);
        } else {
          // This is a category
          processFile(pageFile, entry.name);
          // Process articles in this category
          processDirectory(fullPath, entry.name);
        }
      }
    }
  }
}

// Main execution
console.log("🚀 Adding breadcrumbs to gids pages...\n");

// Skip the main gids page and dierenwinkel (already done)
const categoriesToProcess = fs.readdirSync(GIDS_PATH, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .filter(entry => !["dierenwinkel"].includes(entry.name)) // Skip already processed
  .map(entry => entry.name);

for (const category of categoriesToProcess) {
  const categoryPath = path.join(GIDS_PATH, category);
  const categoryPageFile = path.join(categoryPath, "page.tsx");

  if (fs.existsSync(categoryPageFile)) {
    processFile(categoryPageFile, category);
  }

  // Process articles in this category
  const articles = fs.readdirSync(categoryPath, { withFileTypes: true })
    .filter(entry => entry.isDirectory());

  for (const article of articles) {
    const articlePageFile = path.join(categoryPath, article.name, "page.tsx");
    if (fs.existsSync(articlePageFile)) {
      processFile(articlePageFile, category, article.name);
    }
  }
}

console.log("\n✨ Done!");
