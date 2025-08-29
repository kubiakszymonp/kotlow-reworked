import {
  StaticPageListResponse,
} from "@/api/generated";
import { serverApiClient } from "@/lib/api-client";

export const getStaticPageBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await serverApiClient.get<StaticPageListResponse>(
    "/static-pages",
    queryParams
  );
  return response.data;
};
