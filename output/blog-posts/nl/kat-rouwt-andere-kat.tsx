import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BetweenContentAd } from '@/components/ads/BetweenContentAd';
import { BlogSidebarAd } from '@/components/ads/BlogSidebarAd';
import { PhotoCredit } from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Kat Rouwt om Andere Kat: Tekenen & Hoe Je Helpt | CutiePawsPedia',
  description: 'Rouwt je kat om een overleden huisgenoot? Leer de tekenen van rouw bij katten herkennen en ontdek hoe je je kat kunt helpen door deze moeilijke periode heen.',
  keywords: 'kat rouwt, kat verdriet, kat mist andere kat, rouwproces kat, kat gedragsverandering',
  openGraph: {
    title: 'Kat Rouwt om Andere Kat: Tekenen en Hoe Je Helpt',
    description: 'Herken rouw bij je kat en help hem door deze moeilijke periode.',
    type: 'article',
    publishedTime: '2025-01-15T13:00:00Z',
    authors: ['CutiePawsPedia'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1573865526739-10c1dd7e91fc?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Verdrietige kat'
      }
    ]
  }
};

export default function KatRouwtAnderePage() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Kat rouwt om andere kat: tekenen en hoe je helpt',
            description: 'Uitgebreide gids over het herkennen van rouw bij katten en hoe je je kat kunt ondersteunen',
            image: 'https://images.unsplash.com/photo-1573865526739-10c1dd7e91fc?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T13:00:00Z',
            dateModified: '2025-01-15T13:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia'
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png'
              }
            }
          })
        }}
      />

      {/* Hero Section */}
      <header className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573865526739-10c1dd7e91fc?w=1600&h=900&fit=crop"
          alt="Eenzame kat die uit het raam kijkt"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Manja Vitolic"
          photographerUrl="https://unsplash.com/@madhatterzone"
          platform="Unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full mb-4">
              Huisdiergedrag
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Kat rouwt om andere kat: tekenen en hoe je helpt
            </h1>
            <div className="flex items-center text-cpCream/80 text-sm">
              <time dateTime="2025-01-15">15 januari 2025</time>
              <span className="mx-3">•</span>
              <span>8 minuten leestijd</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:gap-8">
        {/* Article Content */}
        <main className="md:w-2/3">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
              Het verlies van een huisdier is pijnlijk, niet alleen voor ons maar ook voor onze andere huisdieren. Katten kunnen intens rouwen om een overleden kattenmaatje. Ze kunnen gedragsveranderingen vertonen, minder eten en lijken te zoeken naar hun vermiste vriend. Als katteneigenaar is het belangrijk om deze tekenen te herkennen en te weten hoe je je kat kunt helpen door deze moeilijke periode heen.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Kunnen katten echt rouwen?
            </h2>
            <p>
              Ja, katten kunnen absoluut rouwen. Hoewel ze vaak worden gezien als solitaire dieren, vormen katten die samen leven sterke sociale banden. Vooral katten die samen zijn opgegroeid of jarenlang samenwonen, ontwikkelen hechte vriendschappen met elkaar. Ze delen territorium, verzorgen elkaar, spelen samen en slapen vaak dicht bij elkaar.
            </p>
            <p>
              Wanneer een van deze katten overlijdt of verdwijnt, ervaart de achtergebleven kat een verstoring van zijn sociale structuur en dagelijkse routine. Wetenschappelijk onderzoek heeft aangetoond dat katten emoties kunnen ervaren die vergelijkbaar zijn met verdriet en rouw, hoewel ze dit anders uiten dan mensen.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Herkenbare tekenen van rouw bij katten
            </h2>
            <p>
              Rouw bij katten kan zich op verschillende manieren manifesteren. Let op deze gedragsveranderingen:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              1. Zoekgedrag
            </h3>
            <p>
              Je kat loopt door het huis alsof hij op zoek is naar iets. Hij snuffelt op plekken waar de overleden kat vaak lag, miauwt klagelijk, of kijkt verwachtingsvol naar de deur. Dit zoekgedrag kan dagen tot weken duren.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              2. Veranderingen in eetlust
            </h3>
            <p>
              Een rouwende kat kan minder eten of juist meer. Sommige katten verliezen hun interesse in voedsel volledig, terwijl anderen eten zoeken als troost. Een significante verandering in eetpatroon die langer dan 2-3 dagen duurt, vereist aandacht.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              3. Toegenomen vocalisatie
            </h3>
            <p>
              Katten die normaal stil zijn, kunnen plotseling beginnen met mauwen, jengelen of huilen. Dit klagelijke geluid klinkt vaak treurig en kan vooral 's nachts voorkomen wanneer het huis stil is.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              4. Terugtrekking of aanhankelijk gedrag
            </h3>
            <p>
              Sommige katten isoleren zich en trekken zich terug op rustige plekken. Andere katten worden juist extra aanhankelijk en volgen hun eigenaar overal. Beide reacties zijn normale uitingen van rouw.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              5. Slaappatroon veranderingen
            </h3>
            <p>
              Je kat slaapt misschien veel meer dan normaal (depressief gedrag), of juist minder en lijkt rusteloos. Hij kan weigeren om te slapen op plekken waar hij normaal met de andere kat sliep.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              6. Verminderde verzorging
            </h3>
            <p>
              Een rouwende kat kan stoppen met zichzelf verzorgen, waardoor zijn vacht dof en verward wordt. Dit is een teken van depressie en vereist zorgzame aandacht.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              7. Verlies van interesse in spel
            </h3>
            <p>
              Speelgoed dat normaal spannend was, lijkt nu niet meer interessant. Je kat vertoont minder energie en enthousiasme voor activiteiten die hij voorheen leuk vond.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Hoe lang duurt het rouwproces?
            </h2>
            <p>
              Het rouwproces bij katten varieert sterk per individuele kat en is afhankelijk van verschillende factoren:
            </p>
            <ul className="space-y-2">
              <li><strong>De sterkte van de band:</strong> Katten die zeer hecht waren, rouwen vaak langer</li>
              <li><strong>Persoonlijkheid:</strong> Sociale katten kunnen heviger reageren dan meer onafhankelijke katten</li>
              <li><strong>Duur van samenwonen:</strong> Katten die jarenlang samen woonden, ervaren een diepere verstoring</li>
              <li><strong>Huiselijke veranderingen:</strong> Als jij ook rouwt, kan je kat dit aanvoelen en langer verdrietig blijven</li>
            </ul>
            <p>
              Over het algemeen duurt de meest intense rouwperiode 2-6 weken. De meeste katten beginnen zich na een maand geleidelijk aan te passen aan de nieuwe situatie. Sommige katten kunnen echter maanden blijven rouwen, vooral als ze zeer hecht waren met de overleden kat.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Hoe kun je je rouwende kat helpen?
            </h2>
            <p>
              Er zijn verschillende manieren waarop je je kat kunt ondersteunen tijdens het rouwproces:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              1. Behoud routine en stabiliteit
            </h3>
            <p>
              Katten vinden rust in voorspelbaarheid. Probeer de dagelijkse routine zo veel mogelijk gelijk te houden:
            </p>
            <ul className="space-y-2">
              <li>Voer op dezelfde tijden</li>
              <li>Houd speelmomenten en aandachtstijd consistent</li>
              <li>Behoud slaapplekken en kattenbaklocaties</li>
              <li>Verander niet direct de inrichting van het huis</li>
            </ul>
            <p>
              Deze structuur geeft je kat houvast in een periode van onzekerheid.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              2. Geef extra aandacht, maar forceer het niet
            </h3>
            <p>
              Bied je kat extra liefde en aandacht, maar respecteer ook zijn behoefte aan ruimte. Zit rustig bij hem, praat zacht tegen hem, en laat hem zelf bepalen wanneer hij contact wil. Forceer geen knuffels als hij zich terugtrekt.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              3. Stimuleer eten op een positieve manier
            </h3>
            <p>
              Als je kat minder eet:
            </p>
            <ul className="space-y-2">
              <li>Bied smakelijk natvoer of speciale lekkernijen aan</li>
              <li>Warm het voer lichtjes op om de geur te versterken</li>
              <li>Probeer handmatig voeren in kleine porties</li>
              <li>Overweeg tijdelijk high-quality kattenvoer met sterke smaak</li>
              <li>Zorg dat vers water altijd beschikbaar is</li>
            </ul>
            <p>
              <strong>Let op:</strong> Als je kat meer dan 48 uur weigert te eten, neem dan contact op met de dierenarts.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              4. Verrijk de omgeving met stimulatie
            </h3>
            <p>
              Afleidingstrajecten kunnen helpen:
            </p>
            <ul className="space-y-2">
              <li>Introduceer nieuw speelgoed (interactief speelgoed werkt goed)</li>
              <li>Gebruik katten-TV (vogels buiten het raam, YouTube videos voor katten)</li>
              <li>Verstop lekkernijen in het huis voor zoekspelletjes</li>
              <li>Speel dagelijks actief met je kat (laserpunt, veertjes)</li>
              <li>Plaats een nieuw krabpaal of kattengrastuin</li>
            </ul>

            <BetweenContentAd />

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              5. Overweeg feromonen en natuurlijke kalmeringsmiddelen
            </h3>
            <p>
              Producten kunnen helpen bij de emotionele ondersteuning:
            </p>
            <ul className="space-y-2">
              <li><strong>Feliway:</strong> Synthetische feromonen die kalmte bevorderen</li>
              <li><strong>Rescue Remedy voor dieren:</strong> Natuurlijke kruidenmix tegen stress</li>
              <li><strong>Zylkene:</strong> Supplement op basis van melkeiwit met kalmerende werking</li>
            </ul>
            <p>
              Overleg altijd met je dierenarts voordat je supplementen geeft.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              6. Wees voorzichtig met het verwijderen van spullen
            </h3>
            <p>
              Haast je niet met het weggooien van de spullen van de overleden kat. De geur kan troostend zijn voor de achtergebleven kat. Laat kattenbakken, dekens en speelgoed nog een tijdje staan. Verwijder dingen geleidelijk over enkele weken.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              7. Monitor je eigen emoties
            </h3>
            <p>
              Katten voelen de emoties van hun eigenaren. Als jij diep rouwt, kan dit de rouw van je kat versterken. Probeer rustig en positief te blijven in het bijzijn van je kat. Het is oké om verdrietig te zijn, maar toon ook momenten van normaliteit en positieve interactie.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wanneer moet je naar de dierenarts?
            </h2>
            <p>
              Hoewel rouw normaal is, zijn er situaties waarin veterinaire hulp nodig is:
            </p>
            <ul className="space-y-2">
              <li>Je kat weigert langer dan 48 uur te eten of drinken</li>
              <li>Er is sprake van extreem gewichtsverlies</li>
              <li>Je kat verstopt zich volledig en komt niet meer tevoorschijn</li>
              <li>Er zijn tekenen van ziekte (braken, diarree, lethargie)</li>
              <li>Het rouwgedrag verbetert niet na 6-8 weken</li>
              <li>Je kat vertoont zelfbeschadigend gedrag (overdreven likken, krabben)</li>
              <li>Het gedrag verslechtert in plaats van verbetert over tijd</li>
            </ul>
            <p>
              De dierenarts kan medische problemen uitsluiten en eventueel medicatie voorschrijven om je kat te helpen ontspannen. Soms is het verdriet zo diep dat professionele ondersteuning nodig is.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Overwegen: een nieuwe kat erbij?
            </h2>
            <p>
              Een veelvoorkomende vraag is of het helpt om direct een nieuwe kat aan te schaffen. Het antwoord is genuanceerd:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Voor het introduceren van een nieuwe kat:
            </h3>
            <ul className="space-y-2">
              <li><strong>Wacht tot de rouw afneemt:</strong> Geef je kat minimaal 4-6 weken om te verwerken</li>
              <li><strong>Overweeg het karakter:</strong> Was je kat sociaal en genoot hij van gezelschap? Dan kan een nieuwe vriend helpen</li>
              <li><strong>Denk aan de leeftijd:</strong> Oude katten hebben soms moeite met een energieke jongere kat</li>
              <li><strong>Introduceer geleidelijk:</strong> Volg de juiste introductieprotocollen voor een succesvolle kennismaking</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tegen het introduceren van een nieuwe kat:
            </h3>
            <ul className="space-y-2">
              <li>Als je kat altijd solitair was en moeite had met andere katten</li>
              <li>Tijdens de intense rouwperiode - dit voegt extra stress toe</li>
              <li>Als je zelf nog niet klaar bent voor een nieuwe kat</li>
            </ul>
            <p>
              Elke situatie is uniek. Observeer je kat en neem de tijd voor deze beslissing.
            </p>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber p-6 my-8 rounded-r-lg">
              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                Tip: het afscheid nemen
              </h3>
              <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                Als je kat thuis euthanasie ondergaat, overweeg dan om je andere kat de overleden kat te laten zien en ruiken. Dit helpt hem begrijpen dat zijn vriend niet terugkomt. Veel katten snuffelen kort en lopen dan weg - dit is voldoende voor begrip en closure.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Weet mijn kat dat zijn kattenmaatje dood is?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Katten begrijpen het concept van dood niet zoals mensen dat doen, maar ze begrijpen wel afwezigheid en verandering. Als je kat de overleden kat heeft kunnen ruiken (bijvoorbeeld na euthanasie thuis), begrijpt hij sneller dat zijn vriend niet terugkomt. Anders kan hij weken blijven zoeken, wat het rouwproces verlengt.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan mijn kat depressief worden van rouw?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Ja, katten kunnen een staat van diepe rouw beleven die lijkt op depressie bij mensen. Ze kunnen lethargisch worden, interesse verliezen in activiteiten, en zich isoleren. Met juiste ondersteuning en tijd herstellen de meeste katten hiervan. Als het langer dan 2 maanden duurt of ernstig is, kan de dierenarts medicatie voorschrijven.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Rouwen katten ook om honden of andere huisdieren?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Absoluut! Katten kunnen sterke banden ontwikkelen met honden, konijnen of andere huisdieren waarmee ze samenwonen. Het rouwproces is vergelijkbaar, ongeacht het soort dier dat is overleden. Katten die opgroeiden met een hond kunnen net zo intens rouwen als om een andere kat.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Moet ik mijn kat laten zien dat ik ook verdrietig ben?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Het is oké om verdrietig te zijn - katten voelen toch wel je emoties. Probeer echter niet constant te huilen in het bijzijn van je kat, want dit kan zijn stress verergeren. Zoek balans: geef jezelf de ruimte om te rouwen, maar toon ook momenten van normaliteit en positieve interactie met je kat. Dit helpt jullie beiden door het proces heen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Verandert het karakter van mijn kat permanent na het verlies?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    De meeste katten keren terug naar hun normale karakter na verwerking van het verlies, hoewel dit maanden kan duren. Sommige katten blijven wel iets veranderd - bijvoorbeeld iets aanhankelijker of juist onafhankelijker. Katten die zeer afhankelijk waren van hun overleden maatje kunnen blijvend meer mensgerichte aandacht zoeken. Dit is normaal en kan zelfs je band versterken.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Gerelateerde artikelen
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/gids/kattengedrag/meerdere-katten-samen"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Meerdere katten houden: tips voor een harmonisch gezin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/kattengedrag/stress-bij-katten"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Stress bij katten herkennen en verminderen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/dierengezondheid/oude-kat-verzorgen"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Oude kat verzorgen: complete gids
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                kat rouwt
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                kat verdriet
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                rouwproces
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                kattengedrag
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                huisdier verlies
              </span>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="md:w-1/3 mt-12 md:mt-0">
          <div className="sticky top-8">
            <BlogSidebarAd />
          </div>
        </aside>
      </div>
    </article>
  );
}
