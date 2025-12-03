-- Audit Logs Table for system-wide event tracking
-- Phase B6: Abuse Protection & Audit Logging

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" serial PRIMARY KEY NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "actor_user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
    "actor_business_id" integer REFERENCES "businesses"("id") ON DELETE SET NULL,
    "actor_role" varchar(30) NOT NULL,
    "event_type" varchar(50) NOT NULL,
    "target_type" varchar(30) NOT NULL,
    "target_id" varchar(100),
    "metadata" jsonb,
    "ip_address" varchar(45)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "audit_logs_event_type_idx" ON "audit_logs" ("event_type");
CREATE INDEX IF NOT EXISTS "audit_logs_actor_role_idx" ON "audit_logs" ("actor_role");
CREATE INDEX IF NOT EXISTS "audit_logs_actor_business_id_idx" ON "audit_logs" ("actor_business_id");
CREATE INDEX IF NOT EXISTS "audit_logs_target_type_idx" ON "audit_logs" ("target_type");
