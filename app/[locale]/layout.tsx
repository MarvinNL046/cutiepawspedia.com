import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { AdVisibilityProvider } from "@/components/ads";
import { CookieConsentBanner } from "@/components/consent";
import { ExitIntentPopup } from "@/components/popups";
import { FeedbackRibbon } from "@/components/FeedbackRibbon";
import { TopBanner } from "@/components/ui/TopBanner";
import { StickyBottomBanner } from "@/components/ui/StickyBottomBanner";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import { getAdVisibilityContext } from "@/lib/ads/visibility";
import { locales } from "@/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  // Get ad visibility context (server-side auth check)
  // Wrap in try-catch to prevent SSR bailout from affecting notFound()
  let adContext;
  try {
    adContext = await getAdVisibilityContext();
  } catch {
    // On auth check failure, default to showing ads (anonymous user experience)
    adContext = {
      isLoggedIn: false,
      showAds: true,
      isPremium: false,
      adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
    };
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <AdVisibilityProvider value={adContext}>
        <div className="flex min-h-screen flex-col">
          {/* Skip link for keyboard navigation */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {/* Global JSON-LD structured data */}
          <JsonLd data={[websiteSchema(), organizationSchema()]} />
          {/* Growing database announcement banner */}
          <TopBanner locale={locale} />
          <Header locale={locale} variant="directory" />
          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
          <Footer locale={locale} />
        </div>
        {/* GDPR Cookie Consent Banner */}
        <CookieConsentBanner locale={locale} />
        {/* Exit Intent Popup for newsletter signup */}
        <ExitIntentPopup locale={locale} />
        {/* Sticky bottom banner - appears on scroll */}
        <StickyBottomBanner locale={locale} />
        {/* Feedback ribbon on the right side */}
        <FeedbackRibbon />
      </AdVisibilityProvider>
    </NextIntlClientProvider>
  );
}
