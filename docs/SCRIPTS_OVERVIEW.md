# Scripts Overview - CutiePawsPedia

## 🎯 BELANGRIJKSTE SCRIPTS (die je daadwerkelijk gebruikt)

### Data Pipeline - Stap voor Stap

```
┌─────────────────────────────────────────────────────────────────┐
│  STAP 1: PLAATSEN ONTDEKKEN (BrightData + Google Maps)          │
├─────────────────────────────────────────────────────────────────┤
│  discover-places.ts      → Nederland                            │
│  discover-places-be.ts   → België                               │
│                                                                 │
│  Wat het doet:                                                  │
│  - Zoekt bedrijven via Google Maps/BrightData                   │
│  - Haalt basis info: naam, adres, rating, reviews, coords       │
│  - Slaat op in database                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STAP 2: WEBSITE SCRAPEN (Jina AI)                              │
├─────────────────────────────────────────────────────────────────┤
│  enrich-jina.ts          → Scraped websites voor extra info     │
│                                                                 │
│  Wat het doet:                                                  │
│  - Bezoekt bedrijfswebsites via Jina                            │
│  - Haalt: aboutUs, services, openingstijden, specialiteiten     │
│  - Slaat op in scraped_content JSON kolom                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STAP 3: AI CONTENT GENEREREN (GPT-4o-mini)                     │
├─────────────────────────────────────────────────────────────────┤
│  enrich-content.ts       → Alle landen (generiek)               │
│  enrich-content-nl.ts    → Alleen Nederland                     │
│  enrich-content-be.ts    → Alleen België                        │
│                                                                 │
│  Wat het doet:                                                  │
│  - Neemt basis data + Jina data als input                       │
│  - GPT-4o-mini schrijft unieke beschrijvingen                   │
│  - Genereert: aboutUs, highlights, services, metaDescription    │
└─────────────────────────────────────────────────────────────────┘
```

### Overnight Batch Scripts (voor grote runs)

| Script | Doel | Gebruik |
|--------|------|---------|
| `enrich-be-all.sh` | Alle België plaatsen verrijken | `./scripts/enrich-be-all.sh` |
| `enrich-nl-all.sh` | Alle Nederland plaatsen verrijken | `./scripts/enrich-nl-all.sh` |
| `overnight-pipeline.sh` | Complete nachtelijke run | `./scripts/overnight-pipeline.sh` |
| `daytime-pipeline.sh` | Kortere dag run | `./scripts/daytime-pipeline.sh` |

---

## 📊 Check/Status Scripts

| Script | Wat het checkt |
|--------|----------------|
| `check-content.ts` | Hoeveel plaatsen hebben content |
| `check-enrichment-status.ts` | Status van enrichment |
| `check-places-status.ts` | Algemene plaatsen status |
| `check-reviews.ts` | Reviews status |

---

## 🗄️ Database/Migratie Scripts

| Script | Doel |
|--------|------|
| `seed-belgium.ts` | België steden/provincies toevoegen |
| `run-migration.ts` | Database migraties uitvoeren |
| `migrate-provinces.ts` | Provincies structuur migreren |

---

## 🧹 Fix/Cleanup Scripts

| Script | Wat het fixt |
|--------|--------------|
| `fix-duplicate-slugs.ts` | Dubbele slugs oplossen |
| `fix-junk-categories.ts` | Verkeerde categorieën |
| `fix-zero-reviews.ts` | Plaatsen met 0 reviews |

---

## ⚠️ NIET MEER NODIG / LEGACY

Deze scripts zijn eenmalig gebruikt of vervangen:

- `add-*.ts` - Eenmalige database aanpassingen
- `test-*.ts` - Test scripts
- `collect-*.ts` - Oude data collectie (vervangen door discover-places)
- `migrate-*.ts` - Eenmalige migraties
- `seed-*.ts` - Eenmalige seed data

---

## 🚀 QUICK START - Nieuwe Plaatsen Toevoegen

### Voor Nederland:
```bash
# 1. Ontdek nieuwe plaatsen
npx tsx scripts/discover-places.ts --category=veterinarian --city=amsterdam

# 2. Scrape websites (optioneel, voor betere content)
npx tsx scripts/enrich-jina.ts --country=NL --limit=100

# 3. Genereer AI content
npx tsx scripts/enrich-content-nl.ts --batch-size=100
# OF overnight:
./scripts/enrich-nl-all.sh
```

### Voor België:
```bash
# 1. Ontdek nieuwe plaatsen
npx tsx scripts/discover-places-be.ts --category=veterinarian --all-cities

# 2. Scrape websites (optioneel)
npx tsx scripts/enrich-jina.ts --country=BE --limit=100

# 3. Genereer AI content
./scripts/enrich-be-all.sh
```

---

## 📈 Voortgang Checken

```bash
# Check hoeveel plaatsen content hebben
npx tsx scripts/check-enrichment-status.ts

# Of quick check:
npx tsx -e "
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const sql = neon(process.env.DATABASE_URL);
Promise.all([
  sql\`SELECT COUNT(*) FROM places WHERE scraped_content->>'contentSource' = 'openai_generated'\`,
  sql\`SELECT COUNT(*) FROM places\`
]).then(([enriched, total]) => {
  console.log(\`Verrijkt: \${enriched[0].count} / \${total[0].count}\`);
});
"
```
