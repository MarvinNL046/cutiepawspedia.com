/**
 * Profile API (P3)
 *
 * API for managing user profiles
 * GET /api/profile - Get current user's profile
 * PATCH /api/profile - Update current user's profile
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId, deleteUserAccount } from "@/db/queries/users";
import {
  getUserProfile,
  updateUserProfile,
  isUsernameAvailable,
} from "@/db/queries/userProfiles";

// Schema for profile update
const updateProfileSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and hyphens")
    .optional(),
  bio: z.string().max(500).optional().nullable(),
  location: z.string().max(255).optional().nullable(),
  websiteUrl: z.string().url().max(500).optional().nullable().or(z.literal("")),
  socialLinks: z.record(z.string()).optional().nullable(),
  preferredLocale: z.enum(["en", "nl", "de"]).optional(),
  isPublic: z.boolean().optional(),
});

/**
 * GET - Get current user's profile
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to view your profile" },
        { status: 401 }
      );
    }

    // Get our internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Get full profile
    const profile = await getUserProfile(user.id);
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Update current user's profile
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 }
      );
    }

    // Get our internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: result.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // If username is being updated, check availability
    if (data.username) {
      const normalizedUsername = data.username.toLowerCase();
      const available = await isUsernameAvailable(normalizedUsername, user.id);
      if (!available) {
        return NextResponse.json(
          { error: "Username is not available" },
          { status: 400 }
        );
      }
      data.username = normalizedUsername;
    }

    // Handle empty string for websiteUrl (convert to null)
    if (data.websiteUrl === "") {
      data.websiteUrl = null;
    }

    // Update profile
    const updatedProfile = await updateUserProfile(user.id, data);

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete current user's account and all associated data (GDPR)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to delete your account" },
        { status: 401 }
      );
    }

    // Get our internal user
    const user = await getUserByStackAuthId(stackUser.id);
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    // Parse request body for confirmation
    const body = await request.json().catch(() => ({}));
    const { confirmEmail } = body;

    // Require email confirmation to prevent accidental deletion
    if (confirmEmail !== user.email) {
      return NextResponse.json(
        { error: "Please confirm your email address to delete your account" },
        { status: 400 }
      );
    }

    // Perform cascade delete
    const result = await deleteUserAccount(user.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete account" },
        { status: 500 }
      );
    }

    // Also delete from StackAuth
    try {
      await stackUser.delete();
    } catch (stackError) {
      console.error("Failed to delete StackAuth user:", stackError);
      // Continue anyway - local data is already deleted
    }

    return NextResponse.json({
      success: true,
      message: "Your account and all associated data have been permanently deleted",
      deletedData: result.deletedData,
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account. Please try again or contact support." },
      { status: 500 }
    );
  }
}
