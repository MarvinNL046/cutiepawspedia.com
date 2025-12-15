#!/usr/bin/env npx tsx
/**
 * MEGA EXPANSION SCRIPT - Target: 100k+ businesses
 *
 * Adds cities to existing countries and creates new countries with cities
 */
import dotenv from "dotenv";
dotenv.config();
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

function slugify(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ============================================================================
// EXPANDED USA CITIES (151-300)
// ============================================================================
const usaCitiesExpanded = [
  // 151-200
  "Corona", "Roseville", "Thornton", "Carrollton", "Surprise",
  "Lancaster", "Hayward", "Salinas", "Macon", "Palmdale",
  "Sunnyvale", "Pomona", "Escondido", "Pasadena", "Joliet",
  "Paterson", "Kansas City", "Syracuse", "Torrance", "Bridgeport",
  "Lakewood", "McAllen", "Rockford", "Killeen", "Naperville",
  "Bellevue", "Savannah", "Mesquite", "Clarksville", "Dayton",
  "Orange", "Hollywood", "Pasadena", "Fullerton", "Hampton",
  "Warren", "Miramar", "West Valley City", "Olathe", "Columbia",
  "Sterling Heights", "Thousand Oaks", "Cedar Rapids", "New Haven", "Waco",
  "Visalia", "Topeka", "Elizabeth", "Gainesville", "Coral Springs",
  // 201-250
  "Simi Valley", "Stamford", "Concord", "Hartford", "Kent",
  "Lafayette", "Victorville", "Midland", "Athens", "Evansville",
  "Abilene", "Vallejo", "Berkeley", "Allentown", "Richardson",
  "Odessa", "Arvada", "Ann Arbor", "Fargo", "Provo",
  "Independence", "Rochester", "Springfield", "Lansing", "Inglewood",
  "Fairfield", "Wilmington", "Charleston", "Pueblo", "Palm Bay",
  "Peoria", "Cary", "Denton", "Round Rock", "College Station",
  "Broken Arrow", "Manchester", "Clearwater", "Costa Mesa", "Miami Gardens",
  "Cambridge", "Elgin", "Murrieta", "Temecula", "Carlsbad",
  "Westminster", "Downey", "Lowell", "West Covina", "El Monte",
  // 251-300
  "Waterbury", "Fayetteville", "San Buenaventura", "Gresham", "Antioch",
  "Norwalk", "High Point", "Everett", "Daly City", "Centennial",
  "Billings", "Murfreesboro", "Green Bay", "West Jordan", "Boulder",
  "Lewisville", "Hillsboro", "Tyler", "Lakeland", "Burbank",
  "El Cajon", "Rialto", "South Bend", "Davie", "San Mateo",
  "Las Cruces", "Renton", "Edison", "Woodbridge", "Vista",
  "Sparks", "Greeley", "Allen", "Tuscaloosa", "San Angelo",
  "Carson", "Santa Maria", "Vacaville", "Hesperia", "Compton",
  "Westminster", "Jurupa Valley", "Chico", "Edinburg", "El Paso",
  "Pueblo", "Reading", "Tracy", "Mission Viejo", "Citrus Heights"
];

// ============================================================================
// EXPANDED CANADA CITIES (101-200)
// ============================================================================
const canadaCitiesExpanded = [
  // 101-150
  "Penticton", "Williams Lake", "Salmon Arm", "Trail", "Nelson",
  "Quesnel", "Powell River", "Squamish", "Parksville", "Qualicum Beach",
  "Summerland", "Lake Country", "Peachland", "Merritt", "Revelstoke",
  "Golden", "Fernie", "Castlegar", "Kimberley", "Invermere",
  "Canmore", "Banff", "Jasper", "High River", "Stony Plain",
  "Fort Saskatchewan", "Beaumont", "Lacombe", "Sylvan Lake", "Wetaskiwin",
  "Camrose", "Vegreville", "Drumheller", "Innisfail", "Olds",
  "Ponoka", "Didsbury", "Carstairs", "Blackfalds", "Penhold",
  "Hinton", "Edson", "Whitecourt", "Slave Lake", "Peace River",
  "Grande Cache", "High Level", "Fort Vermilion", "Bonnyville", "Cold Lake",
  // 151-200
  "Humboldt", "Melfort", "Nipawin", "Tisdale", "North Battleford",
  "Kindersley", "Swift Current", "Estevan", "Weyburn", "Melville",
  "Portage la Prairie", "Steinbach", "Selkirk", "Thompson", "The Pas",
  "Flin Flon", "Swan River", "Dauphin", "Winkler", "Morden",
  "Kenora", "Dryden", "Fort Frances", "Kapuskasing", "Kirkland Lake",
  "Temiskaming Shores", "Elliot Lake", "Blind River", "Espanola", "Parry Sound",
  "Midland", "Collingwood", "Wasaga Beach", "Penetanguishene", "Gravenhurst",
  "Bracebridge", "Huntsville", "Port Colborne", "Fort Erie", "Welland",
  "Grimsby", "Lincoln", "Niagara-on-the-Lake", "Pelham", "Thorold",
  "West Lincoln", "Wainfleet", "Port Hope", "Cobourg", "Quinte West"
];

// ============================================================================
// EXPANDED GERMANY CITIES (50-200)
// ============================================================================
const germanyCitiesExpanded = [
  // Current 49 cities already in DB, adding 50-200
  "Wuppertal", "Bielefeld", "Bonn", "Münster", "Mannheim",
  "Karlsruhe", "Augsburg", "Wiesbaden", "Mönchengladbach", "Gelsenkirchen",
  "Aachen", "Braunschweig", "Chemnitz", "Kiel", "Krefeld",
  "Halle", "Magdeburg", "Freiburg", "Oberhausen", "Lübeck",
  "Erfurt", "Rostock", "Mainz", "Kassel", "Hagen",
  "Hamm", "Saarbrücken", "Mülheim", "Potsdam", "Ludwigshafen",
  "Oldenburg", "Leverkusen", "Osnabrück", "Solingen", "Heidelberg",
  "Herne", "Neuss", "Darmstadt", "Paderborn", "Regensburg",
  "Ingolstadt", "Würzburg", "Wolfsburg", "Fürth", "Ulm",
  "Heilbronn", "Offenbach", "Göttingen", "Bottrop", "Pforzheim",
  "Recklinghausen", "Reutlingen", "Koblenz", "Bremerhaven", "Bergisch Gladbach",
  "Jena", "Remscheid", "Erlangen", "Moers", "Siegen",
  "Salzgitter", "Hildesheim", "Cottbus", "Gera", "Witten",
  "Gütersloh", "Kaiserslautern", "Schwerin", "Iserlohn", "Hanau",
  "Esslingen", "Ludwigsburg", "Tübingen", "Flensburg", "Villingen-Schwenningen",
  "Marl", "Konstanz", "Worms", "Velbert", "Marburg",
  "Minden", "Dessau", "Ratingen", "Zwickau", "Neumünster",
  "Giessen", "Düren", "Norderstedt", "Lünen", "Wilhelmshaven",
  "Dorsten", "Gladbeck", "Troisdorf", "Arnsberg", "Detmold",
  "Delmenhorst", "Viersen", "Rheine", "Bocholt", "Dinslaken",
  "Castrop-Rauxel", "Lippstadt", "Lüdenscheid", "Unna", "Bad Salzuflen",
  "Grevenbroich", "Kerpen", "Wesel", "Dormagen", "Bergheim",
  "Hürth", "Neuwied", "Sindelfingen", "Langenhagen", "Garbsen",
  "Pulheim", "Hamelin", "Emden", "Plauen", "Stralsund",
  "Neubrandenburg", "Görlitz", "Frankfurt (Oder)", "Greifswald", "Landshut",
  "Bamberg", "Bayreuth", "Aschaffenburg", "Kempten", "Rosenheim",
  "Schweinfurt", "Passau", "Friedrichshafen", "Ravensburg", "Baden-Baden",
  "Offenburg", "Lörrach", "Singen", "Waiblingen", "Biberach",
  "Göppingen", "Heidenheim", "Aalen", "Schwäbisch Gmünd", "Böblingen"
];

// ============================================================================
// EXPANDED FRANCE CITIES (83-200)
// ============================================================================
const franceCitiesExpanded = [
  // Current 82 cities in DB, adding 83-200
  "Saint-Denis", "Argenteuil", "Rouen", "Montreuil", "Tourcoing",
  "Mulhouse", "Saint-Denis", "Caen", "Nancy", "Perpignan",
  "Orléans", "Roubaix", "Metz", "Dunkerque", "Béziers",
  "Valence", "Limoges", "Saint-Quentin", "Troyes", "Merignac",
  "Poitiers", "Chambéry", "Lorient", "Niort", "Vénissieux",
  "Pessac", "Hyères", "Antony", "Clichy", "Ivry-sur-Seine",
  "Villeurbanne", "Sartrouville", "Maisons-Alfort", "Rueil-Malmaison", "Meaux",
  "Drancy", "Noisy-le-Grand", "Pantin", "Aubervilliers", "Bondy",
  "Clamart", "Aulnay-sous-Bois", "Epinay-sur-Seine", "Vitry-sur-Seine", "Saint-Maur-des-Fossés",
  "Asnières-sur-Seine", "Colombes", "Courbevoie", "Nanterre", "Créteil",
  "Avignon", "Cannes", "Saint-Nazaire", "Colmar", "La Rochelle",
  "Antibes", "Calais", "Béziers", "Bourges", "Vannes",
  "Quimper", "Saint-Brieuc", "Laval", "Chartres", "Châteauroux",
  "Albi", "Tarbes", "Castres", "Arles", "Sète",
  "Saint-Raphaël", "Fréjus", "Cagnes-sur-Mer", "Grasse", "Draguignan",
  "Manosque", "Gap", "Digne-les-Bains", "Orange", "Carpentras",
  "Cavaillon", "Salon-de-Provence", "Istres", "Martigues", "La Ciotat",
  "Aubagne", "Vitrolles", "Les Pennes-Mirabeau", "Miramas", "Marignane",
  "Montélimar", "Romans-sur-Isère", "Vienne", "Bourg-en-Bresse", "Annemasse",
  "Thonon-les-Bains", "Cluses", "Bonneville", "Sallanches", "Annecy-le-Vieux",
  "Saint-Étienne-du-Rouvray", "Évreux", "Vernon", "Dieppe", "Elbeuf",
  "Cherbourg-en-Cotentin", "Alençon", "Lisieux", "Granville", "Bayeux",
  "Beauvais", "Compiègne", "Creil", "Senlis", "Soissons",
  "Saint-Quentin", "Laon", "Château-Thierry", "Épernay", "Châlons-en-Champagne"
];

// ============================================================================
// NEW COUNTRIES
// ============================================================================

// UK - 200 cities
const ukCities = [
  // Major cities
  "London", "Birmingham", "Manchester", "Leeds", "Glasgow",
  "Liverpool", "Newcastle", "Sheffield", "Bristol", "Edinburgh",
  "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast",
  "Nottingham", "Kingston upon Hull", "Stoke-on-Trent", "Southampton", "Derby",
  "Brighton", "Plymouth", "Wolverhampton", "Reading", "Aberdeen",
  "Swansea", "Milton Keynes", "Northampton", "Luton", "Portsmouth",
  "Sunderland", "Warrington", "York", "Oxford", "Cambridge",
  "Norwich", "Bournemouth", "Southend-on-Sea", "Peterborough", "Swindon",
  "Huddersfield", "Middlesbrough", "Poole", "Bolton", "Blackpool",
  "Ipswich", "Telford", "Slough", "Gloucester", "Watford",
  // More UK cities
  "Exeter", "Eastbourne", "Blackburn", "Colchester", "Cheltenham",
  "Crawley", "Basildon", "Maidstone", "Bedford", "Birkenhead",
  "Oldham", "Rochdale", "Rotherham", "Stockport", "Wigan",
  "Newport", "Worcester", "St Helens", "Bath", "Preston",
  "Lincoln", "Doncaster", "Hastings", "Chester", "Walsall",
  "Dundee", "Barnsley", "Grimsby", "Chesterfield", "Harrogate",
  "Halifax", "Wakefield", "Darlington", "Stevenage", "Worthing",
  "Hartlepool", "Gateshead", "Burnley", "Carlisle", "Lancaster",
  "Scarborough", "Ashford", "Aylesbury", "Basingstoke", "Bracknell",
  "Canterbury", "Chelmsford", "Chichester", "Dartford", "Guildford",
  // Scottish cities
  "Inverness", "Stirling", "Perth", "Dumfries", "Ayr",
  "Paisley", "East Kilbride", "Livingston", "Hamilton", "Cumbernauld",
  "Dunfermline", "Kirkcaldy", "Greenock", "Kilmarnock", "Coatbridge",
  "Airdrie", "Falkirk", "Motherwell", "Irvine", "Wishaw",
  // Welsh cities
  "Wrexham", "Barry", "Neath", "Cwmbran", "Bridgend",
  "Llanelli", "Port Talbot", "Pontypridd", "Caerphilly", "Rhondda",
  "Aberystwyth", "Bangor", "Colwyn Bay", "Rhyl", "Llandudno",
  "Merthyr Tydfil", "Aberdare", "Maesteg", "Porthcawl", "Penarth",
  // Northern Ireland cities
  "Derry", "Lisburn", "Newtownabbey", "Bangor", "Craigavon",
  "Newry", "Carrickfergus", "Ballymena", "Newtownards", "Coleraine",
  "Antrim", "Omagh", "Larne", "Dungannon", "Lurgan",
  "Portadown", "Enniskillen", "Strabane", "Limavady", "Cookstown",
  // More English cities
  "High Wycombe", "Hemel Hempstead", "St Albans", "Hereford", "Salisbury",
  "Shrewsbury", "Taunton", "Torquay", "Weston-super-Mare", "Weymouth",
  "Winchester", "Yeovil", "Barrow-in-Furness", "Morecambe", "Kendal",
  "Workington", "Whitehaven", "Penrith", "Bishop Auckland", "Durham",
  "Consett", "Seaham", "Spennymoor", "Newton Aycliffe", "Redcar",
  "Stockton-on-Tees", "Billingham", "Thornaby", "Yarm", "Guisborough",
  "Whitby", "Bridlington", "Goole", "Selby", "Wetherby",
  "Skipton", "Ripon", "Northallerton", "Thirsk", "Richmond",
  "Beverley", "Hessle", "Cottingham", "Brough", "Market Weighton"
];

// Australia - 100 cities
const australiaCities = [
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide",
  "Gold Coast", "Newcastle", "Canberra", "Wollongong", "Sunshine Coast",
  "Hobart", "Geelong", "Townsville", "Cairns", "Darwin",
  "Toowoomba", "Ballarat", "Bendigo", "Launceston", "Mackay",
  "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga",
  "Coffs Harbour", "Gladstone", "Mildura", "Shepparton", "Albury",
  "Port Macquarie", "Tamworth", "Orange", "Dubbo", "Geraldton",
  "Nowra", "Bathurst", "Warrnambool", "Albany", "Kalgoorlie",
  "Mount Gambier", "Lismore", "Nelson Bay", "Maitland", "Cessnock",
  "Armidale", "Grafton", "Broken Hill", "Goulburn", "Queanbeyan",
  "Tweed Heads", "Murray Bridge", "Whyalla", "Port Lincoln", "Port Augusta",
  "Mount Isa", "Emerald", "Longreach", "Charters Towers", "Bowen",
  "Airlie Beach", "Proserpine", "Innisfail", "Atherton", "Mareeba",
  "Port Douglas", "Cooktown", "Weipa", "Thursday Island", "Alice Springs",
  "Katherine", "Tennant Creek", "Nhulunbuy", "Broome", "Karratha",
  "Port Hedland", "Newman", "Tom Price", "Esperance", "Manjimup",
  "Margaret River", "Busselton", "Mandurah", "Fremantle", "Rockingham",
  "Armadale", "Joondalup", "Wanneroo", "Midland", "Morley",
  "Stirling", "Scarborough", "Cottesloe", "Subiaco", "Claremont",
  "Nedlands", "South Perth", "Victoria Park", "Belmont", "Kalamunda"
];

// Spain - 100 cities
const spainCities = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza",
  "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
  "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón",
  "L'Hospitalet", "Vitoria", "A Coruña", "Granada", "Elche",
  "Oviedo", "Badalona", "Cartagena", "Terrassa", "Jerez",
  "Sabadell", "Santa Cruz de Tenerife", "Móstoles", "Alcalá de Henares", "Pamplona",
  "Fuenlabrada", "Almería", "Leganés", "San Sebastián", "Getafe",
  "Burgos", "Santander", "Albacete", "Alcorcón", "Castellón",
  "San Cristóbal de La Laguna", "Logroño", "Badajoz", "Salamanca", "Huelva",
  "Marbella", "Lérida", "Tarragona", "León", "Cádiz",
  "Dos Hermanas", "Torrejón de Ardoz", "Parla", "Mataró", "Santa Coloma",
  "Alcobendas", "Jaén", "Ourense", "Reus", "Algeciras",
  "Telde", "Barakaldo", "Lugo", "San Fernando", "Girona",
  "Coslada", "Santiago de Compostela", "Torrevieja", "Roquetas de Mar", "Toledo",
  "Arona", "Pontevedra", "Pozuelo de Alarcón", "San Cugat", "Avilés",
  "Palencia", "Benidorm", "Chiclana", "El Puerto de Santa María", "Manresa",
  "Ciudad Real", "Rubí", "Vilanova i la Geltrú", "Arrecife", "Majadahonda",
  "El Ejido", "Gandía", "Estepona", "Granollers", "Sanlúcar de Barrameda",
  "Mieres", "Mollet del Vallès", "Ferrol", "Paterna", "Fuengirola",
  "Vélez-Málaga", "Sant Boi de Llobregat", "Viladecans", "Motril", "Elda"
];

// Italy - 100 cities
const italyCities = [
  "Roma", "Milano", "Napoli", "Torino", "Palermo",
  "Genova", "Bologna", "Firenze", "Bari", "Catania",
  "Venezia", "Verona", "Messina", "Padova", "Trieste",
  "Brescia", "Taranto", "Prato", "Parma", "Modena",
  "Reggio Calabria", "Reggio Emilia", "Perugia", "Livorno", "Ravenna",
  "Cagliari", "Foggia", "Rimini", "Salerno", "Ferrara",
  "Sassari", "Latina", "Giugliano", "Monza", "Siracusa",
  "Pescara", "Bergamo", "Forlì", "Trento", "Vicenza",
  "Terni", "Bolzano", "Novara", "Piacenza", "Ancona",
  "Andria", "Arezzo", "Udine", "Cesena", "Lecce",
  "Pesaro", "Barletta", "Alessandria", "La Spezia", "Pisa",
  "Catanzaro", "Pistoia", "Brindisi", "Como", "Grosseto",
  "Caserta", "Lucca", "Treviso", "Varese", "Asti",
  "Ragusa", "Cremona", "Cosenza", "Massa", "Trapani",
  "Potenza", "Viterbo", "Savona", "Benevento", "Crotone",
  "Matera", "Caltanissetta", "Agrigento", "Cuneo", "Lodi",
  "Campobasso", "Rieti", "Vibo Valentia", "Enna", "Oristano",
  "Biella", "Nuoro", "Belluno", "Gorizia", "Pordenone",
  "Rovigo", "Lecco", "Sondrio", "Aosta", "Imperia",
  "Verbania", "Mantova", "Pavia", "Siena", "Ascoli Piceno"
];

async function expandDatabase() {
  console.log("🚀 MEGA EXPANSION - Target: 100k+ businesses\n");
  console.log("=".repeat(60));

  // Get existing country IDs
  const countries = await sql`SELECT id, name, slug FROM countries`;
  const countryMap = new Map(countries.map(c => [c.slug, c.id]));

  // ========================================================================
  // 1. EXPAND USA (150 → 300 cities)
  // ========================================================================
  console.log("\n🇺🇸 EXPANDING USA (adding 150 more cities)...");
  const usaId = countryMap.get("usa");
  if (usaId) {
    const existingUS = await sql`SELECT slug FROM cities WHERE country_id = ${usaId}`;
    const existingSlugs = new Set(existingUS.map(c => c.slug));
    let added = 0;
    for (const name of usaCitiesExpanded) {
      const slug = slugify(name);
      if (!existingSlugs.has(slug)) {
        await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${usaId})`;
        added++;
      }
    }
    console.log(`   ✅ Added ${added} new US cities`);
  }

  // ========================================================================
  // 2. EXPAND CANADA (100 → 200 cities)
  // ========================================================================
  console.log("\n🇨🇦 EXPANDING CANADA (adding 100 more cities)...");
  const canadaId = countryMap.get("canada");
  if (canadaId) {
    const existingCA = await sql`SELECT slug FROM cities WHERE country_id = ${canadaId}`;
    const existingSlugs = new Set(existingCA.map(c => c.slug));
    let added = 0;
    for (const name of canadaCitiesExpanded) {
      const slug = slugify(name);
      if (!existingSlugs.has(slug)) {
        await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${canadaId})`;
        added++;
      }
    }
    console.log(`   ✅ Added ${added} new Canadian cities`);
  }

  // ========================================================================
  // 3. EXPAND GERMANY (49 → 200 cities)
  // ========================================================================
  console.log("\n🇩🇪 EXPANDING GERMANY (adding 151 more cities)...");
  const germanyId = countryMap.get("germany");
  if (germanyId) {
    const existingDE = await sql`SELECT slug FROM cities WHERE country_id = ${germanyId}`;
    const existingSlugs = new Set(existingDE.map(c => c.slug));
    let added = 0;
    for (const name of germanyCitiesExpanded) {
      const slug = slugify(name);
      if (!existingSlugs.has(slug)) {
        await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${germanyId})`;
        added++;
      }
    }
    console.log(`   ✅ Added ${added} new German cities`);
  }

  // ========================================================================
  // 4. EXPAND FRANCE (82 → 200 cities)
  // ========================================================================
  console.log("\n🇫🇷 EXPANDING FRANCE (adding 118 more cities)...");
  const franceId = countryMap.get("france");
  if (franceId) {
    const existingFR = await sql`SELECT slug FROM cities WHERE country_id = ${franceId}`;
    const existingSlugs = new Set(existingFR.map(c => c.slug));
    let added = 0;
    for (const name of franceCitiesExpanded) {
      const slug = slugify(name);
      if (!existingSlugs.has(slug)) {
        await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${franceId})`;
        added++;
      }
    }
    console.log(`   ✅ Added ${added} new French cities`);
  }

  // ========================================================================
  // 5. ADD UK (new country with 200 cities)
  // ========================================================================
  console.log("\n🇬🇧 ADDING UNITED KINGDOM (200 cities)...");
  let ukId = countryMap.get("uk");
  if (!ukId) {
    const result = await sql`
      INSERT INTO countries (name, slug, language, currency, locale)
      VALUES ('United Kingdom', 'uk', 'en', 'GBP', 'en-GB')
      RETURNING id
    `;
    ukId = result[0].id;
    console.log(`   Created country: United Kingdom (id: ${ukId})`);
  }
  const existingUK = await sql`SELECT slug FROM cities WHERE country_id = ${ukId}`;
  const existingUKSlugs = new Set(existingUK.map(c => c.slug));
  let ukAdded = 0;
  for (const name of ukCities) {
    const slug = slugify(name);
    if (!existingUKSlugs.has(slug)) {
      await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${ukId})`;
      ukAdded++;
    }
  }
  console.log(`   ✅ Added ${ukAdded} UK cities`);

  // ========================================================================
  // 6. ADD AUSTRALIA (new country with 100 cities)
  // ========================================================================
  console.log("\n🇦🇺 ADDING AUSTRALIA (100 cities)...");
  let auId = countryMap.get("australia");
  if (!auId) {
    const result = await sql`
      INSERT INTO countries (name, slug, language, currency, locale)
      VALUES ('Australia', 'australia', 'en', 'AUD', 'en-AU')
      RETURNING id
    `;
    auId = result[0].id;
    console.log(`   Created country: Australia (id: ${auId})`);
  }
  const existingAU = await sql`SELECT slug FROM cities WHERE country_id = ${auId}`;
  const existingAUSlugs = new Set(existingAU.map(c => c.slug));
  let auAdded = 0;
  for (const name of australiaCities) {
    const slug = slugify(name);
    if (!existingAUSlugs.has(slug)) {
      await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${auId})`;
      auAdded++;
    }
  }
  console.log(`   ✅ Added ${auAdded} Australian cities`);

  // ========================================================================
  // 7. ADD SPAIN (new country with 100 cities)
  // ========================================================================
  console.log("\n🇪🇸 ADDING SPAIN (100 cities)...");
  let esId = countryMap.get("spain");
  if (!esId) {
    const result = await sql`
      INSERT INTO countries (name, slug, language, currency, locale)
      VALUES ('Spain', 'spain', 'es', 'EUR', 'es-ES')
      RETURNING id
    `;
    esId = result[0].id;
    console.log(`   Created country: Spain (id: ${esId})`);
  }
  const existingES = await sql`SELECT slug FROM cities WHERE country_id = ${esId}`;
  const existingESSlugs = new Set(existingES.map(c => c.slug));
  let esAdded = 0;
  for (const name of spainCities) {
    const slug = slugify(name);
    if (!existingESSlugs.has(slug)) {
      await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${esId})`;
      esAdded++;
    }
  }
  console.log(`   ✅ Added ${esAdded} Spanish cities`);

  // ========================================================================
  // 8. ADD ITALY (new country with 100 cities)
  // ========================================================================
  console.log("\n🇮🇹 ADDING ITALY (100 cities)...");
  let itId = countryMap.get("italy");
  if (!itId) {
    const result = await sql`
      INSERT INTO countries (name, slug, language, currency, locale)
      VALUES ('Italy', 'italy', 'it', 'EUR', 'it-IT')
      RETURNING id
    `;
    itId = result[0].id;
    console.log(`   Created country: Italy (id: ${itId})`);
  }
  const existingIT = await sql`SELECT slug FROM cities WHERE country_id = ${itId}`;
  const existingITSlugs = new Set(existingIT.map(c => c.slug));
  let itAdded = 0;
  for (const name of italyCities) {
    const slug = slugify(name);
    if (!existingITSlugs.has(slug)) {
      await sql`INSERT INTO cities (name, slug, country_id) VALUES (${name}, ${slug}, ${itId})`;
      itAdded++;
    }
  }
  console.log(`   ✅ Added ${itAdded} Italian cities`);

  // ========================================================================
  // FINAL SUMMARY
  // ========================================================================
  console.log("\n" + "=".repeat(60));
  console.log("📊 FINAL DATABASE STATUS:");
  console.log("=".repeat(60));

  const finalCounts = await sql`
    SELECT c.name, c.slug, COUNT(ci.id) as city_count
    FROM countries c
    LEFT JOIN cities ci ON ci.country_id = c.id
    GROUP BY c.id, c.name, c.slug
    ORDER BY city_count DESC
  `;

  let totalCities = 0;
  for (const row of finalCounts) {
    console.log(`   ${row.name} (${row.slug}): ${row.city_count} cities`);
    totalCities += parseInt(row.city_count);
  }
  console.log(`\n   TOTAL CITIES: ${totalCities}`);

  // Calculate potential
  const avgPlacesPerCity = 70; // Based on current data
  const potentialPlaces = totalCities * avgPlacesPerCity;
  console.log(`\n🎯 POTENTIAL PLACES: ~${potentialPlaces.toLocaleString()}`);
  console.log("   (assuming ~70 places per city average)");

  console.log("\n" + "=".repeat(60));
  console.log("✅ EXPANSION COMPLETE!");
  console.log("=".repeat(60));
  console.log("\nNext steps:");
  console.log("1. Run discovery scripts for each country");
  console.log("2. Each country can run in parallel in separate terminals");
  console.log("\nExample commands:");
  console.log("   ./scripts/discover-usa.sh");
  console.log("   ./scripts/discover-canada.sh");
  console.log("   ./scripts/discover-uk.sh");
  console.log("   ./scripts/discover-australia.sh");
  console.log("   ./scripts/discover-spain.sh");
  console.log("   ./scripts/discover-italy.sh");
  console.log("   ./scripts/discover-germany.sh");
  console.log("   ./scripts/discover-france.sh");
}

expandDatabase().catch(e => {
  console.error(e);
  process.exit(1);
});
