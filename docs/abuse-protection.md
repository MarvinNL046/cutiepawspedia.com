# Abuse Protection, Rate Limiting & Audit Logging

This document covers the abuse protection mechanisms in CutiePawsPedia, including rate limiting, audit logging, and admin tools for monitoring system activity.

## Overview

The abuse protection system consists of three main components:
1. **Rate Limiting** - Prevents abuse by limiting request frequency
2. **Audit Logging** - Tracks all important system events for compliance and investigation
3. **Admin UI** - Dashboard for viewing audit logs and abuse signals

---

## Rate Limiting

### Implementation

Rate limiting uses an in-memory sliding window approach. Located in `lib/rateLimit.ts`.

> **Production Note**: For production deployments across multiple serverless instances, replace with Redis-based limiter using `@upstash/ratelimit`.

### Pre-configured Rate Limiters

| Endpoint | Limiter | Limit | Window | Key |
|----------|---------|-------|--------|-----|
| `/api/leads` | `leadsRateLimiter` | 5 requests | 10 minutes | IP address |
| Claim submissions | `claimsRateLimiter` | 3 claims | 24 hours | User ID |
| Premium upgrades | `premiumUpgradeRateLimiter` | 5 upgrades | 24 hours | Business ID |
| Stripe checkout | `stripeCheckoutRateLimiter` | 10 checkouts | 1 hour | Business ID |
| Email subscriptions | `emailSubscriptionRateLimiter` | 3 subscriptions | 1 hour | IP address |

### Usage Example

```typescript
import { leadsRateLimiter, getClientIP, rateLimitExceededResponse } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const clientIP = getClientIP(request);

  // Check rate limit
  const rateLimitResult = await leadsRateLimiter(clientIP);
  if (!rateLimitResult.allowed) {
    return rateLimitExceededResponse("Too many lead submissions. Please try again later.");
  }

  // Process request...
}
```

### API Functions

#### `checkRateLimit(args: RateLimitKey): Promise<RateLimitResult>`

Check if a request is allowed under rate limiting rules.

```typescript
type RateLimitKey = {
  key: string;      // e.g., `leads:${ip}`
  limit: number;    // max requests
  windowMs: number; // rolling window in ms
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;  // Unix timestamp
};
```

#### `createRateLimiter(config): (identifier: string) => Promise<RateLimitResult>`

Create a reusable rate limiter for a specific endpoint.

#### `getClientIP(request: Request): string`

Extract client IP from request headers. Handles:
- `X-Forwarded-For`
- `X-Real-IP`
- `CF-Connecting-IP` (Cloudflare)

#### `rateLimitExceededResponse(message?: string): Response`

Create a standardized 429 Too Many Requests response.

---

## Audit Logging

### Implementation

Audit logging tracks all important events in the system. Located in `db/queries/auditLogs.ts`.

### Database Schema

```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  actor_user_id INTEGER,
  actor_business_id INTEGER,
  actor_role VARCHAR(50) NOT NULL,   -- admin | business | system | public
  event_type VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id VARCHAR(255),
  metadata JSONB,
  ip_address VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Event Types

#### Lead Events
| Event | Description | Actor | Target |
|-------|-------------|-------|--------|
| `LEAD_CREATED` | New lead submitted | public | lead |
| `LEAD_CHARGED` | Lead charged to business credits | system | lead |
| `LEAD_REFUND` | Admin refunded a lead | admin | lead |
| `LEAD_SPAM` | Admin marked lead as spam | admin | lead |

#### Premium Events
| Event | Description | Actor | Target |
|-------|-------------|-------|--------|
| `PREMIUM_UPGRADE` | Business upgraded place to premium | business | place |
| `PREMIUM_TOGGLE_ADMIN` | Admin toggled premium status | admin | place |

#### Credit Events
| Event | Description | Actor | Target |
|-------|-------------|-------|--------|
| `ADMIN_CREDIT_ADJUSTMENT` | Admin adjusted business credits | admin | business |
| `STRIPE_TOPUP_COMPLETED` | Stripe payment completed | system | payment |

#### Claim Events
| Event | Description | Actor | Target |
|-------|-------------|-------|--------|
| `CLAIM_CREATED` | User submitted a claim | public | claim |
| `CLAIM_APPROVED` | Admin approved a claim | admin | claim |
| `CLAIM_REJECTED` | Admin rejected a claim | admin | claim |

#### Business Events
| Event | Description | Actor | Target |
|-------|-------------|-------|--------|
| `BUSINESS_CREATED` | New business created | system | business |
| `BUSINESS_STATUS_CHANGED` | Business status changed | admin | business |

### Actor Roles

| Role | Description |
|------|-------------|
| `admin` | Admin user action |
| `business` | Business owner action |
| `system` | Automated system action |
| `public` | Unauthenticated/public user action |

### Target Types

| Type | Description |
|------|-------------|
| `lead` | Lead submission |
| `business` | Business profile |
| `place` | Business listing/place |
| `claim` | Business claim request |
| `payment` | Payment/transaction |
| `user` | User account |

### Usage Example

```typescript
import { logAuditEvent } from "@/db/queries/auditLogs";

// Log a lead creation event
logAuditEvent({
  actorRole: "public",
  eventType: "LEAD_CREATED",
  targetType: "lead",
  targetId: newLead.id,
  metadata: {
    placeId,
    businessId: place.businessId,
    source: "website",
  },
  ipAddress: clientIP,
});

// Log an admin action
logAuditEvent({
  actorUserId: adminUser.id,
  actorRole: "admin",
  eventType: "LEAD_REFUND",
  targetType: "lead",
  targetId: leadId,
  metadata: {
    reason: "Invalid contact information",
    refundedCents: 500,
  },
});
```

### Non-Blocking Design

The `logAuditEvent` function is designed to **never throw**. Failures are logged to console but don't block business operations:

```typescript
export async function logAuditEvent(input: LogAuditEventInput): Promise<void> {
  try {
    await db.insert(auditLogs).values({...});
  } catch (error) {
    // Log but don't throw - audit logging should never block business operations
    console.error("Failed to log audit event:", error, { input });
  }
}
```

### Query Functions

#### `getAuditLogs(input?: GetAuditLogsInput)`

Get audit logs with optional filters.

```typescript
const { logs, total } = await getAuditLogs({
  limit: 50,
  offset: 0,
  eventType: "LEAD_REFUND",
  actorRole: "admin",
  businessId: 123,
  sinceDate: new Date("2024-01-01"),
});
```

#### `getBusinessesWithMostRefunds(days?: number, limit?: number)`

Get businesses with the most refunds (abuse signal).

```typescript
const refundLeaders = await getBusinessesWithMostRefunds(30, 5);
// Returns: [{ businessId: 123, refundCount: 15 }, ...]
```

#### `getSpamLeadCount(days?: number)`

Get count of spam-marked leads in a time period.

```typescript
const spamCount = await getSpamLeadCount(7);
// Returns: 42
```

#### `getEventCountsByType(days?: number)`

Get event counts grouped by type.

```typescript
const counts = await getEventCountsByType(7);
// Returns: [{ eventType: "LEAD_CREATED", count: 150 }, ...]
```

---

## Admin Audit Log Viewer

### Location

`/admin/audit` - Available to admin users only.

### Features

1. **Abuse Signal Cards**
   - Spam count (7 days) with warning threshold
   - Top refund requesters (30 days)
   - Event summary by type (7 days)

2. **Filterable Log Table**
   - Filter by event type
   - Filter by actor role
   - Filter by target type
   - Pagination (50 per page)

3. **Event Details**
   - Event type badges (color-coded)
   - Actor role badges
   - Target type icons
   - Metadata preview
   - IP address
   - Relative timestamps

### Abuse Thresholds

| Signal | Threshold | Alert Level |
|--------|-----------|-------------|
| Spam leads (7d) | >5 | High (red) |
| Refund count (30d) | >3 | Warning (amber) |

---

## Integration Points

### Protected Endpoints

| File | Protection |
|------|------------|
| `app/api/leads/route.ts` | Rate limit + audit logging |
| `app/[locale]/.../claim/actions.ts` | Rate limit + audit logging |
| `app/api/premium/upgrade/route.ts` | Rate limit + audit logging |
| `app/api/stripe/checkout/route.ts` | Rate limit |
| `app/api/stripe/webhook/route.ts` | Audit logging |
| `app/[locale]/admin/leads/actions.ts` | Audit logging |
| `app/[locale]/admin/businesses/actions.ts` | Audit logging |
| `app/[locale]/admin/claims/actions.ts` | Audit logging |
| `db/queries/premium.ts` | Audit logging |

---

## Deployment Considerations

### Production Checklist

- [ ] Replace in-memory rate limiter with Redis-based (`@upstash/ratelimit`)
- [ ] Configure proper IP detection for your proxy setup
- [ ] Set up log retention/archival for audit_logs table
- [ ] Configure alerts for abuse thresholds
- [ ] Regularly review audit logs for suspicious activity

### Environment Variables

No additional environment variables required for basic functionality. For production Redis rate limiting:

```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Troubleshooting

### Rate Limiting Not Working

1. **Check IP detection**: Ensure `getClientIP()` is extracting the correct IP for your proxy setup
2. **Memory persistence**: In-memory limiter resets on server restart; use Redis for persistence
3. **Serverless**: In-memory limiter doesn't share state across instances; use Redis

### Missing Audit Logs

1. **Check database connection**: Ensure `db` is available
2. **Check console logs**: Failures are logged to console
3. **Async execution**: `logAuditEvent` is fire-and-forget; errors don't propagate

### Admin UI Issues

1. **Unauthorized**: Ensure user has admin role
2. **Empty logs**: New system may have no events yet; trigger some actions to populate
3. **Slow queries**: Add indexes on `created_at`, `event_type`, `actor_role` columns
