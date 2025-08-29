import { HomepageResponse } from "@/api/generated";
import { serverApiClient } from "@/lib/api-client";

export const getHomepage = async () => {
  const queryParams = {
    populate: {
      components: {
        populate: "*"
      },
    },
  } as const;

  const response = await serverApiClient.get<HomepageResponse>(
    "/homepage",
    queryParams
  );
  return response.data;
};
