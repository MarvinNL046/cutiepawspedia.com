/**
 * Place Categories API
 *
 * Endpoints for managing place categories with plan-based limits.
 *
 * GET: Get categories for a place
 * PUT: Set categories for a place (replaces all)
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { getBusinessById, getBusinessByIdForUser } from "@/db/queries/businesses";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { places } from "@/db/schema/directory";
import {
  getAllCategories,
  getCategoriesForPlace,
  getCategoryCountForPlace,
  setPlaceCategories,
  validateCategoryIds,
} from "@/db/queries/categories";
import { getPlanFeatures, type PlanKey } from "@/lib/plans/config";

interface RouteParams {
  params: Promise<{ businessId: string; placeId: string }>;
}

/**
 * GET /api/dashboard/business/[businessId]/places/[placeId]/categories
 * Get all categories and selected categories for a place
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId, placeId } = await params;
    const businessIdNum = parseInt(businessId, 10);
    const placeIdNum = parseInt(placeId, 10);

    if (isNaN(businessIdNum) || isNaN(placeIdNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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

    // Verify place belongs to business
    const [place] = await db
      .select({ id: places.id })
      .from(places)
      .where(and(eq(places.id, placeIdNum), eq(places.businessId, businessIdNum)))
      .limit(1);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Get plan features
    const planKey = (business.planKey || "FREE") as PlanKey;
    const planFeatures = getPlanFeatures(planKey);

    // Get all categories and selected categories
    const [allCategories, selectedCategories] = await Promise.all([
      getAllCategories(),
      getCategoriesForPlace(placeIdNum),
    ]);

    return NextResponse.json({
      allCategories,
      selectedCategories,
      maxCategories: planFeatures.maxCategories,
      planKey,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/dashboard/business/[businessId]/places/[placeId]/categories
 * Set categories for a place (replaces all existing categories)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { businessId, placeId } = await params;
    const businessIdNum = parseInt(businessId, 10);
    const placeIdNum = parseInt(placeId, 10);

    if (isNaN(businessIdNum) || isNaN(placeIdNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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

    // Verify place belongs to business
    const [place] = await db
      .select({ id: places.id })
      .from(places)
      .where(and(eq(places.id, placeIdNum), eq(places.businessId, businessIdNum)))
      .limit(1);

    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    const categoryIds: number[] = body.categoryIds || [];

    // Validate category IDs
    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { error: "categoryIds must be an array" },
        { status: 400 }
      );
    }

    // Check for duplicates
    const uniqueCategoryIds = [...new Set(categoryIds)];

    // Validate that all category IDs exist
    if (uniqueCategoryIds.length > 0) {
      const valid = await validateCategoryIds(uniqueCategoryIds);
      if (!valid) {
        return NextResponse.json(
          { error: "One or more category IDs are invalid" },
          { status: 400 }
        );
      }
    }

    // Check plan limit
    const planKey = (business.planKey || "FREE") as PlanKey;
    const planFeatures = getPlanFeatures(planKey);

    if (uniqueCategoryIds.length > planFeatures.maxCategories) {
      return NextResponse.json(
        {
          error: `Your ${planKey} plan allows up to ${planFeatures.maxCategories} categories`,
          limit: planFeatures.maxCategories,
          requested: uniqueCategoryIds.length,
        },
        { status: 403 }
      );
    }

    // Set categories
    await setPlaceCategories(placeIdNum, uniqueCategoryIds);

    // Get updated categories
    const selectedCategories = await getCategoriesForPlace(placeIdNum);

    return NextResponse.json({
      success: true,
      selectedCategories,
      count: selectedCategories.length,
      maxCategories: planFeatures.maxCategories,
    });
  } catch (error) {
    console.error("Error updating categories:", error);
    return NextResponse.json(
      { error: "Failed to update categories" },
      { status: 500 }
    );
  }
}
