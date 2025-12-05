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
  Lock,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { LeadStatusDropdown } from "./LeadStatusDropdown";
import { getCreditBalance } from "@/db/queries/credits";

// Helper to blur contact details
function blurText(text: string, showChars: number = 2): string {
  if (text.length <= showChars) return "••••••";
  return text.substring(0, showChars) + "••••••";
}

function blurEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "••••••@••••••";
  return blurText(local, 2) + "@" + blurText(domain.split(".")[0], 2) + ".•••";
}

function blurPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 3) return "••• ••• ••••";
  return digits.substring(0, 3) + " ••• ••••";
}

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

  // Get leads, status counts, and credit balance
  const [{ leads, total }, statusCounts, creditBalance] = await Promise.all([
    getLeadsForBusiness({ businessId: businessIdNum, status: statusFilter, limit: 100 }),
    getLeadStatusCounts(businessIdNum),
    getCreditBalance(businessIdNum),
  ]);

  // Count unpaid leads (leads where chargedAt is null but should have been charged)
  const unpaidLeadsCount = leads.filter(lead => !lead.chargedAt && lead.status !== "spam").length;

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
      locked: "Locked",
      lockedDesc: "Buy credits to unlock contact details",
      buyCredits: "Buy Credits",
      unlockLead: "Unlock",
      creditsBalance: "Credit Balance",
      lockedLeadsWarning: "You have {count} locked leads. Top up your credits to unlock them.",
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
      locked: "Vergrendeld",
      lockedDesc: "Koop credits om contactgegevens te ontgrendelen",
      buyCredits: "Credits Kopen",
      unlockLead: "Ontgrendelen",
      creditsBalance: "Credit Saldo",
      lockedLeadsWarning: "Je hebt {count} vergrendelde leads. Koop credits om ze te ontgrendelen.",
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
      locked: "Gesperrt",
      lockedDesc: "Kaufen Sie Credits, um Kontaktdaten freizuschalten",
      buyCredits: "Credits Kaufen",
      unlockLead: "Freischalten",
      creditsBalance: "Guthaben",
      lockedLeadsWarning: "Sie haben {count} gesperrte Leads. Laden Sie Credits auf, um sie freizuschalten.",
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

        {/* Locked leads warning banner */}
        {unpaidLeadsCount > 0 && (
          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-100">
                    <Lock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">
                      {t.lockedLeadsWarning.replace("{count}", String(unpaidLeadsCount))}
                    </p>
                    <p className="text-sm text-amber-600">
                      {t.creditsBalance}: €{(creditBalance.balanceCents / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <Link href={`/${locale}/dashboard/business/${businessId}/credits`}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
                    <CreditCard className="h-4 w-4" />
                    {t.buyCredits}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

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
                  {leads.map((lead) => {
                    // Check if lead is paid (has chargedAt) - if not, blur contact details
                    const isPaid = !!lead.chargedAt || lead.status === "spam";
                    const displayName = isPaid ? lead.name : blurText(lead.name.split(" ")[0], 2) + " •••";
                    const displayEmail = isPaid ? lead.email : blurEmail(lead.email);
                    const displayPhone = isPaid && lead.phone ? lead.phone : (lead.phone ? blurPhone(lead.phone) : null);
                    const displayMessage = isPaid ? lead.message : (lead.message ? lead.message.substring(0, 20) + "..." : null);

                    return (
                    <TableRow key={lead.id} className={!isPaid ? "bg-amber-50/50" : ""}>
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
                        {!isPaid && (
                          <Badge variant="outline" className="mt-1 text-amber-600 border-amber-300 bg-amber-100 text-xs">
                            <Lock className="h-2 w-2 mr-1" />
                            {t.locked}
                          </Badge>
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
                          <div className={`font-medium ${isPaid ? "text-cpDark" : "text-slate-400 font-mono"}`}>
                            {displayName}
                          </div>
                          {isPaid ? (
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1 text-sm text-cpPink hover:underline"
                            >
                              <Mail className="h-3 w-3" />
                              {displayEmail}
                            </a>
                          ) : (
                            <span className="flex items-center gap-1 text-sm text-slate-400 font-mono">
                              <Mail className="h-3 w-3" />
                              {displayEmail}
                            </span>
                          )}
                          {displayPhone && (
                            isPaid ? (
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1 text-sm text-slate-600 hover:text-cpPink"
                              >
                                <Phone className="h-3 w-3" />
                                {displayPhone}
                              </a>
                            ) : (
                              <span className="flex items-center gap-1 text-sm text-slate-400 font-mono">
                                <Phone className="h-3 w-3" />
                                {displayPhone}
                              </span>
                            )
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {displayMessage ? (
                          <p className={`text-sm truncate max-w-[200px] ${isPaid ? "text-slate-600" : "text-slate-400 italic"}`} title={isPaid ? lead.message || "" : t.lockedDesc}>
                            {displayMessage}
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
                        {isPaid ? (
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
                        ) : (
                          <Link href={`/${locale}/dashboard/business/${businessId}/credits`}>
                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
                              <Lock className="h-3 w-3" />
                              {t.unlockLead}
                            </Button>
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
