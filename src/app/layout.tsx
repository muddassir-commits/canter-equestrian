import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Canter Equestrians",
    default: "Canter Equestrians — Crafted for the Ride",
  },
  description: "Premium handcrafted equestrian gear. Full-grain leather bridles, halters & tack. Indian craftsmanship, shipped worldwide.",
  metadataBase: new URL("https://cantercompany.com"),
  openGraph: {
    title: "Canter Equestrians — Crafted for the Ride",
    description: "Premium handcrafted equestrian gear. Full-grain leather bridles, halters & tack. Indian craftsmanship, shipped worldwide.",
    url: "https://cantercompany.com",
    siteName: "Canter Equestrians",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}


