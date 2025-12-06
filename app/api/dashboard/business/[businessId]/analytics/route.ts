/**
 * Analytics API
 *
 * Endpoints for business analytics with plan-based feature access.
 *
 * GET: Get analytics data based on plan level
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById, getBusinessByIdForUser } from "@/db/queries/businesses";
import {
  getBasicAnalytics,
  getDailyViews,
  getDailyLeads,
  getDeviceBreakdown,
  getSourceBreakdown,
  getPlaceAnalytics,
  getConversionRate,
} from "@/db/queries/analytics";
import { getPlanFeatures, type PlanKey } from "@/lib/plans/config";

interface RouteParams {
  params: Promise<{ businessId: string }>;
}

/**
 * GET /api/dashboard/business/[businessId]/analytics
 * Get analytics data based on plan level
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
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

    // Get plan features
    const planKey = (business.planKey || "FREE") as PlanKey;
    const planFeatures = getPlanFeatures(planKey);

    // Check if analytics is enabled for this plan
    if (!planFeatures.hasBasicAnalytics) {
      return NextResponse.json(
        {
          error: "Analytics not available on your plan",
          planKey,
          hasBasicAnalytics: false,
          hasAdvancedAnalytics: false,
        },
        { status: 403 }
      );
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "30", 10);

    // Always get basic analytics
    const basicAnalytics = await getBasicAnalytics(businessIdNum);

    // Build response based on plan
    const response: Record<string, unknown> = {
      planKey,
      hasBasicAnalytics: planFeatures.hasBasicAnalytics,
      hasAdvancedAnalytics: planFeatures.hasAdvancedAnalytics,
      basic: basicAnalytics,
    };

    // Add advanced analytics if available
    if (planFeatures.hasAdvancedAnalytics) {
      const [dailyViews, dailyLeads, deviceBreakdown, sourceBreakdown, placeAnalytics, conversionRate] =
        await Promise.all([
          getDailyViews(businessIdNum, days),
          getDailyLeads(businessIdNum, days),
          getDeviceBreakdown(businessIdNum, days),
          getSourceBreakdown(businessIdNum, days),
          getPlaceAnalytics(businessIdNum, days),
          getConversionRate(businessIdNum, days),
        ]);

      response.advanced = {
        dailyViews,
        dailyLeads,
        deviceBreakdown,
        sourceBreakdown,
        placeAnalytics,
        conversionRate,
        days,
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
