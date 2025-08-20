"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer";
import { ArticlesView } from "@/components/ArticlesView";
import { Article } from "@/types/article";

// Mocked data - proste artykuły dla strony parafialnej
const MOCKED_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Ogłoszenia parafialne - styczeń 2024",
    excerpt:
      "Ważne informacje dla parafian na nadchodzący miesiąc. Zmiany w harmonogramie mszy świętych i wydarzenia parafialne.",
    slug: "ogloszenia-parafialne-styczen-2024",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Rekolekcje adwentowe 2024",
    excerpt:
      "Zapraszamy na rekolekcje adwentowe, które pomogą nam przygotować się duchowo do świąt Bożego Narodzenia.",
    slug: "rekolekcje-adwentowe-2024",
    publishedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Wolontariat w parafii",
    excerpt:
      "Informacje o możliwościach zaangażowania się w życie parafii poprzez różne formy wolontariatu.",
    slug: "wolontariat-w-parafii",
    publishedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Kurs przedmałżeński 2024",
    excerpt:
      "Szczegóły dotyczące kursu przedmałżeńskiego dla par planujących zawarcie sakramentu małżeństwa.",
    slug: "kurs-przedmalzenski-2024",
    publishedAt: "2024-01-08",
  },
  {
    id: "5",
    title: "Grupy modlitewne w parafii",
    excerpt:
      "Przegląd grup modlitewnych działających w naszej parafii i możliwości dołączenia do nich.",
    slug: "grupy-modlitewne-w-parafii",
    publishedAt: "2024-01-05",
  },
  {
    id: "6",
    title: "Kancelaria parafialna - godziny otwarcia",
    excerpt:
      "Aktualne godziny otwarcia kancelarii parafialnej i informacje o dokumentach potrzebnych do załatwienia spraw.",
    slug: "kancelaria-parafialna-godziny-otwarcia",
    publishedAt: "2024-01-03",
  },
];

const ARTICLES_PER_PAGE = 12;

export default function ArticlesListingPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
      const endIndex = startIndex + ARTICLES_PER_PAGE;
      const paginatedArticles = MOCKED_ARTICLES.slice(startIndex, endIndex);

      setArticles(paginatedArticles);
      setTotalPages(Math.ceil(MOCKED_ARTICLES.length / ARTICLES_PER_PAGE));
      setLoading(false);
    };

    loadArticles();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      <Navigation withBackground={true} />
      
      <ArticlesView
        articles={articles}
        totalPages={totalPages}
        currentPage={currentPage}
        loading={loading}
        onPageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
}
