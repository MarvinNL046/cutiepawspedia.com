import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Insectenspray Giftig voor Katten? Pyrethroïden Gevaar',
  description: 'Insectenspray met pyrethroïden is zeer giftig voor katten. Leer de symptomen van insecticidenvergiftiging bij katten en wat te doen bij blootstelling.',
  keywords: 'insectenspray giftig katten, pyrethroïden katten, permethrin katten, kat insectenspray vergiftiging, vlooienmiddel hond giftig kat',
  openGraph: {
    title: 'Is Insectenspray Giftig voor Katten? Pyrethroïden Gevaar',
    description: 'Pyrethroïden in insectensprays en vlooienmiddelen voor honden zijn dodelijk voor katten. Ontdek symptomen en spoedbehandeling.',
    type: 'article',
    publishedTime: '2025-12-15',
    modifiedTime: '2025-12-15',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsInsectensprayGiftigVoorKatten() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Insectenspray Giftig voor Katten?',
    description: 'Uitgebreide informatie over insectenspray vergiftiging bij katten, met focus op pyrethroïden toxiciteit',
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
        name: 'Waarom is insectenspray zo gevaarlijk voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Insectenspray is gevaarlijk voor katten omdat ze pyrethroïden bevatten, synthetische insecticiden die katten niet kunnen afbreken door een gebrek aan bepaalde leverenzymen. Zelfs kleine hoeveelheden kunnen ernstige neurologische symptomen veroorzaken zoals trillen, stuipen en hypersalivatie. Permethrin, een veelgebruikt pyrethroïde, is bijzonder dodelijk voor katten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is permethrin en waarom is het giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Permethrin is een synthetisch pyrethroïde insecticide dat veel voorkomt in vlooienmiddelen voor honden, insectensprays en tuinproducten. Katten kunnen permethrin niet metaboliseren door een tekort aan glucuronyltransferase leverenzymen. Dit zorgt voor een ophoping van toxines die het zenuwstelsel aantasten, wat leidt tot ernstige vergiftiging, stuipen en mogelijk overlijden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een kat sterven van insectenspray?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, katten kunnen sterven aan insectenspray vergiftiging, vooral bij pyrethroïden zoals permethrin. Zonder behandeling kunnen ernstige symptomen (stuipen, ademhalingsproblemen, coma) binnen 24-72 uur leiden tot overlijden. Met snelle veterinaire behandeling (spoelbaden, infuus, anti-stuipmiddelen) is de overlevingskans 90-95%, maar vertraagde behandeling vermindert de prognose aanzienlijk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe lang duren symptomen van insectenspray vergiftiging bij katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen van pyrethroïdenvergiftiging bij katten beginnen meestal binnen 1-6 uur na blootstelling. Milde trillingen en hypersalivatie kunnen 24-48 uur aanhouden met behandeling. Ernstige symptomen (stuipen) kunnen 48-72 uur duren en vereisen intensieve zorg. Volledig herstel kan 1-2 weken duren, afhankelijk van de ernst van de blootstelling.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is vlooienmiddel voor honden giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, veel vlooienmiddelen voor honden bevatten permethrin (45-65% concentratie) en zijn ZEER GIFTIG voor katten. Gebruik NOOIT vlooienmiddelen voor honden op katten. Zelfs indirect contact (kat likt hond die behandeld is) kan vergiftiging veroorzaken. Gebruik alleen vlooienmiddelen die specifiek zijn geëtiketteerd voor katten en geef nooit producten voor honden aan katten.',
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
        <FoodGuideBreadcrumb
          locale="nl"
          items={[
            { name: "Voedselgids", href: "/nl/voedselgids" },
            { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
          ]}
          currentPage="Insectenspray voor Katten"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Insectenspray Giftig voor Katten?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-2">
            Risico: Zeer hoog - Katten extreem gevoelig
          </h2>
          <p className="text-red-800">
            <strong>Pyrethroïden (Permethrin, Cyfluthrin, etc.):</strong> Zeer giftig - Katten kunnen deze stoffen niet afbreken, neurologische schade
            <br />
            <strong>Vlooienmiddel voor Honden:</strong> Zeer gevaarlijk voor katten - Bevat hoge concentratie permethrin
            <br />
            <strong>Huishoudelijke Insectensprays:</strong> Hoog risico - Vaak pyrethroïden, gevaarlijk bij inademing of contact
            <br />
            <strong>Waarschuwing:</strong> Gebruik nooit producten voor honden op katten - dit kan zeer gevaarlijk zijn
            <br />
            Neem onmiddellijk contact op met je dierenarts bij elke blootstelling aan insectensprays.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Zijn Insectensprays Zo Gevaarlijk voor Katten?
          </h2>
          <p className="text-gray-700 mb-4">
            Katten zijn bijzonder gevoelig voor <strong>pyrethroïden</strong>, een klasse van synthetische insecticiden die veel voorkomen in huishoudelijke insectensprays, vlooienmiddelen voor honden, en tuinproducten. Het probleem is dat katten een cruciale leverenzym missen genaamd <strong>glucuronyltransferase</strong>, dat nodig is om pyrethroïden af te breken.
          </p>
          <p className="text-gray-700 mb-4">
            Wanneer een kat wordt blootgesteld aan pyrethroïden (door huid contact, inademing, of likken), stapelen deze chemicaliën zich op in het lichaam omdat ze niet gemetaboliseerd kunnen worden. Dit leidt tot <strong>toxische niveaus</strong> die het zenuwstelsel aantasten, wat resulteert in trillen, stuipen, en in ernstige gevallen, overlijden.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Veelvoorkomende Pyrethroïden Giftig voor Katten:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Permethrin:</strong> Meest voorkomend en meest giftig voor katten - In vlooienmiddelen voor honden (45-65%), insectensprays, kledingsprays
            </li>
            <li>
              <strong>Cyfluthrin:</strong> In huishoudelijke insecticiden en vliegensprays
            </li>
            <li>
              <strong>Deltamethrin:</strong> In tuininsecticiden en landbouwproducten
            </li>
            <li>
              <strong>Cypermethrin:</strong> In spray's tegen mieren en kakkerlakken
            </li>
            <li>
              <strong>Fenvalerate:</strong> In vlooi- en tekenbestrijding
            </li>
            <li>
              <strong>Etofenprox:</strong> In sommige kattenproducten in lage concentraties (veilig), maar hoge concentraties giftig
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Gevaarlijke Bronnen van Pyrethroïden:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Vlooienmiddelen voor HONDEN (spot-on, sprays, shampoos)</li>
            <li>Huishoudelijke insectensprays (muggen, vliegen, wespen)</li>
            <li>Tuininsecticiden en sprays voor planten</li>
            <li>Anti-muggen kleding sprays voor mensen</li>
            <li>Elektrische muggenverdrijvers met navullingen</li>
            <li>Vloeren en oppervlakken behandeld met insecticiden</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Insectenspray Vergiftiging bij Katten
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen van pyrethroïdenvergiftiging verschijnen meestal binnen 1-6 uur na blootstelling en kunnen variëren van mild tot levensbedreigend:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Milde tot Matige Symptomen:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Overmatig kwijlen en schuimen uit de bek</li>
            <li>Trillen of beven (vooral oren en poten)</li>
            <li>Hyperactiviteit of onrust</li>
            <li>Vergrote pupillen</li>
            <li>Overgevoeligheid voor aanrakingen of geluiden</li>
            <li>Braken en misselijkheid</li>
            <li>Verhoogde lichaamstemperatuur</li>
            <li>Verhoogde hartslag</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Ernstige Symptomen:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Ongecontroleerde spiertrillingen over het hele lichaam</li>
            <li>Stuipen of convulsies</li>
            <li>Moeilijke of snelle ademhaling</li>
            <li>Coördinatieproblemen en wazig lopen</li>
            <li>Extreme lethargie of bewusteloosheid</li>
            <li>Coma</li>
            <li>Ademhalingsstilstand</li>
            <li>Overlijden (zonder behandeling binnen 24-72 uur mogelijk)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Specifieke Symptomen bij Huidcontact:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Rode, geïrriteerde huid op contact plek</li>
            <li>Overmatig likken of krabben aan de aangetaste plek</li>
            <li>Haaruitval of huidschilfers</li>
            <li>Brandwonden of blaarvorming (bij hoge concentraties)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Kat Wordt Blootgesteld Aan Insectenspray
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p className="text-red-900 font-bold mb-3">
              Spoed - Onmiddellijke actie vereist
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-red-900">
              <li>
                <strong>Verwijder de kat uit de blootstellingsbron</strong> - Breng de kat naar frisse lucht, weg van de spray
              </li>
              <li>
                <strong>Bel onmiddellijk je dierenarts</strong> - Beschrijf het product en de hoeveelheid blootstelling
              </li>
              <li>
                <strong>Was de kat bij huidcontact</strong> - Gebruik lauw water en milde afwasmiddel (Dawn of vergelijkbaar) om pyrethroïden van de huid te spoelen. Dit is zeer belangrijk
              </li>
              <li>
                <strong>Draag handschoenen</strong> - Bescherm jezelf tegen blootstelling aan de chemicaliën
              </li>
              <li>
                <strong>Spoel grondig</strong> - Was minimaal 10-15 minuten met veel water
              </li>
              <li>
                <strong>Voorkom dat de kat likt</strong> - Droog de kat voorzichtig en voorkom zelfverzorging tot volledig schoon
              </li>
              <li>
                <strong>Ga direct naar de dierenarts</strong> - Zelfs na wassen kan interne behandeling nodig zijn
              </li>
              <li>
                <strong>Breng de productverpakking mee</strong> - Voor identificatie van de exacte ingrediënten
              </li>
            </ol>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
            <p className="text-orange-900 font-semibold mb-3">
              ⚠️ Wat je niet moet doen:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-orange-900">
              <li>
                <strong>Laat de kat niet braken</strong> - Bij inademing of huidcontact is braken niet effectief en kan gevaarlijk zijn
              </li>
              <li>
                <strong>Gebruik geen oliehoudende producten</strong> - Olie vergroot de absorptie van pyrethroïden
              </li>
              <li>
                <strong>Wacht niet op symptomen</strong> - Begin direct met wassen en ga naar de dierenarts
              </li>
              <li>
                <strong>Gebruik geen essentiële oliën</strong> - Deze kunnen ook giftig zijn voor katten
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Behandeling van Pyrethroïdenvergiftiging
          </h2>
          <p className="text-gray-700 mb-4">
            De dierenarts zal de volgende behandelingen uitvoeren:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Decontaminatie:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Herhaalde spoelbaden met lauw water en afwasmiddel</li>
            <li>Verwijdering van alle productresidu van huid en vacht</li>
            <li>Mogelijk scheren van vacht bij ernstige besmetting</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Ondersteunende Zorg:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Infuus:</strong> Voor hydratie en ondersteuning van leverdetoxificatie
            </li>
            <li>
              <strong>Anti-stuipmiddelen:</strong> Diazepam of fenobarbital voor controle van stuipen
            </li>
            <li>
              <strong>Spierverstappers:</strong> Methocarbamol voor spiertrillingen
            </li>
            <li>
              <strong>Lichaamstemperatuur controle:</strong> Koeling bij hyperthermie
            </li>
            <li>
              <strong>Zuurstoftherapie:</strong> Bij ademhalingsproblemen
            </li>
            <li>
              <strong>Intralipid therapie:</strong> Vet-emulsie om lipofilische toxines te binden (in ernstige gevallen)
            </li>
            <li>
              <strong>24-48 uur monitoring:</strong> In het ziekenhuis voor ernstige gevallen
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Prognose:
          </h3>
          <p className="text-gray-700 mb-4">
            Met snelle en adequate behandeling overleven 90-95% van de katten pyrethroïdenvergiftiging. Factoren die de prognose beïnvloeden:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Snelheid van decontaminatie (snel wassen verbetert de prognose aanzienlijk)</li>
            <li>Concentratie en hoeveelheid blootstelling</li>
            <li>Ernst van symptomen bij presentatie</li>
            <li>Snelheid waarmee veterinaire zorg wordt gezocht</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen Met De Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>onmiddellijk</strong> contact op met je dierenarts bij:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>ELKE blootstelling aan vlooienmiddel voor honden</li>
            <li>Direct contact met insectenspray (huid of inademing)</li>
            <li>Zichtbare symptomen (kwijlen, trillen, stuipen)</li>
            <li>Kat likte aan behandelde oppervlakken</li>
            <li>Vermoeden van inname van pyrethroïden-producten</li>
            <li>Kat likte aan een hond die behandeld is met vlooienmiddel</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventietips: Houd Je Kat Veilig Van Insecticiden
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Gebruik nooit honden vlooienmiddel op katten</strong> - Dit is de meest voorkomende bron van vergiftiging
            </li>
            <li>
              <strong>Lees altijd etiketten</strong> - Controleer of producten veilig zijn voor katten
            </li>
            <li>
              <strong>Scheiden na behandeling</strong> - Houd katten 24-48 uur gescheiden van net behandelde honden
            </li>
            <li>
              <strong>Gebruik katspecifieke producten</strong> - Alleen producten geëtiketteerd voor katten gebruiken
            </li>
            <li>
              <strong>Ventileer goed bij spray gebruik</strong> - Houd katten uit kamers tijdens en na gebruik van insectensprays (minimaal 2-4 uur)
            </li>
            <li>
              <strong>Berg insecticiden veilig op</strong> - In afgesloten kasten waar katten niet bij kunnen
            </li>
            <li>
              <strong>Was handen na gebruik</strong> - Voordat je je kat aanraakt na gebruik van insecticiden
            </li>
            <li>
              <strong>Overweeg natuurlijke alternatieven</strong> - Zoals diatomeeënaarde voor vlooiencontrole (katspecifiek)
            </li>
            <li>
              <strong>Informeer gasten</strong> - Waarschuw bezoekers om geen producten op katten te gebruiken
            </li>
            <li>
              <strong>Controleer tuinproducten</strong> - Laat katten niet in pas behandelde tuinen
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Waarom is insectenspray zo gevaarlijk voor katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Insectenspray is gevaarlijk voor katten omdat ze pyrethroïden bevatten, synthetische insecticiden die katten niet kunnen afbreken door een gebrek aan bepaalde leverenzymen. Zelfs kleine hoeveelheden kunnen ernstige neurologische symptomen veroorzaken zoals trillen, stuipen en hypersalivatie. Permethrin, een veelgebruikt pyrethroïde, is bijzonder dodelijk voor katten.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Wat is permethrin en waarom is het giftig voor katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Permethrin is een synthetisch pyrethroïde insecticide dat veel voorkomt in vlooienmiddelen voor honden, insectensprays en tuinproducten. Katten kunnen permethrin niet metaboliseren door een tekort aan glucuronyltransferase leverenzymen. Dit zorgt voor een ophoping van toxines die het zenuwstelsel aantasten, wat leidt tot ernstige vergiftiging, stuipen en mogelijk overlijden.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Kan een kat sterven van insectenspray?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, katten kunnen sterven aan insectenspray vergiftiging, vooral bij pyrethroïden zoals permethrin. Zonder behandeling kunnen ernstige symptomen (stuipen, ademhalingsproblemen, coma) binnen 24-72 uur leiden tot overlijden. Met snelle veterinaire behandeling (spoelbaden, infuus, anti-stuipmiddelen) is de overlevingskans 90-95%, maar vertraagde behandeling vermindert de prognose aanzienlijk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoe lang duren symptomen van insectenspray vergiftiging bij katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Symptomen van pyrethroïdenvergiftiging bij katten beginnen meestal binnen 1-6 uur na blootstelling. Milde trillingen en hypersalivatie kunnen 24-48 uur aanhouden met behandeling. Ernstige symptomen (stuipen) kunnen 48-72 uur duren en vereisen intensieve zorg. Volledig herstel kan 1-2 weken duren, afhankelijk van de ernst van de blootstelling.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Is vlooienmiddel voor honden giftig voor katten?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, veel vlooienmiddelen voor honden bevatten hoge concentraties permethrin en zijn zeer giftig voor katten. Gebruik nooit vlooienmiddelen voor honden op katten. Zelfs indirect contact (kat likt hond die behandeld is) kan vergiftiging veroorzaken. Gebruik alleen vlooienmiddelen die specifiek zijn geëtiketteerd voor katten en geef nooit producten voor honden aan katten.
          </p>

          {/* Related Safe Foods */}
          <RelatedSafeFoods
            locale="nl"
            animal="katten"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />

          {/* Medical Disclaimer */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Medische Disclaimer
            </h3>
            <p className="text-gray-700 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Pyrethroïdenvergiftiging is een ernstige en potentieel levensbedreigende aandoening die onmiddellijke veterinaire zorg vereist. Als je vermoedt dat je kat is blootgesteld aan insectenspray, pyrethroïden, of vlooienmiddel voor honden, neem dan ONMIDDELLIJK contact op met je dierenarts of de dichtstbijzijnde dierenartsenpraktijk voor spoedeisende gevallen. Begin met wassen terwijl je onderweg bent naar de dierenarts.
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
                  href="/nl/is-ui-giftig-voor-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Ui Giftig voor Katten?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/is-essentiële-oliën-giftig-voor-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Essentiële Oliën Giftig voor Katten?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/giftige-huishoudelijke-producten-katten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftige Huishoudelijke Producten voor Katten
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
