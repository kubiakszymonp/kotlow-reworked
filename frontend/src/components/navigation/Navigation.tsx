"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navigation.module.scss";

interface NavigationItem {
  href: string;
  label: string;
  subitems?: NavigationItem[];
}

interface NavigationProps {
  withBackground?: boolean;
}

export default function Navigation({
  withBackground = false,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  const navigationItems: NavigationItem[] = [
    { href: "/", label: "Strona główna" },
    {
      href: "/parafia",
      label: "Parafia",
      subitems: [
        { href: "/parafia/ogloszenia", label: "Ogłoszenia" },
        { href: "/parafia/intencje", label: "Intencje" },
        { href: "/parafia/historia", label: "Historia" },
        { href: "/parafia/kontakt", label: "Kontakt" },
      ],
    },
    {
      href: "/sakramenty",
      label: "Sakramenty",
      subitems: [
        { href: "/sakramenty/chrzest", label: "Chrzest" },
        { href: "/sakramenty/bierzmowanie", label: "Bierzmowanie" },
        { href: "/sakramenty/eucharystia", label: "Eucharystia" },
        { href: "/sakramenty/spowiedz", label: "Spowiedź" },
        { href: "/sakramenty/malzenstwo", label: "Małżeństwo" },
        { href: "/sakramenty/namaszczenie", label: "Namaszczenie chorych" },
        { href: "/sakramenty/komunia", label: "Komunia święta" },
        { href: "/sakramenty/pasy", label: "Pasy" },
      ],
    },
    {
      href: "/grupy",
      label: "Grupy",
      subitems: [
        { href: "/grupy/ministranci", label: "Ministranci" },
        { href: "/grupy/schola", label: "Schola" },
        { href: "/grupy/roze-rozancowe", label: "Róże różańcowe" },
        { href: "/grupy/legion-maryi", label: "Legion Maryi" },
      ],
    },
    { href: "/aktualnosci", label: "Aktualności" },
  ];

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  const handleMobileDropdownToggle = (label: string, e: React.MouseEvent) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`${styles.horizontalNav} ${
          withBackground ? styles.withBackground : ""
        }`}
      >
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li
                key={item.href}
                className={`${styles.navItem} ${
                  item.subitems ? styles.hasDropdown : ""
                }`}
                onMouseEnter={() =>
                  item.subitems && setOpenDropdown(item.label)
                }
                onMouseLeave={() => item.subitems && setOpenDropdown(null)}
              >
                <Link href={item.href} className={styles.underline}>
                  {item.label}
                </Link>

                {item.subitems && (
                  <div
                    className={`${styles.dropdown} ${
                      openDropdown === item.label ? styles.open : ""
                    }`}
                  >
                    <ul className={styles.dropdownList}>
                      {item.subitems.map((subitem) => (
                        <li key={subitem.href} className={styles.dropdownItem}>
                          <Link
                            href={subitem.href}
                            className={styles.dropdownLink}
                            onClick={handleDropdownClose}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={styles.hamburgerNav}>
        <input
          id="hamburger-toggle"
          type="checkbox"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
        />
        <label htmlFor="hamburger-toggle" className={styles.menu}>
          <span className={styles.hamburger}></span>
        </label>
        <ul>
          {isMenuOpen &&
            navigationItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                {/* Main nav item */}
                <div 
                  className={styles.mobileItemContainer}
                  onClick={item.subitems ? (e) => handleMobileDropdownToggle(item.label, e) : () => setIsMenuOpen(false)}
                >
                  <span className={styles.underline}>
                    {item.label}
                  </span>

                  {item.subitems && (
                    <span
                      className={`${styles.mobileDropdownToggle} ${
                        openMobileDropdown === item.label ? styles.open : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>

                {/* Subitems */}
                {item.subitems && openMobileDropdown === item.label && (
                  <ul className={styles.mobileDropdownList}>
                    {item.subitems.map((subitem) => (
                      <li
                        key={subitem.href}
                        className={styles.mobileDropdownItem}
                      >
                        <Link
                          href={subitem.href}
                          className={styles.mobileDropdownLink}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenMobileDropdown(null);
                          }}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
