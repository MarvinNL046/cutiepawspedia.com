import { NextResponse } from "next/server";
import { z } from "zod";
import { createShortLink, isShortioConfigured } from "@/lib/links/shortio";

// Validation schema
const shortenSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  path: z.string().optional(),
  title: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * POST /api/links/shorten
 * Create a shortened URL using Short.io
 */
export async function POST(request: Request) {
  try {
    // Check if Short.io is configured
    if (!isShortioConfigured) {
      return NextResponse.json(
        { error: "Link shortening service not configured" },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = shortenSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { url, path, title, tags } = result.data;

    // Create the short link
    const shortLinkResult = await createShortLink({
      url,
      path,
      title,
      tags,
    });

    if (!shortLinkResult.success) {
      return NextResponse.json(
        { error: shortLinkResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      shortUrl: shortLinkResult.data.shortURL,
      originalUrl: shortLinkResult.data.originalURL,
      path: shortLinkResult.data.path,
      id: shortLinkResult.data.idString,
    });
  } catch (error) {
    console.error("Link shortening error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
