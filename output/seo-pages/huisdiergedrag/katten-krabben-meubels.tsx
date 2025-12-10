import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Katten krabben aan meubels stoppen: effectieve tips",
  description: "Leer waarom katten krabben en hoe je dit gedrag omleiden. Praktische tips om je meubels te beschermen. Vind een kattengedragstherapeut bij jou in de buurt.",
  keywords: "kat krabt aan meubels, katten krabben stoppen, krabpaal kat, kattengedrag, meubels beschermen kat, krabgedrag kat",
  openGraph: {
    title: "Katten krabben aan meubels stoppen: effectieve tips",
    description: "Ontdek waarom katten krabben en leer effectieve methoden om je meubels te beschermen. Vind een gedragstherapeut bij jou in de buurt.",
    type: "article",
  },
};

export default function KattenKrabbenMeubelsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpAqua/10 via-cpPink/10 to-cpYellow/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAqua/10 border border-cpAqua/30 mb-6">
              <span className="text-2xl">🐱</span>
              <span className="text-sm font-medium text-foreground">Kattengedrag Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Katten krabben aan meubels stoppen: effectieve tips
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Je favoriete bank vol krassen? Ontdek waarom katten krabben en leer praktische methoden om dit natuurlijke gedrag om te leiden naar geschikte alternatieven.
            </p>
            <Button
              size="lg"
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/nl/nederland">
                Vind een gedragstherapeut bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Krabben is een volkomen natuurlijk gedrag voor katten, maar dat maakt het niet minder frustrerend wanneer je dure bank of gordijnen het slachtoffer worden. Het goede nieuws? Je hoeft je kat niet af te leren om te krabben - je kunt het gedrag wel omleiden. In deze uitgebreide gids ontdek je waarom katten krabben, hoe je je meubels kunt beschermen, en welke alternatieven je kunt aanbieden.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Waarom krabben katten? De wetenschappelijke verklaring
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Krabben vervult meerdere essentiële functies voor katten. Het is geen "slecht gedrag" of wraak - het is biologisch geprogrammeerd. Begrip van deze functies helpt je om effectieve oplossingen te vinden.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Nagelverzorging en onderhoud
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Door te krabben verwijderen katten de buitenste versleten laag van hun nagels, waardoor scherpe nieuwe nagels zichtbaar worden. Dit is vergelijkbaar met hoe wij onze nagels knippen - een noodzakelijke vorm van hygiëne en onderhoud.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Spierrek en stretching
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Krabben is een volledige lichaamsoefening. Wanneer een kat zich uitstrekt om te krabben, rekt ze haar poten, schouders en rug. Dit helpt spieren soepel te houden en spanning te verminderen - vooral na een dutje.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Territoriummarkering
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Katten hebben geurklieren in hun pootjes. Wanneer ze krabben, laten ze visuele (de krassen) én geurmarkeringen achter. Dit communiceert naar andere katten: "Dit is mijn territorium!" Het is een manier van communiceren, niet van destructie.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Emotionele expressie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Katten krabben ook om emoties te uiten - opwinding wanneer je thuiskomt, frustratie, stress, of gewoon plezier. Het kan een manier zijn om overtollige energie kwijt te raken of spanning te verminderen.
          </p>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpPink/10 to-cpYellow/10 rounded-2xl p-8 my-12 border border-cpPink/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">💡</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Hardnekkig krabprobleem?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Een kattengedragstherapeut kan de onderliggende oorzaak analyseren en een op maat gemaakt plan opstellen om het gedrag om te leiden.
                </p>
                <Button
                  className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/nl/nederland">
                    Bekijk gedragstherapeuten in jouw regio →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            7 effectieve strategieën om krabgedrag om te leiden
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Investeer in de juiste krabpaal
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Niet alle krabpalen zijn gelijk. Een goede krabpaal moet:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Hoog genoeg zijn:</strong> Minimaal 80 cm zodat je kat zich volledig kan uitstrekken</li>
            <li><strong>Stabiel staan:</strong> Een wiebelende paal zal je kat afschrikken en vermijden</li>
            <li><strong>Stevig materiaal hebben:</strong> Sisal touw of grove stof die weerstand biedt</li>
            <li><strong>Verticaal of horizontaal:</strong> Sommige katten prefereren horizontaal krabben (denk aan je bank)</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Strategische plaatsing is cruciaal
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Plaats krabpalen op strategische locaties waar je kat al graag krabt, en op plekken waar ze veel tijd doorbrengt. Belangrijke locaties:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Direct bij de probleem-meubelstukken</li>
            <li>Bij slaapplekken (katten rekken zich graag na het slapen)</li>
            <li>Bij ingangen van kamers (territoriummarkering)</li>
            <li>In drukke ruimtes waar je kat speelt en actief is</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Maak meubels onaantrekkelijk
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Terwijl je alternatieven aanbiedt, maak je tegelijkertijd de meubels minder aantrekkelijk:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Dubbelzijdige tape:</strong> Katten haten de plakkerige textuur op hun pootjes</li>
            <li><strong>Aluminium folie:</strong> De textuur en het geluid schrikken de meeste katten af</li>
            <li><strong>Afweerspray:</strong> Speciale kattenafweersprays met citrusgeur (katten haten citrus)</li>
            <li><strong>Meubelhoezen:</strong> Tijdelijke bescherming met glad materiaal dat niet bevredigend is om te krabben</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Positieve bekrachtiging toepassen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Beloon je kat uitbundig wanneer ze de krabpaal gebruikt. Gebruik snoepjes, aai sessies of speeltijd direct na het krabben aan de juiste plek. Je kunt ook kattenkruid op of rond de krabpaal wrijven om het extra aantrekkelijk te maken. Sommige katten reageren goed op kattenkruid, anderen op valeriaan of honingbloemspray.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Regelmatig nagels knippen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Door je kats nagels elke 2-3 weken te knippen, verminder je de schade die krabben kan aanrichten. Gebruik speciale kattennagel knippers en knip alleen het witte puntje - nooit het roze deel (de quick) dat bloedvaten bevat. Als je onzeker bent, laat een dierenarts of trimsalon dit de eerste keer demonstreren.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            6. Omleiding en afleiding
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Wanneer je je kat betrapt op krabben aan meubels, reageer niet met schreeuwen of straffen. Leid in plaats daarvan haar aandacht om naar een speeltje of lok haar naar de krabpaal met een snoepje of speeltje. Zodra ze de krabpaal gebruikt, beloon dan direct.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            7. Verrijking en speeltijd
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Katten die zich vervelen of te veel energie hebben, kunnen excessief krabben. Zorg voor:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Minimaal 15-30 minuten actieve speeltijd per dag</li>
            <li>Interactief speelgoed zoals veren aan een stokje</li>
            <li>Puzzel feeders om mentale stimulatie te bieden</li>
            <li>Raamperches om naar buiten te kunnen kijken</li>
            <li>Roteer speelgoed wekelijks om verveling te voorkomen</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelgemaakte fouten bij krabgedrag
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4">Vermijd deze valkuilen:</h3>
            <ul className="space-y-3 text-red-800 dark:text-red-300">
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Ontklawen:</strong> Dit is een amputatie en extreem pijnlijk. In veel landen illegaal en nooit acceptabel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Straffen achteraf:</strong> Katten begrijpen geen straffen die niet direct gekoppeld zijn aan het gedrag.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Goedkope wiebelende krabpalen:</strong> Deze schrikken katten af en worden vermeden.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Alleen één krabpaal:</strong> Katten hebben meerdere krablocaties nodig door het huis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Te snel opgeven:</strong> Gedragsverandering kost tijd - blijf consistent voor minimaal 2-4 weken.</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Speciale gevallen: Meerdere katten en stress-gerelateerd krabben
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Huishoudens met meerdere katten
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            In huizen met meerdere katten is territoriummarkering door krabben vaak intenser. De vuistregel: heb minimaal één krabpaal per kat, plus één extra. Plaats krabpalen strategisch in verschillende kamers zodat elke kat haar eigen territorium kan markeren zonder conflict.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Stress als oorzaak van excessief krabben
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Plotseling verhoogd krabgedrag kan wijzen op stress. Mogelijke stressoren:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Verhuizing of grote veranderingen in huis</li>
            <li>Nieuwe huisgenoten (mensen of dieren)</li>
            <li>Verandering in dagelijkse routine</li>
            <li>Geluiden of gebeurtenissen buiten (bouwwerkzaamheden, vuurwerk)</li>
            <li>Medische problemen of pijn</li>
          </ul>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Bij stress-gerelateerd krabben is het belangrijk de onderliggende oorzaak aan te pakken. Feliway-diffusers (synthetische kattengeur feromonen) kunnen helpen stress te verminderen. Bij aanhoudende stress, raadpleeg een kattengedragstherapeut.
          </p>

          {/* Internal Links */}
          <div className="bg-cpYellow/10 border border-cpYellow/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Meer over kattengedrag en huisdierharmonie:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/angst-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Angst bij huisdieren: herkennen en behandelen
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/meerdere-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Meerdere huisdieren in één huis: tips voor harmonie
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/hond-blaft-veel" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Waarom blaft mijn hond zoveel? Oorzaken en oplossingen
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelgestelde vragen over katten krabben
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang duurt het voordat mijn kat de krabpaal gebruikt?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit varieert per kat. Sommige katten accepteren een nieuwe krabpaal meteen, andere hebben 2-4 weken nodig. Sleutel tot succes: geduld, strategische plaatsing, en consistente positieve bekrachtiging. Kattenkruid of valeriaan kan helpen de krabpaal aantrekkelijker te maken. Blijf volhouden!
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn nagelkapjes veilig voor katten?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Nagelkapjes (zoals Soft Paws) zijn een veilig alternatief voor ontklawen, maar hebben voor- en nadelen. Ze voorkomen schade aan meubels, maar sommige katten vinden ze oncomfortabel. Ze moeten elke 4-6 weken vervangen worden en je kat kan minder goed klimmen of zich verdedigen. Alleen geschikt voor binnenskatten. Bespreek met je dierenarts of dit een goede optie is voor jouw kat.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Mijn kat gebruikt de krabpaal, maar krabt ook nog steeds aan meubels. Wat nu?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit is normaal tijdens de transitie. Blijf de meubels onaantrekkelijk maken met dubbelzijdige tape of folie, en beloon consequent het gebruik van de krabpaal. Mogelijk heb je meer krabpalen nodig op verschillende locaties. Katten willen vaak territorium markeren bij ingangen en in meerdere kamers. Overweeg zowel verticale als horizontale krabopties.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Plotseling is mijn kat veel meer gaan krabben - is dit normaal?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Plotselinge verandering in krabgedrag kan wijzen op stress, medische problemen of veranderingen in de omgeving. Check eerst of er recent iets veranderd is (nieuwe huisgenoot, verhuizing, veranderde routine). Controleer ook of je kat pijn heeft of zich onwel voelt. Bij twijfel, raadpleeg een dierenarts om medische oorzaken uit te sluiten. Een kattengedragstherapeut kan helpen de oorzaak te identificeren.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpAqua via-cpAqua/90 to-cpPink py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🎯 Expertadvies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professionele hulp nodig bij krabgedrag?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Een kattengedragstherapeut kan de specifieke oorzaken van het krabgedrag analyseren en een op maat gemaakt trainingsprogramma opstellen.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpAqua hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/nl/nederland">
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
            "headline": "Katten krabben aan meubels stoppen: effectieve tips",
            "description": "Leer waarom katten krabben en hoe je dit gedrag omleidt naar krabpalen. Praktische tips om je meubels te beschermen en je kat gelukkig te houden.",
            "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200",
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
              "@id": "https://cutiepawspedia.com/nl/huisdiergedrag/katten-krabben-meubels"
            }
          })
        }}
      />
    </div>
  );
}
