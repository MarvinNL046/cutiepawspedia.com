/**
 * Pet Toxicity Canonical Page: Lelie (Lily) - Katten (Cats)
 * Type: Plant
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Flower2, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Lelie Giftig voor Katten? | Symptomen & Wat Te Doen - CutiePawsPedia",
  description: "Lelies zijn zeer giftig voor katten - alle delen kunnen acuut nierfalen veroorzaken binnen 24-72 uur. Herken symptomen en weet wat te doen bij inname. Spoedeisende informatie.",
  keywords: [
    "lelie giftig voor katten",
    "lelies gevaarlijk katten",
    "kat lelie gegeten",
    "nierfalen katten lelie",
    "giftige planten katten",
    "lelie vergiftiging kat",
    "spoed dierenarts kat",
    "lelie toxiciteit katten",
    "kattenplanten gevaarlijk"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Lelie Giftig voor Katten? Zeer Gevaarlijk",
    description: "Lelies zijn zeer giftig voor katten - alle delen kunnen acuut nierfalen veroorzaken binnen 24-72 uur. Noodgids voor katteneigenaren.",
    type: "article",
  },
};

export default function IsLelieGiftigVoorKatten() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Lelie voor Katten"
          />
          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftige Plant voor Katten</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Lelie Giftig voor Katten?
          </h1>

          {/* TL;DR Verdict Box - URGENT WARNING */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - zeer giftig en levensbedreigend
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Lelies zijn zeer gevaarlijk voor katten. Alle delen van de plant (bloemen, bladeren, stengels, stuifmeel, zelfs het water in de vaas) zijn toxisch. Inname kan acuut nierfalen veroorzaken, wat zonder behandeling ernstige gezondheidsproblemen kan geven.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je kat heeft lelie gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel direct je dierenarts of een 24-uurs spoedkliniek. Snelle actie verbetert de behandelkansen aanzienlijk.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Dierenarts bellen</strong>
                  </p>
                  <p className="text-foreground dark:text-cpCream">
                    <Clock className="inline h-4 w-4 mr-1" />
                    <strong>Dierennoodhulp (24/7): 0900-0245</strong>
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-red-700 text-white hover:bg-red-800 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/netherlands">
                Vind direct een spoed-dierenarts →
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 text-sm">
            Deze pagina bevat levensreddende informatie over lelievergiftiging bij katten, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Lelies Zo Gevaarlijk voor Katten?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Lelies behoren tot de meest giftige planten voor katten. Terwijl ze voor mensen en de meeste andere dieren onschadelijk zijn, kan zelfs een heel kleine hoeveelheid lelie bij katten acuut nierfalen veroorzaken. Dit vereist altijd onmiddellijke veterinaire hulp.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het gevaarlijke is dat katten vaak nieuwsgierig aan lelies snuffelen, eraan likken of eraan knabbelen. Zelfs het likken van stuifmeel van hun vacht na contact met de bloem kan al vergiftiging veroorzaken. Het water waarin lelies hebben gestaan is ook giftig.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Wetenschappers weten nog steeds niet precies welke stof in lelies de giftigheid veroorzaakt, maar de effecten zijn goed gedocumenteerd en extreem ernstig. Katteneigenaren moeten lelies volledig uit hun huis en tuin weren.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Welke lelies zijn giftig?
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Alle "echte" lelies (Lilium-soorten) en daglelie (Hemerocallis) zijn zeer giftig voor katten. Denk aan Paaslelie, Tijgerlelie, Aziatische lelie, Oriëntaalse lelie, en daglelie. Calla, Lelie-van-dalen en Vredeslelie zijn geen echte lelies maar kunnen ook toxisch zijn (hoewel minder gevaarlijk).
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Alle Delen van de Plant Zijn Giftig
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij lelies is <strong>elk onderdeel giftig</strong> voor katten:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bloemen en knoppen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Extreem toxisch, zelfs in kleine hoeveelheden</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren en stengels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Alle groene delen bevatten gif</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stuifmeel (pollen)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kan op vacht terechtkomen en bij wassen worden ingeslikt</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bol/wortel</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook ondergrondse delen zijn giftig</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Water in de vaas</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water waarin lelies staan wordt ook giftig</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoe weinig is al gevaarlijk?</strong> Zelfs zeer kleine hoeveelheden (een blaadje, stuifmeelkorrels, of vaaswater) kunnen ernstige gezondheidsproblemen veroorzaken. Er bestaat geen bekende veilige hoeveelheid lelie voor katten.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Lelievergiftiging bij Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen 30 minuten tot 12 uur na inname optreden. De eerste symptomen zijn vaak mild, maar de nierschade ontwikkelt zich snel. Herken de waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (0-12 uur na inname)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak herhaaldelijk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Speekselvloed</strong> (kwijlen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lusteloosheid en moeheid</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Latere Symptomen (12-72 uur - Nierfalen Ontwikkelt Zich)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verhoogde dorst en plassen</strong> (eerste fase nierfalen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verminderd of gestopt plassen</strong> (gevorderd nierfalen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Uitdroging</strong> (droge neus, diep liggende ogen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zwakte en desoriëntatie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen (toevallen)</strong> in ernstige gevallen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bewusteloosheid en coma</strong> (levensgevaarlijk stadium)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Sommige katten lijken na de eerste symptomen tijdelijk te herstellen, maar de nierschade ontwikkelt zich doorlopend. Zonder behandeling is het overlijdenspercentage zeer hoog. Ga altijd naar de dierenarts, ook als je kat er beter uit lijkt te zien.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Kat Lelie Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke actie vereist - Dit is een noodgeval:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel direct je dierenarts of spoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je kat lelie heeft gegeten. Vraag of je direct moet komen. Snelle actie verbetert de behandelkansen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">NIET laten braken zonder toestemming dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Laat je kat niet zelf braken tenzij de dierenarts dit expliciet instrueert. Sommige methoden kunnen gevaarlijk zijn.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder stuifmeel van de vacht</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als je kat oranje stuifmeel op zijn vacht heeft, veeg dit voorzichtig weg met een vochtige doek. Voorkom dat je kat het stuifmeel afikt.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Breng plantenresten mee naar de dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Neem (een foto van) de plant mee zodat de dierenarts kan bevestigen dat het om een giftige lelie gaat.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga ONMIDDELLIJK naar de dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Wacht niet af. Lelievergiftiging is altijd een spoedeisend noodgeval. De kans op herstel is het grootst als behandeling snel start.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> De dierenarts zal waarschijnlijk braken opwekken (als de inname kort geleden was), actieve kool geven om resterende giftige stoffen te binden, en je kat aan een infuus leggen om de nieren door te spoelen. Je kat moet mogelijk 24-72 uur gehospitaliseerd worden voor intensieve vloeistoftherapie en nierfunctiemonitoring.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle behandeling kunnen katten volledig herstellen. Zonder behandeling kan de situatie snel verslechteren en permanente nierschade optreden.
            </p>
          </div>
        </section>

        {/* When to Contact Vet */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wanneer Contact Opnemen met de Dierenarts?
          </h2>

          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-3 text-lg">
              Dit vereist altijd onmiddellijke veterinaire hulp
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Bij elke vorm van contact tussen je kat en een lelie moet je direct de dierenarts bellen, zelfs als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je alleen maar <strong>vermoedt</strong> dat je kat iets van de lelie heeft opgegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat alleen stuifmeel op zijn vacht heeft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat nog geen symptomen vertoont</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Het maar een heel klein beetje was</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je kat al lijkt te herstellen na initiële symptomen</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-foreground dark:text-cpCream/90 mb-3">
              <strong>Noodcontactgegevens:</strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Je eigen dierenarts</strong> (heb het nummer altijd bij de hand)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dierennoodhulp 24/7:</strong> 0900-0245 (€0,90 per minuut)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dichtstbijzijnde 24-uurs spoedkliniek</strong> (zoek dit van tevoren op!)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Vind Direct een Dierenarts in je Buurt
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Heb je nu een noodgeval? Vind snel een dierenarts of 24-uurs spoedkliniek bij jou in de buurt.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/netherlands">
                Vind spoeddierenarts →
              </Link>
            </Button>
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Preventie: Houd Lelies Weg van Katten
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De enige veilige manier om lelievergiftiging te voorkomen is door lelies volledig te vermijden in huishoudens met katten:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Geen lelies in huis</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Geen boeketten met lelies, geen potplanten met lelies. Vraag bloemisten expliciet om geen lelies in je bos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Controleer boeketten van gasten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vertel familie en vrienden dat lelies niet welkom zijn in een huis met katten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Geen lelies in de tuin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Verwijder bestaande lelies uit je tuin of zorg dat je kat er niet bij kan (afrastering)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op bij buren</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Katten die buiten komen kunnen ook bij buren in aanraking komen met lelies</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Wees alert rond feestdagen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Pasen is een piekperiode voor lelies in huizen - extra opletten!</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Veilige Alternatieven voor Katten
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze bloemen en planten zijn veilig voor katten:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Rozen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Gerbera's
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Zonnebloemen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Orchideeën
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Petunias
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Afrikaantjes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Viooltjes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Lavendel
              </li>
            </ul>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Giftige Planten en Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/gids/dierengezondheid/wanneer-naar-dierenarts" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Wanneer naar de Dierenarts?</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">10 Waarschuwingssignalen die je niet mag negeren →</p>
            </Link>
            <Link href="/nl/gids/dierengezondheid" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dierengezondheid Gids</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete gids voor een gezonde kat →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Lelies en Katten
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn alle soorten lelies giftig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Alle "echte" lelies (Lilium-soorten zoals Paaslelie, Tijgerlelie, Aziatische lelie, Oriëntaalse lelie) en daglelie (Hemerocallis) zijn zeer giftig voor katten en kunnen acuut nierfalen veroorzaken. Let op: sommige planten hebben "lelie" in hun naam maar zijn geen echte lelies (zoals Calla, Lelie-van-dalen, Vredeslelie). Deze zijn ook giftig maar meestal minder gevaarlijk. Wees bij twijfel altijd voorzichtig en neem contact op met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat heeft aan een lelie gesnuffeld, is dat gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, dit kan gevaarlijk zijn. Als je kat stuifmeel op zijn neus of snuit heeft gekregen en dit later aflikt bij het wassen, kan dit lelievergiftiging veroorzaken. Controleer of je kat oranje stuifmeel op zijn vacht heeft en veeg dit voorzichtig weg met een vochtige doek. Bel ook bij alleen snuffelen altijd je dierenarts voor advies - zij kunnen inschatten of directe behandeling nodig is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang na het eten van lelie krijgt mijn kat symptomen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Eerste symptomen zoals braken en speekselvloed kunnen binnen enkele uren optreden. De nierschade kan zich geleidelijk ontwikkelen. Sommige katten lijken na de eerste symptomen tijdelijk te herstellen, maar de nierschade kan doorgaan. Daarom is het cruciaal om altijd naar de dierenarts te gaan, zelfs als je kat er beter uit lijkt te zien.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn kat herstellen van lelievergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De prognose hangt volledig af van hoe snel de behandeling start. Snelle behandeling met vloeistoftherapie verbetert de kans op herstel aanzienlijk. Zonder behandeling kan de situatie snel verslechteren. Daarom is snelle actie zo belangrijk - bij elke verdenking van leliecontact direct de dierenarts bellen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn lelies ook giftig voor honden en andere huisdieren?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Lelies zijn specifiek zeer giftig voor katten vanwege hun unieke stofwisseling. Honden kunnen mild ziek worden (maagklachten) van lelies, maar ontwikkelen geen acuut nierfalen zoals katten. Konijnen en andere knaagdieren kunnen ook last krijgen van lelies. Voor katten zijn lelies echter levensgevaarlijk op een manier die uniek is - zelfs een heel kleine hoeveelheid kan fataal zijn.
              </div>
            </details>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van lelievergiftiging moet je direct contact opnemen met een dierenarts of spoedkliniek. Lelievergiftiging vereist professionele veterinaire zorg. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke kat is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht niet af - bel altijd direct bij verdenking van leliecontact.
            </p>
          </div>
        </section>

        <RelatedSafeFoods
          locale="nl"
          animal="katten"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Is Lelie Giftig voor Katten? Extreem Gevaarlijk",
            "description": "Lelies zijn zeer giftig voor katten - alle delen kunnen acuut nierfalen veroorzaken binnen 24-72 uur. Herken symptomen en weet wat te doen bij inname.",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.com/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/is-lelie-giftig-voor-katten"
            }
          })
        }}
      />

      {/* Schema.org FAQ Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Zijn alle soorten lelies giftig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alle 'echte' lelies (Lilium-soorten zoals Paaslelie, Tijgerlelie, Aziatische lelie, Oriëntaalse lelie) en daglelie (Hemerocallis) zijn zeer giftig voor katten en kunnen acuut nierfalen veroorzaken. Let op: sommige planten hebben 'lelie' in hun naam maar zijn geen echte lelies (zoals Calla, Lelie-van-dalen, Vredeslelie). Deze zijn ook giftig maar meestal minder gevaarlijk."
                }
              },
              {
                "@type": "Question",
                "name": "Mijn kat heeft aan een lelie gesnuffeld, is dat gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, dit kan gevaarlijk zijn. Als je kat stuifmeel op zijn neus of snuit heeft gekregen en dit later aflikt bij het wassen, kan dit lelievergiftiging veroorzaken. Controleer of je kat oranje stuifmeel op zijn vacht heeft en veeg dit voorzichtig weg met een vochtige doek. Bel ook bij alleen snuffelen altijd je dierenarts voor advies."
                }
              },
              {
                "@type": "Question",
                "name": "Hoelang na het eten van lelie krijgt mijn kat symptomen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Eerste symptomen zoals braken en speekselvloed kunnen binnen 30 minuten tot 12 uur optreden. De nierschade ontwikkelt zich vaak geleidelijk over 12-72 uur. Sommige katten lijken na de eerste symptomen tijdelijk te herstellen, maar de nierschade gaat door. Zonder behandeling is het overlijdenspercentage binnen 3-7 dagen zeer hoog."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn kat herstellen van lelievergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De prognose hangt volledig af van hoe snel de behandeling start. Als je kat zo snel mogelijk na inname bij de dierenarts komt, is de kans op volledig herstel aanzienlijk groter dankzij agressieve vloeistoftherapie. Snelle behandeling verbetert de overlevingskansen significant."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn lelies ook giftig voor honden en andere huisdieren?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lelies zijn specifiek zeer giftig voor katten vanwege hun unieke stofwisseling. Honden kunnen mild ziek worden (maagklachten) van lelies, maar ontwikkelen geen acuut nierfalen zoals katten. Voor katten zijn lelies echter levensgevaarlijk - zelfs een heel kleine hoeveelheid kan fataal zijn."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
