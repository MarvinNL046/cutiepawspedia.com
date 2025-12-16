import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Zijn Antidepressiva Giftig voor Honden? | Symptomen & Wat Te Doen",
  description: "Menselijke antidepressiva (SSRI's, TCA's) zijn giftig voor honden. Leer de symptomen herkennen van serotoninesyndroom en wat te doen bij vermoeden van inname.",
  keywords: "antidepressiva honden giftig, SSRI honden vergiftiging, sertraline hond, fluoxetine hond, serotoninesyndroom honden, medicijn vergiftiging honden, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-antidepressiva-giftig-voor-honden",
    languages: {
      nl: "/nl/is-antidepressiva-giftig-voor-honden",
    },
  },
  openGraph: {
    title: "Zijn Antidepressiva Giftig voor Honden? | Symptomen & Wat Te Doen",
    description: "Menselijke antidepressiva zijn giftig voor honden en veroorzaken serotoninesyndroom en neurologische symptomen. Leer de symptomen herkennen en wat te doen.",
    url: "/nl/is-antidepressiva-giftig-voor-honden",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function AntidepressivaHondenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zijn Antidepressiva Giftig voor Honden? Symptomen & Wat Te Doen",
            description: "Menselijke antidepressiva (SSRI's zoals Sertraline/Zoloft, Fluoxetine/Prozac, en TCA's) zijn giftig voor honden. Ze veroorzaken serotoninesyndroom met tremoren, stuipen en hartritmestoornissen. Snelle veterinaire hulp is belangrijk.",
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
                name: "Zijn antidepressiva giftig voor honden?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, menselijke antidepressiva zijn giftig voor honden. SSRI's (zoals sertraline, fluoxetine), SNRI's en tricyclische antidepressiva kunnen serotoninesyndroom veroorzaken met symptomen zoals tremoren, stuipen, koorts en hartritmestoornissen. Honden zijn gevoeliger voor deze medicijnen dan mensen.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn hond antidepressiva inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Binnen 30 minuten tot 6 uur ontstaat serotoninesyndroom met symptomen zoals tremoren (beven), rusteloosheid, verwijde pupillen, snelle hartslag, koorts, braken, diarree en in ernstige gevallen stuipen en coma. Bij TCA's kunnen ook hartritmestoornissen en bloeddrukproblemen optreden.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn hond antidepressiva heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Onmiddellijk. Antidepressiva-vergiftiging vereist altijd professionele veterinaire hulp. Bel direct je dierenarts of spoedkliniek. Symptomen kunnen snel escaleren. Snelle actie is belangrijk.",
                },
              },
              {
                "@type": "Question",
                name: "Kunnen honden antidepressiva krijgen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, sommige honden krijgen antidepressiva voorgeschreven door dierenarts voor angst of gedragsproblemen. Maar dit zijn speciale veterinaire doseringen van medicijnen zoals fluoxetine of clomipramine, nauwkeurig berekend voor honden. Geef NOOIT menselijke doseringen zonder veterinair voorschrift.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik antidepressiva-vergiftiging bij mijn hond?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar alle antidepressiva in afgesloten medicijnkastjes buiten bereik. Veel honden vinden pillen aantrekkelijk (sommige hebben zoete coating). Neem gemorste pillen direct op. Informeer huisgenoten dat menselijke doseringen gevaarlijk zijn voor honden.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-orange-800 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">GEVAARLIJK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Zijn Antidepressiva Giftig voor Honden?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - gevaarlijk giftig
            </p>
            <p className="text-lg text-red-100">
              Menselijke antidepressiva veroorzaken serotoninesyndroom en neurologische symptomen bij honden.
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
                  Direct antwoord: Giftig
                </h2>
                <div className="space-y-2 text-red-50">
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt serotoninesyndroom (tremoren, koorts, stuipen)
                  </p>
                  <p className="font-bold text-lg">
                    ✗ SSRI's (Sertraline, Fluoxetine) en TCA's zijn zeer giftig
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Symptomen binnen 30 minuten tot 6 uur
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Kan leiden tot hartritmestoornissen en coma
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    BIJ INNAME: BEL DIRECT DE DIERENARTS
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
            currentPage="Antidepressiva voor Honden"
          />

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
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Direct bellen bij antidepressiva-inname</p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🚑 Dierennoodhulp Nederland</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">24/7 spoedlijn: zoek "dierenarts spoed [stad]"</p>
                </div>
              </div>
              <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-400">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  ⏱️ BELANGRIJK: Serotoninesyndroom kan snel escaleren - vroege behandeling essentieel
                </p>
              </div>
            </div>

            {/* Why Dangerous */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom zijn Antidepressiva Gevaarlijk voor Honden?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Antidepressiva zijn een gevaarlijke categorie medicijnen voor honden, vooral <strong>SSRI's</strong> (Selective Serotonin Reuptake Inhibitors) en <strong>TCA's</strong> (Tricyclische Antidepressiva). Honden zijn gevoeliger voor deze medicijnen dan mensen en kunnen ernstige bijwerkingen ontwikkelen bij relatief lage doses.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/10 rounded-2xl p-6 border-l-4 border-blue-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                Veelvoorkomende Antidepressiva (Gevaarlijk voor Honden)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream mb-2">SSRI's:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Sertraline (Zoloft)</li>
                    <li>• Fluoxetine (Prozac)</li>
                    <li>• Paroxetine (Seroxat)</li>
                    <li>• Citalopram (Cipramil)</li>
                    <li>• Escitalopram (Lexapro)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream mb-2">Andere:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Venlafaxine (Efexor) - SNRI</li>
                    <li>• Amitriptyline - TCA</li>
                    <li>• Clomipramine - TCA</li>
                    <li>• Mirtazapine</li>
                    <li>• Bupropion (Wellbutrin)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What Happens */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Hond?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🧠 1. Serotoninesyndroom
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Overmatige serotonine in de hersenen veroorzaakt tremoren, rusteloosheid, koorts, verwijde pupillen, stuipen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Meest voorkomende toxiciteit bij SSRI's
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  ❤️ 2. Hartritmestoornissen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Vooral TCA's veroorzaken gevaarlijke hartritmestoornissen (aritmieën), verhoogde hartslag en bloeddrukproblemen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Kan leiden tot plotse hartdood
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🧠 3. Neurologische Symptomen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Tremoren, ataxie (wankelende gang), desoriëntatie, stuipen, coma bij ernstige vergiftiging.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Symptomen binnen 30 min - 6 uur
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🫀 4. Multi-Orgaan Effecten
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Braken, diarree, verhoogde lichaamstemperatuur, ademhalingsproblemen, bloeddrukschommelingen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Kan leiden tot multi-orgaanfalen
                </p>
              </div>
            </div>

            {/* Symptoms */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Antidepressiva-vergiftiging
            </h2>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  Eerste 30 Min - 6 Uur: Serotoninesyndroom
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Tremoren</strong> (oncontroleerbaar beven, vooral poten en kaak)</li>
                  <li>• <strong>Rusteloosheid en agitatie</strong> (kan niet stil blijven)</li>
                  <li>• <strong>Verwijde pupillen</strong></li>
                  <li>• <strong>Snelle hartslag</strong> (tachycardie)</li>
                  <li>• <strong>Verhoogde lichaamstemperatuur</strong> (koorts)</li>
                  <li>• <strong>Braken en diarree</strong></li>
                  <li>• <strong>Hypersalivatie</strong> (overmatig kwijlen)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 border-l-4 border-red-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                  6-12 Uur: Ernstige Neurologische Symptomen
                </h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Ataxie</strong> (wankelende, ongecoördineerde gang)</li>
                  <li>• <strong>Desoriëntatie en verwardheid</strong></li>
                  <li>• <strong>Stuipen (convulsies)</strong></li>
                  <li>• <strong>Hartritmestoornissen</strong> (vooral bij TCA's)</li>
                  <li>• <strong>Ademhalingsproblemen</strong></li>
                  <li>• <strong>Extreme koorts</strong> (hyperthermie - kan {'>'}41°C zijn)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-transparent border-l-4 border-gray-600 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  12+ Uur: Levensbedreigende Fase
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• <strong>Coma</strong></li>
                  <li>• <strong>Hartstilstand</strong> (bij TCA-vergiftiging)</li>
                  <li>• <strong>Multi-orgaanfalen</strong></li>
                  <li>• <strong>Overlijden</strong> zonder intensive care</li>
                </ul>
              </div>
            </div>

            {/* What To Do */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen Bij Antidepressiva-inname
            </h2>

            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 border-2 border-red-500 not-prose">
              <h3 className="text-2xl font-black mb-6 uppercase">Noodprotocol:</h3>

              <div className="space-y-4">
                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">1</span>
                    BEL DIRECT DE DIERENARTS
                  </h4>
                  <p className="text-red-100">"Mijn hond heeft antidepressiva ingenomen" - vertel medicijnnaam en hoeveelheid</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">2</span>
                    IDENTIFICEER HET MEDICIJN
                  </h4>
                  <p className="text-red-100">Neem verpakking mee. Type antidepressiva bepaalt behandeling (SSRI vs. TCA).</p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    GA ONMIDDELLIJK ONDERWEG
                  </h4>
                  <p className="text-red-100">Wacht niet op symptomen. Serotoninesyndroom kan snel escaleren.</p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg">
                  ⚠️ MONITORING ESSENTIEEL
                </p>
                <p className="text-yellow-200">Ook na behandeling kan je hond 24-48 uur monitoring nodig hebben.</p>
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
                  <li>• Bewaar antidepressiva in afgesloten medicijnkastjes</li>
                  <li>• Veel pillen hebben zoete coating - aantrekkelijk voor honden</li>
                  <li>• Neem gemorste pillen onmiddellijk op</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  💊 Veterinaire Antidepressiva
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Honden kunnen fluoxetine of clomipramine krijgen</li>
                  <li>• Alleen in veterinaire doseringen</li>
                  <li>• NOOIT menselijke doseringen gebruiken</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  ⚠️ Let Op Combinaties
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Combinatie SSRI + andere medicijnen kan gevaarlijk zijn</li>
                  <li>• Vertel dierenarts over alle medicijnen</li>
                  <li>• Ook supplementen kunnen interacties hebben</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  👥 Informeer Huisgenoten
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Leg uit dat menselijke antidepressiva gevaarlijk zijn</li>
                  <li>• Vraag gasten medicijnen veilig weg te bergen</li>
                  <li>• Let op kinderen die pillen laten vallen</li>
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
                  Wat is serotoninesyndroom?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Serotoninesyndroom</strong> is een levensbedreigende aandoening veroorzaakt door te veel serotonine in het zenuwstelsel. Symptomen zijn tremoren, koorts, verwijde pupillen, stuipen, rusteloosheid en in ernstige gevallen coma. Het vereist onmiddellijke veterinaire behandeling.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn hond heeft 1 Zoloft gegeten. Is dat gevaarlijk?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Ja, neem onmiddellijk contact op met je dierenarts. Zelfs kleine hoeveelheden sertraline kunnen symptomen veroorzaken bij honden, vooral bij kleine rassen. Snelle behandeling kan helpen voorkomen dat ernstige symptomen ontstaan.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Zijn SSRI's gevaarlijker dan TCA's voor honden?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Beide zijn gevaarlijk maar op verschillende manieren.</strong> SSRI's veroorzaken vooral serotoninesyndroom (neurologisch). TCA's veroorzaken daarnaast ernstige hartritmestoornissen en kunnen leiden tot plotse hartdood. Beide vereisen onmiddellijke behandeling.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan mijn hond herstellen van antidepressiva-vergiftiging?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Ja, met snelle en goede behandeling</strong> kunnen de meeste honden volledig herstellen. De prognose hangt af van type medicijn, hoeveelheid, snelheid van behandeling. Serotoninesyndroom kan binnen 24-48 uur genezen met ondersteunende zorg. Bij TCA's is hartritmemonitoring essentieel.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van antidepressiva-vergiftiging moet je ALTIJD onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Bij twijfel: bel altijd je dierenarts.
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
