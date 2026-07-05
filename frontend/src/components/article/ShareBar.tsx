"use client";

import { useState } from "react";
import { Check, Facebook, Link2, Printer, Share2 } from "lucide-react";

interface ShareBarProps {
  /** Absolute URL of the article. */
  url: string;
  title: string;
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 transition-colors hover:border-navy-400 hover:text-navy-900";

export default function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    // Native share sheet where available (mobile) — best for WhatsApp/Messenger.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user dismissed — fall through to copy
      }
    }
    await copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — no-op
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <span className="text-sm font-semibold text-muted-foreground">
        Udostępnij:
      </span>

      <button type="button" onClick={share} className={buttonClass}>
        <Share2 aria-hidden className="size-4" />
        Wyślij
      </button>

      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Facebook aria-hidden className="size-4" />
        Facebook
      </a>

      <button
        type="button"
        onClick={copy}
        className={buttonClass}
        aria-label="Kopiuj link do artykułu"
      >
        {copied ? (
          <>
            <Check aria-hidden className="size-4 text-green-600" />
            Skopiowano
          </>
        ) : (
          <>
            <Link2 aria-hidden className="size-4" />
            Kopiuj link
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        className={buttonClass}
      >
        <Printer aria-hidden className="size-4" />
        Drukuj
      </button>
    </div>
  );
}
