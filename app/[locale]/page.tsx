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
import { Button } from "@/components/ui/button";
import { SearchBar, CategoryCard, getCategoryIcon } from "@/components/directory";
import { getCountries, getCategories, getPlaceCount, getCityCount, getLatestPosts, type Locale } from "@/db/queries";
import { getActiveAdForPlacement } from "@/db/queries/ads";
import { HomepageFeaturedAd } from "@/components/ads";
import {
  generateSeoData,
  DEFAULT_SEO_CONFIG,
  buildAlternateUrls,
  getLocalizedCategoryName,
  type ContentLocale,
} from "@/lib/seo";
import { Search, Star, CheckCircle } from "lucide-react";

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

  const [countries, categories, totalPlaces, totalCities, latestPosts, homepageSponsorAd] = await Promise.all([
    getCountries(),
    getCategories(),
    getPlaceCount(),
    getCityCount(),
    getLatestPosts(locale as Locale, 2),
    getActiveAdForPlacement("homepage_featured", locale as "en" | "nl"),
  ]);

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <>
      {/* Hero with Search - Cozy Theme (Light & Dark) */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Background image - Cozy sleeping pets from Unsplash */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
            alt="Cozy sleeping pets"
            fill
            className="object-cover"
            priority
          />
          {/* Warm gradient overlay - adapts to theme */}
          <div className="hero-overlay" />
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-cpAmber/20 dark:border-cpAmber/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-32 left-16 w-32 h-32 border-2 border-cpCoral/20 dark:border-cpCoral/10 rounded-full hidden lg:block" />

        <div className="relative container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Blurred background for better text readability */}
            <div className="bg-white/80 dark:bg-cpCharcoal/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-cpAmber/20 dark:border-cpAmber/10 shadow-lg dark:shadow-none">
            {/* Badge with cozy glass effect */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 backdrop-blur-sm border border-cpCoral/30 dark:border-cpAmber/20 mb-6 animate-fade-in">
              <span className="text-lg">🐾</span>
              <span className="text-sm font-medium text-foreground dark:text-cpCream">
                {locale === "nl" ? "De #1 Huisdierdiensten Gids" : "The #1 Pet Services Directory"}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight animate-slide-up">
              {locale === "nl" ? (
                <>Vind <span className="text-cpCoral">Perfecte Zorg</span> voor je Huisdier</>
              ) : (
                <>Find <span className="text-cpCoral">Perfect Care</span> for Your Pet</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground dark:text-cpCream/80 mb-10 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {locale === "nl"
                ? "Ontdek vertrouwde dierenpensions, dierenartsen, trimsalons en trainers bij jou in de buurt."
                : "Discover trusted pet hotels, veterinarians, groomers and trainers in your area."}
            </p>

            {/* Search box with cozy styling */}
            <div className="cozy-card rounded-3xl p-4 md:p-6 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar locale={locale} placeholder={locale === "nl" ? "Waar zoek je naar?" : "What are you looking for?"} />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>{locale === "nl" ? "Gratis te gebruiken" : "Free to use"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-cpCoral" />
                <span>217+ {locale === "nl" ? "locaties" : "locations"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="w-2 h-2 rounded-full bg-cpAmber" />
                <span>4.8★ {locale === "nl" ? "gemiddelde rating" : "average rating"}</span>
              </div>
            </div>
            </div>
            {/* End blurred background wrapper */}
          </div>
        </div>
      </section>

      {/* Main Content - Consistent Background (Light/Dark) */}
      <div className="bg-background dark:bg-cpCharcoal">
        {/* Categories */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Ontdek Categorieën" : "Explore Categories"}
            </h2>
          </div>
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

        {/* Homepage Featured Sponsor Ad */}
        {homepageSponsorAd && (
          <section className="container mx-auto max-w-6xl px-4 py-8">
            <HomepageFeaturedAd sponsorAd={homepageSponsorAd} />
          </section>
        )}

        {/* Countries - Browse by Country */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Zoek per Land" : "Browse by Country"}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <Link
                key={country.slug || country.code}
                href={`/${locale}/${country.slug}`}
                className="bg-card dark:bg-cpSurface/50 rounded-2xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all text-center group shadow-sm hover:shadow-md"
              >
                <span className="text-3xl mb-2 block">{getFlagEmoji(country.code)}</span>
                <span className="text-foreground dark:text-cpCream font-medium group-hover:text-cpCoral transition-colors">{country.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended Services */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Aanbevolen Diensten" : "Recommended Services"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🩺", title: locale === "nl" ? "Dierenarts" : "Vet", desc: locale === "nl" ? "Dierenartsen klaarstaan voor je vrienden." : "Veterinarians ready for your friends." },
              { icon: "✂️", title: locale === "nl" ? "Trimmer" : "Groomer", desc: locale === "nl" ? "Trimsalons aanstaand aan in trimmercentrees." : "Grooming salons in grooming centers." },
              { icon: "🏠", title: locale === "nl" ? "Oppas" : "Sitter", desc: locale === "nl" ? "Oppas op dierenwinter met eerst eertoilvloren." : "Pet sitters with first priority." },
            ].map((service) => (
              <div key={service.title} className="bg-card dark:bg-cpSurface/50 rounded-3xl p-6 text-center border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all">
                <div className="category-circle mx-auto mb-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">{service.desc}</p>
                <button className="btn-coral w-full py-2.5 rounded-xl text-sm font-medium">
                  {locale === "nl" ? "Lees meer" : "Learn more"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Hoe werkt het?" : "How It Works"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: Search, title: locale === "nl" ? "Zoek" : "Search", desc: locale === "nl" ? "Zoek naar huisdierdiensten bij jou in de buurt." : "Search for nearby pet services in your area." },
              { step: 2, icon: Star, title: locale === "nl" ? "Vergelijk" : "Compare", desc: locale === "nl" ? "Vergelijk beoordelingen en reviews van andere baasjes." : "Compare ratings and reviews from pet owners." },
              { step: 3, icon: CheckCircle, title: locale === "nl" ? "Boek" : "Book", desc: locale === "nl" ? "Boek eenvoudig een afspraak met je favoriete dienst." : "Book your appointment with ease." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="category-circle mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-cpAmber" />
                </div>
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2 italic">{item.step}. {item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips & Advice - from Blog */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Laatste Tips & Advies" : "Latest Tips & Advice"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                  <article className="group bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all h-full">
                    <div className="relative h-48">
                      {post.featuredImage ? (
                        <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20">
                          <span className="text-5xl opacity-50">📰</span>
                        </div>
                      )}
                      {post.categoryName && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-cpCoral/90 text-white text-xs font-medium rounded-full">
                          {post.categoryName}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="text-cpCoral text-sm font-medium">{locale === "nl" ? "Lees meer →" : "Read more →"}</span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              // Fallback to placeholder content if no blog posts
              [
                { img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop", title: locale === "nl" ? "5 Tips voor een gezonde pup" : "5 Tips for a healthy puppy", desc: locale === "nl" ? "Ontdek hoe je je puppy gezond en gelukkig houdt met deze praktische tips." : "5 Tips for a healthy puppy can help your furry friend thrive." },
                { img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=250&fit=crop", title: locale === "nl" ? "Hoe kies je de beste trimmer?" : "How to choose the best groomer?", desc: locale === "nl" ? "Vergelijk reviews en beoordelingen om de perfecte trimmer te vinden." : "How to choose the best groomer? Compare reviews and ratings..." },
              ].map((tip) => (
                <article key={tip.title} className="group bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image src={tip.img} alt={tip.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3">{tip.desc}</p>
                    <span className="text-cpCoral text-sm font-medium">{locale === "nl" ? "Lees meer →" : "Read more →"}</span>
                  </div>
                </article>
              ))
            )}
          </div>
          {latestPosts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral rounded-2xl font-medium hover:bg-cpCoral/20 dark:hover:bg-cpCoral/30 transition-colors"
              >
                {locale === "nl" ? "Bekijk alle artikelen" : "View all articles"}
                <span>→</span>
              </Link>
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Wat baasjes zeggen" : "What owners say"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-3xl p-6 border border-border dark:border-cpAmber/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpCoral to-cpAmber flex items-center justify-center text-white dark:text-cpCharcoal font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cpAmber text-cpAmber" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">"{testimonial.quote[locale as 'en' | 'nl']}"</p>
                <span className="text-cpCoral text-sm font-medium">{locale === "nl" ? "Lees meer →" : "Read more →"}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Places */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Populaire Locaties" : "Popular Places"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPlaces.map((place) => (
              <Link key={place.name} href={`/${locale}/${place.href}`} className="group">
                <div className="bg-card dark:bg-cpSurface/50 rounded-3xl overflow-hidden border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all shadow-sm hover:shadow-lg">
                  <div className="h-40 bg-gradient-to-br from-cpCoral/10 dark:from-cpCoral/20 to-cpAmber/5 dark:to-cpAmber/10 flex items-center justify-center">
                    <span className="text-5xl">{place.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-cpAmber font-medium">{place.category}</span>
                      <span className="flex items-center gap-1 text-cpAmber text-sm">
                        <Star className="w-3 h-3 fill-cpAmber" />
                        {place.rating}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">{place.name}</h3>
                    <p className="text-sm text-muted-foreground dark:text-slate-400">{place.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Veelgestelde Vragen" : "Frequently Asked Questions"}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  {faq.question[locale as 'en' | 'nl']}
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">{faq.answer[locale as 'en' | 'nl']}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-4">
              {locale === "nl" ? "Vertrouwd door duizenden" : "Trusted by Thousands"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: totalPlaces.toLocaleString() || "10,000+", label: locale === "nl" ? "Bedrijven" : "Businesses" },
              { value: countries.length.toString() || "50+", label: locale === "nl" ? "Landen" : "Countries" },
              { value: totalCities.toLocaleString() || "500+", label: locale === "nl" ? "Steden" : "Cities" },
              { value: "4.8", label: locale === "nl" ? "Gem. Rating" : "Avg Rating" },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 text-center border border-border dark:border-cpAmber/20 shadow-sm">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${i % 2 === 0 ? 'text-cpCoral' : 'text-cpAmber'}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground dark:text-cpCream/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
      {/* End of Main Content wrapper */}

      {/* CTA - Coral gradient card */}
      <section className="bg-secondary dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Multi-layer gradient background - warm coral to amber */}
          <div className="absolute inset-0 bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,209,102,0.3),transparent_50%)]" />

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cpAmber/30 rounded-full blur-2xl" />

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
                className="bg-white dark:bg-cpCharcoal text-cpCoral dark:text-cpCream hover:bg-white/90 dark:hover:bg-cpCharcoal/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl border border-white/20 dark:border-cpAmber/20"
                asChild
              >
                <Link href={`/${locale}/for-businesses`}>
                  {locale === "nl" ? "Registreer je Bedrijf →" : "List Your Business →"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

// Helper function to get flag emoji from country code
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const defaultCategories = [
  { slug: "pet-hotels", icon: "hotel", labelKey: "Pet Hotels" },
  { slug: "veterinarians", icon: "vet", labelKey: "Veterinarians" },
  { slug: "grooming", icon: "grooming", labelKey: "Grooming" },
  { slug: "training", icon: "training", labelKey: "Training" },
  { slug: "pet-shops", icon: "shop", labelKey: "Pet Shops" },
  { slug: "dog-walking", icon: "walking", labelKey: "Dog Walking" },
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

// FAQ data
const faqs = [
  {
    question: { en: "Is CutiePawsPedia free to use?", nl: "Is CutiePawsPedia gratis te gebruiken?" },
    answer: {
      en: "Yes! CutiePawsPedia is completely free for pet owners. You can search, compare, and read reviews of pet services without any cost. Business owners can also list their services for free, with optional premium features available.",
      nl: "Ja! CutiePawsPedia is volledig gratis voor huisdiereigenaren. Je kunt zoeken, vergelijken en reviews lezen van huisdierdiensten zonder kosten. Bedrijfseigenaren kunnen ook gratis hun diensten vermelden, met optionele premium functies beschikbaar."
    },
  },
  {
    question: { en: "How do you verify the businesses listed?", nl: "Hoe verifiëren jullie de vermelde bedrijven?" },
    answer: {
      en: "We verify business information through multiple sources including official registrations, customer reviews, and periodic checks. Our community also helps flag any inaccurate information, which we investigate promptly.",
      nl: "We verifiëren bedrijfsinformatie via meerdere bronnen, waaronder officiële registraties, klantreviews en periodieke controles. Onze community helpt ook bij het signaleren van onjuiste informatie, die we snel onderzoeken."
    },
  },
  {
    question: { en: "Can I leave a review for a business?", nl: "Kan ik een review achterlaten voor een bedrijf?" },
    answer: {
      en: "Absolutely! We encourage honest reviews from pet owners who have used the services. Simply visit the business page and click on 'Write a Review'. Your feedback helps other pet owners make informed decisions.",
      nl: "Absoluut! We moedigen eerlijke reviews aan van huisdiereigenaren die de diensten hebben gebruikt. Bezoek gewoon de bedrijfspagina en klik op 'Schrijf een Review'. Jouw feedback helpt andere huisdiereigenaren weloverwogen beslissingen te nemen."
    },
  },
  {
    question: { en: "How do I list my pet business on CutiePawsPedia?", nl: "Hoe kan ik mijn huisdierenbedrijf op CutiePawsPedia vermelden?" },
    answer: {
      en: "Listing your business is easy! Click on 'List Your Business' in the navigation, fill out your business details, and submit for review. Once approved, your business will be visible to thousands of pet owners searching for services.",
      nl: "Je bedrijf vermelden is eenvoudig! Klik op 'Vermeld je Bedrijf' in de navigatie, vul je bedrijfsgegevens in en dien in voor review. Na goedkeuring is je bedrijf zichtbaar voor duizenden huisdiereigenaren die op zoek zijn naar diensten."
    },
  },
  {
    question: { en: "What countries does CutiePawsPedia cover?", nl: "Welke landen bestrijkt CutiePawsPedia?" },
    answer: {
      en: "We currently cover pet services across Europe and North America, including the Netherlands, Belgium, Germany, France, UK, Spain, Italy, and the United States. We're constantly expanding to new regions!",
      nl: "We bestrijken momenteel huisdierdiensten in heel Europa en Noord-Amerika, waaronder Nederland, België, Duitsland, Frankrijk, VK, Spanje, Italië en de Verenigde Staten. We breiden constant uit naar nieuwe regio's!"
    },
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

