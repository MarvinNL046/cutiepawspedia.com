import type { Metadata } from "next";
import Link from "next/link";
import { GidsBreadcrumbs } from "@/components/gids";
import {
  Heart,
  ShoppingCart,
  CheckCircle2,
  Info,
  Star,
  Percent,
  Gift,
  Truck,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Zooplus Hondenvoer Aanbiedingen: Tot 50% Korting | 2024",
  description:
    "Bespaar flink op hondenvoer bij zooplus! 107+ producten in de aanbieding. Wolf of Wilderness, Eukanuba, Hill's en meer. Gratis verzending vanaf €29.",
  keywords: [
    "zooplus aanbiedingen",
    "hondenvoer korting",
    "goedkoop hondenvoer",
    "wolf of wilderness aanbieding",
    "eukanuba korting",
    "hondenvoer sale",
    "zooplus korting",
  ],
  openGraph: {
    title: "Zooplus Hondenvoer Aanbiedingen: Tot 50% Korting",
    description:
      "107+ hondenvoer producten in de aanbieding. Wolf of Wilderness, Eukanuba, Hill's met tot 50% korting. Gratis verzending vanaf €29.",
    type: "article",
  },
};

const AFFILIATE_LINK = "https://go.cutiepawspedia.com/zooplusspecialsvoorhonden.nl";

export default function ZooplusHondenvoerAanbiedingenPage() {
  return (
    <main className="min-h-screen bg-cpCream dark:bg-cpSurface">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-cpAqua/10 dark:from-cpCoral/5 dark:via-cpAmber/5 dark:to-cpAqua/5 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-cpCoral text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Percent className="w-3 h-3" />
              AANBIEDINGEN
            </span>
            <span className="bg-cpAmber/20 text-cpCharcoal dark:text-cpCream text-xs px-3 py-1 rounded-full">
              107+ producten
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
            <span className="bg-gradient-to-r from-cpCoral to-cpAmber bg-clip-text text-transparent">
              Zooplus Hondenvoer
            </span>{" "}
            Aanbiedingen
          </h1>

          <p className="text-lg text-cpCharcoal/80 dark:text-cpCream/80 mb-6 max-w-2xl">
            Scoor de beste deals op premium hondenvoer! Van Wolf of Wilderness
            tot Eukanuba - ontdek 107+ producten met kortingen tot 50%. Gratis
            verzending vanaf €29 én extra voordeel met zooplus Gemak.
          </p>

          <div className="bg-white/60 dark:bg-cpCharcoal/40 rounded-xl p-4 mb-6 border border-cpCoral/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-cpCoral" />
                <span>Tot 50% korting</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-cpAqua" />
                <span>Gratis vanaf €29</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cpAmber" />
                <span>1-3 werkdagen</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cpCoral" />
                <span>10M+ klanten</span>
              </div>
            </div>
          </div>

          <a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-cpCoral hover:bg-cpCoral/90 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-cpCoral/25"
          >
            <ShoppingCart className="w-5 h-5" />
            Bekijk alle aanbiedingen bij Zooplus
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Intro */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream flex items-center gap-2">
              <Percent className="w-6 h-6 text-cpCoral" />
              Waarom kopen bij Zooplus Aanbiedingen?
            </h2>
            <p>
              Als je op zoek bent naar <strong>goedkoop hondenvoer van topkwaliteit</strong>, dan
              is de aanbiedingenpagina van zooplus.nl dé plek om te zijn. Met meer dan 107
              producten in de aanbieding vind je hier de beste deals op premium merken zoals
              Wolf of Wilderness, Eukanuba, Hill&apos;s Prescription Diet en Purizon.
            </p>
            <p>
              Zooplus staat bekend om hun scherpe prijzen, maar tijdens de speciale acties
              bespaar je nog meer. Denk aan <strong>&quot;15 kg + 3 kg GRATIS&quot;</strong> deals,
              <strong>&quot;1+1 GRATIS&quot;</strong> acties, en kortingen tot wel 50% op uitlopende
              producten. Gecombineerd met gratis verzending vanaf €29 en de mogelijkheid om
              extra 5% te besparen met zooplus Gemak, is dit de slimste manier om je hond
              premium voer te geven zonder je portemonnee te legen.
            </p>
          </div>

          {/* Top Deals Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-cpCoral" />
              Beste Deals van dit Moment
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Deal Card 1 */}
              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-6 border-2 border-cpCoral/30 hover:border-cpCoral transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    3 KG GRATIS
                  </span>
                  <span className="text-cpCoral font-bold">-17%</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Eukanuba Bonusbags 18 kg</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70 mb-3">
                  15 kg + 3 kg gratis! Adult Large Breed, Medium Breed of Puppy Large Breed.
                  Slechts €2,36-€2,56/kg.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="line-through text-cpCharcoal/50 text-sm">€50,99-€55,19</span>
                    <span className="text-cpCoral font-bold text-xl ml-2">€42,49-€45,99</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Deal Card 2 */}
              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-6 border-2 border-cpCoral/30 hover:border-cpCoral transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    1+1 GRATIS
                  </span>
                  <span className="text-cpCoral font-bold">-50%</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Animonda GranCarno</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70 mb-3">
                  Made in Germany, 100% waardevolle ingrediënten, zonder granen. Adult en
                  Senior varianten beschikbaar.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="line-through text-cpCharcoal/50 text-sm">€40,98</span>
                    <span className="text-cpCoral font-bold text-xl ml-2">€20,49</span>
                  </div>
                  <span className="text-sm text-cpCharcoal/60">€2,25-€2,75/kg</span>
                </div>
              </div>

              {/* Deal Card 3 */}
              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-6 border-2 border-cpCoral/30 hover:border-cpCoral transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                    ZOOPLUS KEUZE
                  </span>
                  <span className="text-cpCoral font-bold">Graanvrij</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Wolf of Wilderness Elements</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70 mb-3">
                  100% graanvrij, enkelvoudig dierlijk eiwit. Lam, Rund of Paard varianten.
                  2x12 kg voordeelpakket.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="line-through text-cpCharcoal/50 text-sm">€139,98-€159,98</span>
                    <span className="text-cpCoral font-bold text-xl ml-2">€136,99-€156,99</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Deal Card 4 */}
              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-6 border-2 border-cpCoral/30 hover:border-cpCoral transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                    2 KG GRATIS
                  </span>
                  <span className="text-cpCoral font-bold">-17%</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Eukanuba Veterinary Diets 12 kg</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70 mb-3">
                  Joint Mobility, Intestinal en Dermatosis varianten. Speciaal dieetvoer
                  voor honden met gezondheidsproblemen.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="line-through text-cpCharcoal/50 text-sm">€43,99-€47,99</span>
                    <span className="text-cpCoral font-bold text-xl ml-2">€36,66-€39,99</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-r from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <Percent className="w-12 h-12 text-cpCoral mx-auto mb-4" />
            <h3 className="text-xl font-bold text-cpCharcoal dark:text-cpCream mb-2">
              Mis deze deals niet!
            </h3>
            <p className="text-cpCharcoal/70 dark:text-cpCream/70 mb-4">
              Aanbiedingen zijn beperkt beschikbaar. Op=op!
            </p>
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-cpCoral hover:bg-cpCoral/90 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop nu met korting
            </a>
          </div>

          {/* Actie Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-cpAqua" />
              Soorten Aanbiedingen bij Zooplus
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  X KG GRATIS
                </div>
                <h3 className="font-bold mb-2">Bonusbags</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Koop een grote zak en krijg 2-3 kg extra gratis. Ideaal voor grotere honden
                  of als je wilt stocken.
                </p>
              </div>

              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  1+1 GRATIS
                </div>
                <h3 className="font-bold mb-2">Dubbele Voordeel</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Betaal voor 1 en krijg 2! De beste deal als je toch al van plan was te
                  stocken. Tot 50% korting.
                </p>
              </div>

              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  LAATSTE KANS
                </div>
                <h3 className="font-bold mb-2">Uitlopende Producten</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Extra korting op producten die uit het assortiment gaan. Vaak met -10%
                  extra activeerbare korting.
                </p>
              </div>

              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  ZOOPLUS KEUZE
                </div>
                <h3 className="font-bold mb-2">Aanbevolen</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Door zooplus geselecteerde topproducten met uitstekende prijs-kwaliteit
                  verhouding.
                </p>
              </div>

              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  PROBEER NU
                </div>
                <h3 className="font-bold mb-2">Probeerpakketten</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Kleine verpakkingen om nieuwe smaken te testen voordat je een grote zak
                  koopt. Vanaf €2,29.
                </p>
              </div>

              <div className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-5 border border-cpCharcoal/10">
                <div className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                  NIEUW
                </div>
                <h3 className="font-bold mb-2">Nieuwe Producten</h3>
                <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                  Introductiekortingen op nieuwe producten. Ontdek als eerste de nieuwste
                  recepturen en merken.
                </p>
              </div>
            </div>
          </div>

          {/* Top Merken */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-cpCoral" />
              Top Merken in de Aanbieding
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Wolf of Wilderness",
                  desc: "100% graanvrij, vers vlees, wilde kruiden",
                  price: "Vanaf €5,99/kg",
                },
                {
                  name: "Eukanuba",
                  desc: "Premium voeding, bonusbags met gratis extra's",
                  price: "Vanaf €2,36/kg",
                },
                {
                  name: "Hill's Prescription Diet",
                  desc: "Dieetvoer voor specifieke gezondheidsproblemen",
                  price: "Vanaf €9,75/kg",
                },
                {
                  name: "Purizon",
                  desc: "80% dierlijke ingrediënten, 20% groente & fruit",
                  price: "Vanaf €6,00/kg",
                },
                {
                  name: "Animonda GranCarno",
                  desc: "Made in Germany, zonder granen, 1+1 acties",
                  price: "Vanaf €2,25/kg",
                },
                {
                  name: "Farmina N&D",
                  desc: "Natuurlijke ingrediënten, pompoen recepten",
                  price: "Vanaf €7,75/kg",
                },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white dark:bg-cpCharcoal/50 rounded-xl p-4 border border-cpCharcoal/10 hover:border-cpCoral/30 transition-colors"
                >
                  <h3 className="font-bold text-cpCharcoal dark:text-cpCream mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70 mb-2">
                    {brand.desc}
                  </p>
                  <span className="text-cpCoral font-semibold text-sm">{brand.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Besparen */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpAmber/10 dark:from-cpAqua/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-cpAqua" />
              Extra Besparen met zooplus
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-cpAqua text-white text-xs px-2 py-1 rounded">TIP</span>
                  zooplus Gemak (Autoship)
                </h3>
                <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>15-20% korting op je eerste autoship bestelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Altijd 5% korting op volgende leveringen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Flexibele leveringsfrequentie aanpasbaar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Gratis annuleren op elk moment</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-cpAmber text-white text-xs px-2 py-1 rounded">TIP</span>
                  zooplus Club
                </h3>
                <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Spaar zooPoints bij elke aankoop (1 punt = €1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Wissel punten in voor korting of producten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Premium leden krijgen extra 5% korting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Exclusieve Club Days met extra kortingen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-cpAmber" />
              Veelgestelde Vragen
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Hoe lang zijn de aanbiedingen geldig?",
                  a: "Zooplus aanbiedingen variëren in duur. Sommige zijn wekelijks, andere maandelijks. 'Laatste kans' deals zijn op=op. Check regelmatig de aanbiedingspagina voor de nieuwste deals.",
                },
                {
                  q: "Kan ik aanbiedingen combineren met zooplus Gemak?",
                  a: "Ja! Je kunt de meeste aanbiedingen combineren met zooplus Gemak voor extra 5% korting. Zo bespaar je dubbel op je hondenvoer.",
                },
                {
                  q: "Wat is het verschil tussen droogvoer en natvoer aanbiedingen?",
                  a: "Zooplus heeft aparte aanbiedingscategorieën voor droogvoer, natvoer en snacks. Droogvoer aanbiedingen zijn vaak voordeelpakketten, natvoer aanbiedingen zijn meestal multipack deals.",
                },
                {
                  q: "Hoe weet ik of een aanbieding een goede deal is?",
                  a: "Let op de prijs per kilogram (€/kg). Goede deals voor premium voer liggen onder €5/kg, budget merken onder €3/kg. Vergelijk altijd met de normale prijs.",
                },
                {
                  q: "Krijg ik gratis verzending bij aanbiedingen?",
                  a: "Ja, gratis verzending vanaf €29 geldt ook voor aanbiedingen. Combineer meerdere deals om aan het minimumbedrag te komen.",
                },
                {
                  q: "Kan ik producten retourneren als mijn hond het niet lust?",
                  a: "Zooplus heeft een flexibel retourbeleid. Bij geopende verpakkingen kun je contact opnemen met de klantenservice voor een passende oplossing.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white dark:bg-cpCharcoal/50 rounded-xl border border-cpCharcoal/10"
                >
                  <summary className="cursor-pointer p-4 font-semibold text-cpCharcoal dark:text-cpCream flex justify-between items-center">
                    {faq.q}
                    <span className="text-cpCoral group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-cpCoral to-cpAmber rounded-2xl p-8 text-center text-white">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Klaar om te besparen?
            </h2>
            <p className="opacity-90 mb-6 max-w-lg mx-auto">
              Ontdek 107+ hondenvoer aanbiedingen met kortingen tot 50%. Gratis verzending
              vanaf €29 en extra voordeel met zooplus Gemak!
            </p>
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-white text-cpCoral hover:bg-cpCream font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              <Percent className="w-5 h-5" />
              Bekijk alle aanbiedingen
            </a>
            <div className="flex justify-center gap-6 mt-6 text-sm opacity-80">
              <span>✓ Tot 50% korting</span>
              <span>✓ Gratis verzending €29+</span>
              <span>✓ 107+ producten</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zooplus Hondenvoer Aanbiedingen: Tot 50% Korting",
            description:
              "Bespaar flink op hondenvoer bij zooplus! 107+ producten in de aanbieding met kortingen tot 50%.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
          }),
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Hondenvoer aanbiedingen bij Zooplus" }
        ]}
      />
    </main>
  );
}
