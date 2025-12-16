import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Aspirine Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Aspirine is gevaarlijk voor katten. Katten metaboliseren aspirine zeer traag, wat tot opstapeling en gezondheidsproblemen kan leiden. Leer de symptomen herkennen en wat te doen.",
  keywords: "aspirine katten giftig, acetylsalicylzuur kat, aspirientje kat gevaarlijk, salicylaat vergiftiging katten, medicijn vergiftiging katten, noodgeval kat, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-aspirine-giftig-voor-katten",
    languages: {
      nl: "/nl/is-aspirine-giftig-voor-katten",
    },
  },
  openGraph: {
    title: "Is Aspirine Giftig voor Katten? | Symptomen & Wat Te Doen",
    description: "Aspirine is gevaarlijk voor katten. Katten metaboliseren aspirine zeer traag, wat tot opstapeling en gezondheidsproblemen kan leiden.",
    url: "/nl/is-aspirine-giftig-voor-katten",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function AspirineKattenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Is Aspirine Giftig voor Katten? Symptomen & Wat Te Doen",
            description: "Aspirine (acetylsalicylzuur) is gevaarlijk voor katten. Katten metaboliseren aspirine zeer langzaam (halfwaardetijd 38-48 uur vs. 4-6 uur bij mensen), wat leidt tot opstapeling en gezondheidsproblemen.",
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
                name: "Is aspirine giftig voor katten?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, aspirine is gevaarlijk voor katten. Katten metaboliseren aspirine zeer langzaam (halfwaardetijd 38-48 uur in plaats van 4-6 uur bij mensen). Dit betekent dat aspirine zich kan opstapelen, wat tot gezondheidsproblemen kan leiden zoals maagbloedingen en leverschade.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn kat aspirine inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aspirine veroorzaakt maagzweren en bloedingen (door remming van bloedplaatjes), salicylaatintoxicatie (vergiftiging door ophoping), leverschade en metabole acidose. Symptomen zijn braken (vaak met bloed), lethargie, snelle ademhaling, koorts, en in ernstige gevallen coma en overlijden.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn kat aspirine heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ONMIDDELLIJK. Aspirine-vergiftiging bij katten is een veterinaire noodsituatie. Door het trage metabolisme kan de vergiftiging dagenlang aanhouden. Bel direct je dierenarts of een spoedkliniek. Vroege behandeling is essentieel.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik mijn kat een klein stukje aspirine geven tegen pijn?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NEE, ABSOLUUT NIET zonder expliciete instructie van een dierenarts. Aspirine wordt zeer zelden voorgeschreven voor katten (hooguit eens per 48-72 uur onder streng toezicht). Geef nooit zelf aspirine - er zijn veel veiligere alternatieven voor katten beschikbaar.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik aspirine-vergiftiging bij mijn kat?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar alle medicijnen (inclusief aspirine, Ascal, Ascardia) buiten bereik van katten in afgesloten kastjes. Geef NOOIT menselijke pijnstillers aan katten. Gebruik alleen door de dierenarts voorgeschreven pijnstillers speciaal voor katten.",
                },
              },
            ],
          }),
        }}
      />

      {/* EMERGENCY Hero Section */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-orange-800 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Aspirine voor Katten"
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">Gevaarlijk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Is Aspirine Giftig voor Katten?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - gevaarlijk giftig
            </p>
            <p className="text-lg text-red-100">
              Aspirine is zeer giftig voor katten. Katten metaboliseren het extreem traag (tot 48 uur!), wat leidt tot gevaarlijke ophoping.
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR Verdict Box */}
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
                    ✗ Katten metaboliseren aspirine 8-12x langzamer dan mensen
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Halfwaardetijd bij katten: 38-48 uur (mensen: 4-6 uur)
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Elke dosis stapelt zich op en wordt giftig
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt maagbloedingen, leverfalen en overlijden
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    BIJ INNAME: BEL DIRECT DE DIERENARTS
                  </p>
                  <p className="text-red-100 font-medium">
                    Dit is een veterinaire noodsituatie. Wacht niet op symptomen!
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
                Spoednummers voor Aspirine-vergiftiging
              </h3>
              <div className="space-y-3 text-foreground dark:text-cpCream">
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">📞 Je eigen dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Bel direct - zij kennen je kat en medische geschiedenis
                  </p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🚑 Dierennoodhulp Nederland</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    24/7 spoedlijn: zoek "dierenarts spoed [jouw stad]"
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-400">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  ⏱️ BELANGRIJK: Door het trage metabolisme kan vergiftiging dagen aanhouden - vroege behandeling is essentieel
                </p>
              </div>
            </div>

            {/* Why Dangerous */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom is Aspirine zo Gevaarlijk voor Katten?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Aspirine (acetylsalicylzuur, merknamen: Ascal, Ascardia, Disprin) is een salicylaat dat wordt gebruikt als pijnstiller, koortswerend middel en bloedverdunner bij mensen. Voor katten is het <strong className="text-red-600 dark:text-red-400">extreem gevaarlijk</strong> vanwege hun unieke metabolisme.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Het cruciale verschil zit in de <strong>halfwaardetijd</strong> - de tijd die het lichaam nodig heeft om de helft van het medicijn af te breken. Bij mensen is dit 4-6 uur. Bij katten is dit <strong className="text-red-600 dark:text-red-400">38-48 uur</strong> - tot 12x langer! Dit betekent dat aspirine zich ophoopt bij elke dosis, wat leidt tot toxische niveaus.
            </p>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Het Gevaar van Traag Metabolisme
              </h4>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Cumulatieve toxiciteit:</strong> Elke dosis stapelt zich op voordat de vorige is afgebroken</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Lange blootstelling:</strong> Organen worden dagenlang blootgesteld aan giftige niveaus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Onvoorspelbare reactie:</strong> Zelfs "lage" doses kunnen toxisch worden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Moeilijke behandeling:</strong> Door lange halfwaardetijd is ontgifting complex</span>
                </li>
              </ul>
            </div>

            {/* What Happens */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Kat?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫀</span>
                  1. Maagschade & Bloedingen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Aspirine remt COX-enzymen die de maagwand beschermen én beïnvloedt bloedplaatjes. Dit leidt tot maagzweren en langdurige bloedingen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Effect houdt dagen aan door trage afbraak
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">⚠️</span>
                  2. Salicylaatintoxicatie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Ophoping van salicylaat veroorzaakt metabole acidose, ademhalingsproblemen, koorts en neurologische symptomen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Kan leiden tot coma en overlijden
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫀</span>
                  3. Leverschade
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  De lever wordt overbelast door continu aspirine te moeten afbreken, wat tot leverfalen kan leiden.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Chronische blootstelling zeer schadelijk
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫁</span>
                  4. Ademhalingsproblemen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Salicylaatintoxicatie stimuleert het ademhalingscentrum, wat leidt tot snelle, diepe ademhaling (hyperpneu).
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  Teken van ernstige vergiftiging
                </p>
              </div>
            </div>

            {/* Symptoms */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Aspirine-vergiftiging bij Katten
            </h2>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                      Eerste 6-12 Uur: Vroege Symptomen
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Braken</strong> (vaak met bloed of donker materiaal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Lethargie en zwakte</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Verminderde eetlust</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Buikpijn</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 border-l-4 border-red-600 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                      12-48 Uur: Ernstige Salicylaatintoxicatie
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Snelle, diepe ademhaling</strong> (hyperpneu)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Koorts of ondertemperatuur</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Desoriëntatie</strong> en verwardheid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Bloedige diarree</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Bleke tandvlees</strong> (anemie door bloedverlies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Geelzucht</strong> (gele ogen/tandvlees bij leverschade)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-transparent border-l-4 border-gray-600 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                    <Skull className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      48+ Uur: Levensbedreigende Fase
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Stuipen en neurologische symptomen</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Coma</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Multi-orgaanfalen</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Overlijden</strong> zonder intensieve behandeling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What To Do */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen Als Je Kat Aspirine Heeft Ingenomen
            </h2>

            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 border-2 border-red-500 not-prose">
              <h3 className="text-2xl font-black mb-6 uppercase">Noodprotocol:</h3>

              <div className="space-y-4">
                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">1</span>
                    BEL ONMIDDELLIJK DE DIERENARTS
                  </h4>
                  <p className="text-red-100">
                    Zeg: "Mijn kat heeft aspirine ingenomen - noodsituatie". Vertel hoeveel, wanneer, gewicht kat.
                  </p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">2</span>
                    GA DIRECT NAAR DE DIERENARTS
                  </h4>
                  <p className="text-red-100">
                    Neem mee: verpakking medicijn, schatting aantal tabletten, tijdstip inname.
                  </p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    GEEN THUISBEHANDELING
                  </h4>
                  <p className="text-red-100">
                    Wek NIET zelf braken op. Geef geen melk of voedsel. Laat behandeling over aan dierenarts.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg mb-2">
                  ⚠️ LET OP: LANGE HALFWAARDETIJD
                </p>
                <p className="text-yellow-200">
                  Door de halfwaardetijd van 38-48 uur kan vergiftiging dagen aanhouden. <strong>Vroege behandeling is cruciaal</strong> om langdurige schade te voorkomen.
                </p>
              </div>
            </div>

            {/* Prevention */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              🛡️ Preventie: Bescherm Je Kat tegen Aspirine
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Veilige Opslag
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Bewaar aspirine (Ascal, Ascardia, Disprin) in afgesloten kastjes</li>
                  <li>• Let op: ook "hartaspirine" is gevaarlijk voor katten</li>
                  <li>• Controleer medicijnkastjes regelmatig</li>
                  <li>• Ruim gevallen pillen direct op</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚫</span>
                  NOOIT Zelf Geven
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Geef NOOIT aspirine zonder dierenarts voorschrift</li>
                  <li>• Zelfs "lage doses" zijn gevaarlijk door cumulatie</li>
                  <li>• Aspirine wordt zeer zelden voorgeschreven voor katten</li>
                  <li>• Hooguit 1x per 48-72 uur onder streng toezicht</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  Veilige Alternatieven
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Meloxicam (Metacam)</strong> - NSAID voor katten</li>
                  <li>• <strong>Onsior (robenacoxib)</strong> - speciaal voor katten</li>
                  <li>• <strong>Buprenorfine</strong> - opioïde pijnstiller</li>
                  <li>• Alleen gebruiken zoals voorgeschreven</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Let Op Combinaties
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Combineer aspirine NOOIT met andere NSAID's</li>
                  <li>• Verhoogd risico op maagbloedingen en nierschade</li>
                  <li>• Vertel dierenarts altijd over alle medicijnen</li>
                  <li>• Ook vrij verkrijgbare medicijnen zijn relevant</li>
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
                  Waarom wordt aspirine soms wel voorgeschreven aan katten?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  In zeer zeldzame gevallen kan een dierenarts aspirine voorschrijven als <strong>bloedverdunner</strong> bij specifieke hartaandoeningen. Dit gebeurt hooguit 1x per 48-72 uur in extreem lage doses en onder streng toezicht met regelmatige bloedcontroles. Geef NOOIT zelf aspirine zonder dit specifieke voorschrift.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn kat heeft een kinderaspirine 81mg gegeten. Is dat ook gevaarlijk?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong className="text-red-600 dark:text-red-400">JA.</strong> Ook 81mg is potentieel toxisch voor katten door het trage metabolisme. Bel onmiddellijk je dierenarts. Voor een kat van 4-5kg is dit al een significante dosis die zich zal ophopen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Is aspirine gevaarlijker dan ibuprofen voor katten?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Beide zijn zeer gevaarlijk</strong> maar op verschillende manieren. Ibuprofen werkt sneller (2-6 uur symptomen), aspirine stapelt langzamer op maar houdt veel langer aan (38-48 uur halfwaardetijd). Beide veroorzaken maagschade, nierschade en kunnen dodelijk zijn. Geef <strong>nooit</strong> menselijke NSAID's aan katten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Hoelang moet mijn kat gemonitord worden na aspirine-inname?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Door de halfwaardetijd van 38-48 uur moet je kat minstens <strong>3-5 dagen</strong> gemonitord worden, zelfs met behandeling. Symptomen kunnen zich laat ontwikkelen. De dierenarts zal regelmatige bloedonderzoeken doen om orgaanfunctie te controleren.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan mijn kat herstellen van aspirine-vergiftiging?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Ja, met snelle en intensieve behandeling</strong> kunnen veel katten herstellen. De prognose hangt af van: hoeveel ingenomen, hoe snel behandeling gestart, ernst van orgaanschade. Vroege interventie (binnen 1-2 uur) geeft de beste overlevingskans. Chronische schade aan maag, lever of nieren kan blijvend zijn.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van aspirine-vergiftiging moet je ALTIJD onmiddellijk contact opnemen met een dierenarts of spoedkliniek. De informatie op deze pagina is gebaseerd op wetenschappelijke literatuur en veterinaire richtlijnen, maar elke kat is uniek en vereist individuele veterinaire beoordeling. Bij twijfel: bel altijd je dierenarts.
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
