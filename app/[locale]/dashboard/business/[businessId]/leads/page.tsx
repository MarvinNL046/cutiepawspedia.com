/**
 * My Leads Page - Lists all leads with status filter and actions
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, getLeadsForBusiness, getLeadStatusCounts } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import type { LeadStatus } from "@/db/queries/leads";
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
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";
import { LeadStatusDropdown } from "./LeadStatusDropdown";

interface LeadsPageProps {
  params: Promise<{ locale: string; businessId: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const { locale, businessId } = await params;
  const { status: statusParam } = await searchParams;
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

  // Parse status filter
  const validStatuses: LeadStatus[] = ["new", "sent", "viewed", "converted", "spam"];
  const statusFilter = validStatuses.includes(statusParam as LeadStatus)
    ? (statusParam as LeadStatus)
    : undefined;

  // Get leads and status counts
  const [{ leads, total }, statusCounts] = await Promise.all([
    getLeadsForBusiness({ businessId: businessIdNum, status: statusFilter, limit: 100 }),
    getLeadStatusCounts(businessIdNum),
  ]);

  const labels = {
    en: {
      title: "Leads",
      description: "Customer inquiries from your listings",
      noLeads: "No leads yet",
      noLeadsDesc: "When customers contact you through your listings, their inquiries will appear here.",
      date: "Date",
      place: "Place",
      contact: "Contact",
      message: "Message",
      status: "Status",
      actions: "Actions",
      reply: "Reply",
      call: "Call",
      all: "All",
      new: "New",
      sent: "Sent",
      viewed: "Viewed",
      converted: "Converted",
      spam: "Spam",
    },
    nl: {
      title: "Leads",
      description: "Klantaanvragen van je vermeldingen",
      noLeads: "Nog geen leads",
      noLeadsDesc: "Wanneer klanten contact opnemen via je vermeldingen, verschijnen hun aanvragen hier.",
      date: "Datum",
      place: "Locatie",
      contact: "Contact",
      message: "Bericht",
      status: "Status",
      actions: "Acties",
      reply: "Antwoord",
      call: "Bel",
      all: "Alle",
      new: "Nieuw",
      sent: "Verzonden",
      viewed: "Bekeken",
      converted: "Geconverteerd",
      spam: "Spam",
    },
    de: {
      title: "Leads",
      description: "Kundenanfragen von Ihren Einträgen",
      noLeads: "Noch keine Leads",
      noLeadsDesc: "Wenn Kunden Sie über Ihre Einträge kontaktieren, erscheinen ihre Anfragen hier.",
      date: "Datum",
      place: "Standort",
      contact: "Kontakt",
      message: "Nachricht",
      status: "Status",
      actions: "Aktionen",
      reply: "Antworten",
      call: "Anrufen",
      all: "Alle",
      new: "Neu",
      sent: "Gesendet",
      viewed: "Angesehen",
      converted: "Konvertiert",
      spam: "Spam",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const statusFilters = [
    { key: undefined, label: t.all, count: statusCounts.all },
    { key: "new", label: t.new, count: statusCounts.new },
    { key: "viewed", label: t.viewed, count: statusCounts.viewed },
    { key: "converted", label: t.converted, count: statusCounts.converted },
    { key: "spam", label: t.spam, count: statusCounts.spam },
  ];

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={`${t.description} (${total})`}
      />

      <div className="p-6 space-y-6">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = filter.key === statusFilter;
            const href = filter.key
              ? `/${locale}/dashboard/business/${businessId}/leads?status=${filter.key}`
              : `/${locale}/dashboard/business/${businessId}/leads`;

            return (
              <Link key={filter.key ?? "all"} href={href}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={isActive ? "bg-cpPink hover:bg-cpPink/90" : ""}
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 bg-white/20">
                    {filter.count}
                  </Badge>
                </Button>
              </Link>
            );
          })}
        </div>

        {leads.length === 0 ? (
          // Empty state
          <Card className="max-w-md mx-auto mt-8">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cpPink/10 mb-4">
                <MessageSquare className="h-8 w-8 text-cpPink" />
              </div>
              <h3 className="text-xl font-semibold text-cpDark mb-2">{t.noLeads}</h3>
              <p className="text-slate-600">{t.noLeadsDesc}</p>
            </CardContent>
          </Card>
        ) : (
          // Leads table
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.date}</TableHead>
                    <TableHead>{t.place}</TableHead>
                    <TableHead>{t.contact}</TableHead>
                    <TableHead>{t.message}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.createdAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        {lead.viewedAt && (
                          <div className="text-xs text-slate-400 mt-1">
                            Viewed: {new Date(lead.viewedAt).toLocaleDateString()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-cpAqua" />
                          <div>
                            <div className="font-medium text-cpDark">{lead.placeName}</div>
                            <div className="text-xs text-slate-500">{lead.cityName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-cpDark">{lead.name}</div>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 text-sm text-cpPink hover:underline"
                          >
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1 text-sm text-slate-600 hover:text-cpPink"
                            >
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.message ? (
                          <p className="text-sm text-slate-600 truncate max-w-[200px]" title={lead.message}>
                            {lead.message}
                          </p>
                        ) : (
                          <span className="text-slate-400 text-sm italic">No message</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <LeadStatusDropdown
                          leadId={lead.id}
                          businessId={businessIdNum}
                          currentStatus={lead.status as LeadStatus}
                          locale={locale}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" className="bg-cpPink hover:bg-cpPink/90" asChild>
                            <a href={`mailto:${lead.email}`}>
                              <Mail className="h-4 w-4 mr-1" />
                              {t.reply}
                            </a>
                          </Button>
                          {lead.phone && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="h-4 w-4 mr-1" />
                                {t.call}
                              </a>
                            </Button>
                          )}
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
