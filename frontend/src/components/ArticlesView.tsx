import { Article } from "@/api/generated";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";

interface ArticlesViewProps {
  articles: Article[];
  totalPages: number;
  currentPage: number;
  basePath: string;
}

export function ArticlesView({
  articles,
  totalPages,
  currentPage,
  basePath,
}: ArticlesViewProps) {
  if (!articles.length) {
    return (
      <p className="py-16 text-center text-lg text-muted-foreground">
        Brak wpisów do wyświetlenia.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={basePath}
          />
        </div>
      )}
    </div>
  );
}
