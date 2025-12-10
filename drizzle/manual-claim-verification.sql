-- Manual migration: Claim verification system
-- Run this directly against the Neon database

-- Create the claim verification method enum (if not exists)
DO $$ BEGIN
    CREATE TYPE "public"."claim_verification_method" AS ENUM(
        'email_domain',
        'phone',
        'google_business',
        'document',
        'manual'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the claim status enum (if not exists)
DO $$ BEGIN
    CREATE TYPE "public"."claim_status" AS ENUM(
        'pending',
        'verification_sent',
        'verified',
        'approved',
        'rejected',
        'expired'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add new columns to place_claims table
-- Only add columns that don't already exist

-- Check and add status column (change type from text to enum)
ALTER TABLE "place_claims"
    ALTER COLUMN "status" TYPE "claim_status"
    USING (
        CASE "status"
            WHEN 'pending' THEN 'pending'::claim_status
            WHEN 'approved' THEN 'approved'::claim_status
            WHEN 'rejected' THEN 'rejected'::claim_status
            ELSE 'pending'::claim_status
        END
    );

-- Add verification method column
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_method" "claim_verification_method";

-- Add verification email fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_email" varchar(255);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_email_domain" varchar(255);

-- Add verification phone field
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_phone" varchar(50);

-- Add verification code fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code" varchar(10);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code_sent_at" timestamp;
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_code_expires_at" timestamp;
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verification_attempts" integer DEFAULT 0 NOT NULL;

-- Add verified at timestamp
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "verified_at" timestamp;

-- Add Google Business fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "google_business_id" varchar(255);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "google_business_verified_at" timestamp;

-- Add proof document fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "proof_document_url" varchar(500);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "proof_document_type" varchar(50);

-- Add claimant info fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "business_role" varchar(100);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "claimant_name" varchar(255);
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "claimant_phone" varchar(50);

-- Add notes fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "notes" text;
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "admin_notes" text;
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "rejection_reason" varchar(500);

-- Add review fields
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "reviewed_by" integer REFERENCES "users"("id") ON DELETE SET NULL;
ALTER TABLE "place_claims" ADD COLUMN IF NOT EXISTS "reviewed_at" timestamp;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "place_claims_place_id_idx" ON "place_claims" ("place_id");
CREATE INDEX IF NOT EXISTS "place_claims_user_id_idx" ON "place_claims" ("user_id");
CREATE INDEX IF NOT EXISTS "place_claims_status_idx" ON "place_claims" ("status");
CREATE INDEX IF NOT EXISTS "place_claims_verification_code_idx" ON "place_claims" ("verification_code");
