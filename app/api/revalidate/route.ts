/**
 * On-Demand Revalidation API
 *
 * PERFORMANCE: Enables targeted cache invalidation when content changes
 * - Revalidate by path (specific pages)
 * - Revalidate by tag (cached queries)
 * - Requires secret token for security
 *
 * Usage:
 * POST /api/revalidate
 * {
 *   "secret": "your-revalidation-secret",
 *   "path": "/nl/netherlands/amsterdam",  // optional
 *   "tag": "places"  // optional
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

interface RevalidateRequest {
  secret: string;
  path?: string;
  tag?: string;
  paths?: string[];
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RevalidateRequest;
    const { secret, path, tag, paths, tags } = body;

    // Validate secret
    if (!REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: "Revalidation secret not configured" },
        { status: 500 }
      );
    }

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Must provide at least one revalidation target
    if (!path && !tag && !paths?.length && !tags?.length) {
      return NextResponse.json(
        { error: "Must provide path, tag, paths, or tags" },
        { status: 400 }
      );
    }

    const revalidated: { paths: string[]; tags: string[] } = {
      paths: [],
      tags: [],
    };

    // Revalidate single path
    if (path) {
      revalidatePath(path);
      revalidated.paths.push(path);
    }

    // Revalidate multiple paths
    if (paths?.length) {
      for (const p of paths) {
        revalidatePath(p);
        revalidated.paths.push(p);
      }
    }

    // Revalidate single tag
    if (tag) {
      revalidateTag(tag, "default");
      revalidated.tags.push(tag);
    }

    // Revalidate multiple tags
    if (tags?.length) {
      for (const t of tags) {
        revalidateTag(t, "default");
        revalidated.tags.push(t);
      }
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      ...revalidated,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

/**
 * Convenience endpoints for common revalidation patterns
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");
  const path = searchParams.get("path");

  if (!REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: "Revalidation secret not configured" },
      { status: 500 }
    );
  }

  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path && !tag) {
    return NextResponse.json(
      { error: "Must provide path or tag query parameter" },
      { status: 400 }
    );
  }

  if (path) {
    revalidatePath(path);
  }

  if (tag) {
    revalidateTag(tag, "default");
  }

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
    path: path || undefined,
    tag: tag || undefined,
  });
}
