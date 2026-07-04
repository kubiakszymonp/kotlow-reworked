import { StaticPageListResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getStaticPageBySlug = async (slug: string) => {
  return strapiFetch<StaticPageListResponse>(
    "/static-pages",
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { tags: ["static-pages"] }
  );
};

export const getAllStaticPages = async () => {
  return strapiFetch<StaticPageListResponse>(
    "/static-pages",
    {
      fields: ["slug", "updatedAt"],
      pagination: { pageSize: 100 },
    },
    { tags: ["static-pages"] }
  );
};
