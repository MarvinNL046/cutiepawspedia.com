/**
 * Business Onboarding API
 *
 * POST /api/onboarding/business
 * Creates a new business with their first place (or claims an existing place)
 *
 * For FREE plan: Creates business immediately
 * For paid plans: Creates Stripe checkout session first
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { db } from "@/db";
import { businesses, places, placeCategories, users } from "@/db/schema/directory";
import { eq, and } from "drizzle-orm";
import { getStripePriceId, type PlanKey } from "@/lib/plans/config";
import Stripe from "stripe";

// Initialize Stripe if configured
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-11-17.clover" })
  : null;

/**
 * Generate a URL-safe slug from a name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}

/**
 * Ensure slug is unique by appending a number if needed
 */
async function ensureUniqueSlug(baseSlug: string, cityId: number): Promise<string> {
  if (!db) return baseSlug;

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db
      .select({ id: places.id })
      .from(places)
      .where(and(eq(places.slug, slug), eq(places.cityId, cityId)))
      .limit(1);

    if (existing.length === 0) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

interface OnboardingRequest {
  // User info (from session or provided)
  userId?: number;
  userEmail?: string;

  // Business info
  businessName: string;
  businessDescription: string;
  businessPhone?: string;
  businessEmail: string;
  businessWebsite?: string;
  countryId: number;

  // Plan
  planKey: "FREE" | "STARTER" | "PRO" | "ELITE";

  // Place info (for creating new)
  placeName?: string;
  placeDescription?: string;
  placeAddress?: string;
  cityId?: number;
  categoryIds?: number[];

  // Or claim existing place
  claimPlaceId?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Get current user from session
    const stackUser = stackServerApp ? await stackServerApp.getUser() : null;

    if (!stackUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 500 }
      );
    }

    const body: OnboardingRequest = await request.json();

    // Validate required fields
    if (!body.businessName?.trim()) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    if (!body.businessEmail?.trim()) {
      return NextResponse.json(
        { error: "Business email is required" },
        { status: 400 }
      );
    }

    if (!body.countryId) {
      return NextResponse.json(
        { error: "Country is required" },
        { status: 400 }
      );
    }

    // Must have either claimPlaceId or new place data
    if (!body.claimPlaceId && (!body.placeName?.trim() || !body.cityId)) {
      return NextResponse.json(
        { error: "Place name and city are required when creating a new place" },
        { status: 400 }
      );
    }

    // Get the user from our database
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.stackauthId, stackUser.id))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 400 }
      );
    }

    // For paid plans, create Stripe checkout session first
    if (body.planKey !== "FREE" && stripe) {
      // Get Stripe Price ID for the plan
      const priceId = getStripePriceId(body.planKey as PlanKey, "monthly");
      if (!priceId) {
        return NextResponse.json(
          { error: "Plan not available. Please contact support." },
          { status: 400 }
        );
      }

      // Get base URL for redirects - use request origin or fallback to production
      const requestOrigin = request.headers.get("origin") || request.headers.get("referer")?.split("/").slice(0, 3).join("/");
      const baseUrl = requestOrigin?.includes("localhost")
        ? "https://www.cutiepawspedia.com"  // Never redirect to localhost
        : (requestOrigin || "https://www.cutiepawspedia.com");

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card", "ideal"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/onboarding/business/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/onboarding/business?cancelled=true`,
        metadata: {
          type: "onboarding",
          userId: dbUser.id.toString(),
          businessName: body.businessName,
          businessDescription: body.businessDescription || "",
          businessPhone: body.businessPhone || "",
          businessEmail: body.businessEmail,
          businessWebsite: body.businessWebsite || "",
          countryId: body.countryId.toString(),
          planKey: body.planKey,
          placeName: body.placeName || "",
          placeDescription: body.placeDescription || "",
          placeAddress: body.placeAddress || "",
          cityId: body.cityId?.toString() || "",
          categoryIds: JSON.stringify(body.categoryIds || []),
          claimPlaceId: body.claimPlaceId?.toString() || "",
        },
        subscription_data: {
          metadata: {
            type: "onboarding",
            planKey: body.planKey,
          },
        },
        customer_email: body.businessEmail,
        allow_promotion_codes: true,
        billing_address_collection: "required",
      });

      return NextResponse.json({
        requiresPayment: true,
        checkoutUrl: session.url,
      });
    }

    // For FREE plan, create business immediately
    const businessResult = await createBusiness(dbUser.id, body);

    if (!businessResult.success) {
      return NextResponse.json(
        { error: businessResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      businessId: businessResult.businessId,
      placeId: businessResult.placeId,
    });
  } catch (error) {
    console.error("Error in business onboarding:", error);
    // Return more specific error message for debugging
    const errorMessage = error instanceof Error ? error.message : "Failed to create business";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * Create business and place (called for FREE plans or after successful payment)
 */
export async function createBusiness(
  userId: number,
  data: OnboardingRequest
): Promise<{
  success: boolean;
  businessId?: number;
  placeId?: number;
  error?: string;
}> {
  if (!db) {
    return { success: false, error: "Database not available" };
  }

  try {
    // 1. Create the business
    const [newBusiness] = await db
      .insert(businesses)
      .values({
        name: data.businessName.trim(),
        description: data.businessDescription?.trim() || null,
        contactPhone: data.businessPhone?.trim() || null,
        contactEmail: data.businessEmail.trim(),
        website: data.businessWebsite?.trim() || null,
        userId: userId,
        planKey: data.planKey,
        planStatus: "ACTIVE",
        creditBalanceCents: 0,
      })
      .returning();

    let placeId: number;

    // 2. Either claim existing place or create new one
    if (data.claimPlaceId) {
      // Claim existing place
      const [existingPlace] = await db
        .select()
        .from(places)
        .where(eq(places.id, data.claimPlaceId))
        .limit(1);

      if (!existingPlace) {
        return { success: false, error: "Place not found" };
      }

      if (existingPlace.businessId) {
        return { success: false, error: "Place is already claimed" };
      }

      // Update place to assign to this business
      await db
        .update(places)
        .set({
          businessId: newBusiness.id,
          ownerId: userId,
          updatedAt: new Date(),
        })
        .where(eq(places.id, data.claimPlaceId));

      placeId = data.claimPlaceId;
    } else {
      // Create new place
      const baseSlug = generateSlug(data.placeName!);
      const slug = await ensureUniqueSlug(baseSlug, data.cityId!);

      const [newPlace] = await db
        .insert(places)
        .values({
          name: data.placeName!.trim(),
          slug,
          description: data.placeDescription?.trim() || null,
          address: data.placeAddress?.trim() || null,
          cityId: data.cityId!,
          businessId: newBusiness.id,
          ownerId: userId,
          isPremium: false,
          premiumLevel: 0,
          avgRating: null,
          reviewCount: 0,
        })
        .returning();

      placeId = newPlace.id;

      // Add categories to the place
      if (data.categoryIds && data.categoryIds.length > 0) {
        await db.insert(placeCategories).values(
          data.categoryIds.map((categoryId) => ({
            placeId: newPlace.id,
            categoryId,
          }))
        );
      }
    }

    // 3. Update user role to "business" so they can access the dashboard
    await db
      .update(users)
      .set({ role: "business" })
      .where(eq(users.id, userId));

    return {
      success: true,
      businessId: newBusiness.id,
      placeId,
    };
  } catch (error) {
    console.error("Error creating business:", error);
    return { success: false, error: "Failed to create business" };
  }
}
