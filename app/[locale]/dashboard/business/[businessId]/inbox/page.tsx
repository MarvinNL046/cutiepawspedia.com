/**
 * Business Inbox - Message threads overview
 */

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, getThreadsForBusiness, getUnreadCountForBusiness } from "@/db/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { nl, de, enUS } from "date-fns/locale";
import {
  MessageSquare,
  Archive,
  AlertTriangle,
  User,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard";

interface InboxPageProps {
  params: Promise<{ locale: string; businessId: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function InboxPage({ params, searchParams }: InboxPageProps) {
  const { locale, businessId } = await params;
  const { status = "open" } = await searchParams;
  const businessIdNum = parseInt(businessId, 10);

  // Auth check
  if (!stackServerApp) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-cpDark">Dashboard Unavailable</h1>
        <p className="text-slate-600">Authentication is not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/inbox`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/inbox`);
  }

  // Get business (with ownership check for non-admin users)
  let business;
  if (dbUser.role === "admin") {
    const { getBusinessById } = await import("@/db/queries/businesses");
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) {
    notFound();
  }

  // Get threads and unread count
  const threads = await getThreadsForBusiness(businessIdNum, { status, limit: 50 });
  const unreadCount = await getUnreadCountForBusiness(businessIdNum);

  // Localization
  const dateLocales = { nl, de, en: enUS };
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;

  const labels = {
    en: {
      inbox: "Inbox",
      open: "Open",
      archived: "Archived",
      spam: "Spam",
      noMessages: "No messages yet",
      noMessagesDesc: "When users send you messages, they will appear here.",
      unread: "unread",
      from: "From",
      about: "About",
    },
    nl: {
      inbox: "Inbox",
      open: "Open",
      archived: "Gearchiveerd",
      spam: "Spam",
      noMessages: "Nog geen berichten",
      noMessagesDesc: "Wanneer gebruikers je berichten sturen, verschijnen ze hier.",
      unread: "ongelezen",
      from: "Van",
      about: "Over",
    },
    de: {
      inbox: "Posteingang",
      open: "Offen",
      archived: "Archiviert",
      spam: "Spam",
      noMessages: "Noch keine Nachrichten",
      noMessagesDesc: "Wenn Benutzer Ihnen Nachrichten senden, werden sie hier angezeigt.",
      unread: "ungelesen",
      from: "Von",
      about: "Über",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const statusTabs = [
    { key: "open", label: t.open, icon: MessageSquare },
    { key: "archived", label: t.archived, icon: Archive },
    { key: "spam", label: t.spam, icon: AlertTriangle },
  ];

  return (
    <>
      <DashboardHeader
        title={t.inbox}
        description={unreadCount > 0 ? `${unreadCount} ${t.unread}` : undefined}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Status Tabs */}
        <div className="flex gap-2 mb-6">
          {statusTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = status === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/${locale}/dashboard/business/${businessId}/inbox?status=${tab.key}`}
              >
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={isActive ? "bg-cpPink hover:bg-cpPink/90" : ""}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Threads List */}
      {threads.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-cpDark mb-2">{t.noMessages}</h3>
          <p className="text-slate-500">{t.noMessagesDesc}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border divide-y">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/${locale}/dashboard/business/${businessId}/inbox/${thread.id}`}
              className="block hover:bg-slate-50 transition-colors"
            >
              <div className="p-4 flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {thread.user?.avatarUrl ? (
                    <img
                      src={thread.user.avatarUrl}
                      alt={thread.user.name || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-cpPink/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-cpPink" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-cpDark truncate">
                      {thread.user?.name || thread.user?.email || "Unknown User"}
                    </span>
                    {thread.unreadCountBusiness > 0 && (
                      <Badge className="bg-cpPink text-white text-xs">
                        {thread.unreadCountBusiness}
                      </Badge>
                    )}
                  </div>

                  {thread.subject && (
                    <p className="text-sm font-medium text-slate-700 mb-1 truncate">
                      {thread.subject}
                    </p>
                  )}

                  {thread.lastMessagePreview && (
                    <p className="text-sm text-slate-500 truncate">
                      {thread.lastMessagePreview}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span>
                      {formatDistanceToNow(new Date(thread.lastMessageAt), {
                        addSuffix: true,
                        locale: dateLocale,
                      })}
                    </span>
                    {thread.place && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {thread.place.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <div className="flex-shrink-0 self-center">
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
