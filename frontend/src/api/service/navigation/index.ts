import { NavigationResponse } from "@/api/generated";
import { clientApiClient } from "@/lib/api-client";

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

  const response = await clientApiClient.get<NavigationResponse>(
    "/navigation",
    queryParams
  );
  return response.data;
};
