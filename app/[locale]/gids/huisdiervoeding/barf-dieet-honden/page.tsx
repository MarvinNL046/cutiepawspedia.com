import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Info, ThumbsUp, ThumbsDown } from "lucide-react";

export const metadata: Metadata = {
  title: "BARF Dieet voor Honden: Complete Gids, Voordelen & Nadelen",
  description: "Is het BARF dieet goed voor jouw hond? Ontdek alles over biologisch rauw voer: voordelen, nadelen, hoe te starten en expert advies.",
  keywords: "BARF dieet hond, rauw voer hond, biologisch rauw voer, BARF voordelen, BARF nadelen",
  openGraph: {
    title: "BARF Dieet voor Honden: Voordelen, Nadelen en Tips",
    description: "Complete gids over het BARF dieet (biologisch rauw voer) voor honden met expert advies en praktische tips.",
  },
};

export default function BarfDieetHondenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <Info className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Natuurlijke Voeding
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            BARF Dieet voor Honden: <span className="text-cpCoral">Complete Gids</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            BARF (Biologisch Appropriate Raw Food of Bones And Raw Food) is een voedingsmethode waarbij honden rauw vlees, botten, organen en groenten krijgen. Steeds meer hondenbaasjes kiezen voor dit natuurlijke dieet, maar is het ook geschikt voor jouw hond? In deze uitgebreide gids ontdek je alles over het BARF dieet.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Wil je starten met BARF? Vraag eerst advies aan een expert
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
        {/* Section 1: Wat is BARF */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Wat is het BARF Dieet Precies?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Het BARF dieet is gebaseerd op het idee dat honden als carnivoren het beste gedijen op een dieet dat lijkt op wat hun wilde voorouders aten: rauw vlees, botten en een kleine hoeveelheid plantaardig materiaal. In plaats van commercieel bewerkt hondenvoer krijgt je hond verse, onbewerkte ingrediënten.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">
              Typische BARF Maaltijd Bestaat Uit:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground dark:text-cpCream mb-2">Dierlijke Componenten (80-90%):</h4>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li>• Spiervlees (50-60%): kip, rund, lam, kalkoen</li>
                  <li>• Rauwe vleesbeenderen (10-15%): kippennekken, vleugels</li>
                  <li>• Organen (10%): lever, nier, hart</li>
                  <li>• Vet (5-10%): natuurlijk aanwezig in vlees</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground dark:text-cpCream mb-2">Plantaardige Componenten (10-20%):</h4>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li>• Geprakte groenten (wortel, spinazie)</li>
                  <li>• Fruit in kleine hoeveelheden</li>
                  <li>• Optioneel: kruiden, oliën, supplements</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70">
            Belangrijke opmerking: BARF is niet hetzelfde als "gewoon rauw vlees geven". Het vereist zorgvuldige planning om te zorgen dat je hond alle benodigde voedingsstoffen binnenkrijgt.
          </p>
        </section>

        {/* Section 2: Voordelen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Voordelen van het BARF Dieet
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    1. Gezondere Huid en Glanzende Vacht
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Veel BARF-voeders rapporteren een zichtbare verbetering in de vachtkwaliteit: glanzender, zachter en minder huidproblemen. Dit komt door de natuurlijke vetzuren en hoogwaardige eiwitten in rauw vlees.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    2. Betere Spijsvertering en Kleinere Ontlasting
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Rauw voer wordt efficiënter verteerd dan bewerkt voer. Hierdoor is de ontlasting kleiner, vaster en minder geurend. Ook kunnen honden met een gevoelige maag baat hebben bij BARF.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    3. Natuurlijke Tandverzorging
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Het kauwen op rauwe vleesbeenderen helpt bij het verwijderen van tandplak en tandsteen, wat bijdraagt aan betere mondgezondheid en frissere adem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    4. Meer Energie en Vitaliteit
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Veel hondenbaasjes merken dat hun hond energieker en alerter is op een BARF dieet. Dit kan komen door de betere voedingsstoffen opname en het ontbreken van vulstoffen.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    5. Volledige Controle over Ingrediënten
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Je weet precies wat je hond eet: geen geheimzinnige bijproducten, kunstmatige toevoegingen of conserveringsmiddelen. Dit is vooral waardevol voor honden met allergieën.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    6. Gewichtsbeheersing
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Door het hoge eiwitgehalte en lage koolhydratengehalte kan BARF helpen bij het behouden van een gezond gewicht. Lees meer over{" "}
                    <Link href="/nl/gids/huisdiervoeding/huisdier-afvallen" className="text-cpCoral hover:underline">
                      gezond gewicht voor huisdieren
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Nadelen en Risico's */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Nadelen en Risico's van BARF
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <ThumbsDown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    1. Bacterieel Risico (Salmonella, E. coli)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Rauw vlees kan schadelijke bacteriën bevatten die gevaarlijk zijn voor zowel je hond als je gezin, vooral jonge kinderen, ouderen en mensen met een verzwakt immuunsysteem.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Let op: Goede hygiëne is essentieel! Was handen, werk- en voerbakken grondig na elke maaltijd. Lees ook onze gids over{" "}
                    <Link href="/nl/gids/huisdiervoeding/giftig-voedsel-honden-katten" className="underline">
                      veilig voedsel voor honden
                    </Link>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <ThumbsDown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    2. Risico op Voedingstekorten
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Een slecht samengesteld BARF dieet kan leiden tot tekorten aan calcium, vitamines of andere essentiële voedingsstoffen. Dit vraagt kennis en zorgvuldige planning.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <ThumbsDown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    3. Verstikkingsgevaar en Darmperforatie
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Gekookte botten kunnen versplinterden, maar ook rauwe botten kunnen gevaarlijk zijn als ze te klein zijn of verkeerd worden gegeten. Kies altijd passende botten voor de grootte van je hond.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <ThumbsDown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    4. Tijd en Kosten
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    BARF vereist dagelijkse voorbereiding: inkoop, snijden, afwegen, mengen en opruimen. Het is ook vaak duurder dan commercieel hondenvoer, vooral bij kwaliteitsvlees.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <ThumbsDown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    5. Niet Voor Elke Hond Geschikt
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Honden met een verzwakt immuunsysteem, nierprobleem of bepaalde medische aandoeningen zijn extra gevoelig voor bacteriën in rauw voer. Bespreek BARF altijd eerst met je dierenarts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 mt-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Twijfel of BARF Geschikt is voor Jouw Hond?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Laat je adviseren door een dierenarts of diervoedingsspecialist voordat je start met BARF. Zij kunnen een persoonlijk voedingsplan opstellen op basis van ras, leeftijd en gezondheid.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Vind een dierenarts voor voedingsadvies →
            </Link>
          </div>
        </section>

        {/* Section 4: Hoe te starten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Stappenplan: Hoe Start je met BARF?
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Doe Onderzoek en Raadpleeg een Expert
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Leer over BARF, lees boeken, volg cursussen en praat met je dierenarts. Een goede start is het halve werk!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Start Geleidelijk (Transitieperiode 7-14 Dagen)
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Schakel niet plots over! Begin met 25% BARF gemengd met 75% huidig voer. Verhoog geleidelijk over 1-2 weken naar 100% BARF.
                  </p>
                  <p className="text-sm text-cpCoral">
                    Tip: Sommige experts raden aan om direct over te schakelen (zonder transitie) maar vraag altijd eerst advies aan je dierenarts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Bereken de Juiste Hoeveelheid
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                    Vuistregel: 2-3% van het lichaamsgewicht per dag voor volwassen honden. Een hond van 20 kg krijgt dus 400-600 gram per dag.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                    <li>• Puppies: 5-10% van lichaamsgewicht</li>
                    <li>• Actieve honden: 3-4% van lichaamsgewicht</li>
                    <li>• Senior honden: 1.5-2% van lichaamsgewicht</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Kies Kwaliteitsvlees van Betrouwbare Leveranciers
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Koop vers vlees bij de slager, speciaalzaken of online BARF-leveranciers. Let op certificeringen en hygiëne. Koop nooit vlees waarvan je de herkomst niet kent.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cpCoral">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Monitor en Pas Aan
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Let op vacht, stoelgang, energieniveau en gewicht. Pas de hoeveelheid en samenstelling aan indien nodig. Laat je hond regelmatig controleren door de dierenarts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: BARF vs Commercieel Voer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            BARF vs Commercieel Hondenvoer
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20">
              <thead className="bg-cpCoral/10 dark:bg-cpCoral/5">
                <tr>
                  <th className="text-left p-4 font-bold text-foreground dark:text-cpCream">Aspect</th>
                  <th className="text-left p-4 font-bold text-cpCoral">BARF Dieet</th>
                  <th className="text-left p-4 font-bold text-cpAmber">Premium Commercieel Voer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Kosten</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">€50-100/maand (20kg hond)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">€40-80/maand</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Tijdsinvestering</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">15-30 min/dag (bereiding)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">2 min/dag (afmeten)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Ingrediëntencontrole</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Volledig</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Beperkt (afhankelijk van merk)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Voedingsbalans</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Handmatig plannen vereist</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Wetenschappelijk gebalanceerd</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Hygiënerisico</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Hoger (bacteriën)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Lager</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground dark:text-cpCream">Gemak</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Laag (dagelijkse bereiding)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/70">Hoog (direct uit zak)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-4">
            Beide methoden kunnen gezond zijn als ze correct worden uitgevoerd. De beste keuze hangt af van jouw situatie, tijd, budget en de behoeften van je hond. Voor meer informatie over commercieel voer, bekijk onze gids over{" "}
            <Link href="/nl/gids/huisdiervoeding/beste-hondenvoer" className="text-cpCoral hover:underline">
              het beste hondenvoer
            </Link>.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over BARF
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn gekookte botten gevaarlijk?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja! Gekookte botten worden hard en bros, waardoor ze kunnen versplinteren in scherpe stukken die de darm kunnen perforeren. Geef ALLEEN rauwe vleesbeenderen. Nooit gekookte, gegrilde of gebakken botten. Ook bevroren botten kunnen gevaarlijk zijn - laat ze eerst ontdooien.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik BARF combineren met commercieel voer?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit is omstreden. Sommige experts raden het af omdat BARF en brokken verschillende verteringstijden hebben. Anderen zien geen probleem in een 50/50 verdeling. Als je wilt combineren: geef BARF en brokken in aparte maaltijden (bijv. BARF 's ochtends, brokken 's avonds) en monitor je hond goed op maagklachten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe voorkom ik voedingstekorten?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Variatie is key! Gebruik verschillende vleessoorten (kip, rund, lam, vis), organen (lever, nier, hart) en vleesbeenderen. Voeg ook groenten en fruit toe. Overweeg supplements zoals visolie (omega-3), kelp (jodium) of een multivitamine voor honden. Laat je hond jaarlijks bloedonderzoek doen om tekorten op te sporen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is BARF geschikt voor puppies?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, maar puppies hebben extra voedingsstoffen nodig voor groei (vooral calcium en fosfor in de juiste verhouding). Een slecht samengesteld BARF dieet kan leiden tot groeistoornissen. Raadpleeg altijd een dierenarts of voedingsspecialist voordat je een puppy BARF gaat geven. Puppies krijgen ook meer voer: 5-10% van lichaamsgewicht per dag.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Klaar om te Starten met BARF?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Vind dierenartsen en voedingsspecialisten bij jou in de buurt die je kunnen helpen met een persoonlijk BARF voedingsplan voor jouw hond.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Vind expert voedingsadvies →
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
              "headline": "BARF Dieet voor Honden: Complete Gids met Voordelen en Nadelen",
              "description": "Alles over het BARF dieet (biologisch rauw voer) voor honden. Ontdek voordelen, nadelen, hoe te starten en expert tips.",
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
