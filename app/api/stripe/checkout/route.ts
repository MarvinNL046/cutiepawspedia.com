import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { CREDIT_PACKAGES, STRIPE_CURRENCY } from "@/lib/pricing/config";
import {
  stripeCheckoutRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";
import { db } from "@/db";
import { businesses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

// Checkout request schema
const checkoutSchema = z.object({
  businessId: z.number().int().positive(),
  packageId: z.enum(["credits_20", "credits_50", "credits_100"]),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout session for purchasing credits
 * Requires authentication and business ownership
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    if (!stackServerApp) {
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }

    const stackUser = await stackServerApp.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "You must be logged in to purchase credits" },
        { status: 401 }
      );
    }

    // 2. Get internal user
    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = checkoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { businessId, packageId, successUrl, cancelUrl } = result.data;

    // 3. Authorization check: must be admin OR own the business
    const isAdmin = dbUser.role === "admin";
    let hasAccess = isAdmin;

    if (!isAdmin) {
      const business = await db.query.businesses.findFirst({
        where: and(
          eq(businesses.id, businessId),
          eq(businesses.userId, dbUser.id)
        ),
        columns: { id: true },
      });
      hasAccess = !!business;
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: "You don't have permission to purchase credits for this business" },
        { status: 403 }
      );
    }

    // Rate limiting: max 10 checkout sessions per hour per business
    const rateLimitResult = await stripeCheckoutRateLimiter(
      businessId.toString()
    );

    if (!rateLimitResult.allowed) {
      console.warn(
        `Rate limit exceeded for Stripe checkout - businessId: ${businessId}`
      );
      return rateLimitExceededResponse(
        "Too many checkout sessions. Please wait before creating another."
      );
    }

    // Find the selected package
    const selectedPackage = CREDIT_PACKAGES.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) {
      return NextResponse.json(
        { error: "Invalid package selected" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"], // Support cards and iDEAL for NL/EU
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: STRIPE_CURRENCY,
            product_data: {
              name: `Credit Top-up: ${selectedPackage.label}`,
              description: `Add ${selectedPackage.credits} credits to your account`,
            },
            unit_amount: selectedPackage.amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "credit_purchase",
        businessId: businessId.toString(),
        amountCents: selectedPackage.amountCents.toString(),
        credits: selectedPackage.credits.toString(),
        packageId,
      },
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
