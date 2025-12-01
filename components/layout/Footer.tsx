import Link from "next/link";
import { NewsletterForm } from "@/components/forms";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50">
      {/* Newsletter Section */}
      <div className="bg-cpPink/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-cpDark">Stay Updated</h3>
              <p className="text-sm text-slate-600">Get the latest pet care tips and new listings in your inbox.</p>
            </div>
            <div className="md:w-96">
              <NewsletterForm variant="inline" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-cpDark">
                Cutie<span className="text-cpPink">Paws</span>Pedia
              </span>
            </Link>
            <p className="text-sm text-slate-600">
              The ultimate directory for pet services. Find the best pet care
              providers in your area.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-cpDark">Directory</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href={`/${locale}`} className="hover:text-cpPink transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-cpPink transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/for-businesses`} className="hover:text-cpPink transition-colors">
                  Add Your Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-cpDark">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-cpPink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-cpPink transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-cpPink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-cpPink transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-cpDark">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <span className="hover:text-cpPink transition-colors cursor-pointer">
                  🏨 Pet Hotels
                </span>
              </li>
              <li>
                <span className="hover:text-cpPink transition-colors cursor-pointer">
                  🩺 Veterinarians
                </span>
              </li>
              <li>
                <span className="hover:text-cpPink transition-colors cursor-pointer">
                  ✂️ Pet Grooming
                </span>
              </li>
              <li>
                <span className="hover:text-cpPink transition-colors cursor-pointer">
                  🐕 Dog Training
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {currentYear} CutiePawsPedia. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-slate-400 hover:text-cpPink cursor-pointer">
              Twitter
            </span>
            <span className="text-slate-400 hover:text-cpPink cursor-pointer">
              Instagram
            </span>
            <span className="text-slate-400 hover:text-cpPink cursor-pointer">
              Facebook
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
