/**
 * Pet Toxicity Canonical Page: Oleander - Honden (Dogs)
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
  title: "Is Oleander Giftig voor Honden? | Symptomen & Wat Te Doen - CutiePawsPedia",
  description: "Oleander is extreem giftig voor honden - alle delen veroorzaken hartfalen. Zelfs kleine hoeveelheden kunnen fataal zijn. Herken symptomen en noodprocedure.",
  keywords: [
    "oleander giftig voor honden",
    "oleander gevaarlijk honden",
    "hond oleander gegeten",
    "hartfalen honden oleander",
    "giftige planten honden",
    "oleander vergiftiging hond",
    "spoed dierenarts hond",
    "oleander toxiciteit honden",
    "mediterrane planten giftig"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Is Oleander Giftig voor Honden? Zeer Gevaarlijk",
    description: "Oleander is zeer giftig voor honden - alle delen kunnen hartproblemen veroorzaken. Zelfs kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Noodgids.",
    type: "article",
  },
};

export default function IsOleanderGiftigVoorHonden() {
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
            currentPage="Oleander voor Honden"
          />

          <div className="flex items-center gap-2 mb-4">
            <Flower2 className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Extreem Giftige Plant voor Honden</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Oleander Giftig voor Honden?
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
                  Oleander is één van de meest giftige planten voor honden. Alle delen bevatten cardiale glycosiden die het hart direct beïnvloeden. Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Dit vereist altijd professionele veterinaire zorg.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-2">Noodgeval - Je hond heeft oleander gegeten?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Bel direct je dierenarts of een 24-uurs spoedkliniek. Oleandervergiftiging vereist professionele veterinaire zorg. Snelle actie verbetert de behandelkansen.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground dark:text-cpCream">
                    <Phone className="inline h-4 w-4 mr-1" />
                    <strong>Direct dierenarts bellen</strong>
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
            Deze pagina bevat levensreddende informatie over oleandervergiftiging bij honden, symptomen, noodbehandeling en preventie.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waarom Is Oleander Zo Extreem Gevaarlijk voor Honden?
          </h2>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Oleander (Nerium oleander) staat bekend als één van de meest giftige planten ter wereld voor honden en andere huisdieren. Deze mediterrane sierplant bevat krachtige cardiale glycosiden (oleandrine, nerioside en andere toxines) die het hart direct beïnvloeden op vergelijkbare wijze als digitalis.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Het fatale aan oleander is dat ALLE delen extreem giftig zijn - bladeren, bloemen, stengels, wortels, zaden, nectar, en zelfs het water waarin oleandertakken hebben gestaan. Er zijn gevallen bekend van honden die zijn overleden na het eten van slechts één enkel blad, of na het kauwen op een afgesnoeide tak.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Oleander wordt vaak geplant als sierheesters in tuinen, parken en langs wegen in warmere klimaten. De plant is ook populair als kuipplant. Voor hondeneigenaren is het cruciaal om oleander te herkennen en volledig te vermijden. Zelfs droge bladeren blijven jarenlang giftig.
          </p>

          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-xl p-5 mb-6">
            <p className="text-sm text-foreground dark:text-cpCream font-bold mb-2">
              ⚠️ Extreem Gevaarlijk: Geen Veilige Hoeveelheid
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/80">
              Er bestaat geen bekende veilige hoeveelheid oleander voor honden. Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Neem bij elke verdenking van contact direct contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* Toxicity Details */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <XCircle className="h-7 w-7 text-red-600" />
            Alle Delen van Oleander Zijn Dodelijk Giftig
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
              Bij oleander is <strong>letterlijk elk deel dodelijk giftig</strong>:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bladeren (hoogste concentratie)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vers of gedroogd - blijven jarenlang extreem giftig</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Bloemen en knoppen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zeer toxisch, nectar is ook giftig</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Stengels en takken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Kauwen op takjes kan al fataal zijn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Wortels en schors</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Alle plantdelen bevatten cardiale glycosiden</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Zaden</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Extreem toxisch - kunnen lang in de omgeving blijven</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Water in de vaas</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Water waarin oleander heeft gestaan wordt giftig</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Rook van verbrande oleander</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zelfs het inademen van rook kan vergiftiging veroorzaken - NOOIT verbranden!</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-2">
              <strong>Historische Waarschuwing:</strong> Er zijn gedocumenteerde gevallen van overlijdens bij mensen en dieren die barbecue-spiesjes van oleandertakken gebruikten, of die vlees roosterden boven vuur met oleanderhout. De toxines blijven actief bij verhitting.
            </p>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Symptomen van Oleandervergiftiging bij Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Symptomen kunnen binnen 30 minuten tot enkele uren optreden. Oleander beïnvloedt voornamelijk het hart, maar veroorzaakt ook maag-darm en neurologische symptomen:
          </p>

          <div className="space-y-4 mb-6">
            {/* Initial symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cpAmber" />
                Eerste Symptomen (maag-darm)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Overmatig kwijlen</strong> (speekselvloed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Misselijkheid en braken</strong> (vaak bloederig)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diarree</strong> (vaak bloederig)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Buikpijn</strong> (gekromde houding, janken)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Verlies van eetlust</strong></span>
                </li>
              </ul>
            </div>

            {/* Cardiac symptoms - MOST DANGEROUS */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Cardiale symptomen (zeer gevaarlijk)
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Onregelmatige hartslag</strong> (aritmieën - zeer gevaarlijk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Zeer trage hartslag</strong> (bradycardie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Of zeer snelle hartslag</strong> (tachycardie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Lage bloeddruk</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Hartfalen</strong> (kan plotseling optreden)</span>
                </li>
              </ul>
            </div>

            {/* Neurological symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
              <p className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Neurologische en Andere Symptomen
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Extreme zwakte</strong> en lethargie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Tremoren</strong> (trillingen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verwardheid en desoriëntatie</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Stuipen</strong> (epileptische aanvallen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Verwijde of vernauwde pupillen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Koude ledematen</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Depressie van het centrale zenuwstelsel</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Coma</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Overlijden</strong> (door hartfalen, vaak binnen 12-24 uur)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-xl p-5">
            <p className="text-sm text-foreground dark:text-cpCream font-bold mb-2">
              Let op: Ernstige hartproblemen mogelijk
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/80">
              Oleandervergiftiging kan ernstige hartproblemen veroorzaken, zelfs bij honden die aanvankelijk alleen milde symptomen vertoonden. Wacht niet af - bij elke verdenking van oleander-inname is directe veterinaire zorg vereist.
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Wat Te Doen Als Je Hond Oleander Heeft Gegeten
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
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bel direct spoeddierenarts</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Vertel dat je hond oleander heeft gegeten. Oleandervergiftiging vereist professionele veterinaire zorg. Vertrek direct naar de spoedkliniek terwijl je belt.
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
                    Verwijder voorzichtig alle zichtbare oleanderdelen uit de bek. Let op: raak de plant zo min mogelijk aan - was je handen daarna.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">NOOIT zelf laten braken</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Probeer je hond NIET zelf te laten braken. Bij oleandervergiftiging kan dit gevaarlijk zijn. Alleen de dierenarts beslist hierover.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Neem plantenresten en info mee</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Breng plantenresten (in plastic zak), foto van de plant, en informatie over tijdstip van inname en hoeveelheid mee.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Ga direct naar spoedkliniek</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Snelle actie is belangrijk. Wacht niet op symptomen. Oleandervergiftiging vereist professionele behandeling met hartbewaking.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
            <p className="text-sm text-foreground dark:text-cpCream mb-3">
              <strong>Behandeling door de dierenarts:</strong> Er is geen specifiek tegengif voor oleandervergiftiging. De behandeling is intensief en ondersteunend: decontaminatie, actieve kool, intensief infuus, continue ECG-hartbewaking, anti-aritmie medicatie, behandeling van stuipen, bloeddrukmonitoring, en mogelijk dialyse. Je hond moet mogelijk gehospitaliseerd worden voor intensieve zorg.
            </p>
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>Prognose:</strong> Oleandervergiftiging is zeer ernstig. Snelle behandeling verbetert de overlevingskans aanzienlijk. Mogelijk is langdurige hospitalisatie en intensieve zorg nodig.
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
              Oleander is zeer giftig. Neem altijd direct contact op bij:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Het <strong>kleinste vermoeden</strong> dat je hond oleander heeft aangeraakt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond <strong>in de buurt van oleander</strong> is geweest</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je hond <strong>aan oleander heeft gesnuffeld of gelikt</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Je oleanderbladeren of -takken in je tuin hebt gevonden waar je hond speelt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Ook al zijn er <strong>nog GEEN symptomen</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Het "maar een heel klein beetje" was - <strong>dit maakt NIET uit</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6">
            <p className="text-foreground dark:text-cpCream/90 mb-3">
              <strong>Noodcontactgegevens:</strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Je eigen dierenarts</strong> (bel altijd eerst)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dierennoodhulp 24/7:</strong> 0900-0245 (€0,90 per minuut)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Dichtstbijzijnde 24-uurs spoedkliniek met hartbewaking</strong> (zoek dit NU op!)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Vind Direct een Spoeddierenarts
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Bij oleandervergiftiging telt elke seconde. Vind nu een 24-uurs spoedkliniek met hartbewaking.
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
            Preventie: Houd Oleander Ver Weg van Honden
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De enige veilige aanpak is oleander volledig vermijden:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Cruciale Preventiemaatregelen:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verwijder ALLE oleander uit je tuin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Als je een hond hebt, is dit niet negocieerbaar. Oleander mag NIET in een hondvriendelijke tuin</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verwijder wortels en alle plantenresten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ook oude wortels, dode bladeren en zaaddozen zijn dodelijk giftig</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Verbrand oleander NOOIT</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rook is giftig! Breng oleander naar een erkende afvalverwerker</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Wees alert bij wandelingen</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Oleander staat vaak in parken en langs wegen - houd je hond aangelijnd en dicht bij je</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Herken oleander</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer hoe oleander eruitziet: langwerpige leerachtige bladeren, roze/witte/rode bloemen in clusters</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Waarschuw buren en familie</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Informeer mensen waar je hond komt over het gevaar van oleander</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-foreground dark:text-cpCream font-semibold">Train een sterk "laat maar" commando</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Leer je hond planten volledig te negeren op commando</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-300 dark:border-emerald-800/50 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Flower2 className="h-5 w-5 text-emerald-600" />
              Veilige Mediterrane Alternatieven
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Deze mediterrane planten zijn veilig voor honden:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Lavendel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Rozemarijn
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Tijm
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Hibiscus
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Bougainvillea
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">•</span> Jasmijn
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Oleander en Honden
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel oleander is dodelijk voor een hond?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Zelfs zeer kleine hoeveelheden kunnen ernstige gezondheidsproblemen veroorzaken. Er bestaat geen bekende veilige hoeveelheid oleander voor honden. Neem bij elke verdenking van contact direct contact op met je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe snel werkt oleandervergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Symptomen kunnen binnen enkele uren optreden. Hartproblemen kunnen zich snel ontwikkelen. Ernstige complicaties kunnen optreden, zelfs bij honden die aanvankelijk alleen milde symptomen vertoonden. Dit is waarom directe veterinaire zorg belangrijk is - wacht niet af tot symptomen erger worden.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is er een tegengif voor oleandervergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Er is geen specifiek tegengif voor oleandervergiftiging. De behandeling is intensief ondersteunend: decontaminatie, infuustherapie, continue hartbewaking, anti-aritmie medicatie, en behandeling van symptomen. Bij ernstige vergiftiging kan specifieke medicatie soms helpen. Snelle behandeling verbetert de overlevingskans.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn gedroogde oleanderbladeren ook giftig?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, gedroogde oleanderbladeren blijven extreem giftig. De cardiale glycosiden breken niet af bij het drogen en blijven jarenlang actief. Dit maakt snoeiafval, afgevallen bladeren en zelfs dode takken zeer gevaarlijk. Alle oleandermaterialen moeten onmiddellijk worden verwijderd uit gebieden waar honden komen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-red-300/30">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan een hond herstellen van oleandervergiftiging?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Herstel is mogelijk met snelle veterinaire behandeling, maar de prognose is gereserveerd. De overlevingskans hangt af van hoeveel je hond heeft gegeten, hoe snel behandeling start, en de grootte van je hond. Snelle behandeling verbetert de kans op herstel. Mogelijk zijn langdurige hospitalisatie en intensieve zorg vereist.
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
              Deze informatie is uitsluitend bedoeld voor educatieve doeleinden en vervangt geen professioneel veterinair advies. Bij elke verdenking van oleandervergiftiging moet je direct contact opnemen met een spoeddierenarts. Oleandervergiftiging vereist professionele veterinaire zorg. De informatie op deze pagina is gebaseerd op veterinaire kennis en wetenschappelijke bronnen, maar elke hond is anders en alleen een dierenarts kan een juiste diagnose stellen en behandeling geven. Wacht niet af - bel direct bij vermoeden van oleander-contact.
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
            "headline": "Is Oleander Giftig voor Honden? Extreem Gevaarlijk",
            "description": "Oleander is extreem giftig voor honden - alle delen veroorzaken hartfalen. Zelfs kleine hoeveelheden kunnen fataal zijn.",
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
              "@id": "https://cutiepawspedia.com/nl/is-oleander-giftig-voor-honden"
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
                "name": "Hoeveel oleander is dodelijk voor een hond?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zelfs zeer kleine hoeveelheden kunnen fataal zijn. Slechts 0,005% van het lichaamsgewicht aan droge oleanderbladeren kan dodelijk zijn. Voor een hond van 10 kg betekent dit dat minder dan 1 klein blaadje al fataal kan zijn."
                }
              },
              {
                "@type": "Question",
                "name": "Hoe snel werkt oleandervergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Symptomen kunnen binnen 30 minuten tot enkele uren optreden. Hartproblemen kunnen zich zeer snel ontwikkelen. Plotselinge hartdood kan optreden, zelfs bij honden die aanvankelijk alleen milde symptomen vertoonden."
                }
              },
              {
                "@type": "Question",
                "name": "Is er een tegengif voor oleandervergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Er is geen specifiek tegengif. De behandeling is intensief ondersteunend: decontaminatie, infuustherapie, continue hartbewaking, anti-aritmie medicatie. Bij ernstige gevallen kan Digoxin-specifiek antilichaam soms helpen."
                }
              },
              {
                "@type": "Question",
                "name": "Zijn gedroogde oleanderbladeren ook giftig?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, gedroogde oleanderbladeren blijven extreem giftig. De cardiale glycosiden breken niet af bij het drogen en blijven jarenlang actief."
                }
              },
              {
                "@type": "Question",
                "name": "Kan een hond herstellen van oleandervergiftiging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Herstel is mogelijk met zeer snelle en agressieve veterinaire behandeling, maar de prognose is gereserveerd. Met behandeling binnen het eerste uur hebben honden de beste kans op herstel."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
