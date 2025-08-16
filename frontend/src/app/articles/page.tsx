'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer";
import { CustomPagination } from "@/components/CustomPagination";
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

// Mocked data - proste artykuły
const MOCKED_ARTICLES = [
  {
    id: '1',
    title: 'Jak wdrożyć AI w małej firmie',
    excerpt: 'Poznaj praktyczne sposoby wykorzystania sztucznej inteligencji w codziennym działaniu małych i średnich przedsiębiorstw.',
    slug: 'jak-wdrozyc-ai-w-malej-firmie',
    publishedAt: '2024-01-15',
    author: 'Anna Kowalska',
    featuredImage: '/images/ai-business.jpg',
    tags: ['AI', 'Business', 'Technology'],
    readTime: 8
  },
  {
    id: '2',
    title: 'Nowa funkcjonalność w naszej platformie',
    excerpt: 'Wprowadziliśmy zaawansowane narzędzia analityczne, które pomogą Ci lepiej zrozumieć potrzeby klientów.',
    slug: 'nowa-funkcjonalnosc-platforma',
    publishedAt: '2024-01-12',
    author: 'Michał Nowak',
    featuredImage: '/images/platform-update.jpg',
    tags: ['Update', 'Features', 'Analytics'],
    readTime: 5
  },
  {
    id: '3',
    title: 'Krok po kroku: Automatyzacja procesów',
    excerpt: 'Kompleksowy przewodnik po automatyzacji procesów biznesowych od podstaw do zaawansowanych technik.',
    slug: 'automatyzacja-procesow-przewodnik',
    publishedAt: '2024-01-10',
    author: 'Piotr Wiśniewski',
    featuredImage: '/images/automation.jpg',
    tags: ['Automation', 'Process', 'Tutorial'],
    readTime: 12
  },
  {
    id: '4',
    title: 'Jak firma XYZ zwiększyła zyski o 300%',
    excerpt: 'Analiza przypadku implementacji naszych rozwiązań w firmie XYZ i osiągniętych spektakularnych rezultatów.',
    slug: 'firma-xyz-wzrost-zyskow',
    publishedAt: '2024-01-08',
    author: 'Katarzyna Zielińska',
    featuredImage: '/images/case-study-xyz.jpg',
    tags: ['Case Study', 'Success', 'ROI'],
    readTime: 15
  },
  {
    id: '5',
    title: 'Trendy technologiczne 2024',
    excerpt: 'Przegląd najważniejszych trendów technologicznych, które będą kształtować biznes w nadchodzącym roku.',
    slug: 'trendy-technologiczne-2024',
    publishedAt: '2024-01-05',
    author: 'Robert Kaczmarek',
    featuredImage: '/images/tech-trends.jpg',
    tags: ['Technology', 'Trends', '2024'],
    readTime: 10
  },
  {
    id: '6',
    title: 'Bezpieczeństwo danych w chmurze',
    excerpt: 'Wszystko co musisz wiedzieć o zabezpieczaniu danych w rozwiązaniach chmurowych.',
    slug: 'bezpieczenstwo-danych-chmura',
    publishedAt: '2024-01-03',
    author: 'Agnieszka Lewandowska',
    featuredImage: '/images/cloud-security.jpg',
    tags: ['Security', 'Cloud', 'Data'],
    readTime: 9
  }
];

const ARTICLES_PER_PAGE = 4;

function ArticleCard({ article }: { article: typeof MOCKED_ARTICLES[0] }) {
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleImage}>
        <Image
          src={article.featuredImage}
          alt={article.title}
          width={400}
          height={240}
          className={styles.image}
        />
      </div>
      
      <div className={styles.articleContent}>
        <div className={styles.articleMeta}>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              {article.author.charAt(0)}
            </div>
            <span className={styles.authorName}>{article.author}</span>
          </div>
          <div className={styles.articleDetails}>
            <span className={styles.readTime}>{article.readTime} min</span>
            <span className={styles.publishDate}>
              {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </div>
        
        <h3 className={styles.articleTitle}>
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className={styles.articleExcerpt}>{article.excerpt}</p>
        
        <div className={styles.articleTags}>
          {article.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        <Link href={`/article/${article.slug}`} className={styles.readMoreBtn}>
          Czytaj więcej
        </Link>
      </div>
    </article>
  );
}

export default function ArticlesListingPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [articles, setArticles] = useState<typeof MOCKED_ARTICLES>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      <Navigation withBackground={true} />
      
      <main className={styles.articlesListing}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.articlesHeader}>
            <h1 className={styles.articlesTitle}>
              Artykuły
            </h1>
            <p className={styles.articlesSubtitle}>
              Odkryj najnowsze artykuły i poradniki
            </p>
          </header>

          {/* Articles Grid */}
          {loading ? (
            <div className={styles.articlesGrid}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.articleSkeleton}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                  </div>
                </div>
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
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
