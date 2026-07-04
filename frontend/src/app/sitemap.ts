import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/api/service/articles";
import { getAllStaticPages } from "@/api/service/static-page";
import { getAllListings } from "@/api/service/listing";

const BASE_URL = "https://sanktuariumkotlow.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const [articles, staticPages, listings] = await Promise.allSettled([
    getAllArticleSlugs(),
    getAllStaticPages(),
    getAllListings(),
  ]);

  if (staticPages.status === "fulfilled") {
    for (const page of staticPages.value.data ?? []) {
      if (!page.slug) continue;
      entries.push({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  if (listings.status === "fulfilled") {
    for (const listing of listings.value.data ?? []) {
      if (!listing.slug) continue;
      entries.push({
        url: `${BASE_URL}/${listing.slug}`,
        lastModified: listing.updatedAt,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  if (articles.status === "fulfilled") {
    for (const article of articles.value.data ?? []) {
      if (!article.slug) continue;
      entries.push({
        url: `${BASE_URL}/article/${article.slug}`,
        lastModified: article.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
