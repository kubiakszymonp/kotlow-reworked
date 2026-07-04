import { HomepageResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getHomepage = async () => {
  return strapiFetch<HomepageResponse>(
    "/homepage",
    {
      populate: {
        components: {
          populate: "*",
        },
      },
    },
    { revalidate: 60, tags: ["homepage"] }
  );
};
