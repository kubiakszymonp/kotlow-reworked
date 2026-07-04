import { Article } from "@/api/generated";
import { ArticleCard } from "@/components/ArticleCard";
import SectionHeading from "@/components/atomic/header";

interface ArticleListingProps {
  title?: string;
  subtitle?: string;
  articles?: Article[];
}

export default function ArticleListing({
  title,
  subtitle,
  articles = [],
}: ArticleListingProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <div>
      {(title || subtitle) && (
        <SectionHeading title={title} subtitle={subtitle} className="mb-10" />
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
