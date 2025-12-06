import { NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { upsertUserFromStackAuth } from "@/db/queries/users";
import { checkAndAwardBadges } from "@/db/queries/badges";

/**
 * POST /api/auth/sync
 * Sync the current StackAuth user to our database
 * Called after successful login/signup
 */
export async function POST() {
  try {
    // Check if Stack Auth is configured
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Auth not configured" },
        { status: 503 }
      );
    }

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Sync user to our database
    const dbUser = await upsertUserFromStackAuth({
      stackauthId: user.id,
      email: user.primaryEmail || "",
      name: user.displayName,
      emailVerified: user.primaryEmailVerified,
    });

    // Check and award any badges the user qualifies for
    if (dbUser) {
      checkAndAwardBadges(dbUser.id).catch((error) => {
        console.error("Failed to check/award badges during sync:", error);
      });
    }

    return NextResponse.json({
      success: true,
      user: dbUser,
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
