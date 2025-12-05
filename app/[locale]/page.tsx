/**
 * Homepage - Directory Landing Page
 *
 * CACHING STRATEGY: Static + ISR (Incremental Static Regeneration)
 * - revalidate: 300s (5 minutes) - Balances freshness with performance
 * - Data changes infrequently (countries, categories)
 * - First request serves stale, triggers background regeneration
 * - Optimal for SEO and Core Web Vitals (fast TTFB)
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar, CategoryCard, CountryCard, getCategoryIcon } from "@/components/directory";
import { SectionHeader } from "@/components/layout";
import { PageIntro } from "@/components/seo";
import { getCountries, getCategories, getPlaceCount, getCityCount, getCountryCount } from "@/db/queries";
import {
  generateSeoData,
  DEFAULT_SEO_CONFIG,
  buildHomeUrl,
  buildAlternateUrls,
  generateHomeContent,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { Search, Shield, Clock, Star, MapPin, CheckCircle, ChevronRight, Sparkles, Heart, Users, Award } from "lucide-react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// ISR: Revalidate every 5 minutes for fresh content while maintaining performance
export const revalidate = 300;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const seo = await generateSeoData("home", { locale });

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
      languages: buildAlternateUrls({ locale }, DEFAULT_SEO_CONFIG.supportedLocales),
    },
    openGraph: {
      title: seo.openGraph?.title ?? seo.title,
      description: seo.openGraph?.description ?? seo.description,
      url: seo.canonicalUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [countries, categories, totalPlaces, totalCities] = await Promise.all([
    getCountries(),
    getCategories(),
    getPlaceCount(),
    getCityCount(),
  ]);

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  const displayCountries = countries.length > 0 ? countries : defaultCountries;

  // Generate AI content for intro
  const content = generateHomeContent({
    locale: locale as ContentLocale,
    totalCountries: countries.length || displayCountries.length,
    totalCities: totalCities || displayCountries.length * 5,
    totalPlaces: totalPlaces || 100,
    topCategories: categories.slice(0, 4).map((cat) => ({
      slug: cat.slug,
      name: cat.labelKey,
      count: Math.floor(totalPlaces / categories.length) || 10,
    })),
  });

  return (
    <>
      {/* Hero with Search - Modern Design */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh-bg" />

        {/* Animated gradient blobs */}
        <div className="gradient-blob gradient-blob-animated w-[500px] h-[500px] bg-cpPink/30 -top-48 -left-48" />
        <div className="gradient-blob gradient-blob-animated w-[400px] h-[400px] bg-cpAqua/25 top-1/3 -right-32" style={{ animationDelay: '-5s' }} />
        <div className="gradient-blob gradient-blob-animated w-[300px] h-[300px] bg-cpYellow/20 bottom-0 left-1/4" style={{ animationDelay: '-10s' }} />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-cpPink/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-32 left-16 w-32 h-32 border-2 border-cpAqua/10 rounded-full hidden lg:block" />

        <div className="relative container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge with glass effect */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-fade-in">
              <span className="text-lg">🐾</span>
              <span className="text-sm font-medium text-cpDark dark:text-white">
                {locale === "nl" ? "De #1 Huisdierdiensten Gids" : "The #1 Pet Services Directory"}
              </span>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cpDark dark:text-white mb-6 tracking-tight animate-slide-up">
              {locale === "nl" ? (
                <>Vind <span className="gradient-text-pink">Perfecte Zorg</span> voor je Huisdier</>
              ) : (
                <>Find <span className="gradient-text-pink">Perfect Care</span> for Your Pet</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {content.secondary || (locale === "nl"
                ? "Ontdek vertrouwde dierenpensions, dierenartsen, trimsalons en trainers bij jou in de buurt."
                : "Discover trusted pet hotels, veterinarians, groomers and trainers in your area.")}
            </p>

            {/* Search box with glassmorphism */}
            <div className="glass-card-strong rounded-2xl p-4 md:p-6 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar locale={locale} placeholder={locale === "nl" ? "Waar zoek je naar?" : "What are you looking for?"} />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>{locale === "nl" ? "Gratis te gebruiken" : "Free to use"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cpPink" />
                <span>217+ {locale === "nl" ? "locaties" : "locations"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cpAqua" />
                <span>4.8★ {locale === "nl" ? "gemiddelde rating" : "average rating"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Generated Intro Content */}
      <PageIntro content={content} variant="gradient" showBullets={true} />

      {/* Categories */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <SectionHeader title={locale === "nl" ? "Populaire Categorieën" : "Popular Categories"} />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              href={`/${locale}/search?category=${category.slug}`}
              icon={getCategoryIcon(category.icon)}
              label={getLocalizedCategoryName(category.slug, locale as ContentLocale)}
            />
          ))}
        </div>
      </section>

      {/* Countries - Browse by Country */}
      <section className="bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <SectionHeader title={locale === "nl" ? "Zoek per Land" : "Browse by Country"} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayCountries.map((country) => (
              <CountryCard
                key={country.slug || country.code}
                href={`/${locale}/${country.slug}`}
                code={country.code}
                name={country.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Numbered Steps */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg opacity-50" />
        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cpPink/10 text-cpPink text-sm font-medium mb-4">
              {locale === "nl" ? "Eenvoudig & Snel" : "Simple & Fast"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-4">
              {locale === "nl" ? "Hoe Het Werkt" : "How It Works"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {locale === "nl"
                ? "Vind de perfecte zorg voor je huisdier in slechts een paar stappen"
                : "Find the perfect care for your pet in just a few simple steps"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: Search,
                title: locale === "nl" ? "Zoek" : "Search",
                description: locale === "nl"
                  ? "Voer je locatie en het type service in dat je zoekt"
                  : "Enter your location and the type of service you need",
              },
              {
                step: 2,
                icon: Star,
                title: locale === "nl" ? "Vergelijk" : "Compare",
                description: locale === "nl"
                  ? "Bekijk beoordelingen, prijzen en diensten van verschillende aanbieders"
                  : "Review ratings, prices, and services from different providers",
              },
              {
                step: 3,
                icon: CheckCircle,
                title: locale === "nl" ? "Kies" : "Choose",
                description: locale === "nl"
                  ? "Selecteer de beste optie op basis van jouw behoeften"
                  : "Select the best option based on your needs",
              },
              {
                step: 4,
                icon: Heart,
                title: locale === "nl" ? "Geniet" : "Enjoy",
                description: locale === "nl"
                  ? "Geef je huisdier de beste zorg die het verdient"
                  : "Give your pet the best care they deserve",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cpPink/30 to-cpAqua/30" />
                )}
                <div className="relative bg-white dark:bg-slate-800/80 rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-cpPink/10 transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700/50">
                  {/* Step number */}
                  <div className="number-badge mx-auto mb-4">{item.step}</div>
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cpPink/10 to-cpAqua/10 mb-4">
                    <item.icon className="w-7 h-7 text-cpPink" />
                  </div>
                  <h3 className="text-lg font-bold text-cpDark dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CutiePawsPedia - Features */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cpAqua/10 text-cpAqua text-sm font-medium mb-4">
              {locale === "nl" ? "Waarom Wij" : "Why Us"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-4">
              {locale === "nl" ? "Waarom CutiePawsPedia?" : "Why CutiePawsPedia?"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {locale === "nl"
                ? "We maken het vinden van betrouwbare dierenzorg eenvoudig en stressvrij"
                : "We make finding reliable pet care simple and stress-free"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: locale === "nl" ? "Geverifieerde Reviews" : "Verified Reviews",
                description: locale === "nl"
                  ? "Echte beoordelingen van echte huisdiereigenaren. Geen nep reviews, alleen eerlijke ervaringen."
                  : "Real reviews from real pet owners. No fake reviews, just honest experiences.",
                color: "pink",
              },
              {
                icon: Clock,
                title: locale === "nl" ? "Actuele Informatie" : "Up-to-Date Info",
                description: locale === "nl"
                  ? "Openingstijden, prijzen en contactgegevens worden regelmatig bijgewerkt en geverifieerd."
                  : "Opening hours, prices, and contact details are regularly updated and verified.",
                color: "aqua",
              },
              {
                icon: MapPin,
                title: locale === "nl" ? "Lokale Expertise" : "Local Expertise",
                description: locale === "nl"
                  ? "Vind services bij jou in de buurt met gedetailleerde locatie-informatie en routebeschrijvingen."
                  : "Find services near you with detailed location info and directions.",
                color: "yellow",
              },
              {
                icon: Sparkles,
                title: locale === "nl" ? "Slimme Filters" : "Smart Filters",
                description: locale === "nl"
                  ? "Filter op categorie, rating, prijs en meer om precies te vinden wat je zoekt."
                  : "Filter by category, rating, price, and more to find exactly what you need.",
                color: "pink",
              },
              {
                icon: Users,
                title: locale === "nl" ? "Community Gedreven" : "Community Driven",
                description: locale === "nl"
                  ? "Een groeiende gemeenschap van huisdiereigenaren die hun ervaringen delen."
                  : "A growing community of pet owners sharing their experiences.",
                color: "aqua",
              },
              {
                icon: Award,
                title: locale === "nl" ? "Kwaliteitsgarantie" : "Quality Guarantee",
                description: locale === "nl"
                  ? "We werken alleen samen met bedrijven die voldoen aan onze kwaliteitsstandaarden."
                  : "We only partner with businesses that meet our quality standards.",
                color: "yellow",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="feature-card group"
              >
                <div className={`icon-badge icon-badge-${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.color === 'pink' ? 'text-cpPink' :
                    feature.color === 'aqua' ? 'text-cpAqua' : 'text-cpYellow'
                  }`} />
                </div>
                <h3 className="text-lg font-bold text-cpDark dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cpYellow/10 text-cpYellow text-sm font-medium mb-4">
              {locale === "nl" ? "Aanbevolen" : "Featured"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-4">
              {locale === "nl" ? "Populaire Locaties" : "Popular Places"}
            </h2>
            <Link
              href={`/${locale}/search`}
              className="inline-flex items-center gap-2 text-cpPink font-medium hover:gap-3 transition-all"
            >
              {locale === "nl" ? "Bekijk alles" : "View all"}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPlaces.map((place, index) => (
              <Link
                key={place.name}
                href={`/${locale}/${place.href}`}
                className="group block"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700/50">
                  {/* Image placeholder with gradient */}
                  <div className="relative h-48 bg-gradient-to-br from-cpPink/20 via-cpYellow/10 to-cpAqua/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{place.emoji}</span>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-xs font-medium text-cpDark">
                        {place.category}
                      </span>
                    </div>
                    {/* Rating */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-cpYellow/90 text-xs font-bold text-cpDark flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {place.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-cpDark dark:text-white group-hover:text-cpPink transition-colors mb-1">
                      {place.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {place.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cpDark via-slate-900 to-cpDark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,127,161,0.1),transparent_70%)]" />

        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
              {locale === "nl" ? "Wat Mensen Zeggen" : "What People Say"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === "nl" ? "Tevreden Huisdiereigenaren" : "Happy Pet Owners"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cpPink/30 transition-all duration-300"
              >
                {/* Quote icon */}
                <div className="text-4xl text-cpPink/30 mb-4">"</div>
                <p className="text-white/80 mb-6">{testimonial.quote[locale as 'en' | 'nl']}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpPink to-cpAqua flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.pet}</div>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cpYellow text-cpYellow" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips Preview */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cpPink/10 text-cpPink text-sm font-medium mb-4">
              {locale === "nl" ? "Blog & Tips" : "Blog & Tips"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white">
              {locale === "nl" ? "Handige Tips voor je Huisdier" : "Helpful Pet Care Tips"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {petTips.map((tip, index) => (
              <article
                key={index}
                className="group bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700/50"
              >
                {/* Image placeholder */}
                <div className={`h-40 bg-gradient-to-br ${tip.gradient} flex items-center justify-center`}>
                  <span className="text-5xl">{tip.emoji}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-cpPink">{tip.category[locale as 'en' | 'nl']}</span>
                  <h3 className="font-bold text-cpDark dark:text-white mt-1 mb-2 group-hover:text-cpPink transition-colors">
                    {tip.title[locale as 'en' | 'nl']}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{tip.excerpt[locale as 'en' | 'nl']}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cpAqua/10 text-cpAqua text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cpDark dark:text-white mb-4">
              {locale === "nl" ? "Veelgestelde Vragen" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700/50"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-cpDark dark:text-white">
                  {faq.question[locale as 'en' | 'nl']}
                  <ChevronRight className="w-5 h-5 text-cpPink group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  {faq.answer[locale as 'en' | 'nl']}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Modern Card Design */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cpDark via-slate-900 to-cpDark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,127,161,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(41,160,177,0.1),transparent_50%)]" />

        <div className="relative container mx-auto max-w-6xl px-4">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === "nl" ? "Vertrouwd door duizenden" : "Trusted by Thousands"}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {locale === "nl"
                ? "Sluit je aan bij de groeiende gemeenschap van huisdiereigenaren die de beste zorg vinden"
                : "Join the growing community of pet owners finding the best care"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "10,000+", label: locale === "nl" ? "Geregistreerde Bedrijven" : "Listed Businesses", color: "pink" },
              { value: "50+", label: locale === "nl" ? "Landen" : "Countries", color: "aqua" },
              { value: "100,000+", label: locale === "nl" ? "Tevreden Eigenaren" : "Happy Pet Owners", color: "yellow" },
              { value: "4.8", label: locale === "nl" ? "Gemiddelde Rating" : "Average Rating", color: "pink" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`stat-card stat-card-${stat.color} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                  stat.color === 'pink' ? 'text-cpPink' :
                  stat.color === 'aqua' ? 'text-cpAqua' : 'text-cpYellow'
                }`}>
                  {stat.value}
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Modern Gradient Design */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cpPink via-cpPink/90 to-cpAqua" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(41,160,177,0.3),transparent_50%)]" />

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cpYellow/20 rounded-full blur-2xl" />

          {/* Decorative circles */}
          <div className="absolute top-8 right-16 w-20 h-20 border-2 border-white/20 rounded-full hidden md:block" />
          <div className="absolute bottom-8 left-20 w-12 h-12 border-2 border-white/10 rounded-full hidden md:block" />

          <div className="relative p-8 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-4">
                  {locale === "nl" ? "🚀 Voor Bedrijven" : "🚀 For Businesses"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {locale === "nl" ? "Heb je een huisdierenbedrijf?" : "Own a pet business?"}
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  {locale === "nl"
                    ? "Word gevonden door duizenden huisdiereigenaren. Registreer vandaag nog."
                    : "Get found by thousands of pet owners. List your business today."}
                </p>

                {/* Benefits list */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {locale === "nl" ? "Gratis vermelding" : "Free listing"}
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {locale === "nl" ? "Meer klanten" : "More customers"}
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {locale === "nl" ? "Premium opties" : "Premium options"}
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-cpPink hover:bg-white/95 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-xl"
                asChild
              >
                <Link href={`/${locale}/for-businesses`}>
                  {locale === "nl" ? "Registreer je Bedrijf →" : "List Your Business →"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const defaultCategories = [
  { slug: "pet-hotels", icon: "hotel", labelKey: "Pet Hotels" },
  { slug: "veterinarians", icon: "vet", labelKey: "Veterinarians" },
  { slug: "grooming", icon: "grooming", labelKey: "Grooming" },
  { slug: "training", icon: "training", labelKey: "Training" },
  { slug: "pet-shops", icon: "shop", labelKey: "Pet Shops" },
  { slug: "dog-walking", icon: "walking", labelKey: "Dog Walking" },
];

const defaultCountries = [
  { slug: "netherlands", code: "NL", name: "Netherlands" },
  { slug: "belgium", code: "BE", name: "Belgium" },
  { slug: "germany", code: "DE", name: "Germany" },
  { slug: "france", code: "FR", name: "France" },
  { slug: "united-kingdom", code: "GB", name: "United Kingdom" },
  { slug: "spain", code: "ES", name: "Spain" },
  { slug: "italy", code: "IT", name: "Italy" },
  { slug: "united-states", code: "US", name: "United States" },
];

// Featured places data
const featuredPlaces = [
  {
    name: "Happy Paws Pet Hotel",
    href: "netherlands/amsterdam/pet-hotels/happy-paws",
    location: "Amsterdam, Netherlands",
    category: "Pet Hotel",
    rating: "4.9",
    emoji: "🏨",
  },
  {
    name: "Dr. Whiskers Veterinary Clinic",
    href: "netherlands/rotterdam/veterinarians/dr-whiskers",
    location: "Rotterdam, Netherlands",
    category: "Veterinarian",
    rating: "4.8",
    emoji: "🩺",
  },
  {
    name: "Fluffy Grooming Salon",
    href: "belgium/brussels/grooming/fluffy-salon",
    location: "Brussels, Belgium",
    category: "Grooming",
    rating: "4.7",
    emoji: "✂️",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    pet: "Owner of Max (Golden Retriever)",
    quote: {
      en: "Found the perfect pet hotel for our vacation. Max was so happy and well-cared for. The reviews really helped us make the right choice!",
      nl: "De perfecte dierenpension gevonden voor onze vakantie. Max was zo blij en goed verzorgd. De reviews hielpen ons echt de juiste keuze te maken!",
    },
  },
  {
    name: "Peter van den Berg",
    pet: "Owner of Luna (British Shorthair)",
    quote: {
      en: "As a first-time cat owner, finding a good vet was crucial. CutiePawsPedia made it so easy to compare options and read honest reviews.",
      nl: "Als eerste katteneigenaar was het vinden van een goede dierenarts cruciaal. CutiePawsPedia maakte het zo makkelijk om opties te vergelijken en eerlijke reviews te lezen.",
    },
  },
  {
    name: "Emma Williams",
    pet: "Owner of Buddy & Bailey (Beagles)",
    quote: {
      en: "The groomer we found through this site was amazing! Both dogs came back looking and smelling fantastic. Highly recommend!",
      nl: "De trimmer die we via deze site vonden was geweldig! Beide honden kwamen terug en zagen er fantastisch uit. Echt een aanrader!",
    },
  },
];

// Pet care tips data
const petTips = [
  {
    emoji: "🐕",
    gradient: "from-cpPink/30 to-cpYellow/20",
    category: { en: "Dog Care", nl: "Hondenzorg" },
    title: { en: "5 Signs Your Dog Needs More Exercise", nl: "5 Signalen dat je Hond Meer Beweging Nodig Heeft" },
    excerpt: {
      en: "Is your furry friend getting enough physical activity? Look out for these telltale signs that indicate your dog might need more walks and playtime.",
      nl: "Krijgt je harige vriend genoeg lichaamsbeweging? Let op deze veelzeggende tekenen die aangeven dat je hond misschien meer wandelingen en speeltijd nodig heeft.",
    },
  },
  {
    emoji: "🐱",
    gradient: "from-cpAqua/30 to-cpPink/20",
    category: { en: "Cat Health", nl: "Kattengezondheid" },
    title: { en: "Understanding Your Cat's Body Language", nl: "De Lichaamstaal van je Kat Begrijpen" },
    excerpt: {
      en: "Cats communicate in subtle ways. Learn to read their tail positions, ear movements, and vocalizations to better understand what they're telling you.",
      nl: "Katten communiceren op subtiele manieren. Leer hun staartposities, oorbewegingen en vocalisaties te lezen om beter te begrijpen wat ze je vertellen.",
    },
  },
  {
    emoji: "🦴",
    gradient: "from-cpYellow/30 to-cpAqua/20",
    category: { en: "Nutrition", nl: "Voeding" },
    title: { en: "The Ultimate Guide to Pet Nutrition", nl: "De Ultieme Gids voor Huisdiervoeding" },
    excerpt: {
      en: "What you feed your pet matters. Discover the best dietary practices to keep your furry companion healthy, happy, and full of energy.",
      nl: "Wat je je huisdier voert is belangrijk. Ontdek de beste voedingspraktijken om je harige metgezel gezond, blij en vol energie te houden.",
    },
  },
];

// FAQ data
const faqs = [
  {
    question: {
      en: "Is CutiePawsPedia free to use?",
      nl: "Is CutiePawsPedia gratis te gebruiken?",
    },
    answer: {
      en: "Yes! CutiePawsPedia is completely free for pet owners. You can search, compare, and read reviews of pet services without any cost. Business owners can also list their services for free, with optional premium features available.",
      nl: "Ja! CutiePawsPedia is volledig gratis voor huisdiereigenaren. Je kunt zoeken, vergelijken en reviews lezen van huisdierdiensten zonder kosten. Bedrijfseigenaren kunnen ook gratis hun diensten vermelden, met optionele premium functies beschikbaar.",
    },
  },
  {
    question: {
      en: "How do you verify the businesses listed?",
      nl: "Hoe verifiëren jullie de vermelde bedrijven?",
    },
    answer: {
      en: "We verify business information through multiple sources including official registrations, customer reviews, and periodic checks. Our community also helps flag any inaccurate information, which we investigate promptly.",
      nl: "We verifiëren bedrijfsinformatie via meerdere bronnen, waaronder officiële registraties, klantreviews en periodieke controles. Onze community helpt ook bij het signaleren van onjuiste informatie, die we snel onderzoeken.",
    },
  },
  {
    question: {
      en: "Can I leave a review for a business?",
      nl: "Kan ik een review achterlaten voor een bedrijf?",
    },
    answer: {
      en: "Absolutely! We encourage honest reviews from pet owners who have used the services. Simply visit the business page and click on 'Write a Review'. Your feedback helps other pet owners make informed decisions.",
      nl: "Absoluut! We moedigen eerlijke reviews aan van huisdiereigenaren die de diensten hebben gebruikt. Bezoek gewoon de bedrijfspagina en klik op 'Schrijf een Review'. Jouw feedback helpt andere huisdiereigenaren weloverwogen beslissingen te nemen.",
    },
  },
  {
    question: {
      en: "How do I list my pet business on CutiePawsPedia?",
      nl: "Hoe kan ik mijn huisdierenbedrijf op CutiePawsPedia vermelden?",
    },
    answer: {
      en: "Listing your business is easy! Click on 'List Your Business' in the navigation, fill out your business details, and submit for review. Once approved, your business will be visible to thousands of pet owners searching for services.",
      nl: "Je bedrijf vermelden is eenvoudig! Klik op 'Vermeld je Bedrijf' in de navigatie, vul je bedrijfsgegevens in en dien in voor review. Na goedkeuring is je bedrijf zichtbaar voor duizenden huisdiereigenaren die op zoek zijn naar diensten.",
    },
  },
  {
    question: {
      en: "What countries does CutiePawsPedia cover?",
      nl: "Welke landen bestrijkt CutiePawsPedia?",
    },
    answer: {
      en: "We currently cover pet services across Europe and North America, including the Netherlands, Belgium, Germany, France, UK, Spain, Italy, and the United States. We're constantly expanding to new regions!",
      nl: "We bestrijken momenteel huisdierdiensten in heel Europa en Noord-Amerika, waaronder Nederland, België, Duitsland, Frankrijk, VK, Spanje, Italië en de Verenigde Staten. We breiden constant uit naar nieuwe regio's!",
    },
  },
];
