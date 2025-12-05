/**
 * Profile Badges API (P3)
 *
 * Get badges for the current user
 * GET /api/profile/badges
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBadgesForUser, getAllBadgeDefinitions } from "@/db/queries/badges";

/**
 * GET - Get current user's badges
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
        { error: "You must be logged in to view your badges" },
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

    // Get user's badges
    const userBadges = await getBadgesForUser(user.id);

    // Get all badge definitions for reference
    const allBadges = await getAllBadgeDefinitions();

    // Map user badges with full badge info
    const earnedBadges = userBadges.map((ub) => ({
      key: ub.badgeKey,
      label: ub.badge.label,
      labelNl: ub.badge.labelNl,
      description: ub.badge.description,
      descriptionNl: ub.badge.descriptionNl,
      icon: ub.badge.icon,
      category: ub.badge.category,
      awardedAt: ub.awardedAt,
    }));

    // Calculate which badges are not yet earned
    const earnedKeys = new Set(earnedBadges.map((b) => b.key));
    const unearnedBadges = allBadges
      .filter((b) => !earnedKeys.has(b.key))
      .map((b) => ({
        key: b.key,
        label: b.label,
        labelNl: b.labelNl,
        description: b.description,
        descriptionNl: b.descriptionNl,
        icon: b.icon,
        category: b.category,
      }));

    return NextResponse.json({
      earned: earnedBadges,
      unearned: unearnedBadges,
      totalEarned: earnedBadges.length,
      totalAvailable: allBadges.length,
    });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}
