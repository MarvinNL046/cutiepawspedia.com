/**
 * Pet Toxicity Canonical Page: Azalea - Honden (Dogs)
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
  title: "Is Azalea Giftig voor Honden? | Symptomen & Wat Te Doen - CutiePawsPedia",
  description: "Azalea's zijn zeer giftig voor honden - grayanotoxine veroorzaakt hartproblemen en neurologische symptomen. Herken symptomen en weet wat te doen bij inname. Spoedgids.",
  keywords: [
    "azalea giftig voor honden",
    "azalea gevaarlijk honden",
    "hond azalea gegeten",
    "grayanotoxine honden",
    "giftige planten honden",
    "azalea vergiftiging hond",
    "spoed dierenarts hond",
    "azalea toxiciteit honden",
    "tuinplanten gevaarlijk honden"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Azalea Giftig voor Honden? Zeer Gevaarlijk",
    description: "Azalea's zijn zeer giftig voor honden - grayanotoxine veroorzaakt hartproblemen en neurologische symptomen. Noodgids voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsAzaleaGiftigVoorHonden() {
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
            currentPage="Azalea voor Honden"
          />

          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftige Plant voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Azalea Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box - URGENT WARNING */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - zeer giftig
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Azalea's zijn zeer giftig voor honden. Alle delen van de plant bevatten grayanotoxine, een giftige stof die het hart en zenuwstelsel aantast. Zelfs een kleine hoeveelheid kan ernstige symptomen veroorzaken zoals braken, diarree, kwijlen, hartproblemen en in ernstige gevallen coma en overlijden.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je hond heeft azalea gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel direct je dierenarts of een 24-uurs spoedkliniek. Azaleavergiftiging vereist professionele veterinaire zorg. Snelle actie verbetert de behandelkansen.
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
            Deze pagina bevat levensreddende informatie over azaleavergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Azalea's Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Azalea's en rododendrons (nauw verwante planten) behoren tot de meest giftige tuinplanten voor honden. De plant bevat grayanotoxine, een krachtige neurotoxine die het zenuwstelsel en het hart beïnvloedt. Deze giftige stof zit in alle delen van de plant - bladeren, bloemen, stengels, wortels en zelfs nectar.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het gevaar schuilt in het feit dat azalea's populaire sierplanten zijn in Nederlandse tuinen en parken. Honden kunnen uit nieuwsgierigheid aan de plant knabbelen, vooral jonge honden en puppy's. Zelfs het drinken van water waarin azaleabladeren hebben gelegen kan gevaarlijk zijn.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De toxiciteit van azalea's varieert enigszins per soort, maar alle azalea's en rododendrons moeten als zeer giftig worden beschouwd. Kleinere honden lopen een groter risico omdat een kleinere hoeveelheid al ernstige effecten kan hebben.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Grayanotoxine werkt snel
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Symptomen kunnen binnen enkele uren na inname optreden. De ernst hangt af van hoeveel je hond heeft gegeten en hoe groot je hond is. Wacht niet af met symptomen - elke verdenking van azaleavergiftiging vereist professionele veterinaire zorg.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Alle Delen van de Azalea Zijn Giftig
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij azalea's is <strong>elk onderdeel zeer giftig</strong> voor honden:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren (meest giftig)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Hoogste concentratie grayanotoxine - zelfs enkele bladeren zijn gevaarlijk</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bloemen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook bloemen bevatten het giftige grayanotoxine</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stengels en takken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Alle houtige delen bevatten de giftige stof</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Wortels</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook ondergrondse delen zijn toxisch</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Nectar en honing</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Honing gemaakt van azaleanectar ("mad honey") kan ook giftig zijn</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Hoe weinig is al gevaarlijk?</strong> Zelfs kleine hoeveelheden azaleabladeren kunnen ernstige gezondheidsproblemen veroorzaken. Hoe meer je hond heeft gegeten, hoe ernstiger de symptomen. Neem bij twijfel altijd contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Azaleavergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen 15 minuten tot 6 uur na inname optreden. Grayanotoxine beïnvloedt het zenuwstelsel en het hart. Herken deze waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (binnen 15 min - 6 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Overmatig kwijlen</strong> (speekselvloed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak herhaaldelijk en hevig)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong> (soms met bloed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (je hond kan janken of een gebogen houding aannemen)</span>
                </li>
              </ul>
            </div>

            {/* Serious symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (Hart en Zenuwstelsel)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zwakte en lethargie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Lage hartslag</strong> (bradycardie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Onregelmatige hartslag</strong> (aritmie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Lage bloeddruk</strong> (hypotensie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Ademhalingsmoeilijkheden</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Wazig zien en blindheid</strong> (tijdelijk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Trillingen en spierspasmen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen (epileptische aanvallen)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coma</strong> (bewusteloosheid)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overlijden</strong> (door hartfalen of ademstilstand)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Azaleavergiftiging is een progressieve aandoening. Zelfs als de eerste symptomen mild lijken, kunnen hartproblemen en neurologische symptomen zich later ontwikkelen. Wacht NOOIT af - elke verdenking van azalea-inname vereist onmiddellijke veterinaire zorg.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Azalea Heeft Gegeten
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke Actie Vereist - Dit is een NOODGEVAL:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel DIRECT je dierenarts of spoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je hond azalea heeft gegeten. Dit is een medisch noodgeval. Bel tijdens het reizen naar de kliniek.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder plantenresten uit de mond</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Verwijder voorzichtig eventuele azalearesten uit de bek. Voorkom dat je hond meer opeet.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">NIET laten braken zonder toestemming</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Probeer je hond NIET zelf te laten braken tenzij de dierenarts dit instrueert. Bij sommige vergiftigingen kan dit gevaarlijk zijn.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem plantenresten mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Breng (een foto van) de plant mee zodat de dierenarts kan bevestigen dat het azalea is. Dit helpt bij de diagnose.
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
                    Wacht niet af tot symptomen erger worden. Hoe sneller de behandeling start, hoe beter de prognose.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Er is geen specifiek tegengif voor azaleavergiftiging. De behandeling is symptomatisch en ondersteunend: braken opwekken (als inname recent was), actieve kool geven, infuus voor uitdroging, hartbewaking en medicatie om de hartslag te stabiliseren, anti-convulsiva bij stuipen, en zuurstoftherapie bij ademhalingsproblemen. Je hond moet waarschijnlijk gehospitaliseerd worden voor intensieve monitoring.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Met snelle en agressieve behandeling kunnen veel honden herstellen. Zonder behandeling kan azaleavergiftiging fataal zijn. De prognose hangt af van hoeveel je hond heeft gegeten en hoe snel behandeling start.
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
              Dit vereist altijd professionele veterinaire beoordeling
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Bij elke vorm van contact tussen je hond en een azalea moet je direct de dierenarts bellen, zelfs als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je alleen maar <strong>vermoedt</strong> dat je hond azalea heeft gegeten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond alleen aan de plant heeft gesnuffeld of gelikt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond nog geen symptomen vertoont</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Het maar een heel klein beetje was</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond al lijkt te herstellen na initiële symptomen</span>
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
            Preventie: Houd Azalea's Weg van Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De enige veilige manier om azaleavergiftiging te voorkomen is door azalea's te vermijden in omgevingen waar je hond komt:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verwijder azalea's uit je tuin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Als je een hond hebt, overweeg om azalea's en rododendrons te vervangen door hondvriendelijke planten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Plaats hekken rond azalea's</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Als verwijderen geen optie is, plaats een hek zodat je hond er niet bij kan</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Houd je hond aangelijnd bij wandelingen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Azalea's staan vaak in openbare parken en tuinen - voorkom dat je hond eraan snuffelt of knabbelt</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train het "laat maar" commando</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer je hond om planten en bloemen te negeren op commando</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Monitor puppy's extra goed</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Jonge honden zijn nieuwsgieriger en willen vaker op planten kauwen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Ruim snoeiafval direct op</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Afgevallen bladeren en afgesnoeide takken blijven giftig - verwijder deze onmiddellijk</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Veilige Tuinplanten voor Honden
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze planten zijn veilig voor honden:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Rozen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Zonnebloemen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Geraniums
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Petunias
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Lavendel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Afrikaantjes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Viooltjes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Kamille
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Azalea's en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn rododendrons even giftig als azalea's?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, azalea's en rododendrons behoren tot dezelfde plantenfamilie (Rhododendron) en bevatten beide grayanotoxine. Beide planten zijn zeer giftig voor honden. Sommige rododendronsoorten kunnen zelfs een hogere concentratie grayanotoxine bevatten. Behandel alle planten uit deze familie als zeer giftig.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang na het eten van azalea krijgt mijn hond symptomen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Symptomen kunnen binnen enkele uren optreden. De eerste tekenen zijn vaak kwijlen en braken. Hartproblemen en neurologische symptomen kunnen zich later ontwikkelen. Wacht niet af tot symptomen optreden - bij verdenking van azalea-inname moet je direct naar de dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond herstellen van azaleavergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Met snelle veterinaire behandeling kunnen veel honden volledig herstellen van azaleavergiftiging. De prognose is beter als behandeling snel start. Zonder behandeling kan azaleavergiftiging ernstige gezondheidsproblemen veroorzaken. De ernst hangt af van hoeveel je hond heeft gegeten en hoe groot je hond is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn gedroogde azaleabladeren ook giftig?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, gedroogde azaleabladeren blijven zeer giftig. Grayanotoxine breekt niet af bij het drogen. Snoeiafval, afgevallen bladeren en zelfs dode takken bevatten nog steeds de giftige stof. Ruim al het azalea-materiaal direct op en voorkom dat je hond erbij kan.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn azalea's ook giftig voor katten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, azalea's zijn ook giftig voor katten en veroorzaken vergelijkbare symptomen. Gelukkig eten katten zelden aan azalea's omdat ze kieskeuriger zijn met planten dan honden. Toch moeten katteneigenaren ook voorzichtig zijn met azalea's in huis en tuin.
              </div>
            </details>
          </div>
        </section>

        <RelatedSafeFoods
          locale="nl"
          animal="honden"
          foods={commonSafeFoods}
          title="Veilige snack alternatieven"
        />

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van azaleavergiftiging moet je ONMIDDELLIJK contact opnemen met een dierenarts of spoedkliniek. Azaleavergiftiging is een medisch noodgeval waarbij snelle behandeling cruciaal is. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht nooit af - bel altijd direct bij verdenking van azalea-inname.
            </p>
          </div>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Is Azalea Giftig voor Honden? Zeer Gevaarlijk",
            "description": "Azalea's zijn zeer giftig voor honden - grayanotoxine veroorzaakt hartproblemen en neurologische symptomen. Herken symptomen en weet wat te doen bij inname.",
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
            "datePublished": "2025-12-15",
            "dateModified": "2025-12-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/is-azalea-giftig-voor-honden"
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
                "name": "Zijn rododendrons even giftig als azalea's?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, azalea's en rododendrons behoren tot dezelfde plantenfamilie (Rhododendron) en bevatten beide grayanotoxine. Beide planten zijn zeer giftig voor honden. Behandel alle planten uit deze familie als zeer giftig."
                }
              },
              {
                "@type": "Question",
                "name": "Hoelang na het eten van azalea krijgt mijn hond symptomen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Symptomen kunnen al binnen 15 minuten optreden, maar het kan ook tot 6 uur duren. De eerste tekenen zijn vaak kwijlen en braken. Hartproblemen en neurologische symptomen kunnen zich later ontwikkelen."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond herstellen van azaleavergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Met snelle en agressieve veterinaire behandeling kunnen veel honden volledig herstellen. De prognose is het best als behandeling binnen enkele uren na inname start. Zonder behandeling kan azaleavergiftiging fataal zijn."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn gedroogde azaleabladeren ook giftig?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, gedroogde azaleabladeren blijven zeer giftig. Grayanotoxine breekt niet af bij het drogen. Snoeiafval en afgevallen bladeren bevatten nog steeds de giftige stof."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn azalea's ook giftig voor katten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, azalea's zijn ook giftig voor katten en veroorzaken vergelijkbare symptomen. Gelukkig eten katten zelden aan azalea's omdat ze kieskeuriger zijn met planten dan honden."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
