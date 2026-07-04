import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getArticleBySlug } from "@/api/service/article";
import { ARTICLE_TYPE_LABELS } from "@/components/ArticleCard";
import HtmlContent from "@/components/atomic/html-content";
import { formatDate, htmlToExcerpt } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SITE_URL = "https://sanktuariumkotlow.pl";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getArticleBySlug(slug)).data?.[0];

  if (!article) {
    return {};
  }

  const description = htmlToExcerpt(article.content);

  return {
    title: article.title,
    description: description || undefined,
    alternates: { canonical: `/article/${slug}` },
    openGraph: {
      type: "article",
      url: `/article/${slug}`,
      title: article.title,
      description: description || undefined,
      images: article.thumbnail?.url ? [article.thumbnail.url] : undefined,
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = (await getArticleBySlug(slug)).data?.[0];

  if (!article) {
    notFound();
  }

  const typeLabel = ARTICLE_TYPE_LABELS[article.articleType] ?? "";
  const showDate = article.articleType !== "sakrament";
  const dateLabel = showDate
    ? formatDate(article.publishedAt ?? article.createdAt)
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : undefined,
    dateModified: article.updatedAt
      ? new Date(article.updatedAt).toISOString()
      : undefined,
    image: article.thumbnail?.url
      ? [`${SITE_URL}${article.thumbnail.url}`]
      : undefined,
    author: {
      "@type": "Organization",
      name: "Parafia Rzymsko-katolicka w Kotłowie",
    },
    publisher: { "@id": `${SITE_URL}/#church` },
    mainEntityOfPage: `${SITE_URL}/article/${slug}`,
    inLanguage: "pl-PL",
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/ogloszenia"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Wróć do aktualności
      </Link>

      <header className="mt-8">
        {typeLabel && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            {typeLabel}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
          {article.title}
        </h1>
        {dateLabel && (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CalendarDays aria-hidden className="size-4 text-gold-500" />
            {dateLabel}
          </p>
        )}
        <div aria-hidden className="mt-6 h-0.5 w-16 bg-gold-500" />
      </header>

      {article.thumbnail?.url && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={article.thumbnail.url}
            alt={article.thumbnail.alternativeText || article.title || ""}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <div className="mt-10">
        <HtmlContent content={article.content} />
      </div>
    </main>
  );
}
