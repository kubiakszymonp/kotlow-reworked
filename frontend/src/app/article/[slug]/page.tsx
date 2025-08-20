import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer";
import cx from "classnames";
import styles from "./styles.module.scss";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/api/service/article";
import Header from "@/components/atomic/header";
import HtmlContent from "@/components/atomic/html-content";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const pageMatched = article.data?.[0];

  if (!pageMatched) {
    return notFound();
  }
  return (
    <div className="min-h-screen">
      {/* Navigation with blue background for subpages */}
      <Navigation withBackground={true} />

      {/* Main Content */}
      <main className={cx(styles.wrapper)}>
        <Header title={pageMatched.title} />

        <HtmlContent content={pageMatched.content} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
