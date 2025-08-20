import VideoHero from "@/components/video-hero";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Navigation from "@/components/navigation/Navigation";
import { getHomepage } from "@/api/service/homepage";
import { DynamicZone } from "@/components/dynamicZone";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";
import styles from "./styles.module.scss";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka w Kotłowie",
  description:
    "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Sanktuarium, msze święte, sakramenty, ogłoszenia parafialne, intencje mszalne, grupy parafialne, historia parafii Kotłów.",
  keywords:
    "Kotłów, parafia Kotłów, sanktuarium, msze święte, sakramenty, ogłoszenia parafialne, diecezja kaliska",
  openGraph: {
    title: "Sanktuarium Kotłów | Parafia Rzymsko-katolicka",
    description:
      "Oficjalna strona Parafii Rzymsko-katolickiej w Kotłowie. Msze święte, sakramenty, ogłoszenia parafialne.",
    type: "website",
    locale: "pl_PL",
    images: ["/obraz.jpg"],
  },
};

export default async function Home() {
  const homepage = await getHomepage();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <header className="relative">
        <Navigation />
        <VideoHero />
      </header>

      {/* Main Content */}
      <main className={styles.container}>
        <DynamicZone
          components={homepage.data?.components as DynamicComponent[]}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
