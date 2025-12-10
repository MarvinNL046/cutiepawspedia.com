import { Metadata } from "next";
import Link from "next/link";
import { Home, Users, CheckCircle2, XCircle, Euro, Calendar, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Dierenpension of huisdieroppas: wat past bij jou? | CutiePawsPedia",
  description: "Vergelijk dierenpension en huisdieroppas. Ontdek voor- en nadelen, kosten en welke optie het beste past bij jouw huisdier tijdens jouw vakantie.",
  openGraph: {
    title: "Dierenpension of huisdieroppas: wat past bij jou?",
    description: "Complete vergelijking tussen dierenpension en huisdieroppas. Maak de juiste keuze voor jouw huisdier.",
    type: "article",
  },
};

export default function DierenpensionVsOppasPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpYellow/10 via-cpPink/5 to-transparent border-b border-border py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpYellow/10 rounded-xl">
              <Home className="h-8 w-8 text-cpYellow" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Dierenpension of huisdieroppas?
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Op vakantie of een paar dagen weg? Kies tussen een dierenpension of huisdieroppas aan de hand van deze complete vergelijking. Wat past het beste bij jouw huisdier?
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpPink/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground mb-4">
            Op zoek naar opvang voor jouw huisdier?
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Vind dierenpensions en oppassen bij jou in de buurt
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Vergelijkingstabel */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
            Dierenpension vs Huisdieroppas: de vergelijking
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Dierenpension */}
            <div className="bg-card rounded-2xl p-8 shadow-md border-2 border-cpYellow">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-cpYellow" />
                <h3 className="text-2xl font-display font-bold text-foreground">Dierenpension</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Een professionele opvang waar meerdere huisdieren verblijven onder toezicht van gekwalificeerd personeel.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Voordelen
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "24/7 professioneel toezicht",
                      "Sociale interactie met andere dieren",
                      "Vaste dagstructuur en verzorging",
                      "Direct contact met dierenarts bij nood",
                      "Geschikt voor langdurig verblijf",
                      "Vaak extra faciliteiten (speelweide, airco)"
                    ].map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Nadelen
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Duurder dan huisdieroppas",
                      "Kan stressvol zijn voor angstige dieren",
                      "Minder persoonlijke aandacht",
                      "Risico op ziektes door contact met andere dieren",
                      "Huisdier moet uit vertrouwde omgeving",
                      "Vaak volledig geboekt in vakanties"
                    ].map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-cpYellow/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">Kosten per dag:</span>
                  <span className="text-cpYellow font-bold text-xl">€20 - €45</span>
                </div>
                <p className="text-xs text-muted-foreground">Afhankelijk van grootte en extra's</p>
              </div>
            </div>

            {/* Huisdieroppas */}
            <div className="bg-card rounded-2xl p-8 shadow-md border-2 border-cpPink">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="h-8 w-8 text-cpPink" />
                <h3 className="text-2xl font-display font-bold text-foreground">Huisdieroppas</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Een persoon die bij jou thuis of bij hen thuis voor jouw huisdier zorgt tijdens jouw afwezigheid.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Voordelen
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Huisdier blijft in vertrouwde omgeving (bij oppas aan huis)",
                      "Persoonlijke één-op-één aandacht",
                      "Vaak goedkoper dan pension",
                      "Flexibeler qua afspraken",
                      "Minder stressvol voor angstige dieren",
                      "Kan ook andere taken doen (post, planten)"
                    ].map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Nadelen
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Geen 24/7 toezicht (afhankelijk van afspraak)",
                      "Vereist vertrouwen in vreemde in jouw huis",
                      "Geen directe veterinaire zorg",
                      "Kwaliteit kan variëren (niet altijd professionals)",
                      "Minder sociale interactie voor huisdier",
                      "Kan lastiger zijn bij medische behoeften"
                    ].map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-cpPink/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">Kosten per dag:</span>
                  <span className="text-cpPink font-bold text-xl">€10 - €30</span>
                </div>
                <p className="text-xs text-muted-foreground">Afhankelijk van aantal bezoeken en taken</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpYellow/10 to-cpPink/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Vind betrouwbare opvang in jouw regio
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vergelijk dierenpensions en huisdieroppassen bij jou in de buurt. Lees reviews en maak de juiste keuze voor jouw huisdier.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpYellow text-cpDark rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Bekijk opvangopties in jouw stad
          </Link>
        </section>

        {/* Welke keuze past bij jou? */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Welke keuze past bij jouw huisdier?
          </h2>

          <div className="space-y-6">
            <div className="bg-cpYellow/5 rounded-2xl p-6 border-l-4 border-cpYellow">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6 text-cpYellow" />
                Kies een dierenpension als:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Je huisdier sociaal is en graag speelt met andere dieren",
                  "Je langdurig weg bent (langer dan 1 week)",
                  "Je zekerheid wilt van 24/7 professioneel toezicht",
                  "Je huisdier medische aandacht of medicatie nodig heeft",
                  "Je graag updates en foto's ontvangt tijdens je afwezigheid",
                  "Je geen vreemden in je huis wilt tijdens je vakantie"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpYellow flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cpPink/5 rounded-2xl p-6 border-l-4 border-cpPink">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-6 w-6 text-cpPink" />
                Kies een huisdieroppas als:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Je huisdier angstig of gestrest is in nieuwe omgevingen",
                  "Je kort weg bent (1-7 dagen)",
                  "Je liever wilt dat je huisdier in de eigen omgeving blijft",
                  "Je budget beperkt is",
                  "Je ook andere taken gedaan wilt hebben (post, planten)",
                  "Je huisdier oud is of weinig energie heeft"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpPink flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Kostenvergelijking */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpAqua" />
            Kosten vergelijking (7 dagen vakantie)
          </h2>
          <div className="bg-card rounded-2xl p-8 shadow-md">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Dierenpension</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Kleine hond (per dag)</span>
                    <span className="font-semibold">€20</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Middelgrote hond (per dag)</span>
                    <span className="font-semibold">€30</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Grote hond (per dag)</span>
                    <span className="font-semibold">€45</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="font-bold text-foreground">Totaal (7 dagen)</span>
                    <span className="font-bold text-cpYellow text-lg">€140 - €315</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Huisdieroppas (aan huis)</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">1x bezoek per dag</span>
                    <span className="font-semibold">€10 - €15</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">2x bezoek per dag</span>
                    <span className="font-semibold">€20 - €25</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Overnachten bij oppas</span>
                    <span className="font-semibold">€25 - €30</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="font-bold text-foreground">Totaal (7 dagen)</span>
                    <span className="font-bold text-cpPink text-lg">€70 - €210</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              * Prijzen zijn indicatief en kunnen variëren per regio en extra diensten
            </p>
          </div>
        </section>

        {/* Checklist voor je keuze */}
        <section className="mb-12 bg-cpAqua/5 rounded-2xl p-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Checklist: waar moet je op letten?
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is de opvang vergund en verzekerd?",
                tip: "Vraag naar vergunningen en aansprakelijkheidsverzekering"
              },
              {
                q: "Zijn er referenties of reviews beschikbaar?",
                tip: "Lees ervaringen van andere huisdiereigenaren"
              },
              {
                q: "Wat gebeurt er bij een noodgeval?",
                tip: "Vraag naar het spoedprotocol en contact met dierenarts"
              },
              {
                q: "Kunnen jullie de speciale behoeften van mijn huisdier aan?",
                tip: "Bespreek medicatie, dieet en gedragskwesties vooraf"
              },
              {
                q: "Mag ik de locatie vooraf bezoeken?",
                tip: "Plan een kennismakingsbezoek met je huisdier"
              },
              {
                q: "Hoe vaak krijg ik updates?",
                tip: "Vraag naar communicatie tijdens je afwezigheid (foto's, berichten)"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-cpSurface rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-cpAqua flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">{item.q}</p>
                    <p className="text-sm text-muted-foreground">{item.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpPink/5 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Lees ook:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/professionele-diensten/trimsalon-kiezen" className="text-cpAqua hover:text-cpPink hover:underline">
                → Trimsalon kiezen: waar moet je op letten?
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/dierenarts-vinden" className="text-cpAqua hover:text-cpPink hover:underline">
                → Dierenarts vinden in jouw buurt: tips en checklist
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/hondenuitlaatservice" className="text-cpAqua hover:text-cpPink hover:underline">
                → Hondenuitlaatservice: kosten, voordelen en tips
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
                q: "Moet mijn huisdier ingeënt zijn voor een dierenpension?",
                a: "Ja, de meeste dierenpensions eisen dat je hond of kat volledig ingeënt is (hondenziekte, parvo, kennelhoest voor honden; kattenziekte en -griep voor katten). Dit ter bescherming van alle dieren in het pension."
              },
              {
                q: "Wat moet ik meenemen naar het dierenpension?",
                a: "Meestal: vaccinatieboekje, eigen voer, medicijnen (indien nodig), een vertrouwd knuffeldier of dekentje. Sommige pensions vragen ook om een recente foto en contactgegevens van je dierenarts."
              },
              {
                q: "Hoe ver van tevoren moet ik boeken?",
                a: "Voor vakanties in hoogseizoen (zomer, feestdagen): 2-3 maanden vooraf. Buiten drukke periodes volstaat 2-4 weken. Huisdieroppassen is vaak flexibeler qua planning."
              },
              {
                q: "Kan ik mijn huisdier halen/brengen wanneer ik wil?",
                a: "Dierenpensions hebben meestal vaste ophaal- en brengtijden. Huisdieroppassen biedt vaak meer flexibiliteit. Bespreek dit altijd vooraf."
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
        <section className="mt-16 bg-gradient-to-r from-cpYellow to-cpPink rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Vind de perfecte opvang voor jouw huisdier
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Vergelijk dierenpensions en huisdieroppassen in jouw buurt. Lees reviews en boek met vertrouwen.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-white text-cpYellow rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ontdek alle opvangopties
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
            "headline": "Dierenpension of huisdieroppas: wat past bij jou?",
            "description": "Vergelijk dierenpension en huisdieroppas. Ontdek voor- en nadelen, kosten en welke optie het beste past bij jouw huisdier tijdens jouw vakantie.",
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
              "@id": "https://cutiepawspedia.com/professionele-diensten/dierenpension-vs-oppas"
            }
          })
        }}
      />
    </main>
  );
}
