# Cron Jobs & Scheduled Tasks

This document describes the automated cron jobs that keep CutiePawsPedia data fresh and accurate.

## Overview

| Cron Job | Endpoint | Recommended Schedule | Purpose |
|----------|----------|---------------------|---------|
| Data Quality Scanner | `/api/cron/data-quality` | Daily (2:00 AM) | Scan places, compute quality scores, enqueue low-quality for refresh |
| Place Refresh Worker | `/api/cron/place-refresh` | Hourly | Process refresh queue, fetch fresh data from websites |

## 1. Data Quality Scanner

**Endpoint:** `GET /api/cron/data-quality`

### What It Does

1. **Fetches places needing quality scan** - Places that haven't been scanned in 7+ days
2. **Computes quality score** - Analyzes completeness of each place's data
3. **Updates database** - Stores new score and quality flags
4. **Enqueues low-quality places** - Places with score < 70% are queued for refresh

### Quality Scoring Algorithm

Each field is weighted based on importance:

| Field | Weight | Criteria |
|-------|--------|----------|
| Address | 15 | Has street address |
| Coordinates | 10 | Has lat/lng coordinates |
| Opening Hours | 15 | Has opening hours data |
| Rating | 15 | Has Google rating |
| Reviews | 10 | Has at least 1 review |
| Photos | 10 | Has at least 1 photo |
| Phone | 10 | Has phone number |
| Website | 10 | Has website URL |
| Description | 10 | Has description (100+ chars) |
| Email | 5 | Has email address |

**Total possible score:** 100%

### Quality Flags

The scanner sets flags for missing data:
- `MISSING_OPENING_HOURS`
- `MISSING_RATING`
- `MISSING_REVIEWS`
- `MISSING_WEBSITE`
- `MISSING_PHONE`
- `MISSING_PHOTOS`
- `MISSING_DESCRIPTION`
- `MISSING_ADDRESS`
- `MISSING_EMAIL`
- `OUTDATED_DATA` (not refreshed in 30+ days)

### Load & Resource Usage

| Metric | Estimate |
|--------|----------|
| Batch size | 100 places per run |
| Database queries | ~200 (read + update) |
| Execution time | 5-15 seconds |
| AI/API calls | 0 |
| Memory usage | Low (~50MB) |

### Configuration

```typescript
// In /api/cron/data-quality/route.ts

// Batch size per run (adjust for larger datasets)
const BATCH_SIZE = 100;

// Quality threshold for refresh
const REFRESH_THRESHOLD = 70;

// Days before rescan
const SCAN_INTERVAL_DAYS = 7;
```

### Tuning Recommendations

| Dataset Size | Schedule | Batch Size |
|--------------|----------|------------|
| < 1,000 places | Daily | 100 |
| 1,000 - 10,000 | Daily | 200 |
| 10,000 - 50,000 | Every 6 hours | 500 |
| 50,000+ | Every 2 hours | 1000 |

---

## 2. Place Refresh Worker

**Endpoint:** `GET /api/cron/place-refresh`

### What It Does

1. **Picks jobs from queue** - Fetches pending refresh jobs by priority
2. **Fetches website content** - Uses Jina AI Reader API to extract text
3. **Parses data** - Extracts opening hours, phone, email from content
4. **Detects closures** - Checks for "permanently closed" indicators
5. **Updates place** - Saves new data and recalculates quality score
6. **Marks job complete** - Updates job status

### Data Extraction

The worker attempts to extract:

| Data Type | Method |
|-----------|--------|
| Opening Hours | Regex patterns for Dutch/English day names + times |
| Phone Numbers | International phone regex (`+31`, `06`, etc.) |
| Email | Standard email regex |
| Closure Status | Text matching ("permanently closed", "definitief gesloten", etc.) |

### Opening Hours Parsing

Supports both Dutch and English patterns:

```
Dutch:
- "Maandag: 09:00 - 17:00"
- "Ma-Vr 9:00-18:00"

English:
- "Monday: 9:00 AM - 5:00 PM"
- "Mon-Fri 9am-6pm"
```

### Load & Resource Usage

| Metric | Estimate |
|--------|----------|
| Batch size | 5 places per run |
| Database queries | ~20 (queue + updates) |
| Jina AI calls | 5 per run |
| Execution time | 30-60 seconds |
| Memory usage | Moderate (~100MB) |

### API Costs

| API | Cost per Call | Calls per Run | Monthly Cost (hourly) |
|-----|---------------|---------------|----------------------|
| Jina AI Reader | ~$0.001 | 5 | ~$3.60 |
| Bright Data (future) | ~$0.01 | 5 | ~$36.00 |

**Note:** Bright Data integration is stubbed but not yet active. Currently only Jina AI is used.

### Configuration

```typescript
// In /api/cron/place-refresh/route.ts

// Jobs to process per run
const BATCH_SIZE = 5;

// Max retries before marking failed
const MAX_ATTEMPTS = 3;

// Jina AI timeout
const JINA_TIMEOUT = 30000; // 30 seconds
```

### Tuning Recommendations

| Queue Size | Schedule | Batch Size | Estimated Clear Time |
|------------|----------|------------|---------------------|
| < 100 jobs | Hourly | 5 | ~20 hours |
| 100 - 500 | Every 30 min | 10 | ~25 hours |
| 500 - 2000 | Every 15 min | 20 | ~12.5 hours |
| 2000+ | Every 10 min | 50 | ~7 hours |

---

## Setting Up Cron Jobs

### Vercel Deployment (Current Setup)

The project is deployed on Vercel. Cron jobs are triggered via external service (cron-job.org).

**Why external cron?** Vercel's native cron jobs require Pro plan ($20/mo). Using cron-job.org is free and reliable.

### Setup with cron-job.org (Recommended)

1. **Go to https://cron-job.org** and create a free account

2. **Create Job 1: Data Quality Scanner**
   - Title: `CutiePawsPedia - Data Quality Scanner`
   - URL: `https://your-site.vercel.app/api/cron/data-quality`
   - Schedule: Custom → `0 2 * * *` (daily at 2:00 AM UTC)
   - Request Method: GET
   - Enable notifications on failure

3. **Create Job 2: Place Refresh Worker**
   - Title: `CutiePawsPedia - Place Refresh`
   - URL: `https://your-site.vercel.app/api/cron/place-refresh`
   - Schedule: Custom → `0 * * * *` (every hour at :00)
   - Request Method: GET
   - Enable notifications on failure

### Vercel Pro Crons (Alternative - $20/mo)

If you have Vercel Pro, add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/data-quality",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/place-refresh",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Manual Testing

Test crons locally or on deployed site:

```bash
# Local testing
curl http://localhost:3000/api/cron/data-quality
curl http://localhost:3000/api/cron/place-refresh

# Production testing
curl https://your-site.vercel.app/api/cron/data-quality
curl https://your-site.vercel.app/api/cron/place-refresh
```

### Environment Variables

```env
# Required for cron authentication (optional but recommended)
CRON_SECRET=your-secret-key-here

# Required for Place Refresh Worker
JINA_API_KEY=your-jina-api-key

# Future: Bright Data integration
BRIGHT_DATA_API_TOKEN=your-bright-data-token
```

---

## Monitoring

### Admin Dashboard

View real-time stats at `/admin/data-quality`:

- Quality score distribution (Excellent/Good/Fair/Poor/Critical)
- Missing data overview
- Refresh queue status
- Recent activity

### Database Queries

Check queue status:

```sql
-- Queue overview
SELECT status, COUNT(*)
FROM place_refresh_jobs
GROUP BY status;

-- Failed jobs
SELECT pj.*, p.name
FROM place_refresh_jobs pj
JOIN places p ON p.id = pj.place_id
WHERE pj.status = 'failed'
ORDER BY pj.updated_at DESC
LIMIT 20;

-- Low quality places
SELECT id, name, data_quality_score, data_quality_flags
FROM places
WHERE data_quality_score < 50
ORDER BY data_quality_score ASC
LIMIT 50;
```

### Alerts (Future Enhancement)

Consider setting up alerts for:
- Queue size exceeds 1000
- Failed jobs exceed 50
- Average quality score drops below 60%
- Cron job hasn't run in 24+ hours

---

## Troubleshooting

### Jobs Not Processing

1. **Check queue status:** Verify jobs are in `pending` state
2. **Check environment:** Ensure `JINA_API_KEY` is set
3. **Check logs:** Look for errors in serverless function logs
4. **Manual trigger:** Call endpoint directly to test

### Quality Scores Not Updating

1. **Check scan interval:** Places may not need rescan yet (7-day interval)
2. **Verify data:** Places may already have all data filled
3. **Check batch size:** Increase if dataset is large

### Jina API Failures

1. **Rate limits:** Jina has rate limits; reduce batch size
2. **Timeouts:** Increase `JINA_TIMEOUT` for slow websites
3. **Invalid URLs:** Some websites block bots; mark as failed

### Stuck Jobs (in_progress too long)

```sql
-- Reset stuck jobs (older than 1 hour)
UPDATE place_refresh_jobs
SET status = 'pending', updated_at = NOW()
WHERE status = 'in_progress'
AND updated_at < NOW() - INTERVAL '1 hour';
```

---

## Future Enhancements

### Planned

1. **Bright Data Integration** - SERP API for Google Business data
2. **OSM Integration** - OpenStreetMap for address/hours validation
3. **Photo Refresh** - Fetch new photos from Google Places
4. **Smart Scheduling** - Prioritize popular places for more frequent refresh

### Possible

1. **Webhook Triggers** - Trigger refresh when user reports outdated info
2. **AI Enhancement** - Use LLM to extract structured data from unstructured text
3. **Batch Optimization** - Process multiple places per Jina call
4. **Geographic Priority** - Refresh places in active cities first
