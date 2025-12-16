import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Lijm Giftig voor Honden? Gorilla Lijm en Andere Gevaren',
  description: 'Ontdek of lijm giftig is voor honden. Gorilla lijm expandeert gevaarlijk in de maag. Leer de symptomen van lijmvergiftiging en wat te doen als je hond lijm heeft ingeslikt.',
  keywords: 'lijm giftig honden, gorilla lijm hond, hond lijm ingeslikt, expanderende lijm honden, superlijm hond, lijmvergiftiging hond',
  openGraph: {
    title: 'Is Lijm Giftig voor Honden? Gorilla Lijm Gevaar',
    description: 'Gorilla lijm en andere expanderende lijmen zijn zeer gevaarlijk voor honden. Ontdek symptomen en eerste hulp bij lijmvergiftiging.',
    type: 'article',
    publishedTime: '2025-12-15',
    modifiedTime: '2025-12-15',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsLijmGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Lijm Giftig voor Honden?',
    description: 'Uitgebreide informatie over lijmvergiftiging bij honden, vooral Gorilla lijm en expanderende lijmen',
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
        name: 'Wat gebeurt er als een hond Gorilla lijm inslikt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Als een hond Gorilla lijm (polyurethaan lijm) inslikt, expandeert de lijm dramatisch in de maag door contact met vocht. Dit kan leiden tot een levensbedreigende maagblokkade. Symptomen zijn braken, buikpijn, geblokkeerde darmen en lethargie. Spoed naar de dierenarts is essentieel - vaak is chirurgie nodig om de geëxpandeerde lijmmassa te verwijderen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke lijm is het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gorilla lijm en andere polyurethaan-gebaseerde expanderende lijmen zijn het gevaarlijkst voor honden. Ze expanderen tot 3-4 keer hun oorspronkelijke grootte in de maag. Superlijm (cyanacrylaat) is minder gevaarlijk maar kan weefsel bij elkaar plakken. Houtlijm en schoollijm (PVA) zijn relatief veilig maar kunnen nog steeds maagproblemen veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel expandeert Gorilla lijm in de maag van een hond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gorilla lijm begint binnen 15-30 minuten te expanderen in de maag van een hond en bereikt maximale expansie binnen 2-3 uur. De lijm kan tot 3-4 keer zijn oorspronkelijke volume worden. Dit is waarom onmiddellijke veterinaire hulp cruciaal is - hoe sneller de behandeling, hoe beter de prognose.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond superlijm overleven?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, de meeste honden overleven superlijm (cyanacrylaat) vergiftiging goed met juiste behandeling. Superlijm expandeert niet zoals Gorilla lijm, maar kan weefsel bij elkaar plakken (bek, tanden, keel). De dierenarts kan de lijm meestal verwijderen en behandelen. Neem altijd contact op met je dierenarts als je hond superlijm heeft ingeslikt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond lijm heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem onmiddellijk contact op met je dierenarts. Identificeer het type lijm (lees het etiket). Bij Gorilla lijm of expanderende lijm: ga direct naar de dierenarts. Laat je hond niet zelf braken. Geef geen voedsel of water zonder toestemming dierenarts.',
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
          currentPage="Lijm voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Lijm Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-orange-900 mb-2">
            ⚠️ Risico: Middel tot Hoog (afhankelijk van lijmtype)
          </h2>
          <p className="text-orange-800">
            <strong>Gorilla Lijm (Polyurethaan):</strong> ZEER HOOG RISICO - Expandeert tot 3-4x grootte, levensbedreigende maagblokkade
            <br />
            <strong>Superlijm (Cyanacrylaat):</strong> Middel risico - Kan weefsel bij elkaar plakken, verstikking mogelijk
            <br />
            <strong>Houtlijm/Schoollijm (PVA):</strong> Laag tot middel risico - Maagproblemen, meestal niet levensbedreigende
            <br />
            <strong>SPOED:</strong> Bij Gorilla lijm ONMIDDELLIJK naar de dierenarts - tijd is cruciaal!
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Is Lijm Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 mb-4">
            Lijm is een van de gevaarlijkste huishoudelijke producten voor honden, vooral <strong>Gorilla Lijm</strong> en andere expanderende polyurethaan lijmen. Deze lijmen hebben een zoete smaak die honden aantrekt en expanderen dramatisch wanneer ze in contact komen met vocht in de maag.
          </p>
          <p className="text-gray-700 mb-4">
            Een kleine hoeveelheid Gorilla lijm (zelfs een eetlepel) kan expanderen tot een harde massa ter grootte van een voetbal in de maag van een hond. Dit veroorzaakt een <strong>levensbedreigende maagobstructie</strong> die alleen met spoedeisende chirurgie kan worden verholpen.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Verschillende Soorten Lijm en Hun Risico's:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Gorilla Lijm / Expanderende Lijm (Polyurethaan):</strong> ZEER GEVAARLIJK - Expandeert tot 3-4x oorspronkelijke grootte, harde massa, spoedchirurgie vaak nodig
            </li>
            <li>
              <strong>Superlijm (Cyanacrylaat):</strong> MATIG GEVAARLIJK - Plakt weefsel bij elkaar (lippen, tong, keel), kan verstikking veroorzaken, expandeert niet
            </li>
            <li>
              <strong>Houtlijm (PVA - Polyvinylacetaat):</strong> LAAG RISICO - Kan maagproblemen veroorzaken maar expandeert niet, meestal niet levensbedreigende
            </li>
            <li>
              <strong>Schoollijm (PVA):</strong> LAAG RISICO - Vergelijkbaar met houtlijm, relatief veilig in kleine hoeveelheden
            </li>
            <li>
              <strong>Epoxy Lijm (2-componenten):</strong> MATIG RISICO - Giftige dampen, kan weefsel irriteren
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Lijmvergiftiging bij Honden
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Gorilla Lijm / Expanderende Lijm Symptomen:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Braken of pogingen tot braken (vaak onproductief)</li>
            <li>Extreme buikpijn en opgezwollen buik</li>
            <li>Lethargie en zwakte</li>
            <li>Weigering om te eten of drinken</li>
            <li>Geblokkeerde darmen (kan niet poepen)</li>
            <li>Verhoogde hartslag en ademhaling</li>
            <li>Janken of klagen van pijn</li>
            <li>Gespannen buik (voelt hard aan)</li>
            <li>Droge tandvlees of bleke tong (shock)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Superlijm Symptomen:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Lippen of bek dichtgeplakt</li>
            <li>Tong geplakt aan gehemelte</li>
            <li>Moeilijkheden met slikken</li>
            <li>Overmatig kwijlen</li>
            <li>Kokhalzen of hoesten</li>
            <li>Ademhalingsproblemen (als keel gedeeltelijk geblokkeerd)</li>
            <li>Poten bij elkaar geplakt (als hond aan lijm heeft gelikt)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Houtlijm/Schoollijm Symptomen:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Lichte maagklachten</li>
            <li>Braken (meestal eenmalig)</li>
            <li>Diarree</li>
            <li>Verminderde eetlust</li>
            <li>Lichte buikpijn</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Hond Lijm Heeft Ingeslikt
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p className="text-red-900 font-bold mb-3">
              Bij Gorilla lijm: Spoed - Onmiddellijke actie vereist
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-red-900">
              <li>
                <strong>Bel onmiddellijk je dierenarts</strong> - Snelle actie is cruciaal bij expanderende lijm
              </li>
              <li>
                <strong>Identificeer het lijmtype</strong> - Lees het etiket en neem de verpakking mee naar de dierenarts
              </li>
              <li>
                <strong>Schat de hoeveelheid</strong> - Probeer te bepalen hoeveel lijm je hond heeft ingenomen
              </li>
              <li>
                <strong>Ga direct naar de dierenarts</strong> - Bij Gorilla lijm is snelle behandeling essentieel voor de beste prognose
              </li>
              <li>
                <strong>Laat je hond niet zelf braken</strong> - Alleen de dierenarts kan beslissen of dit veilig is
              </li>
              <li>
                <strong>Geef geen voedsel of water</strong> - Dit kan de expansie versnellen
              </li>
              <li>
                <strong>Breng de lijmverpakking mee</strong> - Voor identificatie van ingrediënten
              </li>
            </ol>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
            <p className="text-emerald-900 font-semibold mb-3">
              Bij Houtlijm/Schoollijm (PVA):
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-emerald-900">
              <li>
                <strong>Blijf kalm</strong> - Deze lijmen zijn minder gevaarlijk
              </li>
              <li>
                <strong>Bel je dierenarts</strong> - Voor advies, maar dit is meestal geen absolute spoed
              </li>
              <li>
                <strong>Monitor je hond</strong> - Let op braken, diarree, of andere symptomen
              </li>
              <li>
                <strong>Geef water</strong> - Om de lijm te verdunnen (alleen als de dierenarts dit adviseert)
              </li>
              <li>
                <strong>Observeer 24-48 uur</strong> - Houd de hond in de gaten op veranderingen
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Behandeling van Lijmvergiftiging
          </h2>
          <p className="text-gray-700 mb-4">
            De behandeling hangt af van het type lijm en hoe snel je bij de dierenarts komt:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Gorilla Lijm Behandeling:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Vroege behandeling:</strong> Dierenarts kan braken opwekken of maagpomp uitvoeren om lijm te verwijderen voordat het expandeert
            </li>
            <li>
              <strong>Bij vertraagde behandeling:</strong> Lijm kan al geëxpandeerd zijn - röntgenfoto's nodig om maagobstructie te bevestigen
            </li>
            <li>
              <strong>Chirurgie:</strong> Vaak de enige optie om de geëxpandeerde lijmmassa te verwijderen (gastrotomie)
            </li>
            <li>
              <strong>Ondersteunende zorg:</strong> Infuus, pijnstilling, antibiotica, monitoring
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Superlijm Behandeling:
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Warme compresses en olijfolie om de lijm los te weken</li>
            <li>Voorzichtig verwijderen van geplakte weefsels</li>
            <li>Sedatie indien nodig voor veilige verwijdering</li>
            <li>Antibiotica als er weefselschade is</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen Met De Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>onmiddellijk</strong> contact op met je dierenarts bij:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>ELKE inname van Gorilla lijm of expanderende lijm (dit is ALTIJD een noodgeval!)</li>
            <li>Symptomen van maagobstructie (braken, opgezwollen buik, geen ontlasting)</li>
            <li>Ademhalingsproblemen of verstikking</li>
            <li>Geplakte bek, tong of keel</li>
            <li>Aanhoudend braken</li>
            <li>Extreme pijn of lethargie</li>
            <li>Tekenen van shock (bleke tandvlees, zwakte, koude poten)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventietips: Houd Lijm Veilig Weg Van Je Hond
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Berg lijm hoog op</strong> - Bewaar alle lijm in afgesloten kasten buiten bereik van honden
            </li>
            <li>
              <strong>Sluit deksels goed af</strong> - Zelfs kleine hoeveelheden Gorilla lijm zijn gevaarlijk
            </li>
            <li>
              <strong>Ruim direct op</strong> - Veeg gemorste lijm onmiddellijk op tijdens klussen
            </li>
            <li>
              <strong>Gooi lege tubes weg</strong> - In een afvalemmer met deksel waar de hond niet bij kan
            </li>
            <li>
              <strong>Sluit de hond uit tijdens klussen</strong> - Houd honden uit ruimtes waar je met lijm werkt
            </li>
            <li>
              <strong>Gebruik PVA lijm waar mogelijk</strong> - Kies minder gevaarlijke alternatieven als huisdieren in huis zijn
            </li>
            <li>
              <strong>Educeer familie en bezoekers</strong> - Zorg dat iedereen weet hoe gevaarlijk Gorilla lijm is voor honden
            </li>
            <li>
              <strong>Controleer projecten</strong> - Zorg dat gedroogde lijm niet toegankelijk is voor honden
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Wat gebeurt er als een hond Gorilla lijm inslikt?
          </h3>
          <p className="text-gray-700 mb-4">
            Als een hond Gorilla lijm (polyurethaan lijm) inslikt, expandeert de lijm dramatisch in de maag door contact met vocht. Dit kan leiden tot een levensbedreigende maagblokkade. Symptomen zijn braken, buikpijn, geblokkeerde darmen en lethargie. Spoed naar de dierenarts is essentieel - vaak is chirurgie nodig om de geëxpandeerde lijmmassa te verwijderen.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Welke lijm is het gevaarlijkst voor honden?
          </h3>
          <p className="text-gray-700 mb-4">
            Gorilla lijm en andere polyurethaan-gebaseerde expanderende lijmen zijn het gevaarlijkst voor honden. Ze expanderen tot 3-4 keer hun oorspronkelijke grootte in de maag. Superlijm (cyanacrylaat) is minder gevaarlijk maar kan weefsel bij elkaar plakken. Houtlijm en schoollijm (PVA) zijn relatief veilig maar kunnen nog steeds maagproblemen veroorzaken.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoe snel expandeert Gorilla lijm in de maag van een hond?
          </h3>
          <p className="text-gray-700 mb-4">
            Gorilla lijm begint binnen 15-30 minuten te expanderen in de maag van een hond en bereikt maximale expansie binnen 2-3 uur. De lijm kan tot 3-4 keer zijn oorspronkelijke volume worden. Dit is waarom onmiddellijke veterinaire hulp cruciaal is - hoe sneller de behandeling, hoe beter de prognose.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Kan een hond superlijm overleven?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, de meeste honden overleven superlijm (cyanacrylaat) vergiftiging goed met juiste behandeling. Superlijm expandeert niet zoals Gorilla lijm, maar kan weefsel bij elkaar plakken (bek, tanden, keel). De dierenarts kan de lijm meestal verwijderen en behandelen. Neem altijd contact op met je dierenarts als je hond superlijm heeft ingeslikt.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Wat moet ik doen als mijn hond lijm heeft gegeten?
          </h3>
          <p className="text-gray-700 mb-4">
            Neem onmiddellijk contact op met je dierenarts. Identificeer het type lijm (lees het etiket). Bij Gorilla lijm of expanderende lijm: ga direct naar de dierenarts. Laat je hond niet zelf braken. Geef geen voedsel of water zonder toestemming dierenarts.
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Medische Disclaimer
            </h3>
            <p className="text-gray-700 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Gorilla lijm vergiftiging is een levensbedreigende noodsituatie. Als je vermoedt dat je hond Gorilla lijm of andere expanderende lijm heeft ingeslikt, ga dan ONMIDDELLIJK naar de dierenarts of de dichtstbijzijnde dierenartsenpraktijk voor spoedeisende gevallen. Elke minuut telt.
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
                  href="/nl/is-batterijen-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Batterijen Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/is-verf-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Verf Giftig voor Honden?
                </Link>
              </li>
              <li>
                <Link
                  href="/nl/giftige-huishoudelijke-producten"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftige Huishoudelijke Producten voor Honden
                </Link>
              </li>
            </ul>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </div>
      </article>
    </>
  );
}
