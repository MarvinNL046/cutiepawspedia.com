import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Naproxen Giftig voor Honden? | Symptomen & Wat Te Doen",
  description: "Naproxen (Aleve/Naproxen) is zeer giftig voor honden en gevaarlijker dan ibuprofen. Leer de symptomen herkennen en wat te doen bij vermoeden van inname.",
  keywords: "naproxen honden giftig, aleve honden dodelijk, naproxen hond vergiftiging, NSAID honden toxisch, medicijn vergiftiging honden, noodgeval hond, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-naproxen-giftig-voor-honden",
    languages: {
      nl: "/nl/is-naproxen-giftig-voor-honden",
    },
  },
  openGraph: {
    title: "Is Naproxen Giftig voor Honden? | Symptomen & Wat Te Doen",
    description: "Naproxen is zeer giftig voor honden en gevaarlijker dan ibuprofen. Leer de symptomen herkennen en wat te doen bij vermoeden van inname.",
    url: "/nl/is-naproxen-giftig-voor-honden",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function NaproxenHondenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Is Naproxen Giftig voor Honden? Symptomen & Wat Te Doen",
            description: "Naproxen (Aleve, Naproxen Teva) is zeer giftig voor honden en gevaarlijker dan ibuprofen. De lange halfwaardetijd (35+ uur bij honden) leidt tot ernstige gezondheidsproblemen. Zelfs kleine hoeveelheden kunnen gevaarlijk zijn voor honden.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: "2025-12-15",
            dateModified: "2025-12-15",
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is naproxen giftig voor honden?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, naproxen is zeer giftig voor honden en gevaarlijker dan ibuprofen. Naproxen heeft een halfwaardetijd van 35+ uur bij honden (versus 12-15 uur bij mensen), wat betekent dat het veel langer in het lichaam blijft. Dit kan leiden tot ernstige gezondheidsproblemen zoals maagschade en nierproblemen.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn hond naproxen inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Naproxen veroorzaakt ernstige maagzweren en perforatie (gaten in de maag), acuut nierfalen, leverschade en bloedingsstoornissen. Symptomen zijn bloederig braken, zwarte diarree, extreme buikpijn, lethargie en shockverschijnselen. Zonder snelle behandeling is de prognose zeer slecht.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn hond naproxen heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ONMIDDELLIJK - dit is een levensbedreigende noodsituatie. Naproxenvergiftiging is een van de gevaarlijkste NSAID-vergiftigingen bij honden. Elke seconde telt. Bel direct je dierenarts of spoedkliniek en ga onmiddellijk onderweg.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik mijn hond naproxen geven tegen pijn?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NEE, ABSOLUUT NIET. Naproxen mag NOOIT aan honden gegeven worden. Er is geen veilige dosering. Gebruik alleen door de dierenarts voorgeschreven pijnstillers zoals Carprofen (Rimadyl), Meloxicam (Metacam) of Firocoxib (Previcox).",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik naproxenvergiftiging bij mijn hond?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar naproxen (Aleve, Naproxen Teva) in afgesloten kastjes buiten bereik. Let op: één Aleve-tablet (220mg) kan dodelijk zijn voor kleine honden. Geef NOOIT menselijke pijnstillers aan honden. Gebruik alleen veterinaire medicijnen.",
                },
              },
            ],
          }),
        }}
      />

      {/* EMERGENCY Hero Section - Maximum Alert */}
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-950 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">Zeer gevaarlijk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Is Naproxen Giftig voor Honden?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - zeer giftig en gevaarlijker dan ibuprofen
            </p>
            <p className="text-lg text-red-100">
              Naproxen (Aleve) is gevaarlijker dan ibuprofen. Zelfs kleine hoeveelheden kunnen problemen veroorzaken!
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR Verdict */}
      <section className="bg-red-950 border-y-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="bg-gradient-to-br from-red-950 to-red-900 rounded-2xl p-6 border-2 border-red-500 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-3">
                  Direct antwoord: Zeer giftig
                </h2>
                <div className="space-y-2 text-red-50">
                  <p className="font-bold text-lg">
                    ✗ Gevaarlijker dan ibuprofen - langere halfwaardetijd (35+ uur)
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Zelfs kleine hoeveelheden kunnen ernstige vergiftiging veroorzaken
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt maagperforatie en nierfalen
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Zeer hoge mortaliteit zonder onmiddellijke behandeling
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    BEL NU DE DIERENARTS - ELKE SECONDE TELT!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb with JSON-LD Schema */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Naproxen voor Honden"
          />

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border-l-4 border-orange-500 mb-12 not-prose">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6 text-orange-600" />
                Spoednummers - BEL NU!
              </h3>
              <div className="space-y-3 text-foreground dark:text-cpCream">
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">📞 Je eigen dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Direct bellen - zij kennen je hond</p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🚑 Dierennoodhulp Nederland</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">24/7 spoedlijn: zoek "dierenarts spoed [stad]"</p>
                </div>
              </div>
              <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-400">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  ⏱️ Snelle actie belangrijk: behandeling moet zo snel mogelijk starten voor de beste resultaten
                </p>
              </div>
            </div>

            {/* Why Dangerous */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom is Naproxen ZO Gevaarlijk voor Honden?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Naproxen (merknamen: Aleve, Naproxen Teva, Naprosyne) is een NSAID dat wordt gebruikt bij mensen voor pijn en ontstekingen. Voor honden is het <strong className="text-red-600 dark:text-red-400">een van de gevaarlijkste NSAID's</strong> - gevaarlijker dan ibuprofen of aspirine.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Het grote probleem is de <strong>extreem lange halfwaardetijd</strong> bij honden: <strong className="text-red-600 dark:text-red-400">35+ uur</strong> (versus 12-15 uur bij mensen). Dit betekent dat naproxen dagenlang in het lichaam blijft circuleren, continu schade toebrengt en zich ophoopt tot dodelijke niveaus.
            </p>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Waarom Naproxen Gevaarlijker is dan Andere NSAID's
              </h4>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Langste halfwaardetijd:</strong> 35+ uur bij honden vs. 4-6 uur voor ibuprofen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Hogere potentie:</strong> Krachtiger NSAID-effect = meer schade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Lagere veilige marge:</strong> Geen therapeutische vs. toxische marge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Snellere maagschade:</strong> Ernstigere ulcera en perforatie</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-950 text-red-50 rounded-2xl p-6 border-2 border-red-500 mb-12 not-prose">
              <h4 className="font-black text-white mb-3 text-xl">
                ⚠️ Gevaarlijke hoeveelheden naproxen
              </h4>
              <p className="mb-4 text-lg">
                <strong>1 Aleve-tablet (220mg) kan dodelijk zijn voor:</strong>
              </p>
              <div className="bg-red-900 rounded-lg p-4 mb-3">
                <ul className="space-y-2">
                  <li>• <strong>Kleine hond (5kg):</strong> Zeer hoog risico op overlijden</li>
                  <li>• <strong>Middelgrote hond (15kg):</strong> Ernstige vergiftiging</li>
                  <li>• <strong>Grote hond (30kg):</strong> Significante toxiciteit</li>
                </ul>
              </div>
              <p className="text-sm font-bold text-red-200 bg-red-800 rounded p-3">
                ⚠️ Er is GEEN veilige dosering voor honden. Geef NOOIT naproxen aan honden!
              </p>
            </div>

            {/* What Happens */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Hond?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🫀 1. Maagperforatie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Naproxen veroorzaakt zeer ernstige maagzweren die kunnen perforeren (gaten in maagwand). Dit leidt tot peritonitis en septische shock.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Sneller en ernstiger dan bij ibuprofen
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🫘 2. Acuut Nierfalen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Verminderde bloedstroom naar nieren leidt tot acuut nierfalen. Toxines stapelen zich op in het bloed.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Vaak blijvende nierschade
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🩸 3. Bloedingsstoornissen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Remming van bloedplaatjes leidt tot spontane bloedingen - maag, darmen, longen, hersenen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Inwendige bloedingen vaak fataal
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🧠 4. Neurologische Schade
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bij ernstige vergiftiging: stuipen, coma, hersenb bloedingen door lange circulatieduur.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Tekenen van levensbedreigende fase
                </p>
              </div>
            </div>

            {/* Symptoms */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Naproxenvergiftiging
            </h2>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  Eerste 2-6 Uur: Acute Fase
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Braken</strong> (vaak bloederig, koffiedik-achtig)</li>
                  <li>• <strong>Extreme buikpijn</strong> - hond jammert, gekromde houding</li>
                  <li>• <strong>Zwarte diarree</strong> (teken van bloedingen)</li>
                  <li>• <strong>Lethargie en zwakte</strong></li>
                  <li>• <strong>Weigert te eten of drinken</strong></li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 border-l-4 border-red-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  12-24 Uur: Orgaanfalen
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Geen urineproductie</strong> (nierfalen)</li>
                  <li>• <strong>Bleke of gele tandvlees</strong></li>
                  <li>• <strong>Snelle hartslag, zwakke pols</strong></li>
                  <li>• <strong>Koude ledematen</strong> (shock)</li>
                  <li>• <strong>Desoriëntatie, stuipen</strong></li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-transparent border-l-4 border-gray-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  24+ Uur: Levensbedreigende Fase
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• <strong>Coma, bewusteloosheid</strong></li>
                  <li>• <strong>Multi-orgaanfalen</strong></li>
                  <li>• <strong>Overlijden</strong> (zeer hoog risico zonder intensieve zorg)</li>
                </ul>
              </div>
            </div>

            {/* What To Do */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen - ONMIDDELLIJKE ACTIE
            </h2>

            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 border-2 border-red-500 not-prose">
              <h3 className="text-2xl font-black mb-6 uppercase">NOODPROTOCOL:</h3>

              <div className="space-y-4">
                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">1</span>
                    BEL NU - ELKE SECONDE TELT
                  </h4>
                  <p className="text-red-100">"Mijn hond heeft naproxen/Aleve ingenomen - NOODSITUATIE"</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">2</span>
                    GA ONMIDDELLIJK ONDERWEG
                  </h4>
                  <p className="text-red-100">Rijd direct naar dierenarts. Neem verpakking en tijdstip inname mee.</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    GEEN THUISBEHANDELING
                  </h4>
                  <p className="text-red-100">Wek NIET zelf braken op. Intensive veterinaire zorg is vereist.</p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg">
                  ⚠️ OVERLEVINGSKANS HANGT AF VAN SNELHEID VAN BEHANDELING
                </p>
                <p className="text-yellow-200">Binnen 30-60 minuten: goede kans. Na 4+ uur: zeer slecht.</p>
              </div>
            </div>

            {/* Prevention */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              🛡️ Preventie: Bescherm Je Hond
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  🔒 Veilige Opslag
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Bewaar Aleve/naproxen in afgesloten kastjes</li>
                  <li>• Laat NOOIT tabletten rondslingeren</li>
                  <li>• Check handtassen van gasten (veel mensen hebben Aleve bij zich)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  🚫 NOOIT Geven
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Naproxen mag NOOIT aan honden</li>
                  <li>• Gevaarlijker dan ibuprofen of aspirine</li>
                  <li>• Geen enkele veterinaire indicatie</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  💊 Veilige Alternatieven
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Carprofen (Rimadyl)</li>
                  <li>• Meloxicam (Metacam)</li>
                  <li>• Firocoxib (Previcox)</li>
                  <li>• Grapiprant (Galliprant)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  ⚠️ Waarschuw Anderen
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Informeer huisgenoten en gasten</li>
                  <li>• Leg uit dat Aleve dodelijk is voor honden</li>
                  <li>• Bewaar medicijnen altijd veilig weg</li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 mt-16">
              ❓ Veelgestelde Vragen
            </h2>

            <div className="space-y-4 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Waarom is naproxen gevaarlijker dan ibuprofen voor honden?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Naproxen heeft een veel langere halfwaardetijd</strong> (35+ uur vs. 4-6 uur voor ibuprofen) en is krachtiger. Dit betekent dat het langer in het lichaam blijft, meer schade aanricht en moeilijker te behandelen is. De toxische effecten zijn ernstiger en sneller.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn hond heeft 1 Aleve-tablet (220mg) gegeten. Wat nu?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong className="text-red-600 dark:text-red-400">BEL ONMIDDELLIJK DE DIERENARTS.</strong> Één Aleve kan dodelijk zijn, vooral voor kleine/middelgrote honden. Ga direct onderweg naar spoedkliniek. Dit is een levensbedreigende noodsituatie.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan mijn hond herstellen van naproxenvergiftiging?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Alleen met zeer snelle en intensieve behandeling.</strong> De prognose is slecht bij vertraagde behandeling. Permanente nierschade en maagproblemen komen vaak voor. Vroege interventie (binnen 30-60 minuten) is cruciaal voor overleving.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Hoelang moet mijn hond in het ziekenhuis blijven?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Door de lange halfwaardetijd is <strong>48-96 uur intensieve zorg</strong> vaak nodig. Continue monitoring van nierfunctie, maagschade en bloedwaarden is essentieel. Sommige honden hebben wekenlange nazorg nodig.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van naproxenvergiftiging moet je ONMIDDELLIJK contact opnemen met een dierenarts. Dit is een levensbedreigende noodsituatie. Bij twijfel: bel altijd je dierenarts.
              </p>
            </div>

            {/* Safe Food Alternatives */}
            <RelatedSafeFoods
              locale="nl"
              animal="honden"
              foods={commonSafeFoods}
              title="Veilige snack alternatieven"
            />
          </div>
        </div>
      </article>
    </>
  );
}
