import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import { getStaticPageBySlug } from "@/api/service/static-page";
import { DynamicZone } from "@/components/dynamicZone";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation/Navigation";
import { cx } from "class-variance-authority";
import { notFound } from "next/navigation";
import styles from "./styles.module.scss";
import { getListingBySlug } from "@/api/service/listing";
import { ArticlesView } from "@/components/ArticlesView";
import { getArticlesByQuery } from "@/api/service/articles";
import Header from "@/components/atomic/header";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function StaticPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const staticPage = await getStaticPageBySlug(slug);
  const pageMatched = staticPage.data?.[0];

  if (pageMatched) {
    return (
      <div className={cx("min-h-screen")}>
        {/* Navigation with blue background for subpages */}
        <Navigation withBackground={true} />

        {/* Main Content */}

        <main className={cx(styles.wrapper)}>
          <DynamicZone
            components={pageMatched.components as DynamicComponent[]}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  const listing = await getListingBySlug(slug);
  const listingMatched = listing.data?.[0];

  if (!listingMatched) {
    return notFound();
  }

  const query = listingMatched.query;
  const page = resolvedSearchParams.page || 1;

  const articlesResponse = await getArticlesByQuery(query, Number(page));

  console.log("articlesResponse", articlesResponse);
  const totalPages = articlesResponse.meta?.pagination?.pageCount || 0;
  const currentPage = articlesResponse.meta?.pagination?.page || 0;
  const articles = articlesResponse.data || [];
  const loading = false;

  return (
    <div className={cx("min-h-screen")}>
      {/* Navigation with blue background for subpages */}
      <Navigation withBackground={true} />

      {/* Main Content */}
      <main className={cx(styles.wrapper)}>
        <Header title={listingMatched.title} />
        <ArticlesView
          articles={articles}
          totalPages={totalPages}
          currentPage={currentPage}
          loading={loading}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
