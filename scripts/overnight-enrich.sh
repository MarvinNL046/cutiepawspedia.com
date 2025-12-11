#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# OVERNIGHT ENRICHMENT PIPELINE - BELGIUM
# ═══════════════════════════════════════════════════════════════
#
# Complete pipeline met loops om 's nachts te draaien:
#   STAP 1: Jina Website Scraping (aboutUs, facts, services)
#   STAP 2: GPT Content Generation (descriptions, highlights)
#
# VOORAF (overdag draaien):
#   Eerst nieuwe places discoveren met discover-be.sh
#
# Gebruik: ./scripts/overnight-enrich.sh
# Stop:    Ctrl+C
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🌙 OVERNIGHT ENRICHMENT PIPELINE - BELGIUM                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Start: $(date)"
echo ""
echo "Dit script draait automatisch door tot alles klaar is."
echo "Je kunt het veilig 's nachts aan laten staan."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

BATCH_SIZE=50
PAUSE_SECONDS=15

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

OFFSET=0
while true; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 JINA Batch offset=$OFFSET ($(date '+%H:%M:%S'))"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OUTPUT=$(npx tsx scripts/enrich-jina-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn
    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*scraped|places with websites have been scraped"; then
        echo ""
        echo "✅ STAP 1 KLAAR: Alle websites gescraped!"
        break
    fi

    OFFSET=$((OFFSET + BATCH_SIZE))
    echo ""
    echo "⏳ ${PAUSE_SECONDS}s pauze voor rate limiting..."
    sleep $PAUSE_SECONDS
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

OFFSET=0
while true; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 GPT Batch offset=$OFFSET ($(date '+%H:%M:%S'))"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OUTPUT=$(npx tsx scripts/enrich-content-be.ts --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
    echo "$OUTPUT"

    # Check of we klaar zijn
    if echo "$OUTPUT" | grep -qE "No more places|0 places|All.*enriched|places have been enriched"; then
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
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🎉 OVERNIGHT PIPELINE KLAAR!                                 ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
echo ""
echo "Alle Belgian places zijn nu verrijkt met:"
echo "  ✅ Website data (aboutUs, facts, services, hours)"
echo "  ✅ AI content (descriptions, highlights, SEO)"
echo ""
