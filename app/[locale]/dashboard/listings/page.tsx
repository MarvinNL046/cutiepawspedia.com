import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getListingsByOwnerId } from "@/db/queries";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent } from "@/components/ui/card";
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
  Building2,
  MapPin,
  Star,
  Crown,
  CheckCircle,
  Eye,
  Pencil,
  Clock,
} from "lucide-react";

interface ListingsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ListingsPage({ params }: ListingsPageProps) {
  const { locale } = await params;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get listings
  const listings = await getListingsByOwnerId(dbUser.id);

  return (
    <>
      <DashboardHeader
        title="My Listings"
        description="Manage your business listings"
      />

      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-cpDark mb-2">
                  No listings yet
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  You don't have any listings associated with your account.
                  If you own a business listed on CutiePawsPedia, contact us to claim it.
                </p>
                <Link href={`/${locale}/for-businesses`}>
                  <Button className="bg-cpCoral hover:bg-cpCoral/90">
                    Add Your Business
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => {
                    const city = Array.isArray(listing.city) ? listing.city[0] : listing.city;
                    const country = Array.isArray(city?.country) ? city.country[0] : city?.country;
                    const citySlug = city?.slug || "";
                    const countrySlug = country?.slug || "";
                    const categorySlug = listing.placeCategories?.[0]?.category?.slug || "all";
                    const publicUrl = `/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${listing.slug}`;

                    return (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-cpCoral/10">
                              <Building2 className="h-5 w-5 text-cpCoral" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-cpDark">
                                  {listing.name}
                                </span>
                                {listing.isPremium && (
                                  <Badge className="bg-cpYellow/20 text-amber-700 border-cpYellow gap-1">
                                    <Crown className="h-3 w-3" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              {listing.address && (
                                <p className="text-sm text-slate-500 truncate max-w-[250px]">
                                  {listing.address}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            <span>
                              {city?.name || ''}, {country?.name || ''}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {listing.placeCategories?.slice(0, 2).map((pc) => (
                              <Badge key={pc.category.slug} variant="secondary" className="text-xs">
                                {pc.category.labelKey}
                              </Badge>
                            ))}
                            {(listing.placeCategories?.length || 0) > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{(listing.placeCategories?.length || 0) - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {listing.isVerified ? (
                              <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-500">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(listing.updatedAt).toLocaleDateString(locale, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={publicUrl} target="_blank">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/${locale}/dashboard/listings/${listing.id}`}>
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        {listings.length > 0 && !listings.some((l) => l.isPremium) && (
          <Card className="mt-6 border-cpYellow/50 bg-cpYellow/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cpYellow/20">
                  <Crown className="h-6 w-6 text-cpYellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-cpDark">Upgrade to Premium</h3>
                  <p className="text-sm text-slate-600">
                    Get featured placement and increased visibility for your business
                  </p>
                </div>
              </div>
              <Button className="bg-cpYellow hover:bg-cpYellow/90 text-amber-900">
                Learn More
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
