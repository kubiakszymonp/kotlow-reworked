import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-semibold text-navy-200">404</p>
      <h1 className="mt-6 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
        Nie znaleziono strony
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        Strona, której szukasz, nie istnieje lub została przeniesiona.
        Zapraszamy na stronę główną parafii.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-700"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Strona główna
      </Link>
    </main>
  );
}
