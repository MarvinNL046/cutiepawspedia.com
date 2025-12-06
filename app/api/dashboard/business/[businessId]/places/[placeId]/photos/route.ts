/**
 * Business Photos API
 *
 * POST /api/dashboard/business/[businessId]/places/[placeId]/photos - Upload photos
 * GET /api/dashboard/business/[businessId]/places/[placeId]/photos - Get photos
 * DELETE /api/dashboard/business/[businessId]/places/[placeId]/photos?photoId=X - Delete a photo
 * PATCH /api/dashboard/business/[businessId]/places/[placeId]/photos - Update photo (primary, order, alt/caption)
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { businesses, places } from "@/db/schema/directory";
import {
  createBusinessPhoto,
  getActivePhotosByPlaceId,
  getPhotoCountByPlaceId,
  getBusinessPhotoById,
  softDeleteBusinessPhoto,
  updateBusinessPhoto,
  setPrimaryPhoto,
  reorderPhotos,
} from "@/db/queries/businessPhotos";
import {
  uploadBusinessPhoto,
  deleteBusinessPhoto as deleteFromStorage,
  validateBusinessPhoto,
  validatePhotoCount,
  getBusinessPhotoUrl,
  BUSINESS_PHOTO_CONFIG,
} from "@/lib/storage/businessPhotos";
import { type PlanKey } from "@/lib/plans/config";

interface RouteParams {
  params: Promise<{ businessId: string; placeId: string }>;
}

/**
 * Verify business and place ownership
 */
async function verifyOwnership(
  businessId: number,
  placeId: number,
  userId: number
): Promise<{
  valid: boolean;
  business?: typeof businesses.$inferSelect;
  place?: typeof places.$inferSelect;
  error?: string;
}> {
  // Get business and verify ownership
  const [business] = await db
    .select()
    .from(businesses)
    .where(and(eq(businesses.id, businessId), eq(businesses.userId, userId)))
    .limit(1);

  if (!business) {
    return { valid: false, error: "Business not found or access denied" };
  }

  // Get place and verify it belongs to this business
  const [place] = await db
    .select()
    .from(places)
    .where(and(eq(places.id, placeId), eq(places.businessId, businessId)))
    .limit(1);

  if (!place) {
    return { valid: false, error: "Place not found or doesn't belong to this business" };
  }

  return { valid: true, business, place };
}

/**
 * POST: Upload photos to a place
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId: businessIdStr, placeId: placeIdStr } = await params;
    const businessId = parseInt(businessIdStr);
    const placeId = parseInt(placeIdStr);

    if (isNaN(businessId) || isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid business or place ID" }, { status: 400 });
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

    // Verify ownership
    const ownership = await verifyOwnership(businessId, placeId, user.id);
    if (!ownership.valid) {
      return NextResponse.json({ error: ownership.error }, { status: 403 });
    }

    const { business } = ownership;

    // Check plan limits
    const planKey = (business!.planKey || "FREE") as PlanKey;
    const currentCount = await getPhotoCountByPlaceId(placeId);
    const countError = validatePhotoCount(currentCount, planKey);
    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    // Parse multipart form data
    const formData = await request.formData();
    const files = formData.getAll("photos") as File[];
    const altTexts = formData.getAll("altTexts") as string[];
    const captions = formData.getAll("captions") as string[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No photos provided" }, { status: 400 });
    }

    // Check total would not exceed plan limit
    const planLimitCheck = validatePhotoCount(currentCount + files.length - 1, planKey);
    if (planLimitCheck) {
      return NextResponse.json(
        { error: `Cannot add ${files.length} photos. ${planLimitCheck.message}` },
        { status: 400 }
      );
    }

    // Upload each photo
    const uploadedPhotos = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const altText = altTexts[i] || null;
      const caption = captions[i] || null;

      try {
        // Validate file
        const validationError = validateBusinessPhoto(file, file.type);
        if (validationError) {
          errors.push({ filename: file.name, error: validationError.message });
          continue;
        }

        // Convert to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to storage
        const uploadResult = await uploadBusinessPhoto({
          file: buffer,
          mimeType: file.type,
          placeId: placeId,
          businessId: businessId,
          userId: user.id,
          altText: altText || undefined,
          caption: caption || undefined,
        });

        // Create database record
        const photo = await createBusinessPhoto({
          placeId: placeId,
          businessId: businessId,
          uploadedBy: user.id,
          storageKey: uploadResult.storageKey,
          width: uploadResult.width || null,
          height: uploadResult.height || null,
          sizeBytes: uploadResult.sizeBytes,
          mimeType: file.type,
          altText: altText,
          caption: caption,
          isPrimary: currentCount === 0 && i === 0, // First photo is primary
          status: "active",
        });

        uploadedPhotos.push({
          id: photo.id,
          url: getBusinessPhotoUrl(photo.storageKey),
          isPrimary: photo.isPrimary,
          sortOrder: photo.sortOrder,
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
    return NextResponse.json({ error: "Failed to upload photos" }, { status: 500 });
  }
}

/**
 * GET: Get photos for a place
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId: businessIdStr, placeId: placeIdStr } = await params;
    const businessId = parseInt(businessIdStr);
    const placeId = parseInt(placeIdStr);

    if (isNaN(businessId) || isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid business or place ID" }, { status: 400 });
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

    // Verify ownership
    const ownership = await verifyOwnership(businessId, placeId, user.id);
    if (!ownership.valid) {
      return NextResponse.json({ error: ownership.error }, { status: 403 });
    }

    // Get photos
    const photos = await getActivePhotosByPlaceId(placeId);

    return NextResponse.json({
      photos: photos.map((photo) => ({
        id: photo.id,
        url: getBusinessPhotoUrl(photo.storageKey),
        isPrimary: photo.isPrimary,
        sortOrder: photo.sortOrder,
        altText: photo.altText,
        caption: photo.caption,
        width: photo.width,
        height: photo.height,
        createdAt: photo.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get photos error:", error);
    return NextResponse.json({ error: "Failed to get photos" }, { status: 500 });
  }
}

/**
 * DELETE: Delete a specific photo
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId: businessIdStr, placeId: placeIdStr } = await params;
    const businessId = parseInt(businessIdStr);
    const placeId = parseInt(placeIdStr);

    if (isNaN(businessId) || isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid business or place ID" }, { status: 400 });
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

    // Verify ownership
    const ownership = await verifyOwnership(businessId, placeId, user.id);
    if (!ownership.valid) {
      return NextResponse.json({ error: ownership.error }, { status: 403 });
    }

    // Get the photo
    const photo = await getBusinessPhotoById(photoId);
    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Verify the photo belongs to this place
    if (photo.placeId !== placeId) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete from storage
    try {
      await deleteFromStorage(photo.storageKey);
    } catch (error) {
      console.error("Failed to delete from storage:", error);
      // Continue to delete DB record even if storage deletion fails
    }

    // Soft delete from database
    await softDeleteBusinessPhoto(photoId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete photo error:", error);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}

/**
 * PATCH: Update photo metadata or order
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId: businessIdStr, placeId: placeIdStr } = await params;
    const businessId = parseInt(businessIdStr);
    const placeId = parseInt(placeIdStr);

    if (isNaN(businessId) || isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid business or place ID" }, { status: 400 });
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

    // Verify ownership
    const ownership = await verifyOwnership(businessId, placeId, user.id);
    if (!ownership.valid) {
      return NextResponse.json({ error: ownership.error }, { status: 403 });
    }

    const body = await request.json();

    // Handle reorder request
    if (body.action === "reorder" && Array.isArray(body.photoIds)) {
      await reorderPhotos(placeId, body.photoIds);
      return NextResponse.json({ success: true });
    }

    // Handle set primary request
    if (body.action === "setPrimary" && body.photoId) {
      const photo = await getBusinessPhotoById(body.photoId);
      if (!photo || photo.placeId !== placeId) {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 });
      }
      await setPrimaryPhoto(body.photoId, placeId);
      return NextResponse.json({ success: true });
    }

    // Handle update metadata request
    if (body.photoId) {
      const photo = await getBusinessPhotoById(body.photoId);
      if (!photo || photo.placeId !== placeId) {
        return NextResponse.json({ error: "Photo not found" }, { status: 404 });
      }

      const updateData: { altText?: string; caption?: string } = {};
      if (body.altText !== undefined) updateData.altText = body.altText;
      if (body.caption !== undefined) updateData.caption = body.caption;

      if (Object.keys(updateData).length > 0) {
        await updateBusinessPhoto(body.photoId, updateData);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Update photo error:", error);
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 });
  }
}
