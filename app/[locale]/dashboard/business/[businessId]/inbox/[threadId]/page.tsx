/**
 * Thread Detail Page - View conversation and send messages
 */

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import {
  getUserByStackAuthId,
  getBusinessByIdForUser,
  getThreadById,
  getMessagesInThread,
  markMessagesAsRead,
} from "@/db/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { nl, de, enUS } from "date-fns/locale";
import {
  ArrowLeft,
  User,
  MapPin,
  Archive,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageComposer } from "./MessageComposer";
import { updateThreadStatusAction } from "./actions";

interface ThreadPageProps {
  params: Promise<{ locale: string; businessId: string; threadId: string }>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { locale, businessId, threadId } = await params;
  const businessIdNum = parseInt(businessId, 10);
  const threadIdNum = parseInt(threadId, 10);

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
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/inbox/${threadId}`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/inbox/${threadId}`);
  }

  // Get business
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

  // Get thread
  const thread = await getThreadById(threadIdNum);
  if (!thread || thread.businessId !== businessIdNum) {
    notFound();
  }

  // Get messages (newest first, then reverse for display)
  const messages = await getMessagesInThread(threadIdNum, { limit: 100 });
  const sortedMessages = [...messages].reverse();

  // Mark messages as read
  if (thread.unreadCountBusiness > 0) {
    await markMessagesAsRead(threadIdNum, "business");
  }

  // Localization
  const dateLocales = { nl, de, en: enUS };
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;

  const labels = {
    en: {
      backToInbox: "Back to Inbox",
      conversation: "Conversation with",
      about: "About",
      archive: "Archive",
      markAsSpam: "Mark as Spam",
      reopen: "Reopen",
      writeMessage: "Write a message...",
      send: "Send",
      you: "You",
    },
    nl: {
      backToInbox: "Terug naar Inbox",
      conversation: "Gesprek met",
      about: "Over",
      archive: "Archiveren",
      markAsSpam: "Markeer als Spam",
      reopen: "Heropenen",
      writeMessage: "Schrijf een bericht...",
      send: "Versturen",
      you: "Jij",
    },
    de: {
      backToInbox: "Zurück zum Posteingang",
      conversation: "Gespräch mit",
      about: "Über",
      archive: "Archivieren",
      markAsSpam: "Als Spam markieren",
      reopen: "Wiedereröffnen",
      writeMessage: "Nachricht schreiben...",
      send: "Senden",
      you: "Du",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/dashboard/business/${businessId}/inbox`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToInbox}
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              {thread.user?.avatarUrl ? (
                <img
                  src={thread.user.avatarUrl}
                  alt={thread.user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-cpPink/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-cpPink" />
                </div>
              )}
              <div>
                <p className="font-medium text-cpDark">
                  {thread.user?.name || thread.user?.email || "Unknown User"}
                </p>
                {thread.place && (
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {t.about} {thread.place.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {thread.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {thread.status === "open" ? (
                  <>
                    <form action={updateThreadStatusAction}>
                      <input type="hidden" name="threadId" value={threadId} />
                      <input type="hidden" name="businessId" value={businessId} />
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="status" value="archived" />
                      <DropdownMenuItem asChild>
                        <button type="submit" className="w-full flex items-center">
                          <Archive className="h-4 w-4 mr-2" />
                          {t.archive}
                        </button>
                      </DropdownMenuItem>
                    </form>
                    <form action={updateThreadStatusAction}>
                      <input type="hidden" name="threadId" value={threadId} />
                      <input type="hidden" name="businessId" value={businessId} />
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="status" value="spam" />
                      <DropdownMenuItem asChild>
                        <button type="submit" className="w-full flex items-center text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t.markAsSpam}
                        </button>
                      </DropdownMenuItem>
                    </form>
                  </>
                ) : (
                  <form action={updateThreadStatusAction}>
                    <input type="hidden" name="threadId" value={threadId} />
                    <input type="hidden" name="businessId" value={businessId} />
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="status" value="open" />
                    <DropdownMenuItem asChild>
                      <button type="submit" className="w-full flex items-center">
                        {t.reopen}
                      </button>
                    </DropdownMenuItem>
                  </form>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {sortedMessages.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No messages yet. Start the conversation!
          </div>
        ) : (
          sortedMessages.map((message) => {
            const isFromBusiness = message.senderType === "business";
            return (
              <div
                key={message.id}
                className={`flex ${isFromBusiness ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    isFromBusiness
                      ? "bg-cpPink text-white rounded-br-md"
                      : "bg-white border rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.body}</p>
                  <p
                    className={`text-xs mt-2 ${
                      isFromBusiness ? "text-cpPink/70" : "text-slate-400"
                    }`}
                  >
                    {format(new Date(message.createdAt), "PPp", {
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 bg-white border-t p-4">
        <MessageComposer
          threadId={threadIdNum}
          businessId={businessIdNum}
          locale={locale}
          placeholder={t.writeMessage}
          sendLabel={t.send}
        />
      </div>
    </div>
  );
}
