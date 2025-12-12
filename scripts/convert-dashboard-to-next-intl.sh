#!/bin/bash

# This script converts dashboard files to use next-intl

echo "Converting dashboard files to use next-intl..."

# Replace the main dashboard page
mv app/[locale]/dashboard/page-updated.tsx app/[locale]/dashboard/page.tsx
echo "✓ Updated app/[locale]/dashboard/page.tsx"

echo ""
echo "✓ Dashboard translations have been added to all language files (en, nl, de, fr)"
echo "✓ Main dashboard page has been converted to use next-intl"
echo ""
echo "Remaining files to convert manually (due to complexity):"
echo "  - app/[locale]/dashboard/business/[businessId]/page.tsx"
echo "  - app/[locale]/dashboard/business/[businessId]/advertising/page.tsx"
echo "  - app/[locale]/dashboard/business/[businessId]/advertising/new/page.tsx"
echo "  - app/[locale]/dashboard/business/[businessId]/advertising/new/CampaignForm.tsx"
echo "  - app/[locale]/dashboard/business/[businessId]/credits/page.tsx"
echo "  - app/[locale]/dashboard/business/[businessId]/plan/page.tsx"
echo "  - components/dashboard/NotificationSettings.tsx"
echo ""
echo "These files have complex inline translation objects that should be converted"
echo "to use the 'dashboard' namespace from the translation files."

