import { pgTable, serial, text, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";

// Feedback type enum
export const feedbackTypeEnum = pgEnum("feedback_type", ["bug", "idea", "other"]);

// Feedback status enum
export const feedbackStatusEnum = pgEnum("feedback_status", ["new", "in_progress", "resolved", "wont_fix"]);

/**
 * User Feedback Table
 * Stores feedback submitted via the feedback ribbon
 */
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),

  // Feedback content
  type: feedbackTypeEnum("type").notNull().default("other"),
  message: text("message").notNull(),
  email: varchar("email", { length: 255 }),

  // Status tracking
  status: feedbackStatusEnum("status").notNull().default("new"),
  adminNotes: text("admin_notes"),

  // Context
  page: text("page"), // URL where feedback was submitted
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Types
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;
