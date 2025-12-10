import { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, CheckCircle2, Clock, Phone, MapPin, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Dierenarts vinden in jouw buurt: tips en checklist | CutiePawsPedia",
  description: "Vind de beste dierenarts voor jouw huisdier. Complete gids met checklist, spoedopvang info en tips voor het kiezen van een betrouwbare dierenkliniek.",
  openGraph: {
    title: "Dierenarts vinden in jouw buurt: tips en checklist",
    description: "Ontdek hoe je de juiste dierenarts vindt voor jouw huisdier. Met checklist, spoedopvang tips en belangrijke criteria.",
    type: "article",
  },
};

export default function DierenartVindenPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 via-cpPink/5 to-transparent border-b border-border py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpAqua/10 rounded-xl">
              <Stethoscope className="h-8 w-8 text-cpAqua" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Dierenarts vinden in jouw buurt
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een goede dierenarts is essentieel voor de gezondheid van jouw huisdier. Ontdek waar je op moet letten bij het vinden van een betrouwbare dierenkliniek in jouw omgeving.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground mb-4">
            Zoek je een dierenarts of dierenkliniek in de buurt?
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Vind huisdierservices bij jou in de buurt
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Waarom de juiste dierenarts belangrijk is */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="h-8 w-8 text-cpPink" />
            Waarom de juiste dierenarts belangrijk is
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            De relatie met je dierenarts is een van de belangrijkste voor het welzijn van jouw huisdier. Een goede dierenarts biedt niet alleen medische zorg, maar ook preventief advies, vaccinaties en ondersteuning bij gezondheidsproblemen.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Of het nu gaat om routinecontroles, spoedzorg of complexe behandelingen, je wilt een professional die je vertrouwt en die jouw huisdier met zorg en respect behandelt.
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
                title: "Afstand en bereikbaarheid",
                desc: "Kies een praktijk die binnen 15-20 minuten rijden is, vooral belangrijk bij spoedgevallen. Check ook of er parkeergelegenheid is."
              },
              {
                title: "Openingstijden en spoedzorg",
                desc: "Controleer de openingstijden en vraag of de praktijk spoedzorg biedt. Sommige klinieken hebben 24/7 spoedservice, anderen verwijzen naar een centrale spoeddienst."
              },
              {
                title: "Specialisaties en faciliteiten",
                desc: "Heeft jouw huisdier speciale zorg nodig (bijv. exotische dieren, tandheelkunde, chirurgie)? Vraag naar de specialisaties en beschikbare apparatuur."
              },
              {
                title: "Communicatie en betrokkenheid",
                desc: "Let op hoe de dierenarts communiceert. Neemt hij/zij de tijd om dingen uit te leggen? Voelt de dierenarts betrokken bij jouw huisdier?"
              },
              {
                title: "Transparante kosten",
                desc: "Een goede praktijk informeert vooraf over de kosten van behandelingen en controleert of je een dierenverzekering hebt."
              },
              {
                title: "Hygiëne en faciliteiten",
                desc: "De wacht- en behandelkamers moeten schoon zijn. Modern medisch materiaal en een goed georganiseerde praktijk zijn positieve signalen."
              },
              {
                title: "Reviews en reputatie",
                desc: "Lees online reviews en vraag andere huisdiereigenaren om aanbevelingen. Let op consistent positieve ervaringen."
              },
              {
                title: "Gevoel en vertrouwen",
                desc: "Vertrouw op je intuïtie. Voelt de praktijk warm en professioneel aan? Voelt jouw huisdier zich er op zijn gemak?"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-cpAqua flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Soorten dierenartsenpraktijken */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Soorten dierenartsenpraktijken
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Huisdierenartsenpraktijk",
                desc: "Voor routinecontroles, vaccinaties en algemene zorg. Vaak kleinschaliger met een persoonlijke benadering.",
                icon: <Heart className="h-6 w-6 text-cpPink" />
              },
              {
                title: "Dierenkliniek",
                desc: "Grotere praktijk met meer specialisten en moderne apparatuur. Geschikt voor complexere behandelingen en chirurgie.",
                icon: <Shield className="h-6 w-6 text-cpAqua" />
              },
              {
                title: "Dierenartsenpraktijk met spoeddienst",
                desc: "24/7 beschikbaar voor spoedeisende hulp. Vaak in grote steden en soms gespecialiseerd in acute zorg.",
                icon: <Clock className="h-6 w-6 text-cpYellow" />
              }
            ].map((type, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                <div className="mb-4">{type.icon}</div>
                <h3 className="font-semibold text-foreground mb-3">{type.title}</h3>
                <p className="text-muted-foreground text-sm">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpPink/10 to-cpAqua/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Vind een dierenarts in jouw stad
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vergelijk dierenartsenpraktijken, lees reviews en vind een betrouwbare dierenarts bij jou in de buurt.
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Bekijk dierenartsen in jouw omgeving
          </Link>
        </section>

        {/* Spoedzorg informatie */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="h-8 w-8 text-red-600" />
            Spoedzorg: wat moet je weten?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Niet elke dierenarts biedt 24/7 spoedzorg. Vraag bij je eerste bezoek altijd naar het spoedprotocol. De meeste praktijken werken met een van de volgende opties:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Eigen spoeddienst buiten kantooruren (vaak in grotere klinieken)",
              "Verwijzing naar een centrale dierenartsenpost in de regio",
              "Telefonisch advies met mogelijkheid tot spoedconsult",
              "Samenwerking met gespecialiseerde 24/7 spoedklinieken"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white dark:bg-cpSurface rounded-xl p-4 border-l-4 border-red-600">
            <p className="text-sm text-foreground">
              <strong>Belangrijk:</strong> Noteer het spoednummer van je dierenarts en bewaar dit op een zichtbare plek (bijv. op de koelkast). In noodgevallen telt elke seconde.
            </p>
          </div>
        </section>

        {/* Vragen om te stellen */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Vragen om te stellen bij het eerste bezoek
          </h2>
          <div className="bg-cpYellow/10 rounded-2xl p-8">
            <ul className="space-y-4">
              {[
                "Wat zijn de openingstijden en consulttijden?",
                "Hoe werkt het spoedprotocol buiten kantooruren?",
                "Welke dierenverzekeringen accepteren jullie?",
                "Zijn er gespecialiseerde dierenartsen in de praktijk?",
                "Hoe lang duurt het gemiddeld voor een afspraak?",
                "Kunnen jullie ook aan huis komen voor behandelingen?",
                "Wat zijn de kosten van een standaard consult en vaccinatie?",
                "Hoe gaan jullie om met pijnbestrijding en anesthesie?"
              ].map((question, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-cpYellow flex-shrink-0 mt-1" />
                  <span className="text-foreground">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kosten van dierenartszorg */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Kosten van dierenartszorg
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Dierenartszorg kan variëren in prijs afhankelijk van de behandeling en de praktijk. Hieronder een indicatie van gemiddelde kosten:
          </p>
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <ul className="space-y-3">
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Algemeen consult</span>
                <span className="text-cpAqua font-semibold">€30 - €50</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Vaccinatie (incl. consult)</span>
                <span className="text-cpAqua font-semibold">€50 - €80</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Spoedconsult (buiten kantooruren)</span>
                <span className="text-cpAqua font-semibold">€75 - €150</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Sterilisatie/castratie</span>
                <span className="text-cpAqua font-semibold">€150 - €400</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span className="font-medium text-foreground">Tandreinigen onder narcose</span>
                <span className="text-cpAqua font-semibold">€200 - €500</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Tip:</strong> Overweeg een dierenverzekering om onverwachte kosten af te dekken. Veel verzekeraars dekken standaard consulten, behandelingen en operaties.
          </p>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpAqua/5 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Lees ook:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/professionele-diensten/trimsalon-kiezen" className="text-cpPink hover:text-cpAqua hover:underline">
                → Trimsalon kiezen: waar moet je op letten?
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/hondenuitlaatservice" className="text-cpPink hover:text-cpAqua hover:underline">
                → Hondenuitlaatservice: kosten, voordelen en tips
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/dierengedragstherapeut" className="text-cpPink hover:text-cpAqua hover:underline">
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
                q: "Hoe vaak moet ik met mijn huisdier naar de dierenarts?",
                a: "Voor gezonde volwassen huisdieren is één jaarlijkse controle voldoende, inclusief vaccinaties. Puppy's, kittens en oudere dieren hebben vaker controle nodig (elke 3-6 maanden). Volg altijd het advies van je dierenarts."
              },
              {
                q: "Moet ik me inschrijven bij een dierenarts?",
                a: "In Nederland hoef je je niet formeel in te schrijven, maar het is verstandig om een vaste dierenarts te kiezen. Zo kent de dierenarts de medische geschiedenis van jouw huisdier en kun je sneller terecht voor afspraken."
              },
              {
                q: "Wat moet ik doen bij een dierennoodgeval 's nachts?",
                a: "Bel eerst je eigen dierenarts; veel praktijken hebben een voicemail met doorverwijzing naar de spoeddienst. Als dat niet werkt, zoek online naar 'dierenartsenpost' of '24-uurs dierenkliniek' in jouw regio."
              },
              {
                q: "Kan ik zonder afspraak naar de dierenarts?",
                a: "De meeste praktijken werken op afspraak. Bij spoedgevallen kun je vaak nog dezelfde dag terecht. Bel altijd eerst om de urgentie te bespreken en een tijdstip af te spreken."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-card rounded-xl p-6 shadow-sm group">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <CheckCircle2 className="h-5 w-5 text-cpAqua group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 bg-gradient-to-r from-cpAqua to-cpPink rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Ontdek alle huisdierservices in jouw buurt
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Van dierenartsen tot trimsalons, hondenuitlaatservices en oppasdiensten - vind alles voor jouw huisdier op één plek.
          </p>
          <Link
            href="/nl/nederland"
            className="inline-flex items-center gap-2 bg-white text-cpAqua rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            "headline": "Dierenarts vinden in jouw buurt: tips en checklist",
            "description": "Vind de beste dierenarts voor jouw huisdier. Complete gids met checklist, spoedopvang info en tips voor het kiezen van een betrouwbare dierenkliniek.",
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
              "@id": "https://cutiepawspedia.com/professionele-diensten/dierenarts-vinden"
            }
          })
        }}
      />
    </main>
  );
}
