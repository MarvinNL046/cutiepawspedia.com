#!/bin/bash
# Start continuous coordinate enrichment via Bright Data SERP API
#
# This script runs the coordinate enrichment in batches of 100 places.
# Each place takes ~0.5-1 second (API + delay), so 100 places = ~1-2 minutes.
#
# Usage:
#   ./scripts/start-coordinates.sh           # Normal start
#   ./scripts/start-coordinates.sh --resume  # Resume after interruption
#
# Logs are saved to: logs/coordinates-enrichment-YYYY-MM-DD.log
# Progress is saved to: data/coordinate-enrichment/progress.json
#
# To stop: kill $(pgrep -f "enrich-coordinates")

cd "$(dirname "$0")/.."

# Create logs directory if it doesn't exist
mkdir -p logs

LOG_FILE="logs/coordinates-enrichment-$(date +%Y-%m-%d).log"

echo "Starting coordinate enrichment..."
echo "Log file: $LOG_FILE"
echo "Progress file: data/coordinate-enrichment/progress.json"
echo ""

# Run continuous enrichment in batches
# Process 1000 batches (100 places each = 100,000 places max)
for i in $(seq 1 1000); do
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] Starting batch $i..." >> "$LOG_FILE"

    # Run enrichment for 100 places with resume
    if ! npx tsx scripts/enrich-coordinates.ts --batch 100 --resume >> "$LOG_FILE" 2>&1; then
        echo "[$(date +%Y-%m-%d\ %H:%M:%S)] Script exited with error, waiting 60s..." >> "$LOG_FILE"
        sleep 60
    fi

    # Pause between batches (30 seconds to avoid rate limiting)
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] Batch $i complete. Waiting 30s..." >> "$LOG_FILE"
    sleep 30
done

echo "Enrichment loop complete!"
