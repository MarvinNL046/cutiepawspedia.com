#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# 🌙 FULL OVERNIGHT PIPELINE - BELGIUM
# ═══════════════════════════════════════════════════════════════
#
# COMPLETE PIPELINE voor 's nachts draaien:
#
#   STAP 0: BrightData Discovery (nieuwe places vinden)
#   STAP 1: Jina Website Scraping (aboutUs, facts, services)
#   STAP 2: GPT Content Generation (descriptions, highlights)
#
# Alle stappen hebben loops en draaien automatisch door tot klaar.
#
# Gebruik: ./scripts/overnight-full.sh
# Stop:    Ctrl+C
#
# TIP: Draai met nohup voor onbeheerd draaien:
#      nohup ./scripts/overnight-full.sh > overnight.log 2>&1 &
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

LOG_FILE="overnight-$(date '+%Y%m%d-%H%M').log"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🌙 FULL OVERNIGHT PIPELINE - BELGIUM                         ║"
echo "║                                                               ║"
echo "║  Dit script draait AUTOMATISCH door tot alles klaar is.       ║"
echo "║  Perfect om 's nachts aan te laten staan!                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Start: $(date)"
echo "Log: $LOG_FILE"
echo ""
echo "Pipeline:"
echo "  [0] BrightData Discovery  → Nieuwe places vinden"
echo "  [1] Jina Website Scraping → aboutUs, facts, services"
echo "  [2] GPT Content           → descriptions, highlights, SEO"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ═══════════════════════════════════════════════════════════════
# STAP 0: BRIGHTDATA DISCOVERY
# ═══════════════════════════════════════════════════════════════

echo ""
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  STAP 0/2: BRIGHTDATA DISCOVERY                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Zoekt nieuwe huisdierenbedrijven in alle Belgische steden..."
echo ""

CATEGORIES="veterinary grooming dog-training dog-walking pet-hotel pet-store emergency-vet shelter dog-daycare"
LIMIT=20

for CATEGORY in $CATEGORIES; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Discovery: $CATEGORY ($(date '+%H:%M:%S'))"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    npx tsx scripts/discover-places-be.ts --category=$CATEGORY --all-cities --limit=$LIMIT 2>&1 | tail -20

    echo ""
    echo "⏳ 5s pauze..."
    sleep 5
done

echo ""
echo "✅ STAP 0 KLAAR: Discovery voltooid!"
echo ""

# ═══════════════════════════════════════════════════════════════
# STAP 1: JINA WEBSITE SCRAPING
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  STAP 1/2: JINA WEBSITE SCRAPING                              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Scraped extra info van websites (aboutUs, facts, services, hours)"
echo ""

BATCH_SIZE=50
OFFSET=0

while true; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 JINA Batch offset=$OFFSET ($(date '+%H:%M:%S'))"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OUTPUT=$(npx tsx scripts/enrich-jina-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn
    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*scraped|have been scraped"; then
        echo ""
        echo "✅ STAP 1 KLAAR: Alle websites gescraped!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    echo ""
    echo "⏳ 15s pauze voor Jina rate limiting..."
    sleep 15
done

# ═══════════════════════════════════════════════════════════════
# STAP 2: GPT CONTENT GENERATION
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  STAP 2/2: GPT CONTENT GENERATION                             ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Genereert beschrijvingen, highlights, services met GPT-4o-mini"
echo ""

BATCH_SIZE=50
OFFSET=0

while true; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 GPT Batch offset=$OFFSET ($(date '+%H:%M:%S'))"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OUTPUT=$(npx tsx scripts/enrich-content-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn
    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*enriched|have been enriched"; then
        echo ""
        echo "✅ STAP 2 KLAAR: Alle content gegenereerd!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    echo ""
    echo "⏳ 30s pauze voor OpenAI rate limiting..."
    sleep 30
done

# ═══════════════════════════════════════════════════════════════
# KLAAR
# ═══════════════════════════════════════════════════════════════

echo ""
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║  🎉🎉🎉 FULL OVERNIGHT PIPELINE KLAAR! 🎉🎉🎉                  ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
echo ""
echo "Alle Belgian places zijn nu verrijkt met:"
echo ""
echo "  ✅ BrightData: naam, adres, rating, reviews, opening hours"
echo "  ✅ Jina:       aboutUs, facts, services van websites"
echo "  ✅ GPT:        descriptions, highlights, SEO content"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
