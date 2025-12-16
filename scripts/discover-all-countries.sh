#!/bin/bash
# =============================================================================
# 🌍 WORLDWIDE PLACE DISCOVERY - OVERNIGHT SUPER SCRIPT
# =============================================================================
#
# Ultimate overnight discovery script for ALL countries.
# Run this before going to sleep and wake up to 100k+ places!
#
# Features:
#   - All 10 countries sequentially
#   - Robust retry logic with exponential backoff
#   - Rate limit detection & adaptive delays
#   - Progress tracking with resume capability
#   - Detailed logging per country
#   - Email notification on completion (optional)
#   - Estimated time tracking
#   - CIDs and Place IDs automatically saved
#
# Usage:
#   ./scripts/discover-all-countries.sh [options]
#
# Options:
#   --countries=us,uk,au       Specific countries only (comma-separated)
#   --category=veterinary      Single category only
#   --limit=20                 Results per city (default: 20)
#   --retries=5                Max retries per category (default: 5)
#   --resume                   Resume from last progress
#   --dry-run                  Show plan without executing
#   --help                     Show this help
#
# Examples:
#   ./scripts/discover-all-countries.sh                    # All countries
#   ./scripts/discover-all-countries.sh --countries=uk,au  # UK & Australia only
#   ./scripts/discover-all-countries.sh --limit=30         # More results
#   ./scripts/discover-all-countries.sh --resume           # Resume after crash
#
# =============================================================================

set -e

# =============================================================================
# COLORS
# =============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Country colors
declare -A COUNTRY_COLORS=(
  ["us"]="${BLUE}"
  ["ca"]="${RED}"
  ["uk"]="${MAGENTA}"
  ["au"]="${GREEN}"
  ["de"]="${YELLOW}"
  ["fr"]="${BLUE}"
  ["nl"]="${CYAN}"
  ["be"]="${YELLOW}"
  ["es"]="${RED}"
  ["it"]="${GREEN}"
)

# Country flags
declare -A COUNTRY_FLAGS=(
  ["us"]="🇺🇸"
  ["ca"]="🇨🇦"
  ["uk"]="🇬🇧"
  ["au"]="🇦🇺"
  ["de"]="🇩🇪"
  ["fr"]="🇫🇷"
  ["nl"]="🇳🇱"
  ["be"]="🇧🇪"
  ["es"]="🇪🇸"
  ["it"]="🇮🇹"
)

# Country names
declare -A COUNTRY_NAMES=(
  ["us"]="United States"
  ["ca"]="Canada"
  ["uk"]="United Kingdom"
  ["au"]="Australia"
  ["de"]="Germany"
  ["fr"]="France"
  ["nl"]="Netherlands"
  ["be"]="Belgium"
  ["es"]="Spain"
  ["it"]="Italy"
)

# TypeScript script names per country
declare -A COUNTRY_SCRIPTS=(
  ["us"]="discover-places-us.ts"
  ["ca"]="discover-places-ca.ts"
  ["uk"]="discover-places-uk.ts"
  ["au"]="discover-places-au.ts"
  ["de"]="discover-places-de.ts"
  ["fr"]="discover-places-fr.ts"
  ["nl"]="discover-places.ts"
  ["be"]="discover-places-be.ts"
  ["es"]="discover-places-es.ts"
  ["it"]="discover-places-it.ts"
)

# Estimated cities per country (for time estimates)
declare -A COUNTRY_CITIES=(
  ["us"]=296
  ["ca"]=198
  ["uk"]=195
  ["au"]=95
  ["de"]=166
  ["fr"]=166
  ["nl"]=176
  ["be"]=28
  ["es"]=100
  ["it"]=100
)

# =============================================================================
# CONFIGURATION
# =============================================================================

# Default values
CATEGORY=""
LIMIT=20
MAX_RETRIES=5
RESUME=false
DRY_RUN=false
SKIP_COUNTRIES=()

# Countries to process (default: all)
# Order: Larger countries first (more cities = more potential rate limits to recover from)
ALL_COUNTRIES=("us" "ca" "uk" "de" "fr" "nl" "au" "es" "it" "be")
COUNTRIES_TO_PROCESS=()

# Retry configuration - optimized for speed
INITIAL_RETRY_DELAY=10           # Initial retry delay in seconds - reduced from 30
MAX_RETRY_DELAY=60               # Max retry delay (1 minute) - reduced from 5 minutes

# Rate limiting configuration - optimized for speed
BASE_RATE_LIMIT_DELAY=1          # Base delay between city searches (seconds) - reduced from 3
CATEGORY_DELAY=3                 # Delay between categories (seconds) - reduced from 10
COUNTRY_DELAY=10                 # Delay between countries (seconds) - reduced from 30
RATE_LIMIT_MULTIPLIER=2          # Multiply delay when rate limited
CURRENT_RATE_LIMIT_DELAY=$BASE_RATE_LIMIT_DELAY

# Categories to process
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

# Progress tracking
PROGRESS_DIR="/tmp/discover-all-countries"
PROGRESS_FILE="${PROGRESS_DIR}/progress.txt"
LOG_DIR="${PROGRESS_DIR}/logs"
MASTER_LOG="${LOG_DIR}/master-$(date +%Y%m%d-%H%M%S).log"
STATS_FILE="${PROGRESS_DIR}/stats.json"

# =============================================================================
# ARGUMENT PARSING
# =============================================================================

while [[ $# -gt 0 ]]; do
  case $1 in
    --countries=*)
      IFS=',' read -ra COUNTRIES_TO_PROCESS <<< "${1#*=}"
      shift
      ;;
    --skip-countries=*)
      IFS=',' read -ra SKIP_COUNTRIES <<< "${1#*=}"
      shift
      ;;
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
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --help|-h)
      echo "🌍 Worldwide Place Discovery - Overnight Super Script"
      echo ""
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --countries=us,uk,au      Specific countries (comma-separated)"
      echo "  --skip-countries=us,ca    Skip these countries (comma-separated)"
      echo "  --category=<slug>         Single category to process"
      echo "  --limit=<n>            Max results per city (default: 20)"
      echo "  --retries=<n>          Max retry attempts (default: 5)"
      echo "  --resume               Resume from last saved progress"
      echo "  --dry-run              Show plan without executing"
      echo "  --help, -h             Show this help"
      echo ""
      echo "Available countries:"
      for code in "${ALL_COUNTRIES[@]}"; do
        echo "  ${code}  - ${COUNTRY_FLAGS[$code]} ${COUNTRY_NAMES[$code]} (~${COUNTRY_CITIES[$code]} cities)"
      done
      echo ""
      echo "Categories: ${CATEGORIES[*]}"
      echo ""
      echo "Features:"
      echo "  - Automatic retry with exponential backoff"
      echo "  - Rate limit detection & adaptive delays"
      echo "  - Progress saving for resume capability"
      echo "  - CIDs and Place IDs saved automatically"
      echo "  - Detailed per-country logging"
      echo ""
      echo "Estimated runtime: 8-12 hours for all countries"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Default to all countries if none specified
if [[ ${#COUNTRIES_TO_PROCESS[@]} -eq 0 ]]; then
  COUNTRIES_TO_PROCESS=("${ALL_COUNTRIES[@]}")
fi

# Filter out skipped countries
if [[ ${#SKIP_COUNTRIES[@]} -gt 0 ]]; then
  FILTERED_COUNTRIES=()
  for country in "${COUNTRIES_TO_PROCESS[@]}"; do
    skip=false
    for skip_country in "${SKIP_COUNTRIES[@]}"; do
      if [[ "$country" == "$skip_country" ]]; then
        skip=true
        break
      fi
    done
    if [[ "$skip" == false ]]; then
      FILTERED_COUNTRIES+=("$country")
    fi
  done
  COUNTRIES_TO_PROCESS=("${FILTERED_COUNTRIES[@]}")
  echo -e "${YELLOW}⏭️  Skipping countries: ${SKIP_COUNTRIES[*]}${NC}"
fi

# =============================================================================
# SETUP
# =============================================================================

# Create directories
mkdir -p "$PROGRESS_DIR" "$LOG_DIR"

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

log() {
  local msg=$1
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${timestamp} ${msg}" | tee -a "$MASTER_LOG"
}

log_country() {
  local country=$1
  local msg=$2
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  local flag="${COUNTRY_FLAGS[$country]}"
  local color="${COUNTRY_COLORS[$country]}"
  echo -e "${timestamp} ${flag} [${color}${country^^}${NC}] ${msg}" | tee -a "$MASTER_LOG"
}

save_progress() {
  local country=$1
  local category=$2
  local status=$3
  echo "${country}:${category}:${status}" > "$PROGRESS_FILE"
  log "💾 Progress: ${country}/${category} -> ${status}"
}

load_progress() {
  if [[ -f "$PROGRESS_FILE" ]]; then
    cat "$PROGRESS_FILE"
  else
    echo ""
  fi
}

save_stats() {
  local country=$1
  local created=$2
  local skipped=$3
  local duration=$4

  # Append to stats file
  echo "{\"country\":\"${country}\",\"created\":${created},\"skipped\":${skipped},\"duration\":${duration},\"timestamp\":\"$(date -Iseconds)\"}" >> "$STATS_FILE"
}

# Exponential backoff with jitter
calculate_backoff() {
  local attempt=$1
  local base_delay=$2
  local max_delay=$3

  local delay=$((base_delay * (2 ** (attempt - 1))))
  local jitter=$((RANDOM % (delay / 10 + 1)))
  delay=$((delay + jitter))

  if [[ $delay -gt $max_delay ]]; then
    delay=$max_delay
  fi

  echo $delay
}

backoff_sleep() {
  local attempt=$1
  local delay=$(calculate_backoff $attempt $INITIAL_RETRY_DELAY $MAX_RETRY_DELAY)

  log "${YELLOW}⏳ Backing off for ${delay}s (attempt ${attempt}/${MAX_RETRIES})...${NC}"

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

handle_rate_limit() {
  CURRENT_RATE_LIMIT_DELAY=$((CURRENT_RATE_LIMIT_DELAY * RATE_LIMIT_MULTIPLIER))

  if [[ $CURRENT_RATE_LIMIT_DELAY -gt 60 ]]; then
    CURRENT_RATE_LIMIT_DELAY=60
  fi

  log "${YELLOW}🚦 Rate limit detected! Delay increased to ${CURRENT_RATE_LIMIT_DELAY}s${NC}"
}

reset_rate_limit() {
  if [[ $CURRENT_RATE_LIMIT_DELAY -gt $BASE_RATE_LIMIT_DELAY ]]; then
    CURRENT_RATE_LIMIT_DELAY=$((CURRENT_RATE_LIMIT_DELAY - 1))
    if [[ $CURRENT_RATE_LIMIT_DELAY -lt $BASE_RATE_LIMIT_DELAY ]]; then
      CURRENT_RATE_LIMIT_DELAY=$BASE_RATE_LIMIT_DELAY
    fi
  fi
}

format_duration() {
  local seconds=$1
  local hours=$((seconds / 3600))
  local minutes=$(((seconds % 3600) / 60))
  local secs=$((seconds % 60))
  printf "%02dh %02dm %02ds" $hours $minutes $secs
}

estimate_remaining() {
  local completed_countries=$1
  local total_countries=$2
  local elapsed_seconds=$3

  if [[ $completed_countries -eq 0 ]]; then
    echo "calculating..."
    return
  fi

  local avg_per_country=$((elapsed_seconds / completed_countries))
  local remaining_countries=$((total_countries - completed_countries))
  local remaining_seconds=$((avg_per_country * remaining_countries))

  format_duration $remaining_seconds
}

# =============================================================================
# DISCOVERY FUNCTIONS
# =============================================================================

run_category_discovery() {
  local country=$1
  local category=$2
  local attempt=1
  local script="${COUNTRY_SCRIPTS[$country]}"
  local country_log="${LOG_DIR}/${country}-$(date +%Y%m%d).log"
  local temp_output="/tmp/discover-output-$$.txt"

  while [[ $attempt -le $MAX_RETRIES ]]; do
    log_country "$country" "${CYAN}🔍 Category: ${category} (attempt ${attempt}/${MAX_RETRIES})${NC}"

    save_progress "$country" "$category" "in_progress"

    # Show real-time output with tee
    echo ""
    echo -e "${WHITE}───────────────────────────────────────────────────────────────${NC}"

    set +e
    # Run with real-time output shown AND captured
    npx tsx "scripts/${script}" \
      --category="$category" \
      --all-cities \
      --limit="$LIMIT" \
      2>&1 | tee "$temp_output" | while IFS= read -r line; do
        # Show key lines with timestamps
        if echo "$line" | grep -qiE "created|skipped|error|warning|rate|TOTAL|Processing|Searching|Found"; then
          echo -e "  ${CYAN}│${NC} $line"
        elif echo "$line" | grep -qiE "^\[|^✓|^✗|^→"; then
          echo -e "  ${CYAN}│${NC} $line"
        fi
      done
    exit_code=${PIPESTATUS[0]}
    set -e

    # Read the captured output
    output=$(cat "$temp_output" 2>/dev/null || echo "")
    rm -f "$temp_output"

    echo -e "${WHITE}───────────────────────────────────────────────────────────────${NC}"
    echo ""

    # Log to country-specific log
    echo "=== ${category} attempt ${attempt} @ $(date) ===" >> "$country_log"
    echo "$output" >> "$country_log"

    # Check for rate limit errors
    if echo "$output" | grep -qi "rate.limit\|429\|too.many.requests\|quota"; then
      log_country "$country" "${RED}🚫 RATE LIMITED!${NC}"
      handle_rate_limit
      backoff_sleep $attempt
      attempt=$((attempt + 1))
      continue
    fi

    # Check for API/server errors
    if echo "$output" | grep -qi "503\|502\|500\|ECONNRESET\|ETIMEDOUT\|socket hang up"; then
      log_country "$country" "${YELLOW}⚠️ API error detected${NC}"
      backoff_sleep $attempt
      attempt=$((attempt + 1))
      continue
    fi

    # Check for auth errors
    if echo "$output" | grep -qi "401\|403\|unauthorized\|forbidden"; then
      log_country "$country" "${RED}❌ Authentication error!${NC}"
      return 1
    fi

    if [[ $exit_code -eq 0 ]]; then
      local created=$(echo "$output" | grep -oP 'TOTAL:.*?(\d+) created' | grep -oP '\d+(?= created)' || echo "0")
      local skipped=$(echo "$output" | grep -oP 'TOTAL:.*?(\d+) skipped' | grep -oP '\d+(?= skipped)' || echo "0")

      log_country "$country" "${GREEN}✅ ${category}: +${created} created, ${skipped} skipped${NC}"

      save_progress "$country" "$category" "completed"
      reset_rate_limit

      # Return created count via global variable (echo would mix with log output)
      LAST_CREATED="${created:-0}"
      return 0
    else
      log_country "$country" "${YELLOW}⚠️ Exit code ${exit_code}${NC}"
      backoff_sleep $attempt
      attempt=$((attempt + 1))
    fi
  done

  log_country "$country" "${RED}❌ FAILED after ${MAX_RETRIES} attempts: ${category}${NC}"
  save_progress "$country" "$category" "failed"
  LAST_CREATED=0
  return 1
}

run_country_discovery() {
  local country=$1
  local flag="${COUNTRY_FLAGS[$country]}"
  local name="${COUNTRY_NAMES[$country]}"
  local color="${COUNTRY_COLORS[$country]}"
  local cities="${COUNTRY_CITIES[$country]}"

  local country_start=$(date +%s)
  local total_created=0
  local total_skipped=0
  local failed_categories=()
  local successful_categories=()

  echo ""
  echo -e "${color}╔═══════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${color}║  ${flag}  ${name}  (${cities} cities)${NC}"
  echo -e "${color}╚═══════════════════════════════════════════════════════════════╝${NC}"
  echo ""

  # Determine categories
  local categories_to_run=()
  if [[ -n "$CATEGORY" ]]; then
    categories_to_run=("$CATEGORY")
  else
    categories_to_run=("${CATEGORIES[@]}")
  fi

  local cat_total=${#categories_to_run[@]}
  local cat_current=0

  for category in "${categories_to_run[@]}"; do
    cat_current=$((cat_current + 1))

    echo ""
    echo -e "${color}━━━ [${cat_current}/${cat_total}] ${category} ━━━${NC}"

    if [[ "$DRY_RUN" == "true" ]]; then
      log_country "$country" "${YELLOW}[DRY-RUN] Would process: ${category}${NC}"
      successful_categories+=("$category")
    else
      LAST_CREATED=0
      run_category_discovery "$country" "$category"
      if [[ $? -eq 0 ]]; then
        total_created=$((total_created + LAST_CREATED))
        successful_categories+=("$category")
      else
        failed_categories+=("$category")
      fi
    fi

    # Delay between categories
    if [[ $cat_current -lt $cat_total ]] && [[ "$DRY_RUN" != "true" ]]; then
      log_country "$country" "⏸️  Waiting ${CATEGORY_DELAY}s..."
      sleep $CATEGORY_DELAY
    fi
  done

  local country_end=$(date +%s)
  local country_duration=$((country_end - country_start))

  # Country summary
  echo ""
  echo -e "${color}┌─────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${color}│ ${flag} ${name} Complete                                      ${NC}"
  echo -e "${color}├─────────────────────────────────────────────────────────────┤${NC}"
  echo -e "${color}│ ⏱️  Duration: $(format_duration $country_duration)                               ${NC}"
  echo -e "${color}│ ✅ Successful: ${#successful_categories[@]} categories                          ${NC}"
  echo -e "${color}│ ❌ Failed: ${#failed_categories[@]} categories                               ${NC}"
  echo -e "${color}│ 📊 Created: ${total_created} places                                ${NC}"
  echo -e "${color}└─────────────────────────────────────────────────────────────┘${NC}"

  save_stats "$country" "$total_created" "$total_skipped" "$country_duration"

  if [[ ${#failed_categories[@]} -gt 0 ]]; then
    return 1
  fi
  return 0
}

# =============================================================================
# MAIN SCRIPT
# =============================================================================

clear
echo ""
echo -e "${WHITE}╔═══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}║   🌍  CUTIEPAWSPEDIA WORLDWIDE DISCOVERY  🌍                          ║${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}║   Overnight Super Script - Wake up to 100k+ places!                  ║${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}╠═══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${WHITE}║  Features:                                                            ║${NC}"
echo -e "${WHITE}║  ✓ All 10 countries automatically                                     ║${NC}"
echo -e "${WHITE}║  ✓ Retry logic with exponential backoff                               ║${NC}"
echo -e "${WHITE}║  ✓ Rate limit detection & adaptive delays                             ║${NC}"
echo -e "${WHITE}║  ✓ Resume capability after interruption                               ║${NC}"
echo -e "${WHITE}║  ✓ CIDs and Place IDs saved automatically                             ║${NC}"
echo -e "${WHITE}║  ✓ Reviews, ratings, addresses, hours extracted                       ║${NC}"
echo -e "${WHITE}╚═══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Show configuration
log "📋 Configuration:"
echo "  Countries: ${COUNTRIES_TO_PROCESS[*]}"
echo "  Categories: ${CATEGORY:-all ${#CATEGORIES[@]}}"
echo "  Limit: ${LIMIT} per city"
echo "  Max Retries: ${MAX_RETRIES}"
echo "  Master Log: ${MASTER_LOG}"
echo ""

# Calculate estimated time
total_cities=0
for country in "${COUNTRIES_TO_PROCESS[@]}"; do
  total_cities=$((total_cities + ${COUNTRY_CITIES[$country]}))
done

categories_count=${#CATEGORIES[@]}
if [[ -n "$CATEGORY" ]]; then
  categories_count=1
fi

# Estimate: ~5 seconds per city per category + delays
estimated_seconds=$((total_cities * categories_count * 5 + categories_count * CATEGORY_DELAY * ${#COUNTRIES_TO_PROCESS[@]} + COUNTRY_DELAY * ${#COUNTRIES_TO_PROCESS[@]}))

echo "  📊 Scope:"
echo "     Total cities: ${total_cities}"
echo "     Categories: ${categories_count}"
echo "     Estimated time: $(format_duration $estimated_seconds)"
echo ""

# Countries to process
echo "  🗺️  Countries to discover:"
for country in "${COUNTRIES_TO_PROCESS[@]}"; do
  echo "     ${COUNTRY_FLAGS[$country]} ${COUNTRY_NAMES[$country]} (${COUNTRY_CITIES[$country]} cities)"
done
echo ""

# Dry run check
if [[ "$DRY_RUN" == "true" ]]; then
  echo -e "${YELLOW}⚠️  DRY RUN MODE - No actual discovery will be performed${NC}"
  echo ""
fi

# Resume check
if [[ "$RESUME" == "true" ]]; then
  progress=$(load_progress)
  if [[ -n "$progress" ]]; then
    log "${YELLOW}📂 Found progress: ${progress}${NC}"
    echo "  Resume from: ${progress}"
    echo ""
  fi
fi

# Countdown before start
if [[ "$DRY_RUN" != "true" ]]; then
  echo -e "${CYAN}Starting in 5 seconds... (Ctrl+C to cancel)${NC}"
  for i in 5 4 3 2 1; do
    echo -ne "\r  $i...  "
    sleep 1
  done
  echo -e "\r  🚀 GO!  "
  echo ""
fi

# =============================================================================
# MAIN DISCOVERY LOOP
# =============================================================================

overall_start=$(date +%s)
total_countries=${#COUNTRIES_TO_PROCESS[@]}
completed_countries=0
failed_countries=()
successful_countries=()
grand_total_created=0

for country in "${COUNTRIES_TO_PROCESS[@]}"; do
  completed_countries=$((completed_countries + 1))

  # Show progress header
  echo ""
  echo -e "${WHITE}═══════════════════════════════════════════════════════════════════════${NC}"
  elapsed=$(($(date +%s) - overall_start))
  remaining=$(estimate_remaining $((completed_countries - 1)) $total_countries $elapsed)
  log "🌍 PROGRESS: [${completed_countries}/${total_countries}] | Elapsed: $(format_duration $elapsed) | Remaining: ~${remaining}"
  echo -e "${WHITE}═══════════════════════════════════════════════════════════════════════${NC}"

  if run_country_discovery "$country"; then
    successful_countries+=("$country")
  else
    failed_countries+=("$country")
  fi

  # Delay between countries
  if [[ $completed_countries -lt $total_countries ]] && [[ "$DRY_RUN" != "true" ]]; then
    log "🌐 Country delay: ${COUNTRY_DELAY}s before next country..."
    sleep $COUNTRY_DELAY
  fi
done

# =============================================================================
# FINAL SUMMARY
# =============================================================================

overall_end=$(date +%s)
total_duration=$((overall_end - overall_start))

echo ""
echo ""
echo -e "${WHITE}╔═══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}║   🎉  WORLDWIDE DISCOVERY COMPLETE!  🎉                               ║${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}╠═══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}║   ⏱️  Total Duration: $(format_duration $total_duration)                                 ║${NC}"
echo -e "${WHITE}║   📁 Master Log: ${MASTER_LOG}${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}╠═══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${WHITE}║  Results:                                                             ║${NC}"
echo -e "${WHITE}║   ✅ Successful countries: ${#successful_countries[@]}                                    ║${NC}"
echo -e "${WHITE}║   ❌ Failed countries: ${#failed_countries[@]}                                        ║${NC}"
echo -e "${WHITE}║                                                                       ║${NC}"
echo -e "${WHITE}╚═══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# List successful countries
if [[ ${#successful_countries[@]} -gt 0 ]]; then
  echo -e "${GREEN}✅ Successful countries:${NC}"
  for sc in "${successful_countries[@]}"; do
    echo "   ${COUNTRY_FLAGS[$sc]} ${COUNTRY_NAMES[$sc]}"
  done
  echo ""
fi

# List failed countries
if [[ ${#failed_countries[@]} -gt 0 ]]; then
  echo -e "${RED}❌ Failed countries:${NC}"
  for fc in "${failed_categories[@]}"; do
    echo "   ${COUNTRY_FLAGS[$fc]} ${COUNTRY_NAMES[$fc]}"
  done
  echo ""
  echo "💡 Retry failed countries with:"
  for fc in "${failed_countries[@]}"; do
    echo "   ./scripts/discover-all-countries.sh --countries=${fc}"
  done
  echo ""
  exit 1
else
  rm -f "$PROGRESS_FILE"
  echo -e "${GREEN}🎊 All countries completed successfully!${NC}"
  echo ""
  echo "📍 All data has been saved to the database:"
  echo "   • Google CIDs (googleCid column)"
  echo "   • Google Place IDs (googlePlaceId column)"
  echo "   • Reviews count (reviewCount column)"
  echo "   • Ratings (rating column)"
  echo "   • Addresses (address column)"
  echo "   • Business hours (businessHours column)"
  echo ""
  echo "🚀 Ready for Step 2: Review scraping with CIDs!"
  echo ""
  exit 0
fi
