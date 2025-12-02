/**
 * JSON-LD Schema.org Builders
 *
 * Functions for building structured data for search engines.
 */

import type {
  PlaceSeoPayload,
  BreadcrumbItem,
  ItemListItem,
  LocalBusinessType,
} from "./types";
import { getSchemaTypeForCategory, DEFAULT_SEO_CONFIG } from "./types";
import { getBaseUrl } from "./url-helpers";

// =============================================================================
// WEBPAGE SCHEMA
// =============================================================================

interface WebPageParams {
  title: string;
  description: string;
  url: string;
  locale: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Build WebPage JSON-LD schema
 */
export function buildWebPageJsonLd(params: WebPageParams): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.title,
    description: params.description,
    url: params.url,
    inLanguage: params.locale,
    isPartOf: {
      "@type": "WebSite",
      name: DEFAULT_SEO_CONFIG.siteName,
      url: getBaseUrl(),
    },
    ...(params.datePublished && { datePublished: params.datePublished }),
    ...(params.dateModified && { dateModified: params.dateModified }),
  };
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================

interface BreadcrumbParams {
  items: BreadcrumbItem[];
}

/**
 * Build BreadcrumbList JSON-LD schema
 */
export function buildBreadcrumbJsonLd(params: BreadcrumbParams): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// =============================================================================
// LOCAL BUSINESS SCHEMA
// =============================================================================

interface LocalBusinessParams extends PlaceSeoPayload {
  url: string;
}

/**
 * Build LocalBusiness JSON-LD schema (or subtype based on category)
 */
export function buildLocalBusinessJsonLd(params: LocalBusinessParams): object {
  // Determine the Schema.org type based on category
  const primaryCategory = params.categorySlugs[0] || "local-business";
  const schemaType: LocalBusinessType =
    getSchemaTypeForCategory(primaryCategory);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: params.name,
    url: params.url,
    ...(params.description && { description: params.description }),
  };

  // Address
  if (params.address || params.postalCode || params.cityName) {
    schema.address = {
      "@type": "PostalAddress",
      ...(params.address && { streetAddress: params.address }),
      ...(params.postalCode && { postalCode: params.postalCode }),
      ...(params.cityName && { addressLocality: params.cityName }),
      ...(params.countryCode && { addressCountry: params.countryCode }),
    };
  }

  // Geo coordinates
  if (params.lat && params.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: params.lat,
      longitude: params.lng,
    };
  }

  // Contact
  if (params.phone) {
    schema.telephone = params.phone;
  }

  // Rating
  if (params.avgRating && params.reviewCount && params.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: params.avgRating,
      reviewCount: params.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Image
  if (params.images && params.images.length > 0) {
    schema.image = params.images[0];
  }

  return schema;
}

// =============================================================================
// ITEM LIST SCHEMA (for category pages)
// =============================================================================

interface ItemListParams {
  url: string;
  name: string;
  description?: string;
  items: ItemListItem[];
}

/**
 * Build ItemList JSON-LD schema for listing pages
 */
export function buildItemListJsonLd(params: ItemListParams): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.name,
    ...(params.description && { description: params.description }),
    url: params.url,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position ?? index + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: item.image }),
    })),
  };
}

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

/**
 * Build Organization JSON-LD schema for the site
 */
export function buildOrganizationJsonLd(): object {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: DEFAULT_SEO_CONFIG.siteName,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      // Add social links when available
    ],
  };
}

// =============================================================================
// COLLECTION PAGE SCHEMA (for city/country overview pages)
// =============================================================================

interface CollectionPageParams {
  name: string;
  description: string;
  url: string;
  locale: string;
  hasPart?: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Build CollectionPage JSON-LD schema for overview pages
 */
export function buildCollectionPageJsonLd(
  params: CollectionPageParams
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.locale,
    isPartOf: {
      "@type": "WebSite",
      name: DEFAULT_SEO_CONFIG.siteName,
      url: getBaseUrl(),
    },
    ...(params.hasPart && {
      hasPart: params.hasPart.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: item.url,
      })),
    }),
  };
}

// =============================================================================
// HELPER: Serialize to string
// =============================================================================

/**
 * Convert JSON-LD object to script-ready string
 */
export function jsonLdToString(jsonLd: object): string {
  return JSON.stringify(jsonLd, null, 0);
}

/**
 * Build multiple JSON-LD schemas into an array
 */
export function combineJsonLd(...schemas: object[]): object[] {
  return schemas.filter(Boolean);
}

// =============================================================================
// BACKWARDS-COMPATIBLE SCHEMA FUNCTIONS
// =============================================================================

/**
 * Build WebSite JSON-LD schema (backwards-compatible)
 */
export function websiteSchema(): object {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DEFAULT_SEO_CONFIG.siteName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/nl/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Build Organization JSON-LD schema (backwards-compatible alias)
 */
export function organizationSchema(): object {
  return buildOrganizationJsonLd();
}

/**
 * Build LocalBusiness JSON-LD schema (backwards-compatible)
 * Supports legacy signature (place, locale, categorySlug) from database queries
 */
export function localBusinessSchema(
  place: (PlaceSeoPayload & { url: string }) | Record<string, unknown>,
  locale?: string,
  categorySlug?: string
): object {
  // If locale is provided, this is the legacy signature with a database place object
  if (locale !== undefined) {
    const dbPlace = place as Record<string, unknown>;
    const cityData = dbPlace.city as Record<string, unknown> | undefined;
    const countryData = cityData?.country as Record<string, unknown> | undefined;
    const placeCategories = dbPlace.placeCategories as Array<{ category?: { slug?: string; name?: string } }> | undefined;

    const categorySlugs = placeCategories?.map(pc => pc.category?.slug || "").filter(Boolean) || [];
    const categories = placeCategories?.map(pc => pc.category?.name || "").filter(Boolean) || [];

    // Build PlaceSeoPayload from database place
    const payload: PlaceSeoPayload & { url: string } = {
      id: dbPlace.id as number,
      slug: dbPlace.slug as string,
      name: dbPlace.name as string,
      citySlug: cityData?.slug as string || "",
      cityName: cityData?.name as string || "",
      countrySlug: countryData?.slug as string || "",
      countryCode: countryData?.code as string || "",
      categories,
      categorySlugs: categorySlug ? [categorySlug, ...categorySlugs.filter(s => s !== categorySlug)] : categorySlugs,
      description: dbPlace.description as string | null,
      address: dbPlace.address as string | null,
      postalCode: dbPlace.postalCode as string | null,
      phone: dbPlace.phone as string | null,
      website: dbPlace.website as string | null,
      avgRating: dbPlace.avgRating ? parseFloat(dbPlace.avgRating as string) : null,
      reviewCount: dbPlace.reviewCount as number | null,
      images: dbPlace.images ? JSON.parse(dbPlace.images as string) : undefined,
      lat: dbPlace.lat ? parseFloat(dbPlace.lat as string) : null,
      lng: dbPlace.lng ? parseFloat(dbPlace.lng as string) : null,
      url: `${getBaseUrl()}/${locale}/${countryData?.slug || ""}/${cityData?.slug || ""}/${categorySlug || categorySlugs[0] || ""}/${dbPlace.slug}`,
    };

    return buildLocalBusinessJsonLd(payload);
  }

  // New signature with PlaceSeoPayload
  return buildLocalBusinessJsonLd(place as PlaceSeoPayload & { url: string });
}

/**
 * Build BreadcrumbList JSON-LD schema (backwards-compatible)
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): object {
  return buildBreadcrumbJsonLd({ items });
}
