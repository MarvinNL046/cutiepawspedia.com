/**
 * About Section Extraction - D1.1.4
 *
 * Extracts "About Us" / "Over Ons" content from websites:
 * - Detects about section headers in multiple languages
 * - Extracts company description, history, mission
 * - Summarizes long content using AI
 * - Preserves key business facts
 */

// ============================================================================
// TYPES
// ============================================================================

export interface AboutSectionResult {
  /** Full extracted about text */
  fullText: string;
  /** Summarized version (if long) */
  summary?: string;
  /** Key extracted facts */
  facts?: AboutFacts;
  /** Source section header that was matched */
  sourceHeader: string;
  /** Detected language */
  language: "nl" | "en" | "de" | "unknown";
  /** Confidence score 0-100 */
  confidence: number;
  /** Character count of full text */
  length: number;
}

export interface AboutFacts {
  /** Year business was established */
  foundedYear?: number;
  /** Number of employees mentioned */
  employeeCount?: string;
  /** Specializations mentioned */
  specializations?: string[];
  /** Key services mentioned */
  services?: string[];
  /** Awards or certifications */
  awards?: string[];
  /** Owner/founder name */
  founderName?: string;
}

interface ParseContext {
  content: string;
  html?: string;
  jinaApiKey?: string;
  maxSummaryLength?: number;
}

// ============================================================================
// SECTION HEADERS
// ============================================================================

const ABOUT_HEADERS: Record<string, string[]> = {
  nl: [
    "over ons",
    "wie zijn wij",
    "wie we zijn",
    "ons verhaal",
    "onze geschiedenis",
    "over",
    "over het bedrijf",
    "welkom bij",
    "onze missie",
    "bedrijfsprofiel",
  ],
  en: [
    "about us",
    "about",
    "who we are",
    "our story",
    "our history",
    "company profile",
    "about the company",
    "welcome to",
    "our mission",
    "meet the team",
  ],
  de: [
    "über uns",
    "wer wir sind",
    "unsere geschichte",
    "unser team",
    "unternehmensprofil",
    "willkommen bei",
    "unsere mission",
    "das unternehmen",
  ],
};

// ============================================================================
// MAIN EXTRACTOR
// ============================================================================

/**
 * Extract about section from content
 */
export async function extractAboutSection(
  context: ParseContext
): Promise<AboutSectionResult | null> {
  const { content, maxSummaryLength = 500 } = context;

  // Detect language
  const language = detectLanguage(content);

  // Strategy 1: Find explicit about section
  const aboutSection = findAboutSection(content, language);
  if (aboutSection && aboutSection.text.length > 50) {
    const facts = extractFacts(aboutSection.text);
    const summary =
      aboutSection.text.length > maxSummaryLength
        ? await generateSummary(aboutSection.text, context.jinaApiKey, maxSummaryLength)
        : undefined;

    return {
      fullText: aboutSection.text,
      summary,
      facts: Object.keys(facts).length > 0 ? facts : undefined,
      sourceHeader: aboutSection.header,
      language,
      confidence: 90,
      length: aboutSection.text.length,
    };
  }

  // Strategy 2: Find description from Schema.org
  if (context.html) {
    const schemaDescription = extractSchemaDescription(context.html);
    if (schemaDescription && schemaDescription.length > 50) {
      return {
        fullText: schemaDescription,
        sourceHeader: "schema.org/description",
        language,
        confidence: 85,
        length: schemaDescription.length,
      };
    }
  }

  // Strategy 3: Find first substantial paragraph
  const firstParagraph = findFirstSubstantialParagraph(content);
  if (firstParagraph && firstParagraph.length > 100) {
    return {
      fullText: firstParagraph,
      sourceHeader: "first paragraph",
      language,
      confidence: 40,
      length: firstParagraph.length,
    };
  }

  return null;
}

// ============================================================================
// SECTION FINDER
// ============================================================================

function findAboutSection(
  content: string,
  language: "nl" | "en" | "de" | "unknown"
): { text: string; header: string } | null {
  const lines = content.split(/[\n\r]+/);
  const headers = language === "unknown"
    ? [...ABOUT_HEADERS.nl, ...ABOUT_HEADERS.en, ...ABOUT_HEADERS.de]
    : ABOUT_HEADERS[language] || [];

  let inAboutSection = false;
  let aboutText: string[] = [];
  let matchedHeader = "";
  let sectionDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    // Check if this line is an about header
    if (!inAboutSection) {
      for (const header of headers) {
        if (lowerLine === header || lowerLine.startsWith(header + ":") || lowerLine.startsWith(header + " ")) {
          inAboutSection = true;
          matchedHeader = line;
          sectionDepth = getLineDepth(line);
          continue;
        }
      }
    }

    if (inAboutSection) {
      // Check for section end (new header at same or higher level)
      if (line.length > 0 && isHeader(line) && getLineDepth(line) <= sectionDepth && aboutText.length > 0) {
        break;
      }

      // Check for other section markers that indicate end
      const endMarkers = [
        "contact", "openingstijden", "opening hours", "öffnungszeiten",
        "diensten", "services", "producten", "products", "prijzen", "prices",
        "team", "medewerkers", "employees", "vacatures", "jobs",
      ];

      if (endMarkers.some((m) => lowerLine.startsWith(m)) && aboutText.length > 0) {
        break;
      }

      // Add non-empty lines
      if (line.length > 0) {
        aboutText.push(line);
      }

      // Stop if we have enough content (3+ paragraphs)
      if (aboutText.join(" ").length > 2000) {
        break;
      }
    }
  }

  if (aboutText.length === 0) return null;

  // Clean and join the text
  const cleanedText = aboutText
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return { text: cleanedText, header: matchedHeader };
}

function getLineDepth(line: string): number {
  // Estimate header depth based on formatting
  if (line.startsWith("#")) {
    return line.match(/^#+/)?.[0].length || 1;
  }
  if (line.toUpperCase() === line && line.length > 3) {
    return 1; // All caps = top level
  }
  return 3; // Default depth
}

function isHeader(line: string): boolean {
  // Check if line looks like a header
  if (line.startsWith("#")) return true;
  if (line.toUpperCase() === line && line.length > 3 && line.length < 50) return true;
  if (line.endsWith(":") && line.length < 50) return true;
  return false;
}

// ============================================================================
// SCHEMA.ORG EXTRACTION
// ============================================================================

function extractSchemaDescription(html: string): string | null {
  try {
    // Look for JSON-LD
    const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const matches = [...html.matchAll(jsonLdPattern)];

    for (const match of matches) {
      try {
        const data = JSON.parse(match[1]);
        const description = findDescription(data);
        if (description && description.length > 50) {
          return description;
        }
      } catch {
        // Invalid JSON
      }
    }

    // Look for meta description
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (metaDesc && metaDesc[1].length > 50) {
      return metaDesc[1];
    }
  } catch (error) {
    console.error("Schema description extraction error:", error);
  }

  return null;
}

function findDescription(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  if ("description" in data && typeof data.description === "string") {
    return data.description;
  }

  if ("@graph" in data && Array.isArray(data["@graph"])) {
    for (const item of data["@graph"]) {
      const desc = findDescription(item);
      if (desc) return desc;
    }
  }

  return null;
}

// ============================================================================
// PARAGRAPH FINDER
// ============================================================================

function findFirstSubstantialParagraph(content: string): string | null {
  const paragraphs = content.split(/\n\n+/);

  for (const paragraph of paragraphs) {
    const cleaned = paragraph.replace(/\s+/g, " ").trim();

    // Skip short paragraphs
    if (cleaned.length < 100) continue;

    // Skip navigation-like content
    if (cleaned.includes("|") && cleaned.split("|").length > 3) continue;

    // Skip menu-like content
    if (/^([A-Z][a-z]+\s*)+$/.test(cleaned)) continue;

    // Skip lists
    if (cleaned.startsWith("-") || cleaned.startsWith("•")) continue;

    // Found a substantial paragraph
    return cleaned;
  }

  return null;
}

// ============================================================================
// FACT EXTRACTION
// ============================================================================

function extractFacts(text: string): AboutFacts {
  const facts: AboutFacts = {};

  // Extract founding year
  const yearPatterns = [
    /(?:sinds|since|gegründet|founded|established|opgericht)\s*(?:in)?\s*(\d{4})/i,
    /(\d{4})\s*(?:opgericht|founded|gegründet)/i,
    /(?:al|already|seit|for)\s*(?:meer dan|more than|over|über)?\s*(\d+)\s*(?:jaar|years?|jahre)/i,
  ];

  for (const pattern of yearPatterns) {
    const match = text.match(pattern);
    if (match) {
      const year = parseInt(match[1], 10);
      if (year > 1800 && year <= new Date().getFullYear()) {
        facts.foundedYear = year;
        break;
      } else if (year > 0 && year < 200) {
        // It's "X years" not a year
        facts.foundedYear = new Date().getFullYear() - year;
        break;
      }
    }
  }

  // Extract employee count
  const employeePatterns = [
    /(\d+)\s*(?:medewerkers|werknemers|employees|staff|mitarbeiter)/i,
    /(?:team\s*(?:of|van|von))?\s*(\d+)\s*(?:people|mensen|personen|leute)/i,
  ];

  for (const pattern of employeePatterns) {
    const match = text.match(pattern);
    if (match) {
      facts.employeeCount = match[1];
      break;
    }
  }

  // Extract specializations (look for "gespecialiseerd in", "specialized in", etc.)
  const specPatterns = [
    /(?:gespecialiseerd|specialized|spezialisiert)\s*(?:in|auf)\s*([^.]+)/i,
    /(?:specialiteit|specialty|spezialität)[:\s]*([^.]+)/i,
  ];

  for (const pattern of specPatterns) {
    const match = text.match(pattern);
    if (match) {
      const specs = match[1]
        .split(/[,&]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2 && s.length < 50);
      if (specs.length > 0) {
        facts.specializations = specs.slice(0, 5);
        break;
      }
    }
  }

  // Extract awards/certifications
  const awardPatterns = [
    /(?:award|prijs|auszeichnung|certificaat|certificering|certification)[:\s]*([^.]+)/gi,
    /(?:winnaar|winner|gewinner)\s*(?:van|of|des)\s*([^.]+)/gi,
  ];

  const awards: string[] = [];
  for (const pattern of awardPatterns) {
    const matches = [...text.matchAll(pattern)];
    for (const match of matches) {
      const award = match[1].trim();
      if (award.length > 3 && award.length < 100) {
        awards.push(award);
      }
    }
  }
  if (awards.length > 0) {
    facts.awards = awards.slice(0, 5);
  }

  return facts;
}

// ============================================================================
// AI SUMMARIZATION
// ============================================================================

async function generateSummary(
  text: string,
  jinaApiKey?: string,
  maxLength = 500
): Promise<string | undefined> {
  if (!jinaApiKey) {
    // Fallback: simple truncation with sentence boundary
    return truncateAtSentence(text, maxLength);
  }

  try {
    // Use Jina AI for summarization
    const response = await fetch("https://api.jina.ai/v1/summarize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jinaApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        max_length: maxLength,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.summary || data.output || truncateAtSentence(text, maxLength);
    }
  } catch (error) {
    console.error("Jina summarization error:", error);
  }

  return truncateAtSentence(text, maxLength);
}

function truncateAtSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Find last sentence boundary before maxLength
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastQuestion = truncated.lastIndexOf("?");
  const lastExclaim = truncated.lastIndexOf("!");

  const lastBoundary = Math.max(lastPeriod, lastQuestion, lastExclaim);

  if (lastBoundary > maxLength * 0.5) {
    return text.substring(0, lastBoundary + 1);
  }

  // Fallback: truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.8) {
    return text.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

function detectLanguage(content: string): "nl" | "en" | "de" | "unknown" {
  const lowerContent = content.toLowerCase();

  const nlMarkers = ["over ons", "openingstijden", "welkom", "wij zijn", "ons team"].filter((m) =>
    lowerContent.includes(m)
  ).length;

  const enMarkers = ["about us", "opening hours", "welcome", "we are", "our team"].filter((m) =>
    lowerContent.includes(m)
  ).length;

  const deMarkers = ["über uns", "öffnungszeiten", "willkommen", "wir sind", "unser team"].filter((m) =>
    lowerContent.includes(m)
  ).length;

  if (nlMarkers > enMarkers && nlMarkers > deMarkers) return "nl";
  if (deMarkers > enMarkers && deMarkers > nlMarkers) return "de";
  if (enMarkers > 0) return "en";

  return "unknown";
}
