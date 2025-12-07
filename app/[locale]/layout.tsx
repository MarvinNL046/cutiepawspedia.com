import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { AdVisibilityProvider } from "@/components/ads";
import { CookieConsentBanner } from "@/components/consent";
import { ExitIntentPopup } from "@/components/popups";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import { getAdVisibilityContext } from "@/lib/ads/visibility";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Get ad visibility context (server-side auth check)
  const adContext = await getAdVisibilityContext();

  return (
    <AdVisibilityProvider value={adContext}>
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
      {/* GDPR Cookie Consent Banner */}
      <CookieConsentBanner locale={locale} />
      {/* Exit Intent Popup for newsletter signup */}
      <ExitIntentPopup locale={locale} />
    </AdVisibilityProvider>
  );
}
