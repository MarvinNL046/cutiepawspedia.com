#!/bin/bash
# =============================================================================
# OVERNIGHT PIPELINE - CutiePawsPedia
# =============================================================================
# Dit script monitort de BrightData batch en start automatisch de volgende
# stappen zodra die klaar is.
#
# Usage: ./scripts/overnight-pipeline.sh
# =============================================================================

cd /home/marvin/Documenten/cutiepawspedia

echo "=============================================="
echo "  CUTIEPAWSPEDIA OVERNIGHT PIPELINE"
echo "  Started: $(date)"
echo "=============================================="
echo ""

# Function to check incomplete count
check_incomplete() {
    npx tsx -e "
    import { neon } from '@neondatabase/serverless';
    import * as dotenv from 'dotenv';
    dotenv.config({ path: '.env.local' });
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql\`
      SELECT COUNT(*) as count FROM places
      WHERE avg_rating IS NOT NULL
      AND (website IS NULL OR opening_hours IS NULL)
    \`;
    console.log(result[0].count);
    " 2>/dev/null
}

# Function to log with timestamp
log() {
    echo "[$(date '+%H:%M:%S')] $1"
}

# =============================================================================
# STAP 1: Monitor BrightData batch
# =============================================================================
log "STAP 1: Monitoring BrightData enrichment batch..."

INITIAL_INCOMPLETE=$(check_incomplete)
log "Huidige incomplete count: $INITIAL_INCOMPLETE"

# Poll elke 5 minuten tot incomplete count significant daalt
POLL_INTERVAL=300  # 5 minuten
MAX_POLLS=72       # Max 6 uur wachten
POLL_COUNT=0

while [ $POLL_COUNT -lt $MAX_POLLS ]; do
    sleep $POLL_INTERVAL
    POLL_COUNT=$((POLL_COUNT + 1))

    CURRENT_INCOMPLETE=$(check_incomplete)
    log "Poll $POLL_COUNT/$MAX_POLLS - Incomplete: $CURRENT_INCOMPLETE (was: $INITIAL_INCOMPLETE)"

    # Check of er significante voortgang is (minstens 500 minder)
    DIFF=$((INITIAL_INCOMPLETE - CURRENT_INCOMPLETE))

    if [ $DIFF -gt 500 ]; then
        log "Significante voortgang gedetecteerd! $DIFF places enriched."

        # Wacht nog 10 minuten voor laatste updates
        log "Wachten 10 min voor laatste updates..."
        sleep 600

        FINAL_INCOMPLETE=$(check_incomplete)
        log "Final incomplete count: $FINAL_INCOMPLETE"
        break
    fi

    # Als we onder 500 incomplete komen, zijn we klaar
    if [ "$CURRENT_INCOMPLETE" -lt 500 ]; then
        log "Onder 500 incomplete - BrightData batch waarschijnlijk klaar!"
        break
    fi
done

log "BrightData monitoring complete."
echo ""

# =============================================================================
# STAP 2: Website Content Scraping (Jina.ai)
# =============================================================================
log "STAP 2: Starting website content enrichment (Jina.ai)..."

# Start website enrichment in background
npx tsx scripts/enrich-website-content.ts --limit=3500 > /tmp/website-enrichment.log 2>&1 &
WEBSITE_PID=$!
log "Website enrichment gestart (PID: $WEBSITE_PID)"

# Wacht max 2 uur op website enrichment
WEBSITE_TIMEOUT=7200
WEBSITE_ELAPSED=0
while kill -0 $WEBSITE_PID 2>/dev/null && [ $WEBSITE_ELAPSED -lt $WEBSITE_TIMEOUT ]; do
    sleep 60
    WEBSITE_ELAPSED=$((WEBSITE_ELAPSED + 60))
    log "Website enrichment running... (${WEBSITE_ELAPSED}s / ${WEBSITE_TIMEOUT}s max)"
done

if kill -0 $WEBSITE_PID 2>/dev/null; then
    log "Website enrichment still running after timeout, continuing anyway..."
else
    log "Website enrichment completed!"
fi

echo ""

# =============================================================================
# STAP 3: AI Content Generatie (GPT-4o-mini)
# =============================================================================
log "STAP 3: Starting AI content generation (GPT-4o-mini)..."

# Start NL en EN parallel
log "Starting Dutch (NL) AI content..."
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --skip-existing > /tmp/ai-content-nl.log 2>&1 &
NL_PID=$!

log "Starting English (EN) AI content..."
npx tsx scripts/pregenerate-ai-content.ts --locale=en --skip-existing > /tmp/ai-content-en.log 2>&1 &
EN_PID=$!

log "AI content generation started (NL PID: $NL_PID, EN PID: $EN_PID)"

# Wacht op beide processen (max 4 uur)
AI_TIMEOUT=14400
AI_ELAPSED=0
while (kill -0 $NL_PID 2>/dev/null || kill -0 $EN_PID 2>/dev/null) && [ $AI_ELAPSED -lt $AI_TIMEOUT ]; do
    sleep 120
    AI_ELAPSED=$((AI_ELAPSED + 120))

    NL_STATUS="running"
    EN_STATUS="running"
    kill -0 $NL_PID 2>/dev/null || NL_STATUS="done"
    kill -0 $EN_PID 2>/dev/null || EN_STATUS="done"

    log "AI content: NL=$NL_STATUS, EN=$EN_STATUS (${AI_ELAPSED}s / ${AI_TIMEOUT}s max)"
done

log "AI content generation completed!"
echo ""

# =============================================================================
# STAP 4: Final Report
# =============================================================================
log "STAP 4: Generating final report..."

FINAL_INCOMPLETE=$(check_incomplete)

echo ""
echo "=============================================="
echo "  OVERNIGHT PIPELINE COMPLETE"
echo "  Finished: $(date)"
echo "=============================================="
echo ""
echo "RESULTS:"
echo "  - Started with: $INITIAL_INCOMPLETE incomplete places"
echo "  - Ended with:   $FINAL_INCOMPLETE incomplete places"
echo "  - Enriched:     $((INITIAL_INCOMPLETE - FINAL_INCOMPLETE)) places"
echo ""
echo "LOGS:"
echo "  - Website enrichment: /tmp/website-enrichment.log"
echo "  - AI content NL:      /tmp/ai-content-nl.log"
echo "  - AI content EN:      /tmp/ai-content-en.log"
echo ""
echo "Check database status with:"
echo "  npx tsx scripts/detailed-incomplete-analysis.ts"
echo ""
