import { NavigationResponse } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

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

  const response = await apiClient.get<NavigationResponse>(
    "/navigation",
    queryParams
  );
  return response.data;
};
