// Short.io API integration for link shortening

const SHORTIO_API_KEY = process.env.SHORTIO_API_KEY;
const SHORTIO_DOMAIN = process.env.SHORTIO_DOMAIN || "link.cutiepawspedia.com";

// Check if Short.io is configured
export const isShortioConfigured = Boolean(SHORTIO_API_KEY);

interface ShortioLinkResponse {
  shortURL: string;
  originalURL: string;
  path: string;
  idString: string;
}

interface ShortioErrorResponse {
  error: string;
  message?: string;
}

interface CreateShortLinkOptions {
  /** The original URL to shorten */
  url: string;
  /** Custom path for the short link (optional) */
  path?: string;
  /** Title for the link (optional, for analytics) */
  title?: string;
  /** Tags for categorization (optional) */
  tags?: string[];
}

/**
 * Create a shortened link using Short.io API
 */
export async function createShortLink(
  options: CreateShortLinkOptions
): Promise<{ success: true; data: ShortioLinkResponse } | { success: false; error: string }> {
  if (!isShortioConfigured) {
    console.warn("Short.io not configured - link shortening disabled");
    return { success: false, error: "Link shortening service not configured" };
  }

  try {
    const response = await fetch("https://api.short.io/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: SHORTIO_API_KEY!,
      },
      body: JSON.stringify({
        domain: SHORTIO_DOMAIN,
        originalURL: options.url,
        path: options.path,
        title: options.title,
        tags: options.tags,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ShortioErrorResponse;
      console.error("Short.io API error:", errorData);
      return {
        success: false,
        error: errorData.message || errorData.error || "Failed to create short link",
      };
    }

    return {
      success: true,
      data: data as ShortioLinkResponse,
    };
  } catch (error) {
    console.error("Error creating short link:", error);
    return { success: false, error: "Failed to connect to link shortening service" };
  }
}

/**
 * Get link statistics from Short.io
 */
export async function getLinkStats(
  linkId: string
): Promise<{ success: true; data: Record<string, unknown> } | { success: false; error: string }> {
  if (!isShortioConfigured) {
    return { success: false, error: "Link shortening service not configured" };
  }

  try {
    const response = await fetch(`https://api.short.io/links/expand?link_id=${linkId}`, {
      method: "GET",
      headers: {
        Authorization: SHORTIO_API_KEY!,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: "Failed to get link stats" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error getting link stats:", error);
    return { success: false, error: "Failed to connect to service" };
  }
}

/**
 * Delete a short link
 */
export async function deleteShortLink(
  linkId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isShortioConfigured) {
    return { success: false, error: "Link shortening service not configured" };
  }

  try {
    const response = await fetch(`https://api.short.io/links/${linkId}`, {
      method: "DELETE",
      headers: {
        Authorization: SHORTIO_API_KEY!,
      },
    });

    if (!response.ok) {
      return { success: false, error: "Failed to delete link" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting short link:", error);
    return { success: false, error: "Failed to connect to service" };
  }
}

/**
 * Generate a short link for a place listing
 * Useful for sharing and tracking engagement
 */
export async function createPlaceShareLink(placeSlug: string, citySlug: string, countrySlug: string, locale = "en") {
  const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const originalUrl = `${baseUrl}/${locale}/${countrySlug}/${citySlug}/all/${placeSlug}`;

  return createShortLink({
    url: originalUrl,
    path: `p-${placeSlug}`,
    title: `CutiePawsPedia - ${placeSlug}`,
    tags: ["place", "share", locale],
  });
}

/**
 * Generate a short link for affiliate/referral tracking
 */
export async function createAffiliateLink(
  originalUrl: string,
  affiliateId: string,
  campaignName?: string
) {
  return createShortLink({
    url: originalUrl,
    path: `aff-${affiliateId}-${Date.now().toString(36)}`,
    title: `Affiliate: ${affiliateId}`,
    tags: ["affiliate", affiliateId, campaignName].filter(Boolean) as string[],
  });
}
