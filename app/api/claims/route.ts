/**
 * Claims API - Business Ownership Claims
 *
 * POST /api/claims - Submit a new claim for a place
 * GET /api/claims - Get user's claims (authenticated)
 *
 * Verification methods:
 * - email_domain: Verify via business email domain (e.g., @dierenartsjanssen.nl)
 * - phone: Verify via SMS/call to business phone number
 * - google_business: Link with Google Business Profile (future)
 * - document: Upload KvK uittreksel or other proof (admin review)
 * - manual: Admin manually verifies
 */

import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { db } from "@/db";
import { placeClaims, places, users, cities } from "@/db/schema/directory";
import { eq, and, desc, or } from "drizzle-orm";
import crypto from "crypto";
import { sendClaimVerificationCode, sendNewClaimNotification, addToNewsletterAudience } from "@/lib/email/resend";

/**
 * Generate a random 6-digit verification code
 */
function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Extract email domain from an email address
 */
function extractEmailDomain(email: string): string {
  const parts = email.split("@");
  return parts.length > 1 ? parts[1].toLowerCase() : "";
}

/**
 * Check if email domain matches the place's website domain
 */
function emailDomainMatchesWebsite(
  emailDomain: string,
  websiteUrl: string | null
): boolean {
  if (!websiteUrl) return false;

  try {
    const url = new URL(
      websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`
    );
    const websiteDomain = url.hostname.replace(/^www\./, "").toLowerCase();
    return websiteDomain === emailDomain || websiteDomain.endsWith(`.${emailDomain}`);
  } catch {
    return false;
  }
}

interface ClaimRequest {
  placeId: number;
  verificationMethod: "email_domain" | "phone" | "document" | "manual";
  verificationEmail?: string; // Required for email_domain
  verificationPhone?: string; // Required for phone
  businessRole?: string; // e.g., "eigenaar", "manager"
  claimantName?: string;
  claimantPhone?: string;
  notes?: string;
  locale?: string; // User's locale for email language (nl, en, de, fr)
}

/**
 * POST /api/claims - Submit a new claim
 */
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

    const body: ClaimRequest = await request.json();

    // Validate required fields
    if (!body.placeId) {
      return NextResponse.json(
        { error: "Place ID is required" },
        { status: 400 }
      );
    }

    if (!body.verificationMethod) {
      return NextResponse.json(
        { error: "Verification method is required" },
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

    // Get the place to claim with city info
    const [placeWithCity] = await db
      .select({
        place: places,
        cityName: cities.name,
        countryName: cities.countryId,
      })
      .from(places)
      .leftJoin(cities, eq(places.cityId, cities.id))
      .where(eq(places.id, body.placeId))
      .limit(1);

    if (!placeWithCity) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }

    const place = placeWithCity.place;
    const cityName = placeWithCity.cityName || "Nederland";

    // Check if place is already claimed
    if (place.businessId) {
      return NextResponse.json(
        { error: "Deze locatie is al geclaimd door een andere eigenaar" },
        { status: 400 }
      );
    }

    // Check if user already has a pending claim for this place
    const existingClaim = await db
      .select()
      .from(placeClaims)
      .where(
        and(
          eq(placeClaims.placeId, body.placeId),
          eq(placeClaims.userId, dbUser.id),
          or(
            eq(placeClaims.status, "pending"),
            eq(placeClaims.status, "verification_sent"),
            eq(placeClaims.status, "verified")
          )
        )
      )
      .limit(1);

    if (existingClaim.length > 0) {
      return NextResponse.json(
        {
          error: "Je hebt al een lopende claim voor deze locatie",
          claimId: existingClaim[0].id,
          status: existingClaim[0].status,
        },
        { status: 400 }
      );
    }

    // Validate verification method specific fields
    let emailDomain: string | undefined;

    if (body.verificationMethod === "email_domain") {
      if (!body.verificationEmail) {
        return NextResponse.json(
          { error: "Email address is required for email verification" },
          { status: 400 }
        );
      }

      emailDomain = extractEmailDomain(body.verificationEmail);

      // Check if email domain matches the place's website
      if (!emailDomainMatchesWebsite(emailDomain, place.website)) {
        return NextResponse.json(
          {
            error: `Het email domein (${emailDomain}) komt niet overeen met de website van dit bedrijf. Gebruik een zakelijk e-mailadres dat eindigt op het domein van de bedrijfswebsite, of kies een andere verificatiemethode.`,
          },
          { status: 400 }
        );
      }
    }

    if (body.verificationMethod === "phone") {
      if (!body.verificationPhone) {
        return NextResponse.json(
          { error: "Phone number is required for phone verification" },
          { status: 400 }
        );
      }

      // Check if the phone matches the place's phone number
      const placePhone = place.phone?.replace(/\D/g, "");
      const verifyPhone = body.verificationPhone.replace(/\D/g, "");

      if (!placePhone || !placePhone.includes(verifyPhone.slice(-9))) {
        return NextResponse.json(
          {
            error:
              "Het opgegeven telefoonnummer komt niet overeen met het geregistreerde telefoonnummer van dit bedrijf.",
          },
          { status: 400 }
        );
      }
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const codeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create the claim
    const [newClaim] = await db
      .insert(placeClaims)
      .values({
        placeId: body.placeId,
        userId: dbUser.id,
        status: body.verificationMethod === "document" || body.verificationMethod === "manual"
          ? "pending"
          : "verification_sent",
        verificationMethod: body.verificationMethod,
        verificationEmail: body.verificationEmail || null,
        verificationEmailDomain: emailDomain || null,
        verificationPhone: body.verificationPhone || null,
        verificationCode:
          body.verificationMethod === "email_domain" || body.verificationMethod === "phone"
            ? verificationCode
            : null,
        verificationCodeSentAt:
          body.verificationMethod === "email_domain" || body.verificationMethod === "phone"
            ? new Date()
            : null,
        verificationCodeExpiresAt:
          body.verificationMethod === "email_domain" || body.verificationMethod === "phone"
            ? codeExpiresAt
            : null,
        verificationAttempts: 0,
        businessRole: body.businessRole || null,
        claimantName: body.claimantName || null,
        claimantPhone: body.claimantPhone || null,
        notes: body.notes || null,
        createdAt: new Date(),
      })
      .returning();

    // Send verification code via email for email_domain method
    if (body.verificationMethod === "email_domain" && body.verificationEmail) {
      try {
        const emailResult = await sendClaimVerificationCode({
          to: body.verificationEmail,
          code: verificationCode,
          placeName: place.name,
          placeCity: cityName,
          expiresAt: codeExpiresAt,
          locale: body.locale, // nl, en, de, fr - fallback to 'en'
        });

        if (!emailResult.success) {
          console.error("Failed to send verification email:", emailResult.error);
          // Continue anyway - admin can see code in dashboard for manual verification
        } else {
          console.log(`📧 Verification email sent to ${body.verificationEmail} for claim ${newClaim.id}`);
        }
      } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        // Continue anyway - admin can see code in dashboard
      }
    }

    // Log the verification code in development (useful for testing)
    if (process.env.NODE_ENV === "development") {
      console.log(`\n📧 Verification code for claim ${newClaim.id}: ${verificationCode}\n`);
    }

    // Send notification to admin for new claims
    try {
      await sendNewClaimNotification({
        claimId: newClaim.id,
        placeName: place.name,
        placeAddress: place.address || undefined,
        placeCity: cityName,
        placeCountry: "Nederland",
        userName: body.claimantName || dbUser.name || undefined,
        userEmail: dbUser.email || "",
        businessName: place.name,
        businessRole: body.businessRole || "eigenaar",
        message: body.notes || undefined,
      });
    } catch (notifyError) {
      console.error("Failed to send admin notification:", notifyError);
      // Continue anyway - claim was created successfully
    }

    // Add business owner email to newsletter segment (non-blocking)
    // Business owners are valuable contacts for B2B marketing
    if (dbUser.email) {
      addToNewsletterAudience({
        email: dbUser.email,
        firstName: body.claimantName?.split(" ")[0] || dbUser.name?.split(" ")[0],
        lastName: body.claimantName?.split(" ").slice(1).join(" ") || dbUser.name?.split(" ").slice(1).join(" ") || undefined,
      }).then((result) => {
        if (result.success) {
          console.log(`✅ Business owner ${dbUser.email} added to newsletter segment`);
        } else {
          console.warn(`Failed to add business owner to newsletter:`, result.error);
        }
      }).catch((err) => {
        console.warn("Error adding business owner to newsletter segment:", err);
      });
    }

    // Return different responses based on verification method
    if (body.verificationMethod === "email_domain") {
      return NextResponse.json({
        success: true,
        claimId: newClaim.id,
        status: "verification_sent",
        message: `Een verificatiecode is verzonden naar ${body.verificationEmail}. Voer de code in om je eigendom te bevestigen.`,
        codeExpiresAt: codeExpiresAt.toISOString(),
      });
    }

    if (body.verificationMethod === "phone") {
      return NextResponse.json({
        success: true,
        claimId: newClaim.id,
        status: "verification_sent",
        message: `Een verificatiecode is verzonden naar ${body.verificationPhone}. Voer de code in om je eigendom te bevestigen.`,
        codeExpiresAt: codeExpiresAt.toISOString(),
      });
    }

    // For document or manual verification
    return NextResponse.json({
      success: true,
      claimId: newClaim.id,
      status: "pending",
      message:
        "Je claim is ingediend en wacht op beoordeling door ons team. We nemen binnen 1-2 werkdagen contact met je op.",
    });
  } catch (error) {
    console.error("Error submitting claim:", error);
    return NextResponse.json(
      { error: "Failed to submit claim" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/claims - Get user's claims
 */
export async function GET(request: NextRequest) {
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

    // Get user's claims with place info
    const userClaims = await db
      .select({
        claim: placeClaims,
        place: {
          id: places.id,
          name: places.name,
          slug: places.slug,
          address: places.address,
          website: places.website,
          phone: places.phone,
        },
      })
      .from(placeClaims)
      .innerJoin(places, eq(placeClaims.placeId, places.id))
      .where(eq(placeClaims.userId, dbUser.id))
      .orderBy(desc(placeClaims.createdAt));

    return NextResponse.json({
      claims: userClaims.map((c) => ({
        id: c.claim.id,
        status: c.claim.status,
        verificationMethod: c.claim.verificationMethod,
        createdAt: c.claim.createdAt,
        verifiedAt: c.claim.verifiedAt,
        reviewedAt: c.claim.reviewedAt,
        rejectionReason: c.claim.rejectionReason,
        place: c.place,
      })),
    });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
