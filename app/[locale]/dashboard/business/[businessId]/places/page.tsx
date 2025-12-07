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
  Plus,
  Sparkles,
} from "lucide-react";
import { type PlanKey, getPlanFeatures } from "@/lib/plans/config";

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

  // Get plan features to check location limits
  const planKey = (business.planKey || "FREE") as PlanKey;
  const planFeatures = getPlanFeatures(planKey);
  const maxLocations = planFeatures.maxLocations;
  const isUnlimited = maxLocations === 0;
  const canAddMore = isUnlimited || total < maxLocations;

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
      addLocation: "Add Location",
      upgradeToAdd: "Upgrade to Add More",
      locationLimit: `You've reached your ${planKey} plan limit of ${maxLocations} location`,
      unlimitedLocations: "Add unlimited locations with ELITE",
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
      addLocation: "Locatie Toevoegen",
      upgradeToAdd: "Upgrade voor Meer",
      locationLimit: `Je hebt de limiet van ${maxLocations} locatie voor je ${planKey} plan bereikt`,
      unlimitedLocations: "Voeg onbeperkt locaties toe met ELITE",
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
      addLocation: "Standort Hinzufügen",
      upgradeToAdd: "Upgrade für Mehr",
      locationLimit: `Sie haben das Limit von ${maxLocations} Standort für Ihren ${planKey} Plan erreicht`,
      unlimitedLocations: "Fügen Sie unbegrenzt Standorte mit ELITE hinzu",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={`${t.description} (${total})`}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6">
        {listings.length === 0 ? (
          // Empty state
          <Card className="max-w-md mx-auto mt-12 bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 mb-4">
                <Building2 className="h-8 w-8 text-cpCoral" />
              </div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-2">{t.noPlaces}</h3>
              <p className="text-muted-foreground dark:text-cpCream/60 mb-6">{t.noPlacesDesc}</p>
              <Button asChild className="bg-cpCoral hover:bg-cpCoral/90">
                <Link href={`/${locale}`}>
                  <Search className="h-4 w-4 mr-2" />
                  {t.claimListing}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {listings.map((place) => (
                <Card key={place.id} className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
                  <CardContent className="p-4 space-y-3">
                    {/* Header: Name + Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-foreground dark:text-cpCream truncate">{place.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground dark:text-cpCream/60 mt-0.5">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{place.cityName}, {place.countryName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {place.isVerified && (
                          <Badge className="bg-cpCoral/20 text-cpCoral border-cpCoral text-xs">
                            <CheckCircle className="h-3 w-3" />
                          </Badge>
                        )}
                        {place.isPremium && (
                          <Badge className="bg-cpAmber/20 text-cpAmber border-cpAmber text-xs">
                            <Crown className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-sm">
                      {place.categoryName && (
                        <Badge variant="secondary" className="text-xs dark:bg-cpSurface dark:text-cpCream/80">{place.categoryName}</Badge>
                      )}
                      {place.avgRating && place.avgRating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-cpAmber text-cpAmber" />
                          <span className="font-medium text-foreground dark:text-cpCream">{place.avgRating.toFixed(1)}</span>
                          <span className="text-muted-foreground dark:text-cpCream/50">({place.reviewCount})</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground dark:text-cpCream/50 text-xs">{t.noRating}</span>
                      )}
                      <div className="flex items-center gap-1 text-muted-foreground dark:text-cpCream/70">
                        <MessageSquare className="h-3.5 w-3.5 text-cpCoral" />
                        <span>{place.leadCount}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" className="flex-1 bg-cpCoral hover:bg-cpCoral/90" asChild>
                        <Link href={`/${locale}/dashboard/business/${businessId}/places/${place.id}`}>
                          {t.manage}
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10" asChild>
                        <Link
                          href={`/${locale}/${place.countryName?.toLowerCase().replace(/\s+/g, "-") || "unknown"}/${place.cityName?.toLowerCase().replace(/\s+/g, "-") || "unknown"}/${place.categoryName || "business"}/${place.slug}`}
                          target="_blank"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Location / Upgrade Banner */}
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground dark:text-cpCream/70">
                {isUnlimited ? (
                  <span>{total} {total === 1 ? "location" : "locations"}</span>
                ) : (
                  <span>{total} / {maxLocations} {maxLocations === 1 ? "location" : "locations"}</span>
                )}
              </div>
              {canAddMore ? (
                <Button asChild className="bg-cpCoral hover:bg-cpCoral/90">
                  <Link href={`/${locale}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addLocation}
                  </Link>
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-cpAmber">{t.locationLimit}</span>
                  <Button asChild className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t.upgradeToAdd}
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop Table Layout */}
            <Card className="hidden md:block bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border dark:border-cpAmber/20">
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.name}</TableHead>
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.location}</TableHead>
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.category}</TableHead>
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.rating}</TableHead>
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.leads}</TableHead>
                      <TableHead className="text-muted-foreground dark:text-cpCream/70">{t.status}</TableHead>
                      <TableHead className="text-right text-muted-foreground dark:text-cpCream/70">{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((place) => (
                      <TableRow key={place.id} className="border-border dark:border-cpAmber/10">
                        <TableCell>
                          <div className="font-medium text-foreground dark:text-cpCream">{place.name}</div>
                          <div className="text-sm text-muted-foreground dark:text-cpCream/50">{place.slug}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground dark:text-cpCream/70">
                            <MapPin className="h-3 w-3" />
                            {place.cityName}, {place.countryName}
                          </div>
                        </TableCell>
                        <TableCell>
                          {place.categoryName ? (
                            <Badge variant="secondary" className="dark:bg-cpSurface dark:text-cpCream/80">{place.categoryName}</Badge>
                          ) : (
                            <span className="text-muted-foreground dark:text-cpCream/50">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {place.avgRating && place.avgRating > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                              <span className="font-medium text-foreground dark:text-cpCream">{place.avgRating.toFixed(1)}</span>
                              <span className="text-muted-foreground dark:text-cpCream/50 text-sm">({place.reviewCount})</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground dark:text-cpCream/50 text-sm">{t.noRating}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-foreground dark:text-cpCream">
                            <MessageSquare className="h-4 w-4 text-cpCoral" />
                            <span className="font-medium">{place.leadCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {place.isVerified && (
                              <Badge className="bg-cpCoral/20 text-cpCoral border-cpCoral gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {t.verified}
                              </Badge>
                            )}
                            {place.isPremium && (
                              <Badge className="bg-cpAmber/20 text-cpAmber border-cpAmber gap-1">
                                <Crown className="h-3 w-3" />
                                {t.premium}
                              </Badge>
                            )}
                            {!place.isVerified && !place.isPremium && (
                              <span className="text-muted-foreground dark:text-cpCream/50">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="default" asChild className="bg-cpCoral hover:bg-cpCoral/90">
                              <Link href={`/${locale}/dashboard/business/${businessId}/places/${place.id}`}>
                                {t.manage}
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10" asChild>
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
          </>
        )}
      </div>
    </>
  );
}
