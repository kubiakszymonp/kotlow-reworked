import type { Metadata } from "next";
import { PARISH } from "@/lib/parish";

/**
 * Next.js metadata does a SHALLOW merge: a page that sets `openGraph` replaces
 * the layout's `openGraph` wholesale, dropping og:image / og:site_name /
 * og:locale. Every page must therefore spread this base into its own openGraph
 * so shares (Facebook is the parish's main channel) always carry an image.
 */
export const OG_BASE: Metadata["openGraph"] = {
  siteName: PARISH.shortName,
  locale: "pl_PL",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Obraz Matki Bożej z Dzieciątkiem — Sanktuarium w Kotłowie",
    },
  ],
};

/** Build a page-level openGraph on top of the shared base. */
export function openGraph(
  overrides: NonNullable<Metadata["openGraph"]>
): Metadata["openGraph"] {
  return { ...OG_BASE, ...overrides };
}
