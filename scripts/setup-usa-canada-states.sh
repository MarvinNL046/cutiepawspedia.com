#!/bin/bash
# =============================================================================
# Setup US States and Canadian Provinces
# =============================================================================
#
# This script adds all 50 US states and 10 Canadian provinces to the database,
# then links existing cities to their correct states/provinces.
#
# Usage:
#   ./scripts/setup-usa-canada-states.sh
#
# =============================================================================

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     🇺🇸 USA States & 🇨🇦 Canadian Provinces Setup             ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Adding US states and Canadian provinces to database...${NC}"
echo ""

npx tsx scripts/add-usa-canada-states.ts

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "New URLs are now available:"
echo "  /en/usa/p/california/los-angeles/veterinary"
echo "  /en/usa/p/new-york/new-york/veterinary"
echo "  /en/canada/p/ontario/toronto/veterinary"
echo "  /en/canada/p/british-columbia/vancouver/veterinary"
echo ""
