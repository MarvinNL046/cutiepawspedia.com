import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPlaceBySlug } from "@/db/queries";
import { getPlaceMetadata, localBusinessSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { MapWidget } from "@/components/directory";
import { ChevronRight, MapPin, Phone, Globe, Mail, Star, Clock, CheckCircle, MessageSquare } from "lucide-react";

interface PlacePageProps {
  params: Promise<{ locale: string; countrySlug: string; citySlug: string; categorySlug: string; placeSlug: string }>;
}

export const revalidate = 300;

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug } = await params;
  const place = await getPlaceBySlug(placeSlug, citySlug, countrySlug);

  if (!place) {
    return {
      title: placeSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  return getPlaceMetadata(place, citySlug, countrySlug, categorySlug, locale);
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { locale, countrySlug, citySlug, categorySlug, placeSlug } = await params;
  const place = await getPlaceBySlug(placeSlug, citySlug, countrySlug);

  if (!place) notFound();

  const cityName = place.city?.name || citySlug;
  const countryName = place.city?.country?.name || countrySlug;
  const primaryCategory = place.placeCategories?.[0]?.category;

  // Generate JSON-LD structured data
  const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";
  const breadcrumbs = [
    { name: "Directory", url: `${BASE_URL}/${locale}` },
    { name: countryName, url: `${BASE_URL}/${locale}/${countrySlug}` },
    { name: cityName, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}` },
    { name: primaryCategory?.labelKey || categorySlug, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}` },
    { name: place.name, url: `${BASE_URL}/${locale}/${countrySlug}/${citySlug}/${categorySlug}/${place.slug}` },
  ];

  return (
    <>
      <JsonLd data={[
        localBusinessSchema(place, locale, categorySlug),
        breadcrumbSchema(breadcrumbs),
      ]} />
      <section className="relative overflow-hidden bg-gradient-to-br from-cpPink/10 via-white to-cpAqua/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,127,161,0.15),transparent_50%)]" />
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-cpPink">Directory</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}`} className="hover:text-cpPink">{countryName}</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}/${citySlug}`} className="hover:text-cpPink">{cityName}</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${locale}/${countrySlug}/${citySlug}/${categorySlug}`} className="hover:text-cpPink">{primaryCategory?.labelKey || categorySlug}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cpDark font-medium truncate max-w-[150px]">{place.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-cpDark">{place.name}</h1>
                {place.isVerified && <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua gap-1"><CheckCircle className="h-3 w-3" />Verified</Badge>}
                {place.isPremium && <Badge className="bg-cpYellow/20 text-cpYellow border-cpYellow">Premium</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {place.placeCategories?.map((pc) => <Badge key={pc.category.slug} variant="secondary">{pc.category.labelKey}</Badge>)}
              </div>
              {place.avgRating && Number(place.avgRating) > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-5 w-5 ${star <= Math.round(Number(place.avgRating)) ? "fill-cpYellow text-cpYellow" : "text-slate-300"}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-cpDark">{Number(place.avgRating).toFixed(1)}</span>
                  <span className="text-slate-500">({place.reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              {place.phone && <Button className="bg-cpPink hover:bg-cpPink/90 gap-2"><Phone className="h-4 w-4" />Call Now</Button>}
              <Button variant="outline" className="gap-2"><MessageSquare className="h-4 w-4" />Send Inquiry</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {place.description && (
              <Card>
                <CardHeader><CardTitle>About</CardTitle></CardHeader>
                <CardContent><p className="text-slate-600 whitespace-pre-wrap">{place.description}</p></CardContent>
              </Card>
            )}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Reviews</CardTitle>
                <Button variant="outline" size="sm">Write a Review</Button>
              </CardHeader>
              <CardContent>
                {place.reviews && place.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {place.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-cpYellow text-cpYellow" : "text-slate-300"}`} />)}</div>
                          <span className="text-sm text-slate-500">{review.user?.email?.split("@")[0] || "Anonymous"}</span>
                        </div>
                        {review.comment && <p className="text-slate-600">{review.comment}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No reviews yet. Be the first!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {place.address && <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-cpPink shrink-0 mt-0.5" /><div><p className="text-slate-600">{place.address}</p>{place.postalCode && <p className="text-slate-500 text-sm">{place.postalCode}</p>}</div></div>}
                {place.phone && <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-cpPink" /><a href={`tel:${place.phone}`} className="text-cpDark hover:text-cpPink transition-colors">{place.phone}</a></div>}
                {place.email && <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-cpPink" /><a href={`mailto:${place.email}`} className="text-cpDark hover:text-cpPink transition-colors truncate">{place.email}</a></div>}
                {place.website && <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-cpPink" /><a href={place.website} target="_blank" rel="noopener noreferrer" className="text-cpDark hover:text-cpPink transition-colors">Visit Website</a></div>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Business Hours</CardTitle></CardHeader>
              <CardContent><p className="text-slate-500 text-sm">Contact the business directly for opening hours.</p></CardContent>
            </Card>
            {place.lat && place.lng && (
              <Card>
                <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                <CardContent>
                  <MapWidget
                    markers={[{
                      id: place.id,
                      lat: Number(place.lat),
                      lng: Number(place.lng),
                      name: place.name,
                      isPremium: place.isPremium,
                    }]}
                    center={{ lat: Number(place.lat), lng: Number(place.lng) }}
                    zoom={15}
                    height="200px"
                    singleMarker
                    showControls={false}
                    className="rounded-lg"
                  />
                  {place.address && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 mt-3 text-sm text-cpAqua hover:text-cpPink transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      Open in Google Maps
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
