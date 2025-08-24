export const environments = {
  development: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
      timeout: 10000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    cache: {
      revalidate: 60,
    },
    media: {
      baseUrl: process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337',
    },
  },
  production: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.sanktuariumkotlow.pl/api',
      timeout: 15000,
      apiToken: process.env.STRAPI_API_TOKEN,
    },
    cache: {
      revalidate: 300, // 5 minutes
    },
    media: {
      baseUrl: process.env.NEXT_PUBLIC_MEDIA_URL || 'https://api.sanktuariumkotlow.pl',
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