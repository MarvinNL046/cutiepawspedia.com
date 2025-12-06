import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { db } from "@/db";
import { businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

// Portal request schema
const portalSchema = z.object({
  businessId: z.number().int().positive(),
  returnUrl: z.string().url(),
});

/**
 * POST /api/stripe/subscription/portal
 * Creates a Stripe Customer Portal session for managing subscriptions
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
    const result = portalSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { businessId, returnUrl } = result.data;

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

    // Require Stripe customer ID
    if (!business.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found for this business" },
        { status: 400 }
      );
    }

    // Create Stripe Customer Portal Session
    const session = await stripe.billingPortal.sessions.create({
      customer: business.stripeCustomerId,
      return_url: returnUrl,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe portal error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
