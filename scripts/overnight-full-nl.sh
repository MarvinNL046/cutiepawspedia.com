#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# 🌙 FULL OVERNIGHT PIPELINE - NETHERLANDS
# ═══════════════════════════════════════════════════════════════
#
# COMPLETE PIPELINE voor 's nachts draaien:
#
#   STAP 1: Jina Website Scraping (aboutUs, facts, services)
#   STAP 2: GPT Content Generation (descriptions, highlights)
#
# NOTE: Discovery voor NL gebruikt de oude file-based scripts.
#       Dit script doet alleen enrichment.
#
# Gebruik: ./scripts/overnight-full-nl.sh
# Stop:    Ctrl+C
#
# TIP: Draai met nohup voor onbeheerd draaien:
#      nohup ./scripts/overnight-full-nl.sh > overnight-nl.log 2>&1 &
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🌙 FULL OVERNIGHT PIPELINE - NETHERLANDS                     ║"
echo "║                                                               ║"
echo "║  Dit script draait AUTOMATISCH door tot alles klaar is.       ║"
echo "║  Perfect om 's nachts aan te laten staan!                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Start: $(date)"
echo ""
echo "Pipeline:"
echo "  [1] Jina Website Scraping → aboutUs, facts, services"
echo "  [2] GPT Content           → descriptions, highlights, SEO"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

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

    OUTPUT=$(npx tsx scripts/enrich-jina-nl.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn (alleen als er GEEN "Next batch command" staat)
    if echo "$OUTPUT" | grep -q "No more places to process"; then
        echo ""
        echo "✅ STAP 1 KLAAR: Alle websites gescraped!"
        break
    fi

    # Check ook of alle places klaar zijn (alleen eindmelding ZONDER next batch)
    if echo "$OUTPUT" | grep -q "🎉" && ! echo "$OUTPUT" | grep -q "Next batch command"; then
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

    OUTPUT=$(npx tsx scripts/enrich-content-nl.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn (alleen als er GEEN "Next batch command" staat)
    if echo "$OUTPUT" | grep -q "No more places to process"; then
        echo ""
        echo "✅ STAP 2 KLAAR: Alle content gegenereerd!"
        break
    fi

    # Check ook of alle places klaar zijn (alleen eindmelding ZONDER next batch)
    if echo "$OUTPUT" | grep -q "🎉" && ! echo "$OUTPUT" | grep -q "Next batch command"; then
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
echo "║  🎉🎉🎉 NETHERLANDS PIPELINE KLAAR! 🎉🎉🎉                     ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
echo ""
echo "Alle Netherlands places zijn nu verrijkt met:"
echo ""
echo "  ✅ Jina:       aboutUs, facts, services van websites"
echo "  ✅ GPT:        descriptions, highlights, SEO content"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
