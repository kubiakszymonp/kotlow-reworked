import { NextRequest, NextResponse } from "next/server";

/**
 * Read-only proxy for Strapi media. In production nginx serves /uploads
 * directly from Strapi; this route covers local development and the
 * internal fetches made by the Next.js image optimizer.
 */
function getStrapiUploadsBaseUrl(): string {
  if (process.env.STRAPI_URL) {
    return process.env.STRAPI_URL;
  }
  if (process.env.DATABASE_HOST === "backend") {
    return "http://backend:1337";
  }
  return "http://localhost:1337";
}

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-encoding",
  "range",
  "if-none-match",
  "if-modified-since",
];

const RETURNED_RESPONSE_HEADERS = [
  "content-type",
  "content-length",
  "content-disposition",
  "cache-control",
  "etag",
  "last-modified",
  "expires",
  "accept-ranges",
  "content-range",
  "content-encoding",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  // Reject path-traversal / injection: upload names are flat, hashed filenames.
  // `..`, backslashes or encoded slashes could escape /uploads and let the
  // proxy reach arbitrary internal Strapi endpoints (SSRF).
  const unsafe = slug.some(
    (segment) =>
      segment === ".." ||
      segment.includes("/") ||
      segment.includes("\\") ||
      segment.includes("\0") ||
      /%2e%2e|%2f|%5c/i.test(segment)
  );
  if (unsafe) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const url = new URL(request.url);
    const targetUrl = `${getStrapiUploadsBaseUrl()}/uploads/${slug
      .map(encodeURIComponent)
      .join("/")}${url.search}`;

    const headers: Record<string, string> = {};
    FORWARDED_REQUEST_HEADERS.forEach((header) => {
      const value = request.headers.get(header);
      if (value) {
        headers[header] = value;
      }
    });

    const response = await fetch(targetUrl, { headers });

    const responseHeaders = new Headers();
    RETURNED_RESPONSE_HEADERS.forEach((header) => {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });

    // Strapi upload filenames are content-hashed — safe to cache aggressively
    if (!responseHeaders.has("cache-control") && response.ok) {
      responseHeaders.set(
        "cache-control",
        "public, max-age=31536000, immutable"
      );
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ error: "Media unavailable" }, { status: 502 });
  }
}
