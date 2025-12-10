import type { Metadata } from "next";
import Link from "next/link";
import { Book, ChevronRight, Dog, Cat, Heart, Stethoscope, UtensilsCrossed, GraduationCap, Briefcase, Plane, Baby, Clock, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Huisdier Gids | Complete verzorgingsgidsen voor honden en katten",
  description: "Ontdek alles over huisdierverzorging: van voeding en gezondheid tot training en gedrag. Praktische tips en advies voor hondenbaasjes en kattenliefhebbers.",
  keywords: "huisdier gids, hondenverzorging, kattenverzorging, huisdier tips, dierengezondheid, huisdier training",
  openGraph: {
    title: "Huisdier Gids | CutiePawsPedia",
    description: "Complete verzorgingsgidsen voor honden en katten. Van puppy tot senior, alles wat je moet weten.",
    type: "website",
  },
};

const pillars = [
  {
    slug: "hondenverzorging",
    title: "Hondenverzorging",
    description: "Alles over het verzorgen van je hond: vachtverzorging, nagels knippen, tanden poetsen en meer.",
    icon: Dog,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "kattenverzorging",
    title: "Kattenverzorging",
    description: "Complete gids voor kattenverzorging: van kattenbak training tot vachtverzorging.",
    icon: Cat,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "dierengezondheid",
    title: "Dierengezondheid",
    description: "Belangrijke informatie over vaccinaties, preventie en wanneer naar de dierenarts.",
    icon: Stethoscope,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "huisdiervoeding",
    title: "Huisdiervoeding",
    description: "Het beste voer voor je huisdier: van premium brokken tot BARF-diëten.",
    icon: UtensilsCrossed,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "huisdiertraining",
    title: "Huisdiertraining",
    description: "Effectieve trainingsmethoden voor puppy's en volwassen honden.",
    icon: GraduationCap,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "professionele-diensten",
    title: "Professionele Diensten",
    description: "Hoe vind je de beste dierenarts, trimsalon of hondenuitlaatservice?",
    icon: Briefcase,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "reizen-met-huisdieren",
    title: "Reizen met Huisdieren",
    description: "Tips voor reizen met je hond of kat, van autoreizen tot vliegreizen.",
    icon: Plane,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "puppies-kittens",
    title: "Puppies & Kittens",
    description: "Alles voor nieuwe baasjes: van aanschaf tot de eerste weken thuis.",
    icon: Baby,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "senior-huisdieren",
    title: "Senior Huisdieren",
    description: "Speciale zorg voor oudere honden en katten, inclusief gezondheidsadvies.",
    icon: Clock,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "huisdiergedrag",
    title: "Huisdiergedrag",
    description: "Begrijp en verbeter het gedrag van je huisdier met onze expertgidsen.",
    icon: Brain,
    color: "cpCoral",
    articles: 5,
  },
];

export default function GidsPage() {
  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Huisdier Gids",
            "description": "Complete verzorgingsgidsen voor honden en katten",
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Book className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">50+ Artikelen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              De Complete <span className="gradient-text-coral">Huisdier Gids</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Praktische tips en deskundig advies voor de beste zorg voor je hond of kat.
              Van puppy tot senior, wij helpen je bij elke stap.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-background dark:bg-cpCharcoal py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.slug}
                  href={`/nl/gids/${pillar.slug}`}
                  className="group bg-card dark:bg-cpCharcoal/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${pillar.color}/10 mb-4`}>
                    <Icon className={`w-6 h-6 text-${pillar.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-muted-foreground dark:text-cpCream/70 text-sm mb-4">
                    {pillar.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cpCoral font-medium">{pillar.articles} artikelen</span>
                    <ChevronRight className="w-5 h-5 text-cpCoral group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cpCoral/5 dark:bg-cpCoral/10 py-16 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Heart className="w-12 h-12 text-cpCoral mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Vind de beste zorg voor je huisdier
          </h2>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-8 max-w-2xl mx-auto">
            Naast onze gidsen kun je ook direct de beste dierenartsen, trimsalons en andere
            huisdierservices in jouw omgeving vinden.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
          >
            Bekijk alle huisdierservices
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
