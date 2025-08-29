import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {},
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization to avoid 400 errors
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "sanktuariumkotlow.pl",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sanktuariumkotlow.pl",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // Wstrzykiwanie zmiennych środowiskowych do builda
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
