#!/bin/bash
# =============================================================================
# HYBRID ENRICHMENT PIPELINE - CutiePawsPedia
# =============================================================================
#
# De slimme aanpak:
#   1. JINA voor METADATA (email, telefoon, social, openingstijden)
#   2. GPT voor CONTENT (aboutUs, services, highlights)
#
# Waarom hybrid?
#   - Jina is goed in: email extractie, social links, telefoon
#   - GPT is goed in: coherente teksten, geen rommel
#   - Samen: beste van beide werelden!
#
# Usage:
#   ./scripts/hybrid-enrichment.sh              # Complete pipeline
#   ./scripts/hybrid-enrichment.sh --metadata   # Alleen Jina metadata
#   ./scripts/hybrid-enrichment.sh --content    # Alleen GPT content
#   ./scripts/hybrid-enrichment.sh --stats      # Alleen stats tonen
#
# Overnight:
#   nohup ./scripts/hybrid-enrichment.sh > enrichment.log 2>&1 &
#
# =============================================================================

set -e
cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Parse arguments
METADATA_ONLY=false
CONTENT_ONLY=false
STATS_ONLY=false
BATCH_SIZE=100

for arg in "$@"; do
    case $arg in
        --metadata|--jina)
            METADATA_ONLY=true
            ;;
        --content|--gpt)
            CONTENT_ONLY=true
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
LOG_FILE="logs/hybrid-$(date +%Y%m%d-%H%M%S).log"

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🔀 HYBRID ENRICHMENT PIPELINE                                ║"
echo "║                                                               ║"
echo "║  📧 Jina → Metadata (email, social, telefoon)                 ║"
echo "║  📝 GPT  → Content (aboutUs, services, highlights)            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "Started: $(date)"
echo "Log: $LOG_FILE"
echo ""

# Show current stats
show_stats() {
    echo -e "${YELLOW}📊 Current Status:${NC}"
    npx tsx -e "
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const sql = neon(process.env.DATABASE_URL);

async function stats() {
  const r = (await sql\`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE website IS NOT NULL AND website != '') as has_website,
      COUNT(*) FILTER (WHERE scraped_content->>'email' IS NOT NULL) as has_email,
      COUNT(*) FILTER (WHERE scraped_content->>'socialMedia' IS NOT NULL) as has_social,
      COUNT(*) FILTER (WHERE scraped_content->>'jinaMetadataAt' IS NOT NULL) as jina_done,
      COUNT(*) FILTER (WHERE scraped_content->>'contentSource' = 'openai_generated') as gpt_done,
      COUNT(*) FILTER (WHERE scraped_content->>'aboutUs' IS NOT NULL AND LENGTH(scraped_content->>'aboutUs') > 200) as good_content
    FROM places
  \`)[0];

  console.log('');
  console.log('┌─────────────────────────────────────────────────┐');
  console.log('│ TOTAAL                                          │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log('│ Places:          ' + String(r.total).padStart(8) + '                       │');
  console.log('│ Met website:     ' + String(r.has_website).padStart(8) + '                       │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log('│ METADATA (Jina)                                 │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log('│ Met email:       ' + String(r.has_email).padStart(8) + '                       │');
  console.log('│ Met social:      ' + String(r.has_social).padStart(8) + '                       │');
  console.log('│ Jina processed:  ' + String(r.jina_done).padStart(8) + '                       │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log('│ CONTENT (GPT)                                   │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log('│ GPT generated:   ' + String(r.gpt_done).padStart(8) + '                       │');
  console.log('│ Good content:    ' + String(r.good_content).padStart(8) + '                       │');
  console.log('└─────────────────────────────────────────────────┘');
  console.log('');
}
stats();
" 2>&1 | tee -a $LOG_FILE
}

show_stats

if [ "$STATS_ONLY" = true ]; then
    exit 0
fi

# =============================================================================
# FASE 1: JINA METADATA EXTRACTION
# =============================================================================

if [ "$CONTENT_ONLY" = false ]; then
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📧 FASE 1: JINA METADATA EXTRACTION                        ${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Extracting: email, telefoon, social media, openingstijden"
    echo ""

    BATCH_NUM=0
    MAX_BATCHES=500

    while [ $BATCH_NUM -lt $MAX_BATCHES ]; do
        BATCH_NUM=$((BATCH_NUM + 1))

        echo ""
        echo -e "${BLUE}═══ JINA BATCH $BATCH_NUM ($(date '+%H:%M:%S')) ═══${NC}"

        # Run and stream output
        npx tsx scripts/scrape-jina-metadata.ts --limit=500 2>&1 | tee -a $LOG_FILE

        # Check if done
        if tail -20 $LOG_FILE | grep -qE "All places have been processed|Processing 0 places"; then
            echo ""
            echo -e "${GREEN}✅ Jina metadata complete!${NC}"
            break
        fi

        echo ""
        echo "⏳ 10s pauze..."
        sleep 10
    done
fi

# =============================================================================
# FASE 2: GPT CONTENT GENERATION
# =============================================================================

if [ "$METADATA_ONLY" = false ]; then
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📝 FASE 2: GPT CONTENT GENERATION                          ${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Generating: aboutUs, services, highlights (150-250 woorden)"
    echo ""

    BATCH_NUM=0
    MAX_GPT_BATCHES=1000

    while [ $BATCH_NUM -lt $MAX_GPT_BATCHES ]; do
        BATCH_NUM=$((BATCH_NUM + 1))

        echo ""
        echo -e "${YELLOW}═══ GPT BATCH $BATCH_NUM ($(date '+%H:%M:%S')) ═══${NC}"

        npx tsx scripts/enrich-content.ts --limit=$BATCH_SIZE 2>&1 | tee -a $LOG_FILE

        # Check if done
        if tail -20 $LOG_FILE | grep -qE "All places already have good content|0 places need"; then
            echo ""
            echo -e "${GREEN}✅ GPT content complete!${NC}"
            break
        fi

        echo ""
        echo "⏳ 5s pauze (API rate limits)..."
        sleep 5
    done
fi

# =============================================================================
# DONE
# =============================================================================

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  ✅ HYBRID ENRICHMENT COMPLETE                                ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Finished: $(date)"
echo ""

# Final stats
show_stats

echo -e "${GREEN}🎯 Data Structuur:${NC}"
echo "   scraped_content = {"
echo "     // Jina metadata"
echo "     email: 'info@example.com',"
echo "     socialMedia: { facebook: '...', instagram: '...' },"
echo "     jinaMetadataAt: '2025-12-20T...',"
echo ""
echo "     // GPT content"
echo "     aboutUs: '150-250 woorden...',"
echo "     services: ['...'],"
echo "     highlights: ['...'],"
echo "     contentSource: 'openai_generated'"
echo "   }"
echo ""
