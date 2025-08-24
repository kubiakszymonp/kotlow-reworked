import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.scss";
import { Article } from "@/api/generated";
import { getMediaUrl } from "@/lib/media-provider";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const thumbnail = getMediaUrl(article.thumbnail?.url || "/church.png");

  console.log(thumbnail);
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleImage}>
        <Image
          src={thumbnail}
          alt={article.title!}
          width={400}
          height={240}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.articleContent}>
        <div className={styles.articleMeta}>
          <span className={styles.publishDate}>
            {new Date(article.createdAt!).toLocaleDateString("pl-PL")}
          </span>
        </div>

        <h3 className={styles.articleTitle}>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>

        {/* <p className={styles.articleExcerpt}>{article.}</p> */}

        <div className={styles.readMoreWrapper}>
          <Link
            href={`/article/${article.slug}`}
            className={styles.readMoreBtn}
          >
            Czytaj więcej
          </Link>
        </div>
      </div>
    </article>
  );
}
