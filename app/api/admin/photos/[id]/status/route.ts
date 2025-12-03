/**
 * Admin Photo Status API
 *
 * PATCH /api/admin/photos/[id]/status - Update photo moderation status
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { reviewPhotos, places } from "@/db/schema/directory";
import { updateBadgesForPlace } from "@/lib/trustBadges";

const VALID_STATUSES = ["pending", "approved", "rejected", "flagged"] as const;
type PhotoStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const photoId = parseInt(id, 10);
    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    // Parse body
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + VALID_STATUSES.join(", ") },
        { status: 400 }
      );
    }

    // Get photo to find the place ID
    const [photo] = await db
      .select({ placeId: reviewPhotos.placeId })
      .from(reviewPhotos)
      .where(eq(reviewPhotos.id, photoId))
      .limit(1);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Update photo status
    await db
      .update(reviewPhotos)
      .set({
        status: status as PhotoStatus,
        updatedAt: new Date(),
      })
      .where(eq(reviewPhotos.id, photoId));

    // Recompute badges for the place (photo approval affects hasPhotos badge)
    if (photo.placeId) {
      try {
        await updateBadgesForPlace(photo.placeId);
      } catch (badgeError) {
        console.error("Failed to update badges:", badgeError);
        // Don't fail the request if badge update fails
      }
    }

    return NextResponse.json({
      success: true,
      photoId,
      status,
    });
  } catch (error) {
    console.error("Admin photo status update error:", error);
    return NextResponse.json(
      { error: "Failed to update photo status" },
      { status: 500 }
    );
  }
}
