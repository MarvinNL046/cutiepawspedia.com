# Data Pipeline - CutiePawsPedia

Complete workflow voor het verzamelen en verrijken van huisdierenservices data.

---

## 📊 Huidige Status (December 2024)

| Metric | Aantal |
|--------|--------|
| **Totaal Bedrijven** | 198.988 |
| **Met Website** | 142.352 (71%) |
| **Zonder Website** | 56.636 (29%) |
| **Landen** | 10 |
| **Steden** | 1.520 |

### Content Coverage

| Type | Aantal | Status |
|------|--------|--------|
| Jina metadata | ~2.000 | 🔄 Bezig |
| GPT content | ~2.300 | 🔄 Bezig |
| Geen content | ~194.000 | ⚠️ 97% |

---

## 🔀 HYBRID ENRICHMENT - De Slimme Aanpak

```
┌─────────────────────────────────────────────────────────────────┐
│                     HYBRID ENRICHMENT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   JINA = FEITEN (metadata)       GPT = VERHAAL (content)       │
│   ├── 📧 Email                   ├── 📝 aboutUs (150-250w)     │
│   ├── 📱 Telefoon                ├── ⭐ highlights              │
│   ├── 🔗 Social Media            ├── 🛠️ services               │
│   ├── 📅 Oprichtingsjaar         └── 👥 targetAudience         │
│   └── 👥 Teamgrootte                                            │
│                                                                 │
│   ✅ Echte data                  ✅ Professionele tekst         │
│   ✅ Feitelijk correct           ✅ Geen rommel/links           │
│   ✅ SEO waardevolle info        ✅ Locale-aware (NL/DE/FR/etc) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Waarom Hybrid?

| Alleen Jina | Alleen GPT | **Hybrid** |
|-------------|------------|------------|
| ❌ Content vaak rommel (nav links) | ❌ Kan feiten verzinnen | ✅ Beste van beide! |
| ✅ Echte email/telefoon | ❌ Geen echte contactinfo | ✅ Echte metadata |
| ✅ Social media links | ❌ Generieke tekst | ✅ Professionele content |

---

## 🚀 Quick Start: Hybrid Enrichment

### Aanbevolen: Complete Hybrid Pipeline

```bash
# 🔀 Complete hybrid pipeline (Jina metadata + GPT content)
nohup ./scripts/hybrid-enrichment.sh > logs/hybrid-main.log 2>&1 &
tail -f logs/hybrid-main.log

# Alleen stats bekijken
./scripts/hybrid-enrichment.sh --stats

# Alleen Jina metadata
./scripts/hybrid-enrichment.sh --metadata

# Alleen GPT content
./scripts/hybrid-enrichment.sh --content
```

### Individuele Scripts

```bash
# Jina metadata extractie (email, telefoon, social)
npx tsx scripts/scrape-jina-metadata.ts --limit=500 --stats

# GPT content generatie (locale-aware)
npx tsx scripts/enrich-content.ts --limit=100 --dry-run
```

---

## 🌍 Locale-Aware Content Generatie

GPT genereert content automatisch in de juiste taal:

| Land | Code | Taal | Voorbeeld |
|------|------|------|-----------|
| 🇳🇱 Netherlands | NL | Nederlands | "Welkom bij..." |
| 🇧🇪 België | BE | Nederlands | "Welkom bij..." |
| 🇩🇪 Germany | DE | Deutsch | "Willkommen bei..." |
| 🇬🇧 United Kingdom | GB | English | "Welcome to..." |
| 🇺🇸 United States | US | English | "Welcome to..." |
| 🇨🇦 Canada | CA | English | "Welcome to..." |
| 🇦🇺 Australia | AU | English | "Welcome to..." |
| 🇫🇷 France | FR | Français | "Bienvenue chez..." |
| 🇪🇸 Spain | ES | Español | "Bienvenido a..." |
| 🇮🇹 Italy | IT | Italiano | "Benvenuto da..." |

---

## Pipeline Overzicht

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  1. DISCOVERY   │ → │  2. JINA        │ → │  3. GPT         │
│  (BrightData)   │    │  (Metadata)     │    │  (Content)      │
│  198K places    │    │  142K websites  │    │  198K places    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ✅                   🔄                      🔄
      Compleet            Metadata only         Locale-aware
```

---

## Stap 1: Discovery (BrightData SERP API)

### Wat het doet
Zoekt naar huisdierenservices in alle steden via Google Maps Local Search.

### Wat het SCRAPED (per place):
| Veld | Beschrijving | Voorbeeld |
|------|--------------|-----------|
| `google_cid` | Unieke Google CID | `12345678901234567890` |
| `google_place_id` | Google Place ID | `ChIJ...` |
| `name` | Naam bedrijf | `Trimsalon De Poes` |
| `address` | Volledig adres | `Kerkstraat 1, 1234 AB` |
| `latitude/longitude` | GPS coördinaten | `52.123, 4.567` |
| `phone` | Telefoonnummer | `+31 20 123 4567` |
| `website` | Website URL | `https://...` |
| `rating` | Google rating | `4.5` |
| `review_count` | Aantal reviews | `23` |
| `opening_hours` | Openingstijden | `Ma-Vr 9:00-17:00` |

### Scripts per land
```bash
npx tsx scripts/discover-places.ts --category=veterinary --all-cities      # NL
npx tsx scripts/discover-places-be.ts --category=grooming --all-cities     # BE
npx tsx scripts/discover-places-de.ts --category=dog-training --all-cities # DE
npx tsx scripts/discover-places-uk.ts --category=pet-store --all-cities    # GB
npx tsx scripts/discover-places-{us|ca|au|es|it|fr}.ts --category=<slug> --all-cities
```

### Categorieën
```
veterinary       - Dierenartsen
grooming         - Trimsalons
pet-store        - Dierenwinkels
dog-training     - Hondentraining
pet-hotel        - Dierenpensions
dog-walking      - Uitlaatservices
emergency-vet    - Spoeddierenartsen
shelter          - Dierenasiels
pet-sitting      - Oppasservices
dog-daycare      - Hondencreches
cat-grooming     - Kattentrimsalons
exotic-vet       - Exotische dierenartsen
dog-park         - Hondenparken
```

---

## Stap 2: Jina Metadata Extractie 📧

### NIEUW: Alleen Metadata - Geen Content!

Het oude Jina script haalde ook "aboutUs" tekst op, maar die was vaak rommel (navigatie links, menu tekst). Nu haalt Jina **alleen gestructureerde metadata** op.

### Wat het EXTRAHEERT:
| Veld | Beschrijving | Voorbeeld |
|------|--------------|-----------|
| `email` | E-mailadres | `info@trimsalon.nl` |
| `phone` | Telefoonnummer | `+31 20 123 4567` |
| `socialMedia.facebook` | Facebook pagina | `https://facebook.com/...` |
| `socialMedia.instagram` | Instagram account | `https://instagram.com/...` |
| `socialMedia.twitter` | Twitter/X account | `https://twitter.com/...` |
| `socialMedia.linkedin` | LinkedIn bedrijf | `https://linkedin.com/...` |
| `foundedYear` | Oprichtingsjaar | `2015` |
| `teamSize` | Aantal medewerkers | `5` |
| `jinaMetadataAt` | Timestamp | `2024-12-20T...` |

### Commands

```bash
# 📊 Check status alle landen
npx tsx scripts/scrape-jina-metadata.ts --stats

# 🌍 Alle landen scrapen
npx tsx scripts/scrape-jina-metadata.ts --limit=500

# 🇩🇪 Specifiek land
npx tsx scripts/scrape-jina-metadata.ts --country=DE --limit=500

# 🌙 Overnight draaien (via hybrid script)
nohup ./scripts/hybrid-enrichment.sh --metadata > logs/jina.log 2>&1 &
```

### Features
- ✅ Haalt ALLEEN metadata (geen rommel tekst)
- ✅ Auto-resume (skipt places met `jinaMetadataAt`)
- ✅ Rate limiting met exponential backoff
- ✅ Internationale telefoonnummer patronen
- ✅ Social media link extractie

---

## Stap 3: GPT Content Generation 📝

### NIEUW: Locale-Aware Content!

GPT genereert nu automatisch content in de juiste taal gebaseerd op het land.

### Wat het GENEREERT:
| Veld | Beschrijving | Taal |
|------|--------------|------|
| `aboutUs` | 150-250 woorden beschrijving | Per land |
| `highlights` | 3-5 USPs | Per land |
| `services` | 4-8 diensten | Per land |
| `targetAudience` | Doelgroep beschrijving | Per land |
| `contentSource` | "openai_generated" | - |
| `contentLanguage` | "dutch", "german", etc. | - |
| `contentGeneratedAt` | Timestamp | - |

### Commands
```bash
# Standaard (20 places)
npx tsx scripts/enrich-content.ts

# Meer places
npx tsx scripts/enrich-content.ts --limit=100

# Dry run (preview)
npx tsx scripts/enrich-content.ts --dry-run --limit=5
```

### Voorbeeld Output per Taal

**Nederlands (NL/BE):**
```
"Welkom bij Trimsalon De Poes, waar uw huisdier de beste verzorging krijgt..."
```

**Duits (DE):**
```
"Willkommen bei Tierklinik Berlin, wo Ihr Haustier die beste Pflege erhält..."
```

**Frans (FR):**
```
"Bienvenue à la Clinique Vétérinaire Paris, où votre animal reçoit les meilleurs soins..."
```

---

## 🔀 Hybrid Enrichment Pipeline Script

### Script: `./scripts/hybrid-enrichment.sh`

```bash
# Complete pipeline
./scripts/hybrid-enrichment.sh

# Opties
./scripts/hybrid-enrichment.sh --metadata   # Alleen Jina
./scripts/hybrid-enrichment.sh --content    # Alleen GPT
./scripts/hybrid-enrichment.sh --stats      # Alleen stats

# Overnight
nohup ./scripts/hybrid-enrichment.sh > logs/hybrid-main.log 2>&1 &
```

### Wat het doet:
1. **Fase 1: Jina Metadata** - Scraped email, telefoon, social links
2. **Fase 2: GPT Content** - Genereert aboutUs, services, highlights (locale-aware)

### Data Structuur na Hybrid Enrichment:

```json
{
  "scraped_content": {
    // Jina Metadata (echte data)
    "email": "info@example.com",
    "phone": "+31 20 123 4567",
    "socialMedia": {
      "facebook": "https://facebook.com/example",
      "instagram": "https://instagram.com/example"
    },
    "foundedYear": 2015,
    "jinaMetadataAt": "2024-12-20T14:27:00.000Z",

    // GPT Content (locale-aware)
    "aboutUs": "Welkom bij Example Trimsalon...",
    "highlights": ["Professionele verzorging", "..."],
    "services": ["Trimmen", "Baden", "..."],
    "targetAudience": "Honden- en katteneigenaren in Amsterdam",
    "contentSource": "openai_generated",
    "contentLanguage": "dutch",
    "contentGeneratedAt": "2024-12-20T14:30:00.000Z"
  }
}
```

---

## 📈 Data Statistieken

### Quick Stats
```bash
# Hybrid pipeline stats
./scripts/hybrid-enrichment.sh --stats

# Database overview
npx tsx scripts/db-stats.ts

# Jina metadata coverage per land
npx tsx scripts/scrape-jina-metadata.ts --stats
```

### SQL Queries
```sql
-- Content coverage
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE website IS NOT NULL) as has_website,
  COUNT(*) FILTER (WHERE scraped_content->>'jinaMetadataAt' IS NOT NULL) as jina_metadata,
  COUNT(*) FILTER (WHERE scraped_content->>'email' IS NOT NULL) as has_email,
  COUNT(*) FILTER (WHERE scraped_content->>'socialMedia' IS NOT NULL) as has_social,
  COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'openai_generated') as gpt_content
FROM places;

-- Per land
SELECT
  co.code,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE p.scraped_content->>'email' IS NOT NULL) as emails,
  COUNT(*) FILTER (WHERE p.scraped_content->>'contentSource' = 'openai_generated') as gpt
FROM places p
JOIN cities c ON p.city_id = c.id
JOIN countries co ON c.country_id = co.id
GROUP BY co.code
ORDER BY total DESC;
```

---

## Data Model

### scraped_content JSONB kolom:

```typescript
interface ScrapedContent {
  // ═══════════════════════════════════════════════
  // JINA METADATA (echte website data)
  // ═══════════════════════════════════════════════
  email?: string;                    // info@example.com
  phone?: string;                    // +31 20 123 4567
  socialMedia?: {
    facebook?: string;               // https://facebook.com/...
    instagram?: string;              // https://instagram.com/...
    twitter?: string;                // https://twitter.com/...
    linkedin?: string;               // https://linkedin.com/...
  };
  foundedYear?: number;              // 2015
  teamSize?: string;                 // "5"
  jinaMetadataAt?: string;           // ISO timestamp

  // ═══════════════════════════════════════════════
  // GPT CONTENT (AI gegenereerd, locale-aware)
  // ═══════════════════════════════════════════════
  aboutUs?: string;                  // 150-250 woorden
  highlights?: string[];             // 3-5 USPs
  services?: string[];               // 4-8 diensten
  targetAudience?: string;           // Doelgroep beschrijving
  contentSource?: string;            // "openai_generated"
  contentLanguage?: string;          // "dutch", "german", "french", etc.
  contentGeneratedAt?: string;       // ISO timestamp

  // ═══════════════════════════════════════════════
  // LEGACY (oude Jina content - wordt niet meer gebruikt)
  // ═══════════════════════════════════════════════
  jinaScrapedAt?: string;            // Van oude scraper
  jinaSource?: string;               // Van oude scraper
}
```

---

## Environment Variables

```env
# Database (NeonDB)
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname

# BrightData (voor discovery)
BRIGHTDATA_API_KEY=xxx

# Jina AI (voor metadata extractie)
JINA_API_KEY=xxx

# OpenAI (voor content generation)
OPENAI_API_KEY=xxx
AI_MODEL=gpt-4o-mini
```

---

## Landen Configuratie

| Code | Land | Places | Met Website | Taal |
|------|------|--------|-------------|------|
| US | United States | 50.683 | 37.577 | English |
| GB | United Kingdom | 30.975 | 21.983 | English |
| CA | Canada | 24.565 | 18.360 | English |
| DE | Germany | 19.462 | 15.028 | Deutsch |
| FR | France | 18.375 | 12.773 | Français |
| NL | Netherlands | 18.119 | 13.124 | Nederlands |
| ES | Spain | 12.500 | 7.636 | Español |
| IT | Italy | 11.231 | 6.454 | Italiano |
| AU | Australia | 9.991 | 7.533 | English |
| BE | België | 3.087 | 1.884 | Nederlands |

---

## Tijdsinschatting

### Hybrid Enrichment (~198K places)

| Fase | Places | Tijd per item | Totale tijd |
|------|--------|---------------|-------------|
| Jina Metadata | 142K | ~1-2 sec | ~2-4 dagen |
| GPT Content | 198K | ~0.5 sec | ~1-2 dagen |
| **Totaal** | - | - | **~3-6 dagen** |

### Monitoring

```bash
# Live volgen
tail -f logs/hybrid-main.log

# Check process
ps aux | grep hybrid

# Stats checken
./scripts/hybrid-enrichment.sh --stats
```

---

## Troubleshooting

### Rate Limiting Errors
```bash
# Jina: ~1 request/seconde
# OpenAI: afhankelijk van tier

# Check logs voor 429 errors
grep "429" logs/hybrid-*.log
```

### Script Stopt Onverwacht
```bash
# Gewoon opnieuw draaien - auto-resume werkt!
./scripts/hybrid-enrichment.sh

# Check waarom gestopt
tail -100 logs/hybrid-main.log
```

### Jina Geeft Geen Metadata
- Website blokkeert scraping (anti-bot)
- Website heeft geen email/social op homepage
- Website is pure JavaScript (moeilijk te scrapen)
- Check: `jinaMetadataAt` is gezet, maar geen email/social gevonden

### GPT Genereert Verkeerde Taal
- Check `country_code` in database
- Fallback is Engels (GB) als land niet geconfigureerd

---

*Laatst bijgewerkt: December 2024 - Hybrid Enrichment v2.0*
