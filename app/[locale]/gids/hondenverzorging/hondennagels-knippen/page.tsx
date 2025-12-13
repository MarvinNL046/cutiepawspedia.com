import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Scissors, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Hondennagels knippen: stappenplan voor beginners 2024",
  description: "Leer hoe je veilig de nagels van je hond knipt. Stap-voor-stap uitleg, tips om het leven te vermijden en wanneer je naar de dierenarts moet.",
  keywords: "hondennagels knippen, hond nagels knippen, nagelverzorging hond, hondennagelknipper",
  openGraph: {
    title: "Hondennagels knippen: stappenplan voor beginners 2024",
    description: "Veilig de nagels van je hond knippen met ons complete stappenplan. Vind ook professionele trimsalons.",
    type: "article",
  },
};

export default function HondennagelskNippenPage() {
  return (
    <>
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hondennagels knippen: stappenplan voor beginners 2024",
            "description": "Leer hoe je veilig de nagels van je hond knipt met stap-voor-stap uitleg.",
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
          { label: "Hondennagels knippen: stappenplan voor beginners" }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Scissors className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">Hondenverzorging</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Hondennagels <span className="gradient-text-coral">knippen</span> voor beginners
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Stap-voor-stap leren hoe je veilig de nagels van je hond knipt, zonder het leven te raken. Plus tips voor angstige honden.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
            >
              <Scissors className="w-5 h-5" />
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
              Nagelverzorging is een essentieel onderdeel van de gezondheid van je hond. Te lange nagels kunnen pijnlijk zijn, de loop beïnvloeden en zelfs leiden tot gewrichtsproblemen. Maar veel hondenbezitters vinden het knippen van nagels spannend - wat als je het leven raakt?
            </p>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              In deze gids leggen we stap voor stap uit hoe je veilig hondennagels knipt, welke materialen je nodig hebt en hoe je je hond eraan went. Ook voor angstige honden!
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-6 mb-12 border-l-4 border-cpCoral">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-cpCoral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Belangrijke waarschuwing</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Ben je onzeker of heeft je hond zwarte nagels waarbij je het leven niet kunt zien? Laat de nagels dan de eerste keer knippen door een professional (dierenarts of trimmer) en vraag om uitleg. Veiligheid gaat altijd voor!
                </p>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Waarom nagelverzorging belangrijk is</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpCoral mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Voorkomt pijn en ongemak
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Te lange nagels drukken bij elke stap tegen de grond, wat pijnlijk is en kan leiden tot ontstekingen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpCoral mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Beschermt gewrichten
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Lange nagels veranderen de manier van lopen, wat op termijn kan leiden tot gewrichts- en rugklachten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpCoral mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Voorkomt ingroeien
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Vooral de wolfsklauw (duimnagel) kan omgekruld groeien en in de poot prikken als deze niet regelmatig wordt geknipt.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpCoral mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Vermindert krasschade
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Kortere nagels betekenen minder krassen op vloeren, meubels en menselijke huid tijdens enthousiaste begroetingen.
                </p>
              </div>
            </div>
          </section>

          {/* What You Need */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Wat heb je nodig?</h2>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">1. Hondennagelknipper</h3>
                <div className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-2">
                  <p><strong>Schaartype:</strong> Beste keuze voor de meeste honden. Werkt als een schaar met gebogen messen.</p>
                  <p><strong>Guillotine-type:</strong> Voor kleine honden en puppy's. De nagel gaat door een gat en een mes snijdt van onderaf.</p>
                  <p><strong>Dremel/nagelvijl:</strong> Voor ervaren gebruikers. Slijpt de nagel langzaam af (minder kans op bloeden, maar vereist gewenning).</p>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">2. Bloedstelpend poeder</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Voor het geval je het leven raakt. Alternatief: maïzena of gewone bloem (minder effectief maar beter dan niets).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">3. Zaklamp (bij donkere nagels)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Schijn van achteren door de nagel om het leven beter te kunnen zien.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">4. Snoepjes voor beloning</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maak het een positieve ervaring! Beloon je hond na elke nagel (of zelfs tijdens het vasthouden van de poot).
                </p>
              </div>
            </div>
          </section>

          {/* Understanding the Nail */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Anatomie van een hondennagel</h2>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Het "leven" - dit moet je vermijden!</h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Het leven (ook wel "quick" genoemd) is het bloedvat en de zenuw in de nagel. Als je dit raakt, bloedt het en is het pijnlijk voor je hond.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground dark:text-cpCream/70">
                  <strong>Bij witte/lichte nagels:</strong> Het leven is roze en duidelijk zichtbaar. Knip 2-3mm vóór het roze gedeelte.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/70">
                  <strong>Bij zwarte/donkere nagels:</strong> Het leven is niet zichtbaar. Schijn met een zaklamp van achteren (soms zie je een donkerder kern). Knip voorzichtig, kleine beetjes tegelijk.
                </p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-cpAmber" />
                Pro-tip: de krijtcirkel methode
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Kijk naar de onderkant van de nagel. Knip tot net voorbij het punt waar de nagel van de grond afkomt. Bij de meeste honden zie je een lichtere cirkel in het midden van het afgesneden oppervlak - stop als je deze ziet!
              </p>
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Stappenplan: nagels knippen</h2>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Kies het juiste moment</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Wacht tot je hond rustig is, bijvoorbeeld na een wandeling. Vermijd momenten waarop je hond vol energie zit.
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
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Zorg voor goede belichting</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Ga bij een raam zitten of zet een lamp aan. Bij zwarte nagels: gebruik een zaklamp van achteren.
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
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Pak de poot stevig maar vriendelijk vast</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Houd de poot stevig genoeg om te voorkomen dat je hond wegtrekt tijdens het knippen, maar knijp niet te hard. Sommige honden vinden het fijner als je de poot van onderaf ondersteunt.
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60 italic">
                      💡 Tip: Oefen eerst alleen met het vasthouden van de poot + snoepje, voordat je gaat knippen.
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
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Knip in één vloeiende beweging</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Plaats de knipper op een hoek van 45° (niet loodrecht!). Knip beslist en snel - aarzelend knijpen doet meer pijn.
                    </p>
                    <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3 text-sm">
                      <strong>Waar knip je?</strong>
                      <ul className="mt-2 space-y-1 text-muted-foreground dark:text-cpCream/70">
                        <li>• Witte nagels: 2-3mm vóór het roze</li>
                        <li>• Zwarte nagels: Begin voorzichtig, kleine beetjes, totdat je een lichte cirkel ziet</li>
                        <li>• Beter te weinig dan te veel!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Vergeet de wolfsklauw niet!</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      De wolfsklauw (duimnagel aan de binnenkant van de poot) slijt niet tijdens het lopen en groeit vaak krom. Deze moet je altijd knippen!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Beloon na elke nagel</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Geef een snoepje en complimentjes! Dit maakt de ervaring positief en helpt voor de volgende keer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
              Toch liever een professional?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
              Vind ervaren trimsalons en dierenartsen die de nagels van je hond vakkundig en stressvrij knippen.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
            >
              Bekijk dierenartsen in jouw stad →
            </Link>
          </div>

          {/* What If You Hit the Quick */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Hulp! Ik heb het leven geraakt</h2>

            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-6 border border-cpCoral/30 dark:border-cpCoral/20 mb-6">
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                <strong>Geen paniek!</strong> Dit gebeurt zelfs bij ervaren mensen. Het is pijnlijk en bloedt, maar is niet gevaarlijk.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-cpCoral font-bold">1.</span>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Blijf kalm:</strong> Je hond voelt jouw stress. Blijf rustig en geef geruststelling.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cpCoral font-bold">2.</span>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Bloedstelpend poeder:</strong> Dep de nagel in het poeder (of maïzena/bloem). Druk er 30 seconden stevig op met een tissue.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cpCoral font-bold">3.</span>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Rust:</strong> Houd je hond 10-15 minuten rustig. Geen rennen of spelen tot het bloeden is gestopt.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cpCoral font-bold">4.</span>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Geef extra snoepjes:</strong> Herstel het vertrouwen! Je wilt niet dat je hond de volgende keer angstig is.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Wanneer naar de dierenarts?</strong> Als het bloeden na 20 minuten niet stopt, of als je hond erg pijnlijk loopt na een paar uur. Anders is het geen probleem - het geneest vanzelf.
            </p>
          </section>

          {/* Tips for Anxious Dogs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Tips voor angstige honden</h2>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Gewenning in stappen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Week 1: Laat alleen de knipper zien + snoepje. Week 2: Raak de poot aan met de knipper + snoepje. Week 3: Knip één nagel + veel snoepjes. Bouw langzaam op.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Gebruik een leckermat</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Smeer pindakaas op een leckermat (anti-slobbermat) en plak deze tegen een muur of in de douche. Terwijl je hond likt, knip jij rustig de nagels.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Doe het met twee personen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Eén persoon houdt vast en geeft snoepjes, de ander knipt. Dit is vaak rustiger voor nerveuze honden.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Niet alles in één keer</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Als je hond gestrest raakt, stop dan. Knip bijvoorbeeld vandaag de voorpoten, morgen de achterpoten. Beter twee korte positieve sessies dan één stressvolle.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Overweeg een Dremel</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Sommige honden vinden het geluid van de knipper eng, maar hebben geen problemen met het zachte gezoem van een nagelvijl. Wel even aan laten wennen!
                </p>
              </div>
            </div>
          </section>

          {/* How Often */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Hoe vaak moet je nagels knippen?</h2>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                <strong>Algemene richtlijn:</strong> Elke 3-4 weken voor de meeste honden. Maar dit hangt af van:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                  <span><strong>Ondergrond:</strong> Honden die veel op asfalt lopen slijten hun nagels sneller en hebben minder vaak knippen nodig</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                  <span><strong>Activiteitsniveau:</strong> Actieve honden slijten meer dan luie honden</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                  <span><strong>Groeisnelheid:</strong> Bij jonge honden groeien nagels sneller</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                  <span><strong>Ras:</strong> Sommige rassen hebben sneller groeiende nagels</span>
                </li>
              </ul>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-4 border border-cpAmber/20">
                <p className="text-sm font-bold text-foreground dark:text-cpCream mb-2">🎯 Simpele test:</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Als je het "tik-tik-tik" geluid hoort van nagels op de vloer wanneer je hond loopt, is het tijd om te knippen!
                </p>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/nl/gids/hondenverzorging/beste-hondenborstels"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">De beste hondenborstels per vachttype</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/gids/hondenverzorging/hond-baden-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Je hond baden: tips & frequentie</h3>
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
                  Kan ik gewone nagelknippers gebruiken?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Niet aan te raden. Hondennagels zijn dikker en taaier dan mensennagels. Menselijke nagelknippers kunnen de nagel versplinteren of verbrijzelen in plaats van een nette snede maken. Investeer in een goede hondennagelknipper (€10-20).
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan het leven teruggroeien als de nagels te lang zijn?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Helaas groeit het leven mee met de nagel. Als je hond erg lange nagels heeft, moet je ze in stapjes korter maken: knip elke 2 weken een klein beetje. Het leven trekt zich langzaam terug en na 2-3 maanden kun je de ideale lengte bereiken.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond trekt zijn poot steeds terug, wat nu?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Dit is vaak angst of een slechte ervaring. Ga terug naar de basis: oefen eerst alleen het vasthouden van de poot + beloning. Bouw het langzaam op. Blijf niet doorgaan als je hond gestrest is - dat maakt het alleen maar erger. Overweeg om een professionele trimmer te vragen het te doen terwijl jij toekijkt en tips krijgt.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Zijn er honden die nooit geknipt hoeven worden?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Zeer actieve honden die veel op asfalt lopen kunnen hun nagels volledig afslijten, maar dit is zeldzaam. De wolfsklauw (duimnagel) moet altijd worden geknipt omdat deze niet de grond raakt. Check maandelijks alle nagels - ook bij actieve honden.
                </div>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Laat het over aan de professionals
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Vind ervaren trimsalons en dierenartsen die de nagels van je hond vakkundig en stressvrij verzorgen.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
              >
                <Scissors className="w-5 h-5" />
                Ontdek alle huisdierservices
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}
