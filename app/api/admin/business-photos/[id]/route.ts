/**
 * Admin Business Photo API
 *
 * DELETE /api/admin/business-photos/[id] - Delete a business photo
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth/admin";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { businessPhotos } from "@/db/schema/directory";
import { deleteBusinessPhoto as deleteFromStorage } from "@/lib/storage/businessPhotos";
import { softDeleteBusinessPhoto } from "@/db/queries/businessPhotos";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check with StackAuth
    const authResult = await getAdminUser();
    if (!authResult.authorized) {
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
        id: businessPhotos.id,
        storageKey: businessPhotos.storageKey,
        placeId: businessPhotos.placeId,
      })
      .from(businessPhotos)
      .where(eq(businessPhotos.id, photoId))
      .limit(1);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete from storage
    try {
      await deleteFromStorage(photo.storageKey);
    } catch (storageError) {
      console.error("Failed to delete from storage:", storageError);
      // Continue with database deletion even if storage fails
    }

    // Soft delete from database (this also updates place.hasPhotos)
    await softDeleteBusinessPhoto(photoId);

    return NextResponse.json({
      success: true,
      photoId,
    });
  } catch (error) {
    console.error("Admin delete business photo error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
