/**
 * Admin Place Refresh API
 *
 * POST /api/admin/places/[id]/refresh - Enqueue place for refresh
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth/admin";
import { enqueuePlaceRefresh } from "@/db/queries/refreshJobs";

export async function POST(
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
    const placeId = parseInt(id, 10);
    if (isNaN(placeId)) {
      return NextResponse.json({ error: "Invalid place ID" }, { status: 400 });
    }

    // Enqueue with high priority since it's manual
    const result = await enqueuePlaceRefresh({
      placeId,
      reason: "MANUAL",
      priority: 5, // High priority for manual requests
    });

    return NextResponse.json({
      success: true,
      jobId: result.id,
      isNew: result.isNew,
    });
  } catch (error) {
    console.error("Admin place refresh error:", error);
    return NextResponse.json(
      { error: "Failed to enqueue refresh" },
      { status: 500 }
    );
  }
}
