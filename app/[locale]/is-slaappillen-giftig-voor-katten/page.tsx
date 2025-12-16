import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Zijn Slaappillen Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Slaappillen (benzodiazepinen, zolpidem) zijn gevaarlijk voor katten en veroorzaken vaak paradoxale agitatie en ademhalingsproblemen. Leer symptomen en wat te doen bij inname.",
  keywords: "slaappillen katten giftig, benzodiazepinen kat, zolpidem kat gevaarlijk, temazepam kat vergiftiging, medicijn vergiftiging katten, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-slaappillen-giftig-voor-katten",
    languages: {
      nl: "/nl/is-slaappillen-giftig-voor-katten",
    },
  },
  openGraph: {
    title: "Zijn Slaappillen Giftig voor Katten? | Symptomen & Wat Te Doen",
    description: "Slaappillen zijn gevaarlijk voor katten en veroorzaken paradoxale agitatie, ademhalingsproblemen en mogelijk coma. Onmiddellijke veterinaire zorg is noodzakelijk.",
    url: "/nl/is-slaappillen-giftig-voor-katten",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function SlaappillenKattenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zijn Slaappillen Giftig voor Katten? Gevaarlijk - Veterinaire Hulp Vereist",
            description: "Slaappillen (benzodiazepinen zoals temazepam, oxazepam, en Z-drugs zoals zolpidem) zijn gevaarlijk voor katten. In plaats van kalmering veroorzaken ze vaak paradoxale agitatie, desoriëntatie, ademhalingsdepressie en in ernstige gevallen coma. Katten metaboliseren deze medicijnen langzamer dan mensen.",
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
                name: "Zijn slaappillen giftig voor katten?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, slaappillen zijn gevaarlijk voor katten. Benzodiazepinen (temazepam, oxazepam) en Z-drugs (zolpidem, zopiclone) veroorzaken vaak paradoxale reacties bij katten - in plaats van kalmering ontstaat juist extreme agitatie en desoriëntatie. Daarnaast kunnen ze ademhalingsdepressie, lage lichaamstemperatuur en coma veroorzaken.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn kat slaappillen inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Binnen 30 minuten tot 2 uur ontstaan symptomen zoals paradoxale agitatie (extreme onrust in plaats van slaperigheid), desoriëntatie, ataxie (wankelende gang), speekselen, braken, verminderde ademhaling en in ernstige gevallen coma en hypothermie (lage lichaamstemperatuur). Katten reageren anders dan mensen op deze medicijnen.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn kat slaappillen heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Neem onmiddellijk contact op met je dierenarts. Slaappillen-vergiftiging vereist professionele veterinaire zorg. Paradoxale reacties kunnen gevaarlijk zijn en ademhalingsdepressie vereist monitoring. Snelle behandeling verbetert de uitkomst aanzienlijk.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik mijn kat een slaappil geven om te kalmeren?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nee, geef nooit menselijke slaappillen aan katten. Katten reageren vaak tegenovergesteld (paradoxale agitatie) en kunnen ademhalingsproblemen en coma ontwikkelen. Gebruik alleen door de dierenarts voorgeschreven kalmerende medicijnen voor katten.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik slaappillen-vergiftiging bij mijn kat?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar alle slaappillen in afgesloten medicijnkastjes buiten bereik van katten. Laat geen pillen op nachtkastjes liggen (katten kunnen er makkelijk bij). Informeer huisgenoten en gasten dat katten nooit menselijke slaap- of kalmeringsmiddelen mogen krijgen.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-orange-800 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Slaappillen voor Katten"
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">GEVAARLIJK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Zijn Slaappillen Giftig voor Katten?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - Gevaarlijk voor katten
            </p>
            <p className="text-lg text-red-100">
              Slaappillen veroorzaken vaak paradoxale agitatie en ademhalingsproblemen bij katten in plaats van kalmering.
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR Verdict */}
      <section className="bg-red-950 border-y-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-6 border-2 border-red-500 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-3">
                  Direct antwoord: Gevaarlijk giftig
                </h2>
                <div className="space-y-2 text-red-50">
                  <p className="font-bold text-lg">
                    ✗ Paradoxale reactie: extreme agitatie in plaats van kalmering
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Benzodiazepinen en Z-drugs zijn gevaarlijk voor katten
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt ademhalingsdepressie en hypothermie
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Kan leiden tot coma en overlijden
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    Bij inname: Neem direct contact op met je dierenarts
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
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border-l-4 border-orange-500 mb-12 not-prose">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6 text-orange-600" />
                Spoednummers
              </h3>
              <div className="space-y-3 text-foreground dark:text-cpCream">
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">📞 Je eigen dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Direct bellen bij slaappillen-inname</p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🚑 Dierennoodhulp Nederland</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">24/7 spoedlijn: zoek "dierenarts spoed [stad]"</p>
                </div>
              </div>
              <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-400">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  Belangrijk: Paradoxale reacties kunnen ernstig zijn - onmiddellijke veterinaire hulp is noodzakelijk
                </p>
              </div>
            </div>

            {/* Why Dangerous */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom zijn Slaappillen Gevaarlijk voor Katten?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Slaappillen zijn een gevaarlijke categorie medicijnen voor katten, vooral omdat katten <strong className="text-red-600 dark:text-red-400">vaak tegenovergesteld reageren</strong> dan mensen. Waar deze medicijnen bij mensen slaperigheid veroorzaken, kunnen ze bij katten juist leiden tot extreme onrust en agitatie.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/10 rounded-2xl p-6 border-l-4 border-blue-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                Veelvoorkomende Slaappillen (Gevaarlijk voor Katten)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream mb-2">Benzodiazepinen:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Temazepam (Normison)</li>
                    <li>• Oxazepam (Seresta)</li>
                    <li>• Diazepam (Valium)</li>
                    <li>• Lorazepam (Temesta)</li>
                    <li>• Alprazolam (Xanax)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream mb-2">Z-drugs & Andere:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Zolpidem (Stilnoct)</li>
                    <li>• Zopiclone (Imovane)</li>
                    <li>• Eszopiclone</li>
                    <li>• Zaleplon (Sonata)</li>
                    <li>• Antihistaminica (Difenhydramine)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Paradoxical Reaction */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/10 rounded-2xl p-6 border-l-4 border-orange-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                🔄 Paradoxale Reactie bij Katten
              </h4>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Wat is het?</strong> In plaats van kalmering veroorzaken slaappillen vaak het <strong>tegenovergestelde effect</strong> bij katten.
              </p>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">⚠️</span>
                  <span><strong>Extreme agitatie:</strong> Kat wordt hyperactief, agressief, angstig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">⚠️</span>
                  <span><strong>Desoriëntatie:</strong> Herkent omgeving en eigenaar niet meer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">⚠️</span>
                  <span><strong>Gevaarlijk gedrag:</strong> Kan zichzelf of anderen verwonden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">⚠️</span>
                  <span><strong>Onvoorspelbaar:</strong> Zelfs lage doses kunnen dit veroorzaken</span>
                </li>
              </ul>
            </div>

            {/* What Happens */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Kat?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🧠 1. Paradoxale CNS-stimulatie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  In plaats van kalmering stimuleren benzodiazepinen het centrale zenuwstelsel bij katten, wat leidt tot extreme agitatie en desoriëntatie.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Komt voor bij 30-50% van katten
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🫁 2. Ademhalingsdepressie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bij hogere doses remmen slaappillen het ademhalingscentrum, wat leidt tot langzame, ondiepe ademhaling en zuurstoftekort.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Levensbedreigende complicatie
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🌡️ 3. Hypothermie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Slaappillen verlagen de lichaamstemperatuur bij katten, wat kan leiden tot gevaarlijk lage temperaturen ({'<'}36°C).
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Verergert bij langdurige blootstelling
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🧠 4. Neurologische Depressie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bij ernstige vergiftiging: ataxie, lethargie, coma. Katten kunnen niet meer lopen of eten.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Vereist intensieve ondersteunende zorg
                </p>
              </div>
            </div>

            {/* Symptoms */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Slaappillen-vergiftiging
            </h2>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  Vroege symptomen: Paradoxale fase
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Extreme agitatie</strong> (hyperactief, angstig, agressief)</li>
                  <li>• <strong>Desoriëntatie</strong> (herkent omgeving niet meer)</li>
                  <li>• <strong>Vocalisatie</strong> (overmatig miauwen, jammeren)</li>
                  <li>• <strong>Ataxie</strong> (wankelende gang, kan niet rechtop blijven)</li>
                  <li>• <strong>Verwijde pupillen</strong></li>
                  <li>• <strong>Hypersalivatie</strong> (overmatig kwijlen)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 border-l-4 border-red-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  Latere symptomen: Depressie fase
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Extreme lethargie</strong> (kan niet meer bewegen)</li>
                  <li>• <strong>Verminderde ademhaling</strong> (langzaam, ondiep)</li>
                  <li>• <strong>Hypothermie</strong> (koude oren, poten, neus)</li>
                  <li>• <strong>Braken of speekselen</strong></li>
                  <li>• <strong>Verminderde reflexen</strong></li>
                  <li>• <strong>Kan niet meer eten of drinken</strong></li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-transparent border-l-4 border-gray-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Ernstige symptomen zonder behandeling
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• <strong>Coma</strong> (geen reactie op prikkels)</li>
                  <li>• <strong>Ernstige ademhalingsdepressie</strong></li>
                  <li>• <strong>Kritisch lage lichaamstemperatuur</strong></li>
                  <li>• <strong>Levensbedreigende situatie</strong> zonder veterinaire interventie</li>
                </ul>
              </div>
            </div>

            {/* What To Do */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen Bij Slaappillen-inname
            </h2>

            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 border-2 border-red-500 not-prose">
              <h3 className="text-2xl font-black mb-6">Wat te doen bij inname:</h3>

              <div className="space-y-4">
                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">1</span>
                    Neem direct contact op met je dierenarts
                  </h4>
                  <p className="text-red-100">"Mijn kat heeft slaappillen ingenomen" - vertel type medicijn en hoeveelheid</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">2</span>
                    Veiligheid eerst
                  </h4>
                  <p className="text-red-100">Bij paradoxale agitatie: bescherm jezelf en je kat. Gebruik deken om veilig vast te houden.</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    Ga onmiddellijk naar de dierenarts
                  </h4>
                  <p className="text-red-100">Neem verpakking mee. Bij ademhalingsproblemen is zeer snelle hulp noodzakelijk.</p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg">
                  Paradoxale reacties kunnen onvoorspelbaar zijn
                </p>
                <p className="text-yellow-200">Zelfs kleine hoeveelheden kunnen extreme agitatie veroorzaken. Snelle behandeling verbetert de prognose aanzienlijk.</p>
              </div>
            </div>

            {/* Prevention */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              🛡️ Preventie
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  🔒 Veilige Opslag
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• NOOIT slaappillen op nachtkastje laten liggen</li>
                  <li>• Bewaar in afgesloten medicijnkastje</li>
                  <li>• Katten kunnen pillen van nachtkastje af duwen en eten</li>
                  <li>• Let op gasten die medicijnen meenemen</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  🚫 NOOIT Kalmerend Bedoeld
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Geef NOOIT menselijke slaappillen aan katten</li>
                  <li>• Zelfs niet "voor transport" of "om te kalmeren"</li>
                  <li>• Paradoxale reactie maakt situatie erger</li>
                  <li>• Vraag dierenarts om veilige alternatieven</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  💊 Veilige Alternatieven voor Katten
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Gabapentine</strong> - voor transport/dierenarts bezoek</li>
                  <li>• <strong>Feliway</strong> - feromoon spray voor stress</li>
                  <li>• <strong>Zylkène</strong> - natuurlijk kalmerend supplement</li>
                  <li>• Alleen gebruiken zoals voorgeschreven</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  👥 Waarschuw Huisgenoten
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Informeer iedereen over gevaar slaappillen</li>
                  <li>• Leg uit dat katten anders reageren dan mensen</li>
                  <li>• Vraag gasten medicijnen veilig weg te bergen</li>
                  <li>• Check regelmatig of pillen veilig opgeborgen zijn</li>
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
                  Waarom reageren katten anders op slaappillen dan mensen?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Katten hebben een ander GABA-receptorsysteem</strong> dan mensen. Benzodiazepinen werken op GABA-receptoren, maar bij katten kan dit leiden tot stimulatie in plaats van remming van het zenuwstelsel. Dit verklaart de paradoxale agitatie. Daarnaast metaboliseren katten deze medicijnen langzamer, wat de effecten versterkt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn kat heeft een halve temazepam (10mg) gegeten. Wat nu?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Neem onmiddellijk contact op met je dierenarts. Zelfs deze hoeveelheid kan paradoxale agitatie of ademhalingsdepressie veroorzaken bij katten. Snelle behandeling kan ernstige symptomen helpen voorkomen. Wacht niet op symptomen voordat je contact opneemt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan ik mijn kat een slaappil geven voor een lange autorit?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Nee, dit is niet veilig. Dit kan paradoxale agitatie veroorzaken, wat de autorit nog stressvoller maakt en gevaarlijk kan zijn. Vraag je dierenarts om <strong>gabapentine</strong> - dit is veiliger voor katten en specifiek voor transportstress. Of gebruik Feliway spray in de reisbench.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Hoelang duren de effecten van slaappillen bij katten?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Door het langzame metabolisme bij katten kunnen effecten <strong>12-24 uur aanhouden</strong>, soms langer. Benzodiazepinen hebben een halfwaardetijd van 20-40 uur bij katten (versus 8-15 uur bij mensen). Je kat kan dus dagenlang symptomen vertonen en heeft mogelijk verlengde monitoring nodig.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan mijn kat herstellen van slaappillen-vergiftiging?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Ja, met goede ondersteunende zorg</strong> kunnen de meeste katten volledig herstellen. Behandeling bestaat uit: decontaminatie (binnen 1-2 uur), ondersteunende zorg (warmte, vloeistoffen), monitoring van ademhaling en lichaamstemperatuur. Bij ademhalingsdepressie kan zuurstoftherapie nodig zijn. Prognose is goed met snelle behandeling.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van slaappillen-vergiftiging moet je ALTIJD onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Paradoxale reacties kunnen onvoorspelbaar en gevaarlijk zijn. Bij twijfel: bel altijd je dierenarts.
              </p>
            </div>

            <div className="not-prose mt-8">
              <RelatedSafeFoods
                locale="nl"
                animal="katten"
                foods={commonSafeFoods}
                title="Veilige snack alternatieven"
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
