import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Scale, Droplet, Info, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Kattenvoer Nat vs Droog: Complete Vergelijking & Advies",
  description: "Wat is beter voor jouw kat: nat of droog voer? Ontdek de verschillen, voor- en nadelen en krijg expert advies voor gezonde kattenvoeding.",
  keywords: "kattenvoer nat droog, natvoer kat, droogvoer kat, beste kattenvoer, kattenvoeding vergelijking",
  openGraph: {
    title: "Kattenvoer Vergelijken: Nat vs Droog Voer - Wat is Beter?",
    description: "Ontdek de verschillen tussen nat en droog kattenvoer en maak de beste keuze voor jouw kat.",
  },
};

export default function KattenvoerNatVsDroogPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAmber/10 via-cpCoral/5 to-transparent dark:from-cpAmber/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAmber/10 dark:bg-cpCharcoal/60 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
            <Scale className="h-4 w-4 text-cpAmber" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Voedingsvergelijking
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Kattenvoer Vergelijken: <span className="text-cpCoral">Nat vs Droog Voer</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Een van de meest gestelde vragen door katteneigenaren is: "Is nat of droog voer beter voor mijn kat?" Het antwoord is niet eenduidig en hangt af van verschillende factoren zoals leeftijd, gezondheid en persoonlijke voorkeuren van jouw kat. In deze gids vergelijken we beide opties uitgebreid.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Twijfel je over de beste voeding voor jouw kat?
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Vind een dierenspeciaalzaak bij jou in de buurt →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Quick Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Snelle Vergelijking: Nat vs Droog Kattenvoer
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20">
              <thead className="bg-cpCoral/10 dark:bg-cpCoral/5">
                <tr>
                  <th className="text-left p-4 font-bold text-foreground dark:text-cpCream">Eigenschap</th>
                  <th className="text-left p-4 font-bold text-cpCoral">Natvoer</th>
                  <th className="text-left p-4 font-bold text-cpAmber">Droogvoer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Vochtgehalte</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">70-80%</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">8-10%</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Kosten per portie</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Duurder</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Goedkoper</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Houdbaarheid</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">24u na openen</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Weken/maanden</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Tandverzorging</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Minimaal</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Helpt bij reiniging</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Smaak</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Intensiever</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Minder intens</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Gemak</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Meer opruimwerk</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Praktisch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1: Voordelen Natvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Voordelen van Natvoer voor Katten
          </h2>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Droplet className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">1. Hoge Vochtopname</h3>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  Het grootste voordeel van natvoer is het hoge vochtgehalte (70-80%). Katten zijn van nature slechte drinkers en krijgen veel vocht binnen via hun voedsel. Dit is vooral belangrijk voor katten met nierproblemen, urineweginfecties of een geschiedenis van kristallen in de urine.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">2. Gewichtsbeheersing</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Door het hoge vochtgehalte en lage calorie-dichtheid is natvoer ideaal voor katten die moeten afvallen of hun gewicht moeten behouden. Je kat voelt zich sneller verzadigd met minder calorieën. Lees meer over{" "}
                <Link href="/nl/gids/huisdiervoeding/huisdier-afvallen" className="text-cpCoral hover:underline">
                  gezond afvallen voor huisdieren
                </Link>.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">3. Smaakvoller en Aantrekkelijker</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Natvoer heeft een sterkere geur en intensievere smaak, wat het zeer aantrekkelijk maakt voor kieskeurige eters, zieke katten of senior katten met verminderde reuk- en smaakzin.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">4. Gemakkelijker te Kauwen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Voor oudere katten met tandproblemen of katten in herstel na ziekte is natvoer zachter en gemakkelijker te eten dan harde brokjes.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">5. Hogere Eiwitopname</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Kwaliteitsvol natvoer bevat vaak meer dierlijke eiwitten en minder koolhydraten dan droogvoer, wat beter aansluit bij de natuurlijke carnivore behoeften van katten.
              </p>
            </div>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/5 dark:from-cpAmber/5 dark:to-cpCoral/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/20 mt-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Advies nodig over kattenvoeding?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Een dierenarts kan je helpen de juiste voedingskeuze te maken op basis van de leeftijd, gezondheid en specifieke behoeften van jouw kat.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Bekijk dierenartsen voor voedingsadvies →
            </Link>
          </div>
        </section>

        {/* Section 2: Voordelen Droogvoer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Voordelen van Droogvoer voor Katten
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">1. Betaalbaar en Economisch</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Droogvoer is per portie goedkoper dan natvoer en heeft een veel langere houdbaarheid. Dit maakt het ideaal voor budgetbewuste kattenbaasjes of huishoudens met meerdere katten.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">2. Tandgezondheid</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Het kauwen op harde brokjes helpt bij het verwijderen van tandplak en tandsteen, wat de tandgezondheid bevordert. Let wel: dit is geen vervanging voor professionele tandverzorging.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">3. Praktisch en Gemakkelijk</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Droogvoer kan de hele dag in de voerbak blijven staan zonder te bederven, wat ideaal is voor katten die graag meerdere kleine porties per dag eten. Het is ook makkelijker te bewaren en minder rommel.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">4. Hogere Energiedichtheid</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Droogvoer bevat meer calorieën per gram, wat nuttig is voor zeer actieve katten, groeiende kittens of katten die moeten aankomen.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">5. Reisgemak</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Voor katten die meegaan op vakantie of regelmatig verhuizen, is droogvoer praktischer door de lange houdbaarheid en eenvoudige opslag.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Nadelen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Nadelen van Nat en Droog Kattenvoer
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
              <h3 className="text-xl font-bold text-cpCoral mb-4">Nadelen Natvoer</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Duurder in aanschaf</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Korte houdbaarheid na openen (24u)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Meer verpakkingsafval</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Kan minder goed zijn voor tandgezondheid</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Moet in koelkast bewaard worden</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10">
              <h3 className="text-xl font-bold text-cpAmber mb-4">Nadelen Droogvoer</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Laag vochtgehalte (risico dehydratie)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Hogere calorie-dichtheid (risico overgewicht)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Vaak meer koolhydraten</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Minder aantrekkelijk voor kieskeurige katten</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Mogelijk minder eiwitrijk</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Best of Both Worlds */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Combineren: Het Beste van Twee Werelden
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Veel dierenartsen en kattenexperts bevelen een combinatie van nat en droog voer aan. Dit geeft je kat de voordelen van beide voedingssoorten en voorkomt dat ze te kieskeurig worden.
          </p>

          <div className="bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Aanbevolen Combinatie Schema's:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Schema 1: 75% Natvoer + 25% Droogvoer</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Ideaal voor katten met nierprobleem of dehydratierisico. Geef 's ochtends en 's avonds natvoer, met een kleine hoeveelheid droogvoer tussentijds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Schema 2: 50% Natvoer + 50% Droogvoer</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Gebalanceerde aanpak. Geef 's ochtends natvoer en laat droogvoer beschikbaar voor grazing gedurende de dag.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground dark:text-cpCream">Schema 3: Primair Droogvoer + Natvoer als Traktatie</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Voor budgetbewuste baasjes. Droogvoer als basis met een portie natvoer 2-3x per week als variatie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            Belangrijk: Zorg altijd voor voldoende vers water, ongeacht welk type voer je kiest. Voor meer informatie over gezonde voeding, bekijk ook onze gids over{" "}
            <Link href="/nl/gids/huisdiervoeding/beste-hondenvoer" className="text-cpCoral hover:underline">
              het beste hondenvoer
            </Link>.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet ik mijn kat alleen natvoer of alleen droogvoer geven?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Beide opties zijn mogelijk, maar een combinatie van nat en droogvoer wordt vaak aanbevolen. Dit zorgt voor variatie, optimaliseert vochtinname en ondersteunt tandgezondheid. Overleg met je dierenarts over wat het beste is voor jouw specifieke kat.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel water moet mijn kat drinken bij droogvoer?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Een kat moet ongeveer 60-80 ml water per kg lichaamsgewicht per dag drinken. Voor een kat van 4 kg is dat 240-320 ml water per dag. Bij droogvoer is het extra belangrijk om vers water altijd beschikbaar te hebben. Sommige katten drinken liever uit een drinkfontein of kom met stromend water.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is natvoer beter voor katten met nierprobleem?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, natvoer wordt vaak aanbevolen voor katten met nierproblemen omdat het hoge vochtgehalte helpt bij hydratatie en de nieren ontlast. Bij chronische nierziekte is gespecialiseerd nierdieetvoer (zowel nat als droog) echter de beste keuze. Vraag altijd advies aan je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik van droogvoer naar natvoer overschakelen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, maar doe dit geleidelijk over 7-10 dagen om maagklachten te voorkomen. Begin met 25% natvoer gemengd met 75% droogvoer, en verhoog het percentage natvoer elke 2-3 dagen. Sommige katten wennen snel, andere hebben meer tijd nodig. Wees geduldig en monitor de stoelgang van je kat.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpAmber via-cpCoral to-cpCoral/90 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hulp Nodig bij Voedingskeuze?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Vind dierenspeciaalzaken en dierenartsen bij jou in de buurt die je kunnen helpen de perfecte voeding voor jouw kat te kiezen.
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
              "headline": "Kattenvoer Vergelijken: Nat vs Droog Voer - Complete Gids",
              "description": "Ontdek de verschillen tussen nat en droog kattenvoer. Vergelijk voordelen, nadelen en krijg expert advies voor de beste keuze voor jouw kat.",
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
