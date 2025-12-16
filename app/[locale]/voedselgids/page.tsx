/**
 * Voedselgids Overview Page - Complete Pet Food Guide
 * Combines: 53 toxic substances + 27 safe foods = 80+ pages
 * Type: SEO Indexed Hub Page (Pillar Content)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Search, Dog, Cat, Apple, Pill, Leaf, Home as HomeIcon, ChevronRight, BookOpen, Shield, Info } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Voedselgids voor Honden & Katten | Wat Mag Je Huisdier Wel en Niet Eten?",
  description: "Complete voedselgids met 80+ pagina's over veilig en giftig voedsel voor honden en katten. Ontdek wat je huisdier wel en niet mag eten, van fruit en groenten tot gevaarlijke stoffen.",
  keywords: ["voedselgids hond", "voedselgids kat", "wat mag een hond eten", "wat mag een kat eten", "giftig voedsel huisdieren", "veilig voedsel hond", "veilig voedsel kat", "huisdier voeding", "hond eten geven", "kat eten geven"],
  openGraph: {
    title: "Voedselgids voor Honden & Katten | Complete Gids",
    description: "Ontdek wat je hond of kat wel en niet mag eten. 80+ gedetailleerde pagina's over veilig en giftig voedsel.",
    type: "website",
    locale: "nl_NL",
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/voedselgids",
  },
};

// JSON-LD Schema for the hub page
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Voedselgids voor Honden & Katten",
  description: "Complete gids met 80+ pagina's over wat huisdieren wel en niet mogen eten.",
  url: "https://cutiepawspedia.com/nl/voedselgids",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Veilige Voeding",
        url: "https://cutiepawspedia.com/nl/veilige-voeding",
        description: "27+ veilige voedingsmiddelen voor honden en katten",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Giftige Stoffen",
        url: "https://cutiepawspedia.com/nl/giftige-stoffen",
        description: "53+ gevaarlijke stoffen voor huisdieren",
      },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cutiepawspedia.com/nl" },
      { "@type": "ListItem", position: 2, name: "Voedselgids" },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "CutiePawsPedia",
    url: "https://cutiepawspedia.com",
  },
};

// Safe foods for dogs
const safeFoodsDogs = [
  { slug: "rijst", name: "Rijst", icon: "🍚" },
  { slug: "bosbessen", name: "Bosbessen", icon: "🫐" },
  { slug: "broccoli", name: "Broccoli", icon: "🥦" },
  { slug: "kip", name: "Kip", icon: "🍗" },
  { slug: "wortel", name: "Wortel", icon: "🥕" },
  { slug: "wortelen", name: "Wortelen", icon: "🥕" },
  { slug: "pindakaas", name: "Pindakaas", icon: "🥜" },
  { slug: "komkommer", name: "Komkommer", icon: "🥒" },
  { slug: "spinazie", name: "Spinazie", icon: "🥬" },
  { slug: "banaan", name: "Banaan", icon: "🍌" },
  { slug: "watermeloen", name: "Watermeloen", icon: "🍉" },
  { slug: "kaas", name: "Kaas", icon: "🧀" },
  { slug: "appel", name: "Appel", icon: "🍎" },
  { slug: "ei", name: "Ei", icon: "🥚" },
  { slug: "pompoen", name: "Pompoen", icon: "🎃" },
  { slug: "aardbeien", name: "Aardbeien", icon: "🍓" },
  { slug: "peer", name: "Peer", icon: "🍐" },
  { slug: "zoete-aardappel", name: "Zoete Aardappel", icon: "🍠" },
];

// Safe foods for cats
const safeFoodsCats = [
  { slug: "tonijn", name: "Tonijn", icon: "🐟" },
  { slug: "pompoen", name: "Pompoen", icon: "🎃" },
  { slug: "spinazie", name: "Spinazie", icon: "🥬" },
  { slug: "ei", name: "Ei", icon: "🥚" },
  { slug: "kalkoen", name: "Kalkoen", icon: "🦃" },
  { slug: "watermeloen", name: "Watermeloen", icon: "🍉" },
  { slug: "kip", name: "Kip", icon: "🍗" },
  { slug: "zalm", name: "Zalm", icon: "🐟" },
  { slug: "rijst", name: "Rijst", icon: "🍚" },
];

// Toxic foods/substances for dogs
const toxicDogs = [
  { slug: "chocolade", name: "Chocolade", icon: "🍫", level: "hoog" },
  { slug: "druiven", name: "Druiven", icon: "🍇", level: "hoog" },
  { slug: "rozijnen", name: "Rozijnen", icon: "🍇", level: "hoog" },
  { slug: "xylitol", name: "Xylitol", icon: "🍬", level: "hoog" },
  { slug: "ui", name: "Ui", icon: "🧅", level: "middel" },
  { slug: "knoflook", name: "Knoflook", icon: "🧄", level: "middel" },
  { slug: "avocado", name: "Avocado", icon: "🥑", level: "laag" },
  { slug: "macadamia-noten", name: "Macadamia Noten", icon: "🥜", level: "middel" },
  { slug: "alcohol", name: "Alcohol", icon: "🍺", level: "hoog" },
  { slug: "cafeine", name: "Cafeïne", icon: "☕", level: "hoog" },
];

// Toxic foods/substances for cats
const toxicCats = [
  { slug: "lelie", name: "Lelie", icon: "🌺", level: "hoog" },
  { slug: "ui", name: "Ui", icon: "🧅", level: "hoog" },
  { slug: "knoflook", name: "Knoflook", icon: "🧄", level: "hoog" },
  { slug: "chocolade", name: "Chocolade", icon: "🍫", level: "middel" },
  { slug: "paracetamol", name: "Paracetamol", icon: "💊", level: "hoog" },
  { slug: "tulp", name: "Tulp", icon: "🌷", level: "middel" },
];

// Toxic plants
const toxicPlants = [
  { slug: "lelie", name: "Lelie", animal: "katten", icon: "🌺", level: "hoog" },
  { slug: "tulp", name: "Tulp", animal: "katten", icon: "🌷", level: "middel" },
  { slug: "azalea", name: "Azalea", animal: "honden", icon: "🌸", level: "hoog" },
  { slug: "oleander", name: "Oleander", animal: "honden", icon: "🌺", level: "hoog" },
  { slug: "narcis", name: "Narcis", animal: "honden", icon: "🌼", level: "middel" },
  { slug: "monstera", name: "Monstera", animal: "katten", icon: "🌱", level: "laag" },
  { slug: "kerstster", name: "Kerstster", animal: "katten", icon: "⭐", level: "laag" },
];

// Toxic medications
const toxicMedications = [
  { slug: "paracetamol", name: "Paracetamol", animal: "katten", icon: "💊", level: "hoog" },
  { slug: "ibuprofen", name: "Ibuprofen", animal: "honden", icon: "💊", level: "hoog" },
  { slug: "aspirine", name: "Aspirine", animal: "katten", icon: "💊", level: "hoog" },
  { slug: "antidepressiva", name: "Antidepressiva", animal: "honden", icon: "💊", level: "hoog" },
];

const levelColors = {
  hoog: "bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200",
  middel: "bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-200",
  laag: "bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200",
};

export default function VoedselgidsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpCoral/5 to-transparent dark:from-cpCoral/20 dark:via-cpCoral/5 dark:to-transparent border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Breadcrumb with JSON-LD */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[]}
            currentPage="Voedselgids"
          />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Voedselgids voor Honden & Katten
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/70 max-w-3xl mb-8">
            Complete gids met 80+ pagina's over wat je huisdier wel en niet mag eten.
            Van veilige snacks tot gevaarlijke stoffen - alles wat je moet weten.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">27+</div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">Veilige voedingsmiddelen</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">53+</div>
              <div className="text-sm text-red-700 dark:text-red-300">Giftige stoffen</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">40+</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Voor honden</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">30+</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Voor katten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Quick Navigation */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/nl/veilige-voeding"
            className="group bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">Veilige Voeding</h2>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 mb-4">
              27+ veilige snacks en voedingsmiddelen die je hond of kat zonder zorgen kan eten.
            </p>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline">
              Bekijk alle veilige voeding →
            </span>
          </Link>

          <Link
            href="/nl/giftige-stoffen"
            className="group bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700 hover:border-red-500 dark:hover:border-red-500 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Giftige Stoffen</h2>
            </div>
            <p className="text-red-700 dark:text-red-300 mb-4">
              53+ gevaarlijke stoffen waaronder voedsel, planten, medicijnen en huishoudelijke producten.
            </p>
            <span className="text-red-600 dark:text-red-400 font-medium group-hover:underline">
              Bekijk alle giftige stoffen →
            </span>
          </Link>
        </div>

        {/* Pillar Content - SEO Text Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-cpSurface/50 dark:to-cpSurface/30 rounded-2xl p-8 border border-slate-200 dark:border-cpSurface">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-cpCoral" />
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream m-0">Waarom Sommige Voedingsmiddelen Gevaarlijk Zijn</h2>
            </div>

            <div className="text-muted-foreground dark:text-cpCream/80 space-y-4">
              <p>
                Het spijsverteringssysteem van honden en katten verschilt fundamenteel van dat van mensen.
                Wat voor ons volkomen veilig is, kan voor onze huisdieren <strong>levensgevaarlijk</strong> zijn.
                Dit komt doordat hun lever bepaalde stoffen niet kan afbreken, of doordat hun maag-darmkanaal
                anders reageert op specifieke ingrediënten.
              </p>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">De Drie Grootste Gevaren</h3>

              <p>
                <strong>1. Theobromine in chocolade</strong> – Honden en katten kunnen theobromine niet snel
                genoeg afbreken. Terwijl wij een reep chocolade binnen enkele uren verwerken, kan het bij een
                hond wel 17 uur duren. Dit leidt tot ophoping van de stof in het bloed, wat hartproblemen en
                zenuwschade veroorzaakt. Pure chocolade is het gevaarlijkst: slechts 100 gram kan dodelijk zijn
                voor een hond van 10 kg.
              </p>

              <p>
                <strong>2. Lelies voor katten</strong> – Alle delen van de lelieplant zijn extreem giftig voor
                katten, inclusief het stuifmeel en het water uit de vaas. Zelfs het likken van een klein beetje
                stuifmeel kan binnen 24-72 uur leiden tot acuut nierfalen. Dit maakt lelies de meest dodelijke
                plant voor katten in Nederlandse huishoudens.
              </p>

              <p>
                <strong>3. Xylitol (zoetstof)</strong> – Deze suikervervanger, aanwezig in tandpasta, kauwgom en
                veel "suikervrije" producten, veroorzaakt bij honden een plotselinge insulineafgifte. Dit kan
                binnen 10-60 minuten leiden tot hypoglykemie (te lage bloedsuiker), wat levensbedreigende
                stuiptrekkingen en leverfalen kan veroorzaken.
              </p>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">Seizoensgebonden Risico's</h3>

              <p>
                De kans op vergiftiging is het hoogst tijdens <strong>feestdagen</strong>. Met Kerst en Pasen
                ligt er meer chocolade in huis, tijdens de zomer eten we meer druiven en fruit, en in het najaar
                vallen paddenstoelen en noten in de tuin. Let extra op tijdens:
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Kerst:</strong> Chocolade, rozijnen in kersttol, kerststerren, amaryllisbollen</li>
                <li><strong>Pasen:</strong> Paaseitjes, lelies in boeketten, kunstgras dat kan worden ingeslikt</li>
                <li><strong>Zomer:</strong> Druiven, avocado's, macadamianoten op terrassen</li>
                <li><strong>Herfst:</strong> Paddenstoelen in de tuin, gevallen noten, antivries bij auto's</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">Veilige Alternatieven</h3>

              <p>
                Gelukkig zijn er genoeg <strong>veilige snacks</strong> die je hond of kat wél mag eten. Wortels,
                appels (zonder pitjes), blauwe bessen en pompoen zijn uitstekende traktaties die ook nog eens
                vol vitaminen zitten. Voor katten zijn gekookte kip, tonijn in water (met mate) en gekookt ei
                veilige opties. Het belangrijkste is: <em>introduceer nieuwe voedingsmiddelen altijd geleidelijk</em>
                en in kleine hoeveelheden.
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mt-6 border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-200 text-sm m-0">
                  <strong>💡 Tip:</strong> Twijfel je of iets veilig is? Geef het dan niet. Raadpleeg eerst
                  onze gedetailleerde pagina's of bel je dierenarts. Het is beter om voorzichtig te zijn dan
                  achteraf spijt te hebben.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safe Foods Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Veilig Voedsel</h2>
          </div>

          {/* Dogs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Dog className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream">Voor Honden</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {safeFoodsDogs.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-hond-${food.slug}-eten`}
                  className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors text-center group"
                >
                  <span className="text-2xl block mb-1">{food.icon}</span>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200 group-hover:text-emerald-600">{food.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Cats */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cat className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream">Voor Katten</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {safeFoodsCats.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-kat-${food.slug}-eten`}
                  className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors text-center group"
                >
                  <span className="text-2xl block mb-1">{food.icon}</span>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200 group-hover:text-emerald-600">{food.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Toxic Foods Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Giftig Voedsel</h2>
          </div>

          {/* Dogs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Dog className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream">Voor Honden</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {toxicDogs.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/is-${food.slug}-giftig-voor-honden`}
                  className={`rounded-lg p-3 border-l-4 transition-colors group ${levelColors[food.level as keyof typeof levelColors]}`}
                >
                  <span className="text-2xl block mb-1">{food.icon}</span>
                  <span className="text-sm font-medium group-hover:underline">{food.name}</span>
                  <span className="text-xs block mt-1 uppercase font-bold opacity-75">{food.level}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Cats */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cat className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream">Voor Katten</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {toxicCats.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/is-${food.slug}-giftig-voor-katten`}
                  className={`rounded-lg p-3 border-l-4 transition-colors group ${levelColors[food.level as keyof typeof levelColors]}`}
                >
                  <span className="text-2xl block mb-1">{food.icon}</span>
                  <span className="text-sm font-medium group-hover:underline">{food.name}</span>
                  <span className="text-xs block mt-1 uppercase font-bold opacity-75">{food.level}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Plants Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Giftige Planten</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {toxicPlants.map((plant) => (
              <Link
                key={`${plant.slug}-${plant.animal}`}
                href={`/nl/is-${plant.slug}-giftig-voor-${plant.animal}`}
                className={`rounded-lg p-3 border-l-4 transition-colors group ${levelColors[plant.level as keyof typeof levelColors]}`}
              >
                <span className="text-2xl block mb-1">{plant.icon}</span>
                <span className="text-sm font-medium group-hover:underline">{plant.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs opacity-75">{plant.animal === "honden" ? "🐕" : "🐱"}</span>
                  <span className="text-xs uppercase font-bold opacity-75">{plant.level}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/nl/giftige-stoffen"
              className="text-cpCoral hover:underline font-medium"
            >
              Bekijk alle 15+ giftige planten →
            </Link>
          </div>
        </section>

        {/* Medications Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Pill className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Gevaarlijke Medicijnen</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {toxicMedications.map((med) => (
              <Link
                key={`${med.slug}-${med.animal}`}
                href={`/nl/is-${med.slug}-giftig-voor-${med.animal}`}
                className={`rounded-lg p-3 border-l-4 transition-colors group ${levelColors[med.level as keyof typeof levelColors]}`}
              >
                <span className="text-2xl block mb-1">{med.icon}</span>
                <span className="text-sm font-medium group-hover:underline">{med.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs opacity-75">{med.animal === "honden" ? "🐕" : "🐱"}</span>
                  <span className="text-xs uppercase font-bold opacity-75">{med.level}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/nl/giftige-stoffen"
              className="text-cpCoral hover:underline font-medium"
            >
              Bekijk alle 10+ gevaarlijke medicijnen →
            </Link>
          </div>
        </section>

        {/* Emergency Box */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700 mb-12">
          <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Noodgeval? Bel Direct Je Dierenarts
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">
            Vermoedt je dat je huisdier iets giftigs heeft gegeten? Wacht niet af tot symptomen erger worden.
            Neem direct contact op met je dierenarts of de dierennoodhulp in je regio.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Belangrijke Informatie</h3>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• Wat heeft je huisdier gegeten?</li>
                <li>• Hoeveel (geschat)?</li>
                <li>• Hoe lang geleden?</li>
                <li>• Welke symptomen zie je?</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-cpSurface/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Wat te Doen</h3>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• Blijf kalm</li>
                <li>• Laat je huisdier niet braken zonder advies</li>
                <li>• Bewaar verpakking of restanten</li>
                <li>• Bel direct de dierenarts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-muted/50 dark:bg-cpSurface/30 rounded-xl p-6 text-sm text-muted-foreground dark:text-cpCream/60">
          <p>
            <strong>Disclaimer:</strong> Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies.
            Bij twijfel over de voeding van je huisdier, raadpleeg altijd een dierenarts.
            De informatie op deze pagina's is zorgvuldig samengesteld maar kan niet garanderen volledig of actueel te zijn.
          </p>
        </section>
      </div>
    </div>
  );
}
