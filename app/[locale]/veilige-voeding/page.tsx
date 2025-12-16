/**
 * Veilige Voeding Overview Page - Safe Pet Food Guide
 * Contains all 27+ safe foods for dogs and cats
 * Type: SEO Indexed Hub Page
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Dog, Cat, Home as HomeIcon, Apple, Carrot, Fish, Egg, BookOpen } from "lucide-react";
import { FoodGuideBreadcrumb } from "@/components/seo/FoodGuideBreadcrumb";

export const metadata: Metadata = {
  title: "Veilige Voeding voor Honden & Katten | Wat Mag Je Huisdier Eten?",
  description: "Complete gids met 27+ veilige voedingsmiddelen voor honden en katten. Ontdek welke gezonde snacks je huisdier mag eten, van fruit tot groenten tot vlees.",
  keywords: ["veilig voedsel hond", "veilig voedsel kat", "wat mag een hond eten", "wat mag een kat eten", "gezonde snacks hond", "gezonde snacks kat", "fruit hond", "groenten hond"],
  openGraph: {
    title: "Veilige Voeding voor Honden & Katten | Complete Gids",
    description: "Ontdek 27+ veilige voedingsmiddelen die je hond of kat mag eten. Gezonde snacks en traktaties voor je huisdier.",
    type: "website",
    locale: "nl_NL",
  },
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/veilige-voeding",
  },
};

// JSON-LD Schema for safe food hub page
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Veilige Voeding voor Honden & Katten",
  description: "Complete gids met 27+ veilige voedingsmiddelen voor honden en katten.",
  url: "https://cutiepawspedia.com/nl/veilige-voeding",
  isPartOf: {
    "@type": "WebPage",
    name: "Voedselgids",
    url: "https://cutiepawspedia.com/nl/voedselgids",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Fruit voor Honden", description: "6 veilige fruitsoorten" },
      { "@type": "ListItem", position: 2, name: "Groenten voor Honden", description: "7 veilige groenten" },
      { "@type": "ListItem", position: 3, name: "Eiwitten voor Katten", description: "5 veilige eiwitbronnen" },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cutiepawspedia.com/nl" },
      { "@type": "ListItem", position: 2, name: "Voedselgids", item: "https://cutiepawspedia.com/nl/voedselgids" },
      { "@type": "ListItem", position: 3, name: "Veilige Voeding" },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "CutiePawsPedia",
    url: "https://cutiepawspedia.com",
  },
};

// Safe foods organized by category
const safeFoodsDogs = {
  fruit: [
    { slug: "bosbessen", name: "Bosbessen", icon: "🫐", benefit: "Rijk aan antioxidanten" },
    { slug: "banaan", name: "Banaan", icon: "🍌", benefit: "Goede energiebron" },
    { slug: "watermeloen", name: "Watermeloen", icon: "🍉", benefit: "Hydraterend en verfrissend" },
    { slug: "appel", name: "Appel", icon: "🍎", benefit: "Vitamines en vezels" },
    { slug: "aardbeien", name: "Aardbeien", icon: "🍓", benefit: "Vitamine C boost" },
    { slug: "peer", name: "Peer", icon: "🍐", benefit: "Zacht en verteerbaar" },
  ],
  groenten: [
    { slug: "wortel", name: "Wortel", icon: "🥕", benefit: "Goed voor tanden" },
    { slug: "wortelen", name: "Wortelen (gekookt)", icon: "🥕", benefit: "Makkelijk verteerbaar" },
    { slug: "broccoli", name: "Broccoli", icon: "🥦", benefit: "Vol vitamines" },
    { slug: "komkommer", name: "Komkommer", icon: "🥒", benefit: "Laag in calorieën" },
    { slug: "spinazie", name: "Spinazie", icon: "🥬", benefit: "IJzer en vitamines" },
    { slug: "pompoen", name: "Pompoen", icon: "🎃", benefit: "Goed voor spijsvertering" },
    { slug: "zoete-aardappel", name: "Zoete Aardappel", icon: "🍠", benefit: "Vezels en vitamine A" },
  ],
  proteinen: [
    { slug: "kip", name: "Kip (gekookt)", icon: "🍗", benefit: "Mager eiwit" },
    { slug: "ei", name: "Ei (gekookt)", icon: "🥚", benefit: "Complete eiwitbron" },
  ],
  overig: [
    { slug: "rijst", name: "Rijst (gekookt)", icon: "🍚", benefit: "Zacht bij maagklachten" },
    { slug: "pindakaas", name: "Pindakaas", icon: "🥜", benefit: "Eiwitten (zonder xylitol!)" },
    { slug: "kaas", name: "Kaas", icon: "🧀", benefit: "Calcium (met mate)" },
  ],
};

const safeFoodsCats = {
  proteinen: [
    { slug: "tonijn", name: "Tonijn", icon: "🐟", benefit: "Omega-3 vetzuren" },
    { slug: "zalm", name: "Zalm (gekookt)", icon: "🐟", benefit: "Gezonde vetten" },
    { slug: "kip", name: "Kip (gekookt)", icon: "🍗", benefit: "Mager eiwit" },
    { slug: "kalkoen", name: "Kalkoen", icon: "🦃", benefit: "Licht verteerbaar" },
    { slug: "ei", name: "Ei (gekookt)", icon: "🥚", benefit: "Complete eiwitbron" },
  ],
  groenten: [
    { slug: "pompoen", name: "Pompoen", icon: "🎃", benefit: "Vezelrijk" },
    { slug: "spinazie", name: "Spinazie", icon: "🥬", benefit: "Vitamines (kleine hoeveelheid)" },
  ],
  overig: [
    { slug: "watermeloen", name: "Watermeloen", icon: "🍉", benefit: "Hydraterend" },
    { slug: "rijst", name: "Rijst (gekookt)", icon: "🍚", benefit: "Maagvriendelijk" },
  ],
};

export default function VeiligeVoedingPage() {
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
      <section className="bg-gradient-to-b from-emerald-50 via-emerald-50/50 to-transparent dark:from-emerald-950/30 dark:via-emerald-950/10 dark:to-transparent border-b border-border dark:border-emerald-800/30">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Breadcrumb with JSON-LD */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[{ name: "Voedselgids", href: "/nl/voedselgids" }]}
            currentPage="Veilige Voeding"
          />

          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
              Veilig voor huisdieren
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Veilige Voeding voor Honden & Katten
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/70 max-w-3xl mb-8">
            Complete gids met 27+ veilige voedingsmiddelen die je hond of kat als gezonde snack mag eten.
            Van fruit en groenten tot eiwitten - allemaal veilig en voedzaam.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-cpSurface/50 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <Apple className="h-6 w-6 text-red-500 mb-2" />
              <div className="text-2xl font-bold text-foreground dark:text-cpCream">6</div>
              <div className="text-sm text-muted-foreground dark:text-cpCream/70">Fruitsoorten</div>
            </div>
            <div className="bg-white dark:bg-cpSurface/50 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <Carrot className="h-6 w-6 text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-foreground dark:text-cpCream">7</div>
              <div className="text-sm text-muted-foreground dark:text-cpCream/70">Groenten</div>
            </div>
            <div className="bg-white dark:bg-cpSurface/50 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <Fish className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-foreground dark:text-cpCream">5</div>
              <div className="text-sm text-muted-foreground dark:text-cpCream/70">Eiwitten</div>
            </div>
            <div className="bg-white dark:bg-cpSurface/50 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <Egg className="h-6 w-6 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-foreground dark:text-cpCream">9</div>
              <div className="text-sm text-muted-foreground dark:text-cpCream/70">Overige</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">

        {/* Pillar Content - SEO Text Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream m-0">Hoe Weet Je Wat Veilig is voor Je Huisdier?</h2>
            </div>

            <div className="text-muted-foreground dark:text-cpCream/80 space-y-4">
              <p>
                Het kiezen van veilige snacks voor je hond of kat hoeft niet ingewikkeld te zijn, maar er zijn wel
                belangrijke vuistregels om te onthouden. De sleutel is om te begrijpen <strong>hoe het lichaam
                van je huisdier voedsel verwerkt</strong> en welke voedingsstoffen ze nodig hebben.
              </p>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">Honden: Omnivoren met Beperkingen</h3>
              <p>
                Honden zijn van nature omnivoren, wat betekent dat ze zowel vlees als plantaardig voedsel kunnen
                verteren. Dit maakt het assortiment veilige voedingsmiddelen voor honden relatief groot. <strong>Fruit
                zoals blauwe bessen, appels en bananen</strong> zijn uitstekende traktaties omdat ze antioxidanten,
                vitaminen en vezels bevatten. Groenten als <strong>wortelen en komkommers</strong> zijn perfect voor
                honden die op dieet zijn - ze zijn knapperig, hydraterend en laag in calorieën.
              </p>
              <p>
                Let wel op: sommige delen van veilig fruit zijn gevaarlijk. <em>Appelpitjes bevatten cyanide</em>,
                druivenpitten zijn giftig, en de schil van citrusvruchten kan maagklachten veroorzaken. Verwijder
                altijd pitten, stelen en schillen voordat je fruit geeft.
              </p>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">Katten: Obligate Carnivoren</h3>
              <p>
                Katten zijn <strong>obligate carnivoren</strong> - ze hebben vlees nodig om te overleven. Hun
                spijsvertering is geoptimaliseerd voor dierlijke eiwitten, niet voor plantaardig voedsel. Daarom
                is de lijst met veilige snacks voor katten korter en meer gefocust op eiwitten zoals <strong>gekookte
                kip, tonijn en zalm</strong>.
              </p>
              <p>
                Vis moet altijd gekookt worden (nooit rauw vanwege parasietenrisico) en tonijn uit blik mag alleen
                in water zijn, niet in olie. Geef vis met mate - maximaal 1-2 keer per week - om kwikophoping
                te voorkomen.
              </p>

              <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mt-6 mb-3">De Gouden Regels voor Veilig Voeren</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Start klein:</strong> Introduceer nieuwe voedingsmiddelen in kleine porties om allergieën te monitoren</li>
                <li><strong>10% regel:</strong> Snacks mogen maximaal 10% van de dagelijkse calorie-inname zijn</li>
                <li><strong>Altijd koken:</strong> Vlees en vis altijd goed doorbakken om bacteriën te doden</li>
                <li><strong>Geen kruiden:</strong> Geef vlees puur, zonder zout, knoflook of uipoeder</li>
                <li><strong>Check ingrediënten:</strong> Pindakaas moet xylitol-vrij zijn, kaas mag alleen in kleine hoeveelheden</li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 text-sm m-0">
                  <strong>Pro tip:</strong> Twijfel je of een voedingsmiddel veilig is? Klik op een van de items
                  hieronder voor gedetailleerde informatie over portiegroottes, bereidingswijze en mogelijke
                  bijwerkingen per voedingsmiddel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dogs Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Dog className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Veilig voor Honden</h2>
            <span className="text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
              18 voedingsmiddelen
            </span>
          </div>

          {/* Fruit */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🍎</span> Fruit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsDogs.fruit.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-hond-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Groenten */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🥦</span> Groenten
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsDogs.groenten.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-hond-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Proteinen */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🍗</span> Eiwitten
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsDogs.proteinen.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-hond-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Overig */}
          <div>
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🍚</span> Overige
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsDogs.overig.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-hond-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cats Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Cat className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream">Veilig voor Katten</h2>
            <span className="text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
              9 voedingsmiddelen
            </span>
          </div>

          {/* Proteinen */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🐟</span> Eiwitten
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsCats.proteinen.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-kat-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Groenten */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🥬</span> Groenten
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsCats.groenten.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-kat-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Overig */}
          <div>
            <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <span className="text-2xl">🍚</span> Overige
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeFoodsCats.overig.map((food) => (
                <Link
                  key={food.slug}
                  href={`/nl/mag-kat-${food.slug}-eten`}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{food.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-cpCream group-hover:text-emerald-600">{food.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70">{food.benefit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Tips voor Veilig Voeren
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Introduceer nieuwe voedingsmiddelen geleidelijk in kleine hoeveelheden</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Was fruit en groenten altijd grondig voor het voeren</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Verwijder pitten, zaden en stelen - deze kunnen gevaarlijk zijn</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Snacks mogen maximaal 10% van de dagelijkse calorie-inname zijn</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Let op allergische reacties bij nieuwe voedingsmiddelen</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 text-sm">Bij twijfel: raadpleeg altijd je dierenarts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Box - Link to Toxic Foods */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Let op: Niet Alles is Veilig!
            </h2>
            <p className="text-amber-700 dark:text-amber-300 mb-4">
              Hoewel er veel veilige voedingsmiddelen zijn, zijn er ook veel stoffen die levensgevaarlijk kunnen zijn voor je huisdier.
              Ken de risico's en bescherm je huisdier.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/nl/giftige-stoffen"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <AlertTriangle className="h-4 w-4" />
                Bekijk alle 53+ giftige stoffen
              </Link>
              <Link
                href="/nl/voedselgids"
                className="inline-flex items-center gap-2 bg-cpCoral hover:bg-cpCoral/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Complete Voedselgids
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-muted/50 dark:bg-cpSurface/30 rounded-xl p-6 text-sm text-muted-foreground dark:text-cpCream/60">
          <p>
            <strong>Disclaimer:</strong> Deze informatie is bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies.
            Hoewel deze voedingsmiddelen over het algemeen veilig zijn, kan elke hond of kat anders reageren.
            Bij twijfel over de voeding van je huisdier, raadpleeg altijd een dierenarts.
          </p>
        </section>
      </div>
    </div>
  );
}
