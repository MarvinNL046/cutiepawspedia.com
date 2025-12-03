# Data Pipeline Directory

This directory contains all data for the CutiePawsPedia ingestion pipeline.

## Structure

```
data/
├── raw/                    # Raw data from external sources
│   ├── osm/               # OpenStreetMap exports
│   │   └── {country}/     # e.g., nl/, be/
│   │       └── {city}.json
│   ├── pdok/              # PDOK BAG addresses (NL only)
│   │   └── nl/
│   │       └── {city}.json
│   ├── bright/            # Bright Data scrapes
│   │   └── {country}/
│   │       └── {city}.json
│   └── jina/              # Jina AI summaries
│       └── {country}/
│           └── {city}.json
├── staged/                 # Merged & normalized data
│   └── {country}/
│       └── {city}.json
└── processed/              # Import tracking
    └── {country}/
        └── {city}.json
```

## File Format

All files are JSON with consistent structure. See `lib/data/types.ts` for TypeScript definitions.

## Gitignore

Raw and staged data files are git-ignored (they can be regenerated).
Only this README and the directory structure are committed.

## Usage

```typescript
import { getOsmPath, getStagedPath, readJson, writeJson } from "@/lib/data";

// Get paths
const osmPath = getOsmPath("nl", "amsterdam");
// => "data/raw/osm/nl/amsterdam.json"

// Read data
const data = await readJson<OsmRawData>(osmPath);

// Write data
await writeJson(osmPath, data);
```
