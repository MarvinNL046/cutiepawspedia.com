"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Eye, CheckCircle, Crown, Star, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface Place {
  id: number;
  name: string;
  slug: string;
  cityId: number | null;
  cityName: string | null;
  countryName: string | null;
  isVerified: boolean;
  isPremium: boolean;
  premiumUntil: Date | null;
  avgRating: string | null;
  reviewCount: number;
  ownerId: number | null;
  ownerEmail: string | null;
  createdAt: Date;
}

interface Country {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  countryId: number;
}

interface PlacesTableProps {
  initialPlaces: Place[];
  initialTotal: number;
  countries: Country[];
  cities: City[];
}

export function PlacesTable({
  initialPlaces,
  initialTotal,
  countries,
  cities,
}: PlacesTableProps) {
  const router = useRouter();
  const [places, setPlaces] = useState(initialPlaces);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    countryId: "",
    cityId: "",
    isVerified: "",
    isPremium: "",
  });
  const [page, setPage] = useState(0);
  const pageSize = 20;

  // Filter cities based on selected country
  const filteredCities = filters.countryId
    ? cities.filter((c) => c.countryId === parseInt(filters.countryId, 10))
    : cities;

  // Fetch places with filters
  const fetchPlaces = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("limit", pageSize.toString());
      params.set("offset", (page * pageSize).toString());

      if (filters.countryId) params.set("countryId", filters.countryId);
      if (filters.cityId) params.set("cityId", filters.cityId);
      if (filters.isVerified) params.set("isVerified", filters.isVerified);
      if (filters.isPremium) params.set("isPremium", filters.isPremium);

      const res = await fetch(`/api/admin/places?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch places");

      const data = await res.json();
      setPlaces(data.places);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const handleToggleVerified = async (placeId: number, newValue: boolean) => {
    try {
      const res = await fetch(`/api/admin/places/${placeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleVerified", isVerified: newValue }),
      });

      if (!res.ok) throw new Error("Failed to update place");

      setPlaces((prev) =>
        prev.map((p) => (p.id === placeId ? { ...p, isVerified: newValue } : p))
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating place:", error);
      alert("Failed to update verification status");
    }
  };

  const handleTogglePremium = async (placeId: number, newValue: boolean) => {
    try {
      const res = await fetch(`/api/admin/places/${placeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "togglePremium",
          isPremium: newValue,
          premiumUntil: newValue
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to update place");

      setPlaces((prev) =>
        prev.map((p) => (p.id === placeId ? { ...p, isPremium: newValue } : p))
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating place:", error);
      alert("Failed to update premium status");
    }
  };

  const resetFilters = () => {
    setFilters({ countryId: "", cityId: "", isVerified: "", isPremium: "" });
    setPage(0);
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select
          value={filters.countryId}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, countryId: value, cityId: "" }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id.toString()}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.cityId}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, cityId: value }));
            setPage(0);
          }}
          disabled={!filters.countryId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Cities</SelectItem>
            {filteredCities.map((city) => (
              <SelectItem key={city.id} value={city.id.toString()}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.isVerified}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, isVerified: value }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Not Verified</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.isPremium}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, isPremium: value }));
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Premium" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="true">Premium</SelectItem>
            <SelectItem value="false">Free</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>

        <p className="text-sm text-muted-foreground ml-auto">
          {total} places total
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : places.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No places found matching your filters.
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {places.map((place) => (
                <TableRow key={place.id}>
                  <TableCell>
                    <div className="font-medium">{place.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {place.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{place.cityName || "-"}</div>
                    <div className="text-xs text-muted-foreground">
                      {place.countryName || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {place.avgRating ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{parseFloat(place.avgRating).toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">
                          ({place.reviewCount})
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No reviews</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={place.isVerified}
                        onCheckedChange={(checked) =>
                          handleToggleVerified(place.id, checked)
                        }
                      />
                      {place.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={place.isPremium}
                        onCheckedChange={(checked) =>
                          handleTogglePremium(place.id, checked)
                        }
                      />
                      {place.isPremium && (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPlace(place);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {place.name}</span>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`/${place.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">
                            Open {place.name} in new tab
                          </span>
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPlace?.name}</DialogTitle>
            <DialogDescription>Place details and moderation</DialogDescription>
          </DialogHeader>
          {selectedPlace && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Slug
                  </h4>
                  <p className="font-mono text-sm">{selectedPlace.slug}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h4>
                  <p>
                    {selectedPlace.cityName || "No city"},{" "}
                    {selectedPlace.countryName || "No country"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Rating
                  </h4>
                  <p>
                    {selectedPlace.avgRating
                      ? `${parseFloat(selectedPlace.avgRating).toFixed(1)} (${selectedPlace.reviewCount} reviews)`
                      : "No reviews yet"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Owner
                  </h4>
                  <p>{selectedPlace.ownerEmail || "No owner"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Created
                  </h4>
                  <p>
                    {new Date(selectedPlace.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex gap-2">
                    {selectedPlace.isVerified && (
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {selectedPlace.isPremium && (
                      <Badge variant="default">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {!selectedPlace.isVerified && !selectedPlace.isPremium && (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="detail-verified"
                      checked={selectedPlace.isVerified}
                      onCheckedChange={(checked) => {
                        handleToggleVerified(selectedPlace.id, checked);
                        setSelectedPlace((prev) =>
                          prev ? { ...prev, isVerified: checked } : null
                        );
                      }}
                    />
                    <label
                      htmlFor="detail-verified"
                      className="text-sm font-medium"
                    >
                      Verified
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="detail-premium"
                      checked={selectedPlace.isPremium}
                      onCheckedChange={(checked) => {
                        handleTogglePremium(selectedPlace.id, checked);
                        setSelectedPlace((prev) =>
                          prev ? { ...prev, isPremium: checked } : null
                        );
                      }}
                    />
                    <label
                      htmlFor="detail-premium"
                      className="text-sm font-medium"
                    >
                      Premium
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
