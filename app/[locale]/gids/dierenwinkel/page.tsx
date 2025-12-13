import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, ChevronRight, Tag, Store, Percent, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Dierenwinkel & Aanbiedingen | Beste deals op dierenvoeding",
  description: "Vind de beste aanbiedingen op dierenvoeding en benodigdheden. Vergelijk prijzen bij zooplus, Bol.com en andere topwinkels. Bespaar op hondenvoer en kattenvoer.",
  keywords: "dierenwinkel aanbiedingen, hondenvoer korting, kattenvoer aanbieding, zooplus kortingscode, dierenvoeding deals",
};

// Partner shops - easily extendable for future partnerships
const partnerShops = [
  {
    slug: "zooplus",
    name: "zooplus",
    description: "Europa's grootste online dierenwinkel met scherpe prijzen",
    logoColor: "#FF6600",
    icon: "🛒",
    featured: true,
    articles: [
      {
        slug: "hondenvoer-aanbiedingen-zooplus",
        title: "Hondenvoer Aanbiedingen",
        description: "De beste deals op premium hondenvoer",
        tag: "Populair"
      },
      {
        slug: "hondenvoer-zooplus",
        title: "Hondenvoer Assortiment",
        description: "Compleet overzicht van alle hondenvoer merken"
      },
      {
        slug: "kattenvoer-zooplus",
        title: "Kattenvoer Collectie",
        description: "Premium kattenvoer van topmerken"
      },
      {
        slug: "dierensnacks-zooplus",
        title: "Dierensnacks & Beloningen",
        description: "Gezonde snacks voor honden en katten"
      },
      {
        slug: "dierenbenodigdheden-zooplus",
        title: "Dierenbenodigdheden",
        description: "Van speelgoed tot verzorgingsproducten"
      },
      {
        slug: "dierenapotheken-zooplus",
        title: "Dierenapotheken & Gezondheid",
        description: "Supplementen en gezondheidproducten"
      },
    ]
  },
  // Future partners can be added here:
  // {
  //   slug: "bol-com",
  //   name: "Bol.com",
  //   description: "Nederlands grootste webshop met breed dierenassortiment",
  //   logoColor: "#0000A4",
  //   icon: "📦",
  //   featured: false,
  //   articles: []
  // },
];

export default function DierenwinkelPage() {
  const totalArticles = partnerShops.reduce((acc, shop) => acc + shop.articles.length, 0);

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Dierenwinkel & Aanbiedingen",
            "description": "De beste aanbiedingen op dierenvoeding en benodigdheden",
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
            },
          }),
        }}
      />

      {/* Breadcrumbs */}
      <nav className="bg-muted/30 dark:bg-cpCharcoal/50 border-b border-border dark:border-cpAmber/10">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link href="/nl" className="flex items-center gap-1 text-muted-foreground hover:text-cpCoral transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-muted-foreground/50">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link href="/nl/gids" className="text-muted-foreground hover:text-cpCoral transition-colors">
                Gids
              </Link>
            </li>
            <li className="text-muted-foreground/50">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-foreground dark:text-cpCream font-medium">
              Dierenwinkel & Aanbiedingen
            </li>
          </ol>
        </div>
      </nav>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://cutiepawspedia.com/nl"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gids",
                "item": "https://cutiepawspedia.com/nl/gids"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Dierenwinkel & Aanbiedingen",
                "item": "https://cutiepawspedia.com/nl/gids/dierenwinkel"
              }
            ]
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAmber/10 via-[#FF6600]/5 to-transparent dark:from-cpAmber/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl">
              <ShoppingCart className="w-8 h-8 text-cpAmber" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">
                Dierenwinkel & Aanbiedingen
              </h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{totalArticles} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Vind de beste aanbiedingen op dierenvoeding en benodigdheden bij onze geselecteerde partners.
            Bespaar op premium hondenvoer, kattenvoer en meer.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-background dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm text-muted-foreground dark:text-cpCream/60 py-2">Snel naar:</span>
            {partnerShops.map((shop) => (
              <a
                key={shop.slug}
                href={`#${shop.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: `${shop.logoColor}15`,
                  color: shop.logoColor
                }}
              >
                <span>{shop.icon}</span>
                {shop.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Shops */}
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4 space-y-12">
          {partnerShops.map((shop) => (
            <div key={shop.slug} id={shop.slug} className="scroll-mt-8">
              {/* Shop Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl"
                    style={{ backgroundColor: `${shop.logoColor}15` }}
                  >
                    {shop.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">
                      {shop.name}
                    </h2>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      {shop.description}
                    </p>
                  </div>
                </div>
                {shop.featured && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cpCoral/10 text-cpCoral border border-cpCoral/20">
                    <Percent className="w-3 h-3" />
                    Aanbevelingen
                  </span>
                )}
              </div>

              {/* Shop Articles */}
              <div className="space-y-3">
                {shop.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/nl/gids/dierenwinkel/${article.slug}`}
                    className="group flex items-center justify-between bg-card dark:bg-cpCharcoal/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg"
                        style={{ backgroundColor: `${shop.logoColor}10` }}
                      >
                        <Store className="w-5 h-5" style={{ color: shop.logoColor }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
                            {article.title}
                          </h3>
                          {article.tag && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cpCoral text-white">
                              <Tag className="w-2.5 h-2.5" />
                              {article.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-0.5">
                          {article.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-cpCoral group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Shop CTA */}
              {shop.featured && (
                <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: `${shop.logoColor}30` }}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="font-semibold text-foreground dark:text-cpCream">
                        Direct naar {shop.name}?
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                        Bekijk het volledige assortiment en huidige acties
                      </p>
                    </div>
                    <a
                      href="https://go.cutiepawspedia.com/zooplus.nl"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ backgroundColor: shop.logoColor }}
                    >
                      <span>Naar {shop.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted/50 dark:bg-cpCharcoal/70 py-12 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
            Over onze winkelgidsen
          </h2>
          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground dark:text-cpCream/80">
            <p>
              Bij CutiePawsPedia helpen we je de beste aanbiedingen te vinden voor je huisdier.
              Onze winkelgidsen zijn zorgvuldig samengesteld om je te helpen besparen op kwaliteitsproducten.
            </p>
            <p className="text-xs mt-4 text-muted-foreground/70">
              <strong>Affiliate disclaimer:</strong> Deze pagina bevat affiliate links. Als je via deze links een aankoop doet,
              ontvangen wij een kleine commissie zonder extra kosten voor jou. Dit helpt ons om CutiePawsPedia gratis te houden.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
