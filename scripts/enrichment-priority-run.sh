#!/bin/bash
# =============================================================================
# ENRICHMENT PRIORITY RUN - CutiePawsPedia
# =============================================================================
#
# Draait content enrichment in optimale volgorde:
#   1. Jina EERST (echte website content = BESTE voor SEO)
#   2. GPT daarna (alleen voor places ZONDER website)
#
# Jina = ECHTE content van websites (uniek, feitelijk)
# GPT = Gegenereerde content (kan feiten verzinnen, generiek)
#
# Usage:
#   ./scripts/enrichment-priority-run.sh              # Alle landen
#   ./scripts/enrichment-priority-run.sh --country=DE # Specifiek land
#   ./scripts/enrichment-priority-run.sh --jina-only  # Alleen Jina
#   ./scripts/enrichment-priority-run.sh --stats      # Alleen stats tonen
#
# Overnight:
#   nohup ./scripts/enrichment-priority-run.sh > enrichment.log 2>&1 &
#   tail -f enrichment.log
#
# =============================================================================

set -e
cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Parse arguments
COUNTRY=""
JINA_ONLY=false
GPT_ONLY=false
STATS_ONLY=false
BATCH_SIZE=100
MAX_BATCHES=1000  # Safety limit

for arg in "$@"; do
    case $arg in
        --country=*)
            COUNTRY="${arg#*=}"
            ;;
        --jina-only)
            JINA_ONLY=true
            ;;
        --gpt-only)
            GPT_ONLY=true
            ;;
        --stats)
            STATS_ONLY=true
            ;;
        --batch-size=*)
            BATCH_SIZE="${arg#*=}"
            ;;
    esac
done

# Create logs dir
mkdir -p logs
LOG_FILE="logs/enrichment-$(date +%Y%m%d-%H%M%S).log"

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🚀 CUTIEPAWSPEDIA ENRICHMENT PIPELINE                        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "Started: $(date)"
echo "Log: $LOG_FILE"
echo ""
echo "Config:"
[ -n "$COUNTRY" ] && echo "  🌍 Country: $COUNTRY" || echo "  🌍 Country: ALL"
echo "  📦 Batch size: $BATCH_SIZE"
[ "$JINA_ONLY" = true ] && echo "  ⚡ Mode: Jina only"
[ "$GPT_ONLY" = true ] && echo "  ⚡ Mode: GPT only"
echo ""

# Show current stats
echo -e "${YELLOW}📊 Current Content Coverage:${NC}"
echo ""
COUNTRY_ARG=""
[ -n "$COUNTRY" ] && COUNTRY_ARG="--country=$COUNTRY"
npx tsx scripts/enrich-jina-all.ts --stats $COUNTRY_ARG 2>&1 | tee -a $LOG_FILE

if [ "$STATS_ONLY" = true ]; then
    exit 0
fi

# =============================================================================
# FASE 1: JINA WEBSITE SCRAPING (PRIORITEIT!)
# =============================================================================

if [ "$GPT_ONLY" = false ]; then
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📡 FASE 1: JINA WEBSITE SCRAPING                            ${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Dit haalt ECHTE content van bedrijfswebsites."
    echo "✅ Unieke tekst per bedrijf"
    echo "✅ Feitelijke informatie (geen verzinsels)"
    echo "✅ Beste bron voor SEO"
    echo ""

    BATCH_NUM=0
    TOTAL_SCRAPED=0
    START_TIME=$(date +%s)

    while [ $BATCH_NUM -lt $MAX_BATCHES ]; do
        BATCH_NUM=$((BATCH_NUM + 1))

        echo ""
        echo -e "${BLUE}═══ JINA BATCH $BATCH_NUM ($(date '+%H:%M:%S')) ═══${NC}"

        # Run and stream output directly (no buffering)
        npx tsx scripts/enrich-jina-all.ts $COUNTRY_ARG --batch-size=$BATCH_SIZE 2>&1 | tee -a $LOG_FILE

        # Check last batch results from log
        SCRAPED=$(tail -20 $LOG_FILE | grep -oP 'Scraped: \K\d+' || echo "0")
        TOTAL_SCRAPED=$((TOTAL_SCRAPED + SCRAPED))

        # Check if done
        if tail -20 $LOG_FILE | grep -qE "All places with websites have been scraped|Processing 0 places"; then
            echo ""
            echo -e "${GREEN}✅ Jina scraping complete!${NC}"
            break
        fi

        # Progress report
        ELAPSED=$(($(date +%s) - START_TIME))
        if [ $ELAPSED -gt 0 ]; then
            RATE=$((TOTAL_SCRAPED * 60 / ELAPSED))
            echo ""
            echo "📈 Progress: $TOTAL_SCRAPED scraped ($RATE/min)"
        fi

        echo ""
        echo "⏳ 10s pauze..."
        sleep 10
    done

    JINA_TIME=$(($(date +%s) - START_TIME))
    echo ""
    echo -e "${GREEN}✅ Jina fase complete: $TOTAL_SCRAPED places in ${JINA_TIME}s${NC}"
fi

# =============================================================================
# FASE 2: GPT CONTENT GENERATION (alleen waar nodig)
# =============================================================================

if [ "$JINA_ONLY" = false ]; then
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}🤖 FASE 2: GPT CONTENT GENERATION                           ${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Dit genereert AI content voor places ZONDER website."
    echo "⚠️ Let op: GPT kan feiten verzinnen!"
    echo ""

    BATCH_NUM=0
    MAX_GPT_BATCHES=200  # Lower limit for GPT (costs money)
    START_TIME=$(date +%s)

    while [ $BATCH_NUM -lt $MAX_GPT_BATCHES ]; do
        BATCH_NUM=$((BATCH_NUM + 1))

        echo ""
        echo -e "${BLUE}═══ GPT BATCH $BATCH_NUM ($(date '+%H:%M:%S')) ═══${NC}"

        OUTPUT=$(npx tsx scripts/enrich-content.ts --limit=50 2>&1)
        echo "$OUTPUT" | tee -a $LOG_FILE

        # Check if done
        if echo "$OUTPUT" | grep -qE "All places already have good content|0 places need"; then
            echo ""
            echo -e "${GREEN}✅ GPT generation complete!${NC}"
            break
        fi

        echo ""
        echo "⏳ 30s pauze (OpenAI rate limits)..."
        sleep 30
    done
fi

# =============================================================================
# DONE
# =============================================================================

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ ENRICHMENT PIPELINE COMPLETE                              ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Finished: $(date)"
echo "Log: $LOG_FILE"
echo ""

# Final stats
echo -e "${YELLOW}📊 Final Content Coverage:${NC}"
echo ""
npx tsx scripts/enrich-jina-all.ts --stats 2>&1 | tee -a $LOG_FILE

echo ""
echo -e "${GREEN}🎯 Next steps:${NC}"
echo "   - Check DB stats: npx tsx scripts/db-stats.ts"
echo "   - View random content samples in database"
echo "   - Re-run if more places need enrichment"
echo ""
