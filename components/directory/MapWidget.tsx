"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Maximize2, Minimize2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mapbox types
declare global {
  interface Window {
    mapboxgl: typeof import("mapbox-gl");
  }
}

export interface MapMarker {
  id: number | string;
  lat: number;
  lng: number;
  name: string;
  slug?: string;
  category?: string;
  isPremium?: boolean;
  onClick?: () => void;
}

interface MapWidgetProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  height?: string;
  interactive?: boolean;
  showControls?: boolean;
  onMarkerClick?: (marker: MapMarker) => void;
  selectedMarkerId?: number | string;
  singleMarker?: boolean;
}

// Check if Mapbox is configured
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const isMapboxConfigured = Boolean(MAPBOX_TOKEN);

export function MapWidget({
  markers,
  center,
  zoom = 12,
  className = "",
  height = "300px",
  interactive = true,
  showControls = true,
  onMarkerClick,
  selectedMarkerId,
  singleMarker = false,
}: MapWidgetProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Calculate center from markers if not provided
  const mapCenter = center || calculateCenter(markers);

  useEffect(() => {
    if (!isMapboxConfigured) {
      setMapError("Map not configured");
      return;
    }

    if (!mapContainer.current || map.current) return;

    // Dynamically import mapbox-gl
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = MAPBOX_TOKEN!;

      try {
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [mapCenter.lng, mapCenter.lat],
          zoom,
          interactive,
        });

        // Add navigation controls
        if (showControls && interactive) {
          map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");
        }

        map.current.on("load", () => {
          setMapLoaded(true);
          addMarkers(mapboxgl.default);
        });

        map.current.on("error", (e) => {
          console.error("Map error:", e);
          setMapError("Failed to load map");
        });
      } catch (error) {
        console.error("Failed to initialize map:", error);
        setMapError("Failed to initialize map");
      }
    }).catch((error) => {
      console.error("Failed to load mapbox-gl:", error);
      setMapError("Failed to load map library");
    });

    return () => {
      // Cleanup markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Cleanup map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when they change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    import("mapbox-gl").then((mapboxgl) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      addMarkers(mapboxgl.default);
    });
  }, [markers, mapLoaded, selectedMarkerId]);

  const addMarkers = (mapboxgl: typeof import("mapbox-gl").default) => {
    if (!map.current) return;

    markers.forEach((markerData) => {
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "mapbox-marker";
      el.innerHTML = createMarkerHTML(markerData, selectedMarkerId === markerData.id);

      // Create marker
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: "mapbox-popup",
      }).setHTML(`
        <div class="p-2">
          <p class="font-semibold text-sm text-gray-900">${markerData.name}</p>
          ${markerData.category ? `<p class="text-xs text-gray-500">${markerData.category}</p>` : ""}
        </div>
      `);

      marker.setPopup(popup);

      // Handle click
      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(markerData);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markers.length > 1 && !singleMarker) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((m) => bounds.extend([m.lng, m.lat]));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const centerOnUser = () => {
    if (navigator.geolocation && map.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.current?.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 14,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  // Fallback UI when map is not configured
  if (!isMapboxConfigured || mapError) {
    return (
      <div
        className={`bg-slate-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">
            {mapError || "Map not available"}
          </p>
          {markers.length > 0 && (
            <p className="text-xs text-slate-400 mt-1">
              {markers.length} location{markers.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${isFullscreen ? "fixed inset-4 z-50" : ""} ${className}`}
      style={{ height: isFullscreen ? "auto" : height }}
    >
      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
            onClick={centerOnUser}
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cpPink mx-auto mb-2" />
            <p className="text-sm text-slate-500">Loading map...</p>
          </div>
        </div>
      )}

      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/50 -z-10"
          onClick={toggleFullscreen}
        />
      )}

      {/* Mapbox CSS */}
      <style jsx global>{`
        .mapbox-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .mapbox-marker:hover {
          transform: scale(1.1);
        }
        .mapbox-popup .mapboxgl-popup-content {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          padding: 0;
        }
        .mapboxgl-ctrl-top-right {
          top: 8px;
          right: 8px;
        }
      `}</style>
    </div>
  );
}

// Helper function to calculate center from markers
function calculateCenter(markers: MapMarker[]): { lat: number; lng: number } {
  if (markers.length === 0) {
    return { lat: 52.3676, lng: 4.9041 }; // Default: Amsterdam
  }

  const sum = markers.reduce(
    (acc, m) => ({ lat: acc.lat + m.lat, lng: acc.lng + m.lng }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / markers.length,
    lng: sum.lng / markers.length,
  };
}

// Helper function to create marker HTML
function createMarkerHTML(marker: MapMarker, isSelected: boolean): string {
  const color = marker.isPremium ? "#FFD166" : isSelected ? "#FF7FA1" : "#29A0B1";

  return `
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="${color}"/>
      <circle cx="16" cy="14" r="6" fill="white"/>
    </svg>
  `;
}
