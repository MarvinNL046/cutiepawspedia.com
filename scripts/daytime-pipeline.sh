#!/bin/bash
# =============================================================================
# DAYTIME PIPELINE - CutiePawsPedia
# =============================================================================
# Dit script draait de hele dag door en verwerkt alle enrichment taken.
# Start: Website content enrichment (Jina.ai)
# Dan: AI content generatie (GPT-4o-mini) voor NL en EN
# =============================================================================

cd /home/marvin/Documenten/cutiepawspedia

LOG_FILE="/tmp/daytime-pipeline.log"

echo "==============================================" | tee -a $LOG_FILE
echo "  CUTIEPAWSPEDIA DAYTIME PIPELINE" | tee -a $LOG_FILE
echo "  Started: $(date)" | tee -a $LOG_FILE
echo "==============================================" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a $LOG_FILE
}

# =============================================================================
# STAP 1: Website Content Enrichment (finish remaining)
# =============================================================================
log "STAP 1: Website content enrichment..."

# Check of er al een website enrichment loopt
if pgrep -f "enrich-website-content" > /dev/null; then
    log "Website enrichment loopt al, wachten tot klaar..."
    while pgrep -f "enrich-website-content" > /dev/null; do
        sleep 300  # Check elke 5 minuten
        log "Wachten op website enrichment..."
    done
    log "Bestaande website enrichment klaar."
else
    log "Nieuwe website enrichment starten (limit 3000)..."
    npx tsx scripts/enrich-website-content.ts --limit=3000 >> /tmp/website-enrichment-day.log 2>&1
    log "Website enrichment batch klaar."
fi

echo "" | tee -a $LOG_FILE

# =============================================================================
# STAP 2: AI Content Generatie - Nederlands
# =============================================================================
log "STAP 2: AI content generatie (Nederlands)..."

log "NL Place content..."
npx tsx scripts/pregenerate-ai-content.ts --locale=nl --skip-existing >> /tmp/ai-content-nl-day.log 2>&1
log "NL Place content klaar."

echo "" | tee -a $LOG_FILE

# =============================================================================
# STAP 3: AI Content Generatie - Engels
# =============================================================================
log "STAP 3: AI content generatie (Engels)..."

log "EN Place content..."
npx tsx scripts/pregenerate-ai-content.ts --locale=en --skip-existing >> /tmp/ai-content-en-day.log 2>&1
log "EN Place content klaar."

echo "" | tee -a $LOG_FILE

# =============================================================================
# STAP 4: Tweede ronde website enrichment (voor nieuwe data)
# =============================================================================
log "STAP 4: Tweede ronde website enrichment..."
npx tsx scripts/enrich-website-content.ts --limit=1000 >> /tmp/website-enrichment-day2.log 2>&1
log "Tweede website enrichment ronde klaar."

echo "" | tee -a $LOG_FILE

# =============================================================================
# STAP 5: Final Report
# =============================================================================
log "STAP 5: Final report..."

echo "" | tee -a $LOG_FILE
echo "==============================================" | tee -a $LOG_FILE
echo "  DAYTIME PIPELINE COMPLETE" | tee -a $LOG_FILE
echo "  Finished: $(date)" | tee -a $LOG_FILE
echo "==============================================" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE
echo "LOGS:" | tee -a $LOG_FILE
echo "  - Website enrichment: /tmp/website-enrichment-day.log" | tee -a $LOG_FILE
echo "  - AI content NL:      /tmp/ai-content-nl-day.log" | tee -a $LOG_FILE
echo "  - AI content EN:      /tmp/ai-content-en-day.log" | tee -a $LOG_FILE
echo "  - This log:           $LOG_FILE" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE
