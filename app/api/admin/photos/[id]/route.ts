/**
 * Admin Photo API
 *
 * DELETE /api/admin/photos/[id] - Delete a photo
 * GET /api/admin/photos/[id] - Get photo details
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { reviewPhotos, places, reviews, users } from "@/db/schema/directory";
import { deleteReviewPhoto } from "@/lib/storage/reviewPhotos";
import { updateBadgesForPlace } from "@/lib/trustBadges";

export async function GET(
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

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Get photo with related data
    const [photo] = await db
      .select({
        id: reviewPhotos.id,
        storageKey: reviewPhotos.storageKey,
        mimeType: reviewPhotos.mimeType,
        status: reviewPhotos.status,
        createdAt: reviewPhotos.createdAt,
        updatedAt: reviewPhotos.updatedAt,
        placeName: places.name,
        placeSlug: places.slug,
        reviewTitle: reviews.title,
        reviewBody: reviews.body,
        uploaderName: users.name,
        uploaderEmail: users.email,
      })
      .from(reviewPhotos)
      .leftJoin(places, eq(reviewPhotos.placeId, places.id))
      .leftJoin(reviews, eq(reviewPhotos.reviewId, reviews.id))
      .leftJoin(users, eq(reviewPhotos.userId, users.id))
      .where(eq(reviewPhotos.id, photoId))
      .limit(1);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json(photo);
  } catch (error) {
    console.error("Admin get photo error:", error);
    return NextResponse.json(
      { error: "Failed to get photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Get photo to delete from storage
    const [photo] = await db
      .select({
        id: reviewPhotos.id,
        storageKey: reviewPhotos.storageKey,
        placeId: reviewPhotos.placeId,
      })
      .from(reviewPhotos)
      .where(eq(reviewPhotos.id, photoId))
      .limit(1);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete from storage
    try {
      await deleteReviewPhoto(photo.storageKey);
    } catch (storageError) {
      console.error("Failed to delete from storage:", storageError);
      // Continue with database deletion even if storage fails
    }

    // Delete from database
    await db.delete(reviewPhotos).where(eq(reviewPhotos.id, photoId));

    // Recompute badges for the place
    if (photo.placeId) {
      try {
        await updateBadgesForPlace(photo.placeId);
      } catch (badgeError) {
        console.error("Failed to update badges:", badgeError);
      }
    }

    return NextResponse.json({
      success: true,
      photoId,
    });
  } catch (error) {
    console.error("Admin delete photo error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
