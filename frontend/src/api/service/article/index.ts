import { ArticleListResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getArticleBySlug = async (slug: string) => {
  return strapiFetch<ArticleListResponse>(
    "/articles",
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { tags: ["articles"] }
  );
};
