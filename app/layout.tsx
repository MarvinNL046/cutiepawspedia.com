import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";

// AdSense configuration
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Microsoft Clarity configuration
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * PERFORMANCE: Viewport configuration for mobile optimization
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Primary font - distinctive sans-serif
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap", // Explicit font-display for CLS prevention
  preload: true,
});

// Display font for headings - editorial contrast
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap", // Explicit font-display for CLS prevention
  preload: true,
});

export const metadata: Metadata = {
  title: "CutiePawsPedia - Your Ultimate Pet Directory",
  description: "Discover everything about pets. The comprehensive pet directory for pet lovers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = `${jakarta.variable} ${dmSerif.variable} min-h-screen bg-background text-foreground font-sans antialiased`;

  /**
   * PERFORMANCE: Preconnect links for external resources
   * - Establishes early connections to reduce latency
   * - Improves LCP for pages using Mapbox maps
   */
  const preconnectLinks = (
    <head>
      {/* Impact Radius affiliate verification */}
      <meta name="impact-site-verification" content="d42c3876-e6c1-4548-8e00-7e6c6886b0df" />
      {/* Mapbox API - used for static maps */}
      <link rel="preconnect" href="https://api.mapbox.com" />
      <link rel="dns-prefetch" href="https://api.mapbox.com" />
      {/* Mapbox tiles */}
      <link rel="preconnect" href="https://tiles.mapbox.com" />
      <link rel="dns-prefetch" href="https://tiles.mapbox.com" />
      {/* Google AdSense - preconnect for ad loading performance */}
      {ADS_ENABLED && ADSENSE_CLIENT && (
        <>
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
          <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        </>
      )}
    </head>
  );

  /**
   * Google AdSense script - only loaded if ads are enabled
   * Uses afterInteractive strategy for non-blocking load
   */
  const adsenseScript = ADS_ENABLED && ADSENSE_CLIENT && (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );

  /**
   * Google Analytics 4 script
   * Uses afterInteractive strategy for non-blocking load
   */
  const ga4Script = GA_MEASUREMENT_ID && (
    <>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );

  /**
   * Microsoft Clarity script
   * Heatmaps and session recordings
   */
  const clarityScript = CLARITY_PROJECT_ID && (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `,
      }}
    />
  );

  // Only wrap with StackProvider if configured
  if (stackServerApp) {
    return (
      <html lang="en" suppressHydrationWarning>
        {preconnectLinks}
        <body className={bodyClasses} suppressHydrationWarning>
          {ga4Script}
          {clarityScript}
          {adsenseScript}
          <ThemeProvider>
            <StackProvider app={stackServerApp}>
              <StackTheme>
                {children}
              </StackTheme>
            </StackProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      {preconnectLinks}
      <body className={bodyClasses}>
        {ga4Script}
        {clarityScript}
        {adsenseScript}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
