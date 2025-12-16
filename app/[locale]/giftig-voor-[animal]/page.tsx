import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSubstancesForAnimal,
  getTypeInfo,
  getAnimalInfo,
  getToxicityLevelInfo,
  type ToxicSubstance,
  type AnimalType,
} from '@/lib/toxicity-data';

interface PageProps {
  params: Promise<{
    locale: string;
    animal: string;
  }>;
}

const validAnimals: AnimalType[] = ['honden', 'katten', 'konijnen', 'vogels', 'knaagdieren'];

// Generate static params for all animals
export async function generateStaticParams() {
  return validAnimals.map(animal => ({ animal }));
}

// Generate metadata - INDEX, FOLLOW for hub pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, animal } = await params;

  if (!validAnimals.includes(animal as AnimalType)) {
    return { title: 'Niet gevonden' };
  }

  const animalInfo = getAnimalInfo(animal as AnimalType);
  const substances = getSubstancesForAnimal(animal as AnimalType);

  const title = `Giftige Stoffen voor ${animalInfo.plural} | ${substances.length} Gevaarlijke Stoffen | CutiePawsPedia`;
  const description = `Compleet overzicht van ${substances.length} giftige stoffen voor ${animalInfo.plural.toLowerCase()}. Ontdek welke voedingsmiddelen, planten, medicijnen en huishoudelijke producten gevaarlijk zijn.`;

  return {
    title,
    description,
    // INDEX, FOLLOW - Hub pages should rank
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Giftige Stoffen voor ${animalInfo.plural}`,
      description,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function ToxicityAnimalPage({ params }: PageProps) {
  const { locale, animal } = await params;

  if (!validAnimals.includes(animal as AnimalType)) {
    notFound();
  }

  const animalType = animal as AnimalType;
  const animalInfo = getAnimalInfo(animalType);
  const substances = getSubstancesForAnimal(animalType);

  // Group by type
  const groupedByType: Record<string, ToxicSubstance[]> = {};
  substances.forEach(s => {
    if (!groupedByType[s.type]) {
      groupedByType[s.type] = [];
    }
    groupedByType[s.type].push(s);
  });

  // Sort each group by toxicity level
  Object.values(groupedByType).forEach(group => {
    group.sort((a, b) => {
      const levelOrder = { hoog: 0, middel: 1, laag: 2, onbekend: 3 };
      if (levelOrder[a.toxicityLevel] !== levelOrder[b.toxicityLevel]) {
        return levelOrder[a.toxicityLevel] - levelOrder[b.toxicityLevel];
      }
      return a.name.localeCompare(b.name);
    });
  });

  // Stats
  const hoogCount = substances.filter(s => s.toxicityLevel === 'hoog').length;
  const middelCount = substances.filter(s => s.toxicityLevel === 'middel').length;
  const laagCount = substances.filter(s => s.toxicityLevel === 'laag').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Giftige Stoffen voor ${animalInfo.plural}`,
            description: `Overzicht van ${substances.length} giftige stoffen voor ${animalInfo.plural.toLowerCase()}.`,
            numberOfItems: substances.length,
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
          }),
        }}
      />

      <article className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-emerald-700 mb-6">
          <Link href={`/${locale}`} className="hover:underline">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/giftige-stoffen`} className="hover:underline">Giftige Stoffen</Link>
          <span>/</span>
          <span className="text-gray-600">{animalInfo.plural}</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="text-6xl mb-4">{animalInfo.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giftige Stoffen voor {animalInfo.plural}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Hier vind je {substances.length} stoffen die gevaarlijk kunnen zijn voor je {animalInfo.name.toLowerCase()}.
            Van voedsel tot planten, medicijnen tot huishoudelijke producten.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-emerald-600">{substances.length}</div>
              <div className="text-sm text-gray-600">Totaal</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-red-600">{hoogCount}</div>
              <div className="text-sm text-gray-600">Hoog risico</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-orange-600">{middelCount}</div>
              <div className="text-sm text-gray-600">Middel risico</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-yellow-600">{laagCount}</div>
              <div className="text-sm text-gray-600">Laag risico</div>
            </div>
          </div>
        </header>

        {/* Warning Box */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">!</div>
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">Belangrijke Waarschuwing</h2>
              <p className="text-gray-800 leading-relaxed">
                Heeft je {animalInfo.name.toLowerCase()} iets gevaarlijks gegeten? <strong>Neem direct contact op met je dierenarts of de dierennoodhulp</strong>.
                Wacht niet tot symptomen erger worden.
              </p>
            </div>
          </div>
        </div>

        {/* Grouped by Type */}
        {Object.entries(groupedByType)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([type, items]) => {
            const typeInfo = getTypeInfo(type as ToxicSubstance['type']);
            return (
              <section key={type} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{typeInfo.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{typeInfo.name}</h2>
                    <p className="text-gray-600">{items.length} stoffen - {typeInfo.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((substance) => {
                    const levelInfo = getToxicityLevelInfo(substance.toxicityLevel);

                    return (
                      <Link
                        key={substance.slug}
                        href={`/${locale}/giftig/${substance.slug}/${animal}`}
                        className={`block border-l-4 ${levelInfo.borderColor} ${levelInfo.bgColor} rounded-lg shadow-md hover:shadow-lg transition-all p-4`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {substance.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {substance.notes || `Kan gevaarlijk zijn voor ${animalInfo.plural.toLowerCase()}`}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${levelInfo.color} ${levelInfo.bgColor} border ${levelInfo.borderColor}`}>
                            {levelInfo.name.toUpperCase()}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

        {/* Other Animals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Andere Huisdieren</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {validAnimals
              .filter(a => a !== animal)
              .map(otherAnimal => {
                const info = getAnimalInfo(otherAnimal);
                const count = getSubstancesForAnimal(otherAnimal).length;
                return (
                  <Link
                    key={otherAnimal}
                    href={`/${locale}/giftig-voor-${otherAnimal}`}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-3xl mb-2">{info.icon}</div>
                    <h3 className="font-semibold text-gray-900">{info.plural}</h3>
                    <p className="text-sm text-gray-600">{count} giftige stoffen</p>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Noodcontacten</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Je Eigen Dierenarts</h3>
              <p className="text-gray-600 text-sm">Bel altijd eerst je eigen dierenarts tijdens praktijkuren.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dierennoodhulp (24/7)</h3>
              <p className="text-gray-600 text-sm">Buiten kantooruren: dierennoodhulp in je regio.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
