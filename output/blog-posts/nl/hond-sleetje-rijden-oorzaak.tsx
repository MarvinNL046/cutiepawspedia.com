import type { Metadata } from 'next';
import Link from 'next/link';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Hond Sleetje Rijden: Waarom Schuurt Hij Zijn Kont Over de Grond? | CutiePawsPedia',
  description: 'Waarom schuurt je hond zijn kont over de vloer? Ontdek alle oorzaken van sleetje rijden bij honden, van anaalklieren tot wormen, met praktische oplossingen.',
  keywords: 'hond sleetje rijden, hond schuurt kont, anaalklieren hond, hond kont over vloer, scooting hond, anaalklierprobleem',
  openGraph: {
    title: 'Hond Sleetje Rijden: Oorzaken en Oplossingen | CutiePawsPedia',
    description: 'Waarom schuurt je hond zijn kont over de vloer? Leer alle oorzaken en behandelingen van sleetje rijden bij honden.',
    type: 'article',
    publishedTime: '2025-01-15T12:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Hond zit en kijkt met vragende blik'
      }
    ]
  }
};

export default function HondSleetjeRijdenPage() {
  return (
    <main className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full">
                  Dierengezondheid
                </span>
                <time className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  15 januari 2025
                </time>
                <span className="text-sm text-cpCharcoal/60 dark:text-cpCream/60">
                  • 8 min leestijd
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-6 leading-tight">
                Hond Schuurt Kont Over de Grond: Sleetje Rijden Verklaard
              </h1>
            </header>

            {/* Featured Image */}
            <figure className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop"
                alt="Hond zit en kijkt met vragende blik naar camera"
                className="w-full h-auto"
              />
              <PhotoCredit
                photographerName="Karsten Winegeart"
                photographerUrl="https://unsplash.com/@karsten116"
                platform="Unsplash"
              />
            </figure>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
                Je bent niet de enige die geschrokken is toen je hond plotseling zijn achterwerk over de vloer begon te slepen. Dit gedrag, in veterinaire termen "scooting" genoemd en in de volksmond "sleetje rijden", kan er grappig uitzien, maar is vaak een signaal dat je hond ongemak ervaart. In deze complete gids ontdek je alle mogelijke oorzaken van dit gedrag, van anaalklierenproblemen tot wormbesmetting, en leer je wanneer je naar de dierenarts moet en hoe je het kunt voorkomen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wat is Sleetje Rijden (Scooting)?
              </h2>

              <p>
                Sleetje rijden is wanneer je hond <strong>zijn achterwerk over de grond sleept</strong> terwijl hij zijn achterpoten strekt en zijn voorpoten gebruikt om zich voort te bewegen. Het lijkt alsof hij zit en zich vooruit trekt over tapijt, gras of vloer.
              </p>

              <p>
                Dit gedrag is een <strong>reactie op irritatie, jeuk of ongemak</strong> in de anale regio. Je hond probeert het probleem zelf op te lossen door te schuren. Hoewel een enkele keer sleetje rijden meestal niet alarmerend is, kan herhaald gedrag wijzen op een onderliggend gezondheidsprobleem dat aandacht vereist.
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <p className="text-cpCharcoal dark:text-cpCream font-semibold">
                  ⚠️ Belangrijk: Sleetje rijden is NIET normaal gedrag. Het is altijd een signaal dat je hond ongemak ervaart. Negeer dit gedrag niet, vooral niet als het regelmatig voorkomt.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                7 Belangrijkste Oorzaken van Sleetje Rijden
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Verstopte of Ontstoken Anaalklieren (80% van de gevallen) ⭐
              </h3>
              <p>
                Dit is verreweg de meest voorkomende oorzaak. Honden hebben twee kleine klieren aan weerszijden van de anus die een geurige vloeistof produceren.
              </p>

              <p>
                <strong>Wat zijn anaalklieren?</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Twee klieren ter grootte van een erwt (bij kleine honden) tot druif (bij grote honden)</li>
                <li>Produceren een sterk ruikende vloeistof voor territoriummarkering</li>
                <li>Legen zich normaal natuurlijk bij poepen (druk van ontlasting)</li>
                <li>Kunnen verstopt raken als ze niet regelmatig leeglopen</li>
              </ul>

              <p>
                <strong>Symptomen van anaalklierenproblemen:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Sleetje rijden (klassiek symptoom)</li>
                <li>Excessief likken of bijten van de anale regio</li>
                <li>Achtervolgen van eigen staart met focus op achterwerk</li>
                <li>Vieze geur (niet normaal hondenpoep-geur, maar muskusachtig)</li>
                <li>Moeite met zitten of ongemakkelijke zithouding</li>
                <li>Zwelling of roodheid naast de anus</li>
                <li>Bloederige of purulente afscheiding uit de anus</li>
              </ul>

              <p>
                <strong>Waarom raken anaalklieren verstopt?</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Te zachte ontlasting:</strong> Onvoldoende druk om klieren te legen</li>
                <li><strong>Te harde ontlasting:</strong> Kan klieren irriteren</li>
                <li><strong>Kleine kliergangen:</strong> Anatomisch (vooral bij kleine rassen)</li>
                <li><strong>Overgewicht:</strong> Verstoort natuurlijke drainage</li>
                <li><strong>Ontsteking:</strong> Dikker secreet dat moeilijker afvloeit</li>
                <li><strong>Genetica:</strong> Sommige rassen vatbaarder (Chihuahua's, Beagles, Bulldogs)</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Wormen en Parasieten
              </h3>
              <p>
                Intestinale wormen kunnen jeuk rondom de anus veroorzaken, vooral lintwormen.
              </p>

              <p>
                <strong>Specifiek lintwormen:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Segmenten van lintwormen (lijken op rijstkorrels) bewegen rond anus</li>
                <li>Veroorzaken intense jeuk wanneer ze migreren</li>
                <li>Zichtbaar in verse ontlasting of rond anus</li>
                <li>Droger wit-beige segmenten op vacht rond staart</li>
              </ul>

              <p>
                <strong>Andere symptomen van wormen:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Diarree of veranderingen in ontlasting</li>
                <li>Opgezette buik (vooral bij puppy's)</li>
                <li>Gewichtsverlies ondanks normaal eten</li>
                <li>Mat, dof vachtje</li>
                <li>Braken (soms met wormen zichtbaar)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Allergieën en Huidirritatie
              </h3>
              <p>
                Voedsel- of omgevingsallergieën kunnen jeuk veroorzaken, ook rondom de anus.
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Voedselallergie:</strong> Vaak voor granen, rundvlees, kip, zuivel</li>
                <li><strong>Contactallergie:</strong> Bepaalde shampoos, reinigingsmiddelen, gras</li>
                <li><strong>Omgevingsallergie:</strong> Stuifmeel, huisstofmijt</li>
                <li><strong>Flea allergy:</strong> Reactie op vlooienbeten veroorzaakt ernstige jeuk</li>
              </ul>

              <p>
                <strong>Andere tekenen van allergie:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Jeukende huid op andere plekken (poten, oren, buik)</li>
                <li>Rode, ontstoken huid</li>
                <li>Haar uitval</li>
                <li>Chronische oorontstekingen</li>
                <li>Excessief likken van poten</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Diarree en Ontlastingsresten
              </h3>
              <p>
                Zachte ontlasting of diarree kan achter blijven rond de anus en irritatie veroorzaken, vooral bij honden met lange vacht.
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Ontlasting blijft plakken aan vacht rond anus</li>
                <li>Veroorzaakt irritatie en vieze geur</li>
                <li>Hond probeert het zelf te verwijderen door schuren</li>
                <li>Komt voor na maag-darmproblemen</li>
              </ul>

              <p>
                <strong>Oplossing:</strong> Reinig anale regio met vochtig doekje of babyshampoo, overwegen vacht rond anus kort te knippen (sanitaire trim).
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Anale Fistel of Abces
              </h3>
              <p>
                Een ernstigere complicatie van chronisch verstopte anaalklieren of infecties.
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Abces:</strong> Infectie in anaalklier met pus, kan openbreken</li>
                <li><strong>Fistel:</strong> Chronische tunnel van anaalklier naar huidoppervlak</li>
                <li><strong>Symptomen:</strong> Zwelling, pijn, bloederige/purulente afscheiding, weigering om te zitten</li>
                <li><strong>Vereist veterinaire behandeling:</strong> Antibiotica, drainage, soms chirurgie</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                6. Anale Tumor of Polyp
              </h3>
              <p>
                Zeldzamer, maar vooral bij oudere honden mogelijk.
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Groei in of rond de anus veroorzaakt irritatie</li>
                <li>Kan goedaardig (adenoom) of kwaadaardig (adenocarcinoom) zijn</li>
                <li>Vaak zichtbaar als bult of zwelling</li>
                <li>Soms bloeding bij poepen</li>
              </ul>

              <p>
                <strong>Actie:</strong> Elke zichtbare massa rondom de anus moet door een dierenarts onderzocht worden.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                7. Rectale Prolaps
              </h3>
              <p>
                Het laatste deel van de darm steekt uit door de anus naar buiten.
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Zichtbaar als rood, vochtig weefsel dat uit anus steekt</li>
                <li>Veroorzaakt door chronische diarree, persen, parasieten</li>
                <li>Noodgeval - direct naar dierenarts</li>
                <li>Hond probeert het terug te duwen door schuren</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer Naar de Dierenarts?
              </h2>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Ga DIRECT naar de dierenarts bij:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bloederige of purulente afscheiding uit anus</li>
                  <li>Zichtbare zwelling, bult of uitstekend weefsel</li>
                  <li>Hond weigert te zitten of jankt bij zitten</li>
                  <li>Extreem sleetje rijden (>5x per dag)</li>
                  <li>Combinatie met braken, diarree, lethargie</li>
                  <li>Open wond of scheur in anale regio</li>
                  <li>Hond bijt of is agressief bij aanraking van achterwerk</li>
                </ul>
              </div>

              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Maak afspraak binnen 2-3 dagen bij:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regelmatig sleetje rijden (dagelijks of meerdere keren per week)</li>
                  <li>Excessief likken van anale regio</li>
                  <li>Vieze, abnormale geur</li>
                  <li>Veranderingen in ontlastingspatroon</li>
                  <li>Zichtbare wormsegmenten (rijstkorrels) in ontlasting</li>
                  <li>Ongemakkelijke zithouding</li>
                </ul>
              </div>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Behandeling: Wat Kan de Dierenarts Doen?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Voor Anaalklierenproblemen
              </h3>

              <p>
                <strong>1. Anaalklieren Uitdrukken (€15-30)</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Dierenarts drukt klieren manueel leeg (2-5 minuten)</li>
                <li>Gebeurt extern (van buitenaf) of intern (met vinger in rectum)</li>
                <li>Onmiddellijke verlichting voor je hond</li>
                <li>Sommige honden hebben dit 1x nodig, andere chronisch (maandelijks)</li>
              </ul>

              <p>
                <strong>2. Spoelen en Antibiotica (€50-100)</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Bij ontsteking of infectie</li>
                <li>Anaalklieren worden gespoeld met steriele vloeistof</li>
                <li>Antibiotica kuur (oraal of direct in klier geïnjecteerd)</li>
                <li>Behandelduur: 7-14 dagen</li>
              </ul>

              <p>
                <strong>3. Chirurgische Verwijdering (€300-800)</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Bij chronische, terugkerende problemen</li>
                <li>Bij abcessen of fistels</li>
                <li>Laatste redmiddel - klieren worden permanent verwijderd</li>
                <li>Risico: incontinentie (5-10% van gevallen)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Voor Wormen
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Ontwormingsmiddel:</strong> Tablet of spotbehandeling (€10-25)</li>
                <li><strong>Herhaal na 2-4 weken:</strong> Voor volledige eradicatie</li>
                <li><strong>Preventie:</strong> Regelmatig ontwormen (elke 3-6 maanden)</li>
                <li><strong>Check andere huisdieren:</strong> Wormen zijn besmettelijk</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                Voor Allergieën
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Allergiedieet:</strong> Eliminatiedieet of hypoallergeen voer (€40-80/maand)</li>
                <li><strong>Antihistaminica:</strong> Symptoomverlichting (€10-30/maand)</li>
                <li><strong>Corticosteroïden:</strong> Bij ernstige jeuk (korte termijn)</li>
                <li><strong>Immunotherapie:</strong> Bij gediagnosticeerde omgevingsallergieën (€500-1500 voor allergietest + behandeling)</li>
                <li><strong>Vlooienpreventie:</strong> Strikte vlooiencontrole (€10-20/maand)</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Zelf Anaalklieren Uitdrukken: Mag Dat?
              </h2>

              <p>
                Technisch gezien <strong>kan</strong> je het leren, maar het wordt <strong>niet aanbevolen</strong> voor huiseigenaren.
              </p>

              <div className="bg-cpSurface dark:bg-cpCharcoal/50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold mb-4">Waarom het beter is om de dierenarts te laten doen:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Risico op beschadiging:</strong> Verkeerde techniek kan klieren scheuren of infecteren</li>
                  <li><strong>Incomplete lediging:</strong> Zonder ervaring leeg je klieren vaak niet volledig</li>
                  <li><strong>Missed diagnose:</strong> Dierenarts herkent afwijkingen (bloed, pus, tumoren)</li>
                  <li><strong>Ongemak voor hond:</strong> Onervaren uitdrukken is pijnlijk</li>
                  <li><strong>Onaangename taak:</strong> Extreem vieze geur, kans op spatten</li>
                </ul>
              </div>

              <p>
                <strong>Als je het toch wilt proberen:</strong> Laat de dierenarts het eerst demonstreren en oefen onder supervisie. Gebruik handschoenen en doe het alleen als je hond kalm en coöperatief is.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Preventie: Hoe Voorkom Je Sleetje Rijden?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Juiste Voeding voor Optimale Ontlasting
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Vezels toevoegen:</strong> Pompoenpuree (1-2 eetlepels per maaltijd) of psylliumvezels</li>
                <li><strong>Kwaliteitsvoer:</strong> Hoogwaardig hondenvoer met goede vertering</li>
                <li><strong>Consistente ontlasting:</strong> Niet te hard, niet te zacht - ideaal zijn vormvaste drollen</li>
                <li><strong>Voldoende hydratatie:</strong> Altijd vers water beschikbaar</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Gewichtsmanagement
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Overgewicht verhoogt risico op anaalklierenproblemen</li>
                <li>Vet rondom de anus verstoort natuurlijke drainage</li>
                <li>Houd je hond op gezond gewicht met dieet en beweging</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Regelmatig Ontwormen
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Puppy's:</strong> Elke 2 weken tot 12 weken oud, daarna maandelijks tot 6 maanden</li>
                <li><strong>Volwassen honden:</strong> Minimaal elke 3-6 maanden</li>
                <li><strong>Hogere frequentie:</strong> Bij jagen, rauw voer, of contact met andere dieren</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Hygiëne en Grooming
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Sanitaire trim:</strong> Houd vacht rond anus kort, vooral bij langharige rassen</li>
                <li><strong>Reinig na diarree:</strong> Gebruik vochtige doekjes speciaal voor huisdieren</li>
                <li><strong>Regelmatig baden:</strong> Houd anale regio schoon</li>
              </ul>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Profylactisch Uitdrukken (Voor Chronische Gevallen)
              </h3>
              <p>
                Als je hond chronisch last heeft, kan regelmatig preventief uitdrukken nodig zijn:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Elke 4-8 weken bij de dierenarts</li>
                <li>Voorkomt volledige verstopping</li>
                <li>Sommige dierenartsen bieden "anaalklieren pakket" met korting</li>
                <li>Kosten: €15-30 per keer, €60-120 per jaar</li>
              </ul>

              <div className="bg-cpAmber/20 dark:bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-3">
                  Succesverhaal: Bella's Vezeloplossing
                </h3>
                <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                  "Onze Franse Bulldog Bella (4 jaar) had chronisch anaalklierenproblemen. Om de 3-4 weken moesten we naar de dierenarts voor uitdrukken. De dierenarts adviseerde om pompoenpuree toe te voegen aan haar voer. We begonnen met 2 eetlepels per maaltijd.
                  <br /><br />
                  Na 2 weken zagen we al verschil - haar ontlasting was steviger en beter gevormd. Na 6 weken was het sleetje rijden volledig verdwenen. Nu, een jaar later, heeft ze slechts 1x in de 4 maanden hulp nodig in plaats van maandelijks. De vezeltoevoeging heeft haar leven (en onze portemonnee) enorm verbeterd. Kosten: €3 per blik pompoen die 2 weken meegaat."
                  <br /><br />
                  <em>- Tom uit Den Haag</em>
                </p>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Neem Sleetje Rijden Serieus
              </h2>

              <p>
                Hoewel sleetje rijden er grappig kan uitzien, is het een <strong>duidelijk signaal van ongemak</strong> dat serieus genomen moet worden. In 80% van de gevallen is het veroorzaakt door anaalklierenproblemen, een probleem dat eenvoudig behandeld kan worden maar zonder behandeling kan escaleren tot pijnlijke infecties of abcessen.
              </p>

              <p>
                <strong>Belangrijkste punten om te onthouden:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Sleetje rijden is geen normaal gedrag - het wijst op irritatie of ongemak</li>
                <li>Anaalklierenproblemen zijn de meest voorkomende oorzaak (80%)</li>
                <li>Ga naar dierenarts bij herhaald sleetje rijden of alarmsymptomen</li>
                <li>Preventie via voeding (vezels), gewicht en hygiëne is effectief</li>
                <li>Regelmatig ontwormen voorkomt worm-gerelateerde jeuk</li>
                <li>Chronische problemen kunnen profylactisch uitdrukken vereisen</li>
                <li>Probeer niet zelf anaalklieren uit te drukken zonder training</li>
              </ul>

              <p>
                Door alert te zijn op dit gedrag en tijdig in te grijpen, voorkom je dat een simpel probleem uitgroeit tot een pijnlijke en kostbare aandoening. Je hond zal je dankbaar zijn voor de opluchting!
              </p>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral p-6 rounded-lg my-8">
                <p className="text-cpCharcoal dark:text-cpCream font-semibold">
                  💡 Wil je meer leren over het herkennen van gezondheidsproblemen bij je hond? Bekijk onze gids over <Link href="/gids/dierengezondheid/hond-pijn-herkennen" className="text-cpCoral hover:underline">pijn herkennen bij honden</Link>.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-12 mb-12">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde Vragen
              </h2>
              <div className="space-y-4">
                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Is sleetje rijden normaal of moet ik naar de dierenarts?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Sleetje rijden is NIET normaal gedrag. Een enkele keer kan onschuldig zijn (bijv. na een jeukende ontlasting), maar herhaald of dagelijks sleetje rijden vereist veterinaire aandacht. Maak een afspraak binnen 2-3 dagen bij regelmatig voorkomen, ga direct bij bloederige afscheiding, zwelling, pijn of weigering om te zitten. De meeste gevallen zijn eenvoudig te behandelen als ze vroeg worden opgepikt.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Hoeveel kost het om anaalklieren te laten uitdrukken?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Kosten variëren per dierenartspraktijk: simpel uitdrukken €15-30 (5-10 minuten), inclusief consult €40-60, bij ontsteking met spoelen en antibiotica €50-100, chirurgische verwijdering bij chronische problemen €300-800. Sommige dierenartsen bieden "anaalklier pakket" met korting voor honden die regelmatig (maandelijks) hulp nodig hebben. Preventiemaatregelen zoals vezels toevoegen aan voer (pompoenpuree €3/2 weken) kunnen frequentie verminderen.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Kan ik zelf de anaalklieren van mijn hond uitdrukken?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Technisch kan het, maar het wordt sterk afgeraden zonder professionele training. Risico's: beschadiging van klieren bij verkeerde techniek, incomplete lediging waardoor probleem blijft bestaan, gemiste diagnose van infecties of tumoren, pijnlijke ervaring voor je hond, extreem vieze geur en kans op spatten. Als je het toch wilt leren: laat de dierenarts het eerst demonstreren en oefen onder supervisie. Voor de meeste eigenaren is €15-30 per bezoek aan de dierenarts het risico niet waard.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Hoe voorkom ik anaalklierenproblemen bij mijn hond?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Preventieve maatregelen: voeg vezels toe aan voer (1-2 eetlepels pompoenpuree per maaltijd of psylliumvezels), zorg voor optimale ontlastingsconsistentie (vormvast, niet te hard/zacht), houd je hond op gezond gewicht (overgewicht verhoogt risico), ontwormen elke 3-6 maanden, sanitaire trim bij langharige rassen, voldoende beweging en hydratatie. Bij chronische problemen: overweeg profylactisch uitdrukken elke 6-8 weken. Vezelsuppletie is vaak het meest effectief en kost slechts €3-5 per maand.
                  </p>
                </details>

                <details className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-lg text-cpCharcoal dark:text-cpCream">
                    Welke hondenrassen hebben het meest last van anaalklierenproblemen?
                  </summary>
                  <p className="mt-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Kleine rassen zijn vaker getroffen: Chihuahua's, Maltezers, Poedels (toy/mini), Shih Tzu's, Lhasa Apso's, Cavalier King Charles Spaniels, Beagles hebben ook hoger risico. Brachycefale (platneusde) rassen zoals Franse Bulldogs en Engelse Bulldogs hebben vaak problemen. Anatomische factoren: kleinere kliergangen, ondiepe anaalzakken, overgewicht (common bij deze rassen). Ook oudere honden en honden met chronische diarree hebben hoger risico. Als je een vatbaar ras hebt: wees extra alert op symptomen en overweeg profylactische maatregelen.
                  </p>
                </details>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mt-12 mb-12">
              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Gerelateerde Artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/gids/dierengezondheid/hond-pijn-herkennen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Pijn Herkennen bij Honden: Subtiele Signalen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer de vaak subtiele signalen herkennen dat je hond pijn heeft of ongemak ervaart.
                  </p>
                </Link>

                <Link
                  href="/gids/dierengezondheid/hond-diarree-behandelen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Diarree bij Honden: Oorzaken en Behandeling
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek wat je moet doen bij diarree en wanneer je naar de dierenarts moet.
                  </p>
                </Link>

                <Link
                  href="/gids/dierengezondheid/hond-ontwormen-schema"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Hond Ontwormen: Schema en Beste Middelen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Complete gids over het ontwormen van je hond voor optimale gezondheid.
                  </p>
                </Link>

                <Link
                  href="/gids/hondenvoeding/beste-hondenvoer-kiezen"
                  className="block bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                    Het Beste Hondenvoer Kiezen
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek welk voer zorgt voor optimale spijsvertering en gezonde ontlasting.
                  </p>
                </Link>
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                hond sleetje rijden
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                hond schuurt kont
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                anaalklieren hond
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                scooting hond
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                hondengezondheid
              </span>
              <span className="px-4 py-2 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream rounded-full text-sm">
                anaalklierprobleem
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Quick Links */}
              <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                  Op deze Pagina
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#wat-is-sleetje-rijden" className="text-cpCoral hover:underline">
                      Wat is Sleetje Rijden
                    </a>
                  </li>
                  <li>
                    <a href="#oorzaken" className="text-cpCoral hover:underline">
                      7 Oorzaken
                    </a>
                  </li>
                  <li>
                    <a href="#dierenarts" className="text-cpCoral hover:underline">
                      Wanneer Naar Dierenarts
                    </a>
                  </li>
                  <li>
                    <a href="#behandeling" className="text-cpCoral hover:underline">
                      Behandeling
                    </a>
                  </li>
                  <li>
                    <a href="#preventie" className="text-cpCoral hover:underline">
                      Preventie Tips
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Hond Schuurt Kont Over de Grond: Sleetje Rijden Verklaard',
            description: 'Waarom schuurt je hond zijn kont over de vloer? Ontdek alle oorzaken van sleetje rijden bij honden, van anaalklieren tot wormen.',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T12:00:00Z',
            dateModified: '2025-01-15T12:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://cutiepawspedia.nl/blog/hond-sleetje-rijden-oorzaak',
            },
            articleSection: 'Dierengezondheid',
            keywords: 'hond sleetje rijden, hond schuurt kont, anaalklieren hond, scooting hond, hondengezondheid',
          }),
        }}
      />
    </main>
  );
}
