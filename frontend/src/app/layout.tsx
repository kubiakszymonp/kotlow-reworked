import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { getNavigation } from "@/api/service/navigation";
import SiteHeader, { NavItem } from "@/components/site-header/SiteHeader";
import Footer from "@/components/footer/Footer";
import { normalizeHref } from "@/lib/utils";
import { PARISH, SITE_URL } from "@/lib/parish";
import { OG_BASE } from "@/lib/seo";
import { jsonLdScript } from "@/lib/jsonLd";

const mulish = Mulish({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  // Only 600 is used (all display headings are font-semibold).
  weight: ["600"],
  variable: "--font-cormorant",
  display: "swap",
});

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
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "Sanktuarium Kotłów — aktualności" },
      ],
    },
  },
  openGraph: {
    ...OG_BASE,
    type: "website",
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
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
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
      name: PARISH.name,
      alternateName: PARISH.shortName,
      description:
        "Parafia Rzymsko-katolicka w Kotłowie — sanktuarium, msze święte, sakramenty, ogłoszenia parafialne",
      url: SITE_URL,
      telephone: PARISH.phoneE164,
      email: PARISH.email,
      image: `${SITE_URL}/og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: PARISH.address.street,
        postalCode: PARISH.address.postalCode,
        addressLocality: PARISH.address.locality,
        addressRegion: PARISH.address.region,
        addressCountry: PARISH.address.country,
      },
      hasMap: PARISH.mapUrl,
      sameAs: [PARISH.facebookUrl],
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
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
      </head>
      <body className={`${mulish.variable} ${cormorant.variable} font-sans`}>
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Przejdź do treści
        </a>
        <SiteHeader items={navItems} />
        <div className="flex min-h-screen flex-col">
          <div id="tresc" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </div>
          <Footer items={navItems} />
        </div>
      </body>
    </html>
  );
}
