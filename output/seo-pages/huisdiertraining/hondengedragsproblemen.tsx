import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle, Brain, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hondengedragsproblemen oplossen: praktische tips",
  description: "Los veelvoorkomende hondengedragsproblemen op met bewezen methoden. Van blaffen en springen tot angst en agressie. Inclusief stap-voor-stap oplossingen.",
  keywords: "hondengedragsproblemen, hond gedrag corrigeren, blaffende hond, springende hond, hondentraining gedrag, angst bij honden",
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/gids/huisdiertraining/hondengedragsproblemen",
  },
  openGraph: {
    title: "Hondengedragsproblemen oplossen: praktische tips",
    description: "Los veelvoorkomende hondengedragsproblemen op met bewezen methoden en stap-voor-stap oplossingen.",
    url: "https://cutiepawspedia.com/nl/gids/huisdiertraining/hondengedragsproblemen",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function HondengedragsProblemenPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cpPink/10 via-background to-cpAqua/10 py-16 md:py-24">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-cpPink/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-cpAqua/20 rounded-full hidden lg:block" />

        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpPink/10 border border-cpPink/30 mb-6">
              <span className="text-lg">🧠</span>
              <span className="text-sm font-medium text-foreground">Gedragsexpert Gids</span>
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hondengedragsproblemen <span className="text-cpPink">effectief oplossen</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Van overmatig blaffen tot verlatingsangst: ontdek praktische, wetenschappelijk onderbouwde
              oplossingen voor de 10 meest voorkomende gedragsproblemen bij honden.
            </p>

            {/* Primary CTA */}
            <Link
              href="/nl/nederland"
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
            Gedragsproblemen bij honden zijn zelden het gevolg van 'stoute' of 'dominante' honden.
            Meestal ontstaan ze door stress, angst, verveling, of gebrek aan duidelijke communicatie.
            De goede nieuws: vrijwel elk gedragsprobleem is oplosbaar met de juiste aanpak, geduld en
            consistentie. In deze gids behandelen we de meest voorkomende problemen en geven we concrete,
            bewezen oplossingen.
          </p>
        </div>

        {/* Understanding Behavior */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-cpPink" />
            Waarom gedragsproblemen ontstaan
          </h2>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground mb-3">Primaire oorzaken:</h3>
                {[
                  "Onvoldoende fysieke beweging",
                  "Gebrek aan mentale stimulatie",
                  "Angst of onzekerheid",
                  "Inconsistente training",
                  "Onbegrepen behoeften",
                  "Medische klachten/pijn"
                ].map((cause, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-cpPink flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{cause}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-foreground mb-3">Veelgemaakte fouten:</h3>
                {[
                  "Symptomen bestrijden, niet oorzaak",
                  "Straffen in plaats van trainen",
                  "Inconsistent gedrag van baasjes",
                  "Te late of te vroege interventie",
                  "Antropomorfisme (menselijke emoties projecteren)",
                  "Geen professionele hulp zoeken"
                ].map((mistake, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">✗</span>
                    <span className="text-muted-foreground text-sm">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-cpPink/10 rounded-xl border-l-4 border-cpPink">
              <p className="text-sm font-semibold text-foreground mb-2">💡 Belangrijk principe:</p>
              <p className="text-sm text-muted-foreground">
                Gedrag is altijd communicatie. Je hond probeert je iets te vertellen - luister naar
                wat hij nodig heeft in plaats van alleen het gedrag te onderdrukken.
              </p>
            </div>
          </div>
        </section>

        {/* Problem 1: Excessive Barking */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Top 10 gedragsproblemen en oplossingen</h2>

          {/* Excessive Barking */}
          <div className="bg-gradient-to-br from-cpPink/5 to-cpYellow/5 rounded-2xl p-8 mb-8 border border-cpPink/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-cpPink text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Overmatig Blaffen</h3>
                <p className="text-muted-foreground">
                  Blaffen is natuurlijk honden gedrag, maar excessief blaffen kan leiden tot burenklachten
                  en stress.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">Waarom blaft je hond?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Alarm/territoriaal (mensen/honden voorbij zien lopen)</li>
                  <li>• Aandacht zoeken (wil spelen, eten, naar buiten)</li>
                  <li>• Verveling/frustratie (te weinig uitdaging)</li>
                  <li>• Angst/onzekerheid (nieuwe situaties, alleen zijn)</li>
                  <li>• Opwinding (speeltijd, begroetingen)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">Oplossingsmethode:</h4>
                <ol className="space-y-3 list-decimal list-inside text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Leer "Stil" commando:</strong> Als hij blaft, wacht tot hij even stopt, zeg "Stil" en beloon direct. Herhaal consistent.</li>
                  <li><strong className="text-foreground">Verwijder triggers:</strong> Gordijnen dicht als hij naar voorbijgangers blaft, whiteнoise bij geluidsgevoeligheid.</li>
                  <li><strong className="text-foreground">Geef genoeg beweging:</strong> Een vermoeide hond is een rustige hond. 2x per dag 30-60 min wandelen.</li>
                  <li><strong className="text-foreground">Mentale stimulatie:</strong> Snuffelmatten, puzzel speeltjes, trainingsessies.</li>
                  <li><strong className="text-foreground">Desensibilisatie:</strong> Geleidelijk blootstellen aan triggers op veilige afstand, belonen bij rust.</li>
                </ol>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-sm font-semibold text-foreground mb-2">❌ Niet effectief:</p>
                <p className="text-sm text-muted-foreground">
                  Anti-blafbanden, schreeuwen (versterkt gedrag), straffen achteraf.
                  Deze methoden onderdrukken symptoom maar lossen oorzaak niet op.
                </p>
              </div>
            </div>
          </div>

          {/* Jumping on People */}
          <div className="bg-gradient-to-br from-cpAqua/5 to-cpPink/5 rounded-2xl p-8 mb-8 border border-cpAqua/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-cpAqua text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Springen tegen mensen</h3>
                <p className="text-muted-foreground">
                  Honden springen op uit opwinding en om aandacht te krijgen - dit is voor hen sociale
                  begroeting maar ongewenst voor mensen.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-foreground mb-3">4-stappen oplossing:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-cpAqua/20 text-cpAqua w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-foreground">Negeer springgedrag volledig</p>
                    <p className="text-sm text-muted-foreground">Draai je om, kruis armen, geen oogcontact. Wacht tot alle vier poten op grond zijn.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cpAqua/20 text-cpAqua w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-foreground">Beloon gewenst gedrag</p>
                    <p className="text-sm text-muted-foreground">Zodra hij met 4 poten op grond staat: veel aandacht, lof, snack. Leer hem: poten op grond = aandacht krijgen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cpAqua/20 text-cpAqua w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-foreground">Leer alternatief gedrag</p>
                    <p className="text-sm text-muted-foreground">Train "Zit" bij begroetingen. Als hij zit kan hij niet springen. Oefen dit bij thuiskomst.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cpAqua/20 text-cpAqua w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-foreground">Wees consistent</p>
                    <p className="text-sm text-muted-foreground">Eén keer aandacht bij springen gooit weken training weg. Vraag ook bezoekers om mee te werken.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pulling on Leash */}
          <div className="bg-gradient-to-br from-cpYellow/5 to-cpAqua/5 rounded-2xl p-8 mb-8 border border-cpYellow/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-cpYellow text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Trekken aan de riem</h3>
                <p className="text-muted-foreground">
                  Wandelen wordt een krachtmeting in plaats van plezierig uitje. Trekken is zelf-bevestigend:
                  trekken = vooruitgang.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">Stop-and-Go methode:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Riem strak = je stopt direct met lopen</li>
                  <li>• Wacht tot hond terugkomt/riem slap is</li>
                  <li>• Beloon en wandel verder</li>
                  <li>• Herhaal elke keer - geen uitzonderingen!</li>
                  <li>• Eerste wandelingen duren lang, maar het werkt</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">Richting-verandering methode:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bij trekken: abrupt 180° draaien</li>
                  <li>• Loop tegenovergestelde richting in</li>
                  <li>• Hond leert: trekken = verkeerde kant op</li>
                  <li>• Bij je blijven = gewenste richting</li>
                  <li>• Combineert goed met belonen bij losloop</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-cpYellow/10 rounded-xl p-4 border-l-4 border-cpYellow">
              <p className="text-sm font-semibold text-foreground mb-2">💡 Pro tip:</p>
              <p className="text-sm text-muted-foreground">
                Gebruik een anti-trek harnas (Y-vorm, bevestiging op borst) of head collar voor extra
                controle zonder verstikking. Gebruik NOOIT een halsketting bij trekhonden - dit kan
                permanente keelschade veroorzaken.
              </p>
            </div>
          </div>

          {/* Separation Anxiety Preview */}
          <div className="bg-gradient-to-br from-cpPink/5 to-cpAqua/5 rounded-2xl p-8 mb-8 border border-cpPink/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-cpPink text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Verlatingsangst</h3>
                <p className="text-muted-foreground">
                  Destructief gedrag, janken, plassen/poepen alleen thuis. Dit is echte paniek - niet
                  ongehoorzaamheid.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <p className="text-muted-foreground mb-4">
                Verlatingsangst is een complex probleem dat stapsgewijze desensibilisatie vereist.
                We hebben hier een complete gids aan gewijd:
              </p>
              <Link
                href="/nl/gids/huisdiertraining/hond-alleen-thuis"
                className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                Lees complete gids over verlatingsangst →
              </Link>
            </div>
          </div>

          {/* Quick Reference for Problems 5-10 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-4">Andere veelvoorkomende problemen (kort samengevat):</h3>

            {[
              {
                number: 5,
                title: "Destructief gedrag",
                cause: "Verveling, angst, overmatige energie",
                solution: "Meer beweging, kluifbotten/speelgoed, bench training, mentale stimulatie via puzzels"
              },
              {
                number: 6,
                title: "Bedelen bij tafel",
                cause: "Geleerd gedrag - werkt (krijgt eten!)",
                solution: "Negeer volledig, voer hond voor jouw maaltijd, eigen plek tijdens eten, NOOIT toegeven"
              },
              {
                number: 7,
                title: "Lopen aan hondenriem",
                cause: "Opwinding, sociale frustratie, angst",
                solution: "Afstand houden, focus oefeningen, belonen bij kijken naar jou i.p.v. andere hond"
              },
              {
                number: 8,
                title: "Graven in de tuin",
                cause: "Instinct, verveling, zoektocht naar koelte",
                solution: "Eigen graafplek maken, meer beweging, schaduwplekken, interactief speelgoed"
              },
              {
                number: 9,
                title: "Agressie (grommen/happen)",
                cause: "Angst, pijn, resource bewaking, trauma",
                solution: "⚠️ DIRECT professionele gedragsdeskundige inschakelen - niet zelf aanpakken!"
              },
              {
                number: 10,
                title: "Niet komen als geroepen",
                cause: "Slecht getraind, negatieve associatie, onvoldoende motivatie",
                solution: "Herbouw 'Hier' commando met hoge beloningen, lange lijn training, nooit straffen bij komen"
              }
            ].map((problem) => (
              <div key={problem.number} className="bg-card rounded-xl p-6 border border-border hover:border-cpPink/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-cpPink/20 text-cpPink w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {problem.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-2">{problem.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong className="text-foreground">Oorzaak:</strong> {problem.cause}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Aanpak:</strong> {problem.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-3xl p-8 md:p-12 text-center mb-16 border border-cpAqua/30">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Gedragsproblemen niet zelf onder controle?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Een gecertificeerde hondengedragsdeskundige kan een persoonlijk behandelplan opstellen
            en je begeleiden naar blijvende verbetering.
          </p>
          <Link
            href="/nl/nederland"
            className="inline-block bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Bekijk hondenscholen in jouw stad →
          </Link>
        </div>

        {/* Prevention is Key */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 text-cpPink" />
            Preventie: de beste "oplossing"
          </h2>

          <div className="bg-gradient-to-br from-cpPink/5 to-cpYellow/5 rounded-2xl p-8 border border-cpPink/20">
            <p className="text-muted-foreground mb-6">
              De meeste gedragsproblemen zijn te voorkomen met de juiste fundamenten:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink" />
                  Fysieke behoeften:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Voldoende beweging (ras-afhankelijk)</li>
                  <li>• Gevarieerde wandelroutes/omgevingen</li>
                  <li>• Sociale interactie met andere honden</li>
                  <li>• Gezonde voeding en voldoende rust</li>
                  <li>• Regelmatige gezondheidscheck bij dierenarts</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink" />
                  Mentale behoeften:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dagelijkse trainingsessies (5-15 min)</li>
                  <li>• Puzzel speelgoed en snuffelmatten</li>
                  <li>• Nieuwe trucjes en commando's leren</li>
                  <li>• Neuswerk/tracking oefeningen</li>
                  <li>• Hondensporten (agility, flyball, etc.)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink" />
                  Emotionele behoeften:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Duidelijke, consistente regels</li>
                  <li>• Positieve versterkingstraining</li>
                  <li>• Veilige thuisomgeving/rustplek</li>
                  <li>• Voorspelbare dagelijkse routine</li>
                  <li>• Quality time met baasje</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cpPink" />
                  Sociale behoeften:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vroege socialisatie (3-14 weken)</li>
                  <li>• Positieve ervaringen met mensen/honden</li>
                  <li>• Blootstelling aan verschillende omgevingen</li>
                  <li>• Leren omgaan met frustratie</li>
                  <li>• Goede hondenmanieren bijbrengen</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* When to Seek Professional Help */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Wanneer professionele hulp inschakelen?</h2>

          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2 text-xl">
              <AlertTriangle className="w-6 h-6" />
              Zoek DIRECT hulp bij:
            </h3>

            <div className="space-y-3">
              {[
                "Elke vorm van agressie (grommen, happen, bijten) richting mensen of dieren",
                "Zelfverwondend gedrag (excessief likken/bijten van eigen lichaam)",
                "Extreme angst/fobieën die dagelijks leven beïnvloeden",
                "Gedragsproblemen die verergeren ondanks training",
                "Plotselinge gedragsverandering (kan medisch zijn)",
                "Wanneer je je overweldigd of onveilig voelt"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Let op:</strong> Zoek altijd een gecertificeerde
                gedragsdeskundige (COAPE, VHG erkend). Vermijd trainers die dominantie-theorie gebruiken,
                aversieve methoden aanprijzen (prikkelbanden, africhtingshalsband) of garanties beloven.
                Gedragswerk vereist tijd en expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Gerelateerde trainingsonderwerpen</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/nl/gids/huisdiertraining/hond-alleen-thuis"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpPink/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpPink transition-colors mb-2">
                Hond alleen thuis →
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete gids voor verlatingsangst voorkomen en behandelen
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/puppytraining-basis"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpAqua/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpAqua transition-colors mb-2">
                Puppytraining basis →
              </h3>
              <p className="text-sm text-muted-foreground">
                Voorkom problemen met vroege basistraining
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/clicker-training"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpYellow/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpYellow transition-colors mb-2">
                Clicker training →
              </h3>
              <p className="text-sm text-muted-foreground">
                Effectieve trainingsmethode voor gedragsverandering
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Veelgestelde vragen over hondengedragsproblemen</h2>

          <div className="space-y-4">
            {[
              {
                q: "Hoe lang duurt het om een gedragsprobleem op te lossen?",
                a: "Dit varieert enorm afhankelijk van het probleem, de leeftijd van de hond, hoe lang het probleem bestaat, en consistentie in training. Simpele problemen (springen) kunnen in 2-4 weken verbeteren met consistente training. Complexe problemen (agressie, ernstige angst) kunnen maanden tot een jaar duren en vereisen vaak professionele begeleiding."
              },
              {
                q: "Werkt straffen bij gedragsproblemen?",
                a: "Nee, straffen is bijna altijd contraproductief. Het onderdrukt symptomen zonder de onderliggende oorzaak aan te pakken, beschadigt de band tussen hond en baasje, en kan angst/agressie verergeren. Positieve versterkingsmethoden zijn wetenschappelijk bewezen effectiever en creëren een gezondere relatie."
              },
              {
                q: "Kan een oude hond nog nieuwe trucjes leren?",
                a: "Absoluut! Honden blijven hun hele leven leren. Oudere honden kunnen zelfs sneller leren omdat ze rustiger en gefocuster zijn. Het kan wel langer duren om oude gewoontes te verbreken dan bij jonge honden, maar met geduld en de juiste methode is alles mogelijk."
              },
              {
                q: "Moet ik mijn hond laten dominantie tonen naar andere honden?",
                a: "Het concept van 'dominantie' bij honden is achterhaald en gebaseerd op verkeerd onderzoek. Honden hebben geen hiërarchie zoals wolven. Gedrag dat lijkt op dominantie is vaak angst, onzekerheid, of overenthousisme. Focus op het leren van sociale vaardigheden en zelfbeheersing in plaats van dominantie."
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
            Worstel je met gedragsproblemen?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Vind gecertificeerde gedragsdeskundigen en hondentrainers bij jou in de buurt.
            Bekijk specialisaties, reviews en boek een kennismakingsgesprek.
          </p>
          <Link
            href="/nl/nederland"
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
            "headline": "Hondengedragsproblemen oplossen: praktische tips",
            "description": "Complete gids voor het oplossen van de 10 meest voorkomende hondengedragsproblemen met wetenschappelijk onderbouwde methoden.",
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
              "@id": "https://cutiepawspedia.com/nl/gids/huisdiertraining/hondengedragsproblemen"
            }
          })
        }}
      />
    </div>
  );
}
