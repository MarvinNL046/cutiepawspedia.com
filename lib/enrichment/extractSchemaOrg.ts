/**
 * Schema.org Extractor - D1.1.5
 *
 * Extracts structured data from Schema.org markup:
 * - JSON-LD scripts
 * - Microdata attributes
 * - RDFa markup
 *
 * Focuses on LocalBusiness and related types for directory data.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface SchemaOrgResult {
  /** Type of schema found (LocalBusiness, Organization, etc.) */
  type: string;
  /** Extracted local business data */
  business?: LocalBusinessSchema;
  /** Opening hours specification */
  openingHours?: OpeningHoursSpecification[];
  /** Aggregate rating */
  aggregateRating?: AggregateRatingSchema;
  /** Address */
  address?: PostalAddressSchema;
  /** Geo coordinates */
  geo?: GeoCoordinatesSchema;
  /** Contact point */
  contactPoint?: ContactPointSchema;
  /** Raw JSON-LD data */
  raw?: unknown;
  /** Confidence score 0-100 */
  confidence: number;
  /** Source: json-ld, microdata, rdfa */
  source: "json-ld" | "microdata" | "rdfa";
}

export interface LocalBusinessSchema {
  "@type": string;
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  image?: string | string[];
  logo?: string;
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string;
  hasMap?: string;
  sameAs?: string[];
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens?: string;
  closes?: string;
  validFrom?: string;
  validThrough?: string;
}

export interface AggregateRatingSchema {
  "@type": "AggregateRating";
  ratingValue: number | string;
  reviewCount?: number | string;
  ratingCount?: number | string;
  bestRating?: number | string;
  worstRating?: number | string;
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface GeoCoordinatesSchema {
  "@type": "GeoCoordinates";
  latitude: number | string;
  longitude: number | string;
}

export interface ContactPointSchema {
  "@type": "ContactPoint";
  telephone?: string;
  email?: string;
  contactType?: string;
  areaServed?: string;
  availableLanguage?: string | string[];
}

// ============================================================================
// MAIN EXTRACTOR
// ============================================================================

/**
 * Extract Schema.org data from HTML
 */
export function extractSchemaOrg(html: string): SchemaOrgResult | null {
  // Strategy 1: JSON-LD (highest priority, most structured)
  const jsonLdResult = extractJsonLd(html);
  if (jsonLdResult) {
    return jsonLdResult;
  }

  // Strategy 2: Microdata
  const microdataResult = extractMicrodata(html);
  if (microdataResult) {
    return microdataResult;
  }

  // Strategy 3: RDFa (least common)
  const rdfaResult = extractRdfa(html);
  if (rdfaResult) {
    return rdfaResult;
  }

  return null;
}

// ============================================================================
// JSON-LD EXTRACTION
// ============================================================================

function extractJsonLd(html: string): SchemaOrgResult | null {
  const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [...html.matchAll(jsonLdPattern)];

  for (const match of matches) {
    try {
      const data = JSON.parse(match[1].trim());

      // Handle @graph format
      const items = data["@graph"] ? data["@graph"] : [data];

      for (const item of items) {
        const result = processSchemaItem(item);
        if (result && result.type) {
          return {
            ...result,
            type: result.type,
            raw: item,
            confidence: 95,
            source: "json-ld",
          };
        }
      }
    } catch (error) {
      // Invalid JSON, continue to next match
      continue;
    }
  }

  return null;
}

function processSchemaItem(item: unknown): Partial<SchemaOrgResult> | null {
  if (!item || typeof item !== "object" || !("@type" in item)) {
    return null;
  }

  const type = (item as { "@type": string | string[] })["@type"];
  const typeStr = Array.isArray(type) ? type[0] : type;

  // Check if it's a relevant type
  const relevantTypes = [
    "LocalBusiness",
    "Organization",
    "Store",
    "PetStore",
    "AnimalShelter",
    "VeterinaryCare",
    "Restaurant",
    "HealthAndBeautyBusiness",
    "ProfessionalService",
    "MedicalBusiness",
    "Dentist",
    "Pharmacy",
    "SportsActivityLocation",
    "LodgingBusiness",
    "FoodEstablishment",
  ];

  if (!relevantTypes.some((t) => typeStr.includes(t))) {
    return null;
  }

  const typedItem = item as Record<string, unknown>;

  // Extract business data
  const business: LocalBusinessSchema = {
    "@type": typeStr,
    name: typedItem.name as string,
    description: typedItem.description as string,
    url: typedItem.url as string,
    telephone: typedItem.telephone as string,
    email: typedItem.email as string,
    image: typedItem.image as string | string[],
    logo: typedItem.logo as string,
    priceRange: typedItem.priceRange as string,
    paymentAccepted: typedItem.paymentAccepted as string[],
    currenciesAccepted: typedItem.currenciesAccepted as string,
    hasMap: typedItem.hasMap as string,
    sameAs: typedItem.sameAs as string[],
  };

  // Extract opening hours
  const openingHours = extractOpeningHoursSpec(typedItem);

  // Extract aggregate rating
  const aggregateRating = extractAggregateRating(typedItem);

  // Extract address
  const address = extractAddress(typedItem);

  // Extract geo coordinates
  const geo = extractGeo(typedItem);

  // Extract contact point
  const contactPoint = extractContactPoint(typedItem);

  return {
    type: typeStr,
    business,
    openingHours: openingHours.length > 0 ? openingHours : undefined,
    aggregateRating,
    address,
    geo,
    contactPoint,
  };
}

function extractOpeningHoursSpec(item: Record<string, unknown>): OpeningHoursSpecification[] {
  const specs: OpeningHoursSpecification[] = [];

  // Check openingHoursSpecification
  const ohSpec = item.openingHoursSpecification;
  if (Array.isArray(ohSpec)) {
    for (const spec of ohSpec) {
      if (spec && typeof spec === "object" && "dayOfWeek" in spec) {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: spec.dayOfWeek as string | string[],
          opens: spec.opens as string,
          closes: spec.closes as string,
          validFrom: spec.validFrom as string,
          validThrough: spec.validThrough as string,
        });
      }
    }
  } else if (ohSpec && typeof ohSpec === "object" && "dayOfWeek" in (ohSpec as object)) {
    const spec = ohSpec as Record<string, unknown>;
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek as string | string[],
      opens: spec.opens as string,
      closes: spec.closes as string,
    });
  }

  // Also check simple openingHours array
  const simpleHours = item.openingHours;
  if (Array.isArray(simpleHours)) {
    for (const hours of simpleHours) {
      if (typeof hours === "string") {
        // Parse "Mo-Fr 09:00-17:00" format
        const parsed = parseSimpleOpeningHours(hours);
        if (parsed) {
          specs.push(parsed);
        }
      }
    }
  }

  return specs;
}

function parseSimpleOpeningHours(hours: string): OpeningHoursSpecification | null {
  // Pattern: "Mo-Fr 09:00-17:00" or "Mo,Tu,We 09:00-17:00"
  const match = hours.match(/^([A-Za-z,\-]+)\s+(\d{2}:\d{2})-(\d{2}:\d{2})$/);
  if (!match) return null;

  const daysPart = match[1];
  const opens = match[2];
  const closes = match[3];

  // Parse day range
  let days: string[];
  if (daysPart.includes("-")) {
    const [start, end] = daysPart.split("-");
    days = expandDayRange(start, end);
  } else {
    days = daysPart.split(",").map((d) => expandDayName(d.trim()));
  }

  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
}

function expandDayRange(start: string, end: string): string[] {
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayMap: Record<string, string> = {
    Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday",
    Fr: "Friday", Sa: "Saturday", Su: "Sunday",
  };

  const startDay = dayMap[start] || start;
  const endDay = dayMap[end] || end;

  const startIdx = dayOrder.indexOf(startDay);
  const endIdx = dayOrder.indexOf(endDay);

  if (startIdx === -1 || endIdx === -1) return [startDay, endDay];

  return dayOrder.slice(startIdx, endIdx + 1);
}

function expandDayName(abbrev: string): string {
  const dayMap: Record<string, string> = {
    Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday",
    Fr: "Friday", Sa: "Saturday", Su: "Sunday",
    Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
    Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
  };
  return dayMap[abbrev] || abbrev;
}

function extractAggregateRating(item: Record<string, unknown>): AggregateRatingSchema | undefined {
  const rating = item.aggregateRating;
  if (!rating || typeof rating !== "object") return undefined;

  const r = rating as Record<string, unknown>;
  return {
    "@type": "AggregateRating",
    ratingValue: r.ratingValue as number | string,
    reviewCount: r.reviewCount as number | string,
    ratingCount: r.ratingCount as number | string,
    bestRating: r.bestRating as number | string,
    worstRating: r.worstRating as number | string,
  };
}

function extractAddress(item: Record<string, unknown>): PostalAddressSchema | undefined {
  const address = item.address;
  if (!address) return undefined;

  if (typeof address === "string") {
    return {
      "@type": "PostalAddress",
      streetAddress: address,
    };
  }

  if (typeof address === "object") {
    const a = address as Record<string, unknown>;
    return {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress as string,
      addressLocality: a.addressLocality as string,
      addressRegion: a.addressRegion as string,
      postalCode: a.postalCode as string,
      addressCountry: a.addressCountry as string,
    };
  }

  return undefined;
}

function extractGeo(item: Record<string, unknown>): GeoCoordinatesSchema | undefined {
  const geo = item.geo;
  if (!geo || typeof geo !== "object") return undefined;

  const g = geo as Record<string, unknown>;
  if (g.latitude && g.longitude) {
    return {
      "@type": "GeoCoordinates",
      latitude: g.latitude as number | string,
      longitude: g.longitude as number | string,
    };
  }

  return undefined;
}

function extractContactPoint(item: Record<string, unknown>): ContactPointSchema | undefined {
  const contact = item.contactPoint;
  if (!contact) return undefined;

  const contacts = Array.isArray(contact) ? contact : [contact];
  for (const c of contacts) {
    if (c && typeof c === "object") {
      const cp = c as Record<string, unknown>;
      return {
        "@type": "ContactPoint",
        telephone: cp.telephone as string,
        email: cp.email as string,
        contactType: cp.contactType as string,
        areaServed: cp.areaServed as string,
        availableLanguage: cp.availableLanguage as string | string[],
      };
    }
  }

  return undefined;
}

// ============================================================================
// MICRODATA EXTRACTION
// ============================================================================

function extractMicrodata(html: string): SchemaOrgResult | null {
  const result: Partial<SchemaOrgResult> = {};

  // Check for LocalBusiness or Organization itemscope
  const itemscopeMatch = html.match(/itemscope[^>]*itemtype=["']https?:\/\/schema\.org\/([^"']+)["']/i);
  if (!itemscopeMatch) return null;

  result.type = itemscopeMatch[1];

  // Extract itemprop values
  const business: LocalBusinessSchema = {
    "@type": result.type,
  };

  // Name
  const nameMatch = html.match(/itemprop=["']name["'][^>]*>([^<]+)</i) ||
    html.match(/itemprop=["']name["'][^>]*content=["']([^"']+)["']/i);
  if (nameMatch) business.name = nameMatch[1].trim();

  // Telephone
  const telMatch = html.match(/itemprop=["']telephone["'][^>]*>([^<]+)</i) ||
    html.match(/itemprop=["']telephone["'][^>]*content=["']([^"']+)["']/i);
  if (telMatch) business.telephone = telMatch[1].trim();

  // Email
  const emailMatch = html.match(/itemprop=["']email["'][^>]*>([^<]+)</i) ||
    html.match(/itemprop=["']email["'][^>]*content=["']([^"']+)["']/i);
  if (emailMatch) business.email = emailMatch[1].trim();

  // URL
  const urlMatch = html.match(/itemprop=["']url["'][^>]*href=["']([^"']+)["']/i);
  if (urlMatch) business.url = urlMatch[1];

  // Description
  const descMatch = html.match(/itemprop=["']description["'][^>]*>([^<]+)</i) ||
    html.match(/itemprop=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) business.description = descMatch[1].trim();

  // Rating
  const ratingMatch = html.match(/itemprop=["']ratingValue["'][^>]*content=["']([^"']+)["']/i);
  const countMatch = html.match(/itemprop=["']reviewCount["'][^>]*content=["']([^"']+)["']/i);

  if (ratingMatch) {
    result.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingMatch[1],
      reviewCount: countMatch?.[1],
    };
  }

  // Address
  const streetMatch = html.match(/itemprop=["']streetAddress["'][^>]*>([^<]+)</i);
  const localityMatch = html.match(/itemprop=["']addressLocality["'][^>]*>([^<]+)</i);
  const postalMatch = html.match(/itemprop=["']postalCode["'][^>]*>([^<]+)</i);

  if (streetMatch || localityMatch) {
    result.address = {
      "@type": "PostalAddress",
      streetAddress: streetMatch?.[1]?.trim(),
      addressLocality: localityMatch?.[1]?.trim(),
      postalCode: postalMatch?.[1]?.trim(),
    };
  }

  // Geo
  const latMatch = html.match(/itemprop=["']latitude["'][^>]*content=["']([^"']+)["']/i);
  const lngMatch = html.match(/itemprop=["']longitude["'][^>]*content=["']([^"']+)["']/i);

  if (latMatch && lngMatch) {
    result.geo = {
      "@type": "GeoCoordinates",
      latitude: latMatch[1],
      longitude: lngMatch[1],
    };
  }

  if (!business.name) return null;

  return {
    type: result.type || "LocalBusiness",
    business,
    aggregateRating: result.aggregateRating,
    address: result.address,
    geo: result.geo,
    confidence: 75,
    source: "microdata",
  };
}

// ============================================================================
// RDFA EXTRACTION
// ============================================================================

function extractRdfa(html: string): SchemaOrgResult | null {
  // Look for typeof="LocalBusiness" or similar
  const typeofMatch = html.match(/typeof=["']([^"']*(?:LocalBusiness|Organization)[^"']*)["']/i);
  if (!typeofMatch) return null;

  const result: Partial<SchemaOrgResult> = {
    type: typeofMatch[1].split(/\s+/).find((t) => t.includes("Business") || t.includes("Organization")) || "LocalBusiness",
  };

  const business: LocalBusinessSchema = {
    "@type": result.type || "LocalBusiness",
  };

  // Extract property values
  const nameMatch = html.match(/property=["']name["'][^>]*>([^<]+)</i);
  if (nameMatch) business.name = nameMatch[1].trim();

  const telMatch = html.match(/property=["']telephone["'][^>]*>([^<]+)</i);
  if (telMatch) business.telephone = telMatch[1].trim();

  if (!business.name) return null;

  return {
    type: result.type || "LocalBusiness",
    business,
    confidence: 60,
    source: "rdfa",
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert Schema.org opening hours to our internal format
 */
export function schemaOrgToInternalHours(
  specs: OpeningHoursSpecification[]
): Record<string, { opens: string; closes: string }> {
  const hours: Record<string, { opens: string; closes: string }> = {};

  const dayMap: Record<string, string> = {
    Monday: "mon", Tuesday: "tue", Wednesday: "wed", Thursday: "thu",
    Friday: "fri", Saturday: "sat", Sunday: "sun",
    "https://schema.org/Monday": "mon",
    "https://schema.org/Tuesday": "tue",
    "https://schema.org/Wednesday": "wed",
    "https://schema.org/Thursday": "thu",
    "https://schema.org/Friday": "fri",
    "https://schema.org/Saturday": "sat",
    "https://schema.org/Sunday": "sun",
  };

  for (const spec of specs) {
    const days = Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek];

    for (const day of days) {
      const normalizedDay = dayMap[day] || day.toLowerCase().substring(0, 3);
      if (spec.opens && spec.closes) {
        hours[normalizedDay] = {
          opens: spec.opens,
          closes: spec.closes,
        };
      }
    }
  }

  return hours;
}

/**
 * Merge Schema.org data with existing place data
 */
export function mergeSchemaOrgData(
  existing: Record<string, unknown>,
  schemaData: SchemaOrgResult
): Record<string, unknown> {
  const merged = { ...existing };

  // Merge business data (don't overwrite existing values)
  if (schemaData.business) {
    if (!merged.name && schemaData.business.name) {
      merged.name = schemaData.business.name;
    }
    if (!merged.description && schemaData.business.description) {
      merged.description = schemaData.business.description;
    }
    if (!merged.phone && schemaData.business.telephone) {
      merged.phone = schemaData.business.telephone;
    }
    if (!merged.email && schemaData.business.email) {
      merged.email = schemaData.business.email;
    }
    if (!merged.website && schemaData.business.url) {
      merged.website = schemaData.business.url;
    }
    if (!merged.priceRange && schemaData.business.priceRange) {
      merged.priceRange = schemaData.business.priceRange;
    }
  }

  // Merge rating
  if (schemaData.aggregateRating) {
    if (!merged.avgRating) {
      merged.avgRating = parseFloat(String(schemaData.aggregateRating.ratingValue));
    }
    if (!merged.reviewCount) {
      merged.reviewCount = parseInt(
        String(schemaData.aggregateRating.reviewCount || schemaData.aggregateRating.ratingCount),
        10
      );
    }
  }

  // Merge address
  if (schemaData.address) {
    if (!merged.address) {
      const parts = [
        schemaData.address.streetAddress,
        schemaData.address.postalCode,
        schemaData.address.addressLocality,
      ].filter(Boolean);
      merged.address = parts.join(", ");
    }
  }

  // Merge geo
  if (schemaData.geo) {
    if (!merged.lat) {
      merged.lat = parseFloat(String(schemaData.geo.latitude));
    }
    if (!merged.lng) {
      merged.lng = parseFloat(String(schemaData.geo.longitude));
    }
  }

  // Merge opening hours
  if (schemaData.openingHours && schemaData.openingHours.length > 0) {
    if (!merged.openingHours || Object.keys(merged.openingHours as object).length === 0) {
      merged.openingHours = schemaOrgToInternalHours(schemaData.openingHours);
    }
  }

  return merged;
}
