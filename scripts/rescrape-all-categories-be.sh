#!/bin/bash
#
# Rescrape Google CIDs for all categories (BELGIUM 🇧🇪)
# With progress bar, rate limiting, and retry logic
#
# Usage:
#   ./scripts/rescrape-all-categories-be.sh
#   ./scripts/rescrape-all-categories-be.sh --limit 100
#   ./scripts/rescrape-all-categories-be.sh --delay 2000
#

# Don't use set -e because ((var++)) returns 1 when var is 0

# Configuration
LIMIT=${LIMIT:-500}
DELAY=${DELAY:-1500}
RETRY_DELAY=30
MAX_RETRIES=3

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --limit)
      LIMIT="$2"
      shift 2
      ;;
    --delay)
      DELAY="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# All categories
CATEGORIES=(
  "boarding"
  "cat-grooming"
  "dog-daycare"
  "dog-park"
  "dog-training"
  "dog-walking"
  "emergency-vet"
  "exotic-vet"
  "grooming"
  "pet-grooming"
  "pet-hotel"
  "pet-sitting"
  "pet-store"
  "shelter"
  "veterinary"
)

TOTAL_CATEGORIES=${#CATEGORIES[@]}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Progress bar function
progress_bar() {
  local current=$1
  local total=$2
  local width=40
  local percentage=$((current * 100 / total))
  local filled=$((current * width / total))
  local empty=$((width - filled))

  printf "\r${CYAN}["
  printf "%${filled}s" | tr ' ' '█'
  printf "%${empty}s" | tr ' ' '░'
  printf "] ${percentage}%% (${current}/${total})${NC}"
}

# Header
echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${BLUE}║   🐾 CutiePawsPedia - Rescrape All Categories (BELGIUM 🇧🇪)   ║${NC}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}Configuration:${NC}"
echo -e "  • Categories: ${BOLD}${TOTAL_CATEGORIES}${NC}"
echo -e "  • Limit per category: ${BOLD}${LIMIT}${NC}"
echo -e "  • Delay between requests: ${BOLD}${DELAY}ms${NC}"
echo -e "  • Max retries: ${BOLD}${MAX_RETRIES}${NC}"
echo ""

# Stats
SUCCESSFUL=0
FAILED=0
SKIPPED=0
START_TIME=$(date +%s)

# Process each category
for i in "${!CATEGORIES[@]}"; do
  CATEGORY="${CATEGORIES[$i]}"
  CURRENT=$((i + 1))

  echo ""
  echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  progress_bar $CURRENT $TOTAL_CATEGORIES
  echo ""
  echo -e "${YELLOW}📦 Processing: ${BOLD}${CATEGORY}${NC} (Belgium 🇧🇪)"
  echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

  # Retry logic
  RETRY_COUNT=0
  SUCCESS=false

  while [[ $RETRY_COUNT -lt $MAX_RETRIES ]] && [[ "$SUCCESS" == "false" ]]; do
    if [[ $RETRY_COUNT -gt 0 ]]; then
      echo -e "${YELLOW}⏳ Retry ${RETRY_COUNT}/${MAX_RETRIES} - Waiting ${RETRY_DELAY}s...${NC}"
      sleep $RETRY_DELAY
    fi

    # Run the Belgium rescrape script
    if npx tsx scripts/rescrape-place-ids-be.ts --category "$CATEGORY" --limit "$LIMIT" --delay "$DELAY" 2>&1; then
      SUCCESS=true
      SUCCESSFUL=$((SUCCESSFUL + 1))
      echo -e "${GREEN}✅ ${CATEGORY} (Belgium) completed successfully${NC}"
    else
      RETRY_COUNT=$((RETRY_COUNT + 1))
      if [[ $RETRY_COUNT -lt $MAX_RETRIES ]]; then
        echo -e "${RED}❌ Failed, will retry...${NC}"
      fi
    fi
  done

  if [[ "$SUCCESS" == "false" ]]; then
    FAILED=$((FAILED + 1))
    echo -e "${RED}❌ ${CATEGORY} (Belgium) failed after ${MAX_RETRIES} retries${NC}"
  fi

  # Rate limit between categories
  if [[ $CURRENT -lt $TOTAL_CATEGORIES ]]; then
    echo -e "${CYAN}⏳ Waiting 5s before next category...${NC}"
    sleep 5
  fi
done

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

# Summary
echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${BLUE}║                    📊 SUMMARY (BELGIUM 🇧🇪)                    ║${NC}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${GREEN}✅ Successful:${NC} ${BOLD}${SUCCESSFUL}${NC} categories"
echo -e "  ${RED}❌ Failed:${NC}     ${BOLD}${FAILED}${NC} categories"
echo -e "  ${CYAN}⏱️  Duration:${NC}   ${BOLD}${MINUTES}m ${SECONDS}s${NC}"
echo ""

# Check final stats for Belgium
echo -e "${CYAN}📊 Final database stats (Belgium):${NC}"
npx tsx scripts/check-place-ids-be.ts

echo ""
echo -e "${GREEN}${BOLD}🎉 Done! (Belgium 🇧🇪)${NC}"
echo ""
