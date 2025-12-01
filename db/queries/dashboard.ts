import { eq, desc, sql, count, and } from "drizzle-orm";
import { db } from "../index";
import { places, leads, users } from "../schema";

// ============================================================================
// DASHBOARD QUERIES (for business owners)
// ============================================================================

/**
 * Get listings owned by a user
 */
export async function getListingsByOwnerId(ownerId: number) {
  if (!db) return [];
  return db.query.places.findMany({
    where: eq(places.ownerId, ownerId),
    orderBy: [desc(places.createdAt)],
    with: {
      city: {
        with: {
          country: true,
        },
      },
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

/**
 * Get a single listing by ID (for editing)
 */
export async function getListingById(listingId: number) {
  if (!db) return null;
  return db.query.places.findFirst({
    where: eq(places.id, listingId),
    with: {
      city: {
        with: {
          country: true,
        },
      },
      placeCategories: {
        with: {
          category: true,
        },
      },
      owner: {
        columns: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Check if user can edit a listing (owner or admin)
 */
export async function canUserEditListing(userId: number, listingId: number): Promise<boolean> {
  if (!db) return false;

  // Get user role
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { role: true },
  });

  // Admins can edit any listing
  if (user?.role === "admin") return true;

  // Check if user owns this listing
  const listing = await db.query.places.findFirst({
    where: and(eq(places.id, listingId), eq(places.ownerId, userId)),
    columns: { id: true },
  });

  return !!listing;
}

/**
 * Update a listing
 */
export async function updateListing(
  listingId: number,
  data: {
    name?: string;
    address?: string;
    website?: string;
    phone?: string;
    description?: string;
  }
) {
  if (!db) return null;

  const result = await db
    .update(places)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(places.id, listingId))
    .returning();

  return result[0] || null;
}

/**
 * Get listing count for a user
 */
export async function getListingCountByOwnerId(ownerId: number): Promise<number> {
  if (!db) return 0;
  const result = await db
    .select({ count: count() })
    .from(places)
    .where(eq(places.ownerId, ownerId));
  return result[0]?.count ?? 0;
}

/**
 * Get leads for listings owned by a user
 */
export async function getLeadsByOwnerId(
  ownerId: number,
  options?: { limit?: number; offset?: number }
) {
  if (!db) return [];
  const { limit = 50, offset = 0 } = options ?? {};

  // First get all place IDs owned by this user
  const ownerPlaces = await db
    .select({ id: places.id })
    .from(places)
    .where(eq(places.ownerId, ownerId));

  const placeIds = ownerPlaces.map((p) => p.id);
  if (placeIds.length === 0) return [];

  return db.query.leads.findMany({
    where: (leads, { inArray }) => inArray(leads.placeId, placeIds),
    orderBy: [desc(leads.createdAt)],
    limit,
    offset,
    with: {
      place: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * Get lead count for listings owned by a user
 */
export async function getLeadCountByOwnerId(ownerId: number): Promise<number> {
  if (!db) return 0;

  // Get all place IDs owned by this user
  const ownerPlaces = await db
    .select({ id: places.id })
    .from(places)
    .where(eq(places.ownerId, ownerId));

  const placeIds = ownerPlaces.map((p) => p.id);
  if (placeIds.length === 0) return 0;

  const result = await db
    .select({ count: count() })
    .from(leads)
    .where(sql`${leads.placeId} IN (${sql.join(placeIds.map(id => sql`${id}`), sql`, `)})`);

  return result[0]?.count ?? 0;
}

/**
 * Get dashboard stats for a user
 */
export async function getDashboardStats(ownerId: number) {
  const [listingCount, leadCount, recentLeads] = await Promise.all([
    getListingCountByOwnerId(ownerId),
    getLeadCountByOwnerId(ownerId),
    getLeadsByOwnerId(ownerId, { limit: 5 }),
  ]);

  return {
    listingCount,
    leadCount,
    recentLeads,
  };
}

/**
 * Get all listings (for admin)
 */
export async function getAllListings(options?: { limit?: number; offset?: number }) {
  if (!db) return [];
  const { limit = 50, offset = 0 } = options ?? {};

  return db.query.places.findMany({
    orderBy: [desc(places.createdAt)],
    limit,
    offset,
    with: {
      owner: {
        columns: {
          id: true,
          email: true,
          name: true,
        },
      },
      city: {
        with: {
          country: true,
        },
      },
      placeCategories: {
        with: {
          category: true,
        },
      },
    },
  });
}

/**
 * Get all leads (for admin)
 */
export async function getAllLeads(options?: { limit?: number; offset?: number }) {
  if (!db) return [];
  const { limit = 50, offset = 0 } = options ?? {};

  return db.query.leads.findMany({
    orderBy: [desc(leads.createdAt)],
    limit,
    offset,
    with: {
      place: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
        with: {
          owner: {
            columns: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// TYPES
// ============================================================================

export type DashboardListing = Awaited<ReturnType<typeof getListingsByOwnerId>>[number];
export type DashboardLead = Awaited<ReturnType<typeof getLeadsByOwnerId>>[number];
export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;
