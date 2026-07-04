import { NavigationResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getNavigation = async () => {
  return strapiFetch<NavigationResponse>(
    "/navigation",
    {
      populate: {
        items: {
          populate: {
            subItems: "*",
          },
        },
      },
    },
    { revalidate: 300, tags: ["navigation"] }
  );
};
