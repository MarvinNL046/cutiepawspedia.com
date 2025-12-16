import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Verf Giftig voor Honden? Symptomen, Gevaren en Wat Te Doen',
  description: 'Ontdek of verf giftig is voor honden, wat de symptomen zijn van verfvergiftiging, en wat je moet doen als je hond verf heeft ingeslikt of eraan heeft gelikt.',
  keywords: 'verf giftig honden, hond verf ingeslikt, loodhoudende verf honden, verfvergiftiging hond, huisschilderen veiligheid honden',
  openGraph: {
    title: 'Is Verf Giftig voor Honden? Symptomen & Eerste Hulp',
    description: 'Verf kan gevaarlijk zijn voor honden, vooral loodhoudende verf. Leer de symptomen herkennen en wat te doen bij verfvergiftiging.',
    type: 'article',
    publishedTime: '2025-12-15',
    modifiedTime: '2025-12-15',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsVerfGiftigVoorHonden() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Verf Giftig voor Honden?',
    description: 'Uitgebreide informatie over verfvergiftiging bij honden, symptomen, gevaren en behandeling',
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
        name: 'Kan een hond ziek worden van verf?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, honden kunnen ziek worden van verf. Moderne watergedragen latex verf veroorzaakt meestal milde maag-darmproblemen, maar loodhoudende verf (in oude huizen) kan ernstige vergiftiging veroorzaken. Oplosmiddelhoudende verf bevat gevaarlijke chemicaliën die het zenuwstelsel kunnen aantasten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke verf is het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Loodhoudende verf is het gevaarlijkst voor honden en werd gebruikt in huizen tot rond 1980. Oplosmiddelhoudende verven (alkydhars, lakken) zijn ook gevaarlijk vanwege toxische dampen en chemicaliën. Moderne watergedragen latex verf is minder giftig, maar kan nog steeds maagproblemen veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond verf heeft gelikt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem direct contact op met je dierenarts. Probeer te achterhalen welk type verf het was (latex, alkyd, loodhoudend) en hoeveel je hond heeft ingenomen. Laat je hond niet braken zonder advies van de dierenarts. Was de vacht met lauw water en milde zeep als er verf op zit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe lang duurt het voordat symptomen van verfvergiftiging verschijnen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen van verfvergiftiging kunnen binnen 30 minuten tot 2 uur verschijnen bij oplosmiddelhoudende verf (braken, sufheid). Bij loodhoudende verf kunnen symptomen dagen tot weken duren om te ontwikkelen bij chronische blootstelling. Bij twijfel, neem altijd contact op met je dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is het veilig om te schilderen met een hond in huis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Met moderne watergedragen latex verf is schilderen redelijk veilig als je goed ventileert en de hond uit de kamer houdt. Gebruik geen oplosmiddelhoudende verf met honden in huis. Laat de hond minimaal 24-48 uur uit de geschilderde ruimte tot de verf droog is en de geur weg is.',
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
          currentPage="Verf voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Verf Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-orange-900 mb-2">
            ⚠️ Risico: Middel tot Hoog (afhankelijk van verftype)
          </h2>
          <p className="text-orange-800">
            <strong>Moderne watergedragen latex verf:</strong> Middel risico - kan maagproblemen veroorzaken
            <br />
            <strong>Loodhoudende verf (pre-1980):</strong> HOOG risico - ernstige vergiftiging mogelijk
            <br />
            <strong>Oplosmiddelhoudende verf:</strong> HOOG risico - toxische dampen en chemicaliën
            <br />
            Neem altijd contact op met je dierenarts als je hond verf heeft ingeslikt of gelikt.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Is Verf Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 mb-4">
            Of verf giftig is voor honden hangt sterk af van het type verf. <strong>Moderne watergedragen latex verf</strong> bevat minder toxische stoffen dan oude verven, maar kan nog steeds maag-darmproblemen veroorzaken door de pigmenten, bindmiddelen en biociden die erin zitten.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Loodhoudende verf</strong>, die werd gebruikt in huizen tot ongeveer 1980, is extreem gevaarlijk voor honden. Lood is een neurotoxine dat zich ophoopt in het lichaam en ernstige neurologische schade kan veroorzaken, vooral als een hond herhaaldelijk aan verfschilfers likt of kauwt.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Oplosmiddelhoudende verven</strong> (alkydhars, lakken, enamels) bevatten gevaarlijke chemicaliën zoals terpentine, tolueen en xyleen. Deze stoffen zijn giftig bij inslikken en de dampen kunnen ademhalingsproblemen en zenuwstelsel aandoeningen veroorzaken.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Verfvergiftiging bij Honden
          </h2>
          <p className="text-gray-700 mb-4">
            De symptomen variëren afhankelijk van het type verf en de hoeveelheid die is ingenomen:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Milde Symptomen (Watergedragen Latex Verf):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Kwijlen en misselijkheid</li>
            <li>Braken (mogelijk met verfkleur)</li>
            <li>Diarree</li>
            <li>Verminderde eetlust</li>
            <li>Lichte buikpijn</li>
            <li>Onrust of sufheid</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Matige tot Ernstige Symptomen (Oplosmiddelhoudende Verf):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Moeilijke ademhaling of hijgen</li>
            <li>Wazig lopen of coördinatieproblemen</li>
            <li>Trillen of spiertrekkingen</li>
            <li>Verhoogde hartslag</li>
            <li>Verwardheid of desoriëntatie</li>
            <li>Chemische geur uit de bek</li>
            <li>Brandwonden rond bek of poten (van oplosmiddelen)</li>
            <li>Extreme sufheid of bewusteloosheid</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Loodvergiftiging Symptomen (Chronische Blootstelling):
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Aanhoudend braken en diarree</li>
            <li>Ernstige buikpijn</li>
            <li>Gewichtsverlies en anorexie</li>
            <li>Neurologische symptomen (stuipen, blindheid)</li>
            <li>Anemie (bloedarmoede)</li>
            <li>Veranderingen in gedrag en persoonlijkheid</li>
            <li>Zwakte en vermoeidheid</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Hond Verf Heeft Ingeslikt
          </h2>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
            <p className="text-emerald-900 font-semibold mb-3">
              Volg deze stappen onmiddellijk:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-emerald-900">
              <li>
                <strong>Blijf kalm</strong> - Panikeren helpt noch jou noch je hond
              </li>
              <li>
                <strong>Verwijder toegang tot de verf</strong> - Zet alle verfpotten en materialen buiten bereik
              </li>
              <li>
                <strong>Verzamel informatie</strong> - Probeer te achterhalen welk type verf het is (lees het etiket), hoeveel er mogelijk is ingenomen, en hoe lang geleden
              </li>
              <li>
                <strong>Bel direct je dierenarts</strong> - Beschrijf de situatie en volg hun advies op
              </li>
              <li>
                <strong>LAAT JE HOND NIET BRAKEN</strong> zonder advies van de dierenarts - Sommige verfsoorten kunnen meer schade veroorzaken bij braken
              </li>
              <li>
                <strong>Was de vacht</strong> - Als er verf op de huid of vacht zit, was dit voorzichtig met lauw water en milde zeep (geen scherpe oplosmiddelen gebruiken!)
              </li>
              <li>
                <strong>Breng het verfetiket mee</strong> - Als je naar de dierenarts gaat, neem dan het verfetiket of de verfpot mee voor identificatie
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen Met De Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>onmiddellijk</strong> contact op met je dierenarts of de dierenartsenpraktijk voor spoedeisende gevallen bij:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Vermoedens van loodhoudende verf (huis gebouwd voor 1980)</li>
            <li>Inname van oplosmiddelhoudende verf of lak</li>
            <li>Grote hoeveelheid verf ingenomen (meerdere lepels)</li>
            <li>Moeilijke ademhaling of hijgen</li>
            <li>Neurologische symptomen (trillen, stuipen, wazig lopen)</li>
            <li>Aanhoudend braken of diarree</li>
            <li>Extreme sufheid of bewusteloosheid</li>
            <li>Chemische brandwonden zichtbaar</li>
            <li>Verf op de huid die niet gemakkelijk afwast</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventietips: Houd Je Hond Veilig Tijdens Schilderwerk
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Gebruik huisdiervriendelijke verf</strong> - Kies voor verf met lage of nul VOC (vluchtige organische stoffen) en zonder biociden
            </li>
            <li>
              <strong>Sluit de hond uit de kamer</strong> - Houd honden uit ruimtes die geschilderd worden tot de verf volledig droog is (minimaal 24-48 uur)
            </li>
            <li>
              <strong>Ventileer goed</strong> - Open ramen en gebruik ventilators om dampen te verwijderen
            </li>
            <li>
              <strong>Berg materialen veilig op</strong> - Bewaar verfpotten, kwasten en rollers buiten het bereik van huisdieren
            </li>
            <li>
              <strong>Bescherm de vloer</strong> - Gebruik afdekvlakken en ruim direct gemorste verf op
            </li>
            <li>
              <strong>Test oude verf op lood</strong> - Als je huis vóór 1980 is gebouwd, laat dan testen of de verf lood bevat voordat je gaat schuren
            </li>
            <li>
              <strong>Kies watergedragen verf</strong> - Vermijd oplosmiddelhoudende verven als je huisdieren hebt
            </li>
            <li>
              <strong>Was handen en gereedschap</strong> - Was je handen voordat je je hond aait na schilderwerk
            </li>
            <li>
              <strong>Ruim verfschilfers op</strong> - Stofzuig en veeg verfschilfers van oude verf direct op
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Kan een hond ziek worden van verf?
          </h3>
          <p className="text-gray-700 mb-4">
            Ja, honden kunnen ziek worden van verf. Moderne watergedragen latex verf veroorzaakt meestal milde maag-darmproblemen, maar loodhoudende verf (in oude huizen) kan ernstige vergiftiging veroorzaken. Oplosmiddelhoudende verf bevat gevaarlijke chemicaliën die het zenuwstelsel kunnen aantasten.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Welke verf is het gevaarlijkst voor honden?
          </h3>
          <p className="text-gray-700 mb-4">
            Loodhoudende verf is het gevaarlijkst voor honden en werd gebruikt in huizen tot rond 1980. Oplosmiddelhoudende verven (alkydhars, lakken) zijn ook gevaarlijk vanwege toxische dampen en chemicaliën. Moderne watergedragen latex verf is minder giftig, maar kan nog steeds maagproblemen veroorzaken.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Wat moet ik doen als mijn hond verf heeft gelikt?
          </h3>
          <p className="text-gray-700 mb-4">
            Neem direct contact op met je dierenarts. Probeer te achterhalen welk type verf het was (latex, alkyd, loodhoudend) en hoeveel je hond heeft ingenomen. Laat je hond niet braken zonder advies van de dierenarts. Was de vacht met lauw water en milde zeep als er verf op zit.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hoe lang duurt het voordat symptomen van verfvergiftiging verschijnen?
          </h3>
          <p className="text-gray-700 mb-4">
            Symptomen van verfvergiftiging kunnen binnen 30 minuten tot 2 uur verschijnen bij oplosmiddelhoudende verf (braken, sufheid). Bij loodhoudende verf kunnen symptomen dagen tot weken duren om te ontwikkelen bij chronische blootstelling. Bij twijfel, neem altijd contact op met je dierenarts.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Is het veilig om te schilderen met een hond in huis?
          </h3>
          <p className="text-gray-700 mb-4">
            Met moderne watergedragen latex verf is schilderen redelijk veilig als je goed ventileert en de hond uit de kamer houdt. Gebruik geen oplosmiddelhoudende verf met honden in huis. Laat de hond minimaal 24-48 uur uit de geschilderde ruimte tot de verf droog is en de geur weg is.
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Medische Disclaimer
            </h3>
            <p className="text-gray-700 text-sm">
              Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Als je vermoedt dat je hond verf heeft ingeslikt of vergiftigd is, neem dan onmiddellijk contact op met je dierenarts of de dichtstbijzijnde dierenartsenpraktijk voor spoedeisende gevallen. Tijd is cruciaal bij vergiftiging.
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
                  href="/nl/is-chocolade-giftig-voor-honden"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Is Chocolade Giftig voor Honden?
                </Link>
              </li>
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
                  href="/nl/giftige-planten-huisdieren"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Giftige Planten voor Huisdieren
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
