'use server';

import { revalidateTag } from 'next/cache';
import { apiClient } from '../api-client';
import { apiCall, createApiParams, revalidateApiTags } from '../api-utils';
import { config } from '../config';
import { 
  ArticleResponse, 
  ArticleListResponse, 
  ArticleRequest,
  ArticleRequestData 
} from '@/api/generated';

// Get all articles with pagination and filtering
export async function getArticles(options?: {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sort?: string;
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams(options || {});
  
  return apiCall(
    () => apiClient.articles.getArticles(params),
    {
      tags: [config.cache.tags.articles],
    }
  );
}

// Get a single article by ID
export async function getArticle(id: number, options?: {
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams(options || {});
  
  return apiCall(
    () => apiClient.articles.getArticlesId({ id, ...params }),
    {
      tags: [config.cache.tags.articles],
    }
  );
}

// Get article by slug
export async function getArticleBySlug(slug: string, options?: {
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams({
    filters: { slug: { $eq: slug } },
    populate: options?.populate || ['*'],
    locale: options?.locale,
  });
  
  return apiCall(
    () => apiClient.articles.getArticles(params),
    {
      tags: [config.cache.tags.articles],
    }
  );
}

// Create a new article
export async function createArticle(articleData: ArticleRequestData) {
  const articleRequest: ArticleRequest = {
    data: articleData,
  };
  
  const result = await apiCall(
    () => apiClient.articles.postArticles({ articleRequest }),
    {
      tags: [config.cache.tags.articles],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.articles]);
  }
  
  return result;
}

// Update an article
export async function updateArticle(id: number, articleData: Partial<ArticleRequestData>) {
  const articleRequest: ArticleRequest = {
    data: articleData as ArticleRequestData,
  };
  
  const result = await apiCall(
    () => apiClient.articles.putArticlesId({ id, articleRequest }),
    {
      tags: [config.cache.tags.articles],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.articles]);
  }
  
  return result;
}

// Delete an article
export async function deleteArticle(id: number) {
  const result = await apiCall(
    () => apiClient.articles.deleteArticlesId({ id }),
    {
      tags: [config.cache.tags.articles],
    }
  );
  
  if (result.data) {
    revalidateApiTags([config.cache.tags.articles]);
  }
  
  return result;
}

// Get published articles
export async function getPublishedArticles(options?: {
  page?: number;
  pageSize?: number;
  sort?: string;
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams({
    ...options,
    filters: {
      publishedAt: { $notNull: true },
    },
  });
  
  return apiCall(
    () => apiClient.articles.getArticles(params),
    {
      tags: [config.cache.tags.articles],
    }
  );
}

// Search articles
export async function searchArticles(query: string, options?: {
  page?: number;
  pageSize?: number;
  sort?: string;
  populate?: string | string[];
  locale?: string;
}) {
  const params = createApiParams({
    ...options,
    filters: {
      $or: [
        { title: { $containsi: query } },
        { content: { $containsi: query } },
      ],
    },
  });
  
  return apiCall(
    () => apiClient.articles.getArticles(params),
    {
      tags: [config.cache.tags.articles],
    }
  );
} 