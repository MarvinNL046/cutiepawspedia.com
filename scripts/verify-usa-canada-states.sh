#!/bin/bash
# =============================================================================
# Verify US States and Canadian Provinces Setup
# =============================================================================
#
# This script verifies that US states and Canadian provinces are correctly
# set up in the database and shows sample URLs that should now work.
#
# Usage:
#   ./scripts/verify-usa-canada-states.sh
#
# =============================================================================

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     🔍 Verify USA & Canada States/Provinces                   ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Checking database...${NC}"
echo ""

npx tsx scripts/verify-usa-canada-states.ts

echo ""
echo -e "${GREEN}✅ Verification complete!${NC}"
echo ""
