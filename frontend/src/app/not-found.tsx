import Link from "next/link";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona nie została znaleziona | Sanktuarium Kotłów",
  description: "Strona, której szukasz nie istnieje. Wróć do strony głównej Sanktuarium Kotłów.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation withBackground />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#f5f3ec]">
          <div className="container mx-auto px-4 text-center">
            {/* 404 Number */}
            <div className="relative mb-8">
              <h1 className="text-9xl md:text-[12rem] font-bold text-[#264B72]/10 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#264B72] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <svg 
                    className="w-12 h-12 md:w-16 md:h-16 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#264B72]">
                Strona nie została znaleziona
              </h2>
              
              <p className="text-lg text-[#3A3A3A] max-w-md mx-auto leading-relaxed">
                Strona, której szukasz nie istnieje lub została przeniesiona. 
                Możesz wrócić do strony głównej lub skorzystać z nawigacji.
              </p>

              {/* Decorative Element */}
              <div className="flex justify-center my-8">
                <div className="w-16 h-1 bg-[#C4B68A] rounded-full"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/"
                  className="px-8 py-3 bg-[#264B72] text-white rounded-lg font-medium hover:bg-[#1C2D4A] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Strona główna
                </Link>
                
                <Link 
                  href="/kontakt"
                  className="px-8 py-3 border-2 border-[#264B72] text-[#264B72] rounded-lg font-medium hover:bg-[#264B72] hover:text-white transition-all duration-200"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section - similar to homepage */}
        <section className="py-16 bg-gray-50" aria-label="Informacje o parafii">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#264B72] mb-8">
              Witamy w Parafii Rzymsko-katolickiej w Kotłowie
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-[#3A3A3A] mb-8 leading-relaxed">
                Mimo że strona, której szukasz nie istnieje, zapraszamy do zapoznania się 
                z naszą parafią i jej działalnością. Znajdziesz tu informacje o mszy świętej, 
                sakramentach, ogłoszeniach parafialnych i wielu innych sprawach.
              </p>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <Link 
                  href="/msze-swiete"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#C4B68A]/20"
                >
                  <h3 className="text-xl font-semibold text-[#264B72] mb-2">Msze święte</h3>
                  <p className="text-[#3A3A3A] text-sm">Sprawdź rozkład mszy świętych w naszej parafii</p>
                </Link>
                
                <Link 
                  href="/sakramenty"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#C4B68A]/20"
                >
                  <h3 className="text-xl font-semibold text-[#264B72] mb-2">Sakramenty</h3>
                  <p className="text-[#3A3A3A] text-sm">Informacje o sakramentach i ich przygotowaniu</p>
                </Link>
                
                <Link 
                  href="/ogloszenia"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#C4B68A]/20"
                >
                  <h3 className="text-xl font-semibold text-[#264B72] mb-2">Ogłoszenia</h3>
                  <p className="text-[#3A3A3A] text-sm">Aktualne ogłoszenia parafialne</p>
                </Link>
                
                <Link 
                  href="/aktualnosci"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#C4B68A]/20"
                >
                  <h3 className="text-xl font-semibold text-[#264B72] mb-2">Aktualności</h3>
                  <p className="text-[#3A3A3A] text-sm">Najnowsze informacje z życia parafii</p>
                </Link>
              </div>

              {/* Decorative Quote */}
              <div className="mt-16 p-8 bg-white/70 rounded-lg border border-[#C4B68A]/30 shadow-lg max-w-2xl mx-auto">
                <blockquote className="text-[#3A3A3A] italic text-lg">
                  "Bóg jest naszym schronieniem i siłą, pomocą w utrapieniach bardzo bliską."
                  <footer className="text-sm text-[#8F6839] mt-4">- Psalm 46,2</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 