import { Facebook, Phone } from "lucide-react";

export default function ContactBand() {
  return (
    <section
      aria-label="Kontakt z parafią"
      className="relative overflow-hidden bg-navy-950"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,155,63,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            Kontakt z parafią
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Jesteśmy do Państwa dyspozycji
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-navy-200">
            W sprawach kancelaryjnych, intencji mszalnych i sakramentów
            prosimy o kontakt telefoniczny lub wiadomość na Facebooku.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+48573791098"
            className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-950 transition-colors hover:bg-gold-400"
          >
            <Phone aria-hidden className="size-4" />
            573 791 098
          </a>
          <a
            href="https://facebook.com/ParafiaKotlow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            <Facebook aria-hidden className="size-4" />
            Parafia Kotłów
          </a>
        </div>
      </div>
    </section>
  );
}
