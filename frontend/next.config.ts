import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Enforce the apex host so every page has a single canonical URL.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sanktuariumkotlow.pl" }],
        destination: "https://sanktuariumkotlow.pl/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
    ];
  },
  images: {
    // All CMS media is same-origin (/uploads proxied by nginx / route handler),
    // so no remotePatterns are needed.
    formats: ["image/avif", "image/webp"],
    // Uploads have content-hashed (immutable) filenames — cache optimized
    // variants for a year instead of the 60 s default.
    minimumCacheTTL: 31536000,
  },
  turbopack: {},
};

export default nextConfig;
