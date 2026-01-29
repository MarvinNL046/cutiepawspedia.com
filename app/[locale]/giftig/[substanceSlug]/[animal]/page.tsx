import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSubstanceBySlug,
  getTypeInfo,
  getAnimalInfo,
  getToxicityLevelInfo,
  type AnimalType,
} from '@/lib/toxicity-data';

interface PageProps {
  params: Promise<{
    locale: string;
    substanceSlug: string;
    animal: string;
  }>;
}

// The 52 most important substance+animal combinations that should be indexed
// These are high-search-volume, dangerous substances
const INDEXED_COMBINATIONS = new Set([
  // High toxicity foods - DOGS (most searched)
  "chocolade-honden",
  "druiven-honden",
  "rozijnen-honden",
  "xylitol-honden",
  "ui-honden",
  "knoflook-honden",
  "avocado-honden",
  "macadamia-honden",
  "alcohol-honden",
  "koffie-honden",

  // High toxicity foods - CATS (most searched)
  "chocolade-katten",
  "ui-katten",
  "knoflook-katten",
  "druiven-katten",
  "rozijnen-katten",
  "alcohol-katten",
  "koffie-katten",
  "paracetamol-katten",

  // Dangerous plants - CATS
  "lelie-katten",
  "tijgerlelie-katten",
  "daglelie-katten",
  "azalea-katten",
  "oleander-katten",
  "sago-palm-katten",

  // Dangerous plants - DOGS
  "lelie-honden",
  "azalea-honden",
  "oleander-honden",
  "taxus-honden",
  "sago-palm-honden",
  "rhododendron-honden",

  // Household items - DOGS
  "rattengif-honden",
  "antivries-honden",
  "slakkenkorrels-honden",
  "ibuprofen-honden",
  "paracetamol-honden",

  // Household items - CATS
  "rattengif-katten",
  "antivries-katten",
  "tea-tree-olie-katten",
  "vlooienmiddel-hond-katten",
  "ibuprofen-katten",

  // Common houseplants
  "monstera-katten",
  "monstera-honden",
  "philodendron-katten",
  "philodendron-honden",
  "dieffenbachia-katten",
  "dieffenbachia-honden",
  "pothos-katten",
  "pothos-honden",

  // Other animals
  "chocolade-konijnen",
  "avocado-vogels",
  "teflon-vogels",
  "chocolade-vogels",
]);

/**
 * Check if this substance+animal combo should be indexed
 */
function shouldBeIndexed(substanceSlug: string, animal: string): boolean {
  return INDEXED_COMBINATIONS.has(`${substanceSlug}-${animal}`);
}

/**
 * Get symptoms based on substance type and toxicity level
 */
function getSymptoms(substanceType: string, toxicityLevel: string, animalType: string): { mild: string[], severe: string[] } {
  // General symptoms by toxicity type
  const symptomsByType: Record<string, { mild: string[], severe: string[] }> = {
    voedsel: {
      mild: [
        'Misselijkheid en speekselen',
        'Verminderde eetlust',
        'Lichte diarree',
        'Buikpijn of ongemak',
        'Onrustig gedrag',
      ],
      severe: [
        'Hevig braken (mogelijk met bloed)',
        'Ernstige diarree',
        'Trillen of beven',
        'Verhoogde hartslag',
        'Desoriëntatie of verwardheid',
        'Toevallen of stuipen',
        'Bewusteloosheid',
      ],
    },
    plant: {
      mild: [
        'Irritatie van mond en tong',
        'Overmatig speekselen',
        'Lichte zwelling van lippen of tong',
        'Verminderde eetlust',
        'Licht braken',
      ],
      severe: [
        'Moeite met slikken',
        'Ernstige zwelling van de luchtwegen',
        'Ademhalingsproblemen',
        'Hartritme stoornissen',
        'Nierfalen',
        'Leverfalen',
        'Coma',
      ],
    },
    medicijn: {
      mild: [
        'Sufheid of lethargie',
        'Verminderde eetlust',
        'Lichte maagklachten',
        'Coördinatieproblemen',
        'Overmatige dorst',
      ],
      severe: [
        'Ernstig braken',
        'Bloedarmoede (bleke tandvlees)',
        'Geelzucht (gele ogen/huid)',
        'Ademhalingsproblemen',
        'Nier- of leverfalen',
        'Toevallen',
        'Coma of overlijden',
      ],
    },
    huishouden: {
      mild: [
        'Irritatie van ogen of huid',
        'Speekselen',
        'Lichte hoest',
        'Misselijkheid',
        'Onrustig gedrag',
      ],
      severe: [
        'Brandwonden in mond of slokdarm',
        'Ernstige ademhalingsmoeilijkheden',
        'Bloedbraken',
        'Nierfalen',
        'Neurologische symptomen',
        'Shock',
      ],
    },
    chemisch: {
      mild: [
        'Huidirritatie',
        'Overmatig likken',
        'Lichte lethargie',
        'Speekselen',
        'Lichte maagklachten',
      ],
      severe: [
        'Ernstige brandwonden (huid of intern)',
        'Ademhalingsproblemen',
        'Bloedingen',
        'Orgaanfalen',
        'Neurologische schade',
        'Coma',
      ],
    },
  };

  return symptomsByType[substanceType] || symptomsByType.chemisch;
}

/**
 * Get prevention tips based on substance type
 */
function getPreventionTips(substanceType: string, substanceName: string, animalPlural: string): string[] {
  const tipsByType: Record<string, string[]> = {
    voedsel: [
      `Bewaar ${substanceName.toLowerCase()} altijd buiten bereik van je ${animalPlural.toLowerCase()}`,
      'Laat geen etensresten onbeheerd achter op tafel of aanrecht',
      'Informeer bezoekers over wat je huisdier niet mag eten',
      'Controleer ingrediëntenlijsten van producten die je deelt met je huisdier',
      'Houd vuilnisbakken goed afgesloten',
    ],
    plant: [
      `Verwijder ${substanceName.toLowerCase()} uit je huis en tuin, of plaats ze buiten bereik`,
      'Onderzoek nieuwe planten voordat je ze koopt op giftigheid voor huisdieren',
      'Overweeg veilige alternatieven zoals kattengras of huisdiervriendelijke planten',
      'Houd gevallen bladeren en bloemen direct op',
      'Let extra op tijdens feestdagen wanneer boeketten of planten binnenkomen',
    ],
    medicijn: [
      'Bewaar alle medicijnen in afgesloten kasten of laden',
      'Geef nooit menselijke medicijnen zonder overleg met de dierenarts',
      'Ruim gevallen pillen direct op',
      'Houd je medicijnvoorraad gescheiden van die van je huisdier',
      'Wees extra voorzichtig met pijnstillers en ontstekingsremmers',
    ],
    huishouden: [
      `Berg ${substanceName.toLowerCase()} op in afgesloten kasten`,
      'Gebruik huisdiervriendelijke alternatieven waar mogelijk',
      'Ventileer goed bij gebruik van chemische producten',
      'Laat je huisdier niet in ruimtes waar je schoonmaakt tot alles droog is',
      'Lees altijd de veiligheidsinstructies op producten',
    ],
    chemisch: [
      'Berg alle chemicaliën op in afgesloten ruimtes',
      'Controleer regelmatig op lekkages (bijv. antivries)',
      'Spoel gemorste vloeistoffen direct op met veel water',
      'Houd je huisdier weg bij garages en werkplaatsen',
      'Kies voor huisdierveilige producten waar mogelijk',
    ],
  };

  return tipsByType[substanceType] || tipsByType.chemisch;
}

/**
 * Get FAQ items for this substance-animal combination
 */
function getFAQItems(substanceName: string, animalSingular: string, animalPlural: string, toxicityLevel: string): Array<{ question: string; answer: string }> {
  const levelText = toxicityLevel === 'hoog' ? 'ernstig giftig' :
                    toxicityLevel === 'middel' ? 'giftig' :
                    toxicityLevel === 'laag' ? 'licht schadelijk' : 'mogelijk gevaarlijk';

  return [
    {
      question: `Wat moet ik doen als mijn ${animalSingular.toLowerCase()} ${substanceName.toLowerCase()} heeft gegeten?`,
      answer: `Neem bij vermoeden van inname direct contact op met je dierenarts. Probeer te achterhalen hoeveel je ${animalSingular.toLowerCase()} heeft binnengekregen en wanneer dit gebeurde. Laat je ${animalSingular.toLowerCase()} niet zelf braken tenzij de dierenarts dit adviseert.`,
    },
    {
      question: `Hoe snel treden symptomen op na inname van ${substanceName.toLowerCase()}?`,
      answer: `Symptomen kunnen variëren van enkele minuten tot meerdere uren na inname. De snelheid hangt af van de hoeveelheid, het gewicht van je ${animalSingular.toLowerCase()}, en individuele gevoeligheid. Wacht niet op symptomen voordat je contact opneemt met een dierenarts.`,
    },
    {
      question: `Is er een veilige hoeveelheid ${substanceName.toLowerCase()} voor ${animalPlural.toLowerCase()}?`,
      answer: `Wij adviseren om ${substanceName.toLowerCase()} volledig te vermijden bij ${animalPlural.toLowerCase()}. Er bestaat geen officieel vastgestelde veilige dosis, en individuele gevoeligheid kan sterk variëren. Neem bij twijfel altijd contact op met je dierenarts.`,
    },
    {
      question: `Kan mijn ${animalSingular.toLowerCase()} herstellen van ${substanceName.toLowerCase()} vergiftiging?`,
      answer: `Met snelle en adequate behandeling kunnen veel ${animalPlural.toLowerCase()} volledig herstellen. De prognose hangt af van de ingenomen hoeveelheid, de snelheid van behandeling, en de algehele gezondheid van je ${animalSingular.toLowerCase()}. Tijdig ingrijpen is essentieel.`,
    },
    {
      question: `Welke behandeling krijgt mijn ${animalSingular.toLowerCase()} bij de dierenarts?`,
      answer: `De behandeling hangt af van de situatie en kan bestaan uit het opwekken van braken, toediening van actieve kool, infuustherapie, en ondersteunende zorg. De dierenarts bepaalt de beste aanpak op basis van de specifieke omstandigheden.`,
    },
  ];
}

/**
 * Get why this substance is dangerous
 */
function getWhyDangerous(substanceName: string, substanceType: string, animalPlural: string, notes: string): string {
  // Some substances have specific compounds we know about
  const specificCompounds: Record<string, string> = {
    chocolade: 'theobromine en cafeïne, stoffen die het zenuwstelsel en hart beïnvloeden',
    koffie: 'cafeïne, een stimulerende stof die het zenuwstelsel overprikkelt',
    ui: 'thiosulfaat, een stof die rode bloedcellen beschadigt',
    knoflook: 'thiosulfaat en andere zwavelverbindingen die rode bloedcellen aantasten',
    druiven: 'een nog niet volledig geïdentificeerde toxine die nierschade kan veroorzaken',
    rozijnen: 'een geconcentreerde vorm van de toxines die ook in druiven voorkomen',
    xylitol: 'xylitol veroorzaakt een sterke insuline-afgifte die tot gevaarlijk lage bloedsuiker leidt',
    avocado: 'persine, een fungicide dat vooral schadelijk is voor bepaalde diersoorten',
    macadamia: 'een onbekende toxine die spierzwakte en neurologische symptomen veroorzaakt',
    paracetamol: 'paracetamol beschadigt de rode bloedcellen en de lever',
    ibuprofen: 'ibuprofen kan maagzweren, nierfalen en neurologische problemen veroorzaken',
    lelie: 'alle delen van lelies bevatten toxines die ernstige nierschade kunnen veroorzaken',
    antivries: 'ethyleenglycol, een zoet smakende maar zeer giftige stof die nierfalen veroorzaakt',
    rattengif: 'anticoagulantia die inwendige bloedingen veroorzaken',
  };

  const compound = specificCompounds[substanceName.toLowerCase()];

  if (compound) {
    return `${substanceName} bevat ${compound}. ${animalPlural} kunnen deze stoffen niet goed afbreken, waardoor ze zich ophopen in het lichaam en schade aanrichten aan vitale organen.`;
  }

  // Generic explanations by type
  const typeExplanations: Record<string, string> = {
    voedsel: `Het spijsverteringssysteem en de stofwisseling van ${animalPlural.toLowerCase()} werkt anders dan bij mensen. Bepaalde stoffen die voor ons onschadelijk zijn, kunnen bij ${animalPlural.toLowerCase()} niet goed worden afgebroken, waardoor giftige effecten optreden.`,
    plant: `${animalPlural} missen bepaalde enzymen om de natuurlijke verdedigingsstoffen in deze plant te neutraliseren. Bij inname kunnen deze stoffen schade aanrichten aan organen zoals de nieren, lever of het hart.`,
    medicijn: `De fysiologie van ${animalPlural.toLowerCase()} verschilt significant van die van mensen. Medicijnen die voor ons veilig zijn, kunnen bij ${animalPlural.toLowerCase()} in veel lagere doseringen al ernstige bijwerkingen veroorzaken.`,
    huishouden: `Deze huishoudelijke producten bevatten chemische stoffen die bij contact of inname schade kunnen aanrichten aan de luchtwegen, het spijsverteringsstelsel, of andere organen van ${animalPlural.toLowerCase()}.`,
    chemisch: `Chemische stoffen kunnen op meerdere manieren schadelijk zijn: door direct contact met huid of ogen, inademing van dampen, of inname. De effecten variëren van irritatie tot ernstige orgaanschade.`,
  };

  return notes || typeExplanations[substanceType] || typeExplanations.chemisch;
}

// Generate metadata with conditional index/noindex based on importance
// Enable ISR: return empty array so nothing is pre-built, but on-demand requests are cached
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, substanceSlug, animal } = await params;
  const substance = getSubstanceBySlug(substanceSlug);
  const animalInfo = getAnimalInfo(animal as AnimalType);

  if (!substance || !substance.animals.includes(animal)) {
    return { title: 'Niet gevonden' };
  }

  // Safe title format - no CAPS or alarm words
  const title = `Is ${substance.name} Giftig voor ${animalInfo.plural}? | Symptomen & Wat Te Doen`;

  // Safe description - professional tone, no panic
  const levelText = substance.toxicityLevel === 'hoog' ? 'zeer gevaarlijk' :
                    substance.toxicityLevel === 'middel' ? 'gevaarlijk' :
                    substance.toxicityLevel === 'laag' ? 'licht schadelijk' : 'mogelijk schadelijk';
  const description = `${substance.name} is ${levelText} voor ${animalInfo.plural.toLowerCase()}. Leer de symptomen herkennen en wat je moet doen bij vermoeden van inname. Veterinaire informatie van CutiePawsPedia.`;

  // 52 important pages get indexed, rest is noindex but dofollow
  const isImportant = shouldBeIndexed(substanceSlug, animal);

  return {
    title,
    description,
    robots: isImportant
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `Is ${substance.name} Giftig voor ${animalInfo.plural}?`,
      description,
      type: 'article',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
    alternates: {
      canonical: isImportant
        ? `https://cutiepawspedia.com/${locale}/is-${substanceSlug}-giftig-voor-${animal}`
        : `/${locale}/giftige-stoffen`,
    },
  };
}

export default async function ToxicityDetailPage({ params }: PageProps) {
  const { locale, substanceSlug, animal } = await params;
  const substance = getSubstanceBySlug(substanceSlug);
  const animalType = animal as AnimalType;

  // Validate substance exists and is toxic for this animal
  if (!substance || !substance.animals.includes(animal)) {
    notFound();
  }

  const typeInfo = getTypeInfo(substance.type);
  const animalInfo = getAnimalInfo(animalType);
  const levelInfo = getToxicityLevelInfo(substance.toxicityLevel);
  const symptoms = getSymptoms(substance.type, substance.toxicityLevel, animal);
  const preventionTips = getPreventionTips(substance.type, substance.name, animalInfo.plural);
  const faqItems = getFAQItems(substance.name, animalInfo.name, animalInfo.plural, substance.toxicityLevel);
  const whyDangerous = getWhyDangerous(substance.name, substance.type, animalInfo.plural, substance.notes);

  // Verdict text based on toxicity level - safe language, no CAPS or panic emojis
  const verdictText = substance.toxicityLevel === 'hoog'
    ? `Ja – ${substance.name} is ernstig giftig voor ${animalInfo.plural.toLowerCase()}`
    : substance.toxicityLevel === 'middel'
    ? `Voorzichtig – ${substance.name} kan schadelijk zijn voor ${animalInfo.plural.toLowerCase()}`
    : substance.toxicityLevel === 'laag'
    ? `Licht risico – ${substance.name} kan milde klachten veroorzaken bij ${animalInfo.plural.toLowerCase()}`
    : `Onbekend – De toxiciteit van ${substance.name} voor ${animalInfo.plural.toLowerCase()} is niet volledig bekend`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `Is ${substance.name} Giftig voor ${animalInfo.plural}?`,
            description: `Informatie over de giftigheid van ${substance.name} voor ${animalInfo.plural.toLowerCase()}, symptomen en wat te doen bij inname.`,
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.com/logo.png',
              },
            },
            datePublished: '2025-01-15',
            dateModified: '2025-12-16',
          }),
        }}
      />

      {/* JSON-LD Schema - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Hreflang tags */}
      <link rel="alternate" hrefLang="nl" href={`https://cutiepawspedia.com/nl/is-${substanceSlug}-giftig-voor-${animal}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://cutiepawspedia.com/nl/is-${substanceSlug}-giftig-voor-${animal}`} />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-emerald-700 mb-6" aria-label="Breadcrumb">
          <Link href={`/${locale}`} className="hover:underline">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/giftige-stoffen`} className="hover:underline">Giftige Stoffen</Link>
          <span>/</span>
          <Link href={`/${locale}/giftige-stoffen/${substance.type}`} className="hover:underline capitalize">
            {typeInfo.name}
          </Link>
          <span>/</span>
          <span className="text-gray-600">{substance.name}</span>
        </nav>

        {/* Header with Icons */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl" aria-hidden="true">{typeInfo.icon}</span>
            <span className="text-4xl" aria-hidden="true">{animalInfo.icon}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Is {substance.name} Giftig voor {animalInfo.plural}?
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="capitalize">{typeInfo.name}</span>
            <span>|</span>
            <span>{animalInfo.plural}</span>
            <span>|</span>
            <span className={`font-semibold ${levelInfo.color}`}>
              Toxiciteit: {levelInfo.name}
            </span>
          </div>
        </header>

        {/* TL;DR Verdict Box - Safe styling, no panic colors */}
        <section className={`${levelInfo.bgColor} border-l-4 ${levelInfo.borderColor} rounded-lg p-6 mb-10 shadow-md`} aria-labelledby="verdict-heading">
          <h2 id="verdict-heading" className="sr-only">Samenvatting</h2>
          <div className="flex items-start gap-4">
            <div className={`${levelInfo.borderColor.replace('border-', 'bg-')} text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl`} aria-hidden="true">
              {substance.toxicityLevel === 'hoog' ? '!' : substance.toxicityLevel === 'middel' ? '?' : 'i'}
            </div>
            <div>
              <p className={`text-xl font-bold ${levelInfo.color} mb-2`}>
                {verdictText}
              </p>
              <p className="text-gray-800 leading-relaxed">
                {substance.notes || `Bij inname of contact met ${substance.name.toLowerCase()} is het belangrijk om snel te handelen. Neem contact op met je dierenarts voor advies op maat.`}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-10 prose prose-emerald max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Als huisdiereigenaar is het belangrijk om te weten welke stoffen gevaarlijk kunnen zijn voor je {animalInfo.name.toLowerCase()}.
            {substance.name} is een {typeInfo.name.toLowerCase()} waar veel {animalInfo.plural.toLowerCase()} mee in aanraking kunnen komen.
            Op deze pagina lees je alles over de mogelijke risico&apos;s, symptomen waar je op moet letten, en wat je kunt doen als je {animalInfo.name.toLowerCase()} hiermee in contact is gekomen.
          </p>
        </section>

        {/* Why It Can Be Dangerous */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waarom {substance.name} Gevaarlijk Kan Zijn</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {whyDangerous}
            </p>
            <p className="text-gray-700 leading-relaxed">
              De ernst van de reactie hangt af van verschillende factoren, waaronder de hoeveelheid die is ingenomen,
              het gewicht en de leeftijd van je {animalInfo.name.toLowerCase()}, en eventuele onderliggende gezondheidsproblemen.
              Sommige {animalInfo.plural.toLowerCase()} kunnen gevoeliger zijn dan andere.
            </p>
          </div>
        </section>

        {/* Symptoms Section - Grouped by Severity */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Symptomen om op te Letten</h2>
          <p className="text-gray-600 mb-4">
            Symptomen kunnen variëren van mild tot ernstig en kunnen zich binnen enkele minuten tot uren na inname ontwikkelen.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Mild Symptoms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full" aria-hidden="true"></span>
                Milde Symptomen
              </h3>
              <ul className="space-y-2">
                {symptoms.mild.map((symptom, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1" aria-hidden="true">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Severe Symptoms */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true"></span>
                Ernstige Symptomen
              </h3>
              <ul className="space-y-2">
                {symptoms.severe.map((symptom, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-red-600 mt-1" aria-hidden="true">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What To Do If Ingested */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat Te Doen Bij Inname</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Blijf kalm en observeer</h3>
                  <p className="text-gray-700">Probeer vast te stellen hoeveel je {animalInfo.name.toLowerCase()} heeft ingenomen en wanneer dit gebeurde. Let op eventuele symptomen.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Neem contact op met je dierenarts</h3>
                  <p className="text-gray-700">Bel direct je dierenarts of de dierenambulance. Geef door wat er is ingenomen, hoeveel, en wanneer.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Laat niet braken zonder advies</h3>
                  <p className="text-gray-700">Laat je {animalInfo.name.toLowerCase()} niet braken tenzij de dierenarts dit expliciet adviseert. Bij sommige stoffen kan braken meer schade aanrichten.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Volg de instructies van de dierenarts</h3>
                  <p className="text-gray-700">De dierenarts kan adviseren om naar de praktijk te komen of thuismonitoring. Volg de instructies nauwkeurig op.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* When To Contact Veterinarian */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wanneer Direct naar de Dierenarts</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Neem altijd contact op met je dierenarts bij vermoeden van inname. Zoek direct veterinaire hulp als je {animalInfo.name.toLowerCase()}:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Ernstig of aanhoudend braakt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Moeite heeft met ademhalen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Stuipen of toevallen krijgt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Gedesoriënteerd of verward is
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Slap wordt of het bewustzijn verliest
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Bleke of blauwe tandvlees heeft
              </li>
            </ul>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Preventietips</h2>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Voorkomen is beter dan genezen. Met deze tips kun je het risico op contact met {substance.name.toLowerCase()} minimaliseren:
            </p>
            <ul className="space-y-2">
              {preventionTips.map((tip, index) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-emerald-600 mt-1" aria-hidden="true">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Veelgestelde Vragen</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="p-4 cursor-pointer font-semibold text-gray-900 hover:text-emerald-700 transition-colors list-none flex items-center justify-between">
                  {item.question}
                  <span className="ml-2 text-emerald-600 group-open:rotate-180 transition-transform" aria-hidden="true">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other Animals this affects */}
        {substance.animals.length > 1 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ook Relevant Voor</h2>
            <div className="flex flex-wrap gap-3">
              {substance.animals
                .filter(a => a !== animal)
                .map(otherAnimal => {
                  const otherInfo = getAnimalInfo(otherAnimal as AnimalType);
                  return (
                    <Link
                      key={otherAnimal}
                      href={`/${locale}/giftig/${substanceSlug}/${otherAnimal}`}
                      className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow flex items-center gap-2"
                    >
                      <span className="text-xl" aria-hidden="true">{otherInfo.icon}</span>
                      <span className="text-gray-900">{otherInfo.plural}</span>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* Emergency Contact */}
        <section className="mb-10 bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            Noodcontacten
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Je Eigen Dierenarts</h3>
              <p className="text-gray-600 text-sm">
                Bel altijd eerst je eigen dierenarts tijdens praktijkuren. Zij kennen de medische geschiedenis van je huisdier.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dierenambulance (24/7)</h3>
              <p className="text-gray-600 text-sm">
                Buiten kantooruren: zoek de dierenambulance of spoedkliniek in je regio. Bewaar dit nummer in je telefoon.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meer Informatie</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/${locale}/giftige-stoffen`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800">Alle Giftige Stoffen</h3>
              <p className="text-gray-600 text-sm">Compleet overzicht van gevaarlijke stoffen voor huisdieren</p>
            </Link>
            <Link
              href={`/${locale}/giftige-stoffen/${substance.type}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800">Alle {typeInfo.name}</h3>
              <p className="text-gray-600 text-sm">{typeInfo.description}</p>
            </Link>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Medische Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De informatie op deze pagina is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies,
            diagnose of behandeling. De inhoud is samengesteld op basis van algemeen beschikbare veterinaire kennis, maar elke
            situatie is uniek. Raadpleeg altijd een erkende dierenarts voor specifieke vragen over de gezondheid van je huisdier.
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            Bij vermoeden van vergiftiging dient altijd onmiddellijk contact te worden opgenomen met een dierenarts.
            Wacht niet op symptomen - snelle actie kan het verschil maken.
          </p>
        </section>
      </article>
    </div>
  );
}
