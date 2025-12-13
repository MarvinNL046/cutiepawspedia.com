import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, TrendingDown, Activity, AlertTriangle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Huisdier Afvallen: Gezonde Dieet Tips voor Honden & Katten",
  description: "Is jouw huisdier te zwaar? Ontdek veilige manieren om je hond of kat gezond te laten afvallen met expert dieet tips en voedingsadvies.",
  keywords: "huisdier afvallen, hond afvallen, kat afvallen, dieet hond, dieet kat, overgewicht huisdier",
  openGraph: {
    title: "Huisdier op Dieet: Tips voor Gezond Afvallen",
    description: "Praktische gids voor het gezond laten afvallen van je hond of kat met expert voedingsadvies.",
  },
};

export default function HuisdierAfvallenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <TrendingDown className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Gezond Gewichtsverlies
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Huisdier op Dieet: <span className="text-cpCoral">Tips voor Gezond Afvallen</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Overgewicht bij huisdieren is een groeiend probleem dat kan leiden tot ernstige gezondheidsproblemen. In Nederland heeft ongeveer 50% van de honden en katten overgewicht. Gelukkig kun je met de juiste aanpak en begeleiding je huisdier veilig en gezond laten afvallen.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Wil je een professioneel afvalplan voor jouw huisdier?
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Vind een dierenarts voor voedingsadvies →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Herken Overgewicht */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Hoe Herken je Overgewicht bij je Huisdier?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Het is niet altijd makkelijk om te zien of je huisdier te zwaar is, vooral bij langharige rassen. Gebruik deze simpele checks om het gewicht van je hond of kat te beoordelen.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-cpAmber" />
              Body Condition Score (BCS) Test:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Ideaal gewicht:</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Je kunt de ribben voelen met lichte druk, er is een zichtbare taille en een lichte buikholte zichtbaar van opzij.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Licht overgewicht (5-15%):</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Ribben zijn moeilijker te voelen, taille is minder zichtbaar, lichte vetlaag op de rug.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Overgewicht (15-30%):</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Ribben zijn niet meer voelbaar, geen zichtbare taille, hangbuik, vetophopingen op rug en staartbasis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Obesitas (meer dan 30%):</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Duidelijke vetmassa, geen taille, dikke hangbuik, moeite met bewegen, hijgend bij minimale inspanning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            Twijfel je of je huisdier te zwaar is? Laat het gewicht checken bij de dierenarts tijdens het jaarlijkse controlebezoek.
          </p>
        </section>

        {/* Section 2: Gezondheidsrisico's */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Gezondheidsrisico's van Overgewicht
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Overgewicht is meer dan een cosmetisch probleem. Het verhoogt het risico op verschillende ernstige aandoeningen en kan de levensverwachting van je huisdier met 2-3 jaar verkorten.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">Voor Honden:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Gewrichtsproblemen en artrose</li>
                <li>• Hartaandoeningen</li>
                <li>• Diabetes type 2</li>
                <li>• Ademhalingsproblemen</li>
                <li>• Verhoogde kans op kanker</li>
                <li>• Huidproblemen</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-cpCoral mb-2">Voor Katten:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Diabetes mellitus</li>
                <li>• Leveraandoeningen (hepatische lipidose)</li>
                <li>• Urinewegproblemen</li>
                <li>• Gewrichtsproblemen</li>
                <li>• Huidinfecties</li>
                <li>• Verhoogd operatierisico</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Afvalplan */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Stappenplan voor Gezond Afvallen
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 1
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Bezoek de Dierenarts
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Laat je huisdier eerst onderzoeken om onderliggende medische oorzaken uit te sluiten (bijv. schildklierprobleem). De dierenarts bepaalt het streefgewicht en maakt een persoonlijk afvalplan.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Streefgewicht bepalen | ✓ Gezondheidscheck | ✓ Persoonlijk afvalplan
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 2
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Bereken de Juiste Calorie-inname
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Verminder de dagelijkse calorie-inname met 20-30% ten opzichte van de huidige inname. Meet porties altijd af met een maatbeker of weegschaal. Een veilige afvalsnelheid is 1-2% lichaamsgewicht per week.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Porties afmeten | ✓ 20-30% caloriereductie | ✓ Geleidelijk gewichtsverlies
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 3
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Kies Dieetvoer of Pas Huidig Voer Aan
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Overweeg speciaal dieetvoer met lage calorie-dichtheid maar hoge verzadiging. Of gebruik het huidige voer maar in kleinere porties. Kies voor hoogwaardige eiwitten en meer vezels voor verzadiging. Lees meer over{" "}
                    <Link href="/nl/gids/huisdiervoeding/beste-hondenvoer" className="text-cpCoral hover:underline">
                      het beste hondenvoer
                    </Link>.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Dieetvoer overwegen | ✓ Hoogwaardige eiwitten | ✓ Meer vezels
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 4
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Stop met Tussendoortjes en Tafelvoer
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Tussendoortjes en tafelresten zijn vaak de grootste valkuil. Vermijd menselijk voer volledig en beperk treats tot maximum 10% van de dagelijkse calorie-inname. Kies voor gezonde alternatieven zoals komkommer of wortel.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Geen tafelvoer | ✓ Max 10% treats | ✓ Gezonde snacks
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 5
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Verhoog Beweging Geleidelijk
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Start met korte wandelingen (5-10 min) en bouw dit langzaam op naar 30-60 minuten per dag voor honden. Voor katten: speel 10-15 minuten 2-3x per dag met interactief speelgoed. Let op gewrichten bij zwaar overgewicht.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Start geleidelijk | ✓ Bouw langzaam op | ✓ Let op gewrichten
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">
                    meer dan 6
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Monitor en Pas Aan
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Weeg je huisdier wekelijks op dezelfde tijd. Noteer het gewicht en pas de voeding aan indien nodig. Verwacht 0,5-1 kg gewichtsverlies per maand voor honden, 200-400 gram voor katten. Bezoek de dierenarts maandelijks voor controle.
                  </p>
                  <p className="text-sm text-cpCoral font-medium">
                    ✓ Wekelijks wegen | ✓ Gewicht bijhouden | ✓ Maandelijkse controle
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 mt-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Professionele Begeleiding Nodig?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Een dierenarts of diervoedingsspecialist kan een persoonlijk afvalplan opstellen en je gedurende het hele proces begeleiden voor optimale resultaten.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Bekijk dierenartsen voor voedingsadvies →
            </Link>
          </div>
        </section>

        {/* Section 4: Veelgemaakte Fouten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgemaakte Fouten bij Afvallen
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpCoral/10">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cpCoral" />
                Te Snelle Gewichtsafname
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Te snel afvallen (meer dan 2% lichaamsgewicht per week) kan gevaarlijk zijn, vooral voor katten (risico op leverziekte). Geleidelijk is veiliger en duurzamer.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpCoral/10">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cpCoral" />
                Geen Portiecontrole
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                "Een beetje extra" kan het verschil maken tussen succes en mislukking. Meet altijd exact af met een maatbeker of weegschaal.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpCoral/10">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cpCoral" />
                Tussendoortjes Vergeten Mee te Tellen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Alle caloriebronnen tellen mee: treats, kauwsticks, tafelresten. Zelfs kleine tussendoortjes kunnen grote impact hebben op het totaal.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-cpCoral/20 dark:border-cpCoral/10">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cpCoral" />
                Te Weinig Beweging
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Dieet alleen is niet genoeg. Beweging is essentieel voor spieropbouw, metabolisme en algemeen welzijn.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang duurt het voordat mijn huisdier op streefgewicht is?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit hangt af van hoeveel overgewicht je huisdier heeft. Bij een veilige afvalsnelheid van 1-2% per week, duurt het ongeveer 3-6 maanden voor een huisdier met 10-20% overgewicht. Bij obesitas kan het 6-12 maanden duren. Geduld is essentieel!
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik gewoon minder voer geven van het huidige merk?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dat kan, maar speciaal dieetvoer heeft vaak voordelen: lagere calorie-dichtheid, meer vezels voor verzadiging, en een optimale balans van voedingsstoffen. Als je het huidige voer blijft gebruiken, verminder dan geleidelijk de portie met 20-30% en monitor het gewichtsverlies.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn huisdier bedelt constant om eten, wat moet ik doen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Verdeel de dagelijkse portie over meerdere kleine maaltijden (3-4x per dag) voor meer verzadiging. Gebruik interactief speelgoed of voerpuzzels om het eten langer te laten duren. Geef extra groenten als filler (bijv. gare groene bonen voor honden). En heel belangrijk: geef niet toe aan bedelen, dit versterkt het gedrag alleen maar.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welke gezonde treats kan ik geven tijdens het afvallen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor honden: kleine stukjes wortel, komkommer, appel (zonder pitjes), gare groene bonen, of speciaal dieet-treats. Voor katten: kleine stukjes gekookte kip of vis, of speciale kattengras-treats. Belangrijk: tel alle treats mee in de dagelijkse calorie-inname (max 10% van totaal).
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Vandaag met een Gezonder Leven
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Vind dierenartsen en voedingsspecialisten bij jou in de buurt die je kunnen helpen met een persoonlijk afvalplan voor jouw huisdier.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Ontdek alle huisdierservices →
            </Link>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Huisdier op Dieet: Tips voor Gezond Afvallen",
              "description": "Complete gids voor het gezond laten afvallen van je hond of kat. Inclusief stappenplan, voedingsadvies en expert tips.",
              "author": {
                "@type": "Organization",
                "name": "CutiePawsPedia"
              },
              "publisher": {
                "@type": "Organization",
                "name": "CutiePawsPedia",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://cutiepawspedia.com/logo.png"
                }
              },
              "datePublished": "2024-01-15",
              "dateModified": "2024-01-15"
            })
          }}
        />
      </article>
    </div>
  );
}
