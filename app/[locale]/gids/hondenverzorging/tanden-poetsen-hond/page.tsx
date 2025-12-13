import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Sparkles, AlertCircle, CheckCircle2, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Tanden poetsen bij honden: waarom en hoe | Complete gids 2024",
  description: "Ontdek waarom tandenpoetsen essentieel is voor je hond en leer hoe je het stap voor stap doet. Plus producttips en alternatieven.",
  keywords: "hond tanden poetsen, gebitsverzorging hond, tandpasta hond, hondengebit, tandverzorging hond",
  openGraph: {
    title: "Tanden poetsen bij honden: waarom en hoe | Complete gids 2024",
    description: "Leer hoe je de tanden van je hond goed verzorgt. Vind ook dierenartsen voor professionele tandreinigingen.",
    type: "article",
  },
};

export default function TandenPoetsenHondPage() {
  return (
    <>
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Tanden poetsen bij honden: waarom en hoe | Complete gids 2024",
            "description": "Ontdek waarom tandenpoetsen essentieel is voor je hond en leer hoe je het doet.",
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

      <GidsBreadcrumbs
        items={[
          { label: "Hondenverzorging", href: "/nl/gids/hondenverzorging" },
          { label: "Tanden poetsen bij honden" }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Sparkles className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">Hondenverzorging</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Tanden poetsen bij honden: <span className="gradient-text-coral">waarom en hoe</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Gebitsverzorging is cruciaal voor de gezondheid van je hond. Leer waarom tandenpoetsen belangrijk is en hoe je het stap voor stap doet.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Vind een dierenarts bij jou in de buurt
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
              Wist je dat 80% van de honden boven de 3 jaar last heeft van tandvleesontsteking? Gebitsproblemen zijn een van de meest voorkomende gezondheidsproblemen bij honden, maar ook een van de meest vermijdbare. Regelmatig tandenpoetsen kan het verschil maken tussen een gezonde mond en pijnlijke tandextracties op latere leeftijd.
            </p>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              In deze gids leggen we uit waarom tandenpoetsen zo belangrijk is, wat er kan gebeuren als je het niet doet, en hoe je het stap voor stap aanpakt - zelfs bij onwillige honden.
            </p>
          </div>

          {/* Why It Matters - Alarming Stats */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-6 mb-12 border-l-4 border-cpCoral">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-cpCoral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Waarom is tandenpoetsen zo belangrijk?</h3>
                <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <p>• <strong>80% van honden boven 3 jaar</strong> heeft tandvleesaandoeningen</p>
                  <p>• <strong>Tandziekten kunnen orgaanschade veroorzaken</strong> aan hart, nieren en lever</p>
                  <p>• <strong>Pijn en discomfort:</strong> je hond kan maanden pijn hebben zonder dat je het merkt</p>
                  <p>• <strong>Professionele tandreinigingen kosten €300-800</strong> en vereisen narcose</p>
                  <p>• <strong>Dagelijks poetsen kan dit grotendeels voorkomen</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Without Brushing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Wat gebeurt er als je niet poetst?</h2>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">1️⃣</div>
                  <div>
                    <h3 className="text-xl font-bold text-cpCoral mb-2">Plaque vorming (binnen 24 uur)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Voedselresten en bacteriën vormen een kleverige laag op de tanden. Dit is nog makkelijk te verwijderen door poetsen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">2️⃣</div>
                  <div>
                    <h3 className="text-xl font-bold text-cpAmber mb-2">Tandsteen (na 3-5 dagen)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Plaque verhardt tot tandsteen door mineralen in het speeksel. Dit is geelbruin, hard en alleen professioneel te verwijderen. Tandsteen is ruw en trekt meer bacteriën aan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">3️⃣</div>
                  <div>
                    <h3 className="text-xl font-bold text-cpCoral mb-2">Tandvleesontsteking (gingivitis)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Bacteriën onder het tandvlees veroorzaken ontsteking. Symptomen:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/60">
                      <li>• Rood, gezwollen tandvlees</li>
                      <li>• Bloeden bij eten of kauwen</li>
                      <li>• Slechte adem</li>
                      <li>• Pijn bij eten</li>
                    </ul>
                    <p className="text-sm text-cpCoral mt-2">
                      <strong>Omkeerbaar</strong> met goede tandhygiëne en professionele reiniging.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">4️⃣</div>
                  <div>
                    <h3 className="text-xl font-bold text-cpAmber mb-2">Parodontitis (ernstig)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Ontsteking verspreidt zich naar bot en bindweefsel. Gevolgen:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/60">
                      <li>• Tandvleesterugtrekking (bleke tandhalzen zichtbaar)</li>
                      <li>• Losse tanden die uitvallen</li>
                      <li>• Abcessen en infecties</li>
                      <li>• Botafbraak in de kaak</li>
                      <li>• Bacteriën in de bloedbaan → hart-, lever- en nierproblemen</li>
                    </ul>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-bold">
                      ⚠️ ONOMKEERBAAR - alleen symptomen kunnen worden behandeld
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How Often */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Hoe vaak moet je poetsen?</h2>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-border dark:border-cpAmber/10">
                  <Sparkles className="w-6 h-6 text-cpAmber flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Ideaal: Dagelijks</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Plaque verhardt binnen 24-48 uur tot tandsteen. Dagelijks poetsen voorkomt tandsteen volledig en is de beste bescherming.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-border dark:border-cpAmber/10">
                  <Sparkles className="w-6 h-6 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Minimaal: 3-4x per week</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Dit vertraagt tandsteenvorming aanzienlijk, maar voorkomt het niet volledig. Honden met aanleg voor tandproblemen hebben echt dagelijks nodig.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Minder dan 3x per week: onvoldoende</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Af en toe poetsen helpt wel een beetje, maar is niet genoeg om tandziekten echt te voorkomen. Je hond zal waarschijnlijk nog steeds regelmatig professionele reinigingen nodig hebben.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
              Professionele tandreinigingen nodig?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
              Vind dierenartsen die professionele tandreinigingen uitvoeren voor een gezond hondengebit.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
            >
              Bekijk dierenartsen in jouw stad →
            </Link>
          </div>

          {/* What You Need */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Wat heb je nodig?</h2>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Speciale hondentandpasta</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong className="text-cpCoral">NOOIT menselijke tandpasta gebruiken!</strong> Deze bevat xylit (giftig), fluoride (schadelijk) en schuimmiddelen die je hond niet mag inslikken.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                  <strong>Hondentandpasta:</strong> Veilig om in te slikken, smaken die honden lekker vinden (kip, rund, pindakaas), enzymen die plaque afbreken.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Tandenborstel voor honden</h3>
                <div className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-2">
                  <p><strong>Klassieke tandenborstel:</strong> Langere hals, zachte haren, kleinere kop</p>
                  <p><strong>Vingertandenborstel:</strong> Gaat over je vinger, meer controle, ideaal voor beginners</p>
                  <p><strong>Dubbele tandenborstel:</strong> Twee koppen (klein + groot) voor verschillende hoektanden</p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">💡 Start met een vingertandenborstel voor makkelijker wennen</p>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Snoepjes voor beloning</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maak het een feestje! Extra snoepjes na het poetsen zorgen voor een positieve associatie.
                </p>
              </div>
            </div>
          </section>

          {/* Step by Step Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Stap-voor-stap: tanden poetsen</h2>

            <div className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-xl p-5 mb-6 border border-cpCoral/20">
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                <strong>💡 Belangrijk:</strong> Als je hond nog nooit getand heeft gepoetst, bouw dan langzaam op! Doe niet alles in één keer. Gewenning kan 2-4 weken duren.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Gewenning aan smaak (Week 1)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Laat je hond eerst aan de tandpasta proeven. Smeer een beetje op je vinger en laat hem likken. Geef complimentjes!
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60 italic">
                      Doel: Tandpasta = lekker en positief
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Gewenning aan aanraking (Week 1-2)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Til de lip op en wrijf zacht met je vinger (met tandpasta) over de tanden en het tandvlees. Begin met de voortanden, werk naar achteren.
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                      Sessies van 30 seconden zijn genoeg. Eindig altijd met snoepje!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Introductie tandenborstel (Week 2-3)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Laat je hond eerst aan de borstel snuffelen. Doe tandpasta erop en laat hem likken. Borstel daarna voorzichtig alleen de voortanden. Cirkelende bewegingen, zacht!
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60 italic">
                      Gefocust op buitenkant tanden - de tong reinigt binnenkant zelf
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Uitbreiden naar alle tanden (Week 3-4)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Borstel nu alle tanden. Focus vooral op:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/60 mb-2">
                      <li>• <strong>Hoektanden (slagtanden):</strong> Hier hoopt plaque snel op</li>
                      <li>• <strong>Kiezen achterin:</strong> Deze worden vaak over het hoofd gezien</li>
                      <li>• <strong>Tandvleesrand:</strong> Borstel in een hoek van 45° tegen het tandvlees</li>
                    </ul>
                    <p className="text-sm text-cpCoral">
                      <strong>Duur:</strong> 30-60 seconden per keer is genoeg!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Volledige routine (vanaf Week 4)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Ideaal: dagelijks poetsen voor 1-2 minuten. Buitenkant van tanden (binnenkant wordt door de tong schoon gehouden). Eindig altijd met veel complimentjes en een snoepje!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Tips voor succes</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Maak het een ritueel</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Poetsen op hetzelfde moment elke dag (bijv. voor het avondeten). Dit creëert een gewoonte.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Blijf positief</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gebruik een vrolijke stem, geef complimentjes en maak het speels. Stress werkt averechts.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Kort en krachtig</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  1 minuut goed poetsen is beter dan 5 minuten worstelen. Stop als je hond onrustig wordt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Begin jong</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Puppy's wennen makkelijker. Start vanaf 8 weken (zelfs als melktanden uitvallen, went je hond aan de routine).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Controleer het tandvlees</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gezond tandvlees is roze. Rood, gezwollen of bloedend? Ga naar de dierenarts.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Vervang borstel regelmatig</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Elke 3 maanden een nieuwe tandenborstel, of eerder als de haren uitstaan.
                </p>
              </div>
            </div>
          </section>

          {/* Alternatives */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Alternatieven en aanvullingen</h2>

            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Tandenpoetsen is de gouden standaard, maar deze producten kunnen helpen als aanvulling (niet als vervanging!):
            </p>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Dentale kauwsnacks</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Speciale kauwsticks met VOHC-keurmerk (Veterinary Oral Health Council) helpen plaque verwijderen door mechanische werking. Werkt 20-30% zo effectief als poetsen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cpAmber flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Tandenreinigend speelgoed</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Rubberbal len met ribbels of speciale knoopjes kunnen wat plaque verwijderen tijdens spelen. Beperkt effect, maar beter dan niets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Mondspoeling voor honden</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Toe te voegen aan drinkwater. Enzymen helpen plaque afbreken. Gemak: geen actie nodig. Nadeel: minder effectief dan poetsen, niet alle honden drinken het.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-cpCoral mb-1">⚠️ Geen vervanging voor poetsen</h3>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      Deze producten zijn aanvullingen, geen vervangers! Alleen dagelijks poetsen verwijdert plaque echt effectief.
                    </p>
                  </div>
                </div>
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
                href="/nl/gids/hondenverzorging/beste-hondenborstels"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">De beste hondenborstels per vachttype</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/gids/hondenverzorging/hondennagels-knippen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Hondennagels knippen: stappenplan</h3>
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
                  Kan ik gewone tandpasta gebruiken?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  NEE! Menselijke tandpasta bevat xylit (giftig voor honden), fluoride (schadelijk) en schuimmiddelen. Honden kunnen niet spoelen en slikken alles in. Gebruik alleen speciale hondentandpasta.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond is 5 jaar en heeft nog nooit getand gepoetst. Is het te laat?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Het is nooit te laat! Laat wel eerst het gebit controleren bij de dierenarts. Als er al tandsteen is, moet deze professioneel worden verwijderd voordat je gaat poetsen. Daarna kun je starten met de gewenningsfase - het duurt misschien iets langer bij oudere honden, maar het kan zeker!
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond hapt naar me als ik zijn tanden wil poetsen
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Dit is angst of een slechte ervaring. Ga terug naar de basis: gewenning in kleine stapjes. Start met alleen de lip optillen + snoepje. Doe dit 1 week, dan pas verder. Dwing nooit - dit maakt het alleen maar erger. Overweeg hulp van een hondentrainer of gedragstherapeut.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Zijn dentale kauwsnacks genoeg?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Nee, kauwsnacks zijn een aanvulling maar geen vervanging. Studies tonen aan dat ze ongeveer 20-30% effectief zijn vergeleken met tandenpoetsen. Voor optimale mondgezondheid is dagelijks poetsen + kauwsnacks het beste.
                </div>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professionele tandverzorging voor je hond
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Vind dierenartsen die professionele tandreinigingen uitvoeren en je kunnen helpen met gebitsproblemen.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Ontdek alle dierenartsen
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}
