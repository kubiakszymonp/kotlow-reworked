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

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function resolveSlug(slugSegments: string[]): string {
  return slugSegments.join("/");
}

export async function generateMetadata({
  params,
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
      openGraph: { url: `/${slug}`, title: pageMatched.title },
    };
  }

  const listing = await getListingBySlug(slug);
  const listingMatched = listing.data?.[0];

  if (listingMatched) {
    return {
      title: listingMatched.title,
      description: `${listingMatched.title} — aktualne wpisy Parafii Rzymsko-katolickiej w Kotłowie.`,
      alternates: { canonical: `/${slug}` },
      openGraph: { url: `/${slug}`, title: listingMatched.title ?? undefined },
    };
  }

  return {};
}

export default async function StaticPage({ params, searchParams }: PageProps) {
  const { slug: slugSegments } = await params;
  const slug = resolveSlug(slugSegments);
  const resolvedSearchParams = await searchParams;

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

  const requestedPage = Number(resolvedSearchParams.page);
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

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
