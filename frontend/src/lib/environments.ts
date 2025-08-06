export const environments = {
  development: {
    api: {
      baseUrl: 'http://localhost:1337',
      timeout: 10000,
    },
    cache: {
      revalidate: 60,
    },
  },
  production: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.sanktuariumkotlow.pl',
      timeout: 15000,
    },
    cache: {
      revalidate: 300, // 5 minutes
    },
  },
  test: {
    api: {
      baseUrl: 'http://localhost:1337',
      timeout: 5000,
    },
    cache: {
      revalidate: 0, // No cache in tests
    },
  },
} as const;

export type Environment = keyof typeof environments;

export function getEnvironmentConfig(env: Environment = 'development') {
  return environments[env];
} 