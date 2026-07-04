import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Article } from "@/api/generated";
import { formatDate } from "@/lib/utils";

export const ARTICLE_TYPE_LABELS: Record<string, string> = {
  ogloszenia_duszpasterskie: "Ogłoszenia",
  intencje_mszalne: "Intencje mszalne",
  artykul: "Aktualności",
  sakrament: "Sakrament",
};

/** Evergreen types where a publish date would be misleading noise. */
const DATELESS_TYPES = new Set(["sakrament"]);

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const thumbnailUrl = article.thumbnail?.url || "/article-placeholder.jpg";
  const typeLabel = ARTICLE_TYPE_LABELS[article.articleType] ?? "";
  const dateLabel = DATELESS_TYPES.has(article.articleType)
    ? ""
    : formatDate(article.publishedAt ?? article.createdAt);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[8/5] overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={article.title ?? ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {typeLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-200 backdrop-blur-sm">
            {typeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {dateLabel && (
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <CalendarDays aria-hidden className="size-3.5 text-gold-500" />
            {dateLabel}
          </p>
        )}

        <h3 className="font-display text-xl font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
          <Link
            href={`/article/${article.slug}`}
            className="after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h3>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
          Czytaj więcej
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
