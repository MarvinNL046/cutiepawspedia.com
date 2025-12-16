import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Rauwe Vis Giftig voor Katten? | Symptomen & Wat Te Doen',
  description: 'Rauwe vis kan gevaarlijk zijn voor katten door thiaminase dat vitamine B1 vernietigt. Lees over risicos, symptomen en veilige alternatieven voor je kat.',
  keywords: 'rauwe vis katten, vis giftig voor katten, thiaminase katten, vitamine B1 tekort kat, kan kat rauwe vis eten',
  openGraph: {
    title: 'Is Rauwe Vis Giftig voor Katten? Thiaminase & Risicos',
    description: 'Rauwe vis bevat thiaminase dat vitamine B1 vernietigt bij katten. Ontdek de risicos en veilige alternatieven.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://cutiepawspedia.nl/nl/is-rauwe-vis-giftig-voor-katten',
    siteName: 'CutiePawsPedia',
  },
  alternates: {
    canonical: 'https://cutiepawspedia.nl/nl/is-rauwe-vis-giftig-voor-katten',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function IsRauweVisGiftigVoorKattenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Rauwe Vis Giftig voor Katten?',
    description: 'Uitgebreide informatie over de risicos van rauwe vis voor katten, thiaminase en vitamine B1 tekort.',
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
      '@id': 'https://cutiepawspedia.nl/nl/is-rauwe-vis-giftig-voor-katten',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom is rauwe vis slecht voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rauwe vis bevat thiaminase, een enzym dat vitamine B1 (thiamine) afbreekt. Bij regelmatige consumptie kan dit leiden tot vitamine B1-tekort, wat neurologische problemen en andere ernstige gezondheidsproblemen kan veroorzaken. Daarnaast kan rauwe vis bacteriën en parasieten bevatten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kunnen katten af en toe rauwe vis eten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Een heel klein stukje rauwe vis als zeldzame traktatie is meestal niet gevaarlijk, maar regelmatige consumptie moet je vermijden. Gekookte vis is een veel veiliger alternatief omdat koken thiaminase inactiveert en schadelijke bacteriën doodt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is thiaminase en waarom is het gevaarlijk?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Thiaminase is een enzym in rauwe vis dat vitamine B1 (thiamine) afbreekt. Katten hebben thiamine nodig voor hun zenuwstelsel en energiemetabolisme. Een tekort kan leiden tot anorexia, gewichtsverlies, neurologische symptomen en in ernstige gevallen zelfs de dood.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke vis bevat de meeste thiaminase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zoetwatervis zoals karper, brasem en haring bevatten hoge niveaus thiaminase. Ook bepaalde zeevissoorten zoals ansjovis, sardines en makreel bevatten thiaminase. Koken vernietigt dit enzym volledig.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat zijn de symptomen van vitamine B1-tekort bij katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen van thiaminetekort ontwikkelen zich geleidelijk en omvatten verminderde eetlust, gewichtsverlies, lethargie, verwarring, coördinatieproblemen, spierzwakte, aanvallen en in ernstige gevallen coma. Neem contact op met je dierenarts bij deze symptomen.',
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
          currentPage="Rauwe Vis voor Katten"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Rauwe Vis Giftig voor Katten?
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
                Laag tot middel gevaar - Vermijd regelmatig gebruik
              </h3>
              <p className="text-yellow-800 font-medium mb-2">
                Rauwe vis is niet acuut giftig, maar regelmatige consumptie kan vitamine B1-tekort veroorzaken.
              </p>
              <p className="text-yellow-700 text-sm">
                <strong>Advies:</strong> Een klein stukje als zeldzame traktatie is meestal niet gevaarlijk, maar geef je kat bij voorkeur gekookte vis. Bij regelmatige consumptie van rauwe vis, neem contact op met je dierenarts voor advies over voedingssupplementen.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Ondanks de populaire voorstelling dat katten dol zijn op vis, is rauwe vis niet het ideale
            voedsel voor je kat. Rauwe vis bevat thiaminase, een enzym dat vitamine B1 (thiamine) afbreekt,
            wat bij regelmatige consumptie kan leiden tot ernstige gezondheidsschade. Daarnaast brengt rauwe
            vis risicos met zich mee zoals bacteriële infecties en parasitaire besmettingen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom is Rauwe Vis Problematisch voor Katten?
          </h2>
          <p className="text-gray-700 mb-4">
            Het grootste probleem met rauwe vis is de aanwezigheid van thiaminase, een enzym dat vitamine B1
            (thiamine) afbreekt. Thiamine is essentieel voor het zenuwstelsel en energiemetabolisme van katten.
            Wanneer katten regelmatig rauwe vis eten, wordt hun thiamine afgebroken sneller dan het wordt
            aangevuld, wat kan leiden tot een tekort.
          </p>
          <p className="text-gray-700 mb-4">
            Niet alle vissoorten bevatten evenveel thiaminase. Zoetwatervis zoals karper, brasem en haring
            bevatten bijzonder hoge niveaus. Ook bepaalde zeevissoorten zoals ansjovis, sardines, makreel
            en sommige soorten tonijn bevatten thiaminase. Het goede nieuws is dat koken thiaminase volledig
            inactiveert, waardoor gekookte vis een veiliger optie is.
          </p>
          <p className="text-gray-700 mb-6">
            Naast thiaminase brengt rauwe vis andere risicos met zich mee. Rauwe vis kan schadelijke bacteriën
            bevatten zoals Salmonella en Listeria, evenals parasieten die infecties kunnen veroorzaken.
            Sommige vissoorten kunnen ook zware metalen zoals kwik bevatten, wat vooral problematisch is
            bij regelmatige consumptie. Ten slotte kunnen scherpe visgraten een verstikkingsgevaar vormen
            of inwendige verwondingen veroorzaken.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Vitamine B1-Tekort bij Katten
          </h2>
          <p className="text-gray-700 mb-4">
            Thiaminetekort (ook wel beriberi genoemd) ontwikkelt zich geleidelijk, meestal na weken tot
            maanden van regelmatige rauwe vis consumptie. De symptomen zijn aanvankelijk subtiel maar
            worden ernstiger naarmate het tekort vordert:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vroege Symptomen:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Verminderde eetlust en interesse in voedsel</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Gewichtsverlies ondanks voldoende voedsel</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Lethargie en verminderde activiteit</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Vergrote pupillen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Misselijkheid of braken</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Neurologische Symptomen (Gevorderd Tekort):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Coördinatieproblemen en wankelen (ataxie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Spierzwakte en trillingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Abnormale oogbewegingen (nystagmus)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Verwarring en desoriëntatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Aanvallen of stuiptrekkingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Kromming van de nek naar achteren (opisthotonos)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Coma in extreme gevallen</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat te Doen als je Kat Regelmatig Rauwe Vis Eet
          </h2>
          <p className="text-gray-700 mb-4">
            Als je kat regelmatig rauwe vis heeft gegeten of symptomen van thiaminetekort vertoont,
            neem dan deze stappen:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">1.</span>
                <span><strong>Stop met rauwe vis geven</strong> - Verwijder rauwe vis onmiddellijk uit het dieet van je kat</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">2.</span>
                <span><strong>Bel je dierenarts</strong> - Leg uit hoeveel en hoe lang je kat rauwe vis heeft gegeten. Beschrijf eventuele symptomen</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">3.</span>
                <span><strong>Monitor symptomen</strong> - Let op neurologische tekenen zoals coördinatieproblemen, spierzwakte of veranderingen in gedrag</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">4.</span>
                <span><strong>Volg veterinaire behandeling</strong> - Je dierenarts kan thiamine-supplementen voorschrijven of intraveneuze thiamine toedienen bij ernstige tekorten</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">5.</span>
                <span><strong>Aanpassen van het dieet</strong> - Schakel over naar volledig en gebalanceerd kattenvoer dat alle benodigde voedingsstoffen bevat</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">6.</span>
                <span><strong>Follow-up controles</strong> - Plan regelmatige controles om herstel te monitoren en ervoor te zorgen dat de vitamine B1-niveaus herstellen</span>
              </li>
            </ol>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded-r-lg">
            <p className="text-green-800 font-medium">
              <strong>💚 Goed nieuws:</strong> Thiaminetekort is meestal volledig omkeerbaar met tijdige
              behandeling. De meeste katten herstellen volledig binnen enkele dagen tot weken na het starten
              van thiamine-supplementatie.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Contact Opnemen met de Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem contact op met je dierenarts als:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat regelmatig (dagelijks of meerdere keren per week) rauwe vis eet</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat symptomen van vitamine B1-tekort vertoont (verminderde eetlust, gewichtsverlies, lethargie)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je neurologische symptomen ziet zoals coördinatieproblemen, spierzwakte of aanvallen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat braakt, diarree heeft of andere tekenen van bacteriële infectie vertoont na het eten van rauwe vis</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je advies wil over een evenwichtig dieet en veilige traktaties voor je kat</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veilige Alternatieven: Kan je Kat Vis Eten?
          </h2>
          <p className="text-gray-700 mb-4">
            Ja, katten kunnen vis eten, maar het moet op de juiste manier worden bereid en gegeven:
          </p>

          <div className="bg-emerald-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Veilige Manieren om Vis te Geven:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Gekookte vis zonder graten</strong> - Koken doodt thiaminase, bacteriën en parasieten. Verwijder altijd alle graten</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Geen kruiden of smaakmakers</strong> - Geef alleen pure vis zonder zout, knoflook, ui of andere kruiden</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Als occasionele traktatie</strong> - Vis moet niet het hoofdbestanddeel van het dieet zijn, maar een traktatie van 5-10% van de dagelijkse calorieën</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Veilige vissoorten</strong> - Zalm, kabeljauw, tilapia en forel zijn goede keuzes (goed gekookt en zonder graten)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Kattenvoer met vis</strong> - Commercieel kattenvoer met vis is geformuleerd om veilig en voedingsevenwichtig te zijn</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventie: Hoe Problemen met Vis Voorkomen?
          </h2>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Geef nooit rauwe vis als hoofdvoedsel</strong> - Beperk rauwe vis tot zeldzame, zeer kleine traktaties</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Kook vis altijd goed door</strong> - Dit elimineert thiaminase en doodt schadelijke micro-organismen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Verwijder alle graten</strong> - Visgraten kunnen verstikking of inwendige verwondingen veroorzaken</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Vermijd vissoorten met hoge kwikgehaltes</strong> - Tonijn, zwaardvis en haai bevatten meer kwik</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Gebruik gebalanceerd kattenvoer</strong> - Kies volledig kattenvoer als hoofddieet, niet alleen vis</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Wissel eiwitbronnen af</strong> - Geef verschillende eiwitbronnen zoals kip, kalkoen en rund naast vis</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Bewaar vis veilig</strong> - Voorkom dat je kat toegang heeft tot rauwe vis in de keuken of afvalbak</span>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-blue-800">
              <strong>💡 Tip:</strong> De mythe dat katten vis nodig hebben is niet waar. Katten zijn
              carnivoren die verschillende eiwitbronnen nodig hebben, maar vis is niet essentieel. Een
              evenwichtig kattenvoer voorziet in alle behoeften zonder de risicos van rauwe vis.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom is rauwe vis slecht voor katten?
              </h3>
              <p className="text-gray-700">
                Rauwe vis bevat thiaminase, een enzym dat vitamine B1 (thiamine) afbreekt. Bij regelmatige
                consumptie kan dit leiden tot vitamine B1-tekort, wat neurologische problemen en andere
                ernstige gezondheidsproblemen kan veroorzaken. Daarnaast kan rauwe vis bacteriën en
                parasieten bevatten.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kunnen katten af en toe rauwe vis eten?
              </h3>
              <p className="text-gray-700">
                Een heel klein stukje rauwe vis als zeldzame traktatie is meestal niet gevaarlijk, maar
                regelmatige consumptie moet je vermijden. Gekookte vis is een veel veiliger alternatief
                omdat koken thiaminase inactiveert en schadelijke bacteriën doodt.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat is thiaminase en waarom is het gevaarlijk?
              </h3>
              <p className="text-gray-700">
                Thiaminase is een enzym in rauwe vis dat vitamine B1 (thiamine) afbreekt. Katten hebben
                thiamine nodig voor hun zenuwstelsel en energiemetabolisme. Een tekort kan leiden tot
                anorexia, gewichtsverlies, neurologische symptomen en in ernstige gevallen zelfs de dood.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welke vis bevat de meeste thiaminase?
              </h3>
              <p className="text-gray-700">
                Zoetwatervis zoals karper, brasem en haring bevatten hoge niveaus thiaminase. Ook bepaalde
                zeevissoorten zoals ansjovis, sardines en makreel bevatten thiaminase. Koken vernietigt
                dit enzym volledig.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat zijn de symptomen van vitamine B1-tekort bij katten?
              </h3>
              <p className="text-gray-700">
                Symptomen van thiaminetekort ontwikkelen zich geleidelijk en omvatten verminderde eetlust,
                gewichtsverlies, lethargie, verwarring, coördinatieproblemen, spierzwakte, aanvallen en
                in ernstige gevallen coma. Neem contact op met je dierenarts bij deze symptomen.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-sm text-gray-600">
              Deze informatie is alleen bedoeld voor educatieve doeleinden en vervangt geen professioneel
              veterinair advies, diagnose of behandeling. Neem bij twijfel over de voeding of gezondheid
              van je kat altijd contact op met een gekwalificeerde dierenarts. Bij symptomen van
              vitamine B1-tekort is professionele hulp noodzakelijk.
            </p>
          </div>

          <div className="mt-8">
            <RelatedSafeFoods
              locale="nl"
              animal="katten"
              foods={commonSafeFoods}
              title="Veilige snack alternatieven"
            />
          </div>
        </div>
      </article>
    </>
  );
}
