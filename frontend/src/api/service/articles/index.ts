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
  return strapiFetch<ArticleListResponse>(
    "/articles",
    {
      fields: ["slug", "updatedAt"],
      sort: ["createdAt:desc"],
      pagination: { pageSize: 200 },
    },
    { tags: ["articles"] }
  );
};
