#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# STAP 2: AI CONTENT GENEREREN (GPT-4o-mini)
# ═══════════════════════════════════════════════════════════════
# Genereert beschrijvingen, highlights, services, meta descriptions
# Tip: draai eerst step1-jina.sh voor betere kwaliteit!
#
# Gebruik: ./scripts/step2-content.sh
# Stop:    Ctrl+C
# ═══════════════════════════════════════════════════════════════

cd /home/marvin/Documenten/cutiepawspedia

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  STAP 2: AI CONTENT (GPT-4o-mini)                             ║"
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
    1) SCRIPTS="enrich-content-nl.ts" ;;
    2) SCRIPTS="enrich-content-be.ts" ;;
    3) SCRIPTS="enrich-content-nl.ts enrich-content-be.ts" ;;
    *) echo "Ongeldige keuze"; exit 1 ;;
esac

echo ""
echo "Start: $(date)"
echo ""

BATCH_SIZE=100

for SCRIPT in $SCRIPTS; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    [[ "$SCRIPT" == *"-nl"* ]] && echo "🇳🇱 NEDERLAND" || echo "🇧🇪 BELGIË"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    OFFSET=0
    while true; do
        echo ""
        echo "📦 Batch offset=$OFFSET ($(date '+%H:%M'))"

        OUTPUT=$(npx tsx scripts/$SCRIPT --offset=$OFFSET --batch-size=$BATCH_SIZE 2>&1)
        echo "$OUTPUT"

        # Done check
        if echo "$OUTPUT" | grep -qE "No more|All.*enriched|0 places"; then
            echo "✅ Klaar!"
            break
        fi

        OFFSET=$((OFFSET + BATCH_SIZE))
        echo "⏳ 30s pauze..."
        sleep 30
    done
done

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🎉 STAP 2 KLAAR! ALLE CONTENT GEGENEREERD!                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "End: $(date)"
