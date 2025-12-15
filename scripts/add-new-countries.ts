#!/usr/bin/env npx tsx
/**
 * Add new countries: UK, Australia, Spain, Italy
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

// UK - 200 cities
const ukCities = [
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
  "Inverness", "Stirling", "Perth", "Dumfries", "Ayr",
  "Paisley", "East Kilbride", "Livingston", "Hamilton", "Cumbernauld",
  "Dunfermline", "Kirkcaldy", "Greenock", "Kilmarnock", "Coatbridge",
  "Airdrie", "Falkirk", "Motherwell", "Irvine", "Wishaw",
  "Wrexham", "Barry", "Neath", "Cwmbran", "Bridgend",
  "Llanelli", "Port Talbot", "Pontypridd", "Caerphilly", "Rhondda",
  "Aberystwyth", "Bangor", "Colwyn Bay", "Rhyl", "Llandudno",
  "Merthyr Tydfil", "Aberdare", "Maesteg", "Porthcawl", "Penarth",
  "Derry", "Lisburn", "Newtownabbey", "Bangor NI", "Craigavon",
  "Newry", "Carrickfergus", "Ballymena", "Newtownards", "Coleraine",
  "Antrim", "Omagh", "Larne", "Dungannon", "Lurgan",
  "Portadown", "Enniskillen", "Strabane", "Limavady", "Cookstown",
  "High Wycombe", "Hemel Hempstead", "St Albans", "Hereford", "Salisbury",
  "Shrewsbury", "Taunton", "Torquay", "Weston-super-Mare", "Weymouth",
  "Winchester", "Yeovil", "Barrow-in-Furness", "Morecambe", "Kendal",
  "Workington", "Whitehaven", "Penrith", "Bishop Auckland", "Durham",
  "Consett", "Seaham", "Spennymoor", "Newton Aycliffe", "Redcar",
  "Stockton-on-Tees", "Billingham", "Thornaby", "Yarm", "Guisborough",
  "Whitby", "Bridlington", "Goole", "Selby", "Wetherby"
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
  "Port Douglas", "Cooktown", "Alice Springs", "Katherine", "Broome",
  "Karratha", "Port Hedland", "Newman", "Esperance", "Manjimup",
  "Margaret River", "Busselton", "Mandurah", "Fremantle", "Rockingham",
  "Armadale AU", "Joondalup", "Wanneroo", "Midland AU", "Morley",
  "Stirling AU", "Scarborough AU", "Cottesloe", "Subiaco", "Claremont AU",
  "Nedlands", "South Perth", "Victoria Park", "Belmont AU", "Kalamunda"
];

// Spain - 100 cities
const spainCities = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza",
  "Malaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
  "Alicante", "Cordoba", "Valladolid", "Vigo", "Gijon",
  "Hospitalet", "Vitoria", "A Coruna", "Granada", "Elche",
  "Oviedo", "Badalona", "Cartagena", "Terrassa", "Jerez",
  "Sabadell", "Santa Cruz de Tenerife", "Mostoles", "Alcala de Henares", "Pamplona",
  "Fuenlabrada", "Almeria", "Leganes", "San Sebastian", "Getafe",
  "Burgos", "Santander", "Albacete", "Alcorcon", "Castellon",
  "San Cristobal de La Laguna", "Logrono", "Badajoz", "Salamanca", "Huelva",
  "Marbella", "Lerida", "Tarragona", "Leon", "Cadiz",
  "Dos Hermanas", "Torrejon de Ardoz", "Parla", "Mataro", "Santa Coloma",
  "Alcobendas", "Jaen", "Ourense", "Reus", "Algeciras",
  "Telde", "Barakaldo", "Lugo", "San Fernando", "Girona",
  "Coslada", "Santiago de Compostela", "Torrevieja", "Roquetas de Mar", "Toledo",
  "Arona", "Pontevedra", "Pozuelo de Alarcon", "San Cugat", "Aviles",
  "Palencia", "Benidorm", "Chiclana", "El Puerto de Santa Maria", "Manresa",
  "Ciudad Real", "Rubi", "Vilanova i la Geltru", "Arrecife", "Majadahonda",
  "El Ejido", "Gandia", "Estepona", "Granollers", "Sanlucar de Barrameda",
  "Mieres", "Mollet del Valles", "Ferrol", "Paterna", "Fuengirola",
  "Velez-Malaga", "Sant Boi de Llobregat", "Viladecans", "Motril", "Elda"
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
  "Pescara", "Bergamo", "Forli", "Trento", "Vicenza",
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

async function addCountryWithCities(name: string, slug: string, code: string, cities: string[]) {
  // Check if country exists
  let countryResult = await sql`SELECT id FROM countries WHERE slug = ${slug}`;
  let countryId: number;

  if (countryResult.length === 0) {
    // Create country
    const insertResult = await sql`
      INSERT INTO countries (name, slug, code)
      VALUES (${name}, ${slug}, ${code})
      RETURNING id
    `;
    countryId = insertResult[0].id;
    console.log(`   Created country: ${name} (id: ${countryId})`);
  } else {
    countryId = countryResult[0].id;
    console.log(`   Country exists: ${name} (id: ${countryId})`);
  }

  // Get existing cities
  const existingCities = await sql`SELECT slug FROM cities WHERE country_id = ${countryId}`;
  const existingSlugs = new Set(existingCities.map(c => c.slug));

  // Add new cities
  let added = 0;
  for (const cityName of cities) {
    const citySlug = slugify(cityName);
    if (!existingSlugs.has(citySlug)) {
      await sql`INSERT INTO cities (name, slug, country_id) VALUES (${cityName}, ${citySlug}, ${countryId})`;
      added++;
    }
  }

  console.log(`   ✅ Added ${added} cities (${cities.length - added} already existed)`);
  return added;
}

async function main() {
  console.log("🌍 ADDING NEW COUNTRIES\n");
  console.log("=".repeat(60));

  console.log("\n🇬🇧 United Kingdom...");
  await addCountryWithCities("United Kingdom", "uk", "GB", ukCities);

  console.log("\n🇦🇺 Australia...");
  await addCountryWithCities("Australia", "australia", "AU", australiaCities);

  console.log("\n🇪🇸 Spain...");
  await addCountryWithCities("Spain", "spain", "ES", spainCities);

  console.log("\n🇮🇹 Italy...");
  await addCountryWithCities("Italy", "italy", "IT", italyCities);

  // Final summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 FINAL DATABASE STATUS:");
  console.log("=".repeat(60));

  const finalCounts = await sql`
    SELECT c.name, c.slug, c.code, COUNT(ci.id) as city_count
    FROM countries c
    LEFT JOIN cities ci ON ci.country_id = c.id
    GROUP BY c.id, c.name, c.slug, c.code
    ORDER BY city_count DESC
  `;

  let totalCities = 0;
  for (const row of finalCounts) {
    console.log(`   ${row.name} (${row.code}): ${row.city_count} cities`);
    totalCities += parseInt(row.city_count as string);
  }

  console.log(`\n   TOTAL CITIES: ${totalCities}`);
  console.log(`   POTENTIAL PLACES: ~${(totalCities * 70).toLocaleString()} (at ~70/city avg)`);

  console.log("\n" + "=".repeat(60));
  console.log("✅ COMPLETE!");
  console.log("=".repeat(60));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
