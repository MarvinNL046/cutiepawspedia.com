/**
 * Germany State Configuration (Bundesländer)
 *
 * Germany has 16 federal states (Bundesländer):
 * - 13 Flächenländer (area states)
 * - 3 Stadtstaaten (city-states): Berlin, Hamburg, Bremen
 *
 * All German-speaking (single language)
 */

export interface DeStateConfig {
  /** URL-safe slug for the state */
  slug: string;
  /** Official state name */
  name: string;
  /** ISO 3166-2:DE code */
  code: string;
  /** State capital */
  capital: string;
  /** Major cities for discovery */
  majorCities: string[];
  /** Approximate population */
  population?: number;
}

/**
 * German states configured for data collection
 * Ordered by population (largest first)
 */
export const DE_STATE_CONFIGS: DeStateConfig[] = [
  // Top 5 most populous states
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    code: "NW",
    capital: "Düsseldorf",
    majorCities: [
      "Köln",
      "Düsseldorf",
      "Dortmund",
      "Essen",
      "Duisburg",
      "Bochum",
      "Wuppertal",
      "Bielefeld",
      "Bonn",
      "Münster",
      "Gelsenkirchen",
      "Mönchengladbach",
      "Aachen",
      "Krefeld",
      "Oberhausen",
    ],
    population: 17925570,
  },
  {
    slug: "bayern",
    name: "Bayern",
    code: "BY",
    capital: "München",
    majorCities: [
      "München",
      "Nürnberg",
      "Augsburg",
      "Regensburg",
      "Ingolstadt",
      "Würzburg",
      "Fürth",
      "Erlangen",
      "Bamberg",
      "Bayreuth",
      "Landshut",
      "Rosenheim",
      "Passau",
      "Kempten",
    ],
    population: 13176989,
  },
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    code: "BW",
    capital: "Stuttgart",
    majorCities: [
      "Stuttgart",
      "Mannheim",
      "Karlsruhe",
      "Freiburg",
      "Heidelberg",
      "Ulm",
      "Heilbronn",
      "Pforzheim",
      "Reutlingen",
      "Esslingen",
      "Ludwigsburg",
      "Tübingen",
      "Konstanz",
      "Villingen-Schwenningen",
    ],
    population: 11103043,
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    code: "NI",
    capital: "Hannover",
    majorCities: [
      "Hannover",
      "Braunschweig",
      "Oldenburg",
      "Osnabrück",
      "Wolfsburg",
      "Göttingen",
      "Salzgitter",
      "Hildesheim",
      "Delmenhorst",
      "Wilhelmshaven",
      "Lüneburg",
      "Celle",
      "Emden",
    ],
    population: 8003421,
  },
  {
    slug: "hessen",
    name: "Hessen",
    code: "HE",
    capital: "Wiesbaden",
    majorCities: [
      "Frankfurt am Main",
      "Wiesbaden",
      "Kassel",
      "Darmstadt",
      "Offenbach",
      "Gießen",
      "Marburg",
      "Fulda",
      "Rüsselsheim",
      "Bad Homburg",
      "Wetzlar",
      "Hanau",
    ],
    population: 6293154,
  },

  // City-states
  {
    slug: "berlin",
    name: "Berlin",
    code: "BE",
    capital: "Berlin",
    majorCities: [
      "Berlin Mitte",
      "Berlin Charlottenburg",
      "Berlin Kreuzberg",
      "Berlin Prenzlauer Berg",
      "Berlin Neukölln",
      "Berlin Spandau",
      "Berlin Steglitz",
      "Berlin Tempelhof",
      "Berlin Pankow",
      "Berlin Lichtenberg",
    ],
    population: 3664088,
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    code: "HH",
    capital: "Hamburg",
    majorCities: [
      "Hamburg Mitte",
      "Hamburg Altona",
      "Hamburg Eimsbüttel",
      "Hamburg Wandsbek",
      "Hamburg Harburg",
      "Hamburg Bergedorf",
      "Hamburg Nord",
    ],
    population: 1853935,
  },
  {
    slug: "bremen",
    name: "Bremen",
    code: "HB",
    capital: "Bremen",
    majorCities: ["Bremen", "Bremerhaven"],
    population: 676463,
  },

  // Other area states
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    code: "RP",
    capital: "Mainz",
    majorCities: [
      "Mainz",
      "Ludwigshafen",
      "Koblenz",
      "Trier",
      "Kaiserslautern",
      "Worms",
      "Neustadt",
      "Speyer",
      "Bad Kreuznach",
    ],
    population: 4098391,
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    code: "SN",
    capital: "Dresden",
    majorCities: [
      "Leipzig",
      "Dresden",
      "Chemnitz",
      "Zwickau",
      "Plauen",
      "Görlitz",
      "Freiberg",
      "Bautzen",
      "Pirna",
    ],
    population: 4056941,
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    code: "SH",
    capital: "Kiel",
    majorCities: [
      "Kiel",
      "Lübeck",
      "Flensburg",
      "Neumünster",
      "Norderstedt",
      "Elmshorn",
      "Pinneberg",
      "Itzehoe",
    ],
    population: 2910875,
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    code: "BB",
    capital: "Potsdam",
    majorCities: [
      "Potsdam",
      "Cottbus",
      "Brandenburg an der Havel",
      "Frankfurt (Oder)",
      "Oranienburg",
      "Falkensee",
      "Eberswalde",
    ],
    population: 2531071,
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    code: "ST",
    capital: "Magdeburg",
    majorCities: [
      "Halle",
      "Magdeburg",
      "Dessau-Roßlau",
      "Wittenberg",
      "Halberstadt",
      "Stendal",
      "Wernigerode",
    ],
    population: 2180684,
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    code: "TH",
    capital: "Erfurt",
    majorCities: [
      "Erfurt",
      "Jena",
      "Gera",
      "Weimar",
      "Gotha",
      "Eisenach",
      "Suhl",
      "Nordhausen",
    ],
    population: 2120237,
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    code: "MV",
    capital: "Schwerin",
    majorCities: [
      "Rostock",
      "Schwerin",
      "Neubrandenburg",
      "Stralsund",
      "Greifswald",
      "Wismar",
      "Güstrow",
    ],
    population: 1610774,
  },
  {
    slug: "saarland",
    name: "Saarland",
    code: "SL",
    capital: "Saarbrücken",
    majorCities: [
      "Saarbrücken",
      "Neunkirchen",
      "Homburg",
      "Völklingen",
      "Sankt Ingbert",
      "Saarlouis",
    ],
    population: 983991,
  },
];

/**
 * Get DE state configuration by slug
 */
export function getDeStateConfig(slug: string): DeStateConfig | undefined {
  return DE_STATE_CONFIGS.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );
}

/**
 * Get all configured DE states
 */
export function getAllDeStates(): DeStateConfig[] {
  return DE_STATE_CONFIGS;
}

/**
 * Get all major cities across all states (flat list)
 */
export function getAllDeCities(): string[] {
  const cities: string[] = [];
  for (const state of DE_STATE_CONFIGS) {
    cities.push(...state.majorCities);
  }
  return cities;
}

/**
 * List available DE state slugs
 */
export function getDeStateSlugs(): string[] {
  return DE_STATE_CONFIGS.map((s) => s.slug);
}

/**
 * Get state by city name
 */
export function getDeStateByCity(city: string): DeStateConfig | undefined {
  return DE_STATE_CONFIGS.find((s) =>
    s.majorCities.some((c) => c.toLowerCase() === city.toLowerCase())
  );
}
