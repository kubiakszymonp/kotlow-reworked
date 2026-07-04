import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { getNavigation } from "@/api/service/navigation";
import SiteHeader, { NavItem } from "@/components/site-header/SiteHeader";
import Footer from "@/components/footer/Footer";
import { normalizeHref } from "@/lib/utils";

const mulish = Mulish({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL = "https://sanktuariumkotlow.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka w Kotłowie",
    template: "%s | Sanktuarium Kotłów",
  },
  description:
    "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Sanktuarium, msze święte, sakramenty, ogłoszenia parafialne, intencje mszalne, historia parafii Kotłów.",
  authors: [{ name: "Parafia Rzymsko-katolicka w Kotłowie" }],
  formatDetection: {
    email: false,
    address: false,
  },
  openGraph: {
    siteName: "Sanktuarium Kotłów",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/obraz.jpg",
        width: 979,
        height: 980,
        alt: "Sanktuarium w Kotłowie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "religion",
};

export const viewport: Viewport = {
  themeColor: "#264663",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Church",
      "@id": `${SITE_URL}/#church`,
      name: "Parafia Rzymsko-katolicka w Kotłowie",
      alternateName: "Sanktuarium Kotłów",
      description:
        "Parafia Rzymsko-katolicka w Kotłowie — sanktuarium, msze święte, sakramenty, ogłoszenia parafialne",
      url: SITE_URL,
      telephone: "+48573791098",
      image: `${SITE_URL}/obraz.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kotłów",
        addressCountry: "PL",
      },
      sameAs: ["https://facebook.com/ParafiaKotlow"],
      parentOrganization: {
        "@type": "Organization",
        name: "Diecezja Kaliska",
        url: "https://diecezja.kalisz.pl",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Sanktuarium Kotłów",
      url: SITE_URL,
      description: "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie",
      publisher: { "@id": `${SITE_URL}/#church` },
      inLanguage: "pl-PL",
    },
  ],
};

async function getNavItems(): Promise<NavItem[]> {
  try {
    const navigation = await getNavigation();
    return (navigation.data?.items ?? []).map((item) => ({
      name: item.name ?? "",
      href: normalizeHref(item.link),
      subItems: (item.subItems ?? []).map((subItem) => ({
        name: subItem.name ?? "",
        href: normalizeHref(subItem.link),
      })),
    }));
  } catch {
    // Strapi being down should not take the whole layout with it
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavItems();

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${mulish.variable} ${cormorant.variable} font-sans`}>
        <SiteHeader items={navItems} />
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <Footer items={navItems} />
        </div>
      </body>
    </html>
  );
}
