#!/bin/bash
# Start parallel content enrichment - one instance per country
#
# Usage:
#   ./scripts/start-content-parallel.sh          # Start all countries
#   ./scripts/start-content-parallel.sh US GB    # Start specific countries
#   ./scripts/start-content-parallel.sh --stop   # Stop all instances
#
# Logs are saved to: logs/content-enrichment-{COUNTRY}-YYYY-MM-DD.log

cd "$(dirname "$0")/.."
mkdir -p logs

# All available countries (ordered by places to enrich)
ALL_COUNTRIES="US GB CA DE FR NL ES AU IT BE"

# Handle --stop flag
if [ "$1" = "--stop" ]; then
    echo "Stopping all content enrichment instances..."
    pkill -f "enrichment-continuous.ts" || echo "No instances running"
    exit 0
fi

# Use provided countries or all
COUNTRIES="${*:-$ALL_COUNTRIES}"

DATE=$(date +%Y-%m-%d)

echo "Starting content enrichment for: $COUNTRIES"
echo ""

for COUNTRY in $COUNTRIES; do
    LOG_FILE="logs/content-enrichment-${COUNTRY}-${DATE}.log"

    # Check if already running for this country
    if pgrep -f "enrichment-continuous.ts --country $COUNTRY" > /dev/null; then
        echo "⚠️  $COUNTRY: Already running, skipping"
        continue
    fi

    echo "🚀 Starting $COUNTRY -> $LOG_FILE"
    nohup npx tsx scripts/enrichment-continuous.ts --country "$COUNTRY" >> "$LOG_FILE" 2>&1 &

    # Small delay to avoid overwhelming the system
    sleep 2
done

echo ""
echo "All instances started! Monitor with:"
echo "  tail -f logs/content-enrichment-*-${DATE}.log"
echo ""
echo "Stop all with:"
echo "  ./scripts/start-content-parallel.sh --stop"
