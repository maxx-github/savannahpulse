import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: "SavannahPulse - Discover the Heart of Kenya",
    template: "%s | SavannahPulse",
  },
  description: "Your gateway to the heart of Kenya. Book flights, find luxury stays, and discover authentic cultural experiences in Maasai Mara, Diani Beach, and beyond.",
  keywords: ["Kenya travel", "Maasai Mara safari", "Diani Beach", "Mount Kenya trek", "Lamu Old Town", "Kenya flights", "African tourism"],
  authors: [{ name: "SavannahPulse Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://savannahpulse.co.ke",
    siteName: "SavannahPulse",
    title: "SavannahPulse - Discover the Heart of Kenya",
    description: "Book flights, find luxury stays, and discover authentic cultural experiences in Kenya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SavannahPulse - Discover the Heart of Kenya",
    description: "Book flights, find luxury stays, and discover authentic cultural experiences in Kenya.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4a940",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
