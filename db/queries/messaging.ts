import { eq, desc, and, or, sql } from "drizzle-orm";
import { db } from "../index";
import { messageThreads, messages, users, businesses, places } from "../schema";

// ============================================================================
// TYPES
// ============================================================================

export interface MessageThread {
  id: number;
  businessId: number;
  userId: number;
  placeId: number | null;
  subject: string | null;
  status: string;
  lastMessageAt: Date;
  lastMessagePreview: string | null;
  unreadCountBusiness: number;
  unreadCountUser: number;
  createdAt: Date;
  // Joined data
  business?: {
    id: number;
    name: string;
    logo: string | null;
  };
  user?: {
    id: number;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
  place?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

export interface Message {
  id: number;
  threadId: number;
  senderType: string;
  senderUserId: number | null;
  body: string;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
  sender?: {
    id: number;
    name: string | null;
    avatarUrl: string | null;
  } | null;
}

// ============================================================================
// THREAD QUERIES
// ============================================================================

/**
 * Get threads for a business (inbox)
 */
export async function getThreadsForBusiness(
  businessId: number,
  options?: { status?: string; limit?: number; offset?: number }
): Promise<MessageThread[]> {
  if (!db) return [];

  const { status = "open", limit = 20, offset = 0 } = options || {};

  const threads = await db.query.messageThreads.findMany({
    where: and(
      eq(messageThreads.businessId, businessId),
      status ? eq(messageThreads.status, status) : undefined
    ),
    with: {
      user: {
        columns: { id: true, name: true, email: true, avatarUrl: true },
      },
      place: {
        columns: { id: true, name: true, slug: true },
      },
    },
    orderBy: [desc(messageThreads.lastMessageAt)],
    limit,
    offset,
  });

  return threads as MessageThread[];
}

/**
 * Get threads for a user
 */
export async function getThreadsForUser(
  userId: number,
  options?: { limit?: number; offset?: number }
): Promise<MessageThread[]> {
  if (!db) return [];

  const { limit = 20, offset = 0 } = options || {};

  const threads = await db.query.messageThreads.findMany({
    where: eq(messageThreads.userId, userId),
    with: {
      business: {
        columns: { id: true, name: true, logo: true },
      },
      place: {
        columns: { id: true, name: true, slug: true },
      },
    },
    orderBy: [desc(messageThreads.lastMessageAt)],
    limit,
    offset,
  });

  return threads as MessageThread[];
}

/**
 * Get a single thread by ID
 */
export async function getThreadById(threadId: number): Promise<MessageThread | null> {
  if (!db) return null;

  const thread = await db.query.messageThreads.findFirst({
    where: eq(messageThreads.id, threadId),
    with: {
      business: {
        columns: { id: true, name: true, logo: true },
      },
      user: {
        columns: { id: true, name: true, email: true, avatarUrl: true },
      },
      place: {
        columns: { id: true, name: true, slug: true },
      },
    },
  });

  return thread as MessageThread | null;
}

/**
 * Create a new thread
 */
export async function createThread(data: {
  businessId: number;
  userId: number;
  placeId?: number;
  subject?: string;
}): Promise<MessageThread | null> {
  if (!db) return null;

  // Check if thread already exists between this user and business
  const existing = await db.query.messageThreads.findFirst({
    where: and(
      eq(messageThreads.businessId, data.businessId),
      eq(messageThreads.userId, data.userId)
    ),
  });

  if (existing) {
    return existing as MessageThread;
  }

  const [thread] = await db
    .insert(messageThreads)
    .values({
      businessId: data.businessId,
      userId: data.userId,
      placeId: data.placeId,
      subject: data.subject,
    })
    .returning();

  return thread as MessageThread;
}

/**
 * Update thread status
 */
export async function updateThreadStatus(
  threadId: number,
  status: "open" | "archived" | "spam"
): Promise<boolean> {
  if (!db) return false;

  await db
    .update(messageThreads)
    .set({ status, updatedAt: new Date() })
    .where(eq(messageThreads.id, threadId));

  return true;
}

// ============================================================================
// MESSAGE QUERIES
// ============================================================================

/**
 * Get messages in a thread
 */
export async function getMessagesInThread(
  threadId: number,
  options?: { limit?: number; offset?: number }
): Promise<Message[]> {
  if (!db) return [];

  const { limit = 50, offset = 0 } = options || {};

  const msgs = await db.query.messages.findMany({
    where: eq(messages.threadId, threadId),
    with: {
      sender: {
        columns: { id: true, name: true, avatarUrl: true },
      },
    },
    orderBy: [desc(messages.createdAt)],
    limit,
    offset,
  });

  return msgs as Message[];
}

/**
 * Send a message
 */
export async function sendMessage(data: {
  threadId: number;
  senderType: "user" | "business";
  senderUserId: number;
  body: string;
}): Promise<Message | null> {
  if (!db) return null;

  // Insert message
  const [message] = await db
    .insert(messages)
    .values({
      threadId: data.threadId,
      senderType: data.senderType,
      senderUserId: data.senderUserId,
      body: data.body,
    })
    .returning();

  if (!message) return null;

  // Update thread with last message info and unread count
  const preview = data.body.slice(0, 200);

  if (data.senderType === "user") {
    // User sent message, increment business unread count
    await db
      .update(messageThreads)
      .set({
        lastMessageAt: new Date(),
        lastMessagePreview: preview,
        unreadCountBusiness: sql`${messageThreads.unreadCountBusiness} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(messageThreads.id, data.threadId));
  } else {
    // Business sent message, increment user unread count
    await db
      .update(messageThreads)
      .set({
        lastMessageAt: new Date(),
        lastMessagePreview: preview,
        unreadCountUser: sql`${messageThreads.unreadCountUser} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(messageThreads.id, data.threadId));
  }

  return message as Message;
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(
  threadId: number,
  readerType: "user" | "business"
): Promise<boolean> {
  if (!db) return false;

  const now = new Date();

  // Mark all messages in thread as read (where sender is the other party)
  const senderType = readerType === "user" ? "business" : "user";

  await db
    .update(messages)
    .set({ isRead: true, readAt: now })
    .where(
      and(
        eq(messages.threadId, threadId),
        eq(messages.senderType, senderType),
        eq(messages.isRead, false)
      )
    );

  // Reset unread counter for the reader
  if (readerType === "user") {
    await db
      .update(messageThreads)
      .set({ unreadCountUser: 0 })
      .where(eq(messageThreads.id, threadId));
  } else {
    await db
      .update(messageThreads)
      .set({ unreadCountBusiness: 0 })
      .where(eq(messageThreads.id, threadId));
  }

  return true;
}

// ============================================================================
// UNREAD COUNTS
// ============================================================================

/**
 * Get total unread count for a business
 */
export async function getUnreadCountForBusiness(businessId: number): Promise<number> {
  if (!db) return 0;

  const result = await db
    .select({ total: sql<number>`COALESCE(SUM(${messageThreads.unreadCountBusiness}), 0)::int` })
    .from(messageThreads)
    .where(eq(messageThreads.businessId, businessId));

  return result[0]?.total ?? 0;
}

/**
 * Get total unread count for a user
 */
export async function getUnreadCountForUser(userId: number): Promise<number> {
  if (!db) return 0;

  const result = await db
    .select({ total: sql<number>`COALESCE(SUM(${messageThreads.unreadCountUser}), 0)::int` })
    .from(messageThreads)
    .where(eq(messageThreads.userId, userId));

  return result[0]?.total ?? 0;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { MessageThread, Message };
