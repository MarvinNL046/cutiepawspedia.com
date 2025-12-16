/**
 * Toxicity Data Loader
 * Parses CSV and provides typed access to toxic substances
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ToxicSubstance,
  Animal,
  SubstanceType,
  ToxicityLevel,
  ToxicityPageData,
  TOXICITY_CONFIG,
  ANIMAL_DISPLAY
} from './types';

// Cache for parsed data
let cachedSubstances: ToxicSubstance[] | null = null;

/**
 * Parse CSV file and return typed substances
 */
export function loadSubstances(): ToxicSubstance[] {
  if (cachedSubstances) return cachedSubstances;

  const csvPath = path.join(process.cwd(), 'data', 'toxic-substances.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  const lines = csvContent.trim().split('\n');
  const header = lines[0].split(',');

  cachedSubstances = lines.slice(1)
    .filter(line => line.trim() && !line.startsWith('#')) // Skip empty lines and comments
    .map(line => {
      // Handle CSV with quoted fields containing commas
      const values = parseCSVLine(line);

      return {
        slug: values[0],
        name: values[1],
        type: values[2] as SubstanceType,
        toxicity_level: values[3] as ToxicityLevel,
        animals: values[4]?.split(',').map(a => a.trim() as Animal) || [],
        notes: values[5] || '',
      };
    })
    .filter(s => s.slug && s.animals.length > 0); // Filter out invalid entries

  return cachedSubstances;
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
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Get substance by slug
 */
export function getSubstanceBySlug(slug: string): ToxicSubstance | undefined {
  const substances = loadSubstances();
  return substances.find(s => s.slug === slug);
}

/**
 * Get all substances for a specific animal
 */
export function getSubstancesForAnimal(animal: Animal): ToxicSubstance[] {
  const substances = loadSubstances();
  return substances.filter(s => s.animals.includes(animal));
}

/**
 * Get all substances by type
 */
export function getSubstancesByType(type: SubstanceType): ToxicSubstance[] {
  const substances = loadSubstances();
  return substances.filter(s => s.type === type);
}

/**
 * Get all substances by toxicity level
 */
export function getSubstancesByToxicity(level: ToxicityLevel): ToxicSubstance[] {
  const substances = loadSubstances();
  return substances.filter(s => s.toxicity_level === level);
}

/**
 * Generate all possible page combinations for static generation
 * Returns params for generateStaticParams()
 */
export function getAllToxicityPageParams(): { slug: string; animal: string }[] {
  const substances = loadSubstances();
  const params: { slug: string; animal: string }[] = [];

  for (const substance of substances) {
    for (const animal of substance.animals) {
      params.push({
        slug: substance.slug,
        animal: animal,
      });
    }
  }

  return params;
}

/**
 * Get page data for a specific substance/animal combination
 */
export function getToxicityPageData(slug: string, animal: Animal): ToxicityPageData | null {
  const substance = getSubstanceBySlug(slug);

  if (!substance || !substance.animals.includes(animal)) {
    return null;
  }

  const config = TOXICITY_CONFIG[substance.toxicity_level];
  const baseUrl = 'https://cutiepawspedia.com';

  return {
    substance,
    animal,
    url: `/nl/is-${slug}-giftig-voor-${animal}`,
    canonicalUrl: `${baseUrl}/nl/is-${slug}-giftig-voor-${animal}`,
    shouldIndex: config.shouldIndex,
  };
}

/**
 * Get related substances (same type or toxicity level)
 */
export function getRelatedSubstances(
  substance: ToxicSubstance,
  animal: Animal,
  limit: number = 6
): ToxicSubstance[] {
  const substances = loadSubstances();

  // First get same type
  const sameType = substances.filter(
    s => s.slug !== substance.slug &&
         s.type === substance.type &&
         s.animals.includes(animal)
  );

  // Then same toxicity level
  const sameToxicity = substances.filter(
    s => s.slug !== substance.slug &&
         s.toxicity_level === substance.toxicity_level &&
         s.animals.includes(animal) &&
         !sameType.includes(s)
  );

  // Combine and limit
  return [...sameType, ...sameToxicity].slice(0, limit);
}

/**
 * Get statistics for overview pages
 */
export function getToxicityStats(animal?: Animal) {
  const substances = animal
    ? getSubstancesForAnimal(animal)
    : loadSubstances();

  return {
    total: substances.length,
    byToxicity: {
      hoog: substances.filter(s => s.toxicity_level === 'hoog').length,
      middel: substances.filter(s => s.toxicity_level === 'middel').length,
      laag: substances.filter(s => s.toxicity_level === 'laag').length,
      onbekend: substances.filter(s => s.toxicity_level === 'onbekend').length,
    },
    byType: {
      plant: substances.filter(s => s.type === 'plant').length,
      voedsel: substances.filter(s => s.type === 'voedsel').length,
      medicijn: substances.filter(s => s.type === 'medicijn').length,
      huishouden: substances.filter(s => s.type === 'huishouden').length,
      chemisch: substances.filter(s => s.type === 'chemisch').length,
    },
  };
}

/**
 * Search substances by name or notes
 */
export function searchSubstances(query: string, animal?: Animal): ToxicSubstance[] {
  let substances = animal
    ? getSubstancesForAnimal(animal)
    : loadSubstances();

  const lowerQuery = query.toLowerCase();

  return substances.filter(s =>
    s.name.toLowerCase().includes(lowerQuery) ||
    s.notes.toLowerCase().includes(lowerQuery) ||
    s.slug.includes(lowerQuery)
  );
}

/**
 * Get most dangerous substances (for hub pages)
 */
export function getMostDangerousSubstances(animal: Animal, limit: number = 10): ToxicSubstance[] {
  const substances = getSubstancesForAnimal(animal);

  // Sort by toxicity (hoog first)
  const sorted = substances.sort((a, b) => {
    const order = { hoog: 0, middel: 1, laag: 2, onbekend: 3 };
    return order[a.toxicity_level] - order[b.toxicity_level];
  });

  return sorted.slice(0, limit);
}
