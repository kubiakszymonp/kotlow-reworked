import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeHref } from "@/lib/utils";

interface CardProps {
  title?: string;
  shortText?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  linkText?: string;
  linkUrl?: string;
}

export default function Card({
  title,
  shortText,
  image,
  linkText,
  linkUrl,
}: CardProps) {
  const cardContent = (
    <article className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {image?.url && (
        <div className="relative aspect-[8/5] overflow-hidden">
          <Image
            src={image.url}
            alt={image.alternativeText || title || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="font-display text-xl font-semibold text-navy-900">
            {title}
          </h3>
        )}
        {shortText && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {shortText}
          </p>
        )}
        {linkText && linkUrl && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
            {linkText}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </article>
  );

  if (linkUrl) {
    return (
      <Link href={normalizeHref(linkUrl)} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
