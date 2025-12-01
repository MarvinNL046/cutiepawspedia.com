import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCountriesWithStats,
  getCitiesWithStats,
  getCategoriesWithStats,
  getAdminPlaces,
  getAdminReviews,
} from "@/db/queries/admin";
import { Globe, MapPin, Building2, Star, MessageSquare } from "lucide-react";
import {
  CountriesTable,
  CitiesTable,
  CategoriesTable,
  PlacesTable,
  ReviewsTable,
} from "@/components/admin/content";

interface ContentPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const [countries, cities, categories, placesResult, reviewsResult] = await Promise.all([
    getCountriesWithStats(),
    getCitiesWithStats(),
    getCategoriesWithStats(),
    getAdminPlaces({ limit: 20 }),
    getAdminReviews({ limit: 20 }),
  ]);

  // Prepare countries for select dropdowns
  const countriesForSelect = countries.map((c) => ({ id: c.id, name: c.name }));

  // Prepare cities for select dropdowns
  const citiesForSelect = cities.map((c) => ({
    id: c.id,
    name: c.name,
    countryId: c.countryId,
  }));

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Content Management"
        description="Manage countries, cities, categories, places, and reviews"
        user={user}
        locale={locale}
      />

      <div className="p-6">
        <Tabs defaultValue="countries" className="space-y-4">
          <TabsList>
            <TabsTrigger value="countries" className="gap-2">
              <Globe className="h-4 w-4" aria-hidden="true" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="cities" className="gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Cities
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Star className="h-4 w-4" aria-hidden="true" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="places" className="gap-2">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Places
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle>Countries</CardTitle>
                <CardDescription>
                  Manage all countries in the directory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CountriesTable countries={countries} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cities">
            <Card>
              <CardHeader>
                <CardTitle>Cities</CardTitle>
                <CardDescription>
                  Manage all cities in the directory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CitiesTable cities={cities} countries={countriesForSelect} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Manage service categories for places
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoriesTable categories={categories} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="places">
            <Card>
              <CardHeader>
                <CardTitle>Places</CardTitle>
                <CardDescription>
                  View and moderate all business listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlacesTable
                  initialPlaces={placesResult.places}
                  initialTotal={placesResult.total}
                  countries={countriesForSelect}
                  cities={citiesForSelect}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  Moderate user reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewsTable
                  initialReviews={reviewsResult.reviews}
                  initialTotal={reviewsResult.total}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
