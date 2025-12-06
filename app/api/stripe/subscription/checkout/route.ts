import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { db } from "@/db";
import { businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { getStripePriceId, type PlanKey } from "@/lib/plans/config";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

// Checkout request schema
const checkoutSchema = z.object({
  businessId: z.number().int().positive(),
  planKey: z.enum(["STARTER", "PRO", "ELITE"]),
  interval: z.enum(["monthly", "yearly"]),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

/**
 * POST /api/stripe/subscription/checkout
 * Creates a Stripe Checkout session for subscribing to a plan
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const stackUser = await stackServerApp?.getUser();
    if (!stackUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await getUserByStackAuthId(stackUser.id);
    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
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

    const { businessId, planKey, interval, successUrl, cancelUrl } = result.data;

    // Verify user owns this business (or is admin)
    const business = await db.query.businesses.findFirst({
      where: eq(businesses.id, businessId),
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Check ownership (unless admin)
    if (dbUser.role !== "admin" && business.userId !== dbUser.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Get Stripe Price ID for the selected plan
    const priceId = getStripePriceId(planKey as PlanKey, interval);
    if (!priceId) {
      return NextResponse.json(
        { error: "Plan not available. Please contact support." },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    let stripeCustomerId = business.stripeCustomerId;

    if (!stripeCustomerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: business.contactEmail || dbUser.email || undefined,
        name: business.name,
        metadata: {
          businessId: businessId.toString(),
          userId: dbUser.id.toString(),
        },
      });
      stripeCustomerId = customer.id;

      // Store customer ID in database
      await db
        .update(businesses)
        .set({ stripeCustomerId: customer.id })
        .where(eq(businesses.id, businessId));
    }

    // Check if business already has an active subscription
    if (business.stripeSubscriptionId) {
      // Redirect to customer portal for plan changes
      return NextResponse.json(
        {
          error: "Business already has an active subscription. Use the customer portal to change plans.",
          hasActiveSubscription: true
        },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card", "ideal"], // Support cards and iDEAL for NL/EU
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        type: "subscription",
        businessId: businessId.toString(),
        planKey,
        interval,
      },
      subscription_data: {
        metadata: {
          businessId: businessId.toString(),
          planKey,
        },
      },
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      // Allow promotion codes
      allow_promotion_codes: true,
      // Collect billing address for invoices
      billing_address_collection: "required",
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe subscription checkout error:", error);

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
