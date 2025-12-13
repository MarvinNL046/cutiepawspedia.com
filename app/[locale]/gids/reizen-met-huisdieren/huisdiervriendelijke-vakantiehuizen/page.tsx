/**
 * SEO Landing Page: Huisdiervriendelijke vakantiehuizen
 * Pillar: Reizen met Huisdieren
 */

import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Home, MapPin, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Huisdiervriendelijke vakantiehuizen Nederland 2025 | CutiePawsPedia",
  description: "Vind de perfecte huisdiervriendelijke vakantiewoning in Nederland. Huisjes met omheinde tuin, hondenstranden dichtbij en alle voorzieningen voor je hond of kat.",
  keywords: "huisdiervriendelijk vakantiehuis, vakantie met hond nederland, hondvriendelijke accommodatie, omheinde tuin vakantie",
  openGraph: {
    title: "Huisdiervriendelijke vakantiehuizen in Nederland",
    description: "Vind een vakantiehuis waar je hond of kat welkom is. Met omheinde tuin en alle comfort.",
    type: "article",
  },
};

export default function HuisdiervriendelijkeVakantiehuizenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Home className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Reizen met Huisdieren</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Huisdiervriendelijke vakantiehuizen in Nederland
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Op vakantie met je hond of kat? Ontdek de beste huisdiervriendelijke vakantiehuizen in Nederland. Van bungalows met omheinde tuin tot luxe lodges bij hondenstranden - vind de perfecte uitvalsbasis voor een onvergetelijke vakantie met je viervoeter.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Hond kan toch niet mee?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Vind een betrouwbaar dierenpension bij jou in de buurt voor liefdevolle opvang tijdens je vakantie.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/nl/netherlands">
                    Vind een dierenpension →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Waar op letten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waar let je op bij een huisdiervriendelijk vakantiehuis?
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌳</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Omheinde tuin
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Een volledig omheinde tuin is ideaal zodat je hond veilig los kan lopen. Check of de omheining hoog en stevig genoeg is voor je hond. Let op poorten die niet goed sluiten.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🐾</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Aantal huisdieren toegestaan
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Sommige huizen accepteren maar 1 huisdier, andere 2 of meer. Check ook of er een toeslag per huisdier is. Meestal €25-50 per huisdier per week. Informeer naar rasrestricties.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏖️</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Ligging en wandelmogelijkheden
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Check of er bossen, hondenstrand of wandelroutes in de buurt zijn. Is het huis vrij gelegen of in een park met andere vakantiegangers? Een rustige locatie is vaak prettiger voor nerveuze honden.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Faciliteiten in het huis
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Zijn er stoffen meubels of leer (makkelijker schoon)? Zijn er tegelvloeren (gemakkelijk reinigen bij modder)? Sommige huizen bieden hondenvoorzieningen zoals mandjes, voerbakken of een wasplaats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6">
            <p className="text-sm text-foreground dark:text-cpCream/90 leading-relaxed">
              <strong>Tip:</strong> Lees reviews van andere huisdierenbezitters. Zij geven vaak eerlijke feedback over de geschiktheid van het huis en de omgeving voor honden.
            </p>
          </div>
        </section>

        {/* Populaire regio's */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cpCoral" />
            Populaire regio's voor vakantie met hond
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Veluwe */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🌲</span>
                Veluwe
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Ideaal voor actieve honden: uitgestrekte bossen, heidevelden en onbeperkte wandelmogelijkheden.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Nationaal Park Hoge Veluwe met vrij losloopgebieden</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vele bungalowparken met omheinde tuinen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Hondvriendelijke restaurants en terrassen</span>
                </li>
              </ul>
            </div>

            {/* Zeeland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🏖️</span>
                Zeeland
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Perfect voor strandliefhebbers: vele hondenstranden en duingebieden om te verkennen.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Hondenstranden bij Domburg, Cadzand en Renesse</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Duingebieden en natuurreservaten</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Luxe vakantiehuizen met zeezicht</span>
                </li>
              </ul>
            </div>

            {/* Drenthe */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">🌾</span>
                Drenthe
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Rust en ruimte: ideaal voor honden die van rust en lange wandelingen houden.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Dwingelderveld met uitgestrekte heidevelden</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Betaalbare vakantiehuizen met grote tuinen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Veel ruimte, weinig drukte</span>
                </li>
              </ul>
            </div>

            {/* Limburg */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-2xl">⛰️</span>
                Limburg
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Heuvelachtig landschap: afwisselende wandelingen en veel terrasjes voor een drankje.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Heuvellandschap met uitdagende wandelroutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Veel hondvriendelijke terrassen en restaurants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Gemoedelijke sfeer en gastvrij</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Reischeck voor je vakantie?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Laat je hond checken bij de dierenarts voordat je op vakantie gaat. Vooral belangrijk bij reizen naar het buitenland.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/nl/netherlands">
              Vind een dierenarts →
            </Link>
          </Button>
        </div>

        {/* Boekingsplatforms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Waar boek je huisdiervriendelijke vakantiehuizen?
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground dark:text-cpCream">
                  🏡 Landal GreenParks
                </h3>
                <Star className="h-5 w-5 text-cpAmber fill-cpAmber" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Veel parken met speciaal aangepaste huisdiervriendelijke bungalows. Vaak met omheinde tuin en nabij bosgebieden. Sommige parken hebben zelfs hondenstranden en speelveldjes.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                <strong>Toeslag:</strong> Meestal €5-7,50 per huisdier per nacht
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground dark:text-cpCream">
                  🌊 Roompot
                </h3>
                <Star className="h-5 w-5 text-cpAmber fill-cpAmber" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Kustparken met hondenstranden dichtbij. Goede huisdierfaciliteiten en duidelijke filters voor huisdiervriendelijke accommodaties. Extra services zoals hondenuitlaatservice beschikbaar.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                <strong>Toeslag:</strong> Vanaf €39 per huisdier per week
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground dark:text-cpCream">
                  🏘️ Booking.com
                </h3>
                <Star className="h-5 w-5 text-cpAmber fill-cpAmber" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Enorm groot aanbod met goede filters voor "Huisdieren toegestaan". Van basic vakantiehuizen tot luxe villa's. Let wel goed op de voorwaarden per woning.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                <strong>Toeslag:</strong> Verschilt per accommodatie (€10-50 per huisdier)
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground dark:text-cpCream">
                  🐕 DoggyHoliday
                </h3>
                <Star className="h-5 w-5 text-cpAmber fill-cpAmber" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Gespecialiseerd in hondvriendelijke vakantiehuizen. Alle accommodaties zijn persoonlijk gecontroleerd en gericht op optimaal comfort voor honden. Vaak met luxe voorzieningen.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                <strong>Toeslag:</strong> Meestal inbegrepen in de prijs
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Checklist voor je huisdier op vakantie
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Vaccinatieboekje en EU-paspoort",
                "Voldoende voer en medicatie",
                "Eigen mand of deken (vertrouwde geur)",
                "Voer- en drinkbak",
                "Leiband en eventueel flexilijn",
                "Speelgoed en kauwsnacks",
                "Handdoeken voor natte poten",
                "Vuilniszakjes voor uitwerpselen",
                "Contactgegevens dierenarts bestemming",
                "Anti-vlo/teek middel (vooral zomer)",
                "Eventueel reisbench voor in auto",
                "Hondenpenning met contactinfo"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Lees ook
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/nl/gids/reizen-met-huisdieren/hondenstranden-nederland"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🏖️ Hondenstranden
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Ontdek alle hondenstranden in Nederland per provincie →
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
                Tips voor veilig autorijden met je hond naar je vakantiebestemming →
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
                Wat kost een huisdiervriendelijk vakantiehuis gemiddeld extra?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                De toeslag voor huisdieren varieert van €25 tot €50 per huisdier per week bij bungalowparken. Bij particuliere verhuur kan dit lager zijn of zelfs gratis. Sommige luxe accommodaties rekenen tot €100 per week voor extra schoonmaak.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel huisdieren mag ik meenemen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Dat verschilt per accommodatie. De meeste vakantiehuizen accepteren 1-2 huisdieren. Bij bungalowparken ligt de limiet vaak op maximaal 2 honden. Check altijd vooraf en meld alle huisdieren aan bij de boeking.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Zijn er rasrestricties bij vakantiehuizen?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Sommige accommodaties en parken hebben restricties voor zogenaamde 'gevaarlijke rassen' zoals Pitbulls, Staffords of Rottweilers. Dit komt vooral voor bij grotere parken. Bij particuliere verhuur is er vaak meer flexibiliteit. Informeer altijd vooraf.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Moet ik een borg betalen voor schade door mijn huisdier?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Bij de meeste accommodaties wordt standaard een borg gevraagd (€100-250). Schade door huisdieren wordt hiervan afgetrokken. Zorg dat je hond geen meubels beschadigt en reinig grondig voor vertrek. Sommige verzekeringen dekken schade door huisdieren op vakantie.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ontdek alle huisdierservices bij jou in de buurt
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Van dierenpensions tot hondentrainers: vind betrouwbare professionals voor je huisdier.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/nl/netherlands">
              Bekijk alle services →
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
            "headline": "Huisdiervriendelijke vakantiehuizen in Nederland",
            "description": "Complete gids voor het vinden van de perfecte huisdiervriendelijke vakantiewoning. Tips, regio's en boekingsplatforms.",
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

      <GidsBreadcrumbs
        items={[
          { label: "Reizen met Huisdieren", href: "/nl/gids/reizen-met-huisdieren" },
          { label: "Huisdiervriendelijke vakantiehuizen" }
        ]}
      />
    </div>
  );
}
