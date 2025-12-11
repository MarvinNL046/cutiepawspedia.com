#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# 🌙 FULL OVERNIGHT PIPELINE - ALL COUNTRIES (NL + BE)
# ═══════════════════════════════════════════════════════════════
#
# COMPLETE PIPELINE voor 's nachts draaien - BEIDE LANDEN:
#
#   🇧🇪 BELGIUM:
#     - Stap 0: BrightData Discovery (nieuwe places)
#     - Stap 1: Jina Website Scraping
#     - Stap 2: GPT Content Generation
#
#   🇳🇱 NETHERLANDS:
#     - Stap 1: Jina Website Scraping
#     - Stap 2: GPT Content Generation
#
# Gebruik: ./scripts/overnight-full-all.sh
# Stop:    Ctrl+C
#
# TIP: Draai met nohup voor onbeheerd draaien:
#      nohup ./scripts/overnight-full-all.sh > overnight-all.log 2>&1 &
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🌙 FULL OVERNIGHT PIPELINE - ALL COUNTRIES                   ║"
echo "║                                                               ║"
echo "║  🇧🇪 Belgium + 🇳🇱 Netherlands                                  ║"
echo "║                                                               ║"
echo "║  Dit script draait AUTOMATISCH door tot alles klaar is.       ║"
echo "║  Perfect om 's nachts aan te laten staan!                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Start: $(date)"
echo ""

BATCH_SIZE=50

# ═══════════════════════════════════════════════════════════════
# 🇧🇪 BELGIUM - DISCOVERY
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🇧🇪 BELGIUM - STAP 0: BRIGHTDATA DISCOVERY                    ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

CATEGORIES="veterinary grooming dog-training dog-walking pet-hotel pet-store cat-grooming pet-sitting emergency-vet dog-daycare exotic-vet shelter dog-park"
LIMIT=20

for CATEGORY in $CATEGORIES; do
    echo "━━━ Discovery: $CATEGORY ($(date '+%H:%M:%S')) ━━━"
    npx tsx scripts/discover-places-be.ts --category=$CATEGORY --all-cities --limit=$LIMIT 2>&1 | tail -10
    echo ""
    sleep 5
done

echo "✅ Belgium Discovery klaar!"

# ═══════════════════════════════════════════════════════════════
# 🇧🇪 BELGIUM - JINA SCRAPING
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🇧🇪 BELGIUM - STAP 1: JINA WEBSITE SCRAPING                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

OFFSET=0
while true; do
    echo "━━━ JINA BE offset=$OFFSET ($(date '+%H:%M:%S')) ━━━"
    OUTPUT=$(npx tsx scripts/enrich-jina-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT" | tail -15

    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*scraped|have been scraped"; then
        echo "✅ Belgium Jina klaar!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    sleep 15
done

# ═══════════════════════════════════════════════════════════════
# 🇧🇪 BELGIUM - GPT CONTENT
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🇧🇪 BELGIUM - STAP 2: GPT CONTENT GENERATION                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

OFFSET=0
while true; do
    echo "━━━ GPT BE offset=$OFFSET ($(date '+%H:%M:%S')) ━━━"
    OUTPUT=$(npx tsx scripts/enrich-content-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT" | tail -15

    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*enriched|have been enriched"; then
        echo "✅ Belgium GPT klaar!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    sleep 30
done

# ═══════════════════════════════════════════════════════════════
# 🇳🇱 NETHERLANDS - JINA SCRAPING
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🇳🇱 NETHERLANDS - STAP 1: JINA WEBSITE SCRAPING               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

OFFSET=0
while true; do
    echo "━━━ JINA NL offset=$OFFSET ($(date '+%H:%M:%S')) ━━━"
    OUTPUT=$(npx tsx scripts/enrich-jina-nl.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT" | tail -15

    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*scraped|have been scraped"; then
        echo "✅ Netherlands Jina klaar!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    sleep 15
done

# ═══════════════════════════════════════════════════════════════
# 🇳🇱 NETHERLANDS - GPT CONTENT
# ═══════════════════════════════════════════════════════════════

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🇳🇱 NETHERLANDS - STAP 2: GPT CONTENT GENERATION              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

OFFSET=0
while true; do
    echo "━━━ GPT NL offset=$OFFSET ($(date '+%H:%M:%S')) ━━━"
    OUTPUT=$(npx tsx scripts/enrich-content-nl.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT" | tail -15

    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*enriched|have been enriched"; then
        echo "✅ Netherlands GPT klaar!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    sleep 30
done

# ═══════════════════════════════════════════════════════════════
# KLAAR
# ═══════════════════════════════════════════════════════════════

echo ""
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║  🎉🎉🎉 ALL COUNTRIES PIPELINE KLAAR! 🎉🎉🎉                    ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
echo ""
echo "Alle places in NL en BE zijn nu verrijkt met:"
echo ""
echo "  🇧🇪 Belgium:"
echo "     ✅ BrightData Discovery"
echo "     ✅ Jina Website Scraping"
echo "     ✅ GPT Content Generation"
echo ""
echo "  🇳🇱 Netherlands:"
echo "     ✅ Jina Website Scraping"
echo "     ✅ GPT Content Generation"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
