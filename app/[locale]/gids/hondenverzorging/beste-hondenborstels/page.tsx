import type { Metadata } from "next";
import Link from "next/link";
import { Brush, Star, CheckCircle2, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "De beste hondenborstels per vachttype | Complete gids 2024",
  description: "Ontdek welke borstel perfect is voor het vachttype van jouw hond. Van kort haar tot krullen: alle tips en productaanbevelingen.",
  keywords: "hondenborstel, hond borstelen, beste hondenborstel, vachtverzorging hond, hondenkam",
  openGraph: {
    title: "De beste hondenborstels per vachttype | Complete gids 2024",
    description: "Kies de juiste borstel voor jouw hond. Vind ook professionele trimsalons bij jou in de buurt.",
    type: "article",
  },
};

export default function BesteHondenborstelsPage() {
  return (
    <>
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "De beste hondenborstels per vachttype | Complete gids 2024",
            "description": "Ontdek welke borstel perfect is voor het vachttype van jouw hond.",
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
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Brush className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">Hondenverzorging</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              De beste <span className="gradient-text-coral">hondenborstels</span> per vachttype
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Van korte vacht tot krullen: ontdek welke borstel perfect past bij jouw hond voor een glanzende, gezonde vacht zonder klitten.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
            >
              <Brush className="w-5 h-5" />
              Vind een trimsalon bij jou in de buurt
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-16">

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Regelmatig borstelen is essentieel voor de gezondheid van je hond. Het verwijdert dode haren, voorkomt klitten, verdeelt natuurlijke huidoliën en stimuleert de doorbloeding. Maar niet elke borstel is geschikt voor elk vachttype.
            </p>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              In deze gids bespreken we de verschillende soorten hondenborstels, welke het beste werken voor specifieke vachttypen en hoe je ze gebruikt voor optimale resultaten.
            </p>
          </div>

          {/* Quick Reference */}
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 mb-12 border border-cpAmber/30 dark:border-cpAmber/20">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-cpAmber" />
              Snelle keuzewijzer
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Korte gladde vacht:</strong> Rubber borstel of zachte borstel</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Middellange vacht:</strong> Slicker brush (kaardenb orstel)</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Lange vacht:</strong> Pin brush + metalen kam voor klitten</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Krullen/Poedelvacht:</strong> Slicker brush + metalen kam</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Dikke ondervacht:</strong> Furminator of ondervacht hark</span>
              </li>
            </ul>
          </div>

          {/* Brush Types by Coat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Borstels per vachttype</h2>

            <div className="space-y-8">
              {/* Short Coat */}
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                    <Brush className="w-6 h-6 text-cpCoral" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cpCoral mb-2">Korte gladde vacht</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voorbeelden: Boxer, Doberman, Labrador, Beagle, Dalmatiër
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Rubber borstel / Grooming Glove</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Perfect voor dagelijks gebruik. Verwijdert losse haren door statische elektriciteit en masseert de huid.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Borstel met korte, cirkelende bewegingen. Ideaal tijdens het aaien!
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Zachte borstel (Bristle Brush)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Verdeelt huidoliën voor een glanzende vacht. Geschikt voor gevoelige huid.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> 2-3x per week, volg de richting van de vacht.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Deshedding Tool (tijdens rui)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Haalt dode ondervacht weg tijdens ruiperio des. Gebruik niet te vaak (1x per week max).
                    </p>
                  </div>
                </div>
              </div>

              {/* Medium Coat */}
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center flex-shrink-0">
                    <Brush className="w-6 h-6 text-cpAmber" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cpAmber mb-2">Middellange vacht</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voorbeelden: Cocker Spaniel, Springer Spaniel, Australian Shepherd, Border Collie
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Slicker Brush (Kaardenborstel)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Dé standaardborstel voor middellange vachten. Fijne metalen pennetjes verwijderen klitten en losse haren.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> 3-4x per week, kort e zachte slagen. Niet te hard drukken!
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Metalen kam (voor vachtranden)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Ideaal voor gevoelige plekken zoals achter de oren, onder de oksels en tussen de poten.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Dagelijks op klitgevoelige plekken.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Ondervacht hark (tijdens rui)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Haalt efficiënt dode ondervacht weg bij rassen met dikke dubbele vacht.
                    </p>
                  </div>
                </div>
              </div>

              {/* Long Coat */}
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                    <Brush className="w-6 h-6 text-cpCoral" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cpCoral mb-2">Lange vacht</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voorbeelden: Yorkshire Terrier, Shih Tzu, Maltese, Afghan Hound, Langharige Collie
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Pin Brush (Pennenborstel)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Lange metalen pennen met afgeronde toppen. Doordringt dikke vacht zonder de huid te irriteren.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Dagelijks voor algemene verzorging en het verwijderen van vuil.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Metalen kam met grove én fijne tanden</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Essentieel voor het voorkomen en verwijderen van klitten. Grove kant eerst, daarna fijne kant.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Dagelijks, vooral rond oren, oksels en staartaanzet.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Detangler spray + ontklitborstel</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voor hardnekkige klitten. Spray eerst in, werk daarna voorzichtig los met vingers of speciale ontklitborstel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Curly Coat */}
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center flex-shrink-0">
                    <Brush className="w-6 h-6 text-cpAmber" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cpAmber mb-2">Krullen & Poedelvacht</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voorbeelden: Poedel, Bichon Frisé, Portugese Waterhond, Lagotto Romagnolo
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Slicker Brush (zelfr einigend)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Onmisbaar voor krullen. Voorkomt vervilting en houdt de vacht luchtig. Zelfreinigend model bespaart tijd.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Dagelijks! Borstel in lagen van de huid naar buiten.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Metalen kam</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Controleert of alle klitten eruit zijn. Als de kam erdoorheen glijdt, is de vacht goed.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> Na het borstelen als controle.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">💡 Pro-tip: Borstel vóór het baden!</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Klitten worden veel erger als ze nat worden. Borstel krullen altijd eerst volledig uit voordat je gaat wassen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wire/Rough Coat */}
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                    <Brush className="w-6 h-6 text-cpCoral" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cpCoral mb-2">Ruwhaar & Draadvacht</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Voorbeelden: Schnauzer, Fox Terrier, Border Terrier, Teckel Ruwharig
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Slicker Brush</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Voor dagelijkse verzorging en het verwijderen van losse haren.
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Gebruik:</strong> 2-3x per week.
                    </p>
                  </div>

                  <div className="bg-background/50 dark:bg-cpCharcoal/30 rounded-xl p-4">
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Stripping mes (voor showhonden)</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                      Verwijdert dode haren handmatig om de juiste textuur te behouden. Vereist techniek!
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      <strong>Tip:</strong> Laat dit bij voorkeur doen door een professionele trimmer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
              Professionele vachtverzorging nodig?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
              Vind ervaren trimsalons die perfect weten hoe ze met het vachttype van jouw hond moeten omgaan.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
            >
              Bekijk trimsalons in jouw stad →
            </Link>
          </div>

          {/* Brushing Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Borstel tips voor elk vachttype</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Begin vroeg</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Wen je puppy vanaf 8 weken aan het borstelen, zelfs als de vacht nog kort is. Dit maakt het later veel makkelijker.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Maak het positief</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Geef snoepjes en complimentjes tijdens het borstelen. Bouw het langzaam op en stop als je hond onrustig wordt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Borstel in lagen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Bij dikke vachten: werk laag voor laag van de huid naar buiten. Til de vacht op en borstel van beneden naar boven.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Let op gevoelige plekken</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Buik, oksels, achter de oren en tussen de poten zijn extra gevoelig. Gebruik daar een zachte borstel of kam.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Controleer de huid</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gebruik borstelsessies om te controleren op huidproblemen, bulten, teken of parasieten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Reinig je borstels</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Was borstels elke 2 weken met warm water en milde zeep. Dit voorkomt bacterieopbouw en verlengt de levensduur.
                </p>
              </div>
            </div>
          </section>

          {/* Frequency Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Hoe vaak borstelen?</h2>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-border dark:border-cpAmber/10">
                  <Star className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Dagelijks (7x per week)</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Lange vacht, krullen, poedelvacht. Deze vachttypen klitten snel en vereisen dagelijkse aandacht.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-border dark:border-cpAmber/10">
                  <Star className="w-5 h-5 text-cpAmber flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Vaak (3-5x per week)</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Middellange vacht, dikke dubbele vacht. Regelmatig borstelen voorkomt klitten en houdt de ondervacht gezond.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Regelmatig (2-3x per week)</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Korte gladde vacht, ruwhaar. Deze vachttypen hebben minder intensieve verzorging nodig, maar profiteren wel van regelmatig borstelen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-xl border border-cpCoral/20">
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>💡 Ruitip:</strong> Tijdens de rui (voorjaar en najaar) borstel je alle vachttypen dagelijks of om de dag om losse haren te verwijderen en te voorkomen dat je hele huis onder de haren komt.
                </p>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/nl/gids/hondenverzorging/hond-baden-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Je hond baden: tips & frequentie</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/gids/hondenverzorging/hondennagels-knippen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Hondennagels knippen: stappenplan</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/gids/hondenverzorging/tanden-poetsen-hond"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Tanden poetsen bij honden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan ik menselijke borstels gebruiken voor mijn hond?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Nee, dit wordt afgeraden. Hondenborstels zijn specifiek ontworpen voor de structuur en dikte van hondenvacht. Menselijke borstels zijn vaak te zacht en bereiken de ondervacht niet, of juist te scherp en kunnen de huid irriteren.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond haat borstelen, wat kan ik doen?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Bouw het langzaam op: begin met korte sessies van 2-3 minuten met veel beloningen. Borstel eerst alleen de plekken die je hond prettig vindt. Gebruik eventueel een leckermat met pindakaas als afleiding. Bij hardnekkige weerstanden kan een gedragstherapeut helpen.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Wanneer moet ik naar een professionele trimmer?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Bij rassen die regelmatig getrimd moeten worden (Poedel, Schnauzer, veel Terriers), bij ernstige vervilting die je zelf niet kunt verwijderen, of als je onzeker bent over de juiste techniek. Professionele trimmers hebben de kennis en gereedschap voor complexe vachten.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan ik mijn hond te veel borstelen?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Ja, te frequent of te agressief borstelen kan de huid irriteren en de vacht beschadigen. Bij gladde korte vachten is dagelijks borstelen meestal niet nodig. Let ook op "brush burn" - rode, geïrriteerde huid door te veel wrijving.
                </div>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vind de beste trimsalon voor jouw hond
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Professionele vachtverzorging door ervaren trimmers die het vachttype van jouw hond perfect kennen.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
              >
                <Brush className="w-5 h-5" />
                Ontdek alle trimsalons
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}
