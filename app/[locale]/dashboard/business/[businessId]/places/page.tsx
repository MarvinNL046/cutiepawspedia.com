/**
 * My Places Page - Lists all places linked to this business
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, getBusinessListings } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Crown,
  Search,
} from "lucide-react";

interface PlacesPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function PlacesPage({ params }: PlacesPageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get business with ownership check (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) notFound();

  // Get listings
  const { listings, total } = await getBusinessListings(businessIdNum, { limit: 100 });

  const labels = {
    en: {
      title: "My Places",
      description: "Manage your business locations",
      noPlaces: "No places yet",
      noPlacesDesc: "There are no places linked to this business yet. Claim a listing to get started!",
      claimListing: "Find & Claim a Listing",
      name: "Name",
      location: "Location",
      category: "Category",
      rating: "Rating",
      leads: "Leads",
      status: "Status",
      actions: "Actions",
      view: "View",
      manage: "Manage",
      verified: "Verified",
      premium: "Premium",
      noRating: "No reviews",
    },
    nl: {
      title: "Mijn Locaties",
      description: "Beheer je bedrijfslocaties",
      noPlaces: "Nog geen locaties",
      noPlacesDesc: "Er zijn nog geen locaties aan dit bedrijf gekoppeld. Claim een vermelding om te beginnen!",
      claimListing: "Zoek & Claim een Vermelding",
      name: "Naam",
      location: "Locatie",
      category: "Categorie",
      rating: "Beoordeling",
      leads: "Leads",
      status: "Status",
      actions: "Acties",
      view: "Bekijk",
      manage: "Beheer",
      verified: "Geverifieerd",
      premium: "Premium",
      noRating: "Geen reviews",
    },
    de: {
      title: "Meine Standorte",
      description: "Verwalten Sie Ihre Geschäftsstandorte",
      noPlaces: "Noch keine Standorte",
      noPlacesDesc: "Es sind noch keine Standorte mit diesem Unternehmen verknüpft. Beanspruchen Sie einen Eintrag, um zu beginnen!",
      claimListing: "Eintrag suchen & beanspruchen",
      name: "Name",
      location: "Standort",
      category: "Kategorie",
      rating: "Bewertung",
      leads: "Leads",
      status: "Status",
      actions: "Aktionen",
      view: "Ansehen",
      manage: "Verwalten",
      verified: "Verifiziert",
      premium: "Premium",
      noRating: "Keine Bewertungen",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={`${t.description} (${total})`}
      />

      <div className="p-6">
        {listings.length === 0 ? (
          // Empty state
          <Card className="max-w-md mx-auto mt-12">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpAqua/10 mb-4">
                <Building2 className="h-8 w-8 text-cpAqua" />
              </div>
              <h3 className="text-xl font-semibold text-cpDark mb-2">{t.noPlaces}</h3>
              <p className="text-slate-600 mb-6">{t.noPlacesDesc}</p>
              <Button asChild className="bg-cpPink hover:bg-cpPink/90">
                <Link href={`/${locale}`}>
                  <Search className="h-4 w-4 mr-2" />
                  {t.claimListing}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Places table
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.name}</TableHead>
                    <TableHead>{t.location}</TableHead>
                    <TableHead>{t.category}</TableHead>
                    <TableHead>{t.rating}</TableHead>
                    <TableHead>{t.leads}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((place) => (
                    <TableRow key={place.id}>
                      <TableCell>
                        <div className="font-medium text-cpDark">{place.name}</div>
                        <div className="text-sm text-slate-500">{place.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="h-3 w-3" />
                          {place.cityName}, {place.countryName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {place.categoryName ? (
                          <Badge variant="secondary">{place.categoryName}</Badge>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {place.avgRating && place.avgRating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-cpYellow text-cpYellow" />
                            <span className="font-medium">{place.avgRating.toFixed(1)}</span>
                            <span className="text-slate-500 text-sm">({place.reviewCount})</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">{t.noRating}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-cpPink" />
                          <span className="font-medium">{place.leadCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {place.isVerified && (
                            <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1">
                              <CheckCircle className="h-3 w-3" />
                              {t.verified}
                            </Badge>
                          )}
                          {place.isPremium && (
                            <Badge className="bg-cpYellow/20 text-cpYellow border-cpYellow gap-1">
                              <Crown className="h-3 w-3" />
                              {t.premium}
                            </Badge>
                          )}
                          {!place.isVerified && !place.isPremium && (
                            <span className="text-slate-400">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="default" asChild className="bg-cpPink hover:bg-cpPink/90">
                            <Link href={`/${locale}/dashboard/business/${businessId}/places/${place.id}`}>
                              {t.manage}
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              href={`/${locale}/${place.countryName?.toLowerCase().replace(/\s+/g, "-") || "unknown"}/${place.cityName?.toLowerCase().replace(/\s+/g, "-") || "unknown"}/${place.categoryName || "business"}/${place.slug}`}
                              target="_blank"
                            >
                              {t.view}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
