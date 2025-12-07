import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addCredits } from "@/db/queries/credits";
import { logAuditEvent } from "@/db/queries/auditLogs";
import { activateCampaign } from "@/db/queries/ads";
import { type PlanKey, type PlanStatus } from "@/lib/plans/config";
import { createBusiness } from "@/app/api/onboarding/business/route";
import { syncPremiumStatusForBusiness } from "@/lib/plans/syncPremiumStatus";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events for both credits (legacy) and subscriptions
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

    console.log(`Processing Stripe event: ${event.type}`);

    // Handle the event
    switch (event.type) {
      // ========== CHECKOUT EVENTS ==========
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      // ========== SUBSCRIPTION EVENTS ==========
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      // ========== INVOICE EVENTS ==========
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      // ========== LEGACY PAYMENT EVENTS (for credits) ==========
      case "payment_intent.succeeded": {
        console.log("Payment succeeded:", event.data.object);
        break;
      }

      case "payment_intent.payment_failed": {
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
 * Supports both subscription and one-time credit purchases
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata;

  if (!metadata) {
    console.error("No metadata in checkout session");
    return;
  }

  const { type, businessId } = metadata;

  // Handle subscription checkout
  if (type === "subscription") {
    console.log(`Subscription checkout completed for business ${businessId}`);
    // Subscription is handled by customer.subscription.created event
    return;
  }

  // Handle onboarding checkout (new business creation after payment)
  if (type === "onboarding") {
    const { userId, businessName, businessDescription, businessPhone, businessEmail,
            businessWebsite, countryId, planKey, placeName, placeDescription,
            placeAddress, cityId, categoryIds, claimPlaceId } = metadata;

    if (!userId || !businessName) {
      console.error("Missing required onboarding metadata:", metadata);
      return;
    }

    try {
      // Check if business already exists (from success page)
      const existingBusiness = await db.query.businesses.findFirst({
        where: eq(businesses.stripeSubscriptionId, session.subscription as string),
      });

      if (existingBusiness) {
        console.log(`Business already exists for session ${session.id}, skipping creation`);
        return;
      }

      // Create the business
      const result = await createBusiness(parseInt(userId, 10), {
        businessName,
        businessDescription: businessDescription || "",
        businessPhone: businessPhone || "",
        businessEmail,
        businessWebsite: businessWebsite || "",
        countryId: parseInt(countryId, 10),
        planKey: planKey as "STARTER" | "PRO" | "ELITE",
        placeName: placeName || undefined,
        placeDescription: placeDescription || undefined,
        placeAddress: placeAddress || undefined,
        cityId: cityId ? parseInt(cityId, 10) : undefined,
        categoryIds: categoryIds ? JSON.parse(categoryIds) : [],
        claimPlaceId: claimPlaceId ? parseInt(claimPlaceId, 10) : undefined,
      });

      if (result.success && result.businessId) {
        // Update business with Stripe subscription ID
        if (session.subscription) {
          await db
            .update(businesses)
            .set({
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            })
            .where(eq(businesses.id, result.businessId));
        }

        console.log(`Onboarding completed via webhook: business ${result.businessId} created`);

        logAuditEvent({
          actorBusinessId: result.businessId,
          actorRole: "system",
          eventType: "BUSINESS_CREATED_VIA_WEBHOOK",
          targetType: "business",
          targetId: result.businessId,
          metadata: {
            planKey,
            stripeSessionId: session.id,
            createdVia: "webhook",
          },
        });
      } else {
        console.error("Failed to create business via webhook:", result.error);
      }
    } catch (error) {
      console.error("Error creating business via webhook:", error);
      throw error;
    }
    return;
  }

  // Handle credit purchase (legacy)
  if (type === "credit_purchase") {
    const { amountCents } = metadata;
    if (!businessId || !amountCents) {
      console.error("Missing required metadata for credit purchase:", metadata);
      return;
    }

    try {
      const transaction = await addCredits({
        businessId: parseInt(businessId, 10),
        amountCents: parseInt(amountCents, 10),
        type: "purchase",
        description: `Credit purchase via Stripe`,
        stripePaymentIntentId: session.payment_intent as string,
      });

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

      console.log(`Added ${amountCents} cents to business ${businessId}`);
    } catch (error) {
      console.error("Failed to add credits:", error);
      throw error;
    }
  }

  // Handle ad campaign purchase
  if (type === "ad_campaign") {
    const { campaignId, durationDays, amountCents } = metadata;
    if (!businessId || !campaignId || !durationDays || !amountCents) {
      console.error("Missing required metadata for ad campaign:", metadata);
      return;
    }

    try {
      // Activate the campaign
      const campaign = await activateCampaign(
        parseInt(campaignId, 10),
        {
          paymentIntentId: session.payment_intent as string,
          checkoutSessionId: session.id,
          amountPaidCents: parseInt(amountCents, 10),
        },
        parseInt(durationDays, 10)
      );

      logAuditEvent({
        actorBusinessId: parseInt(businessId, 10),
        actorRole: "system",
        eventType: "AD_CAMPAIGN_ACTIVATED",
        targetType: "ad_campaign",
        targetId: campaign.id,
        metadata: {
          campaignId: campaign.id,
          amountPaidCents: parseInt(amountCents, 10),
          durationDays: parseInt(durationDays, 10),
          stripePaymentIntentId: session.payment_intent,
          stripeSessionId: session.id,
        },
      });

      console.log(`Activated ad campaign ${campaignId} for business ${businessId}`);
    } catch (error) {
      console.error("Failed to activate ad campaign:", error);
      throw error;
    }
  }
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const businessId = subscription.metadata?.businessId;
  const planKey = subscription.metadata?.planKey as PlanKey;

  if (!businessId) {
    console.error("No businessId in subscription metadata");
    return;
  }

  try {
    // Determine plan status based on subscription status
    let planStatus: PlanStatus = "ACTIVE";
    if (subscription.status === "trialing") {
      planStatus = "TRIAL";
    } else if (subscription.status === "past_due") {
      planStatus = "PAST_DUE";
    }

    // Update business with subscription details
    await db
      .update(businesses)
      .set({
        planKey: planKey || "STARTER",
        planStatus,
        stripeSubscriptionId: subscription.id,
        planValidUntil: new Date(subscription.current_period_end * 1000),
        trialEndsAt: subscription.trial_end
          ? new Date(subscription.trial_end * 1000)
          : null,
      })
      .where(eq(businesses.id, parseInt(businessId, 10)));

    // Sync premium status based on plan
    const premiumResult = await syncPremiumStatusForBusiness(parseInt(businessId, 10));
    console.log(`[syncPremiumStatus] Subscription created: ${premiumResult.placesUpdated} places updated, isPremium=${premiumResult.isPremium}`);

    // Log audit event
    logAuditEvent({
      actorBusinessId: parseInt(businessId, 10),
      actorRole: "system",
      eventType: "SUBSCRIPTION_CREATED",
      targetType: "business",
      targetId: parseInt(businessId, 10),
      metadata: {
        planKey,
        subscriptionId: subscription.id,
        status: subscription.status,
        premiumSynced: premiumResult.success,
        isPremium: premiumResult.isPremium,
      },
    });

    console.log(`Subscription created for business ${businessId}: ${planKey}`);
  } catch (error) {
    console.error("Failed to handle subscription created:", error);
    throw error;
  }
}

/**
 * Handle subscription updated (plan changes, renewals, etc.)
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const businessId = subscription.metadata?.businessId;

  if (!businessId) {
    // Try to find business by subscription ID
    const business = await db.query.businesses.findFirst({
      where: eq(businesses.stripeSubscriptionId, subscription.id),
    });
    if (!business) {
      console.error("Could not find business for subscription:", subscription.id);
      return;
    }
    await updateBusinessSubscription(business.id, subscription);
    return;
  }

  await updateBusinessSubscription(parseInt(businessId, 10), subscription);
}

/**
 * Update business subscription data
 */
async function updateBusinessSubscription(
  businessId: number,
  subscription: Stripe.Subscription
) {
  try {
    // Get plan key from subscription item price metadata or default
    let planKey: PlanKey = "FREE";
    const item = subscription.items.data[0];
    if (item?.price?.metadata?.planKey) {
      planKey = item.price.metadata.planKey as PlanKey;
    } else if (subscription.metadata?.planKey) {
      planKey = subscription.metadata.planKey as PlanKey;
    }

    // Determine plan status
    let planStatus: PlanStatus = "ACTIVE";
    switch (subscription.status) {
      case "active":
        planStatus = "ACTIVE";
        break;
      case "trialing":
        planStatus = "TRIAL";
        break;
      case "past_due":
        planStatus = "PAST_DUE";
        break;
      case "canceled":
      case "unpaid":
        planStatus = "CANCELLED";
        break;
      default:
        planStatus = "INACTIVE";
    }

    // If canceled but not yet ended, keep features until period end
    if (subscription.cancel_at_period_end && subscription.status === "active") {
      // Business can use features until period end, then downgrade
      console.log(`Subscription ${subscription.id} will cancel at period end`);
    }

    // Update business
    const effectivePlanKey = subscription.status === "canceled" ? "FREE" : planKey;
    await db
      .update(businesses)
      .set({
        planKey: effectivePlanKey,
        planStatus,
        planValidUntil: new Date(subscription.current_period_end * 1000),
        trialEndsAt: subscription.trial_end
          ? new Date(subscription.trial_end * 1000)
          : null,
      })
      .where(eq(businesses.id, businessId));

    // Sync premium status based on new plan
    const premiumResult = await syncPremiumStatusForBusiness(businessId);
    console.log(`[syncPremiumStatus] Subscription updated: ${premiumResult.placesUpdated} places updated, isPremium=${premiumResult.isPremium}`);

    // Log audit event
    logAuditEvent({
      actorBusinessId: businessId,
      actorRole: "system",
      eventType: "SUBSCRIPTION_UPDATED",
      targetType: "business",
      targetId: businessId,
      metadata: {
        planKey: effectivePlanKey,
        planStatus,
        subscriptionStatus: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        premiumSynced: premiumResult.success,
        isPremium: premiumResult.isPremium,
      },
    });

    console.log(`Subscription updated for business ${businessId}: ${effectivePlanKey} (${planStatus})`);
  } catch (error) {
    console.error("Failed to update business subscription:", error);
    throw error;
  }
}

/**
 * Handle subscription deleted/canceled
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const businessId = subscription.metadata?.businessId;

  // Try to find business by subscription ID if not in metadata
  let targetBusinessId: number | null = businessId ? parseInt(businessId, 10) : null;

  if (!targetBusinessId) {
    const business = await db.query.businesses.findFirst({
      where: eq(businesses.stripeSubscriptionId, subscription.id),
    });
    if (business) {
      targetBusinessId = business.id;
    }
  }

  if (!targetBusinessId) {
    console.error("Could not find business for deleted subscription:", subscription.id);
    return;
  }

  try {
    // Downgrade to free plan
    await db
      .update(businesses)
      .set({
        planKey: "FREE",
        planStatus: "CANCELLED",
        stripeSubscriptionId: null,
        planValidUntil: null,
        trialEndsAt: null,
      })
      .where(eq(businesses.id, targetBusinessId));

    // Remove premium status (FREE plan doesn't grant premium)
    const premiumResult = await syncPremiumStatusForBusiness(targetBusinessId);
    console.log(`[syncPremiumStatus] Subscription cancelled: ${premiumResult.placesUpdated} places updated, isPremium=${premiumResult.isPremium}`);

    // Log audit event
    logAuditEvent({
      actorBusinessId: targetBusinessId,
      actorRole: "system",
      eventType: "SUBSCRIPTION_CANCELLED",
      targetType: "business",
      targetId: targetBusinessId,
      metadata: {
        previousSubscriptionId: subscription.id,
        cancelReason: subscription.cancellation_details?.reason || "unknown",
        premiumSynced: premiumResult.success,
        isPremium: premiumResult.isPremium,
      },
    });

    console.log(`Subscription cancelled for business ${targetBusinessId}`);
  } catch (error) {
    console.error("Failed to handle subscription deleted:", error);
    throw error;
  }
}

/**
 * Handle successful invoice payment (subscription renewal)
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscriptionId = typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription.id;

  // Find business by subscription ID
  const business = await db.query.businesses.findFirst({
    where: eq(businesses.stripeSubscriptionId, subscriptionId),
  });

  if (!business) {
    console.log("Invoice paid for unknown subscription:", subscriptionId);
    return;
  }

  // Log successful payment
  logAuditEvent({
    actorBusinessId: business.id,
    actorRole: "system",
    eventType: "SUBSCRIPTION_PAYMENT_SUCCESS",
    targetType: "business",
    targetId: business.id,
    metadata: {
      invoiceId: invoice.id,
      amountPaid: invoice.amount_paid,
      currency: invoice.currency,
    },
  });

  console.log(`Invoice paid for business ${business.id}: ${invoice.amount_paid} ${invoice.currency}`);
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscriptionId = typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription.id;

  // Find business by subscription ID
  const business = await db.query.businesses.findFirst({
    where: eq(businesses.stripeSubscriptionId, subscriptionId),
  });

  if (!business) {
    console.log("Invoice failed for unknown subscription:", subscriptionId);
    return;
  }

  // Update plan status to PAST_DUE
  await db
    .update(businesses)
    .set({ planStatus: "PAST_DUE" })
    .where(eq(businesses.id, business.id));

  // Log failed payment
  logAuditEvent({
    actorBusinessId: business.id,
    actorRole: "system",
    eventType: "SUBSCRIPTION_PAYMENT_FAILED",
    targetType: "business",
    targetId: business.id,
    metadata: {
      invoiceId: invoice.id,
      amountDue: invoice.amount_due,
      currency: invoice.currency,
      attemptCount: invoice.attempt_count,
    },
  });

  console.error(`Invoice payment failed for business ${business.id}`);
}
