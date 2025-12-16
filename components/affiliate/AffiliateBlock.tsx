"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackAffiliateClick } from "@/lib/analytics";
import {
  Shield,
  Heart,
  Home,
  ShoppingBag,
  Package,
  Dog,
  Dna,
  Pill,
  ExternalLink,
  Star,
  Sparkles,
} from "lucide-react";

export type AffiliateType =
  | "pet-insurance"
  | "pet-cremation"
  | "pet-hotels"
  | "pet-products"
  | "food-subscriptions"
  | "pet-sitting"
  | "dna-tests"
  | "vet-health";

interface AffiliateLink {
  name: string;
  url: string;
  description?: string;
  discount?: string;
  logo?: string;
}

interface AffiliateBlockProps {
  type: AffiliateType;
  variant?: "card" | "inline" | "banner" | "compact";
  className?: string;
  customLinks?: AffiliateLink[];
  trackingId?: string;
  categoryContext?: string; // For tracking which category page the affiliate was shown on
  countrySlug?: string; // For locale-aware affiliate links (e.g., "netherlands", "usa", "canada")
}

// =====================================================
// LOCALE-AWARE AFFILIATE CONFIGURATION
// =====================================================

// Country slug to Amazon domain mapping
const amazonDomains: Record<string, { domain: string; tag: string; searchAlias: string }> = {
  netherlands: { domain: "amazon.nl", tag: "cutiepawspedi-21", searchAlias: "pets" },
  belgie: { domain: "amazon.nl", tag: "cutiepawspedi-21", searchAlias: "pets" }, // Belgium uses NL
  germany: { domain: "amazon.de", tag: "cutiepawspedi-21", searchAlias: "pets" },
  france: { domain: "amazon.fr", tag: "cutiepawspedi-21", searchAlias: "pets" },
  usa: { domain: "amazon.com", tag: "cutiepawspedi-21", searchAlias: "pets" },
  canada: { domain: "amazon.ca", tag: "cutiepawspedi-21", searchAlias: "pets" },
};

// Chewy is only available in USA and Canada
const chewyCountries = ["usa", "canada"];

// Helper to generate Amazon affiliate URL
function getAmazonUrl(countrySlug: string, searchTerm: string = ""): string {
  const config = amazonDomains[countrySlug] || amazonDomains.netherlands;
  const baseUrl = `https://www.${config.domain}/s`;
  const params = new URLSearchParams({
    k: searchTerm,
    tag: config.tag,
    "search-alias": `aps`, // General search
  });
  if (!searchTerm) {
    // Link to pet category
    return `https://www.${config.domain}/s?url=search-alias%3D${config.searchAlias}&tag=${config.tag}`;
  }
  return `${baseUrl}?${params.toString()}`;
}

// Helper to get Chewy URL (only for US/CA)
function getChewyUrl(): string {
  // Using go.cutiepawspedia.com redirect when available, otherwise direct
  return "https://go.cutiepawspedia.com/chewy";
}

// Get locale-specific affiliate links based on country
function getLocaleAwareLinks(type: AffiliateType, countrySlug: string): AffiliateLink[] {
  const isNorthAmerica = chewyCountries.includes(countrySlug);
  const amazonConfig = amazonDomains[countrySlug] || amazonDomains.netherlands;

  const localeLinks: Record<AffiliateType, AffiliateLink[]> = {
    "pet-products": isNorthAmerica ? [
      {
        name: "Chewy",
        url: getChewyUrl(),
        description: "America's #1 pet store - fast delivery",
        discount: "35% off first Autoship",
      },
      {
        name: `Amazon ${amazonConfig.domain.split('.')[1]?.toUpperCase() || 'Pet'}`,
        url: getAmazonUrl(countrySlug, "pet supplies"),
        description: "Wide selection, fast delivery",
      },
    ] : [
      {
        name: "Zooplus",
        url: "https://www.zooplus.nl/",
        description: "Europa's grootste online dierenwinkel",
        discount: "Gratis verzending vanaf €49",
      },
      {
        name: `Amazon ${amazonConfig.domain.split('.')[1]?.toUpperCase() || 'Pet'}`,
        url: getAmazonUrl(countrySlug, "huisdier benodigdheden"),
        description: "Groot assortiment, snelle levering",
      },
    ],
    "vet-health": isNorthAmerica ? [
      {
        name: "Chewy Pharmacy",
        url: getChewyUrl(),
        description: "Pet medications & prescriptions",
        discount: "35% off first Autoship",
      },
      {
        name: `Amazon ${amazonConfig.domain.split('.')[1]?.toUpperCase() || ''} Pet Health`,
        url: getAmazonUrl(countrySlug, "pet vitamins supplements"),
        description: "Supplements & health products",
      },
    ] : [
      {
        name: `Amazon ${amazonConfig.domain.split('.')[1]?.toUpperCase() || ''} Pet Health`,
        url: getAmazonUrl(countrySlug, "huisdier vitaminen supplementen"),
        description: "Supplementen & gezondheidsproducten",
      },
    ],
    "food-subscriptions": isNorthAmerica ? [
      {
        name: "Chewy Autoship",
        url: getChewyUrl(),
        description: "Save on recurring pet food delivery",
        discount: "35% off first order",
      },
      {
        name: `Amazon Subscribe & Save`,
        url: getAmazonUrl(countrySlug, "dog food"),
        description: "Regular delivery discounts",
      },
    ] : [
      {
        name: `Amazon ${amazonConfig.domain.split('.')[1]?.toUpperCase() || ''} Pet Food`,
        url: getAmazonUrl(countrySlug, "hondenvoer"),
        description: "Hondenvoer & kattenvoer",
      },
    ],
    // Keep existing configs for non-product types (insurance, etc.)
    "pet-insurance": [
      {
        name: "Coming Soon",
        url: "#",
        description: "We're working on partnering with top pet insurers",
        discount: "Stay tuned!",
      },
    ],
    "pet-cremation": [
      {
        name: "Local Services",
        url: "#",
        description: "Find local pet cremation services",
      },
    ],
    "pet-hotels": isNorthAmerica ? [
      {
        name: "Rover Boarding",
        url: "#",
        description: "Trusted pet sitters & boarding",
        discount: "$20 off first booking",
      },
    ] : [
      {
        name: "Pawshake",
        url: "#",
        description: "Vind lokale pet sitters",
      },
    ],
    "pet-sitting": isNorthAmerica ? [
      {
        name: "Rover",
        url: "#",
        description: "Nation's largest network of pet sitters",
        discount: "$20 off first booking",
      },
    ] : [
      {
        name: "Pawshake",
        url: "#",
        description: "Vind lokale oppas",
      },
    ],
    "dna-tests": [
      {
        name: "Embark",
        url: getAmazonUrl(countrySlug, "dog DNA test"),
        description: "Most accurate dog DNA test",
        discount: "Up to $50 off",
      },
      {
        name: "Wisdom Panel",
        url: getAmazonUrl(countrySlug, "Wisdom Panel DNA"),
        description: "350+ breed detection",
      },
    ],
  };

  return localeLinks[type] || [];
}

// Default affiliate data for each type
const affiliateData: Record<
  AffiliateType,
  {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    links: AffiliateLink[];
  }
> = {
  "pet-insurance": {
    title: "Pet Insurance",
    description: "We're working on partnerships with trusted pet insurers. Check back soon!",
    icon: Shield,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Coming Soon",
        url: "#",
        description: "Top pet insurance partners",
        discount: "Stay tuned!",
      },
    ],
  },
  "pet-cremation": {
    title: "Pet Cremation Services",
    description: "Compassionate end-of-life care and memorial services for your beloved pet.",
    icon: Heart,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Paw & Petal",
        url: "#",
        description: "Individual cremation with memorial options",
      },
      {
        name: "Gateway Pet Memorial",
        url: "#",
        description: "Dignified pet cremation services",
      },
      {
        name: "Peaceful Paws",
        url: "#",
        description: "At-home pickup available",
      },
    ],
  },
  "pet-hotels": {
    title: "Pet Hotels & Boarding",
    description: "Find the perfect home-away-from-home for your pet while you travel.",
    icon: Home,
    color: "text-cpAmber",
    bgColor: "bg-cpAmber/10 dark:bg-cpAmber/5",
    links: [
      {
        name: "Rover Boarding",
        url: "#",
        description: "Trusted pet sitters & boarding",
        discount: "$20 off first booking",
      },
      {
        name: "Wag! Hotels",
        url: "#",
        description: "Premium pet hotel services",
        discount: "10% first stay",
      },
      {
        name: "PetSmart PetsHotel",
        url: "#",
        description: "Hotel with 24/7 care",
      },
    ],
  },
  "pet-products": {
    title: "Pet Products",
    description: "Quality products for your pet's comfort, health, and happiness.",
    icon: ShoppingBag,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Chewy",
        url: "#",
        description: "Everything for your pet",
        discount: "35% off first Autoship",
      },
      {
        name: "Amazon Pet",
        url: "#",
        description: "Wide selection, fast delivery",
      },
      {
        name: "Petco",
        url: "#",
        description: "Quality pet supplies",
        discount: "20% off orders $50+",
      },
    ],
  },
  "food-subscriptions": {
    title: "Pet Food Subscriptions",
    description: "Fresh, healthy food delivered to your door for your dog or cat.",
    icon: Package,
    color: "text-cpAmber",
    bgColor: "bg-cpAmber/10 dark:bg-cpAmber/5",
    links: [
      {
        name: "The Farmer's Dog",
        url: "#",
        description: "Fresh, human-grade dog food",
        discount: "50% off first box",
      },
      {
        name: "Nom Nom",
        url: "#",
        description: "Vet-formulated fresh meals",
        discount: "50% off trial",
      },
      {
        name: "Ollie",
        url: "#",
        description: "Customized fresh dog food",
        discount: "60% off first box",
      },
      {
        name: "Smalls (Cats)",
        url: "#",
        description: "Fresh cat food delivery",
        discount: "25% off first order",
      },
    ],
  },
  "pet-sitting": {
    title: "Pet Sitting & Dog Walking",
    description: "Trusted pet sitters and dog walkers in your neighborhood.",
    icon: Dog,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Rover",
        url: "#",
        description: "Nation's largest network of pet sitters",
        discount: "$20 off first booking",
      },
      {
        name: "Wag!",
        url: "#",
        description: "On-demand dog walking",
        discount: "First walk free",
      },
      {
        name: "Pawshake",
        url: "#",
        description: "Trusted local pet sitters",
        discount: "10% off first booking",
      },
    ],
  },
  "dna-tests": {
    title: "Pet DNA Tests",
    description: "Discover your pet's breed, health risks, and ancestry.",
    icon: Dna,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Embark",
        url: "#",
        description: "Most accurate dog DNA test",
        discount: "Up to $50 off",
      },
      {
        name: "Wisdom Panel",
        url: "#",
        description: "350+ breed detection",
        discount: "20% off",
      },
      {
        name: "Basepaws (Cats)",
        url: "#",
        description: "Cat DNA & health screening",
        discount: "15% off",
      },
    ],
  },
  "vet-health": {
    title: "Vet & Health Products",
    description: "Medications, supplements, and health products for your pet.",
    icon: Pill,
    color: "text-cpCoral",
    bgColor: "bg-cpCoral/10 dark:bg-cpCoral/5",
    links: [
      {
        name: "Chewy Pharmacy",
        url: "#",
        description: "Pet medications & prescriptions",
        discount: "35% off first Autoship",
      },
      {
        name: "1-800-PetMeds",
        url: "#",
        description: "America's Pet Health Resource",
        discount: "20% off + free shipping",
      },
      {
        name: "PetCareRx",
        url: "#",
        description: "Trusted pet pharmacy",
        discount: "25% off first order",
      },
    ],
  },
};

export function AffiliateBlock({
  type,
  variant = "card",
  className = "",
  customLinks,
  trackingId,
  categoryContext,
  countrySlug = "netherlands", // Default to Netherlands
}: AffiliateBlockProps) {
  const data = affiliateData[type];
  // Use locale-aware links if countrySlug is provided, otherwise fall back to custom or default
  const localeLinks = getLocaleAwareLinks(type, countrySlug);
  const links = customLinks || (localeLinks.length > 0 ? localeLinks : data.links);
  const Icon = data.icon;

  // Add tracking parameter to URLs
  const getTrackedUrl = (url: string) => {
    if (!trackingId || url === "#") return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}ref=${trackingId}`;
  };

  // Track affiliate click
  const handleAffiliateClick = (link: AffiliateLink, position: number) => {
    trackAffiliateClick({
      affiliateType: type,
      affiliateName: link.name,
      affiliateUrl: link.url,
      variant,
      categoryContext,
      position,
      hasDiscount: !!link.discount,
    });
  };

  // Compact variant - single line
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg ${data.bgColor} ${className}`}>
        <Icon className={`h-5 w-5 ${data.color} shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground dark:text-cpCream truncate">{data.title}</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 gap-1 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10" asChild>
          <a
            href={getTrackedUrl(links[0]?.url || "#")}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => links[0] && handleAffiliateClick(links[0], 0)}
          >
            Learn More <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    );
  }

  // Banner variant - horizontal full-width
  if (variant === "banner") {
    return (
      <div className={`p-4 rounded-xl ${data.bgColor} ${className}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`p-3 rounded-full bg-white dark:bg-cpSurface shadow-sm`}>
            <Icon className={`h-6 w-6 ${data.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-1">{data.title}</h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">{data.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {links.slice(0, 2).map((link, index) => (
              <Button
                key={link.name}
                size="sm"
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-cpCoral hover:bg-cpCoral/90" : "dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"}
                asChild
              >
                <a
                  href={getTrackedUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleAffiliateClick(link, index)}
                >
                  {link.name}
                  {link.discount && (
                    <Badge variant="secondary" className="ml-1 text-xs dark:bg-cpAmber/20 dark:text-cpAmber">
                      {link.discount}
                    </Badge>
                  )}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Inline variant - minimal styling
  if (variant === "inline") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${data.color}`} />
          <h4 className="font-medium text-foreground dark:text-cpCream">{data.title}</h4>
        </div>
        <div className="grid gap-2">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={getTrackedUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link, index)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted dark:hover:bg-cpSurface/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
                  {link.name}
                </span>
                {link.discount && (
                  <Badge variant="secondary" className="text-xs bg-cpCoral/10 text-cpCoral dark:bg-cpCoral/20 dark:text-cpCoral">
                    {link.discount}
                  </Badge>
                )}
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground dark:text-cpCream/50 group-hover:text-cpCoral transition-colors" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Card variant (default) - full featured
  return (
    <Card className={`overflow-hidden hover-lift bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20 ${className}`}>
      <div className={`${data.bgColor} px-4 py-2.5`}>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-white dark:bg-cpSurface shadow-sm shrink-0">
            <Icon className={`h-4 w-4 ${data.color}`} />
          </div>
          <span className="text-sm font-semibold text-foreground dark:text-cpCream">{data.title}</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-cpCoral/30 dark:border-cpAmber/30 text-cpCoral dark:text-cpAmber ml-auto shrink-0">
            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
            Partner
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">{data.description}</p>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={getTrackedUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick(link, index)}
              className="block p-3 rounded-lg border border-border dark:border-cpAmber/20 hover:border-cpCoral dark:hover:border-cpCoral hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="font-medium text-sm text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">
                      {link.name}
                    </span>
                    {index === 0 && (
                      <Badge className="bg-cpAmber/20 text-cpAmber dark:bg-cpAmber/15 dark:text-cpAmber border-0 text-[10px] px-1.5 py-0 h-4">
                        <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                        Top
                      </Badge>
                    )}
                    {link.discount && (
                      <Badge className="bg-cpCoral/10 text-cpCoral dark:bg-cpCoral/15 dark:text-cpCoral border-0 text-[10px] px-1.5 py-0 h-4">
                        {link.discount}
                      </Badge>
                    )}
                  </div>
                  {link.description && (
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60 line-clamp-1">{link.description}</p>
                  )}
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground dark:text-cpCream/40 group-hover:text-cpCoral transition-colors shrink-0 mt-0.5" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured components for each affiliate type
export function PetInsuranceBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-insurance" {...props} />;
}

export function PetCremationBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-cremation" {...props} />;
}

export function PetHotelsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-hotels" {...props} />;
}

export function PetProductsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-products" {...props} />;
}

export function FoodSubscriptionsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="food-subscriptions" {...props} />;
}

export function PetSittingBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="pet-sitting" {...props} />;
}

export function DnaTestsBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="dna-tests" {...props} />;
}

export function VetHealthBlock(props: Omit<AffiliateBlockProps, "type">) {
  return <AffiliateBlock type="vet-health" {...props} />;
}

// Category-aware affiliate recommendation
export function CategoryAffiliateBlock({
  categorySlug,
  variant = "card",
  className = "",
  countrySlug = "netherlands", // For locale-aware affiliate links
}: {
  categorySlug: string;
  variant?: "card" | "inline" | "banner" | "compact";
  className?: string;
  countrySlug?: string;
}) {
  // Map categories to relevant affiliate types
  const categoryAffiliateMap: Record<string, AffiliateType[]> = {
    "veterinarians": ["pet-insurance", "vet-health"],
    "vets": ["pet-insurance", "vet-health"],
    "pet-stores": ["pet-products", "food-subscriptions"],
    "pet-shops": ["pet-products", "food-subscriptions"],
    "groomers": ["pet-products", "pet-sitting"],
    "grooming": ["pet-products", "pet-sitting"],
    "boarding": ["pet-hotels", "pet-sitting"],
    "kennels": ["pet-hotels", "pet-sitting"],
    "pet-hotels": ["pet-hotels", "pet-insurance"],
    "dog-walkers": ["pet-sitting", "pet-insurance"],
    "pet-sitters": ["pet-sitting", "pet-hotels"],
    "trainers": ["pet-products", "pet-sitting"],
    "dog-training": ["pet-products", "dna-tests"],
    "cremation": ["pet-cremation"],
    "pet-cremation": ["pet-cremation"],
    "memorial": ["pet-cremation"],
    "shelters": ["pet-insurance", "pet-products"],
    "adoption": ["pet-insurance", "dna-tests"],
    "breeders": ["dna-tests", "pet-insurance"],
  };

  // Find matching affiliate types
  const matchedTypes = categoryAffiliateMap[categorySlug.toLowerCase()] || ["pet-insurance", "pet-products"];

  return (
    <div className={`space-y-4 ${className}`}>
      {matchedTypes.map((type) => (
        <AffiliateBlock
          key={type}
          type={type}
          variant={variant}
          categoryContext={categorySlug}
          countrySlug={countrySlug}
        />
      ))}
    </div>
  );
}
