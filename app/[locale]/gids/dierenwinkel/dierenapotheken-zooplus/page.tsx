import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ShieldAlert, Info, AlertTriangle } from "lucide-react";

import { GidsBreadcrumbs } from "@/components/gids";
export const metadata: Metadata = {
  title: "Zooplus Dierenapotheken: Gezondheidsproducten voor Hond & Kat",
  description: "Ontdek vlooien- en tekenbestrijding, ontwormingsmiddelen en supplementen bij zooplus. Frontline, Advantix, Seresto en meer tegen apotheekprijzen.",
  keywords: "zooplus apotheek, vlooienbestrijding hond, tekenbestrijding, ontwormingsmiddel, Frontline, Advantix, Seresto, Bravecto, gewrichtssupplementen hond",
  openGraph: {
    title: "Zooplus Dierenapotheken: Gezondheidsproducten Online Bestellen",
    description: "Bestel vlooien- en tekenbestrijding, ontwormingsmiddelen en supplementen online bij zooplus.",
  },
};

export default function ZooplusDierenapthothekenPage() {
  return (
    <>
    <GidsBreadcrumbs
        items={[
          { label: "Dierenwinkel", href: "/nl/gids/dierenwinkel" },
          { label: "Zooplus Dierenapotheken" }
        ]}
      />
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <Heart className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Online Dierenapotheken
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Zooplus Dierenapotheken: <span className="text-cpCoral">Gezondheidsproducten voor Jouw Huisdier</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Van vlooien- en tekenbestrijding tot ontwormingsmiddelen en supplementen: bij zooplus vind je een uitgebreid assortiment gezondheidsproducten voor hond en kat. Bestel merken zoals Frontline, Advantix, Seresto en Bravecto gemakkelijk online en vaak goedkoper dan bij de dierenarts.
          </p>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/40 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-1">Belangrijk Medisch Advies</h3>
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  Deze informatie is bedoeld als algemene voorlichting en vervangt geen professioneel veterinair advies. Bij ernstige gezondheidsproblemen, twijfel over symptomen of het gebruik van medicijnen, raadpleeg altijd een dierenarts. Sommige producten zijn alleen verkrijgbaar op recept.
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Bestel gezondheidsproducten voor je huisdier direct bij zooplus
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Bekijk Zooplus Dierenapotheken →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom Zooplus voor Gezondheidsproducten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom Gezondheidsproducten bij Zooplus Bestellen?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Zooplus heeft zich ontwikkeld tot een van de grootste online dierenapotheken in Nederland. Het platform biedt een breed assortiment aan gezondheidsproducten voor honden en katten, vaak tegen scherpere prijzen dan bij de dierenarts of fysieke dierenwinkel.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Voordelen van Zooplus Dierenapotheken:
            </h3>
            <ul className="space-y-2">
              {[
                "Breed assortiment vlooien-, teken- en ontwormingsproducten",
                "Bekende merken zoals Frontline, Advantix, Seresto en Bravecto",
                "Vaak 20-40% goedkoper dan bij de dierenarts",
                "Gemakkelijk thuisbezorgd binnen 1-3 werkdagen",
                "Supplementen voor gewrichten, huid, vacht en algehele gezondheid",
                "Gratis verzending vanaf €49 (vaak bereikt met voordeelverpakkingen)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Het grote voordeel van online bestellen is dat je rustig producten kunt vergelijken, beoordelingen kunt lezen van andere baasjes en vaak flink kunt besparen door voordeelverpakkingen te kiezen. Veel producten die je normaal alleen bij de dierenarts kon krijgen, zijn nu vrij verkrijgbaar via online dierenapotheken.
          </p>
        </section>

        {/* Section 2: Vlooien- en Tekenbestrijding */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Vlooien- en Tekenbestrijding bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Vlooien en teken zijn niet alleen vervelend voor je huisdier, maar kunnen ook ziektes overdragen. Preventie is belangrijk, vooral in de warmere maanden (maart tot en met oktober). Bij zooplus vind je alle populaire merken voor effectieve bescherming.
          </p>

          {/* Frontline */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">Frontline Spot-On & Spray</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Frontline is een van de meest vertrouwde merken voor vlooien- en tekenbestrijding. De spot-on behandeling wordt in de nek gedruppeld en biedt 4-8 weken bescherming tegen vlooien en teken. Ook verkrijgbaar als spray voor directe toepassing. Geschikt voor honden én katten.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">4-8 weken werkzaam</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Hond & kat</span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €25 voor 3 pipetten</p>
          </div>

          {/* Advantix */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">Advantix Spot-On (Alleen Honden)</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Advantix biedt bescherming tegen vlooien, teken, muggen én zandvliegen. Dit maakt het ideaal als je op vakantie gaat naar Zuid-Europa. Let op: Advantix is alleen geschikt voor honden en kan giftig zijn voor katten. Werkzaamheid tot 4 weken.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">4 weken werkzaam</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Alleen honden</span>
              <span className="text-xs bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full">Giftig voor katten</span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €28 voor 4 pipetten</p>
          </div>

          {/* Seresto */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">Seresto Vlooien- en Tekenband</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              De Seresto halsband is een populaire keuze voor langdurige bescherming: tot 8 maanden voor vlooien en teken. De halsband geeft geleidelijk werkzame stoffen af en is waterbestendig. Verkrijgbaar voor kleine en grote honden, en ook voor katten.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Tot 8 maanden werkzaam</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Waterbestendig</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Hond & kat</span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €45 voor 8 maanden bescherming</p>
          </div>

          {/* Bravecto */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">Bravecto Kauwblokjes & Spot-On</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Bravecto biedt maar liefst 12 weken bescherming tegen vlooien en teken met slechts één toediening. Verkrijgbaar als smaakvolle kauwblokjes (honden) of spot-on druppels (honden en katten). Ideaal als je niet elke maand wilt behandelen.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">12 weken werkzaam</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Kauwblokjes of spot-on</span>
              <span className="text-xs bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral px-3 py-1 rounded-full">Hond & kat</span>
            </div>
            <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €35 per behandeling (12 weken)</p>
          </div>
        </section>

        {/* Section 3: Ontwormingsmiddelen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Ontwormingsmiddelen bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Regelmatig ontwormen is belangrijk voor de gezondheid van je huisdier en voorkomt overdracht van wormen naar mensen (vooral kinderen). De frequentie hangt af van het risico: honden die vaak buiten komen of rauw vlees eten moeten vaker ontworm worden (4x per jaar), terwijl binnenkatten 1-2x per jaar voldoende is.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Drontal */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Drontal Tabletten</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Drontal is een breed-spectrum ontwormingsmiddel dat effectief is tegen rondwormen, lintwormen, haakwormen en zweepwormen. Verkrijgbaar voor honden en katten in verschillende sterktes. Eenmalige toediening per behandeling.
              </p>
              <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €8 voor 2 tabletten</p>
            </div>

            {/* Milbemax */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Milbemax Tabletten</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Milbemax werkt tegen rondwormen, haakwormen, zweepwormen en lintwormen. Ook effectief als preventie tegen hartworm. Kleine, gemakkelijk te doseren tabletten. Geschikt voor honden, pups, katten en kittens vanaf 6 weken.
              </p>
              <p className="text-sm text-cpCoral font-medium">✓ Prijs: vanaf €10 voor 2 tabletten</p>
            </div>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Ontwormingsschema
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span><strong>Pups/kittens:</strong> Vanaf 2 weken oud, daarna elke 2 weken tot 8 weken oud, vervolgens maandelijks tot 6 maanden oud</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span><strong>Honden (hoog risico):</strong> 4x per jaar (elke 3 maanden) - voor honden die vaak buiten komen, rauw vlees eten of veel contact met andere dieren hebben</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span><strong>Katten (binnen):</strong> 1-2x per jaar voldoende voor binnenkatten zonder toegang naar buiten</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span><strong>Katten (buiten):</strong> 4x per jaar voor katten die regelmatig buiten komen</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Middle CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-12">
          <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
            Gezondheidsproducten voor Jouw Huisdier
          </h3>
          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
            Bestel vlooien- en tekenbestrijding, ontwormingsmiddelen en supplementen direct bij zooplus. Gratis verzending vanaf €49.
          </p>
          <a
            href="https://go.cutiepawspedia.com/zooplus.nl"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
          >
            Shop Zooplus Dierenapotheken →
          </a>
        </div>

        {/* Section 4: Supplementen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Supplementen voor Honden en Katten
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Naast basisvoeding kunnen supplementen bijdragen aan de algehele gezondheid van je huisdier. Vooral bij oudere dieren, honden met gewrichtsproblemen of huisdieren met specifieke gezondheidsbehoeften kunnen supplementen een waardevolle aanvulling zijn.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Gewrichtssupplementen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Glucosamine, chondroïtine en MSM ondersteunen gezonde gewrichten en kraakbeen. Ideaal voor oudere honden, grote rassen en honden met artrose. Merken: YuMOVE, Flexadin, Cosequin.
              </p>
              <p className="text-xs text-cpCoral">€20-€45 per verpakking (1-2 maanden)</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Omega-3 Vetzuren</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Visolie rijk aan EPA en DHA ondersteunt een gezonde huid, glanzende vacht, hart- en gewrichtsgezondheid. Ook goed voor hersenfunctie bij oudere dieren. Verkrijgbaar als capsules of vloeibaar.
              </p>
              <p className="text-xs text-cpCoral">€15-€35 per verpakking</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Probiotica voor Darmen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Ondersteunt een gezonde darmflora en spijsvertering. Nuttig na antibioticakuren, bij diarree of chronische darmproblemen. Verkrijgbaar als poeder, capsules of pasta. Merken: FortiFlora, Protexin.
              </p>
              <p className="text-xs text-cpCoral">€18-€40 per verpakking</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Multivitaminen</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Uitgebalanceerde mix van vitamines en mineralen voor algehele gezondheid. Geschikt voor honden en katten met voedingstekorten, kiesketers of in herstel. Vaak als smaakvolle tabletten.
              </p>
              <p className="text-xs text-cpCoral">€12-€28 per verpakking</p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/40">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-1">Let op bij Supplementen</h3>
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  Overmatige suppletie kan schadelijk zijn. Gebruik supplementen alleen als aanvulling op kwalitatief goed voer en bespreek langdurig gebruik altijd met je dierenarts. Vooral bij katten is voorzichtigheid geboden, omdat ze gevoelig zijn voor overdosering van bepaalde vitamines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Huid- en Vachtverzorging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Huid- en Vachtverzorging bij Zooplus
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Huidproblemen bij honden en katten komen regelmatig voor: jeuk, droge huid, roos, hot spots of allergische reacties. Bij zooplus vind je gespecialiseerde shampoos en verzorgingsproducten die symptomen kunnen verlichten.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Medicinale Shampoos</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                <strong>Voor jeuk en irritatie:</strong> Shampoos met colloïdaal haverextract, aloë vera of tea tree oil kalmeren geïrriteerde huid. Merken: Dermoscent, Douxo, Veterinary Formula. <br/>
                <strong>Voor schimmelinfecties:</strong> Antischimmel shampoos met chloorhexidine of ketoconazol (vaak op voorschrift dierenarts). <br/>
                <strong>Voor gevoelige huid:</strong> Hypoallergene shampoos zonder parfum of harde chemicaliën.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Oorreiniger</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Regelmatig oren reinigen voorkomt oorontstekingen, vooral bij honden met hangoren (Cocker Spaniel, Basset) of honden die vaak zwemmen. Gebruik speciale oorreiniger, nooit wattenstaafjes diep in het oor. Merken: Otodex, Epi-Otic, Otifree.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Wondzorg & Hot Spot Spray</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Voor kleine schaafwonden, krabwonden of hot spots (acute natte dermatitis). Sprays met verzachtende en desinfecterende werking helpen bij genezing en voorkomen infecties. Bij diepe wonden of aanhoudende problemen altijd naar de dierenarts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Gebitsverzorging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Gebitsverzorging voor Hond en Kat
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Tandsteen en tandvleesproblemen zijn veelvoorkomend bij honden en katten, vooral bij kleine rassen en oudere dieren. Regelmatige gebitsverzorging voorkomt pijnlijke tandvleesontsteking, tandsteen en zelfs tandverlies.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-lg font-bold text-cpCoral mb-3">Tandpasta & Tandenborstels</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Speciale tandpasta voor honden en katten in smaken zoals kip of lever maken tandenpoetsen aangenamer. Gebruik nooit menselijke tandpasta (giftig voor huisdieren!). Verkrijgbaar met vingerborstel of tandenborstel.
              </p>
              <p className="text-xs text-cpCoral">✓ Tip: Begin jong en beloon met snacks voor betere acceptatie</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-lg font-bold text-cpCoral mb-3">Dentale Kauwsnacks</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Kauwsnacks zoals Pedigree DentaStix of Whimzees helpen mechanisch tandsteen verwijderen tijdens het kauwen. Let op calorieën en gebruik als aanvulling op, niet vervanging van, tandenpoetsen.
              </p>
              <p className="text-xs text-cpCoral">✓ Dagelijks gebruik voor beste resultaat</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Bij ernstige tandsteen is een professionele gebitreiniging bij de dierenarts nodig (onder narcose). Dit voorkomt pijnlijke ontstekingen en bacteriën die via de bloedbaan naar andere organen kunnen verspreiden.
          </p>
        </section>

        {/* Section 7: Wanneer naar Dierenarts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Wanneer naar de Dierenarts in Plaats van Zelfbehandeling?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Hoewel veel gezondheidsproducten vrij verkrijgbaar zijn, is professioneel veterinair advies essentieel bij bepaalde situaties. Zelfbehandeling kan in sommige gevallen gevaarlijk zijn of onderliggende problemen maskeren.
          </p>

          <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-900/40 mb-6">
            <h3 className="font-bold text-red-900 dark:text-red-300 mb-3 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Raadpleeg ALTIJD een dierenarts bij:
            </h3>
            <ul className="space-y-2">
              {[
                "Ernstige of langdurige symptomen (langer dan 2-3 dagen)",
                "Bloederige diarree of braken",
                "Lethargie, verlies van eetlust of gewichtsverlies",
                "Ademhalingsproblemen of hoesten",
                "Neurologische symptomen (coördinatieproblemen, stuiptrekkingen)",
                "Hevige pijn of agressief gedrag (kan wijzen op pijn)",
                "Vermoedens van vergiftiging",
                "Ernstige huidproblemen met open wonden of infecties",
                "Oogproblemen (troebel, rood, dichtknijpen)",
                "Duidelijke zwelling, bulten of knobbels",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                  <CheckCircle2 className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20 dark:border-cpAqua/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
              Veilig Zelfbehandelen: Richtlijnen
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span>Vlooien- en tekenpreventie: Veilig zonder dierenarts, volg gebruiksaanwijzing</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span>Ontworming: Veilig volgens schema, bij twijfel over infectie eerst dierenarts</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span>Supplementen: Veilig bij gezonde dieren, bespreek langdurig gebruik met dierenarts</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAqua flex-shrink-0 mt-0.5" />
                <span>Milde huidproblemen: Probeer verzachtende shampoo, na 1 week zonder verbetering naar dierenarts</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 8: Prijzen en Besparingen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Prijsvergelijking: Zooplus vs Dierenarts
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Een van de grootste voordelen van online dierenapotheken zoals zooplus is de prijsbesparing. Omdat online retailers lagere overhead kosten hebben en vaak grotere volumes inkopen, kunnen ze scherper prijzen aanbieden.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-card dark:bg-cpSurface/50 rounded-xl overflow-hidden border border-border dark:border-cpAmber/20">
              <thead>
                <tr className="bg-cpCoral/10 dark:bg-cpCoral/5">
                  <th className="px-4 py-3 text-left text-sm font-bold text-foreground dark:text-cpCream">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-foreground dark:text-cpCream">Dierenarts</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-foreground dark:text-cpCream">Zooplus</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-cpCoral">Besparing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground dark:text-cpCream">Frontline Spot-On (3 pip)</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€38-€42</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€25-€28</td>
                  <td className="px-4 py-3 text-sm font-medium text-cpCoral">€10-€17 (26-40%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground dark:text-cpCream">Seresto Halsband (groot)</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€65-€75</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€45-€52</td>
                  <td className="px-4 py-3 text-sm font-medium text-cpCoral">€20-€23 (31%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground dark:text-cpCream">Bravecto Kauwblokje</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€48-€55</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€35-€42</td>
                  <td className="px-4 py-3 text-sm font-medium text-cpCoral">€13-€13 (24-27%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground dark:text-cpCream">Drontal Hond (2 tabl)</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€12-€15</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€8-€10</td>
                  <td className="px-4 py-3 text-sm font-medium text-cpCoral">€4-€5 (33%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground dark:text-cpCream">YuMOVE Gewrichtssupplement</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€38-€45</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground dark:text-cpCream/70">€28-€35</td>
                  <td className="px-4 py-3 text-sm font-medium text-cpCoral">€10 (22-26%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Extra Besparingstips:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                <span><strong>Gratis verzending:</strong> Vanaf €49 bestelbedrag (vaak bereikt met voorraadvoorpakkingen)</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                <span><strong>Grotere verpakkingen:</strong> 6-pack vaak voordeliger dan 3-pack per behandeling</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                <span><strong>Aanbiedingen:</strong> Check regelmatig acties en flash sales op zooplus</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                <CheckCircle2 className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
                <span><strong>Jaarlijkse voorraad:</strong> Bij producten als Seresto bespaar je fors door jaarlijks te kopen</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Dierenapotheken
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is het veilig om gezondheidsproducten online te bestellen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Ja, mits je koopt bij betrouwbare online dierenapotheken zoals zooplus. Deze webshops werken samen met erkende fabrikanten en distribueren originele producten. Let altijd op de vervaldatum en de verpakking (moet onbeschadigd en verzegeld zijn). Bij twijfel over de echtheid of kwaliteit, neem contact op met de klantenservice.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Heb ik een recept nodig voor vlooien- en tekenbestrijding?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De meeste vlooien- en tekenbestrijdingsmiddelen (Frontline, Advantix, Seresto, Bravecto) zijn vrij verkrijgbaar zonder recept. Sommige sterkere preparaten of specifieke medicijnen kunnen wel een recept vereisen. Check altijd de productinformatie op de website. Bij zooplus staat duidelijk vermeld of een product op voorschrift verkrijgbaar is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik honden- en kattenmiddelen door elkaar gebruiken?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Absoluut niet! Dit kan levensgevaarlijk zijn, vooral voor katten. Producten zoals Advantix (voor honden) bevatten permethrine dat dodelijk giftig is voor katten. Gebruik altijd producten die specifiek voor jouw huisdiersoort zijn ontwikkeld en volg de dosering op basis van gewicht. Bij twijfel, raadpleeg je dierenarts.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang duurt levering bij zooplus?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Standaard levering is binnen 1-3 werkdagen in Nederland. Bij bestelling voor 23:59 uur wordt de volgende werkdag verzonden (behalve in het weekend). Gratis verzending vanaf €49, anders €2,99 verzendkosten. Voor spoedbestellingen is express levering mogelijk tegen meerprijs. Je ontvangt altijd een track & trace code.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn supplementen echt nodig of is goed voer voldoende?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor gezonde honden en katten met hoogwaardig voer zijn supplementen meestal niet noodzakelijk. Ze kunnen echter nuttig zijn bij: oudere dieren met gewrichtsproblemen, honden met huidproblemen, herstel na ziekte, zwangerschap/lactatie, of bij bewezen tekorten. Bespreek altijd met je dierenarts of supplementen zinvol zijn voor jouw huisdier en welke dosering veilig is.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Wat is het verschil tussen spot-on en tabletten voor vlooienbestrijding?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Spot-on druppels (Frontline, Advantix) worden op de huid aangebracht en werken lokaal via de huid. Ze zijn niet geschikt bij honden die vaak zwemmen (kan afwassen). Tabletten/kauwblokjes (Bravecto, NexGard) werken systemisch via de bloedbaan en zijn niet gevoelig voor zwemmen of wassen. Tabletten werken vaak langer (12 weken vs 4 weken) maar sommige honden weigeren ze te eten. Kies wat het beste past bij jouw situatie.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bestel Gezondheidsproducten bij Zooplus
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek het volledige assortiment vlooien- en tekenbestrijding, ontwormingsmiddelen, supplementen en verzorgingsproducten voor jouw hond of kat. Gratis verzending vanaf €49.
            </p>
            <a
              href="https://go.cutiepawspedia.com/zooplus.nl"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Shop Zooplus Dierenapotheken →
            </a>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Zooplus Dierenapotheken: Gezondheidsproducten voor Hond & Kat",
              "description": "Uitgebreide gids over gezondheidsproducten bij zooplus: vlooien- en tekenbestrijding, ontwormingsmiddelen, supplementen en verzorgingsproducten.",
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
              "about": [
                {
                  "@type": "Thing",
                  "name": "Vlooienbestrijding"
                },
                {
                  "@type": "Thing",
                  "name": "Tekenbestrijding"
                },
                {
                  "@type": "Thing",
                  "name": "Ontwormingsmiddelen"
                },
                {
                  "@type": "Thing",
                  "name": "Huisdiersupplementen"
                }
              ]
            })
          }}
        />
      </article>
    </div>
    </>
  );
}
