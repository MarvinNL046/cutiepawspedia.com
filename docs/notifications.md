# Email Notifications & Digests (P2)

This document describes the email notification system for CutiePawsPedia, implemented in Phase P2.

## Overview

The notification system provides:
- **Transactional emails** for immediate events (reviews, leads, claims)
- **Weekly digest** for business owners summarizing their activity
- **User preferences** to control which emails they receive
- **Audit logging** for all sent emails

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Event Sources                            │
│  (Reviews API, Leads API, Claims Actions, Cron Jobs)           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    sendNotification()                           │
│  lib/notifications/sendNotification.ts                          │
│                                                                 │
│  1. Resolve recipient from payload                              │
│  2. Check notification_settings                                 │
│  3. Build email from templates                                  │
│  4. Send via Resend                                             │
│  5. Log to notification_logs                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌─────────┐    ┌──────────┐    ┌──────────────┐
        │ Resend  │    │ Settings │    │ Notification │
        │  API    │    │  Check   │    │    Logs      │
        └─────────┘    └──────────┘    └──────────────┘
```

## Notification Types

| Type | Trigger | Recipient | Setting |
|------|---------|-----------|---------|
| `REVIEW_NEW` | New review created | Business owner | `emailReviews` |
| `REVIEW_REPLY` | Business replies to review | Review author | `emailReviews` |
| `LEAD_NEW` | New lead submitted | Business owner | `emailLeads` |
| `CLAIM_APPROVED` | Claim approved by admin | Claimer | `emailBusiness` |
| `CLAIM_REJECTED` | Claim rejected by admin | Claimer | `emailBusiness` |
| `DIGEST_WEEKLY` | Weekly cron job | Business owners | `emailDigest` |
| `FAVORITE_PLACE_UPDATE` | Place updated (admin/cron) | Users who favorited | `emailFavorites` |

## Database Schema

### notification_settings
Per-user email preferences.

```sql
CREATE TABLE notification_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  email_general BOOLEAN NOT NULL DEFAULT true,
  email_reviews BOOLEAN NOT NULL DEFAULT true,
  email_favorites BOOLEAN NOT NULL DEFAULT true,
  email_leads BOOLEAN NOT NULL DEFAULT true,
  email_business BOOLEAN NOT NULL DEFAULT true,
  email_digest BOOLEAN NOT NULL DEFAULT true,
  locale VARCHAR(10),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### notification_logs
Audit trail for sent emails.

```sql
CREATE TABLE notification_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  business_id INTEGER REFERENCES businesses(id),
  type VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status notification_log_status NOT NULL, -- 'sent' | 'failed'
  error TEXT,
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## File Structure

```
lib/notifications/
├── index.ts                   # Module exports
├── types.ts                   # TypeScript types for payloads
├── templates.ts               # Email templates (NL/EN/DE)
├── sendNotification.ts        # Main dispatch function
└── favoritePlaceNotifier.ts   # Helper for favorite place updates

db/queries/
└── notifications.ts         # Database queries

app/[locale]/account/notifications/
├── page.tsx                 # Settings page
├── actions.ts               # Server actions
└── NotificationSettingsForm.tsx  # Client form

app/api/cron/digest-weekly/
└── route.ts                 # Weekly digest cron
```

## Usage

### Sending a Notification

```typescript
import { sendNotification } from "@/lib/notifications";

// Send a new review notification
await sendNotification({
  type: "REVIEW_NEW",
  reviewId: 123,
  placeId: 456,
  placeName: "Happy Paws Pet Shop",
  reviewerName: "John",
  rating: 5,
  reviewSnippet: "Great service! My dog loved it...",
  businessEmail: "owner@happypaws.com",
  businessId: 789,
  locale: "nl",
});
```

### Checking User Preferences

```typescript
import { isNotificationEnabled } from "@/db/queries/notifications";

const canSend = await isNotificationEnabled(userId, "reviews");
```

### Notifying Favorite Place Updates

When a place is updated (via admin or cron), use the helper function to notify all users who favorited it:

```typescript
import { notifyFavoritePlaceUpdate, filterRelevantFields } from "@/lib/notifications";

// After updating a place, notify users who favorited it
const updatedFields = ["openingHours", "phone", "description"];
const relevantFields = filterRelevantFields(updatedFields);

if (relevantFields.length > 0) {
  await notifyFavoritePlaceUpdate({
    placeId: 123,
    placeName: "Happy Paws Pet Shop",
    placeSlug: "happy-paws-pet-shop",
    updatedFields: relevantFields,
    updateSummary: "New opening hours and contact info", // optional
  });
}
```

The `filterRelevantFields` helper filters out internal fields (like `dataQualityFlags`) that aren't relevant for user notifications.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for sending emails | Yes |
| `APP_BASE_URL` | Base URL for links in emails | Yes |
| `REVALIDATION_SECRET` | Secret for cron endpoints | Yes |

## Cron Jobs

### Weekly Digest

**Endpoint:** `GET /api/cron/digest-weekly?secret=XXX`

**Schedule:** Run once per week (e.g., Sunday evening)

**Parameters:**
- `secret` (required): REVALIDATION_SECRET
- `limit`: Max businesses to process (default: 100)
- `dryRun`: If "true", simulates without sending

**Example cron-job.org configuration:**
```
URL: https://cutiepawspedia.com/api/cron/digest-weekly?secret=YOUR_SECRET
Schedule: Every Sunday at 19:00 UTC
```

## Email Templates

Templates support multiple locales (en, nl, de) with automatic fallback to English.

### Customizing Templates

Edit `lib/notifications/templates.ts`:

```typescript
const translations: Record<Locale, Record<string, string>> = {
  en: {
    reviewNew_subject: "New review for {placeName}",
    reviewNew_heading: "You have a new review!",
    // ...
  },
  nl: {
    reviewNew_subject: "Nieuwe review voor {placeName}",
    reviewNew_heading: "Je hebt een nieuwe review!",
    // ...
  },
};
```

## User Settings UI

Users can manage their email preferences at:
```
/[locale]/account/notifications
```

Available settings:
- General Updates
- Reviews & Replies
- Saved Places
- Leads & Inquiries
- Business Updates
- Weekly Digest

## Integration Points

### Reviews (`app/api/reviews/route.ts`)
After creating a review, sends `REVIEW_NEW` to business owner.

### Review Replies (`app/api/reviews/[id]/replies/route.ts`)
After business replies, sends `REVIEW_REPLY` to original reviewer.

### Leads (`app/api/leads/route.ts`)
After creating a lead, sends `LEAD_NEW` to business owner.

### Claims (`app/[locale]/admin/claims/actions.ts`)
After approving/rejecting, sends `CLAIM_APPROVED` or `CLAIM_REJECTED` to claimer.

### Admin Place Updates (`app/api/admin/places/[id]/route.ts`)
After admin updates a place via PUT, sends `FAVORITE_PLACE_UPDATE` to all users who favorited it.

### Place Refresh Cron (`app/api/cron/place-refresh/route.ts`)
After enriching a place with new data, sends `FAVORITE_PLACE_UPDATE` to all users who favorited it.

## Testing

### Manual Testing

1. Create a test user and business in development
2. Set `RESEND_API_KEY` to a test key (or use Resend test mode)
3. Submit a test review/lead/claim
4. Check:
   - Email received at correct address
   - `notification_logs` table has entry with status "sent"
   - Correct template/locale used

### Testing Weekly Digest

```bash
# Dry run (no emails sent)
curl "http://localhost:3000/api/cron/digest-weekly?secret=YOUR_SECRET&dryRun=true"

# Full run
curl "http://localhost:3000/api/cron/digest-weekly?secret=YOUR_SECRET"
```

## Troubleshooting

### Emails not sending

1. Check `RESEND_API_KEY` is set
2. Check Resend dashboard for errors
3. Check `notification_logs` for failed entries
4. Check user's notification settings

### Wrong locale

1. Check user's `notification_settings.locale`
2. Check payload's `locale` parameter
3. Default fallback is "en"

### Rate limiting

Resend has rate limits. The system adds 100ms delays between batch sends.
For high volume, consider queuing with a job system.

## Future Improvements

- [ ] In-app notifications (toast/bell)
- [ ] Push notifications (web push)
- [ ] SMS notifications
- [ ] Conditional digest (only send if activity > threshold)
- [ ] Unsubscribe links with one-click tokens
- [ ] Email analytics (open rates, click rates)
