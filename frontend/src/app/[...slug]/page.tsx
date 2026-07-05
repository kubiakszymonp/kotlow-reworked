import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import { getStaticPageBySlug } from "@/api/service/static-page";
import { getListingBySlug } from "@/api/service/listing";
import { getArticlesByQuery } from "@/api/service/articles";
import { DynamicZone } from "@/components/dynamicZone";
import { ArticlesView } from "@/components/ArticlesView";
import SectionHeading from "@/components/atomic/header";
import { htmlToExcerpt } from "@/lib/utils";
import { openGraph } from "@/lib/seo";

// ISR: CMS pages/listings are cached and refreshed via Strapi webhook. Static
// pages prerender fully; listings stay dynamic only because they read ?page=.
export const revalidate = 120;

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function resolveSlug(slugSegments: string[]): string {
  return slugSegments.join("/");
}

/** Coerce a `?page=` query value to a positive page number (defaults to 1). */
function parsePage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const slug = resolveSlug(slugSegments);

  const staticPage = await getStaticPageBySlug(slug);
  const pageMatched = staticPage.data?.[0];

  if (pageMatched) {
    const components = (pageMatched.components ?? []) as DynamicComponent[];
    const htmlComponent = components.find(
      (component) => component.__component === "atomic.html-content"
    );
    const description = htmlToExcerpt(
      htmlComponent && "content" in htmlComponent
        ? htmlComponent.content
        : undefined
    );

    return {
      title: pageMatched.title,
      description: description || undefined,
      alternates: { canonical: `/${slug}` },
      openGraph: openGraph({ url: `/${slug}`, title: pageMatched.title }),
    };
  }

  const listing = await getListingBySlug(slug);
  const listingMatched = listing.data?.[0];

  if (listingMatched) {
    // Self-referencing canonical on paginated pages (Google's pagination
    // guidance): /ogloszenia?page=3 must not canonicalize to page 1.
    const page = parsePage((await searchParams).page);
    const canonical = page > 1 ? `/${slug}?page=${page}` : `/${slug}`;

    return {
      title: listingMatched.title,
      description: `${listingMatched.title} — aktualne wpisy Parafii Rzymsko-katolickiej w Kotłowie.`,
      alternates: { canonical },
      openGraph: openGraph({
        url: canonical,
        title: listingMatched.title ?? undefined,
      }),
    };
  }

  return {};
}

export default async function StaticPage({ params, searchParams }: PageProps) {
  const { slug: slugSegments } = await params;
  const slug = resolveSlug(slugSegments);

  const staticPage = await getStaticPageBySlug(slug);
  const pageMatched = staticPage.data?.[0];

  if (pageMatched) {
    const components = (pageMatched.components ?? []) as DynamicComponent[];
    const hasCmsHeader = components.some(
      (component) => component.__component === "atomic.header"
    );

    return (
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        {!hasCmsHeader && (
          <SectionHeading title={pageMatched.title} level={1} className="mb-12" />
        )}
        <DynamicZone components={components} firstHeadingLevel={1} />
      </main>
    );
  }

  const listing = await getListingBySlug(slug);
  const listingMatched = listing.data?.[0];

  if (!listingMatched) {
    notFound();
  }

  // Only listings read the query string, so awaiting searchParams here (not at
  // the top) keeps static pages statically prerenderable.
  const page = parsePage((await searchParams).page);

  const articlesResponse = await getArticlesByQuery(
    listingMatched.query ?? {},
    page
  );

  const totalPages = articlesResponse.meta?.pagination?.pageCount ?? 0;
  const currentPage = articlesResponse.meta?.pagination?.page ?? 1;
  const articles = articlesResponse.data ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
      <SectionHeading title={listingMatched.title} level={1} className="mb-12" />
      <ArticlesView
        articles={articles}
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/${slug}`}
      />
    </main>
  );
}
