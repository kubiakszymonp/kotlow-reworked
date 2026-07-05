import Link from "next/link";
import Image from "next/image";
import { Facebook, Landmark, Mail, MapPin, Phone, Rss } from "lucide-react";
import type { NavItem } from "@/components/site-header/SiteHeader";
import { PARISH } from "@/lib/parish";

const PARTNER_LINKS = [
  {
    href: "https://www.diecezja.kalisz.pl/",
    src: "/kuria.png",
    label: "Diecezja Kaliska",
  },
  {
    href: "https://www.opiekun.kalisz.pl/",
    src: "/opiekun.png",
    label: "Dwutygodnik Opiekun",
  },
  {
    href: "https://www.radiorodzina.kalisz.pl/",
    src: "/radio_rodzina.png",
    label: "Radio Rodzina",
  },
];

interface FooterProps {
  items?: NavItem[];
}

export default function Footer({ items = [] }: FooterProps) {
  const quickLinks = items.flatMap((item) =>
    item.subItems.length > 0 ? item.subItems : [{ name: item.name, href: item.href }]
  );

  return (
    <footer className="bg-navy-950 text-navy-100 print:hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Parish identity + contact */}
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            Sanktuarium Kotłów
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Parafia Rzymsko-katolicka
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={PARISH.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-3 transition-colors hover:text-gold-300"
              >
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>
                  {PARISH.address.full}
                  <br />
                  <span className="text-xs text-navy-300">
                    Pokaż na mapie — jak dojechać
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={PARISH.phoneHref}
                className="group inline-flex items-center gap-3 transition-colors hover:text-gold-300"
              >
                <Phone aria-hidden className="size-4 text-gold-400" />
                {PARISH.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={PARISH.emailHref}
                className="group inline-flex items-center gap-3 transition-colors hover:text-gold-300"
              >
                <Mail aria-hidden className="size-4 text-gold-400" />
                {PARISH.email}
              </a>
            </li>
            <li>
              <a
                href={PARISH.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 transition-colors hover:text-gold-300"
              >
                <Facebook aria-hidden className="size-4 text-gold-400" />
                Parafia Kotłów na Facebooku
              </a>
            </li>
          </ul>
        </div>

        {/* Quick links from the CMS navigation */}
        <nav aria-label="Mapa strony">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Na skróty
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            {quickLinks.map((link) => (
              <li key={`${link.href}-${link.name}`}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-gold-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-300"
              >
                <Rss aria-hidden className="size-3.5 text-gold-400" />
                Kanał RSS
              </a>
            </li>
          </ul>
        </nav>

        {/* Donations + partners */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Wsparcie parafii
          </p>
          <p className="mt-5 inline-flex items-start gap-3 text-sm leading-relaxed">
            <Landmark aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
            <span>
              Numer konta parafii:
              <br />
              <span className="font-semibold text-white">
                {PARISH.bankAccount}
              </span>
            </span>
          </p>

          <div className="mt-6 flex items-center gap-4">
            {PARTNER_LINKS.map((partner) => (
              <a
                key={partner.href}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.label}
                className="rounded-lg bg-white/90 p-1.5 opacity-80 transition-opacity hover:opacity-100"
              >
                <Image
                  src={partner.src}
                  alt={partner.label}
                  width={56}
                  height={56}
                  className="size-12 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-navy-300 sm:px-6">
          © {new Date().getFullYear()} Parafia Rzymsko-katolicka w Kotłowie ·
          Sanktuarium Kotłów
        </p>
      </div>
    </footer>
  );
}
