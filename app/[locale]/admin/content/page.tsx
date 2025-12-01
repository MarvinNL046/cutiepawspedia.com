import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCountriesWithStats, getCitiesWithStats } from "@/db/queries/admin";
import { Globe, MapPin, Building2, Star } from "lucide-react";

interface ContentPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const [countries, cities] = await Promise.all([
    getCountriesWithStats(),
    getCitiesWithStats(),
  ]);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Content Management"
        description="Manage countries, cities, categories, and places"
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
          </TabsList>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle>Countries</CardTitle>
                <CardDescription>
                  All countries in the directory ({countries.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {countries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No countries yet. Add your first country to get started.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Cities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {countries.map((country) => (
                        <TableRow key={country.id}>
                          <TableCell className="font-medium">{country.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{country.code}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {country.slug}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{country.cityCount}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cities">
            <Card>
              <CardHeader>
                <CardTitle>Cities</CardTitle>
                <CardDescription>
                  All cities in the directory ({cities.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No cities yet. Add cities to your countries.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Places</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell className="font-medium">{city.name}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {city.countryName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {city.slug}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{city.placeCount}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Service categories for places
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Category management coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="places">
            <Card>
              <CardHeader>
                <CardTitle>Places</CardTitle>
                <CardDescription>
                  All business listings in the directory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Full place management coming soon. Use the Dashboard to view recent places.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
