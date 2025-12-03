-- Migration: Add Review System
-- Description: Expands reviews table, adds review_replies table, adds lastReviewAt to places

-- Create enums for review status and reply author type
CREATE TYPE "review_status" AS ENUM('pending', 'published', 'rejected', 'flagged');--> statement-breakpoint
CREATE TYPE "review_reply_author_type" AS ENUM('business', 'admin');--> statement-breakpoint

-- Add lastReviewAt to places table
ALTER TABLE "places" ADD COLUMN "last_review_at" timestamp;--> statement-breakpoint

-- Expand reviews table with new columns
-- First add new columns
ALTER TABLE "reviews" ADD COLUMN "business_id" integer;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "title" varchar(255);--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "body" text;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "locale" varchar(10) DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "status" "review_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "visit_date" date;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "ip_hash" varchar(64);--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint

-- Migrate existing comment data to body column
UPDATE "reviews" SET "body" = COALESCE("comment", '') WHERE "body" IS NULL;--> statement-breakpoint

-- Now make body NOT NULL (after data migration)
ALTER TABLE "reviews" ALTER COLUMN "body" SET NOT NULL;--> statement-breakpoint

-- Drop the old comment column (optional - can keep for backwards compatibility)
-- ALTER TABLE "reviews" DROP COLUMN "comment";--> statement-breakpoint

-- Add foreign key constraint for business_id
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

-- Create review_replies table
CREATE TABLE IF NOT EXISTS "review_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"author_type" "review_reply_author_type" NOT NULL,
	"author_user_id" integer NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint

-- Add foreign key constraints for review_replies
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_author_user_id_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_reviews_place_status" ON "reviews" ("place_id", "status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_reviews_business_id" ON "reviews" ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_reviews_user_id" ON "reviews" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_reviews_status" ON "reviews" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_reviews_created_at" ON "reviews" ("created_at" DESC);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_review_replies_review_id" ON "review_replies" ("review_id");--> statement-breakpoint
