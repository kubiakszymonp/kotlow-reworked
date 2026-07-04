"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
        Coś poszło nie tak
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        Wystąpił chwilowy problem z wczytaniem strony. Prosimy spróbować
        ponownie za chwilę.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-700"
        >
          <RefreshCw aria-hidden className="size-4" />
          Spróbuj ponownie
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-navy-300 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-800 transition-colors hover:border-navy-800"
        >
          Strona główna
        </Link>
      </div>
    </main>
  );
}
