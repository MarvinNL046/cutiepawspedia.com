import { Metadata } from "next";
import Link from "next/link";
import { Brain, CheckCircle2, AlertCircle, Heart, Users, Award, Shield, TrendingUp } from "lucide-react";
import { GidsBreadcrumbs } from "@/components/gids";

export const metadata: Metadata = {
  title: "Dierengedragstherapeut: wanneer heb je er een nodig? | CutiePawsPedia",
  description: "Alles over dierengedragstherapeuten: wanneer heb je er een nodig, wat kunnen ze doen en hoe vind je een gekwalificeerde therapeut voor jouw huisdier?",
  openGraph: {
    title: "Dierengedragstherapeut: wanneer heb je er een nodig?",
    description: "Ontdek wanneer een dierengedragstherapeut kan helpen bij gedragsproblemen van jouw hond of kat. Inclusief signalen, kosten en tips.",
    type: "article",
  },
};

export default function DierengedragstherapeутPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpPink/10 via-cpAqua/5 to-transparent border-b border-border py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpPink/10 rounded-xl">
              <Brain className="h-8 w-8 text-cpPink" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Dierengedragstherapeut: wanneer heb je er een nodig?
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Gedragsproblemen bij je huisdier kunnen frustrerend en belastend zijn. Een dierengedragstherapeut helpt de oorzaak te begrijpen en werkt aan oplossingen. Ontdek wanneer je er een nodig hebt.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground mb-4">
            Op zoek naar professionele gedragstherapie voor jouw huisdier?
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpPink text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Brain className="h-5 w-5" />
            Vind dierengedragstherapeuten bij jou in de buurt
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Wat is een dierengedragstherapeut */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Wat is een dierengedragstherapeut?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Een dierengedragstherapeut is een professional gespecialiseerd in het analyseren en behandelen van gedragsproblemen bij huisdieren. In tegenstelling tot een hondentrainer, die zich richt op basale gehoorzaamheid, gaat een gedragstherapeut dieper in op de oorzaak van problematisch gedrag.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Ze gebruiken gedragspsychologie, observatie en wetenschappelijke methoden om gedragsproblemen aan te pakken. Dit kan variëren van angst en agressie tot dwangmatig gedrag en scheidingsangst.
          </p>

          <div className="bg-cpAqua/5 rounded-2xl p-6 border-l-4 border-cpAqua">
            <h3 className="font-semibold text-foreground mb-3">Verschil tussen dierengedragstherapeut en hondentrainer:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-2">Hondentrainer:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Basale gehoorzaamheid (zit, blijf, hier)</li>
                  <li>• Sociale vaardigheden (niet trekken aan riem)</li>
                  <li>• Preventieve training voor puppy's</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Gedragstherapeut:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Diepe gedragsproblemen (agressie, angst)</li>
                  <li>• Analyse van oorzaken en triggers</li>
                  <li>• Gedragsmodificatieprogramma's</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Wanneer heb je een gedragstherapeut nodig */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-cpYellow" />
            Signalen dat je een gedragstherapeut nodig hebt
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Niet elk gedragsprobleem vereist een therapeut, maar bij de volgende signalen is professionele hulp vaak noodzakelijk:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                category: "Agressie",
                icon: <AlertCircle className="h-6 w-6 text-red-600" />,
                items: [
                  "Bijten of grommen naar mensen of andere dieren",
                  "Bewaken van voer, speelgoed of plekken (resource guarding)",
                  "Territoriale agressie bij de deur of in huis",
                  "Agressie uit angst of dominantie"
                ]
              },
              {
                category: "Angst en stress",
                icon: <Heart className="h-6 w-6 text-cpPink" />,
                items: [
                  "Scheidingsangst (huilen, destructief gedrag als je weg bent)",
                  "Angst voor geluiden (onweer, vuurwerk)",
                  "Sociale angst voor mensen of andere dieren",
                  "Paniekaanvallen of extreem stressgedrag"
                ]
              },
              {
                category: "Dwangmatig gedrag",
                icon: <TrendingUp className="h-6 w-6 text-cpAqua" />,
                items: [
                  "Overmatig likken of kauwen op poten/staart",
                  "Obsessief achterna lopen van schaduwen of licht",
                  "Rondjes draaien of stereotiep gedrag",
                  "Destructief gedrag (meubels kapot maken)"
                ]
              },
              {
                category: "Socialisatieproblemen",
                icon: <Users className="h-6 w-6 text-cpYellow" />,
                items: [
                  "Extreem reactief gedrag naar andere honden",
                  "Onvermogen om met andere dieren om te gaan",
                  "Problemen met vreemden of kinderen",
                  "Gebrek aan socialisatie op jonge leeftijd"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h3 className="font-semibold text-foreground">{section.category}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-cpPink flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpPink/10 to-cpAqua/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Vind een gekwalificeerde gedragstherapeut
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Zoek een dierengedragstherapeut in jouw regio met de juiste certificeringen en ervaring voor jouw huisdier.
          </p>
          <Link
            href="/nl/netherlands"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Bekijk gedragstherapeuten
          </Link>
        </section>

        {/* Wat doet een gedragstherapeut */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Hoe werkt gedragstherapie?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Een dierengedragstherapeut volgt meestal een gestructureerd proces om het gedrag van jouw huisdier te verbeteren:
          </p>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Intake en anamnese",
                desc: "De therapeut stelt vragen over de voorgeschiedenis van je huisdier, het probleem, triggers en de thuissituatie. Vaak krijg je een vragenlijst vooraf."
              },
              {
                step: "2",
                title: "Observatie en analyse",
                desc: "De therapeut observeert het gedrag van je huisdier thuis of in een gecontroleerde omgeving. Dit helpt om de oorzaak en triggers te identificeren."
              },
              {
                step: "3",
                title: "Diagnose en behandelplan",
                desc: "Op basis van de observatie wordt een diagnose gesteld en een op maat gemaakt behandelplan opgesteld, vaak met gedragsmodificatietechnieken."
              },
              {
                step: "4",
                title: "Training en begeleiding",
                desc: "De therapeut traint jou (de eigenaar) om thuis met het gedrag om te gaan. Dit kan bestaan uit desensibilisatie, positieve bekrachtiging en counterconditioning."
              },
              {
                step: "5",
                title: "Follow-up en evaluatie",
                desc: "Regelmatige follow-up sessies om de voortgang te evalueren en het plan bij te stellen. Dit kan enkele weken tot maanden duren."
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-cpPink text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpYellow" />
            Wat kost gedragstherapie?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            De kosten variëren afhankelijk van de ervaring van de therapeut, de complexiteit van het probleem en het aantal sessies. Hieronder een indicatie:
          </p>

          <div className="bg-cpYellow/10 rounded-2xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Intake (90-120 minuten)</span>
                <span className="text-cpAqua font-semibold">€100 - €200</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Follow-up sessie (60 minuten)</span>
                <span className="text-cpAqua font-semibold">€60 - €120</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-foreground">Pakket (4-6 sessies)</span>
                <span className="text-cpAqua font-semibold">€400 - €800</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-foreground">Telefonische/online consultatie</span>
                <span className="text-cpAqua font-semibold">€40 - €80</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">Vergoeding door dierenverzekering:</h3>
            <p className="text-muted-foreground mb-3">
              Sommige dierenverzekeringen vergoeden (een deel van) gedragstherapie. Check je polisvoorwaarden of neem contact op met je verzekeraar.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Vraag altijd vooraf om een prijsopgave en een indicatie van het aantal sessies dat nodig is.
            </p>
          </div>
        </section>

        {/* Waar moet je op letten bij het kiezen */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-cpAqua" />
            Waar moet je op letten bij het kiezen?
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Certificering en opleiding",
                desc: "Controleer of de therapeut een erkende opleiding heeft gevolgd (bijv. COAPE, VBKO) en lid is van een branchevereniging zoals de VGCT (Vereniging Gedragstherapeuten Gezelschapsdieren)."
              },
              {
                title: "Ervaring met specifiek probleem",
                desc: "Vraag naar ervaring met jouw specifieke probleem (agressie, angst, etc.) en of de therapeut ervaring heeft met jouw type huisdier (hond, kat)."
              },
              {
                title: "Wetenschappelijke benadering",
                desc: "Een goede therapeut werkt met wetenschappelijk onderbouwde methoden en positieve bekrachtiging, niet met straffen of dominantietheorieën."
              },
              {
                title: "Transparantie over kosten en duur",
                desc: "De therapeut moet vooraf duidelijk zijn over de kosten, het verwachte aantal sessies en de aanpak."
              },
              {
                title: "Samenwerking met dierenarts",
                desc: "Bij medische oorzaken (pijn, hormonale problemen) werkt een goede therapeut samen met je dierenarts om fysieke oorzaken uit te sluiten."
              },
              {
                title: "Realistische verwachtingen",
                desc: "Een betrouwbare therapeut belooft geen wonderen en geeft een realistisch beeld van de tijd en inzet die nodig is."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpAqua" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Veelvoorkomende behandelingen */}
        <section className="mb-12 bg-cpPink/5 rounded-2xl p-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Veelvoorkomende behandelmethoden
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Desensibilisatie",
                desc: "Geleidelijke blootstelling aan de angstopwekkende stimulus (bijv. onweer, vuurwerk) in kleine, controleerbare stappen."
              },
              {
                title: "Counterconditioning",
                desc: "Het veranderen van de emotionele reactie op een trigger door positieve ervaringen te koppelen aan de angstopwekkende situatie."
              },
              {
                title: "Positieve bekrachtiging",
                desc: "Belonen van gewenst gedrag in plaats van straffen van ongewenst gedrag. Dit bevordert vertrouwen en vermindert stress."
              },
              {
                title: "Gedragsmodificatie",
                desc: "Systematisch aanpassen van gedragspatronen door training, routine en consistentie in de thuisomgeving."
              }
            ].map((method, index) => (
              <div key={index} className="bg-white dark:bg-cpSurface rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">{method.title}</h3>
                <p className="text-muted-foreground text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpAqua/5 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Lees ook:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/professionele-diensten/dierenarts-vinden" className="text-cpPink hover:text-cpAqua hover:underline">
                → Dierenarts vinden in jouw buurt: tips en checklist
              </Link>
            </li>
            <li>
              <Link href="/professionele-diensten/hondenuitlaatservice" className="text-cpPink hover:text-cpAqua hover:underline">
                → Hondenuitlaatservice: kosten, voordelen en tips
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
                q: "Hoelang duurt gedragstherapie?",
                a: "Dit hangt af van de ernst en complexiteit van het probleem. Eenvoudige problemen kunnen in 2-4 sessies opgelost worden, terwijl complexe gedragsproblemen (ernstige agressie, trauma) maanden kunnen duren met regelmatige follow-up."
              },
              {
                q: "Kan ik zelf gedragsproblemen oplossen zonder therapeut?",
                a: "Bij milde gedragsproblemen kun je soms zelf aan de slag met online bronnen en boeken. Bij agressie, ernstige angst of dwangmatig gedrag is professionele hulp echter sterk aanbevolen om te voorkomen dat het probleem verergert."
              },
              {
                q: "Werkt gedragstherapie altijd?",
                a: "Hoewel gedragstherapie vaak effectief is, hangt het succes af van consistentie, tijd en inzet van de eigenaar. Sommige gedragsproblemen (met medische oorzaken) kunnen niet volledig verholpen worden zonder medicatie of aanvullende behandeling."
              },
              {
                q: "Verschil tussen online en fysieke sessies?",
                a: "Online sessies kunnen handig zijn voor advies en instructies, maar fysieke sessies zijn vaak effectiever omdat de therapeut het gedrag live kan observeren en direct kan corrigeren. Sommige therapeuten combineren beide."
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
        <section className="mt-16 bg-gradient-to-r from-cpPink to-cpAqua rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Vind de juiste gedragstherapeut voor jouw huisdier
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Ontdek gekwalificeerde dierengedragstherapeuten in jouw regio. Vergelijk ervaring, lees reviews en neem contact op voor een intakegesprek.
          </p>
          <Link
            href="/nl/netherlands"
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
            "headline": "Dierengedragstherapeut: wanneer heb je er een nodig?",
            "description": "Alles over dierengedragstherapeuten: wanneer heb je er een nodig, wat kunnen ze doen en hoe vind je een gekwalificeerde therapeut voor jouw huisdier?",
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
              "@id": "https://cutiepawspedia.com/professionele-diensten/dierengedragstherapeut"
            }
          })
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Professionele Diensten", href: "/nl/gids/professionele-diensten" },
          { label: "Dierengedragstherapeut" }
        ]}
      />
    </main>
  );
}
