import { HomepageResponse } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const getHomepage = async () => {
  const queryParams = {
    populate: {
      components: {
        populate: "*"
      },
    },
  } as const;

  const response = await apiClient.get<HomepageResponse>(
    "/homepage",
    queryParams
  );
  return response.data;
};
