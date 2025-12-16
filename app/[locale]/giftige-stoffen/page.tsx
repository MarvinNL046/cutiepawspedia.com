'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState, useMemo } from 'react';

// Comprehensive list of all toxic substances from pet-toxicity-substances.json
const substances = [
  // Voedsel - Honden
  { id: 1, slug: 'chocolade', name: 'Chocolade', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '🍫' },
  { id: 2, slug: 'druiven', name: 'Druiven', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '🍇' },
  { id: 3, slug: 'rozijnen', name: 'Rozijnen', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '🍇' },
  { id: 4, slug: 'xylitol', name: 'Xylitol', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '🍬' },
  { id: 5, slug: 'ui', name: 'Ui', animal: 'honden', type: 'voedsel', level: 'middel', icon: '🧅' },
  { id: 6, slug: 'knoflook', name: 'Knoflook', animal: 'honden', type: 'voedsel', level: 'middel', icon: '🧄' },
  { id: 7, slug: 'avocado', name: 'Avocado', animal: 'honden', type: 'voedsel', level: 'laag', icon: '🥑' },
  { id: 8, slug: 'macadamia-noten', name: 'Macadamia Noten', animal: 'honden', type: 'voedsel', level: 'middel', icon: '🥜' },
  { id: 9, slug: 'alcohol', name: 'Alcohol', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '🍺' },
  { id: 10, slug: 'cafeine', name: 'Cafeïne', animal: 'honden', type: 'voedsel', level: 'hoog', icon: '☕' },
  { id: 44, slug: 'rauwe-eieren', name: 'Rauwe Eieren', animal: 'honden', type: 'voedsel', level: 'laag', icon: '🥚' },

  // Voedsel - Katten
  { id: 41, slug: 'ui', name: 'Ui', animal: 'katten', type: 'voedsel', level: 'hoog', icon: '🧅' },
  { id: 42, slug: 'knoflook', name: 'Knoflook', animal: 'katten', type: 'voedsel', level: 'hoog', icon: '🧄' },
  { id: 43, slug: 'rauwe-vis', name: 'Rauwe Vis', animal: 'katten', type: 'voedsel', level: 'laag', icon: '🐟' },
  { id: 48, slug: 'chocolade', name: 'Chocolade', animal: 'katten', type: 'voedsel', level: 'middel', icon: '🍫' },

  // Planten - Honden
  { id: 13, slug: 'azalea', name: 'Azalea', animal: 'honden', type: 'plant', level: 'hoog', icon: '🌸' },
  { id: 14, slug: 'oleander', name: 'Oleander', animal: 'honden', type: 'plant', level: 'hoog', icon: '🌺' },
  { id: 19, slug: 'narcis', name: 'Narcis', animal: 'honden', type: 'plant', level: 'middel', icon: '🌼' },
  { id: 20, slug: 'hyacint', name: 'Hyacint', animal: 'honden', type: 'plant', level: 'middel', icon: '🌷' },
  { id: 46, slug: 'paddenstoelen', name: 'Paddenstoelen', animal: 'honden', type: 'plant', level: 'hoog', icon: '🍄' },
  { id: 47, slug: 'blauwgroene-algen', name: 'Blauwgroene Algen', animal: 'honden', type: 'plant', level: 'hoog', icon: '🦠' },
  { id: 49, slug: 'eikenblad', name: 'Eikenblad/Eikels', animal: 'honden', type: 'plant', level: 'middel', icon: '🍂' },
  { id: 50, slug: 'taxus', name: 'Taxus', animal: 'honden', type: 'plant', level: 'hoog', icon: '🌲' },

  // Planten - Katten
  { id: 11, slug: 'lelie', name: 'Lelie', animal: 'katten', type: 'plant', level: 'hoog', icon: '🌺' },
  { id: 12, slug: 'tulp', name: 'Tulp', animal: 'katten', type: 'plant', level: 'middel', icon: '🌷' },
  { id: 15, slug: 'dieffenbachia', name: 'Dieffenbachia', animal: 'katten', type: 'plant', level: 'middel', icon: '🌿' },
  { id: 16, slug: 'philodendron', name: 'Philodendron', animal: 'katten', type: 'plant', level: 'middel', icon: '🪴' },
  { id: 17, slug: 'monstera', name: 'Monstera', animal: 'katten', type: 'plant', level: 'laag', icon: '🌱' },
  { id: 18, slug: 'kerstster', name: 'Kerstster', animal: 'katten', type: 'plant', level: 'laag', icon: '⭐' },

  // Medicijnen - Honden
  { id: 22, slug: 'ibuprofen', name: 'Ibuprofen', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 24, slug: 'naproxen', name: 'Naproxen', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 25, slug: 'antidepressiva', name: 'Antidepressiva', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 27, slug: 'bloeddrukmedicatie', name: 'Bloeddrukmedicatie', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 28, slug: 'adhd-medicatie', name: 'ADHD Medicatie', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 29, slug: 'vitaminen', name: 'Vitaminen', animal: 'honden', type: 'medicijn', level: 'middel', icon: '💊' },
  { id: 30, slug: 'zalf-5-fluorouracil', name: '5-Fluorouracil Zalf', animal: 'honden', type: 'medicijn', level: 'hoog', icon: '🧴' },

  // Medicijnen - Katten
  { id: 21, slug: 'paracetamol', name: 'Paracetamol', animal: 'katten', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 23, slug: 'aspirine', name: 'Aspirine', animal: 'katten', type: 'medicijn', level: 'hoog', icon: '💊' },
  { id: 26, slug: 'slaappillen', name: 'Slaappillen', animal: 'katten', type: 'medicijn', level: 'hoog', icon: '💊' },

  // Huishoudelijk - Honden
  { id: 31, slug: 'antivries', name: 'Antivries', animal: 'honden', type: 'huishoudelijk', level: 'hoog', icon: '🧊' },
  { id: 32, slug: 'rattengif', name: 'Rattengif', animal: 'honden', type: 'huishoudelijk', level: 'hoog', icon: '☠️' },
  { id: 33, slug: 'slakkenkorrels', name: 'Slakkenkorrels', animal: 'honden', type: 'huishoudelijk', level: 'hoog', icon: '🐌' },
  { id: 35, slug: 'wasmiddel-pods', name: 'Wasmiddel Pods', animal: 'honden', type: 'huishoudelijk', level: 'middel', icon: '🧴' },
  { id: 37, slug: 'verf', name: 'Verf', animal: 'honden', type: 'huishoudelijk', level: 'middel', icon: '🎨' },
  { id: 38, slug: 'lijm', name: 'Lijm', animal: 'honden', type: 'huishoudelijk', level: 'middel', icon: '🧴' },
  { id: 39, slug: 'batterijen', name: 'Batterijen', animal: 'honden', type: 'huishoudelijk', level: 'hoog', icon: '🔋' },

  // Huishoudelijk - Katten
  { id: 34, slug: 'bleek', name: 'Bleek', animal: 'katten', type: 'huishoudelijk', level: 'middel', icon: '🧴' },
  { id: 36, slug: 'vlooienmiddel-hond', name: 'Vlooienmiddel (voor honden)', animal: 'katten', type: 'huishoudelijk', level: 'hoog', icon: '🐕' },
  { id: 40, slug: 'insectenspray', name: 'Insectenspray', animal: 'katten', type: 'huishoudelijk', level: 'middel', icon: '🦟' },

  // Drugs
  { id: 45, slug: 'cannabis', name: 'Cannabis/THC', animal: 'honden', type: 'drugs', level: 'middel', icon: '🌿' },
];

const categoryInfo = {
  voedsel: { name: 'Voedsel', icon: '🍽️', description: 'Eten en drinken dat gevaarlijk kan zijn' },
  plant: { name: 'Planten', icon: '🌿', description: 'Kamer- en tuinplanten die giftig zijn' },
  medicijn: { name: 'Medicijnen', icon: '💊', description: 'Menselijke medicijnen en zalven' },
  huishoudelijk: { name: 'Huishoudelijk', icon: '🧴', description: 'Schoonmaak- en huishoudmiddelen' },
  drugs: { name: 'Drugs', icon: '🚫', description: 'Verdovende middelen' },
};

const levelColors = {
  hoog: 'bg-red-100 border-red-500 text-red-900',
  middel: 'bg-orange-100 border-orange-500 text-orange-900',
  laag: 'bg-green-100 border-green-500 text-green-900',
};

const levelBadge = {
  hoog: 'bg-red-600 text-white',
  middel: 'bg-orange-500 text-white',
  laag: 'bg-green-600 text-white',
};

export default function GiftigeStoffenPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<'all' | 'honden' | 'katten'>('all');
  const [selectedType, setSelectedType] = useState<'all' | string>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'hoog' | 'middel' | 'laag'>('all');

  // Filter substances based on search and filters
  const filteredSubstances = useMemo(() => {
    return substances.filter((substance) => {
      const matchesSearch = substance.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAnimal = selectedAnimal === 'all' || substance.animal === selectedAnimal;
      const matchesType = selectedType === 'all' || substance.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || substance.level === selectedLevel;

      return matchesSearch && matchesAnimal && matchesType && matchesLevel;
    });
  }, [searchQuery, selectedAnimal, selectedType, selectedLevel]);

  // Group by category
  const groupedSubstances = useMemo(() => {
    const grouped: Record<string, typeof substances> = {};
    filteredSubstances.forEach((substance) => {
      if (!grouped[substance.type]) {
        grouped[substance.type] = [];
      }
      grouped[substance.type].push(substance);
    });
    return grouped;
  }, [filteredSubstances]);

  const stats = useMemo(() => {
    const total = substances.length;
    const honden = substances.filter(s => s.animal === 'honden').length;
    const katten = substances.filter(s => s.animal === 'katten').length;
    const hoog = substances.filter(s => s.level === 'hoog').length;

    return { total, honden, katten, hoog };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <article className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-emerald-700 mb-6">
          <Link href="/nl" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-600">Giftige Stoffen</span>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giftige Stoffen voor Honden & Katten
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Compleet overzicht van {stats.total} giftige stoffen die gevaarlijk zijn voor je huisdier.
            Leer welke voedingsmiddelen, planten, medicijnen en huishoudelijke producten je moet vermijden.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-emerald-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Totaal stoffen</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-blue-600">{stats.honden}</div>
              <div className="text-sm text-gray-600">Voor honden</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-purple-600">{stats.katten}</div>
              <div className="text-sm text-gray-600">Voor katten</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-3xl font-bold text-red-600">{stats.hoog}</div>
              <div className="text-sm text-gray-600">Hoog toxisch</div>
            </div>
          </div>
        </header>

        {/* Warning Box */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              !
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">Belangrijk Veiligheidsadvies</h2>
              <p className="text-gray-800 leading-relaxed">
                <strong>Neem bij elke vermoedelijke vergiftiging direct contact op met je dierenarts of de dierennoodhulp.</strong>{' '}
                Wacht niet af tot symptomen erger worden. Snelle actie kan het verschil maken tussen leven en dood.
                Deze lijst is bedoeld voor preventie en educatie, niet als vervanging van professioneel veterinair advies.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zoek & Filter</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Zoek een stof... (bijv. 'chocolade', 'lelie', 'ibuprofen')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Animal Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dier</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAnimal('all')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedAnimal === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle
                </button>
                <button
                  onClick={() => setSelectedAnimal('honden')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedAnimal === 'honden'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Honden
                </button>
                <button
                  onClick={() => setSelectedAnimal('katten')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedAnimal === 'katten'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Katten
                </button>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Categorie</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Alle categorieën</option>
                <option value="voedsel">🍽️ Voedsel</option>
                <option value="plant">🌿 Planten</option>
                <option value="medicijn">💊 Medicijnen</option>
                <option value="huishoudelijk">🧴 Huishoudelijk</option>
                <option value="drugs">🚫 Drugs</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Toxiciteit</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle
                </button>
                <button
                  onClick={() => setSelectedLevel('hoog')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'hoog'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hoog
                </button>
                <button
                  onClick={() => setSelectedLevel('middel')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'middel'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Middel
                </button>
                <button
                  onClick={() => setSelectedLevel('laag')}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'laag'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Laag
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredSubstances.length === substances.length
              ? `Alle ${substances.length} stoffen worden weergegeven`
              : `${filteredSubstances.length} van ${substances.length} stoffen gevonden`}
          </div>
        </div>

        {/* Substances List - Grouped by Category */}
        {Object.keys(groupedSubstances).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedSubstances)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([type, items]) => (
                <section key={type}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{categoryInfo[type as keyof typeof categoryInfo]?.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {categoryInfo[type as keyof typeof categoryInfo]?.name}
                      </h2>
                      <p className="text-gray-600">
                        {categoryInfo[type as keyof typeof categoryInfo]?.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items
                      .sort((a, b) => {
                        // Sort by level (hoog > middel > laag), then by name
                        const levelOrder = { hoog: 0, middel: 1, laag: 2 };
                        if (levelOrder[a.level] !== levelOrder[b.level]) {
                          return levelOrder[a.level] - levelOrder[b.level];
                        }
                        return a.name.localeCompare(b.name);
                      })
                      .map((substance) => (
                        <Link
                          key={`${substance.slug}-${substance.animal}`}
                          href={`/nl/is-${substance.slug}-giftig-voor-${substance.animal}`}
                          className={`block border-l-4 rounded-lg shadow-md hover:shadow-lg transition-all p-4 ${
                            levelColors[substance.level]
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-3xl">{substance.icon}</span>
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900">
                                  {substance.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm mt-1">
                                  <span className="capitalize text-gray-600">
                                    {substance.animal === 'honden' ? '🐕 Honden' : '🐱 Katten'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                levelBadge[substance.level]
                              }`}
                            >
                              {substance.level === 'hoog' ? 'HOOG' : substance.level === 'middel' ? 'MIDDEL' : 'LAAG'}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>
              ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen resultaten gevonden</h3>
            <p className="text-gray-600 mb-4">
              Probeer je zoekopdracht aan te passen of wijzig de filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedAnimal('all');
                setSelectedType('all');
                setSelectedLevel('all');
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Emergency Contact Section */}
        <section className="mt-12 bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            Noodcontacten
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Je Eigen Dierenarts</h3>
              <p className="text-gray-600 text-sm">
                Bel altijd eerst je eigen dierenarts tijdens praktijkuren. Zij kennen je dier en de medische
                geschiedenis.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dierennoodhulp (24/7)</h3>
              <p className="text-gray-600 text-sm">
                Buiten kantooruren kun je terecht bij de dierennoodhulp in je regio. Houd het telefoonnummer
                altijd bij de hand.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚕️ Medische Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De informatie op deze pagina is alleen bedoeld voor educatieve doeleinden en vervangt geen
            professioneel veterinair advies, diagnose of behandeling. Raadpleeg altijd een erkende dierenarts
            voor specifieke vragen over de gezondheid van je huisdier.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>
              Bij spoedeisende situaties zoals vergiftiging moet je altijd direct contact opnemen met je
              dierenarts of de dierennoodhulp.
            </strong>{' '}
            Wacht nooit af of de symptomen vanzelf overgaan. Snelle actie kan het verschil maken tussen leven en
            dood.
          </p>
        </section>
      </article>
    </div>
  );
}
