"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, X, Search, Star, List, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Types
export interface MapMarkerData {
  id: number;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  address: string | null;
  isPremium: boolean;
  avgRating: string | null;
  reviewCount: number;
  categorySlug: string | null;
  categoryIcon: string | null;
  citySlug: string;
  cityName: string;
}

interface MapViewProps {
  markers: MapMarkerData[];
  center?: { lat: number; lng: number };
  zoom?: number;
  locale: string;
  countrySlug: string;
  categorySlug?: string;
  categories?: Array<{ slug: string; icon: string | null; labelKey: string; count: number }>;
  selectedCategorySlug?: string;
  onCategoryChange?: (categorySlug: string | null) => void;
  translations: {
    allCategories: string;
    searchPlaceholder: string;
    findNearMe: string;
    noResults: string;
    places: string;
    reviews: string;
    viewDetails: string;
    listView: string;
    mapView: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    premium: string;
  };
  className?: string;
}

// Mapbox types
declare global {
  interface Window {
    mapboxgl: typeof import("mapbox-gl");
  }
}

// Category icons mapping
const categoryEmojis: Record<string, string> = {
  "veterinary": "🏥",
  "veterinarians": "🏥",
  "grooming": "✂️",
  "pet-hotels": "🏨",
  "pet-shops": "🛒",
  "pet-stores": "🛒",
  "dog-walking": "🐕",
  "training": "🎓",
  "dog-training": "🎓",
  "breeder": "🐾",
  "breeders": "🐾",
  "shelter": "🏠",
  "shelters": "🏠",
  "pet-sitting": "🏡",
  "emergency-vet": "🚨",
  "pet-insurance": "📋",
  "pet-food": "🍖",
  "pet-friendly": "💚",
};

function getCategoryEmoji(categorySlug: string | null): string {
  if (!categorySlug) return "📍";
  return categoryEmojis[categorySlug] ?? "📍";
}

// Check if Mapbox is configured
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const isMapboxConfigured = Boolean(MAPBOX_TOKEN);

export function MapView({
  markers,
  center,
  zoom = 8,
  locale,
  countrySlug,
  categorySlug,
  categories = [],
  selectedCategorySlug,
  onCategoryChange,
  translations,
  className = "",
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState<MapMarkerData[]>(markers);
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [view, setView] = useState<"map" | "list">("map");

  // Calculate center from markers if not provided
  const mapCenter = center || calculateCenter(markers);

  // Filter markers based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMarkers(markers);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = markers.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.cityName.toLowerCase().includes(query) ||
        (m.address && m.address.toLowerCase().includes(query))
    );
    setFilteredMarkers(filtered);
  }, [searchQuery, markers]);

  // Load Mapbox CSS dynamically
  useEffect(() => {
    const linkId = "mapbox-gl-css";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.16.0/mapbox-gl.css";
      document.head.appendChild(link);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isMapboxConfigured) {
      setMapError("Map not configured");
      return;
    }

    if (!mapContainer.current || map.current) return;

    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = MAPBOX_TOKEN!;

      try {
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [mapCenter.lng, mapCenter.lat],
          zoom,
        });

        map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");

        map.current.on("load", () => {
          setMapLoaded(true);
          addMarkersWithClustering(mapboxgl.default);
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
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when filtered markers change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    import("mapbox-gl").then((mapboxgl) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add source and layer for clustering if not exists
      if (map.current?.getSource("places")) {
        // Update existing source
        (map.current.getSource("places") as mapboxgl.GeoJSONSource).setData(
          createGeoJSON(filteredMarkers)
        );
      } else {
        addMarkersWithClustering(mapboxgl.default);
      }
    });
  }, [filteredMarkers, mapLoaded]);

  const addMarkersWithClustering = (mapboxgl: typeof import("mapbox-gl").default) => {
    if (!map.current) return;

    // Create GeoJSON data
    const geojson = createGeoJSON(filteredMarkers);

    // Remove existing source and layers if they exist
    if (map.current.getSource("places")) {
      if (map.current.getLayer("clusters")) map.current.removeLayer("clusters");
      if (map.current.getLayer("cluster-count")) map.current.removeLayer("cluster-count");
      if (map.current.getLayer("unclustered-point")) map.current.removeLayer("unclustered-point");
      map.current.removeSource("places");
    }

    // Add source with clustering
    map.current.addSource("places", {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    // Add cluster circles
    map.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "places",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#29A0B1", // cpTeal
          10,
          "#FF8C73", // cpCoral
          30,
          "#FFD166", // cpYellow
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 30, 40],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // Add cluster count labels
    map.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "places",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 14,
      },
      paint: {
        "text-color": "#ffffff",
      },
    });

    // Add individual markers using DOM elements for better styling
    filteredMarkers.forEach((markerData) => {
      const el = document.createElement("div");
      el.className = "map-marker";
      el.innerHTML = createMarkerHTML(markerData);
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(map.current!);

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        className: "map-popup",
        maxWidth: "300px",
      }).setHTML(createPopupHTML(markerData, locale, countrySlug, translations));

      marker.setPopup(popup);

      el.addEventListener("click", () => {
        setSelectedMarker(markerData);
        // Close other popups
        markersRef.current.forEach((m) => {
          if (m !== marker && m.getPopup()?.isOpen()) {
            m.getPopup()?.remove();
          }
        });
      });

      markersRef.current.push(marker);
    });

    // Click on cluster to zoom
    map.current.on("click", "clusters", (e) => {
      const features = map.current!.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0]?.properties?.cluster_id;
      const source = map.current!.getSource("places") as mapboxgl.GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        map.current!.easeTo({
          center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
          zoom: zoom ?? 14,
        });
      });
    });

    // Change cursor on cluster hover
    map.current.on("mouseenter", "clusters", () => {
      if (map.current) map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "clusters", () => {
      if (map.current) map.current.getCanvas().style.cursor = "";
    });

    // Fit bounds to show all markers
    if (filteredMarkers.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredMarkers.forEach((m) => bounds.extend([m.lng, m.lat]));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  };

  const handleFindNearMe = useCallback(() => {
    if (navigator.geolocation && map.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.current?.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 12,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    map.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    map.current?.zoomOut();
  }, []);

  const handleResetView = useCallback(() => {
    if (map.current && filteredMarkers.length > 0) {
      import("mapbox-gl").then((mapboxgl) => {
        const bounds = new mapboxgl.default.LngLatBounds();
        filteredMarkers.forEach((m) => bounds.extend([m.lng, m.lat]));
        map.current!.fitBounds(bounds, { padding: 50, maxZoom: 14 });
      });
    }
  }, [filteredMarkers]);

  const handleMarkerClick = useCallback((marker: MapMarkerData) => {
    setSelectedMarker(marker);
    if (map.current) {
      map.current.flyTo({
        center: [marker.lng, marker.lat],
        zoom: 14,
      });
      // Open the popup for this marker
      const markerObj = markersRef.current.find((m) => {
        const lngLat = m.getLngLat();
        return lngLat.lng === marker.lng && lngLat.lat === marker.lat;
      });
      if (markerObj) {
        markerObj.togglePopup();
      }
    }
  }, []);

  // Fallback UI when map is not configured
  if (!isMapboxConfigured || mapError) {
    return (
      <div className={cn("bg-slate-100 rounded-lg flex items-center justify-center min-h-[600px]", className)}>
        <div className="text-center p-4">
          <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
          <p className="text-lg text-slate-500">{mapError || "Map not available"}</p>
          {markers.length > 0 && (
            <p className="text-sm text-slate-400 mt-1">
              {markers.length} {translations.places}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex h-[calc(100vh-200px)] min-h-[600px]", className)}>
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white border-r flex flex-col overflow-hidden z-10">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="p-4 border-b">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={!selectedCategorySlug ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onCategoryChange?.(null)}
                >
                  {translations.allCategories}
                </Badge>
                {categories.slice(0, 8).map((cat) => (
                  <Badge
                    key={cat.slug}
                    variant={selectedCategorySlug === cat.slug ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => onCategoryChange?.(cat.slug)}
                  >
                    {getCategoryEmoji(cat.slug)} {cat.labelKey}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Places List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMarkers.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                {translations.noResults}
              </div>
            ) : (
              <div className="divide-y">
                {filteredMarkers.map((marker) => (
                  <button
                    key={marker.id}
                    onClick={() => handleMarkerClick(marker)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-slate-50 transition-colors",
                      selectedMarker?.id === marker.id && "bg-cpTeal/5 border-l-4 border-cpTeal"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{getCategoryEmoji(marker.categorySlug)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-slate-900 truncate">{marker.name}</h4>
                          {marker.isPremium && (
                            <Badge variant="secondary" className="bg-cpYellow/20 text-cpYellow-dark text-xs">
                              {translations.premium}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{marker.cityName}</p>
                        {marker.address && (
                          <p className="text-xs text-slate-400 truncate mt-1">{marker.address}</p>
                        )}
                        {marker.avgRating && Number(marker.avgRating) > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-3 w-3 fill-cpYellow text-cpYellow" />
                            <span className="text-sm font-medium">{marker.avgRating}</span>
                            <span className="text-xs text-slate-400">
                              ({marker.reviewCount} {translations.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-slate-50">
            <p className="text-sm text-slate-500 text-center">
              {filteredMarkers.length} {translations.places}
            </p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
            onClick={handleFindNearMe}
            aria-label={translations.findNearMe}
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-md"
            onClick={handleResetView}
            aria-label={translations.resetView}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cpCoral mx-auto mb-2" />
              <p className="text-sm text-slate-500">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Mapbox CSS */}
      <style jsx global>{`
        .map-marker {
          transition: transform 0.2s ease;
        }
        .map-marker:hover {
          transform: scale(1.1);
          z-index: 100;
        }
        .map-popup .mapboxgl-popup-content {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        }
        .map-popup .mapboxgl-popup-close-button {
          font-size: 18px;
          padding: 8px;
          color: #64748b;
        }
        .map-popup .mapboxgl-popup-close-button:hover {
          color: #0f172a;
          background: transparent;
        }
        .mapboxgl-ctrl-top-right {
          top: 60px !important;
          right: 10px;
        }
      `}</style>
    </div>
  );
}

// Helper functions
function calculateCenter(markers: MapMarkerData[]): { lat: number; lng: number } {
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

function createGeoJSON(markers: MapMarkerData[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: markers.map((marker) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [marker.lng, marker.lat],
      },
      properties: {
        id: marker.id,
        name: marker.name,
        slug: marker.slug,
        categorySlug: marker.categorySlug,
        isPremium: marker.isPremium,
        avgRating: marker.avgRating,
        reviewCount: marker.reviewCount,
      },
    })),
  };
}

function createMarkerHTML(marker: MapMarkerData): string {
  const color = marker.isPremium ? "#FFD166" : "#29A0B1";
  const emoji = getCategoryEmoji(marker.categorySlug);

  return `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <div style="
        background: ${color};
        border-radius: 50% 50% 50% 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        border: 2px solid white;
      ">
        <span style="transform: rotate(45deg); font-size: 16px;">${emoji}</span>
      </div>
    </div>
  `;
}

function createPopupHTML(
  marker: MapMarkerData,
  locale: string,
  countrySlug: string,
  translations: MapViewProps["translations"]
): string {
  const categoryEmoji = getCategoryEmoji(marker.categorySlug);
  const ratingHTML = marker.avgRating && Number(marker.avgRating) > 0
    ? `<div style="display: flex; align-items: center; gap: 4px; margin-top: 8px;">
        <span style="color: #FFD166;">&#9733;</span>
        <span style="font-weight: 600;">${marker.avgRating}</span>
        <span style="color: #64748b; font-size: 12px;">(${marker.reviewCount})</span>
      </div>`
    : "";

  const premiumBadge = marker.isPremium
    ? `<span style="background: #FEF3C7; color: #92400E; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">${translations.premium}</span>`
    : "";

  const placeUrl = `/${locale}/${countrySlug}/${marker.citySlug}/${marker.categorySlug || "place"}/${marker.slug}`;

  return `
    <div style="min-width: 200px;">
      <div style="padding: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 24px;">${categoryEmoji}</span>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center;">
              <h3 style="font-weight: 600; color: #0f172a; margin: 0; font-size: 14px;">${marker.name}</h3>
              ${premiumBadge}
            </div>
            <p style="color: #64748b; font-size: 12px; margin: 0;">${marker.cityName}</p>
          </div>
        </div>
        ${marker.address ? `<p style="color: #94a3b8; font-size: 12px; margin: 4px 0;">${marker.address}</p>` : ""}
        ${ratingHTML}
      </div>
      <a href="${placeUrl}"
         style="display: block; padding: 10px 12px; background: #f8fafc; text-align: center; color: #29A0B1; font-weight: 500; font-size: 13px; text-decoration: none; border-top: 1px solid #e2e8f0;">
        ${translations.viewDetails} &rarr;
      </a>
    </div>
  `;
}

export default MapView;
