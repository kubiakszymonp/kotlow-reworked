export const environments = {
  development: {
    client: {
      // Client-side API configuration - uses Next.js API proxy
      baseUrl: '/api',
      timeout: 10000,
    },
    server: {
      // Server-side API configuration - direct connection to Strapi
      baseUrl: 'http://localhost:1337/api',
      timeout: 10000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    // Legacy support - kept for backward compatibility
    api: {
      baseUrl: '/api',
      timeout: 10000,
      apiToken: undefined,
    },
    strapi: {
      baseUrl: 'http://localhost:1337',
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    cache: {
      revalidate: 60,
    },
  },
  production: {
    client: {
      // Client-side API configuration - uses Next.js API proxy
      baseUrl: '/api',
      timeout: 15000,
    },
    server: {
      // Server-side API configuration - direct connection to Strapi
      baseUrl: process.env.STRAPI_BASE_URL || 'http://localhost:1337/api',
      timeout: 15000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    // Legacy support - kept for backward compatibility
    api: {
      baseUrl: '/api',
      timeout: 15000,
      apiToken: undefined,
    },
    strapi: {
      baseUrl: process.env.STRAPI_BASE_URL || 'http://localhost:1337',
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

// Funkcja pomocnicza do pobierania aktualnego środowiska
export function getCurrentEnvironment(): Environment {
  if (typeof window !== 'undefined') {
    // Client-side - sprawdź URL
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }
    return 'production';
  }
  
  // Server-side - sprawdź zmienne środowiskowe
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

// Funkcja do pobierania konfiguracji dla aktualnego środowiska
export function getCurrentEnvironmentConfig() {
  return getEnvironmentConfig(getCurrentEnvironment());
}

// Helper functions for getting specific configurations
export function getClientConfig(env?: Environment) {
  const config = getEnvironmentConfig(env || getCurrentEnvironment());
  return config.client;
}

export function getServerConfig(env?: Environment) {
  const config = getEnvironmentConfig(env || getCurrentEnvironment());
  return config.server;
} 