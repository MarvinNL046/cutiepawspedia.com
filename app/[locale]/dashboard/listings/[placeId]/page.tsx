import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getListingById, canUserEditListing } from "@/db/queries";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, MapPin, Crown, CheckCircle } from "lucide-react";
import { ListingEditForm } from "@/components/dashboard/ListingEditForm";

interface EditListingPageProps {
  params: Promise<{ locale: string; placeId: string }>;
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { locale, placeId } = await params;
  const listingId = parseInt(placeId, 10);

  if (isNaN(listingId)) {
    notFound();
  }

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/listings/${placeId}`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/listings/${placeId}`);
  }

  // Check if user can edit this listing
  const canEdit = await canUserEditListing(dbUser.id, listingId);
  if (!canEdit) {
    return (
      <>
        <DashboardHeader
          title="Access Denied"
          description="You don't have permission to edit this listing"
        />
        <div className="p-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-cpDark mb-2">
                Permission Denied
              </h3>
              <p className="text-slate-500 mb-6">
                You can only edit listings that belong to your account.
              </p>
              <Link href={`/${locale}/dashboard/listings`}>
                <Button className="bg-cpPink hover:bg-cpPink/90">
                  Back to Listings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Get listing data
  const listing = await getListingById(listingId);
  if (!listing) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title="Edit Listing"
        description={`Update details for ${listing.name}`}
      />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Back link */}
        <Link
          href={`/${locale}/dashboard/listings`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-cpPink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>

        {/* Listing Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cpPink/10">
                  <Building2 className="h-6 w-6 text-cpPink" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {listing.name}
                    {listing.isPremium && (
                      <Badge className="bg-cpYellow/20 text-amber-700 border-cpYellow gap-1">
                        <Crown className="h-3 w-3" />
                        Premium
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {(() => { const city = Array.isArray(listing.city) ? listing.city[0] : listing.city; return city?.name || ''; })()}, {(() => {
                      const city = Array.isArray(listing.city) ? listing.city[0] : listing.city;
                      const country = Array.isArray(city?.country) ? city.country[0] : city?.country;
                      return country?.name || '';
                    })()}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {listing.isVerified ? (
                  <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-500">
                    Pending Verification
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Edit Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>
              Update your business information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ListingEditForm
              listingId={listing.id}
              initialData={{
                name: listing.name,
                address: listing.address || "",
                website: listing.website || "",
                phone: listing.phone || "",
                description: listing.description || "",
              }}
              locale={locale}
            />
          </CardContent>
        </Card>

        {/* Categories Info */}
        {listing.placeCategories && listing.placeCategories.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categories</CardTitle>
              <CardDescription>
                Categories are managed by administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {listing.placeCategories.map((pc) => (
                  <Badge key={pc.category.slug} variant="secondary">
                    {pc.category.labelKey}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
