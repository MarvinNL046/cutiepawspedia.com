/**
 * AI Content Generator for Toxicity Pages
 * Generates EEAT-compliant, veterinary-safe content
 * Uses caching to avoid regenerating content
 */

import {
  ToxicSubstance,
  Animal,
  GeneratedContent,
  ANIMAL_DISPLAY,
  TOXICITY_CONFIG,
  TYPE_DISPLAY,
} from './types';

// In-memory cache for generated content
const contentCache = new Map<string, GeneratedContent>();

/**
 * Generate cache key for substance/animal combination
 */
function getCacheKey(substance: ToxicSubstance, animal: Animal): string {
  return `${substance.slug}-${animal}`;
}

/**
 * Generate fallback content based on substance data
 * This is used when AI generation is not available or as initial content
 */
function generateFallbackContent(
  substance: ToxicSubstance,
  animal: Animal
): GeneratedContent {
  const animalDisplay = ANIMAL_DISPLAY[animal];
  const config = TOXICITY_CONFIG[substance.toxicity_level];
  const typeDisplay = TYPE_DISPLAY[substance.type];
  const animalCapitalized = animalDisplay.singular.charAt(0).toUpperCase() + animalDisplay.singular.slice(1);

  // Toxicity-specific intro text
  const toxicityIntro = {
    hoog: `Ja, ${substance.name} is zeer giftig voor ${animal}. ${substance.notes}`,
    middel: `Ja, ${substance.name} is matig giftig voor ${animal}. ${substance.notes}`,
    laag: `${substance.name} kan lichte klachten veroorzaken bij ${animal}. ${substance.notes}`,
    onbekend: `De toxiciteit van ${substance.name} voor ${animal} is niet volledig bekend. ${substance.notes}`,
  };

  // Type-specific danger explanation
  const typeDanger = {
    plant: `${substance.name} bevat giftige stoffen die schadelijk zijn voor ${animal}. Veel planten produceren natuurlijke verdedigingsmechanismen die voor huisdieren gevaarlijk kunnen zijn.`,
    voedsel: `Hoewel ${substance.name} veilig is voor mensen, bevat het stoffen die ${animal} niet goed kunnen verteren of die toxisch zijn voor hun systeem.`,
    medicijn: `${substance.name} is een medicijn dat specifiek voor mensen is ontwikkeld. De dosering en metabolisme verschilt sterk bij ${animal}, waardoor zelfs kleine hoeveelheden gevaarlijk kunnen zijn.`,
    huishouden: `${substance.name} bevat chemicaliën die niet bedoeld zijn voor consumptie. Contact of inname kan leiden tot ernstige gezondheidsklachten bij ${animal}.`,
    chemisch: `${substance.name} is een chemische stof die zeer gevaarlijk is voor ${animal}. Zelfs kleine hoeveelheden kunnen ernstige vergiftiging veroorzaken.`,
  };

  // Generate symptoms based on toxicity level
  const baseSymptoms = [
    'Braken en misselijkheid',
    'Diarree',
    'Verminderde eetlust',
    'Lethargie en zwakte',
  ];

  const severeSymptoms = [
    'Trillen of spierspasmen',
    'Ademhalingsproblemen',
    'Verhoogde hartslag',
    'Desoriëntatie of verwardheid',
    'Overmatig kwijlen',
    'Bleke of blauwe tandvlees',
  ];

  const symptoms = substance.toxicity_level === 'hoog'
    ? [...baseSymptoms, ...severeSymptoms]
    : substance.toxicity_level === 'middel'
    ? [...baseSymptoms, severeSymptoms[0], severeSymptoms[4]]
    : baseSymptoms;

  // What to do steps
  const whatToDo = [
    `Blijf kalm en verwijder ${animalDisplay.possessive} direct van de bron van ${substance.name}.`,
    `Probeer te bepalen hoeveel ${substance.name} ${animalDisplay.possessive} heeft ingenomen en wanneer dit is gebeurd.`,
    substance.toxicity_level === 'hoog'
      ? `Bel DIRECT de dierenarts of spoeddienst - dit is een noodgeval.`
      : `Neem contact op met je dierenarts voor advies.`,
    `Geef GEEN braakmiddel zonder advies van een dierenarts - dit kan soms meer schade veroorzaken.`,
    `Neem eventuele verpakking of restanten mee naar de dierenarts.`,
    `Monitor ${animalDisplay.possessive} nauwlettend op symptomen.`,
  ];

  // When to go to vet
  const whenToVet = [
    `${animalDisplay.possessive.charAt(0).toUpperCase() + animalDisplay.possessive.slice(1)} vertoont symptomen van vergiftiging`,
    `Je weet zeker dat ${animalDisplay.possessive} ${substance.name} heeft gegeten`,
    `Er is een grote hoeveelheid ingenomen`,
    `${animalDisplay.possessive.charAt(0).toUpperCase() + animalDisplay.possessive.slice(1)} is een puppy, kitten of senior`,
    `${animalDisplay.possessive.charAt(0).toUpperCase() + animalDisplay.possessive.slice(1)} heeft onderliggende gezondheidsproblemen`,
    `Je twijfelt of maakt je zorgen`,
  ];

  // FAQs
  const faqs = [
    {
      question: `Hoeveel ${substance.name} is giftig voor een ${animalDisplay.singular}?`,
      answer: `De toxische dosis varieert per ${animalDisplay.singular} en hangt af van gewicht, leeftijd en algemene gezondheid. Bij ${substance.toxicity_level === 'hoog' ? 'zeer giftige stoffen zoals ' + substance.name : substance.name} is het belangrijk om bij elke inname contact op te nemen met een dierenarts, zelfs bij kleine hoeveelheden.`,
    },
    {
      question: `Wat zijn de eerste symptomen van ${substance.name} vergiftiging bij ${animal}?`,
      answer: `De eerste symptomen verschijnen meestal binnen 30 minuten tot enkele uren na inname. Let op braken, diarree, verminderde eetlust en lethargie. Bij ${substance.toxicity_level === 'hoog' ? 'ernstige vergiftiging' : substance.name + ' inname'} kunnen ook neurologische symptomen optreden.`,
    },
    {
      question: `Kan een ${animalDisplay.singular} herstellen van ${substance.name} vergiftiging?`,
      answer: `Met snelle en adequate behandeling kunnen de meeste ${animal} herstellen van ${substance.name} vergiftiging. ${substance.toxicity_level === 'hoog' ? 'Bij zeer giftige stoffen is snelheid essentieel - hoe eerder de behandeling start, hoe beter de prognose.' : 'De prognose is over het algemeen goed bij tijdige behandeling.'}`,
    },
    {
      question: `Moet ik mijn ${animalDisplay.singular} laten braken na inname van ${substance.name}?`,
      answer: `Geef NOOIT zelf een braakmiddel zonder advies van een dierenarts. Bij sommige stoffen kan braken meer schade veroorzaken, bijvoorbeeld bij bijtende stoffen of als er risico is op aspiratie. Bel altijd eerst de dierenarts voor instructies.`,
    },
    {
      question: `Hoe voorkom ik dat mijn ${animalDisplay.singular} ${substance.name} eet?`,
      answer: `${substance.type === 'plant' ? 'Verwijder giftige planten uit je huis en tuin of plaats ze buiten bereik.' : substance.type === 'voedsel' ? 'Berg voedingsmiddelen veilig op buiten bereik van je huisdier.' : substance.type === 'medicijn' ? 'Bewaar alle medicijnen in afgesloten kasten buiten bereik van huisdieren.' : 'Berg huishoudelijke producten en chemicaliën veilig op in afgesloten kasten.'} Zorg dat alle gezinsleden weten wat giftig is voor ${animal}.`,
    },
  ];

  return {
    tldr: toxicityIntro[substance.toxicity_level],
    introduction: `Als huisdiereigenaar wil je ${animalDisplay.possessive} beschermen tegen gevaarlijke stoffen. ${substance.name} is een ${typeDisplay.toLowerCase()} die ${substance.toxicity_level === 'hoog' ? 'zeer gevaarlijk' : substance.toxicity_level === 'middel' ? 'schadelijk' : 'potentieel schadelijk'} kan zijn voor ${animal}. In dit artikel lees je alles over de risico's, symptomen van vergiftiging, en wat je moet doen als ${animalDisplay.possessive} ${substance.name} heeft gegeten.`,
    whyDangerous: typeDanger[substance.type],
    symptoms,
    whatToDo,
    whenToVet,
    faqs,
    disclaimer: `Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij vermoeden van vergiftiging, neem altijd direct contact op met een dierenarts. Wij geven bewust geen specifieke doseringen of behandeladviezen - dit is werk voor professionals.`,
  };
}

/**
 * Generate content for a toxicity page
 * Returns cached content if available, otherwise generates fallback
 *
 * Future: This can be extended to use AI (Claude/GPT) for richer content
 */
export async function generateToxicityContent(
  substance: ToxicSubstance,
  animal: Animal
): Promise<GeneratedContent> {
  const cacheKey = getCacheKey(substance, animal);

  // Check cache first
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  // Generate content (fallback for now, can be extended with AI)
  const content = generateFallbackContent(substance, animal);

  // Cache the result
  contentCache.set(cacheKey, content);

  return content;
}

/**
 * Pre-generate content for all substances (useful for build time)
 */
export async function preGenerateAllContent(
  substances: ToxicSubstance[]
): Promise<void> {
  for (const substance of substances) {
    for (const animal of substance.animals) {
      await generateToxicityContent(substance, animal);
    }
  }
}

/**
 * Clear the content cache
 */
export function clearContentCache(): void {
  contentCache.clear();
}

/**
 * Get cache statistics
 */
export function getContentCacheStats(): { size: number; keys: string[] } {
  return {
    size: contentCache.size,
    keys: Array.from(contentCache.keys()),
  };
}
