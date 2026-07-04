import qs from "qs";

const DEFAULT_REVALIDATE_SECONDS = 120;

function getStrapiBaseUrl(): string {
  if (process.env.STRAPI_API_URL) {
    return process.env.STRAPI_API_URL;
  }
  // Docker: frontend container talks to the backend service directly
  if (process.env.DATABASE_HOST === "backend") {
    return "http://backend:1337/api";
  }
  return "http://localhost:1337/api";
}

export interface StrapiFetchOptions {
  /** Seconds between cache revalidations; false disables caching. */
  revalidate?: number | false;
  tags?: string[];
}

export async function strapiFetch<T>(
  endpoint: string,
  params?: Record<string, unknown>,
  options?: StrapiFetchOptions
): Promise<T> {
  const query = params
    ? `?${qs.stringify(params, { arrayFormat: "brackets", skipNulls: true })}`
    : "";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const response = await fetch(`${getStrapiBaseUrl()}${endpoint}${query}`, {
    headers,
    next: {
      revalidate: options?.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
      tags: options?.tags,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status} ${response.statusText} (${endpoint})`
    );
  }

  return response.json() as Promise<T>;
}
