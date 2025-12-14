#!/bin/bash
#
# Google Reviews Scraper - Runner Script
#
# This script runs the reviews scraper in batches with logging.
# Designed to be run in a separate terminal for long-running operations.
#
# Usage:
#   ./scripts/run-scrape-reviews.sh                    # Default: Belgium, 500 places
#   ./scripts/run-scrape-reviews.sh --country=NL      # Netherlands
#   ./scripts/run-scrape-reviews.sh --limit=100       # Custom limit
#   ./scripts/run-scrape-reviews.sh --dry-run         # Preview mode
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default configuration
COUNTRY="BE"
TOTAL_LIMIT=500
BATCH_SIZE=25
OFFSET=0
DRY_RUN=""

# Parse command line arguments
for arg in "$@"; do
  case $arg in
    --country=*)
      COUNTRY="${arg#*=}"
      shift
      ;;
    --limit=*)
      TOTAL_LIMIT="${arg#*=}"
      shift
      ;;
    --batch-size=*)
      BATCH_SIZE="${arg#*=}"
      shift
      ;;
    --offset=*)
      OFFSET="${arg#*=}"
      shift
      ;;
    --dry-run)
      DRY_RUN="--dry-run"
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --country=XX      Country code (default: BE)"
      echo "  --limit=N         Total places to process (default: 500)"
      echo "  --batch-size=N    Places per API batch (default: 25)"
      echo "  --offset=N        Starting offset (default: 0)"
      echo "  --dry-run         Preview without API calls"
      echo "  -h, --help        Show this help"
      exit 0
      ;;
  esac
done

# Setup logging
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/scrape-reviews-${COUNTRY}-$(date +%Y%m%d-%H%M%S).log"

# Header
echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           Google Reviews Scraper - Runner                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}Configuration:${NC}"
echo "  Country:     $COUNTRY"
echo "  Total:       $TOTAL_LIMIT places"
echo "  Batch size:  $BATCH_SIZE"
echo "  Offset:      $OFFSET"
echo "  Log file:    $LOG_FILE"
if [ -n "$DRY_RUN" ]; then
  echo -e "  Mode:        ${YELLOW}DRY RUN${NC}"
fi
echo ""

# Confirm before starting (unless dry run)
if [ -z "$DRY_RUN" ]; then
  echo -e "${YELLOW}This will make BrightData API calls (costs money!).${NC}"
  echo -n "Press Enter to continue or Ctrl+C to cancel..."
  read
  echo ""
fi

# Function to run a single batch
run_batch() {
  local current_offset=$1
  local batch_limit=$2

  echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}Batch starting at offset $current_offset${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

  npx tsx scripts/scrape-reviews.ts \
    --country="$COUNTRY" \
    --offset="$current_offset" \
    --limit="$batch_limit" \
    --batch-size="$BATCH_SIZE" \
    $DRY_RUN 2>&1 | tee -a "$LOG_FILE"

  return ${PIPESTATUS[0]}
}

# Calculate number of iterations
ITERATIONS=$(( (TOTAL_LIMIT + BATCH_SIZE - 1) / BATCH_SIZE ))
CURRENT_OFFSET=$OFFSET
PROCESSED=0

echo "Starting $ITERATIONS batch(es)..."
echo ""

# Main loop
for ((i=1; i<=ITERATIONS; i++)); do
  # Calculate this batch's limit
  REMAINING=$((TOTAL_LIMIT - PROCESSED))
  BATCH_LIMIT=$((REMAINING < BATCH_SIZE ? REMAINING : BATCH_SIZE))

  if [ $BATCH_LIMIT -le 0 ]; then
    break
  fi

  echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
  echo -e "${YELLOW}  ITERATION $i/$ITERATIONS - Processing $BATCH_LIMIT places${NC}"
  echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"

  # Run the batch
  if run_batch $CURRENT_OFFSET $BATCH_LIMIT; then
    PROCESSED=$((PROCESSED + BATCH_LIMIT))
    CURRENT_OFFSET=$((CURRENT_OFFSET + BATCH_LIMIT))
  else
    echo -e "\n${RED}Batch failed! Check log file: $LOG_FILE${NC}"
    exit 1
  fi

  # Brief pause between batches (unless last batch or dry run)
  if [ $i -lt $ITERATIONS ] && [ -z "$DRY_RUN" ]; then
    echo -e "\n${BLUE}Waiting 5 seconds before next batch...${NC}"
    sleep 5
  fi
done

# Summary
echo -e "\n${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    SCRAPING COMPLETE!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo "  Processed:  $PROCESSED places"
echo "  Log file:   $LOG_FILE"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Check the log file for any errors"
echo "  2. Run 'npx tsx scripts/db-stats.ts' to verify results"
echo "  3. To continue from where you left off:"
echo "     ./scripts/run-scrape-reviews.sh --country=$COUNTRY --offset=$CURRENT_OFFSET"
