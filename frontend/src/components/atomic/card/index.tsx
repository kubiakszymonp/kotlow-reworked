import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

interface CardProps {
  title?: string;
  shortText?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  linkText?: string;
  linkUrl?: string;
}

export default function Card({ title, shortText, image, linkText, linkUrl }: CardProps) {
  const cardContent = (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image.url}
            alt={image.alternativeText || title || 'Card image'}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {shortText && <p className={styles.shortText}>{shortText}</p>}
        {linkText && linkUrl && (
          <span className={styles.linkText}>{linkText}</span>
        )}
      </div>
    </div>
  );

  if (linkUrl) {
    return (
      <Link href={linkUrl} className={styles.cardLink}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
