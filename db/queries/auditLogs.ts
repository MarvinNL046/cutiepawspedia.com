/**
 * Audit Logging System
 *
 * Central audit trail for all important events in the system.
 * Use this to track:
 * - Lead creation and charges
 * - Refunds and spam marking
 * - Premium upgrades
 * - Admin credit adjustments
 * - Stripe payments
 * - Claim approvals/rejections
 */

import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { desc, eq, and, gte, sql } from "drizzle-orm";

// ============================================================================
// EVENT TYPES
// ============================================================================

export type AuditEventType =
  // Lead events
  | "LEAD_CREATED"
  | "LEAD_CHARGED"
  | "LEAD_REFUND"
  | "LEAD_SPAM"
  // Premium events
  | "PREMIUM_UPGRADE"
  | "PREMIUM_TOGGLE_ADMIN"
  // Credit events
  | "ADMIN_CREDIT_ADJUSTMENT"
  | "STRIPE_TOPUP_COMPLETED"
  // Claim events
  | "CLAIM_CREATED"
  | "CLAIM_APPROVED"
  | "CLAIM_REJECTED"
  // Business events
  | "BUSINESS_CREATED"
  | "BUSINESS_STATUS_CHANGED"
  // Review events
  | "REVIEW_CREATED"
  | "REVIEW_APPROVED"
  | "REVIEW_REJECTED"
  | "REVIEW_FLAGGED"
  | "REVIEW_REPLY_CREATED";

export type AuditActorRole = "admin" | "business" | "system" | "public";

export type AuditTargetType =
  | "lead"
  | "business"
  | "place"
  | "claim"
  | "payment"
  | "user"
  | "review";

// ============================================================================
// LOG AUDIT EVENT
// ============================================================================

export interface LogAuditEventInput {
  actorUserId?: number | null;
  actorBusinessId?: number | null;
  actorRole: AuditActorRole;
  eventType: AuditEventType;
  targetType: AuditTargetType;
  targetId?: string | number | null;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
}

/**
 * Log an audit event to the database
 * This function is designed to never throw - failures are logged but don't block operations
 */
export async function logAuditEvent(input: LogAuditEventInput): Promise<void> {
  try {
    if (!db) {
      console.error("Audit log skipped: Database not available");
      return;
    }

    await db.insert(auditLogs).values({
      actorUserId: input.actorUserId ?? null,
      actorBusinessId: input.actorBusinessId ?? null,
      actorRole: input.actorRole,
      eventType: input.eventType,
      targetType: input.targetType,
      targetId: input.targetId?.toString() ?? null,
      metadata: input.metadata ?? null,
      ipAddress: input.ipAddress ?? null,
    });
  } catch (error) {
    // Log but don't throw - audit logging should never block business operations
    console.error("Failed to log audit event:", error, { input });
  }
}

// ============================================================================
// QUERY HELPERS
// ============================================================================

export interface GetAuditLogsInput {
  limit?: number;
  offset?: number;
  eventType?: AuditEventType;
  actorRole?: AuditActorRole;
  targetType?: AuditTargetType;
  businessId?: number;
  userId?: number;
  sinceDate?: Date;
}

/**
 * Get audit logs with optional filters
 */
export async function getAuditLogs(input: GetAuditLogsInput = {}) {
  if (!db) {
    return { logs: [], total: 0 };
  }

  const {
    limit = 50,
    offset = 0,
    eventType,
    actorRole,
    targetType,
    businessId,
    userId,
    sinceDate,
  } = input;

  // Build conditions array
  const conditions = [];

  if (eventType) {
    conditions.push(eq(auditLogs.eventType, eventType));
  }
  if (actorRole) {
    conditions.push(eq(auditLogs.actorRole, actorRole));
  }
  if (targetType) {
    conditions.push(eq(auditLogs.targetType, targetType));
  }
  if (businessId) {
    conditions.push(eq(auditLogs.actorBusinessId, businessId));
  }
  if (userId) {
    conditions.push(eq(auditLogs.actorUserId, userId));
  }
  if (sinceDate) {
    conditions.push(gte(auditLogs.createdAt, sinceDate));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get logs
  const logs = await db
    .select()
    .from(auditLogs)
    .where(whereClause)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  // Get total count
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(auditLogs)
    .where(whereClause);

  return { logs, total: Number(count) };
}

// ============================================================================
// ABUSE SIGNAL HELPERS
// ============================================================================

/**
 * Get businesses with the most refunds in a time period
 */
export async function getBusinessesWithMostRefunds(
  days: number = 30,
  limit: number = 10
) {
  if (!db) {
    return [];
  }

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  const results = await db
    .select({
      businessId: auditLogs.actorBusinessId,
      refundCount: sql<number>`COUNT(*)`,
    })
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.eventType, "LEAD_REFUND"),
        gte(auditLogs.createdAt, sinceDate)
      )
    )
    .groupBy(auditLogs.actorBusinessId)
    .orderBy(sql`COUNT(*) DESC`)
    .limit(limit);

  return results;
}

/**
 * Get count of spam-marked leads in a time period
 */
export async function getSpamLeadCount(days: number = 7): Promise<number> {
  if (!db) {
    return 0;
  }

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.eventType, "LEAD_SPAM"),
        gte(auditLogs.createdAt, sinceDate)
      )
    );

  return Number(result?.count ?? 0);
}

/**
 * Get event counts by type for a time period
 */
export async function getEventCountsByType(days: number = 7) {
  if (!db) {
    return [];
  }

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  const results = await db
    .select({
      eventType: auditLogs.eventType,
      count: sql<number>`COUNT(*)`,
    })
    .from(auditLogs)
    .where(gte(auditLogs.createdAt, sinceDate))
    .groupBy(auditLogs.eventType)
    .orderBy(sql`COUNT(*) DESC`);

  return results;
}

/**
 * Get recent activity for a specific business
 */
export async function getBusinessActivity(
  businessId: number,
  limit: number = 20
) {
  if (!db) {
    return [];
  }

  const logs = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.actorBusinessId, businessId))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);

  return logs;
}
