/**
 * Claim Verification API - Verify ownership with code
 *
 * POST /api/claims/[id]/verify - Submit verification code
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { db } from "@/db";
import { placeClaims, places, users, businesses } from "@/db/schema/directory";
import { eq, and } from "drizzle-orm";

const MAX_VERIFICATION_ATTEMPTS = 5;

interface VerifyRequest {
  code: string;
}

/**
 * POST /api/claims/[id]/verify - Verify claim with code
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const claimId = parseInt(id);

    if (isNaN(claimId)) {
      return NextResponse.json(
        { error: "Invalid claim ID" },
        { status: 400 }
      );
    }

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

    const body: VerifyRequest = await request.json();

    if (!body.code?.trim()) {
      return NextResponse.json(
        { error: "Verification code is required" },
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

    // Get the claim
    const [claim] = await db
      .select()
      .from(placeClaims)
      .where(
        and(eq(placeClaims.id, claimId), eq(placeClaims.userId, dbUser.id))
      )
      .limit(1);

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    // Check claim status
    if (claim.status !== "verification_sent") {
      if (claim.status === "verified" || claim.status === "approved") {
        return NextResponse.json({
          success: true,
          message: "Deze claim is al geverifieerd",
          status: claim.status,
        });
      }
      return NextResponse.json(
        { error: "Deze claim kan niet worden geverifieerd" },
        { status: 400 }
      );
    }

    // Check if verification code has expired
    if (claim.verificationCodeExpiresAt && new Date() > claim.verificationCodeExpiresAt) {
      return NextResponse.json(
        {
          error: "De verificatiecode is verlopen. Vraag een nieuwe code aan.",
          expired: true,
        },
        { status: 400 }
      );
    }

    // Check verification attempts
    const attempts = claim.verificationAttempts || 0;
    if (attempts >= MAX_VERIFICATION_ATTEMPTS) {
      return NextResponse.json(
        {
          error:
            "Te veel mislukte pogingen. Neem contact op met onze support voor hulp.",
          maxAttemptsReached: true,
        },
        { status: 400 }
      );
    }

    // Verify the code
    if (claim.verificationCode !== body.code.trim()) {
      // Increment attempts
      await db
        .update(placeClaims)
        .set({
          verificationAttempts: attempts + 1,
        })
        .where(eq(placeClaims.id, claimId));

      const remainingAttempts = MAX_VERIFICATION_ATTEMPTS - attempts - 1;
      return NextResponse.json(
        {
          error: `Ongeldige verificatiecode. Je hebt nog ${remainingAttempts} poging${remainingAttempts === 1 ? "" : "en"} over.`,
          remainingAttempts,
        },
        { status: 400 }
      );
    }

    // Code is correct! Update claim status to verified
    await db
      .update(placeClaims)
      .set({
        status: "verified",
        verifiedAt: new Date(),
        verificationAttempts: attempts + 1, // Record final successful attempt
      })
      .where(eq(placeClaims.id, claimId));

    // Get the place info
    const [place] = await db
      .select()
      .from(places)
      .where(eq(places.id, claim.placeId))
      .limit(1);

    // For email_domain and phone verification, we can auto-approve
    // For document/manual, it stays at "verified" for admin review
    if (
      claim.verificationMethod === "email_domain" ||
      claim.verificationMethod === "phone"
    ) {
      // Auto-approve the claim
      await db
        .update(placeClaims)
        .set({
          status: "approved",
          reviewedAt: new Date(),
          adminNotes: `Auto-approved via ${claim.verificationMethod} verification`,
        })
        .where(eq(placeClaims.id, claimId));

      // Check if user already has a business
      const existingBusiness = await db
        .select()
        .from(businesses)
        .where(eq(businesses.userId, dbUser.id))
        .limit(1);

      let businessId: number;

      if (existingBusiness.length > 0) {
        // Use existing business
        businessId = existingBusiness[0].id;
      } else {
        // Create a new business for the user
        const [newBusiness] = await db
          .insert(businesses)
          .values({
            name: place?.name || "Mijn Bedrijf",
            userId: dbUser.id,
            contactEmail: claim.verificationEmail || dbUser.email || "",
            contactPhone: claim.verificationPhone || null,
            planKey: "FREE",
            planStatus: "ACTIVE",
            creditBalanceCents: 0,
          })
          .returning();
        businessId = newBusiness.id;
      }

      // Link the place to the business
      await db
        .update(places)
        .set({
          businessId: businessId,
          ownerId: dbUser.id,
          updatedAt: new Date(),
        })
        .where(eq(places.id, claim.placeId));

      // Update user role to business if not already
      await db
        .update(users)
        .set({ role: "business" })
        .where(eq(users.id, dbUser.id));

      return NextResponse.json({
        success: true,
        message:
          "Je eigenaarschap is geverifieerd en goedgekeurd! Je kunt nu je bedrijfsprofiel beheren.",
        status: "approved",
        businessId,
        redirectUrl: `/dashboard/business/${businessId}`,
      });
    }

    // For other verification methods, wait for admin review
    return NextResponse.json({
      success: true,
      message:
        "Je eigenaarschap is geverifieerd! Je claim wacht nu op goedkeuring door ons team. We nemen binnen 1-2 werkdagen contact met je op.",
      status: "verified",
    });
  } catch (error) {
    console.error("Error verifying claim:", error);
    return NextResponse.json(
      { error: "Failed to verify claim" },
      { status: 500 }
    );
  }
}
