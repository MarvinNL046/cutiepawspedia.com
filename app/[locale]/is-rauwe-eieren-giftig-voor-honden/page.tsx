import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Rauwe Eieren Giftig voor Honden? Salmonella & Avidine Risico | CutiePawsPedia',
  description: 'Rauwe eieren kunnen gevaarlijk zijn voor honden door Salmonella en avidine dat biotine blokkeert. Lees over risicos, symptomen en veilige alternatieven.',
  keywords: 'rauwe eieren honden, eieren giftig voor honden, salmonella hond, avidine biotine, kan hond rauw ei eten',
  openGraph: {
    title: 'Is Rauwe Eieren Giftig voor Honden? Salmonella & Avidine Risico',
    description: 'Rauwe eieren bevatten Salmonella en avidine. Ontdek waarom gekookte eieren een veiliger alternatief zijn voor je hond.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://cutiepawspedia.nl/nl/is-rauwe-eieren-giftig-voor-honden',
    siteName: 'CutiePawsPedia',
  },
  alternates: {
    canonical: 'https://cutiepawspedia.nl/nl/is-rauwe-eieren-giftig-voor-honden',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function IsRauweEierenGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Rauwe Eieren Giftig voor Honden?',
    description: 'Uitgebreide informatie over de risicos van rauwe eieren voor honden, Salmonella en avidine.',
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
      '@id': 'https://cutiepawspedia.nl/nl/is-rauwe-eieren-giftig-voor-honden',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom zijn rauwe eieren slecht voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rauwe eieren brengen twee belangrijke risicos met zich mee: ze kunnen Salmonella-bacteriën bevatten die voedselvergiftiging veroorzaken, en het eiwit bevat avidine, een stof die biotine (vitamine B7) blokkeert. Bij regelmatige consumptie kan dit leiden tot biotinedeficiëntie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kunnen honden af en toe een rauw ei eten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Een occasioneel rauw ei veroorzaakt bij de meeste honden geen ernstige problemen, maar er is altijd een risico op Salmonella-infectie. Gekookte eieren zijn een veel veiliger alternatief omdat koken Salmonella doodt en avidine inactiveert.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is avidine en waarom is het problematisch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Avidine is een eiwit in rauw eiwit dat zich bindt aan biotine (vitamine B7) en voorkomt dat het wordt opgenomen. Biotine is essentieel voor een gezonde huid, vacht en stofwisseling. Bij regelmatige consumptie van rauw eiwit kan biotinedeficiëntie optreden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat zijn de symptomen van Salmonella bij honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen van Salmonella-infectie omvatten braken, diarree (soms met bloed), koorts, lethargie, verminderde eetlust en buikpijn. Symptomen verschijnen meestal binnen 6-72 uur na inname. Puppy\'s, oudere honden en honden met verzwakt immuunsysteem lopen het grootste risico.',
        },
      },
      {
        '@type': 'Question',
        name: 'Zijn gekookte eieren veilig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, gekookte eieren zijn een uitstekende, veilige eiwitbron voor honden. Koken doodt Salmonella en inactiveert avidine. Geef ze zonder zout, kruiden of boter. Een gekookt ei kan een gezonde traktatie zijn of aanvulling op het dieet van je hond.',
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
          currentPage="Rauwe Eieren voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Rauwe Eieren Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                ⚠️ LAAG TOT MIDDEL GEVAAR - Vermijd Regelmatig Gebruik
              </h3>
              <p className="text-yellow-800 font-medium mb-2">
                Rauwe eieren zijn <strong>niet acuut giftig</strong>, maar brengen Salmonella-risico en biotineblokkade met zich mee.
              </p>
              <p className="text-yellow-700 text-sm">
                <strong>Advies:</strong> Een occasioneel rauw ei is meestal niet gevaarlijk, maar geef je hond bij voorkeur gekookte eieren. Neem contact op met je dierenarts als je hond symptomen van voedselvergiftiging vertoont na het eten van rauwe eieren.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Eieren zijn een uitstekende eiwitbron voor honden, maar de vraag is of ze rauw of gekookt
            moeten worden gegeven. Rauwe eieren brengen twee belangrijke risicos met zich mee: bacteriële
            infectie door Salmonella en biotineblokkade door avidine. Hoewel een occasioneel rauw ei bij
            de meeste honden geen ernstige problemen veroorzaakt, is het verstandig om de risicos te kennen
            en voor gekookte eieren te kiezen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom zijn Rauwe Eieren Problematisch voor Honden?
          </h2>
          <p className="text-gray-700 mb-4">
            Er zijn twee hoofdredenen waarom rauwe eieren niet ideaal zijn voor honden:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Salmonella-Risico</h3>
            <p className="text-gray-700 mb-3">
              Rauwe eieren kunnen Salmonella-bacteriën bevatten, vooral als ze afkomstig zijn van
              besmette kippen of onhygiënisch zijn behandeld. Salmonella veroorzaakt voedselvergiftiging
              bij honden, met symptomen zoals braken, diarree, koorts en lethargie.
            </p>
            <p className="text-gray-700 mb-3">
              Hoewel honden over het algemeen een sterker maagzuur hebben dan mensen (wat sommige bacteriën
              kan doden), zijn ze niet immuun voor Salmonella. Vooral puppy's, oudere honden en honden met
              een verzwakt immuunsysteem lopen verhoogd risico op ernstige infectie.
            </p>
            <p className="text-gray-700">
              Een bijkomend probleem is dat honden die Salmonella-bacteriën in hun darmen hebben deze kunnen
              uitscheiden in hun ontlasting, wat een risico vormt voor andere huisdieren en mensen in het
              huishouden, vooral kinderen, ouderen en mensen met verzwakt immuunsysteem.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Avidine en Biotineblokkade</h3>
            <p className="text-gray-700 mb-3">
              Rauw eiwit bevat avidine, een eiwit dat zich bindt aan biotine (vitamine B7, ook wel vitamine H
              genoemd). Deze binding voorkomt dat biotine wordt opgenomen in de bloedbaan, wat bij regelmatige
              consumptie kan leiden tot biotinedeficiëntie.
            </p>
            <p className="text-gray-700 mb-3">
              Biotine is essentieel voor een gezonde huid en vacht, celgroei en het metabolisme van vetten,
              koolhydraten en eiwitten. Een tekort kan leiden tot huidproblemen, haarverlies, verminderde
              groei en metabolische stoornissen.
            </p>
            <p className="text-gray-700">
              Het goede nieuws is dat eigeel rijk is aan biotine en dit gedeeltelijk compenseert. Bovendien
              wordt avidine geïnactiveerd door koken, waardoor gekookte eieren geen biotineblokkade veroorzaken.
              Een occasioneel rauw ei zal bij de meeste honden geen biotinedeficiëntie veroorzaken, maar
              regelmatige consumptie is problematisch.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Salmonella-Infectie bij Honden
          </h2>
          <p className="text-gray-700 mb-4">
            Salmonella-symptomen verschijnen meestal binnen 6-72 uur na het eten van besmet voedsel.
            De ernst varieert van mild tot ernstig:
          </p>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Veelvoorkomende Symptomen:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Acute diarree, soms met bloed of slijm</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Braken en misselijkheid</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Koorts (rectale temperatuur boven 39,5°C)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Lethargie en verminderde activiteit</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Verminderde eetlust of weigering te eten</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Buikpijn en ongemak (gekromde houding)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Dehydratie door vocht- en elektrolytverlies</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ernstige Symptomen (Vereisen Spoed):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Bloederige diarree of braken</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Hoge koorts (boven 40°C)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Ernstige dehydratie (droge tandvlees, ingevallen ogen)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Collaps of extreme zwakte</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Sepsis (bloedvergiftiging) bij ernstige gevallen</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Biotinedeficiëntie
          </h2>
          <p className="text-gray-700 mb-4">
            Biotinedeficiëntie ontwikkelt zich langzaam, meestal na weken tot maanden van regelmatige
            consumptie van rauw eiwit. Symptomen omvatten:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Droge, schilferige huid</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Haarverlies, vooral rond ogen, neus en mond</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Doffe, broze vacht</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Langzame groei bij puppy's</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Verminderde eetlust</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Spierzwakte en lethargie</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat te Doen als je Hond Rauwe Eieren heeft Gegeten
          </h2>
          <p className="text-gray-700 mb-4">
            Als je hond een rauw ei heeft gegeten, volg dan deze stappen:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">1.</span>
                <span><strong>Blijf kalm en observeer</strong> - Een enkel rauw ei veroorzaakt bij de meeste honden geen onmiddellijke problemen</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">2.</span>
                <span><strong>Monitor symptomen</strong> - Let de komende 72 uur op tekenen van voedselvergiftiging (braken, diarree, lethargie)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">3.</span>
                <span><strong>Zorg voor voldoende water</strong> - Houd vers water beschikbaar om dehydratie te voorkomen</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">4.</span>
                <span><strong>Neem contact op met je dierenarts bij symptomen</strong> - Vooral bij bloederige diarree, hoge koorts of extreme lethargie</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">5.</span>
                <span><strong>Let op hygiëne</strong> - Was je handen grondig na contact met je hond en zijn ontlasting om Salmonella-overdracht te voorkomen</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">6.</span>
                <span><strong>Schakel over op gekookte eieren</strong> - Geef in de toekomst alleen gekookte eieren om risicos te vermijden</span>
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen met de Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem contact op met je dierenarts als:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond bloederige diarree of braken heeft</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond koorts heeft (rectale temperatuur boven 39,5°C)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Symptomen langer dan 24 uur aanhouden</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond tekenen van dehydratie vertoont (droge tandvlees, verminderde huidelasticiteit)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond een puppy is, oud is of een verzwakt immuunsysteem heeft</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond regelmatig rauwe eieren eet en huid- of vachtproblemen ontwikkelt</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veilig Eieren Geven aan je Hond
          </h2>
          <p className="text-gray-700 mb-4">
            Eieren zijn een fantastische, gezonde toevoeging aan het dieet van je hond - als ze goed
            worden bereid:
          </p>

          <div className="bg-emerald-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Veilige Manieren om Eieren te Geven:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Hard gekookt</strong> - De veiligste optie. Kook eieren goed door (10-12 minuten) en laat afkoelen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Geroerd (zonder boter/olie)</strong> - Roer eieren zonder toevoeging van vet, zout of kruiden</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Gepocheerd</strong> - Pocheer eieren in water zonder toevoegingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Heel ei (inclusief schaal)</strong> - Je kunt de schaal fijnmalen als calciumsupplement, maar dit is optioneel</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Maat aanpassen</strong> - Kleine honden: ½ ei, middelgrote honden: 1 ei, grote honden: 1-2 eieren</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Als traktatie of aanvulling</strong> - Eieren moeten 10% of minder van het dagelijkse dieet uitmaken</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <p className="text-red-800 font-medium">
              <strong>❌ Vermijd:</strong> Geef geen eieren gebakken in boter of olie, geen eieren met
              zout, peper of andere kruiden, en geen eieren met knoflook of ui (deze zijn giftig voor honden).
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Voordelen van Gekookte Eieren voor Honden
          </h2>
          <p className="text-gray-700 mb-4">
            Gekookte eieren zijn een uitstekende voedingsbron voor honden:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Hoogwaardig eiwit</strong> - Bevat alle essentiële aminozuren die honden nodig hebben</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Rijk aan vitamines</strong> - Bevat vitamine A, D, E, B12, riboflavine en foliumzuur</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Mineralen</strong> - Bron van ijzer, selenium en fosfor</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Gezonde vetten</strong> - Omega-3 en omega-6 vetzuren voor huid en vacht</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Verteerbaar</strong> - Gemakkelijk verteerbaar en goed voor de maag</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Voordelig</strong> - Betaalbare, natuurlijke voedingssupplement</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventie: Veilig Eieren Bewaren en Bereiden
          </h2>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Koop verse eieren</strong> - Check de houdbaarheidsdatum en bewaar eieren in de koelkast</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Kook eieren goed door</strong> - Zowel eiwit als dooier moeten volledig gestold zijn</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Bewaar je hond weg tijdens koken</strong> - Voorkom dat je hond rauwe eieren van het aanrecht steelt</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Gooi beschadigde eieren weg</strong> - Gebarsten of beschadigde eieren hebben hoger besmettingsrisico</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Was handen en keukengerei</strong> - Na contact met rauwe eieren om kruisbesmetting te voorkomen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Bewaar gekookte eieren veilig</strong> - Gekookte eieren maximaal 7 dagen in de koelkast</span>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-blue-800">
              <strong>💡 Tip:</strong> Introduceer eieren geleidelijk in het dieet van je hond, vooral als
              hij ze nog nooit heeft gehad. Begin met een klein stukje en observeer of er allergische
              reacties optreden (hoewel ei-allergie bij honden zeldzaam is).
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom zijn rauwe eieren slecht voor honden?
              </h3>
              <p className="text-gray-700">
                Rauwe eieren brengen twee belangrijke risicos met zich mee: ze kunnen Salmonella-bacteriën
                bevatten die voedselvergiftiging veroorzaken, en het eiwit bevat avidine, een stof die
                biotine (vitamine B7) blokkeert. Bij regelmatige consumptie kan dit leiden tot
                biotinedeficiëntie.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kunnen honden af en toe een rauw ei eten?
              </h3>
              <p className="text-gray-700">
                Een occasioneel rauw ei veroorzaakt bij de meeste honden geen ernstige problemen, maar er
                is altijd een risico op Salmonella-infectie. Gekookte eieren zijn een veel veiliger
                alternatief omdat koken Salmonella doodt en avidine inactiveert.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat is avidine en waarom is het problematisch?
              </h3>
              <p className="text-gray-700">
                Avidine is een eiwit in rauw eiwit dat zich bindt aan biotine (vitamine B7) en voorkomt
                dat het wordt opgenomen. Biotine is essentieel voor een gezonde huid, vacht en stofwisseling.
                Bij regelmatige consumptie van rauw eiwit kan biotinedeficiëntie optreden.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat zijn de symptomen van Salmonella bij honden?
              </h3>
              <p className="text-gray-700">
                Symptomen van Salmonella-infectie omvatten braken, diarree (soms met bloed), koorts,
                lethargie, verminderde eetlust en buikpijn. Symptomen verschijnen meestal binnen 6-72 uur
                na inname. Puppy's, oudere honden en honden met verzwakt immuunsysteem lopen het grootste
                risico.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Zijn gekookte eieren veilig voor honden?
              </h3>
              <p className="text-gray-700">
                Ja, gekookte eieren zijn een uitstekende, veilige eiwitbron voor honden. Koken doodt
                Salmonella en inactiveert avidine. Geef ze zonder zout, kruiden of boter. Een gekookt ei
                kan een gezonde traktatie zijn of aanvulling op het dieet van je hond.
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
              veterinair advies, diagnose of behandeling. Neem bij twijfel over de voeding of gezondheid
              van je hond altijd contact op met een gekwalificeerde dierenarts. Bij symptomen van
              voedselvergiftiging is professionele hulp noodzakelijk.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
