import { ListingListResponse } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const getListingBySlug = async (slug: string) => {
  const queryParams = {
    populate: "*",
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await apiClient.get<ListingListResponse>(
    "/listings",
    queryParams
  );
  return response.data;
};
