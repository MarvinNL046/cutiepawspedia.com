/**
 * Review Photos API
 *
 * POST /api/reviews/[id]/photos - Upload photos to a review
 * GET /api/reviews/[id]/photos - Get photos for a review
 * DELETE /api/reviews/[id]/photos/[photoId] - Delete a photo
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import {
  createReviewPhoto,
  getReviewPhotosByReviewId,
  deleteReviewPhoto as deleteReviewPhotoQuery,
  getReviewPhotoById,
} from "@/db/queries/reviewPhotos";
import { getReviewById } from "@/db/queries/reviews";
import {
  uploadReviewPhoto,
  deleteReviewPhoto as deleteFromStorage,
  REVIEW_PHOTO_CONFIG,
} from "@/lib/storage/reviewPhotos";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST: Upload photos to a review
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Authenticate user
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the review and verify ownership
    const review = await getReviewById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== user.id) {
      return NextResponse.json(
        { error: "You can only add photos to your own reviews" },
        { status: 403 }
      );
    }

    // Check existing photo count
    const existingPhotos = await getReviewPhotosByReviewId(reviewId);
    if (existingPhotos.length >= REVIEW_PHOTO_CONFIG.MAX_PHOTOS_PER_REVIEW) {
      return NextResponse.json(
        { error: `Maximum ${REVIEW_PHOTO_CONFIG.MAX_PHOTOS_PER_REVIEW} photos per review` },
        { status: 400 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const files = formData.getAll("photos") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No photos provided" }, { status: 400 });
    }

    // Check total would not exceed limit
    const availableSlots = REVIEW_PHOTO_CONFIG.MAX_PHOTOS_PER_REVIEW - existingPhotos.length;
    if (files.length > availableSlots) {
      return NextResponse.json(
        { error: `Can only add ${availableSlots} more photos` },
        { status: 400 }
      );
    }

    // Upload each photo
    const uploadedPhotos = [];
    const errors = [];

    for (const file of files) {
      try {
        // Validate file
        if (file.size > REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE) {
          errors.push({
            filename: file.name,
            error: "File too large",
          });
          continue;
        }

        if (
          !REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.includes(
            file.type as (typeof REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES)[number]
          )
        ) {
          errors.push({
            filename: file.name,
            error: "Invalid file type",
          });
          continue;
        }

        // Convert to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to storage
        const uploadResult = await uploadReviewPhoto({
          file: buffer,
          mimeType: file.type,
          placeId: review.placeId,
          reviewId: reviewId,
          userId: user.id,
        });

        // Create database record
        const photo = await createReviewPhoto({
          reviewId: reviewId,
          placeId: review.placeId,
          userId: user.id,
          storageKey: uploadResult.storageKey,
          width: uploadResult.width || null,
          height: uploadResult.height || null,
          mimeType: file.type,
          filesizeBytes: uploadResult.size,
          altText: null,
          status: "pending", // Pending moderation
        });

        uploadedPhotos.push({
          id: photo.id,
          url: uploadResult.url,
          status: photo.status,
        });
      } catch (error) {
        console.error("Failed to upload photo:", error);
        errors.push({
          filename: file.name,
          error: error instanceof Error ? error.message : "Upload failed",
        });
      }
    }

    return NextResponse.json({
      uploaded: uploadedPhotos,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload photos" },
      { status: 500 }
    );
  }
}

/**
 * GET: Get photos for a review
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const photos = await getReviewPhotosByReviewId(reviewId);

    return NextResponse.json({
      photos: photos.map((photo) => ({
        id: photo.id,
        url: `/uploads/${photo.storageKey}`, // Use getReviewPhotoUrl in production
        status: photo.status,
        width: photo.width,
        height: photo.height,
        createdAt: photo.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get photos error:", error);
    return NextResponse.json(
      { error: "Failed to get photos" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Delete a specific photo (via query param)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Get photoId from query params
    const { searchParams } = new URL(request.url);
    const photoId = parseInt(searchParams.get("photoId") || "");

    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    // Authenticate user
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the photo
    const photo = await getReviewPhotoById(photoId);
    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Verify the photo belongs to this review
    if (photo.reviewId !== reviewId) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Verify ownership (or admin)
    if (photo.userId !== user.id && user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only delete your own photos" },
        { status: 403 }
      );
    }

    // Delete from storage
    try {
      await deleteFromStorage(photo.storageKey);
    } catch (error) {
      console.error("Failed to delete from storage:", error);
      // Continue to delete DB record even if storage deletion fails
    }

    // Delete from database
    await deleteReviewPhotoQuery(photoId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete photo error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
