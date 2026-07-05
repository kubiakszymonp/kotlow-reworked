import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getArticleBySlug } from "@/api/service/article";
import HtmlContent from "@/components/atomic/html-content";
import ShareBar from "@/components/article/ShareBar";
import BackToTop from "@/components/BackToTop";
import { formatDate, htmlToExcerpt } from "@/lib/utils";
import { SITE_URL } from "@/lib/parish";
import { openGraph } from "@/lib/seo";
import { articleTypeMeta } from "@/lib/articles";
import { jsonLdScript } from "@/lib/jsonLd";

// ISR: article HTML is cached and refreshed via Strapi webhook (revalidateTag).
export const revalidate = 120;

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
    openGraph: openGraph({
      type: "article",
      url: `/article/${slug}`,
      title: article.title,
      description: description || undefined,
      // Only override images when the article has a thumbnail; otherwise leave
      // the base site OG image (spreading `undefined` would wipe it).
      ...(article.thumbnail?.url
        ? { images: [article.thumbnail.url] }
        : {}),
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      modifiedTime: article.updatedAt
        ? new Date(article.updatedAt).toISOString()
        : undefined,
    }),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = (await getArticleBySlug(slug)).data?.[0];

  if (!article) {
    notFound();
  }

  const { label: typeLabel, listingPath, dateless } = articleTypeMeta(
    article.articleType
  );
  const dateLabel = dateless
    ? ""
    : formatDate(article.publishedAt ?? article.createdAt);
  const description = htmlToExcerpt(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":
          article.articleType === "ogloszenia_duszpasterskie"
            ? "NewsArticle"
            : "Article",
        headline: article.title,
        description: description || undefined,
        datePublished: article.publishedAt
          ? new Date(article.publishedAt).toISOString()
          : undefined,
        dateModified: article.updatedAt
          ? new Date(article.updatedAt).toISOString()
          : undefined,
        image: article.thumbnail?.url
          ? [`${SITE_URL}${article.thumbnail.url}`]
          : [`${SITE_URL}/og-image.jpg`],
        author: { "@id": `${SITE_URL}/#church` },
        publisher: { "@id": `${SITE_URL}/#church` },
        mainEntityOfPage: `${SITE_URL}/article/${slug}`,
        inLanguage: "pl-PL",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: typeLabel || "Aktualności",
            item: `${SITE_URL}${listingPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <Link
        href={listingPath}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-700"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Wróć do listy
      </Link>

      <header className="mt-8">
        {typeLabel && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
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

      <div className="mt-12 border-t border-border pt-6">
        <ShareBar url={`${SITE_URL}/article/${slug}`} title={article.title ?? ""} />
      </div>

      <BackToTop />
    </main>
  );
}
