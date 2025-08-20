import styles from "./ArticleSkeleton.module.scss";

export function ArticleSkeleton() {
  return (
    <div className={styles.articleSkeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonMeta}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonExcerpt}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
}
