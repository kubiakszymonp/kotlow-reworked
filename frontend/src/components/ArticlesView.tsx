import { CustomPagination } from "@/components/CustomPagination";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import styles from "./ArticlesView.module.scss";
import { Article } from "@/api/generated";

interface ArticlesViewProps {
  articles: Article[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  onPageChange?: (page: number) => void;
}

export function ArticlesView({
  articles,
  totalPages,
  currentPage,
  loading,
}: ArticlesViewProps) {
  return (
    <main className={styles.articlesListing}>
      <div className={styles.container}>
        {/* Articles Grid */}
        {loading ? (
          <div className={styles.articlesGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.articlesGrid}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <CustomPagination
                  maxPages={totalPages}
                  currentPage={currentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
