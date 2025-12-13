import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Star, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Puppytraining: eerste commando's leren in 7 dagen",
  description: "Leer je puppy de belangrijkste commando's in 1 week met onze praktische gids. Stap-voor-stap uitleg voor zit, blijf, hier en meer. Vind hondentrainers bij jou in de buurt.",
  keywords: "puppytraining, puppy commando's leren, hondentraining, puppy opvoeden, basiscursus puppy",
  alternates: {
    canonical: "https://cutiepawspedia.com/nl/gids/huisdiertraining/puppytraining-basis",
  },
  openGraph: {
    title: "Puppytraining: eerste commando's leren in 7 dagen",
    description: "Leer je puppy de belangrijkste commando's in 1 week met onze praktische gids. Vind hondentrainers bij jou in de buurt.",
    url: "https://cutiepawspedia.com/nl/gids/huisdiertraining/puppytraining-basis",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function PuppytrainingBasisPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cpPink/10 via-background to-cpYellow/10 py-16 md:py-24">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-cpPink/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-cpYellow/20 rounded-full hidden lg:block" />

        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpPink/10 border border-cpPink/30 mb-6">
              <span className="text-lg">🐶</span>
              <span className="text-sm font-medium text-foreground">Puppytraining Expert Gids</span>
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Puppytraining: Leer je pup de <span className="text-cpPink">eerste commando's in 7 dagen</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ontdek bewezen methoden om je puppy snel en effectief de basiscommando's te leren.
              Met onze stap-voor-stap aanpak zie je binnen een week resultaat.
            </p>

            {/* Primary CTA */}
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpPink text-white rounded-xl px-8 py-4 text-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              Vind een hondentrainer bij jou in de buurt →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            De eerste weken met je nieuwe puppy zijn cruciaal voor zijn ontwikkeling. Een goede basis in
            training zorgt voor een gehoorzame, gelukkige hond die precies weet wat er van hem verwacht wordt.
            In deze complete gids leer je stap-voor-stap hoe je je puppy de vijf belangrijkste commando's leert
            in slechts één week.
          </p>
        </div>

        {/* Why Start Early */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-cpPink" />
            Waarom vroeg beginnen zo belangrijk is
          </h2>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-8">
            <p className="text-muted-foreground mb-6">
              Puppy's hebben een kritieke socialisatieperiode tussen 3 en 14 weken oud. In deze fase leren
              ze het snelst en vormen ze hun gedragspatronen voor het leven. Door vroeg te beginnen met training:
            </p>

            <ul className="space-y-4">
              {[
                "Voorkom je ongewenst gedrag voordat het een gewoonte wordt",
                "Bouw je een sterke band op met je puppy gebaseerd op vertrouwen",
                "Maak je gebruik van hun natuurlijke leergierigheid en energie",
                "Leg je de basis voor meer geavanceerde training later",
                "Zorg je voor een zelfverzekerde, sociaal aangepaste hond"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cpPink flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7-Day Training Plan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Het 7-dagen trainingsplan</h2>

          {/* Day 1-2: Zit */}
          <div className="bg-gradient-to-br from-cpPink/5 to-cpYellow/5 rounded-2xl p-8 mb-6 border border-cpPink/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="bg-cpPink text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1-2</span>
              Commando "Zit" - De basis van alles
            </h3>

            <p className="text-muted-foreground mb-4">
              "Zit" is het meest fundamentele commando en dient als basis voor alle andere training.
              Het leert je puppy impulsencontrole en aandacht geven.
            </p>

            <div className="bg-white rounded-xl p-6 mb-4">
              <h4 className="font-bold text-foreground mb-3">Stap-voor-stap methode:</h4>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li>Houd een beloning voor de neus van je puppy</li>
                <li>Beweeg je hand langzaam naar achteren over zijn kop</li>
                <li>Natuurlijk gaat zijn billetje naar beneden - zeg dan "Zit"</li>
                <li>Geef direct de beloning en veel lof</li>
                <li>Herhaal 5-10 keer per sessie, 3-4 sessies per dag</li>
              </ol>
            </div>

            <div className="bg-cpYellow/20 rounded-xl p-4 border-l-4 border-cpYellow">
              <p className="text-sm font-semibold text-foreground mb-2">💡 Pro tip:</p>
              <p className="text-sm text-muted-foreground">
                Doe dit voor elke maaltijd - zo koppel je het commando aan iets positiefs en oefen je
                automatisch meerdere keren per dag.
              </p>
            </div>
          </div>

          {/* Day 3-4: Hier */}
          <div className="bg-gradient-to-br from-cpAqua/5 to-cpPink/5 rounded-2xl p-8 mb-6 border border-cpAqua/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="bg-cpAqua text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3-4</span>
              Commando "Hier" - Levensreddend belangrijk
            </h3>

            <p className="text-muted-foreground mb-4">
              Een betrouwbaar "Hier"-commando kan letterlijk levens redden en geeft je puppy vrijheid
              om veilig te kunnen spelen en ontdekken.
            </p>

            <div className="bg-white rounded-xl p-6 mb-4">
              <h4 className="font-bold text-foreground mb-3">Zo leer je "Hier":</h4>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li>Begin in een afgesloten ruimte zonder afleidingen</li>
                <li>Zeg enthousiast "Hier!" en ren een paar stappen achteruit</li>
                <li>Als puppy naar je toe komt: jackpot beloning + feest!</li>
                <li>Oefen op verschillende momenten wanneer je weet dat hij komt</li>
                <li>Bouw langzaam afstand en afleidingen op</li>
              </ol>
            </div>

            <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
              <p className="text-sm font-semibold text-foreground mb-2">⚠️ Belangrijk:</p>
              <p className="text-sm text-muted-foreground">
                Gebruik "Hier" NOOIT voor iets vervelends (nagels knippen, naar binnen roepen van spelen).
                Het moet altijd een positieve associatie behouden.
              </p>
            </div>
          </div>

          {/* Day 5: Blijf */}
          <div className="bg-gradient-to-br from-cpYellow/5 to-cpAqua/5 rounded-2xl p-8 mb-6 border border-cpYellow/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="bg-cpYellow text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
              Commando "Blijf" - Impulsencontrole ontwikkelen
            </h3>

            <p className="text-muted-foreground mb-4">
              "Blijf" leert je puppy geduld en zelfbeheersing - essentiële vaardigheden voor een
              goed aangepaste hond.
            </p>

            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-foreground mb-3">Opbouw van "Blijf":</h4>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li>Laat je puppy zitten of liggen</li>
                <li>Zeg "Blijf" met handgebaar (vlakke hand voor zijn neus)</li>
                <li>Wacht 2 seconden, keer terug en beloon</li>
                <li>Bouw langzaam op: eerst tijd, dan afstand</li>
                <li>Als hij beweegt: geen beloning, gewoon opnieuw proberen</li>
              </ol>
            </div>
          </div>

          {/* Day 6-7: Af en Liggen */}
          <div className="bg-gradient-to-br from-cpPink/5 to-cpAqua/5 rounded-2xl p-8 mb-6 border border-cpPink/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="bg-cpPink text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">6-7</span>
              Commando's "Af" en "Liggen" - Rust en grenzen
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">"Af" leren:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Beloning in gesloten hand houden</li>
                  <li>• Puppy zal snuffelen/likken</li>
                  <li>• Zodra hij stopt: "Af!" en hand openen</li>
                  <li>• Gebruik voor springen, tafels, bank</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3">"Liggen" leren:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Start vanuit "Zit" positie</li>
                  <li>• Beloning naar grond bewegen</li>
                  <li>• Wacht tot hij gaat liggen</li>
                  <li>• Zeg "Liggen" en beloon direct</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-3xl p-8 md:p-12 text-center mb-16 border border-cpAqua/30">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Hulp nodig bij het trainen van je puppy?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Een professionele hondentrainer kan je helpen met een persoonlijk trainingsplan
            en directe feedback op je techniek.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-block bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Bekijk hondenscholen in jouw stad →
          </Link>
        </div>

        {/* Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">5 veelgemaakte fouten bij puppytraining</h2>

          <div className="space-y-4">
            {[
              {
                title: "Te lange trainingssessies",
                description: "Puppy's hebben een korte aandachtsspanne. Houd sessies tussen 5-10 minuten en eindig altijd op een positieve noot."
              },
              {
                title: "Inconsistentie in commando's",
                description: "Gebruik altijd exact hetzelfde woord en dezelfde toon. 'Kom hier', 'Hier', en 'Kom' zijn voor een puppy drie verschillende commando's."
              },
              {
                title: "Te veel verwachten, te snel",
                description: "Bouw moeilijkheid geleidelijk op. Als je puppy 'Zit' binnen kan, betekent dat niet dat hij het ook op het drukke strand kan."
              },
              {
                title: "Belonen na te lange tijd",
                description: "Honden leren door directe associaties. Beloon binnen 2 seconden na het gewenste gedrag, anders begrijpt hij niet waarvoor."
              },
              {
                title: "Trainen zonder concentratie",
                description: "Train niet wanneer je puppy uitgeput is, te veel energie heeft, of net gegeten heeft. Timing is alles."
              }
            ].map((mistake, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-cpPink/40 transition-all">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-3">
                  <span className="text-cpPink">❌</span>
                  {mistake.title}
                </h3>
                <p className="text-muted-foreground">{mistake.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Extra tips voor succesvol trainen</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cpPink/5 to-white rounded-2xl p-6 border border-cpPink/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-cpPink" />
                Beloningssysteem
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Gebruik verschillende soorten beloningen: eten, speelgoed, lof, en aandacht.
                Wissel ze af zodat je puppy gemotiveerd blijft.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kleine brokjes (geen grote koekjes)</li>
                <li>• Varieer in smaken en texturen</li>
                <li>• Reserveer toppers voor moeilijke oefeningen</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpYellow/5 to-white rounded-2xl p-6 border border-cpYellow/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-cpYellow" />
                Timing is alles
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                De beste trainingsmomenten zijn wanneer je puppy alert maar niet hyperactief is.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 's Ochtends na toiletpauze</li>
                <li>• Voor de maaltijd (als motivatie)</li>
                <li>• Na een korte speelsessie</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpAqua/5 to-white rounded-2xl p-6 border border-cpAqua/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-cpAqua" />
                Omgeving variëren
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Train op verschillende locaties zodat je puppy leert te generaliseren.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Begin thuis zonder afleidingen</li>
                <li>• Daarna tuin of rustige plek buiten</li>
                <li>• Geleidelijk naar drukkere omgevingen</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cpPink/5 to-white rounded-2xl p-6 border border-cpPink/20">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-cpPink" />
                Hele gezin betrekken
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Zorg dat iedereen dezelfde commando's en methoden gebruikt.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maak een commando-lijst voor het gezin</li>
                <li>• Oefen samen de juiste timing</li>
                <li>• Consistentie = snellere resultaten</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Gerelateerde trainingsonderwerpen</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/nl/gids/huisdiertraining/zindelijkheidstraining-puppy"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpPink/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpPink transition-colors mb-2">
                Zindelijkheidstraining →
              </h3>
              <p className="text-sm text-muted-foreground">
                Leer je puppy snel zindelijk met bewezen methoden
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/clicker-training"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpAqua/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpAqua transition-colors mb-2">
                Clicker training →
              </h3>
              <p className="text-sm text-muted-foreground">
                Precisie training met clickermethode voor beginners
              </p>
            </Link>

            <Link href="/nl/gids/huisdiertraining/hondengedragsproblemen"
                  className="bg-card rounded-xl p-5 border border-border hover:border-cpYellow/40 hover:shadow-md transition-all group">
              <h3 className="font-bold text-foreground group-hover:text-cpYellow transition-colors mb-2">
                Gedragsproblemen →
              </h3>
              <p className="text-sm text-muted-foreground">
                Oplossingen voor veelvoorkomende gedragsproblemen
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Veelgestelde vragen over puppytraining</h2>

          <div className="space-y-4">
            {[
              {
                q: "Vanaf welke leeftijd kan ik beginnen met het trainen van mijn puppy?",
                a: "Je kunt direct beginnen zodra je puppy thuiskomt, meestal vanaf 8 weken oud. Jonge puppy's leren snel en hebben korte, positieve trainingssessies van 5-10 minuten nodig. Focus op basale commando's en socialisatie."
              },
              {
                q: "Hoeveel tijd moet ik dagelijks besteden aan puppytraining?",
                a: "Kwaliteit gaat boven kwantiteit. 3-4 korte sessies van 5-10 minuten per dag is ideaal. Puppy's hebben een beperkte aandachtsspanne, dus meerdere korte sessies werken beter dan één lange sessie."
              },
              {
                q: "Moet ik altijd beloningen gebruiken of kan ik daar mee stoppen?",
                a: "Begin altijd met beloningen voor elk goed gedrag. Na verloop van tijd kun je overstappen op een variabel beloningsschema (niet elke keer belonen), maar blijf altijd verbale lof geven. Dit houdt het gedrag in stand."
              },
              {
                q: "Wat als mijn puppy niet geïnteresseerd lijkt in training?",
                a: "Controleer je timing (niet na eten of wanneer moe), verhoog de waarde van je beloningen (kip of kaas in plaats van brokjes), en maak sessies korter en speelser. Sommige puppy's reageren beter op speelgoed dan op eten."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-foreground hover:text-cpPink transition-colors">
                  {faq.q}
                  <span className="text-cpPink group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpPink via-cpPink/90 to-cpYellow rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Zoek je professionele hulp bij puppytraining?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Ontdek gecertificeerde hondentrainers en puppycursussen bij jou in de buurt.
            Vergelijk reviews, prijzen en specialisaties.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-block bg-white text-cpPink rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all"
          >
            Ontdek alle huisdierservices →
          </Link>
        </div>
      </article>

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Puppytraining: eerste commando's leren in 7 dagen",
            "description": "Complete gids voor het trainen van je puppy met de 5 belangrijkste basiscommando's in één week. Inclusief stap-voor-stap instructies.",
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
            "datePublished": "2024-12-07",
            "dateModified": "2024-12-07",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/gids/huisdiertraining/puppytraining-basis"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Huisdiertraining", href: "/nl/gids/huisdiertraining" },
          { label: "Puppytraining basis" }
        ]}
      />
    </div>
  );
}
