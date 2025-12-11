#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# DISCOVER PLACES - BELGIUM
# ═══════════════════════════════════════════════════════════════
#
# Vindt nieuwe bedrijven via BrightData SERP API
# Haalt op: naam, adres, telefoon, website, rating, reviews,
#           opening hours, Google reviews (indien beschikbaar)
#
# Dit is STAP 0 - draai dit EERST voordat je enrichment doet.
#
# Gebruik: ./scripts/discover-be.sh
# Stop:    Ctrl+C
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🔍 DISCOVER PLACES - BELGIUM (BrightData SERP)               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Start: $(date)"
echo ""

# All categories
CATEGORIES="veterinary grooming dog-training dog-walking pet-hotel pet-store cat-grooming pet-sitting emergency-vet dog-daycare exotic-vet shelter dog-park"

# Results per city per category
LIMIT=20

echo "Dit script doorloopt ALLE categorieën voor ALLE Belgische steden."
echo ""
echo "Categorieën: $CATEGORIES"
echo "Limit per zoekopdracht: $LIMIT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL_CREATED=0
TOTAL_SKIPPED=0

for CATEGORY in $CATEGORIES; do
    echo ""
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║  📦 CATEGORIE: $CATEGORY"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "$(date '+%H:%M:%S') - Starting $CATEGORY..."
    echo ""

    OUTPUT=$(npx tsx scripts/discover-places-be.ts --category=$CATEGORY --all-cities --limit=$LIMIT 2>&1)
    echo "$OUTPUT"

    # Extract stats from output
    CREATED=$(echo "$OUTPUT" | grep -oP '\d+(?= created)' | tail -1 || echo "0")
    SKIPPED=$(echo "$OUTPUT" | grep -oP '\d+(?= skipped)' | tail -1 || echo "0")

    if [[ -n "$CREATED" ]]; then
        TOTAL_CREATED=$((TOTAL_CREATED + CREATED))
    fi
    if [[ -n "$SKIPPED" ]]; then
        TOTAL_SKIPPED=$((TOTAL_SKIPPED + SKIPPED))
    fi

    echo ""
    echo "✅ $CATEGORY klaar!"
    echo ""
    echo "⏳ 10s pauze voor rate limiting..."
    sleep 10
done

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🎉 DISCOVERY KLAAR!                                          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
echo ""
echo "Totaal nieuw aangemaakt: ~$TOTAL_CREATED"
echo "Totaal overgeslagen (duplicaten): ~$TOTAL_SKIPPED"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "👉 VOLGENDE STAP:"
echo "   ./scripts/overnight-enrich.sh"
echo ""
echo "   (Dit verrijkt alle nieuwe places met website data + AI content)"
echo ""
