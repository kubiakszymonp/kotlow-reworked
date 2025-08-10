import React from "react";
import Link from "next/link";
import { Article } from "@/api/generated";
import styles from "./styles.module.scss";

interface ArticleListingProps {
  articles?: Article[];
}

export default function ArticleListing({ articles = [] }: ArticleListingProps) {
  if (!articles.length) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.articleGrid}>
        {articles.map((article) => (
          <article key={article.id} className={styles.articleCard}>
            <div className={styles.cardContent}>
              <div className={styles.articleMeta}>
                {article.publishedAt && (
                  <time className={styles.date}>
                    {formatDate(article.publishedAt.toString())}
                  </time>
                )}
              </div>

              <h3 className={styles.articleTitle}>
                {article.slug ? (
                  <Link
                    href={`/article/${article.slug}`}
                    className={styles.titleLink}
                  >
                    {article.title}
                  </Link>
                ) : (
                  article.title
                )}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
