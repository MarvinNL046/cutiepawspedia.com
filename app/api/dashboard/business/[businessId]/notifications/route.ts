/**
 * Business Notifications API
 *
 * GET: Fetch notifications for a business
 * PATCH: Mark notification(s) as read
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById, getBusinessByIdForUser } from "@/db/queries/businesses";
import {
  getBusinessNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/db/queries/notifications";
import { isDatabaseAvailable } from "@/db";

interface RouteParams {
  params: Promise<{ businessId: string }>;
}

/**
 * GET /api/dashboard/business/[businessId]/notifications
 * Get notifications for a business
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    const { businessId } = await params;
    const businessIdNum = parseInt(businessId, 10);

    if (isNaN(businessIdNum)) {
      return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
    }

    // Verify authentication
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify business ownership (admin bypass)
    let business;
    if (dbUser.role === "admin") {
      business = await getBusinessById(businessIdNum);
    } else {
      business = await getBusinessByIdForUser({
        businessId: businessIdNum,
        userId: dbUser.id,
      });
    }

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const includeRead = searchParams.get("includeRead") !== "false";

    // Get notifications
    const { notifications, unreadCount } = await getBusinessNotifications(
      businessIdNum,
      { limit, includeRead }
    );

    return NextResponse.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/dashboard/business/[businessId]/notifications
 * Mark notification(s) as read
 *
 * Body: { notificationId?: number, markAll?: boolean }
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    const { businessId } = await params;
    const businessIdNum = parseInt(businessId, 10);

    if (isNaN(businessIdNum)) {
      return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
    }

    // Verify authentication
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify business ownership (admin bypass)
    let business;
    if (dbUser.role === "admin") {
      business = await getBusinessById(businessIdNum);
    } else {
      business = await getBusinessByIdForUser({
        businessId: businessIdNum,
        userId: dbUser.id,
      });
    }

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Parse body
    const body = await request.json();
    const { notificationId, markAll } = body;

    if (markAll) {
      // Mark all as read
      const count = await markAllNotificationsAsRead(businessIdNum);
      return NextResponse.json({
        success: true,
        markedCount: count,
      });
    } else if (notificationId) {
      // Mark single notification as read
      const success = await markNotificationAsRead(notificationId, businessIdNum);
      if (!success) {
        return NextResponse.json(
          { error: "Notification not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json(
        { error: "Must provide notificationId or markAll: true" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
