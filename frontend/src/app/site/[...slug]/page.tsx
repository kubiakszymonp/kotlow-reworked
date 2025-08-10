import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import { getStaticPageBySlug } from "@/api/service/static-page";
import { DynamicZone } from "@/components/dynamicZone";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation/Navigation";
import { cx } from "class-variance-authority";
import { notFound } from "next/navigation";
import styles from "./styles.module.scss";

export default async function StaticPage({
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
