CREATE TABLE "admin_audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" integer,
	"details" text,
	"ip_address" varchar(45),
	"user_agent" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"slug" varchar(255),
	"name" varchar(255) NOT NULL,
	"description" text,
	"website" varchar(500),
	"logo" varchar(500),
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"plan" varchar(20) DEFAULT 'free' NOT NULL,
	"billing_status" varchar(20) DEFAULT 'trial' NOT NULL,
	"stripe_customer_id" varchar(255),
	"credit_balance_cents" integer DEFAULT 0 NOT NULL,
	"lead_price_cents" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "businesses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "credit_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"amount_cents" integer NOT NULL,
	"type" varchar(30) NOT NULL,
	"description" varchar(500),
	"stripe_payment_intent_id" varchar(255),
	"stripe_invoice_id" varchar(255),
	"lead_id" integer,
	"place_id" integer,
	"balance_after_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "place_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"proof_document_url" varchar(500),
	"business_role" varchar(100),
	"notes" text,
	"admin_notes" text,
	"reviewed_by" integer,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "business_id" integer;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status" varchar(20) DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "viewed_at" timestamp;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "price_cents" integer;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "owner_id" integer;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "business_id" integer;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "opening_hours" jsonb;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;