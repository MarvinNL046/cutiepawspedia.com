"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal, Eye, MapPin, Star, Crown, CheckCircle, CrownIcon } from "lucide-react";
import Link from "next/link";
import { togglePlacePremiumAction, togglePlaceVerifiedAction } from "@/app/[locale]/admin/businesses/actions";
import { useRouter } from "next/navigation";

interface Listing {
  id: number;
  slug: string;
  name: string;
  cityName: string | null;
  categoryName: string | null;
  isPremium: boolean;
  isVerified: boolean;
  avgRating: number | null;
  reviewCount: number;
  leadCount: number;
  createdAt: Date;
}

interface BusinessListingsTabProps {
  businessId: number;
  initialListings: Listing[];
  initialTotal: number;
}

export function BusinessListingsTab({
  businessId,
  initialListings,
  initialTotal,
}: BusinessListingsTabProps) {
  const router = useRouter();
  const [listings, setListings] = useState(initialListings);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [togglingPremium, setTogglingPremium] = useState<number | null>(null);
  const [togglingVerified, setTogglingVerified] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const handleToggleVerified = async (listingId: number, currentVerified: boolean) => {
    setTogglingVerified(listingId);
    try {
      const result = await togglePlaceVerifiedAction(listingId, !currentVerified);
      if (result.success) {
        setListings((prev) =>
          prev.map((l) =>
            l.id === listingId ? { ...l, isVerified: !currentVerified } : l
          )
        );
        router.refresh();
      } else {
        alert(result.error || "Failed to toggle verified status");
      }
    } catch (error) {
      console.error("Error toggling verified:", error);
      alert("Failed to toggle verified status");
    } finally {
      setTogglingVerified(null);
    }
  };

  const handleTogglePremium = async (listingId: number, currentPremium: boolean) => {
    setTogglingPremium(listingId);
    try {
      const result = await togglePlacePremiumAction(listingId, !currentPremium);
      if (result.success) {
        // Update local state
        setListings((prev) =>
          prev.map((l) =>
            l.id === listingId ? { ...l, isPremium: !currentPremium } : l
          )
        );
        router.refresh();
      } else {
        alert(result.error || "Failed to toggle premium status");
      }
    } catch (error) {
      console.error("Error toggling premium:", error);
      alert("Failed to toggle premium status");
    } finally {
      setTogglingPremium(null);
    }
  };

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });

      const res = await fetch(`/api/admin/businesses/${businessId}/listings?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();
      setListings(data.listings);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page > 0) {
      fetchListings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Listings</CardTitle>
        <CardDescription>
          {total} listing{total !== 1 ? "s" : ""} associated with this business
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No listings found for this business.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <div className="font-medium">{listing.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {listing.cityName || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {listing.categoryName || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {listing.isPremium && (
                          <Badge
                            variant="secondary"
                            className="bg-cpYellow/20 text-cpYellow border-0"
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        {listing.isVerified ? (
                          <Badge
                            variant="secondary"
                            className="bg-cpAqua/20 text-cpAqua border-0"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {listing.avgRating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-cpYellow fill-cpYellow" />
                          <span>{listing.avgRating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">
                            ({listing.reviewCount})
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          listing.leadCount > 0
                            ? "bg-cpPink/20 text-cpPink"
                            : "bg-slate-100 text-slate-600"
                        }
                      >
                        {listing.leadCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(listing.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/en/admin/places/${listing.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View in Admin
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/en/${listing.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              View Public Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleToggleVerified(listing.id, listing.isVerified)}
                            disabled={togglingVerified === listing.id}
                            className={listing.isVerified ? "text-red-600" : "text-green-600"}
                          >
                            {togglingVerified === listing.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : listing.isVerified ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Remove Verified
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify Listing
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleTogglePremium(listing.id, listing.isPremium)}
                            disabled={togglingPremium === listing.id}
                            className={listing.isPremium ? "text-red-600" : "text-amber-600"}
                          >
                            {togglingPremium === listing.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : listing.isPremium ? (
                              <>
                                <Crown className="h-4 w-4 mr-2" />
                                Remove Premium
                              </>
                            ) : (
                              <>
                                <Crown className="h-4 w-4 mr-2" />
                                Make Premium
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
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
      </CardContent>
    </Card>
  );
}
