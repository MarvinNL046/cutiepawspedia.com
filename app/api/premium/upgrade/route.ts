import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upgradeToPremium } from "@/db/queries/premium";
import { PREMIUM_UPGRADE_PRICE_CENTS } from "@/lib/pricing/config";
import {
  premiumUpgradeRateLimiter,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

// Upgrade request schema
const upgradeSchema = z.object({
  placeId: z.number().int().positive(),
  businessId: z.number().int().positive(),
});

/**
 * POST /api/premium/upgrade
 * Upgrade a place to premium listing using credits
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = upgradeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const { placeId, businessId } = result.data;

    // Rate limiting: max 5 upgrade attempts per day per business
    const rateLimitResult = await premiumUpgradeRateLimiter(
      businessId.toString()
    );

    if (!rateLimitResult.allowed) {
      console.warn(
        `Rate limit exceeded for premium upgrade - businessId: ${businessId}`
      );
      return rateLimitExceededResponse(
        "Too many upgrade attempts. Please try again tomorrow."
      );
    }

    // Attempt the upgrade
    const upgradeResult = await upgradeToPremium(placeId, businessId);

    if (!upgradeResult.success) {
      return NextResponse.json(
        { error: upgradeResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Place upgraded to premium successfully",
      transaction: upgradeResult.transaction,
    });
  } catch (error) {
    console.error("Premium upgrade error:", error);
    return NextResponse.json(
      { error: "Failed to upgrade to premium" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/premium/upgrade
 * Get premium upgrade pricing info
 */
export async function GET() {
  return NextResponse.json({
    priceCents: PREMIUM_UPGRADE_PRICE_CENTS,
    priceFormatted: `€${(PREMIUM_UPGRADE_PRICE_CENTS / 100).toFixed(2)}`,
    features: [
      "Featured placement in search results",
      "Premium badge on listing",
      "Discounted lead pricing (€1.50 vs €2.50)",
      "Priority in category pages",
    ],
  });
}
