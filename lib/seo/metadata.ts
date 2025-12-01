import type { Metadata } from "next";

// Base URL for the site
const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
const SITE_NAME = "CutiePawsPedia";

// Default metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} - Find Pet Services Near You`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover the best pet services in your area. Find veterinarians, groomers, pet hotels, trainers, and more. Read reviews, compare prices, and book appointments.",
  keywords: [
    "pet services",
    "veterinarian",
    "pet grooming",
    "pet hotel",
    "dog walking",
    "pet shop",
    "animal care",
    "pet directory",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Find Pet Services Near You`,
    description:
      "Discover the best pet services in your area. Find veterinarians, groomers, pet hotels, trainers, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Find Pet Services Near You`,
    description:
      "Discover the best pet services in your area. Find veterinarians, groomers, pet hotels, trainers, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Types for metadata generation
interface CountryData {
  name: string;
  slug: string;
  code?: string;
}

interface CityData {
  name: string;
  slug: string;
  country?: CountryData | null;
}

interface CategoryData {
  labelKey: string;
  slug: string;
  icon?: string | null;
}

interface PlaceData {
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  avgRating?: string | null;
  reviewCount?: number;
  isPremium?: boolean;
  isVerified?: boolean;
  city?: CityData | null;
  placeCategories?: Array<{ category: CategoryData }>;
}

/**
 * Generate metadata for country pages
 */
export function getCountryMetadata(
  country: CountryData,
  locale: string,
  cityCount?: number
): Metadata {
  const title = `Pet Services in ${country.name}`;
  const description = `Find the best pet services in ${country.name}. Browse ${cityCount ? `${cityCount} cities with ` : ""}veterinarians, groomers, pet hotels, dog walkers, and more pet care providers.`;

  return {
    title,
    description,
    keywords: [
      `pet services ${country.name}`,
      `veterinarian ${country.name}`,
      `pet grooming ${country.name}`,
      `pet hotel ${country.name}`,
      `dog walking ${country.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/${country.slug}`,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${country.slug}`,
      languages: {
        en: `${BASE_URL}/en/${country.slug}`,
        nl: `${BASE_URL}/nl/${country.slug}`,
      },
    },
  };
}

/**
 * Generate metadata for city pages
 */
export function getCityMetadata(
  city: CityData,
  locale: string,
  placeCount?: number
): Metadata {
  const countryName = city.country?.name || "";
  const title = `Pet Services in ${city.name}${countryName ? `, ${countryName}` : ""}`;
  const description = `Discover ${placeCount ? `${placeCount}+ ` : ""}pet services in ${city.name}. Find trusted veterinarians, professional groomers, pet hotels, dog walkers, and pet shops near you.`;

  const countrySlug = city.country?.slug || "";

  return {
    title,
    description,
    keywords: [
      `pet services ${city.name}`,
      `veterinarian ${city.name}`,
      `pet grooming ${city.name}`,
      `pet hotel ${city.name}`,
      `dog walking ${city.name}`,
      `pet shop ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/${countrySlug}/${city.slug}`,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${countrySlug}/${city.slug}`,
      languages: {
        en: `${BASE_URL}/en/${countrySlug}/${city.slug}`,
        nl: `${BASE_URL}/nl/${countrySlug}/${city.slug}`,
      },
    },
  };
}

/**
 * Generate metadata for category pages (city + category)
 */
export function getCategoryMetadata(
  category: CategoryData,
  city: CityData,
  locale: string,
  placeCount?: number
): Metadata {
  const countryName = city.country?.name || "";
  const countrySlug = city.country?.slug || "";
  const categoryName = category.labelKey;

  const title = `${categoryName} in ${city.name}${countryName ? `, ${countryName}` : ""}`;
  const description = `Find ${placeCount ? `${placeCount} ` : ""}${categoryName.toLowerCase()} in ${city.name}. Compare reviews, prices, and services. Book appointments with trusted pet care providers.`;

  return {
    title,
    description,
    keywords: [
      `${categoryName.toLowerCase()} ${city.name}`,
      `best ${categoryName.toLowerCase()} ${city.name}`,
      `${categoryName.toLowerCase()} near me`,
      `pet services ${city.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/${countrySlug}/${city.slug}/${category.slug}`,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${countrySlug}/${city.slug}/${category.slug}`,
      languages: {
        en: `${BASE_URL}/en/${countrySlug}/${city.slug}/${category.slug}`,
        nl: `${BASE_URL}/nl/${countrySlug}/${city.slug}/${category.slug}`,
      },
    },
  };
}

/**
 * Generate metadata for individual place/listing pages
 */
export function getPlaceMetadata(
  place: PlaceData,
  citySlug: string,
  countrySlug: string,
  categorySlug: string,
  locale: string
): Metadata {
  const cityName = place.city?.name || "";
  const countryName = place.city?.country?.name || "";
  const primaryCategory = place.placeCategories?.[0]?.category?.labelKey || "";

  // Build rich title
  const title = place.name;

  // Build description from place data
  let description = place.description?.slice(0, 150) || "";
  if (!description) {
    description = `${place.name} is a ${primaryCategory.toLowerCase() || "pet service"} located in ${cityName}${countryName ? `, ${countryName}` : ""}.`;
  }

  // Add rating info to description if available
  if (place.avgRating && Number(place.avgRating) > 0) {
    description += ` Rated ${Number(place.avgRating).toFixed(1)}/5 based on ${place.reviewCount} reviews.`;
  }

  // Build keywords
  const keywords = [
    place.name,
    `${primaryCategory} ${cityName}`,
    `pet services ${cityName}`,
  ];

  if (place.isVerified) {
    keywords.push(`verified ${primaryCategory.toLowerCase()}`);
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${place.name} - ${primaryCategory} in ${cityName}`,
      description,
      url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${place.name} - ${primaryCategory} in ${cityName}`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
      languages: {
        en: `${BASE_URL}/en/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
        nl: `${BASE_URL}/nl/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}`,
      },
    },
  };
}

/**
 * Generate metadata for search pages
 */
export function getSearchMetadata(
  locale: string,
  query?: string,
  citySlug?: string,
  categorySlug?: string
): Metadata {
  let title = "Search Pet Services";
  let description = "Search for pet services near you. Find veterinarians, groomers, pet hotels, dog walkers, and more.";

  if (query) {
    title = `Search results for "${query}"`;
    description = `Find pet services matching "${query}". Browse reviews, compare prices, and book appointments.`;
  }

  if (citySlug && !query) {
    const cityName = citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    title = `Pet Services in ${cityName}`;
    description = `Browse pet services in ${cityName}. Find trusted providers and book appointments.`;
  }

  return {
    title,
    description,
    robots: {
      index: !query, // Don't index search result pages with queries
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/search`,
      type: "website",
    },
  };
}

/**
 * Generate metadata for static pages
 */
export function getStaticPageMetadata(
  page: "about" | "contact" | "privacy" | "terms" | "for-businesses",
  locale: string
): Metadata {
  const pages = {
    about: {
      title: "About Us",
      description: `Learn about ${SITE_NAME}, the leading pet services directory. Our mission is to connect pet owners with trusted pet care providers.`,
    },
    contact: {
      title: "Contact Us",
      description: `Get in touch with ${SITE_NAME}. We're here to help pet owners and businesses connect.`,
    },
    privacy: {
      title: "Privacy Policy",
      description: `Read ${SITE_NAME}'s privacy policy. Learn how we collect, use, and protect your personal information.`,
    },
    terms: {
      title: "Terms of Service",
      description: `Read ${SITE_NAME}'s terms of service. Understand the rules and guidelines for using our platform.`,
    },
    "for-businesses": {
      title: "List Your Business",
      description: `Add your pet service business to ${SITE_NAME}. Reach thousands of pet owners looking for services like yours.`,
    },
  };

  const pageData = pages[page];

  return {
    title: pageData.title,
    description: pageData.description,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${BASE_URL}/${locale}/${page}`,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${page}`,
      languages: {
        en: `${BASE_URL}/en/${page}`,
        nl: `${BASE_URL}/nl/${page}`,
      },
    },
  };
}
