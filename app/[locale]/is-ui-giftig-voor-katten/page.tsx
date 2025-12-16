import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Ui Giftig voor Katten? | Symptomen & Wat Te Doen',
  description: 'Ui is zeer giftig voor katten en veroorzaakt ernstige bloedarmoede. Leer de symptomen van uivergiftiging bij katten en wat te doen als je kat ui heeft gegeten.',
  keywords: 'ui giftig katten, kat ui gegeten, uivergiftiging kat, look giftig katten, allium vergiftiging kat, heinz body anemie kat',
  openGraph: {
    title: 'Is Ui Giftig voor Katten? Allium Vergiftiging Gevaren',
    description: 'Ui en andere Allium groenten zijn dodelijk voor katten. Ontdek symptomen van uivergiftiging en spoedbehandeling.',
    type: 'article',
    publishedTime: '2025-12-15',
    modifiedTime: '2025-12-15',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsUiGiftigVoorKatten() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Ui Giftig voor Katten?',
    description: 'Uitgebreide informatie over uivergiftiging bij katten, symptomen van Allium toxiciteit en behandeling',
    datePublished: '2025-12-15',
    dateModified: '2025-12-15',
    author: {
      '@type': 'Organization',
      name: 'CutiePawsPedia',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom is ui zo giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ui is giftig voor katten door verbindingen genaamd organosulfiden en disulfiden (vooral N-propyldisulfide). Deze stoffen beschadigen rode bloedcellen door oxidatieve schade, wat leidt tot hemolyse (barsting van bloedcellen) en ernstige bloedarmoede (Heinz body anemie). Katten zijn 2-3x gevoeliger voor Allium toxiciteit dan honden door verschillen in hun rode bloedcellen structuur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoeveel ui is giftig voor een kat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Elke hoeveelheid ui is potentieel gevaarlijk voor katten, maar symptomen verschijnen meestal bij inname van ongeveer 5 gram ui per kilogram lichaamsgewicht. Voor een gemiddelde kat van 4-5 kg is dit slechts 20-25 gram ui (ongeveer 1-2 eetlepels gehakte ui). Omdat katten zo gevoelig zijn, is het beste advies: GEEN ui in elke vorm.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een kat sterven van ui?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, katten kunnen sterven aan uivergiftiging als ze niet behandeld worden. Ernstige bloedarmoede (hematocrit <15%) kan leiden tot orgaanfalen, zuurstoftekort en overlijden binnen 3-7 dagen zonder bloedtransfusie. Chronische blootstelling aan kleine hoeveelheden is ook gevaarlijk. Met snelle veterinaire zorg (bloedtransfusie, ondersteunende behandeling) is de overlevingskans goed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe lang duurt het voordat symptomen van uivergiftiging verschijnen bij katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen van uivergiftiging bij katten verschijnen meestal binnen 1-3 dagen na inname, omdat het tijd kost voor de rode bloedcellen om beschadigd te raken en te barsten. Vroege symptomen (maagklachten) kunnen binnen 12-24 uur verschijnen. Ernstige bloedarmoede ontwikkelt zich meestal na 2-5 dagen. Dit vertraagde effect maakt het moeilijk om de oorzaak te herkennen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Zijn knoflook en look ook giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, alle Allium groenten zijn giftig voor katten: knoflook, look, sjalotten, bieslook en prei. Knoflook is zelfs 5x giftiger dan ui voor katten. Zelfs gedroogde of gekookte vormen behouden hun toxiciteit. Vermijd alle Allium-familie groenten in kattenvoeding, inclusief babyvoeding en voedsel voor mensen dat deze ingrediënten bevat.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb with JSON-LD Schema */}
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="Ui voor Katten"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Ui Giftig voor Katten?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-2">
            Risico: Zeer hoog - Katten extra gevoelig
          </h2>
          <p className="text-red-800">
            <strong>Alle vormen van ui zijn giftig:</strong> Rauw, gekookt, gedroogd, uienpoeder - alles is gevaarlijk
            <br />
            <strong>Andere Allium groenten:</strong> Knoflook (nog giftiger), look, sjalot, bieslook, prei
            <br />
            <strong>Gevaar:</strong> Veroorzaakt ernstige bloedarmoede (Heinz body anemie) door vernietiging van rode bloedcellen
            <br />
            <strong>Kleine hoeveelheden zijn gevaarlijk:</strong> Zelfs zeer kleine hoeveelheden kunnen toxisch zijn
            <br />
            <strong>Vertraagde symptomen:</strong> Verschijnen vaak pas enkele dagen na inname
            <br />
            Neem onmiddellijk contact op met je dierenarts als je kat ui heeft gegeten.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Is Ui Zo Giftig voor Katten?
          </h2>
          <p className="text-gray-700 mb-4">
            Ui behoort tot de <strong>Allium familie</strong> van groenten, die allemaal organische zwavelverbindingen bevatten genaamd <strong>organosulfiden en disulfiden</strong>, met name N-propyldisulfide. Deze verbindingen zijn extreem giftig voor katten omdat ze <strong>oxidatieve schade</strong> veroorzaken aan rode bloedcellen.
          </p>
          <p className="text-gray-700 mb-4">
            Wanneer een kat ui eet, worden deze zwavelverbindingen geabsorbeerd en binden ze zich aan de hemoglobine in rode bloedcellen. Dit veroorzaakt de vorming van <strong>Heinz bodies</strong> (beschadigde hemoglobine clusters) in de bloedcellen, waardoor de cellen zwak en kwetsbaar worden. Het immuunsysteem herkent deze beschadigde cellen als abnormaal en vernietigt ze, wat leidt tot <strong>hemolytische anemie</strong> (ernstige bloedarmoede).
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Katten zijn 2-3 keer gevoeliger</strong> voor Allium toxiciteit dan honden omdat hun rode bloedcellen meer kwetsbaar zijn voor oxidatieve schade en een hoger hemoglobine gehalte hebben dat gemakkelijker wordt aangetast.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Alle Vormen van Ui Zijn Giftig:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Rauwe ui:</strong> Bevat de hoogste concentratie toxines
            </li>
            <li>
              <strong>Gekookte ui:</strong> Koken vernietigt de giftige verbindingen NIET - blijft even gevaarlijk
            </li>
            <li>
              <strong>Gedroogde ui:</strong> Geconcentreerde vorm - zeer giftig
            </li>
            <li>
              <strong>Uienpoeder:</strong> Extreem geconcentreerd, vaak in kruiden en sauzen
            </li>
            <li>
              <strong>Gebakken ui:</strong> Behoudt toxiciteit ondanks verhitting
            </li>
            <li>
              <strong>Uiensap of bouillon:</strong> Toxines lossen op in vloeistoffen
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Andere Giftige Allium Groenten voor Katten:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Knoflook:</strong> 5x GIFTIGER dan ui voor katten - nog gevaarlijker!
            </li>
            <li>
              <strong>Look (leek):</strong> Bevat vergelijkbare organosulfiden als ui
            </li>
            <li>
              <strong>Sjalotten:</strong> Hoge concentratie toxische verbindingen
            </li>
            <li>
              <strong>Bieslook:</strong> Ook in gedroogde vorm giftig
            </li>
            <li>
              <strong>Prei:</strong> Alle delen zijn giftig (wit én groen)
            </li>
            <li>
              <strong>Chinese ui:</strong> Vergelijkbare toxiciteit als reguliere ui
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Uivergiftiging bij Katten
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen van uivergiftiging verschijnen vaak <strong>vertraagd</strong> (1-5 dagen na inname) omdat het tijd kost voor de rode bloedcellen om beschadigd te raken en te barsten:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Vroege Symptomen (12-24 Uur):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Maagklachten en misselijkheid</li>
            <li>Braken en diarree</li>
            <li>Kwijlen</li>
            <li>Verminderde eetlust</li>
            <li>Buikpijn (kat zit ineengedoken)</li>
            <li>Lethargie en zwakte</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Symptomen van Bloedarmoede (2-5 Dagen):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Bleke of witte tandvleem en slijmvliezen</li>
            <li>Gele tandvlees of ogen (geelzucht door afbraak bloedcellen)</li>
            <li>Versnelde of moeizame ademhaling</li>
            <li>Verhoogde hartslag (puls {'>'}220 slagen/min)</li>
            <li>Extreme vermoeidheid en zwakte</li>
            <li>Koude poten en oren</li>
            <li>Desoriëntatie of sufheid</li>
            <li>Geen interesse in spelen of normale activiteiten</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Ernstige Symptomen (5+ Dagen of Bij Grote Inname):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Donkerrode of bruine urine (door hemoglobine in urine)</li>
            <li>Collaps of bewusteloosheid</li>
            <li>Stuipen of tremoren</li>
            <li>Hypothermie (lage lichaamstemperatuur)</li>
            <li>Orgaanfalen (nieren, lever)</li>
            <li>Coma</li>
            <li>Overlijden (zonder behandeling)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Kat Ui Heeft Gegeten
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p className="text-red-900 font-bold mb-3">
              Onmiddellijke actie vereist
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-red-900">
              <li>
                <strong>Bel direct je dierenarts</strong> - Ook bij kleine hoeveelheden ui, omdat symptomen vertraagd zijn
              </li>
              <li>
                <strong>Schat de hoeveelheid</strong> - Probeer te bepalen hoeveel ui je kat heeft gegeten en in welke vorm
              </li>
              <li>
                <strong>Noteer het tijdstip</strong> - Wanneer heeft je kat de ui gegeten (belangrijk voor behandeling)
              </li>
              <li>
                <strong>Ga naar de dierenarts</strong> - Vooral als de inname recent was, kan behandeling effectief zijn
              </li>
              <li>
                <strong>Laat je kat niet zelf braken</strong> - Dit moet door een dierenarts gebeuren
              </li>
              <li>
                <strong>Monitor symptomen</strong> - Let op tandvleeskleur, ademhaling, energie niveau, urinekleur
              </li>
              <li>
                <strong>Bewaar het voedsel</strong> - Als de ui in voedsel zat, breng een voorbeeld mee naar de dierenarts
              </li>
              <li>
                <strong>Bereid je voor op bloedtests</strong> - De dierenarts zal bloedonderzoek doen om anemie te detecteren
              </li>
            </ol>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
            <p className="text-emerald-900 font-semibold mb-3">
              Behandelingstijdlijn:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-emerald-900">
              <li>
                <strong>Bij recente inname:</strong> Dierenarts kan braken opwekken om ui te verwijderen - vroege behandeling is het meest effectief
              </li>
              <li>
                <strong>Eerste uren:</strong> Maagpomp of actieve kool kan helpen om absorptie te verminderen
              </li>
              <li>
                <strong>Latere fase:</strong> Ondersteunende zorg en monitoring voor anemie wordt de focus
              </li>
              <li>
                <strong>Opvolging:</strong> Herhaalde bloedtests om anemie te monitoren, mogelijk bloedtransfusie nodig
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Behandeling van Uivergiftiging
          </h2>
          <p className="text-gray-700 mb-4">
            De dierenarts zal de volgende behandelingen overwegen afhankelijk van het tijdstip en symptomen:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Acute Behandeling (Binnen 1-4 Uur):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Braken opwekken:</strong> Met medicijnen zoals apomorphine (binnen 1-2 uur na inname meest effectief)
            </li>
            <li>
              <strong>Maagpomp:</strong> Bij grotere hoeveelheden ui
            </li>
            <li>
              <strong>Actieve kool:</strong> Om resterende ui in maag en darmen te binden en absorptie te voorkomen (meerdere doses over 24 uur)
            </li>
            <li>
              <strong>Infuus:</strong> Om hydratatie te behouden en nieren te ondersteunen
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Ondersteunende Zorg (Dag 1-7):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Bloedtests:</strong> Complete bloedbeeld (CBC) om hematocrit en Heinz bodies te monitoren - elke 12-24 uur
            </li>
            <li>
              <strong>Infuustherapie:</strong> Continue hydratie en ondersteuning van nieren (helpt hemoglobine uitscheiden)
            </li>
            <li>
              <strong>Antioxidanten:</strong> Vitamine C en E om oxidatieve schade te verminderen
            </li>
            <li>
              <strong>Zuurstoftherapie:</strong> Bij ernstige anemie om weefsels van zuurstof te voorzien
            </li>
            <li>
              <strong>Bloedtransfusie:</strong> Bij levensbedreigende anemie (hematocrit {'<'}15-20%) - kan levensreddend zijn
            </li>
            <li>
              <strong>Monitoring:</strong> 24-48 uur ziekenhuisopname bij ernstige gevallen
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Prognose:
          </h3>
          <p className="text-gray-700 mb-4">
            De prognose hangt af van:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Hoeveelheid ui ingenomen (meer = slechtere prognose)</li>
            <li>Snelheid van behandeling (binnen 2 uur = beste kans)</li>
            <li>Ernst van anemie (hematocrit {'<'}15% = ernstig)</li>
            <li>Beschikbaarheid van bloedtransfusie (kan levensreddend zijn)</li>
            <li>Algehele gezondheid van de kat</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Met snelle behandeling en ondersteunende zorg overleven de meeste katten uivergiftiging. Herstel van anemie kan 1-2 weken duren omdat nieuwe rode bloedcellen moeten worden aangemaakt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen Met De Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>onmiddellijk</strong> contact op met je dierenarts bij:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>ELKE inname van ui, knoflook, of andere Allium groenten (zelfs kleine hoeveelheden)</li>
            <li>Braken of diarree na het eten van menselijk voedsel</li>
            <li>Bleke of gele tandvlees</li>
            <li>Donkere of bruine urine</li>
            <li>Versnelde ademhaling of hartslag</li>
            <li>Extreme lethargie of zwakte</li>
            <li>Weigering om te eten of drinken</li>
            <li>Collaps of bewusteloosheid</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventietips: Houd Ui Ver Van Je Kat
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Geef NOOIT menselijk voedsel met ui of knoflook</strong> - Dit omvat pizza, pasta sauzen, bouillon, soepen, tacos
            </li>
            <li>
              <strong>Lees ingrediëntenlijsten</strong> - Babyvoeding, conserven, en verwerkt voedsel bevatten vaak uienpoeder of knoflookpoeder
            </li>
            <li>
              <strong>Berg Allium groenten veilig op</strong> - In afgesloten kasten of de koelkast waar katten niet bij kunnen
            </li>
            <li>
              <strong>Ruim direct op</strong> - Gooi uienschillen en restjes direct weg in een afvalemmer met deksel
            </li>
            <li>
              <strong>Pas op met tafelresten</strong> - Veel gerechten bevatten verborgen ui of knoflook
            </li>
            <li>
              <strong>Educeer familie en gasten</strong> - Zorg dat iedereen weet dat ui giftig is voor katten
            </li>
            <li>
              <strong>Controleer kattenvoeding</strong> - Sommige commerciële kattenvoeding bevat kleine hoeveelheden uien - vermijd deze merken
            </li>
            <li>
              <strong>Geen verse kruiden delen</strong> - Bieslook en andere Allium kruiden zijn ook giftig
            </li>
            <li>
              <strong>Let op tijdens koken</strong> - Houd katten uit de keuken tijdens bereiding van gerechten met ui
            </li>
            <li>
              <strong>Gebruik kattenveilig voedsel</strong> - Als je je kat wil verwennen, kies speciaal kattenvoer of kattenveilige lekkernijen
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Waarom is ui zo giftig voor katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Ui is giftig voor katten door verbindingen genaamd organosulfiden en disulfiden (vooral N-propyldisulfide). Deze stoffen beschadigen rode bloedcellen door oxidatieve schade, wat leidt tot hemolyse (barsting van bloedcellen) en ernstige bloedarmoede (Heinz body anemie). Katten zijn 2-3x gevoeliger voor Allium toxiciteit dan honden door verschillen in hun rode bloedcellen structuur.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoeveel ui is giftig voor een kat?
          </h3>
          <p className="text-gray-700 mb-4">
            Zelfs zeer kleine hoeveelheden ui kunnen gevaarlijk zijn voor katten. Er bestaat geen bekende veilige dosering. Omdat katten zo gevoelig zijn, is het beste advies: geen ui in elke vorm.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Kan een kat sterven van ui?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, katten kunnen sterven aan uivergiftiging als ze niet behandeld worden. Ernstige bloedarmoede (hematocrit &lt;15%) kan leiden tot orgaanfalen, zuurstoftekort en overlijden binnen 3-7 dagen zonder bloedtransfusie. Chronische blootstelling aan kleine hoeveelheden is ook gevaarlijk. Met snelle veterinaire zorg (bloedtransfusie, ondersteunende behandeling) is de overlevingskans goed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoe lang duurt het voordat symptomen van uivergiftiging verschijnen bij katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Symptomen van uivergiftiging bij katten verschijnen meestal binnen 1-3 dagen na inname, omdat het tijd kost voor de rode bloedcellen om beschadigd te raken en te barsten. Vroege symptomen (maagklachten) kunnen binnen 12-24 uur verschijnen. Ernstige bloedarmoede ontwikkelt zich meestal na 2-5 dagen. Dit vertraagde effect maakt het moeilijk om de oorzaak te herkennen.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Zijn knoflook en look ook giftig voor katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, alle Allium groenten zijn giftig voor katten: knoflook, look, sjalotten, bieslook en prei. Knoflook is zelfs 5x giftiger dan ui voor katten. Zelfs gedroogde of gekookte vormen behouden hun toxiciteit. Vermijd alle Allium-familie groenten in kattenvoeding, inclusief babyvoeding en voedsel voor mensen dat deze ingrediënten bevat.
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Medische Disclaimer
            </h3>
            <p className="text-gray-700 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Uivergiftiging is een ernstige aandoening die levensbedreigende bloedarmoede kan veroorzaken. Als je vermoedt dat je kat ui, knoflook, of andere Allium groenten heeft gegeten, neem dan onmiddellijk contact op met je dierenarts of de dichtstbijzijnde dierenartsenpraktijk voor spoedeisende gevallen. Vroege behandeling is cruciaal voor een goede prognose.
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Gerelateerde Artikelen
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nl/is-insectenspray-giftig-voor-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Insectenspray Giftig voor Katten?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/is-chocolade-giftig-voor-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Chocolade Giftig voor Katten?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/giftig-voedsel-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftig Voedsel voor Katten
                </Link>
              </li>
            </ul>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="katten"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </div>
      </article>
    </>
  );
}
