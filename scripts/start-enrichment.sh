#!/bin/bash
# Start continuous enrichment script in background
# Usage: ./scripts/start-enrichment.sh

cd /home/marvin/Documenten/cutiepawspedia

echo "🚀 Starting continuous enrichment script..."
echo "📝 Logs will be written to: enrichment-continuous.log"
echo ""

# Start the script with nohup so it continues after terminal closes
nohup npx tsx scripts/enrichment-continuous.ts >> enrichment-continuous.log 2>&1 &

# Get the PID
PID=$!
echo "✅ Script started with PID: $PID"
echo ""
echo "📋 Useful commands:"
echo "   Monitor progress:  tail -f enrichment-continuous.log"
echo "   Check if running:  ps aux | grep enrichment-continuous"
echo "   Stop script:       kill $PID"
echo ""
echo "💡 The script will continue running even if you close this terminal."
