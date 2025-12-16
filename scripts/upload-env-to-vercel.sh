#!/bin/bash

# Upload all environment variables from .env to Vercel

cd /home/marvin/Documenten/cutiepawspedia

# Read .env and upload each variable
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip empty lines and comments
  [[ -z "$line" || "$line" =~ ^# ]] && continue

  # Extract key and value
  if [[ "$line" =~ ^([A-Z_][A-Z0-9_]*)=(.*)$ ]]; then
    key="${BASH_REMATCH[1]}"
    value="${BASH_REMATCH[2]}"

    # Remove surrounding quotes if present
    value="${value#\"}"
    value="${value%\"}"
    value="${value#\'}"
    value="${value%\'}"

    echo "Adding $key to Vercel..."
    printf '%s' "$value" | vercel env add "$key" production 2>&1 | grep -E "Added|Error|already"
  fi
done < .env

echo "Done!"
