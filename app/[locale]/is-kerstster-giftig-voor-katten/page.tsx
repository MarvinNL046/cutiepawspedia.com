import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Kerstster Giftig voor Katten? Feiten & Veiligheid | CutiePawsPedia',
  description: 'Ontdek de waarheid over kerststerren en katten. Leer over symptomen, toxiciteit, en hoe je jouw kat veilig houdt tijdens de feestdagen.',
  keywords: 'kerstster giftig katten, poinsettia katten, kerstplanten giftig kat, euphorbia kat, feestdagen katten veiligheid',
  openGraph: {
    title: 'Is Kerstster Giftig voor Katten? De Feiten',
    description: 'Alles over kerststerren en katten: mythes, feiten, symptomen en veiligheidsmaatregelen voor de feestdagen.',
    type: 'article',
    publishedTime: '2025-12-15T10:00:00Z',
    authors: ['CutiePawsPedia Team'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IsKerststerGiftigVoorKattenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Kerstster Giftig voor Katten?',
    description: 'Uitgebreide informatie over de giftigheid van kerststerren (poinsettia) voor katten, symptomen en veiligheidsmaatregelen tijdens de feestdagen.',
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
        name: 'Is kerstster echt giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, maar de giftigheid is laag en wordt vaak overdreven. Kerststerren kunnen milde maagklachten veroorzaken bij katten, maar zijn zelden levensbedreigend. De melkachtige sap kan irritatie veroorzaken aan mond en maag.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn kat van kerstster heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verwijder plantenresten uit de mond, spoel de mond voorzichtig met water, bied vers water aan en monitor je kat op symptomen. Neem contact op met je dierenarts als je braken, diarree of lethargie waarneemt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Waarom staat kerstster bekend als giftige plant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De reputatie van kerststerren als zeer giftig is een mythe uit de jaren 1900. Moderne studies tonen aan dat ze slechts mild irriterend zijn. De melkachtige sap bevat irriterende stoffen, maar is niet dodelijk voor katten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke delen van de kerstster zijn giftig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alle delen van de kerstster (bladeren, stengels, bloemen) bevatten het melkachtige sap met irriterende stoffen. De bladeren zijn het meest aantrekkelijk voor katten en worden het vaakst geconsumeerd.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan ik veilig kerststerren in huis hebben met een kat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, met voorzorgsmaatregelen. Plaats kerststerren buiten het bereik van katten, monitor je kat tijdens de feestdagen, en overweeg kattenvrindelijke alternatieven zoals kerstcactus of orchideeën. Bij nieuwsgierige katten is het veiliger om kerststerren te vermijden.',
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
          currentPage="Kerstster voor Katten"
        />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Is Kerstster Giftig voor Katten?
          </h1>
          <p className="text-xl text-gray-600">
            De waarheid over poinsettia's en de veiligheid van jouw kat tijdens de feestdagen
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Laatst bijgewerkt: 15 december 2025
          </div>
        </header>

        {/* TL;DR Verdict */}
        <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-green-900 mb-2">Giftigheid: Laag (Mild Irriterend)</h2>
              <p className="text-green-800">
                <strong>Kerststerren zijn mild giftig voor katten, maar veel minder gevaarlijk dan vaak wordt gedacht.</strong> De plant kan milde maagklachten en mond-irritatie veroorzaken, maar is zelden levensbedreigend. De meeste katten ervaren alleen tijdelijke ongemak zoals kwijlen of braken. Toch is het verstandig om contact op te nemen met je dierenarts bij symptomen.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            De Mythe vs. De Werkelijkheid
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kerststerren (Poinsettia, wetenschappelijk: Euphorbia pulcherrima) hebben een slechte reputatie als zeer giftige planten voor huisdieren. Deze mythe stamt uit het begin van de 20e eeuw en is sindsdien hardnekkig blijven bestaan. <strong>De realiteit is minder alarmerend</strong>: moderne wetenschappelijke studies tonen aan dat kerststerren slechts mild irriterend zijn voor katten.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Een studie van de ASPCA (American Society for the Prevention of Cruelty to Animals) en het Pet Poison Helpline bevestigt dat ernstige vergiftigingen door kerststerren zeer zeldzaam zijn. De meeste katten die kerstster eten, ervaren alleen milde symptomen die binnen 24 uur vanzelf verdwijnen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Waarom dan toch voorzichtig zijn?</strong> Hoewel niet levensbedreigend, kan de kerstster nog steeds ongemak veroorzaken bij je kat. Het melkachtige sap in de plant bevat irriterende stoffen die maagklachten kunnen veroorzaken, vooral bij grotere inname.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Maakt Kerstster Irriterend voor Katten?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kerststerren behoren tot de Euphorbiaceae-familie en bevatten een melkachtig sap in alle delen van de plant (bladeren, stengels, bloemen). Dit sap bevat <strong>esters van diterpenen</strong> en andere irriterende verbindingen die het spijsverteringsstelsel kunnen irriteren.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wanneer een kat aan de kerstster kauwt of bladeren eet, komt het sap in contact met het slijmvlies van de mond en maag. Dit veroorzaakt:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Mechanische irritatie</strong> – Het kleverige sap kan plakken aan weefsels</li>
            <li><strong>Chemische irritatie</strong> – De esters veroorzaken milde ontstekingsreacties</li>
            <li><strong>Maagklachten</strong> – Misselijkheid en braakneigingen door maagirrritatie</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Gelukkig bevat het sap <strong>geen ernstig giftige alkaloïden of cardiotoxinen</strong> zoals bij meer gevaarlijke planten (lelies, oleander). De irritatie is meestal voorbijgaand en zelflimiterend.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Kerstster-Inname bij Katten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Symptomen zijn meestal mild en treden binnen enkele uren na inname op:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Milde Symptomen (Meest Voorkomend)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Kwijlen en speekselvloed</strong> – reactie op bittere smaak</li>
            <li><strong>Mond- en lipongemak</strong> – kat wrijft met poot over mond</li>
            <li><strong>Lichte misselijkheid</strong></li>
            <li><strong>Verminderde eetlust</strong> gedurende enkele uren</li>
            <li><strong>Lethargisch gedrag</strong> – kat zoekt rustige plek</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Matige Symptomen (Minder Vaak)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Braken</strong> – meestal 1-2 keer, soms met plantmateriaal</li>
            <li><strong>Diarree</strong> – zachte of waterige ontlasting</li>
            <li><strong>Huidirritatie</strong> – indien sap op huid terechtkomt, vooral rond mond</li>
            <li><strong>Oogirrritatie</strong> – indien sap in ogen komt (zeldzaam)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ernstige Symptomen (Zeer Zeldzaam)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Aanhoudend braken</strong> (meer dan 4-5 keer) leidend tot dehydratie</li>
            <li><strong>Extreme zwakte</strong> of onvermogen te staan</li>
            <li><strong>Weigering te drinken</strong> gedurende {'>'}12 uur</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Belangrijk Om Te Weten</h3>
            <p className="text-blue-800">
              De meeste katten herstellen volledig zonder behandeling. Ernstige vergiftigingen zijn uitzonderlijk zeldzaam. Echter, elk huisdier is anders – sommige katten kunnen gevoeliger zijn dan andere. Bij twijfel: neem altijd contact op met je dierenarts.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat Te Doen Als Je Kat Kerstster Heeft Gegeten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Blijf kalm – kerstster-inname is zelden een noodgeval, maar monitoring is belangrijk:
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Eerste Hulp Stappen</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-800">
              <li>
                <strong>Verwijder plantenresten</strong> – Haal voorzichtig zichtbare bladeren of stengels uit de mond van je kat.
              </li>
              <li>
                <strong>Spoel de mond</strong> – Spoel de mond van je kat voorzichtig met koel water om het melkachtige sap te verwijderen.
              </li>
              <li>
                <strong>Veeg het gezicht schoon</strong> – Verwijder sap van vacht rond de mond om huidirritatie te voorkomen.
              </li>
              <li>
                <strong>Bied water aan</strong> – Geef toegang tot vers drinkwater.
              </li>
              <li>
                <strong>Niet laten braken</strong> – Probeer niet je kat te laten braken, tenzij een dierenarts dit adviseert.
              </li>
              <li>
                <strong>Monitor symptomen</strong> – Let op kwijlen, braken, diarree of lethargie gedurende 24 uur.
              </li>
              <li>
                <strong>Neem contact op met je dierenarts</strong> – Vooral als symptomen optreden of je kat een grote hoeveelheid heeft gegeten.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Naar De Dierenarts?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Neem contact op met je dierenarts als je een van deze tekenen waarneemt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Aanhoudend braken (meerdere keren)</li>
            <li>Bloederige diarree of braassel</li>
            <li>Extreme zwakte of lethargie (kat reageert niet op naam)</li>
            <li>Weigering te drinken gedurende langere tijd</li>
            <li>Symptomen die aanhouden of verslechteren</li>
            <li>Tekenen van dehydratie (droge tandvlees, verzonken ogen)</li>
            <li>Ernstige huidirritatie of oogirrritatie</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Veterinaire Behandeling</h3>
            <p className="text-blue-800 mb-3">
              De behandeling voor kerstster-inname is meestal ondersteunend:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Maagspoelingen</strong> – indien grote hoeveelheid is ingenomen</li>
              <li><strong>Anti-braak medicatie</strong> – om braken te stoppen</li>
              <li><strong>Infuustherapie</strong> – bij dehydratie door braken/diarree</li>
              <li><strong>Maagbeschermers</strong> – om maagirrritatie te verminderen</li>
              <li><strong>Symptomatische zorg</strong> – rust, monitoring</li>
            </ul>
            <p className="text-blue-800 mt-3">
              Prognose is uitstekend – de meeste katten herstellen volledig met ondersteunende zorg.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventiemaatregelen: Veilige Feestdagen
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hoewel kerststerren mild giftig zijn, kan je met eenvoudige maatregelen risico's minimaliseren:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Praktische Tips</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Plaats buiten bereik</strong> – Hoge tafels, plantenstandaarden of kamers waar je kat geen toegang toe heeft</li>
            <li><strong>Gebruik hangende decoraties</strong> – Hang kleinere kerststerren op waar katten niet bij kunnen</li>
            <li><strong>Monitor nieuwsgierige katten</strong> – Houd extra toezicht op jonge of speelse katten</li>
            <li><strong>Verwijder afgevallen bladeren</strong> – Controleer dagelijks en ruim bladeren op die op de grond vallen</li>
            <li><strong>Overweeg kunstkerststerren</strong> – Voor huishoudens met zeer nieuwsgierige katten</li>
            <li><strong>Train met "nee" commando</strong> – Leer je kat de plant te vermijden</li>
            <li><strong>Bied afleidingen</strong> – Speeltjes en kattengras als alternatief</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Veilige Feestdagen Alternatieven</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je toch ongerust bent, overweeg deze kattenvrindelijke kerstplanten:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Kerstcactus (Schlumbergera)</strong> – 100% veilig en bloeit mooi in de winter</li>
            <li><strong>Orchideeën</strong> – Elegant en niet giftig</li>
            <li><strong>Cyclaam</strong> – Feestelijke kleuren, veilig voor katten</li>
            <li><strong>Afrikaanse viooltjes</strong> – Klein en kleurrijk</li>
            <li><strong>Bromelia's</strong> – Tropisch en kattenvrindelijk</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Andere Feestdagen Gevaren</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tijdens de feestdagen zijn er meer risico's voor katten dan alleen kerststerren:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Kerstboomwater</strong> – Kan meststoffen of conserveermiddelen bevatten</li>
            <li><strong>Lametta/tinsel</strong> – Zeer gevaarlijk bij inslikken (darmblokkade)</li>
            <li><strong>Kerstboomlichtjes</strong> – Elektrocutiegevaar bij kauwen</li>
            <li><strong>Chocolade en zoetigheden</strong> – Giftig voor katten</li>
            <li><strong>Hulst en maretak</strong> – Veel giftiger dan kerststerren</li>
            <li><strong>Amaryllis en narcissen</strong> – Zeer giftige bolgewassen</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen (FAQ)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Is kerstster echt giftig voor katten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, maar de giftigheid is laag en wordt vaak overdreven. Kerststerren kunnen milde maagklachten veroorzaken bij katten door het irriterende melkachtige sap, maar zijn zelden levensbedreigend. De mythe van hoge toxiciteit stamt uit het begin van de 20e eeuw en is niet ondersteund door moderne wetenschappelijke studies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn kat van kerstster heeft gegeten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Verwijder plantenresten uit de mond, spoel de mond voorzichtig met water, veeg het gezicht schoon om huidirritatie te voorkomen, bied vers water aan en monitor je kat op symptomen zoals kwijlen, braken of diarree. Neem contact op met je dierenarts als je symptomen waarneemt of als je kat een grote hoeveelheid heeft gegeten.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Waarom staat kerstster bekend als giftige plant?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                De reputatie van kerststerren als zeer giftig is een mythe die begon in 1919 toen een kind vermoedelijk stierf na kerstster-inname. Dit geval werd nooit bevestigd, maar de mythe bleef bestaan. Moderne studies van ASPCA en Pet Poison Helpline tonen aan dat kerststerren slechts mild irriterend zijn en zelden ernstige symptomen veroorzaken.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welke delen van de kerstster zijn giftig?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Alle delen van de kerstster (bladeren, stengels, bloemen) bevatten het melkachtige sap met irriterende stoffen (esters van diterpenen). De rode of gekleurde bladeren (eigenlijk aangepaste bladeren, geen bloemen) zijn het meest aantrekkelijk voor katten en worden het vaakst geconsumeerd. Het sap is het meest geconcentreerd in de stengels.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kan ik veilig kerststerren in huis hebben met een kat?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, met voorzorgsmaatregelen. Plaats kerststerren buiten het bereik van katten (hoge tafels, plantenstandaarden), monitor je kat tijdens de feestdagen, en verwijder afgevallen bladeren direct. Voor huishoudens met zeer nieuwsgierige of playful katten is het veiliger om kerststerren te vermijden of te vervangen door kattenvrindelijke alternatieven zoals kerstcactus of orchideeën.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusie: Kerststerren en Katten
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kerststerren zijn mild giftig voor katten, maar veel minder gevaarlijk dan de mythe suggereert. De meeste katten ervaren alleen tijdelijke ongemak dat binnen een dag vanzelf verdwijnt. Met eenvoudige voorzorgsmaatregelen kun je veilig genieten van deze feestelijke planten.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Als je kiest voor kerststerren in huis, plaats ze dan buiten bereik en monitor je kat. Bij twijfel of symptomen: neem contact op met je dierenarts. Voor extra gemoedsrust kun je kiezen voor kattenvrindelijke alternatieven zoals kerstcactus.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Fijne en veilige feestdagen gewenst!</strong> 🎄
          </p>
        </div>

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
              <Link href="/nl/giftige-planten-katten" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Complete Lijst: Giftige Planten voor Katten
              </Link>
            </li>
            <li>
              <Link href="/nl/veilige-feestdagen-katten" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Veilige Feestdagen voor Katten
              </Link>
            </li>
            <li>
              <Link href="/nl/eerste-hulp-kat-vergiftiging" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                Eerste Hulp bij Katvergiftiging
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8">
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
