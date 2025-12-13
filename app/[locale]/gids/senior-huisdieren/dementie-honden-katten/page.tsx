/**
 * SEO Landing Page: Dementie bij honden en katten
 * Pillar 9 - Senior Huisdieren - Subpillar 4
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Brain, Moon, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Dementie bij Honden en Katten: Symptomen & Omgang | CutiePawsPedia",
  description: "Alles over cognitieve disfunctie bij senior huisdieren. Herken symptomen van dementie en leer hoe je je huisdier kunt ondersteunen. Vind gespecialiseerde dierenartsen.",
  keywords: "dementie hond, cognitieve disfunctie, dementie kat, verwardheid huisdier, geheugen verlies hond, seniele kat",
  openGraph: {
    title: "Dementie bij Honden en Katten: Symptomen en Omgang",
    description: "Praktische gids over cognitieve disfunctie bij oudere huisdieren. Symptomen herkennen en ondersteuning bieden.",
    type: "article",
  },
};

export default function DementieHondenKattenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAmber/10 via-cpCoral/5 to-transparent dark:from-cpAmber/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-cpAmber" />
            <span className="text-sm font-medium text-cpAmber">Senior Huisdieren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
            Dementie bij Honden en Katten: Symptomen en Omgang
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Cognitieve disfunctie, ook wel dementie genoemd, komt steeds vaker voor bij oudere huisdieren. Leer de tekenen herkennen en ontdek hoe je je senior huisdier kunt helpen en ondersteunen.
          </p>
        </div>
      </section>

      {/* CTA 1 - Primary */}
      <section className="bg-card dark:bg-cpSurface/50 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Vermoedt je cognitieve problemen bij je huisdier?
            </h2>
            <p className="text-white/90 mb-6">
              Vind dierenartsen met expertise in geriatrische huisdiergeneeskunde
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpAmber px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-md hover:shadow-xl"
            >
              Vind een Specialist →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1: Wat is cognitieve disfunctie? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Brain className="h-8 w-8 text-cpCoral" />
              Wat is Cognitieve Disfunctie Syndroom (CDS)?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Cognitieve Disfunctie Syndroom (CDS), ook bekend als honden- of kattendementie, is een progressieve aandoening die vergelijkbaar is met Alzheimer bij mensen. Het wordt veroorzaakt door veranderingen in de hersenen die leiden tot achteruitgang in geheugen, leren en bewustzijn.
            </p>
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 mb-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Belangrijke Statistieken
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• 28% van honden tussen 11-12 jaar toont minstens één symptoom</li>
                    <li>• 68% van honden tussen 15-16 jaar heeft tekenen van CDS</li>
                    <li>• 50% van katten ouder dan 15 jaar vertoont cognitieve achteruitgang</li>
                    <li>• Vroegtijdige interventie kan progressie vertragen</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: DISHA symptomen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Symptomen Herkennen: Het DISHA-Model
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Dierenartsen gebruiken het DISHA-acroniem om symptomen van cognitieve disfunctie te categoriseren:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-cpCoral">D</span> - Desoriëntatie
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Verdwalen in bekende omgevingen (thuis of in de tuin)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Voor de verkeerde kant van de deur wachten
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Staren naar muren of in het niets
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Vast komen te zitten achter meubels
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-cpCoral">I</span> - Interactie (verminderd)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Minder interesse in begroeten of knuffelen
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Geen reactie op commando's die eerder wel werkten
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Verminderde interesse in andere huisdieren
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Lijken familieleden niet meer te herkennen
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-cpCoral">S</span> - Slaap-Waak Cyclus
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Wakker zijn en rondlopen 's nachts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Overdag meer slapen dan normaal
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      's Nachts janken of miauwen zonder duidelijke reden
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-cpCoral">H</span> - House-soiling (Ongelukjes)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Urineren of poepen in huis terwijl ze zindelijk waren
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Niet meer vragen om naar buiten te gaan
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Vergeten dat ze net buiten zijn geweest
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-cpCoral">A</span> - Activity (Activiteit)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Doelloos rondlopen of cirkelen
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Minder interesse in spelen of favoriete activiteiten
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Repetitief gedrag zoals steeds hetzelfde blaffenof miauwen
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Extreme lusteloosheid of juist verhoogde angst
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA 2 - Secondary */}
          <section className="my-12">
            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-2xl p-8 border-l-4 border-cpCoral">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                Herken je DISHA-symptomen bij je huisdier?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Vroegtijdige diagnose en behandeling kunnen het verschil maken. Bespreek je zorgen met een dierenarts.
              </p>
              <Link
                href="/nl/netherlands"
                className="inline-block bg-cpCoral text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all"
              >
                Vind een Dierenarts →
              </Link>
            </div>
          </section>

          {/* Section 3: Diagnose */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Diagnose van Cognitieve Disfunctie
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Er is geen enkele test die CDS definitief kan aantonen. De diagnose wordt gesteld door:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Gedragsbeoordeling:</strong> Gedetailleerde vragenlijst over DISHA-symptomen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Lichamelijk onderzoek:</strong> Om andere aandoeningen uit te sluiten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Bloedonderzoek:</strong> Om schildklier-, nier- en leverkwalen uit te sluiten
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Bloeddrukcontrole:</strong> Hoge bloeddruk kan cognitieve problemen veroorzaken
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Het is belangrijk om andere medische oorzaken uit te sluiten, zoals pijn, gehoorverlies, blindheid of andere neurologische aandoeningen.
            </p>
          </section>

          {/* Section 4: Behandeling */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              Behandeling en Ondersteuning
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Hoewel CDS niet te genezen is, kunnen verschillende interventies de symptomen verlichten en de progressie vertragen:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              1. Medicatie
            </h3>
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Selegiline (Anipryl):</strong> Helpt dopamine niveaus in de hersenen te verhogen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Anti-angstmedicatie:</strong> Zoals alprazolam voor angst en nachtelijke onrust
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Melatonine:</strong> Kan helpen bij slaap-waak cyclus stoornissen
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              2. Dieet en Supplementen
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Therapeutisch voer:</strong> Zoals Hill's b/d met antioxidanten en omega-3
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Antioxidanten:</strong> Vitamine E, C, beta-caroteen om hersenveroudering te vertragen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>MCT-olie:</strong> Medium-chain triglycerides als alternatieve energiebron voor hersenen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>S-adenosylmethionine (SAMe):</strong> Ondersteunt hersenfunctie
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              3. Mentale Stimulatie
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Puzzelspeelgoed en snuffelmatten voor mentale uitdaging
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Korte trainingen van bekende commando's
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Nieuwe geuren en ervaringen tijdens wandelingen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Sociale interactie met mensen en andere dieren
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-3">
              4. Omgevingsaanpassingen
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Consistente routine:</strong> Houd vaste tijden voor eten, wandelen en slapen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Nachtlampjes:</strong> Voor katten en honden met verminderd zicht
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Makkelijke toegang:</strong> Tot water, voer en kattenbak/tuin
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Veilige omgeving:</strong> Verwijder gevaarlijke obstakels
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Vermijd veranderingen:</strong> Grote veranderingen kunnen verwarrend zijn
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Omgaan met nachtelijke onrust */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-3">
              <Moon className="h-8 w-8 text-cpAmber" />
              Omgaan met Nachtelijke Onrust
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
              Eén van de meest uitdagende symptomen voor eigenaren is nachtelijk gejaag en gejank. Praktische tips:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Verhoog activiteit overdag met wandelingen en mentale stimulatie
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Geef de laatste maaltijd later op de avond
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Gebruik nachtlampjes om desoriëntatie te verminderen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Overweeg melatonine (na overleg met dierenarts)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <span className="text-muted-foreground dark:text-cpCream/80">
                  Zorg voor een comfortabele slaapplek dicht bij jou
                </span>
              </li>
            </ul>
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
                href="/seo/senior-huisdieren/afscheid-huisdier"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Afscheid Nemen van je Huisdier
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Wat kun je verwachten en hoe ermee om te gaan
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
                  Is cognitieve disfunctie hetzelfde als dementie bij mensen?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Ja, CDS bij huisdieren is vergelijkbaar met Alzheimer bij mensen. Beide aandoeningen worden veroorzaakt door vergelijkbare veranderingen in de hersenen, zoals ophoping van abnormale eiwitten en verlies van hersencellen. Symptomen zoals geheugenverliesen desoriëntatie zijn ook vergelijkbaar.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Kan CDS worden voorkomen?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Er is geen gegarandeerde manier om CDS te voorkomen, maar levenslange mentale stimulatie, regelmatige beweging, gezonde voeding met antioxidanten en sociale interactie kunnen helpen het risico te verminderen en de symptomen uit te stellen.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Hoe snel verslechtert CDS?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  De progressie varieert per individueel dier. Bij sommige huisdieren verslechteren symptomen langzaam over jaren, bij anderen sneller. Vroege behandeling met medicatie, supplementen en omgevingsaanpassingen kan de progressie aanzienlijk vertragen.
                </p>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground dark:text-cpCream">
                  Wanneer moet ik euthanasie overwegen?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/70">
                  Dit is een zeer persoonlijke beslissing. Overwegingen zijn: kwaliteit van leven, mate van angst en verwarring, vermogen om te eten en drinken, reactie op behandeling, en impact op het gezin. Bespreek dit uitgebreid met je dierenarts. Zie ook ons artikel over <Link href="/seo/senior-huisdieren/afscheid-huisdier" className="text-cpCoral hover:underline">afscheid nemen van je huisdier</Link>.
                </p>
              </details>
            </div>
          </section>
        </div>
      </article>

      {/* CTA 3 - Tertiary */}
      <section className="bg-secondary dark:bg-cpCharcoal border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ontdek Alle Huisdierservices
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Van dierenartsen tot gedragsdeskundigen: vind de beste zorg voor je senior huisdier in jouw regio.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpAmber px-8 py-4 rounded-2xl font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl text-lg"
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
            headline: "Dementie bij Honden en Katten: Symptomen en Omgang",
            description: "Alles over cognitieve disfunctie bij senior huisdieren. Herken symptomen van dementie en leer hoe je je huisdier kunt ondersteunen.",
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
          { label: "Dementie bij honden en katten" }
        ]}
      />
    </div>
  );
}
