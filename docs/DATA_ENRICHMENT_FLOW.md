# CutiePawsPedia Data Enrichment Flow

Complete documentatie van de data enrichment pipeline in chronologische volgorde.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA ENRICHMENT PIPELINE                             │
│                                                                              │
│   [1. Import] → [2. PDOK Geo] → [3. BrightData] → [4. Jina.ai] → [5. AI]   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Stap 1: Data Import (Handmatig of Scraping)

**Wanneer:** Bij nieuwe data toevoegen

**Wat het doet:**
- Importeert bedrijfsgegevens uit CSV, JSON, of external APIs
- Maakt `places` records aan met basis informatie

**Scripts:**
```bash
# Import from Google Maps scrape results
npx tsx scripts/import-google-places.ts

# Import from CSV
npx tsx scripts/import-places-csv.ts --file=data.csv
```

**Output:**
- `places` table: id, name, slug, address, city_id, lat, lng

**Slug Uniqueness (Multi-Location Businesses):**

Het normalisatie script (`normalize-merge.ts`) genereert automatisch unieke slugs voor bedrijven met meerdere locaties:

1. **Eerste locatie**: `maxi-zoo` (basis slug)
2. **Tweede locatie zelfde stad**: `maxi-zoo-kalverstraat` (met straatnaam)
3. **Derde locatie zelfde stad**: `maxi-zoo-1012` (met postcode)
4. **Fallback**: `maxi-zoo-2`, `maxi-zoo-3` (met nummer)

Dit voorkomt URL conflicten voor ketens zoals Maxi Zoo, Pets Place, AniCura, etc.

**Bestaande duplicates fixen:**
```bash
npx tsx scripts/fix-duplicate-slugs.ts --dry-run  # Preview
npx tsx scripts/fix-duplicate-slugs.ts            # Execute
```

---

## Stap 2: PDOK Geo Enrichment (Nederland)

**Wanneer:** Na import, voor Nederlandse adressen

**Wat het doet:**
- Verrijkt adressen met BAG data van PDOK
- Voegt correcte lat/lng coordinaten toe
- Valideert en corrigeert adresgegevens

**Script:**
```bash
npx tsx scripts/enrich-pdok-addresses.ts --limit=100
```

**Output:**
- `places.lat`, `places.lng` (coordinaten)
- `places.address` (gevalideerd adres)

---

## Stap 3: BrightData Google Maps Enrichment

**Wanneer:** Na geo enrichment, voor ratings en openingstijden

**Wat het doet:**
- Haalt Google Maps ratings en review counts op
- Haalt openingstijden op
- Haalt telefoonnummer en services op

**Scripts:**
```bash
# Google Maps Dataset API (meest complete)
npx tsx scripts/enrich-google-maps-dataset.ts --limit=50

# OF: Google Ratings alleen (sneller, goedkoper)
npx tsx scripts/enrich-google-ratings.ts --limit=100

# OF: Direct BrightData scraping (fallback)
npx tsx scripts/enrich-brightdata.ts --limit=50
```

**Vereisten:**
- `BRIGHTDATA_API_TOKEN` in `.env`

**Output:**
- `places.avg_rating` (Google rating)
- `places.review_count` (aantal reviews)
- `places.opening_hours` (JSON met openingstijden)
- `places.phone` (telefoonnummer)
- `places.scraped_content.servicesProvided` (diensten)
- `places.scraped_content.googlePlaceId` (Google Place ID)

---

## Stap 4: Jina.ai Website Scraping

**Wanneer:** Na BrightData, voor website content

**Wat het doet:**
- Scraped website van het bedrijf
- Extraheert "Over ons" tekst met AI
- Haalt feiten op (opgericht, specialisaties, awards)
- **INVALIDEERT** automatisch de AI content cache

**Script:**
```bash
npx tsx scripts/enrich-website-content.ts --limit=100

# OF: Alleen websites scrapen (zonder AI processing)
npx tsx scripts/enrich-websites.ts --limit=100
```

**Vereisten:**
- `JINA_API_KEY` in `.env`
- `OPENAI_API_KEY` in `.env`

**Output:**
- `places.scraped_content.aboutUs` (over ons tekst)
- `places.scraped_content.facts.foundedYear` (opgericht)
- `places.scraped_content.facts.specializations` (specialisaties)
- `places.scraped_content.facts.awards` (awards/erkenningen)

**Belangrijk:** Dit script markeert automatisch de AI cache als `is_stale = true` zodat content opnieuw gegenereerd wordt.

---

## Stap 5: AI Content Generation

**Wanneer:** Na alle enrichment, voor SEO content

**Wat het doet:**
- Genereert SEO-geoptimaliseerde content per plaats
- Maakt unieke FAQs per bedrijf
- Maakt content sections (What to Expect, Services, Why Choose)
- Maakt local relevance paragraaf

**Script:**
```bash
# Genereer voor alle locales
npx tsx scripts/pregenerate-ai-content.ts --locale=nl
npx tsx scripts/pregenerate-ai-content.ts --locale=en

# Alleen places (meest belangrijk)
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=place

# Skip bestaande content
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --skip-existing

# Dry run (toon wat er gegenereerd zou worden)
npx tsx scripts/pregenerate-ai-content.ts --dry-run

# Met limiet (voor testen)
npx tsx scripts/pregenerate-ai-content.ts --limit=10
```

**Vereisten:**
- `OPENAI_API_KEY` in `.env`

**Input (gebruikt alle scraped data):**
- `places.scraped_content.aboutUs` → personalized content
- `places.opening_hours` → convenient hours in FAQs
- `places.scraped_content.servicesProvided` → service highlights
- `places.avg_rating`, `places.review_count` → trust signals
- Category type → category-specific FAQ context

**Output:**
- `ai_content_cache.content` met:
  - `intro` (3-5 zinnen)
  - `secondary` (extra paragraaf)
  - `sections` (3 content secties)
  - `faqs` (4 unieke FAQs)
  - `bullets` (4 key benefits)
  - `serviceHighlights` (3 diensten)
  - `localRelevance` (lokale paragraaf)
  - `metaDescription` (SEO meta)
  - `h1` (heading suggestie)
  - `cta` (call-to-action)

---

## Complete Flow (Aanbevolen Volgorde)

```bash
# 1. Import nieuwe data
npx tsx scripts/import-google-places.ts

# 2. PDOK geo enrichment (alleen NL)
npx tsx scripts/enrich-pdok-addresses.ts --limit=500

# 3. BrightData Google Maps (ratings, openingstijden)
npx tsx scripts/enrich-google-maps-dataset.ts --limit=300

# 4. Jina.ai website scraping (about us, facts)
npx tsx scripts/enrich-website-content.ts --limit=200

# 5. AI content generation (SEO content)
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=place
npx tsx scripts/pregenerate-ai-content.ts --locale=en --type=place

# 6. Genereer overige content types
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=city
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=combo
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=category
```

---

## Environment Variables Nodig

```env
# Database
DATABASE_URL=postgresql://...

# BrightData (stap 3)
BRIGHTDATA_API_TOKEN=...

# Jina.ai (stap 4)
JINA_API_KEY=...

# OpenAI (stap 4 & 5)
OPENAI_API_KEY=...
```

---

## Veelvoorkomende Problemen

### "No rating data found"
- Check of `BRIGHTDATA_API_TOKEN` correct is
- Check of BrightData account credits heeft
- Probeer `enrich-google-ratings.ts` als alternatief

### "AI content not updated"
- Check of `is_stale = false` in `ai_content_cache`
- Run met `--skip-existing` flag NIET om te overschrijven
- Of delete cache entry: `DELETE FROM ai_content_cache WHERE key LIKE 'place:...'`

### "Duplicate places"
- Run duplicate check: `SELECT name, slug, COUNT(*) FROM places GROUP BY name, slug HAVING COUNT(*) > 1`
- Duplicaten komen van import, niet van enrichment scripts

### "Website scraping fails"
- Check of website bereikbaar is
- Sommige sites blokkeren scrapers
- Jina.ai heeft rate limits

---

## Data Flow Diagram

```
                    ┌──────────────────┐
                    │   DATA IMPORT    │
                    │   (CSV/API)      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   PDOK GEO       │
                    │   (NL addresses) │
                    └────────┬─────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    BRIGHTDATA                            │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │ Google Maps     │  │ Google Ratings  │              │
│  │ Dataset         │  │ (alternative)   │              │
│  │ - rating        │  │ - rating        │              │
│  │ - reviews       │  │ - reviews       │              │
│  │ - hours         │  └─────────────────┘              │
│  │ - phone         │                                    │
│  │ - services      │                                    │
│  └─────────────────┘                                    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   JINA.AI        │
                    │   (website)      │
                    │   - aboutUs      │
                    │   - facts        │
                    │                  │
                    │ → INVALIDATES    │
                    │   AI CACHE       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   AI CONTENT     │
                    │   (OpenAI)       │
                    │   - intro        │
                    │   - sections     │
                    │   - FAQs         │
                    │   - local        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   WEBSITE        │
                    │   (Next.js)      │
                    └──────────────────┘
```

---

## Script Optie Reference

### enrich-google-maps-dataset.ts
```
--limit=N       Max aantal places om te verwerken
--city=NAME     Filter op stad
```

### enrich-website-content.ts
```
--limit=N       Max aantal places om te verwerken
```

### pregenerate-ai-content.ts
```
--locale=nl|en|de   Taal voor content
--type=TYPE         Type: country|city|place|category|combo|best|top
--limit=N           Max aantal items
--skip-existing     Skip items met bestaande cache
--dry-run           Toon wat gegenereerd zou worden
```

---

## Costs Estimate

| Script | API | Cost per item |
|--------|-----|---------------|
| enrich-google-maps-dataset | BrightData | ~$0.01 |
| enrich-website-content | Jina + OpenAI | ~$0.005 |
| pregenerate-ai-content | OpenAI | ~$0.002 |

**Totaal per place:** ~$0.02 - $0.03

---

*Laatst bijgewerkt: December 2025*
