import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { businessProfile, siteConfig } from "@/data/business";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${businessProfile.name} | Gas, Diesel, LCBO & Country Style`,
    template: `%s | ${businessProfile.name}`,
  },
  description:
    "Esso Bloomington at Highway 48 and Bloomington Road in Stouffville offers 24-hour fuel, premium gas, retail diesel, DEF, Key to the Highway, Esso Fleet, LCBO Bloomington, Country Style, convenience store items, PC Optimum points on fuel, and a limited-time free coffee, water, or pop offer on a $60+ spend.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${businessProfile.name} | One Stop on Bloomington Road`,
    description:
      "Fuel up, park, grab coffee, shop LCBO Bloomington, and continue your route from 5241 Bloomington Rd in Stouffville.",
    url: siteConfig.url,
    siteName: businessProfile.name,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessProfile.name} | Gas, Diesel, LCBO & Country Style`,
    description:
      "A refined, practical stop for fuel, retail diesel, DEF, LCBO Bloomington, Country Style, parking, and quick convenience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={manrope.variable}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
