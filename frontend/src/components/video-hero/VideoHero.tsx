import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function VideoHero() {
  return (
    <section className="relative flex h-[92svh] min-h-[560px] w-full items-end overflow-hidden bg-navy-950">
      {/* LCP image + static fallback (also shown under reduced motion / on
          mobile where the video is skipped). priority = eager LCP fetch. */}
      <Image
        src="/obraz.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <HeroVideo />

      {/* Legibility gradient — bottom-heavy so the video stays visible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/45 to-navy-950/30"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 sm:pb-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300 sm:text-sm">
          Parafia Rzymsko-katolicka w Kotłowie
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
          Sanktuarium
          <span className="block text-gold-200">Kotłów</span>
        </h1>
        <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-navy-100 sm:text-lg">
          Miejsce modlitwy i pielgrzymowania na wzgórzu kotłowskim — jedna z
          najstarszych parafii w Wielkopolsce.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/ogloszenia"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy-950 transition-colors hover:bg-gold-400"
          >
            Ogłoszenia parafialne
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="/historia"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            Poznaj historię
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 motion-safe:animate-bounce"
      >
        <ChevronDown className="size-7" />
      </div>
    </section>
  );
}
