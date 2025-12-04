/**
 * Opening Hours Parser - D1.1.2
 *
 * Comprehensive multi-language opening hours extraction with:
 * - NL/EN/DE day recognition
 * - Table and list structure parsing
 * - Time range normalization
 * - Jina AI fallback for complex cases
 * - Support for closed days, 24/7, lunch breaks
 */

// ============================================================================
// TYPES
// ============================================================================

export interface OpeningHoursResult {
  /** Standardized opening hours by day (mon, tue, wed, thu, fri, sat, sun) */
  hours: Record<string, DayHours>;
  /** Human-readable text representation */
  text: string;
  /** Confidence score 0-100 */
  confidence: number;
  /** Source of the data: "regex" | "table" | "list" | "jina_ai" */
  source: "regex" | "table" | "list" | "jina_ai" | "schema_org";
  /** Detected language of the source */
  detectedLanguage?: "nl" | "en" | "de" | "unknown";
  /** Any parsing warnings */
  warnings?: string[];
}

export interface DayHours {
  /** Is the business open on this day */
  open: boolean;
  /** Opening time in 24h format HH:MM */
  opens?: string;
  /** Closing time in 24h format HH:MM */
  closes?: string;
  /** For lunch breaks: second opening window */
  opens2?: string;
  closes2?: string;
  /** Is it 24 hours */
  is24h?: boolean;
  /** Raw text for this day */
  raw?: string;
}

interface ParseContext {
  content: string;
  language?: "nl" | "en" | "de";
  jinaApiKey?: string;
  websiteUrl?: string;
}

// ============================================================================
// DAY MAPPINGS
// ============================================================================

const DAY_MAPPINGS: Record<string, string> = {
  // Dutch
  maandag: "mon", ma: "mon",
  dinsdag: "tue", di: "tue",
  woensdag: "wed", wo: "wed",
  donderdag: "thu", do: "thu",
  vrijdag: "fri", vr: "fri",
  zaterdag: "sat", za: "sat",
  zondag: "sun", zo: "sun",
  // English
  monday: "mon", mon: "mon",
  tuesday: "tue", tue: "tue",
  wednesday: "wed", wed: "wed",
  thursday: "thu", thu: "thu",
  friday: "fri", fri: "fri",
  saturday: "sat", sat: "sat",
  sunday: "sun", sun: "sun",
  // German
  montag: "mon", mo: "mon",
  dienstag: "tue",
  mittwoch: "wed", mi: "wed",
  donnerstag: "thu",
  freitag: "fri", fr: "fri",
  samstag: "sat", sa: "sat",
  sonntag: "sun", so: "sun",
};

const CLOSED_INDICATORS: Record<string, string[]> = {
  nl: ["gesloten", "dicht", "rustdag"],
  en: ["closed", "off"],
  de: ["geschlossen", "ruhetag", "zu"],
};

const SECTION_HEADERS: Record<string, string[]> = {
  nl: ["openingstijden", "openingsuren", "wij zijn open", "open"],
  en: ["opening hours", "business hours", "hours of operation", "open"],
  de: ["öffnungszeiten", "geschäftszeiten", "geöffnet"],
};

const ORDERED_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// ============================================================================
// MAIN PARSER
// ============================================================================

/**
 * Parse opening hours from text content
 * Tries multiple strategies in order of reliability
 */
export async function parseOpeningHours(
  context: ParseContext
): Promise<OpeningHoursResult> {
  const { content } = context;
  const warnings: string[] = [];

  // Detect language from content
  const detectedLanguage = detectLanguage(content);

  // Strategy 1: Try to find structured table format
  const tableResult = parseTableFormat(content, detectedLanguage);
  if (tableResult?.hours && Object.keys(tableResult.hours).length >= 5) {
    return {
      hours: tableResult.hours,
      text: tableResult.text || "",
      source: "table",
      detectedLanguage,
      confidence: calculateConfidence(tableResult.hours),
    };
  }

  // Strategy 2: Try list format (markdown or plain text lists)
  const listResult = parseListFormat(content, detectedLanguage);
  if (listResult?.hours && Object.keys(listResult.hours).length >= 5) {
    return {
      hours: listResult.hours,
      text: listResult.text || "",
      source: "list",
      detectedLanguage,
      confidence: calculateConfidence(listResult.hours),
    };
  }

  // Strategy 3: Regex patterns for inline text
  const regexResult = parseRegexPatterns(content, detectedLanguage);
  if (regexResult?.hours && Object.keys(regexResult.hours).length >= 3) {
    return {
      hours: regexResult.hours,
      text: regexResult.text || "",
      source: "regex",
      detectedLanguage,
      confidence: calculateConfidence(regexResult.hours),
    };
  }

  // Strategy 4: Jina AI fallback for complex cases
  if (context.jinaApiKey && context.websiteUrl) {
    try {
      const jinaResult = await parseWithJinaAI(context);
      if (jinaResult?.hours && Object.keys(jinaResult.hours).length >= 3) {
        return {
          hours: jinaResult.hours,
          text: jinaResult.text || "",
          source: "jina_ai",
          detectedLanguage,
          confidence: Math.min(jinaResult.confidence || 80, 85), // Cap AI confidence
        };
      }
    } catch (error) {
      warnings.push(`Jina AI fallback failed: ${error}`);
    }
  }

  // Return partial results if any
  const combinedHours = {
    ...regexResult?.hours,
    ...listResult?.hours,
    ...tableResult?.hours,
  };

  if (Object.keys(combinedHours).length > 0) {
    return {
      hours: combinedHours,
      text: generateTextFromHours(combinedHours),
      confidence: calculateConfidence(combinedHours),
      source: "regex",
      detectedLanguage,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  // No hours found
  return {
    hours: {},
    text: "",
    confidence: 0,
    source: "regex",
    detectedLanguage,
    warnings: ["No opening hours found in content"],
  };
}

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

function detectLanguage(content: string): "nl" | "en" | "de" | "unknown" {
  const lowerContent = content.toLowerCase();

  // Count language-specific markers
  const nlMarkers = ["maandag", "dinsdag", "openingstijden", "gesloten", "uur"].filter(
    (m) => lowerContent.includes(m)
  ).length;

  const enMarkers = ["monday", "tuesday", "opening hours", "closed", "hours"].filter(
    (m) => lowerContent.includes(m)
  ).length;

  const deMarkers = ["montag", "dienstag", "öffnungszeiten", "geschlossen", "uhr"].filter(
    (m) => lowerContent.includes(m)
  ).length;

  if (nlMarkers > enMarkers && nlMarkers > deMarkers) return "nl";
  if (deMarkers > enMarkers && deMarkers > nlMarkers) return "de";
  if (enMarkers > 0) return "en";

  return "unknown";
}

// ============================================================================
// TABLE FORMAT PARSER
// ============================================================================

function parseTableFormat(
  content: string,
  language: "nl" | "en" | "de" | "unknown"
): Partial<OpeningHoursResult> | null {
  const hours: Record<string, DayHours> = {};

  // Look for table-like structures (pipe-separated or tab-separated)
  // Pattern: Day | Time | Time  OR  Day: Time - Time
  const tablePatterns = [
    // Pipe-separated table
    /\|?\s*([a-zäöü]+(?:dag|day|tag)?)\s*\|?\s*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})\s*\|?/gi,
    // Tab-separated
    /([a-zäöü]+(?:dag|day|tag)?)\t+(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/gi,
    // Colon-separated with clear structure
    /^([a-zäöü]+(?:dag|day|tag)?)\s*:\s*(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})$/gim,
  ];

  for (const pattern of tablePatterns) {
    const matches = [...content.matchAll(pattern)];
    for (const match of matches) {
      const dayWord = match[1].toLowerCase().trim();
      const normalizedDay = DAY_MAPPINGS[dayWord];

      if (normalizedDay && !hours[normalizedDay]) {
        hours[normalizedDay] = {
          open: true,
          opens: normalizeTime(match[2]),
          closes: normalizeTime(match[3]),
          raw: match[0].trim(),
        };
      }
    }
  }

  // Check for closed days
  for (const [lang, closedWords] of Object.entries(CLOSED_INDICATORS)) {
    for (const closedWord of closedWords) {
      const closedPattern = new RegExp(
        `([a-zäöü]+(?:dag|day|tag)?)\\s*[:\\|]?\\s*${closedWord}`,
        "gi"
      );
      const matches = [...content.matchAll(closedPattern)];
      for (const match of matches) {
        const dayWord = match[1].toLowerCase().trim();
        const normalizedDay = DAY_MAPPINGS[dayWord];
        if (normalizedDay && !hours[normalizedDay]) {
          hours[normalizedDay] = { open: false, raw: match[0].trim() };
        }
      }
    }
  }

  if (Object.keys(hours).length === 0) return null;

  return {
    hours,
    text: generateTextFromHours(hours),
  };
}

// ============================================================================
// LIST FORMAT PARSER
// ============================================================================

function parseListFormat(
  content: string,
  language: "nl" | "en" | "de" | "unknown"
): Partial<OpeningHoursResult> | null {
  const hours: Record<string, DayHours> = {};

  // Split content into lines
  const lines = content.split(/[\n\r]+/);

  // Find section containing opening hours
  let inOpeningHoursSection = false;
  let sectionEndIndex = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase().trim();

    // Check if this line starts an opening hours section
    for (const headers of Object.values(SECTION_HEADERS)) {
      if (headers.some((h) => line.includes(h))) {
        inOpeningHoursSection = true;
        continue;
      }
    }

    if (!inOpeningHoursSection) continue;

    // Check for day patterns in this line
    const dayHours = parseDayLine(lines[i], language);
    if (dayHours) {
      hours[dayHours.day] = dayHours.hours;
    }

    // Check for end of section (empty line or new header)
    if (line === "" && Object.keys(hours).length > 0) {
      break;
    }
  }

  // If no section found, try to parse all lines
  if (Object.keys(hours).length === 0) {
    for (const line of lines) {
      const dayHours = parseDayLine(line, language);
      if (dayHours) {
        hours[dayHours.day] = dayHours.hours;
      }
    }
  }

  if (Object.keys(hours).length === 0) return null;

  return {
    hours,
    text: generateTextFromHours(hours),
  };
}

function parseDayLine(
  line: string,
  language: "nl" | "en" | "de" | "unknown"
): { day: string; hours: DayHours } | null {
  const lowerLine = line.toLowerCase().trim();

  // Check for day word at start
  for (const [dayWord, normalizedDay] of Object.entries(DAY_MAPPINGS)) {
    if (lowerLine.startsWith(dayWord)) {
      // Check if closed
      for (const closedWords of Object.values(CLOSED_INDICATORS)) {
        if (closedWords.some((cw) => lowerLine.includes(cw))) {
          return { day: normalizedDay, hours: { open: false, raw: line.trim() } };
        }
      }

      // Check for 24 hours
      if (lowerLine.includes("24") && (lowerLine.includes("uur") || lowerLine.includes("hour") || lowerLine.includes("stunden"))) {
        return { day: normalizedDay, hours: { open: true, is24h: true, raw: line.trim() } };
      }

      // Extract time range
      const timeMatch = line.match(/(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/);
      if (timeMatch) {
        // Check for lunch break (second time range)
        const secondTimeMatch = line.match(
          /(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2}).*?(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/
        );

        if (secondTimeMatch) {
          return {
            day: normalizedDay,
            hours: {
              open: true,
              opens: normalizeTime(secondTimeMatch[1]),
              closes: normalizeTime(secondTimeMatch[2]),
              opens2: normalizeTime(secondTimeMatch[3]),
              closes2: normalizeTime(secondTimeMatch[4]),
              raw: line.trim(),
            },
          };
        }

        return {
          day: normalizedDay,
          hours: {
            open: true,
            opens: normalizeTime(timeMatch[1]),
            closes: normalizeTime(timeMatch[2]),
            raw: line.trim(),
          },
        };
      }
    }
  }

  // Check for day ranges like "Mon-Fri" or "Ma-Vr"
  const rangePattern = /([a-zäöü]+)\s*[-–]\s*([a-zäöü]+)\s*[:\s]+(\d{1,2}[.:]\d{2})\s*[-–]\s*(\d{1,2}[.:]\d{2})/i;
  const rangeMatch = line.match(rangePattern);

  if (rangeMatch) {
    const startDay = DAY_MAPPINGS[rangeMatch[1].toLowerCase()];
    const endDay = DAY_MAPPINGS[rangeMatch[2].toLowerCase()];

    if (startDay && endDay) {
      const startIdx = ORDERED_DAYS.indexOf(startDay);
      const endIdx = ORDERED_DAYS.indexOf(endDay);

      if (startIdx !== -1 && endIdx !== -1) {
        // Return the first day, caller should handle range expansion
        return {
          day: startDay,
          hours: {
            open: true,
            opens: normalizeTime(rangeMatch[3]),
            closes: normalizeTime(rangeMatch[4]),
            raw: `${startDay}-${endDay}: ${rangeMatch[3]}-${rangeMatch[4]}`,
          },
        };
      }
    }
  }

  return null;
}

// ============================================================================
// REGEX PATTERNS PARSER
// ============================================================================

function parseRegexPatterns(
  content: string,
  language: "nl" | "en" | "de" | "unknown"
): Partial<OpeningHoursResult> | null {
  const hours: Record<string, DayHours> = {};

  // Build comprehensive patterns for each day
  const dayPatterns = Object.entries(DAY_MAPPINGS).map(([dayWord, normalizedDay]) => ({
    dayWord,
    normalizedDay,
    pattern: new RegExp(
      `${dayWord}[^\\d]*?(\\d{1,2}[.:h]\\d{2})\\s*[-–]\\s*(\\d{1,2}[.:h]\\d{2})`,
      "gi"
    ),
  }));

  for (const { dayWord, normalizedDay, pattern } of dayPatterns) {
    const matches = [...content.matchAll(pattern)];
    for (const match of matches) {
      if (!hours[normalizedDay]) {
        hours[normalizedDay] = {
          open: true,
          opens: normalizeTime(match[1]),
          closes: normalizeTime(match[2]),
          raw: match[0].trim(),
        };
      }
    }
  }

  // Check for day ranges
  const rangePatterns = [
    // "Mon-Fri: 9:00-17:00" / "Ma-Vr: 9:00-17:00" / "Mo-Fr: 9:00-17:00"
    /([a-zäöü]{2,10})\s*[-–t\/m]\s*([a-zäöü]{2,10})\s*[:\s]+(\d{1,2}[.:h]\d{2})\s*[-–]\s*(\d{1,2}[.:h]\d{2})/gi,
  ];

  for (const pattern of rangePatterns) {
    const matches = [...content.matchAll(pattern)];
    for (const match of matches) {
      const startDay = DAY_MAPPINGS[match[1].toLowerCase()];
      const endDay = DAY_MAPPINGS[match[2].toLowerCase()];

      if (startDay && endDay) {
        const startIdx = ORDERED_DAYS.indexOf(startDay);
        const endIdx = ORDERED_DAYS.indexOf(endDay);

        if (startIdx !== -1 && endIdx !== -1) {
          const opens = normalizeTime(match[3]);
          const closes = normalizeTime(match[4]);

          // Fill in the range
          for (let i = startIdx; i <= endIdx; i++) {
            const day = ORDERED_DAYS[i];
            if (!hours[day]) {
              hours[day] = { open: true, opens, closes };
            }
          }
        }
      }
    }
  }

  // Check for closed days
  for (const [lang, closedWords] of Object.entries(CLOSED_INDICATORS)) {
    for (const closedWord of closedWords) {
      for (const [dayWord, normalizedDay] of Object.entries(DAY_MAPPINGS)) {
        const closedPattern = new RegExp(`${dayWord}[^\\n]*${closedWord}`, "gi");
        if (closedPattern.test(content) && !hours[normalizedDay]) {
          hours[normalizedDay] = { open: false };
        }
      }
    }
  }

  if (Object.keys(hours).length === 0) return null;

  return {
    hours,
    text: generateTextFromHours(hours),
  };
}

// ============================================================================
// JINA AI FALLBACK
// ============================================================================

async function parseWithJinaAI(
  context: ParseContext
): Promise<Partial<OpeningHoursResult> | null> {
  if (!context.jinaApiKey || !context.websiteUrl) return null;

  try {
    const response = await fetch(`https://r.jina.ai/${encodeURIComponent(context.websiteUrl)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.jinaApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Return-Format": "text",
      },
      body: JSON.stringify({
        prompt: `Extract the opening hours from this webpage.
Return ONLY a JSON object in this exact format:
{
  "mon": {"open": true, "opens": "09:00", "closes": "17:00"},
  "tue": {"open": true, "opens": "09:00", "closes": "17:00"},
  "wed": {"open": true, "opens": "09:00", "closes": "17:00"},
  "thu": {"open": true, "opens": "09:00", "closes": "17:00"},
  "fri": {"open": true, "opens": "09:00", "closes": "17:00"},
  "sat": {"open": false},
  "sun": {"open": false}
}
Use 24-hour format for times. Set "open": false for closed days.
If no opening hours found, return {"error": "not found"}.`,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const text = data.content || data.text || "";

    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (parsed.error) return null;

    // Convert to our format
    const hours: Record<string, DayHours> = {};
    for (const day of ORDERED_DAYS) {
      if (parsed[day]) {
        hours[day] = {
          open: parsed[day].open !== false,
          opens: parsed[day].opens,
          closes: parsed[day].closes,
        };
      }
    }

    return {
      hours,
      text: generateTextFromHours(hours),
      confidence: 80,
    };
  } catch (error) {
    console.error("Jina AI opening hours extraction failed:", error);
    return null;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Normalize time to HH:MM format
 */
function normalizeTime(time: string): string {
  // Replace various separators with colon
  let normalized = time.replace(/[.h]/g, ":");

  // Handle single-digit hours
  const parts = normalized.split(":");
  if (parts.length === 2) {
    const hour = parts[0].padStart(2, "0");
    const minute = parts[1].padStart(2, "0");
    return `${hour}:${minute}`;
  }

  return normalized;
}

/**
 * Calculate confidence score based on completeness
 */
function calculateConfidence(hours: Record<string, DayHours>): number {
  const daysFound = Object.keys(hours).length;

  // Full week = high confidence
  if (daysFound === 7) return 95;
  if (daysFound >= 6) return 90;
  if (daysFound >= 5) return 80;
  if (daysFound >= 3) return 60;
  if (daysFound >= 1) return 40;

  return 0;
}

/**
 * Generate human-readable text from hours object
 */
export function generateTextFromHours(hours: Record<string, DayHours>): string {
  const lines: string[] = [];

  const dayNames: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  for (const day of ORDERED_DAYS) {
    const dayHours = hours[day];
    if (!dayHours) continue;

    const name = dayNames[day];

    if (!dayHours.open) {
      lines.push(`${name}: Closed`);
    } else if (dayHours.is24h) {
      lines.push(`${name}: Open 24 hours`);
    } else if (dayHours.opens && dayHours.closes) {
      let text = `${name}: ${dayHours.opens} - ${dayHours.closes}`;
      if (dayHours.opens2 && dayHours.closes2) {
        text += `, ${dayHours.opens2} - ${dayHours.closes2}`;
      }
      lines.push(text);
    }
  }

  return lines.join("\n");
}

/**
 * Convert hours to Schema.org openingHoursSpecification format
 */
export function toSchemaOrgFormat(
  hours: Record<string, DayHours>
): Array<{
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens?: string;
  closes?: string;
}> {
  const schemaOrgDays: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const specs: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens?: string;
    closes?: string;
  }> = [];

  for (const [day, dayHours] of Object.entries(hours)) {
    if (dayHours.open && dayHours.opens && dayHours.closes) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaOrgDays[day] || day,
        opens: dayHours.opens,
        closes: dayHours.closes,
      });

      // Add second time window if lunch break
      if (dayHours.opens2 && dayHours.closes2) {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: schemaOrgDays[day] || day,
          opens: dayHours.opens2,
          closes: dayHours.closes2,
        });
      }
    }
  }

  return specs;
}

/**
 * Convert hours to simple JSON format for database storage
 */
export function toSimpleFormat(hours: Record<string, DayHours>): Record<string, string> {
  const simple: Record<string, string> = {};

  for (const [day, dayHours] of Object.entries(hours)) {
    if (!dayHours.open) {
      simple[day] = "closed";
    } else if (dayHours.is24h) {
      simple[day] = "00:00-24:00";
    } else if (dayHours.opens && dayHours.closes) {
      let value = `${dayHours.opens}-${dayHours.closes}`;
      if (dayHours.opens2 && dayHours.closes2) {
        value += `, ${dayHours.opens2}-${dayHours.closes2}`;
      }
      simple[day] = value;
    }
  }

  return simple;
}
