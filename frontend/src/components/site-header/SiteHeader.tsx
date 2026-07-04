"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  subItems: { name: string; href: string }[];
}

interface SiteHeaderProps {
  items: NavItem[];
}

export default function SiteHeader({ items }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays whenever the route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setOpenDropdown(null);
    setOpenAccordion(null);
  }

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpenDropdown(null);
      setMenuOpen(false);
    }
  }, []);

  const solid = !isHome || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? "bg-navy-900/95 shadow-lg shadow-navy-950/20 backdrop-blur-sm"
            : "bg-gradient-to-b from-navy-950/70 via-navy-950/30 to-transparent"
        )}
        onKeyDown={onKeyDown}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
          <Link href="/" className="group flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-wide text-white transition-colors group-hover:text-gold-300 sm:text-2xl">
              Sanktuarium Kotłów
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-300/90 sm:text-[11px]">
              Parafia Rzymsko-katolicka
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Nawigacja główna" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) =>
                item.subItems.length > 0 ? (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.name}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-gold-300"
                    >
                      {item.name}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-4 transition-transform",
                          openDropdown === item.name && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-1/2 top-full min-w-56 -translate-x-1/2 pt-2 transition-all",
                        openDropdown === item.name
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      )}
                    >
                      <ul className="overflow-hidden rounded-lg border border-navy-100 bg-white py-1 shadow-xl shadow-navy-950/15">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-50 hover:text-navy-700"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-gold-300",
                        pathname === item.href && "text-gold-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-md p-2 text-white lg:hidden"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-7" aria-hidden /> : <Menu className="size-7" aria-hidden />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-navy-950/98 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <nav aria-label="Nawigacja mobilna" className="px-6 py-8">
            <ul className="space-y-1">
              {items.map((item) =>
                item.subItems.length > 0 ? (
                  <li key={item.name} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={openAccordion === item.name}
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === item.name ? null : item.name
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-white"
                    >
                      {item.name}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-5 text-gold-300 transition-transform",
                          openAccordion === item.name && "rotate-180"
                        )}
                      />
                    </button>
                    <ul
                      className={cn(
                        "space-y-1 overflow-hidden pl-4 transition-all",
                        openAccordion === item.name
                          ? "max-h-96 pb-4"
                          : "max-h-0"
                      )}
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className="block py-2 text-base text-navy-100 transition-colors hover:text-gold-300"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.name} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      className="block py-4 text-lg font-semibold text-white transition-colors hover:text-gold-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Reserve header space on subpages (the homepage hero slides underneath) */}
      {!isHome && <div aria-hidden className="h-16 lg:h-20" />}
    </>
  );
}
