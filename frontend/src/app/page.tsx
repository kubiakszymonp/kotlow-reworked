import { Metadata } from "next";
import VideoHero from "@/components/video-hero";
import QuickLinks from "@/components/home/QuickLinks";
import ContactBand from "@/components/home/ContactBand";
import { getHomepage } from "@/api/service/homepage";
import { DynamicZone } from "@/components/dynamicZone";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import { openGraph } from "@/lib/seo";

// ISR: served from cache and refreshed via Strapi webhook (revalidateTag).
// Dropping force-dynamic lets the homepage survive a brief Strapi outage on
// the cached copy instead of 500-ing.
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: openGraph({ url: "/", type: "website" }),
};

export default async function Home() {
  let homepage: Awaited<ReturnType<typeof getHomepage>> | null = null;
  try {
    homepage = await getHomepage();
  } catch {
    // Strapi unreachable — still render the static hero/quick-links/contact.
  }

  return (
    <main>
      <VideoHero />

      <QuickLinks />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <DynamicZone
          components={homepage?.data?.components as DynamicComponent[]}
          firstHeadingLevel={2}
        />
      </div>

      <ContactBand />
    </main>
  );
}
