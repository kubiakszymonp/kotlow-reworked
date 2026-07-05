import { ArticleListResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getArticlesByQuery = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
  page: number
) => {
  const queryParams = structuredClone(query);
  queryParams.pagination = queryParams.pagination ?? {};
  queryParams.pagination.page = page;
  queryParams.populate = "*";
  return strapiFetch<ArticleListResponse>("/articles", queryParams, {
    tags: ["articles"],
  });
};

export const getLatestArticlesByType = async (
  articleType: string,
  limit = 3
) => {
  return strapiFetch<ArticleListResponse>(
    "/articles",
    {
      populate: "*",
      filters: {
        articleType: {
          $eq: articleType,
        },
      },
      sort: ["createdAt:desc"],
      pagination: { pageSize: limit },
    },
    { revalidate: 60, tags: ["articles"] }
  );
};

export const getAllArticleSlugs = async () => {
  const pageSize = 100;
  const first = await strapiFetch<ArticleListResponse>(
    "/articles",
    {
      fields: ["slug", "updatedAt"],
      sort: ["createdAt:desc"],
      pagination: { page: 1, pageSize },
    },
    { tags: ["articles"] }
  );

  const pageCount = first.meta?.pagination?.pageCount ?? 1;
  if (pageCount <= 1) {
    return first;
  }

  // Fetch the remaining pages so the sitemap never silently truncates.
  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      strapiFetch<ArticleListResponse>(
        "/articles",
        {
          fields: ["slug", "updatedAt"],
          sort: ["createdAt:desc"],
          pagination: { page: i + 2, pageSize },
        },
        { tags: ["articles"] }
      )
    )
  );

  return {
    ...first,
    data: [
      ...(first.data ?? []),
      ...rest.flatMap((response) => response.data ?? []),
    ],
  };
};
