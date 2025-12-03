import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: "default" | "hero" | "gradient-pink" | "gradient-yellow" | "gradient-aqua";
  children?: React.ReactNode;
}

/**
 * Standalone Breadcrumbs component for custom page layouts
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-slate-500 mb-4 flex-wrap"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-cpPink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cpPink focus-visible:ring-offset-2 rounded-sm"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-cpDark font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

const variantStyles = {
  default: "bg-slate-50",
  hero: "bg-gradient-to-br from-cpPink/20 via-cpYellow/10 to-cpAqua/20",
  "gradient-pink": "bg-gradient-to-br from-cpPink/20 to-cpYellow/10",
  "gradient-yellow": "bg-gradient-to-br from-cpYellow/20 to-cpAqua/10",
  "gradient-aqua": "bg-gradient-to-br from-cpAqua/20 to-cpPink/10",
};

const variantOverlays = {
  default: null,
  hero: (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,127,161,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(41,160,177,0.2),transparent_50%)]" />
    </>
  ),
  "gradient-pink": (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,127,161,0.2),transparent_50%)]" />
  ),
  "gradient-yellow": (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,209,102,0.2),transparent_50%)]" />
  ),
  "gradient-aqua": (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,160,177,0.2),transparent_50%)]" />
  ),
};

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  icon,
  badge,
  variant = "default",
  children,
}: PageHeaderProps) {
  return (
    <section className={`relative overflow-hidden ${variantStyles[variant]}`}>
      {variantOverlays[variant]}

      <div className="relative">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-slate-500 mb-4 flex-wrap"
            >
              {breadcrumbs.map((item, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-cpPink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cpPink focus-visible:ring-offset-2 rounded-sm"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-cpDark font-medium">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Header content */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-cpDark tracking-tight">
                  {title}
                </h1>
                {badge && (
                  <Badge variant="secondary" className="bg-white/80">
                    {badge}
                  </Badge>
                )}
              </div>
              {subtitle && (
                <div className="text-slate-600 mt-2 text-lg">{subtitle}</div>
              )}
            </div>
          </div>

          {/* Optional children for extra content */}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/**
 * Simple section header for within-page sections
 */
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, icon, action, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-6 ${className}`}>
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-bold text-cpDark tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}
