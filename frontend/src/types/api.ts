// Re-export navigation types
export * from "./navigation";

// Article types
export interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleListResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Footer types
export interface Footer {
  id: number;
  content?: string;
  locale?: string;
}

export interface FooterResponse {
  data: Footer;
  meta?: object;
}

// Homepage types
export interface Homepage {
  id: number;
  content?: string;
  locale?: string;
}

export interface HomepageResponse {
  data: Homepage;
  meta?: object;
}

// Auth types
export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

// Upload types
export interface UploadFile {
  id: number;
  name: string;
  url: string;
  size: number;
  mime: string;
}

// Common API response types
export interface ApiSuccessResponse<T> {
  data: T;
  error?: never;
}

export interface ApiErrorResponse {
  data?: never;
  error: {
    message: string;
    status: number;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
