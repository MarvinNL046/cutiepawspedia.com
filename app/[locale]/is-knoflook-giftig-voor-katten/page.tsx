import type { Metadata } from 'next';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Knoflook Giftig voor Katten? | Symptomen & Wat Te Doen',
  description: 'Knoflook is zeer giftig voor katten en kan ernstige bloedarmoede veroorzaken. Lees over symptomen, eerste hulp en waarom katten extra gevoelig zijn voor knoflook.',
  keywords: 'knoflook giftig katten, knoflook vergiftiging kat, knoflookvergiftiging symptomen, allium toxiciteit katten, kan kat knoflook eten',
  openGraph: {
    title: 'Is Knoflook Giftig voor Katten? Gevaren & Symptomen',
    description: 'Knoflook is zeer giftig voor katten en kan ernstige bloedarmoede veroorzaken. Ontdek waarom katten extra gevoelig zijn.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://cutiepawspedia.nl/nl/is-knoflook-giftig-voor-katten',
    siteName: 'CutiePawsPedia',
  },
  alternates: {
    canonical: 'https://cutiepawspedia.nl/nl/is-knoflook-giftig-voor-katten',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function IsKnoflookGiftigVoorKattenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Knoflook Giftig voor Katten?',
    description: 'Uitgebreide informatie over knoflookvergiftiging bij katten, symptomen en eerste hulp.',
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
      '@id': 'https://cutiepawspedia.nl/nl/is-knoflook-giftig-voor-katten',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom is knoflook giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Knoflook bevat organische zwavelstoffen (thiosulfaten) die de rode bloedcellen van katten beschadigen. Katten zijn extra gevoelig omdat ze minder effectieve enzymen hebben om deze stoffen af te breken, wat kan leiden tot hemolytische anemie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoeveel knoflook is gevaarlijk voor een kat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zelfs kleine hoeveelheden knoflook kunnen gevaarlijk zijn voor katten. Al een klein teentje kan symptomen veroorzaken. Neem altijd contact op met je dierenarts als je kat knoflook heeft gegeten, ongeacht de hoeveelheid.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is knoflookpoeder ook giftig voor katten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, knoflookpoeder is zelfs geconcentreerder dan verse knoflook en daarom extra gevaarlijk. Hetzelfde geldt voor knoflookolie, knoflookzout en alle andere vormen van knoflook.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel verschijnen symptomen na knoflookvergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen kunnen 1-5 dagen na inname verschijnen. Eerste tekenen zijn vaak braken en diarree, gevolgd door lethargie. Ernstige symptomen zoals bloedarmoede ontwikkelen zich meestal na meerdere dagen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kunnen katten genezen van knoflookvergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bij tijdige veterinaire behandeling kunnen katten volledig herstellen van knoflookvergiftiging. De prognose hangt af van de ingenomen hoeveelheid en hoe snel behandeling wordt gestart. Laat knoflookvergiftiging nooit onbehandeld.',
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
          currentPage="Knoflook voor Katten"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Knoflook Giftig voor Katten?
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
                Hoog gevaar - Zeer giftig
              </h3>
              <p className="text-red-800 font-medium mb-2">
                Knoflook is zeer giftig voor katten en kan levensbedreigende bloedarmoede veroorzaken.
              </p>
              <p className="text-red-700 text-sm">
                <strong>Actie:</strong> Neem onmiddellijk contact op met je dierenarts als je kat knoflook heeft gegeten. Katten zijn extra gevoelig voor de toxische stoffen in knoflook - zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Knoflook behoort tot de Allium-familie en is een van de gevaarlijkste voedingsmiddelen voor katten.
            Terwijl mensen knoflook gebruiken voor smaak en mogelijke gezondheidsvoordelen, kan het bij katten
            ernstige vergiftiging veroorzaken die tot bloedarmoede en orgaanschade kan leiden. Katten zijn
            bijzonder gevoelig voor de toxische stoffen in knoflook, zelfs gevoeliger dan honden.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom is Knoflook Gevaarlijk voor Katten?
          </h2>
          <p className="text-gray-700 mb-4">
            Knoflook bevat organische zwavelstoffen, vooral thiosulfaten en allicine, die zeer giftig zijn
            voor katten. Deze stoffen beschadigen de rode bloedcellen en veroorzaken oxidatieve schade aan het
            hemoglobine, waardoor de bloedcellen niet meer in staat zijn zuurstof te vervoeren.
          </p>
          <p className="text-gray-700 mb-4">
            Katten hebben een uniek enzym genaamd glucose-6-fosfaatdehydrogenase (G6PD) in hun rode bloedcellen,
            maar dit enzym maakt ze juist extra kwetsbaar voor oxidatieve schade door knoflook. Bovendien hebben
            katten minder effectieve mechanismen om de toxische metabolieten van knoflook af te breken dan honden
            of mensen.
          </p>
          <p className="text-gray-700 mb-6">
            Het resultaat is hemolytische anemie - een toestand waarbij rode bloedcellen sneller worden afgebroken
            dan ze kunnen worden aangemaakt. Dit kan leiden tot ernstige bloedarmoede, orgaanschade en in
            extreme gevallen zelfs de dood. Alle vormen van knoflook zijn giftig: verse knoflook, knoflookpoeder,
            knoflookolie, knoflookzout en zelfs knoflookhoudende kruiden en supplementen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Knoflookvergiftiging bij Katten
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen kunnen 1-5 dagen na inname verschijnen. De ernst hangt af van de hoeveelheid knoflook
            die is geconsumeerd en de grootte van je kat. Let op deze tekenen:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vroege Symptomen (1-2 dagen):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Braken en misselijkheid</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Diarree, soms met bloed</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Verminderde eetlust</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Kwijlen of speekselen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Pijn in de buik</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ernstige Symptomen (2-5 dagen):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Lethargie en extreme vermoeidheid</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Bleke of geelachtige tandvlees (geelzucht)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Snelle hartslag en ademhaling</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Zwakte en wankelen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Donkere of rode urine (hemoglobinurie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Verminderde bewustzijnsniveau</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Collaps of bewusteloosheid</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat te Doen als je Kat Knoflook heeft Gegeten
          </h2>
          <p className="text-gray-700 mb-4">
            Knoflookvergiftiging is een medisch noodgeval dat onmiddellijke veterinaire aandacht vereist.
            Volg deze stappen:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">1.</span>
                <span><strong>Verwijder je kat van de knoflook</strong> - Zorg dat je kat geen toegang meer heeft tot knoflook of knoflookhoudende producten</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">2.</span>
                <span><strong>Bel onmiddellijk je dierenarts</strong> - Zelfs als je kat nog geen symptomen vertoont. Leg uit hoeveel knoflook je kat heeft gegeten en wanneer</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">3.</span>
                <span><strong>Niet braken opwekken</strong> - Probeer je kat niet zelf te laten braken tenzij je dierenarts dit adviseert</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">4.</span>
                <span><strong>Bewaar bewijsmateriaal</strong> - Neem de verpakking of resten van het product mee naar de kliniek</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">5.</span>
                <span><strong>Monitor je kat nauwlettend</strong> - Let op veranderingen in gedrag, ademhaling en tandvleeskleur tijdens transport</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">6.</span>
                <span><strong>Ga naar de dierenkliniek</strong> - Snelle actie verbetert de behandelkansen aanzienlijk</span>
              </li>
            </ol>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <p className="text-red-800 font-medium">
              <strong>Waarschuwing:</strong> Probeer je kat niet zelf te behandelen met huismiddeltjes.
              Knoflookvergiftiging vereist professionele veterinaire zorg. Snelle behandeling verbetert de overlevingskansen aanzienlijk.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Direct Contact Opnemen met de Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>altijd onmiddellijk</strong> contact op met je dierenarts als:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat knoflook heeft gegeten, ongeacht de hoeveelheid</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je vermoedt dat je kat toegang heeft gehad tot knoflookhoudende producten</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat symptomen vertoont van vergiftiging (braken, lethargie, bleke tandvlees)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>De urine van je kat donker of rood gekleurd is</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je kat zwak, duizelig of verward lijkt</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
            <p className="text-yellow-800">
              <strong>💡 Let op:</strong> Symptomen kunnen vertraagd optreden (1-5 dagen na inname).
              Wacht niet tot symptomen verschijnen - vroege behandeling is cruciaal voor een goede prognose.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventie: Hoe Knoflookvergiftiging Voorkomen?
          </h2>
          <p className="text-gray-700 mb-4">
            De beste manier om knoflookvergiftiging te voorkomen is door knoflook volledig uit de buurt
            van je kat te houden:
          </p>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Bewaar knoflook veilig</strong> - Bewaar verse knoflook, knoflookpoeder en knoflookhoudende producten in afgesloten kasten waar je kat niet bij kan</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Let op tijdens koken</strong> - Zorg dat je kat niet in de keuken komt tijdens het koken met knoflook. Ruim morsen direct op</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Check ingrediënten</strong> - Lees labels van menselijk voedsel en geef je kat nooit producten die knoflook bevatten (sauzen, marinades, kant-en-klaar maaltijden)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Geen tafelresten</strong> - Geef je kat geen tafelresten die knoflook kunnen bevatten, zelfs niet in kleine hoeveelheden</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Waarschuw bezoekers</strong> - Informeer gasten dat ze je kat geen menselijk voedsel mogen geven</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Let op kruiden en supplementen</strong> - Veel kruiden, sauzen en zelfs supplementen bevatten knoflook. Controleer dit altijd</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Veilig afval</strong> - Gooi knoflookafval in een afgesloten vuilnisbak waar je kat niet bij kan</span>
            </li>
          </ul>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
            <p className="text-emerald-800">
              <strong>🌟 Belangrijk:</strong> Er is geen "veilige" hoeveelheid knoflook voor katten.
              Zelfs kleine hoeveelheden kunnen giftig zijn. Houd knoflook altijd volledig gescheiden van je kat.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom is knoflook giftig voor katten?
              </h3>
              <p className="text-gray-700">
                Knoflook bevat organische zwavelstoffen (thiosulfaten) die de rode bloedcellen van katten
                beschadigen. Katten zijn extra gevoelig omdat ze minder effectieve enzymen hebben om deze
                stoffen af te breken, wat kan leiden tot hemolytische anemie.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoeveel knoflook is gevaarlijk voor een kat?
              </h3>
              <p className="text-gray-700">
                Zelfs kleine hoeveelheden knoflook kunnen gevaarlijk zijn voor katten. Al een klein teentje
                kan symptomen veroorzaken. Neem altijd contact op met je dierenarts als je kat knoflook heeft
                gegeten, ongeacht de hoeveelheid.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is knoflookpoeder ook giftig voor katten?
              </h3>
              <p className="text-gray-700">
                Ja, knoflookpoeder is zelfs geconcentreerder dan verse knoflook en daarom extra gevaarlijk.
                Hetzelfde geldt voor knoflookolie, knoflookzout en alle andere vormen van knoflook.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe snel verschijnen symptomen na knoflookvergiftiging?
              </h3>
              <p className="text-gray-700">
                Symptomen kunnen 1-5 dagen na inname verschijnen. Eerste tekenen zijn vaak braken en diarree,
                gevolgd door lethargie. Ernstige symptomen zoals bloedarmoede ontwikkelen zich meestal na
                meerdere dagen.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kunnen katten genezen van knoflookvergiftiging?
              </h3>
              <p className="text-gray-700">
                Bij tijdige veterinaire behandeling kunnen katten volledig herstellen van knoflookvergiftiging.
                De prognose hangt af van de ingenomen hoeveelheid en hoe snel behandeling wordt gestart.
                Laat knoflookvergiftiging nooit onbehandeld.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-sm text-gray-600">
              Deze informatie is alleen bedoeld voor educatieve doeleinden en vervangt geen professioneel
              veterinair advies, diagnose of behandeling. Neem bij twijfel over de gezondheid van je kat
              altijd contact op met een gekwalificeerde dierenarts. Bij vergiftiging is snelle professionele
              hulp essentieel.
            </p>
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
