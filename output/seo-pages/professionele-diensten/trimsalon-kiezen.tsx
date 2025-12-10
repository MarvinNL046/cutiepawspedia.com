import { Metadata } from "next";
import Link from "next/link";
import { Scissors, CheckCircle2, AlertCircle, Star, MapPin, Euro, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Trimsalon kiezen: waar moet je op letten? | CutiePawsPedia",
  description: "Complete gids voor het kiezen van de beste trimsalon voor jouw hond of kat. Tips, checklist en prijzen voor professionele trimservice in Nederland.",
  openGraph: {
    title: "Trimsalon kiezen: waar moet je op letten?",
    description: "Ontdek waar je op moet letten bij het kiezen van een trimsalon. Inclusief checklist, prijzen en tips voor de beste verzorging.",
    type: "article",
  },
};

export default function TrimsalonKiezenPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpPink/10 via-cpYellow/5 to-transparent border-b border-border py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpPink/10 rounded-xl">
              <Scissors className="h-8 w-8 text-cpPink" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Trimsalon kiezen: waar moet je op letten?
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een goede trimsalon zorgt niet alleen voor een mooie vacht, maar ook voor het welzijn van jouw huisdier. Ontdek waar je op moet letten bij het maken van de juiste keuze.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpYellow/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground mb-4">
            Op zoek naar een betrouwbare trimsalon in jouw buurt?
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Vind trimsalons bij jou in de buurt
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Waarom een goede trimsalon belangrijk is */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpAqua" />
            Waarom een goede trimsalon belangrijk is
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Een trimsalon is meer dan alleen een plek waar je huisdier geknipt wordt. Het is een omgeving waar jouw hond of kat zich veilig en comfortabel moet voelen. Een professionele trimmer heeft kennis van verschillende rassen, vachttypen en gedrag van dieren.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Een slechte ervaring bij de trimmer kan leiden tot angst en stress, wat toekomstige bezoeken lastig maakt. Daarom is het essentieel om een trimsalon te kiezen die niet alleen vakkundig werkt, maar ook oog heeft voor het welzijn van jouw huisdier.
          </p>
        </section>

        {/* Checklist Section */}
        <section className="mb-12 bg-card rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Checklist: waar moet je op letten?
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Certificering en opleiding",
                desc: "Controleer of de trimmer een erkende opleiding heeft gevolgd en lid is van een branchevereniging zoals de NBvT (Nederlandse Bond van Trimsalons)."
              },
              {
                title: "Hygiëne en veiligheid",
                desc: "Let op de netheid van de salon, schone werkplekken en proper materiaal. Een goede trimsalon werkt met gedesinfecteerde scharen en tondeuses."
              },
              {
                title: "Rustige en veilige omgeving",
                desc: "De salon moet niet te druk of lawaaierig zijn. Honden en katten moeten zich kunnen ontspannen tijdens de behandeling."
              },
              {
                title: "Transparante prijzen",
                desc: "Een betrouwbare trimsalon communiceert duidelijk over de kosten vooraf, inclusief eventuele extra behandelingen zoals ontviltbehandeling."
              },
              {
                title: "Ervaring met jouw ras",
                desc: "Vraag of de trimmer ervaring heeft met het specifieke ras van jouw huisdier. Sommige rassen vereisen speciale trimtechnieken."
              },
              {
                title: "Positieve benadering",
                desc: "Een goede trimmer werkt met positieve bekrachtiging en geduld, vooral bij angstige of jonge dieren."
              },
              {
                title: "Reviews en aanbevelingen",
                desc: "Lees online reviews van andere klanten en vraag om aanbevelingen bij andere huisdiereigenaren in jouw omgeving."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-cpPink flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kosten Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpYellow" />
            Wat kosten trimservices?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            De kosten van een trimbeurt variëren sterk afhankelijk van de grootte van jouw huisdier, het type vacht en de locatie van de salon. Gemiddeld kun je de volgende prijzen verwachten:
          </p>
          <div className="bg-cpYellow/10 rounded-2xl p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Kleine hond (bijv. Yorkshire Terrier)</span>
                <span className="text-cpAqua font-semibold">€35 - €50</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Middelgrote hond (bijv. Cocker Spaniel)</span>
                <span className="text-cpAqua font-semibold">€50 - €75</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Grote hond (bijv. Golden Retriever)</span>
                <span className="text-cpAqua font-semibold">€75 - €120</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span className="font-medium text-foreground">Kat (langhaar)</span>
                <span className="text-cpAqua font-semibold">€40 - €65</span>
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            <strong>Let op:</strong> Extra diensten zoals ontviltbehandeling, tandenpoetsen of speciale shampoos kunnen de prijs verhogen. Vraag altijd vooraf een prijsopgave.
          </p>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Zoek de beste trimsalon in jouw stad
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vergelijk trimservices, lees reviews van andere huisdiereigenaren en vind een gecertificeerde trimsalon bij jou in de buurt.
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Bekijk trimsalons in jouw stad
          </Link>
        </section>

        {/* Tips voor eerste bezoek */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Tips voor het eerste bezoek
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Maak een kennismakingsafspraak",
                desc: "Laat jouw huisdier eerst kennismaken met de trimmer en de omgeving voordat de daadwerkelijke behandeling plaatsvindt."
              },
              {
                title: "Blijf kalm en positief",
                desc: "Jouw huisdier voelt jouw spanning aan. Blijf rustig en positief om stress te voorkomen."
              },
              {
                title: "Communiceer duidelijk",
                desc: "Vertel de trimmer over eventuele angsten, gezondheidsproblemen of bijzonderheden van jouw huisdier."
              },
              {
                title: "Vraag om foto's",
                desc: "Laat voorbeeldfoto's zien van de gewenste trimstijl, zodat de trimmer precies weet wat je verwacht."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-cpYellow" />
                  {tip.title}
                </h3>
                <p className="text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rode vlaggen */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Rode vlaggen: wanneer zoek je verder?
          </h2>
          <ul className="space-y-3">
            {[
              "De salon is onhygiënisch of rommelig",
              "Je mag niet bij je huisdier blijven tijdens de behandeling (zonder duidelijke reden)",
              "De trimmer werkt grof of ongeduldig met dieren",
              "Er wordt geen duidelijke prijsopgave gegeven",
              "Negatieve reviews over verwondingen of stress bij huisdieren",
              "De trimmer heeft geen enkele certificering of opleiding"
            ].map((flag, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-foreground">{flag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpPink/5 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Lees ook:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/professionele-diensten/dierenarts-vinden" className="text-cpAqua hover:text-cpPink hover:underline">
                → Dierenarts vinden in jouw buurt: tips en checklist
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/dierenpension-vs-oppas" className="text-cpAqua hover:text-cpPink hover:underline">
                → Dierenpension of huisdieroppas: wat past bij jou?
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/dierengedragstherapeut" className="text-cpAqua hover:text-cpPink hover:underline">
                → Dierengedragstherapeut: wanneer heb je er een nodig?
              </Link>
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Hoe vaak moet ik mijn hond laten trimmen?",
                a: "Dit hangt af van het ras en vachttype. Rassen met groeihaar zoals Poedels en Shih Tzu's hebben elke 6-8 weken een trimbeurt nodig. Honden met plakhaar zoals Terriërs worden meestal 3-4 keer per jaar getrimd."
              },
              {
                q: "Kan ik bij de trimbehandeling blijven?",
                a: "Dit verschilt per salon. Sommige trimsalons vinden het prima als je blijft kijken, anderen vragen je te wachten omdat sommige honden rustiger zijn zonder hun baasje. Bespreek dit van tevoren."
              },
              {
                q: "Wat moet ik doen als mijn hond bang is voor de trimmer?",
                a: "Bespreek de angst vooraf met de trimmer. Een goede professional werkt met positieve bekrachtiging en neemt de tijd. Soms helpt het om meerdere korte kennismakingsbezoeken te plannen voordat de echte behandeling begint."
              },
              {
                q: "Verschil tussen trimmen, scheren en knippen?",
                a: "Trimmen is het met de hand uitplukken van dood haar (voor plakhaar). Scheren gebeurt met een tondeuse en wordt gebruikt bij groeihaar. Knippen is met een schaar werken voor vormgeving."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-card rounded-xl p-6 shadow-sm group">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <CheckCircle2 className="h-5 w-5 text-cpPink group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 bg-gradient-to-r from-cpPink to-cpYellow rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Vind vandaag nog de perfecte trimsalon
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Ontdek alle huisdierservices in jouw omgeving, inclusief gecertificeerde trimsalons, dierenartsen en oppasdiensten.
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-white text-cpPink rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ontdek alle huisdierservices
          </Link>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Trimsalon kiezen: waar moet je op letten?",
            "description": "Complete gids voor het kiezen van de beste trimsalon voor jouw hond of kat. Tips, checklist en prijzen voor professionele trimservice in Nederland.",
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
            "dateModified": "2024-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/professionele-diensten/trimsalon-kiezen"
            }
          })
        }}
      />
    </main>
  );
}
