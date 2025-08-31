// Helper function to determine Strapi URL based on environment
function getStrapiBaseUrl(): string {
  // Check if we're running in Docker (backend service name exists)
  if (process.env.DATABASE_HOST === 'backend') {
    return 'http://backend:1337/api';
  }
  
  // Default to localhost for local development
  return 'http://localhost:1337/api';
}

export const environments = {
  development: {
    client: {
      // Client-side API configuration - uses Next.js API proxy
      baseUrl: '/api',
      timeout: 10000,
    },
    server: {
      // Server-side API configuration - direct connection to Strapi
      baseUrl: getStrapiBaseUrl(),
      timeout: 10000,
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
      baseUrl: getStrapiBaseUrl(),
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