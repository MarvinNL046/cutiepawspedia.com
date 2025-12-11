# Data Pipeline Scripts - CutiePawsPedia

Complete documentatie voor de data enrichment pipeline.

## Overzicht

De pipeline haalt huisdierenbedrijven op en verrijkt ze met content in 3 stappen:

```
┌─────────────────────────────────────────────────────────┐
│  STAP 0: BrightData Discovery                           │
│  Script: discover-places-be.ts                          │
│  Bron: Google Maps via BrightData SERP API              │
│                                                         │
│  Haalt op:                                              │
│  ✓ Naam, adres, telefoon, website                       │
│  ✓ Rating, review count                                 │
│  ✓ Opening hours                                        │
│  ✓ Google reviews (tekst + rating)                      │
│  ✓ Coordinates (lat/lng)                                │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STAP 1: Jina Website Scraping                          │
│  Script: enrich-jina-be.ts                              │
│  Bron: Bedrijfswebsites via Jina AI Reader              │
│                                                         │
│  Haalt op:                                              │
│  ✓ aboutUs (beschrijving van website)                   │
│  ✓ facts (teamSize, foundedYear, specializations)       │
│  ✓ services (diensten)                                  │
│  ✓ highlights (USPs)                                    │
│  ✓ openingHours (als backup)                            │
│  ✓ email, socialMedia                                   │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  STAP 2: GPT Content Generation                         │
│  Script: enrich-content-be.ts                           │
│  Bron: OpenAI GPT-4o-mini                               │
│                                                         │
│  Genereert:                                             │
│  ✓ aboutUs (200-350 woorden, uniek per bedrijf)         │
│  ✓ highlights (5-6 USPs)                                │
│  ✓ services (6-10 diensten)                             │
│  ✓ targetAudience                                       │
│  ✓ metaDescription (SEO)                                │
│                                                         │
│  Gebruikt data van stap 0+1 als context voor GPT        │
└─────────────────────────────────────────────────────────┘
```

---

## Shell Scripts

### `overnight-full.sh` - Volledige Pipeline
**Gebruik:** 's Nachts aanzetten, draait automatisch door tot alles klaar is.

```bash
./scripts/overnight-full.sh
```

**Wat het doet:**
1. Discovery: alle categorieën voor alle Belgische steden
2. Jina scraping: alle websites (met loops)
3. GPT content: alle places zonder content (met loops)

**Met nohup (draait door na logout):**
```bash
nohup ./scripts/overnight-full.sh > overnight.log 2>&1 &
tail -f overnight.log  # Check progress
```

---

### `overnight-enrich.sh` - Alleen Enrichment
**Gebruik:** Als je al places hebt en alleen wilt enrichen.

```bash
./scripts/overnight-enrich.sh
```

**Wat het doet:**
1. Jina scraping (stap 1)
2. GPT content (stap 2)

---

### `discover-be.sh` - Alleen Discovery (Belgium)
**Gebruik:** Nieuwe places zoeken zonder enrichment.

```bash
./scripts/discover-be.sh
```

**Wat het doet:**
- Doorloopt alle 13 categorieën
- Zoekt in alle Belgische steden
- NL en FR zoektermen (per regio)

---

### `overnight-full-nl.sh` - Netherlands Pipeline
**Gebruik:** Enrichment voor Nederlandse places.

```bash
./scripts/overnight-full-nl.sh
```

**Wat het doet:**
1. Jina scraping voor NL places
2. GPT content voor NL places

**Let op:** Discovery voor NL gebruikt andere scripts (file-based).

---

### `overnight-full-all.sh` - Beide Landen
**Gebruik:** Complete pipeline voor België + Nederland.

```bash
./scripts/overnight-full-all.sh
```

**Wat het doet:**
1. Belgium: Discovery + Jina + GPT
2. Netherlands: Jina + GPT

**Met nohup:**
```bash
nohup ./scripts/overnight-full-all.sh > overnight-all.log 2>&1 &
tail -f overnight-all.log
```

---

## TypeScript Scripts

### Discovery

| Script | Beschrijving | Gebruik |
|--------|--------------|---------|
| `discover-places-be.ts` | Belgium discovery via BrightData | `npx tsx scripts/discover-places-be.ts --category=veterinary --all-cities` |

**Opties:**
- `--category=<slug>` - Categorie (verplicht)
- `--city=<slug>` - Specifieke stad
- `--all-cities` - Alle steden
- `--limit=<n>` - Max resultaten per zoekopdracht (default: 20)
- `--dry-run` - Toon plan zonder wijzigingen
- `--verbose` - Uitgebreide output

**Categorieën:**
```
veterinary, grooming, dog-training, dog-walking, pet-hotel,
pet-store, cat-grooming, pet-sitting, emergency-vet,
dog-daycare, exotic-vet, shelter, dog-park
```

---

### Enrichment

| Script | Land | Beschrijving | Gebruik |
|--------|------|--------------|---------|
| `enrich-jina-be.ts` | BE | Website scraping | `npx tsx scripts/enrich-jina-be.ts --batch-size=50` |
| `enrich-jina-nl.ts` | NL | Website scraping | `npx tsx scripts/enrich-jina-nl.ts --batch-size=50` |
| `enrich-content-be.ts` | BE | GPT content | `npx tsx scripts/enrich-content-be.ts --batch-size=50` |
| `enrich-content-nl.ts` | NL | GPT content | `npx tsx scripts/enrich-content-nl.ts --batch-size=50` |

**Opties:**
- `--batch-size=<n>` - Aantal per batch (default: 50)
- `--offset=<n>` - Start offset (default: 0)

---

## Environment Variables

Vereiste variabelen in `.env`:

```env
# Database
DATABASE_URL=postgresql://...

# BrightData (voor discovery)
BRIGHTDATA_API_TOKEN=...
BRIGHTDATA_SERP_ZONE=...

# Jina AI (voor website scraping)
JINA_API_KEY=...

# OpenAI (voor content generation)
OPENAI_API_KEY=...
AI_MODEL=gpt-4o-mini  # optioneel, default: gpt-4o-mini
```

---

## Data Model

Alle data wordt opgeslagen in de `scraped_content` JSONB kolom:

```typescript
interface ScrapedContent {
  // Van BrightData Discovery
  googlePlaceId?: string;
  googleRating?: number;
  googleReviewCount?: number;
  openingHours?: Record<string, string>;
  googleReviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date?: string;
  }>;
  coordinates?: { lat: number; lng: number };
  discoveredAt?: string;
  discoverySource?: string;

  // Van Jina Website Scraping
  aboutUs?: string;           // Beschrijving van website
  facts?: {
    teamSize?: string;
    foundedYear?: number;
    specializations?: string[];
  };
  services?: string[];        // Diensten van website
  highlights?: string[];      // USPs van website
  email?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  jinaScrapedAt?: string;

  // Van GPT Content Generation
  // (overschrijft/verbetert bovenstaande)
  aboutUs?: string;           // AI-gegenereerde beschrijving
  highlights?: string[];      // AI-gegenereerde USPs
  services?: string[];        // AI-gegenereerde diensten
  targetAudience?: string;
  metaDescription?: string;
  contentSource?: string;
  contentGeneratedAt?: string;
}
```

---

## Typische Workflow

### Nieuwe Land/Regio Toevoegen

1. **Database seeden** (steden, provincies)
2. **Discovery draaien** (BrightData)
3. **Overnight enrichment** (Jina + GPT)

### Bestaande Data Updaten

```bash
# Alleen content regenereren (force mode)
npx tsx scripts/enrich-content-be.ts --batch-size=50

# Websites opnieuw scrapen (alle places)
# (verwijder jinaScrapedAt in database eerst)
npx tsx scripts/enrich-jina-be.ts --batch-size=50
```

### Progress Checken

```bash
# Hoeveel places zonder Jina data?
SELECT COUNT(*) FROM places p
JOIN cities c ON p.city_id = c.id
JOIN countries co ON c.country_id = co.id
WHERE co.code = 'BE'
AND p.website IS NOT NULL
AND (p.scraped_content->>'jinaScrapedAt' IS NULL);

# Hoeveel places zonder GPT content?
SELECT COUNT(*) FROM places p
JOIN cities c ON p.city_id = c.id
JOIN countries co ON c.country_id = co.id
WHERE co.code = 'BE'
AND (p.scraped_content->>'contentSource' IS NULL);
```

---

## Troubleshooting

### Rate Limiting
- **Jina:** 15s pauze tussen batches
- **OpenAI:** 30s pauze tussen batches
- **BrightData:** 10s pauze tussen categorieën

### Script Stopt Onverwacht
Draai opnieuw met offset:
```bash
npx tsx scripts/enrich-jina-be.ts --offset=500 --batch-size=50
```

### Geen Data van Jina
- Website blokkeert scraping
- Website heeft geen content
- Check: `scraped_content->>'jinaScrapedAt'` is gezet maar andere velden zijn leeg

---

## Kwaliteits Benchmark

**Shuki's Dog Services** (referentie voor goede data):

```json
{
  "facts": {
    "teamSize": "5-10 medewerkers",
    "foundedYear": 2010,
    "specializations": ["hondentraining", "hondopvang"]
  },
  "aboutUs": "987 karakters",
  "highlights": [
    "Persoonlijke training op maat",
    "Boutique hotel met aandacht voor elke hond",
    "Meer dan 20 jaar ervaring met honden"
  ],
  "services": [
    "Individuele hondentraining",
    "Intensief boarding training programma",
    "Boutique Dog Hotel"
  ],
  "googleReviews": "5 echte reviews met tekst"
}
```

Dit is het kwaliteitsniveau dat we nastreven voor alle places.
