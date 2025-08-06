export const environments = {
  development: {
    api: {
      baseUrl: 'http://localhost:1337/api',
      timeout: 10000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    cache: {
      revalidate: 60,
    },
  },
  production: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.sanktuariumkotlow.pl',
      timeout: 15000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    cache: {
      revalidate: 300, // 5 minutes
    },
  },
} as const;

export type Environment = keyof typeof environments;

export function getEnvironmentConfig(env: Environment = 'development') {
  return environments[env];
} 