import { revalidateTag } from 'next/cache';
import { config } from './config';
import { ApiError, NetworkError, NotFoundError } from './errors';

export type ApiResponse<T> = {
  data: T;
  error?: never;
} | {
  data?: never;
  error: ApiError;
};

export type ApiListResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: never;
} | {
  data?: never;
  error: ApiError;
};

// Generic API wrapper with error handling
export async function apiCall<T>(
  apiFunction: () => Promise<T>,
  options?: {
    revalidate?: number;
    tags?: string[];
  }
): Promise<ApiResponse<T>> {
  try {
    const result = await apiFunction();
    return { data: result };
  } catch (error) {
    console.error('API call failed:', error);
    
    if (error instanceof ApiError) {
      return { error };
    }
    
    if (error instanceof Error) {
      return { 
        error: new NetworkError('Network request failed', error) 
      };
    }
    
    return { 
      error: new ApiError('Unknown error occurred', 500) 
    };
  }
}

// Revalidate cache tags
export function revalidateApiTags(tags: string[]) {
  tags.forEach(tag => revalidateTag(tag));
}

// Pagination helper
export function createPaginationParams(page = 1, pageSize = 10) {
  return {
    paginationPage: page,
    paginationPageSize: pageSize,
    paginationWithCount: true,
  };
}

// Filter helper
export function createFilterParams(filters: Record<string, any>) {
  return {
    filters,
  };
}

// Sort helper
export function createSortParams(sort: string) {
  return {
    sort,
  };
}

// Populate helper
export function createPopulateParams(populate: string | string[]) {
  return {
    populate: Array.isArray(populate) ? populate.join(',') : populate,
  };
}

// Locale helper
export function createLocaleParams(locale: string) {
  return {
    locale,
  };
}

// Combine all params
export function createApiParams(options: {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sort?: string;
  populate?: string | string[];
  locale?: string;
}) {
  return {
    ...createPaginationParams(options.page, options.pageSize),
    ...(options.filters && createFilterParams(options.filters)),
    ...(options.sort && createSortParams(options.sort)),
    ...(options.populate && createPopulateParams(options.populate)),
    ...(options.locale && createLocaleParams(options.locale)),
  };
} 