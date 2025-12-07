import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, ArrowLeft, Building2 } from "lucide-react";
import type { AdminUser } from "@/lib/auth/admin";
import type { ImpersonationData } from "@/lib/auth/impersonation";
import { ImpersonationBanner } from "./ImpersonationBanner";

interface AdminHeaderProps {
  title: string;
  description?: string;
  user: AdminUser;
  locale: string;
  backHref?: string;
  impersonation?: ImpersonationData | null;
}

export function AdminHeader({
  title,
  description,
  user,
  locale,
  backHref,
  impersonation,
}: AdminHeaderProps) {
  return (
    <>
      {/* Impersonation Banner */}
      {impersonation && <ImpersonationBanner impersonation={impersonation} />}

      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left side: Back button + Title */}
          <div className="flex items-center gap-4">
            {backHref && (
              <Link href={backHref}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Go back</span>
                </Button>
              </Link>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
              {description && (
                <p className="text-sm text-slate-500">{description}</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Dashboard Navigation */}
            <div className="flex items-center gap-2">
              <Link href={`/${locale}`} target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  View Site
                </Button>
              </Link>
              <Link href={`/${locale}/account/favorites`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" aria-hidden="true" />
                  User Dashboard
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  Business Dashboard
                </Button>
              </Link>
            </div>

            {/* User info */}
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  {user.name || user.email.split("@")[0]}
                </p>
                <Badge variant="secondary" className="text-xs bg-cpCoral/10 text-cpCoral">
                  Admin
                </Badge>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-4 w-4 text-slate-600" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
