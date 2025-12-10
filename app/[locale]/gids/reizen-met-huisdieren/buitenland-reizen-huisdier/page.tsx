/**
 * SEO Landing Page: Reizen naar het buitenland met huisdier
 * Pillar: Reizen met Huisdieren
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Globe, FileText, AlertTriangle, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reizen naar het buitenland met huisdier: complete checklist 2025",
  description: "Alles wat je moet weten over reizen naar het buitenland met je hond of kat. Van EU-paspoort tot vaccinaties: volledige checklist en landspecifieke eisen.",
  keywords: "huisdier buitenland, EU huisdierpaspoort, reizen hond europa, vaccinaties huisdier buitenland, rabiës vaccinatie",
  openGraph: {
    title: "Reizen naar het buitenland met huisdier: checklist",
    description: "Complete gids voor internationale reizen met je huisdier. Alle documenten, vaccinaties en tips.",
    type: "article",
  },
};

export default function BuitenlandReizenHuisdierPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Globe className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Reizen met Huisdieren</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Reizen naar het buitenland met huisdier: complete checklist
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Op vakantie naar het buitenland met je hond of kat? Goede voorbereiding is essentieel. Deze complete gids loodst je door alle benodigde documenten, vaccinaties en landspecifieke eisen zodat je zorgeloos kunt genieten van je vakantie.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Reischeck nodig voor je vakantie?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Vind een dierenarts bij jou in de buurt voor vaccinaties, EU-paspoort en gezondheidscontrole.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/nl/netherlands">
                    Vind een dierenarts →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Basisvereisten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Basisvereisten voor reizen met huisdieren
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Begin minstens 3-4 maanden van tevoren!
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Sommige vaccinaties en procedures hebben wachttijden. De rabiësvaccinatie moet bijvoorbeeld minimaal 21 dagen oud zijn. Voor sommige landen buiten de EU moet je zelfs een bloedtest doen met een wachttijd van 3 maanden.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔬</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    1. Microchip (verplicht)
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Je huisdier moet gechipt zijn volgens ISO-norm 11784 of 11785. De chip moet geplaatst zijn vóór de rabiësvaccinatie. Alternatief: tatoeage aangebracht vóór 3 juli 2011.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💉</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    2. Rabiësvaccinatie (hondsdolheid)
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Verplichte vaccinatie tegen rabiës, minimaal 21 dagen voor vertrek. De vaccinatie moet geldig zijn tijdens de gehele reis. Eerste vaccinatie geldig na 21 dagen, herhaalprik direct geldig als binnen geldigheidsduur van vorige prik.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📘</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    3. EU-huisdierpaspoort (binnen EU)
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Voor reizen binnen de EU. Verkrijgbaar bij de dierenarts. Bevat: chipnummer, rabiësvaccinatie, eigenaargegevens en signalement. Kost ongeveer €25-35. Levenslang geldig zolang vaccinaties up-to-date zijn.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📄</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    4. Gezondheidscertificaat (buiten EU)
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Voor landen buiten de EU. Moet aangevraagd worden bij NVWA. Vereist controle door officiële dierenarts binnen 10 dagen voor vertrek. Kosten: ongeveer €50-150 afhankelijk van bestemming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Binnen vs buiten EU */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Reizen binnen of buiten de EU
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Binnen EU */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🇪🇺</span>
                Binnen de EU
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Relatief eenvoudig met gestandaardiseerde regels
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>EU-huisdierpaspoort volstaat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Microchip + rabiësvaccinatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Maximaal 5 huisdieren per persoon</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Geen quarantaine vereist</span>
                </li>
              </ul>
            </div>

            {/* Buiten EU */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Buiten de EU
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Extra eisen en voorbereidingstijd nodig
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Gezondheidscertificaat NVWA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vaak rabiës-titertest (3 maanden)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Mogelijk importvergunning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Soms quarantaine bij aankomst</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border-l-4 border-cpAmber">
            <p className="text-sm text-foreground dark:text-cpCream/90">
              <strong>Brexit-gevolgen:</strong> VK en Zwitserland worden nu als niet-EU landen beschouwd. Check altijd de actuele eisen op de website van de NVWA of de ambassade van het land waar je naartoe gaat.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Huisdier kan niet mee op reis?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Vind een betrouwbaar dierenpension bij jou in de buurt voor liefdevolle opvang tijdens je vakantie.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/nl/netherlands">
              Vind een dierenpension →
            </Link>
          </Button>
        </div>

        {/* Landspecifieke eisen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Belangrijke landspecifieke eisen
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🇬🇧</span> Verenigd Koninkrijk & Ierland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Extra eis:</strong> Behandeling tegen lintworm (Echinococcus) tussen 24-120 uur voor aankomst. Moet in EU-paspoort vermeld worden door dierenarts.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Let op: VK heeft sinds Brexit strengere regels. Check altijd gov.uk voor actuele informatie.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🇫🇮</span> Finland, Ierland, Malta, Noorwegen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Extra eis:</strong> Behandeling tegen lintworm verplicht. Voor Finland ook behandeling tegen vossenlintworm binnen 30 dagen voor aankomst.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🇪🇸</span> Spanje
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Extra tip:</strong> In sommige regio's zijn extra vaccinaties tegen leishmaniose aan te raden (geen verplichting). Bescherm je hond tegen zandvliegen, vooral in Zuid-Spanje.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🇺🇸</span> Verenigde Staten
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Extra eisen:</strong> Rabiës-titertest verplicht (wachttijd 3 maanden na bloedafname). CDC-import formulier. Gezondheidscertificaat binnen 10 dagen voor vertrek. Quarantaine niet verplicht bij correcte documenten.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-xl">🇦🇺</span> Australië & Nieuw-Zeeland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                <strong>Zeer streng:</strong> Verplichte quarantaine van 10 dagen (Australië) tot 10 dagen (NZ). Importvergunning nodig. Uitgebreide bloedtests. Begin minimaal 6-8 maanden van tevoren met voorbereidingen.
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Complete checklist: 3 maanden voor vertrek
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-4">
              📅 3 maanden voor vertrek
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Check landspecifieke eisen op NVWA website</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Microchip laten plaatsen (als nog niet gebeurd)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Rabiësvaccinatie laten bijwerken indien nodig</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Rabiës-titertest indien vereist (buiten EU)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Aanvraag importvergunning indien vereist</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-4">
              📅 1 maand voor vertrek
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>EU-huisdierpaspoort ophalen bij dierenarts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Controleer geldigheid alle vaccinaties</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Boek vlucht/accommodatie met huisdier</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Bespreek reisziekte preventie met dierenarts</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-4">
              📅 1 week voor vertrek
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Gezondheidscertificaat aanvragen (buiten EU)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Lintwormbehandeling indien vereist (24-120u voor aankomst)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Pak reistas: voer, medicatie, paspoort, speelgoed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Zoek dierenarts op bestemming op (noodgevallen)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span>Kopieer alle documenten (digitaal + papier)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Kosten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wat zijn de kosten?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20">
            <table className="w-full">
              <thead className="bg-cpCoral/10 dark:bg-cpCoral/20">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground dark:text-cpCream">
                    Onderdeel
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground dark:text-cpCream">
                    Kosten
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Microchip plaatsen</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€25-40</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Rabiësvaccinatie</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€35-50</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">EU-huisdierpaspoort</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€25-35</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Rabiës-titertest (buiten EU)</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€100-150</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Gezondheidscertificaat NVWA</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€50-150</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">Lintwormbehandeling</td>
                  <td className="p-4 text-muted-foreground dark:text-cpCream/80">€15-25</td>
                </tr>
                <tr className="font-semibold">
                  <td className="p-4 text-foreground dark:text-cpCream">Totaal (binnen EU)</td>
                  <td className="p-4 text-foreground dark:text-cpCream">€85-125</td>
                </tr>
                <tr className="font-semibold">
                  <td className="p-4 text-foreground dark:text-cpCream">Totaal (buiten EU)</td>
                  <td className="p-4 text-foreground dark:text-cpCream">€235-375</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Lees ook
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/nl/gids/reizen-met-huisdieren/vliegen-met-huisdier"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                ✈️ Vliegen met huisdier
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Regels, kosten en tips voor vliegen met je hond of kat →
              </p>
            </Link>

            <Link
              href="/nl/gids/reizen-met-huisdieren/reizen-hond-auto"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🚗 Veilig reizen in auto
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Tips voor veilig autorijden met je hond naar je bestemming →
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wanneer moet ik beginnen met voorbereiden?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Begin minimaal 3-4 maanden van tevoren. De rabiësvaccinatie heeft een wachttijd van 21 dagen, en voor sommige landen buiten de EU moet je een bloedtest doen met een wachttijd van 3 maanden. Voor Australië en Nieuw-Zeeland raden we aan om 6-8 maanden van tevoren te starten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen EU-paspoort en gezondheidscertificaat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Het EU-huisdierpaspoort is geldig voor reizen binnen de EU en volstaat daar voor onbeperkte tijd (zolang vaccinaties up-to-date zijn). Een gezondheidscertificaat is nodig voor landen buiten de EU, moet aangevraagd worden via de NVWA, en is meestal 10 dagen tot 4 maanden geldig.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik met meerdere huisdieren reizen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Binnen de EU mag je maximaal 5 huisdieren per persoon meenemen voor niet-commerciële doeleinden. Voor meer dan 5 dieren gelden andere regels. Check altijd de regels van het specifieke land - sommige landen hebben strengere limieten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet mijn kat ook een rabiësvaccinatie?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Ja, de rabiësvaccinatie is verplicht voor alle honden, katten en fretten die over de grens gaan. Dit geldt ook voor binnenkatten die normaal nooit buiten komen. De vaccinatie moet minimaal 21 dagen voor vertrek zijn gegeven.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Vind een dierenarts voor je reisvoorbereiding
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Laat je hond of kat controleren en zorg voor alle benodigde vaccinaties en documenten.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/nl/netherlands">
              Vind een dierenarts →
            </Link>
          </Button>
        </div>
      </article>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Reizen naar het buitenland met huisdier: complete checklist",
            "description": "Complete gids voor reizen met je huisdier naar het buitenland. Alle documenten, vaccinaties en landspecifieke eisen op een rij.",
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
            "dateModified": "2025-01-15"
          })
        }}
      />
    </div>
  );
}
