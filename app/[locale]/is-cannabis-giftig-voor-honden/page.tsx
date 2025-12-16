import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: 'Is Cannabis/THC Giftig voor Honden? Marijuanavergiftiging | CutiePawsPedia',
  description: 'Cannabis en THC zijn giftig voor honden en kunnen ernstige neurologische symptomen veroorzaken. Lees over THC-vergiftiging, symptomen en eerste hulp.',
  keywords: 'cannabis giftig honden, THC vergiftiging hond, marijuana hond, weed giftig voor honden, CBD hond veilig',
  openGraph: {
    title: 'Is Cannabis/THC Giftig voor Honden? Marijuanavergiftiging',
    description: 'Cannabis en THC zijn giftig voor honden. Ontdek symptomen, eerste hulp en het verschil tussen THC en CBD.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://cutiepawspedia.nl/nl/is-cannabis-giftig-voor-honden',
    siteName: 'CutiePawsPedia',
  },
  alternates: {
    canonical: 'https://cutiepawspedia.nl/nl/is-cannabis-giftig-voor-honden',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function IsCannabisGiftigVoorHondenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Cannabis/THC Giftig voor Honden?',
    description: 'Uitgebreide informatie over cannabisvergiftiging bij honden, THC-toxiciteit en eerste hulp.',
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
      '@id': 'https://cutiepawspedia.nl/nl/is-cannabis-giftig-voor-honden',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Waarom is cannabis giftig voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cannabis bevat THC (tetrahydrocannabinol), een psychoactieve stof die giftig is voor honden. Honden hebben meer cannabinoïdreceptoren in hun hersenen dan mensen, waardoor ze veel gevoeliger zijn voor THC. Zelfs kleine hoeveelheden kunnen ernstige neurologische symptomen veroorzaken.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat zijn de symptomen van cannabisvergiftiging bij honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen omvatten lethargie, coördinatieproblemen, vergrote pupillen, kwijlen, braken, lage hartslag, trillen, verwarring en in ernstige gevallen coma. Symptomen verschijnen meestal binnen 30-60 minuten na inname en kunnen 24-72 uur aanhouden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is CBD ook gevaarlijk voor honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CBD (cannabidiol) is veel minder toxisch dan THC en wordt soms therapeutisch gebruikt voor honden, maar alleen onder veterinair toezicht. Het probleem is dat veel CBD-producten sporen van THC bevatten. Gebruik nooit CBD-producten voor mensen bij honden zonder advies van een dierenarts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe lang duurt cannabisvergiftiging bij honden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Symptomen verschijnen meestal binnen 30-60 minuten na inname. Bij ingestie van cannabis kan de piek 2-4 uur later zijn. De effecten duren meestal 24-36 uur, maar kunnen tot 72 uur aanhouden, vooral bij inname van edibles of geconcentreerde producten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan een hond sterven aan cannabisvergiftiging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sterfte door cannabis alleen is zeldzaam, maar kan optreden bij zeer hoge doses of wanneer cannabis gecombineerd is met andere toxische stoffen (zoals chocolade in edibles). De meeste honden herstellen volledig met veterinaire zorg. Neem altijd contact op met je dierenarts bij vermoeden van vergiftiging.',
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
          currentPage="Cannabis voor Honden"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Is Cannabis/THC Giftig voor Honden?
        </h1>

        {/* TL;DR Verdict Box */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Middel tot hoog gevaar - Giftig voor honden
              </h3>
              <p className="text-orange-800 font-medium mb-2">
                Cannabis en THC zijn <strong>giftig</strong> voor honden en kunnen ernstige neurologische symptomen veroorzaken.
              </p>
              <p className="text-orange-700 text-sm">
                <strong>Actie:</strong> Neem onmiddellijk contact op met je dierenarts als je hond cannabis, marijuana, THC-edibles of CBD-producten heeft ingenomen. Hoewel sterfte zeldzaam is, is veterinaire zorg cruciaal voor veilig herstel.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Met de toenemende legalisering en gebruik van cannabis zijn gevallen van cannabisvergiftiging
            bij honden sterk gestegen. Cannabis bevat THC (tetrahydrocannabinol), een psychoactieve stof
            die giftig is voor honden. Door hun hogere concentratie cannabinoïdreceptoren in de hersenen
            zijn honden veel gevoeliger voor THC dan mensen. Zelfs kleine hoeveelheden kunnen ernstige
            symptomen veroorzaken.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Waarom is Cannabis Gevaarlijk voor Honden?
          </h2>
          <p className="text-gray-700 mb-4">
            De belangrijkste toxische component in cannabis is THC (delta-9-tetrahydrocannabinol). THC
            bindt aan cannabinoïdreceptoren in het centrale zenuwstelsel, wat bij honden leidt tot een
            reeks neurologische en fysiologische effecten. Honden hebben een veel hogere concentratie van
            deze receptoren in hun hersenen dan mensen, vooral in de cerebellum en stamhersenen.
          </p>
          <p className="text-gray-700 mb-4">
            Dit betekent dat honden:
          </p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Veel gevoeliger zijn voor THC dan mensen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Ernstiger symptomen ervaren bij lagere doses</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <span>Langer last hebben van de effecten (24-72 uur versus 4-6 uur bij mensen)</span>
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            Bronnen van cannabisvergiftiging bij honden omvatten: verse of gedroogde cannabis (wiet/marihuana),
            THC-edibles (brownies, koekjes, gummies), cannabisolie en concentraten, en hasjiesj. Edibles zijn
            bijzonder gevaarlijk omdat ze vaak andere toxische ingrediënten bevatten zoals chocolade, xylitol,
            rozijnen of knoflook, waardoor de vergiftiging ernstiger wordt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Symptomen van Cannabisvergiftiging bij Honden
          </h2>
          <p className="text-gray-700 mb-4">
            Symptomen verschijnen meestal binnen 30-60 minuten na inhalatie of 1-3 uur na het eten van
            cannabis. De ernst hangt af van de hoeveelheid THC en het gewicht van je hond:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Neurologische Symptomen:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Lethargie en extreme slaperigheid</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Coördinatieproblemen en wankelen (ataxie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Vergrote (gedilateerde) pupillen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Verwarring en desoriëntatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Overgevoeligheid voor geluiden en aanraking</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Trillen of spiertrekkingen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>In ernstige gevallen: aanvallen of coma</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Fysieke Symptomen:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Kwijlen en speekselen</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Braken (vooral kort na inname)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Urine-incontinentie (lekken van urine)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Lage hartslag (bradycardie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Lage lichaamstemperatuur (hypothermie)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Langzame of oppervlakkige ademhaling</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Klassiek "Stoner" Beeld bij Honden:</h3>
            <p className="text-gray-700 mb-2">
              Dierenartsen herkennen cannabisvergiftiging vaak aan de karakteristieke combinatie van:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Driepoot-houding</strong> - De hond staat breed en wankel als een driepoot</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Vergrote pupillen</strong> - Wijde, reactieloze pupillen</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Kwijlen</strong> - Overmatig speekselen</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span><strong>Urine-incontinentie</strong> - Onvrijwillig lekken van urine</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wat te Doen als je Hond Cannabis heeft Ingenomen
          </h2>
          <p className="text-gray-700 mb-4">
            Cannabisvergiftiging is een veterinair noodgeval. Volg deze stappen onmiddellijk:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">1.</span>
                <span><strong>Blijf kalm maar handel snel</strong> - Je hond voelt je stress aan, wat de situatie kan verergeren</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">2.</span>
                <span><strong>Bel onmiddellijk je dierenarts</strong> - Wees eerlijk over wat je hond heeft ingenomen. Dierenartsen oordelen niet en hebben deze informatie nodig voor de juiste behandeling</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">3.</span>
                <span><strong>Verzamel informatie</strong> - Probeer te achterhalen hoeveel cannabis je hond heeft gegeten en wanneer. Neem verpakkingen mee naar de dierenarts</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">4.</span>
                <span><strong>Niet braken opwekken</strong> - Probeer je hond NIET zelf te laten braken. Honden onder invloed van THC kunnen aspiratiepneumonie krijgen</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">5.</span>
                <span><strong>Houd je hond warm</strong> - Cannabis kan hypothermie veroorzaken. Gebruik dekens om je hond warm te houden</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">6.</span>
                <span><strong>Voorkom letsel</strong> - Zorg dat je hond in een veilige, rustige ruimte is waar hij niet van trappen kan vallen of zichzelf kan verwonden</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-700 mr-3">7.</span>
                <span><strong>Ga naar de dierenkliniek</strong> - Transport je hond veilig naar de kliniek. Laat iemand anders rijden als je alleen bent</span>
              </li>
            </ol>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <p className="text-red-800 font-medium">
              <strong>⚠️ Belangrijke Waarschuwing:</strong> Wees altijd eerlijk tegen je dierenarts over
              cannabisgebruik. Ze zijn er om je hond te helpen, niet om te oordelen. Zonder deze informatie
              kan verkeerde behandeling worden gegeven, wat gevaarlijk kan zijn voor je hond.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veterinaire Behandeling van Cannabisvergiftiging
          </h2>
          <p className="text-gray-700 mb-4">
            Er is geen specifiek tegengif voor THC-vergiftiging. De behandeling is ondersteunend en richt
            zich op het voorkomen van complicaties terwijl de hond het THC uit zijn systeem verwerkt:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Decontaminatie</strong> - Braken opwekken of maagspoeling binnen 1-2 uur na inname (alleen onder veterinair toezicht)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Actieve kool</strong> - Om verdere absorptie van THC te voorkomen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Intraveneuze vloeistoffen</strong> - Voor hydratatie en om THC sneller uit het systeem te spoelen</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Temperatuurregulatie</strong> - Verwarmingsdekens bij hypothermie</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Monitoring</strong> - Hartslag, ademhaling, bloeddruk en neurologische status</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Anti-misselijkheid medicatie</strong> - Bij aanhoudend braken</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span><strong>Observatie</strong> - Ziekenhuisopname voor 24-48 uur bij ernstige gevallen</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6">
            De meeste honden herstellen volledig binnen 24-72 uur met adequate veterinaire zorg. Ernstige
            complicaties of sterfte zijn zeldzaam maar kunnen optreden bij zeer hoge doses of wanneer
            cannabis is gecombineerd met andere toxische stoffen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            CBD versus THC: Wat is het Verschil?
          </h2>
          <p className="text-gray-700 mb-4">
            Er is veel verwarring over CBD (cannabidiol) en THC. Het is belangrijk om het verschil te kennen:
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">THC (Tetrahydrocannabinol):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Psychoactieve component van cannabis</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Veroorzaakt "high" gevoel bij mensen</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Giftig voor honden</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Kan ernstige neurologische symptomen veroorzaken</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">CBD (Cannabidiol):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Niet-psychoactieve component van cannabis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Veroorzaakt geen "high" gevoel</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Veel minder toxisch dan THC</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Wordt soms therapeutisch gebruikt voor honden (alleen onder veterinair toezicht)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Kan bijwerkingen hebben zoals slaperigheid, droge mond of lage bloeddruk</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
            <p className="text-yellow-800">
              <strong>⚠️ Let op:</strong> Veel CBD-producten bevatten sporen van THC. Gebruik nooit
              CBD-producten voor mensen bij honden zonder advies van een dierenarts. Als je CBD wilt
              gebruiken voor je hond, vraag dan om veterinaire CBD-producten die specifiek voor honden
              zijn geformuleerd en laboratorium-getest zijn op THC-gehalte.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Wanneer Onmiddellijk Contact Opnemen met de Dierenarts?
          </h2>
          <p className="text-gray-700 mb-4">
            Neem <strong>altijd onmiddellijk</strong> contact op met je dierenarts als:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond cannabis, marijuana, THC-edibles of CBD-producten heeft ingenomen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je vermoedt cannabisvergiftiging op basis van symptomen</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond neurologische symptomen vertoont (wankelen, verwarring, vergrote pupillen)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond braakt, kwijlt of urine lekt</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond aanvallen heeft of bewusteloos is</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span>Je hond edibles heeft gegeten die andere toxische ingrediënten bevatten (chocolade, xylitol, etc.)</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Preventie: Hoe Cannabisvergiftiging Voorkomen?
          </h2>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Bewaar cannabis veilig</strong> - Bewaar alle cannabisproducten in afgesloten containers op hoge plekken of in afgesloten kasten</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Nooit cannabis delen met je hond</strong> - Cannabis is niet "grappig" voor honden, maar gevaarlijk en stressvol</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Let op edibles</strong> - Edibles ruiken aantrekkelijk voor honden. Bewaar ze extra veilig</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Ruim morsen op</strong> - Ruim gemorste cannabis of as direct op</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Wees voorzichtig tijdens gebruik</strong> - Houd je hond uit de kamer tijdens cannabis gebruik</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Waarschuw bezoekers</strong> - Informeer gasten dat ze cannabis veilig moeten bewaren</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Let op tijdens wandelingen</strong> - Voorkom dat je hond verlaten joints of edibles van de grond eet</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">✓</span>
              <span><strong>Gebruik alleen veterinaire CBD</strong> - Als je CBD wilt gebruiken, gebruik dan alleen producten die door je dierenarts zijn aanbevolen</span>
            </li>
          </ul>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
            <p className="text-emerald-800">
              <strong>💡 Belangrijk:</strong> Cannabisvergiftiging is 100% vermijdbaar. Met goede
              opslag en voorzichtigheid kan je de veiligheid van je hond garanderen.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waarom is cannabis giftig voor honden?
              </h3>
              <p className="text-gray-700">
                Cannabis bevat THC (tetrahydrocannabinol), een psychoactieve stof die giftig is voor honden.
                Honden hebben meer cannabinoïdreceptoren in hun hersenen dan mensen, waardoor ze veel
                gevoeliger zijn voor THC. Zelfs kleine hoeveelheden kunnen ernstige neurologische symptomen
                veroorzaken.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wat zijn de symptomen van cannabisvergiftiging bij honden?
              </h3>
              <p className="text-gray-700">
                Symptomen omvatten lethargie, coördinatieproblemen, vergrote pupillen, kwijlen, braken,
                lage hartslag, trillen, verwarring en in ernstige gevallen coma. Symptomen verschijnen
                meestal binnen 30-60 minuten na inname en kunnen 24-72 uur aanhouden.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is CBD ook gevaarlijk voor honden?
              </h3>
              <p className="text-gray-700">
                CBD (cannabidiol) is veel minder toxisch dan THC en wordt soms therapeutisch gebruikt voor
                honden, maar alleen onder veterinair toezicht. Het probleem is dat veel CBD-producten sporen
                van THC bevatten. Gebruik nooit CBD-producten voor mensen bij honden zonder advies van een
                dierenarts.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoe lang duurt cannabisvergiftiging bij honden?
              </h3>
              <p className="text-gray-700">
                Symptomen verschijnen meestal binnen 30-60 minuten na inname. Bij ingestie van cannabis kan
                de piek 2-4 uur later zijn. De effecten duren meestal 24-36 uur, maar kunnen tot 72 uur
                aanhouden, vooral bij inname van edibles of geconcentreerde producten.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kan een hond sterven aan cannabisvergiftiging?
              </h3>
              <p className="text-gray-700">
                Sterfte door cannabis alleen is zeldzaam, maar kan optreden bij zeer hoge doses of wanneer
                cannabis gecombineerd is met andere toxische stoffen (zoals chocolade in edibles). De meeste
                honden herstellen volledig met veterinaire zorg. Neem altijd contact op met je dierenarts
                bij vermoeden van vergiftiging.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Medische Disclaimer</h3>
            <p className="text-sm text-gray-600">
              Deze informatie is alleen bedoeld voor educatieve doeleinden en vervangt geen professioneel
              veterinair advies, diagnose of behandeling. Neem bij vermoeden van cannabisvergiftiging
              altijd onmiddellijk contact op met een gekwalificeerde dierenarts. Wees eerlijk over
              cannabis gebruik - dierenartsen zijn er om je hond te helpen, niet om te oordelen.
            </p>
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
