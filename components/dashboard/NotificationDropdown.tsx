"use client";

/**
 * NotificationDropdown Component
 *
 * Dropdown menu for the notification bell in the business dashboard.
 * Shows recent notifications with unread count badge.
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Star,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Crown,
  AlertCircle,
  BarChart3,
  Settings,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { nl, de, enUS } from "date-fns/locale";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

interface NotificationDropdownProps {
  businessId: number;
  locale: string;
}

const labels = {
  en: {
    notifications: "Notifications",
    noNotifications: "No notifications yet",
    markAllRead: "Mark all as read",
    viewAll: "View all notifications",
  },
  nl: {
    notifications: "Notificaties",
    noNotifications: "Nog geen notificaties",
    markAllRead: "Alles als gelezen markeren",
    viewAll: "Alle notificaties bekijken",
  },
  de: {
    notifications: "Benachrichtigungen",
    noNotifications: "Noch keine Benachrichtigungen",
    markAllRead: "Alle als gelesen markieren",
    viewAll: "Alle Benachrichtigungen anzeigen",
  },
};

const getDateLocale = (locale: string) => {
  switch (locale) {
    case "nl":
      return nl;
    case "de":
      return de;
    default:
      return enUS;
  }
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "new_review":
      return Star;
    case "new_lead":
      return MessageSquare;
    case "review_reply":
      return MessageSquare;
    case "listing_view":
      return Eye;
    case "claim_approved":
      return CheckCircle;
    case "claim_rejected":
      return XCircle;
    case "plan_upgraded":
      return Crown;
    case "plan_expiring":
      return AlertCircle;
    case "weekly_summary":
      return BarChart3;
    case "system":
    default:
      return Settings;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "new_review":
      return "text-cpAmber";
    case "new_lead":
      return "text-cpCoral";
    case "review_reply":
      return "text-cpCoral";
    case "listing_view":
      return "text-blue-500";
    case "claim_approved":
      return "text-green-500";
    case "claim_rejected":
      return "text-red-500";
    case "plan_upgraded":
      return "text-purple-500";
    case "plan_expiring":
      return "text-orange-500";
    case "weekly_summary":
      return "text-cpAmber";
    case "system":
    default:
      return "text-muted-foreground";
  }
};

export function NotificationDropdown({
  businessId,
  locale,
}: NotificationDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const t = labels[locale as keyof typeof labels] || labels.en;
  const dateLocale = getDateLocale(locale);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/dashboard/business/${businessId}/notifications?limit=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [businessId]);

  // Fetch on open
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  // Initial fetch for unread count
  useEffect(() => {
    fetchNotifications();

    // Poll every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Mark single as read
  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(
        `/api/dashboard/business/${businessId}/notifications`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      setIsMarkingAll(true);
      const response = await fetch(
        `/api/dashboard/business/${businessId}/notifications`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markAll: true }),
        }
      );

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    } finally {
      setIsMarkingAll(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      setIsOpen(false);
      router.push(notification.actionUrl);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground dark:text-cpCream/70" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center bg-cpCoral text-white text-xs font-bold rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-card dark:bg-cpSurface border-border dark:border-cpAmber/20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-cpAmber/20">
          <h3 className="font-semibold text-foreground dark:text-cpCream">{t.notifications}</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-cpCoral hover:text-cpCoral/80"
              onClick={markAllAsRead}
              disabled={isMarkingAll}
            >
              {isMarkingAll ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <Check className="h-3 w-3 mr-1" />
              )}
              {t.markAllRead}
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-cpCoral" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground dark:text-cpCream/60">
              <Bell className="h-8 w-8 mb-2 text-muted-foreground/50 dark:text-cpCream/40" />
              <p className="text-sm">{t.noNotifications}</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "px-4 py-3 hover:bg-muted dark:hover:bg-cpSurface/50 cursor-pointer border-b border-border dark:border-cpAmber/10 last:border-b-0 transition-colors",
                    !notification.isRead && "bg-cpCoral/5 dark:bg-cpCoral/10"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                        !notification.isRead ? "bg-cpCoral/10" : "bg-muted dark:bg-cpSurface"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm",
                          !notification.isRead
                            ? "font-medium text-foreground dark:text-cpCream"
                            : "text-foreground/80 dark:text-cpCream/80"
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/60 line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/80 dark:text-cpCream/50 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: dateLocale,
                        })}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="flex-shrink-0">
                        <span className="h-2 w-2 rounded-full bg-cpCoral block" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
