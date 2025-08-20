import React from "react";
import { Article } from "@/api/generated";
import { ArticleCard } from "@/components/ArticleCard";
import styles from "./styles.module.scss";

interface ArticleListingProps {
  articles?: Article[];
}

export default function ArticleListing({ articles = [] }: ArticleListingProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.articleGrid}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
