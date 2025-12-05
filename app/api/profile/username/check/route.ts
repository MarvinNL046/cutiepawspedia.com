/**
 * Username Check API (P3)
 *
 * Check if a username is available
 * GET /api/profile/username/check?username=xxx
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { isUsernameAvailable } from "@/db/queries/userProfiles";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Normalize username
    const normalizedUsername = username.toLowerCase().trim();

    // Basic validation
    if (normalizedUsername.length < 3) {
      return NextResponse.json({
        available: false,
        reason: "Username must be at least 3 characters",
      });
    }

    if (normalizedUsername.length > 50) {
      return NextResponse.json({
        available: false,
        reason: "Username must be at most 50 characters",
      });
    }

    if (!/^[a-z0-9_-]+$/.test(normalizedUsername)) {
      return NextResponse.json({
        available: false,
        reason: "Username can only contain lowercase letters, numbers, underscores, and hyphens",
      });
    }

    // Check authentication for excluding current user
    let excludeUserId: number | undefined;
    if (stackServerApp) {
      const stackUser = await stackServerApp.getUser();
      if (stackUser) {
        const user = await getUserByStackAuthId(stackUser.id);
        if (user) {
          excludeUserId = user.id;
        }
      }
    }

    // Check availability
    const available = await isUsernameAvailable(normalizedUsername, excludeUserId);

    return NextResponse.json({
      available,
      username: normalizedUsername,
      reason: available ? null : "Username is already taken or reserved",
    });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "Failed to check username availability" },
      { status: 500 }
    );
  }
}
