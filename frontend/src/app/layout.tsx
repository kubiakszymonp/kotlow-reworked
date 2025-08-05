import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka w Kotłowie",
  description: "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Sanktuarium, msze święte, sakramenty, ogłoszenia parafialne, intencje mszalne, grupy parafialne, historia parafii Kotłów.",
  keywords: [
    "Kotłów", "parafia Kotłów", "sanktuarium Kotłów", "kościół Kotłów",
    "parafia rzymsko-katolicka", "msze święte Kotłów", "sakramenty",
    "chrzest Kotłów", "bierzmowanie", "komunia święta", "małżeństwo",
    "spowiedź", "namaszczenie chorych", "pogrzeb", "ślub",
    "ogłoszenia parafialne", "intencje mszalne", "rozkład mszy",
    "grupy parafialne", "ministranci", "schola", "róże różańcowe",
    "legion maryi", "diecezja kaliska", "proboszcz Kotłów",
    "kancelaria parafialna", "telefon do parafii", "adres parafii",
    "historia parafii", "patron parafii", "odpust parafialny"
  ],
  authors: [{ name: "Parafia Rzymsko-katolicka w Kotłowie" }],
  creator: "Parafia Rzymsko-katolicka w Kotłowie",
  publisher: "Parafia Rzymsko-katolicka w Kotłowie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sanktuariumkotlow.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka w Kotłowie",
    description: "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Sanktuarium, msze święte, sakramenty, ogłoszenia parafialne, intencje mszalne, grupy parafialne.",
    url: 'https://sanktuariumkotlow.pl',
    siteName: 'Parafia Kotłów',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/obraz.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanktuarium w Kotłowie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka w Kotłowie",
    description: "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Sanktuarium, msze święte, sakramenty, ogłoszenia parafialne.",
    images: ['/obraz.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'religion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "Parafia Rzymsko-katolicka w Kotłowie",
              "alternateName": "Sanktuarium Kotłów",
              "description": "Parafia Rzymsko-katolicka w Kotłowie - sanktuarium, msze święte, sakramenty, grupy parafialne",
              "url": "https://sanktuariumkotlow.pl",
              "telephone": "+48573791098",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kotłów",
                "addressCountry": "Poland",
                "addressRegion": "Wielkopolska"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.7167",
                "longitude": "18.0833"
              },
              "openingHours": [
                "Mo-Su 06:00-20:00"
              ],
              "sameAs": [
                "https://facebook.com/ParafiaKotlow"
              ],
              "serviceType": [
                "Msze święte",
                "Sakramenty",
                "Chrzest",
                "Bierzmowanie",
                "Komunia święta",
                "Małżeństwo",
                "Pogrzeb",
                "Spowiedź"
              ],
              "parentOrganization": {
                "@type": "Organization",
                "name": "Diecezja Kaliska"
              }
            })
          }}
        />
      </head>
      <body className={`${mulish.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

