import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 300;

export default async function ForBusinessesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="secondary" className="mb-4">For Pet Businesses</Badge>
        <h1 className="text-4xl font-bold text-cpDark mb-6">
          Grow Your Pet Business with CutiePawsPedia
        </h1>
        <p className="text-lg text-slate-600">
          Join thousands of pet service providers who reach millions of pet owners.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Free Listing</CardTitle>
            <CardDescription>Get started for free</CardDescription>
            <div className="text-3xl font-bold text-cpDark mt-4">€0</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Basic business profile</li>
              <li>✓ Contact information</li>
              <li>✓ Customer reviews</li>
            </ul>
            <Button className="w-full mt-6" variant="outline">Get Started</Button>
          </CardContent>
        </Card>

        <Card className="border-cpPink border-2 relative">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cpPink">Popular</Badge>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Most popular choice</CardDescription>
            <div className="text-3xl font-bold text-cpDark mt-4">€29<span className="text-sm font-normal">/mo</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Everything in Free</li>
              <li>✓ Featured in listings</li>
              <li>✓ Analytics dashboard</li>
            </ul>
            <Button className="w-full mt-6 bg-cpPink hover:bg-cpPink/90">Upgrade Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large businesses</CardDescription>
            <div className="text-3xl font-bold text-cpDark mt-4">Custom</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Multiple locations</li>
              <li>✓ API access</li>
              <li>✓ Dedicated support</li>
            </ul>
            <Button className="w-full mt-6" variant="outline">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
