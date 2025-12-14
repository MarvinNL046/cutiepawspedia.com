import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminUser } from "@/lib/auth/admin";

// Validation schema
const updateStatusSchema = z.object({
  feedbackId: z.number(),
  status: z.enum(["new", "in_progress", "resolved", "wont_fix"]),
  adminNotes: z.string().optional(),
});

/**
 * POST /api/admin/feedback/status
 * Update feedback status (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const authResult = await getAdminUser();
    if (!authResult.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { feedbackId, status, adminNotes } = result.data;

    // Update the feedback
    const updateData: {
      status: typeof status;
      updatedAt: Date;
      adminNotes?: string | null;
      resolvedAt?: Date | null;
    } = {
      status,
      updatedAt: new Date(),
    };

    // If admin notes are provided, update them
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes || null;
    }

    // Set resolvedAt timestamp when status changes to resolved
    if (status === "resolved") {
      updateData.resolvedAt = new Date();
    } else if (status !== "wont_fix") {
      // Clear resolvedAt if status is not resolved or wont_fix
      updateData.resolvedAt = null;
    }

    await db.update(feedback).set(updateData).where(eq(feedback.id, feedbackId));

    return NextResponse.json({
      success: true,
      message: "Feedback status updated",
    });
  } catch (error) {
    console.error("Feedback status update error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
