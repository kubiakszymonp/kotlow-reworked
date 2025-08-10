import {
  StaticPageListResponse,
} from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const getStaticPageBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await apiClient.get<StaticPageListResponse>(
    "/static-pages",
    queryParams
  );
  return response.data;
};
