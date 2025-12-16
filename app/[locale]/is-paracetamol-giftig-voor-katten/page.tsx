import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Phone, Clock, Skull, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Paracetamol Giftig voor Katten? | Symptomen & Wat Te Doen",
  description: "Paracetamol is zeer gevaarlijk voor katten. Leer de symptomen herkennen en wat je moet doen bij vermoeden van inname.",
  keywords: "paracetamol katten giftig, acetaminophen katten dodelijk, tylenol kat vergiftiging, paracetamol kat levensgevaarlijk, medicijn vergiftiging katten, noodgeval kat, dierenarts spoed",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/nl/is-paracetamol-giftig-voor-katten",
    languages: {
      nl: "/nl/is-paracetamol-giftig-voor-katten",
    },
  },
  openGraph: {
    title: "Is Paracetamol Giftig voor Katten? | Symptomen & Wat Te Doen",
    description: "Paracetamol is zeer gevaarlijk voor katten. Leer de symptomen herkennen en wat je moet doen bij vermoeden van inname.",
    url: "/nl/is-paracetamol-giftig-voor-katten",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function ParacetamolKattenGiftigPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Is Paracetamol Giftig voor Katten? Symptomen & Wat Te Doen",
            description: "Paracetamol (acetaminophen/Tylenol) is zeer gevaarlijk voor katten. Katten missen het enzym glucuronyltransferase dat nodig is om paracetamol af te breken, wat leidt tot ernstige gezondheidsproblemen.",
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
            datePublished: "2025-01-15",
            dateModified: "2025-01-15",
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
                name: "Is paracetamol giftig voor katten?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, paracetamol is zeer gevaarlijk voor katten. Katten missen het enzym glucuronyltransferase dat nodig is om paracetamol af te braken. Dit kan leiden tot ernstige gezondheidsproblemen zoals methemoglobinemie en leverschade. Er bestaat geen bekende veilige dosering voor katten.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als mijn kat paracetamol inneemt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Binnen enkele uren na inname kunnen ernstige symptomen ontstaan zoals methemoglobinemie waarbij het bloed minder zuurstof transporteert. Symptomen zijn blauwe of bruine tong en tandvlees, moeilijke ademhaling, lethargie, braken, gezwollen gezicht en poten. Zonder behandeling kunnen deze symptomen verergeren tot ernstige leverschade.",
                },
              },
              {
                "@type": "Question",
                name: "Wanneer moet ik naar de dierenarts als mijn kat paracetamol heeft ingenomen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Onmiddellijk. Paracetamolvergiftiging bij katten vereist altijd onmiddellijke veterinaire hulp. Bel direct je dierenarts of een spoedkliniek. Wacht niet op symptomen voordat je contact opneemt - snelle actie is belangrijk bij vermoeden van inname.",
                },
              },
              {
                "@type": "Question",
                name: "Kan ik mijn kat een kleine hoeveelheid paracetamol geven tegen pijn?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nee, er bestaat geen veilige dosering paracetamol voor katten. Zelfs zeer kleine hoeveelheden kunnen al ernstige gezondheidsproblemen veroorzaken. Katten hebben een compleet ander metabolisme dan mensen en honden. Geef nooit menselijke pijnstillers aan katten zonder expliciete instructie van een dierenarts.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe voorkom ik paracetamolvergiftiging bij mijn kat?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bewaar alle medicijnen (ook vrij verkrijgbare) buiten bereik van katten in afgesloten kastjes. Laat geen pillen rondslingeren op nachtkastjes of tafels. Informeer huisgenoten en gasten dat katten NOOIT menselijke medicijnen mogen krijgen. Gebruik alleen door de dierenarts voorgeschreven pijnstillers speciaal voor katten.",
                },
              },
            ],
          }),
        }}
      />

      {/* EMERGENCY Hero Section - Dark Red Warning */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 border-b-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Paracetamol voor Katten"
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-red-500 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">Zeer gevaarlijk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Is Paracetamol Giftig voor Katten?
          </h1>
          <div className="bg-red-950/60 border-l-4 border-white rounded-r-lg p-4 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ja - ernstig giftig en levensbedreigend
            </p>
            <p className="text-lg text-red-100">
              Paracetamol (acetaminophen/Tylenol) is zeer gevaarlijk voor katten, zelfs in kleine hoeveelheden.
            </p>
          </div>
        </div>
      </section>

      {/* EMERGENCY TL;DR Verdict Box */}
      <section className="bg-red-950 border-y-4 border-red-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 border-2 border-red-500 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-3">
                  Direct antwoord: Ernstig giftig
                </h2>
                <div className="space-y-2 text-red-50">
                  <p className="font-bold text-lg">
                    ✗ Er bestaat geen bekende veilige dosering paracetamol voor katten
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Zelfs zeer kleine hoeveelheden kunnen ernstige vergiftiging veroorzaken
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Katten missen het enzym om paracetamol af te breken
                  </p>
                  <p className="font-bold text-lg">
                    ✗ Veroorzaakt methemoglobinemie (bloed transporteert geen zuurstof) en leverfalen
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-400">
                  <p className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    Bij vermoeden van inname: neem contact op met je dierenarts
                  </p>
                  <p className="text-red-100 font-medium">
                    Dit vereist altijd professionele veterinaire beoordeling. Wacht niet op symptomen!
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
            {/* Emergency Contact Info */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border-l-4 border-orange-500 mb-12 not-prose">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6 text-orange-600" />
                Spoednummers voor Paracetamolvergiftiging
              </h3>
              <div className="space-y-3 text-foreground dark:text-cpCream">
                <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4 border border-orange-300 dark:border-orange-600">
                  <p className="font-bold text-lg mb-1">📞 Je eigen dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Bel direct je reguliere dierenarts - zij kennen je kat en hebben je medische geschiedenis
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
                  ⏱️ Snelle actie is belangrijk: behandeling moet zo snel mogelijk starten voor de beste resultaten
                </p>
              </div>
            </div>

            {/* Introduction */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Waarom is Paracetamol zo Gevaarlijk voor Katten?
            </h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Paracetamol (ook bekend als acetaminophen of onder de merknaam Tylenol, Panadol, en vele andere) is een van de meest voorkomende pijnstillers in menselijke huishoudens. Hoewel het veilig is voor mensen en in bepaalde doseringen voor honden, is het <strong className="text-red-600 dark:text-red-400">absoluut dodelijk voor katten</strong>.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Het tragische aan paracetamolvergiftiging bij katten is dat het vaak per ongeluk gebeurt: een bezorgde eigenaar die denkt zijn kat te helpen door een "klein stukje pijnstiller" te geven, een kat die een pil van het nachtkastje eet, of zelfs goedbedoelde adviezen van niet-deskundigen. Maar voor katten is er <strong className="text-red-600 dark:text-red-400">geen veilige dosering</strong> - zelfs de kleinste hoeveelheid kan fataal zijn.
            </p>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-600 mb-8 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Verschil tussen Katten en Andere Dieren
              </h4>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Katten hebben een uniek metabolisme dat fundamenteel verschilt van mensen en honden:
              </p>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span>Katten missen het enzym <strong>glucuronyltransferase</strong> dat nodig is om paracetamol af te breken</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span>Zonder dit enzym stapelt de giftige stof zich op in het bloed en de lever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span>De halfwaardetijd van paracetamol bij katten is 3x langer dan bij mensen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <span>Dit maakt katten extreem gevoelig voor zelfs microscopisch kleine hoeveelheden</span>
                </li>
              </ul>
            </div>

            {/* What Happens in the Body */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Wat Gebeurt er in het Lichaam van je Kat?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Wanneer een kat paracetamol binnenkrijgt, gebeuren er twee levensbedreigende processen tegelijkertijd:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🩸</span>
                  1. Methemoglobinemie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat het is:</strong> Een levensbedreigende aandoening waarbij het bloed geen zuurstof meer kan transporteren.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat er gebeurt:</strong> Paracetamol verandert het hemoglobine in rode bloedcellen naar methemoglobine, een vorm die geen zuurstof kan binden. Het bloed wordt letterlijk nutteloos.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Zichtbare symptomen:</strong> Blauwe of chocoladebruine tong en tandvlees (cyanose), ademhalingsproblemen, zwakte.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ⏱️ Ontstaat binnen enkele uren na inname
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-red-300 dark:border-red-600">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-3xl">🫀</span>
                  2. Acuut Leverfalen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat het is:</strong> De lever wordt overbelast door giftige afbraakproducten en faalt compleet.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Wat er gebeurt:</strong> Zonder het enzym om paracetamol veilig af te breken, ontstaan er toxische metabolieten die de levercellen verwoesten.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Zichtbare symptomen:</strong> Geelzucht (gele ogen/tandvlees), donkere urine, braken, lethargie, gezwollen buik.
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ⏱️ Ontstaat binnen 12-24 uur
                </p>
              </div>
            </div>

            <div className="bg-red-950 text-red-50 rounded-2xl p-6 border-2 border-red-500 mb-12 not-prose">
              <h4 className="font-black text-white mb-3 text-xl">
                Gevaarlijke hoeveelheden voor katten
              </h4>
              <p className="mb-4">
                Zelfs zeer kleine hoeveelheden paracetamol kunnen bij katten tot ernstige gezondheidsproblemen leiden.
              </p>
              <div className="bg-red-900 rounded-lg p-4 mb-3">
                <p className="font-bold text-xl mb-2">Er bestaat geen bekende veilige dosering</p>
                <p className="text-red-200">Zelfs een fractie van een tablet kan voor een kat al problematisch zijn</p>
              </div>
              <p className="text-sm font-bold text-red-200 bg-red-800 rounded p-3">
                Let op: Combinatiepreparaten (bijv. paracetamol + coffeïne bij Paracetamol Plus) zijn nóg gevaarlijker omdat ze meerdere stoffen bevatten die voor katten giftig kunnen zijn.
              </p>
            </div>

            {/* Symptoms Timeline */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Symptomen van Paracetamolvergiftiging bij Katten
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              De symptomen ontwikkelen zich snel en verergeren progressief. Het is cruciaal om te handelen <strong>voordat</strong> symptomen optreden, maar kennis van deze tekenen kan levens redden:
            </p>

            <div className="space-y-6 mb-12 not-prose">
              <div className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 border-l-4 border-orange-500 rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                      Eerste uren: Methemoglobinemie Fase
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Blauwe of chocoladebruine verkleuring</strong> van tong, tandvlees en slijmvliezen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Moeilijke of snelle ademhaling</strong> (kat hapt naar lucht)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Extreme lethargie</strong> - kat is volledig apathisch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Braken</strong> en speekselen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Zwakke of verhoogde hartslag</strong></span>
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
                      12-24 Uur: Leverfalen Fase
                    </h3>
                    <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Geelzucht</strong> - gele verkleuring van ogen, tandvlees en huid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Gezwollen gezicht en poten</strong> (oedeem door leverfalen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Donkere of bloederige urine</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Bewustzijnsverlies, coma</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Hypothermie</strong> (lage lichaamstemperatuur)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Stuipen of neurologische symptomen</strong></span>
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
                      24-72 Uur: Terminale Fase
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Multi-orgaanfalen</strong> - lever, nieren, hart falen achtereenvolgens</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span><strong>Overlijden</strong> zonder intensieve medische behandeling</span>
                      </li>
                    </ul>
                    <p className="mt-3 text-sm text-red-300 font-bold bg-red-900/50 rounded p-3">
                      ⚠️ Zelfs met behandeling kan het overlevingspercentage laag zijn als er meer dan 2-4 uur zijn verstreken sinds inname.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What To Do - EMERGENCY PROTOCOL */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              ⚠️ Wat Te Doen Als Je Kat Paracetamol Heeft Ingenomen
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
                    Verwijder onmiddellijk alle paracetamol-tabletten uit de buurt van je kat. Zoek eventueel gebroken tabletten of verpakkingen.
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
                    <p className="font-bold mb-1">"Mijn kat heeft paracetamol ingenomen - dit is een noodsituatie"</p>
                    <p className="text-sm text-red-200">Vertel hoeveel, wanneer, en het gewicht van je kat (als je dat weet)</p>
                  </div>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">3</span>
                    Wacht niet op symptomen
                  </h4>
                  <p className="text-red-100">
                    Ga niet thuis zitten wachten tot je kat symptomen vertoont. Tegen de tijd dat symptomen zichtbaar zijn, is de vergiftiging al vergevorderd.
                  </p>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">4</span>
                    Ga direct naar de dierenarts
                  </h4>
                  <p className="text-red-100 mb-2">
                    Rijd onmiddellijk naar de dierenarts of spoedkliniek. Neem mee:
                  </p>
                  <ul className="space-y-1 text-red-100 text-sm">
                    <li>• De verpakking van het medicijn</li>
                    <li>• Informatie over hoeveel tabletten er missen</li>
                    <li>• Tijdstip van inname (schatting)</li>
                  </ul>
                </div>

                <div className="bg-red-950 rounded-lg p-4 border-l-4 border-white">
                  <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <span className="bg-white text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-black">5</span>
                    Laat de behandeling over aan de dierenarts
                  </h4>
                  <p className="text-red-100 mb-2">
                    Doe zelf niets om braken op te wekken of je kat te laten drinken tenzij de dierenarts dit expliciet vraagt.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded-lg p-4">
                <p className="font-black text-yellow-100 text-lg mb-2">
                  Snelle actie is belangrijk
                </p>
                <p className="text-yellow-200">
                  De behandeling moet zo snel mogelijk starten voor de beste resultaten.
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
                  <span>Niet wachten op symptomen voordat je naar de dierenarts gaat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet zelf proberen braken op te wekken zonder instructies van dierenarts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet melk of voedsel geven (kan de opname versnellen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet denken "het was maar een klein stukje, het komt wel goed"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Niet advies vragen op internet in plaats van direct naar de dierenarts te bellen</span>
                </li>
              </ul>
            </div>

            {/* Veterinary Treatment */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Veterinaire Behandeling van Paracetamolvergiftiging
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              De behandeling van paracetamolvergiftiging bij katten is intensief en vereist onmiddellijke medische interventie. De dierenarts zal een combinatie van behandelingen toepassen:
            </p>

            <div className="space-y-4 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  💉 1. N-Acetylcysteïne (NAC) - Het Tegengif
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  NAC is het belangrijkste tegengif. Het helpt de lever om paracetamol af te breken en beschermt levercellen tegen verdere schade. Behandeling moet zo snel mogelijk starten voor optimale effectiviteit.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🤮 2. Braken Opwekken of Maagspoeling
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Als de behandeling snel genoeg kan starten, kan de dierenarts braken opwekken of een maagspoeling uitvoeren om onopgenomen paracetamol te verwijderen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  💊 3. Actieve Kool
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Actieve kool bindt aan paracetamol in de maag en darmen en voorkomt verdere opname in het bloed.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  💧 4. Infuustherapie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Intraveneuze vloeistoffen helpen de nieren om toxines uit te scheiden en ondersteunen de bloeddruk en orgaanfuncties.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🩸 5. Zuurstoftherapie & Bloedtransfusie
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bij ernstige methemoglobinemie kan zuurstoftherapie of zelfs een bloedtransfusie nodig zijn om voldoende zuurstof naar de organen te transporteren.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  🏥 6. Intensieve Monitoring
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Je kat zal 24-72 uur intensief gemonitord moeten worden met regelmatige bloedonderzoeken om leverfunctie, nierfunctie en bloedwaarden te controleren.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-l-4 border-blue-500 mb-12 not-prose">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                💰 Kosten van Behandeling
              </h4>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                De behandeling van paracetamolvergiftiging is intensief en kostbaar:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>• Spoedconsult: €75-150</li>
                <li>• NAC-behandeling (meerdere doses): €100-300</li>
                <li>• Infuustherapie (24-48 uur): €200-500</li>
                <li>• Bloedonderzoeken: €150-300</li>
                <li>• Zuurstoftherapie: €100-200</li>
                <li>• Opname intensieve care: €300-800 per dag</li>
              </ul>
              <p className="text-sm font-bold text-foreground dark:text-cpCream mt-3">
                Totale kosten: €1000-3000+ afhankelijk van ernst en duur van behandeling
              </p>
            </div>

            {/* Prevention */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              🛡️ Preventie: Bescherm Je Kat tegen Paracetamol
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Preventie is de enige 100% effectieve strategie. Volg deze richtlijnen om je kat te beschermen:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Veilige Opslag
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Bewaar alle medicijnen in afgesloten kastjes buiten bereik van katten</li>
                  <li>• Laat nooit pillen rondslingeren op nachtkastjes, keukentafels of werkbladen</li>
                  <li>• Controleer of verpakkingen goed gesloten zijn</li>
                  <li>• Bewaar medicijnen niet in handtassen of jaszakken die katten kunnen bereiken</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚫</span>
                  Strikt Verbod
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Geef nooit menselijke medicijnen aan katten zonder expliciet voorschrift van dierenarts</li>
                  <li>• Ook niet "een heel klein stukje" - er is geen veilige dosering</li>
                  <li>• Geef ook geen "natuurlijke" of "homeopatische" middelen zonder overleg</li>
                  <li>• Zelfs babyparacetamol is dodelijk voor katten</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Informeer Huisgenoten
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Zorg dat iedereen in huis weet: geen menselijke medicijnen aan katten</li>
                  <li>• Waarschuw gasten en oppasonderdelen expliciet</li>
                  <li>• Instrueer kinderen om nooit zelf medicijnen aan huisdieren te geven</li>
                  <li>• Bel bij twijfel altijd eerst de dierenarts</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  Gebruik Alternatieve Pijnstillers
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>• Gebruik alleen door dierenarts voorgeschreven pijnstillers voor katten</li>
                  <li>• Voorbeelden: Metacam (meloxicam), Onsior, Buprenorfine</li>
                  <li>• Volg doseringen EXACT zoals voorgeschreven</li>
                  <li>• Vraag de dierenarts bij twijfel of pijn</li>
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
                  Kan ik mijn kat een klein stukje paracetamol geven tegen pijn?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Nee, er bestaat geen veilige dosering paracetamol voor katten. Zelfs zeer kleine hoeveelheden kunnen al ernstige gezondheidsproblemen veroorzaken. Katten hebben een compleet ander metabolisme dan mensen en honden en kunnen paracetamol niet afbreken. Bel altijd je dierenarts voor veilige pijnstilling speciaal voor katten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn kat heeft een pil van de vloer gegeten maar ik weet niet zeker of het paracetamol was. Moet ik toch naar de dierenarts?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Ja, neem onmiddellijk contact op met je dierenarts. Bij elke twijfel over mogelijk paracetamolcontact moet je direct de dierenarts bellen. Beschrijf de pil (kleur, grootte, opdruk) - de dierenarts kan vaak identificeren wat het is. Het is beter om vals alarm te slaan dan te laat te zijn bij echte paracetamolvergiftiging.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Hoeveel tijd heb ik om naar de dierenarts te gaan als mijn kat paracetamol heeft ingenomen?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Snelle actie is belangrijk - neem zo snel mogelijk contact op met je dierenarts. De behandeling moet zo snel mogelijk starten voor de beste resultaten. Wacht niet op symptomen - ga onmiddellijk naar de dierenarts of spoedkliniek.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Is babyparacetamol veiliger voor katten omdat het een lagere dosering heeft?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Nee. Ook babyparacetamol is gevaarlijk voor katten. Het probleem is niet alleen de hoeveelheid, maar het feit dat katten het enzym missen om paracetamol af te breken. Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Mijn hond krijgt paracetamol van de dierenarts. Kan mijn kat daar niet aan komen?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong className="text-orange-600 dark:text-orange-400">Zorg dat je kat er absoluut niet bij kan.</strong> Honden kunnen in bepaalde doseringen paracetamol verdragen (alleen onder veterinair toezicht), maar katten niet. Bewaar medicijnen voor je hond in een afgesloten kast waar je kat niet bij kan. Geef medicijnen aan je hond in een aparte ruimte en controleer of er geen pillen op de grond vallen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                  Welke pijnstillers zijn WEL veilig voor katten?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Alleen pijnstillers die expliciet door een dierenarts zijn voorgeschreven voor katten zijn veilig. Voorbeelden: <strong>Metacam</strong> (meloxicam - NSAID voor katten), <strong>Onsior</strong> (robenacoxib), <strong>Buprenorfine</strong> (opioïde pijnstiller). Geef NOOIT menselijke pijnstillers (paracetamol, ibuprofen, aspirine, diclofenac) aan katten. Bel altijd je dierenarts bij pijn.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16 pt-8 border-t border-border dark:border-cpAmber/20 not-prose">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                Gerelateerde Artikelen over Giftige Stoffen voor Katten
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/nl/is-chocola-giftig-voor-katten" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    Is Chocola Giftig voor Katten?
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Alles over chocoladevergiftiging bij katten
                  </p>
                </Link>
                <Link href="/nl/is-ibuprofen-giftig-voor-katten" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    Is Ibuprofen Giftig voor Katten?
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Waarom ibuprofen dodelijk is voor katten
                  </p>
                </Link>
                <Link href="/nl/is-lelies-giftig-voor-katten" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    Zijn Lelies Giftig voor Katten?
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Waarom lelies dodelijk kunnen zijn voor katten
                  </p>
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-600 not-prose">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                ⚕️ Medische Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Bij vermoeden van paracetamolvergiftiging moet je ALTIJD onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Elke vertraging kan fataal zijn. De informatie op deze pagina is gebaseerd op wetenschappelijke literatuur en veterinaire richtlijnen, maar elke kat is uniek en vereist individuele veterinaire beoordeling. Bij twijfel: bel altijd je dierenarts.
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
