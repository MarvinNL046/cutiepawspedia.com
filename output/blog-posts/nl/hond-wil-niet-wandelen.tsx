import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/BetweenContentAd';
import BlogSidebarAd from '@/components/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Hond wil niet wandelen: 7 mogelijke oorzaken + oplossingen | CutiePawsPedia',
  description: 'Weigert jouw hond om te wandelen? Ontdek 7 veelvoorkomende oorzaken waarom honden niet willen lopen en wat je eraan kunt doen. Praktische tips en oplossingen.',
  keywords: 'hond weigert lopen, hond wil niet naar buiten, hond lui, hond gaat niet wandelen, hond blijft staan',
  openGraph: {
    title: 'Hond wil niet wandelen: 7 mogelijke oorzaken + oplossingen',
    description: 'Ontdek waarom je hond niet wil wandelen en hoe je dit gedrag kunt aanpakken met praktische oplossingen.',
    images: ['/images/blog/hond-wil-niet-wandelen.jpg'],
    type: 'article',
  },
};

export default function HondWilNietWandelen() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-cpAmber text-white px-4 py-1 rounded-full text-sm font-semibold">
                Huisdiergedrag
              </span>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Hond wil niet wandelen: 7 mogelijke oorzaken
              </h1>
              <div className="flex items-center text-cpCharcoal/70 dark:text-cpCream/70 text-sm space-x-4">
                <time dateTime="2025-01-15">15 januari 2025</time>
                <span>•</span>
                <span>10 min leestijd</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop"
                alt="Hond zit neer en wil niet wandelen"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              <PhotoCredit
                photographerName="James Barker"
                photographerUrl="https://unsplash.com/@barkernotbaker"
                platform="Unsplash"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 mb-6">
                Je pakt de riem, je hond kijkt enthousiast... en dan gebeurt het: zodra je buiten bent, weigert je hond te lopen. Hij gaat zitten, blijft staan, of trekt zelfs terug naar huis. Dit frustrerende gedrag komt vaker voor dan je denkt. In dit artikel ontdek je de 7 meest voorkomende oorzaken waarom honden weigeren te wandelen en hoe je dit kunt oplossen.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Waarom weigert mijn hond te wandelen?
              </h2>
              <p>
                Een hond die plotseling of consistent weigert te wandelen, probeert je iets te vertellen. Het is zelden puur luiheid of koppigheid. Er is bijna altijd een onderliggende reden - fysiek, emotioneel of omgevingsgerelateerd. Het is belangrijk om de oorzaak te achterhalen zodat je je hond effectief kunt helpen.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 1: Pijn of fysiek ongemak
              </h2>
              <p>
                De meest voorkomende reden waarom een hond plotseling niet meer wil wandelen is <strong>pijn of fysiek ongemak</strong>. Honden zijn meesters in het verbergen van pijn, dus dit kan subtiel zijn.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Mogelijke fysieke problemen:
              </h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Pootproblemen:</strong> Pijnlijke poten, ingegroeide nagels, sneetjes, splinters, gebarsten voetzolen</li>
                <li><strong>Gewrichtsproblemen:</strong> Artritis, heupdysplasie, elleboogdysplasie (vooral bij oudere honden)</li>
                <li><strong>Rugpijn:</strong> Hernia, gewrichtsslijtage, spierpijn</li>
                <li><strong>Algemene vermoeidheid of ziekte:</strong> Infecties, hartproblemen, ademhalingsproblemen</li>
              </ul>

              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-lg mb-3">Herken je deze signalen?</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Je hond loopt mank of houdt een poot omhoog</li>
                  <li>Hij likt of bijt aan zijn poten</li>
                  <li>Hij heeft moeite met opstaan na rusten</li>
                  <li>Hij is stijf na wandelingen</li>
                  <li>Hij vertoont pijngedrag (janken, grommen) bij aanraking</li>
                  <li>De weigering kwam plotseling, zonder duidelijke trigger</li>
                </ul>
              </div>

              <p>
                <strong>Oplossing:</strong> Ga direct naar de dierenarts voor een volledig lichamelijk onderzoek. De dierenarts kan pijnstillers, ontstekingsremmers of fysiotherapie voorschrijven. Pas het wandelschema aan: kortere, rustigere wandelingen op zachte ondergrond.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 2: Angst of trauma
              </h2>
              <p>
                <strong>Angst</strong> is een veel voorkomende reden, vooral bij:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Puppies die nog niet volledig gesocialiseerd zijn</li>
                <li>Asielhonden met een onbekende achtergrond</li>
                <li>Honden die een nare ervaring hebben gehad (aangevallen door andere hond, luid geluid, eng verkeer)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Tekenen van angst:
              </h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Staart tussen de benen, oren plat</li>
                <li>Trillen of hijgen zonder fysieke inspanning</li>
                <li>Weigeren om verder te gaan in een bepaalde richting</li>
                <li>Terugkeren naar huis trekken</li>
                <li>Witte oogwit zichtbaar (walvisoog)</li>
                <li>Proberen te ontsnappen of te vluchten</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Veelvoorkomende angstbronnen:
              </h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Vuurwerk of donderslag:</strong> Honden met geluidsangst weigeren vaak buiten te komen</li>
                <li><strong>Druk verkeer:</strong> Geluiden en beweging van auto's kunnen overweldigend zijn</li>
                <li><strong>Andere honden:</strong> Na een nare confrontatie kan je hond andere honden willen vermijden</li>
                <li><strong>Onbekende plekken:</strong> Sommige honden zijn angstig voor nieuwe omgevingen</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Langzame, positieve desensibilisatie. Begin met zeer korte wandelingen in een rustige, bekende omgeving. Beloon rustig gedrag uitbundig met traktaties en lof. Bouw geleidelijk op. Overweeg hulp van een gecertificeerde hondengedragsdeskundige voor ernstige gevallen. Vermijd forceren - dit verergert de angst alleen maar.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 3: Verkeerde riem of tuig
              </h2>
              <p>
                Soms is het probleem zo simpel als <strong>ongemakkelijke uitrusting</strong>. Een te strakke halsband, een schurend tuig, of een te zware riem kan wandelen onaangenaam maken.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Controleer dit:
              </h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Halsband:</strong> Niet te strak (je moet twee vingers tussen halsband en hals kunnen steken)</li>
                <li><strong>Tuig:</strong> Zit het goed? Schuurt het niet onder de oksels?</li>
                <li><strong>Riem:</strong> Is deze niet te zwaar of te kort?</li>
                <li><strong>Type tuig:</strong> Sommige honden haten bepaalde soorten (bijvoorbeeld anti-trek tuigen)</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Probeer verschillende soorten uitrusting. Een goed passend Y-tuig is vaak het comfortabelst. Laat je hond wennen aan nieuwe uitrusting in huis voordat je naar buiten gaat. Beloon je hond voor het dragen van de uitrusting.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 4: Te lang, te vermoeiend of verkeerd tempo
              </h2>
              <p>
                Niet elke hond heeft dezelfde bewegingsbehoefte. <strong>Overbelasting</strong> kan leiden tot weigering:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Puppy's:</strong> Jonge honden kunnen nog geen lange wandelingen aan. Regel: 5 minuten per levensmaand, 2x per dag (3 maanden oud = 15 min wandelingen)</li>
                <li><strong>Kleine rassen:</strong> Hebben kortere beentjes en raken sneller vermoeid</li>
                <li><strong>Kortsnuitige rassen:</strong> (Mops, Bulldog) hebben moeite met ademhalen en oververhitten snel</li>
                <li><strong>Oudere honden:</strong> Hebben minder energie en kunnen niet zo lang</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Pas de lengte en intensiteit van wandelingen aan aan je hond's leeftijd, ras en conditie. Splits lange wandelingen in meerdere kortere. Let op signalen van vermoeidheid (hijgen, langzamer lopen, zitten). Vermijd wandelen tijdens hitte.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 5: Weersomstandigheden
              </h2>
              <p>
                Veel honden hebben een <strong>hekel aan bepaalde weersomstandigheden</strong>:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Regen:</strong> Sommige honden haten nat worden</li>
                <li><strong>Kou:</strong> Kleine honden of honden met kort haar kunnen het koud krijgen</li>
                <li><strong>Hitte:</strong> Zeer warm weer is gevaarlijk en oncomfortabel</li>
                <li><strong>Wind:</strong> Sterke wind kan beangstigend zijn</li>
                <li><strong>Sneeuw en ijs:</strong> Koud aan de poten, moeilijk lopen, eng gevoel</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Overweeg weerbestendige kleding (regenjas voor regen, trui voor kou). Gebruik pootjeszalf of hondenschoentjes bij sneeuw en zout. Wandel tijdens extreme weersomstandigheden op andere tijden (vroeg in de ochtend bij hitte). Accepteer dat je hond soms gewoon geen zin heeft in slecht weer - dit is normaal!
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 6: Negatieve associaties met wandelen
              </h2>
              <p>
                Soms heeft een hond <strong>geleerd dat wandelen niet leuk is</strong>:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Straf tijdens wandelen:</strong> Is je hond uitgescholden of gestraft tijdens een wandeling?</li>
                <li><strong>Dwingende training:</strong> Te hard aan de riem trekken, forceren om te lopen</li>
                <li><strong>Negatieve eindbestemming:</strong> Als wandelingen altijd eindigen bij de dierenarts of trimsalon</li>
                <li><strong>Saaie wandelingen:</strong> Altijd dezelfde route zonder snuffelgelegenheid</li>
                <li><strong>Te veel correctie:</strong> Constant "nee" of "stop" tijdens de wandeling</li>
              </ul>

              <div className="bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-lg mb-3">Maak wandelen weer leuk:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Varieer routes om wandelingen interessant te houden</li>
                  <li>Laat je hond veel snuffelen - dit is mentaal stimulerend</li>
                  <li>Neem traktaties mee en beloon goed gedrag tijdens de wandeling</li>
                  <li>Speel korte spelletjes tijdens de wandeling (apporteren, verstoppertje)</li>
                  <li>Ga naar leuke plekken (park, strand, bos) niet alleen functionele wandelingen</li>
                  <li>Laat je hond soms zelf bepalen waar jullie heen gaan</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Oorzaak 7: Medische problemen of veroudering
              </h2>
              <p>
                Naast duidelijke pijn kunnen ook andere <strong>medische aandoeningen</strong> wandelweigering veroorzaken:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Hartproblemen:</strong> Verminderde conditie en moeite met inspanning</li>
                <li><strong>Ademhalingsproblemen:</strong> Vooral bij oudere honden of specifieke rassen</li>
                <li><strong>Neurologische aandoeningen:</strong> Evenwichtsproblemen, zwakte in de benen</li>
                <li><strong>Cognitieve disfunctie (hondendementie):</strong> Bij oudere honden, leiden tot verwarring en angst voor buitenshuis</li>
                <li><strong>Obesitas:</strong> Overgewicht maakt bewegen moeilijk en onaangenaam</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Volledig veterinair onderzoek, vooral bij oudere honden of plotselinge veranderingen. De dierenarts kan medicatie voorschrijven of aanpassingen in levensstijl adviseren. Accepteer dat oudere honden minder kunnen en pas je verwachtingen aan.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Stap-voor-stap plan: Hoe krijg ik mijn hond weer aan het wandelen?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 1: Sluit medische oorzaken uit
              </h3>
              <p>
                Begin altijd met een bezoek aan de dierenarts om pijn of ziekte uit te sluiten. Dit is vooral belangrijk als de weigering plotseling is begonnen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 2: Analyseer de situatie
              </h3>
              <p>
                Stel jezelf deze vragen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Wanneer begon de weigering?</li>
                <li>Is er iets veranderd (nieuwe route, nieuw tuig, verhuizing)?</li>
                <li>Gebeurt het altijd of alleen in specifieke situaties?</li>
                <li>Toont je hond tekenen van angst, pijn of verveling?</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 3: Begin opnieuw met positieve training
              </h3>
              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-lg mb-3">Opbouwschema:</h4>
                <ul className="space-y-3">
                  <li>
                    <strong>Week 1:</strong> Riem aandoen in huis, belonen, uittrekken. Herhaal meerdere keren per dag.
                  </li>
                  <li>
                    <strong>Week 2:</strong> Riem aan, naar de deur lopen, belonen, terug. Bouw langzaam op.
                  </li>
                  <li>
                    <strong>Week 3:</strong> Korte tocht buiten (5 meter), direct terug, grote beloning.
                  </li>
                  <li>
                    <strong>Week 4+:</strong> Bouw afstand geleidelijk op. Blijf volop belonen voor vooruitgang.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 4: Maak wandelingen onweerstaanbaar
              </h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Gebruik **hoogwaardige traktaties** (gekookte kip, worst, kaas)</li>
                <li>Neem een favoriete speeltje mee</li>
                <li>Wandel met een hondenmaatje die je hond leuk vindt</li>
                <li>Ga naar spannende plekken met veel geuren</li>
                <li>Gebruik een **snuffelmat of snuffelspel** tijdens de wandeling</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Stap 5: Geduld en consistentie
              </h3>
              <p>
                Gedragsverandering kost tijd. Verwacht geen wonderen in een paar dagen. Blijf consistent, positief en geduldig. Als je na 4-6 weken geen vooruitgang ziet, overweeg dan hulp van een gecertificeerde hondengedragstherapeut.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat je NOOIT moet doen
              </h2>
              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-r-lg mb-6">
                <ul className="list-disc pl-6 space-y-2">
                  <li>❌ <strong>Slepen of dwingen:</strong> Dit verergert angst en beschadigt de band met je hond</li>
                  <li>❌ <strong>Straffen:</strong> Schreeuwen, slaan of schokhalsbanden gebruiken maken alles erger</li>
                  <li>❌ <strong>Negeren van medische problemen:</strong> Pijn kan ernstig zijn</li>
                  <li>❌ <strong>Te snel opbouwen:</strong> Geduld is essentieel</li>
                  <li>❌ <strong>Opgeven:</strong> Met de juiste aanpak kan bijna elke hond weer leren wandelen</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Begrip en geduld zijn de sleutel
              </h2>
              <p>
                Een hond die niet wil wandelen, probeert je iets te vertellen. Of het nu pijn, angst, verveling of ongemak is - er is altijd een reden. Door de oorzaak te identificeren en met liefde, geduld en positieve versterking te werken, kun je je hond weer plezier laten beleven aan wandelingen.
              </p>
              <p>
                Onthoud: wandelen zou een plezierige ervaring moeten zijn voor jullie beiden. Als je hond consistent weigert, neem dan de tijd om te begrijpen waarom en zoek professionele hulp als dat nodig is. Met de juiste aanpak kunnen de meeste honden weer genieten van hun dagelijkse wandelingen!
              </p>

              {/* FAQ Section */}
              <div className="mt-12 bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Veelgestelde vragen
                </h2>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Mijn puppy wil plotseling niet meer wandelen, is dat normaal?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Ja, dit is vrij normaal. Puppy's gaan door angstperiodes (rond 8-11 weken en 6-14 maanden) waarin ze plotseling bang kunnen worden voor bekende dingen. Ga rustig om met deze fase, forceer niets, en gebruik veel positieve versterking. Deze periode gaat meestal vanzelf over.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Hoelang mag ik doorgaan met proberen als mijn hond weigert?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Forceer nooit langer dan een paar minuten. Als je hond na 5 minuten aanmoedigen nog steeds weigert, keer dan terug naar huis en probeer het later opnieuw. Lang blijven proberen veroorzaakt stress voor jullie beiden en maakt het probleem erger.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmbar transition-colors">
                      Mijn hond loopt wel in de tuin maar niet op straat, waarom?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Dit wijst vaak op angst voor de buitenwereld. De tuin is een veilige, bekende omgeving. Begin met hele korte wandelingen net buiten de deur en bouw zeer geleidelijk op. Overweeg professionele hulp als dit langer dan een maand aanhoudt.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Kan ik mijn hond in een wagentje of draagtas vervoeren als hij niet wil lopen?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Voor kleine honden, puppy's of honden met medische beperkingen kan dit soms een goede oplossing zijn. Maar het lost het onderliggende probleem niet op. Gebruik het als tijdelijke maatregel terwijl je werkt aan de oorzaak. Voor gezonde volwassen honden is beweging essentieel.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Wanneer moet ik professionele hulp zoeken?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Zoek hulp als: het probleem langer dan 4-6 weken aanhoudt, je hond tekenen van extreme angst of pijn toont, het gedrag snel verergert, of als je zelf gefrustreerd raakt. Een gecertificeerde hondengedragstherapeut kan individueel advies geven.
                    </p>
                  </details>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-12 bg-cpAmber/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Gerelateerde artikelen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/gids/hondengedrag/hond-trekt-aan-riem"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Hond trekt aan de riem: training en tips
                    </h3>
                  </Link>
                  <Link
                    href="/gids/hondentraining/angst-bij-honden-aanpakken"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Angst bij honden herkennen en aanpakken
                    </h3>
                  </Link>
                  <Link
                    href="/gids/puppyverzorging/puppy-socialiseren"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Puppy socialiseren: complete gids
                    </h3>
                  </Link>
                  <Link
                    href="/gids/hondengezondheid/artrose-hond-herkennen"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpAmber transition-colors">
                      Artrose bij honden: symptomen en behandeling
                    </h3>
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    hond weigert lopen
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    hondengedrag
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    wandelen
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    hondenwandelingen
                  </span>
                  <span className="px-4 py-2 bg-cpAmber/10 text-cpAmber rounded-full text-sm font-medium">
                    hondentraining
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Tips */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-cpCharcoal dark:text-cpCream mb-4">
                  Snelle tips
                </h3>
                <ul className="space-y-3 text-sm text-cpCharcoal/80 dark:text-cpCream/80">
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Sluit medische oorzaken altijd eerst uit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Forceer nooit - dit maakt het erger</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Gebruik positieve versterking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Bouw geleidelijk op met kleine stapjes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cpAmber mr-2">✓</span>
                    <span>Geduld is essentieel</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hond wil niet wandelen: 7 mogelijke oorzaken",
            "description": "Weigert jouw hond om te wandelen? Ontdek 7 veelvoorkomende oorzaken waarom honden niet willen lopen en wat je eraan kunt doen. Praktische tips en oplossingen.",
            "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop",
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.nl/logo.png"
              }
            }
          })
        }}
      />
    </div>
  );
}
