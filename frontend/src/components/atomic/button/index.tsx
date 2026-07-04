import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeHref } from "@/lib/utils";

interface ButtonProps {
  text?: string;
  link?: string;
}

export default function Button({ text, link }: ButtonProps) {
  if (!text) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <Link
        href={normalizeHref(link)}
        className="group inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-700"
      >
        {text}
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
