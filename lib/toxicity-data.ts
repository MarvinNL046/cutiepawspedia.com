/**
 * Toxicity data utilities for programmatic SEO pages
 * Loads data from CSV and provides helper functions
 */

import fs from 'fs';
import path from 'path';

export interface ToxicSubstance {
  slug: string;
  name: string;
  type: 'plant' | 'voedsel' | 'medicijn' | 'huishouden' | 'chemisch';
  toxicityLevel: 'hoog' | 'middel' | 'laag' | 'onbekend';
  animals: string[];
  notes: string;
}

export type AnimalType = 'honden' | 'katten' | 'konijnen' | 'vogels' | 'knaagdieren';

// Cache for substances
let substancesCache: ToxicSubstance[] | null = null;

/**
 * Parse CSV file and return all toxic substances
 */
export function getAllSubstances(): ToxicSubstance[] {
  if (substancesCache) {
    return substancesCache;
  }

  const csvPath = path.join(process.cwd(), 'data', 'toxic-substances.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  const lines = csvContent.split('\n');
  const substances: ToxicSubstance[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue;

    // Parse CSV line (handle quoted fields)
    const parts = parseCSVLine(line);
    if (parts.length < 5) continue;

    const [slug, name, type, toxicityLevel, animals, notes = ''] = parts;

    // Validate required fields
    if (!slug || !name || !type) continue;

    substances.push({
      slug: slug.trim(),
      name: name.trim(),
      type: normalizeType(type.trim()),
      toxicityLevel: normalizeToxicityLevel(toxicityLevel?.trim()),
      animals: animals?.split(',').map(a => a.trim()).filter(Boolean) || [],
      notes: notes.trim(),
    });
  }

  substancesCache = substances;
  return substances;
}

/**
 * Parse a CSV line handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

/**
 * Normalize type string to valid type
 */
function normalizeType(type: string): ToxicSubstance['type'] {
  const typeMap: Record<string, ToxicSubstance['type']> = {
    'plant': 'plant',
    'planten': 'plant',
    'voedsel': 'voedsel',
    'medicijn': 'medicijn',
    'medicijnen': 'medicijn',
    'huishouden': 'huishouden',
    'huishoudelijk': 'huishouden',
    'chemisch': 'chemisch',
  };
  return typeMap[type.toLowerCase()] || 'chemisch';
}

/**
 * Normalize toxicity level
 */
function normalizeToxicityLevel(level: string): ToxicSubstance['toxicityLevel'] {
  const levelMap: Record<string, ToxicSubstance['toxicityLevel']> = {
    'hoog': 'hoog',
    'middel': 'middel',
    'laag': 'laag',
    'onbekend': 'onbekend',
  };
  return levelMap[level?.toLowerCase()] || 'onbekend';
}

/**
 * Get a specific substance by slug
 */
export function getSubstanceBySlug(slug: string): ToxicSubstance | undefined {
  const substances = getAllSubstances();
  return substances.find(s => s.slug === slug);
}

/**
 * Get all substances for a specific animal
 */
export function getSubstancesForAnimal(animal: AnimalType): ToxicSubstance[] {
  const substances = getAllSubstances();
  return substances.filter(s => s.animals.includes(animal));
}

/**
 * Get all substances by type
 */
export function getSubstancesByType(type: ToxicSubstance['type']): ToxicSubstance[] {
  const substances = getAllSubstances();
  return substances.filter(s => s.type === type);
}

/**
 * Check if a substance is toxic for a specific animal
 */
export function isSubstanceToxicForAnimal(slug: string, animal: AnimalType): boolean {
  const substance = getSubstanceBySlug(slug);
  if (!substance) return false;
  return substance.animals.includes(animal);
}

/**
 * Generate all valid substance-animal combinations for sitemap/static generation
 */
export function getAllToxicityCombinations(): Array<{ substanceSlug: string; animal: AnimalType }> {
  const substances = getAllSubstances();
  const combinations: Array<{ substanceSlug: string; animal: AnimalType }> = [];

  for (const substance of substances) {
    for (const animal of substance.animals) {
      combinations.push({
        substanceSlug: substance.slug,
        animal: animal as AnimalType,
      });
    }
  }

  return combinations;
}

/**
 * Get type display info
 */
export function getTypeInfo(type: ToxicSubstance['type']): { name: string; icon: string; description: string } {
  const info: Record<ToxicSubstance['type'], { name: string; icon: string; description: string }> = {
    voedsel: { name: 'Voedsel', icon: '🍽️', description: 'Eten en drinken dat gevaarlijk kan zijn' },
    plant: { name: 'Planten', icon: '🌿', description: 'Kamer- en tuinplanten die giftig zijn' },
    medicijn: { name: 'Medicijnen', icon: '💊', description: 'Menselijke medicijnen en zalven' },
    huishouden: { name: 'Huishoudelijk', icon: '🧴', description: 'Schoonmaak- en huishoudmiddelen' },
    chemisch: { name: 'Chemisch', icon: '⚗️', description: 'Chemische stoffen en producten' },
  };
  return info[type] || { name: type, icon: '❓', description: '' };
}

/**
 * Get animal display info
 */
export function getAnimalInfo(animal: AnimalType): { name: string; icon: string; plural: string } {
  const info: Record<AnimalType, { name: string; icon: string; plural: string }> = {
    honden: { name: 'Hond', icon: '🐕', plural: 'Honden' },
    katten: { name: 'Kat', icon: '🐱', plural: 'Katten' },
    konijnen: { name: 'Konijn', icon: '🐰', plural: 'Konijnen' },
    vogels: { name: 'Vogel', icon: '🐦', plural: 'Vogels' },
    knaagdieren: { name: 'Knaagdier', icon: '🐹', plural: 'Knaagdieren' },
  };
  return info[animal] || { name: animal, icon: '🐾', plural: animal };
}

/**
 * Get toxicity level display info
 */
export function getToxicityLevelInfo(level: ToxicSubstance['toxicityLevel']): {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
} {
  const info: Record<ToxicSubstance['toxicityLevel'], { name: string; color: string; bgColor: string; borderColor: string; description: string }> = {
    hoog: {
      name: 'Hoog',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      description: 'Zeer gevaarlijk - kan ernstige schade of overlijden veroorzaken'
    },
    middel: {
      name: 'Middel',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-500',
      description: 'Gevaarlijk - kan klachten veroorzaken, snelle actie aanbevolen'
    },
    laag: {
      name: 'Laag',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      description: 'Licht gevaarlijk - kan milde klachten veroorzaken'
    },
    onbekend: {
      name: 'Onbekend',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-500',
      description: 'Toxiciteit niet volledig bekend - wees voorzichtig'
    },
  };
  return info[level] || info.onbekend;
}
