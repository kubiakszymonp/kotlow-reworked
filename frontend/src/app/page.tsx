import { Metadata } from "next";
import VideoHero from "@/components/video-hero";
import QuickLinks from "@/components/home/QuickLinks";
import ContactBand from "@/components/home/ContactBand";
import { getHomepage } from "@/api/service/homepage";
import { DynamicZone } from "@/components/dynamicZone";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default async function Home() {
  const homepage = await getHomepage();

  return (
    <main>
      <VideoHero />

      <QuickLinks />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <DynamicZone
          components={homepage.data?.components as DynamicComponent[]}
          firstHeadingLevel={2}
        />
      </div>

      <ContactBand />
    </main>
  );
}
