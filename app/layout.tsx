import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";
import "./globals.css";

// Primary font - distinctive sans-serif
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Display font for headings - editorial contrast
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CutiePawsPedia - Your Ultimate Pet Directory",
  description: "Discover everything about pets. The comprehensive pet directory for pet lovers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${dmSerif.variable} min-h-screen bg-slate-50 text-slate-900 font-sans antialiased`}>
        {children}
      </body>
    </html>
  );

  // Only wrap with StackProvider if configured
  if (stackServerApp) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${jakarta.variable} ${dmSerif.variable} min-h-screen bg-slate-50 text-slate-900 font-sans antialiased`}>
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {children}
            </StackTheme>
          </StackProvider>
        </body>
      </html>
    );
  }

  return content;
}
