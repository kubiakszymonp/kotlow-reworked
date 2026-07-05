import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const MODEL_TAGS: Record<string, string[]> = {
  article: ["articles"],
  homepage: ["homepage"],
  "static-page": ["static-pages"],
  listing: ["listings"],
  navigation: ["navigation"],
};

const ALL_TAGS = [
  "articles",
  "homepage",
  "static-pages",
  "listings",
  "navigation",
];

/**
 * Strapi webhook target. Configure in Strapi: Settings -> Webhooks,
 * URL https://sanktuariumkotlow.pl/api/revalidate with the header
 * Authorization: Bearer <REVALIDATE_SECRET>.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let model: string | undefined;
  try {
    const body = await request.json();
    model = body?.model;
  } catch {
    // No body — refresh everything
  }

  const tags = (model && MODEL_TAGS[model]) || ALL_TAGS;
  // Next 16 requires a cache-life profile; "max" evicts the tag immediately.
  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: tags });
}
