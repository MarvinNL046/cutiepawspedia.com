import { Metadata } from "next";
import Link from "next/link";
import { Dog, CheckCircle2, Euro, Clock, Users, MapPin, Heart, Award } from "lucide-react";
import { GidsBreadcrumbs } from "@/components/gids";

export const metadata: Metadata = {
  title: "Hondenuitlaatservice: kosten, voordelen en tips | CutiePawsPedia",
  description: "Alles over hondenuitlaatservices: wat kost het, wat zijn de voordelen en waar moet je op letten? Complete gids voor drukke hondenbaasjes in Nederland.",
  openGraph: {
    title: "Hondenuitlaatservice: kosten, voordelen en tips",
    description: "Ontdek alles over hondenuitlaatservices. Van kosten tot voordelen en belangrijke tips voor het vinden van een betrouwbare uitlaatservice.",
    type: "article",
  },
};

export default function HondenuitlaatservicePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 via-cpYellow/5 to-transparent border-b border-border py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpAqua/10 rounded-xl">
              <Dog className="h-8 w-8 text-cpAqua" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Hondenuitlaatservice: kosten, voordelen en tips
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Geen tijd om je hond uit te laten? Een professionele hondenuitlaatservice kan de oplossing zijn. Ontdek wat het kost, de voordelen en waar je op moet letten.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpYellow/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground mb-4">
            Op zoek naar een betrouwbare hondenuitlaatservice?
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Vind hondenuitlaatservices bij jou in de buurt
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Wat is een hondenuitlaatservice */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Wat is een hondenuitlaatservice?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Een hondenuitlaatservice is een professionele dienst waarbij iemand jouw hond uitlaat terwijl jij aan het werk bent, op reis bent of om andere redenen niet beschikbaar bent. De uitlater haalt je hond op bij jou thuis, neemt hem mee voor een wandeling (vaak in een groep met andere honden) en brengt hem veilig terug.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Dit is vooral populair in stedelijke gebieden waar hondenbaasjes een druk werkschema hebben. Het zorgt ervoor dat je hond voldoende beweging en sociale interactie krijgt, ook als jij even niet beschikbaar bent.
          </p>
        </section>

        {/* Voordelen */}
        <section className="mb-12 bg-card rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="h-8 w-8 text-cpPink" />
            Voordelen van een hondenuitlaatservice
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Beweging en gezondheid",
                desc: "Je hond krijgt dagelijks voldoende beweging, wat bijdraagt aan fysieke en mentale gezondheid."
              },
              {
                title: "Socialisatie",
                desc: "In een groepsuitlaat leert je hond omgaan met andere honden, wat sociaal gedrag bevordert."
              },
              {
                title: "Tijdbesparing",
                desc: "Ideaal voor drukke werkdagen of als je overdag weinig tijd hebt om zelf uit te laten."
              },
              {
                title: "Rust en ontspanning",
                desc: "Een goed uitgelaten hond is een rustige hond. Minder destructief gedrag thuis."
              },
              {
                title: "Professionele verzorging",
                desc: "Ervaren uitlaters herkennen signalen van stress, angst of gezondheidsproblemen."
              },
              {
                title: "Flexibiliteit",
                desc: "Je kunt kiezen voor dagelijks, wekelijks of incidenteel uitlaten, afhankelijk van jouw behoeften."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-cpAqua flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpYellow" />
            Wat kost een hondenuitlaatservice?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            De kosten variëren afhankelijk van de locatie, duur van de wandeling en of het een individuele of groepsuitlaat betreft. Hieronder een overzicht van gemiddelde prijzen in Nederland:
          </p>

          <div className="bg-cpYellow/10 rounded-2xl p-6 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Groepsuitlaat (30 minuten)</p>
                  <p className="text-sm text-muted-foreground">Met 3-6 andere honden</p>
                </div>
                <span className="text-cpAqua font-semibold text-xl">€10 - €15</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Groepsuitlaat (60 minuten)</p>
                  <p className="text-sm text-muted-foreground">Met 3-6 andere honden</p>
                </div>
                <span className="text-cpAqua font-semibold text-xl">€15 - €25</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Individuele uitlaat (30 minuten)</p>
                  <p className="text-sm text-muted-foreground">Eén-op-één aandacht</p>
                </div>
                <span className="text-cpAqua font-semibold text-xl">€15 - €20</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Individuele uitlaat (60 minuten)</p>
                  <p className="text-sm text-muted-foreground">Eén-op-één aandacht</p>
                </div>
                <span className="text-cpAqua font-semibold text-xl">€25 - €35</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-foreground">Abonnement (5x per week)</p>
                  <p className="text-sm text-muted-foreground">Vaak met korting</p>
                </div>
                <span className="text-cpAqua font-semibold text-xl">€200 - €400/mnd</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">Extra kosten waar je rekening mee moet houden:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cpYellow flex-shrink-0 mt-0.5" />
                <span>Inschrijfkosten (eenmalig): €0 - €25</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cpYellow flex-shrink-0 mt-0.5" />
                <span>Extra diensten zoals pootjes wassen of medicatie geven: €2 - €5 per keer</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cpYellow flex-shrink-0 mt-0.5" />
                <span>Feestdagen en weekenden: vaak 25-50% toeslag</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Vind een betrouwbare hondenuitlater
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vergelijk hondenuitlaatservices in jouw buurt, lees reviews en boek een kennismakingswandeling.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Bekijk hondenuitlaatservices
          </Link>
        </section>

        {/* Waar moet je op letten */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpPink" />
            Waar moet je op letten bij het kiezen?
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Certificering en ervaring",
                desc: "Controleer of de uitlater een opleiding heeft gevolgd (bijv. hondengedragscursus) en vraag naar ervaring met verschillende rassen en gedragsproblemen."
              },
              {
                title: "Verzekering",
                desc: "Een professionele uitlaatservice heeft een aansprakelijkheidsverzekering voor eventuele schade of ongelukken."
              },
              {
                title: "Groepsgrootte",
                desc: "Let op hoeveel honden er tegelijk worden uitgelaten. Idealiter niet meer dan 4-6 honden per uitlater voor voldoende toezicht."
              },
              {
                title: "VOG (Verklaring Omtrent Gedrag)",
                desc: "Een betrouwbare uitlater kan een VOG overleggen, vooral als ze toegang krijgen tot jouw huis."
              },
              {
                title: "Referenties en reviews",
                desc: "Lees online reviews en vraag om contactgegevens van andere klanten voor referenties."
              },
              {
                title: "Kennismakingswandeling",
                desc: "Vraag altijd om een gratis of tegen kleine vergoeding kennismakingswandeling om te zien hoe de uitlater met je hond omgaat."
              },
              {
                title: "Communicatie",
                desc: "Een goede uitlater communiceert duidelijk over afspraken, updates tijdens de wandeling (foto's) en eventuele bijzonderheden."
              },
              {
                title: "Flexibiliteit",
                desc: "Check de annuleringsvoorwaarden en of de service ook op feestdagen en in weekenden beschikbaar is."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpPink" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Groepsuitlaat vs Individuele uitlaat */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Groepsuitlaat of individuele uitlaat?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cpAqua/5 rounded-2xl p-6 border-2 border-cpAqua/20">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-cpAqua" />
                Groepsuitlaat
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Voordelen:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Goedkoper</li>
                    <li>• Socialisatie met andere honden</li>
                    <li>• Meer speelplezier en afwisseling</li>
                    <li>• Goed voor energieke honden</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Nadelen:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Minder persoonlijke aandacht</li>
                    <li>• Niet geschikt voor angstige/reactieve honden</li>
                    <li>• Risico op conflicten tussen honden</li>
                  </ul>
                </div>
              </div>
              <p className="text-cpAqua font-semibold">€10 - €25 per wandeling</p>
            </div>

            <div className="bg-cpPink/5 rounded-2xl p-6 border-2 border-cpPink/20">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Dog className="h-6 w-6 text-cpPink" />
                Individuele uitlaat
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Voordelen:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Volledige aandacht voor jouw hond</li>
                    <li>• Geschikt voor angstige/reactieve honden</li>
                    <li>• Training mogelijk tijdens wandeling</li>
                    <li>• Flexibele routes en tempo</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Nadelen:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Duurder</li>
                    <li>• Geen sociale interactie met andere honden</li>
                    <li>• Minder beschikbaarheid</li>
                  </ul>
                </div>
              </div>
              <p className="text-cpPink font-semibold">€15 - €35 per wandeling</p>
            </div>
          </div>
        </section>

        {/* Tips voor de eerste keer */}
        <section className="mb-12 bg-cpYellow/10 rounded-2xl p-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Tips voor het eerste uitlaatafspraak
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: <Clock className="h-5 w-5 text-cpYellow" />,
                tip: "Plan een kennismakingsafspraak thuis zodat de uitlater je hond leert kennen in een vertrouwde omgeving."
              },
              {
                icon: <CheckCircle2 className="h-5 w-5 text-cpYellow" />,
                tip: "Geef duidelijke instructies over het gedrag van je hond: angsten, triggers, gezondheidsproblemen."
              },
              {
                icon: <Heart className="h-5 w-5 text-cpYellow" />,
                tip: "Laat je hond een band opbouwen met de uitlater. Soms duurt het een paar wandelingen voordat je hond zich op zijn gemak voelt."
              },
              {
                icon: <MapPin className="h-5 w-5 text-cpYellow" />,
                tip: "Vraag waar de wandelingen plaatsvinden. Bij voorkeur een veilige, omheinde ruimte of rustige natuurgebieden."
              },
              {
                icon: <Users className="h-5 w-5 text-cpYellow" />,
                tip: "Bij groepsuitlaat: vraag naar de samenstelling van de groep (grootte, karakter van andere honden)."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white dark:bg-cpSurface rounded-xl p-4">
                {item.icon}
                <p className="text-foreground">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpAqua/5 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Lees ook:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/professionele-diensten/dierenpension-vs-oppas" className="text-cpPink hover:text-cpAqua hover:underline">
                → Dierenpension of huisdieroppas: wat past bij jou?
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/dierengedragstherapeut" className="text-cpPink hover:text-cpAqua hover:underline">
                → Dierengedragstherapeut: wanneer heb je er een nodig?
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/trimsalon-kiezen" className="text-cpPink hover:text-cpAqua hover:underline">
                → Trimsalon kiezen: waar moet je op letten?
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
                q: "Hoe vaak moet mijn hond uitgelaten worden?",
                a: "Volwassen honden hebben minimaal 2-3 keer per dag beweging nodig. Afhankelijk van het ras, de leeftijd en energieniveau kan dit variëren. Een hondenuitlaatservice kan helpen tijdens drukke werkdagen, bijvoorbeeld 1-2 keer per week of dagelijks."
              },
              {
                q: "Wat gebeurt er als mijn hond niet goed opschieten met andere honden?",
                a: "Bespreek dit vooraf met de uitlater. Voor reactieve of angstige honden is een individuele uitlaat of een kleine groep met rustige honden beter. Een goede uitlater past de groepssamenstelling aan op het karakter van de honden."
              },
              {
                q: "Kan de uitlater mijn hond ook medicijnen geven?",
                a: "Veel hondenuitlaatservices bieden dit als extra dienst aan. Bespreek dit vooraf en geef duidelijke instructies over dosering en tijdstip."
              },
              {
                q: "Hoe weet ik of de wandeling goed is gegaan?",
                a: "Vraag om updates via WhatsApp of een speciale app. Veel uitlaters sturen foto's, GPS-tracking van de route en een korte rapportage na elke wandeling."
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
        <section className="mt-16 bg-gradient-to-r from-cpAqua to-cpYellow rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Vind vandaag nog de perfecte hondenuitlaatservice
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Ontdek betrouwbare hondenuitlaatservices in jouw omgeving. Vergelijk prijzen, lees reviews en boek een kennismakingswandeling.
          </p>
          <Link
            href="/nl/netherlands"
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
            "headline": "Hondenuitlaatservice: kosten, voordelen en tips",
            "description": "Alles over hondenuitlaatservices: wat kost het, wat zijn de voordelen en waar moet je op letten? Complete gids voor drukke hondenbaasjes in Nederland.",
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
              "@id": "https://cutiepawspedia.com/professionele-diensten/hondenuitlaatservice"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Professionele Diensten", href: "/nl/gids/professionele-diensten" },
          { label: "Hondenuitlaatservice" }
        ]}
      />
    </main>
  );
}
