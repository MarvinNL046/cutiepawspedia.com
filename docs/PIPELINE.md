# CutiePawsPedia Data Pipeline

Complete documentatie van de nieuwe data pipeline scripts.

## Quick Reference

```bash
# STAP 1: Discovery - Vind nieuwe bedrijven
npm run pipeline:discover -- --country=BE --category=veterinary

# STAP 2: AI Content - Genereer aboutUs, highlights, services
npm run pipeline:enrich -- --country=BE --resume

# STAP 3: Google Maps - Haal opening hours en reviews op
npm run pipeline:gmaps -- --country=BE --limit=50

# STAP 4: Deduplicate - Verwijder duplicaten
npx tsx scripts/deduplicate-places.ts --country=BE --dry-run
```

---

## Pipeline Scripts Overzicht

| Script | Doel | API | Kosten |
|--------|------|-----|--------|
| `pipeline:discover` | Nieuwe bedrijven vinden | BrightData SERP | ~$0.02/zoekopdracht |
| `pipeline:enrich` | AI content genereren | OpenAI GPT-4o-mini | ~$0.002/place |
| `pipeline:gmaps` | Opening hours + reviews | BrightData Dataset | ~$0.01/place |
| `deduplicate-places.ts` | Duplicaten verwijderen | - | Gratis |

---

## STAP 1: Discovery (Nieuwe bedrijven vinden)

**Wat het doet:**
- Zoekt op Google Maps via BrightData SERP API
- Vindt bedrijven per categorie en stad
- Slaat basis info op: naam, adres, website, rating, review count, CID

**Command:**
```bash
npm run pipeline:discover -- --country=BE --category=veterinary
```

**Opties:**
```
--country=<code>     Land code (BE, NL, DE, FR, UK) - VERPLICHT
--category=<slug>    Categorie slug - VERPLICHT
--resume             Hervat waar gestopt
--help               Toon help
```

**Beschikbare categorieën:**
- `veterinary` - Dierenartsen
- `grooming` - Trimsalons
- `pet-store` - Dierenwinkels
- `dog-training` - Hondentraining
- `dog-walking` - Hondenuitlaatservice
- `pet-hotel` - Dierenpensions
- `emergency-vet` - Spoeddierenartsen
- `shelter` - Dierenasielen

**Voorbeelden:**
```bash
# Alle dierenartsen in België
npm run pipeline:discover -- --country=BE --category=veterinary

# Trimsalons in Nederland
npm run pipeline:discover -- --country=NL --category=grooming

# Hervat waar gestopt
npm run pipeline:discover -- --country=BE --category=veterinary --resume
```

**Output:**
- Nieuwe records in `places` tabel
- `scraped_content` met basis Google data
- Progress tracking in `data/pipeline-progress/`

---

## STAP 2: AI Content Enrichment

**Wat het doet:**
- Genereert AI content met OpenAI GPT-4o-mini
- Maakt `aboutUs`, `highlights`, `services` per place
- Slaat op in `scraped_content` JSONB kolom

**Command:**
```bash
npm run pipeline:enrich -- --country=BE --resume
```

**Opties:**
```
--country=<code>     Land code - VERPLICHT
--resume             Hervat waar gestopt (aanbevolen)
--validate           Toon enrichment status
--help               Toon help
```

**Voorbeelden:**
```bash
# Verrijk alle België places
npm run pipeline:enrich -- --country=BE --resume

# Check status
npm run pipeline:enrich -- --country=BE --validate

# Of via shortcut
npm run pipeline:status
```

**Output in `scraped_content`:**
```json
{
  "aboutUs": "Bij [naam] in [stad] bent u aan het juiste adres voor...",
  "highlights": ["Ervaren team", "Moderne apparatuur", "..."],
  "services": ["Consultaties", "Vaccinaties", "..."],
  "enrichedAt": "2025-12-12T..."
}
```

---

## STAP 3: Google Maps Enrichment

**Wat het doet:**
- Haalt opening hours op via BrightData Google Maps Dataset
- Haalt tot 5 Google reviews teksten op
- Update telefoonnummer en services

**Command:**
```bash
npm run pipeline:gmaps -- --country=BE --limit=50
```

**Opties:**
```
--country=<code>     Land code - VERPLICHT
--city=<naam>        Filter op stad
--limit=<n>          Max aantal (default: 50)
--all-incomplete     Alle places zonder opening_hours OF reviews
--help               Toon help
```

**Voorbeelden:**
```bash
# 50 België places verrijken
npm run pipeline:gmaps -- --country=BE --limit=50

# Alleen Gent
npm run pipeline:gmaps -- --country=BE --city=Gent --limit=20

# Alle incomplete places
npm run pipeline:gmaps -- --country=BE --all-incomplete --limit=100
```

**Output:**
- `opening_hours` kolom (JSONB)
- `scraped_content.googleReviews` (array met review teksten)
- `phone` kolom
- `scraped_content.servicesProvided`

**Opening hours formaat:**
```json
{
  "mon": "9:00 AM – 6:00 PM",
  "tue": "9:00 AM – 6:00 PM",
  "wed": "9:00 AM – 6:00 PM",
  "thu": "9:00 AM – 6:00 PM",
  "fri": "9:00 AM – 6:00 PM",
  "sat": "10:00 AM – 2:00 PM",
  "sun": "Closed"
}
```

**Google reviews formaat:**
```json
[
  {
    "text": "Fantastische service! Mijn hond was in goede handen...",
    "rating": 5,
    "author": "Jan de Vries",
    "date": "2025-01-15",
    "likes": 3
  }
]
```

---

## STAP 4: Deduplicate

**Wat het doet:**
- Vindt duplicaten (zelfde naam in verschillende steden)
- Houdt de meest complete record (hoogste score)
- Verwijdert de rest

**Score berekening:**
- Review count: +1 per review (max 1000)
- Opening hours: +100 punten
- AboutUs content: +50 punten
- Google reviews: +75 punten

**Command:**
```bash
# Eerst dry-run (preview)
npx tsx scripts/deduplicate-places.ts --country=BE --dry-run

# Dan echt uitvoeren
npx tsx scripts/deduplicate-places.ts --country=BE
```

**Opties:**
```
--country=<code>     Land code - VERPLICHT
--dry-run            Preview zonder verwijderen
--help               Toon help
```

---

## Volledige Pipeline Run

### Nieuw land toevoegen (bijv. Duitsland)

```bash
# STAP 0: Seed steden (eenmalig voor nieuw land)
npx tsx scripts/seed-german-cities.ts

# STAP 1-4: Run de volledige pipeline overnight
./scripts/run-pipeline-overnight.sh DE full

# Of handmatig:
# 1. Discovery ALLE categorieën
./scripts/run-pipeline-overnight.sh DE discover

# 2. AI Content
npm run pipeline:enrich -- --country=DE --resume

# 3. Google Maps data
npm run pipeline:gmaps -- --country=DE --limit=100

# 4. Deduplicate
npx tsx scripts/deduplicate-places.ts --country=DE --dry-run
npx tsx scripts/deduplicate-places.ts --country=DE
```

### Bestaand land bijwerken

```bash
# Check status
npm run pipeline:enrich -- --country=BE --validate

# Verrijk nieuwe places
npm run pipeline:enrich -- --country=BE --resume

# Haal opening hours/reviews op voor places die dat missen
npm run pipeline:gmaps -- --country=BE --all-incomplete --limit=100
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# BrightData (voor discovery en Google Maps)
BRIGHTDATA_API_TOKEN=...
BRIGHTDATA_SERP_ZONE=serp_cutiepaws

# OpenAI (voor AI content)
OPENAI_API_KEY=...
```

---

## Progress Tracking

De pipeline slaat progress op in `data/pipeline-progress/`:

```
data/pipeline-progress/
├── discovery-BE-veterinary.json
├── discovery-BE-grooming.json
├── enrichment-BE.json
└── enrichment-NL.json
```

**Enrichment progress formaat:**
```json
{
  "type": "enrichment",
  "country": "BE",
  "startedAt": "2025-12-12T06:33:20.081Z",
  "updatedAt": "2025-12-12T06:34:12.688Z",
  "lastProcessedId": 3570,
  "stats": {
    "totalToProcess": 1472,
    "processed": 5,
    "enriched": 5,
    "failed": 0,
    "skipped": 0
  },
  "errors": []
}
```

---

## Beschikbare Landen

| Code | Land | Google Domain | Taal |
|------|------|---------------|------|
| BE | België | google.be | nl/fr |
| NL | Nederland | google.nl | nl |
| DE | Duitsland | google.de | de |
| FR | Frankrijk | google.fr | fr |
| UK | Verenigd Koninkrijk | google.co.uk | en |

---

## Troubleshooting

### "BRIGHTDATA_API_TOKEN not set"
Voeg toe aan `.env`:
```env
BRIGHTDATA_API_TOKEN=je_token_hier
```

### "BRIGHTDATA_SERP_ZONE not set"
1. Maak een SERP zone in BrightData dashboard
2. Voeg toe aan `.env`:
```env
BRIGHTDATA_SERP_ZONE=serp_cutiepaws
```

### "No places found to enrich"
- Check of er places zijn zonder `aboutUs`:
```bash
npm run pipeline:enrich -- --country=BE --validate
```

### Script loopt vast
- Gebruik `--resume` om te hervatten waar gestopt
- Check `data/pipeline-progress/` voor status

### Duplicaten na discovery
- Run deduplicate script na elke grote discovery batch:
```bash
npx tsx scripts/deduplicate-places.ts --country=BE --dry-run
```

---

*Laatst bijgewerkt: December 2025*
