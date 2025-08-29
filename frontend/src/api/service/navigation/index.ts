import { NavigationResponse } from "@/api/generated";
import { serverApiClient } from "@/lib/api-client";

export const getNavigation = async () => {
  const queryParams = {
    populate: {
      items: {
        populate: {
          subItems: "*",
        },
      },
    },
  };

  const response = await serverApiClient.get<NavigationResponse>(
    "/navigation",
    queryParams
  );
  return response.data;
};
