/**
 * Toxicity Data Types for Programmatic SEO Pages
 * Supports 5,000-10,000 programmatic pages
 */

export type ToxicityLevel = 'hoog' | 'middel' | 'laag' | 'onbekend';
export type SubstanceType = 'plant' | 'voedsel' | 'medicijn' | 'huishouden' | 'chemisch';
export type Animal = 'honden' | 'katten' | 'konijnen' | 'vogels' | 'knaagdieren';

export interface ToxicSubstance {
  slug: string;
  name: string;
  type: SubstanceType;
  toxicity_level: ToxicityLevel;
  animals: Animal[];
  notes: string;
}

export interface ToxicityPageData {
  substance: ToxicSubstance;
  animal: Animal;
  url: string;
  canonicalUrl: string;
  shouldIndex: boolean;
}

export interface GeneratedContent {
  tldr: string;
  introduction: string;
  whyDangerous: string;
  symptoms: string[];
  whatToDo: string[];
  whenToVet: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  disclaimer: string;
}

// URL patterns for synonyms (noindex pages)
export const SYNONYM_PATTERNS = [
  'is-{slug}-gevaarlijk-voor-{animal}',
  '{animal}-heeft-{slug}-gegeten',
  '{slug}-toxiciteit-bij-{animal}',
  'mag-{animal}-{slug}',
  '{slug}-vergiftiging-{animal}',
] as const;

// Animal display names
export const ANIMAL_DISPLAY: Record<Animal, { singular: string; possessive: string }> = {
  honden: { singular: 'hond', possessive: 'je hond' },
  katten: { singular: 'kat', possessive: 'je kat' },
  konijnen: { singular: 'konijn', possessive: 'je konijn' },
  vogels: { singular: 'vogel', possessive: 'je vogel' },
  knaagdieren: { singular: 'knaagdier', possessive: 'je knaagdier' },
};

// Type display names
export const TYPE_DISPLAY: Record<SubstanceType, string> = {
  plant: 'Plant',
  voedsel: 'Voedingsmiddel',
  medicijn: 'Medicijn',
  huishouden: 'Huishoudelijk product',
  chemisch: 'Chemische stof',
};

// Toxicity level configs
export const TOXICITY_CONFIG: Record<ToxicityLevel, {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  label: string;
  shouldIndex: boolean;
}> = {
  hoog: {
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-300 dark:border-red-700',
    icon: '🚨',
    label: 'Zeer giftig',
    shouldIndex: true,
  },
  middel: {
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-300 dark:border-amber-700',
    icon: '⚠️',
    label: 'Matig giftig',
    shouldIndex: true,
  },
  laag: {
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    icon: '⚡',
    label: 'Licht giftig',
    shouldIndex: true,
  },
  onbekend: {
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    borderColor: 'border-gray-300 dark:border-gray-700',
    icon: '❓',
    label: 'Onbekend',
    shouldIndex: false, // Don't index unknown/thin content
  },
};
