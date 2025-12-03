import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { websiteSchema, organizationSchema } from "@/lib/seo";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* Global JSON-LD structured data */}
      <JsonLd data={[websiteSchema(), organizationSchema()]} />
      <Header locale={locale} variant="directory" />
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
