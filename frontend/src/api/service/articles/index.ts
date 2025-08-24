import { ArticleListResponse } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const getArticlesByQuery = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
  page: number
) => {
  const queryParams = structuredClone(query);
  queryParams.pagination.page = page;
  queryParams.populate = "*";
  const response = await apiClient.get<ArticleListResponse>(
    "/articles",
    queryParams
  );
  return response.data;
};
