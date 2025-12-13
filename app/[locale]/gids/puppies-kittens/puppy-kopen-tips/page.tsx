import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Puppy Kopen: Waar Moet Je Op Letten? Complete Gids 2024",
  description: "Wil je een puppy kopen? Ontdek waar je op moet letten, van fokker selectie tot kosten. Vind betrouwbare fokkers en dierenartsen bij jou in de buurt.",
  keywords: "puppy kopen, puppy aanschaffen, fokker kiezen, puppy tips, eerste puppy",
  openGraph: {
    title: "Puppy Kopen: Complete Gids - Waar Moet Je Op Letten?",
    description: "Alles wat je moet weten voordat je een puppy koopt. Vind de beste fokkers en dierenartsen in Nederland.",
  },
};

export default function PuppyKopenTipsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpPink/10 via-cpYellow/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpPink/10 border border-cpPink/30 text-cpPink text-sm font-medium mb-6">
              <span>🐕</span>
              Complete Gids
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Puppy Kopen: Waar Moet Je Op Letten?
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Een puppy kopen is een grote beslissing. Ontdek alles wat je moet weten over fokker selectie, kosten, voorbereiding en de eerste weken samen.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpPink/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Zoek je een dierenarts voor puppy vaccinaties?
              </p>
              <Button
                asChild
                className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Vind een dierenarts bij jou in de buurt →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Puppy Kopen: Waar Moet Je Op Letten? Complete Gids",
              description: "Uitgebreide gids over het kopen van een puppy, van fokker selectie tot kosten en voorbereiding.",
              author: {
                "@type": "Organization",
                name: "CutiePawsPedia",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-cpYellow/10 border-l-4 border-cpYellow rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Een puppy in huis nemen is een wonderlijke ervaring, maar het vraagt ook om zorgvuldige voorbereiding.
              Van het kiezen van de juiste fokker tot het begrijpen van alle kosten - deze gids helpt je de beste
              beslissing te nemen voor jou én je toekomstige viervoeter.
            </p>
          </div>

          {/* Section 1: Waarom een puppy? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Waarom Een Puppy Kopen?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Voordat je begint met zoeken naar een puppy, is het belangrijk om jezelf af te vragen <strong>waarom</strong> je
              een puppy wilt. Een volwassen hond adopteren kan ook een geweldige optie zijn, maar een puppy biedt unieke voordelen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Vanaf het begin opvoeden</strong> - Je kunt je puppy zelf trainen en socialiseren volgens jouw voorkeuren</li>
              <li><strong>Gedragsgeschiedenis</strong> - Je weet precies wat de pup heeft meegemaakt vanaf jonge leeftijd</li>
              <li><strong>Langere tijd samen</strong> - Een puppy betekent potentieel 10-15 jaar samen groeien</li>
              <li><strong>Band opbouwen</strong> - De band die je opbouwt vanaf puppyleeftijd is vaak zeer sterk</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80">
              Maar bedenk wel: puppy's vereisen <strong>veel tijd, energie en geduld</strong>. Ze moeten zindelijk worden,
              leren alleen te zijn, getraind worden en veel aandacht krijgen. Ben je bereid om die investering te doen?
            </p>
          </section>

          {/* Section 2: Kies het juiste ras */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Stap 1: Kies Het Juiste Ras
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Elk hondenras heeft unieke eigenschappen, energieniveaus en behoeften. Het is cruciaal om een ras te kiezen
              dat past bij jouw levensstijl, woonsituatie en ervaring.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Belangrijke Overwegingen:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpPink mb-2">🏃 Energieniveau</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Border Collies en Huskies hebben veel beweging nodig. Bulldogs en Basset Hounds zijn rustiger.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpPink mb-2">📏 Formaat</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Grote honden hebben meer ruimte en grotere kosten (voer, dierenarts). Kleine honden passen beter in appartementen.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpPink mb-2">✂️ Verzorging</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Sommige rassen (Poedels, Yorkshire Terriers) hebben regelmatig trimmen nodig. Anderen verliezen veel haar.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpPink mb-2">👨‍👩‍👧‍👦 Gezinsvriendelijk</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Golden Retrievers en Labradors zijn bekend als gezinshonden. Sommige rassen zijn minder geduldig met kinderen.
                </p>
              </div>
            </div>

            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30 mb-6">
              <p className="font-semibold text-cpAqua mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Praat met meerdere fokkers en eigenaren van het ras dat je overweegt. Bezoek een hondenshow of rasspeakers
                om een realistisch beeld te krijgen van het karakter en de behoeften.
              </p>
            </div>
          </section>

          {/* Section 3: Vind een betrouwbare fokker */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Stap 2: Vind Een Betrouwbare Fokker
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Een goede fokker is cruciaal voor de gezondheid en het welzijn van je puppy. Helaas zijn er ook onbetrouwbare
              fokkers en puppymolens. Zo herken je een serieuze fokker:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Kenmerken van een Goede Fokker:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Aangesloten bij rasvereniging</strong> - Lid van een officiële rasvereniging of de Raad van Beheer
              </li>
              <li>
                <strong>Gezondheidsonderzoeken</strong> - Ouders zijn getest op rasspecifieke aandoeningen (HD, ED, oogonderzoek)
              </li>
              <li>
                <strong>Je mag op bezoek</strong> - Je kunt de puppy's en moederhond in hun omgeving bezoeken
              </li>
              <li>
                <strong>Stelt vragen</strong> - Een goede fokker wil weten of je een geschikt thuis kunt bieden
              </li>
              <li>
                <strong>Kennismakingsgesprek</strong> - Er is minimaal één bezoek voordat je de puppy meeneemt
              </li>
              <li>
                <strong>Papieren en vaccinaties</strong> - Puppy heeft stamboom, chip en eerste vaccinaties
              </li>
              <li>
                <strong>Nazorg</strong> - De fokker blijft beschikbaar voor vragen en advies na aankoop
              </li>
            </ul>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Red Flags - Pas op bij:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-300 m-0">
                <li>Fokkers die meerdere rassen tegelijk fokken</li>
                <li>Je mag de moederhond niet zien</li>
                <li>Puppy's worden op neutrale plek afgeleverd (parkeerplaats, station)</li>
                <li>Geen gezondheidsonderzoeken of stamboom</li>
                <li>Puppy's jonger dan 8 weken</li>
                <li>Fokker stelt geen vragen over jouw situatie</li>
                <li>Onrealistisch lage prijzen</li>
              </ul>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpYellow/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpYellow/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Puppy gevonden? Meld je aan voor een puppycursus!
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Socialisatie en training zijn essentieel in de eerste maanden. Vind professionele hondentrainers bij jou in de buurt.
              </p>
              <Button
                asChild
                className="bg-cpYellow text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Bekijk puppycursussen →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Kosten van een puppy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Stap 3: Begrijp De Kosten
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Een puppy kopen is niet alleen de aanschafprijs. De totale kosten in het eerste jaar kunnen flink oplopen.
              Hier is een realistisch overzicht:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-card dark:bg-cpSurface/50 rounded-xl overflow-hidden">
                <thead className="bg-cpPink/20">
                  <tr>
                    <th className="text-left p-4 font-bold text-foreground dark:text-cpCream">Kostenpost</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">Eenmalig</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">Per jaar</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground dark:text-cpCream/80">
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Aanschafprijs puppy</td>
                    <td className="text-right p-4">€800 - €2000</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Eerste benodigdheden (mand, bak, speelgoed, lijn)</td>
                    <td className="text-right p-4">€150 - €300</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Dierenarts (vaccinaties, chippen, controles)</td>
                    <td className="text-right p-4">€200 - €350</td>
                    <td className="text-right p-4">€150 - €300</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Hondenvoer (afhankelijk van ras)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€300 - €800</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Puppycursus / training</td>
                    <td className="text-right p-4">€150 - €400</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Verzekering</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€150 - €400</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Trimmen / verzorging</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€0 - €600</td>
                  </tr>
                  <tr className="border-t-2 border-cpPink bg-cpPink/10 font-bold">
                    <td className="p-4 text-foreground dark:text-cpCream">TOTAAL EERSTE JAAR</td>
                    <td className="text-right p-4 text-foreground dark:text-cpCream" colSpan={2}>€1.750 - €5.150</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
              * Prijzen zijn indicatief en kunnen variëren per ras, regio en persoonlijke keuzes.
              Grotere rassen hebben doorgaans hogere kosten voor voer en dierenarts.
            </p>
          </section>

          {/* Section 5: Voorbereiding */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Stap 4: Bereid Je Huis Voor
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Voordat je puppy thuiskomt, moet je huis puppy-proof zijn. Jonge honden zijn nieuwsgierig en kauwen op alles.
              Hier is een checklist:
            </p>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Essentiële Benodigdheden:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Hondenmand of bench</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Veilige plek om te slapen en rusten</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Voer- en waterbak</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bij voorkeur roestvrij staal of keramiek</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Puppy voer</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gebruik eerst hetzelfde merk als de fokker</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Halsband en lijn</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Verstelbaar, puppy groeit snel!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Speelgoed</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kauwen, knuffelen en spelen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Zindelijkheidstraining matten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Eerste weken binnen</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Lees ook:</strong>{" "}
              <Link href="/nl/gids/puppies-kittens/puppy-proof-huis" className="text-cpPink hover:text-cpPink/80 underline">
                Puppy-proofing: je huis veilig maken voor een puppy
              </Link>
            </p>
          </section>

          {/* Section 6: Eerste dag */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Stap 5: De Eerste Dag Thuis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              De eerste dag is spannend voor jou én je puppy. De pup komt in een volkomen nieuwe omgeving, weg van moeder
              en nestgenoten. Hier zijn tips om het soepel te laten verlopen:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Haal je puppy 's ochtends op</strong> - Zo heeft hij de hele dag om te wennen voordat de nacht begint
              </li>
              <li>
                <strong>Laat hem rustig rondkijken</strong> - Geen drukte of veel mensen. Geef de pup tijd om te verkennen
              </li>
              <li>
                <strong>Stel een routine in</strong> - Vaste tijden voor eten, slapen en naar buiten gaan
              </li>
              <li>
                <strong>Wees geduldig met zindelijkheid</strong> - Ongelukjes gebeuren. Beloon gewenst gedrag, straf niet
              </li>
              <li>
                <strong>Geef hem een veilige plek</strong> - Een bench of mand waar hij kan rusten
              </li>
            </ol>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Lees meer:</strong>{" "}
              <Link href="/nl/gids/puppies-kittens/eerste-week-puppy" className="text-cpPink hover:text-cpPink/80 underline">
                Eerste week met je nieuwe puppy: dag-voor-dag gids
              </Link>
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgestelde Vragen
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Wat is de beste leeftijd om een puppy te kopen?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Puppy's mogen minimaal 8 weken oud zijn voordat ze van de moeder gescheiden worden. De ideale leeftijd
                  is tussen 8 en 12 weken. In deze periode zijn ze goed te socialiseren en leren ze snel. Sommige fokkers
                  houden puppy's tot 10-12 weken om ze beter voor te bereiden.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoeveel kost een puppy gemiddeld?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  De aanschafprijs van een rashond varieert van €800 tot €2000, afhankelijk van het ras, de fokker en de bloedlijn.
                  Populaire rassen zijn vaak duurder. Daarnaast moet je rekenen op €1000-€3000 aan extra kosten in het eerste jaar
                  (dierenarts, benodigdheden, training, verzekering).
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Moet ik een rashond of kruising kopen?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Beide hebben voor- en nadelen. Rashonden hebben voorspelbaar uiterlijk en karakter, maar kunnen rasspecifieke
                  gezondheidsproblemen hebben. Kruisingen zijn vaak gezonder door genetische diversiteit, maar karakter en formaat
                  zijn minder voorspelbaar. Kies op basis van jouw voorkeuren en levensstijl, niet alleen op prijs.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoe weet ik of een fokker betrouwbaar is?
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Een betrouwbare fokker laat je op bezoek komen, toont de moederhond en leefomgeving, heeft stamboom en
                  gezondheidsonderzoeken van de ouders, stelt vragen over jouw situatie, en biedt nazorg. Wees alert op rode
                  vlaggen zoals meerdere rassen tegelijk, geen bezoek mogelijk, of levering op neutrale plek.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Lees Ook
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/nl/gids/puppies-kittens/eerste-week-puppy"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpPink/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpPink mb-2">
                  Eerste week met je nieuwe puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Dag-voor-dag gids voor de eerste zeven dagen met je puppy thuis.
                </p>
              </Link>
              <Link
                href="/nl/gids/puppies-kittens/puppy-proof-huis"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpPink/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpPink mb-2">
                  Puppy-proofing je huis →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maak je huis veilig voor een nieuwsgierige puppy met deze checklist.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Klaar voor je nieuwe puppy?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Vind trimsalons, dierenartsen, hondentrainers en meer bij jou in de buurt.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/nl/netherlands">Ontdek alle huisdierservices →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
