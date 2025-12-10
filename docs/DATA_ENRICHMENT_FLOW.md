# CutiePawsPedia Data Enrichment Flow

Complete documentatie van de data enrichment pipeline in chronologische volgorde.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              DATA ENRICHMENT PIPELINE (Complete)                                     │
│                                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │ DATA DISCOVERY (Twee Bronnen)                                                                   │ │
│  │                                                                                                 │ │
│  │   [OSM collect-osm.ts]          [BrightData discover-places.ts]                                │ │
│  │   - Veterinary                   - Dog Training                                                 │ │
│  │   - Pet Stores                   - Dog Walking                                                  │ │
│  │   - Dog Parks                    - Pet Hotels                                                   │ │
│  │   - Animal Shelters              - Alle categorieën                                             │ │
│  │   - Pet Grooming                                                                                │ │
│  │            ↓                                ↓                                                    │ │
│  │    data/osm/*.json                  Direct naar DB                                              │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                              ↓                                                       │
│   [2. PDOK Geo] → [3. BrightData Enrichment] → [4. Jina.ai] → [5. AI Content]                       │
│                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Stap 0: Data Discovery (NIEUW - Core Functionaliteit)

**Het probleem:** OpenStreetMap heeft geen goede dekking voor alle categorieën:
- ✅ OSM: veterinary, pet-stores, grooming, dog-parks, animal-shelters
- ❌ OSM: dog-training, dog-walking, pet-hotels (niet/slecht getagd)

**De oplossing:** BrightData keyword discovery voor categorieën zonder OSM dekking.

### Methode A: OSM Discovery (bestaande categorieën)

**Wanneer:** Voor categorieën met goede OSM dekking

**Script:**
```bash
# Verzamel OSM data per stad
npx tsx scripts/collect-osm.ts --country=nl --city=amsterdam

# Verrijk met BrightData
npx tsx scripts/collect-bright.ts --country=nl --city=amsterdam

# Normaliseer naar staged data
npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam

# Seed naar database
npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam
```

**OSM Tags die verzameld worden (werkelijke queries):**
- `amenity=veterinary` → veterinarians
- `shop=pet` → pet stores
- `leisure=dog_park` → dog parks
- `amenity=animal_shelter` → shelters
- `amenity=animal_boarding` → boarding/kennels
- `shop=pet_grooming`, `amenity=pet_grooming`, `craft=pet_grooming` → groomers
- `amenity=cafe` + `dog=yes` → dog-friendly cafés (bonus)
- `amenity=animal_cemetery`, `landuse=cemetery` + `animal=yes` → pet cemeteries

### Methode B: BrightData Keyword Discovery (nieuwe categorieën)

**Wanneer:** Voor categorieën ZONDER goede OSM dekking

**Script:**
```bash
# Ontdek dog-training bedrijven in Amsterdam
npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam

# Ontdek dog-walking services in alle steden
npx tsx scripts/discover-places.ts --category=dog-walking --all-cities

# Dry run (preview zonder database wijzigingen)
npx tsx scripts/discover-places.ts --category=pet-hotel --city=Rotterdam --dry-run

# Met verbose output
npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam --verbose
```

**Beschikbare categorieën voor discovery (zoals in `scripts/discover-places.ts`):**

| Category | Nederlands | Gebruik |
|----------|-----------|---------|
| `dog-training` | hondentraining | Gehoorzaamheid, puppycursus, gedragstraining |
| `dog-walking` | hondenuitlaatservice | Professionele uitlaatdiensten |
| `pet-hotel` | dierenpension | Logeerverblijf voor huisdieren |
| `pet-grooming` | trimsalon | Vachtverzorging (ook via OSM) |
| `veterinary` | dierenarts | Dierenartsen (ook via OSM) |
| `pet-store` | dierenwinkel | Dierenwinkels (ook via OSM) |
| `cat-grooming` | kattentrimsalon | Kattenverzorging |
| `pet-sitting` | oppas huisdieren aan huis | Thuisoppas |
| `emergency-vet` | spoeddierenarts | Spoedklinieken |
| `dog-daycare` | hondencreche | Dagopvang |
| `exotic-vet` | dierenarts exotische dieren | Exoten |
| `shelter` | dierenasiel | Asielen |
| `grooming` | trimsalon hond/kat | Algemene grooming |
| `dog-park` | hondenlosloopgebied | Losloopgebieden |

**CLI Opties:**
```
-c, --category <slug>   Categorie om te zoeken (verplicht)
-t, --city <name>       Stadsnaam (bijv: Amsterdam, Rotterdam)
-a, --all-cities        Zoek in alle geconfigureerde steden
-l, --limit <n>         Max resultaten per zoekopdracht (default: 20)
-d, --dry-run           Preview zonder database wijzigingen
-v, --verbose           Gedetailleerde output
```

**Wat het doet:**
1. Zoekt op Google Maps via BrightData met keyword (bijv: "hondentraining Amsterdam")
2. Ontvangt bedrijfsgegevens: naam, adres, telefoon, rating, reviews, openingstijden
3. Maakt nieuwe places aan in de database
4. Linkt automatisch aan de juiste categorie

**Output:**
- Nieuwe `places` records direct in database
- Automatische `place_categories` koppeling
- Rating en reviews van Google Maps
- Openingstijden indien beschikbaar

---

## Stap 1: Data Import (Legacy/Handmatig)

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

**Wanneer:** Na geo enrichment, voor ratings, openingstijden en reviews

**Wat het doet:**
- Haalt Google Maps ratings en review counts op
- Haalt openingstijden op
- Haalt telefoonnummer en services op
- **Haalt tot 5 echte review teksten op** via `top_reviews`

**Scripts:**
```bash
# Google Maps Full Info Dataset API (AANBEVOLEN - inclusief reviews!)
npx tsx scripts/enrich-google-maps-dataset.ts --limit=50

# OF: Google Ratings alleen (sneller, goedkoper, geen reviews)
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
- `places.scraped_content.googlePlaceId` (Google CID of Place ID)
- `places.scraped_content.googleReviews` (array met tot 5 review teksten)

### CID vs Place ID Matching (Belangrijk!)

Het script ondersteunt twee typen Google identifiers:

| Type | Formaat | URL | Match Rate |
|------|---------|-----|------------|
| **Numeric CID** | `7952811095371598995` | `?cid=...` | ✅ 100% exact |
| **Place ID** | `ChIJk6gQMljuxkcR...` | Search fallback | ⚠️ ~60-70% |

**Hoe het werkt:**
1. Places met **numeric CID** → Direct CID-based URL → Exacte match
2. Places met **Place ID** (ChIJ...) → Search URL fallback → Best-effort match
3. Places zonder ID → Search URL → Lowest match rate

**Console output toont:**
- `✓CID` = Numeric CID, exacte match verwacht
- `~PlaceID` = Place ID, search fallback
- `◦search` = Geen ID, pure search

**Statistiek:** ~83% van places heeft een numeric CID voor exacte matching.

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

### Workflow A: Nieuwe Categorie Toevoegen (bijv: dog-training)

Gebruik dit als je een nieuwe categorie wilt vullen die NIET in OSM zit:

```bash
# ============================================
# STAP 0: DISCOVERY - Vind nieuwe bedrijven
# ============================================

# Optie A: Eén stad tegelijk (aanbevolen voor testen)
npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam --limit=20 --verbose

# Optie B: Alle steden in één keer
npx tsx scripts/discover-places.ts --category=dog-training --all-cities --limit=15

# ============================================
# STAP 1-5: ENRICHMENT - Verrijk de data
# ============================================

# Verrijk met extra Google Maps data (opening hours)
npx tsx scripts/enrich-google-maps-dataset.ts --limit=300

# Scrape websites voor about us tekst
npx tsx scripts/enrich-website-content.ts --limit=200

# Genereer AI content
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=place --skip-existing
npx tsx scripts/pregenerate-ai-content.ts --locale=en --type=place --skip-existing
```

### Workflow B: Bestaande Categorieën Uitbreiden (via OSM)

Gebruik dit voor categorieën die WEL goed in OSM zitten:

```bash
# ============================================
# STAP 0: OSM COLLECTIE
# ============================================

# Verzamel OSM data per stad
npx tsx scripts/collect-osm.ts --country=nl --city=amsterdam

# Verrijk met BrightData web scraping
npx tsx scripts/collect-bright.ts --country=nl --city=amsterdam

# Normaliseer en merge
npx tsx scripts/normalize-merge.ts --country=nl --city=amsterdam

# Seed naar database
npx tsx scripts/seed-from-staged.ts --country=nl --city=amsterdam

# ============================================
# STAP 1-5: ENRICHMENT
# ============================================

# Geo enrichment (alleen NL)
npx tsx scripts/enrich-pdok-addresses.ts --limit=500

# BrightData Google Maps
npx tsx scripts/enrich-google-maps-dataset.ts --limit=300

# Website scraping
npx tsx scripts/enrich-website-content.ts --limit=200

# AI content
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=place
npx tsx scripts/pregenerate-ai-content.ts --locale=en --type=place
```

### Workflow D: Snelle End-to-End Run (orchestrator)

Gebruik de pipeline-runner als je alles in één keer per stad wilt draaien (met skips/limits):

```bash
# Volledige run per stad
npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam

# Goedkope/dev run (skip Bright + Jina)
npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam --cheap-mode

# Limieten instellen op dure stappen
npx tsx scripts/run-pipeline-city.ts --country=nl --city=rotterdam --limit-bright=20 --limit-jina=10
```

### Workflow C: Batch Discovery (Alle Lege Categorieën)

Vul alle categorieën die nog leeg zijn:

```bash
# Dog training in alle steden
npx tsx scripts/discover-places.ts --category=dog-training --all-cities --limit=20

# Dog walking in alle steden
npx tsx scripts/discover-places.ts --category=dog-walking --all-cities --limit=20

# Pet hotels in alle steden
npx tsx scripts/discover-places.ts --category=pet-hotel --all-cities --limit=20

# Daarna enrichment
npx tsx scripts/enrich-google-maps-dataset.ts --limit=500
npx tsx scripts/enrich-website-content.ts --limit=300
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --type=place --skip-existing
npx tsx scripts/pregenerate-ai-content.ts --locale=en --type=place --skip-existing
```

---

## Environment Variables Nodig

```env
# Database
DATABASE_URL=postgresql://...

  # BrightData (let op naamgeving per script)
  BRIGHTDATA_API_TOKEN=...          # gebruikt door enrich-google-maps-dataset.ts / enrich-brightdata.ts
  BRIGHT_DATA_API_TOKEN=...         # gebruikt door collect-bright.ts (of via .mcp.json)
  BRIGHTDATA_SERP_ZONE=serp_cutiepaws # verplicht voor discover-places.ts
  BRIGHTDATA_ZONE=mcp_unlocker      # optioneel voor enrich-google-ratings.ts (default)

# Jina.ai (stap 4)
JINA_API_KEY=...

# OpenAI (stap 4 & 5)
OPENAI_API_KEY=...
```

### ⚠️ BRIGHTDATA_SERP_ZONE Setup (Belangrijk!)

Het `discover-places.ts` script vereist een SERP API zone in BrightData. Dit is **niet** hetzelfde als de standaard API token!

**Eenmalige setup:**

1. **Ga naar BrightData Dashboard**
   - https://brightdata.com/cp/zones

2. **Maak een nieuwe SERP API zone**
   - Klik "Add Zone" → "SERP API"
   - Naam: `serp_cutiepaws` (of eigen keuze)
   - Enable "Google" als search engine
   - Sla op

3. **Voeg toe aan `.env`**
   ```env
   BRIGHTDATA_SERP_ZONE=serp_cutiepaws
   ```

4. **Test de configuratie**
   ```bash
   npx tsx scripts/discover-places.ts --category=dog-training --city=Amsterdam --dry-run --verbose --limit=3
   ```

**Waarom is dit nodig?**
- De Dataset API (enrichment) gebruikt alleen een API token
- De SERP API (discovery) vereist een specifieke zone configuratie
- Zonder zone krijg je: "Zone not found" of alleen een `response_id` terug
- Voor ratings-only (`enrich-google-ratings.ts`) wordt `BRIGHTDATA_ZONE` gebruikt (default `mcp_unlocker`)

---

## Veelvoorkomende Problemen

### "BRIGHTDATA_SERP_ZONE not set" of "Zone not found"
- Dit betekent dat de SERP API zone niet bestaat of niet geconfigureerd is
- Volg de setup instructies hierboven om een SERP zone te maken
- Let op: de zone naam is CASE-SENSITIVE
- Na het maken van de zone duurt het ~1 minuut voordat deze actief is

### "Response contains only response_id"
- Dit betekent dat de SERP zone niet bestaat of onjuist is geconfigureerd
- BrightData retourneert een async response_id in plaats van directe resultaten
- Controleer of de zone naam exact overeenkomt met wat je in het dashboard hebt aangemaakt

### "No rating data found"
- Check of `BRIGHTDATA_API_TOKEN` correct is
- Check ook `BRIGHTDATA_ZONE` (default: `mcp_unlocker`) voor `enrich-google-ratings.ts`
- Check of BrightData account credits heeft
- Probeer `enrich-google-ratings.ts` als alternatief

### "AI content not updated"
- Check of `is_stale = false` in `ai_content_cache`
- Run met `--skip-existing` flag NIET om te overschrijven
- Of delete cache entry: `DELETE FROM ai_content_cache WHERE key LIKE 'place:...'`

### "Duplicate places"
- Run duplicate check: `SELECT name, slug, COUNT(*) FROM places GROUP BY name, slug HAVING COUNT(*) > 1`
- Duplicaten komen van import, niet van enrichment scripts

### "Waarom geen google_cid kolom?"
- Google IDs (CID of Place ID) worden opgeslagen in `places.scraped_content.googlePlaceId` (jsonb), niet als losse kolom.
- `review_count` is NOT NULL, dus nieuwe records initieel op `0` zetten.
- `data_quality_flags` (jsonb) wordt gebruikt voor health/re-enrich checks, o.a. in `enrich-google-maps-dataset.ts --force-incomplete`.

### "Website scraping fails"
- Check of website bereikbaar is
- Sommige sites blokkeren scrapers
- Jina.ai heeft rate limits

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA DISCOVERY LAYER                                   │
│                                                                                  │
│  ┌───────────────────────────────┐   ┌───────────────────────────────────────┐  │
│  │      OSM (collect-osm.ts)     │   │   BrightData (discover-places.ts)     │  │
│  │                               │   │                                       │  │
│  │  - amenity=veterinary         │   │  🆕 Keyword Search:                   │  │
│  │  - shop=pet                   │   │  - "hondentraining Amsterdam"         │  │
│  │  - leisure=dog_park           │   │  - "hondenuitlaatservice Rotterdam"   │  │
│  │  - amenity=animal_shelter     │   │  - "dierenpension Utrecht"            │  │
│  │  - amenity=animal_boarding    │   │                                       │  │
│  │  - shop=pet_grooming          │   │  Categories:                          │  │
│  │                               │   │  - dog-training                       │  │
│  │  → data/osm/*.json            │   │  - dog-walking                        │  │
│  │  → normalize → staged         │   │  - pet-hotel                          │  │
│  │  → seed-from-staged           │   │                                       │  │
│  └───────────────┬───────────────┘   │  → Direct naar DATABASE               │  │
│                  │                   └───────────────┬───────────────────────┘  │
│                  │                                   │                          │
│                  └──────────────┬────────────────────┘                          │
│                                 ▼                                               │
│                        ┌───────────────┐                                        │
│                        │   DATABASE    │                                        │
│                        │   (places)    │                                        │
│                        └───────┬───────┘                                        │
└────────────────────────────────┼────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA ENRICHMENT LAYER                                  │
│                                                                                  │
│                        ┌──────────────────┐                                      │
│                        │   PDOK GEO       │                                      │
│                        │   (NL addresses) │                                      │
│                        └────────┬─────────┘                                      │
│                                 │                                                │
│                                 ▼                                                │
│          ┌─────────────────────────────────────────────────────┐                │
│          │                    BRIGHTDATA                        │                │
│          │  ┌─────────────────┐  ┌─────────────────┐           │                │
│          │  │ Google Maps     │  │ Google Ratings  │           │                │
│          │  │ Dataset         │  │ (alternative)   │           │                │
│          │  │ - rating        │  │ - rating        │           │                │
│          │  │ - reviews       │  │ - reviews       │           │                │
│          │  │ - hours         │  └─────────────────┘           │                │
│          │  │ - phone         │                                │                │
│          │  │ - services      │                                │                │
│          │  └─────────────────┘                                │                │
│          └────────────────────────┬────────────────────────────┘                │
│                                   │                                              │
│                                   ▼                                              │
│                          ┌──────────────────┐                                    │
│                          │   JINA.AI        │                                    │
│                          │   (website)      │                                    │
│                          │   - aboutUs      │                                    │
│                          │   - facts        │                                    │
│                          │ → INVALIDATES    │                                    │
│                          │   AI CACHE       │                                    │
│                          └────────┬─────────┘                                    │
│                                   │                                              │
│                                   ▼                                              │
│                          ┌──────────────────┐                                    │
│                          │   AI CONTENT     │                                    │
│                          │   (OpenAI)       │                                    │
│                          │   - intro        │                                    │
│                          │   - sections     │                                    │
│                          │   - FAQs         │                                    │
│                          │   - local        │                                    │
│                          └────────┬─────────┘                                    │
└───────────────────────────────────┼──────────────────────────────────────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │   WEBSITE        │
                           │   (Next.js)      │
                           └──────────────────┘
```

---

## Script Optie Reference

### discover-places.ts (NIEUW - Core Script)
```
--category=SLUG    Categorie om te zoeken (verplicht)
                   Opties: dog-training, dog-walking, pet-hotel,
                           pet-grooming, veterinary, pet-store
--city=NAME        Stadsnaam (bijv: Amsterdam)
--all-cities       Zoek in alle NL steden
--limit=N          Max resultaten per zoekopdracht (default: 20)
--dry-run          Preview zonder database wijzigingen
--verbose          Gedetailleerde output
```

### collect-osm.ts
```
--country=CODE     Land code (bijv: nl, be, de)
--city=SLUG        Stad slug (bijv: amsterdam)
--list-cities      Toon alle geconfigureerde steden
--dry-run          Toon query zonder uit te voeren
--verbose          Gedetailleerde output
--force            Overschrijf bestaande data
```

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

| Script | API | Cost per item | Gebruik |
|--------|-----|---------------|---------|
| **discover-places** | BrightData Keyword | ~$0.02-0.05 | Per zoekopdracht (20 results) |
| collect-osm | Overpass API | Gratis | Per stad |
| enrich-google-maps-dataset | BrightData | ~$0.01 | Per place |
| enrich-website-content | Jina + OpenAI | ~$0.005 | Per place |
| pregenerate-ai-content | OpenAI | ~$0.002 | Per page |

**Discovery kosten per stad:** ~$0.02-0.05 (per categorie)
**Enrichment per place:** ~$0.02 - $0.03

**Voorbeeld: 100 dog-training places discoveren en verrijken:**
- Discovery: 5 steden × $0.03 = ~$0.15
- Enrichment: 100 places × $0.02 = ~$2.00
- **Totaal: ~$2.15**

---

*Laatst bijgewerkt: December 2025*
