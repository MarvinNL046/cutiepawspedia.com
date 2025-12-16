import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Hyacint Giftig voor Honden? Symptomen & Veiligheid | CutiePawsPedia',
  description: 'Ontdek of hyacinten giftig zijn voor honden. Leer over symptomen van hyacint-vergiftiging, eerste hulp en hoe je jouw hond veilig houdt bij voorjaarsplanten.',
  keywords: 'hyacint giftig honden, hyacinth hond, bolgewassen hond giftig, voorjaarsplanten hond, hyacint vergiftiging hond',
  openGraph: {
    title: 'Is Hyacint Giftig voor Honden? Wat Je Moet Weten',
    description: 'Complete gids over hyacinten en honden: giftigheid, symptomen, eerste hulp en preventiemaatregelen.',
    type: 'article',
    publishedTime: '2025-12-15T10:00:00Z',
    authors: ['CutiePawsPedia Team'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsHyacintGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Hyacint Giftig voor Honden?',
    description: 'Uitgebreide informatie over de giftigheid van hyacinten voor honden, symptomen van alkaloïdevergiftiging en veiligheidsmaatregelen.',
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
        name: 'Zijn hyacinten giftig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, hyacinten zijn matig giftig voor honden. Alle delen van de plant bevatten giftige alkaloïden en calciumoxalaatkristallen. De bol is het meest giftig en kan ernstige maag-darmklachten, huidirritatie en allergische reacties veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat maakt hyacinten gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hyacinten bevatten giftige alkaloïden (lycorine, scillitoxine) en calciumoxalaatkristallen die maag-darmirritatie, braken, diarree en huidirritatie kunnen veroorzaken. De bol bevat de hoogste concentratie en kan ernstige symptomen veroorzaken bij inname.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond hyacint heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem direct contact op met je dierenarts. Verwijder plantenresten uit de mond, spoel de mond voorzichtig en monitor symptomen. Probeer niet zelf je hond te laten braken. Bij inname van een bol: ga onmiddellijk naar de spoeddienst.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke delen van de hyacint zijn het meest giftig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De bol (bulb) is het meest giftig, met de hoogste concentratie alkaloïden en calciumoxalaatkristallen. Bladeren, stengels en bloemen bevatten ook giftige stoffen, maar in lagere concentraties. Huidcontact met de bol kan irritatie en allergische reacties veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond sterven van hyacint-vergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ernstige vergiftigingen zijn mogelijk, vooral bij inname van bollen. Hoewel dodelijke gevallen zeldzaam zijn, kan ernstige dehydratie door aanhoudend braken levensbedreigend zijn. Snelle veterinaire behandeling geeft een goede prognose.',
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
          currentPage="Hyacint voor Honden"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Is Hyacint Giftig voor Honden?
          </h1>
          <p className="text-xl text-gray-600">
            Alles wat je moet weten over hyacinten en de veiligheid van jouw hond
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Laatst bijgewerkt: 15 december 2025
          </div>
        </header>

        {/* TL;DR Verdict */}
        <div className="mb-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-orange-900 mb-2">Giftigheid: Matig</h2>
              <p className="text-orange-800">
                <strong>Ja, hyacinten zijn matig giftig voor honden.</strong> Alle delen van de plant bevatten giftige alkaloïden en calciumoxalaatkristallen, waarbij de bol het meest giftig is. Inname kan leiden tot maag-darmklachten, braken, diarree en huidirritatie. Neem bij vermoeden van inname contact op met je dierenarts.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom Zijn Hyacinten Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hyacinten (Hyacinthus orientalis) zijn geliefde voorjaarsbloemen met een prachtige geur, maar helaas matig giftig voor honden. De plant bevat een combinatie van <strong>giftige alkaloïden</strong> (waaronder lycorine en scillitoxine) en <strong>calciumoxalaatkristallen</strong> in alle delen, met de hoogste concentratie in de bol.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De <strong>alkaloïden</strong> zijn natuurlijke verdedigingsmechanismen van de plant en veroorzaken bij honden maag-darmirritatie, braakneigingen en in ernstige gevallen hartproblemen. De <strong>calciumoxalaatkristallen</strong> zijn microscopisch kleine naaldvormige kristallen die mechanische schade toebrengen aan het slijmvlies van mond, keel en maag.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De <strong>bol</strong> is het meest problematische deel omdat het de hoogste concentratie giftige stoffen bevat. Honden die in de tuin graven kunnen bollen opgraven en eraan kauwen. Daarnaast kan direct huidcontact met de bol irritatie en allergische reacties veroorzaken bij zowel honden als mensen – een fenomeen bekend als "hyacint dermatitis".
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Hyacint-Vergiftiging bij Honden
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen variëren afhankelijk van welk deel van de plant is ingenomen en de hoeveelheid. Ze treden meestal binnen enkele uren na inname op:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Milde tot Matige Symptomen (Bladeren/Bloemen)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Kwijlen en speekselvloed</strong> – reactie op bittere smaak en mondirritatie</li>
            <li><strong>Mond- en keelirritatie</strong> – hond wrijft met poot over mond</li>
            <li><strong>Rode, gezwollen mond en tong</strong></li>
            <li><strong>Misselijkheid</strong></li>
            <li><strong>Braken</strong> – vaak binnen 1-2 uur na inname</li>
            <li><strong>Diarree</strong> – kan waterig zijn</li>
            <li><strong>Buikpijn</strong> – hond toont ongemak, gekromde houding</li>
            <li><strong>Verlies van eetlust</strong></li>
            <li><strong>Lethargie</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ernstige Symptomen (Bollen of Grote Hoeveelheden)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Aanhoudend hevig braken</strong> leidend tot dehydratie</li>
            <li><strong>Bloederige diarree</strong></li>
            <li><strong>Extreme zwakte en collaps</strong></li>
            <li><strong>Tremors of spiertrillingen</strong></li>
            <li><strong>Verhoogde hartslag</strong> (tachycardie)</li>
            <li><strong>Ademhalingsproblemen</strong> (zeldzaam)</li>
            <li><strong>Depressie en verminderd bewustzijn</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Huidreacties (Contact met Bol)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Rode, geïrriteerde huid</strong> – vooral op poten, neus, mond</li>
            <li><strong>Jeuk en krabben</strong></li>
            <li><strong>Blaarvorming</strong> (bij langdurig contact)</li>
            <li><strong>Allergische dermatitis</strong> ("hyacint itch")</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Belangrijk: Huidirritatie</h3>
            <p className="text-blue-800">
              Hyacintbollen bevatten calciumoxalaatkristallen die huidirritatie kunnen veroorzaken, zelfs zonder inname. Als je hond in de tuin graaft waar hyacintbollen zijn geplant, kan contact met de bollen leiden tot jeuk, roodheid en irritatie aan poten en neus. Was de aangetaste gebieden met water en zeep en neem contact op met je dierenarts bij ernstige reacties.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Hond Hyacint Heeft Gegeten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Snelle actie is belangrijk bij hyacint-vergiftiging:
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Eerste Hulp Stappen</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-800">
              <li>
                <strong>Neem contact op met je dierenarts</strong> – Bel direct, zelfs bij milde symptomen, vooral als je vermoedt dat je hond een bol heeft gegeten.
              </li>
              <li>
                <strong>Verwijder plantenresten</strong> – Haal voorzichtig zichtbare plantenresten uit de mond van je hond. Gebruik geen harde voorwerpen.
              </li>
              <li>
                <strong>Spoel de mond</strong> – Spoel de mond van je hond voorzichtig met koel water om calciumoxalaatkristallen te verwijderen.
              </li>
              <li>
                <strong>Was geïrriteerde huid</strong> – Als je hond contact heeft gehad met de bol, was poten, neus of andere aangetaste gebieden met water en milde zeep.
              </li>
              <li>
                <strong>Niet zelf laten braken</strong> – Probeer je hond niet te laten braken zonder advies van de dierenarts. Dit kan de irritatie verergeren.
              </li>
              <li>
                <strong>Verzamel informatie</strong> – Noteer welk deel van de plant is gegeten (blad, bloem, bol), hoeveel ongeveer, en hoe lang geleden.
              </li>
              <li>
                <strong>Bied water aan</strong> – Geef toegang tot vers water, maar forceer je hond niet te drinken.
              </li>
              <li>
                <strong>Monitor symptomen</strong> – Let op braken, diarree, zwakte, ademhaling tijdens transport naar de dierenarts.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Naar De Dierenarts?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Neem contact op met je dierenarts of ga direct naar de spoeddienst als je een van deze tekenen waarneemt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Je weet of vermoedt dat je hond een hyacintbol heeft gegeten</li>
            <li>Hevig of aanhoudend braken</li>
            <li>Bloederige diarree of braassel</li>
            <li>Zichtbare zwelling van mond, tong of keel</li>
            <li>Moeite met slikken of ademhalen</li>
            <li>Tremors, spiertrillingen of zwakte</li>
            <li>Collaps of bewusteloosheid</li>
            <li>Ernstige huidirritatie met blaarvorming</li>
            <li>Symptomen die aanhouden of verslechteren</li>
            <li>Weigering te drinken (risico op dehydratie)</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Veterinaire Behandeling</h3>
            <p className="text-blue-800 mb-3">
              De dierenarts kan de volgende behandelingen bieden voor hyacint-vergiftiging:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Braken opwekken</strong> – indien inname recent was en hond stabiel is</li>
              <li><strong>Maagspoeling</strong> – om plantmateriaal te verwijderen</li>
              <li><strong>Actieve kool</strong> – om toxines te binden en absorptie te verminderen</li>
              <li><strong>Infuustherapie</strong> – voor hydratatie en elektrolytenbalans</li>
              <li><strong>Anti-braak medicatie</strong> – om braken te controleren</li>
              <li><strong>Maagbeschermers</strong> – om maagirrritatie te verminderen</li>
              <li><strong>Pijnstillers</strong> – voor mond- en keelpijn</li>
              <li><strong>Antihistaminica</strong> – bij allergische huidreacties</li>
              <li><strong>Huidbehandeling</strong> – voor dermatitis door bolcontact</li>
              <li><strong>Monitoring</strong> – van vitale functies en hydratatiestatus</li>
            </ul>
            <p className="text-blue-800 mt-3">
              <strong>Prognose</strong>: Met snelle behandeling is de prognose over het algemeen goed. De meeste honden herstellen volledig met ondersteunende zorg.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventiemaatregelen: Houd Je Hond Veilig
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Preventie is de beste bescherming tegen hyacint-vergiftiging:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">In De Tuin</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Omhein hyacintperken</strong> – Gebruik lage tuinhekjes of plantenrekken waar honden niet bij kunnen</li>
            <li><strong>Plant bollen diep</strong> – Plant hyacintbollen op voldoende diepte (10-15 cm) om opgraven te bemoeilijken</li>
            <li><strong>Bescherm pas geplante bollen</strong> – Gebruik kippengaas over vers geplante bollen tot ze geworteld zijn</li>
            <li><strong>Supervisie buiten</strong> – Houd honden in de gaten tijdens tuinbezoeken, vooral in het voorjaar</li>
            <li><strong>Train "laat maar" commando</strong> – Leer je hond planten met rust te laten</li>
            <li><strong>Verwijder verwelkte bloemen</strong> – Haal hyacinten weg als ze beginnen te verwelken</li>
            <li><strong>Draag handschoenen bij tuinieren</strong> – Bescherm jezelf tegen hyacint dermatitis bij het planten van bollen</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Binnen</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Plaats potten buiten bereik</strong> – Hoge tafels of kasten waar honden niet bij kunnen</li>
            <li><strong>Gebruik zware potten</strong> – Voorkom dat honden potten omgooien</li>
            <li><strong>Monitor nieuwsgierige honden</strong> – Extra toezicht op jonge of speelse honden</li>
            <li><strong>Ruim afgevallen bladeren/bloemen op</strong> – Controleer dagelijks en verwijder plantenresten</li>
            <li><strong>Overweeg hondenvrindelijke alternatieven</strong> – Zie hieronder voor veilige voorjaarsbloemen</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Veilige Voorjaarsbloemen Alternatieven</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je van voorjaarsbloemen houdt maar een hond hebt, overweeg deze hondenvrindelijke alternatieven:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Afrikaantjes (Tagetes)</strong> – Kleurrijk en veilig</li>
            <li><strong>Viooltjes (Viola)</strong> – Vrolijke voorjaarsbloemen</li>
            <li><strong>Gerbera's</strong> – Veilige snijbloemen met mooie kleuren</li>
            <li><strong>Zonnebloemen</strong> – Groot en hondenvrindelijk</li>
            <li><strong>Sleutelbloemen (Primula)</strong> – Niet giftig voor honden</li>
            <li><strong>Orchideeën</strong> – Elegant en veilig</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Andere Giftige Bolgewassen</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Let ook op deze giftige voorjaarsbloemen en bollen:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Narcissen</strong> – Bevatten lycorine, vooral bollen zeer giftig</li>
            <li><strong>Tulpen</strong> – Bollen bevatten tulipaline</li>
            <li><strong>Krokussen (herfst)</strong> – Zeer giftig colchicine</li>
            <li><strong>Sneeuwklokjes</strong> – Bevatten galantamine</li>
            <li><strong>Lelies</strong> – Extreem giftig, vooral voor katten</li>
            <li><strong>Iris</strong> – Matig giftig, vooral wortelstok</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen (FAQ)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Zijn hyacinten giftig voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, hyacinten zijn matig giftig voor honden. Alle delen van de plant bevatten giftige alkaloïden (lycorine, scillitoxine) en calciumoxalaatkristallen. De bol is het meest giftig en kan ernstige maag-darmklachten, huidirritatie en allergische reacties veroorzaken bij zowel inname als direct contact.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat maakt hyacinten gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Hyacinten bevatten een combinatie van giftige alkaloïden en calciumoxalaatkristallen. De alkaloïden veroorzaken maag-darmirritatie, braakneigingen en in ernstige gevallen hartproblemen. De calciumoxalaatkristallen zijn naaldvormige kristallen die mechanische schade toebrengen aan het slijmvlies van mond, keel en maag. De bol bevat de hoogste concentratie en kan ook huidirritatie veroorzaken bij contact.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn hond hyacint heeft gegeten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Neem direct contact op met je dierenarts. Verwijder plantenresten uit de mond, spoel de mond voorzichtig met water, en was geïrriteerde huid indien van toepassing. Probeer niet zelf je hond te laten braken zonder veterinair advies. Noteer welk deel van de plant is gegeten en hoeveel, en monitor symptomen tijdens transport naar de dierenarts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welke delen van de hyacint zijn het meest giftig?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                De <strong>bol (bulb)</strong> is het meest giftig, met de hoogste concentratie alkaloïden en calciumoxalaatkristallen. Bladeren, stengels en bloemen bevatten ook giftige stoffen, maar in lagere concentraties. Huidcontact met de bol kan irritatie en allergische dermatitis veroorzaken, bekend als "hyacint itch". Honden die graven lopen het grootste risico door blootstelling aan bollen in de grond.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan een hond sterven van hyacint-vergiftiging?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ernstige vergiftigingen zijn mogelijk, vooral bij inname van bollen of grote hoeveelheden plantmateriaal. Hoewel dodelijke gevallen zeldzaam zijn, kan ernstige dehydratie door aanhoudend braken en diarree levensbedreigend zijn zonder behandeling. Snelle veterinaire zorg geeft een goede prognose – de meeste honden herstellen volledig binnen 24-48 uur met ondersteunende behandeling.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusie: Hyacinten en Honden
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hyacinten zijn matig giftig voor honden, met de bol als meest risicovolle deel. Inname vereist altijd veterinaire evaluatie. Met snelle behandeling is de prognose goed, maar preventie blijft de beste strategie.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je hyacinten in je tuin of huis hebt, zorg dan voor veilige plaatsing, bescherming van bollen en constante supervisie. Overweeg hondenvrindelijke voorjaarsbloemen als alternatief. Bij vermoeden van inname: neem direct contact op met je dierenarts.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Denk ook aan jezelf</strong>: draag handschoenen bij het planten van hyacintbollen om huidirritatie te voorkomen!
          </p>
        </div>

        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies, diagnose of behandeling. Neem bij twijfel over de gezondheid van je huisdier altijd contact op met een gekwalificeerde dierenarts. In noodgevallen: bel direct je dierenarts of de dierenartsenspoeddienst.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/nl/giftige-planten-honden" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Complete Lijst: Giftige Planten voor Honden
              </Link>
            </li>
            <li>
              <Link href="/nl/veilige-tuinplanten-honden" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Veilige Tuinplanten voor Honden
              </Link>
            </li>
            <li>
              <Link href="/nl/eerste-hulp-hond-vergiftiging" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Eerste Hulp bij Hondvergiftiging
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
