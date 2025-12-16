/**
 * Pet Toxicity Canonical Page: Blauwgroene Algen - Honden (Dogs)
 * Type: Plant/Environmental
 * Toxicity Level: HOOG (HIGH)
 * Locale: nl (Dutch)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Droplet, Phone, Clock, Heart, XCircle } from "lucide-react";
import { FoodGuideBreadcrumb, RelatedSafeFoods, commonSafeFoods } from '@/components/seo/FoodGuideBreadcrumb';

export const metadata: Metadata = {
  title: "Is Blauwgroene Algen Giftig voor Honden? Levensgevaarlijk - CutiePawsPedia",
  description: "Blauwgroene algen (cyanobacteriën) zijn zeer giftig voor honden - kunnen binnen enkele uren leverfalen en neurologische schade veroorzaken. Herken symptomen en weet wat te doen.",
  keywords: [
    "blauwgroene algen giftig voor honden",
    "cyanobacteriën honden",
    "hond algen gegeten",
    "giftig water honden",
    "blauwgroene algen vergiftiging",
    "leverfalen honden algen",
    "spoed dierenarts hond",
    "toxische algen honden",
    "water vergiftiging hond"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Blauwgroene Algen Giftig voor Honden? Levensgevaarlijk",
    description: "Blauwgroene algen zijn zeer giftig voor honden - kunnen binnen enkele uren leverfalen en neurologische schade veroorzaken. Noodgids voor hondeneigenaren.",
    type: "article",
  },
};

export default function IsBlauwgroeneAlgenGiftigVoorHonden() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 via-red-50/50 to-transparent dark:from-red-950/30 dark:via-red-950/10 dark:to-transparent border-b border-border dark:border-red-800/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb with JSON-LD Schema */}
          <FoodGuideBreadcrumb
            locale="nl"
            items={[
              { name: "Voedselgids", href: "/nl/voedselgids" },
              { name: "Giftige Stoffen", href: "/nl/giftige-stoffen" },
            ]}
            currentPage="Blauwgroene Algen voor Honden"
          />

          <div className="flex items-center gap-2 mb-4">
            <Droplet className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Zeer Giftige Watergevaar voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Blauwgroene Algen Giftig voor Honden?
          </h1>

          {/* TL;DR Verdict Box - URGENT WARNING */}
          <div className="bg-red-600 dark:bg-red-700 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-4">
              <XCircle className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white mb-2">
                  Ja - Extreem giftig en levensgevaarlijk
                </p>
                <p className="text-white/95 text-lg leading-relaxed">
                  Blauwgroene algen (cyanobacteriën) zijn levensgevaarlijk voor honden. Deze toxische algen komen voor in stilstaand water en produceren giftige stoffen die binnen enkele uren leverfalen, zenuwstelselschade en overlijden kunnen veroorzaken. Al een paar slokken besmet water kan fataal zijn.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je hond heeft water met blauwgroene algen gedronken?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Neem onmiddellijk contact op met je dierenarts of een 24-uurs spoedkliniek. Dit is zeer gevaarlijk en vereist acute behandeling.
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
            Deze pagina bevat levensreddende informatie over blauwgroene algenvergiftiging bij honden, symptomen, behandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Zijn Blauwgroene Algen Zo Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Blauwgroene algen zijn eigenlijk geen algen maar cyanobacteriën - microscopisch kleine organismen die in stilstaand zoet water kunnen groeien. Bij warm weer en veel zonlicht kunnen ze explosief vermeerderen en een giftige 'bloei' vormen. Deze bloei ziet eruit als groene verf, schuim of drijflagen op het wateroppervlak.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het gevaarlijke is dat honden graag in meren, vijvers en sloten zwemmen en drinken - vooral op warme dagen. Ze kunnen niet ruiken of water giftig is. Als een hond water drinkt dat besmet is met blauwgroene algen, kunnen de toxinen binnen enkele uren tot ernstige gezondheidsschade leiden.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De toxinen die cyanobacteriën produceren (zoals microcystines en anatoxines) tasten de lever, nieren en het zenuwstelsel aan. Er is geen tegengif - behandeling is alleen ondersteunend. Daarom is preventie cruciaal.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-medium mb-2">
              Let op: Waar komen blauwgroene algen voor?
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Blauwgroene algen komen vooral voor in stilstaand zoet water zoals meren, vijvers, sloten en kanalen. De bloei ontstaat meestal bij warm, zonnig weer (boven 20°C) en is het meest waarschijnlijk tussen mei en oktober. Water met voedingsstoffen (landbouwgebieden) loopt extra risico.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Hoe Herken Je Giftig Water?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Blauwgroene algen bloei kan er zo uitzien:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Groene verfachtige laag</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water ziet eruit alsof er groene verf in is gegoten</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Groen schuim of drijflaag</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Schuimige of dikke groene laag op het wateroppervlak</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Troebel groen water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water ziet er melkachtig of soepachtig groen uit</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Blauwgroene drijvende matjes</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Soms blauwachtige of bruingroene vlokken</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Vieze geur</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Soms een muffige, naar gras of modder stinkende geur</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Let op:</strong> Niet alle blauwgroene algen zijn zichtbaar aan het oppervlak. Water kan er normaal uitzien maar toch giftig zijn. Veel gemeenten plaatsen waarschuwingsborden bij water met blauwgroene algen - neem deze altijd serieus!
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Blauwgroene Algenvergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen 15 minuten tot enkele uren na contact optreden. De ernst hangt af van hoeveel water de hond heeft gedronken en hoe toxisch de algen zijn. Herken de waarschuwingssignalen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Early symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (15 minuten - 2 uur)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Braken</strong> (vaak groen of schuimend)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong> (soms bloederig)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Overmatig kwijlen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Lusteloosheid en zwakte</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Moeite met ademhalen</strong></span>
                </li>
              </ul>
            </div>

            {/* Progressive symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Ernstige Symptomen (Zenuwstelsel & Lever)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Spiertrillingen en stuiptrekkingen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Desoriëntatie en verwardheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen (toevallen)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Blauw gekleurde tandvlees</strong> (gebrek aan zuurstof)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Gele tandvlees of ogen</strong> (leverfalen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Bewusteloosheid</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overlijden</strong> (kan binnen enkele uren optreden)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Belangrijk:</strong> Blauwgroene algenvergiftiging verloopt snel en agressief. Zonder onmiddellijke behandeling kunnen honden binnen enkele uren overlijden. Bij elke verdenking moet je DIRECT naar de dierenarts - wacht niet af!
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Besmet Water Heeft Gedronken
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-bold mb-4 text-lg">
              Onmiddellijke actie vereist:
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Verwijder je hond onmiddellijk uit het water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Stop direct alle contact met het water. Voorkom dat je hond nog meer water drinkt of likt.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Spoel je hond af met schoon water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Was algen van de vacht af om te voorkomen dat je hond ze later nog aflikt. Gebruik schoon (kraanwater).
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel onmiddellijk je dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je hond mogelijk water met blauwgroene algen heeft gedronken. Snelle actie is zeer belangrijk.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Maak foto's van het water</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Als mogelijk, fotografeer het water zodat de dierenarts kan zien of er blauwgroene algen aanwezig zijn.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga direct naar de dierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Wacht niet op symptomen. Hoe sneller de behandeling start, hoe groter de overlevingskans. Dit is een acuut noodgeval.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Er is geen tegengif voor blauwgroene algenvergiftiging. De behandeling is ondersteunend en bestaat uit intensieve vloeistoftherapie via infuus, medicijnen tegen braken, bescherming van lever en nieren, en mogelijk medicatie tegen stuipen. Je hond moet vaak meerdere dagen opgenomen worden voor 24-uurs monitoring.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> De overlevingskans hangt af van hoe snel behandeling start en hoeveel toxine de hond heeft binnengekregen. Met zeer snelle behandeling kunnen honden overleven, maar zonder directe hulp is het overlijdenspercentage zeer hoog (vaak binnen 24 uur).
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
              Bij elke verdenking direct contact opnemen
            </p>
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Bij elke verdenking van contact met blauwgroene algen moet je onmiddellijk de dierenarts bellen, zelfs als:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je alleen maar <strong>vermoedt</strong> dat het water besmet was</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond nog geen symptomen vertoont</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond maar een paar slokken heeft gedronken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je niet zeker weet of het blauwgroene algen waren</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Er geen waarschuwingsborden stonden bij het water</span>
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
            Preventie: Bescherm Je Hond tegen Blauwgroene Algen
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Preventie is essentieel omdat er geen tegengif bestaat. Zo bescherm je je hond:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Vermijd stilstaand water in zomermaanden</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Blauwgroene algen komen vooral voor tussen mei en oktober bij warm weer. Vermijd vijvers, meren en sloten.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Let op waarschuwingsborden</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Gemeenten plaatsen vaak borden bij besmet water - neem deze altijd serieus en houd je hond weg</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Controleer waterkleur</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water met groene verfachtige laag, schuim of troebel groen water mijden</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Neem eigen drinkwater mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zorg dat je hond schoon drinkwater heeft bij wandelingen</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train je hond om niet uit water te drinken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer je hond alleen uit drinkbak te drinken, niet uit sloten of vijvers</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Check lokale waterberichten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Veel gemeenten publiceren online of er blauwgroene algen in lokale wateren zijn</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Droplet className="h-5 w-5 text-emerald-600" />
              Veilige Alternatieven
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Veilige zwemlocaties voor honden:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Stromend water (rivieren, beken)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Zee en strand
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Speciaal onderhouden hondenzwembaden
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Grote meren met goed waterbeheer (check eerst!)
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Blauwgroene Algen en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe weet ik of water blauwgroene algen bevat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Blauwgroene algen zien er meestal uit als groene verf, schuim of een dikke groene laag op het water. Het water kan troebel groen zijn of groene vlokken bevatten. Soms is er een vieze, muffige geur. Let vooral op waarschuwingsborden van de gemeente. Echter, niet alle blauwgroene algen zijn zichtbaar - in twijfelgevallen is het veiliger om je hond uit het water te houden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan mijn hond ook ziek worden door in het water te zwemmen zonder te drinken?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, honden kunnen giftige algen van hun vacht likken na het zwemmen. Ook kan het inademen van waterdruppels bij zwemmen of spelen al toxinen binnenbrengen. Daarom is het belangrijk om je hond direct af te spoelen met schoon water als hij in verdacht water heeft gezwommen, en contact op te nemen met de dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer zijn blauwgroene algen het meest gevaarlijk?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Blauwgroene algen groeien het meest explosief bij warm, zonnig weer (boven 20°C) in stilstaand zoet water. De bloei komt vooral voor tussen mei en oktober. Na lange perioden van warm weer en weinig regen is het risico het grootst. In Nederland zijn de zomermaanden (juni-augustus) daarom de gevaarlijkste tijd.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is er een tegengif voor blauwgroene algenvergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, er bestaat geen tegengif voor blauwgroene algenvergiftiging. De behandeling is ondersteunend en richt zich op het helpen van het lichaam om de toxinen te verwerken. Dit gebeurt via intensieve vloeistoftherapie, bescherming van lever en nieren, en symptoombestrijding. Daarom is preventie zo belangrijk en moet je bij verdenking ONMIDDELLIJK naar de dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kunnen mensen ook ziek worden van blauwgroene algen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, blauwgroene algen zijn ook gevaarlijk voor mensen. Zwemmen in besmet water kan huidirritatie, oogproblemen en maagklachten veroorzaken. Inslikken van water kan ernstiger zijn. Kinderen lopen extra risico omdat ze meer water inslikken bij zwemmen. Als je hond in contact is geweest met blauwgroene algen, was jezelf ook goed en raadpleeg een arts bij klachten.
              </div>
            </details>
          </div>

          {/* Safe Food Alternatives */}
          <RelatedSafeFoods
            locale="nl"
            animal="honden"
            foods={commonSafeFoods}
            title="Veilige snack alternatieven"
          />
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Medische Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 leading-relaxed">
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van blauwgroene algenvergiftiging moet je onmiddellijk contact opnemen met een dierenarts of spoedkliniek. Blauwgroene algenvergiftiging is een medisch noodgeval waarbij snelle actie belangrijk is. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht niet af - bel altijd direct bij verdenking.
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
            "headline": "Is Blauwgroene Algen Giftig voor Honden? Levensgevaarlijk",
            "description": "Blauwgroene algen (cyanobacteriën) zijn zeer giftig voor honden - kunnen binnen enkele uren leverfalen en neurologische schade veroorzaken.",
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
              "@id": "https://cutiepawspedia.com/nl/is-blauwgroene-algen-giftig-voor-honden"
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
                "name": "Hoe weet ik of water blauwgroene algen bevat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Blauwgroene algen zien er meestal uit als groene verf, schuim of een dikke groene laag op het water. Het water kan troebel groen zijn of groene vlokken bevatten. Soms is er een vieze, muffige geur. Let vooral op waarschuwingsborden van de gemeente."
                }
              },
              {
                "@type": "Question",
                "name": "Kan mijn hond ook ziek worden door in het water te zwemmen zonder te drinken?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, honden kunnen giftige algen van hun vacht likken na het zwemmen. Ook kan het inademen van waterdruppels bij zwemmen of spelen al toxinen binnenbrengen. Daarom is het belangrijk om je hond direct af te spoelen met schoon water."
                }
              },
              {
                "@type": "Question",
                "name": "Wanneer zijn blauwgroene algen het meest gevaarlijk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Blauwgroene algen groeien het meest explosief bij warm, zonnig weer (boven 20°C) in stilstaand zoet water. De bloei komt vooral voor tussen mei en oktober. In Nederland zijn de zomermaanden (juni-augustus) daarom de gevaarlijkste tijd."
                }
              },
              {
                "@type": "Question",
                "name": "Is er een tegengif voor blauwgroene algenvergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nee, er bestaat geen tegengif voor blauwgroene algenvergiftiging. De behandeling is ondersteunend en richt zich op het helpen van het lichaam om de toxinen te verwerken via intensieve vloeistoftherapie, bescherming van lever en nieren, en symptoombestrijding."
                }
              },
              {
                "@type": "Question",
                "name": "Kunnen mensen ook ziek worden van blauwgroene algen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, blauwgroene algen zijn ook gevaarlijk voor mensen. Zwemmen in besmet water kan huidirritatie, oogproblemen en maagklachten veroorzaken. Inslikken van water kan ernstiger zijn. Kinderen lopen extra risico omdat ze meer water inslikken bij zwemmen."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
