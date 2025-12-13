import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Agressie bij honden: oorzaken, signalen en aanpak",
  description: "Herken en behandel agressief gedrag bij honden. Leer waarschuwingssignalen herkennen en vind effectieve oplossingen. Zoek een hondengedragstherapeut.",
  keywords: "agressie honden, agressief gedrag hond, hond grommen, hond bijten, hondengedrag, gedragsproblemen hond, hondentraining",
  openGraph: {
    title: "Agressie bij honden: oorzaken, signalen en aanpak",
    description: "Ontdek de oorzaken van agressie bij honden en leer effectieve methoden om dit gedrag aan te pakken. Vind een gedragstherapeut bij jou.",
    type: "article",
  },
};

export default function AgressieHondenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpPink/10 via-cpYellow/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/40 mb-6">
              <span className="text-2xl">⚠️</span>
              <span className="text-sm font-medium text-foreground">Veiligheid Eerst</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Agressie bij honden: oorzaken, signalen en aanpak
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Agressief gedrag bij honden is een serieus probleem dat professionele aandacht vereist. Leer de waarschuwingssignalen herkennen en ontdek veilige manieren om het gedrag aan te pakken.
            </p>
            <Button
              size="lg"
              className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/nl/netherlands">
                Vind een gedragstherapeut bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Important Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🚨</span>
              <div>
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">Belangrijk: Veiligheid voorop</h3>
                <p className="text-red-800 dark:text-red-300 mb-0">
                  Agressie bij honden is een complex gedragsprobleem dat potentieel gevaarlijk is. Dit artikel is informatief, maar vervangt GEEN professionele hulp. Bij agressief gedrag is begeleiding door een gecertificeerde hondengedragstherapeut essentieel. Probeer nooit zelf agressie aan te pakken zonder deskundige begeleiding.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Agressie bij honden kan zich uiten in verschillende vormen: grommen, tandjes laten zien, snauwen, happen of bijten. Het is belangrijk te begrijpen dat agressie bijna altijd voortkomt uit angst, pijn of frustratie - niet uit "dominantie" of "wraak" zoals vaak gedacht wordt. Met de juiste kennis en professionele begeleiding kan agressief gedrag vaak aangepakt worden.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Soorten agressie bij honden
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Angst-gerelateerde agressie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            De meest voorkomende vorm van agressie. Een angstige hond die zich in het nauw gedreven voelt, kan agressief worden als "laatste redmiddel". Tekenen: achteruitwijken, staart tussen de benen, oren naar achteren, grommen of happen wanneer ze niet kunnen vluchten. Vaak veroorzaakt door slechte socialisatie, traumatische ervaringen of genetische aanleg.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Territoriale agressie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Honden beschermen hun territorium (huis, tuin, auto) tegen indringers. Dit kan zich uiten in blaffen, grommen of snauwen naar bezoekers of voorbijgangers. Vooral uitgesprok bij bepaalde rassen die gefokt zijn als waakhond. Het gedrag wordt vaak versterkt als de "indringer" weggaat, wat de hond leert dat agressie effectief is.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Bezittelijke agressie (resource guarding)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Sommige honden bewaken intensief hun voer, speelgoed, slaapplaats of zelfs hun baasje. Ze grommen, verstijven of happen wanneer iemand deze "waardevolle resources" nadert. Dit is overlevingsinstinct - in het wild moest voedsel verdedigd worden. Bij huishonden kan dit echter problematisch en gevaarlijk worden.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Pijn-geïnduceerde agressie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Een hond met pijn kan agressief reageren wanneer het pijnlijke gebied aangeraakt wordt. Dit is een natuurlijke verdedigingsreflex. Artritis, oorontstekingen, tandproblemen of verwondingen kunnen leiden tot dit gedrag. Plotselinge agressie bij een normaal vriendelijke hond kan wijzen op pijn - een dierenarts bezoek is dan prioriteit.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Redirected agressie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Wanneer een hond opgewonden of gefrustreerd is door iets dat niet bereikbaar is (een andere hond achter een hek), kan hij zijn frustratie "redirecten" naar iets of iemand dichtbij - vaak de baasje die hem probeert weg te leiden. Dit is een van de gevaarlijkste vormen omdat het onvoorspelbaar is.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            6. Sociaal-geïnduceerde agressie (tussen honden)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Agressie tussen honden kan voortkomen uit slechte socialisatie, onprettige ervaringen met andere honden, of genetische aanleg. Het kan gericht zijn op specifieke hondtypes (bijvoorbeeld mannelijke intacte honden) of alle honden. Dit gedrag kan escaleren van stijve lichaamstaal en staren tot grommen en vechten.
          </p>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎓</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professionele begeleiding is essentieel
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Agressie is een complex gedragsprobleem waarbij één verkeerde reactie het gedrag kan verergeren. Een gecertificeerde gedragstherapeut kan een veilig trainingsplan opstellen.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/nl/netherlands">
                    Bekijk gedragstherapeuten in jouw regio →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Waarschuwingssignalen: De agressieladder
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Honden communiceren duidelijk voordat ze bijten. Het herkennen van deze signalen kan escalatie voorkomen. De "agressieladder" toont de progressie van subtiele waarschuwingen naar expliciete agressie:
          </p>

          <div className="bg-gradient-to-br from-cpYellow/10 to-cpPink/10 rounded-2xl p-6 mb-8 border border-cpYellow/30">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">De escalatie van signalen:</h3>
            <ol className="space-y-3 text-muted-foreground dark:text-cpCream/80">
              <li><strong>1. Subtiele signalen:</strong> Lippen likken, wegkijken, geeuwen, verstijven, oren naar achteren</li>
              <li><strong>2. Duidelijker ongemak:</strong> Weggaan, zich afwenden, staart tussen benen, lichaam laag bij de grond</li>
              <li><strong>3. Waarschuwingen:</strong> Lip optrekken, tanden laten zien, lage grom, strak staren</li>
              <li><strong>4. Duidelijke dreiging:</strong> Blaffen, grommen, snauwen (happen zonder contact)</li>
              <li><strong>5. Fysiek contact:</strong> Happen (korte contactmoment), bijten</li>
              <li><strong>6. Ernstige aanval:</strong> Meerdere beten, schudbewegingen, niet loslaten</li>
            </ol>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Belangrijk: Honden kunnen "treden overslaan" op deze ladder, vooral als ze gestraft zijn voor grommen in het verleden. Een hond die geleerd heeft dat grommen tot straf leidt, kan direct tot bijten overgaan zonder waarschuwing. Dit maakt het straffen van grommen gevaarlijk - grommen is communicatie, niet "slecht gedrag".
          </p>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Hoe agressie NIET aan te pakken
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4">Deze methoden zijn gevaarlijk en contraproductief:</h3>
            <ul className="space-y-3 text-red-800 dark:text-red-300">
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Alpha/dominantie methoden:</strong> "Alpha roll", op de rug duwen, alpha-wurging. Deze verouderde methoden zijn gebaseerd op misverstanden over wolven en kunnen agressie verergeren.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Confrontatie forceren:</strong> "Hij moet er maar aan wennen" - een angstige hond blootstellen aan angstobject zonder voorbereiding kan trauma veroorzaken.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Fysieke straf:</strong> Slaan, schoppen, aan de riem rukken verergert angst en kan agressie escaleren.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Schokhalsbanden:</strong> Elektronische halsbanden kunnen agressie verergeren door pijn en angst te associëren met de trigger.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Grommen straffen:</strong> Grommen is waarschuwing - straffen elimineert de waarschuwing maar niet de onderliggende emotie.</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veilige aanpak: Wat je WEL kunt doen
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Veiligheid waarborgen (management)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Terwijl je werkt aan gedragsverandering, voorkom situaties waarin agressie kan optreden:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Gebruik een muilkorf tijdens risicovolle situaties (leer je hond de muilkorf positief associëren)</li>
            <li>Vermijd triggers waar mogelijk (andere kant oplopen tijdens wandelingen)</li>
            <li>Zorg voor veilige ruimtes waar je hond zich kan terugtrekken</li>
            <li>Waarschuw bezoekers en houd je hond gescheiden tijdens bezoek</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Raadpleeg eerst een dierenarts
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Bij plotselinge agressie of gedragsverandering is een medische check essentieel. Pijn, schildklier problemen, of neurologische aandoeningen kunnen agressie veroorzaken. Behandeling van het medische probleem kan het gedrag oplossen.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Werk met een gecertificeerde gedragstherapeut
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Agressie is te complex en gevaarlijk om zonder professionele hulp aan te pakken. Een gedragstherapeut kan:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>De specifieke oorzaak en type agressie identificeren</li>
            <li>Een veilig, op maat gemaakt trainingsplan opstellen</li>
            <li>Je begeleiden in desensibilisatie en tegenkonditionering</li>
            <li>Realistische verwachtingen scheppen en progressie monitoren</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Desensibilisatie en tegenkonditionering
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Onder professionele begeleiding kun je werken aan:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Desensibilisatie:</strong> Geleidelijk blootstellen aan de trigger op veilige afstand</li>
            <li><strong>Tegenkonditionering:</strong> Positieve associaties creëren met de trigger (trigger = lekkere dingen)</li>
            <li><strong>Afstand respecteren:</strong> Werken onder de drempel waarbij je hond reageert</li>
            <li><strong>Belonen van rustig gedrag:</strong> Elke keer dat je hond de trigger ziet zonder te reageren</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Basisgehoorzaamheid versterken
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Goede basiscommando's (zit, blijf, kom, kijk) geven je controle in risicovolle situaties. Train deze commando's met positieve bekrachtiging in rustige omgevingen eerst, en bouw langzaam op naar afleidende omgevingen.
          </p>

          {/* Internal Links */}
          <div className="bg-cpYellow/10 border border-cpYellow/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Gerelateerde onderwerpen die je kunnen helpen:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/angst-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Angst bij huisdieren: herkennen en behandelen
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/hond-blaft-veel" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Waarom blaft mijn hond zoveel? Oorzaken en oplossingen
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/meerdere-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Meerdere huisdieren in één huis: tips voor harmonie
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelgestelde vragen over agressie bij honden
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan agressief gedrag volledig genezen?
                <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit hangt af van de oorzaak, ernst, en hoe lang het gedrag al bestaat. Sommige honden kunnen volledig herstellen, anderen zullen altijd management nodig hebben. Het doel is vaak niet "genezing" maar het gedrag beheersbaar en veilig maken. Met professionele begeleiding, geduld en consistentie is significante verbetering vaak mogelijk. Realistische verwachtingen zijn essentieel.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet ik mijn agressieve hond laten euthanaseren?
                <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit is een zeer persoonlijke beslissing die alleen jij kunt maken. In extreme gevallen waar een hond ernstig gevaar vormt en niet reageert op training, kan dit overwogen worden. Maar vaak zijn er opties: professionele gedragstherapie, medicatie, management protocollen. Raadpleeg een gecertificeerde gedragstherapeut EN je dierenarts voordat je deze beslissing neemt. Velen honden met agressie kunnen met de juiste begeleiding veilig en gelukkig leven.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is agressie erfelijk of aangeleerd?
                <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Beide spelen een rol. Sommige rassen of individuele honden hebben genetische aanleg voor angst of reactiviteit. Echter, omgeving en ervaringen bepalen of deze aanleg tot agressie leidt. Traumatische ervaringen, slechte socialisatie, of inconsistente training kunnen agressie veroorzaken, zelfs bij genetisch stabiele honden. De meeste agressie is een combinatie van genetica en levenservaringen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan medicatie helpen bij agressie?
                <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Ja, in sommige gevallen kan medicatie een waardevolle aanvulling zijn op gedragstherapie. Anti-angst medicatie kan het angstniveau verlagen, waardoor de hond beter in staat is te leren. Medicatie alleen lost het probleem niet op - het moet gecombineerd worden met gedragsmodificatie. Bespreek dit met je dierenarts en gedragstherapeut. Sommige honden profiteren enorm, anderen niet. Het is niet "opgeven" - het is je hond helpen om te kunnen leren.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpPink via-cpPink/90 to-cpYellow py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🛡️ Veiligheid en expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Agressie is complex - laat je niet alleen staan
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Vind een gecertificeerde hondengedragstherapeut die gespecialiseerd is in agressie. Professionele begeleiding is essentieel voor veiligheid en succes.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpPink hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/nl/netherlands">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Agressie bij honden: oorzaken, signalen en aanpak",
            "description": "Herken en behandel agressief gedrag bij honden. Leer waarschuwingssignalen herkennen en ontdek veilige methoden om agressie aan te pakken met professionele hulp.",
            "image": "https://images.unsplash.com/photo-1568572933382-74d440642117?w=1200",
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
              "@id": "https://cutiepawspedia.com/nl/huisdiergedrag/agressie-honden"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Huisdiergedrag", href: "/nl/gids/huisdiergedrag" },
          { label: "Agressie bij honden" }
        ]}
      />
    </div>
  );
}
