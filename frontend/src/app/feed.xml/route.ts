import { ArticleListResponse } from "@/api/generated";
import { strapiFetch } from "@/lib/strapi";
import { htmlToExcerpt } from "@/lib/utils";
import { SITE_URL } from "@/lib/parish";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let articles: ArticleListResponse["data"] = [];
  try {
    const response = await strapiFetch<ArticleListResponse>(
      "/articles",
      {
        fields: ["slug", "title", "content", "createdAt", "publishedAt"],
        sort: ["createdAt:desc"],
        pagination: { pageSize: 20 },
      },
      { tags: ["articles"] }
    );
    articles = response.data ?? [];
  } catch {
    // Strapi down — serve an empty (but valid) feed instead of a 500
  }

  const items = (articles ?? [])
    .filter((article) => article.slug && article.title)
    .map((article) => {
      const url = `${SITE_URL}/article/${article.slug}`;
      const pubDate = new Date(
        article.publishedAt ?? article.createdAt ?? Date.now()
      ).toUTCString();
      const description = htmlToExcerpt(article.content, 300);
      return `    <item>
      <title>${escapeXml(article.title ?? "")}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${description ? `<description>${escapeXml(description)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sanktuarium Kotłów — aktualności</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Ogłoszenia parafialne, intencje mszalne i aktualności Parafii Rzymsko-katolickiej w Kotłowie.</description>
    <language>pl-PL</language>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
