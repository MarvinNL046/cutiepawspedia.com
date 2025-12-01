import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-slate-50 text-slate-900 font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
