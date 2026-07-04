import { ListingListResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";

export const getListingBySlug = async (slug: string) => {
  return strapiFetch<ListingListResponse>(
    "/listings",
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { tags: ["listings"] }
  );
};

export const getAllListings = async () => {
  return strapiFetch<ListingListResponse>(
    "/listings",
    {
      fields: ["slug", "updatedAt"],
      pagination: { pageSize: 100 },
    },
    { tags: ["listings"] }
  );
};
