#!/bin/bash
#
# Overnight Pipeline Runner
#
# Runs the complete pipeline in batches with delays to avoid rate limits.
# Safe to run overnight - logs everything and can be resumed.
#
# Usage:
#   ./scripts/run-pipeline-overnight.sh DE discover         # Discover ALL categories
#   ./scripts/run-pipeline-overnight.sh BE enrich           # Only AI enrichment
#   ./scripts/run-pipeline-overnight.sh BE gmaps            # Only Google Maps
#   ./scripts/run-pipeline-overnight.sh BE gmaps 100        # Google Maps with batch size 100
#   ./scripts/run-pipeline-overnight.sh BE all              # Full pipeline (enrich + gmaps)
#   ./scripts/run-pipeline-overnight.sh DE full             # FULL: discover + enrich + gmaps
#

# Don't exit on errors - we handle them ourselves
set +e

# Configuration
COUNTRY="${1:-BE}"
MODE="${2:-all}"          # discover, enrich, gmaps, all, full
BATCH_SIZE="${3:-50}"     # Default batch size
DELAY_SECONDS=30          # Delay between batches (rate limiting)
MAX_BATCHES=100           # Safety limit

# All available categories
CATEGORIES="veterinary grooming pet-store dog-training pet-hotel dog-walking emergency-vet shelter pet-sitting dog-daycare"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Log file
LOG_DIR="data/pipeline-logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/pipeline-${COUNTRY}-$(date +%Y%m%d-%H%M%S).log"

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

# Header
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌙 OVERNIGHT PIPELINE RUNNER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
log "Country: $COUNTRY"
log "Mode: $MODE"
log "Batch size: $BATCH_SIZE"
log "Log file: $LOG_FILE"
echo ""

# Change to project directory
cd "$(dirname "$0")/.."

# Function to discover places for all categories
run_discover() {
    log "🔍 Starting Place Discovery for ALL categories..."

    for category in $CATEGORIES; do
        log "📦 Discovering: $category"

        if npx tsx scripts/pipeline/discover.ts --country="$COUNTRY" --category="$category" --resume 2>&1 | tee -a "$LOG_FILE"; then
            log "✅ Finished: $category"
        else
            warn "⚠️  Issues with: $category (continuing...)"
        fi

        log "Waiting ${DELAY_SECONDS}s before next category..."
        sleep $DELAY_SECONDS
    done

    log "✅ Discovery complete for all categories!"
}

# Function to run AI enrichment in batches
run_enrich() {
    log "📝 Starting AI Content Enrichment..."

    batch=1
    while [ $batch -le $MAX_BATCHES ]; do
        log "Batch $batch: Running enrichment..."

        # Run enrichment with resume (it handles its own batching internally)
        if npx tsx scripts/pipeline/enrich.ts --country="$COUNTRY" --resume 2>&1 | tee -a "$LOG_FILE"; then
            # Check if there are more places to process
            remaining=$(npx tsx -e "
                import { neon } from '@neondatabase/serverless';
                import dotenv from 'dotenv';
                dotenv.config();
                const sql = neon(process.env.DATABASE_URL);
                const r = await sql\`
                    SELECT COUNT(*) as cnt FROM places p
                    JOIN cities c ON p.city_id = c.id
                    JOIN countries co ON c.country_id = co.id
                    WHERE co.code = '${COUNTRY}'
                    AND (p.scraped_content->>'aboutUs' IS NULL OR p.scraped_content->>'aboutUs' = '')
                \`;
                console.log(r[0].cnt);
            " 2>/dev/null)

            if [ "$remaining" = "0" ]; then
                log "✅ AI Enrichment complete! No more places to process."
                break
            else
                log "Remaining: $remaining places"
                log "Waiting ${DELAY_SECONDS}s before next batch..."
                sleep $DELAY_SECONDS
            fi
        else
            error "Enrichment failed on batch $batch"
            break
        fi

        ((batch++))
    done
}

# Function to run Google Maps enrichment in batches
run_gmaps() {
    log "🗺️  Starting Google Maps Enrichment..."

    batch=1
    while [ $batch -le $MAX_BATCHES ]; do
        log "Batch $batch: Fetching $BATCH_SIZE places..."

        # Run gmaps enrichment
        output=$(npx tsx scripts/pipeline/enrich-gmaps.ts --country="$COUNTRY" --limit="$BATCH_SIZE" 2>&1)
        echo "$output" | tee -a "$LOG_FILE"

        # Check if any places were processed
        if echo "$output" | grep -q "All places already enriched"; then
            log "✅ Google Maps Enrichment complete! No more places to process."
            break
        fi

        # Check for errors
        if echo "$output" | grep -q "❌"; then
            warn "Some errors occurred, continuing..."
        fi

        # Check remaining
        remaining=$(npx tsx -e "
            import { neon } from '@neondatabase/serverless';
            import dotenv from 'dotenv';
            dotenv.config();
            const sql = neon(process.env.DATABASE_URL);
            const r = await sql\`
                SELECT COUNT(*) as cnt FROM places p
                JOIN cities c ON p.city_id = c.id
                JOIN countries co ON c.country_id = co.id
                WHERE co.code = '${COUNTRY}'
                AND p.opening_hours IS NULL
            \`;
            console.log(r[0].cnt);
        " 2>/dev/null)

        if [ "$remaining" = "0" ]; then
            log "✅ Google Maps Enrichment complete! All places have opening hours."
            break
        else
            log "Remaining: $remaining places without opening hours"
            log "Waiting ${DELAY_SECONDS}s before next batch..."
            sleep $DELAY_SECONDS
        fi

        ((batch++))
    done
}

# Main execution
case $MODE in
    "full")
        log "Running FULL pipeline (discover + enrich + gmaps)..."
        run_discover
        echo ""
        run_enrich
        echo ""
        run_gmaps
        ;;
    "discover")
        run_discover
        ;;
    "all")
        log "Running enrichment pipeline (enrich + gmaps)..."
        run_enrich
        echo ""
        run_gmaps
        ;;
    "enrich")
        run_enrich
        ;;
    "gmaps")
        run_gmaps
        ;;
    *)
        error "Unknown mode: $MODE"
        echo "Usage: $0 <country> [discover|enrich|gmaps|all|full] [batch_size]"
        echo ""
        echo "Modes:"
        echo "  discover  - Find new places (all categories)"
        echo "  enrich    - AI content generation"
        echo "  gmaps     - Google Maps data (opening hours, reviews)"
        echo "  all       - enrich + gmaps"
        echo "  full      - discover + enrich + gmaps (complete pipeline)"
        exit 1
        ;;
esac

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "🎉 Pipeline finished!"
log "Log saved to: $LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Show final stats
echo ""
log "📊 Final Statistics:"
npx tsx -e "
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const sql = neon(process.env.DATABASE_URL);

const stats = await sql\`
    SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE scraped_content->>'aboutUs' IS NOT NULL) as with_about,
        COUNT(*) FILTER (WHERE opening_hours IS NOT NULL) as with_hours,
        COUNT(*) FILTER (WHERE scraped_content->>'googleReviews' IS NOT NULL) as with_reviews
    FROM places p
    JOIN cities c ON p.city_id = c.id
    JOIN countries co ON c.country_id = co.id
    WHERE co.code = '${COUNTRY}'
\`;

console.log('   Total places:', stats[0].total);
console.log('   With aboutUs:', stats[0].with_about, '(' + Math.round(stats[0].with_about/stats[0].total*100) + '%)');
console.log('   With opening hours:', stats[0].with_hours, '(' + Math.round(stats[0].with_hours/stats[0].total*100) + '%)');
console.log('   With Google reviews:', stats[0].with_reviews, '(' + Math.round(stats[0].with_reviews/stats[0].total*100) + '%)');
"
