import { stackServerApp } from "@/lib/auth/stack";
import {
  getUserByStackAuthId,
  getLeadsByOwnerId,
  getListingOptionsForOwner,
} from "@/db/queries";
import type { LeadPeriodFilter } from "@/db/queries/dashboard";
import { DashboardHeader, LeadsFilters } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";

interface LeadsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const { locale } = await params;
  const search = await searchParams;

  // Parse search params
  const listingIdParam = typeof search.listingId === "string" ? search.listingId : undefined;
  const periodParam = (typeof search.period === "string" ? search.period : "all") as LeadPeriodFilter;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get listing options for filter dropdown
  const listingOptions = await getListingOptionsForOwner(dbUser.id);

  // Get leads with filters
  const leads = await getLeadsByOwnerId(dbUser.id, {
    limit: 100,
    filters: {
      listingId: listingIdParam ? parseInt(listingIdParam, 10) : undefined,
      period: periodParam,
    },
  });

  // Calculate stats based on filtered results
  const totalLeads = leads.length;
  const thisMonth = leads.filter((lead) => {
    const leadDate = new Date(lead.createdAt);
    const now = new Date();
    return (
      leadDate.getMonth() === now.getMonth() &&
      leadDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const withPhone = leads.filter((lead) => lead.phone).length;

  return (
    <>
      <DashboardHeader
        title="Leads"
        description="Customer inquiries from your listings"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {listingIdParam || periodParam !== "all" ? "Filtered" : "Total"} Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpDark">{totalLeads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpPink">{thisMonth}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                With Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpAqua">{withPhone}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <LeadsFilters
          locale={locale}
          listings={listingOptions}
          currentListingId={listingIdParam}
          currentPeriod={periodParam}
          totalLeads={totalLeads}
        />

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            {leads.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-cpDark mb-2">
                  No leads found
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {listingIdParam || periodParam !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "When customers contact you through your listings, their inquiries will appear here."}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Listing</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(lead.createdAt).toLocaleDateString(locale, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1">
                          <Building2 className="h-3 w-3" />
                          {lead.place?.name || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-cpDark">{lead.name}</span>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 text-sm text-cpPink hover:underline"
                        >
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {lead.message ? (
                          <p
                            className="text-sm text-slate-600 truncate max-w-[200px]"
                            title={lead.message}
                          >
                            {lead.message}
                          </p>
                        ) : (
                          <span className="text-sm text-slate-400 italic">
                            No message
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {lead.source || "website"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className="bg-cpPink hover:bg-cpPink/90"
                            asChild
                          >
                            <a href={`mailto:${lead.email}`}>
                              <Mail className="h-4 w-4 mr-1" />
                              Reply
                            </a>
                          </Button>
                          {lead.phone && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
