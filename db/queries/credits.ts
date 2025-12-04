import { eq, desc, and, sql, gte } from "drizzle-orm";
import { db } from "../index";
import { creditTransactions, businesses, leads, places } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export type TransactionType =
  | "purchase" // Credits purchased via Stripe
  | "lead_charge" // Credits deducted for a lead
  | "refund" // Credits refunded
  | "bonus" // Promotional credits
  | "premium_subscription"; // Premium listing payment

export type CreditTransaction = {
  id: number;
  businessId: number;
  amountCents: number;
  type: string;
  description: string | null;
  stripePaymentIntentId: string | null;
  stripeInvoiceId: string | null;
  leadId: number | null;
  placeId: number | null;
  balanceAfterCents: number;
  createdAt: Date;
  // Joined data
  businessName?: string | null;
  placeName?: string | null;
};

export type CreditBalance = {
  businessId: number;
  balanceCents: number;
  totalPurchased: number;
  totalSpent: number;
  pendingCharges: number;
};

// ============================================================================
// DEFAULT PRICING
// ============================================================================

export const DEFAULT_LEAD_PRICE_CENTS = 500; // $5.00 per lead
export const CREDIT_PACKAGES = [
  { credits: 1000, priceCents: 1000, label: "$10 (10 credits)" },
  { credits: 2500, priceCents: 2500, label: "$25 (25 credits)" },
  { credits: 5000, priceCents: 5000, label: "$50 (50 credits)" },
  { credits: 10000, priceCents: 10000, label: "$100 (100 credits)" },
] as const;

// ============================================================================
// CREDIT QUERIES
// ============================================================================

/**
 * Get current credit balance for a business
 */
export async function getCreditBalance(businessId: number): Promise<CreditBalance> {
  if (!db) {
    return {
      businessId,
      balanceCents: 0,
      totalPurchased: 0,
      totalSpent: 0,
      pendingCharges: 0,
    };
  }

  // Get the current balance from the business record
  const business = await db
    .select({ creditBalanceCents: businesses.creditBalanceCents })
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1);

  if (business.length === 0) {
    return {
      businessId,
      balanceCents: 0,
      totalPurchased: 0,
      totalSpent: 0,
      pendingCharges: 0,
    };
  }

  // Calculate totals from transaction history
  const [purchased, spent] = await Promise.all([
    db
      .select({
        total: sql<number>`COALESCE(SUM(${creditTransactions.amountCents}), 0)`,
      })
      .from(creditTransactions)
      .where(
        and(
          eq(creditTransactions.businessId, businessId),
          sql`${creditTransactions.amountCents} > 0`
        )
      ),
    db
      .select({
        total: sql<number>`COALESCE(ABS(SUM(${creditTransactions.amountCents})), 0)`,
      })
      .from(creditTransactions)
      .where(
        and(
          eq(creditTransactions.businessId, businessId),
          sql`${creditTransactions.amountCents} < 0`
        )
      ),
  ]);

  return {
    businessId,
    balanceCents: business[0].creditBalanceCents ?? 0,
    totalPurchased: purchased[0]?.total ?? 0,
    totalSpent: spent[0]?.total ?? 0,
    pendingCharges: 0, // For future: pending lead charges
  };
}

/**
 * Add credits to a business (e.g., after Stripe payment)
 */
export async function addCredits(data: {
  businessId: number;
  amountCents: number;
  type: TransactionType;
  description?: string;
  stripePaymentIntentId?: string;
  stripeInvoiceId?: string;
}): Promise<CreditTransaction> {
  if (!db) throw new Error("Database not available");

  // Get current balance
  const business = await db
    .select({ creditBalanceCents: businesses.creditBalanceCents })
    .from(businesses)
    .where(eq(businesses.id, data.businessId))
    .limit(1);

  if (business.length === 0) {
    throw new Error("Business not found");
  }

  const currentBalance = business[0].creditBalanceCents ?? 0;
  const newBalance = currentBalance + data.amountCents;

  // Create transaction record
  const result = await db
    .insert(creditTransactions)
    .values({
      businessId: data.businessId,
      amountCents: data.amountCents,
      type: data.type,
      description: data.description ?? `Added ${data.amountCents} cents`,
      stripePaymentIntentId: data.stripePaymentIntentId,
      stripeInvoiceId: data.stripeInvoiceId,
      balanceAfterCents: newBalance,
    })
    .returning();

  const transaction = Array.isArray(result) ? result[0] : undefined;

  if (!transaction) {
    throw new Error("Failed to create transaction");
  }

  // Update business balance
  await db
    .update(businesses)
    .set({
      creditBalanceCents: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, data.businessId));

  return transaction;
}

/**
 * Charge credits for a lead
 */
export async function chargeForLead(data: {
  businessId: number;
  leadId: number;
  priceCents?: number;
}): Promise<{ success: boolean; transaction?: CreditTransaction; error?: string }> {
  if (!db) return { success: false, error: "Database not available" };

  // Get business with current balance and custom lead price
  const business = await db
    .select({
      creditBalanceCents: businesses.creditBalanceCents,
      leadPriceCents: businesses.leadPriceCents,
    })
    .from(businesses)
    .where(eq(businesses.id, data.businessId))
    .limit(1);

  if (business.length === 0) {
    return { success: false, error: "Business not found" };
  }

  // Determine price: explicit > business custom > default
  const priceCents =
    data.priceCents ??
    business[0].leadPriceCents ??
    DEFAULT_LEAD_PRICE_CENTS;

  const currentBalance = business[0].creditBalanceCents ?? 0;

  // Check sufficient balance
  if (currentBalance < priceCents) {
    return {
      success: false,
      error: `Insufficient credits. Balance: ${currentBalance} cents, Required: ${priceCents} cents`,
    };
  }

  const newBalance = currentBalance - priceCents;

  // Create transaction record (negative amount for charge)
  const chargeResult = await db
    .insert(creditTransactions)
    .values({
      businessId: data.businessId,
      amountCents: -priceCents, // Negative = charge
      type: "lead_charge",
      description: `Lead charge: ${priceCents} cents`,
      leadId: data.leadId,
      balanceAfterCents: newBalance,
    })
    .returning();

  const transaction = Array.isArray(chargeResult) ? chargeResult[0] : undefined;

  if (!transaction) {
    return { success: false, error: "Failed to create charge transaction" };
  }

  // Update business balance
  await db
    .update(businesses)
    .set({
      creditBalanceCents: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, data.businessId));

  // Update lead with price charged and transaction reference
  await db
    .update(leads)
    .set({
      priceCents,
      chargedAt: new Date(),
      chargedTransactionId: transaction.id,
    })
    .where(eq(leads.id, data.leadId));

  return { success: true, transaction };
}

/**
 * Refund credits (e.g., for spam lead)
 */
export async function refundCredits(data: {
  businessId: number;
  amountCents: number;
  leadId?: number;
  description?: string;
}): Promise<CreditTransaction> {
  if (!db) throw new Error("Database not available");

  const business = await db
    .select({ creditBalanceCents: businesses.creditBalanceCents })
    .from(businesses)
    .where(eq(businesses.id, data.businessId))
    .limit(1);

  if (business.length === 0) {
    throw new Error("Business not found");
  }

  const currentBalance = business[0].creditBalanceCents ?? 0;
  const newBalance = currentBalance + data.amountCents;

  const refundResult = await db
    .insert(creditTransactions)
    .values({
      businessId: data.businessId,
      amountCents: data.amountCents, // Positive = credit added
      type: "refund",
      description: data.description ?? `Refund: ${data.amountCents} cents`,
      leadId: data.leadId,
      balanceAfterCents: newBalance,
    })
    .returning();

  const transaction = Array.isArray(refundResult) ? refundResult[0] : undefined;

  if (!transaction) {
    throw new Error("Failed to create refund transaction");
  }

  await db
    .update(businesses)
    .set({
      creditBalanceCents: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, data.businessId));

  return transaction;
}

/**
 * Get transaction history for a business
 */
export async function getTransactionHistory(
  businessId: number,
  options: {
    limit?: number;
    offset?: number;
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<{ transactions: CreditTransaction[]; total: number }> {
  if (!db) return { transactions: [], total: 0 };

  const { limit = 50, offset = 0, type, startDate, endDate } = options;

  const conditions = [eq(creditTransactions.businessId, businessId)];

  if (type) {
    conditions.push(eq(creditTransactions.type, type));
  }
  if (startDate) {
    conditions.push(gte(creditTransactions.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(sql`${creditTransactions.createdAt} <= ${endDate}`);
  }

  const whereClause = and(...conditions);

  const [totalResult, transactionsResult] = await Promise.all([
    db
      .select({ value: sql<number>`count(*)` })
      .from(creditTransactions)
      .where(whereClause),
    db
      .select({
        id: creditTransactions.id,
        businessId: creditTransactions.businessId,
        amountCents: creditTransactions.amountCents,
        type: creditTransactions.type,
        description: creditTransactions.description,
        stripePaymentIntentId: creditTransactions.stripePaymentIntentId,
        stripeInvoiceId: creditTransactions.stripeInvoiceId,
        leadId: creditTransactions.leadId,
        placeId: creditTransactions.placeId,
        balanceAfterCents: creditTransactions.balanceAfterCents,
        createdAt: creditTransactions.createdAt,
        placeName: places.name,
      })
      .from(creditTransactions)
      .leftJoin(places, eq(creditTransactions.placeId, places.id))
      .where(whereClause)
      .orderBy(desc(creditTransactions.createdAt))
      .limit(limit)
      .offset(offset),
  ]);

  return {
    transactions: transactionsResult,
    total: Number(totalResult[0]?.value ?? 0),
  };
}

/**
 * Check if business has sufficient credits
 */
export async function hasEnoughCredits(
  businessId: number,
  requiredCents: number
): Promise<boolean> {
  if (!db) return false;

  const business = await db
    .select({ creditBalanceCents: businesses.creditBalanceCents })
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1);

  if (business.length === 0) return false;

  return (business[0].creditBalanceCents ?? 0) >= requiredCents;
}

/**
 * Get lead price for a business
 */
export async function getLeadPrice(businessId: number): Promise<number> {
  if (!db) return DEFAULT_LEAD_PRICE_CENTS;

  const business = await db
    .select({ leadPriceCents: businesses.leadPriceCents })
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1);

  return business[0]?.leadPriceCents ?? DEFAULT_LEAD_PRICE_CENTS;
}

/**
 * Get credit usage stats for dashboard
 */
export async function getCreditStats(
  businessId: number,
  days: number = 30
): Promise<{
  currentBalance: number;
  spentLast30Days: number;
  leadsCharged: number;
  avgCostPerLead: number;
}> {
  if (!db) {
    return {
      currentBalance: 0,
      spentLast30Days: 0,
      leadsCharged: 0,
      avgCostPerLead: 0,
    };
  }

  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [balance, spent, leadCount] = await Promise.all([
    db
      .select({ value: businesses.creditBalanceCents })
      .from(businesses)
      .where(eq(businesses.id, businessId))
      .limit(1),
    db
      .select({
        total: sql<number>`COALESCE(ABS(SUM(${creditTransactions.amountCents})), 0)`,
      })
      .from(creditTransactions)
      .where(
        and(
          eq(creditTransactions.businessId, businessId),
          eq(creditTransactions.type, "lead_charge"),
          gte(creditTransactions.createdAt, daysAgo)
        )
      ),
    db
      .select({ count: sql<number>`count(*)` })
      .from(creditTransactions)
      .where(
        and(
          eq(creditTransactions.businessId, businessId),
          eq(creditTransactions.type, "lead_charge"),
          gte(creditTransactions.createdAt, daysAgo)
        )
      ),
  ]);

  const currentBalance = balance[0]?.value ?? 0;
  const spentLast30Days = spent[0]?.total ?? 0;
  const leadsCharged = Number(leadCount[0]?.count ?? 0);
  const avgCostPerLead = leadsCharged > 0 ? spentLast30Days / leadsCharged : 0;

  return {
    currentBalance,
    spentLast30Days,
    leadsCharged,
    avgCostPerLead: Math.round(avgCostPerLead),
  };
}
