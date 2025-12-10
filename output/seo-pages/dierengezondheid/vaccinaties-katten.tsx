/**
 * SEO Landing Page: Vaccinaties voor katten
 * Pillar: Dierengezondheid (Pet Health)
 * Target: Dutch pet owners seeking cat vaccination information
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Syringe, Calendar, AlertCircle, Euro, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Vaccinaties voor Katten: Welke zijn Verplicht? Schema 2025",
  description: "Complete gids voor kattenvacinaties: welke zijn verplicht, vaccinatieschema voor kittens en volwassen katten, kosten en bijwerkingen. Vind een dierenarts bij jou in de buurt.",
  keywords: [
    "vaccinaties kat",
    "kattenvacinaties",
    "vaccinatieschema kat",
    "kosten kattenvaccinatie",
    "kitten vaccinatie",
    "verplichte vaccinaties kat",
    "niesziekte kat",
    "kattenziekte vaccinatie"
  ],
  openGraph: {
    title: "Vaccinaties voor Katten: Welke zijn Verplicht?",
    description: "Ontdek welke vaccinaties je kat nodig heeft, wanneer en wat het kost. Complete gids 2025.",
    type: "article",
  },
};

export default function VaccinatiesKattenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Syringe className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Dierengezondheid</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Vaccinaties voor Katten: Welke zijn Verplicht?
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Katten hebben specifieke vaccinaties nodig om beschermd te zijn tegen gevaarlijke ziektes. Ontdek welke vaccinaties essentieel zijn, ook voor binnenkatten.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐱 Tijd voor een vaccinatie-afspraak?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/nl/nederland">
                Vind een dierenarts bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Vaccinaties beschermen je kat tegen ernstige, soms dodelijke infectieziektes zoals kattenziekte (panleukopenie), kattengriep (niesziekte) en hondsdolheid. Zelfs binnenkatten lopen risico, omdat virussen via kleding, schoenen of andere huisdieren binnen kunnen komen.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Of je nu een kitten hebt geadopteerd of een volwassen kat, het is cruciaal om het juiste vaccinatieschema te volgen. In deze gids lees je precies welke vaccinaties je kat nodig heeft, wanneer ze gegeven moeten worden en wat je kunt verwachten.
          </p>
        </section>

        {/* Verplichte vs Aanbevolen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Welke Vaccinaties zijn Verplicht voor Katten?
          </h2>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-3">
              <strong>In Nederland zijn kattenvacinaties niet wettelijk verplicht</strong>, behalve rabiës (hondsdolheid) als je met je kat de grens over gaat. Toch worden bepaalde vaccinaties sterk aanbevolen voor alle katten, inclusief binnenkatten.
            </p>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Kernvaccinaties (Voor alle katten)</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kattenziekte (Panleukopenie/Feline Parvo)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zeer besmettelijk virus met hoge sterfte bij kittens. Veroorzaakt ernstige diarree, braken en uitdroging.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kattengriep (Niesziekte - FHV-1 & FCV)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Combinatie van Feline Herpesvirus en Calicivirus. Veroorzaakt oog- en luchtwegproblemen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Hondsdolheid (Rabiës)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Verplicht voor reizen binnen EU. Voor binnenkatten die Nederland niet verlaten optioneel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Niet-kernvaccinaties (Op advies dierenarts)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kattenleukemie (FeLV)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Aanbevolen voor katten met buitentoegang of contact met andere katten. Jonge katten zijn extra kwetsbaar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Chlamydia Felis</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Alleen bij katten in omgevingen met uitbraken (kattenpensions, fokkerijen).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Bordetellose (Kennelhoest voor katten)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zelden nodig, alleen bij hoog risico in groepshuisvesting.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Binnenkat vs Buitenkat */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Binnenkat vs Buitenkat: Welke Vaccinaties?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                🏠 Binnenkatten
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Kattenziekte (verplicht)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Kattengriep (verplicht)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full border border-cpAmber flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Rabiës (alleen bij reizen)</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-4 bg-cpCoral/10 dark:bg-cpCoral/5 p-3 rounded-lg">
                <strong>Let op:</strong> Ook binnenkatten kunnen besmet raken via virussen die binnenkomen op kleding, schoenen of via andere huisdieren.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                🌳 Buitenkatten
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Kattenziekte (verplicht)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Kattengriep (verplicht)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Kattenleukemie (sterk aanbevolen)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-foreground dark:text-cpCream/90">Rabiës (aanbevolen)</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-4 bg-cpAmber/10 dark:bg-cpAmber/5 p-3 rounded-lg">
                Buitenkatten hebben meer risico door contact met andere katten, wilde dieren en besmette omgevingen.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Zoek een Dierenarts voor je Kat
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Vind een katspecialist in jouw regio voor vaccinaties, gezondheidscontroles en advies.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/nl/nederland">
                Bekijk dierenklinieken in jouw stad →
              </Link>
            </Button>
          </div>
        </section>

        {/* Vaccinatieschema */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Vaccinatieschema voor Katten en Kittens
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cpCoral/10 dark:bg-cpCoral/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-cpCream">Leeftijd</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-cpCream">Vaccinatie</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-cpCream">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">8-9 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">NKP (1e prik)</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Eerste kitten-vaccinatie tegen Niesziekte, Kattenziekte, Parvo</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">12 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">NKP (2e prik)</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Tweede kitten-vaccinatie (herhaling voor volledige bescherming)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">12-16 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">Rabiës (optioneel)</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Alleen indien kat naar buitenland gaat of buitenkat wordt</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">12-16 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">FeLV (optioneel)</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Kattenleukemie voor (toekomstige) buitenkatten - 2 prikken met 3-4 weken tussenruimte</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">15-16 maanden</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">NKP herhaling</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Eerste jaarlijkse herhaling van kernvaccinaties</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">Jaarlijks</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">NKP</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Jaarlijkse herhaling voor blijvende bescherming (of volgens advies dierenarts)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">Jaarlijks</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">FeLV (indien toegepast)</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Jaarlijkse herhaling voor buitenkatten</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">Om de 3 jaar</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">Rabiës herhaling</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Alleen indien toegepast - of volgens EU-reisvoorschriften</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
              <span><strong>Let op:</strong> Dit is een standaard schema. Je dierenarts kan een aangepast schema adviseren, afhankelijk van of je kat binnen blijft of naar buiten gaat. Sommige dierenartsen adviseren voor binnenkatten een 3-jaarlijks schema na de eerste herhalingsvaccinatie.</span>
            </p>
          </div>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Euro className="h-7 w-7 text-cpCoral" />
            Kosten van Kattenvacinaties in Nederland
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De kosten van vaccinaties voor katten variëren per dierenartspraktijk en regio. Hieronder een indicatie van gemiddelde prijzen in 2025:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Kitten vaccinatiepakket (compleet)</p>
              <p className="text-2xl font-bold text-cpCoral">€ 120 - € 180</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">2-3 consulten met NKP vaccinaties</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Jaarlijkse herhalingsvaccinatie NKP</p>
              <p className="text-2xl font-bold text-cpCoral">€ 40 - € 70</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Inclusief consult en injectie</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Rabiës vaccinatie (enkelvoudig)</p>
              <p className="text-2xl font-bold text-cpCoral">€ 30 - € 55</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Verplicht voor reizen binnen EU</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Kattenleukemie (FeLV) vaccinatie</p>
              <p className="text-2xl font-bold text-cpCoral">€ 35 - € 60</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Voor buitenkatten (2 prikken eerste keer)</p>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Tip:</strong> Veel dierenartspraktijken bieden kittenpakketten aan met korting wanneer je alle vaccinaties in één keer afneemt. Vraag ook naar combi-deals met chippen en castratie/sterilisatie.
            </p>
          </div>
        </section>

        {/* Bijwerkingen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-7 w-7 text-cpCoral" />
            Bijwerkingen van Kattenvacinaties
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Kattenvacinaties zijn over het algemeen veilig. De meeste katten hebben geen of slechts milde bijwerkingen. Hier is wat je kunt verwachten:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Veelvoorkomende, milde bijwerkingen (1-2 dagen)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Moe of slaperig gedrag voor 24-48 uur</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Kleine zwelling of gevoeligheid op de injectieplaats</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Minder eetlust gedurende 1 dag</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Lichte verhoging temperatuur</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Niezen (bij neusspray vaccinaties tegen kattengriep)</span>
                </li>
              </ul>
            </div>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Zeldzame maar ernstige bijwerkingen (neem contact op met dierenarts)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Allergische reactie (zwelling van gezicht, benauwdheid, braken binnen 15 minuten)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Harde bult op injectieplaats die na 1 maand nog aanwezig is (mogelijk vaccin-geassocieerd sarcoom - zeer zeldzaam)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Lusteloosheid langer dan 2 dagen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Aanhoudende diarree of braken</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Belangrijk:</strong> Laat je kat na vaccinatie minimaal 20-30 minuten in de wachtkamer van de dierenarts blijven om ernstige allergische reacties uit te sluiten. Houd je kat de eerste dag na vaccinatie binnen en rustig.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/dierengezondheid/vaccinaties-honden" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vaccinaties voor Honden</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Compleet overzicht van hondenvacinaties en schema →</p>
            </Link>
            <Link href="/nl/dierengezondheid/vlooien-teken-huisdieren" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vlooien en Teken bij Katten</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Preventie en behandeling van parasieten →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Kattenvacinaties
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet een binnenkat ook gevaccineerd worden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, ook binnenkatten moeten tegen kattenziekte en kattengriep gevaccineerd worden. Deze virussen kunnen via kleding, schoenen of andere huisdieren binnenkomen. Kattenziekte is zo besmettelijk dat het virus maanden buiten een kat kan overleven. Rabiës en kattenleukemie zijn optioneel voor binnenkatten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik kitten vaccinaties uitstellen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Het is sterk afgeraden om kitten vaccinaties uit te stellen. Kittens zijn zeer kwetsbaar voor infecties omdat hun immuunsysteem nog niet volledig ontwikkeld is. De eerste vaccinatie op 8-9 weken is cruciaal. Wel kun je in overleg met je dierenarts het schema licht aanpassen (bijvoorbeeld bij een zieke kitten).
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoe lang is mijn kat beschermd na vaccinatie?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Dit verschilt per vaccinatie. Kattenziekte en kattengriep kunnen 3 jaar bescherming bieden na volledige vaccinatie, maar veel dierenartsen adviseren jaarlijkse herhaling, vooral voor buitenkatten. Rabiës is officieel 3 jaar geldig. Kattenleukemie moet jaarlijks herhaald worden voor volledige bescherming.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen NKP en DHP vaccinatie?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                NKP staat voor Niesziekte, Kattenziekte en Parvo - dit is het standaard kattenvaccinatiepakket. DHP is de hondenvaccinatie (Distemper, Hepatitis, Parvo). Soms wordt NKP ook aangeduid als RCP (Rhinotracheïtis, Calicivirus, Panleukopenie). Het betreft dezelfde kernvaccinaties voor katten.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Op zoek naar meer informatie over huisdiergezondheid en -diensten?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/nl/nederland">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
          </div>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Vaccinaties voor Katten: Welke zijn Verplicht?",
            "description": "Complete gids voor kattenvacinaties: welke zijn verplicht, vaccinatieschema voor kittens en volwassen katten, kosten en bijwerkingen.",
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
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/nl/dierengezondheid/vaccinaties-katten"
            }
          })
        }}
      />
    </div>
  );
}
