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

// Dynamic rendering - reduces build size significantly

// Generate metadata with conditional index/noindex based on importance
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, substanceSlug, animal } = await params;
  const substance = getSubstanceBySlug(substanceSlug);
  const animalInfo = getAnimalInfo(animal as AnimalType);

  if (!substance || !substance.animals.includes(animal)) {
    return { title: 'Niet gevonden' };
  }

  const title = `Is ${substance.name} Giftig voor ${animalInfo.plural}? | CutiePawsPedia`;
  const description = `${substance.name} en ${animalInfo.plural.toLowerCase()}: toxiciteitsniveau ${substance.toxicityLevel}. ${substance.notes || 'Leer de risicos en wat te doen.'}`;

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
      // Use SEO-friendly canonical URL for important pages
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `Is ${substance.name} Giftig voor ${animalInfo.plural}?`,
            description: `Informatie over de giftigheid van ${substance.name} voor ${animalInfo.plural.toLowerCase()}.`,
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
          }),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-emerald-700 mb-6">
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

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{typeInfo.icon}</span>
            <span className="text-4xl">{animalInfo.icon}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Is {substance.name} Giftig voor {animalInfo.plural}?
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="capitalize">{typeInfo.name}</span>
            <span>|</span>
            <span>{animalInfo.plural}</span>
            <span>|</span>
            <span className={`font-semibold ${levelInfo.color}`}>
              Toxiciteit: {levelInfo.name}
            </span>
          </div>
        </header>

        {/* Verdict Box */}
        <div className={`${levelInfo.bgColor} border-l-4 ${levelInfo.borderColor} rounded-lg p-6 mb-8 shadow-md`}>
          <div className="flex items-start gap-4">
            <div className={`${levelInfo.borderColor.replace('border-', 'bg-')} text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold`}>
              !
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${levelInfo.color} mb-2`}>
                {substance.toxicityLevel === 'hoog' && `Ja - ${substance.name} is zeer giftig voor ${animalInfo.plural.toLowerCase()}`}
                {substance.toxicityLevel === 'middel' && `Let op - ${substance.name} is giftig voor ${animalInfo.plural.toLowerCase()}`}
                {substance.toxicityLevel === 'laag' && `Voorzichtig - ${substance.name} kan klachten geven bij ${animalInfo.plural.toLowerCase()}`}
                {substance.toxicityLevel === 'onbekend' && `Onbekend - Wees voorzichtig met ${substance.name} bij ${animalInfo.plural.toLowerCase()}`}
              </h2>
              <p className="text-gray-800 leading-relaxed">
                {substance.notes || `${substance.name} kan schadelijk zijn voor ${animalInfo.plural.toLowerCase()}. Neem bij twijfel altijd contact op met je dierenarts.`}
              </p>
              <p className="text-gray-700 mt-2 font-medium">
                Bij inname of contact: neem direct contact op met je dierenarts of de dierennoodhulp.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Snelle Informatie</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Categorie</h3>
              <p className="text-gray-600">{typeInfo.icon} {typeInfo.name}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Dier</h3>
              <p className="text-gray-600">{animalInfo.icon} {animalInfo.plural}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Toxiciteit</h3>
              <p className={levelInfo.color}>{levelInfo.name}</p>
            </div>
          </div>
        </section>

        {/* Toxicity Level Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat Betekent Dit?</h2>
          <div className={`${levelInfo.bgColor} border ${levelInfo.borderColor} rounded-lg p-6`}>
            <p className="text-gray-800 leading-relaxed">
              <strong className={levelInfo.color}>Toxiciteitsniveau {levelInfo.name}:</strong>{' '}
              {levelInfo.description}
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat Te Doen Bij Inname?</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Blijf kalm</h3>
                  <p className="text-gray-700">Probeer vast te stellen hoeveel je {animalInfo.name.toLowerCase()} heeft ingenomen.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Bel je dierenarts</h3>
                  <p className="text-gray-700">Neem direct contact op met je dierenarts of de dierennoodhulp.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Volg instructies op</h3>
                  <p className="text-gray-700">Laat je dier niet braken tenzij de dierenarts dit adviseert.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Other Animals */}
        {substance.animals.length > 1 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ook Giftig Voor</h2>
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
                      <span className="text-xl">{otherInfo.icon}</span>
                      <span className="text-gray-900">{otherInfo.plural}</span>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* Emergency Contact */}
        <section className="mb-12 bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
            Noodcontacten
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Je Eigen Dierenarts</h3>
              <p className="text-gray-600 text-sm">
                Bel altijd eerst je eigen dierenarts tijdens praktijkuren.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dierennoodhulp (24/7)</h3>
              <p className="text-gray-600 text-sm">
                Buiten kantooruren: dierennoodhulp in je regio.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meer Informatie</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/${locale}/giftige-stoffen`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-emerald-800">Alle Giftige Stoffen</h3>
              <p className="text-gray-600 text-sm">Compleet overzicht van gevaarlijke stoffen</p>
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
            De informatie op deze pagina is alleen bedoeld voor educatieve doeleinden en vervangt geen
            professioneel veterinair advies, diagnose of behandeling. Raadpleeg altijd een erkende dierenarts
            voor specifieke vragen over de gezondheid van je huisdier.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Bij spoedeisende situaties moet je altijd direct contact opnemen met je dierenarts of de dierennoodhulp.</strong>
          </p>
        </section>
      </article>
    </div>
  );
}
