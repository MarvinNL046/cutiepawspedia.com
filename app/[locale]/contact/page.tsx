/**
 * Contact Page - Static contact form page
 *
 * CACHING STRATEGY: Force Static
 * - Form content is static, submission is client-side
 * - revalidate: 86400 (24 hours) for occasional updates
 * - Optimal performance with pre-rendered content
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Static page with daily revalidation - content rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cpDark mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">Have questions? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form and we&apos;ll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email" />
                <Input placeholder="Subject" />
                <textarea
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Your message..."
                />
                <Button type="submit" className="w-full bg-cpPink hover:bg-cpPink/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-cpDark">Email</h3>
                    <p className="text-slate-600">support@cutiepawspedia.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-cpDark">Office</h3>
                    <p className="text-slate-600">Amsterdam, Netherlands</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
