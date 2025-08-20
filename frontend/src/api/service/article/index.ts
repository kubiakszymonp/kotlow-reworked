import { ArticleListResponse } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const getArticleBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await apiClient.get<ArticleListResponse>(
    "/articles",
    queryParams
  );
  return response.data;
};
