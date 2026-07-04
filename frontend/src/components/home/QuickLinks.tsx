import Link from "next/link";
import {
  BookOpenText,
  Church,
  HandHeart,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

interface QuickLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const QUICK_LINKS: QuickLink[] = [
  {
    title: "Ogłoszenia parafialne",
    description: "Bieżące informacje z życia parafii",
    href: "/ogloszenia",
    icon: Megaphone,
  },
  {
    title: "Intencje mszalne",
    description: "Intencje na najbliższy tydzień",
    href: "/intencje",
    icon: HandHeart,
  },
  {
    title: "Sakramenty",
    description: "Chrzest, bierzmowanie, małżeństwo…",
    href: "/sakramenty",
    icon: Church,
  },
  {
    title: "Historia sanktuarium",
    description: "Dzieje parafii sięgające XII wieku",
    href: "/historia",
    icon: BookOpenText,
  },
];

export default function QuickLinks() {
  return (
    <section aria-label="Na skróty" className="bg-navy-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col gap-3 bg-navy-900 p-8 transition-colors hover:bg-navy-800"
          >
            <link.icon
              aria-hidden
              className="size-8 text-gold-400 transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="font-display text-lg font-semibold text-white">
              {link.title}
            </span>
            <span className="text-sm font-light leading-relaxed text-navy-200">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
