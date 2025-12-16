import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Paddenstoelen Giftig voor Honden? Wilde Paddenstoelen Vergiftiging | CutiePawsPedia',
  description: 'Wilde paddenstoelen kunnen dodelijk giftig zijn voor honden. Leer welke soorten gevaarlijk zijn, symptomen van vergiftiging en onmiddellijke eerste hulp.',
  keywords: 'paddenstoelen giftig honden, wilde paddenstoelen hond, paddenstoel vergiftiging, giftige paddenstoelen, kan hond paddenstoelen eten',
  openGraph: {
    title: 'Is Paddenstoelen Giftig voor Honden? Wilde Paddenstoelen Vergiftiging',
    description: 'Wilde paddenstoelen kunnen dodelijk zijn voor honden. Ontdek welke soorten gevaarlijk zijn en wat te doen bij vergiftiging.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://cutiepawspedia.nl/nl/is-paddenstoelen-giftig-voor-honden',
    siteName: 'CutiePawsPedia',
  },
  alternates: {
    canonical: 'https://cutiepawspedia.nl/nl/is-paddenstoelen-giftig-voor-honden',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function IsPaddenstoelenGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Paddenstoelen Giftig voor Honden?',
    description: 'Uitgebreide informatie over paddenstoelvergiftiging bij honden, giftige soorten en eerste hulp.',
    datePublished: '2025-12-15',
    dateModified: '2025-12-15',
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
      '@id': 'https://cutiepawspedia.nl/nl/is-paddenstoelen-giftig-voor-honden',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom zijn wilde paddenstoelen gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wilde paddenstoelen kunnen zeer giftige toxines bevatten zoals amatoxinen, muscarine, psilocybine en andere stoffen die lever-, nier- en zenuwschade kunnen veroorzaken. Het is vrijwel onmogelijk om giftige paddenstoelen van eetbare te onderscheiden zonder expertise, daarom moet je aannemen dat alle wilde paddenstoelen gevaarlijk zijn.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke paddenstoelen zijn het gevaarlijkst voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De dodelijkste paddenstoelen zijn Amanita-soorten zoals de groene knolamaniet (Amanita phalloides), vliegenzwam (Amanita muscaria) en pantherzwam. Deze bevatten amatoxinen die leverfalen veroorzaken. Ook Galerina, Lepiota en Inocybe soorten zijn zeer giftig. Zelfs kleine hoeveelheden kunnen dodelijk zijn.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel verschijnen symptomen na het eten van giftige paddenstoelen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dit hangt af van het type paddenstoel. Muscarine-houdende paddenstoelen veroorzaken symptomen binnen 15-30 minuten. Amatoxine-houdende paddenstoelen (de dodelijkste) veroorzaken symptomen pas na 6-24 uur, wat misleidend is omdat de schade al begonnen is.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat moet ik doen als mijn hond een wilde paddenstoel heeft gegeten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neem ONMIDDELLIJK contact op met je dierenarts of een gifnoodnummer voor dieren. Verwijder resten van de paddenstoel uit de bek van je hond. Verzamel een monster van de paddenstoel (gebruik handschoenen!) voor identificatie. Ga direct naar de kliniek - wacht niet op symptomen. Tijd is cruciaal bij paddenstoelvergiftiging.',
        },
      },
      {
        '@type': 'Question',
        name: 'Zijn champignons uit de supermarkt veilig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gekweekte champignons uit de supermarkt zijn niet giftig voor honden, maar ze bieden weinig voedingswaarde en kunnen maagklachten veroorzaken. Geef ze alleen in kleine hoeveelheden, goed gekookt en zonder kruiden. Wilde paddenstoelen daarentegen moet je NOOIT geven.',
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
          currentPage="Paddenstoelen voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Paddenstoelen Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Hoog gevaar - Wilde paddenstoelen kunnen dodelijk zijn
              </h3>
              <p className="text-red-800 font-medium mb-2">
                Wilde paddenstoelen zijn <strong>potentieel dodelijk giftig</strong> voor honden en kunnen leverfalen veroorzaken.
              </p>
              <p className="text-red-700 text-sm">
                <strong>Noodgeval:</strong> Als je hond een wilde paddenstoel heeft gegeten, neem onmiddellijk contact op met je dierenarts. Wacht niet op symptomen - bij paddenstoelvergiftiging is snelle actie belangrijk. Verzamel een monster van de paddenstoel voor identificatie en ga direct naar de kliniek.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Paddenstoelvergiftiging is een levensbedreigende noodsituatie bij honden. Wilde paddenstoelen
            die in tuinen, parken en bossen groeien kunnen extreem giftige toxines bevatten die lever-,
            nier- en zenuwschade veroorzaken. Het probleem is dat het vrijwel onmogelijk is om giftige
            paddenstoelen van eetbare te onderscheiden zonder mycologische expertise. Daarom moet je
            aannemen dat alle wilde paddenstoelen gevaarlijk zijn voor je hond.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom zijn Wilde Paddenstoelen Zo Gevaarlijk?
          </h2>
          <p className="text-gray-700 mb-4">
            Giftige paddenstoelen bevatten verschillende soorten toxines die verschillende orgaansystemen
            aanvallen. De ernst hangt af van het type paddenstoel, de hoeveelheid die is gegeten en de
            grootte van je hond. Enkele van de gevaarlijkste toxines zijn:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Belangrijkste Paddenstoeltoxines:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>Amatoxinen</strong> - De dodelijkste toxines, gevonden in Amanita, Galerina en Lepiota soorten.
                  Veroorzaken leverfalen en nierfalen. Symptomen verschijnen pas na 6-24 uur, waarna de schade al ernstig is.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <div>
                  <strong>Muscarine</strong> - Gevonden in Inocybe en Clitocybe soorten. Beïnvloedt het zenuwstelsel,
                  veroorzaakt overmatig speekselen, kwijlen, vernauwde pupillen en ademhalingsmoeilijkheden.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <div>
                  <strong>Muscimol en Iboteenzuur</strong> - Gevonden in vliegenzwam (Amanita muscaria). Veroorzaken
                  neurologische symptomen zoals hallucinaties, aanvallen en coma.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong>Psilocybine</strong> - Gevonden in "magische paddenstoelen". Veroorzaakt hallucinaties,
                  verwarring, tremoren en aanvallen.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <div>
                  <strong>Gyromitrine</strong> - Gevonden in valse morielje (Gyromitra). Veroorzaakt leverschade,
                  bloedcelvernietiging en zenuwschade.
                </div>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Meest Giftige Paddenstoelen in Nederland en België
          </h2>
          <p className="text-gray-700 mb-4">
            Deze paddenstoelen zijn bijzonder gevaarlijk en kunnen in onze regio worden aangetroffen:
          </p>

          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dodelijke Paddenstoelen (Amatoxinen):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Groene knolamaniet (Amanita phalloides)</strong> - "Death cap", de dodelijkste paddenstoel. Zelfs kleine hoeveelheden kunnen fataal zijn</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Witte knolamaniet (Amanita virosa)</strong> - "Destroying angel", eveneens zeer giftig</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Bundelmycena soorten (Galerina marginata)</strong> - Kleine bruine paddenstoelen die dodelijke amatoxinen bevatten</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Zeer Giftige Paddenstoelen:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span><strong>Vliegenzwam (Amanita muscaria)</strong> - Rode paddenstoel met witte stippen, veroorzaakt hallucinaties en aanvallen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span><strong>Pantherzwam (Amanita pantherina)</strong> - Lijkt op vliegenzwam, zeer giftig</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span><strong>Satijnzwammen (Inocybe soorten)</strong> - Bevatten muscarine, veroorzaken ernstige neurologische symptomen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span><strong>Wasplaten (Clitocybe soorten)</strong> - Ook muscarine-houdend</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
            <p className="text-yellow-800 font-medium">
              <strong>⚠️ Belangrijk:</strong> Het is bijna onmogelijk voor leken om paddenstoelen veilig
              te identificeren. Zelfs ervaren mycologen kunnen fouten maken. Ga er altijd van uit dat
              wilde paddenstoelen giftig zijn en houd je hond bij ze vandaan.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Paddenstoelvergiftiging bij Honden
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen variëren sterk afhankelijk van het type paddenstoel. Ze kunnen binnen minuten
            verschijnen of vertraagd zijn tot 24 uur later:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Snelle Symptomen (15 minuten - 2 uur):</h3>
            <p className="text-sm text-gray-600 mb-2">Bij muscarine-houdende paddenstoelen:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Overmatig kwijlen en speekselen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Vernauwde pupillen (miosis)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Traanvorming</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Braken en diarree</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Trage hartslag (bradycardie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Ademhalingsmoeilijkheden</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Neurologische Symptomen (30 minuten - 6 uur):</h3>
            <p className="text-sm text-gray-600 mb-2">Bij hallucinogene of neurotoxische paddenstoelen:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Verwarring en desoriëntatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Coördinatieproblemen (ataxie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Trillen en spiertrekkingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Hyperactiviteit of lethargie</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Hallucinaties (hond bijt naar "onzichtbare vliegen")</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Aanvallen of stuiptrekkingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Coma</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vertraagde Symptomen (6-24 uur):</h3>
            <p className="text-sm text-gray-600 mb-2">Bij amatoxine-houdende paddenstoelen (DE GEVAARLIJKSTE):</p>
            <p className="text-red-700 font-medium mb-3">
              ⚠️ De vertraging is misleidend - de lever- en nierschade is al begonnen voordat symptomen verschijnen!
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Fase 1 (6-12 uur): Ernstig braken en diarree (vaak bloederig)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Fase 2 (12-24 uur): "Herstel" periode waar hond beter lijkt (maar schade gaat door!)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Fase 3 (24-72 uur): Leverfalen, nierfalen, bloedingsstoornissen, coma, dood</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat te Doen als je Hond een Paddenstoel heeft Gegeten - NOODPROTOCOL
          </h2>
          <p className="text-gray-700 mb-4">
            Paddenstoelvergiftiging is een <strong>ABSOLUTE NOODSITUATIE</strong>. Tijd is van levensbelang:
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">1.</span>
                <span><strong>Bel onmiddellijk je dierenarts</strong> - Zeg dat het om paddenstoelvergiftiging gaat. Dit is een noodgeval. Als je dierenarts niet beschikbaar is, bel de dierenartsenpraktijk voor spoedeisende hulp</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">2.</span>
                <span><strong>Verwijder resten uit de bek</strong> - Open de bek van je hond en verwijder zichtbare stukken paddenstoel. Was je handen direct daarna</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">3.</span>
                <span><strong>Verzamel een paddenstoel monster</strong> - Gebruik handschoenen of een plastic zak. Raak de paddenstoel NIET met je blote handen aan. Dit helpt bij identificatie en behandeling</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">4.</span>
                <span><strong>Maak foto's</strong> - Fotografeer de paddenstoel (bovenkant, onderkant, steel) en de locatie waar je hond ze at</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">5.</span>
                <span><strong>Niet braken opwekken</strong> - Probeer je hond niet zelf te laten braken tenzij je dierenarts dit specifiek adviseert</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">6.</span>
                <span><strong>Ga direct naar de kliniek</strong> - Wacht niet op symptomen. Bij paddenstoelvergiftiging is snelle actie belangrijk</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-red-700 mr-3">7.</span>
                <span><strong>Monitor tijdens transport</strong> - Let op ademhaling, bewustzijn en eventuele aanvallen</span>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
            <p className="text-yellow-800 font-medium">
              <strong>Belangrijk:</strong> Zelfs als je hond zich goed voelt, ga toch naar de dierenarts.
              Bij de dodelijkste paddenstoelen verschijnen symptomen pas later, terwijl de leverschade
              al begonnen is. Wacht niet op symptomen voordat je contact opneemt.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veterinaire Behandeling
          </h2>
          <p className="text-gray-700 mb-4">
            De behandeling hangt af van het type paddenstoel en hoe snel je bij de dierenarts komt:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Decontaminatie</strong> - Braken opwekken (binnen 1-2 uur) of maagspoeling onder narcose</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Actieve kool</strong> - Bindt toxines en voorkomt verdere absorptie. Meerdere doses over 24-48 uur</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Intraveneuze vloeistoffen</strong> - Beschermt nieren en helpt toxines uit te spoelen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Leverbeschermende medicatie</strong> - Zoals silibinine (uit mariadistel) bij amatoxine vergiftiging</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Bloedtransfusies</strong> - Bij ernstige bloedingsstoornissen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Anti-misselijkheid medicatie</strong> - Tegen braken en dehydratie</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Monitoring</strong> - Bloedonderzoek (lever, nieren), urine-analyse, bloedstolling</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Ziekenhuisopname</strong> - 24-72 uur intensieve zorg bij ernstige vergiftiging</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6">
            De prognose hangt sterk af van het type paddenstoel en hoe snel behandeling wordt gestart.
            Bij amatoxine-vergiftiging is de sterfte 50-90% zonder behandeling, maar vroege agressieve
            behandeling kan dit verlagen naar 10-20%. Elke minuut telt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventie: Hoe Paddenstoelvergiftiging Voorkomen?
          </h2>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Inspecteer je tuin regelmatig</strong> - Verwijder alle paddenstoelen zodra ze verschijnen, vooral na regenperiodes</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Gebruik handschoenen</strong> - Raak paddenstoelen niet met blote handen aan tijdens verwijdering</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Let op tijdens wandelingen</strong> - Vooral in bossen, parken en vochtige gebieden waar paddenstoelen groeien</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Leer je hond "laat maar"</strong> - Train je hond om voorwerpen niet van de grond te eten</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Houd je hond aan de lijn</strong> - Vooral tijdens paddenstoelenseizoen (herfst en natte periodes)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Controleer speelplekken</strong> - Kijk of er paddenstoelen groeien op plekken waar je hond speelt</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Wees extra alert in het najaar</strong> - De meeste giftige paddenstoelen verschijnen tussen september en november</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Verwijder paddenstoelen volledig</strong> - Trek ze uit inclusief het ondergrondse mycelium om hergroei te voorkomen</span>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-blue-800">
              <strong>💡 Tip:</strong> Paddenstoelen groeien vaak terug op dezelfde plekken. Markeer deze
              locaties en controleer ze regelmatig. Overweeg het gebruik van schimmelwerende middelen voor
              tuinen (vraag advies aan een tuincentrum).
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Champignons uit de Supermarkt: Zijn Die Veilig?
          </h2>
          <p className="text-gray-700 mb-4">
            Gekweekte champignons, shiitakes en andere paddenstoelen uit de supermarkt zijn niet giftig
            voor honden. Echter:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Ze bieden weinig voedingswaarde voor honden</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Rauwe paddenstoelen zijn moeilijk te verteren en kunnen maagklachten veroorzaken</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Geef alleen in kleine hoeveelheden en goed gekookt</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Geen kruiden, knoflook, ui, boter of olie toevoegen</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom zijn wilde paddenstoelen gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700">
                Wilde paddenstoelen kunnen zeer giftige toxines bevatten zoals amatoxinen, muscarine,
                psilocybine en andere stoffen die lever-, nier- en zenuwschade kunnen veroorzaken. Het is
                vrijwel onmogelijk om giftige paddenstoelen van eetbare te onderscheiden zonder expertise,
                daarom moet je aannemen dat alle wilde paddenstoelen gevaarlijk zijn.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welke paddenstoelen zijn het gevaarlijkst voor honden?
              </h3>
              <p className="text-gray-700">
                De dodelijkste paddenstoelen zijn Amanita-soorten zoals de groene knolamaniet (Amanita
                phalloides), vliegenzwam (Amanita muscaria) en pantherzwam. Deze bevatten amatoxinen die
                leverfalen veroorzaken. Ook Galerina, Lepiota en Inocybe soorten zijn zeer giftig. Zelfs
                kleine hoeveelheden kunnen dodelijk zijn.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel verschijnen symptomen na het eten van giftige paddenstoelen?
              </h3>
              <p className="text-gray-700">
                Dit hangt af van het type paddenstoel. Muscarine-houdende paddenstoelen veroorzaken
                symptomen binnen 15-30 minuten. Amatoxine-houdende paddenstoelen (de dodelijkste)
                veroorzaken symptomen pas na 6-24 uur, wat misleidend is omdat de schade al begonnen is.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat moet ik doen als mijn hond een wilde paddenstoel heeft gegeten?
              </h3>
              <p className="text-gray-700">
                Neem ONMIDDELLIJK contact op met je dierenarts of een gifnoodnummer voor dieren. Verwijder
                resten van de paddenstoel uit de bek van je hond. Verzamel een monster van de paddenstoel
                (gebruik handschoenen!) voor identificatie. Ga direct naar de kliniek - wacht niet op
                symptomen. Tijd is cruciaal bij paddenstoelvergiftiging.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Zijn champignons uit de supermarkt veilig voor honden?
              </h3>
              <p className="text-gray-700">
                Gekweekte champignons uit de supermarkt zijn niet giftig voor honden, maar ze bieden weinig
                voedingswaarde en kunnen maagklachten veroorzaken. Geef ze alleen in kleine hoeveelheden,
                goed gekookt en zonder kruiden. Wilde paddenstoelen daarentegen moet je NOOIT geven.
              </p>
            </div>
          </div>

          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />

          {/* Medical Disclaimer */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-sm text-gray-600">
              Deze informatie is alleen bedoeld voor educatieve doeleinden en vervangt geen professioneel
              veterinair advies, diagnose of behandeling. Paddenstoelvergiftiging is een levensbedreigende
              noodsituatie die onmiddellijke veterinaire zorg vereist. Neem altijd contact op met een
              gekwalificeerde dierenarts bij vermoeden van paddenstoelvergiftiging. Elke minuut telt.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
