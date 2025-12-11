#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# STAP 1: JINA WEBSITE SCRAPING
# ═══════════════════════════════════════════════════════════════
# Scraped extra info van websites (aboutUs, services, etc.)
# Draai dit EERST, daarna step2-content.sh
#
# Gebruik: ./scripts/step1-jina.sh
# Stop:    Ctrl+C
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  STAP 1: JINA WEBSITE SCRAPING                                ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Welk land?"
echo ""
echo "  1) 🇳🇱 Nederland"
echo "  2) 🇧🇪 België"
echo "  3) 🌍 Beide"
echo ""
read -p "Keuze [1/2/3]: " choice

case $choice in
    1) COUNTRIES="NL" ;;
    2) COUNTRIES="BE" ;;
    3) COUNTRIES="NL BE" ;;
    *) echo "Ongeldige keuze"; exit 1 ;;
esac

echo ""
echo "Start: $(date)"
echo ""

BATCH_SIZE=100

for COUNTRY in $COUNTRIES; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    [ "$COUNTRY" = "NL" ] && echo "🇳🇱 NEDERLAND" || echo "🇧🇪 BELGIË"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OFFSET=0
    while true; do
        echo ""
        echo "📦 Batch offset=$OFFSET ($(date '+%H:%M'))"

        OUTPUT=$(npx tsx scripts/enrich-jina.ts --country=$COUNTRY --offset=$OFFSET --limit=$BATCH_SIZE 2>&1)
        echo "$OUTPUT"

        # Done check
        if echo "$OUTPUT" | grep -qE "No more|0 places|All.*processed"; then
            echo "✅ $COUNTRY klaar!"
            break
        fi

        OFFSET=$((OFFSET + BATCH_SIZE))
        echo "⏳ 20s pauze..."
        sleep 20
    done
done

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  ✅ STAP 1 KLAAR!                                             ║"
echo "║                                                               ║"
echo "║  👉 Nu stap 2: ./scripts/step2-content.sh                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
