import { requireAdmin } from "@/lib/auth/admin";
import { AdminSidebar } from "@/components/admin";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Admin Layout with Role Protection
 *
 * - Requires authenticated user with "admin" role
 * - Provides dark sidebar navigation
 * - Redirects non-admins to homepage
 */
export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  // This will redirect if user is not an admin
  await requireAdmin(locale);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar locale={locale} />

      {/* Main Content */}
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}
