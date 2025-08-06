export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    apiToken: process.env.STRAPI_API_TOKEN,
    timeout: 10000,
  },
  cache: {
    revalidate: 60, // 1 minute
    tags: {
      articles: 'articles',
      navigation: 'navigation',
      footer: 'footer',
      homepage: 'homepage',
    },
  },
} as const;

export type Config = typeof config; 