import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const slug = params.slug;
  
  return {
    title: `Artykuł - ${slug} | Sanktuarium Kotłów`,
    description: `Artykuł z parafii w Kotłowie: ${slug}. Czytaj więcej na stronie Sanktuarium Kotłów.`,
    keywords: `Kotłów, parafia Kotłów, artykuł, ${slug}, sanktuarium`,
    openGraph: {
      title: `Artykuł - ${slug} | Sanktuarium Kotłów`,
      description: `Artykuł z parafii w Kotłowie: ${slug}`,
      type: 'article',
      locale: 'pl_PL',
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const slug = params.slug;

  return (
    <div className="min-h-screen">
      {/* Navigation with blue background for subpages */}
      <Navigation withBackground={true} />

      {/* Main Content */}
      <main className="pt-8">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Przykładowy Artykuł: {slug}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <time dateTime="2024-01-15">15 stycznia 2024</time>
              <span className="mx-2">•</span>
              <span>Parafia Kotłów</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              To jest przykładowy artykuł z parafii w Kotłowie. Tutaj będzie treść artykułu 
              dotycząca życia parafialnego, wydarzeń, ogłoszeń lub innych ważnych informacji 
              dla wiernych naszej wspólnoty.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ważne wydarzenia w parafii
            </h2>
            
            <p className="text-gray-700 mb-6">
              W najbliższym czasie w naszej parafii odbędą się ważne wydarzenia, które 
              warto uwzględnić w swoim kalendarzu. Zapraszamy wszystkich parafian do 
              aktywnego udziału w życiu wspólnoty.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Msze święte
            </h3>
            
            <p className="text-gray-700 mb-6">
              Regularne msze święte odbywają się w naszym sanktuarium w następujących 
              terminach: niedziele o 8:00, 10:00 i 18:00, dni powszednie o 7:00 i 18:00. 
              W święta obowiązuje rozkład mszy niedzielnych.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Grupy parafialne
            </h3>
            
            <p className="text-gray-700 mb-6">
              W naszej parafii działają różne grupy: ministranci, schola, róże różańcowe 
              oraz Legion Maryi. Każdy może znaleźć miejsce dla siebie w życiu parafii. 
              Zapraszamy do dołączenia do którejś z grup.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Sakramenty
            </h3>
            
            <p className="text-gray-700 mb-6">
              Sprawujemy wszystkie sakramenty: chrzest, bierzmowanie, Eucharystię, 
              pokutę, namaszczenie chorych, kapłaństwo oraz małżeństwo. Szczegółowe 
              informacje dostępne w kancelarii parafialnej.
            </p>

            <blockquote className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 my-8">
              <p className="text-lg italic text-gray-700">
                "Parafia to nie tylko budynek, ale przede wszystkim wspólnota wiernych 
                żyjących wiarą i miłością do Boga i bliźniego."
              </p>
            </blockquote>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kontakt z parafią
            </h2>
            
            <p className="text-gray-700 mb-6">
              W razie pytań lub potrzeby rozmowy z kapłanem, zachęcamy do kontaktu 
              telefonicznego lub osobistego w kancelarii parafialnej. Jesteśmy tutaj, 
              aby służyć naszej wspólnocie.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Informacje kontaktowe:
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>📞 Telefon: 573 791 098</li>
                <li>🏦 Konto: 52 9256 0004 0082 1416 2000 0040</li>
                <li>📘 Facebook: <a href="https://facebook.com/ParafiaKotlow" className="text-blue-600 hover:underline">Parafia Kotłów</a></li>
              </ul>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 