import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Heart, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Je hond alleen thuis laten: verlatingsangst voorkomen",
  description: "Leer je hond stapsgewijs alleen thuis zijn zonder stress. Complete gids voor het voorkomen en behandelen van verlatingsangst met bewezen methoden.",
  keywords: "hond alleen thuis, verlatingsangst hond, hond jankt alleen thuis, hondentraining alleen laten, separation anxiety",
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/gids/huisdiertraining/hond-alleen-thuis",
  },
  openGraph: {
    title: "Je hond alleen thuis laten: verlatingsangst voorkomen",
    description: "Complete gids voor verlatingsangst bij honden. Leer je hond stapsgewijs en stressvrij alleen zijn.",
    url: "https://cutiepawspedia.com/nl/gids/huisdiertraining/hond-alleen-thuis",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function HondAlleenThuisPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cpPink/10 via-background to-cpAqua/10 py-16 md:py-24">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-cpPink/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-cpAqua/20 rounded-full hidden lg:block" />

        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpPink/10 border border-cpPink/30 mb-6">
              <span className="text-lg">🏠</span>
              <span className="text-sm font-medium text-foreground">Verlatingsangst Expert</span>
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Je hond alleen thuis laten: <span className="text-cpPink">verlatingsangst voorkomen</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Leer je hond stapsgewijs en stressvrij alleen zijn met onze wetenschappelijk onderbouwde
              desensibilisatie methode. Van 30 seconden naar 8 uur zonder paniek.
            </p>

            {/* Primary CTA */}
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpPink text-white rounded-xl px-8 py-4 text-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              Vind een hondentrainer bij jou in de buurt →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Verlatingsangst is een van de meest voorkomende gedragsproblemen bij honden en kan leiden
            tot ernstige stress voor zowel hond als eigenaar. Het goede nieuws: met de juiste aanpak
            is verlatingsangst te voorkomen én te behandelen. Deze complete gids legt uit hoe je
            stapsgewijs je hond leert om ontspannen alleen thuis te zijn, gebaseerd op wetenschappelijke
            inzichten in honden gedrag en stress management.
          </p>
        </div>

        {/* Understanding Separation Anxiety */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 text-cpPink" />
            Wat is verlatingsangst en hoe herken je het?
          </h2>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-8">
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-3 text-xl">Definitie van verlatingsangst</h3>
              <p className="text-muted-foreground">
                Verlatingsangst (separation anxiety) is een paniekstoornis waarbij een hond extreme
                stress ervaart wanneer gescheiden van zijn eigenaar. Het is geen kwestie van "verwend zijn"
                of "ongehoorzaam zijn" - het is echte, overweldigende angst.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Symptomen van verlatingsangst:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Janken, blaffen, huilen (soms uren achtereen)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Destructief gedrag (meubels, deuren, kozijnen)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Onzindelijkheid (plassen/poepen binnen)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Hypersalivatie (overmatig kwijlen)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Pogingen tot ontsnappen (krassen bij deur)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Tempo lopen/rusteloos gedrag
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Symptomen beginnen direct na vertrek
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    Extreme begroeting bij thuiskomst
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Normaal gedrag vs. angst:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold text-foreground mb-1">Normaal: Kort protest</p>
                    <p className="text-muted-foreground">5-15 min janken, daarna rustig</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold text-foreground mb-1">Angst: Uren paniek</p>
                    <p className="text-muted-foreground">Constante stress tot je terugkeert</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold text-foreground mb-1">Normaal: Blij bij thuiskomst</p>
                    <p className="text-muted-foreground">Enthousiast maar kalmeert snel</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold text-foreground mb-1">Angst: Hysterische begroeting</p>
                    <p className="text-muted-foreground">Trillen, plassen van opwinding, kan niet kalmeren</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cpPink/10 rounded-xl border-l-4 border-cpPink">
              <p className="text-sm font-semibold text-foreground mb-2">⚠️ Belangrijk te weten:</p>
              <p className="text-sm text-muted-foreground">
                Verlatingsangst is NIET: verveling, gebrek aan training, wraak, of dominantie.
                Het is een echte angststoornis die empathie en geduld vereist, geen straf.
              </p>
            </div>
          </div>
        </section>

        {/* Causes and Risk Factors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Waarom ontstaat verlatingsangst?</h2>

          <div className="bg-gradient-to-br from-cpAqua/5 to-cpPink/5 rounded-2xl p-8 border border-cpAqua/20">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-foreground mb-4">Risicofactoren:</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Te vroeg gescheiden van moeder</strong> (voor 8 weken oud)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Asiel/rescue honden</strong> met traumatische ervaring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Plotselinge verandering</strong> in routine (thuiswerken → kantoor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Overdreven afhankelijkheid</strong> aangemoedigd door eigenaar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Nooit alleen geleerd</strong> als puppy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Genetische aanleg</strong> (angstiger temperament)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-4">Veelvoorkomende triggers:</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>Sleutels pakken / jas aantrekken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>Schoenen aandoen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>Tas/rugzak pakken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>Naar de deur lopen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>"Tot zo" of "Dag" zeggen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpPink mt-0.5">🔔</span>
                    <span>Alarm afgaan (voor werk)</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-cpYellow/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Tip:</strong> Varieer je vertrek-routine om
                    deze triggers te desensibiliseren.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Training Protocol */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-cpAqua" />
            Het systematische desensibilisatie trainingsplan
          </h2>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-8">
            <div className="mb-6 p-6 bg-cpPink/10 rounded-xl">
              <h3 className="font-bold text-foreground mb-3">Basisprincipes voor succes:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Geleidelijkheid:</strong> Bouw seconde voor seconde op</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Succeservaring:</strong> Stop altijd voordat stress ontstaat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Geduld:</strong> Dit proces kan weken tot maanden duren</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Consistentie:</strong> Train dagelijks met meerdere korte sessies</span>
                </li>
              </ul>
            </div>

            {/* Phase 1 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cpPink text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Fase 1: Trigger-desensibilisatie (Week 1-2)</h3>
                  <p className="text-sm text-muted-foreground">Maak vertrek-signalen betekenisloos</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cpPink/5 to-white rounded-xl p-6">
                <p className="text-muted-foreground mb-4">
                  Herhaal vertrek-rituelen zonder daadwerkelijk weg te gaan, tot je hond niet meer reageert:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="p-4 bg-white rounded-lg border border-cpPink/20">
                    <p className="font-semibold text-foreground mb-2">Oefening 1: Sleutels pakken</p>
                    <p className="text-muted-foreground">
                      Pak sleutels → leg terug. Herhaal 20x per dag. Als hond niet meer reageert: volgende stap.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-cpPink/20">
                    <p className="font-semibold text-foreground mb-2">Oefening 2: Jas aantrekken</p>
                    <p className="text-muted-foreground">
                      Trek jas aan → trek uit. Herhaal. Combineer met sleutels pakken. Ga NIET naar buiten.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-cpPink/20">
                    <p className="font-semibold text-foreground mb-2">Oefening 3: Bij deur staan</p>
                    <p className="text-muted-foreground">
                      Loop naar deur → keer terug. Varieer tijden (5 sec - 2 min bij deur staan).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cpAqua text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Fase 2: Korte afwezigheid opbouwen (Week 3-6)</h3>
                  <p className="text-sm text-muted-foreground">Seconde voor seconde buiten zijn</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cpAqua/5 to-white rounded-xl p-6">
                <p className="text-muted-foreground mb-4">
                  Begin extreem kort en bouw langzaam op. Gebruik deze progressie:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cpAqua/10">
                        <th className="p-3 text-left font-semibold text-foreground">Stap</th>
                        <th className="p-3 text-left font-semibold text-foreground">Tijd buiten</th>
                        <th className="p-3 text-left font-semibold text-foreground">Herhaling</th>
                        <th className="p-3 text-left font-semibold text-foreground">Succesindicator</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-t border-border">
                        <td className="p-3">1</td>
                        <td className="p-3 font-semibold">10 seconden</td>
                        <td className="p-3">10x per dag, 2 dagen</td>
                        <td className="p-3">Geen janken/blaffen</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">2</td>
                        <td className="p-3 font-semibold">30 seconden</td>
                        <td className="p-3">8x per dag, 2 dagen</td>
                        <td className="p-3">Rustig blijven</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">3</td>
                        <td className="p-3 font-semibold">1 minuut</td>
                        <td className="p-3">6x per dag, 3 dagen</td>
                        <td className="p-3">Ontspannen houding</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">4</td>
                        <td className="p-3 font-semibold">2 minuten</td>
                        <td className="p-3">5x per dag, 3 dagen</td>
                        <td className="p-3">Gaat liggen/spelen</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">5</td>
                        <td className="p-3 font-semibold">5 minuten</td>
                        <td className="p-3">4x per dag, 4 dagen</td>
                        <td className="p-3">Normale activiteit</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">6</td>
                        <td className="p-3 font-semibold">10 minuten</td>
                        <td className="p-3">3x per dag, 5 dagen</td>
                        <td className="p-3">Slaapt/rust</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3">7</td>
                        <td className="p-3 font-semibold">20 minuten</td>
                        <td className="p-3">2x per dag, 1 week</td>
                        <td className="p-3">Volledig ontspannen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <p className="text-sm font-semibold text-foreground mb-2">⚠️ Cruciale regel:</p>
                  <p className="text-sm text-muted-foreground">
                    Als je hond stress toont bij een stap: ga 2 stappen terug en bouw langzamer op.
                    Haast maken = maanden vertraging. Geduld = sneller resultaat.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cpYellow text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Fase 3: Langere periodes (Week 7+)</h3>
                  <p className="text-sm text-muted-foreground">30 minuten → 8 uur opbouwen</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cpYellow/5 to-white rounded-xl p-6">
                <p className="text-muted-foreground mb-4">
                  Vanaf 20-30 minuten kun je grotere sprongen maken, maar blijf conservatief:
                </p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="font-bold text-cpYellow">30 min</span>
                    <span>→</span>
                    <span className="font-bold text-cpYellow">45 min</span>
                    <span className="text-xs">(herhaal 1 week)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="font-bold text-cpYellow">45 min</span>
                    <span>→</span>
                    <span className="font-bold text-cpYellow">1 uur</span>
                    <span className="text-xs">(herhaal 1 week)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="font-bold text-cpYellow">1 uur</span>
                    <span>→</span>
                    <span className="font-bold text-cpYellow">2 uur</span>
                    <span className="text-xs">(herhaal 1 week)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="font-bold text-cpYellow">2 uur</span>
                    <span>→</span>
                    <span className="font-bold text-cpYellow">4 uur</span>
                    <span className="text-xs">(herhaal 2 weken)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="font-bold text-cpYellow">4 uur</span>
                    <span>→</span>
                    <span className="font-bold text-cpYellow">6-8 uur</span>
                    <span className="text-xs">(herhaal 2-3 weken)</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-cpAqua/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Tip:</strong> Gebruik een camera om te monitoren.
                    Stress kan ontstaan na 15 minuten terwijl je denkt dat 30 min ok was.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-3xl p-8 md:p-12 text-center mb-16 border border-cpAqua/30">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ernstige verlatingsangst die niet verbetert?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sommige gevallen vereisen professionele begeleiding van een gecertificeerde
            gedragsdeskundige. Zij kunnen medicatie voorschrijven en een persoonlijk plan opstellen.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-block bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Bekijk hondenscholen in jouw stad →
          </Link>
        </div>

        {/* Supporting Strategies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ondersteunende strategieën voor succes</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cpPink/5 to-white rounded-2xl p-6 border border-cpPink/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cpPink" />
                Omgeving optimaliseren:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Veilige plek:</strong> Bench of rustige kamer waar hond zich veilig voelt</li>
                <li>• <strong>White noise:</strong> Radio of TV aan (zachte achtergrond)</li>
                <li>• <strong>Geur:</strong> Gedragen kledingstuk van jou achterlaten</li>
                <li>• <strong>Comfort items:</strong> Favoriete dekentje, knuffel</li>
                <li>• <strong>Uitzicht:</strong> Raam waar hij buiten kan kijken (of juist niet, afhankelijk van hond)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpAqua/5 to-white rounded-2xl p-6 border border-cpAqua/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cpAqua" />
                Afleiding & bezighouding:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Gevulde Kong:</strong> Bevroren pindakaas/yoghurt (30+ min bezig)</li>
                <li>• <strong>Snuffelmat:</strong> Verstop brokjes voor zoekwerk</li>
                <li>• <strong>Kluifbot:</strong> Alleen bij vertrek geven (positieve associatie)</li>
                <li>• <strong>Puzzle speelgoed:</strong> Mentaal vermoeiend</li>
                <li>• <strong>Calming music:</strong> Speciale honden-relaxatie muziek</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpYellow/5 to-white rounded-2xl p-6 border border-cpYellow/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cpYellow" />
                Vertrek & thuiskomst ritueel:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Rustig vertrek:</strong> Geen overdreven afscheid ("Dag lieverd, mama komt terug!")</li>
                <li>• <strong>Vertrek-commando:</strong> Simpel woord als "Tot zo" (niet emotioneel)</li>
                <li>• <strong>Rustige thuiskomst:</strong> Negeer hond eerste 5 minuten</li>
                <li>• <strong>Wacht tot rust:</strong> Pas aandacht als hij kalm is</li>
                <li>• <strong>Beloon rust:</strong> Niet opwinding bij begroeting</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpPink/5 to-white rounded-2xl p-6 border border-cpPink/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cpPink" />
                Fysieke & mentale vermoeidheid:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Ochtendwandeling:</strong> Intensief 30-60 min voor vertrek</li>
                <li>• <strong>Training sessie:</strong> 10-15 min mentale workout</li>
                <li>• <strong>Socialisatie:</strong> Spelen met andere hond (maakt moe)</li>
                <li>• <strong>Neuswerk:</strong> Zoekspelletjes vermoeiden mentaal</li>
                <li>• <strong>Timing:</strong> Hond moet vermoeid zijn bij je vertrek</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What NOT to do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Wat NIET te doen bij verlatingsangst</h2>

          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="space-y-4">
              {[
                {
                  dont: "Straffen voor destructief gedrag",
                  why: "Je straft angst, niet ongehoorzaamheid. Dit verergert de angst en beschadigt jullie band."
                },
                {
                  dont: "Direct lange tijd alleen laten",
                  why: "\"In het diepe gooien\" werkt niet. Dit is flooding en kan trauma veroorzaken."
                },
                {
                  dont: "Tweede hond erbij nemen als oplossing",
                  why: "Verlatingsangst is gericht op JOU, niet eenzaamheid. Nu heb je 2 angstige honden."
                },
                {
                  dont: "Anti-blafband of elektrische halsband gebruiken",
                  why: "Onderdrukt symptoom maar lost oorzaak niet op. Gruwelijk en contraproductief."
                },
                {
                  dont: "Opgeven en hond overal mee naartoe nemen",
                  why: "Versterkt afhankelijkheid en maakt probleem erger. Je hond moet alleen kunnen zijn."
                },
                {
                  dont: "Inconsistentie (soms wel, soms niet alleen)",
                  why: "Variabel schema versterkt paradoxaal de angst. Wees consistent in je aanpak."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-5">
                  <h3 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {item.dont}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Waarom niet:</strong> {item.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to Consider Medication */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Wanneer medicatie overwegen?</h2>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <p className="text-muted-foreground mb-6">
              Bij ernstige gevallen kan anti-angst medicatie helpen om de hond rustig genoeg te maken
              voor training. Dit is geen quick fix, maar een hulpmiddel tijdens gedragstherapie.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cpAqua/5 to-white rounded-xl p-6 border border-cpAqua/20">
                <h3 className="font-bold text-foreground mb-3">Overwegen bij:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Zelfverwondend gedrag (tanden/nagels kapot)</li>
                  <li>• Gevaarlijke ontsnappingspogingen</li>
                  <li>• Hyperventilatie of collaps</li>
                  <li>• Geen vooruitgang na 8+ weken training</li>
                  <li>• Extreme stress (trillen, kwijlen, plassen)</li>
                  <li>• Noodzaak om hond alleen te laten voor werk</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-cpYellow/5 to-white rounded-xl p-6 border border-cpYellow/20">
                <h3 className="font-bold text-foreground mb-3">Medicatie opties (via dierenarts):</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Clomipramine:</strong> SSRI voor langdurige behandeling</li>
                  <li>• <strong>Fluoxetine (Prozac):</strong> SSRI, werkt na 4-6 weken</li>
                  <li>• <strong>Trazodone:</strong> Korte-termijn angstreductie</li>
                  <li>• <strong>Alprazolam (Xanax):</strong> Noodsituaties</li>
                  <li>• <strong>Adaptil (DAP):</strong> Feromoon spray (mild)</li>
                  <li>• <strong>CBD olie:</strong> Natuurlijke optie (beperkt bewijs)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cpPink/10 rounded-xl border-l-4 border-cpPink">
              <p className="text-sm font-semibold text-foreground mb-2">⚠️ Belangrijk:</p>
              <p className="text-sm text-muted-foreground">
                Medicatie MOET gecombineerd worden met gedragstherapie. Pillen alleen lossen het probleem
                niet op - ze maken training mogelijk. Consulteer altijd een dierenarts of veterinair
                gedragsdeskundige.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Gerelateerde trainingsonderwerpen</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/nl/gids/huisdiertraining/puppytraining-basis"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpPink/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpPink transition-colors mb-2">
                Puppytraining basis →
              </h3>
              <p className="text-sm text-muted-foreground">
                Voorkom verlatingsangst door vroege training
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/hondengedragsproblemen"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpAqua/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpAqua transition-colors mb-2">
                Gedragsproblemen →
              </h3>
              <p className="text-sm text-muted-foreground">
                Andere veelvoorkomende gedragsproblemen oplossen
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/clicker-training"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpYellow/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpYellow transition-colors mb-2">
                Clicker training →
              </h3>
              <p className="text-sm text-muted-foreground">
                Gebruik clicker voor positieve associaties
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Veelgestelde vragen over verlatingsangst</h2>

          <div className="space-y-4">
            {[
              {
                q: "Hoe lang duurt het om verlatingsangst op te lossen?",
                a: "Dit varieert enorm. Milde gevallen kunnen in 4-8 weken verbeteren met consistente training. Ernstige gevallen kunnen 6-12 maanden duren. De sleutel is geduld en geleidelijke opbouw. Probeer het proces niet te versnellen - dit leidt alleen tot terugval."
              },
              {
                q: "Kan ik mijn hond bij een oppas laten tijdens dit trainingsproces?",
                a: "Ja, maar wees consistent. Als je moet werken, gebruik een oppas/hondenopvang totdat je hond getraind is. Tijdens training moet je controle hebben over de duur van afwezigheid. Mix geen echte langdurige afwezigheden met trainingssessies - dit ondermijnt de systematische opbouw."
              },
              {
                q: "Mijn hond is alleen rustig met anti-angst medicatie. Is dit erg?",
                a: "Nee, voor sommige honden is medicatie noodzakelijk om hen trainbaar te maken. Zie het als krukken tijdens revalidatie. Met goede gedragstherapie kun je na 6-12 maanden vaak afbouwen. Sommige honden blijven langdurig medicatie nodig hebben - dit is oké en beter dan leven in constante paniek."
              },
              {
                q: "Helpt een tweede hond tegen verlatingsangst?",
                a: "Meestal niet. Verlatingsangst is gericht op de eigenaar, niet algemene eenzaamheid. Sommige honden voelen zich iets rustiger met een andere hond, maar de meeste niet. Je riskeert nu twee honden met verlatingsangst te hebben. Los het probleem eerst op voordat je een tweede hond overweegt."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-foreground hover:text-cpPink transition-colors">
                  {faq.q}
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpPink via-cpPink/90 to-cpAqua rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Professionele hulp nodig bij verlatingsangst?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Vind gecertificeerde hondengedragsdeskundigen die gespecialiseerd zijn in angst-problematiek.
            Bekijk reviews, ervaring en boek een intake gesprek.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-block bg-white text-cpPink rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all"
          >
            Ontdek alle huisdierservices →
          </Link>
        </div>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Je hond alleen thuis laten: verlatingsangst voorkomen",
            "description": "Complete wetenschappelijke gids voor het voorkomen en behandelen van verlatingsangst bij honden. Systematisch desensibilisatie trainingsplan.",
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
            "datePublished": "2024-12-07",
            "dateModified": "2024-12-07",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/gids/huisdiertraining/hond-alleen-thuis"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Huisdiertraining", href: "/nl/gids/huisdiertraining" },
          { label: "Hond alleen thuis laten" }
        ]}
      />
    </div>
  );
}
