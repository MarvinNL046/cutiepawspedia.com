import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { db } from "@/db";
import { adPackages, adCampaigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  stripeCheckoutRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

// Checkout request schema
const checkoutSchema = z.object({
  businessId: z.number().int().positive(),
  campaignId: z.number().int().positive(),
  packageKey: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

/**
 * POST /api/stripe/ads/checkout
 * Creates a Stripe Checkout session for purchasing an ad campaign
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = checkoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { businessId, campaignId, packageKey, successUrl, cancelUrl } = result.data;

    // Rate limiting: max 10 checkout sessions per hour per business
    const rateLimitResult = await stripeCheckoutRateLimiter(
      `ads_${businessId}`
    );

    if (!rateLimitResult.allowed) {
      console.warn(
        `Rate limit exceeded for ad checkout - businessId: ${businessId}`
      );
      return rateLimitExceededResponse(
        "Too many checkout sessions. Please wait before creating another."
      );
    }

    // Find the selected package
    const [pkg] = await db
      .select()
      .from(adPackages)
      .where(and(eq(adPackages.key, packageKey), eq(adPackages.isActive, true)))
      .limit(1);

    if (!pkg) {
      return NextResponse.json(
        { error: "Invalid package selected" },
        { status: 400 }
      );
    }

    // Verify campaign exists and belongs to business
    const [campaign] = await db
      .select()
      .from(adCampaigns)
      .where(
        and(
          eq(adCampaigns.id, campaignId),
          eq(adCampaigns.businessId, businessId)
        )
      )
      .limit(1);

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.status !== "draft" && campaign.status !== "pending_payment") {
      return NextResponse.json(
        { error: "Campaign is not in a payable state" },
        { status: 400 }
      );
    }

    // Update campaign to pending_payment
    await db
      .update(adCampaigns)
      .set({ status: "pending_payment", updatedAt: new Date() })
      .where(eq(adCampaigns.id, campaignId));

    // Build product name
    const productName = `CutiePawsPedia Ad: ${pkg.name} Package`;
    const productDescription = `${pkg.durationDays} days of advertising - ${pkg.includedPlacements.split(",").length} placements`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"], // Support cards and iDEAL for NL/EU
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: pkg.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "ad_campaign",
        businessId: businessId.toString(),
        campaignId: campaignId.toString(),
        packageId: pkg.id.toString(),
        packageKey: pkg.key,
        durationDays: pkg.durationDays.toString(),
        amountCents: pkg.priceCents.toString(),
      },
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    // Store checkout session ID on campaign
    await db
      .update(adCampaigns)
      .set({
        stripeCheckoutSessionId: session.id,
        updatedAt: new Date(),
      })
      .where(eq(adCampaigns.id, campaignId));

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe ad checkout error:", error);

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
