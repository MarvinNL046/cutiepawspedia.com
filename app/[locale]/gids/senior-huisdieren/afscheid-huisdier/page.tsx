/**
 * SEO Landing Page: Afscheid nemen van je huisdier
 * Pillar 9 - Senior Huisdieren - Subpillar 5
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Heart, Clock, Flower } from "lucide-react";

export const metadata: Metadata = {
  title: "Afscheid Nemen van je Huisdier: Wat Kun je Verwachten | CutiePawsPedia",
  description: "Leer wat je kunt verwachten bij afscheid van je geliefde huisdier. Info over euthanasie, rouwverwerking en laatste momenten. Vind begripvolle dierenartsen.",
  keywords: "afscheid huisdier, euthanasie hond, euthanasie kat, rouw huisdier, laatste momenten, dierbare dier verliezen",
  openGraph: {
    title: "Afscheid Nemen van je Huisdier: Wat Kun je Verwachten",
    description: "Begripvolle gids over afscheid nemen van je huisdier. Euthanasie, rouwverwerking en herinneringen bewaren.",
    type: "article",
  },
};

export default function AfscheidHuisdierPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Senior Huisdieren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Afscheid Nemen van je Huisdier: Wat Kun je Verwachten
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Afscheid nemen van een geliefd huisdier is een van de moeilijkste momenten voor een diereneigenaar. Deze gids helpt je begrijpen wat je kunt verwachten en hoe je door deze emotionele periode kunt komen.
          </p>
        </div>
      </section>

      {/* CTA 1 - Primary */}
      <section className="bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Zoek je een begripvolle dierenarts?
            </h2>
            <p className="text-white/90 mb-6">
              Vind dierenartsen die thuiseuthanasie aanbieden voor een rustig afscheid
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-md hover:shadow-xl"
            >
              Vind een Dierenarts →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1: De beslissing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              De Moeilijke Beslissing: Wanneer is het Tijd?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              De beslissing om afscheid te nemen van je huisdier is misschien wel de moeilijkste die je ooit moet nemen. Er is geen "perfect" moment, maar er zijn wel overwegingen die kunnen helpen:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Kwaliteit van Leven Beoordeling
            </h3>
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 mb-6">
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Overweeg deze vijf fundamentele aspecten van welzijn:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Pijn:</strong> Heeft je huisdier pijn die niet meer goed te beheersen is met medicatie?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Honger:</strong> Eet en drinkt je huisdier nog met plezier?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Hygiëne:</strong> Kan je huisdier zichzelf nog verzorgen? Heeft het last van incontinentie?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Geluk:</strong> Geniet je huisdier nog van dingen die het vroeger leuk vond?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Mobiliteit:</strong> Kan je huisdier nog bewegen zonder extreme moeite of pijn?
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Een handige vuistregel: maak een lijst van je huisdier's vijf favoriete activiteiten. Als ze er geen drie meer van kunnen of willen doen, kan dit een indicatie zijn dat hun kwaliteit van leven afneemt.
            </p>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6 border-l-4 border-cpAmber">
              <p className="text-muted-foreground dark:text-cpCream/80">
                <strong>Belangrijk:</strong> Bespreek je twijfels altijd met je dierenarts. Zij kunnen je helpen een objectieve beoordeling te maken en zijn gewend deze moeilijke gesprekken te voeren.
              </p>
            </div>
          </section>

          {/* Section 2: Het euthanasie proces */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-cpCoral" />
              Het Euthanasie Proces: Wat Gebeurt er?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Begrijpen wat er gebeurt tijdens euthanasie kan helpen je voor te bereiden en kan angst wegnemen:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              De Procedure Stap voor Stap
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">1.</span> Voorafgaand Gesprek
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  De dierenarts legt het proces uit, beantwoordt vragen en vraagt naar je wensen. Je mag kiezen of je erbij wilt zijn en of je tijd wilt hebben voor een laatste afscheid.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">2.</span> Sedatie (Optioneel maar Aanbevolen)
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Eerst wordt vaak een kalmerend middel gegeven via een injectie. Je huisdier wordt binnen enkele minuten rustig en slaperig. Dit zorgt voor een vredig verloop.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">3.</span> De Euthanasie-injectie
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Wanneer je huisdier volledig ontspannen is, wordt een euthanasie-oplossing (een overdosis anesthesie) toegediend. Dit stopt binnen seconden de hersenfunctie en het hart. Je huisdier voelt geen pijn.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">4.</span> Wat Je Kunt Zien
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Het is normaal en belangrijk om te weten dat je misschien het volgende ziet:
                </p>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1 ml-4">
                  <li>• Ogen blijven vaak open (dit is normaal)</li>
                  <li>• Mogelijk een laatste diepe uitademing</li>
                  <li>• Soms kleine spiertrekkingen (reflexen, geen bewuste beweging)</li>
                  <li>• Mogelijk verlies van blaas- of darmcontrole</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                  <span className="text-cpCoral">5.</span> Bevestiging
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  De dierenarts controleert met een stethoscoop of het hart is gestopt. Je krijgt alle tijd die je nodig hebt om afscheid te nemen.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Thuiseuthanasie vs. Kliniek
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-5">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-3">
                  Thuiseuthanasie
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Vertrouwde omgeving
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Geen stress van autorit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Privacy en rust
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Andere huisdieren kunnen afscheid nemen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">-</span> Hogere kosten
                  </li>
                </ul>
              </div>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-5">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-3">
                  In de Kliniek
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Alle medische faciliteiten aanwezig
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Lager in kosten
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">+</span> Geen emotionele herinneringen aan huis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">-</span> Stress van transport
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">-</span> Mogelijk drukkere omgeving
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA 2 - Secondary */}
          <section className="my-12">
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-8 border-l-4 border-cpCoral">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                Hulp nodig bij deze moeilijke beslissing?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Vind een begripvolle dierenarts die je kan begeleiden en thuiseuthanasie kan uitvoeren.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-block bg-cpCoral text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all"
              >
                Vind een Dierenarts →
              </Link>
            </div>
          </section>

          {/* Section 3: Rouwverwerking */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Heart className="h-8 w-8 text-cpAmber" />
              Rouwverwerking: Omgaan met Verdriet
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Verdriet om het verlies van een huisdier is echt en intens. Je hebt het recht om te rouwen, ongeacht wat anderen zeggen.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Fasen van Rouw
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Rouw verloopt niet lineair, maar veel mensen ervaren deze fasen:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Ontkenning en shock:</strong> "Dit kan niet waar zijn"
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Boosheid:</strong> Op jezelf, de dierenarts, of de situatie
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Schuld:</strong> "Had ik meer kunnen doen?"
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Intense verdriet:</strong> Huilen, missen, niet kunnen eten of slapen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Acceptatie:</strong> Vrede vinden met het verlies (dit duurt vaak maanden)
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Gezonde Manieren om te Rouwen
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Sta jezelf toe te huilen en verdrietig te zijn
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Praat met mensen die het begrijpen (vrienden, familie, online steungroepen)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Schrijf over je gevoelens of maak een gedenkboek
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Zorg goed voor jezelf: eet, slaap, beweeg
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Overweeg professionele hulp bij een rouwcounselor als het te overweldigend wordt
                </span>
              </li>
            </ul>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6 border-l-4 border-cpAmber">
              <p className="text-muted-foreground dark:text-cpCream/80">
                <strong>Belangrijke herinnering:</strong> Er is geen "correcte" tijdlijn voor rouw. Sommige mensen voelen zich na weken beter, anderen hebben maanden of zelfs jaren nodig. Beide zijn normaal.
              </p>
            </div>
          </section>

          {/* Section 4: Kinderen en verlies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Kinderen Helpen met het Verlies
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Het verlies van een huisdier is vaak het eerste contact van kinderen met de dood. Hoe je ermee omgaat is belangrijk:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              Tips per Leeftijdsgroep
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Jonge kinderen (3-6 jaar)
                </h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-2">
                  <li>• Gebruik eenvoudige, eerlijke taal</li>
                  <li>• Vermijd eufemismen zoals "ingeslapen" (kan angst voor slapen geven)</li>
                  <li>• Verwacht dat ze het concept mogelijk niet volledig begrijpen</li>
                  <li>• Sta herhaalde vragen toe</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Schoolgaande kinderen (7-12 jaar)
                </h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-2">
                  <li>• Leg uit wat er is gebeurd in duidelijke termen</li>
                  <li>• Betrek ze bij afscheidsrituelen als ze dat willen</li>
                  <li>• Wees eerlijk over je eigen verdriet</li>
                  <li>• Geef ze manieren om hun gevoelens te uiten (tekenen, schrijven)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Tieners (13+ jaar)
                </h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-2">
                  <li>• Respecteer hun behoefte aan privacy maar blijf beschikbaar</li>
                  <li>• Laat ze deelnemen aan beslissingen als dat gepast is</li>
                  <li>• Erken dat hun verdriet net zo geldig is als dat van volwassenen</li>
                  <li>• Let op tekenen van langdurige depressie</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Herinneringen bewaren */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Flower className="h-8 w-8 text-cpCoral" />
              Herinneringen Bewaren en Eren
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Manieren om je huisdier te gedenken:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Fotoalbum of gedenkvideo:</strong> Verzamel je favoriete foto's en momenten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Pootafdruk:</strong> Maak een afdruk van de poot in klei of inkt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Haarlokje:</strong> Bewaar een plukje haar in een medaillon of doosje
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gedenksieraad:</strong> Crematieas-sieraden of een hanger met foto
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Plant een boom of bloemen:</strong> In de tuin als levend gedenkteken
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Donatie:</strong> Aan een dierenasielor dierenarts opleiding in hun naam
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gedenkplek thuis:</strong> Een hoekje met foto, halsband en favoriete speeltje
                </span>
              </li>
            </ul>
          </section>

          {/* Section 6: Wanneer een nieuw huisdier */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Wanneer ben je Klaar voor een Nieuw Huisdier?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Er is geen juist tijdstip. Enkele overwegingen:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Je hebt genoeg gerouwd en kunt met liefde terugdenken aan je vorige huisdier
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Je zoekt geen "vervanging" maar bent klaar voor een nieuwe band
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Je hebt de tijd, energie en financiële middelen voor een nieuw huisdier
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Alle gezinsleden zijn er klaar voor
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Sommige mensen zijn na enkele weken klaar, anderen hebben jaren nodig. Beide zijn normaal. Luister naar je hart.
            </p>
          </section>

          {/* Internal Links Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Lees Ook Over Senior Huisdieren
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/seo/senior-huisdieren/oudere-hond-verzorgen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Oudere Hond Verzorgen
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Speciale behoeften en tips voor je senior hond
                </p>
              </Link>
              <Link
                href="/seo/senior-huisdieren/dementie-honden-katten"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Dementie bij Honden en Katten
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Symptomen en omgang met cognitieve disfunctie
                </p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgestelde Vragen
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Voelt mijn huisdier pijn tijdens euthanasie?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Nee. Euthanasie is een pijnloze procedure. De sedatie zorgt ervoor dat je huisdier rustig en slaperig wordt. De daadwerkelijke euthanasie-injectie is een overdosis anesthesie die binnen seconden het bewustzijn en daarna het hart stopt. Je huisdier voelt geen pijn.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Moet ik erbij blijven tijdens de euthanasie?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Dit is een zeer persoonlijke keuze. Sommige mensen vinden troost in het feit dat ze bij hun huisdier waren tot het laatste moment. Anderen vinden het te emotioneel. Beide keuzes zijn volkomen geldig. Doe wat voor jou goed aanvoelt. Je huisdier voelt je liefde ongeacht je aanwezigheid.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Wat kost euthanasie?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Kosten variëren, maar liggen gemiddeld tussen €75-€150 in de kliniek. Thuiseuthanasie kost meestal €150-€300 vanwege de reistijd en persoonlijke service. Crematie kan variëren van €50 (groepscrematie) tot €200+ (individuele crematie met as teruggave). Bespreek kosten vooraf met je dierenarts.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Hoe lang duurt het om over het verlies heen te komen?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Er is geen vaste tijdlijn. Sommige mensen voelen zich na weken beter, anderen hebben maanden of jaren nodig. Factoren die invloed hebben zijn: de sterkte van jullie band, omstandigheden van het overlijden, en je eerdere ervaringen met verlies. Intense verdriet in de eerste maanden is volkomen normaal. Zoek hulp als het verdriet je dagelijkse leven ernstig beïnvloedt na 6-12 maanden.
                </p>
              </details>
            </div>
          </section>
        </div>
      </article>

      {/* CTA 3 - Tertiary */}
      <section className="bg-secondary dark:bg-cpCharcoal border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ontdek Alle Huisdierservices
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Van dierenartsen tot rouwbegeleiding: vind de ondersteuning die je nodig hebt in deze moeilijke tijd.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral px-8 py-4 rounded-2xl font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Bekijk Alle Services →
            </Link>
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
            headline: "Afscheid Nemen van je Huisdier: Wat Kun je Verwachten",
            description: "Leer wat je kunt verwachten bij afscheid van je geliefde huisdier. Info over euthanasie, rouwverwerking en laatste momenten.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "https://cutiepawspedia.com/logo.png",
              },
            },
            datePublished: "2024-01-15",
            dateModified: "2024-01-15",
          }),
        }}
      />

      <GidsBreadcrumbs
        items={[
          { label: "Senior Huisdieren", href: "/nl/gids/senior-huisdieren" },
          { label: "Afscheid nemen van je huisdier" }
        ]}
      />
    </div>
  );
}
