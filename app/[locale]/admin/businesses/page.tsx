import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBusinessesWithStats } from "@/db/queries/admin";
import { Building2, Mail, User } from "lucide-react";

interface BusinessesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BusinessesPage({ params }: BusinessesPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const businesses = await getBusinessesWithStats();

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Business Accounts"
        description="Manage business users and their listings"
        user={user}
        locale={locale}
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpAqua/10">
                  <Building2 className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Businesses</p>
                  <p className="text-2xl font-bold">{businesses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpPink/10">
                  <User className="h-5 w-5 text-cpPink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">With Listings</p>
                  <p className="text-2xl font-bold">
                    {businesses.filter((b) => b.placesCount > 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpYellow/10">
                  <Mail className="h-5 w-5 text-cpYellow" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">
                    {businesses.reduce((sum, b) => sum + b.leadsCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Businesses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Business Accounts</CardTitle>
            <CardDescription>
              Users with business role and their activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {businesses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No business accounts yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {business.name || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            business.placesCount > 0
                              ? "bg-cpAqua/20 text-cpAqua border-0"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {business.placesCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            business.leadsCount > 0
                              ? "bg-cpPink/20 text-cpPink border-0"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {business.leadsCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(business.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            business.placesCount > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {business.placesCount > 0 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
