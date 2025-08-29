import { ListingListResponse } from "@/api/generated";
import { serverApiClient } from "@/lib/api-client";

export const getListingBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await serverApiClient.get<ListingListResponse>(
    "/listings",
    queryParams
  );
  return response.data;
};
