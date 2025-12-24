import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { adPackages, adCampaigns, businesses } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries/users";

// Create campaign request schema
const createCampaignSchema = z.object({
  businessId: z.number().int().positive(),
  packageKey: z.string(),
  name: z.string().min(1).max(255),
  headline: z.string().min(1).max(100),
  headlineNl: z.string().max(100).optional(),
  description: z.string().max(255).nullable().optional(),
  descriptionNl: z.string().max(255).nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  destinationUrl: z.string().url().nullable().optional(),
  ctaText: z.string().max(50).optional(),
  ctaTextNl: z.string().max(50).optional(),
  placeId: z.number().int().positive().optional(),
});

/**
 * POST /api/ads/campaigns
 * Creates a new ad campaign in draft status
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
        { error: "You must be logged in to create campaigns" },
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
    const result = createCampaignSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request", details: result.error.issues },
        { status: 400 }
      );
    }

    const {
      businessId,
      packageKey,
      name,
      headline,
      headlineNl,
      description,
      descriptionNl,
      imageUrl,
      destinationUrl,
      ctaText,
      ctaTextNl,
      placeId,
    } = result.data;

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
        { error: "You don't have permission to create campaigns for this business" },
        { status: 403 }
      );
    }

    // Find the package
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

    // Create the campaign
    const [campaign] = await db
      .insert(adCampaigns)
      .values({
        businessId,
        packageId: pkg.id,
        placeId: placeId || null,
        name,
        status: "draft",
        headline,
        headlineNl: headlineNl || null,
        description: description || null,
        descriptionNl: descriptionNl || null,
        imageUrl: imageUrl || null,
        destinationUrl: destinationUrl || null,
        ctaText: ctaText || "Learn More",
        ctaTextNl: ctaTextNl || "Meer informatie",
        maxImpressions: pkg.maxImpressions,
        totalBudgetCents: pkg.priceCents,
      })
      .returning();

    return NextResponse.json({
      success: true,
      campaignId: campaign.id,
      packageId: pkg.id,
    });
  } catch (error) {
    console.error("Campaign creation error:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
