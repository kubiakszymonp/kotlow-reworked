import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer";
import { DynamicZone } from "@/components/dynamicZone";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import cx from "classnames";
import styles from "./styles.module.scss";
import { notFound } from "next/navigation";
import { getStaticPageBySlug } from "@/api/service/static-page";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const staticPage = await getStaticPageBySlug(slug);

  const pageMatched = staticPage.data?.[0];

  if (!pageMatched) {
    return notFound();
  }
  return (
    <div className="min-h-screen">
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
