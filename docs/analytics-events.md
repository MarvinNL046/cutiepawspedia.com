# Analytics Events Documentation

This document describes all analytics events tracked in CutiePawsPedia.

## Overview

Analytics are powered by a lightweight custom tracking layer that sends events to `/api/track`. Events are tracked client-side using `navigator.sendBeacon` for reliability during page unloads.

### Configuration

```typescript
// lib/analytics.ts
const TRACK_ENDPOINT = "/api/track";
const DEBUG_MODE = process.env.NODE_ENV === "development";
const ENABLE_TRACKING = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";
```

To disable tracking, set `NEXT_PUBLIC_ANALYTICS_ENABLED=false` in your environment.

---

## Event Types

### 1. Page View (`page_view`)

Tracks when a user views a page.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `path` | string | The page path (e.g., `/en/netherlands/amsterdam/vets`) |
| `title` | string? | Page title |
| `locale` | string | User's locale (e.g., `en`, `nl`) |
| `routeType` | enum | Type of route: `home`, `country`, `city`, `category`, `place`, `search`, `static` |

**Usage:**
```typescript
import { trackPageView } from "@/lib/analytics";

trackPageView({
  path: "/en/netherlands/amsterdam",
  locale: "en",
  routeType: "city",
});
```

---

### 2. Search (`search`)

Tracks search queries and results.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `query` | string? | Search query text |
| `category` | string? | Category filter applied |
| `city` | string? | City filter applied |
| `country` | string? | Country filter applied |
| `sortBy` | string? | Sort option used |
| `resultCount` | number | Number of results returned |
| `hasResults` | boolean | Whether any results were found |
| `viewMode` | enum | Display mode: `grid` or `map` |
| `page` | number | Page number (pagination) |

**Tracked in:** Search page via `SearchTracker` component

**Usage:**
```typescript
import { trackSearch } from "@/lib/analytics";

trackSearch({
  query: "dog grooming",
  city: "amsterdam",
  resultCount: 15,
  hasResults: true,
  viewMode: "grid",
  page: 1,
});
```

---

### 3. Map Toggle (`map_toggle`)

Tracks when users switch between grid and map view.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `from` | enum | Previous view: `grid` or `map` |
| `to` | enum | New view: `grid` or `map` |
| `context` | enum | Where toggle occurred: `search` or `category` |
| `resultCount` | number | Number of results at toggle time |

**Tracked in:** Search page via `SearchTracker` component

**Usage:**
```typescript
import { trackMapToggle } from "@/lib/analytics";

trackMapToggle({
  from: "grid",
  to: "map",
  context: "search",
  resultCount: 25,
});
```

---

### 4. Premium Click (`premium_click`)

Tracks clicks on premium/featured listings.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `placeId` | number | Place ID |
| `placeName` | string | Business name |
| `placeSlug` | string | URL slug |
| `category` | string? | Category of the place |
| `city` | string? | City location |
| `country` | string? | Country location |
| `position` | number | Position in the list (0-indexed) |
| `context` | enum | Where clicked: `search`, `category`, `city`, `related` |

**Usage:**
```typescript
import { trackPremiumClick } from "@/lib/analytics";

trackPremiumClick({
  placeId: 123,
  placeName: "Premium Pet Spa",
  placeSlug: "premium-pet-spa",
  category: "grooming",
  position: 0,
  context: "search",
});
```

---

### 5. Affiliate Click (`affiliate_click`)

Tracks clicks on affiliate partner links.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `affiliateType` | string | Type of affiliate (e.g., `pet-insurance`, `pet-hotels`) |
| `affiliateName` | string | Partner name (e.g., `Lemonade Pet`) |
| `affiliateUrl` | string | Link URL |
| `variant` | enum | Display variant: `card`, `inline`, `banner`, `compact` |
| `categoryContext` | string? | Category page where shown |
| `position` | number | Position in affiliate block (0-indexed) |
| `hasDiscount` | boolean | Whether a discount was displayed |

**Tracked in:** `AffiliateBlock` component

**Usage:**
```typescript
import { trackAffiliateClick } from "@/lib/analytics";

trackAffiliateClick({
  affiliateType: "pet-insurance",
  affiliateName: "Lemonade Pet",
  affiliateUrl: "https://lemonade.com/pet",
  variant: "card",
  categoryContext: "veterinarians",
  position: 0,
  hasDiscount: true,
});
```

---

### 6. Lead Submitted (`lead_submitted`)

Tracks successful lead form submissions.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `placeId` | number | Place ID |
| `placeName` | string | Business name |
| `placeSlug` | string | URL slug |
| `category` | string? | Category of the place |
| `city` | string? | City location |
| `country` | string? | Country location |
| `hasMessage` | boolean | Whether message was included |
| `hasPhone` | boolean | Whether phone was provided |
| `source` | string | Form source (e.g., `place_page`) |

**Tracked in:** `LeadForm` component

**Usage:**
```typescript
import { trackLeadSubmitted } from "@/lib/analytics";

trackLeadSubmitted({
  placeId: 123,
  placeName: "Happy Paws Vet",
  placeSlug: "happy-paws-vet",
  category: "veterinarians",
  city: "Amsterdam",
  country: "Netherlands",
  hasMessage: true,
  hasPhone: false,
  source: "place_page",
});
```

---

### 7. Place View (`place_view`)

Tracks when a user views a place detail page.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `placeId` | number | Place ID |
| `placeName` | string | Business name |
| `placeSlug` | string | URL slug |
| `category` | string? | Primary category |
| `city` | string? | City location |
| `country` | string? | Country location |
| `isPremium` | boolean | Whether place is premium |
| `isVerified` | boolean | Whether place is verified |
| `avgRating` | number? | Average rating |
| `reviewCount` | number | Number of reviews |

**Tracked in:** Place detail page via `PlaceViewTracker` component

**Usage:**
```typescript
import { trackPlaceView } from "@/lib/analytics";

trackPlaceView({
  placeId: 123,
  placeName: "Happy Paws Vet",
  placeSlug: "happy-paws-vet",
  category: "veterinarians",
  city: "Amsterdam",
  country: "Netherlands",
  isPremium: true,
  isVerified: true,
  avgRating: 4.8,
  reviewCount: 42,
});
```

---

### 8. Category View (`category_view`)

Tracks when a user views a category page.

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `category` | string | Category name |
| `city` | string | City name |
| `country` | string | Country name |
| `resultCount` | number | Number of places in category |
| `hasPremiumListings` | boolean | Whether premium listings exist |

**Usage:**
```typescript
import { trackCategoryView } from "@/lib/analytics";

trackCategoryView({
  category: "veterinarians",
  city: "Amsterdam",
  country: "Netherlands",
  resultCount: 35,
  hasPremiumListings: true,
});
```

---

### 9. Outbound Link (`outbound_link`)

Tracks clicks on external links (website, phone, email, directions).

**Properties:**
| Field | Type | Description |
|-------|------|-------------|
| `url` | string | External URL clicked |
| `linkType` | enum | Type: `website`, `phone`, `email`, `directions`, `social` |
| `placeId` | number? | Associated place ID |
| `placeName` | string? | Associated business name |

**Usage:**
```typescript
import { trackOutboundLink } from "@/lib/analytics";

trackOutboundLink({
  url: "https://happypawsvet.com",
  linkType: "website",
  placeId: 123,
  placeName: "Happy Paws Vet",
});
```

---

## Common Event Properties

All events include these base properties (added automatically):

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) |
| `url` | string | Current page URL |
| `referrer` | string? | Referrer URL |
| `userAgent` | string? | Browser user agent |
| `sessionId` | string? | Session identifier (stored in sessionStorage) |

---

## Tracking Components

### SearchTracker

Client component for search page analytics.

```tsx
import { SearchTracker } from "@/components/analytics";

<SearchTracker
  query={query}
  category={categorySlug}
  city={citySlug}
  country={countrySlug}
  sortBy={sortBy}
  resultCount={results.length}
  viewMode="grid"
  page={1}
/>
```

### PlaceViewTracker

Client component for place detail page analytics.

```tsx
import { PlaceViewTracker } from "@/components/analytics";

<PlaceViewTracker
  placeId={place.id}
  placeName={place.name}
  placeSlug={place.slug}
  category="veterinarians"
  city="Amsterdam"
  country="Netherlands"
  isPremium={place.isPremium}
  isVerified={place.isVerified}
  avgRating={4.5}
  reviewCount={42}
/>
```

---

## API Endpoint

### POST /api/track

Receives analytics events from the client.

**Request:**
```json
{
  "event": "search",
  "properties": {
    "query": "dog grooming",
    "resultCount": 15
  },
  "timestamp": 1699999999999,
  "url": "https://cutiepawspedia.com/en/search?q=dog+grooming",
  "sessionId": "abc123"
}
```

**Response:** `204 No Content`

**Features:**
- Handles both JSON body and sendBeacon blob
- Validates event schema
- Logs events in development mode
- Never fails (always returns 204 to avoid breaking user experience)

### GET /api/track?type=buffer-stats

Development-only endpoint for debugging.

**Response:**
```json
{
  "bufferSize": 42,
  "maxSize": 1000,
  "eventCounts": {
    "page_view": 20,
    "search": 15,
    "affiliate_click": 7
  }
}
```

---

## Future Enhancements

The tracking system is designed for extensibility:

1. **Database Storage**: Store events in an `analytics_events` table
2. **Vercel Analytics**: Forward events to Vercel Analytics
3. **Aggregation**: Build dashboards from collected data
4. **Data Warehouse**: Export to BigQuery, Snowflake, etc.

See `app/api/track/route.ts` for TODO comments on implementation.
