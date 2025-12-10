/**
 * SEO Landing Page: Vaccinaties voor honden
 * Pillar: Dierengezondheid (Pet Health)
 * Target: Dutch pet owners seeking dog vaccination information
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Syringe, Calendar, AlertCircle, Euro, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Vaccinaties voor Honden: Schema, Kosten en Bijwerkingen 2025",
  description: "Compleet overzicht van hondenvacinaties: welke verplicht zijn, vaccinatieschema, kosten per vaccin en mogelijke bijwerkingen. Vind een dierenarts bij jou in de buurt.",
  keywords: [
    "vaccinaties hond",
    "hondenvacinaties",
    "vaccinatieschema hond",
    "kosten hondenvacinatie",
    "puppy vaccinatie",
    "verplichte vaccinaties hond",
    "bijwerkingen hondenvaccinatie",
    "dierenarts vaccinatie"
  ],
  openGraph: {
    title: "Vaccinaties voor Honden: Schema, Kosten en Bijwerkingen",
    description: "Compleet overzicht van hondenvacinaties in Nederland. Leer alles over schema's, kosten en bijwerkingen.",
    type: "article",
  },
};

export default function VaccinatiesHondenPage() {
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
            Vaccinaties voor Honden: Schema, Kosten en Bijwerkingen
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Vaccinaties beschermen je hond tegen levensbedreigende ziektes. Ontdek welke vaccinaties je hond nodig heeft, wat het kost en waar je op moet letten.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🩺 Tijd voor een vaccinatie of gezondheidscheck?
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
            Vaccinaties zijn een essentieel onderdeel van de gezondheidszorg voor je hond. Ze beschermen tegen ernstige, soms dodelijke infectieziektes zoals hondsdolheid, parvovirose en hondenziekte. In Nederland volgen we specifieke vaccinatieschema's die zorgen voor optimale bescherming gedurende het hele leven van je hond.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Of je nu net een puppy hebt of een volwassen hond, het is belangrijk om op de hoogte te zijn van welke vaccinaties nodig zijn, wanneer ze gegeven moeten worden en wat je kunt verwachten qua kosten en mogelijke bijwerkingen.
          </p>
        </section>

        {/* Verplichte Vaccinaties */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Verplichte en Aanbevolen Vaccinaties voor Honden
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Kernvaccinaties (Verplicht)</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Hondsdolheid (Rabiës)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Verplicht voor reizen binnen EU en voor honden ouder dan 12 weken. Beschermt tegen het dodelijke rabiësvirus.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Parvovirose (Parvo)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Zeer besmettelijk virus dat vooral puppy's treft. Veroorzaakt ernstige diarree en braken.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Hondenziekte (Distemper)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Levensbedreigende virusinfectie die luchtwegen, spijsvertering en zenuwstelsel aantast.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Hepatitis Contagiosa Canis (HCC)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Virale infectie van de lever die vooral jonge honden treft.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Niet-kernvaccinaties (Optioneel)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Leptospirose</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Aanbevolen voor honden die buiten komen en in contact kunnen komen met wilde dieren of besmet water.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kennelhoest (Bordetella)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Belangrijk voor honden die vaak in contact komen met andere honden (hondenopvang, training).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Ziekte van Lyme</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Overweeg dit als je hond veel in gebieden met teken komt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vaccinatieschema */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Vaccinatieschema voor Honden
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
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">6-8 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">DHP</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Eerste puppy-vaccinatie (Distemper, Hepatitis, Parvo)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">9 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">DHP + L</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Tweede puppy-vaccinatie + Leptospirose</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">12 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">DHP + L</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Derde puppy-vaccinatie (herhaling)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">16 weken</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">Rabiës</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Eerste hondsdolheid vaccinatie (verplicht voor reizen)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">15 maanden</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">DHP + L + R</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Eerste herhalingsvaccinatie (volledige set)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">Jaarlijks</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">L</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Leptospirose (jaarlijks herhalen)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream font-medium">Om de 3 jaar</td>
                    <td className="px-6 py-4 text-sm text-foreground dark:text-cpCream">DHP + R</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground dark:text-cpCream/70">Kernvaccinaties herhalen (of volgens titertest)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
              <span><strong>Let op:</strong> Dit is een standaard vaccinatieschema. Je dierenarts kan een aangepast schema adviseren op basis van de levensstijl en gezondheidstoestand van je hond.</span>
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Zoek een Dierenarts voor Vaccinaties
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Vind betrouwbare dierenpraktijken in jouw regio met vaccinatie-expertise en transparante prijzen.
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

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Euro className="h-7 w-7 text-cpCoral" />
            Kosten van Hondenvacinaties in Nederland
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            De kosten van vaccinaties kunnen variëren per dierenartspraktijk en regio. Hieronder vind je een indicatie van de gemiddelde prijzen in 2025:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Puppy vaccinatieschema (compleet)</p>
              <p className="text-2xl font-bold text-cpCoral">€ 150 - € 250</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Inclusief 3-4 consulten en alle kernvaccinaties</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Jaarlijkse herhalingsvaccinatie</p>
              <p className="text-2xl font-bold text-cpCoral">€ 45 - € 85</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Afhankelijk van welke vaccinaties nodig zijn</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Rabiës vaccinatie (enkelvoudig)</p>
              <p className="text-2xl font-bold text-cpCoral">€ 30 - € 55</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Verplicht voor reizen binnen EU</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-1">Kennelhoest vaccinatie</p>
              <p className="text-2xl font-bold text-cpCoral">€ 35 - € 60</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60 mt-2">Aanbevolen voor sociale honden</p>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Let op:</strong> Veel dierenartspraktijken bieden vaccinatiepakketten aan met korting. Vraag ook naar mogelijke spreiding van de kosten bij puppy's. Consult- en injectiekosten zijn vaak bij de vaccinatieprijs inbegrepen.
            </p>
          </div>
        </section>

        {/* Bijwerkingen */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-7 w-7 text-cpCoral" />
            Mogelijke Bijwerkingen van Vaccinaties
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Vaccinaties zijn over het algemeen zeer veilig, maar net als bij menselijke vaccinaties kunnen er bijwerkingen optreden. De meeste bijwerkingen zijn mild en van korte duur.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Veel voorkomende, milde bijwerkingen (1-2 dagen)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Moe of lusteloos gedrag gedurende 24-48 uur na vaccinatie</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Lichte pijn of zwelling op de injectieplaats</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Verminderde eetlust</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Lichte koorts (&lt;39.5°C)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Lichte niezen (bij neusspray vaccinaties)</span>
                </li>
              </ul>
            </div>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Zeldzame, ernstige bijwerkingen (neem contact op met dierenarts)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Allergische reactie binnen 15 minuten (zwelling gezicht, ademhalingsproblemen, braken)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Aanhoudende zwelling of pijnlijke bult op injectieplaats na 1 week</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Blijvende lusteloosheid langer dan 2 dagen</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Hoge koorts (&gt;40°C) of stuipen</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Tips na vaccinatie:</strong> Laat je hond 24 uur rust houden na een vaccinatie. Vermijd intensieve inspanning en houd je hond in de gaten op eventuele ongewone symptomen. Bij twijfel, neem altijd contact op met je dierenarts.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Meer over Dierengezondheid
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/nl/dierengezondheid/vaccinaties-katten" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Vaccinaties voor Katten</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees alles over kattenvacinaties en welke verplicht zijn →</p>
            </Link>
            <Link href="/nl/dierengezondheid/wanneer-naar-dierenarts" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Wanneer naar de Dierenarts?</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">10 waarschuwingssignalen dat je hond medische hulp nodig heeft →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Hondenvacinaties
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer mag mijn puppy naar buiten na vaccinatie?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Je puppy mag ongeveer 1-2 weken na de laatste kernvaccinatie (meestal rond 14-16 weken) veilig naar buiten en met andere honden in contact komen. Voor die tijd is het risico op besmetting met parvovirose en hondenziekte te groot. Je mag wel je puppy dragen of in een tas naar buiten nemen voor socialisatie.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn hondenvacinaties verplicht in Nederland?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                In Nederland zelf zijn vaccinaties niet wettelijk verplicht. Wel is een rabiësvaccinatie verplicht als je met je hond de grens over wilt (binnen EU). Daarnaast eisen veel hondenopvangen, trainingsfaciliteiten en trimsalons een bewijs van vaccinatie voordat je hond welkom is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is een titertest en wanneer is die zinvol?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Een titertest meet de hoeveelheid antistoffen in het bloed van je hond tegen specifieke ziektes. Dit kan nuttig zijn om te bepalen of je hond nog beschermd is en een herhalingsvaccinatie echt nodig is. Let op: een titertest kost vaak meer dan een vaccinatie zelf (€60-€120) en is niet geschikt voor alle vaccinaties (bijvoorbeeld niet voor leptospirose).
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik vaccinaties uitstellen of overslaan?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Het is sterk afgeraden om puppy-vaccinaties uit te stellen, omdat puppy's extra kwetsbaar zijn voor levensbedreigende infecties. Voor volwassen honden kun je in overleg met je dierenarts een aangepast schema maken. Sommige vaccinaties zoals DHP kunnen om de 3 jaar in plaats van jaarlijks, maar leptospirose moet wel jaarlijks herhaald worden voor volledige bescherming.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Op zoek naar meer informatie over huisdiergezondheid en diensten?
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
            "headline": "Vaccinaties voor Honden: Schema, Kosten en Bijwerkingen",
            "description": "Compleet overzicht van hondenvacinaties: welke verplicht zijn, vaccinatieschema, kosten per vaccin en mogelijke bijwerkingen.",
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
              "@id": "https://cutiepawspedia.com/nl/dierengezondheid/vaccinaties-honden"
            }
          })
        }}
      />
    </div>
  );
}
