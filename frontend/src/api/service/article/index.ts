import { ArticleListResponse } from "@/api/generated";
import { serverApiClient } from "@/lib/api-client";

export const getArticleBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await serverApiClient.get<ArticleListResponse>(
    "/articles",
    queryParams
  );
  return response.data;
};
