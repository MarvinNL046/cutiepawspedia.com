import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Ibuprofen Giftig voor Honden? | Symptomen & Wat Te Doen",
  description: "Ibuprofen (Advil/Nurofen) is giftig voor honden en veroorzaakt maagzweren, nierschade en bloedingsproblemen. Leer de symptomen herkennen en wat te doen bij inname.",
  keywords: "ibuprofen honden giftig, advil honden gevaarlijk, nurofen hond vergiftiging, NSAID honden toxisch, medicijn vergiftiging honden, noodgeval hond, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-ibuprofen-giftig-voor-honden",
    languages: {
      nl: "/nl/is-ibuprofen-giftig-voor-honden",
    },
  },
  openGraph: {
    title: "Is Ibuprofen Giftig voor Honden? | Symptomen & Wat Te Doen",
    description: "Ibuprofen is giftig voor honden en veroorzaakt maagzweren, nierschade en bloedingen. Leer de symptomen herkennen en wat te doen bij inname.",
    url: "/nl/is-ibuprofen-giftig-voor-honden",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function IbuprofenHondenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Is Ibuprofen Giftig voor Honden? Symptomen & Wat Te Doen",
            description: "Ibuprofen (Advil, Nurofen) is giftig voor honden. Als NSAID veroorzaakt het maagzweren, nierbeschadiging en bloedingsproblemen. Snelle veterinaire hulp is belangrijk bij vermoeden van inname.",
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
                name: "Is ibuprofen giftig voor honden?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, ibuprofen is giftig voor honden. Het is een NSAID (niet-steroïde anti-inflammatoir geneesmiddel) dat maagzweren, nierschade, leverschade en bloedingsproblemen veroorzaakt bij honden. Honden metaboliseren ibuprofen veel langzamer dan mensen, waardoor het langer in het lichaam blijft.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn hond ibuprofen inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Binnen enkele uren kunnen symptomen ontstaan zoals braken, diarree, buikpijn en lethargie. Ibuprofen beschadigt de maagwand, nieren en beïnvloedt bloedplaatjes. Ernstige vergiftiging kan leiden tot neurologische symptomen en stuipen. Snelle veterinaire hulp is belangrijk.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn hond ibuprofen heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Onmiddellijk. Ibuprofenvergiftiging vereist altijd professionele veterinaire hulp. Bel direct je dierenarts of een spoedkliniek. De behandeling moet zo snel mogelijk starten voor de beste resultaten. Wacht niet op symptomen - snelle actie is belangrijk.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik mijn hond een kleine hoeveelheid ibuprofen geven tegen pijn?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nee, geef nooit ibuprofen aan honden zonder expliciete instructie van een dierenarts. Honden hebben speciale NSAID's zoals Metacam, Rimadyl of Previcox die veiliger zijn. Menselijke pijnstillers zoals ibuprofen, paracetamol en aspirine zijn gevaarlijk voor honden.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik ibuprofenvergiftiging bij mijn hond?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar alle medicijnen buiten bereik van honden in afgesloten kastjes. Laat geen pillen rondslingeren. Informeer huisgenoten dat honden NOOIT menselijke pijnstillers mogen krijgen. Gebruik alleen door de dierenarts voorgeschreven medicijnen voor je hond.",
                },
              },
            ],
          }),
        }}
      />

      {/* EMERGENCY Hero Section - Dark Red Warning */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-orange-800 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">Zeer gevaarlijk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Is Ibuprofen Giftig voor Honden?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - zeer giftig
            </p>
            <p className="text-lg text-red-100">
              Ibuprofen (Advil, Nurofen) is gevaarlijk giftig voor honden en veroorzaakt maagzweren, nierschade en bloedingen.
            </p>
          </div>
        </div>
      </section>

      {/* EMERGENCY TL;DR Verdict Box */}
      <section className="bg-red-950 border-y-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-6 border-2 border-red-500 shadow-2xl">
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
                    ✗ Honden metaboliseren ibuprofen veel trager dan mensen
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt maagzweren en inwendige bloedingen
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Leidt tot acuut nierfalen en leverschade
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Kan dodelijk zijn zonder snelle behandeling
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    Bij inname: neem direct contact op met je dierenarts
                  </p>
                  <p className="text-red-100 font-medium">
                    Dit is een veterinaire noodsituatie. De behandeling moet zo snel mogelijk starten.
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
            currentPage="Ibuprofen voor Honden"
          />

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Emergency Contact Info */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border-l-4 border-orange-500 mb-12 not-prose">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6 text-orange-600" />
                Spoednummers voor Ibuprofenvergiftiging
              </h3>
              <div className="space-y-3 text-foreground dark:text-cpCream">
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">📞 Je eigen dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Bel direct je reguliere dierenarts - zij kennen je hond en hebben je medische geschiedenis
                  </p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🚑 Dierennoodhulp Nederland</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    24/7 spoedlijn: zoek online naar "dierenarts spoed [jouw stad]"
                  </p>
                </div>
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">🏥 Dichtstbijzijnde dierenartsenspoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Zoek "dierenartsenspoedkliniek" + jouw regio voor 24/7 noodhulp
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-400">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  ⏱️ Snelle actie is belangrijk: de behandeling moet zo snel mogelijk starten voor optimale uitkomsten
                </p>
              </div>
            </div>

            {/* Introduction */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom is Ibuprofen zo Gevaarlijk voor Honden?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Ibuprofen (merknamen: Advil, Nurofen, Brufen) is een van de meest gebruikte pijnstillers bij mensen. Het behoort tot de NSAID's (niet-steroïde anti-inflammatoire geneesmiddelen) en werkt uitstekend bij mensen. Maar voor honden is het <strong className="text-red-600 dark:text-red-400">zeer gevaarlijk en potentieel dodelijk</strong>.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Het probleem ontstaat omdat honden ibuprofen <strong>veel langzamer metaboliseren</strong> dan mensen. Waar mensen het medicijn binnen enkele uren afbreken, blijft het bij honden veel langer in het lichaam circuleren. Dit leidt tot ophoping van toxische niveaus die ernstige schade aanrichten aan maag, nieren, lever en bloedcellen.
            </p>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Waarom Honden Zo Gevoelig Zijn
              </h4>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Langzaam metabolisme:</strong> Honden breken ibuprofen 3-5x langzamer af dan mensen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Geen veilige marge:</strong> De therapeutische en toxische dosis liggen dicht bij elkaar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Cummulatieve effecten:</strong> Bij herhaalde doses stapelt de toxiciteit zich op</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span><strong>Multi-orgaan schade:</strong> Ibuprofen beschadigt meerdere organen tegelijk</span>
                </li>
              </ul>
            </div>

            {/* What Happens in the Body */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Hond?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Wanneer een hond ibuprofen binnenkrijgt, gebeuren er drie levensbedreigende processen:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫀</span>
                  1. Maagschade
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat het is:</strong> Ibuprofen remt COX-enzymen die de maagwand beschermen.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat er gebeurt:</strong> Zonder bescherming ontstaan bloedende zweren (ulcera) in maag en darmen. Dit leidt tot inwendige bloedingen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ⏱️ Symptomen binnen enkele uren
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫘</span>
                  2. Nierschade
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat het is:</strong> Verminderde bloedstroom naar de nieren leidt tot acuut nierfalen.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat er gebeurt:</strong> De nieren kunnen afvalstoffen niet meer filteren. Toxines stapelen zich op in het bloed.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ⏱️ Ontstaat binnen 12-24 uur
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🩸</span>
                  3. Bloedproblemen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat het is:</strong> Ibuprofen remt bloedplaatjes (trombocyten) die bloedstolling regelen.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat er gebeurt:</strong> Verhoogd risico op bloedingen, ook inwendige bloedingen in hersenen of longen.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ⏱️ Effect binnen enkele uren
                </p>
              </div>
            </div>

            {/* Symptoms Timeline */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Ibuprofenvergiftiging bij Honden
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              De symptomen ontwikkelen zich binnen enkele uren en kunnen snel verergeren:
            </p>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                      Eerste uren: Maag-Darm Symptomen
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Braken</strong> (vaak met bloed of koffiedik-achtig materiaal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Diarree</strong> (kan bloederig of zwart zijn)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Buikpijn</strong> - hond staat kromgebogen of jammert bij aanraking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Verminderde eetlust</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Lethargie en zwakte</strong></span>
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
                      12-24 Uur: Nierfalen en Neurologische Symptomen
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Verminderde of geen urineproductie</strong> (nierfalen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Desoriëntatie en verwardheid</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Oncoördinatie</strong> (ataxie - wankelende gang)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Stuipen of tremoren</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Bleke tandvlees</strong> (anemie door bloedverlies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Snelle of moeizame ademhaling</strong></span>
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
                      24-72 Uur: Levensbedreigende Fase
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Coma of bewusteloosheid</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Multi-orgaanfalen</strong> - nieren, lever, maag falen</span>
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

            {/* What To Do - EMERGENCY PROTOCOL */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen Als Je Hond Ibuprofen Heeft Ingenomen
            </h2>

            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 border-2 border-red-500 not-prose">
              <h3 className="text-2xl font-black mb-6">Noodprotocol - Volg deze stappen onmiddellijk:</h3>

              <div className="space-y-4">
                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">1</span>
                    STOP - Verwijder de Bron
                  </h4>
                  <p className="text-red-100">
                    Verwijder onmiddellijk alle ibuprofen-tabletten uit de buurt van je hond. Check hoeveel tabletten er missen.
                  </p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">2</span>
                    Neem direct contact op met je dierenarts
                  </h4>
                  <p className="text-red-100 mb-2">
                    Bel direct je dierenarts of een spoedkliniek. Zeg:
                  </p>
                  <div className="bg-red-900 rounded p-3">
                    <p className="font-bold mb-1">"Mijn hond heeft ibuprofen ingenomen - dit is een noodsituatie"</p>
                    <p className="text-sm text-red-200">Vertel hoeveel tabletten, wanneer, en het gewicht van je hond</p>
                  </div>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    Ga direct naar de dierenarts
                  </h4>
                  <p className="text-red-100 mb-2">
                    Rijd onmiddellijk naar de dierenarts. Neem mee:
                  </p>
                  <ul className="space-y-1 text-red-100 text-sm">
                    <li>• De verpakking van het medicijn (voor dosering-info)</li>
                    <li>• Schatting van hoeveel tabletten ingenomen zijn</li>
                    <li>• Tijdstip van inname</li>
                  </ul>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">4</span>
                    Geen thuisbehandeling
                  </h4>
                  <p className="text-red-100">
                    Probeer NIET zelf braken op te wekken tenzij de dierenarts dit expliciet instrueert. Dit kan de schade verergeren.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg mb-2">
                  ⏱️ Snelle actie is belangrijk
                </p>
                <p className="text-yellow-200">
                  De behandeling moet zo snel mogelijk starten voor de beste overlevingskans en om orgaanschade te minimaliseren.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-gray-500 mb-12 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <XCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                Wat niet te doen
              </h4>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet wachten op symptomen - ga direct naar de dierenarts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet zelf braken opwekken zonder instructies van dierenarts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet melk geven (versnelt absorptie door vet in ibuprofen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet denken "het was maar één pil, het komt wel goed"</span>
                </li>
              </ul>
            </div>

            {/* Veterinary Treatment */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Veterinaire Behandeling van Ibuprofenvergiftiging
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              De behandeling vereist snelle interventie en intensieve zorg:
            </p>

            <div className="space-y-4 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🤮 1. Decontaminatie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Braken opwekken of maagspoeling om niet-opgenomen ibuprofen te verwijderen. Actieve kool wordt gegeven om verdere opname te voorkomen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  💧 2. Infuustherapie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Intraveneuze vloeistoffen ondersteunen nierfunctie en helpen toxines uit te scheiden. Dit is cruciaal om nierfalen te voorkomen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  💊 3. Maagbescherming
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Medicijnen zoals omeprazol, sucralfaat of misoprostol beschermen de maagwand en helpen ulcera te genezen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🩸 4. Bloedonderzoek en Monitoring
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Regelmatige controle van nierfunctie, leverfunctie, bloedbeeld en elektrolyten om complicaties vroeg te detecteren.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🏥 5. Intensieve Zorg
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bij ernstige vergiftiging kan opname nodig zijn met continue monitoring, pijnstilling en ondersteunende zorg.
                </p>
              </div>
            </div>

            {/* Prevention */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              🛡️ Preventie: Bescherm Je Hond tegen Ibuprofen
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Veilige Opslag
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Bewaar alle medicijnen in afgesloten kastjes buiten bereik</li>
                  <li>• Laat nooit pillen rondslingeren op tafels of nachtkastjes</li>
                  <li>• Controleer of verpakkingen goed gesloten zijn</li>
                  <li>• Let op gevallen pillen - honden vinden ze snel</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚫</span>
                  Strikt Verbod
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Geef nooit menselijke pijnstillers aan honden</li>
                  <li>• Ook niet "een klein beetje" - dosering is cruciaal</li>
                  <li>• Gebruik alleen door dierenarts voorgeschreven medicijnen</li>
                  <li>• Bel altijd eerst de dierenarts bij pijn of ongemak</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  Veilige Alternatieven
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>Carprofen (Rimadyl)</strong> - NSAID speciaal voor honden</li>
                  <li>• <strong>Meloxicam (Metacam)</strong> - vaak gebruikt bij artrose</li>
                  <li>• <strong>Firocoxib (Previcox)</strong> - COX-2 selectief</li>
                  <li>• Alleen gebruiken zoals voorgeschreven door dierenarts</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Informeer Huisgenoten
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Zorg dat iedereen weet: GEEN menselijke medicijnen</li>
                  <li>• Waarschuw gasten en oppas expliciet</li>
                  <li>• Leer kinderen medicijnen veilig op te bergen</li>
                  <li>• Bij twijfel: altijd eerst dierenarts bellen</li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 mt-16">
              ❓ Veelgestelde Vragen
            </h2>

            <div className="space-y-4 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Kan ik mijn hond een halve ibuprofen geven tegen pijn?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong className="text-red-600 dark:text-red-400">NEE, absoluut niet.</strong> Geef nooit menselijke pijnstillers aan honden zonder expliciete instructie van een dierenarts. Honden hebben speciale veterinaire NSAID's zoals Rimadyl of Metacam die veiliger zijn. Ibuprofen kan ernstige maagzweren en nierschade veroorzaken.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn hond heeft één ibuprofen 200mg ingenomen. Is dat gevaarlijk?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong className="text-orange-600 dark:text-orange-400">JA, dit is gevaarlijk.</strong> Zelfs één tablet kan toxisch zijn, vooral voor kleine honden. Bel onmiddellijk je dierenarts. Voor een hond van 10kg is 200mg al in de toxische zone. Wacht niet op symptomen - vroege behandeling is cruciaal.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Hoelang duurt het voordat symptomen verschijnen?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Maag-darm symptomen (braken, diarree) kunnen binnen enkele uren optreden. Nierschade ontwikkelt zich meestal binnen 12-24 uur. Neurologische symptomen kunnen later ontstaan. Wacht niet op symptomen - ga direct naar de dierenarts.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Is ibuprofen gevaarlijker dan paracetamol of aspirine voor honden?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Alle drie zijn gevaarlijk voor honden, maar op verschillende manieren. Ibuprofen veroorzaakt vooral maagzweren en nierschade. Paracetamol is gevaarlijk voor katten maar honden kunnen beperkte doses verdragen (alleen onder veterinair toezicht). Geef nooit menselijke pijnstillers zonder veterinair advies.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Wat zijn veilige pijnstillers voor honden?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Alleen medicijnen voorgeschreven door de dierenarts zijn veilig: <strong>Carprofen (Rimadyl)</strong>, <strong>Meloxicam (Metacam)</strong>, <strong>Firocoxib (Previcox)</strong>, of <strong>Grapiprant (Galliprant)</strong>. Deze zijn speciaal ontwikkeld voor honden en veiliger dan menselijke NSAID's. Volg altijd exact de voorgeschreven dosering.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van ibuprofenvergiftiging moet je ALTIJD onmiddellijk contact opnemen met een dierenarts of spoedkliniek. De informatie op deze pagina is gebaseerd op wetenschappelijke literatuur en veterinaire richtlijnen, maar elke hond is uniek en vereist individuele veterinaire beoordeling. Bij twijfel: bel altijd je dierenarts.
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
