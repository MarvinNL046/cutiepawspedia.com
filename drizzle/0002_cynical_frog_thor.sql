ALTER TABLE "businesses" ADD COLUMN "auto_charge_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "charged_at" timestamp;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "charged_transaction_id" integer;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "premium_since" timestamp;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "premium_level" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_charged_transaction_id_credit_transactions_id_fk" FOREIGN KEY ("charged_transaction_id") REFERENCES "public"."credit_transactions"("id") ON DELETE set null ON UPDATE no action;