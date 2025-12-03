import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { addCredits } from "@/db/queries/credits";
import { logAuditEvent } from "@/db/queries/auditLogs";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("Missing stripe-signature header");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        // Log successful payment (checkout.session.completed handles the actual credit addition)
        console.log("Payment succeeded:", event.data.object);
        break;
      }

      case "payment_intent.payment_failed": {
        // Log failed payment
        console.error("Payment failed:", event.data.object);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata;

  if (!metadata) {
    console.error("No metadata in checkout session");
    return;
  }

  const { type, businessId, amountCents } = metadata;

  // Only handle credit purchases
  if (type !== "credit_purchase") {
    console.log(`Ignoring checkout session of type: ${type}`);
    return;
  }

  if (!businessId || !amountCents) {
    console.error("Missing required metadata:", metadata);
    return;
  }

  try {
    // Add credits to the business account
    const transaction = await addCredits({
      businessId: parseInt(businessId, 10),
      amountCents: parseInt(amountCents, 10),
      type: "purchase",
      description: `Credit purchase via Stripe`,
      stripePaymentIntentId: session.payment_intent as string,
    });

    // Log STRIPE_TOPUP_COMPLETED audit event
    logAuditEvent({
      actorBusinessId: parseInt(businessId, 10),
      actorRole: "system",
      eventType: "STRIPE_TOPUP_COMPLETED",
      targetType: "payment",
      targetId: transaction.id,
      metadata: {
        amountCents: parseInt(amountCents, 10),
        stripePaymentIntentId: session.payment_intent,
        stripeSessionId: session.id,
      },
    });

    console.log(
      `Successfully added ${amountCents} cents to business ${businessId}. Transaction ID: ${transaction.id}`
    );
  } catch (error) {
    console.error("Failed to add credits:", error);
    throw error; // Re-throw to trigger webhook retry
  }
}
