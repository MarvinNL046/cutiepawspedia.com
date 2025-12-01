/**
 * JSON-LD Structured Data Schemas for SEO
 * https://schema.org/
 */

const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
const SITE_NAME = "CutiePawsPedia";

// Types for schema generation
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PlaceSchemaData {
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  lat?: string | null;
  lng?: string | null;
  avgRating?: string | null;
  reviewCount?: number;
  isPremium?: boolean;
  isVerified?: boolean;
  city?: {
    name: string;
    slug: string;
    country?: {
      name: string;
      slug: string;
      code?: string;
    } | null;
  } | null;
  placeCategories?: Array<{
    category: {
      labelKey: string;
      slug: string;
    };
  }>;
}

/**
 * Website schema for the main site
 */
export function websiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Discover the best pet services in your area. Find veterinarians, groomers, pet hotels, trainers, and more.",
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/en/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en", "nl"],
  };
}

/**
 * Organization schema
 */
export function organizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      // Add social media URLs here
      // "https://twitter.com/cutiepawspedia",
      // "https://facebook.com/cutiepawspedia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Dutch"],
    },
  };
}

/**
 * Breadcrumb schema
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Local Business schema for place/listing pages
 */
export function localBusinessSchema(
  place: PlaceSchemaData,
  locale: string,
  categorySlug: string
): object {
  const cityName = place.city?.name || "";
  const countryName = place.city?.country?.name || "";
  const countryCode = place.city?.country?.code || "";
  const countrySlug = place.city?.country?.slug || "";
  const citySlug = place.city?.slug || "";
  const primaryCategory = place.placeCategories?.[0]?.category;

  // Map category to schema.org type
  const schemaType = mapCategoryToSchemaType(primaryCategory?.slug || categorySlug);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}#business`,
    name: place.name,
    url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
  };

  // Description
  if (place.description) {
    schema.description = place.description.slice(0, 300);
  }

  // Address
  if (place.address || cityName) {
    schema.address = {
      "@type": "PostalAddress",
      ...(place.address && { streetAddress: place.address }),
      ...(cityName && { addressLocality: cityName }),
      ...(countryName && { addressCountry: countryCode || countryName }),
      ...(place.postalCode && { postalCode: place.postalCode }),
    };
  }

  // Contact info
  if (place.phone) {
    schema.telephone = place.phone;
  }
  if (place.email) {
    schema.email = place.email;
  }
  if (place.website) {
    schema.sameAs = [place.website];
  }

  // Geo coordinates
  if (place.lat && place.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: Number(place.lat),
      longitude: Number(place.lng),
    };
  }

  // Aggregate rating
  if (place.avgRating && Number(place.avgRating) > 0 && place.reviewCount && place.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(place.avgRating).toFixed(1),
      bestRating: "5",
      worstRating: "1",
      reviewCount: place.reviewCount,
    };
  }

  // Image (placeholder - can be extended with actual images)
  schema.image = `${BASE_URL}/og-image.png`;

  // Price range (placeholder)
  schema.priceRange = "$$";

  return schema;
}

/**
 * Search action schema for sitelinks search box
 */
export function searchActionSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/en/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Item list schema for category/listing pages
 */
export function itemListSchema(
  places: Array<{
    name: string;
    slug: string;
    avgRating?: string | null;
    reviewCount?: number;
  }>,
  listName: string,
  locale: string,
  countrySlug: string,
  citySlug: string,
  categorySlug: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: places.length,
    itemListElement: places.slice(0, 10).map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: place.name,
      url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
    })),
  };
}

/**
 * FAQ schema (useful for common questions)
 */
export function faqSchema(
  questions: Array<{ question: string; answer: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Map category slug to schema.org type
 */
function mapCategoryToSchemaType(categorySlug: string): string {
  const categoryMap: Record<string, string> = {
    "pet-hotels": "LodgingBusiness",
    "pet-boarding": "LodgingBusiness",
    veterinarians: "VeterinaryCare",
    vet: "VeterinaryCare",
    grooming: "PetStore", // No specific grooming type, PetStore is closest
    "pet-grooming": "PetStore",
    training: "LocalBusiness",
    "pet-training": "LocalBusiness",
    "dog-training": "LocalBusiness",
    "pet-shops": "PetStore",
    "pet-store": "PetStore",
    "dog-walking": "LocalBusiness",
    "pet-sitting": "LocalBusiness",
    "pet-daycare": "LocalBusiness",
  };

  return categoryMap[categorySlug] || "LocalBusiness";
}

/**
 * Helper to render JSON-LD script tag
 */
export function jsonLdScript(schema: object | object[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return schemas
    .map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s, null, 0)}</script>`
    )
    .join("\n");
}

/**
 * Generate all schemas for a page
 */
export function generatePageSchemas(
  type: "home" | "country" | "city" | "category" | "place" | "search",
  data?: {
    breadcrumbs?: BreadcrumbItem[];
    place?: PlaceSchemaData;
    places?: Array<{
      name: string;
      slug: string;
      avgRating?: string | null;
      reviewCount?: number;
    }>;
    listName?: string;
    locale?: string;
    countrySlug?: string;
    citySlug?: string;
    categorySlug?: string;
  }
): object[] {
  const schemas: object[] = [];

  // Always include website schema on home page
  if (type === "home") {
    schemas.push(websiteSchema());
    schemas.push(organizationSchema());
    schemas.push(searchActionSchema());
  }

  // Breadcrumbs for all pages except home
  if (data?.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(data.breadcrumbs));
  }

  // Local business for place pages
  if (type === "place" && data?.place && data.locale && data.categorySlug) {
    schemas.push(localBusinessSchema(data.place, data.locale, data.categorySlug));
  }

  // Item list for category pages
  if (
    type === "category" &&
    data?.places &&
    data.listName &&
    data.locale &&
    data.countrySlug &&
    data.citySlug &&
    data.categorySlug
  ) {
    schemas.push(
      itemListSchema(
        data.places,
        data.listName,
        data.locale,
        data.countrySlug,
        data.citySlug,
        data.categorySlug
      )
    );
  }

  return schemas;
}
