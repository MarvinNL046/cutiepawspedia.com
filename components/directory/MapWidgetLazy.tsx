"use client";

/**
 * Lazy-loaded MapWidget wrapper
 *
 * PERFORMANCE: Dynamic import for code splitting
 * - MapWidget + mapbox-gl is ~200KB gzipped
 * - Only loads when component enters viewport or is explicitly rendered
 * - Shows loading skeleton while loading
 * - Reduces initial bundle size significantly
 */

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { MapMarker } from "./MapWidget";

// Loading skeleton component
function MapSkeleton({ height = "300px" }: { height?: string }) {
  return (
    <div
      className="bg-slate-100 rounded-lg flex items-center justify-center animate-pulse"
      style={{ height }}
    >
      <div className="text-center">
        <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-400">Loading map...</p>
      </div>
    </div>
  );
}

// Dynamic import with loading state
const MapWidget = dynamic(
  () => import("./MapWidget").then((mod) => mod.MapWidget),
  {
    loading: () => <MapSkeleton />,
    ssr: false, // Mapbox doesn't support SSR
  }
);

// Re-export with lazy loading
export { MapWidget as MapWidgetLazy, type MapMarker };

// Default export for convenience
export default MapWidget;
