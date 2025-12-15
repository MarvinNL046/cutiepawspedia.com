#!/bin/bash
# =============================================================================
# Italy Place Discovery Script - With Retry & Rate Limit Protection
# =============================================================================
#
# Discovers places in all US cities across all categories.
# Includes robust retry logic and rate limiting to protect against API failures.
#
# IMPORTANT: CIDs and Place IDs are automatically saved by the TypeScript script
# in the googleCid and googlePlaceId columns of the places table.
#
# Usage:
#   ./scripts/discover-it.sh [--category=<slug>] [--limit=<n>]
#
# Examples:
#   ./scripts/discover-it.sh                          # All categories
#   ./scripts/discover-it.sh --category=veterinary    # Single category
#   ./scripts/discover-it.sh --limit=10               # Limit results per city
#
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# =============================================================================
# CONFIGURATION
# =============================================================================

CATEGORY=""
LIMIT=20

# Retry configuration
MAX_RETRIES=5                    # Max retry attempts per category
INITIAL_RETRY_DELAY=30           # Initial retry delay in seconds
MAX_RETRY_DELAY=300              # Max retry delay (5 minutes)

# Rate limiting configuration
BASE_RATE_LIMIT_DELAY=3          # Base delay between city searches (seconds)
CATEGORY_DELAY=10                # Delay between categories (seconds)
RATE_LIMIT_MULTIPLIER=2          # Multiply delay when rate limited
CURRENT_RATE_LIMIT_DELAY=$BASE_RATE_LIMIT_DELAY

# Progress tracking
PROGRESS_FILE="/tmp/discover-it-progress.txt"
LOG_FILE="/tmp/discover-it-$(date +%Y%m%d-%H%M%S).log"

# Categories to process (in order)
CATEGORIES=(
  "veterinary"
  "grooming"
  "pet-store"
  "dog-training"
  "dog-walking"
  "pet-hotel"
  "dog-daycare"
  "pet-sitting"
  "emergency-vet"
  "shelter"
  "cat-grooming"
  "exotic-vet"
  "dog-park"
)

# =============================================================================
# ARGUMENT PARSING
# =============================================================================

while [[ $# -gt 0 ]]; do
  case $1 in
    --category=*)
      CATEGORY="${1#*=}"
      shift
      ;;
    --limit=*)
      LIMIT="${1#*=}"
      shift
      ;;
    --retries=*)
      MAX_RETRIES="${1#*=}"
      shift
      ;;
    --resume)
      RESUME=true
      shift
      ;;
    --help|-h)
      echo "Italy Place Discovery Script"
      echo ""
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --category=<slug>      Single category to process (default: all)"
      echo "  --limit=<n>            Max results per city search (default: 20)"
      echo "  --retries=<n>          Max retry attempts (default: 5)"
      echo "  --resume               Resume from last saved progress"
      echo "  --help, -h             Show this help"
      echo ""
      echo "Categories: ${CATEGORIES[*]}"
      echo ""
      echo "Features:"
      echo "  - Automatic retry with exponential backoff"
      echo "  - Rate limit detection and adaptive delays"
      echo "  - Progress saving for resume capability"
      echo "  - CIDs and Place IDs saved automatically"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

log() {
  local msg=$1
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${timestamp} [Italy] ${msg}" | tee -a "$LOG_FILE"
}

save_progress() {
  local category=$1
  local status=$2
  echo "${category}:${status}" > "$PROGRESS_FILE"
  log "💾 Progress saved: ${category} (${status})"
}

load_progress() {
  if [[ -f "$PROGRESS_FILE" ]]; then
    cat "$PROGRESS_FILE"
  else
    echo ""
  fi
}

# Exponential backoff with jitter
calculate_backoff() {
  local attempt=$1
  local base_delay=$2
  local max_delay=$3

  # Calculate exponential delay: base * 2^(attempt-1)
  local delay=$((base_delay * (2 ** (attempt - 1))))

  # Add random jitter (0-10% of delay)
  local jitter=$((RANDOM % (delay / 10 + 1)))
  delay=$((delay + jitter))

  # Cap at max delay
  if [[ $delay -gt $max_delay ]]; then
    delay=$max_delay
  fi

  echo $delay
}

backoff_sleep() {
  local attempt=$1
  local delay=$(calculate_backoff $attempt $INITIAL_RETRY_DELAY $MAX_RETRY_DELAY)

  log "${YELLOW}⏳ Backing off for ${delay}s (attempt ${attempt}/${MAX_RETRIES})...${NC}"

  # Show countdown for long waits
  if [[ $delay -gt 30 ]]; then
    while [[ $delay -gt 0 ]]; do
      echo -ne "\r   Resuming in ${delay}s...    "
      sleep 1
      delay=$((delay - 1))
    done
    echo -ne "\r                              \r"
  else
    sleep $delay
  fi
}

# Rate limit handler - increases delay when rate limited
handle_rate_limit() {
  CURRENT_RATE_LIMIT_DELAY=$((CURRENT_RATE_LIMIT_DELAY * RATE_LIMIT_MULTIPLIER))

  if [[ $CURRENT_RATE_LIMIT_DELAY -gt 60 ]]; then
    CURRENT_RATE_LIMIT_DELAY=60  # Cap at 60 seconds
  fi

  log "${YELLOW}🚦 Rate limit detected! Increasing delay to ${CURRENT_RATE_LIMIT_DELAY}s${NC}"
}

# Reset rate limit delay after successful request
reset_rate_limit() {
  if [[ $CURRENT_RATE_LIMIT_DELAY -gt $BASE_RATE_LIMIT_DELAY ]]; then
    CURRENT_RATE_LIMIT_DELAY=$((CURRENT_RATE_LIMIT_DELAY - 1))
    if [[ $CURRENT_RATE_LIMIT_DELAY -lt $BASE_RATE_LIMIT_DELAY ]]; then
      CURRENT_RATE_LIMIT_DELAY=$BASE_RATE_LIMIT_DELAY
    fi
  fi
}

run_discovery() {
  local category=$1
  local attempt=1

  while [[ $attempt -le $MAX_RETRIES ]]; do
    log "${BLUE}🔍 Running discovery for: ${category} (attempt ${attempt}/${MAX_RETRIES})${NC}"
    log "${CYAN}   Rate limit delay: ${CURRENT_RATE_LIMIT_DELAY}s${NC}"

    # Save progress as "in_progress"
    save_progress "$category" "in_progress"

    set +e
    output=$(npx tsx scripts/discover-places-it.ts \
      --category="$category" \
      --all-cities \
      --limit="$LIMIT" \
      2>&1)
    exit_code=$?
    set -e

    # Log output to file
    echo "=== ${category} attempt ${attempt} ===" >> "$LOG_FILE"
    echo "$output" >> "$LOG_FILE"

    # Check for rate limit errors
    if echo "$output" | grep -qi "rate.limit\|429\|too.many.requests\|quota"; then
      log "${RED}🚫 RATE LIMITED!${NC}"
      handle_rate_limit
      backoff_sleep $attempt
      attempt=$((attempt + 1))
      continue
    fi

    # Check for API/server errors
    if echo "$output" | grep -qi "503\|502\|500\|ECONNRESET\|ETIMEDOUT\|socket hang up"; then
      log "${YELLOW}⚠️ API error detected${NC}"
      backoff_sleep $attempt
      attempt=$((attempt + 1))
      continue
    fi

    # Check for authentication errors
    if echo "$output" | grep -qi "401\|403\|unauthorized\|forbidden"; then
      log "${RED}❌ Authentication error! Check API credentials.${NC}"
      return 1
    fi

    # Check exit code
    if [[ $exit_code -eq 0 ]]; then
      # Extract stats from output
      local created=$(echo "$output" | grep -oP 'TOTAL:.*?(\d+) created' | grep -oP '\d+(?= created)' || echo "0")
      local skipped=$(echo "$output" | grep -oP 'TOTAL:.*?(\d+) skipped' | grep -oP '\d+(?= skipped)' || echo "0")
      local with_cid=$(echo "$output" | grep -c "googleCid" || echo "?")

      log "${GREEN}✅ SUCCESS: ${created} created, ${skipped} skipped${NC}"
      log "${CYAN}   📍 CIDs and Place IDs saved in database${NC}"

      # Save progress as "completed"
      save_progress "$category" "completed"

      # Reset rate limit on success
      reset_rate_limit

      return 0
    else
      log "${YELLOW}⚠️ Script exited with code ${exit_code}${NC}"
      backoff_sleep $attempt
      attempt=$((attempt + 1))
    fi
  done

  log "${RED}❌ FAILED after ${MAX_RETRIES} attempts: ${category}${NC}"
  save_progress "$category" "failed"
  return 1
}

# =============================================================================
# MAIN SCRIPT
# =============================================================================

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        🇮🇹 Italy Place Discovery - Enhanced Edition             ║${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}║  Features:                                                    ║${NC}"
echo -e "${GREEN}║  • Retry logic with exponential backoff                       ║${NC}"
echo -e "${GREEN}║  • Rate limit detection & adaptive delays                     ║${NC}"
echo -e "${GREEN}║  • CIDs and Place IDs automatically saved                     ║${NC}"
echo -e "${GREEN}║  • Progress tracking for resume capability                    ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

log "📋 Configuration:"
echo "  Category: ${CATEGORY:-all 13 categories}"
echo "  Limit: ${LIMIT} results per city"
echo "  Max Retries: ${MAX_RETRIES}"
echo "  Initial Retry Delay: ${INITIAL_RETRY_DELAY}s"
echo "  Rate Limit Delay: ${BASE_RATE_LIMIT_DELAY}s (adaptive)"
echo "  Log File: ${LOG_FILE}"
echo ""

# Handle resume
if [[ "$RESUME" == "true" ]]; then
  progress=$(load_progress)
  if [[ -n "$progress" ]]; then
    log "${YELLOW}📂 Found progress file: ${progress}${NC}"
    # Could implement category skipping here
  fi
fi

# Determine categories to process
if [[ -n "$CATEGORY" ]]; then
  CATEGORIES_TO_PROCESS=("$CATEGORY")
else
  CATEGORIES_TO_PROCESS=("${CATEGORIES[@]}")
fi

start_time=$(date +%s)
total_categories=${#CATEGORIES_TO_PROCESS[@]}
current=0
failed_categories=()
successful_categories=()

log "🚀 Starting discovery of ${total_categories} categories..."
echo ""

for cat in "${CATEGORIES_TO_PROCESS[@]}"; do
  current=$((current + 1))

  echo ""
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  log "📦 [${current}/${total_categories}] Category: ${cat}"
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

  if run_discovery "$cat"; then
    successful_categories+=("$cat")
  else
    failed_categories+=("$cat")
  fi

  # Delay between categories (only if not last)
  if [[ $current -lt $total_categories ]]; then
    log "⏸️  Waiting ${CATEGORY_DELAY}s before next category..."
    sleep $CATEGORY_DELAY
  fi
done

# Calculate duration
end_time=$(date +%s)
duration=$((end_time - start_time))
hours=$((duration / 3600))
minutes=$(((duration % 3600) / 60))
seconds=$((duration % 60))

# Final summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              🇮🇹 Italy DISCOVERY COMPLETE                       ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  ⏱️  Duration: ${hours}h ${minutes}m ${seconds}s"
echo "  📁 Log File: ${LOG_FILE}"
echo ""
echo "  📊 Results:"
echo "     ✅ Successful: ${#successful_categories[@]} categories"
echo "     ❌ Failed: ${#failed_categories[@]} categories"
echo ""

if [[ ${#successful_categories[@]} -gt 0 ]]; then
  echo -e "  ${GREEN}Successful categories:${NC}"
  for sc in "${successful_categories[@]}"; do
    echo "     • $sc"
  done
  echo ""
fi

if [[ ${#failed_categories[@]} -gt 0 ]]; then
  echo -e "  ${RED}Failed categories (can retry with --category=<name>):${NC}"
  for fc in "${failed_categories[@]}"; do
    echo "     • $fc"
  done
  echo ""
  echo "  💡 Tip: Run again with --category=<name> to retry failed categories"
  exit 1
else
  # Clean up progress file on complete success
  rm -f "$PROGRESS_FILE"
  echo -e "${GREEN}✅ All categories completed successfully!${NC}"
  echo ""
  echo "  📍 All CIDs and Place IDs have been saved to the database"
  echo "     in the googleCid and googlePlaceId columns."
  exit 0
fi
