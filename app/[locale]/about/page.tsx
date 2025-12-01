import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 300;

export default async function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-cpDark mb-6">About CutiePawsPedia</h1>

        <p className="text-lg text-slate-600 mb-8">
          CutiePawsPedia is the world&apos;s leading directory for pet services.
          We connect pet owners with trusted businesses that care for their
          furry, feathered, and scaly friends.
        </p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-cpDark mb-4">Our Mission</h2>
            <p className="text-slate-600">
              To make finding quality pet care simple, transparent, and trustworthy.
              Every pet deserves the best care, and every pet owner deserves peace of mind.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-cpDark mb-4">What We Offer</h2>
        <ul className="space-y-3 mb-8">
          {[
            "Comprehensive listings of pet services worldwide",
            "Verified reviews from real pet owners",
            "Easy comparison of services and prices",
            "Direct contact with businesses",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-cpPink">✓</span>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
