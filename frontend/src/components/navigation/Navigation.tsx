"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import { getNavigation } from "@/api/service/navigation";
import { NavigationItemComponent } from "@/api/generated";
import { ChevronDownIcon } from "lucide-react";

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
  const [navigationItems, setNavigationItems] = useState<
    NavigationItemComponent[]
  >([]);

  useEffect(() => {
    const fetchNavigation = async () => {
      const navigation = await getNavigation();
      setNavigationItems(navigation.data?.items ?? []);
    };
    fetchNavigation();
  }, []);

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  const handleMobileDropdownToggle = (label: string) => {
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
                key={`${item.link}${item.name}`}
                className={`${styles.navItem} ${
                  item.subItems ? styles.hasDropdown : ""
                }`}
                onMouseEnter={() =>
                  item.subItems && setOpenDropdown(item.name ?? "")
                }
                onMouseLeave={() => item.subItems && setOpenDropdown(null)}
              >
                {item.subItems && item.subItems.length > 0 ? (
                  <span className={styles.underline}>{item.name}</span>
                ) : (
                  <Link href={item.link ?? ""} className={styles.underline}>
                    {item.name}
                  </Link>
                )}

                {item.subItems && (
                  <div
                    className={`${styles.dropdown} ${
                      openDropdown === item.name ? styles.open : ""
                    }`}
                  >
                    <ul className={styles.dropdownList}>
                      {item.subItems.map((subitem) => (
                        <li key={subitem.link} className={styles.dropdownItem}>
                          <Link
                            href={subitem.link ?? ""}
                            className={styles.dropdownLink}
                            onClick={handleDropdownClose}
                          >
                            {subitem.name}
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
          onChange={(e) => {
            console.log(e.target.checked);
            setIsMenuOpen(e.target.checked);
          }}
        />
        <label htmlFor="hamburger-toggle" className={styles.menu}>
          <span className={styles.hamburger}></span>
        </label>
        <ul>
          {navigationItems.map((item) => (
            <li key={`${item.link}${item.name}`} className={styles.navItem}>
              {/* Main nav item */}
              {item.subItems && item.subItems.length > 0 ? (
                <div
                  className={styles.mobileItemContainer}
                  onClick={() => handleMobileDropdownToggle(item.name ?? "")}
                >
                  <span className={styles.underline}>{item.name}</span>
                  <span
                    className={`${styles.mobileDropdownToggle} ${
                      openMobileDropdown === item.name ? styles.open : ""
                    }`}
                  >
                    <ChevronDownIcon />
                  </span>
                </div>
              ) : (
                <Link
                  href={item.link ?? ""}
                  className={styles.mobileItemContainer}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={styles.underline}>{item.name}</span>
                </Link>
              )}

              {/* Subitems */}
              {Boolean(item.subItems?.length) &&
                openMobileDropdown === item.name && (
                  <ul className={styles.mobileDropdownList}>
                    {item.subItems?.map((subitem) => (
                      <li
                        key={subitem.link}
                        className={styles.mobileDropdownItem}
                      >
                        <Link
                          href={subitem.link ?? ""}
                          className={styles.mobileDropdownLink}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenMobileDropdown(null);
                          }}
                        >
                          {subitem.name}
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
