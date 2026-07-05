"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating "back to top" control that appears after the user scrolls down. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Powrót na górę strony"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-navy-800 p-3 text-white shadow-lg transition-colors hover:bg-navy-700 print:hidden"
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  );
}
